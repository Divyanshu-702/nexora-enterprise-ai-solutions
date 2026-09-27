import React, { useState, useEffect } from 'react';
import { RESOURCE_CARDS } from '../data/nexoraData';
import { ResourceCard } from '../types/nexora';
import { BookOpen, FileText, CheckCircle2, Clock, ArrowRight, X, Sparkles, Layers } from 'lucide-react';

export const ResourceLibrary: React.FC = () => {
  const [activePreview, setActivePreview] = useState<ResourceCard | null>(null);

  useEffect(() => {
    if (!activePreview) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePreview(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activePreview]);

  return (
    <section id="resources" className="py-24 bg-[#090D16] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Publications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Resource Library
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Technical teardowns, architectural blueprints, and evaluation checklists curated by our systems architects.
          </p>
        </div>

        {/* 6 Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCE_CARDS.map((res) => {
            const isAvailable = res.status === 'Available Preview';

            return (
              <div
                key={res.id}
                className="p-7 rounded-3xl bg-[#0F172A] border border-slate-800 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                      {res.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isAvailable
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold'
                          : 'bg-slate-800 text-slate-500 font-semibold'
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {res.description}
                  </p>

                  {/* Key Takeaways */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1">
                      Key Architectural Takeaways:
                    </span>
                    {res.keyTakeaways.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <span className="text-cyan-400 font-mono mt-0.5">→</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{res.readTime}</span>
                  </span>

                  {isAvailable ? (
                    <button
                      onClick={() => setActivePreview(res)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-semibold border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>Preview Brief</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-slate-600">
                      In Review
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Available Preview Brief */}
        {activePreview && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="brief-modal-title"
            onClick={() => setActivePreview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-left animate-in fade-in duration-200"
            >
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-mono uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                    {activePreview.category}
                  </span>
                  <h3 id="brief-modal-title" className="text-xl font-bold text-white mt-2">
                    {activePreview.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{activePreview.readTime} • Executive Architecture Brief</p>
                </div>
                <button
                  onClick={() => setActivePreview(null)}
                  aria-label="Close dialog"
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activePreview.description}
                </p>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono uppercase text-slate-400 font-bold">
                    Executive Summary Points
                  </div>
                  <ul className="space-y-2">
                    {activePreview.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300">
                  Full whitepapers are delivered as part of engagement architectures. Contact an architect for tailored domain references.
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActivePreview(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close Brief
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
