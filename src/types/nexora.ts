export interface ArchitectureNode {
  id: string;
  name: string;
  category: string;
  purpose: string;
  technologies: string[];
  securityConsiderations: string[];
  scalabilityConsiderations: string[];
  icon: string;
}

export interface ArchitectureBlueprint {
  title: string;
  category: string;
  summary: string;
  diagramSteps: {
    stage: string;
    description: string;
    technologies: string[];
  }[];
  securityArchitecture: string[];
  typicalWorkflow: string[];
  deliverables: string[];
}

export interface CapabilityCard {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  blueprint: ArchitectureBlueprint;
}

// Alias for backwards-compatibility
export type ServiceCard = CapabilityCard;

export interface CaseStudy {
  id: string;
  domain: string;
  scenarioTitle: string;
  problem: string;
  pipelineStages: { name: string; description: string }[];
  technologies: string[];
  illustrativeOutcome: {
    metric: string;
    description: string;
  }[];
  disclaimer: string;
  cloudProvider: 'AWS' | 'GCP' | 'Azure';
  industry: 'Fintech' | 'Healthcare' | 'Logistics' | 'SaaS';
}

export interface ReadinessQuestion {
  id: number;
  category: 'Data Foundation' | 'Infrastructure' | 'AI Governance' | 'Automation & SRE';
  question: string;
  description: string;
  options: {
    text: string;
    score: number;
    implication: string;
  }[];
}

export interface EngineeringPrinciple {
  number: string;
  title: string;
  tagline: string;
  description: string;
  practices: string[];
  icon: string;
}

export interface WorkStep {
  step: string;
  number: string;
  title: string;
  summary: string;
  activities: string[];
  deliverables: string[];
  timeline: string;
  stakeholders: string[];
}

export interface SecurityControl {
  id: string;
  title: string;
  category: string;
  description: string;
  architectureImplementation: string;
  protocols: string[];
}

export interface EngagementTier {
  id: string;
  name: string;
  tagline: string;
  scopeSummary: string;
  isPopular?: boolean;
  includedCapabilities: string[];
  deliverables: string[];
  timelineGuideline: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  quarterlyPrice: string;
  annualPrice: string;
  features: string[];
  popular?: boolean;
  sla: string;
}

export interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

export interface LeadershipMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  initials: string;
}

export interface ResourceCard {
  id: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
  status: 'Available Preview' | 'Coming Soon';
  keyTakeaways: string[];
}
