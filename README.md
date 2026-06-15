# Cloud Certification Flashcard Trainer

A self-contained local web app for cloud certification practice and study.

The current content focuses on the **Google Cloud Professional Cloud Architect
(PCA)** exam. The app includes realistic exam simulations, harder architecture
drills, post-exam AI coaching, and a service atlas for learning when to use major
Google Cloud services.

Everything runs locally in a Docker container. Optional AI tutoring uses a native
Ollama instance on the host machine, so study data stays local.

## Features

- GCP Professional Cloud Architect practice modes
- Timed multiple-choice and multiple-select sessions
- Randomized question order and randomized answer order
- Case-study style questions with split-screen context
- Domain-level scoring and answer explanations
- Local AI post-exam debrief with study recommendations
- GCP Service Atlas grouped by technology domains
- Service comparison cards such as Bigtable vs BigQuery
- Local AI tutor for services and service comparisons
- Extensible structure for future AWS and Azure exam/service packs

## Practice Modes

The GCP PCA pack currently provides:

- **Condensed simulation**: 40 core questions with official-style domain weighting
- **Quick drill**: 10 mixed questions from core and expanded banks
- **Case study sprint**: case-study questions only
- **Hardcore architect**: 20 tougher, high-ambiguity architecture scenarios
- **Expanded challenge**: 50 additional contributed PCA scenarios

Hardcore mode focuses on multi-constraint best-answer reasoning, plausible
distractors, production troubleshooting, migration sequencing, governance,
resilience, security, and AI architecture.

## Service Atlas

The Service Atlas is a study mode for learning cloud services by domain.

The initial GCP atlas includes domains such as:

- Compute and Containers
- Data, Analytics, and Databases
- Storage
- AI and Machine Learning
- DevOps and Developer Tools
- Networking and Delivery
- Security, Identity, and Governance
- Operations and Management
- Migration and Modernization

Each service card includes:

- What the service is for
- Key characteristics
- When to use it
- When to avoid it
- Exam signals
- What makes it unique in the GCP portfolio
- Rough AWS and Azure equivalents
- Official Google Cloud docs link

The atlas also includes comparison cards, for example:

- Bigtable vs BigQuery
- Cloud Run vs GKE
- Cloud SQL vs Spanner
- Cloud Build vs Cloud Deploy
- IAM vs VPC Service Controls
- Cloud Storage vs Filestore
- Persistent Disk vs Hyperdisk
- Storage Transfer Service vs Transfer Appliance
- Model Garden vs Model Registry
- Migration Center vs Migrate to VMs

## Local AI Tutor

If Ollama is running locally, the app can use `llama3.1:8b` for:

- Post-exam mistake analysis
- Personalized study recommendations
- Exam technique feedback
- Service explanations in the Service Atlas
- Short tutoring summaries for service comparisons

Start Ollama separately on the Mac host:

```bash
ollama run llama3.1:8b
```

The Docker container proxies only the local Ollama generate endpoint through
`/ollama/api/generate`. No cloud API key is required.

If Ollama is not running, the app still works. AI panels show a retry message.

## Run Locally

```bash
docker compose up --build
```

Open:

```text
http://localhost:8088
```

Use a different host port:

```bash
PORT=9000 docker compose up --build
```

The container binds to `127.0.0.1` by default.

## Project Structure

```text
.
├── Dockerfile
├── compose.yaml
├── nginx.conf
├── scripts/
│   └── import_gemini_questions.py
└── src/
    ├── app.js
    ├── index.html
    ├── styles.css
    ├── exams/
    │   ├── gcp-pca.js
    │   ├── gemini-pca.js
    │   ├── index.js
    │   └── schema.js
    └── services/
        ├── gcp-services.js
        └── index.js
```

## Extend Exams

Exam packs live in `src/exams/`.

To add another exam:

1. Create a new exam module following the shape in `src/exams/schema.js`.
2. Import it in `src/exams/index.js`.
3. Keep provider-specific content in data modules, not in the quiz engine.

The UI is designed so future AWS and Azure certification packs can be added
without rewriting quiz behavior.

## Extend Service Atlases

Service-atlas packs live in `src/services/`.

The current atlas starts with GCP, but the data shape is provider-neutral. Future
AWS and Azure atlases can use the same fields:

- domains
- services
- purpose
- characteristics
- use/avoid guidance
- exam signals
- unique differentiators
- cross-cloud equivalents
- comparisons

## Content Notes

The questions are original practice material or user-contributed generated
practice content. They are not real exam dumps.

Hardcore scenarios are informed by public Google Cloud guidance, especially:

- [Professional Cloud Architect exam guide](https://cloud.google.com/learn/certification/guides/professional-cloud-architect)
- [Google Cloud Well-Architected Framework](https://cloud.google.com/architecture/framework)
- [Disaster recovery planning guide](https://cloud.google.com/architecture/dr-scenarios-planning-guide)
- [Google Cloud Architecture Center](https://cloud.google.com/architecture)
- [Google Cloud products](https://cloud.google.com/products)

This project is independent and is not affiliated with Google, Amazon, Microsoft,
or any certification provider.
