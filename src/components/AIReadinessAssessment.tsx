import React, { useState } from 'react';
import { READINESS_QUESTIONS } from '../data/nexoraData';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Download,
  Copy,
  Check,
  Shield,
  Sparkles,
  BarChart3,
  HelpCircle
} from 'lucide-react';

interface AIReadinessAssessmentProps {
  onDiscussProfile?: (profileText: string) => void;
}

export const AIReadinessAssessment: React.FC<AIReadinessAssessmentProps> = ({ onDiscussProfile }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, { score: number; text: string }>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentQ = READINESS_QUESTIONS[currentIdx];
  const totalQuestions = READINESS_QUESTIONS.length;

  const handleSelectOption = (score: number, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { score, text }
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  // Category Score Calculations
  const calculateCategoryScore = (category: string) => {
    const questionsInCategory = READINESS_QUESTIONS.filter((q) => q.category === category);
    if (!questionsInCategory.length) return 70;

    let sum = 0;
    let count = 0;
    questionsInCategory.forEach((q) => {
      if (answers[q.id]) {
        sum += answers[q.id].score;
        count++;
      }
    });

    return count > 0 ? Math.round(sum / count) : 70;
  };

  const overallScore = isCompleted
    ? Math.round(
        Object.values(answers).reduce((acc, curr) => acc + curr.score, 0) / totalQuestions
      )
    : 0;

  const dataScore = calculateCategoryScore('Data Foundation');
  const infraScore = calculateCategoryScore('Infrastructure');
  const govScore = calculateCategoryScore('AI Governance');
  const autoScore = calculateCategoryScore('Automation & SRE');

  const getRecommendation = () => {
    if (dataScore < 60) {
      return 'Establish a centralized data extraction and metadata cataloging pipeline before rolling out broad agentic workflows.';
    }
    if (govScore < 65) {
      return 'Deploy deterministic hallucination guardrails, prompt evaluation harnesses, and private VPC confidentiality boundaries.';
    }
    if (infraScore < 70) {
      return 'Modernize compute infrastructure to elastic Kubernetes clusters with automated Karpenter node provisioning for scalable model inference.';
    }
    return 'Deploy an enterprise-grade governed RAG foundation with multi-agent tool execution and continuous OpenTelemetry telemetry.';
  };

  const handleCopyReport = () => {
    const reportText = `NEXORA ENTERPRISE AI READINESS PROFILE (DEMO ASSESSMENT)
======================================================
Overall Readiness Score: ${overallScore}%

CATEGORY BREAKDOWN:
• Data Foundation: ${dataScore}%
• Cloud Infrastructure: ${infraScore}%
• AI Governance: ${govScore}%
• Automation & SRE: ${autoScore}%

RECOMMENDED STRATEGIC NEXT STEP:
${getRecommendation()}

DISCLAIMER:
This assessment is an illustrative demo simulation designed for architectural evaluation and does not constitute a certified professional audit.`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="assessment" className="py-24 bg-[#0B101D] border-t border-slate-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Diagnostic Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How AI-Ready Is Your Organization?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Evaluate your data maturity, infrastructure elasticity, governance guardrails, and automation foundation across 8 core dimensions.
          </p>
        </div>

        {/* Assessment Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl relative">
          
          {!isCompleted ? (
            <div className="space-y-6">
              
              {/* Question Navigation Pills & Progress Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-cyan-400 font-bold uppercase">{currentQ.category}</span>
                  <span className="font-bold text-white">Question {currentIdx + 1} of {totalQuestions}</span>
                </div>

                {/* Direct Question Selectors */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {READINESS_QUESTIONS.map((q, idx) => {
                    const isCurrent = currentIdx === idx;
                    const isAnswered = !!answers[q.id];
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIdx(idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400/50'
                            : isAnswered
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                        }`}
                      >
                        Q{idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="pt-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {currentQ.question}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {currentQ.description}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = answers[currentQ.id]?.text === opt.text;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(opt.score, opt.text)}
                      className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start space-x-3 border ${
                        isSelected
                          ? 'bg-indigo-950/60 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                            : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <div>{opt.text}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-1">
                          Implication: {opt.implication}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!answers[currentQ.id]}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold tracking-wide shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-2"
                >
                  <span>{currentIdx === totalQuestions - 1 ? 'Calculate AI Profile' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Header */}
              <div className="text-center pb-6 border-b border-slate-800 space-y-2">
                <span className="text-[11px] font-mono uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">
                  Diagnostic Complete • Demo Profile
                </span>
                <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-cyan-300 font-mono mt-2">
                  {overallScore}%
                </div>
                <div className="text-sm font-bold text-slate-300">
                  AI Readiness Maturity Index
                </div>
              </div>

              {/* 4 Category Breakdown Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Data Foundation</span>
                    <span className="text-cyan-400 font-bold">{dataScore}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${dataScore}%` }} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Cloud Infrastructure</span>
                    <span className="text-indigo-400 font-bold">{infraScore}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${infraScore}%` }} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">AI Governance & Privacy</span>
                    <span className="text-purple-400 font-bold">{govScore}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: `${govScore}%` }} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Automation & SRE Reliability</span>
                    <span className="text-emerald-400 font-bold">{autoScore}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${autoScore}%` }} />
                  </div>
                </div>

              </div>

              {/* Recommended Strategic Next Step */}
              <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <div className="text-xs font-mono uppercase text-indigo-300 font-bold flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Recommended Architectural Next Step</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {getRecommendation()}
                </p>
              </div>

              {/* Actions & Disclaimer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCopyReport}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-cyan-400" />
                        <span>Download Brief</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      const reportText = `AI READINESS MATURITY PROFILE: Overall Score ${overallScore}%. Data: ${dataScore}%, Infra: ${infraScore}%, Governance: ${govScore}%, SRE: ${autoScore}%. Priority next step: ${getRecommendation()}`;
                      if (onDiscussProfile) {
                        onDiscussProfile(reportText);
                      } else {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold shadow-md flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <span>Discuss Profile in Intake</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-center text-slate-500 font-mono">
                Disclaimer: This self-evaluation tool is an illustrative demo designed for architectural sizing. Formal engagements include a comprehensive 24-point technical audit.
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
