import {
  ArchitectureNode,
  CapabilityCard,
  CaseStudy,
  ReadinessQuestion,
  EngineeringPrinciple,
  WorkStep,
  SecurityControl,
  EngagementTier,
  ResourceCard
} from '../types/nexora';

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'client',
    name: 'Client Applications',
    category: 'Ingress & Interfaces',
    icon: 'Monitor',
    purpose: 'Enterprise web consoles, mobile clients, customer-facing portals, and programmatic API callers initiating transactional and analytical workloads.',
    technologies: ['React', 'Next.js', 'iOS/Android SDKs', 'GraphQL', 'gRPC Web'],
    securityConsiderations: [
      'Origin validation & Content Security Policy (CSP)',
      'mTLS or short-lived JWT session assertions',
      'Client-side anti-tampering and PKCE authorization flows'
    ],
    scalabilityConsiderations: [
      'Global Anycast edge acceleration',
      'Intelligent client-side query caching and deduplication',
      'Sub-50ms regional edge termination'
    ]
  },
  {
    id: 'gateway',
    name: 'API Gateway & Edge',
    category: 'Traffic Management',
    icon: 'Shield',
    purpose: 'Enforces rate limits, decrypts TLS, performs token verification, applies IP/WAF heuristics, and routes requests to downstream microservices.',
    technologies: ['Envoy Proxy', 'Cloudflare Magic Transit', 'Kong', 'Traefik', 'OpenResty'],
    securityConsiderations: [
      'Automated DDoS mitigation and adaptive WAF rules',
      'Zero-trust token introspection before internal routing',
      'Payload sanitization and API schema contract validation'
    ],
    scalabilityConsiderations: [
      'Stateless horizontal auto-scaling on Kubernetes',
      'Connection pooling with HTTP/2 and HTTP/3 multiplexing',
      'Sub-millisecond route resolution'
    ]
  },
  {
    id: 'orchestrator',
    name: 'AI Orchestrator',
    category: 'Cognitive Engine',
    icon: 'Cpu',
    purpose: 'Coordinates models, tools, workflows, retries, permissions, vector retrieval, and deterministic multi-agent execution.',
    technologies: ['LangGraph', 'Python 3.12', 'TypeScript', 'Temporal.io', 'vLLM'],
    securityConsiderations: [
      'Strict input/output guardrails and prompt injection defenses',
      'Ephemeral tool authorization tokens with least-privilege scope',
      'Redaction of PII/PHI before model context generation'
    ],
    scalabilityConsiderations: [
      'Asynchronous task queuing with Redis / Celery backplanes',
      'Dynamic token batching and speculative decoding',
      'Failover routing across multi-cloud model endpoints'
    ]
  },
  {
    id: 'models',
    name: 'Models & Agents',
    category: 'Inference Layer',
    icon: 'Bot',
    purpose: 'Executes frontier LLM inference, embedding generation, specialized fine-tuned models, and domain-specific classification logic.',
    technologies: ['PyTorch', 'NVIDIA Triton', 'TensorRT-LLM', 'Hugging Face TGI', 'Ollama / vLLM'],
    securityConsiderations: [
      'Confidential compute instances with hardware-backed enclaves',
      'Zero-data-retention agreements for third-party inference',
      'Automated output verification against known hallucinations'
    ],
    scalabilityConsiderations: [
      'GPU cluster auto-scaling via Karpenter and Keda',
      'Quantization (AWQ/GPTQ/FP8) for memory footprint optimization',
      'Prefix caching for repetitive prompt contexts'
    ]
  },
  {
    id: 'data',
    name: 'Enterprise Data Layer',
    category: 'Persistence & Knowledge',
    icon: 'Database',
    purpose: 'Stores structured transactional state, vectorized semantic embeddings, event logs, and analytical lakehouse datasets.',
    technologies: ['PostgreSQL', 'Qdrant / Pinecone', 'Apache Kafka', 'ClickHouse', 'Redis Enterprise'],
    securityConsiderations: [
      'Field-level AES-256 encryption at rest and in transit',
      'Row-level security (RLS) linked to identity provider groups',
      'Immutable write-ahead audit logs for critical transactions'
    ],
    scalabilityConsiderations: [
      'Read-replica scaling with sub-5ms replication lag',
      'Hierarchical HNSW vector indices partitioned by tenant ID',
      'Cold tier archiving to S3/GCS with transparent lakehouse query federation'
    ]
  },
  {
    id: 'observability',
    name: 'Observability & SRE',
    category: 'Telemetry & Control',
    icon: 'Activity',
    purpose: 'Captures distributed traces, token latencies, model drift metrics, error budgets, and automates self-healing infrastructure remediations.',
    technologies: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Datadog', 'ArgoCD'],
    securityConsiderations: [
      'Masking of sensitive payload data in trace spans',
      'Tamper-evident log forwarding to immutable SIEM destinations',
      'Strict audit trails for automated infrastructure adjustments'
    ],
    scalabilityConsiderations: [
      'High-cardinality metric sampling and aggregation pipelines',
      'Distributed span batching with zero application runtime overhead',
      'Automated incident remediation playbooks for recurring alerts'
    ]
  }
];

export const CAPABILITIES: CapabilityCard[] = [
  {
    id: 'enterprise-ai',
    number: '01',
    title: 'Enterprise AI & LLM Systems',
    description: 'Private AI architectures, deterministic RAG pipelines, fine-tuned domain models, agentic workflows, and continuous evaluation harnesses.',
    icon: 'Bot',
    tags: ['Private RAG', 'Agentic Systems', 'Fine-Tuning', 'vLLM', 'LangGraph'],
    blueprint: {
      title: 'Deterministic Enterprise RAG & Multi-Agent Architecture',
      category: 'Enterprise AI',
      summary: 'Engineered for zero hallucination tolerance in high-stakes environments, pairing hybrid vector-lexical search with verifiable citation guardrails.',
      diagramSteps: [
        { stage: 'Data Ingestion', description: 'Asynchronous document parsing, semantic chunking, embedding generation', technologies: ['Apache Tika', 'Unstructured.io', 'BGE-M3'] },
        { stage: 'Hybrid Retrieval', description: 'Dense vector search fused with BM25 keyword matching and cross-encoder reranking', technologies: ['Qdrant', 'Cohere Rerank', 'Redis'] },
        { stage: 'Agent Execution', description: 'Deterministic state-machine planning with tool validation and fallback logic', technologies: ['LangGraph', 'Temporal.io', 'Python'] },
        { stage: 'Verification Gate', description: 'Citation alignment checks, hallucination scoring, and PII redaction', technologies: ['NeMo Guardrails', 'LangSmith'] }
      ],
      typicalWorkflow: [
        'Ingest multi-format enterprise documentation into partitioned vector stores',
        'Authenticate user credentials and enforce document access control lists (ACLs)',
        'Retrieve top-k chunks using hybrid dense-sparse scoring',
        'Execute prompt with tool access under deterministic guardrails',
        'Validate citations and return verified answer with source references'
      ],
      securityArchitecture: [
        'Private VPC / Confidential Enclave model hosting',
        'Document-level ACL filtering pre-embedding query',
        'Zero retention agreements on frontier API fallback'
      ],
      deliverables: [
        'Production RAG repository with CI/CD evaluation harness',
        'Custom multi-agent tool execution graph',
        'Prompt & hallucination regression test suite'
      ]
    }
  },
  {
    id: 'cloud-modernization',
    number: '02',
    title: 'Cloud Modernization & FinOps',
    description: 'Multi-cloud migrations, Kubernetes orchestration, Infrastructure as Code, resilient microservices, and aggressive cost governance.',
    icon: 'Cloud',
    tags: ['Kubernetes', 'Multi-Cloud', 'Terraform', 'FinOps', 'Karpenter'],
    blueprint: {
      title: 'Elastic Multi-Cloud Infrastructure & FinOps Architecture',
      category: 'Cloud Engineering',
      summary: 'High-availability Kubernetes topologies with automated spot instance arbitration, cross-AZ traffic optimization, and zero vendor lock-in.',
      diagramSteps: [
        { stage: 'Traffic Routing', description: 'Anycast DNS with intelligent regional latency failover', technologies: ['Cloudflare', 'Envoy Gateway'] },
        { stage: 'Compute Fabric', description: 'Dynamic auto-scaling node groups on spot/on-demand pools', technologies: ['EKS / GKE', 'Karpenter', 'Cilium eBPF'] },
        { stage: 'State Storage', description: 'Multi-AZ distributed database clusters with active replication', technologies: ['PostgreSQL', 'CockroachDB'] },
        { stage: 'FinOps Monitor', description: 'Real-time resource utilization and idle capacity governors', technologies: ['OpenCost', 'Kubecost', 'Prometheus'] }
      ],
      typicalWorkflow: [
        'Audit legacy infrastructure topology and resource utilization profiles',
        'Define immutable Infrastructure as Code using Terraform / OpenTofu',
        'Deploy resilient Kubernetes clusters with automated Karpenter autoscaling',
        'Establish CI/CD GitOps pipelines with ArgoCD and automated canary releases',
        'Activate continuous cost telemetry and unit-economic tagging'
      ],
      securityArchitecture: [
        'SPIFFE/SPIRE workload identities replacing static API keys',
        'Network micro-segmentation enforced via Cilium eBPF',
        'Automated vulnerability scanning in container registries'
      ],
      deliverables: [
        'Modular Terraform / Kubernetes IaC repository',
        'GitOps deployment pipelines with canary automation',
        'Real-time FinOps cost governance dashboard'
      ]
    }
  },
  {
    id: 'intelligent-automation',
    number: '03',
    title: 'Intelligent Automation',
    description: 'Autonomous workflow orchestration, enterprise API integrations, human-in-the-loop validation, and transactional state machines.',
    icon: 'Zap',
    tags: ['Workflow Engines', 'Temporal', 'Human-in-Loop', 'Event-Driven'],
    blueprint: {
      title: 'Resilient Multi-Agent Automation Fabric',
      category: 'Intelligent Automation',
      summary: 'Durable execution engines capable of running long-lived enterprise business processes with automatic retries and human escalation.',
      diagramSteps: [
        { stage: 'Trigger Ingestion', description: 'Webhook and event listeners capturing business triggers', technologies: ['Apache Kafka', 'EventBridge'] },
        { stage: 'Durable Orchestration', description: 'Fault-tolerant workflow execution maintaining distributed state', technologies: ['Temporal.io', 'LangGraph'] },
        { stage: 'Integration Connectors', description: 'Authenticated adapters to ERP, CRM, and internal databases', technologies: ['REST', 'GraphQL', 'gRPC'] },
        { stage: 'Human Supervision', description: 'Supervisor dashboard for exception triage and compliance sign-off', technologies: ['React', 'WebSocket'] }
      ],
      typicalWorkflow: [
        'Capture business event and validate schema contract',
        'Execute multi-step workflow with durable execution checkpoints',
        'Call external SaaS APIs with automatic rate limiting and exponential backoff',
        'Escalate anomalous outputs to human reviewers via webhooks',
        'Record complete audit trail into immutable ledger'
      ],
      securityArchitecture: [
        'Encrypted workflow state payloads at rest in database',
        'Role-based approval controls for financial or destructive actions',
        'Complete audit trails recording exact agent decision paths'
      ],
      deliverables: [
        'Durable workflow state machine implementation',
        'Custom enterprise integration connectors',
        'Human-in-the-loop review interface and webhook suite'
      ]
    }
  },
  {
    id: 'data-systems',
    number: '04',
    title: 'Data & Real-Time Systems',
    description: 'Event-driven architectures, Apache Kafka & Flink pipelines, columnar real-time analytics, and governed data lakehouse platforms.',
    icon: 'Database',
    tags: ['Apache Kafka', 'Apache Flink', 'ClickHouse', 'Lakehouse', 'Iceberg'],
    blueprint: {
      title: 'High-Throughput Sub-Second Event Processing Fabric',
      category: 'Data Infrastructure',
      summary: 'Horizontally scalable streaming pipeline designed for sub-second analytical aggregations and real-time operational telemetry.',
      diagramSteps: [
        { stage: 'Stream Ingress', description: 'High-throughput partitioned event queues with schema registries', technologies: ['Apache Kafka', 'Redpanda'] },
        { stage: 'Stream Processing', description: 'Stateful real-time stream aggregation, anomaly detection, filtering', technologies: ['Apache Flink', 'Kafka Streams'] },
        { stage: 'Columnar Store', description: 'Ultra-fast analytical storage optimized for high-cardinality queries', technologies: ['ClickHouse', 'Apache Iceberg'] },
        { stage: 'Telemetry APIs', description: 'Low-latency subscription endpoints powering live dashboards', technologies: ['GraphQL Subscriptions', 'gRPC'] }
      ],
      typicalWorkflow: [
        'Ingest streaming transactions and telemetry with Avro schema verification',
        'Apply stateful windowing and anomaly scoring in Apache Flink',
        'Persist raw and transformed data into columnar storage',
        'Serve analytical dashboards with sub-100ms query latency'
      ],
      securityArchitecture: [
        'mTLS encryption between all Kafka brokers and producers',
        'Data anonymization and masking during stream ingestion',
        'Column-level permission policies enforced in OLAP engine'
      ],
      deliverables: [
        'Production Kafka / Flink streaming architecture',
        'Schema registry setup with automated compatibility gates',
        'Real-time ClickHouse / Iceberg analytical database'
      ]
    }
  },
  {
    id: 'cyber-resilience',
    number: '05',
    title: 'Cyber Resilience & Zero-Trust',
    description: 'Cryptographic zero-trust perimeter, workload identity, micro-segmentation, automated security guardrails, and compliance engineering.',
    icon: 'ShieldCheck',
    tags: ['Zero-Trust', 'eBPF Security', 'SPIFFE/SPIRE', 'OPA', 'Tetragon'],
    blueprint: {
      title: 'Cryptographic Workload Identity & Zero-Trust Defense',
      category: 'Cyber Resilience',
      summary: 'Eliminates implicit trust across distributed cloud networks by requiring cryptographic verification for every inter-service call.',
      diagramSteps: [
        { stage: 'Workload Identity', description: 'Short-lived cryptographic X.509 SVIDs issued to every container', technologies: ['SPIRE / SPIFFE', 'HashiCorp Vault'] },
        { stage: 'Kernel Filtering', description: 'eBPF kernel-level runtime security observing raw syscalls', technologies: ['Cilium Tetragon', 'Falco'] },
        { stage: 'Policy Engine', description: 'Declarative compliance policies enforced before code deployment', technologies: ['Open Policy Agent', 'Kyverno'] },
        { stage: 'Automated Response', description: 'Self-quarantining rogue pods upon detecting unauthorized syscalls', technologies: ['Kubernetes Operators'] }
      ],
      typicalWorkflow: [
        'Issue ephemeral workload certificates dynamically at pod startup',
        'Enforce mutual TLS on all pod-to-pod network traffic',
        'Monitor kernel syscalls in real time via eBPF probes',
        'Trigger automated isolation if anomalous network egress is detected'
      ],
      securityArchitecture: [
        'Zero static secrets: dynamic credentials generated on demand',
        'Kernel-level enforcement completely bypassing container space',
        'Immutable cryptographic audit trail for compliance verification'
      ],
      deliverables: [
        'SPIRE zero-trust identity architecture implementation',
        'eBPF Tetragon runtime security policy rules',
        'Automated OPA / Kyverno CI/CD compliance gates'
      ]
    }
  },
  {
    id: 'devops-sre',
    number: '06',
    title: 'DevOps & Site Reliability (SRE)',
    description: 'Automated CI/CD pipelines, high-cardinality observability, chaos engineering, self-healing infrastructure, and incident response.',
    icon: 'Activity',
    tags: ['OpenTelemetry', 'ArgoCD', 'Chaos Mesh', 'GitOps', 'Prometheus'],
    blueprint: {
      title: 'Autonomous Self-Healing SRE & Observability Matrix',
      category: 'Reliability Engineering',
      summary: 'Distributed telemetry framework pairing high-cardinality tracing with automated self-healing triggers to minimize Mean Time to Resolution.',
      diagramSteps: [
        { stage: 'Tracing & Metrics', description: 'Unified collection of metrics, logs, and distributed traces', technologies: ['OpenTelemetry', 'Prometheus'] },
        { stage: 'Anomaly Detector', description: 'Statistical evaluation of SLO error budgets and traffic shifts', technologies: ['Grafana Mimir', 'PromQL'] },
        { stage: 'GitOps Controller', description: 'Declarative state synchronization ensuring drift-free deployments', technologies: ['ArgoCD', 'Flux'] },
        { stage: 'Auto-Healing Bot', description: 'Automated pod restarts, cache flushes, and traffic reroutes', technologies: ['Keda', 'Custom Operators'] }
      ],
      typicalWorkflow: [
        'Instrument all microservices using standardized OpenTelemetry collectors',
        'Define Service Level Objectives (SLOs) and error budget alerts',
        'Simulate network failures and node latency via Chaos Mesh tests',
        'Execute automated progressive rollouts (canary/blue-green) with automatic rollback'
      ],
      securityArchitecture: [
        'Read-only production cluster access enforced via GitOps',
        'Encrypted metric exports and scrubbed trace payloads',
        'Signed container images verified with Cosign at admission'
      ],
      deliverables: [
        'OpenTelemetry collector topology and Grafana dashboards',
        'ArgoCD GitOps pipeline with automated rollback triggers',
        'Chaos engineering test playbooks and runbooks'
      ]
    }
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech',
    domain: 'Fintech & Transaction Processing',
    scenarioTitle: 'Illustrative Scenario: Sub-15ms Real-Time Transaction Risk Engine',
    problem: 'High-volume transaction streams experiencing processing bottlenecks, where legacy evaluation architectures introduced unacceptable authorization latency during peak trading periods.',
    pipelineStages: [
      { name: 'Transaction Stream', description: 'Partitioned event stream ingesting raw payment authorizations' },
      { name: 'Feature Processing', description: 'Stateful stream windowing extracting real-time cardholder velocity features' },
      { name: 'ML Inference', description: 'Hardware-accelerated embedding scoring under strict microsecond budgets' },
      { name: 'Risk Engine', description: 'Deterministic rule evaluation combining heuristic and ML probabilities' },
      { name: 'Decision API', description: 'Low-latency response returned to clearinghouse gateway' }
    ],
    technologies: ['Apache Kafka', 'Python', 'Redis Enterprise', 'PostgreSQL', 'Kubernetes', 'Triton Server'],
    illustrativeOutcome: [
      { metric: 'Sub-15ms p99', description: 'End-to-end evaluation latency across distributed cluster nodes' },
      { metric: '80,000+ TPS', description: 'Sustained peak transaction throughput capability in load benchmarks' },
      { metric: 'Zero Dropped Events', description: 'Resilient at-least-once stream processing with persistent checkpoints' }
    ],
    disclaimer: 'Example architecture and illustrative scenario designed for high-throughput financial transaction processing.',
    cloudProvider: 'AWS',
    industry: 'Fintech'
  },
  {
    id: 'healthcare',
    domain: 'Healthcare & Clinical Informatics',
    scenarioTitle: 'Illustrative Scenario: Secure Multimodal Clinical Document & Imaging Pipeline',
    problem: 'Healthcare organizations struggling with fragmented clinical records and high latency in extracting structured diagnostics from unstructured multi-page patient charts and imaging data.',
    pipelineStages: [
      { name: 'EHR Ingestion', description: 'Secure webhook capturing HL7/FHIR clinical events and DICOM records' },
      { name: 'De-identification', description: 'Zero-trust sanitization stripping patient identifiers before processing' },
      { name: 'Multimodal Extraction', description: 'Specialized vision-language model parsing charts, lab values, and scans' },
      { name: 'Clinical Gate', description: 'Deterministic medical ontology mapping against SNOMED-CT / ICD-10' },
      { name: 'FHIR Export API', description: 'Structured JSON pushed back to Electronic Health Record repositories' }
    ],
    technologies: ['PyTorch', 'FastAPI', 'Confidential Cloud Enclaves', 'Qdrant', 'PostgreSQL', 'Docker'],
    illustrativeOutcome: [
      { metric: 'Sub-minute turnaround', description: 'Complex chart synthesis reduced from hours to under 60 seconds' },
      { metric: 'Zero-Egress Security', description: 'All inference executed inside confidential hardware-isolated enclaves' },
      { metric: 'Standardized FHIR', description: '100% compliant data structures for seamless clinical interoperability' }
    ],
    disclaimer: 'Example architecture scenario illustrating HIPAA-aligned design patterns and confidential enclave computing.',
    cloudProvider: 'GCP',
    industry: 'Healthcare'
  },
  {
    id: 'logistics',
    domain: 'Global Logistics & Supply Chain',
    scenarioTitle: 'Illustrative Scenario: Autonomous Multi-Modal Route Optimization Engine',
    problem: 'Dynamic freight transport networks vulnerable to volatile fuel price fluctuations, port congestion delays, and rigid batch dispatch systems incapable of real-time route updates.',
    pipelineStages: [
      { name: 'Telemetry Stream', description: 'Real-time GPS coordinates, vehicle telemetry, and sensor feeds' },
      { name: 'Geospatial Graph', description: 'Dynamic graph database recalculating transit network road weights' },
      { name: 'Heuristic Dispatcher', description: 'Distributed constraint solver calculating optimal multi-stop routes' },
      { name: 'Weather / Traffic API', description: 'Live contextual feeds modifying edge costs dynamically' },
      { name: 'Driver Mobile API', description: 'Sub-second route reassignments dispatched to vehicle consoles' }
    ],
    technologies: ['Apache Flink', 'Go (Golang)', 'PostGIS', 'Ray Distributed', 'Apache Kafka', 'Redis'],
    illustrativeOutcome: [
      { metric: 'Sub-second Rerouting', description: 'Dynamic dispatch recalculations executed within 800ms of incident report' },
      { metric: 'Illustrative 12-18% Mileage Reduction', description: 'Efficiency gain modeled across simulated multi-drop urban routes' },
      { metric: '10,000+ Concurrent Fleet Units', description: 'Real-time asset telemetry ingested and coordinated simultaneously' }
    ],
    disclaimer: 'Example architecture and illustrative modeling scenario for distributed vehicle telematics and route optimization.',
    cloudProvider: 'Azure',
    industry: 'Logistics'
  },
  {
    id: 'saas',
    domain: 'Enterprise SaaS & Cloud Infrastructure',
    scenarioTitle: 'Illustrative Scenario: Multi-Tenant LLM Rate Governor & Database Decoupling',
    problem: 'High-growth B2B SaaS platform encountering database connection exhaustion, noisy-neighbor tenant resource starvation, and unpredictable model API cost overruns.',
    pipelineStages: [
      { name: 'Tenant Router', description: 'Gateway identifying tenant tier and applying dynamic rate token buckets' },
      { name: 'Token Governor', description: 'Real-time billing meter tracking prompt and completion token expenditure' },
      { name: 'Distributed Cache', description: 'Semantic caching layer serving recurring prompts without re-inference' },
      { name: 'Worker Pool', description: 'Decoupled asynchronous worker pods consuming background processing jobs' },
      { name: 'Sharded Database', description: 'Tenant-isolated database shards preventing cross-tenant lock contention' }
    ],
    technologies: ['Envoy Proxy', 'TypeScript', 'Redis Enterprise', 'ClickHouse', 'Kubernetes', 'PostgreSQL'],
    illustrativeOutcome: [
      { metric: '35% Semantic Cache Hit Rate', description: 'Recurring identical prompts served directly from low-latency cache' },
      { metric: 'Zero Cross-Tenant Contention', description: 'Strict token bucket governors preventing noisy-neighbor degradation' },
      { metric: 'Granular Unit Economics', description: 'Real-time infrastructure cost attributed down to individual customer tenants' }
    ],
    disclaimer: 'Example architecture scenario modeling multi-tenant isolation, semantic caching, and cloud cost governance.',
    cloudProvider: 'AWS',
    industry: 'SaaS'
  }
];

export const READINESS_QUESTIONS: ReadinessQuestion[] = [
  {
    id: 1,
    category: 'Data Foundation',
    question: 'How are your enterprise data sources currently structured and accessible?',
    description: 'AI and RAG models require accessible, clean, and indexed data repositories.',
    options: [
      { text: 'Fragmented across departmental silos, legacy files, and isolated databases', score: 25, implication: 'Foundational data unification and ingestion pipelines required' },
      { text: 'Centralized relational databases with periodic batch ETL dumps', score: 55, implication: 'Ready for basic RAG prototypes, but streaming real-time data will need modernization' },
      { text: 'Unified data lakehouse with standardized schemas and metadata catalogs', score: 85, implication: 'Strong foundation for advanced semantic retrieval and agentic tool access' },
      { text: 'Real-time streaming event architecture with automated schema governance and vector indices', score: 100, implication: 'World-class foundation ready for autonomous production AI deployments' }
    ]
  },
  {
    id: 2,
    category: 'Data Foundation',
    question: 'How do you handle document-level permissions and access control?',
    description: 'Preventing unauthorized access to internal confidential information inside model context.',
    options: [
      { text: 'Ad-hoc permissions without centralized role mapping', score: 20, implication: 'High risk of data leakage without pre-query ACL filtering' },
      { text: 'Standard active directory groups, but no automated document tagging', score: 50, implication: 'Requires metadata tagging framework before enterprise deployment' },
      { text: 'Granular role-based access control (RBAC) enforced across file repositories', score: 80, implication: 'Ready for document-level ACL integration in vector search' },
      { text: 'Zero-trust attribute-based access control (ABAC) verified at every retrieval request', score: 100, implication: 'Enterprise-grade security ready for regulated data environments' }
    ]
  },
  {
    id: 3,
    category: 'Infrastructure',
    question: 'What is your current cloud compute and container deployment standard?',
    description: 'Modern AI pipelines require elastic autoscaling and dynamic hardware allocation.',
    options: [
      { text: 'Traditional virtual machines and on-premises physical servers with manual updates', score: 30, implication: 'Cloud containerization is a primary prerequisite' },
      { text: 'Single-cloud virtual machines with basic Docker containers', score: 60, implication: 'Can support lightweight models, but lacks auto-scaling elasticity' },
      { text: 'Managed Kubernetes (EKS/GKE/AKS) with automated CI/CD deployment pipelines', score: 90, implication: 'Ideal infrastructure foundation for multi-agent pods and scalable inference' },
      { text: 'Multi-cloud Kubernetes with Karpenter spot orchestration and GPU node pools', score: 100, implication: 'Cutting-edge infrastructure capable of running heavy custom inference engines' }
    ]
  },
  {
    id: 4,
    category: 'Infrastructure',
    question: 'How do you currently manage cloud infrastructure cost and compute resource allocation?',
    description: 'FinOps practices prevent uncontrolled cloud expenditure as workloads scale.',
    options: [
      { text: 'Review monthly cloud bills after the fact with minimal proactive tracking', score: 25, implication: 'FinOps governance framework needed to avoid AI token budget shocks' },
      { text: 'Basic cloud provider budget alerts with static threshold notifications', score: 55, implication: 'Adequate for development, but needs dynamic unit-economic attribution' },
      { text: 'Automated cost monitoring with tagged resources per engineering team', score: 85, implication: 'Strong cost awareness ready for token allocation governors' },
      { text: 'Continuous FinOps governance with automated spot instance arbitration and dynamic autoscaling', score: 100, implication: 'Maximum cost efficiency across distributed clusters' }
    ]
  },
  {
    id: 5,
    category: 'AI Governance',
    question: 'What policies and guardrails exist for evaluating model accuracy and hallucinations?',
    description: 'Ensuring models produce accurate, verifiable, and compliant outputs.',
    options: [
      { text: 'Informal manual spot checks by developers without systematic benchmarks', score: 20, implication: 'Significant risk of production hallucination and brand degradation' },
      { text: 'Basic prompt regression test suites run occasionally before releases', score: 50, implication: 'Good starting baseline; requires continuous automated evaluation' },
      { text: 'Automated evaluation pipelines measuring hallucination rate, context relevance, and latency', score: 85, implication: 'Robust governance framework supporting mission-critical workflows' },
      { text: 'Comprehensive guardrails with deterministic citation verification and automated rollback', score: 100, implication: 'Zero-hallucination tolerance architecture ready for regulated production' }
    ]
  },
  {
    id: 6,
    category: 'AI Governance',
    question: 'What is your organization’s posture on proprietary data privacy and model training?',
    description: 'Protecting intellectual property from being exposed to public model training sets.',
    options: [
      { text: 'Employees occasionally use public AI tools without clear company guidelines', score: 20, implication: 'Immediate risk of confidential data leakage to third-party models' },
      { text: 'Written policy prohibiting sensitive data input, but no technical enforcement', score: 45, implication: 'Policy-only protections often fail without programmatic guardrails' },
      { text: 'Enterprise API agreements with zero-data-retention guarantees signed with providers', score: 85, implication: 'Safe for commercial LLM consumption with strict privacy terms' },
      { text: 'Private VPC or on-premises confidential compute enclaves with zero third-party egress', score: 100, implication: 'Maximum data sovereignty and regulatory compliance posture' }
    ]
  },
  {
    id: 7,
    category: 'Automation & SRE',
    question: 'How do you monitor and respond to production microservice and pipeline anomalies?',
    description: 'Observability ensures high availability and fast resolution of runtime issues.',
    options: [
      { text: 'Rely primarily on user bug reports and manual log searching after downtime', score: 25, implication: 'High Mean Time to Resolution (MTTR) impacts customer reliability' },
      { text: 'Basic server CPU/RAM metrics and alert emails to on-call engineers', score: 55, implication: 'Sufficient for traditional apps, but misses deep LLM latency bottlenecks' },
      { text: 'Centralized OpenTelemetry distributed tracing and structured log aggregation', score: 85, implication: 'Deep visibility into token latencies, error budgets, and service dependencies' },
      { text: 'Autonomous self-healing infrastructure with predictive anomaly detection and auto-remediation', score: 100, implication: 'Industry-leading reliability with minimal manual engineering toil' }
    ]
  },
  {
    id: 8,
    category: 'Automation & SRE',
    question: 'How mature are your automated deployment and verification workflows?',
    description: 'Enabling rapid, safe iteration without breaking mission-critical environments.',
    options: [
      { text: 'Manual server deployments via SSH or manual console clicks', score: 20, implication: 'High risk of human error during configuration changes' },
      { text: 'Automated CI build scripts, but manual deployment approvals and manual testing', score: 50, implication: 'Solid foundation ready for GitOps modernization' },
      { text: 'Full GitOps CI/CD with automated unit tests and staging environments', score: 85, implication: 'Enables rapid, predictable engineering velocity' },
      { text: 'Continuous GitOps with automated canary analysis, progressive traffic shifting, and instant rollbacks', score: 100, implication: 'World-class delivery cadence with zero-downtime releases' }
    ]
  }
];

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    number: '01',
    title: 'Security by Design',
    tagline: 'Security begins at architecture, not at audit time.',
    description: 'Every interface, message bus, and model invocation assumes a zero-trust posture. We eliminate static credentials, enforce mutual TLS, and isolate workloads cryptographically.',
    practices: [
      'Short-lived SPIFFE/SPIRE workload certificates',
      'Continuous eBPF kernel syscall monitoring',
      'Mandatory pre-query document authorization filtering'
    ],
    icon: 'ShieldCheck'
  },
  {
    number: '02',
    title: 'Observable by Default',
    tagline: 'Production systems require actionable, high-cardinality telemetry.',
    description: 'You cannot optimize or debug what you cannot measure. Every service instruments distributed traces, token latencies, and unit-economic cost metrics from day one.',
    practices: [
      'Vendor-neutral OpenTelemetry instrumentation',
      'Token-level P95 and P99 latency tracking',
      'Automated SLO error budget burn rate alerting'
    ],
    icon: 'Activity'
  },
  {
    number: '03',
    title: 'Automate the Repetitive',
    tagline: 'Automation should exponentially increase engineering leverage.',
    description: 'Human engineering time is an enterprise’s most valuable asset. We automate cluster scaling, canary rollouts, regression testing, and routine maintenance toil.',
    practices: [
      'GitOps declarative state synchronization with ArgoCD',
      'Automated synthetic test suites on every pull request',
      'Dynamic spot instance reclamation drain handlers'
    ],
    icon: 'Zap'
  },
  {
    number: '04',
    title: 'Design for Failure',
    tagline: 'Distributed systems must expect and gracefully absorb component outages.',
    description: 'Cloud zones drop, APIs throttle, and external dependencies degrade. Systems must feature deterministic fallbacks, circuit breakers, and stateful retry queues.',
    practices: [
      'Active-active cross-region failover topologies',
      'Exponential backoff with jitter and fallback routes',
      'Continuous chaos engineering resilience verification'
    ],
    icon: 'Cpu'
  },
  {
    number: '05',
    title: 'Measure Everything',
    tagline: 'Technical decisions must connect to measurable enterprise outcomes.',
    description: 'We reject vanity metrics and ungrounded tech hype. Every architectural decision is benchmarked against latency targets, cloud unit costs, and operational throughput.',
    practices: [
      'Concrete cost-per-transaction accounting models',
      'Continuous model precision and hallucination benchmarking',
      'Transparent before-and-after performance telemetry'
    ],
    icon: 'TrendingUp'
  }
];

export const WORK_TIMELINE: WorkStep[] = [
  {
    step: '01',
    number: 'Step 1',
    title: 'DISCOVER',
    summary: 'Deep-dive architectural diagnostic, constraint mapping, and technical debt audit.',
    activities: [
      'Review existing cloud infrastructure, telemetry, and security policies',
      'Map data access patterns, throughput bottlenecks, and latency requirements',
      'Identify highest-leverage AI automation or modernization opportunities',
      'Establish baseline unit costs and operational velocity benchmarks'
    ],
    deliverables: [
      'Comprehensive Technical Architecture Assessment',
      'Target State Architecture Blueprint & Technology Matrix',
      'Feasibility & Unit-Economic ROI Model'
    ],
    timeline: 'Approx. 2–3 Weeks',
    stakeholders: ['Lead Architect', 'VP Engineering', 'Security Officer', 'Lead Developers']
  },
  {
    step: '02',
    number: 'Step 2',
    title: 'ARCHITECT',
    summary: 'Detailed system modeling, security boundary design, and IaC foundation.',
    activities: [
      'Formulate declarative Infrastructure as Code (Terraform / Kubernetes)',
      'Design deterministic RAG and vector retrieval schemas with ACL filtering',
      'Establish zero-trust network boundaries and workload identity framework',
      'Draft SLA definitions, error budget targets, and incident playbooks'
    ],
    deliverables: [
      'Production-Ready Infrastructure as Code Repositories',
      'Security & Governance Specification Document',
      'API Contract Schemas & Event Streaming Topologies'
    ],
    timeline: 'Approx. 3–4 Weeks',
    stakeholders: ['Principal Architect', 'Cloud SRE Lead', 'Data Engineer', 'App Leads']
  },
  {
    step: '03',
    number: 'Step 3',
    title: 'PROTOTYPE',
    summary: 'Building and validating a production-grade working Proof of Concept (PoC).',
    activities: [
      'Deploy core pipeline in an isolated sandbox environment',
      'Benchmark model inference latency, retrieval precision, and throughput',
      'Conduct rigorous security penetration tests and prompt injection probes',
      'Run user-acceptance workflows with key internal stakeholders'
    ],
    deliverables: [
      'Functional End-to-End PoC Environment',
      'Benchmark Performance & Accuracy Evaluation Report',
      'Security Hardening & Penetration Test Readout'
    ],
    timeline: 'Approx. 3–5 Weeks',
    stakeholders: ['Engineering Squad', 'Product Owners', 'Security Reviewers']
  },
  {
    step: '04',
    number: 'Step 4',
    title: 'DEPLOY',
    summary: 'Production rollout with canary traffic shifting and active telemetry gates.',
    activities: [
      'Execute GitOps deployment with automated progressive canary releases',
      'Activate real-time OpenTelemetry distributed tracing and alert triggers',
      'Validate zero-downtime cutover and transactional data consistency',
      'Conduct hands-on engineering team pair programming and playbook handoff'
    ],
    deliverables: [
      'Live Production Environment with Multi-AZ Redundancy',
      'Real-time Operational Telemetry & Alert Dashboards',
      'Comprehensive Operations & Runbook Documentation'
    ],
    timeline: 'Approx. 4–6 Weeks',
    stakeholders: ['Full Engineering Team', 'SRE On-Call', 'Executive Sponsors']
  },
  {
    step: '05',
    number: 'Step 5',
    title: 'OPTIMIZE',
    summary: 'Continuous FinOps governance, latency tuning, and model evaluation.',
    activities: [
      'Analyze live production telemetry for cost waste and latency outliers',
      'Fine-tune cache policies and spot compute arbitration rules',
      'Iterate on model prompts, chunking strategies, and retrieval weights',
      'Execute quarterly chaos engineering resilience drills'
    ],
    deliverables: [
      'Monthly FinOps & Cost Optimization Readouts',
      'Continuous Model Evaluation & Accuracy Reports',
      'Ongoing Architecture Advisory & Roadmap Planning'
    ],
    timeline: 'Continuous / Quarterly Milestones',
    stakeholders: ['Lead Architect', 'FinOps Lead', 'Engineering Directors']
  }
];

export const SECURITY_CONTROLS: SecurityControl[] = [
  {
    id: 'encryption',
    title: 'End-to-End Encryption & TLS',
    category: 'Data Protection',
    description: 'All network traffic encrypted using TLS 1.3 with forward secrecy. Persistent storage encrypted at rest using AES-256 with customer-managed keys (KMS).',
    architectureImplementation: 'Enforced via automated Envoy sidecars with strict mTLS cipher suites and hardware security module (HSM) key rotation.',
    protocols: ['TLS 1.3', 'AES-256-GCM', 'KMS / HSM Key Rotation', 'WireGuard']
  },
  {
    id: 'identity',
    title: 'Workload Identity & Zero-Trust',
    category: 'Identity & Access',
    description: 'Zero static API credentials. Every microservice and batch job receives short-lived cryptographic X.509 SVID tokens verified before execution.',
    architectureImplementation: 'SPIRE / SPIFFE agent running as a daemonset on Kubernetes, attesting container provenance against kernel cgroups.',
    protocols: ['SPIFFE / SPIRE', 'OIDC Federation', 'HashiCorp Vault', 'mTLS']
  },
  {
    id: 'isolation',
    title: 'Network Micro-Segmentation & Isolation',
    category: 'Network Security',
    description: 'Strict kernel-level packet inspection preventing unauthorized lateral movement across clusters and cloud VPC subnets.',
    architectureImplementation: 'Cilium eBPF network policies operating directly in the Linux kernel without iptables performance bottlenecks.',
    protocols: ['Cilium eBPF', 'VPC Peering', 'PrivateLink', 'Zero Egress Defaults']
  },
  {
    id: 'secrets',
    title: 'Automated Secrets Management',
    category: 'Credential Security',
    description: 'Dynamic database credentials and API tokens generated on-the-fly with automatic 60-minute time-to-live expirations.',
    architectureImplementation: 'HashiCorp Vault integration with Kubernetes service account tokens, eliminating stored plaintext tokens in repositories.',
    protocols: ['Dynamic Vault Leases', 'Cosign Image Signing', 'SOPS Git Encryption']
  },
  {
    id: 'audit',
    title: 'Immutable Audit Logging & SIEM',
    category: 'Governance & Auditing',
    description: 'Tamper-evident operational logging recording every API mutation, tool execution, and administrative access event.',
    architectureImplementation: 'Asynchronous log forwarding to write-once-read-many (WORM) storage with cryptographic checksum validation.',
    protocols: ['WORM Storage', 'OpenTelemetry Logs', 'Syslog RFC 5424', 'Fluent Bit']
  },
  {
    id: 'residency',
    title: 'Data Residency & Sovereignty',
    category: 'Regulatory Alignment',
    description: 'Architectures engineered to confine sensitive data processing strictly within designated geopolitical and cloud boundaries.',
    architectureImplementation: 'Regional cluster partitioning with automated data routing policies preventing cross-border egress.',
    protocols: ['Regional Pinning', 'Confidential Compute Enclaves', 'Isolated VPCs']
  }
];

export const TECH_ECOSYSTEM = [
  {
    category: 'AI & Machine Learning',
    description: 'Frontier model serving, vector indexing, and orchestration runtimes.',
    technologies: ['Python', 'PyTorch', 'vLLM', 'LangGraph', 'Qdrant', 'Hugging Face', 'Triton Server', 'TensorRT-LLM']
  },
  {
    category: 'Cloud Infrastructure',
    description: 'Elastic, multi-cloud compute platforms and infrastructure automation.',
    technologies: ['AWS', 'Google Cloud (GCP)', 'Microsoft Azure', 'Terraform', 'OpenTofu', 'Cilium eBPF', 'Envoy Gateway']
  },
  {
    category: 'Containers & Orchestration',
    description: 'Enterprise container orchestration and GitOps delivery pipelines.',
    technologies: ['Kubernetes', 'Docker', 'Karpenter', 'ArgoCD', 'Helm', 'Keda', 'Flux']
  },
  {
    category: 'Data & Event Streaming',
    description: 'High-throughput stream processing, distributed databases, and analytical stores.',
    technologies: ['Apache Kafka', 'PostgreSQL', 'Redis Enterprise', 'ClickHouse', 'Apache Flink', 'Apache Iceberg', 'DuckDB']
  },
  {
    category: 'Observability & Reliability',
    description: 'Unified telemetry, distributed tracing, and automated reliability tooling.',
    technologies: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Datadog', 'Chaos Mesh', 'OpenCost', 'Falco']
  }
];

export const ENGAGEMENT_TIERS: EngagementTier[] = [
  {
    id: 'sprint-discovery',
    name: 'Sprint Discovery',
    tagline: 'Technical architecture review, constraint diagnostic, and working PoC.',
    scopeSummary: 'Targeted evaluation designed to derisk high-stakes AI or cloud initiatives through concrete prototyping before major organizational commitment.',
    includedCapabilities: [
      'Comprehensive cloud infrastructure & cost diagnostic',
      'AI feasibility analysis & data quality evaluation',
      'Target architecture specification & technology matrix',
      'Working Proof of Concept (PoC) deployed in isolated sandbox',
      'Executive readout with unit-economic roadmap'
    ],
    deliverables: [
      'Technical Architecture Assessment Document',
      'Functional PoC code repository & setup guides',
      'Detailed TCO & infrastructure budget projections'
    ],
    timelineGuideline: 'Typical 3 to 4 weeks'
  },
  {
    id: 'enterprise-squad',
    name: 'Dedicated Enterprise Squad',
    tagline: 'Senior specialized engineering pod embedded inside your organization.',
    scopeSummary: 'Full-stack cross-functional pod (Principal Architect, Cloud SREs, AI Engineers) delivering weekly production-ready iterations directly within your Git repos.',
    isPopular: true,
    includedCapabilities: [
      'Dedicated cross-functional engineering pod embedded with your team',
      'Full production implementation of AI, RAG, and cloud pipelines',
      'Direct Slack/Teams integration with agile weekly delivery cycles',
      'Complete CI/CD, GitOps, and zero-trust security configuration',
      'Active FinOps monitoring with continuous cost governance',
      'Pair programming and technical capability transfer to internal staff'
    ],
    deliverables: [
      'Production Kubernetes & cloud infrastructure repositories',
      'End-to-end automated multi-agent & RAG pipelines',
      'Complete operational runbooks and telemetry dashboards'
    ],
    timelineGuideline: 'Quarterly engagement cycles'
  },
  {
    id: 'custom-transformation',
    name: 'Custom Transformation',
    tagline: 'Multi-squad enterprise modernization and mission-critical engineering.',
    scopeSummary: 'Comprehensive engineering partnership for large-scale legacy monolith migration, global data platform deployment, and executive architectural advisory.',
    includedCapabilities: [
      'Multi-squad deployment across complex distributed enterprise domains',
      'Legacy monolith Strangler Fig modernization and database decoupling',
      'Custom on-premises or confidential cloud enclave LLM deployment',
      '24/7 SRE reliability framework setup with chaos engineering drills',
      'C-suite technical roadmap advisory and architecture governance'
    ],
    deliverables: [
      'Full enterprise platform modernization rollout',
      'Automated disaster recovery & active-active cluster topology',
      'Executive technical governance framework and architecture playbooks'
    ],
    timelineGuideline: 'Milestone-based multi-phase roadmap'
  }
];

export const RESOURCE_CARDS: ResourceCard[] = [
  {
    id: 'rag-guide',
    title: 'Enterprise RAG Architecture Guide',
    category: 'Architecture Whitepaper',
    description: 'A deep-dive technical specification on hybrid dense-sparse vector search, citation guardrails, and role-based access filtering.',
    readTime: '18 min read',
    status: 'Available Preview',
    keyTakeaways: [
      'Why pure dense vector search fails in enterprise domain lexicons',
      'Implementing document-level ACLs before semantic embedding retrieval',
      'Benchmarking cross-encoder rerankers against sub-second latency budgets'
    ]
  },
  {
    id: 'readiness-checklist',
    title: 'Enterprise AI Readiness Checklist',
    category: 'Engineering Checklist',
    description: 'A practical 24-point evaluation matrix covering data hygiene, GPU cluster planning, token cost governance, and security controls.',
    readTime: '12 min read',
    status: 'Available Preview',
    keyTakeaways: [
      'Evaluating unstructured data ingestion maturity',
      'Establishing FinOps governors before deploying model endpoints',
      'Essential security policies for confidential data protection'
    ]
  },
  {
    id: 'k8s-cost-guide',
    title: 'Kubernetes Cost Optimization & FinOps Guide',
    category: 'Cloud Engineering',
    description: 'Proven architectural strategies for eliminating idle cluster capacity, tuning spot instance pools, and reducing cross-AZ network egress.',
    readTime: '22 min read',
    status: 'Available Preview',
    keyTakeaways: [
      'Configuring Karpenter for sub-minute node provisioning and graceful drain',
      'Measuring real-time pod unit economics with OpenCost',
      'Minimizing cross-AZ data transfer fees in multi-region topologies'
    ]
  },
  {
    id: 'llm-eval-framework',
    title: 'LLM Evaluation & Guardrails Framework',
    category: 'AI Governance',
    description: 'Methodologies for automated regression testing of model outputs, citation verification, and prompt injection defense in CI/CD.',
    readTime: '15 min read',
    status: 'Available Preview',
    keyTakeaways: [
      'Building synthetic test suites for domain-specific question answering',
      'Quantifying hallucination rates in production pipelines',
      'Automated pull-request gates for prompt revisions'
    ]
  },
  {
    id: 'zero-trust-guide',
    title: 'Zero-Trust Architecture for Cloud Workloads',
    category: 'Cyber Resilience',
    description: 'Implementing cryptographic workload identities, kernel-level eBPF packet inspection, and dynamic secrets management.',
    readTime: '20 min read',
    status: 'Coming Soon',
    keyTakeaways: [
      'Deploying SPIFFE/SPIRE for mutual TLS between container pods',
      'Observing kernel syscalls with Tetragon to detect anomalous behavior',
      'Replacing static database passwords with ephemeral Vault tokens'
    ]
  },
  {
    id: 'deployment-blueprint',
    title: 'Enterprise AI Deployment Blueprint',
    category: 'Implementation Blueprint',
    description: 'An architectural reference implementation for deploying private LLMs on managed Kubernetes with Prometheus telemetry.',
    readTime: '25 min read',
    status: 'Coming Soon',
    keyTakeaways: [
      'Sizing GPU node pools for low-latency batch inference',
      'Configuring Triton and vLLM for high-throughput model serving',
      'End-to-end distributed tracing across microservices and model servers'
    ]
  }
];

export const RESPONSIBLE_AI_PILLARS = [
  {
    title: 'Data Privacy & Sovereignty',
    description: 'Workloads execute within private enterprise VPCs or confidential hardware enclaves with zero third-party data egress or training retention.',
    icon: 'Lock'
  },
  {
    title: 'Deterministic Guardrails',
    description: 'System prompts and multi-agent tools operate within strict state-machine bounds with verifiable citation requirements.',
    icon: 'Shield'
  },
  {
    title: 'Continuous Evaluation',
    description: 'Automated CI/CD test harnesses continuously benchmark retrieval precision, context recall, and hallucination metrics.',
    icon: 'CheckCircle'
  },
  {
    title: 'Human-in-the-Loop Oversight',
    description: 'Destructive, financial, or sensitive actions require explicit human supervisor approval with full transactional rollback.',
    icon: 'UserCheck'
  },
  {
    title: 'Traceability & Auditability',
    description: 'Every token generated, chunk retrieved, and tool invoked is logged in an immutable distributed trace for post-incident review.',
    icon: 'FileText'
  },
  {
    title: 'Model Governance & Versioning',
    description: 'All weights, system prompts, and embedding models are version-controlled with automated rollback capabilities.',
    icon: 'GitBranch'
  }
];

export const IMPACT_METRICS = [
  {
    value: 'Sub-15ms',
    label: 'Real-Time Inference SLA',
    detail: 'Target latency benchmark for private hybrid-RAG and streaming event decision loops.'
  },
  {
    value: '99.995%',
    label: 'Architecture Availability Target',
    detail: 'Resilient multi-AZ Kubernetes topology with active-active failover design.'
  },
  {
    value: 'Zero Egress',
    label: 'Proprietary Data Sovereignty',
    detail: 'Workloads execute inside customer VPCs or confidential hardware enclaves.'
  },
  {
    value: '30–40%',
    label: 'Modeled Cloud FinOps Efficiency',
    detail: 'Average idle capacity reduction identified across representative enterprise container audits.'
  }
];

// Alias for backwards compatibility with previous components
export const SERVICES_DATA = CAPABILITIES;

export const PRICING_DATA = [
  {
    id: 'sprint-discovery',
    name: 'Sprint Discovery',
    tagline: 'Technical architecture review, constraint diagnostic, and working PoC.',
    description: 'Targeted architectural diagnostic to derisk high-stakes AI or cloud initiatives with a production-grade working prototype.',
    quarterlyPrice: '$35,000',
    annualPrice: '$28,000 / mo',
    sla: '5 Business Day Milestone Commitments',
    popular: false,
    features: [
      'Comprehensive cloud infrastructure & FinOps audit',
      'AI feasibility analysis & data quality evaluation',
      'Target architecture specification & technology matrix',
      'Working Proof of Concept (PoC) deployed in isolated sandbox',
      'Executive readout with unit-economic roadmap'
    ]
  },
  {
    id: 'enterprise-squad',
    name: 'Dedicated Enterprise Squad',
    tagline: 'Senior cross-functional engineering pod embedded inside your organization.',
    description: 'Principal Architect, Cloud SREs, and AI Engineers shipping production code directly inside your Git repositories weekly.',
    quarterlyPrice: '$68,000 / mo',
    annualPrice: '$55,000 / mo',
    sla: '99.99% Availability & Priority Slack/Teams',
    popular: true,
    features: [
      'Dedicated cross-functional engineering pod embedded with your team',
      'Full production implementation of AI, RAG, and cloud pipelines',
      'Direct Slack/Teams integration with agile weekly delivery cycles',
      'Complete CI/CD, GitOps, and zero-trust security configuration',
      'Active FinOps monitoring with continuous cost governance',
      'Pair programming and technical capability transfer to internal staff'
    ]
  },
  {
    id: 'custom-transformation',
    name: 'Custom Transformation',
    tagline: 'Multi-squad enterprise modernization and mission-critical engineering.',
    description: 'Comprehensive engineering partnership for large-scale legacy monolith migration, global data platform deployment, and executive advisory.',
    quarterlyPrice: 'Custom Scope',
    annualPrice: 'Custom Scope',
    sla: 'Contractually Bonded 99.995% SLA & 24/7 Dedicated SRE',
    popular: false,
    features: [
      'Multi-squad deployment across complex distributed enterprise domains',
      'Legacy monolith Strangler Fig modernization and database decoupling',
      'Custom on-premises or confidential cloud enclave LLM deployment',
      '24/7 SRE reliability framework setup with chaos engineering drills',
      'C-suite technical roadmap advisory and architecture governance'
    ]
  }
];

export const LEADERSHIP_TEAM = [
  {
    name: 'Dr. Elena Vance',
    role: 'Principal Systems Architect & Co-Founder',
    bio: 'Former principal distributed systems lead with 15+ years architecting multi-region Kubernetes topologies and low-latency financial transaction meshes.',
    expertise: ['Distributed Consensus', 'eBPF Kernel Security', 'FinOps Topology'],
    initials: 'EV'
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Enterprise AI & Inference Engineering',
    bio: 'Specialist in private LLM deployment, deterministic RAG pipelines, and model quantization for hardware-isolated enclaves.',
    expertise: ['vLLM Acceleration', 'Deterministic Guardrails', 'Vector Retrieval'],
    initials: 'MC'
  },
  {
    name: 'Aisha Al-Mansoor',
    role: 'VP of Cloud Infrastructure & SRE',
    bio: 'Pioneered zero-downtime multi-cloud migrations and automated chaos engineering frameworks for high-throughput telecommunications networks.',
    expertise: ['Kubernetes Multi-Cloud', 'Chaos Engineering', 'OpenTelemetry Tracing'],
    initials: 'AM'
  }
];
