import React from 'react';
import { CAPABILITIES } from '../data/nexoraData';
import { CapabilityCard } from '../types/nexora';
import { Bot, Cloud, Zap, Database, ShieldCheck, Activity, ArrowRight, Layers, ArrowUpRight } from 'lucide-react';

interface CoreCapabilitiesProps {
  onSelectCapability: (cap: CapabilityCard) => void;
}

export const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({ onSelectCapability }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-6 h-6 text-indigo-400" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Database':
        return <Database className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-cyan-300" />;
      default:
        return <Activity className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="solutions" className="py-24 bg-[#090D16] relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Engineering Practices</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Six Pillars of Enterprise Scale
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            From private LLM orchestration to kernel-level cyber resilience, our specialized practices eliminate technical debt and accelerate enterprise roadmaps.
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              className="p-8 rounded-3xl bg-[#0F172A]/90 border border-slate-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(cap.icon)}
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                    {cap.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors tracking-tight">
                  {cap.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {cap.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {cap.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-slate-900/90 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Architecture Action Button */}
              <button
                onClick={() => onSelectCapability(cap)}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 text-xs font-semibold tracking-wide transition-all flex items-center justify-between cursor-pointer group/btn"
              >
                <span>View Architecture</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover/btn:text-indigo-300 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
