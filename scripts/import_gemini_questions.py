#!/usr/bin/env python3
"""Convert the user-provided Gemini PCA question set into the app's JS schema."""

import json
import re
import sys
from pathlib import Path


DOMAIN_BY_QUESTION = {
    **{n: "design" for n in [1, 2, 3, 6, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 20, 31, 32, 33, 35, 41, 42, 47, 50]},
    **{n: "provision" for n in [5, 7, 30, 44]},
    **{n: "security" for n in [4, 10, 17, 21, 22, 23, 25, 26, 27, 28, 29, 37, 45]},
    **{n: "implementation" for n in [24, 34, 36, 38, 43, 46, 48]},
    **{n: "operations" for n in [39, 40, 49]},
}

OBJECTIVE_BY_SECTION = {
    1: "Enterprise architecture and infrastructure",
    2: "Data and storage architecture",
    3: "DevOps, security, and compliance",
    4: "Hybrid cloud, containers, and serverless",
    5: "AI and machine learning integration",
}


def clean(text):
    return re.sub(r"\s+", " ", text.replace("`", "").replace("*", "")).strip()


def main():
    source = Path(sys.argv[1]).read_text()
    question_part, answer_part = source.split("## Answer Key & Brief Explanations", 1)
    answers = {}
    for match in re.finditer(r"(?m)^(\d+)\.\s+\*\*([A-F])\*\*\s+—\s+(.*?)(?=^\d+\.\s+\*\*|\Z)", answer_part, re.S):
        explanation = re.sub(r"^\*.*?\*\s+", "", match.group(3), count=1, flags=re.S)
        answers[int(match.group(1))] = (match.group(2).lower(), clean(explanation))

    sections = list(re.finditer(r"### Section (\d+): ([^\n]+)", question_part))
    questions = []
    for match in re.finditer(r"#### Question (\d+)\s+(.*?)(?=#### Question|\Z)", question_part, re.S):
        number = int(match.group(1))
        body = match.group(2)
        option_matches = list(re.finditer(r"(?m)^\* ([A-F])\. (.+)$", body))
        prompt = clean(body[: option_matches[0].start()])
        options = [{"id": item.group(1).lower(), "text": clean(item.group(2))} for item in option_matches]
        section_number = max(int(section.group(1)) for section in sections if section.start() < match.start())
        correct, explanation = answers[number]
        questions.append({
            "id": f"gcp-g{number:02d}",
            "domain": DOMAIN_BY_QUESTION[number],
            "type": "single",
            "prompt": prompt,
            "options": options,
            "correct": [correct],
            "explanation": explanation,
            "objective": OBJECTIVE_BY_SECTION[section_number],
            "difficulty": "advanced",
            "source": "Gemini contributed set",
        })

    by_id = {question["id"]: question for question in questions}
    by_id["gcp-g01"]["options"][3]["text"] = "Hyperdisk Balanced configured with multi-writer mode."
    by_id["gcp-g01"]["correct"] = ["d"]
    by_id["gcp-g01"]["explanation"] = "Hyperdisk Balanced multi-writer mode is the recommended shared block-storage option for clustered applications. Persistent Disk multi-writer is a limited Preview capability."
    by_id["gcp-g13"]["prompt"] = by_id["gcp-g13"]["prompt"].replace("connected connected", "connected")
    by_id["gcp-g29"]["prompt"] = "You want to grant temporary, time-bound access to a third-party contractor to view a specific Cloud Storage object without adding them permanently to your corporate identity or IAM configuration. What is the best method?"
    by_id["gcp-g29"]["options"][1]["text"] = "Generate a Signed URL for the specific object with an expiration time."
    by_id["gcp-g30"]["options"][2]["text"] = "Configure the compute.vmExternalIpAccess Organization Policy constraint at the root folder or organization level."
    by_id["gcp-g30"]["explanation"] = "The compute.vmExternalIpAccess Organization Policy constraint restricts which VM instances may use external IPv4 addresses across the resource hierarchy."

    output = "// Generated from the user-provided Gemini PCA practice set.\n"
    output += "export const geminiQuestions = "
    output += json.dumps(questions, ensure_ascii=True, indent=2)
    output += ";\n"
    print(output)


if __name__ == "__main__":
    main()
