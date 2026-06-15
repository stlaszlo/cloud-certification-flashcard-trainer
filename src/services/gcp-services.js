export const gcpServiceAtlas = {
  id: "gcp",
  provider: "Google Cloud",
  domains: [
    {
      id: "compute",
      name: "Compute and Containers",
      summary: "Where application code runs: VMs, containers, serverless containers, and Kubernetes.",
      services: [
        {
          id: "cloud-run",
          name: "Cloud Run",
          alsoKnownAs: ["serverless containers"],
          purpose: "Run stateless containers and functions on a fully managed serverless platform.",
          characteristics: ["Scales based on requests or events", "Can scale to zero", "Supports containers, jobs, and functions", "Good fit for HTTP APIs, event handlers, workers, and batch jobs"],
          useWhen: ["You want minimal operations", "Traffic is spiky or unpredictable", "The workload is stateless or externalizes state"],
          avoidWhen: ["You need deep node-level control", "You need long-running tightly coupled cluster workloads"],
          examSignals: ["scale to zero", "fully managed containers", "spiky traffic", "event-driven service"],
          docs: "https://cloud.google.com/run/docs/overview/what-is-cloud-run"
        },
        {
          id: "gke",
          name: "Google Kubernetes Engine",
          alsoKnownAs: ["GKE"],
          purpose: "Run containerized applications on managed Kubernetes.",
          characteristics: ["Autopilot reduces cluster operations", "Standard gives more node and cluster control", "Supports multi-cluster and enterprise Kubernetes patterns", "Works well for complex microservice platforms"],
          useWhen: ["You need Kubernetes APIs or ecosystem tools", "You run many services with service mesh or platform controls", "You need workload portability"],
          avoidWhen: ["A single stateless service would fit Cloud Run", "The team does not want Kubernetes operations"],
          examSignals: ["Kubernetes", "custom node pools", "multi-tenant cluster", "network policies", "service mesh"],
          docs: "https://cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview"
        },
        {
          id: "compute-engine",
          name: "Compute Engine",
          purpose: "Run virtual machines with full OS, disk, and network control.",
          characteristics: ["Many machine families", "Persistent Disk, Hyperdisk, Local SSD support", "Managed instance groups and autoscaling", "Best for lift-and-shift and OS-specific needs"],
          useWhen: ["You need VM-level control", "Commercial software requires specific OS or licensing", "You are migrating without redesigning first"],
          avoidWhen: ["A managed serverless or container platform satisfies the requirement"],
          examSignals: ["legacy VM", "custom kernel", "licensed software", "managed instance group"],
          docs: "https://cloud.google.com/compute/docs/overview"
        }
      ]
    },
    {
      id: "data",
      name: "Data, Analytics, and Databases",
      summary: "Where data is stored, queried, streamed, and transformed.",
      services: [
        {
          id: "bigquery",
          name: "BigQuery",
          purpose: "Serverless enterprise data warehouse for analytical SQL over large datasets.",
          characteristics: ["Columnar analytics engine", "Separates storage and compute", "Supports streaming ingestion, partitioning, clustering, ML, and governance", "Optimized for scans, aggregations, BI, and analytics"],
          useWhen: ["Analysts need SQL over terabytes or petabytes", "Workload is analytical rather than transactional", "You need managed data warehouse scale"],
          avoidWhen: ["You need low-latency row lookups for serving traffic", "You need high-volume single-row mutations"],
          examSignals: ["data warehouse", "analytics", "BI", "petabyte SQL", "partition and cluster"],
          docs: "https://cloud.google.com/bigquery/docs/introduction"
        },
        {
          id: "bigtable",
          name: "Bigtable",
          alsoKnownAs: ["Cloud Bigtable"],
          purpose: "Low-latency wide-column NoSQL database for massive operational and time-series workloads.",
          characteristics: ["Very high throughput", "Single-digit millisecond access at scale", "Sparse wide-column model", "Strong fit for time-series, IoT, telemetry, adtech, and operational analytics"],
          useWhen: ["You need low-latency key/range lookups at huge scale", "Data is time-series or naturally keyed", "Schema is sparse or wide-column"],
          avoidWhen: ["You need ad hoc SQL analytics", "You need relational joins or transactions across rows"],
          examSignals: ["IoT telemetry", "time-series", "millions of writes", "low-latency operational dashboard"],
          docs: "https://cloud.google.com/bigtable/docs/overview"
        },
        {
          id: "spanner",
          name: "Spanner",
          purpose: "Horizontally scalable relational database with strong consistency and high availability.",
          characteristics: ["SQL relational model", "Strong consistency", "Horizontal scale", "Regional and multi-region configurations"],
          useWhen: ["You need relational transactions at global or massive scale", "You need strong consistency across regions", "Cloud SQL cannot scale far enough"],
          avoidWhen: ["A simple regional relational workload fits Cloud SQL", "The workload is pure analytics better suited to BigQuery"],
          examSignals: ["global ACID", "horizontal relational scale", "strong consistency", "multi-region writes"],
          docs: "https://cloud.google.com/spanner/docs/overview"
        },
        {
          id: "cloud-sql",
          name: "Cloud SQL",
          purpose: "Managed MySQL, PostgreSQL, and SQL Server for conventional relational applications.",
          characteristics: ["Managed backups, patching, HA, and replicas", "Familiar engines", "Best for regional transactional systems", "Vertical scaling and read replicas"],
          useWhen: ["You need standard MySQL, PostgreSQL, or SQL Server", "Application expects a traditional relational database", "Scale is moderate"],
          avoidWhen: ["You need global relational scale or extremely high write throughput"],
          examSignals: ["managed PostgreSQL", "SQL Server", "read replicas", "lift-and-shift relational app"],
          docs: "https://cloud.google.com/sql/docs/introduction"
        },
        {
          id: "cloud-storage",
          name: "Cloud Storage",
          purpose: "Durable object storage for files, backups, data lakes, media, and static content.",
          characteristics: ["Object storage, not a filesystem", "Storage classes and Autoclass", "Lifecycle policies", "Strong durability and global access patterns"],
          useWhen: ["You need object storage", "You store media, backups, logs, or data lake files", "You need lifecycle-based cost control"],
          avoidWhen: ["You need POSIX file locking or block storage semantics"],
          examSignals: ["object storage", "bucket", "lifecycle", "retention policy", "signed URL"],
          docs: "https://cloud.google.com/storage/docs/introduction"
        }
      ]
    },
    {
      id: "ai",
      name: "AI and Machine Learning",
      summary: "Build, ground, deploy, monitor, and govern AI and ML workloads.",
      services: [
        {
          id: "vertex-ai",
          name: "Vertex AI",
          purpose: "Unified platform for machine learning models, generative AI, training, deployment, evaluation, and MLOps.",
          characteristics: ["Model Garden and Model Registry", "Custom training and endpoints", "Pipelines and metadata lineage", "Vector Search, Agent Builder, and Gemini integration"],
          useWhen: ["You need managed ML or generative AI lifecycle", "You need model deployment and monitoring", "You need enterprise AI governance"],
          avoidWhen: ["A simple SQL-based ML task fits BigQuery ML", "You only need prebuilt API classification"],
          examSignals: ["model registry", "custom training", "RAG", "vector search", "model monitoring", "pipelines"],
          docs: "https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform"
        },
        {
          id: "vertex-ai-search",
          name: "Vertex AI Search",
          purpose: "Create search and retrieval experiences over enterprise data, often used to ground generative AI responses.",
          characteristics: ["Managed retrieval", "Connectors and data stores", "Can support RAG architectures", "Useful for enterprise knowledge discovery"],
          useWhen: ["You need grounded answers over documents or websites", "You want managed retrieval instead of building search from scratch"],
          avoidWhen: ["You need low-level custom vector index control only"],
          examSignals: ["RAG", "grounding", "enterprise search", "product manuals"],
          docs: "https://cloud.google.com/generative-ai-app-builder/docs/enterprise-search-introduction"
        },
        {
          id: "vector-search",
          name: "Vertex AI Vector Search",
          purpose: "Serve low-latency nearest-neighbor search over embeddings.",
          characteristics: ["Vector index and similarity matching", "Supports semantic search and recommendations", "Commonly paired with embeddings and RAG"],
          useWhen: ["You need semantic similarity over large catalogs or documents", "You control embedding generation and retrieval logic"],
          avoidWhen: ["Traditional SQL filtering or BI is the actual requirement"],
          examSignals: ["embeddings", "similarity search", "semantic catalog search", "nearest neighbor"],
          docs: "https://cloud.google.com/vertex-ai/docs/vector-search/overview"
        }
      ]
    },
    {
      id: "devops",
      name: "DevOps and Developer Tools",
      summary: "Build, release, deploy, and operate software delivery pipelines.",
      services: [
        {
          id: "cloud-build",
          name: "Cloud Build",
          purpose: "Run builds and automation steps in containers.",
          characteristics: ["CI automation", "Build triggers", "Integrates with Artifact Registry", "Can produce provenance and attestations"],
          useWhen: ["You need repeatable builds", "You need image builds, tests, or infrastructure automation"],
          avoidWhen: ["You need progressive delivery orchestration by itself"],
          examSignals: ["build container", "CI", "build trigger", "vulnerability scan"],
          docs: "https://cloud.google.com/build/docs/overview"
        },
        {
          id: "cloud-deploy",
          name: "Cloud Deploy",
          purpose: "Managed continuous delivery to GKE and Cloud Run.",
          characteristics: ["Delivery pipelines and targets", "Promotion between environments", "Approvals and rollout control", "Supports progressive release workflows"],
          useWhen: ["You need release promotion, approvals, or rollout management", "You deploy to GKE or Cloud Run"],
          avoidWhen: ["You only need to compile or test code"],
          examSignals: ["promotion", "approval", "delivery pipeline", "rollback", "GKE and Cloud Run deploy"],
          docs: "https://cloud.google.com/deploy/docs/overview"
        },
        {
          id: "artifact-registry",
          name: "Artifact Registry",
          purpose: "Store and manage container images and language packages.",
          characteristics: ["Regional or multi-regional repositories", "Vulnerability scanning integration", "Supports container and package formats", "Replaces older Container Registry patterns"],
          useWhen: ["You need a secure image or package repository", "You need CI/CD artifact storage"],
          avoidWhen: ["You need runtime orchestration rather than artifact storage"],
          examSignals: ["container image repository", "package repository", "vulnerability scanning"],
          docs: "https://cloud.google.com/artifact-registry/docs/overview"
        }
      ]
    },
    {
      id: "networking",
      name: "Networking and Delivery",
      summary: "Connect users, services, VPCs, hybrid networks, and private endpoints.",
      services: [
        {
          id: "cloud-load-balancing",
          name: "Cloud Load Balancing",
          purpose: "Distribute traffic globally or regionally across healthy backends.",
          characteristics: ["External and internal load balancers", "Global anycast options", "HTTP(S), TCP, UDP, and proxy patterns", "Works with Cloud Armor and CDN"],
          useWhen: ["You need a resilient frontend", "You need traffic steering across regions", "You need managed health checks"],
          avoidWhen: ["DNS-only routing is sufficient and health-aware load balancing is not needed"],
          examSignals: ["global anycast IP", "closest healthy backend", "health checks", "multi-region service"],
          docs: "https://cloud.google.com/load-balancing/docs/load-balancing-overview"
        },
        {
          id: "cloud-armor",
          name: "Cloud Armor",
          purpose: "Protect internet-facing applications with WAF and DDoS defenses.",
          characteristics: ["WAF rules", "DDoS protection", "IP and geo controls", "Adaptive protection options"],
          useWhen: ["You expose apps through supported external load balancers", "You need edge security controls"],
          avoidWhen: ["You need pod-to-pod network isolation inside a cluster"],
          examSignals: ["DDoS", "WAF", "SQL injection", "edge policy"],
          docs: "https://cloud.google.com/armor/docs/cloud-armor-overview"
        },
        {
          id: "cloud-interconnect",
          name: "Cloud Interconnect",
          purpose: "Private, high-throughput connectivity between on-premises networks and Google Cloud.",
          characteristics: ["Dedicated and Partner options", "VLAN attachments", "Cloud Router for dynamic routing", "99.99% designs require redundant attachments across metros and edge domains"],
          useWhen: ["You need private predictable hybrid connectivity", "Bandwidth and latency matter", "Traffic should not traverse the public internet"],
          avoidWhen: ["A fast-to-deploy encrypted internet tunnel is enough"],
          examSignals: ["private connection", "low latency", "99.99%", "two metros", "Dedicated Interconnect"],
          docs: "https://cloud.google.com/network-connectivity/docs/interconnect/concepts/overview"
        },
        {
          id: "private-service-connect",
          name: "Private Service Connect",
          alsoKnownAs: ["PSC"],
          purpose: "Privately consume services across VPCs, organizations, or Google APIs without full network peering.",
          characteristics: ["Service-centric private connectivity", "Works across overlapping address spaces", "Producer and consumer model", "Can expose Google APIs privately"],
          useWhen: ["You need private service access without peering", "VPC IP ranges overlap", "Independent organizations need private service consumption"],
          avoidWhen: ["You need full bidirectional network connectivity between VPCs"],
          examSignals: ["overlapping IP ranges", "private service endpoint", "no VPC peering", "cross-organization private access"],
          docs: "https://cloud.google.com/vpc/docs/private-service-connect"
        }
      ]
    },
    {
      id: "security",
      name: "Security, Identity, and Governance",
      summary: "Control identities, protect data, enforce guardrails, and monitor posture.",
      services: [
        {
          id: "iam",
          name: "Identity and Access Management",
          alsoKnownAs: ["IAM"],
          purpose: "Grant and govern access to Google Cloud resources.",
          characteristics: ["Allow policies with roles and principals", "Predefined and custom roles", "Service accounts and impersonation", "Least privilege through scoped bindings"],
          useWhen: ["You need to control who or what can use resources", "You need workload identities or service accounts"],
          avoidWhen: ["You need a network perimeter or data exfiltration boundary by itself"],
          examSignals: ["least privilege", "service account", "impersonation", "custom role"],
          docs: "https://cloud.google.com/iam/docs/overview"
        },
        {
          id: "vpc-service-controls",
          name: "VPC Service Controls",
          purpose: "Create service perimeters that reduce data exfiltration risk for supported Google Cloud services.",
          characteristics: ["Perimeters around projects and services", "Access levels and ingress/egress rules", "Defense in depth beyond IAM", "Important for BigQuery and Cloud Storage exfiltration scenarios"],
          useWhen: ["You need to reduce exfiltration to unauthorized projects", "Regulated data sits in managed Google services"],
          avoidWhen: ["You only need user-level authorization or VM firewalling"],
          examSignals: ["data exfiltration", "service perimeter", "BigQuery to outside project", "regulated data"],
          docs: "https://cloud.google.com/vpc-service-controls/docs/overview"
        },
        {
          id: "security-command-center",
          name: "Security Command Center",
          alsoKnownAs: ["SCC"],
          purpose: "Centralized security posture, vulnerability, misconfiguration, and threat finding platform.",
          characteristics: ["Findings across organization resources", "Misconfiguration detection", "Threat and vulnerability visibility", "Compliance posture use cases"],
          useWhen: ["You need a centralized security view", "You need to detect public buckets, risky IAM, or vulnerabilities"],
          avoidWhen: ["You need to enforce an access decision in real time"],
          examSignals: ["CIS benchmark", "misconfiguration", "security posture", "findings"],
          docs: "https://cloud.google.com/security-command-center/docs/concepts-security-command-center-overview"
        },
        {
          id: "cloud-kms",
          name: "Cloud KMS",
          purpose: "Manage cryptographic keys for encryption and signing.",
          characteristics: ["Software and HSM-backed keys", "CMEK integrations", "External Key Manager support", "Key lifecycle and IAM controls"],
          useWhen: ["You need customer-managed key control", "You need key rotation, destruction, or external key requirements"],
          avoidWhen: ["Default Google-managed encryption already satisfies the requirement"],
          examSignals: ["CMEK", "EKM", "HSM", "customer controls keys"],
          docs: "https://cloud.google.com/kms/docs"
        }
      ]
    },
    {
      id: "operations",
      name: "Operations and Management",
      summary: "Observe, troubleshoot, govern, and manage cost and reliability.",
      services: [
        {
          id: "cloud-monitoring",
          name: "Cloud Monitoring",
          purpose: "Collect metrics, define dashboards, and alert on system health.",
          characteristics: ["Metrics scopes", "Alerting policies", "SLO monitoring", "Uptime checks and dashboards"],
          useWhen: ["You need metrics, alerts, or SLO visibility", "You need operational dashboards"],
          avoidWhen: ["You need logs or traces as the primary signal"],
          examSignals: ["SLO", "alert policy", "uptime check", "dashboard"],
          docs: "https://cloud.google.com/monitoring/docs/monitoring-overview"
        },
        {
          id: "cloud-logging",
          name: "Cloud Logging",
          purpose: "Collect, route, query, retain, and export logs.",
          characteristics: ["Log buckets and sinks", "Aggregated sinks", "Audit log routing", "Log-based metrics"],
          useWhen: ["You need audit evidence or application logs", "You need centralized log export"],
          avoidWhen: ["Metrics alone are enough for alerting"],
          examSignals: ["aggregated sink", "audit logs", "log retention", "log router"],
          docs: "https://cloud.google.com/logging/docs/overview"
        },
        {
          id: "cloud-billing",
          name: "Cloud Billing",
          purpose: "Manage billing accounts, budgets, reports, and cost exports.",
          characteristics: ["Budgets and alerts", "Billing export to BigQuery", "Labels for allocation", "Cost reports"],
          useWhen: ["Finance needs visibility", "You need chargeback or showback", "You need cost anomaly investigation"],
          avoidWhen: ["You need a hard spending cap for all resources"],
          examSignals: ["cost visibility", "billing export", "labels", "budget alert"],
          docs: "https://cloud.google.com/billing/docs"
        }
      ]
    }
  ],
  comparisons: [
    {
      id: "bigtable-vs-bigquery",
      title: "Bigtable vs BigQuery",
      domainId: "data",
      serviceIds: ["bigtable", "bigquery"],
      summary: "Bigtable serves low-latency operational access at huge scale; BigQuery analyzes large datasets with SQL.",
      choose: [
        "Choose Bigtable for high-throughput time-series, IoT, telemetry, and key/range access patterns.",
        "Choose BigQuery for BI, ad hoc SQL analytics, data warehousing, and large scans or aggregations.",
        "A common architecture streams events into both: Bigtable for operational dashboards and BigQuery for historical analytics."
      ],
      examTrap: "If the stem says analysts need SQL over petabytes, it is usually BigQuery. If it says millions of devices, small writes, low-latency operational reads, and keyed time-series, it is usually Bigtable."
    },
    {
      id: "cloud-run-vs-gke",
      title: "Cloud Run vs GKE",
      domainId: "compute",
      serviceIds: ["cloud-run", "gke"],
      summary: "Cloud Run minimizes platform operations for containers; GKE gives Kubernetes control and ecosystem depth.",
      choose: [
        "Choose Cloud Run for stateless HTTP or event-driven services with spiky traffic and minimal operations.",
        "Choose GKE when Kubernetes APIs, multi-service platform controls, custom networking, or node-level choices matter.",
        "GKE Autopilot sits between the two: Kubernetes API with less node management."
      ],
      examTrap: "Do not pick GKE only because the app is containerized. If the requirement is serverless, scale to zero, and minimal ops, Cloud Run is the cleaner answer."
    },
    {
      id: "cloud-sql-vs-spanner",
      title: "Cloud SQL vs Spanner",
      domainId: "data",
      serviceIds: ["cloud-sql", "spanner"],
      summary: "Cloud SQL is managed traditional relational database; Spanner is relational scale with strong consistency.",
      choose: [
        "Choose Cloud SQL for conventional MySQL, PostgreSQL, or SQL Server workloads.",
        "Choose Spanner for horizontal relational scale, strong consistency, high availability, or global transactions.",
        "Read replicas help Cloud SQL read scale, but they do not turn it into globally consistent multi-region relational infrastructure."
      ],
      examTrap: "If the stem combines relational, global, strong consistency, and horizontal scale, Spanner is usually the intended answer."
    },
    {
      id: "cloud-build-vs-cloud-deploy",
      title: "Cloud Build vs Cloud Deploy",
      domainId: "devops",
      serviceIds: ["cloud-build", "cloud-deploy"],
      summary: "Cloud Build builds and automates steps; Cloud Deploy manages release promotion and rollout.",
      choose: [
        "Choose Cloud Build for CI, tests, image builds, and automation steps.",
        "Choose Cloud Deploy for continuous delivery pipelines, approvals, environment promotion, and rollout control.",
        "Use both together for a complete CI/CD workflow."
      ],
      examTrap: "Build is not deploy orchestration. If approvals and promotion through environments are central, think Cloud Deploy."
    },
    {
      id: "iam-vs-vpcsc",
      title: "IAM vs VPC Service Controls",
      domainId: "security",
      serviceIds: ["iam", "vpc-service-controls"],
      summary: "IAM controls who can access; VPC Service Controls reduces where protected service data can move.",
      choose: [
        "Choose IAM for principal/resource permissions and least privilege.",
        "Add VPC Service Controls when the scenario worries about exfiltration from supported services to outside projects.",
        "Use both for regulated data: IAM for authorization, VPC SC for perimeter defense."
      ],
      examTrap: "Audit logs detect; IAM allows or denies principals; VPC SC is the perimeter control for exfiltration-style stems."
    }
  ]
};

const storageDomain = {
  id: "storage",
  name: "Storage",
  summary: "Block, object, file, local, and backup storage choices for applications and data protection.",
  services: [
    {
      id: "cloud-storage-object",
      name: "Cloud Storage",
      purpose: "Durable object storage for unstructured data, data lakes, media, backups, and static assets.",
      unique: "Cloud Storage is the default GCP object store: globally accessible, deeply integrated, strongly durable, and governed through buckets, IAM, retention, lifecycle, and storage classes rather than file or block semantics.",
      equivalents: { aws: "Amazon S3", azure: "Azure Blob Storage" },
      characteristics: ["Object storage with buckets and objects", "Storage classes, Autoclass, lifecycle rules, retention policies, and signed URLs", "Common foundation for data lakes, backups, ML datasets, and static content"],
      useWhen: ["You need object storage", "You need lifecycle-based cost control", "You need temporary access through signed URLs", "You need immutable retention or compliance storage"],
      avoidWhen: ["You need POSIX file locking", "You need boot disks or low-latency block I/O"],
      examSignals: ["bucket", "object lifecycle", "signed URL", "retention policy", "data lake files"],
      docs: "https://cloud.google.com/storage/docs/introduction"
    },
    {
      id: "filestore",
      name: "Filestore",
      purpose: "Managed NFS file storage for applications that need shared POSIX-style files.",
      unique: "Filestore is the GCP answer when the requirement is a real shared filesystem, not object storage and not block disk. It exists for lift-and-shift apps, file locks, NFS semantics, and multi-client file access.",
      equivalents: { aws: "Amazon EFS or FSx for NetApp ONTAP", azure: "Azure Files or Azure NetApp Files" },
      characteristics: ["Managed NFS shares", "Shared file access from Compute Engine and GKE", "Enterprise tier supports high availability patterns", "Useful for legacy applications requiring filesystem semantics"],
      useWhen: ["Multiple VMs or pods need shared files", "The app expects POSIX-ish file behavior or file locking", "You are migrating an NFS-backed workload"],
      avoidWhen: ["You only need object storage", "You need VM boot disks or database block storage"],
      examSignals: ["NFS", "shared filesystem", "file locking", "POSIX", "legacy shared files"],
      docs: "https://cloud.google.com/filestore/docs/overview"
    },
    {
      id: "persistent-disk",
      name: "Persistent Disk",
      purpose: "Durable network block storage for Compute Engine VMs and GKE nodes.",
      unique: "Persistent Disk is the general-purpose block storage baseline for VMs: reliable, snapshot-friendly, and independent of VM lifecycle, but not a shared filesystem.",
      equivalents: { aws: "Amazon EBS", azure: "Azure Managed Disks" },
      characteristics: ["Zonal and regional disk options", "Snapshots and resize support", "Good default for boot and data disks", "Attached to VM instances as block devices"],
      useWhen: ["You need durable VM block storage", "You need snapshots or regional disk HA", "A VM or GKE node needs attached disk"],
      avoidWhen: ["You need object storage", "Many clients need writable shared file access"],
      examSignals: ["boot disk", "data disk", "snapshot", "regional persistent disk", "block storage"],
      docs: "https://cloud.google.com/compute/docs/disks"
    },
    {
      id: "hyperdisk",
      name: "Hyperdisk",
      purpose: "Next-generation block storage with tunable performance for demanding Compute Engine workloads.",
      unique: "Hyperdisk separates performance provisioning from capacity more explicitly than classic Persistent Disk, which makes it the exam signal for very high or precisely tuned IOPS/throughput needs.",
      equivalents: { aws: "Amazon EBS io2/io2 Block Express", azure: "Azure Ultra Disk Storage or Premium SSD v2" },
      characteristics: ["Provisioned IOPS and throughput options", "Extreme and Balanced variants", "Designed for demanding databases and high-performance workloads", "Some modes support multi-writer use cases"],
      useWhen: ["The workload has explicit IOPS or throughput targets", "You need higher block performance than standard disk choices", "Database performance is the bottleneck"],
      avoidWhen: ["Basic VM storage is enough", "You need object or NFS storage"],
      examSignals: ["100,000 IOPS", "tunable block performance", "Hyperdisk Extreme", "multi-writer block storage"],
      docs: "https://cloud.google.com/compute/docs/disks/hyperdisks"
    },
    {
      id: "local-ssd",
      name: "Local SSD",
      purpose: "Very fast ephemeral storage physically attached to a VM host.",
      unique: "Local SSD trades durability for speed. It is for scratch, cache, or replicated workloads where losing the disk when the VM stops or fails is acceptable.",
      equivalents: { aws: "EC2 instance store", azure: "Temporary local SSD or NVMe storage on selected VM sizes" },
      characteristics: ["Lowest-latency local disk option", "Ephemeral and tied to VM lifecycle", "Useful for caches, scratch data, and replicated databases", "Not durable storage"],
      useWhen: ["You need very fast temporary disk", "Data can be rebuilt or replicated elsewhere", "The workload is performance-bound and fault-tolerant"],
      avoidWhen: ["Data must survive VM stop or host failure", "You need managed backup and snapshots"],
      examSignals: ["scratch", "cache", "ephemeral", "highest local I/O", "data can be recreated"],
      docs: "https://cloud.google.com/compute/docs/disks/local-ssd"
    },
    {
      id: "backup-dr",
      name: "Backup and DR Service",
      purpose: "Centralized backup and disaster recovery management for supported workloads.",
      unique: "Backup and DR Service is the portfolio-level data-protection product, distinct from individual snapshots or application-native backup scripts.",
      equivalents: { aws: "AWS Backup", azure: "Azure Backup" },
      characteristics: ["Policy-driven backup management", "Centralized protection and recovery workflows", "Supports VM and application-aware backup patterns", "Useful for governance and operational recovery"],
      useWhen: ["You need centralized backup policy", "Multiple workloads need consistent protection", "Recovery management matters more than one-off snapshots"],
      avoidWhen: ["A simple one-off snapshot lifecycle is enough", "The requirement is high availability rather than restore after loss"],
      examSignals: ["centralized backup", "restore testing", "DR governance", "ransomware recovery"],
      docs: "https://cloud.google.com/backup-disaster-recovery/docs/concepts/overview"
    }
  ]
};

const migrationDomain = {
  id: "migration",
  name: "Migration and Modernization",
  summary: "Assess, move, transform, and validate workloads and data during cloud migration programs.",
  services: [
    {
      id: "migration-center",
      name: "Migration Center",
      purpose: "Discover, assess, and plan migrations to Google Cloud.",
      unique: "Migration Center is the assessment and planning front door: it helps turn an estate inventory into migration waves and business cases before tools start moving workloads.",
      equivalents: { aws: "Migration Hub", azure: "Azure Migrate" },
      characteristics: ["Asset discovery and assessment", "Migration planning", "Cost and fit analysis", "Portfolio-level visibility"],
      useWhen: ["You need inventory and dependency insight", "You are planning migration waves", "Leadership needs a fact-based business case"],
      avoidWhen: ["You already know exactly what to move and need an execution tool only"],
      examSignals: ["migration assessment", "inventory", "dependency mapping", "business case"],
      docs: "https://cloud.google.com/migration-center/docs"
    },
    {
      id: "migrate-to-vms",
      name: "Migrate to Virtual Machines",
      purpose: "Rehost VM workloads from on-premises or other clouds to Compute Engine.",
      unique: "This is the rehost workhorse. It targets faster infrastructure migration with minimal application change, useful when deadlines or risk argue against refactoring first.",
      equivalents: { aws: "Application Migration Service", azure: "Azure Migrate server migration" },
      characteristics: ["VM replication and cutover", "Lift-and-shift migration", "Testing before cutover", "Supports staged migrations"],
      useWhen: ["You need to exit a data center quickly", "The app can run as a VM on Compute Engine", "Modernization can wait until after migration"],
      avoidWhen: ["You need to containerize during migration", "You need database-specific schema conversion"],
      examSignals: ["rehost", "lift and shift", "VM migration", "data center exit"],
      docs: "https://cloud.google.com/migrate/virtual-machines/docs"
    },
    {
      id: "migrate-to-containers",
      name: "Migrate to Containers",
      purpose: "Convert eligible VM-based workloads into containers for GKE or Cloud Run targets.",
      unique: "Migrate to Containers sits between rehost and rewrite: it can help extract a workload into a container when full application redesign is not practical yet.",
      equivalents: { aws: "App2Container", azure: "App Containerization in Azure Migrate" },
      characteristics: ["Containerizes existing workloads", "Targets GKE and related runtimes", "Reduces manual rewrite effort", "Useful for modernization phases"],
      useWhen: ["You want containers with limited code change", "A VM workload is a candidate for GKE modernization", "You need a bridge from legacy runtime to containers"],
      avoidWhen: ["The app requires major redesign anyway", "A simple VM rehost meets the requirement"],
      examSignals: ["convert VM to container", "modernize monolith", "minimal rewrite", "Migrate to Containers"],
      docs: "https://cloud.google.com/migrate/containers/docs"
    },
    {
      id: "database-migration-service",
      name: "Database Migration Service",
      alsoKnownAs: ["DMS"],
      purpose: "Migrate databases to managed Google Cloud database services.",
      unique: "DMS is database-aware migration, so it belongs in questions about moving relational engines with replication and cutover rather than moving generic files or VMs.",
      equivalents: { aws: "AWS Database Migration Service", azure: "Azure Database Migration Service" },
      characteristics: ["Continuous replication patterns", "Supports homogeneous and selected heterogeneous migrations", "Targets Cloud SQL and AlloyDB use cases", "Reduces downtime during database cutover"],
      useWhen: ["You need database migration with low downtime", "You are moving to Cloud SQL or AlloyDB", "Cutover validation matters"],
      avoidWhen: ["You are transferring object files", "You are rehosting an entire VM"],
      examSignals: ["database cutover", "continuous replication", "Cloud SQL migration", "AlloyDB migration"],
      docs: "https://cloud.google.com/database-migration/docs"
    },
    {
      id: "storage-transfer-service",
      name: "Storage Transfer Service",
      purpose: "Move online data into Cloud Storage from clouds, HTTP sources, or file systems.",
      unique: "Storage Transfer Service is for recurring or large online object/file transfers; it is not the same as offline appliance seeding.",
      equivalents: { aws: "DataSync or S3 Batch Operations depending on source", azure: "Azure Data Factory copy activity or AzCopy-based workflows" },
      characteristics: ["Managed online transfer jobs", "Supports scheduling and recurring transfers", "Useful for Cloud Storage migration and synchronization", "Can complement Transfer Appliance"],
      useWhen: ["Data can move over the network", "You need recurring deltas", "Source is another cloud, HTTP endpoint, or file system"],
      avoidWhen: ["Network transfer cannot meet the deadline", "You need VM or database migration"],
      examSignals: ["recurring deltas", "online transfer", "Cloud Storage migration", "scheduled transfer"],
      docs: "https://cloud.google.com/storage-transfer/docs/overview"
    },
    {
      id: "transfer-appliance",
      name: "Transfer Appliance",
      purpose: "Offline appliance-based transfer for very large datasets when network transfer is too slow or constrained.",
      unique: "Transfer Appliance is the exam answer when the math says online transfer cannot meet the deadline. It solves the initial seed problem, not ongoing synchronization by itself.",
      equivalents: { aws: "AWS Snowball or Snowball Edge", azure: "Azure Data Box" },
      characteristics: ["Physical appliance", "Offline transfer to Google Cloud", "Good for petabyte-scale seeding", "Often paired with online deltas afterward"],
      useWhen: ["Network bandwidth cannot meet migration deadlines", "Initial data volume is huge", "You can ship encrypted hardware"],
      avoidWhen: ["Data changes constantly and only online replication is acceptable", "The data volume is small enough for network transfer"],
      examSignals: ["multi-petabyte", "six-week deadline", "limited bandwidth", "offline seed"],
      docs: "https://cloud.google.com/transfer-appliance/docs"
    }
  ]
};

const aiAdditions = [
  {
    id: "model-garden",
    name: "Vertex AI Model Garden",
    purpose: "Discover, evaluate, and access Google, partner, and open models for AI applications.",
    unique: "Model Garden is the model catalog layer of Vertex AI. It is what you choose when the question is about finding, selecting, or using foundation/open models rather than training infrastructure.",
    equivalents: { aws: "Amazon Bedrock model catalog and SageMaker JumpStart", azure: "Azure AI Foundry model catalog" },
    characteristics: ["Catalog of Google and third-party models", "Foundation and open model access", "Entry point for model selection", "Connects to Vertex AI deployment and tuning workflows"],
    useWhen: ["You need to select a foundation model", "You need access to Google, partner, or open models", "You are comparing model options for an AI app"],
    avoidWhen: ["You need to monitor an already deployed model", "You need SQL-based ML inside a warehouse"],
    examSignals: ["model catalog", "foundation model selection", "Gemini or open model", "Model Garden"],
    docs: "https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models"
  },
  {
    id: "model-registry",
    name: "Vertex AI Model Registry",
    purpose: "Store, version, organize, and manage trained models before deployment.",
    unique: "Model Registry is the model inventory and lifecycle control point. It is different from Model Garden: Garden is where you discover models; Registry is where you manage your models.",
    equivalents: { aws: "SageMaker Model Registry", azure: "Azure Machine Learning model registry" },
    characteristics: ["Model versions", "Metadata and lineage", "Deployment handoff", "Governance for promoted models"],
    useWhen: ["You need versioned model management", "You need approval or promotion controls for models", "You need an enterprise model inventory"],
    avoidWhen: ["You are just choosing a public foundation model", "You need raw artifact package storage"],
    examSignals: ["version models", "approved model", "model lifecycle", "registry"],
    docs: "https://cloud.google.com/vertex-ai/docs/model-registry/introduction"
  },
  {
    id: "vertex-ai-pipelines",
    name: "Vertex AI Pipelines",
    purpose: "Orchestrate repeatable ML workflows with lineage and metadata.",
    unique: "Pipelines is the MLOps workflow engine. It is what makes training and deployment repeatable, auditable, and less dependent on notebook-by-hand work.",
    equivalents: { aws: "SageMaker Pipelines", azure: "Azure Machine Learning pipelines" },
    characteristics: ["Managed Kubeflow Pipelines execution", "Metadata and artifact lineage", "Reusable ML workflow steps", "Good for CI/CD-style ML processes"],
    useWhen: ["You need repeatable training workflows", "Lineage and auditability matter", "Data prep, training, evaluation, and deployment must be automated"],
    avoidWhen: ["You only need simple service orchestration unrelated to ML"],
    examSignals: ["Kubeflow", "lineage", "repeatable ML workflow", "MLOps pipeline"],
    docs: "https://cloud.google.com/vertex-ai/docs/pipelines/introduction"
  },
  {
    id: "model-monitoring",
    name: "Vertex AI Model Monitoring",
    purpose: "Monitor deployed models for drift, skew, and prediction quality signals.",
    unique: "Model Monitoring focuses on ML-specific production health, not ordinary VM or HTTP uptime. It is for changes in data and model behavior over time.",
    equivalents: { aws: "SageMaker Model Monitor", azure: "Azure Machine Learning model monitoring" },
    characteristics: ["Training-serving skew detection", "Prediction drift detection", "Alerts for model behavior changes", "Production model observability"],
    useWhen: ["Input distributions change over time", "A production model degrades", "You need model-specific monitoring"],
    avoidWhen: ["You only need infrastructure metrics", "The workload is not an ML model"],
    examSignals: ["data drift", "concept drift", "training-serving skew", "model quality degradation"],
    docs: "https://cloud.google.com/vertex-ai/docs/model-monitoring/overview"
  },
  {
    id: "bigquery-ml",
    name: "BigQuery ML",
    alsoKnownAs: ["BQML"],
    purpose: "Create and run ML models directly in BigQuery using SQL.",
    unique: "BigQuery ML is unique because it brings ML to the warehouse instead of moving warehouse data into an ML platform. It is the simple answer for SQL-first analysts doing common ML tasks.",
    equivalents: { aws: "Redshift ML", azure: "Machine learning in Microsoft Fabric or Azure Synapse integrations" },
    characteristics: ["SQL-based model creation", "Works directly on BigQuery tables", "Supports common forecasting, classification, regression, and remote model patterns", "Low-friction for analysts"],
    useWhen: ["Data already lives in BigQuery", "Analysts want SQL-based ML", "The model type is supported and does not require custom training code"],
    avoidWhen: ["You need custom distributed training", "You need complex MLOps around custom models"],
    examSignals: ["ML in SQL", "no export from BigQuery", "forecasting in warehouse", "BQML"],
    docs: "https://cloud.google.com/bigquery/docs/bqml-introduction"
  }
];

const dataAdditions = [
  {
    id: "alloydb",
    name: "AlloyDB for PostgreSQL",
    purpose: "Managed PostgreSQL-compatible database optimized for demanding enterprise transactional and analytical workloads.",
    unique: "AlloyDB is the high-performance PostgreSQL-compatible option in GCP. It keeps familiar PostgreSQL compatibility while adding Google-managed performance, availability, read pools, and columnar acceleration that make it more specialized than plain Cloud SQL for PostgreSQL.",
    equivalents: { aws: "Amazon Aurora PostgreSQL-Compatible Edition", azure: "Azure Cosmos DB for PostgreSQL or Azure Database for PostgreSQL Flexible Server depending on scale pattern" },
    characteristics: ["PostgreSQL-compatible", "Managed high availability and backups", "Read pools for scale-out reads", "Columnar engine for analytical acceleration"],
    useWhen: ["You need PostgreSQL compatibility with higher performance expectations", "Read-heavy enterprise OLTP needs scale-out reads", "You want a managed modernization target from self-managed PostgreSQL"],
    avoidWhen: ["You need MySQL or SQL Server compatibility", "The workload needs global strong-consistency transactions better suited to Spanner"],
    examSignals: ["PostgreSQL-compatible", "Aurora-like", "read pool", "enterprise PostgreSQL modernization"],
    docs: "https://cloud.google.com/alloydb/docs/overview"
  },
  {
    id: "firestore",
    name: "Firestore",
    purpose: "Serverless document database for mobile, web, and application backends.",
    unique: "Firestore is the serverless document database in the GCP portfolio. It shines when the app model is documents, collections, mobile/web synchronization, and automatic scaling rather than relational joins or warehouse analytics.",
    equivalents: { aws: "Amazon DynamoDB or AWS AppSync-backed patterns depending on app shape", azure: "Azure Cosmos DB for NoSQL" },
    characteristics: ["Document data model", "Serverless automatic scaling", "Strong mobile and web SDK story", "Real-time updates and offline sync patterns"],
    useWhen: ["You need a serverless document database", "Mobile or web clients need real-time sync", "The access pattern is document-centric"],
    avoidWhen: ["You need relational joins", "You need large analytical scans better suited to BigQuery"],
    examSignals: ["document database", "mobile app", "real-time sync", "serverless NoSQL"],
    docs: "https://cloud.google.com/firestore/docs/firestore-or-datastore"
  },
  {
    id: "memorystore",
    name: "Memorystore",
    purpose: "Managed in-memory Redis and Memcached for caching, sessions, leaderboards, and low-latency transient data.",
    unique: "Memorystore is not the durable database of record; it is the managed in-memory acceleration layer. In exam language, it usually appears when latency, cache hit rate, session storage, or Redis/Memcached compatibility is the clue.",
    equivalents: { aws: "Amazon ElastiCache", azure: "Azure Cache for Redis" },
    characteristics: ["Managed Redis and Memcached", "Low-latency in-memory access", "Useful for cache, session, queue-like, and leaderboard patterns", "Reduces database load"],
    useWhen: ["You need a managed cache", "The app needs low-latency session or transient state", "You want to reduce load on a primary database"],
    avoidWhen: ["You need a durable source of truth", "You need relational querying or long-term analytics"],
    examSignals: ["cache", "Redis", "Memcached", "session store", "sub-millisecond style latency"],
    docs: "https://cloud.google.com/memorystore/docs"
  }
];

const securityAdditions = [
  {
    id: "identity-aware-proxy",
    name: "Identity-Aware Proxy",
    alsoKnownAs: ["IAP"],
    purpose: "Control access to web applications, VMs, and TCP resources based on user identity and context.",
    unique: "Identity-Aware Proxy is the GCP access gate for private admin and app access without broadly exposing services or requiring a traditional VPN for every user. It combines identity, context, and proxying, so it is different from IAM permissions on resources and different from network firewall rules.",
    equivalents: { aws: "AWS Verified Access or Systems Manager Session Manager depending on target", azure: "Microsoft Entra application proxy, Azure Bastion, or Global Secure Access depending on target" },
    characteristics: ["Identity and context-aware access", "Works for HTTPS apps and TCP forwarding use cases", "Commonly used for SSH/RDP access without public IPs", "Integrates with IAM and access policies"],
    useWhen: ["Users need secure access to internal web apps", "Admins need SSH or RDP to VMs without public IP exposure", "You want identity-aware access without a broad network VPN"],
    avoidWhen: ["You need service-to-service authorization inside an app", "You need full private network connectivity for arbitrary protocols"],
    examSignals: ["no public IP", "SSH through browser or proxy", "internal web app access by identity", "context-aware access"],
    docs: "https://cloud.google.com/iap/docs/concepts-overview"
  }
];

const serviceEnhancements = {
  "cloud-run": {
    unique: "Cloud Run is GCP's most direct bridge between containers and serverless: you bring a container, Google handles the serving platform, autoscaling, and scale-to-zero behavior.",
    equivalents: { aws: "AWS App Runner, Lambda container images, or ECS Fargate depending on shape", azure: "Azure Container Apps or Azure Functions for event-style workloads" }
  },
  "gke": {
    unique: "GKE is Google’s managed Kubernetes product and benefits from Google’s long Kubernetes heritage. It is the right choice when Kubernetes itself is part of the requirement, not merely because code is containerized.",
    equivalents: { aws: "Amazon EKS", azure: "Azure Kubernetes Service" }
  },
  "compute-engine": {
    unique: "Compute Engine is the raw VM substrate of GCP. It gives maximum OS and infrastructure control and is often the migration landing zone before deeper modernization.",
    equivalents: { aws: "Amazon EC2", azure: "Azure Virtual Machines" }
  },
  "bigquery": {
    unique: "BigQuery is GCP’s serverless analytics powerhouse: it removes cluster management and is optimized for SQL analytics over very large data, not transactional serving.",
    equivalents: { aws: "Amazon Redshift plus Athena depending on pattern", azure: "Azure Synapse Analytics or Microsoft Fabric Warehouse" }
  },
  "bigtable": {
    unique: "Bigtable is descended from Google’s internal massive-scale wide-column systems. Its unique exam identity is low-latency operational access at huge write/read scale, especially time-series and telemetry.",
    equivalents: { aws: "Amazon Keyspaces or DynamoDB for some access patterns", azure: "Azure Cosmos DB Table API or Azure Managed Instance for Apache Cassandra depending on model" }
  },
  "spanner": {
    unique: "Spanner is unusual because it combines relational SQL, horizontal scale, and strong consistency across replicas. That combination is its exam fingerprint.",
    equivalents: { aws: "No exact single equivalent; Aurora Limitless or DynamoDB global tables cover partial patterns", azure: "No exact single equivalent; Cosmos DB covers global distribution but not the same relational model" }
  },
  "cloud-sql": {
    unique: "Cloud SQL is the familiar managed relational choice. It is intentionally boring in a good way: standard engines, managed operations, and regional app compatibility.",
    equivalents: { aws: "Amazon RDS", azure: "Azure Database for PostgreSQL/MySQL or Azure SQL Database" }
  },
  "vertex-ai": {
    unique: "Vertex AI is the umbrella platform for managed ML and generative AI on GCP. If a scenario spans training, deployment, evaluation, registry, pipelines, and model monitoring, Vertex AI is the center of gravity.",
    equivalents: { aws: "Amazon SageMaker plus Bedrock for generative AI", azure: "Azure AI Foundry and Azure Machine Learning" }
  },
  "vertex-ai-search": {
    unique: "Vertex AI Search packages retrieval and enterprise search patterns that often underpin RAG, reducing how much search infrastructure you build yourself.",
    equivalents: { aws: "Amazon Kendra or Bedrock Knowledge Bases", azure: "Azure AI Search" }
  },
  "vector-search": {
    unique: "Vector Search is the specialized low-latency similarity search layer in Vertex AI. It is lower-level than enterprise search and shows up when embeddings and nearest-neighbor retrieval are explicit.",
    equivalents: { aws: "OpenSearch vector engine, Aurora/RDS pgvector, or Bedrock Knowledge Bases depending on pattern", azure: "Azure AI Search vector search" }
  },
  "cloud-build": {
    unique: "Cloud Build is GCP’s native build runner. It is for executing CI steps, producing artifacts, and creating provenance, not for managing progressive release state.",
    equivalents: { aws: "AWS CodeBuild", azure: "Azure Pipelines" }
  },
  "cloud-deploy": {
    unique: "Cloud Deploy is GCP’s managed delivery orchestrator for GKE and Cloud Run, focused on promotion, approvals, rollouts, and release safety.",
    equivalents: { aws: "AWS CodeDeploy or CodePipeline", azure: "Azure Pipelines release stages or GitHub Actions environments" }
  },
  "artifact-registry": {
    unique: "Artifact Registry is the current GCP home for container and package artifacts, replacing older Container Registry patterns and integrating into supply-chain controls.",
    equivalents: { aws: "Amazon ECR and CodeArtifact", azure: "Azure Container Registry and Azure Artifacts" }
  },
  "cloud-load-balancing": {
    unique: "Google Cloud Load Balancing uses Google’s global edge and anycast network for many external patterns, which is why global frontend questions often point here.",
    equivalents: { aws: "Elastic Load Balancing plus Global Accelerator or CloudFront depending on pattern", azure: "Azure Load Balancer, Application Gateway, and Front Door" }
  },
  "cloud-armor": {
    unique: "Cloud Armor attaches edge security policy to supported Google Cloud load-balanced applications, making WAF and DDoS controls part of the frontend architecture.",
    equivalents: { aws: "AWS WAF and Shield", azure: "Azure Web Application Firewall and DDoS Protection" }
  },
  "cloud-interconnect": {
    unique: "Cloud Interconnect is the private high-throughput hybrid networking answer. Its high-availability designs revolve around redundant connections, edge domains, and metros.",
    equivalents: { aws: "AWS Direct Connect", azure: "Azure ExpressRoute" }
  },
  "private-service-connect": {
    unique: "Private Service Connect is service-centric private connectivity, avoiding the blast radius and address-space coupling of full VPC peering.",
    equivalents: { aws: "AWS PrivateLink", azure: "Azure Private Link" }
  },
  "iam": {
    unique: "IAM is the principal-to-resource authorization layer. It answers who can do what, but does not by itself solve network isolation or exfiltration perimeters.",
    equivalents: { aws: "AWS IAM", azure: "Microsoft Entra ID with Azure RBAC" }
  },
  "vpc-service-controls": {
    unique: "VPC Service Controls is a GCP-specific perimeter control around supported managed services. It is unusually important for PCA exfiltration questions involving BigQuery or Cloud Storage.",
    equivalents: { aws: "No exact single equivalent; combine IAM, SCPs, VPC endpoints, and data perimeter controls", azure: "No exact single equivalent; combine Azure Policy, Private Link, firewall, and conditional access patterns" }
  },
  "security-command-center": {
    unique: "Security Command Center is the centralized posture and findings dashboard for Google Cloud organizations, not a traffic firewall or IAM engine.",
    equivalents: { aws: "AWS Security Hub and GuardDuty", azure: "Microsoft Defender for Cloud" }
  },
  "cloud-kms": {
    unique: "Cloud KMS is the key-control service behind CMEK, HSM-backed keys, and External Key Manager patterns, so it often appears in compliance stems.",
    equivalents: { aws: "AWS KMS and CloudHSM", azure: "Azure Key Vault and Managed HSM" }
  },
  "cloud-monitoring": {
    unique: "Cloud Monitoring is metrics, dashboards, alerts, and SLOs. It is the operational signal layer for reliability, not the log store.",
    equivalents: { aws: "Amazon CloudWatch", azure: "Azure Monitor" }
  },
  "cloud-logging": {
    unique: "Cloud Logging is the log routing and retention system. Aggregated sinks are especially important for organization-level audit evidence.",
    equivalents: { aws: "CloudWatch Logs", azure: "Azure Monitor Logs / Log Analytics" }
  },
  "cloud-billing": {
    unique: "Cloud Billing is where GCP cost visibility becomes queryable and governable, especially through BigQuery export plus labels.",
    equivalents: { aws: "AWS Billing and Cost Management / Cost Explorer", azure: "Microsoft Cost Management" }
  }
};

gcpServiceAtlas.domains.splice(2, 0, storageDomain);
gcpServiceAtlas.domains.splice(8, 0, migrationDomain);
gcpServiceAtlas.domains.find(domain => domain.id === "data").services.push(...dataAdditions);
gcpServiceAtlas.domains.find(domain => domain.id === "security").services.push(...securityAdditions);
gcpServiceAtlas.domains.find(domain => domain.id === "ai").services.push(...aiAdditions);
gcpServiceAtlas.comparisons.push(
  {
    id: "database-picker",
    title: "Which Database Should I Pick?",
    domainId: "data",
    type: "matrix",
    summary: "Start with the access pattern, consistency, data model, and operational shape. PCA questions usually hide the answer in latency, scale, SQL needs, global consistency, and whether the workload is analytical or transactional.",
    columns: ["Need or signal", "Best fit", "Why it fits", "Watch out for"],
    rows: [
      ["Ad hoc SQL analytics over TB/PB, BI, reporting, warehouse", "BigQuery", "Serverless analytical warehouse optimized for scans, aggregations, partitioning, clustering, and governed analytics.", "Not an OLTP serving database for hot row updates or millisecond key lookups."],
      ["Massive low-latency key/range access, time-series, telemetry, IoT, adtech", "Bigtable", "Wide-column operational database with very high throughput and low-latency access at scale.", "No relational joins or ad hoc analyst SQL; design the row key carefully."],
      ["Global relational ACID, strong consistency, horizontal scale", "Spanner", "Relational SQL with strong consistency and scale across regional or multi-region configurations.", "Overkill for simple regional apps; schema and cost expectations need architectural intent."],
      ["Standard MySQL, PostgreSQL, or SQL Server application", "Cloud SQL", "Managed familiar relational engines with backups, HA options, replicas, and conventional app compatibility.", "Read replicas help reads, but Cloud SQL is not global horizontally scalable relational infrastructure."],
      ["PostgreSQL-compatible enterprise OLTP with higher performance/read scaling", "AlloyDB", "Managed PostgreSQL-compatible service with read pools and columnar acceleration for demanding workloads.", "Not for MySQL or SQL Server; Spanner is still the global consistency scale answer."],
      ["Mobile/web document app, real-time sync, serverless NoSQL", "Firestore", "Document database with automatic scaling, client SDKs, offline sync, and real-time update patterns.", "Avoid for relational joins, complex warehouse analytics, or arbitrary SQL reporting."],
      ["Cache, session store, leaderboard, transient low-latency data", "Memorystore", "Managed Redis/Memcached reduces latency and load on the primary datastore.", "It is not the durable source of truth; pair with a real database for persistence."],
      ["Durable objects, files, media, backups, data lake landing zone", "Cloud Storage", "Object storage is cheap, durable, lifecycle-aware, and integrates with analytics and ML pipelines.", "Object storage is not a row-update database or POSIX filesystem."],
      ["Graph-shaped relationships and traversal-heavy serving", "Partner graph DB or app-level model on a relational/NoSQL store", "GCP does not have a single primary native graph database service in the same way it has BigQuery/Spanner/Bigtable.", "Do not force BigQuery into low-latency graph serving just because it can analyze relationships offline."]
    ],
    examTrap: "First separate analytics from serving. Then separate relational from NoSQL. Then look for global strong consistency, low-latency key access, document sync, or cache clues."
  },
  {
    id: "cloud-storage-vs-filestore",
    title: "Cloud Storage vs Filestore",
    domainId: "storage",
    serviceIds: ["cloud-storage-object", "filestore"],
    summary: "Cloud Storage is object storage; Filestore is managed NFS file storage.",
    choose: [
      "Choose Cloud Storage for buckets, objects, data lakes, media, backups, lifecycle policies, and signed URLs.",
      "Choose Filestore when applications need shared filesystem semantics such as NFS, directories, file locking, and POSIX-style access.",
      "Do not use Cloud Storage FUSE as a drop-in replacement for every filesystem workload; check semantics and performance expectations."
    ],
    examTrap: "If the stem says bucket, object lifecycle, retention, or signed URL, think Cloud Storage. If it says NFS, shared filesystem, or file locking, think Filestore."
  },
  {
    id: "persistent-disk-vs-hyperdisk",
    title: "Persistent Disk vs Hyperdisk",
    domainId: "storage",
    serviceIds: ["persistent-disk", "hyperdisk"],
    summary: "Persistent Disk is the common VM block storage baseline; Hyperdisk is for tunable, high-performance block storage.",
    choose: [
      "Choose Persistent Disk for standard boot/data disks, snapshots, and common durable VM storage.",
      "Choose Hyperdisk when the requirement gives explicit high IOPS or throughput targets, or needs more granular performance provisioning.",
      "Use Local SSD only when ephemeral high-speed storage is acceptable."
    ],
    examTrap: "When the question mentions 100,000 IOPS or very specific disk performance, the intended answer is usually Hyperdisk or Extreme-class block storage."
  },
  {
    id: "storage-transfer-vs-transfer-appliance",
    title: "Storage Transfer Service vs Transfer Appliance",
    domainId: "migration",
    serviceIds: ["storage-transfer-service", "transfer-appliance"],
    summary: "Storage Transfer Service moves data online; Transfer Appliance seeds large datasets offline.",
    choose: [
      "Choose Storage Transfer Service for scheduled online transfers, recurring deltas, or migrations that fit available bandwidth.",
      "Choose Transfer Appliance when bandwidth math shows online transfer cannot meet the deadline.",
      "Use them together when an offline seed is followed by online incremental synchronization."
    ],
    examTrap: "Always do the bandwidth math. Multi-petabyte plus limited network plus short deadline is the classic Transfer Appliance clue."
  },
  {
    id: "model-garden-vs-model-registry",
    title: "Model Garden vs Model Registry",
    domainId: "ai",
    serviceIds: ["model-garden", "model-registry"],
    summary: "Model Garden is where you discover/select models; Model Registry is where you manage your own model lifecycle.",
    choose: [
      "Choose Model Garden for finding Google, partner, and open models to use or adapt.",
      "Choose Model Registry for versioning, governing, and deploying trained or approved models.",
      "A mature AI platform may use both: discover a foundation model in Garden, then manage tuned or custom versions in Registry."
    ],
    examTrap: "Garden is catalog/discovery. Registry is lifecycle/version/governance."
  },
  {
    id: "migration-center-vs-migrate-to-vms",
    title: "Migration Center vs Migrate to VMs",
    domainId: "migration",
    serviceIds: ["migration-center", "migrate-to-vms"],
    summary: "Migration Center plans the move; Migrate to VMs executes VM rehosting.",
    choose: [
      "Choose Migration Center for discovery, assessment, inventory, dependencies, and business-case planning.",
      "Choose Migrate to VMs for replicating and cutting over VM workloads to Compute Engine.",
      "In a real migration program, assess first, then execute waves with the right migration tool."
    ],
    examTrap: "If the question asks what to use before deciding migration waves, think Migration Center. If it asks how to move VMs, think Migrate to VMs."
  },
  {
    id: "iap-vs-vpn-bastion",
    title: "IAP vs VPN/Bastion",
    domainId: "security",
    serviceIds: ["identity-aware-proxy", "iam"],
    summary: "Identity-Aware Proxy gates specific apps or admin connections by user identity; VPN-style designs grant broader network reach.",
    choose: [
      "Choose IAP when users or admins need identity-aware access to an internal app, SSH, or RDP target without public IP exposure.",
      "Choose Cloud VPN or Interconnect when the requirement is site-to-site network connectivity between environments.",
      "Use IAM with IAP so only the right principals can open the proxied path."
    ],
    examTrap: "If the stem says no public IPs and user-based access to a VM or internal app, IAP is often the intended answer. If it says entire networks must communicate, think VPN or Interconnect."
  }
);

for (const domain of gcpServiceAtlas.domains) {
  for (const service of domain.services) {
    Object.assign(service, serviceEnhancements[service.id] || {});
  }
}
