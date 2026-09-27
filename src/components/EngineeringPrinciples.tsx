import React from 'react';
import { ENGINEERING_PRINCIPLES } from '../data/nexoraData';
import { ShieldCheck, Activity, Zap, Cpu, TrendingUp, Check, Layers } from 'lucide-react';

export const EngineeringPrinciples: React.FC = () => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-indigo-400" />;
      default:
        return <TrendingUp className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section className="py-24 bg-[#0B101D] border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>The Nexora Engineering Ethos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Principles
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Five non-negotiable architectural tenets governing how we build, deploy, and safeguard modern distributed systems.
          </p>
        </div>

        {/* 5 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGINEERING_PRINCIPLES.map((principle, idx) => (
            <div
              key={principle.number}
              className={`p-8 rounded-3xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group shadow-xl ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(principle.icon)}
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-500">
                    {principle.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight group-hover:text-indigo-300 transition-colors">
                  {principle.title}
                </h3>

                <p className="text-xs font-mono text-cyan-400 mb-4 font-medium">
                  {principle.tagline}
                </p>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {principle.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1">
                  Concrete Architecture Practice
                </span>
                {principle.practices.map((practice, pIdx) => (
                  <div key={pIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{practice}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
