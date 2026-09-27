import React, { useState } from 'react';
import { WORK_TIMELINE } from '../data/nexoraData';
import { WorkStep } from '../types/nexora';
import { ChevronDown, ChevronUp, Clock, Users, FileCheck, Layers, ArrowRight } from 'lucide-react';

export const HowWeWork: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<string>('01');

  return (
    <section className="py-24 bg-[#090D16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Delivery Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How We Work
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            A battle-tested five-stage modernization lifecycle engineered to de-risk technical decisions, validate architectures, and ensure seamless production handoffs.
          </p>
        </div>

        {/* 5-Step Timeline Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {WORK_TIMELINE.map((step) => {
            const isExpanded = expandedStep === step.step;

            return (
              <div
                key={step.step}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#0F172A] border-indigo-500/60 shadow-xl'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header / Click Trigger */}
                <button
                  onClick={() => setExpandedStep(isExpanded ? '' : step.step)}
                  className="w-full p-6 text-left flex items-center justify-between cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-colors ${
                        isExpanded
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {step.step}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-slate-500">
                        {step.number}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="hidden sm:inline-block text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                      {step.timeline}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-800 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Drawer Details */}
                {isExpanded && (
                  <div className="px-6 pb-8 pt-2 border-t border-slate-800/80 space-y-6 animate-in slide-in-from-top-1 duration-200">
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {step.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Activities */}
                      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                        <div className="text-xs font-mono uppercase text-indigo-400 font-bold flex items-center space-x-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Core Activities</span>
                        </div>
                        <ul className="space-y-2">
                          {step.activities.map((act, aIdx) => (
                            <li key={aIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                              <span className="text-cyan-400 font-mono mt-0.5">→</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                        <div className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center space-x-1.5">
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Key Deliverables</span>
                        </div>
                        <ul className="space-y-2">
                          {step.deliverables.map((deliv, dIdx) => (
                            <li key={dIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                              <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Timeline & Stakeholders Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Approx. Timeline: <strong className="text-slate-200">{step.timeline}</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Involved Stakeholders: <strong className="text-slate-200">{step.stakeholders.join(', ')}</strong></span>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
