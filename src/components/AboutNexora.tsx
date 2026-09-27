import React from 'react';
import { ShieldCheck, Cpu, Terminal, Sparkles, BookOpen, Layers, Target, CheckCircle2 } from 'lucide-react';

export const AboutNexora: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0B101D] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              <span>Company Mission</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Technology With Purpose.
            </h2>

            {/* Mission Quote */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border-l-4 border-l-indigo-500 border border-slate-800 shadow-xl">
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed italic">
                "Build secure, scalable technology systems that turn complex engineering problems into measurable business capabilities."
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Nexora was established on a single technical realization: while models and cloud primitives evolve at breakneck speed, enterprise reality demands rock-solid durability, deterministic governance, and measurable unit economics.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              We bridge theoretical artificial intelligence with resilient distributed systems engineering. Our teams work side-by-side with internal engineering leadership to build architectures that withstand production traffic spikes, eliminate vendor lock-in, and protect proprietary intellectual assets.
            </p>
          </div>

          {/* Pillars Box */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl space-y-5">
            <div className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Core Architectural Tenets</span>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs sm:text-sm">Engineering Rigor Over AI Hype</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We deploy models only where they provide measurable leverage, backed by deterministic fallbacks and rigorous regression benchmarks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs sm:text-sm">Client Sovereignty & Transparency</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You own all code, weights, configurations, and data. We build inside your cloud environments with zero proprietary vendor lock-in.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs sm:text-sm">Security from Ingress to Ingress</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zero-trust cryptographic identity, kernel-level eBPF inspection, and field-level encryption are non-negotiable baselines.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
