import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../data/nexoraData';
import { ArchitectureNode } from '../types/nexora';
import {
  Monitor,
  Shield,
  Cpu,
  Bot,
  Database,
  Activity,
  ArrowRight,
  CheckCircle,
  Terminal,
  Lock,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';

export const ArchitecturePlayground: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('orchestrator');

  const selectedNode =
    ARCHITECTURE_NODES.find((node) => node.id === selectedNodeId) ||
    ARCHITECTURE_NODES[2];

  const getNodeIcon = (icon: string) => {
    switch (icon) {
      case 'Monitor':
        return <Monitor className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <section id="architecture" className="py-24 bg-[#090D16] border-y border-slate-800/80 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Signature Interactive System</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive Architecture Topology
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Click any node in the distributed execution pipeline to inspect its operational purpose, technology implementation, security controls, and scale characteristics.
          </p>
        </div>

        {/* Animated Pipeline Nodes Ribbon */}
        <div className="mb-12">
          {/* Desktop/Tablet Horizontal Pipeline */}
          <div className="relative p-3 sm:p-4 rounded-3xl bg-[#0F172A]/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
            
            {/* SVG Connecting Flow with Animated Particles */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 pointer-events-none hidden lg:block">
              <svg className="w-full h-8 -top-3.5 relative" preserveAspectRatio="none">
                <line
                  x1="20"
                  y1="16"
                  x2="98%"
                  y2="16"
                  stroke="#1E293B"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
                <circle cx="50" cy="16" r="4" fill="#06B6D4">
                  <animate attributeName="cx" values="20;98%" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="16" r="4.5" fill="#6366F1">
                  <animate attributeName="cx" values="20;98%" dur="2.8s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
              {ARCHITECTURE_NODES.map((node, idx) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border relative group ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-cyan-400/80 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-slate-400 group-hover:text-white'
                          }`}
                        >
                          {getNodeIcon(node.icon)}
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">
                          0{idx + 1}
                        </span>
                      </div>
                      <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                        {node.category.split('&')[0]}
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5 tracking-tight">
                        {node.name}
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                      <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                        {isSelected ? 'Inspecting' : 'Click to inspect'}
                      </span>
                      <ArrowRight className={`w-3 h-3 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Node Deep Dive Inspector */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
          
          {/* Top Inspector Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#090D16] rounded-2xl flex items-center justify-center text-cyan-400">
                  {getNodeIcon(selectedNode.icon)}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20 font-semibold">
                    {selectedNode.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    System Component: <strong className="text-slate-300">{selectedNode.id.toUpperCase()}</strong>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {selectedNode.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Architecture Component</span>
            </div>
          </div>

          {/* Inspector Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            
            {/* Purpose & Technologies (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Component Purpose</span>
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  {selectedNode.purpose}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Standard Technologies</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Security & Scalability Considerations (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Security */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold">Security Considerations</span>
                </h4>
                <ul className="space-y-2">
                  {selectedNode.securityConsiderations.map((sec, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scalability */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-bold">Scalability Considerations</span>
                </h4>
                <ul className="space-y-2">
                  {selectedNode.scalabilityConsiderations.map((scale, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{scale}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom Footnote */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
            <span>Illustrative architecture representation based on distributed cloud standards.</span>
            <span>All nodes integrate via verifiable OpenTelemetry distributed traces.</span>
          </div>

        </div>

      </div>
    </section>
  );
};
