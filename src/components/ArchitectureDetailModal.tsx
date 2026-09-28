import React, { useEffect } from 'react';
import { CapabilityCard } from '../types/nexora';
import { X, Terminal, Shield, CheckCircle2, ArrowRight, Layers, Cpu, FileCheck } from 'lucide-react';

interface ArchitectureDetailModalProps {
  capability: CapabilityCard | null;
  onClose: () => void;
  onDiscussScope: () => void;
}

export const ArchitectureDetailModal: React.FC<ArchitectureDetailModalProps> = ({
  capability,
  onClose,
  onDiscussScope
}) => {
  useEffect(() => {
    if (!capability) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [capability, onClose]);

  if (!capability) return null;
  const { blueprint } = capability;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="architecture-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0F172A] border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left animate-in fade-in duration-200"
      >
        
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 font-semibold">
              Practice 0{capability.number} • {blueprint.category}
            </span>
            <h3 id="architecture-modal-title" className="text-xl sm:text-2xl font-extrabold text-white mt-2">
              {blueprint.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic architectural blueprint engineered for scalable enterprise production.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Blueprint Overview */}
        <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {blueprint.summary}
          </div>

          {/* Sequential Execution Pipeline */}
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center space-x-2 font-bold">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Multi-Tier Topology & Execution Pipeline</span>
            </div>

            <div className="space-y-2.5">
              {blueprint.diagramSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-cyan-400 font-mono text-[11px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-white font-mono">{step.stage}</span>
                    </div>
                    <p className="text-xs text-slate-400 pl-7">{step.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pl-7 sm:pl-0">
                    {step.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Workflow */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Typical Production Workflow</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {blueprint.typicalWorkflow.map((flow, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-cyan-400 font-mono mt-0.5">→</span>
                  <span>{flow}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Deliverables Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Security Architecture</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {blueprint.securityArchitecture.map((sec, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center space-x-2">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Standard Deliverables</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {blueprint.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Footer CTAs */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close Blueprint
          </button>

          <button
            onClick={() => {
              onClose();
              onDiscussScope();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Discuss Architecture Implementation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
