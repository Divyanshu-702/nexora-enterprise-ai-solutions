import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  RefreshCw,
  Cpu,
  Layers,
  Terminal,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

interface AnalysisResult {
  problemAnalysis: string;
  architecture: string;
  technologyStack: string[];
  securityConsiderations: string[];
  implementationPlan: { phase: string; duration: string; details: string }[];
  expectedImpact: string[];
  potentialRisks: string[];
  isLiveModel?: boolean;
}

export const IntelligenceDemo: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Reduce cloud infrastructure cost');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedBlueprint, setCopiedBlueprint] = useState<boolean>(false);

  const samplePrompts = [
    'Reduce cloud infrastructure cost',
    'Build a private RAG system',
    'Automate support workflows',
    'Modernize a legacy application'
  ];

  const handleAnalyze = async (queryToRun?: string) => {
    const q = queryToRun || prompt;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze-architecture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q })
      });

      if (!res.ok) {
        throw new Error('Analysis request failed. Please retry.');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Analysis could not be generated. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Run initial synthesis on mount so the demo is immediately rich and alive
  useEffect(() => {
    handleAnalyze('Reduce cloud infrastructure cost');
  }, []);

  const handleCopyBlueprint = () => {
    if (!result) return;
    const text = `NEXORA INTELLIGENCE ARCHITECTURE BLUEPRINT
Query: ${prompt}
Problem Analysis: ${result.problemAnalysis}
Architecture Recommendation: ${result.architecture}
Technology Stack: ${result.technologyStack.join(', ')}
Security: ${result.securityConsiderations.join('; ')}
Implementation: ${result.implementationPlan.map(p => `${p.phase} (${p.duration}): ${p.details}`).join('\n')}
Impact: ${result.expectedImpact.join('; ')}
`;
    navigator.clipboard.writeText(text);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 3000);
  };

  return (
    <section id="platform" className="py-24 bg-[#0B101D] border-y border-slate-800 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Demo Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            NEXORA INTELLIGENCE
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Explore how an enterprise AI system could analyze operational problems.
          </p>
        </div>

        {/* Query Input Box */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="optimization-input" className="font-mono uppercase text-slate-400 font-semibold flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>What can we optimize?</span>
              </label>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Gemini API Enabled
              </span>
            </div>

            <div className="relative">
              <input
                id="optimization-input"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAnalyze();
                }}
                placeholder="e.g. Reduce cloud infrastructure cost, or Build a private RAG system..."
                className="w-full bg-[#090D16] border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
              />
              <button
                onClick={() => handleAnalyze()}
                disabled={loading || !prompt.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex items-center space-x-1.5"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Sample Prompts */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase text-slate-500 mb-2">
                Sample Prompts:
              </div>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(sample);
                      handleAnalyze(sample);
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer font-sans"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-[#0F172A]/80 border border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto animate-spin">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Synthesizing Architectural Recommendation...</h4>
            <p className="text-xs text-slate-400 font-mono">
              Evaluating ingestion topologies, model inference pipelines, and security guardrails.
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 mx-auto" />
            <p className="text-sm font-semibold text-rose-300">{error}</p>
            <button
              onClick={() => handleAnalyze()}
              className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-semibold text-white border border-slate-800 hover:bg-slate-800"
            >
              Retry Analysis
            </button>
          </div>
        )}

        {/* Generated Analysis Display */}
        {result && !loading && (
          <div className="max-w-5xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl space-y-8 animate-in fade-in duration-300">
            
            {/* Header / Meta */}
            <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20 font-semibold">
                  Demo Simulation Output
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">
                  System Architecture Recommendation
                </h3>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCopyBlueprint}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copiedBlueprint ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Blueprint Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy Blueprint</span>
                    </>
                  )}
                </button>
                <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 hidden sm:block">
                  Target: <span className="text-slate-200">"{prompt}"</span>
                </div>
              </div>
            </div>

            {/* 1. Problem Analysis & Architecture */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-mono uppercase text-indigo-400 font-bold flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Problem Analysis</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {result.problemAnalysis}
                </p>
              </div>

              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture Recommendation</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {result.architecture}
                </p>
              </div>
            </div>

            {/* 2. Technology Stack & Security */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Recommended Technology Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.technologyStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#090D16] border border-slate-800 text-xs font-mono text-cyan-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Security Considerations</span>
                </div>
                <ul className="space-y-1.5">
                  {result.securityConsiderations.map((sec, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* 3. Implementation Phases */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-4 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Implementation Phases</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.implementationPlan.map((phase, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-indigo-400 font-bold">Phase {idx + 1}</span>
                      <span className="text-slate-500">{phase.duration}</span>
                    </div>
                    <div className="text-sm font-bold text-white">{phase.phase}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{phase.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Expected Impact & Potential Risks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div>
                <div className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2">
                  Expected Areas of Impact
                </div>
                <ul className="space-y-1.5">
                  {result.expectedImpact.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="text-emerald-400 font-mono">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-mono uppercase text-amber-400 font-bold mb-2">
                  Potential Risks & Tradeoffs
                </div>
                <ul className="space-y-1.5">
                  {result.potentialRisks.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="text-amber-400 font-mono">!</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Demo Simulation Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-500 font-mono text-center">
              Demo Simulation: Output generated for architectural evaluation. Production deployment requires tailored enterprise constraint modeling.
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
