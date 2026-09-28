import React from 'react';
import { TECH_ECOSYSTEM } from '../data/nexoraData';
import { Terminal, Cpu, Cloud, Database, Activity, Layers } from 'lucide-react';

export const TechnologyEcosystem: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    if (category.includes('AI')) return <Cpu className="w-5 h-5 text-indigo-400" />;
    if (category.includes('Cloud')) return <Cloud className="w-5 h-5 text-cyan-400" />;
    if (category.includes('Containers')) return <Layers className="w-5 h-5 text-purple-400" />;
    if (category.includes('Data')) return <Database className="w-5 h-5 text-emerald-400" />;
    return <Activity className="w-5 h-5 text-amber-400" />;
  };

  return (
    <section className="py-24 bg-[#090D16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>Open, Enterprise Standards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technology Ecosystem
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            We build exclusively on industry-standard, production-grade open runtimes, distributed cloud frameworks, and high-performance data systems.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_ECOSYSTEM.map((eco, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-3xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between ${
                idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {getCategoryIcon(eco.category)}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {eco.category}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  {eco.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                {eco.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
