// Generated from the user-provided Gemini PCA practice set.
export const geminiQuestions = [
  {
    "id": "gcp-g01",
    "domain": "design",
    "type": "single",
    "prompt": "Your enterprise is migrating a legacy monolithic application to Google Cloud. The application requires block storage that can be concurrently attached to multiple Compute Engine instances in read-write mode to support a shared-file clustering mechanism. Which storage solution should you architect?",
    "options": [
      {
        "id": "a",
        "text": "Persistent Disk configured with multi-writer mode."
      },
      {
        "id": "b",
        "text": "Filestore Enterprise tier with NFSv4 share."
      },
      {
        "id": "c",
        "text": "Cloud Storage buckets mounted via Cloud Storage FUSE."
      },
      {
        "id": "d",
        "text": "Hyperdisk Balanced configured with multi-writer mode."
      }
    ],
    "correct": [
      "d"
    ],
    "explanation": "Hyperdisk Balanced multi-writer mode is the recommended shared block-storage option for clustered applications. Persistent Disk multi-writer is a limited Preview capability.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g02",
    "domain": "design",
    "type": "single",
    "prompt": "A financial services customer wants to securely connect their on-premises data center to Google Cloud with the highest possible availability (99.99%). They require a predictable, low-latency private connection that does not traverse the public internet. Which connectivity topology should you recommend?",
    "options": [
      {
        "id": "a",
        "text": "A single Partner Interconnect connection with a backup Cloud VPN tunnel over the public internet."
      },
      {
        "id": "b",
        "text": "Two Dedicated Interconnect connections in a single metro availability zone, terminated on two separate edge availability domains."
      },
      {
        "id": "c",
        "text": "Four Dedicated Interconnect connections across two metropolitan areas (two connections per metro), terminated on two separate edge availability domains in each metro."
      },
      {
        "id": "d",
        "text": "High-Availability (HA) Cloud VPN with four tunnels across two distinct internet service providers."
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "split across two metros and two edge domains per metro provide the maximum redundancy required for 99.99% availability per Google's HA blueprint.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g03",
    "domain": "design",
    "type": "single",
    "prompt": "An online gaming company expects a massive global surge in traffic for a new game launch. The backend architecture consists of containerized microservices running on Google Kubernetes Engine (GKE) across multiple regions. You need to route global user traffic to the closest healthy GKE cluster with minimal latency, while also ensuring protection against DDoS attacks. What should you configure?",
    "options": [
      {
        "id": "a",
        "text": "A Regional External Application Load Balancer in each region, combined with Cloud DNS Geolocation routing policies."
      },
      {
        "id": "b",
        "text": "A Global External Application Load Balancer, integration with Cloud Armor security policies, and Multi-Cluster Gateways for GKE."
      },
      {
        "id": "c",
        "text": "An Internal Application Load Balancer with global routing enabled, paired with Cloud NAT."
      },
      {
        "id": "d",
        "text": "A Global External Proxy Network Load Balancer using Maglev, configured with Cloud CDN."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "handle global multi-region traffic routing via Anycast IP, while Cloud Armor defends against DDoS, and Multi-Cluster Gateways manage GKE multi-region traffic routing natively.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g04",
    "domain": "security",
    "type": "single",
    "prompt": "Your company is migrating a multi-tier web application to Compute Engine. The security team mandates that no VM instances in the data tier should have public IP addresses, and they must not be accessible from the public internet. However, these VMs still need to download OS patches from external repositories. How should you design this network?",
    "options": [
      {
        "id": "a",
        "text": "Assign ephemeral public IPs to the data tier VMs, but block all inbound traffic using Google Cloud firewall rules."
      },
      {
        "id": "b",
        "text": "Configure an Internal Load Balancer in front of the data tier VMs to handle outbound traffic."
      },
      {
        "id": "c",
        "text": "Deploy Private Google Access on the subnet and route all external traffic through an on-premises proxy via Interconnect."
      },
      {
        "id": "d",
        "text": "Place the data tier VMs in a private subnet without public IPs, and configure Cloud NAT for that subnet."
      }
    ],
    "correct": [
      "d"
    ],
    "explanation": "enables instances within a private network (no public IPs) to securely connect outbound to the internet for updates/patches while blocking incoming internet connections.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g05",
    "domain": "provision",
    "type": "single",
    "prompt": "A retail enterprise runs a stateful application on Compute Engine that experiences predictable weekly traffic spikes on Friday nights. The rest of the week, the workload is minimal. You want to optimize costs while ensuring that the application can handle the Friday load without performance degradation. What is the most operationally efficient approach?",
    "options": [
      {
        "id": "a",
        "text": "Configure a Managed Instance Group (MIG) with autoscaling based on a predictive autoscaling schedule."
      },
      {
        "id": "b",
        "text": "Manually resize the Managed Instance Group every Friday afternoon and scale it down on Saturday morning using the gcloud CLI."
      },
      {
        "id": "c",
        "text": "Use an Unmanaged Instance Group and write a custom Cloud Function triggered by Cloud Scheduler to spin instances up and down."
      },
      {
        "id": "d",
        "text": "Configure a Managed Instance Group with CPU utilization autoscaling set to a strict target of 50%."
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "in Managed Instance Groups allows you to preemptively scale up infrastructure for known, scheduled traffic spikes.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g06",
    "domain": "design",
    "type": "single",
    "prompt": "You are designing a disaster recovery (DR) strategy for a mission-critical SQL Server database running on Compute Engine. The business requirement states a Recovery Point Objective (RPO) of less than 1 minute and a Recovery Time Objective (RTO) of less than 15 minutes. Which strategy satisfies these requirements with the least operational overhead?",
    "options": [
      {
        "id": "a",
        "text": "Configure nightly scheduled snapshots of the boot and data persistent disks, and replicate them to a secondary region."
      },
      {
        "id": "b",
        "text": "Deploy SQL Server Always On Availability Groups across two different Google Cloud regions with asynchronous replication and manual failover."
      },
      {
        "id": "c",
        "text": "Deploy SQL Server Always On Availability Groups across two zones within the same region with synchronous replication and automatic failover, combined with cross-region asynchronous replication."
      },
      {
        "id": "d",
        "text": "Use Cloud Storage FUSE to write SQL Server backup files directly to a multi-region Cloud Storage bucket every 30 seconds."
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "across zones with synchronous replication guarantees zero data loss (RPO < 1 min), and cross-region async replication meets the DR strategy requirements with minimal RTO.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g07",
    "domain": "provision",
    "type": "single",
    "prompt": "Your organization uses a Shared VPC topology. The Central IT project hosts the host VPC network. The Application team works within a service project and needs to deploy a GKE cluster that connects to the Shared VPC. Which IAM role must be granted to the GKE service account in the host project to allow it to utilize the shared subnets?",
    "options": [
      {
        "id": "a",
        "text": "Compute Network Admin"
      },
      {
        "id": "b",
        "text": "Compute Network User"
      },
      {
        "id": "c",
        "text": "Compute Shared VPC Admin"
      },
      {
        "id": "d",
        "text": "Kubernetes Engine Admin"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "The Central IT host project must grant the Compute Network User role to the service accounts of the service projects so they can provision resources inside the shared subnets.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g08",
    "domain": "design",
    "type": "single",
    "prompt": "A media streaming company needs to store petabytes of video assets. The assets are accessed frequently during the first 30 days after release, rarely accessed after 90 days, and must be retained for 5 years for compliance reasons. You need to minimize storage costs while maintaining immediate accessibility when a video is requested. What should you do?",
    "options": [
      {
        "id": "a",
        "text": "Store the assets in a Standard Cloud Storage bucket and use Object Lifecycle Management to transition objects to Nearline after 30 days, and Coldline after 90 days."
      },
      {
        "id": "b",
        "text": "Store the assets in a Cloud Storage Autoclass-enabled bucket to automatically manage data transitions based on access patterns."
      },
      {
        "id": "c",
        "text": "Keep the data in an Archive-tier Cloud Storage bucket from day one to minimize the baseline storage cost."
      },
      {
        "id": "d",
        "text": "Write a custom script running on Cloud Run that moves objects between different regional buckets based on their creation date."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "automates lifecycle transitions continuously based on real-time data access patterns without requiring manual policy configurations or script overhead.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g09",
    "domain": "design",
    "type": "single",
    "prompt": "You are migrating a highly transaction-heavy, low-latency application from an on-premises SAN environment to Compute Engine. The application requires a disk volume of 2 TB that can deliver up to 100,000 IOPS for read and write operations. Which disk type should you select?",
    "options": [
      {
        "id": "a",
        "text": "Balanced Persistent Disk (pd-balanced)"
      },
      {
        "id": "b",
        "text": "Performance Persistent Disk (pd-ssd)"
      },
      {
        "id": "c",
        "text": "Extreme Persistent Disk (pd-extreme) or Google Cloud Hyperdisk Extreme"
      },
      {
        "id": "d",
        "text": "Local SSD attached to an N2 instance"
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "or Extreme PDs are built specifically for ultra-high performance database workloads that demand up to or exceeding 100,000 IOPS on a single volume.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g10",
    "domain": "security",
    "type": "single",
    "prompt": "Your client requires a completely private, isolated environment on Google Cloud with no ingress or egress to the public internet. They want to use managed Google services such as BigQuery and Cloud Storage from their private Compute Engine instances. How can you enable access to these services without breaking the internet isolation rule?",
    "options": [
      {
        "id": "a",
        "text": "Configure Cloud NAT with an isolated public IP address block."
      },
      {
        "id": "b",
        "text": "Enable Private Google Access on the VPC subnet where the instances reside."
      },
      {
        "id": "c",
        "text": "Set up a secure Cloud VPN tunnel pointing back to an on-premises proxy that routes to Google APIs."
      },
      {
        "id": "d",
        "text": "Use VPC Service Controls to create a service perimeter around the projects, and access services via Private Service Connect (PSC)."
      }
    ],
    "correct": [
      "d"
    ],
    "explanation": "paired with Private Service Connect (PSC) sets up a strict security perimeter, allowing secure, private connectivity to Google APIs while preventing data exfiltration to the public internet.",
    "objective": "Enterprise architecture and infrastructure",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g11",
    "domain": "design",
    "type": "single",
    "prompt": "A global e-commerce application requires a relational database backend that can scale horizontally to handle millions of concurrent transactions globally. The database must guarantee strict ACID compliance, transactional consistency across continents, and high availability. Which Google Cloud service should you choose?",
    "options": [
      {
        "id": "a",
        "text": "Cloud SQL for PostgreSQL with read replicas across regions."
      },
      {
        "id": "b",
        "text": "Cloud Spanner"
      },
      {
        "id": "c",
        "text": "Bigtable with multi-region replication."
      },
      {
        "id": "d",
        "text": "Firestore in Datastore mode."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "is Google's flagship fully managed, horizontally scalable, relational database with global ACID compliance and strong consistency.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g12",
    "domain": "design",
    "type": "single",
    "prompt": "You are designing a data warehousing architecture for an analytics team. They need to run complex SQL queries over petabytes of historical time-series logs. The data is updated continuously throughout the day. The solution must be fully managed, cost-effective for analytical queries, and scale automatically. Which service fits this profile?",
    "options": [
      {
        "id": "a",
        "text": "Cloud Bigtable"
      },
      {
        "id": "b",
        "text": "Cloud SQL for MySQL"
      },
      {
        "id": "c",
        "text": "BigQuery"
      },
      {
        "id": "d",
        "text": "AlloyDB for PostgreSQL"
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "is a serverless, highly scalable enterprise data warehouse designed to analyze petabytes of data using standard SQL queries efficiently.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g13",
    "domain": "design",
    "type": "single",
    "prompt": "An IoT company captures telemetry data from millions of connected vehicles worldwide. Each vehicle sends small packets of structured data every 5 seconds. The data must be ingested with minimal latency and immediately made available for high-throughput operational dashboard streaming and time-series analysis. Which database technology should you use for storage?",
    "options": [
      {
        "id": "a",
        "text": "Cloud Spanner"
      },
      {
        "id": "b",
        "text": "Cloud Bigtable"
      },
      {
        "id": "c",
        "text": "Cloud Storage"
      },
      {
        "id": "d",
        "text": "Firestore"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "is a low-latency, high-throughput NoSQL wide-column store designed specifically for massive operational time-series data and IoT workloads.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g14",
    "domain": "design",
    "type": "single",
    "prompt": "Your application uses Cloud SQL for MySQL to manage user profiles. Due to a sudden marketing campaign, read traffic has scaled up dramatically, causing the database CPU utilization to hover around 95%. Write traffic remains low. How should you scale the database layer to handle the load with minimal disruption?",
    "options": [
      {
        "id": "a",
        "text": "Enable automatic storage increases on the Cloud SQL instance."
      },
      {
        "id": "b",
        "text": "Configure a Cloud SQL High Availability (HA) failover replica."
      },
      {
        "id": "c",
        "text": "Create Cloud SQL read replicas and update the application configuration to route read queries to them."
      },
      {
        "id": "d",
        "text": "Migrate the data instantly to Cloud Spanner using the Database Migration Service."
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "Creating Cloud SQL read replicas scales out horizontal read capacity for read-heavy workloads without modifying or disrupting the primary transactional database instance.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g15",
    "domain": "design",
    "type": "single",
    "prompt": "You need to stream real-time clickstream data from a web application into BigQuery for instant analytics. The streaming ingestion must tolerate occasional network hiccups from the client side, guarantee at-least-once delivery, and handle automatic scaling. What architecture should you deploy?",
    "options": [
      {
        "id": "a",
        "text": "Web App -> Compute Engine Proxy -> BigQuery Load Job API."
      },
      {
        "id": "b",
        "text": "Web App -> Pub/Sub -> Dataflow -> BigQuery."
      },
      {
        "id": "c",
        "text": "Web App -> Cloud Storage -> BigQuery Data Transfer Service."
      },
      {
        "id": "d",
        "text": "Web App -> Cloud Logging -> Log Router -> BigQuery."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "The classic scalable streaming architecture pattern on GCP uses Pub/Sub for streaming ingestion buffers, Dataflow for stream processing/transformation, and BigQuery for analytics storage.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g16",
    "domain": "design",
    "type": "single",
    "prompt": "A data engineering team wants to execute Apache Spark and Hadoop jobs on Google Cloud to process large datasets stored in Cloud Storage. They want to minimize operational costs by shutting down the compute infrastructure immediately after the jobs finish processing. Which service should they use?",
    "options": [
      {
        "id": "a",
        "text": "Compute Engine managed instance groups running custom Hadoop installations."
      },
      {
        "id": "b",
        "text": "Dataproc in serverless mode or ephemeral Dataproc clusters."
      },
      {
        "id": "c",
        "text": "Dataflow using templates."
      },
      {
        "id": "d",
        "text": "BigQuery Omni."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "or ephemeral clusters minimize costs by automatically provisioning compute resources to execute Spark/Hadoop jobs and tearing down the infrastructure immediately upon job completion.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g17",
    "domain": "security",
    "type": "single",
    "prompt": "Your organization must store sensitive financial transaction logs in Cloud Storage. Regulatory compliance dictates that once the data is written, it cannot be modified, overwritten, or deleted by anyone, including the project owners or administrators, for a period of 7 years. How should you enforce this?",
    "options": [
      {
        "id": "a",
        "text": "Implement an IAM policy that removes the storage.objects.delete permission from all users."
      },
      {
        "id": "b",
        "text": "Configure a Cloud Storage bucket with a Retention Policy and lock the policy."
      },
      {
        "id": "c",
        "text": "Use VPC Service Controls to prevent any deletion operations on the storage bucket."
      },
      {
        "id": "d",
        "text": "Enable object versioning on the bucket and set a lifecycle rule to delete old versions after 7 years."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "A locked Cloud Storage Retention Policy strictly enforces Write Once Read Many (WORM) compliance, preventing deletion or modification by any identity (including owners) until the retention period expires.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g18",
    "domain": "design",
    "type": "single",
    "prompt": "You are designing a high-performance analytics system using AlloyDB for PostgreSQL. The application workload consists of standard transactional processing (OLTP) combined with heavy analytical queries (OLAP) running against the same live data. How can you ensure the analytical queries do not degrade OLTP performance?",
    "options": [
      {
        "id": "a",
        "text": "Scale up the primary instance to the maximum available vCPU size."
      },
      {
        "id": "b",
        "text": "Deploy an AlloyDB secondary cluster in a different region."
      },
      {
        "id": "c",
        "text": "Use AlloyDB's columnar engine feature and direct analytical queries to dedicated read pool instances."
      },
      {
        "id": "d",
        "text": "Export data to Cloud Storage every hour and run queries via federated queries."
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "stores data in memory in an optimized columnar format. Directing OLAP queries to dedicated read pool nodes prevents resource contention on the primary transactional database node.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g19",
    "domain": "design",
    "type": "single",
    "prompt": "A legacy application relies on a shared file system that supports POSIX compliance, file locking, and needs to be accessed simultaneously by hundreds of Compute Engine instances across an entire region. Which Google Cloud storage product meets these specific criteria?",
    "options": [
      {
        "id": "a",
        "text": "Cloud Storage FUSE"
      },
      {
        "id": "b",
        "text": "Filestore Enterprise"
      },
      {
        "id": "c",
        "text": "Hyperdisk Storage Pool"
      },
      {
        "id": "d",
        "text": "Persistent Disk with ReadOnlyMany configuration"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "delivers fully managed NFS storage that supports full POSIX compliance, file-locking semantics, and concurrent multi-instance cross-zone mounting.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g20",
    "domain": "design",
    "type": "single",
    "prompt": "You are optimizing BigQuery costs for an organization. A large table containing historical records is queried frequently, but users usually filter by a specific date column (transaction_date) and a region column (user_region). How should you optimize the table design to reduce query costs and improve performance?",
    "options": [
      {
        "id": "a",
        "text": "Partition the table by transaction_date and cluster the table by user_region."
      },
      {
        "id": "b",
        "text": "Cluster the table by transaction_date and partition the table by user_region."
      },
      {
        "id": "c",
        "text": "Split the table into multiple separate tables for each date and region combination."
      },
      {
        "id": "d",
        "text": "Export the data to materialized views in Cloud Bigtable."
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "by date groups data into time blocks, and clustering by high-cardinality columns like region sorts data within those blocks, maximizing query performance and minimizing scan costs in BigQuery.",
    "objective": "Data and storage architecture",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g21",
    "domain": "security",
    "type": "single",
    "prompt": "Your company security policy dictates that all cryptographic keys used to encrypt data at rest in Google Cloud must be managed on-premises by your own hardware security modules (HSM), and Google must never have access to the raw key material under any circumstances. Which encryption option must you choose?",
    "options": [
      {
        "id": "a",
        "text": "Google-managed encryption keys (GMEK)"
      },
      {
        "id": "b",
        "text": "Customer-managed encryption keys (CMEK) via Cloud KMS"
      },
      {
        "id": "c",
        "text": "Cloud KMS with Cloud External Key Manager (EKM)"
      },
      {
        "id": "d",
        "text": "Cloud HSM with an asymmetric key ring"
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "allows you to keep cryptographic keys on an on-premises external key management system, ensuring Google never holds the raw key material.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g22",
    "domain": "security",
    "type": "single",
    "prompt": "An application deployed on Compute Engine needs to access secret API keys stored in Secret Manager. Following the principle of least privilege, how should you grant access without embedding any hardcoded credentials inside the application code or VM images?",
    "options": [
      {
        "id": "a",
        "text": "Assign the primitive Owner role to the Compute Engine default service account."
      },
      {
        "id": "b",
        "text": "Attach a custom Service Account to the VM instance, and grant that service account the Secret Manager Secret Accessor role on the specific secret."
      },
      {
        "id": "c",
        "text": "Generate a service account JSON key file, embed it into the application code repository, and deploy it to the VM."
      },
      {
        "id": "d",
        "text": "Configure the VM to use metadata SSH keys to authenticate directly to the Secret Manager API."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "Attaching a dedicated Service Account to the VM and granting it the specific Secret Manager Secret Accessor role follows the principle of least privilege using IAM infrastructure without hardcoded keys.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g23",
    "domain": "security",
    "type": "single",
    "prompt": "You need to prevent sensitive data, such as credit card numbers or government identification numbers, from being inadvertently uploaded into your BigQuery data warehouse from external streaming logs. Which Google Cloud service should you integrate into your pipeline to detect and redact this data?",
    "options": [
      {
        "id": "a",
        "text": "Cloud Armor"
      },
      {
        "id": "b",
        "text": "Sensitive Data Protection (formerly Cloud DLP)"
      },
      {
        "id": "c",
        "text": "Chronicle Security Analytics"
      },
      {
        "id": "d",
        "text": "Eventarc"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "inspects, identifies, and redacts PII data (like credit card or government IDs) from data streams before or after ingestion.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g24",
    "domain": "implementation",
    "type": "single",
    "prompt": "Your development team wants to establish a continuous integration and continuous deployment (CI/CD) pipeline on Google Cloud that builds Docker containers automatically whenever code is pushed to a repository, scans them for vulnerabilities, and deploys them to a GKE cluster. Which combination of native Google Cloud tools handles this?",
    "options": [
      {
        "id": "a",
        "text": "Cloud Build, Artifact Registry, and Cloud Deploy"
      },
      {
        "id": "b",
        "text": "Deployment Manager, Cloud Source Repositories, and Compute Engine"
      },
      {
        "id": "c",
        "text": "Workflows, Container Registry, and Cloud Run"
      },
      {
        "id": "d",
        "text": "Cloud Composer, Cloud Storage, and GKE"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "handles the CI/container compilation, Artifact Registry acts as the secure image repository with automated vulnerability scanning, and Cloud Deploy manages continuous delivery pipelines to GKE.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g25",
    "domain": "security",
    "type": "single",
    "prompt": "You are managing a multi-tenant Google Kubernetes Engine (GKE) cluster. You need to ensure that pods belonging to Tenant A cannot communicate over the network with pods belonging to Tenant B, even if they run within the same cluster. What feature should you implement?",
    "options": [
      {
        "id": "a",
        "text": "VPC Service Controls"
      },
      {
        "id": "b",
        "text": "GKE Network Policies"
      },
      {
        "id": "c",
        "text": "Cloud IAM binding at the namespace level"
      },
      {
        "id": "d",
        "text": "Authorized Networks for GKE control plane"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "allow cluster administrators to control pod-to-pod network communication based on Kubernetes labels and namespaces, ensuring multi-tenant isolation.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g26",
    "domain": "security",
    "type": "single",
    "prompt": "An auditor requires a complete history of all administrative actions, configuration alterations, and data read/write modifications performed within your Google Cloud project over the past year. Which log data should you provide?",
    "options": [
      {
        "id": "a",
        "text": "Cloud Sub/Sub audit topics"
      },
      {
        "id": "b",
        "text": "Cloud Audit Logs (including Admin Activity and Data Access logs)"
      },
      {
        "id": "c",
        "text": "Access Approval logs"
      },
      {
        "id": "d",
        "text": "Compute Engine serial port output logs"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "automatically track administrative adjustments (Admin Activity) and data interactions (Data Access logs) across Google Cloud resources.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g27",
    "domain": "security",
    "type": "single",
    "prompt": "You want to implement a centralized network security architecture to inspect all inbound and outbound traffic across multiple VPCs for malicious patterns, using a third-party Next-Generation Firewall (NGFW) virtual appliance. Which Google Cloud feature allows you to cleanly route traffic through these appliances?",
    "options": [
      {
        "id": "a",
        "text": "Cloud NAT with custom routes"
      },
      {
        "id": "b",
        "text": "Packet Mirroring"
      },
      {
        "id": "c",
        "text": "VPC Network Peering with custom route exchange"
      },
      {
        "id": "d",
        "text": "Network Connectivity Center or Internal Load Balancer as a next hop"
      }
    ],
    "correct": [
      "d"
    ],
    "explanation": "Using an Internal Load Balancer (ILB) as a next hop or leveraging the Network Connectivity Center allows you to securely route transit traffic through third-party firewall appliances.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g28",
    "domain": "security",
    "type": "single",
    "prompt": "Your company needs to verify that its Google Cloud environment strictly adheres to the Center for Internet Security (CIS) benchmarks and detect misconfigurations like publicly exposed storage buckets in real time. Which tool should you use?",
    "options": [
      {
        "id": "a",
        "text": "Cloud Logging"
      },
      {
        "id": "b",
        "text": "Security Command Center (SCC)"
      },
      {
        "id": "c",
        "text": "Error Reporting"
      },
      {
        "id": "d",
        "text": "Cloud Asset Inventory"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "provides built-in posture management, configuration analysis, and continuous monitoring against CIS benchmarks and cloud vulnerabilities.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g29",
    "domain": "security",
    "type": "single",
    "prompt": "You want to grant temporary, time-bound access to a third-party contractor to view a specific Cloud Storage object without adding them permanently to your corporate identity or IAM configuration. What is the best method?",
    "options": [
      {
        "id": "a",
        "text": "Create a service account, download its JSON key, and give it to the contractor."
      },
      {
        "id": "b",
        "text": "Generate a Signed URL for the specific object with an expiration time."
      },
      {
        "id": "c",
        "text": "Add the contractor's personal email to the project IAM as a Viewer."
      },
      {
        "id": "d",
        "text": "Use Identity-Aware Proxy (IAP) to tunnel them into the bucket."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "grant temporary, time-delimited read or write access to specific Cloud Storage objects or buckets to external users without altering native IAM permissions.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g30",
    "domain": "provision",
    "type": "single",
    "prompt": "An organization wants to restrict deployment of public IP addresses on Compute Engine instances across all development projects. How can an enterprise cloud architect enforce this constraint globally across the entire resource hierarchy?",
    "options": [
      {
        "id": "a",
        "text": "Define a custom IAM role that strips the compute.addresses.use permission."
      },
      {
        "id": "b",
        "text": "Configure an Organization Policy with the constraints/compute.skipDefaultNetworkCreation constraint."
      },
      {
        "id": "c",
        "text": "Configure the compute.vmExternalIpAccess Organization Policy constraint at the root folder or organization level."
      },
      {
        "id": "d",
        "text": "Create a Cloud Monitoring alert that triggers a Cloud Function to delete public IPs."
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "The compute.vmExternalIpAccess Organization Policy constraint restricts which VM instances may use external IPv4 addresses across the resource hierarchy.",
    "objective": "DevOps, security, and compliance",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g31",
    "domain": "design",
    "type": "single",
    "prompt": "Your organization runs an infrastructure split between an on-premises data center and Google Cloud. You want to manage, configure, and monitor Kubernetes clusters deployed both on-premises and on Google Cloud from a single consolidated dashboard. Which solution satisfies this requirement?",
    "options": [
      {
        "id": "a",
        "text": "GKE Autopilot"
      },
      {
        "id": "b",
        "text": "Google Distributed Cloud (powered by Anthos)"
      },
      {
        "id": "c",
        "text": "Cloud Deployment Manager"
      },
      {
        "id": "d",
        "text": "Compute Engine Bare Metal instances"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "provides a centralized control plane to manage, configure, and operate Kubernetes environments hybridly across on-premises environments and Google Cloud.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g32",
    "domain": "design",
    "type": "single",
    "prompt": "You are migrating a stateless Node.js microservice to Google Cloud. The microservice experiences highly unpredictable, spiky traffic patterns\u2014ranging from 0 requests for hours to thousands of requests per minute. You want a fully managed containerized solution where you only pay for resources when a request is actively being processed, scaling down to zero. What should you choose?",
    "options": [
      {
        "id": "a",
        "text": "GKE Standard cluster"
      },
      {
        "id": "b",
        "text": "Compute Engine Managed Instance Groups"
      },
      {
        "id": "c",
        "text": "Cloud Run"
      },
      {
        "id": "d",
        "text": "Cloud Functions (2nd gen) with non-containerized code deployment"
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "is a fully managed serverless container runtime that abstracts away cluster infrastructure and automatically scales dynamically based on traffic, down to zero when idle.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g33",
    "domain": "design",
    "type": "single",
    "prompt": "You want to deploy a Google Kubernetes Engine (GKE) cluster for an application that requires highly customized OS-level kernel modifications and specific SSD scheduling configurations on the underlying nodes. Which GKE operational mode must you select?",
    "options": [
      {
        "id": "a",
        "text": "GKE Autopilot"
      },
      {
        "id": "b",
        "text": "GKE Standard"
      },
      {
        "id": "c",
        "text": "GKE Serverless"
      },
      {
        "id": "d",
        "text": "GKE Enterprise with default settings"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "mode gives developers full access to the underlying worker node configurations, allowing custom OS-level kernel tuning and disk scheduling tweaks.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g34",
    "domain": "implementation",
    "type": "single",
    "prompt": "Your application consists of multiple lightweight decoupled tasks that communicate via HTTP. You need to orchestrate a complex workflow where Task B runs only if Task A succeeds, and Task C runs if Task A fails, incorporating retry logic and error handling. Which serverless orchestration service should you implement?",
    "options": [
      {
        "id": "a",
        "text": "Cloud Tasks"
      },
      {
        "id": "b",
        "text": "Pub/Sub"
      },
      {
        "id": "c",
        "text": "Cloud Workflows"
      },
      {
        "id": "d",
        "text": "Cloud Composer"
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "is a serverless HTTP-based orchestration engine built specifically for low-latency stateful sequencing, retries, and conditional branching of microservices.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g35",
    "domain": "design",
    "type": "single",
    "prompt": "A large financial enterprise has two independent Google Cloud organizations due to an acquisition. Applications in Organization A need to access a microservice hosted in Organization B privately, without setting up complex VPC peering or Cloud VPN tunnels, and without overlapping IP space constraints. How should you design this?",
    "options": [
      {
        "id": "a",
        "text": "Set up Shared VPC across the organizations."
      },
      {
        "id": "b",
        "text": "Publish the service in Organization B using Private Service Connect (PSC) and consume it via a PSC endpoint in Organization A."
      },
      {
        "id": "c",
        "text": "Use the Network Connectivity Center with a global hub."
      },
      {
        "id": "d",
        "text": "Configure a Global External Application Load Balancer with public DNS names."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "enables secure, private consumption of services across independent VPC networks and distinct Google Cloud organizations without establishing full VPC peering.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g36",
    "domain": "implementation",
    "type": "single",
    "prompt": "You have a legacy monolithic Java application running on a physical on-premises server. You want to modernize this application into a container image and deploy it onto GKE with minimal manual rewriting of the core application. Which Google Cloud migration tool can assist you in converting this VM workload directly into a container?",
    "options": [
      {
        "id": "a",
        "text": "Migrate to Virtual Machines (formerly Migrate for Compute Engine)"
      },
      {
        "id": "b",
        "text": "Storage Transfer Service"
      },
      {
        "id": "c",
        "text": "Migrate to Containers (formerly Migrate for Anthos)"
      },
      {
        "id": "d",
        "text": "Database Migration Service"
      }
    ],
    "correct": [
      "c"
    ],
    "explanation": "automates the transformation of physical or virtual machine application instances into targeted container images optimized for deployment on GKE.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g37",
    "domain": "security",
    "type": "single",
    "prompt": "Your development team wants to deploy internal-only applications onto Cloud Run. These services must not be accessible via the public internet, but they must be reachable from your on-premises office connected via Cloud Interconnect. How should you configure ingress for Cloud Run?",
    "options": [
      {
        "id": "a",
        "text": "Set Cloud Run ingress settings to \"Internal\" and access it via a Private Service Connect (PSC) endpoint or HTTP(S) Internal Load Balancing."
      },
      {
        "id": "b",
        "text": "Configure Cloud NAT to intercept all incoming requests to Cloud Run."
      },
      {
        "id": "c",
        "text": "Deploy Cloud Run inside a GKE cluster using Knative."
      },
      {
        "id": "d",
        "text": "Use Identity-Aware Proxy (IAP) with public ingress turned on."
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Setting Cloud Run ingress settings to Internal blocks external public traffic while permitting access from internal resources, Shared VPC networks, or on-premises nodes over Cloud Interconnect via PSC endpoints.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g38",
    "domain": "implementation",
    "type": "single",
    "prompt": "You are architecting an event-driven application. When a user uploads an image to a Cloud Storage bucket, an image processing service running on Cloud Run needs to be triggered instantly to create thumbnails. What is the most decoupled, native cloud architecture to implement this?",
    "options": [
      {
        "id": "a",
        "text": "Write a cron job on Compute Engine that polls the Cloud Storage bucket every 5 seconds."
      },
      {
        "id": "b",
        "text": "Configure Cloud Storage to send notifications to an Eventarc trigger, which routes the event directly to the Cloud Run service."
      },
      {
        "id": "c",
        "text": "Configure the bucket to call the Cloud Run URL directly using Cloud Storage ACLs."
      },
      {
        "id": "d",
        "text": "Stream the Cloud Storage bucket logs to BigQuery and trigger Cloud Run via a Scheduled Query."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "asynchronously captures Cloud Storage mutation events natively and delivers them via standardized CloudEvents routing directly to Cloud Run endpoints.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g39",
    "domain": "operations",
    "type": "single",
    "prompt": "Your GKE production cluster requires maximum uptime. You need to configure a maintenance strategy for the cluster nodes that ensures Google automatically applies security patches and upgrades to the Kubernetes control plane and workers, while ensuring that workloads are gracefully drained without service interruption. What features should you enable?",
    "options": [
      {
        "id": "a",
        "text": "Disable Node Auto-upgrades and handle upgrades manually via gcloud during off-peak hours."
      },
      {
        "id": "b",
        "text": "Enable Node Auto-Repair, Node Auto-Upgrades, and define specific Maintenance Windows and Exclusions."
      },
      {
        "id": "c",
        "text": "Use Unmanaged Instance Groups as GKE worker nodes."
      },
      {
        "id": "d",
        "text": "Re-deploy the cluster using GKE Autopilot with a rapid release channel."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "Enabling Node Auto-Upgrades and Node Auto-Repair, combined with defining clear Maintenance Windows, guarantees that Google Cloud handles security updates safely without interrupting running cluster workloads.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g40",
    "domain": "operations",
    "type": "single",
    "prompt": "An organization uses Cloud Composer to manage their enterprise data analytics pipeline. The pipeline contains several complex Directed Acyclic Graphs (DAGs). During peak processing periods, the workflow execution delays significantly because the Airflow workers are saturated. How should you scale the environment?",
    "options": [
      {
        "id": "a",
        "text": "Manually add more Compute Engine instances to the default VPC network."
      },
      {
        "id": "b",
        "text": "Adjust the Cloud Composer environment configuration to scale up the minimum and maximum number of Airflow workers in its environment parameters."
      },
      {
        "id": "c",
        "text": "Re-write the DAGs to run as single monolithic Bash scripts."
      },
      {
        "id": "d",
        "text": "Migrate the Cloud Composer environment to a standard Cloud Run deployment."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "parameters allow scaling out the environmental configuration settings to automatically adjust minimum/maximum Airflow worker limits to meet peak scheduling needs.",
    "objective": "Hybrid cloud, containers, and serverless",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g41",
    "domain": "design",
    "type": "single",
    "prompt": "Your organization wants to build a generative AI customer support chatbot that can answer highly specific questions about your proprietary product manuals and user billing histories. The underlying foundation model should not be fully retrained. Which architecture pattern should you implement using Vertex AI?",
    "options": [
      {
        "id": "a",
        "text": "Fine-tune a Gemini model using reinforcement learning from human feedback (RLHF) on the entire documentation set."
      },
      {
        "id": "b",
        "text": "Build a Retrieval-Augmented Generation (RAG) pipeline utilizing Vertex AI Search and Vector Search to ground the Gemini model with enterprise data."
      },
      {
        "id": "c",
        "text": "Train a custom deep learning model from scratch on Vertex AI Training using custom TPU pods."
      },
      {
        "id": "d",
        "text": "Use the Vertex AI Prompt Optimizer to hardcode all product manuals directly inside a single static system prompt string."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "grounds foundation LLMs like Gemini with external knowledge repositories (Vertex AI Search/Vector Search) dynamically without needing complex or costly model retraining.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g42",
    "domain": "design",
    "type": "single",
    "prompt": "You are designing an AI application that processes streaming video feeds from retail store cameras to detect foot traffic patterns and object placements in real time. The solution must utilize pre-trained Google models via APIs with minimal ML engineering effort. Which Vertex AI feature should you use?",
    "options": [
      {
        "id": "a",
        "text": "Vertex AI Vision"
      },
      {
        "id": "b",
        "text": "AutoML Image Classification"
      },
      {
        "id": "c",
        "text": "Gemini Multimodal API with video context windows"
      },
      {
        "id": "d",
        "text": "Vertex AI TensorBoard paired with Deep Learning VM Images"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "provides fully managed tools and low-code APIs specifically for video and image streaming ingestion, analysis, and target detection.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g43",
    "domain": "implementation",
    "type": "single",
    "prompt": "Your data science team has engineered a new proprietary generative AI model variant. They need a managed environment on Google Cloud to deploy, version, evaluate, and monitor this custom model along with open-source models like Llama 3, providing a single enterprise-wide API endpoint for developers. Which Vertex AI component serves as this centralized repository and control plane?",
    "options": [
      {
        "id": "a",
        "text": "Artifact Registry"
      },
      {
        "id": "b",
        "text": "Vertex AI Model Garden and Model Registry"
      },
      {
        "id": "c",
        "text": "Vertex AI Feature Store"
      },
      {
        "id": "d",
        "text": "BigQuery ML Model Models"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "and Model Registry serve as centralized cloud platforms to discover, manage, version, and monitor enterprise foundation models and custom configurations.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g44",
    "domain": "provision",
    "type": "single",
    "prompt": "You need to deploy a high-throughput, low-latency LLM inference application on Vertex AI. The workload demands strict performance guarantees, and you want to ensure that dedicated compute resources (GPUs/TPUs) are reserved solely for your model instances without cold-start delays or shared tenancy risks. Which deployment strategy should you select?",
    "options": [
      {
        "id": "a",
        "text": "Deploy the model to a Vertex AI Endpoint using Provisioned Throughput or Dedicated Machine Types."
      },
      {
        "id": "b",
        "text": "Use Cloud Run with scale-to-zero enabled to optimize for intermittent inference calls."
      },
      {
        "id": "c",
        "text": "Use BigQuery ML remote models pointing to public endpoints."
      },
      {
        "id": "d",
        "text": "Run inference tasks as asynchronous Vertex AI Batch Prediction jobs exclusively."
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "or configuring Dedicated Machine Types on Vertex AI Endpoints guarantees dedicated GPU/TPU compute allocation for real-time, low-latency enterprise LLM serving.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g45",
    "domain": "security",
    "type": "single",
    "prompt": "Your corporate compliance team expresses concern about data privacy when using generative AI models on Vertex AI. They want absolute assurance regarding how your enterprise data (prompts and generated responses) is handled. According to Google Cloud's core privacy commitments for Vertex AI, which statement is true?",
    "options": [
      {
        "id": "a",
        "text": "Customer data is used to train Google's foundation models by default unless an opt-out form is submitted."
      },
      {
        "id": "b",
        "text": "Customer prompts and data are encrypted at rest and in transit, and are never used by Google to train foundation models."
      },
      {
        "id": "c",
        "text": "Customer data is stored temporarily in public caching layers to optimize prompt performance globally."
      },
      {
        "id": "d",
        "text": "Vertex AI does not support customer-managed encryption keys (CMEK) for model inputs."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "Google Cloud formally commits that customer prompts and data processed on Vertex AI are isolated, encrypted, and never utilized to retrain or optimize Google's public baseline models.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g46",
    "domain": "implementation",
    "type": "single",
    "prompt": "A medical imaging company wants to train a custom convolutional neural network (CNN) model on thousands of high-resolution 3D MRI scans stored in Cloud Storage. The training job requires massive parallel processing power across multiple nodes equipped with NVIDIA H100 GPUs. What is the most efficient Vertex AI feature to execute this job?",
    "options": [
      {
        "id": "a",
        "text": "Vertex AI Pipelines running serverless Python functions."
      },
      {
        "id": "b",
        "text": "Vertex AI Custom Training jobs configured with a multi-node GPU worker pool."
      },
      {
        "id": "c",
        "text": "Vertex AI Workbench user-managed notebooks running local executions."
      },
      {
        "id": "d",
        "text": "AutoML Vision edge training."
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "allows configuration of distributed deep learning configurations, leveraging cluster node workers equipped with multiple GPUs for complex training operations.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g47",
    "domain": "design",
    "type": "single",
    "prompt": "You are developing a feature for an application where users input a text description of a product, and the system searches an e-commerce catalog of millions of items to find the most visually and contextually similar items. How should you architect this search backend using Vertex AI?",
    "options": [
      {
        "id": "a",
        "text": "Use Vertex AI Text Embeddings to convert catalog items and text queries into vectors, and perform similarity matching using Vertex AI Vector Search."
      },
      {
        "id": "b",
        "text": "Convert the catalog into a massive SQL database and use standard LIKE operators in Cloud SQL."
      },
      {
        "id": "c",
        "text": "Pass the entire catalog text list into a Gemini 1.5 Pro prompt for every single search request."
      },
      {
        "id": "d",
        "text": "Use the Vertex AI Natural Language API to extract syntax tokens and run structural matches."
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Using Vertex AI Text Embeddings to map unstructured catalogs into high-dimensional mathematical spaces, paired with Vertex AI Vector Search, is the industry-standard architecture for semantic vector search.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g48",
    "domain": "implementation",
    "type": "single",
    "prompt": "An enterprise wants to orchestrate their machine learning workflows\u2014from data ingestion in BigQuery, preprocessing via Dataflow, model training in Vertex AI, to deployment at an endpoint. They require a repeatable, auditable, and automated lineage-tracking pipeline based on Kubeflow Pipelines. Which service should you choose?",
    "options": [
      {
        "id": "a",
        "text": "Cloud Composer"
      },
      {
        "id": "b",
        "text": "Vertex AI Pipelines"
      },
      {
        "id": "c",
        "text": "Workflows"
      },
      {
        "id": "d",
        "text": "Cloud Build"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "is a fully managed, serverless execution platform built on Kubeflow Pipelines designed specifically for tracking artifact lineage, reproducibility, and automated ML workflows.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g49",
    "domain": "operations",
    "type": "single",
    "prompt": "You have deployed an enterprise AI model to production. Over time, the distribution of real-world incoming user queries changes significantly compared to the data the model was evaluated on, leading to degraded response quality. Which Vertex AI capability should you implement to detect this phenomenon automatically?",
    "options": [
      {
        "id": "a",
        "text": "Vertex AI Model Monitoring to detect data drift and concept drift."
      },
      {
        "id": "b",
        "text": "Vertex AI Feature Store online serving."
      },
      {
        "id": "c",
        "text": "Cloud Monitoring custom uptime checks."
      },
      {
        "id": "d",
        "text": "Vertex AI Vizier for hyperparameter tuning."
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "continuously analyzes real-time production inference traffic to automatically detect structural shifts, such as data drift or concept drift, against training baselines.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  },
  {
    "id": "gcp-g50",
    "domain": "design",
    "type": "single",
    "prompt": "Your data team manages a large-scale data lake inside BigQuery. They want to execute basic machine learning tasks, such as linear regressions, binary classifications, and forecasting, directly on the BigQuery data using standard SQL syntax without exporting the data to external ML platforms. Which solution should they adopt?",
    "options": [
      {
        "id": "a",
        "text": "Vertex AI Deep Learning Containers"
      },
      {
        "id": "b",
        "text": "BigQuery ML (BQML)"
      },
      {
        "id": "c",
        "text": "Spark MLlib on Dataproc"
      },
      {
        "id": "d",
        "text": "AutoML Tables via local Python SDKs"
      }
    ],
    "correct": [
      "b"
    ],
    "explanation": "enables data analysts to directly design, evaluate, and execute machine learning models inside BigQuery repositories using standard SQL syntax.",
    "objective": "AI and machine learning integration",
    "difficulty": "advanced",
    "source": "Gemini contributed set"
  }
];

