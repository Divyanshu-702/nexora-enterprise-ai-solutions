import React, { useState } from 'react';
import { RESPONSIBLE_AI_PILLARS } from '../data/nexoraData';
import { Shield, Lock, CheckCircle, UserCheck, FileText, GitBranch, Sparkles, Layers } from 'lucide-react';

export const ResponsibleAIFramework: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const getPillarIcon = (icon: string) => {
    switch (icon) {
      case 'Lock': return <Lock className="w-5 h-5 text-cyan-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-indigo-400" />;
      case 'CheckCircle': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-purple-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-amber-400" />;
      default: return <GitBranch className="w-5 h-5 text-cyan-300" />;
    }
  };

  return (
    <section className="py-24 bg-[#0B101D] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Ethical Governance & Safety</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Responsible AI Framework
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Enterprise intelligence must be accountable, private, and verifiable. Our eight-dimension governance matrix prevents data leakage, mitigates hallucinations, and enforces human-in-the-loop oversight.
          </p>
        </div>

        {/* Interactive Governance Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Pillars Navigation (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {RESPONSIBLE_AI_PILLARS.map((pillar, idx) => {
              const isActive = activePillar === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between border ${
                    isActive
                      ? 'bg-slate-900 border-cyan-400/80 shadow-lg text-white'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <span className="text-sm font-bold tracking-tight font-sans">
                      {pillar.title}
                    </span>
                  </div>
                  <span className={`text-xs font-mono ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-600'}`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Interactive Diagram & Deep-Dive (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
              <span className="text-xs font-mono uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">
                Governance Pillar 0{activePillar + 1}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Deterministic Audit Layer
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {RESPONSIBLE_AI_PILLARS[activePillar].title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {RESPONSIBLE_AI_PILLARS[activePillar].description}
              </p>

              {/* Visual Architecture Representation */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 mt-6">
                <div className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architecture Verification Standard</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 text-xs">
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Enforcement Mechanism</span>
                    <span className="text-white font-semibold">Pre-retrieval validation filters & automated citation scoring</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 text-xs">
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Audit Trail</span>
                    <span className="text-white font-semibold">WORM-compliant immutable cryptographic logs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Zero-data retention standard enforced on all upstream model inference.</span>
              <span>100% Client IP Ownership</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
