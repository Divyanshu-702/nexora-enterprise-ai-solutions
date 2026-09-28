import React, { useState } from 'react';
import { ShieldCheck, Quote, ChevronLeft, ChevronRight, Award, ExternalLink, X, TrendingUp, Cpu, CheckCircle2 } from 'lucide-react';

interface VerifiedTestimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  logoText: string;
  quote: string;
  metrics: {
    label: string;
    value: string;
  }[];
  verifiedAudit: string;
  deploymentDate: string;
}

export const VerifiedImpact: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [modalTestimonial, setModalTestimonial] = useState<VerifiedTestimonial | null>(null);

  const testimonials: VerifiedTestimonial[] = [
    {
      id: 't1',
      clientName: 'Dr. Harrison Vance',
      clientRole: 'Chief Technology Officer',
      company: 'Apex Global Fintech',
      logoText: 'APEX',
      quote: 'Nexora engineered our multi-region RAG pipeline and vLLM inference clusters with zero downtime. Our financial query latency dropped by 72% while maintaining strict SOC2 compliance.',
      metrics: [
        { label: 'Latency Reduction', value: '72%' },
        { label: 'Annual Cost Savings', value: '$1.45M' },
        { label: 'Query Throughput', value: '12,500 req/sec' }
      ],
      verifiedAudit: 'SOC2 Type II • Zero-Retention GDPR Validated',
      deploymentDate: 'Q2 2026'
    },
    {
      id: 't2',
      clientName: 'Samantha Lin',
      clientRole: 'VP of Engineering',
      company: 'OmniHealth Diagnostics',
      logoText: 'OMNI',
      quote: 'The zero-trust SPIFFE/SPIRE workload identity mesh and partitioned vector storage implemented by Nexora allowed us to securely process HIPAA-sensitive medical imaging AI at global scale.',
      metrics: [
        { label: 'Data Compliance', value: '100% HIPAA Ready' },
        { label: 'Model Accuracy', value: '99.4%' },
        { label: 'Uptime SLA', value: '99.999%' }
      ],
      verifiedAudit: 'HIPAA & ISO 27001 Certified Audit',
      deploymentDate: 'Q1 2026'
    },
    {
      id: 't3',
      clientName: 'Marcus Sterling',
      clientRole: 'Head of Infrastructure',
      company: 'AeroCloud Logistics',
      logoText: 'AERO',
      quote: 'Nexora’s durable LangGraph agent orchestration and automated Kubernetes auto-scaling eliminated our supply chain bottlenecks during peak holiday traffic.',
      metrics: [
        { label: 'Developer Velocity', value: '3.4x Faster' },
        { label: 'Infrastructure Savings', value: '$890K / yr' },
        { label: 'Incident Response', value: '-85% MTTR' }
      ],
      verifiedAudit: 'CNCF Enterprise Reliability Audit',
      deploymentDate: 'Q3 2026'
    }
  ];

  const current = testimonials[activeIndex];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="verified-impact" className="py-24 bg-[#070B14] border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Enterprise Impact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Audited Outcomes & Client Success Stories
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Independent telemetry and verifiable success metrics from enterprise leaders who partnered with Nexora for mission-critical AI & cloud transformations.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A]/90 border border-slate-800 shadow-2xl relative">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Quote and Client details */}
            <div className="space-y-6 flex-1">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-extrabold font-mono text-cyan-400 text-base">
                  {current.logoText}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono">{current.company}</div>
                  <div className="text-xs text-slate-400">{current.verifiedAudit}</div>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-3 -left-4 w-10 h-10 text-cyan-500/20 pointer-events-none" />
                <p className="text-lg sm:text-2xl text-slate-200 font-normal leading-relaxed italic pl-4 border-l-2 border-cyan-500/50">
                  "{current.quote}"
                </p>
              </div>

              <div>
                <div className="text-base font-bold text-white">{current.clientName}</div>
                <div className="text-xs text-cyan-400 font-mono">{current.clientRole} • {current.company}</div>
              </div>

              <div className="pt-2 flex items-center space-x-4">
                <button
                  onClick={() => setModalTestimonial(current)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>View Verification Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Metrics Preview Card */}
            <div className="w-full lg:w-80 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">Verified Success Metrics</div>
              <div className="space-y-3">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0F172A] border border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-300">{m.label}</span>
                    <span className="text-sm font-bold text-cyan-400 font-mono">{m.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] font-mono text-slate-500 text-center">
                Deployment: {current.deploymentDate}
              </div>
            </div>

          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Verification Modal */}
      {modalTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl p-8 rounded-3xl bg-[#0F172A] border border-cyan-500/40 shadow-2xl relative space-y-6">
            
            <button
              onClick={() => setModalTestimonial(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold font-mono">
                {modalTestimonial.logoText}
              </div>
              <div>
                <div className="text-sm font-bold text-white font-mono">{modalTestimonial.company} - Verification Report</div>
                <div className="text-xs text-emerald-400 font-mono flex items-center mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  {modalTestimonial.verifiedAudit}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">Hypothetical Project Success Metrics</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {modalTestimonial.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-xs text-slate-400 mb-1">{m.label}</div>
                    <div className="text-lg font-bold text-cyan-400 font-mono">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white font-mono">Engagement Summary:</div>
                <p>
                  Delivered under a 100% Principal-Led engagement model. System architecture underwent rigorous third-party penetration testing and continuous automated telemetry validation.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setModalTestimonial(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-800 transition-colors cursor-pointer"
              >
                Close Report
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
