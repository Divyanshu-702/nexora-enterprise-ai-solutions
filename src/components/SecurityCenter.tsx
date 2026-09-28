import React from 'react';
import { SECURITY_CONTROLS } from '../data/nexoraData';
import { ShieldCheck, Lock, Terminal, CheckCircle2, ArrowRight, Shield, Layers } from 'lucide-react';

interface SecurityCenterProps {
  onOpenSecurityModal: () => void;
}

export const SecurityCenter: React.FC<SecurityCenterProps> = ({ onOpenSecurityModal }) => {
  return (
    <section id="security" className="py-24 bg-[#0B101D] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Architecture-Level Governance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Nexora Security Center
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Enterprise systems require foundational cryptographic isolation. We architect zero-trust guardrails engineered to support stringent enterprise compliance frameworks.
          </p>
        </div>

        {/* Security Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SECURITY_CONTROLS.map((control) => (
            <div
              key={control.id}
              className="p-7 rounded-3xl bg-[#0F172A] border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    {control.category}
                  </span>
                  <Lock className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {control.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {control.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-mono mb-4">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">Implementation:</span>
                  {control.architectureImplementation}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {control.protocols.map((proto, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-cyan-300 border border-slate-800"
                    >
                      {proto}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Architecture Action Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#121B32] to-[#0F172A] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start space-x-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>Inspect Zero-Trust Security Architecture Blueprint</span>
            </h3>
            <p className="text-xs text-slate-400">
              Review full network topology, mTLS cipher negotiation, and eBPF kernel enforcement details.
            </p>
          </div>

          <button
            onClick={onOpenSecurityModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-400 text-xs font-bold tracking-wide transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
          >
            <span>View Security Architecture</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
