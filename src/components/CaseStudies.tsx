import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/nexoraData';
import { CaseStudy } from '../types/nexora';
import { FileCheck, Terminal, ArrowRight, CheckCircle2, AlertCircle, Layers, Cloud, Building2 } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<string>('fintech');

  const filteredStudies = CASE_STUDIES.filter((cs) => {
    const matchesProvider = selectedProvider === 'All' || cs.cloudProvider === selectedProvider;
    const matchesIndustry = selectedIndustry === 'All' || cs.industry === selectedIndustry;
    return matchesProvider && matchesIndustry;
  });

  const currentStudy = filteredStudies.find((cs) => cs.id === activeTab) || filteredStudies[0] || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-24 bg-[#090D16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Illustrative Architecture Scenarios</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Domain-Specific Demands
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Examine how specialized architectural patterns solve critical bottlenecks across fintech, healthcare, global logistics, and multi-tenant SaaS environments.
          </p>
        </div>

        {/* Filtering Controls */}
        <div className="max-w-4xl mx-auto mb-10 p-6 rounded-3xl bg-[#0F172A]/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Cloud Provider Filter */}
          <div className="w-full sm:w-auto space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center space-x-1.5 font-semibold">
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cloud Provider</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'AWS', 'GCP', 'Azure'].map((prov) => (
                <button
                  key={prov}
                  onClick={() => setSelectedProvider(prov)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedProvider === prov
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:block h-12 w-[1px] bg-slate-800" />

          {/* Industry Filter */}
          <div className="w-full sm:w-auto space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400 flex items-center space-x-1.5 font-semibold">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Industry Vertical</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Fintech', 'Healthcare', 'Logistics', 'SaaS'].map((ind) => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedIndustry === ind
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Tab Selection from Filtered Results */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 space-x-1 flex-wrap justify-center">
            {filteredStudies.length > 0 ? (
              filteredStudies.map((study) => (
                <button
                  key={study.id}
                  onClick={() => setActiveTab(study.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    currentStudy.id === study.id
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="font-mono text-[10px] text-cyan-300 mr-2 uppercase">[{study.cloudProvider}]</span>
                  {study.domain.split('&')[0].trim()}
                </button>
              ))
            ) : (
              <div className="px-6 py-3 text-xs font-mono text-rose-400">
                No architecture scenarios match the selected filter criteria.
              </div>
            )}
          </div>
        </div>

        {filteredStudies.length > 0 && currentStudy && (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Top Label */}
            <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 text-xs font-mono font-semibold rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                    {currentStudy.domain}
                  </span>
                  <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold rounded bg-indigo-500/25 text-indigo-300 border border-indigo-500/30">
                    {currentStudy.cloudProvider} Cloud
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentStudy.scenarioTitle}
                </h3>
              </div>
              <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sample Scenario Reference</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-start">
              
              {/* Left Column: Problem & Sequential Pipeline Diagram (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Problem */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono uppercase text-rose-400 font-bold">
                    Problem Description
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentStudy.problem}
                  </p>
                </div>

                {/* Sequential Architecture Pipeline */}
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center space-x-2 font-bold">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span>Execution Pipeline Diagram</span>
                  </div>

                  <div className="space-y-2.5">
                    {currentStudy.pipelineStages.map((stage, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-cyan-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-white font-mono">{stage.name}</span>
                        </div>
                        <span className="text-slate-400 text-right text-[11px] font-sans">
                          {stage.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400 mb-2.5 flex items-center space-x-2 font-bold">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Core Technologies Applied</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentStudy.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Illustrative Outcomes (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                  Illustrative Architecture Outcomes
                </div>

                {currentStudy.illustrativeOutcome.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
                        Modeled Benchmark
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 font-mono">
                      {outcome.metric}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {outcome.description}
                    </p>
                  </div>
                ))}

                {/* Disclaimer */}
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-500 font-mono leading-relaxed">
                  Notice: {currentStudy.disclaimer}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
