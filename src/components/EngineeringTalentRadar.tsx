import React, { useState } from 'react';
import { Cpu, Shield, Zap, Award, Users, CheckCircle, ArrowRight, Terminal } from 'lucide-react';

interface TalentTier {
  id: string;
  name: string;
  tagline: string;
  composition: string;
  scores: {
    aiLlm: number;
    cloudInfra: number;
    sreReliability: number;
    dataStreaming: number;
    zeroTrustSecurity: number;
    durableAutomation: number;
  };
  teamLeads: { name: string; role: string; certs: string }[];
}

export const EngineeringTalentRadar: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('principal');

  const tiers: Record<string, TalentTier> = {
    principal: {
      id: 'principal',
      name: 'Principal & Staff Architects',
      tagline: '15+ Years Enterprise Systems Experience • PhD & Ex-BigTech Principal Engineers',
      composition: '100% Principal-Led Engagement (No junior delegation)',
      scores: {
        aiLlm: 98,
        cloudInfra: 96,
        sreReliability: 95,
        dataStreaming: 94,
        zeroTrustSecurity: 97,
        durableAutomation: 96
      },
      teamLeads: [
        { name: 'Dr. Alistair Vance', role: 'Chief AI Systems Architect', certs: 'Ex-Google Brain, Stanford AI Lab' },
        { name: 'Elena Rostova', role: 'Principal Cloud & FinOps Lead', certs: 'AWS Certified Solutions Architect - Professional' },
        { name: 'Marcus Thorne', role: 'Head of Zero-Trust Security', certs: 'CISSP, CKS, Offensive Security Certified' }
      ]
    },
    senior: {
      id: 'senior',
      name: 'Senior Elite Squad Leads',
      tagline: '10–15 Years Specialized Engineering • High-Velocity Execution Squads',
      composition: 'Dedicated Squad Leads paired with Principal Overseers',
      scores: {
        aiLlm: 90,
        cloudInfra: 92,
        sreReliability: 91,
        dataStreaming: 89,
        zeroTrustSecurity: 90,
        durableAutomation: 92
      },
      teamLeads: [
        { name: 'Siddharth Mehta', role: 'Senior RAG & Vector Systems Lead', certs: 'Qdrant Certified Architect' },
        { name: 'Chloe D\'Souza', role: 'Senior SRE & Kubernetes Reliability Lead', certs: 'CNCF Ambassador, CKA' },
        { name: 'Liam O\'Connor', role: 'Distributed Streaming Engineer', certs: 'Confluent Certified Kafka Expert' }
      ]
    },
    specialist: {
      id: 'specialist',
      name: 'Specialist Domain Engineers',
      tagline: 'Deep-Domain Execution • Fine-Tuning, eBPF, Kafka, & Durable Workflows',
      composition: 'Embedded domain experts for accelerated delivery',
      scores: {
        aiLlm: 85,
        cloudInfra: 88,
        sreReliability: 86,
        dataStreaming: 92,
        zeroTrustSecurity: 84,
        durableAutomation: 88
      },
      teamLeads: [
        { name: 'Kenji Sato', role: 'GPU Inference Optimization Specialist', certs: 'NVIDIA Deep Learning Institute Expert' },
        { name: 'Aisha Al-Mansoor', role: 'FinOps & Cost Governance Engineer', certs: 'FinOps Certified Practitioner' },
        { name: 'Julian Rossi', role: 'Workflow Automation Specialist', certs: 'Temporal Certified Engineer' }
      ]
    }
  };

  const currentTier = tiers[selectedTier];

  // Radar points calculation (6 axes)
  // Center is (200, 200), radius is 140
  const axes = [
    { label: 'AI / LLM RAG', key: 'aiLlm', angle: -Math.PI / 2 },
    { label: 'Cloud & Kubernetes', key: 'cloudInfra', angle: -Math.PI / 2 + (Math.PI / 3) },
    { label: 'SRE Reliability', key: 'sreReliability', angle: -Math.PI / 2 + (2 * Math.PI / 3) },
    { label: 'Data Streaming', key: 'dataStreaming', angle: -Math.PI / 2 + (3 * Math.PI / 3) },
    { label: 'Zero-Trust Security', key: 'zeroTrustSecurity', angle: -Math.PI / 2 + (4 * Math.PI / 3) },
    { label: 'Durable Automation', key: 'durableAutomation', angle: -Math.PI / 2 + (5 * Math.PI / 3) }
  ];

  const getPolygonPoints = (scores: TalentTier['scores']) => {
    return axes.map((axis) => {
      const val = (scores[axis.key as keyof typeof scores] / 100) * 140;
      const x = 200 + val * Math.cos(axis.angle);
      const y = 200 + val * Math.sin(axis.angle);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <section id="talent-radar" className="py-24 bg-[#070B14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Engineering Talent Radar</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Elite Engineering Competency & Squad Matrix
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Inspect our senior engineering competency across AI systems, cloud infrastructure, and SRE resilience. Toggle seniority tiers to review certified squad composition.
          </p>
        </div>

        {/* Seniority Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {Object.values(tiers).map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-cyan-400 shadow-lg shadow-indigo-600/30'
                    : 'bg-[#0F172A] hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                {tier.name}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Radar Chart + Squad Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Radar Visualization */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#0F172A]/90 border border-slate-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-400">
              Competency Polygon (Max 100)
            </div>

            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center my-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 400">
                {/* Background Radar Rings */}
                {[0.25, 0.5, 0.75, 1].map((scale, idx) => (
                  <polygon
                    key={idx}
                    points={axes.map((axis) => {
                      const r = 140 * scale;
                      return `${200 + r * Math.cos(axis.angle)},${200 + r * Math.sin(axis.angle)}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Axis Lines */}
                {axes.map((axis, idx) => {
                  const x = 200 + 140 * Math.cos(axis.angle);
                  const y = 200 + 140 * Math.sin(axis.angle);
                  return (
                    <line key={idx} x1="200" y1="200" x2={x} y2={y} stroke="#1E293B" strokeWidth="1.5" />
                  );
                })}

                {/* Filled Polygon for Current Tier */}
                <polygon
                  points={getPolygonPoints(currentTier.scores)}
                  fill="rgba(6, 182, 212, 0.2)"
                  stroke="#06B6D4"
                  strokeWidth="2.5"
                  className="transition-all duration-500 ease-out"
                />

                {/* Score Data Points */}
                {axes.map((axis, idx) => {
                  const score = currentTier.scores[axis.key as keyof typeof currentTier.scores];
                  const val = (score / 100) * 140;
                  const x = 200 + val * Math.cos(axis.angle);
                  const y = 200 + val * Math.sin(axis.angle);
                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r="5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" className="transition-all duration-500" />
                    </g>
                  );
                })}

                {/* Axis Labels */}
                {axes.map((axis, idx) => {
                  const labelRadius = 175;
                  const x = 200 + labelRadius * Math.cos(axis.angle);
                  const y = 200 + labelRadius * Math.sin(axis.angle);
                  const score = currentTier.scores[axis.key as keyof typeof currentTier.scores];
                  
                  // Text alignment helper
                  let textAnchor: "start" | "middle" | "end" = "middle";
                  if (Math.abs(Math.cos(axis.angle)) > 0.3) {
                    textAnchor = Math.cos(axis.angle) > 0 ? "start" : "end";
                  }

                  return (
                    <text
                      key={idx}
                      x={x}
                      y={y}
                      fill="#94A3B8"
                      fontSize="11"
                      fontFamily="monospace"
                      textAnchor={textAnchor}
                      dominantBaseline="middle"
                      className="font-semibold"
                    >
                      {axis.label} ({score})
                    </text>
                  );
                })}
              </svg>
            </div>

            <div className="w-full text-center text-xs font-mono text-cyan-400 pt-2 border-t border-slate-800">
              {currentTier.tagline}
            </div>
          </div>

          {/* Squad Composition & Leads */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0F172A]/90 border border-slate-800 shadow-2xl space-y-6">
              <div>
                <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-1">Squad Architecture</div>
                <h3 className="text-xl font-bold text-white">{currentTier.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{currentTier.composition}</p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">Key Technical Leadership</div>
                {currentTier.teamLeads.map((lead, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold font-mono text-xs flex-shrink-0 mt-0.5">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{lead.name}</div>
                      <div className="text-xs text-cyan-400 font-mono">{lead.role}</div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center">
                        <Award className="w-3.5 h-3.5 text-amber-400 mr-1.5 flex-shrink-0" />
                        <span>{lead.certs}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] transition-all"
                >
                  <span>Request Dedicated Squad Assignment</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
