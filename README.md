# Cloud Architect Exam Lab

A self-contained, dependency-free web app for realistic cloud certification practice.
The initial content pack targets the Google Cloud Professional Cloud Architect
standard exam.

The GCP pack also includes a separate 20-question **Hardcore architect** mode.
These questions emphasize ambiguous best-answer decisions, multi-constraint
trade-offs, and advanced topics from the current PCA guide and Google Cloud
Well-Architected Framework. The active hardcore bank uses longer, higher-ambiguity
scenarios with plausible distractors and choose-two/choose-three formats. Question
and answer-option order are randomized independently for every session.

The **Expanded challenge** mode contains 50 additional questions contributed by
the user from a Gemini-generated PCA set. They are isolated as their own pool,
while Quick drill can draw from both the core and contributed banks.

## Run

```bash
docker compose up --build
```

Open `http://localhost:8088`.

The results page automatically requests a personalized review from a native Ollama
instance running on the Mac host. It expects `llama3.1:8b` on Ollama's default
port (`11434`). All coaching data stays local.

```bash
ollama run llama3.1:8b
```

To use another host port:

```bash
PORT=9000 docker compose up --build
```

You can also open `src/index.html` directly for local development.

## Extend

Exam packs live in `src/exams/`. Add a module that follows the shape documented in
`src/exams/schema.js`, import it in `src/exams/index.js`, and it will appear on the
home screen. The quiz engine and UI contain no provider-specific logic.

Service-atlas packs live in `src/services/`. The first pack covers GCP services
by domain, official docs links, exam signals, and comparisons such as Bigtable vs
BigQuery or Cloud Run vs GKE. The local Ollama tutor can explain the selected
service or comparison in PCA-oriented language.

The questions are original practice material, not real exam questions or dumps.

## Content references

Hardcore-mode scenarios are original questions informed by public Google Cloud
guidance, especially:

- [Professional Cloud Architect exam guide](https://cloud.google.com/learn/certification/guides/professional-cloud-architect)
- [Google Cloud Well-Architected Framework](https://cloud.google.com/architecture/framework)
- [Disaster recovery planning guide](https://cloud.google.com/architecture/dr-scenarios-planning-guide)
- [Google Cloud Architecture Center](https://cloud.google.com/architecture)
