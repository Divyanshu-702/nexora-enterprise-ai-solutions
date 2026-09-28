import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const port = Number(process.env.PORT || 3000);

// Initialize Gemini SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Default fallback website structure if generation fails
const defaultWebsite = {
  title: "Nexus Digital Agency",
  tagline: "Empowering Businesses with Next-Gen AI Solutions",
  description: "We build high-performance web applications, cloud infrastructure, and intelligent automation systems tailored for modern enterprises.",
  heroBadge: "🚀 #1 AI Solution Partner 2026",
  primaryColor: "indigo",
  accentColor: "violet",
  theme: "modern",
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    heading: "Transforming Ideas Into Intelligent Digital Realities",
    subtitle: "Accelerate your growth with cutting-edge software architecture, AI-driven automation, and world-class design.",
    primaryCta: "Start Free Trial",
    secondaryCta: "Schedule Demo",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
  },
  stats: [
    { value: "99.8%", label: "Client Satisfaction" },
    { value: "$45M+", label: "Client Revenue Generated" },
    { value: "250+", label: "Projects Completed" },
    { value: "24/7", label: "Dedicated Expert Support" }
  ],
  features: [
    {
      title: "AI-Powered Automation",
      description: "Streamline operations with custom LLM workflows and intelligent task routers.",
      icon: "Cpu"
    },
    {
      title: "Scalable Cloud Architecture",
      description: "Enterprise-grade reliability built on distributed serverless infrastructure.",
      icon: "Cloud"
    },
    {
      title: "Conversion-Optimized UI/UX",
      description: "Bespoke digital experiences engineered for maximum user engagement and conversion.",
      icon: "Layout"
    }
  ],
  about: {
    title: "Innovating the Future of Enterprise Technology",
    story: "Founded in 2022, Nexus Digital started with a simple vision: to bridge the gap between complex artificial intelligence and intuitive business applications. Today, our multidisciplinary team of engineers, designers, and strategists partners with global brands to redefine industry standards.",
    mission: "To democratize advanced technology and empower organizations of all sizes to achieve exponential growth.",
    vision: "A world where human creativity is amplified by seamless, intelligent software ecosystems.",
    team: [
      { name: "Elena Rostova", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" },
      { name: "Marcus Chen", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
      { name: "Sophia Martinez", role: "Head of Product Design", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" }
    ]
  },
  services: [
    {
      title: "Enterprise AI Integration",
      price: "$4,999",
      period: "project",
      description: "Custom AI agents, RAG knowledge bases, and LLM fine-tuning tailored to your proprietary data.",
      features: ["Custom Model Fine-tuning", "Secure Data Pipeline", "API Integration", "24/7 Monitoring"]
    },
    {
      title: "Full-Stack Web Engineering",
      price: "$2,999",
      period: "project",
      description: "High-performance React & Node.js web apps with lightning-fast load times and robust security.",
      features: ["Responsive UI/UX", "Cloud Database Setup", "SEO Optimization", "CI/CD Pipeline"]
    },
    {
      title: "Digital Growth Strategy",
      price: "$1,499",
      period: "month",
      description: "Data-driven marketing, conversion rate optimization, and automated customer acquisition funnels.",
      features: ["Analytics Dashboard", "A/B Testing", "Funnel Optimization", "Weekly Reports"]
    }
  ],
  portfolio: [
    { title: "FinTech AI Assistant", category: "Artificial Intelligence", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" },
    { title: "Global E-Commerce Hub", category: "Web Application", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop" },
    { title: "HealthTech Tele-Portal", category: "Cloud Infrastructure", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop" }
  ],
  testimonials: [
    { quote: "Nexus completely transformed our workflow. Our customer resolution time dropped by 70% within two weeks.", author: "David Vance", title: "VP of Operations, Apex Global" },
    { quote: "The absolute best development partner we've ever worked with. Delivered our SaaS platform 3 weeks ahead of schedule.", author: "Sarah Jenkins", title: "Founder, CloudSync" }
  ],
  faq: [
    { question: "How long does a typical project take?", answer: "Most web applications and AI integrations are delivered within 2 to 6 weeks depending on scope." },
    { question: "Do you provide ongoing maintenance?", answer: "Yes! We offer comprehensive SLA-backed maintenance and continuous optimization packages." },
    { question: "Can we integrate with our existing CRM and tools?", answer: "Absolutely. We build custom APIs and secure webhooks to connect with Salesforce, HubSpot, Stripe, and more." }
  ],
  contact: {
    heading: "Let's Build Something Exceptional Together",
    subheading: "Get in touch with our team today and receive a complimentary technical consultation.",
    address: "100 Innovation Way, Suite 400, San Francisco, CA",
    email: "contact@nexusdigital.ai",
    phone: "+1 (555) 382-9011"
  }
};

// API Route: Nexora Intelligence Architecture Analysis
app.post('/api/analyze-architecture', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Robust fallback library for instant illustrative analysis
  const fallbackAnalyses: Record<string, any> = {
    'cloud': {
      problemAnalysis: "High cloud infrastructure expenses typically stem from over-provisioned idle compute, unoptimized cross-AZ network egress, lack of spot instance arbitration, and unpruned persistent storage volumes.",
      architecture: "Automated Karpenter Kubernetes auto-scaling paired with OpenCost/Kubecost telemetry governors and multi-cloud spot instance pools with active-active drain handlers.",
      technologyStack: ["Kubernetes", "Karpenter", "OpenCost", "Terraform", "Envoy Gateway", "Prometheus"],
      securityConsiderations: ["Zero-trust workload identity (SPIFFE/SPIRE)", "Least-privilege cloud IAM roles", "Encrypted telemetry and billing export pipelines"],
      implementationPlan: [
        { phase: "Phase 1: Ingestion & Telemetry Audit", duration: "Weeks 1-2", details: "Deploy non-intrusive eBPF cost probes and audit AWS CUR / GCP Billing datasets for idle waste." },
        { phase: "Phase 2: Compute Autoscaling Modernization", duration: "Weeks 3-4", details: "Migrate legacy node groups to dynamic Karpenter spot orchestrators with graceful draining." },
        { phase: "Phase 3: Storage & Network Topology Refactoring", duration: "Weeks 5-6", details: "Consolidate cross-region replication topologies and enforce automated volume snapshot lifecycles." }
      ],
      expectedImpact: [
        "Illustrative 30-45% reduction in monthly compute overhead",
        "Sub-30 second cluster scaling response times during demand spikes",
        "Automated unit-economic cost attribution per engineering domain"
      ],
      potentialRisks: [
        "Spot instance reclamation interruptions requiring robust stateless pod architecture",
        "Initial developer hesitation toward strict pod resource requests and limits"
      ]
    },
    'rag': {
      problemAnalysis: "Enterprise private RAG systems frequently suffer from vector hallucination, high query latency, stale document embeddings, and lack of strict role-based document access control (RBAC).",
      architecture: "Hybrid vector + sparse BM25 retrieval pipeline with semantic chunking, cross-encoder reranking, and deterministic citation guardrails deployed in a private VPC.",
      technologyStack: ["Python", "Qdrant / Pinecone", "Cohere Rerank", "LangGraph", "vLLM", "Apache Tika"],
      securityConsiderations: ["Document-level ACL enforcement before semantic embedding retrieval", "Private VPC hosting with zero third-party data egress", "Confidential compute enclaves for proprietary weights"],
      implementationPlan: [
        { phase: "Phase 1: Document Parsing & Metadata Ingestion", duration: "Weeks 1-3", details: "Build asynchronous parsing pipelines extracting hierarchical headings, tables, and access control tags." },
        { phase: "Phase 2: Hybrid Retrieval & Reranker Optimization", duration: "Weeks 4-6", details: "Benchmark dense vector embeddings against domain-specific lexicons with cross-encoder rerankers." },
        { phase: "Phase 3: Guardrail Verification & Citation Engine", duration: "Weeks 7-8", details: "Deploy deterministic verification layers ensuring all synthesized answers cite verifiable source chunks." }
      ],
      expectedImpact: [
        "Illustrative sub-400ms end-to-end question-answering latency",
        "Drastic reduction in ungrounded model hallucinations via strict citation verification",
        "Strict adherence to enterprise data sovereignty and document clearance levels"
      ],
      potentialRisks: [
        "Complex document format variance (scanned PDFs, unstructured tables) requiring fallback parsers",
        "GPU capacity constraints for on-premises dense embedding generation"
      ]
    },
    'automation': {
      problemAnalysis: "Manual customer support and internal workflows introduce high turnaround latency, error-prone data entry, and fragmented context across multiple SaaS applications.",
      architecture: "Human-in-the-loop multi-agent orchestration fabric with deterministic tool execution, transactional rollback capabilities, and strict audit logging.",
      technologyStack: ["TypeScript", "LangGraph", "Temporal.io", "Apache Kafka", "Redis", "OpenTelemetry"],
      securityConsiderations: ["API token vaulting with rotation (HashiCorp Vault)", "Human supervisor sign-off on destructive actions", "Comprehensive audit trails on automated API dispatches"],
      implementationPlan: [
        { phase: "Phase 1: Workflow Decomposition & Schema Design", duration: "Weeks 1-2", details: "Map recurring human support touchpoints into deterministic state-machine graphs." },
        { phase: "Phase 2: Agent Tool Integration & Mock Sandboxing", duration: "Weeks 3-5", details: "Integrate CRM, ticketing, and billing APIs inside isolated integration sandbox environments." },
        { phase: "Phase 3: Canary Rollout & Human-in-the-Loop Supervision", duration: "Weeks 6-8", details: "Enable agents to draft actions with mandatory human approval before auto-resolving tier-1 tickets." }
      ],
      expectedImpact: [
        "Illustrative 65-80% automation of repetitive tier-1 operational requests",
        "Average ticket resolution time compressed from hours to seconds",
        "Zero automated hallucinations in transactional database updates"
      ],
      potentialRisks: [
        "Third-party API rate limits and unexpected schema changes in external SaaS integrations",
        "Edge cases requiring escalation paths to human subject matter experts"
      ]
    },
    'legacy': {
      problemAnalysis: "Monolithic architectures often suffer from tight coupling, fragile deployment cycles, monolithic database lock contention, and lack of horizontal scalability.",
      architecture: "Strangler Fig pattern migration with domain-driven boundary separation, event-driven change-data-capture (CDC), and zero-downtime canary traffic routing.",
      technologyStack: ["Go", "Kafka / Debezium", "PostgreSQL", "Envoy Gateway", "Docker", "ArgoCD"],
      securityConsiderations: ["mTLS between modernized microservices", "Encrypted event streams in transit and at rest", "Centralized OpenID Connect (OIDC) authentication"],
      implementationPlan: [
        { phase: "Phase 1: Domain Modeling & Telemetry Mapping", duration: "Weeks 1-3", details: "Instrument legacy monolith to map request hot-paths, dependency graphs, and database query latencies." },
        { phase: "Phase 2: Change Data Capture & Read-Replica Sync", duration: "Weeks 4-6", details: "Deploy Debezium CDC connectors to stream real-time database mutations to decoupled services." },
        { phase: "Phase 3: Incremental Traffic Cutover & Canary Verification", duration: "Weeks 7-10", details: "Route live API traffic via Envoy Gateway feature flags, validating data parity before decommissioning." }
      ],
      expectedImpact: [
        "Deployment frequency elevated from monthly release freezes to continuous on-demand releases",
        "Decoupled service blast radius preventing cascade failures across the entire application",
        "Significantly improved system observability and unit-level error isolation"
      ],
      potentialRisks: [
        "Distributed transaction consistency challenges requiring eventual consistency patterns (Sagas)",
        "Dual-write synchronization overhead during transitional migration period"
      ]
    }
  };

  // Determine closest fallback key
  const lowerPrompt = prompt.toLowerCase();
  let defaultAnalysis = fallbackAnalyses['cloud'];
  if (lowerPrompt.includes('rag') || lowerPrompt.includes('private') || lowerPrompt.includes('llm') || lowerPrompt.includes('model')) {
    defaultAnalysis = fallbackAnalyses['rag'];
  } else if (lowerPrompt.includes('workflow') || lowerPrompt.includes('support') || lowerPrompt.includes('automate')) {
    defaultAnalysis = fallbackAnalyses['automation'];
  } else if (lowerPrompt.includes('legacy') || lowerPrompt.includes('monolith') || lowerPrompt.includes('modernize')) {
    defaultAnalysis = fallbackAnalyses['legacy'];
  }

  // Attempt live Gemini model analysis if API key is provided
  try {
    if (process.env.GEMINI_API_KEY) {
      const systemInstruction = `You are a Principal Enterprise Systems Architect at Nexora Enterprise & AI Solutions.
Analyze the user's operational optimization prompt and produce a structured, technically credible architectural recommendation.
Do NOT fabricate real-world client names, guarantees, or certifications.
You must return valid JSON matching this exact schema:
{
  "problemAnalysis": string,
  "architecture": string,
  "technologyStack": [string],
  "securityConsiderations": [string],
  "implementationPlan": [
    { "phase": string, "duration": string, "details": string }
  ],
  "expectedImpact": [string],
  "potentialRisks": [string]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze this enterprise engineering problem: "${prompt}". Provide an illustrative architectural recommendation.`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const text = response.text;
      if (text) {
        let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
          cleaned = cleaned.substring(firstBrace, lastBrace + 1);
        }
        const parsed = JSON.parse(cleaned);
        return res.json({ ...parsed, isLiveModel: true });
      }
    }
  } catch (err: any) {
    console.warn('Gemini live analysis fallback triggered:', err.message);
  }

  // Return realistic fallback with illustrative tag
  return res.json({ ...defaultAnalysis, isLiveModel: false });
});


// API Route: AI Rewrite Section
app.post('/api/ai-rewrite', async (req, res) => {
  try {
    const { sectionName, currentData, instruction } = req.body;
    
    const prompt = `Rewrite or improve the following website section (${sectionName}) based on the user instruction: "${instruction}".
Current Data: ${JSON.stringify(currentData)}
Return the updated JSON object for this section only, keeping the exact same keys/structure.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    let cleaned = text?.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim() || '{}';
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    res.json(JSON.parse(cleaned));
  } catch (error: any) {
    console.error('Error rewriting section:', error);
    res.status(500).json({ error: error.message });
  }
});

// API Route: Generate AI Image
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, aspectRatio = "16:9" } = req.body;
    const validRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    const targetRatio = validRatios.includes(aspectRatio) ? aspectRatio : "16:9";
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: targetRatio,
        },
      },
    });

    let imageUrl = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    if (!imageUrl) {
      imageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop";
    }

    res.json({ imageUrl });
  } catch (error: any) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: error.message });
  }
});

// Vite middleware setup for development
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`NexusAI Builder server running on port ${port}`);
});
