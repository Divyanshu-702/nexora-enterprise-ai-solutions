import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  Shield,
  ArrowRight,
  ArrowLeft,
  Building,
  Mail,
  User,
  MessageSquare,
  Sparkles,
  Layers,
  RotateCcw,
  AlertCircle,
  Check
} from 'lucide-react';

interface ContactWizardProps {
  initialProblem?: string;
  prefilledScope?: string;
}

export const ContactWizard: React.FC<ContactWizardProps> = ({ initialProblem, prefilledScope }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [problemCategory, setProblemCategory] = useState<string>(initialProblem || 'AI / LLM');
  const [companySize, setCompanySize] = useState<string>('Mid-Market (100–500)');
  const [projectDescription, setProjectDescription] = useState<string>(prefilledScope || '');
  const [fullName, setFullName] = useState<string>('');
  const [corporateEmail, setCorporateEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  
  // Error states for robust validation
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [companyError, setCompanyError] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');

  // Sync with incoming props from tiers, blueprints, or ROI calculator
  useEffect(() => {
    if (initialProblem) {
      setProblemCategory(initialProblem);
    }
  }, [initialProblem]);

  useEffect(() => {
    if (prefilledScope) {
      setProjectDescription(prefilledScope);
      setIsCaptured(false);
      setCurrentStep(3); // Jump to Scope step to review pre-filled scope
    }
  }, [prefilledScope]);

  const problemOptions = [
    { id: 'AI / LLM', label: 'AI / LLM & RAG Systems', desc: 'Private models, agent workflows, vector retrieval' },
    { id: 'Cloud', label: 'Cloud Modernization & FinOps', desc: 'Kubernetes, multi-cloud, infrastructure cost reduction' },
    { id: 'Data', label: 'Data & Real-Time Streaming', desc: 'Kafka, Flink, event-driven architectures' },
    { id: 'Automation', label: 'Intelligent Automation', desc: 'Durable execution, human-in-the-loop workflows' },
    { id: 'Security', label: 'Zero-Trust Cyber Resilience', desc: 'SPIFFE/SPIRE, eBPF security, compliance engineering' },
    { id: 'DevOps', label: 'DevOps & SRE Reliability', desc: 'CI/CD, observability, chaos engineering' },
    { id: 'Other', label: 'Cross-Domain Transformation', desc: 'Holistic multi-squad modernization' }
  ];

  const sizeOptions = [
    'Seed / Series A (1–25)',
    'Growth Scaleup (25–100)',
    'Mid-Market (100–500)',
    'Enterprise (500–2,500)',
    'Global Enterprise (2,500+)'
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!fullName.trim()) {
      setNameError('Full name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!corporateEmail.trim()) {
      setEmailError('Corporate email is required.');
      isValid = false;
    } else if (!emailRegex.test(corporateEmail.trim())) {
      setEmailError('Please provide a valid corporate email address (e.g. name@company.com).');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!company.trim()) {
      setCompanyError('Company name is required.');
      isValid = false;
    } else {
      setCompanyError('');
    }

    if (!isValid) return;

    setIsSubmitting(true);

    // Stored in clear local/demo state
    setTimeout(() => {
      const generatedTicket = `NX-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setIsSubmitting(false);
      setIsCaptured(true);
    }, 700);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setProblemCategory('AI / LLM');
    setCompanySize('Mid-Market (100–500)');
    setProjectDescription('');
    setFullName('');
    setCorporateEmail('');
    setCompany('');
    setMessage('');
    setNameError('');
    setEmailError('');
    setCompanyError('');
    setIsCaptured(false);
  };

  return (
    <section id="contact" className="py-24 bg-[#0B101D] border-t border-slate-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Consultation Intake</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Start the Architectural Conversation
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Provide your operational context through our four-step intake wizard to connect directly with a Principal Systems Architect.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl relative">
          
          {!isCaptured ? (
            <div>
              {/* Stepper Indicator */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800">
                {[
                  { num: 1, label: 'Domain' },
                  { num: 2, label: 'Scale' },
                  { num: 3, label: 'Scope' },
                  { num: 4, label: 'Contact' }
                ].map((step) => {
                  const isCurrent = currentStep === step.num;
                  const isDone = currentStep > step.num;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => setCurrentStep(step.num)}
                      className="flex items-center space-x-2 text-left cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 ring-4 ring-cyan-500/20'
                            : isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-900 text-slate-500 border border-slate-800'
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : step.num}
                      </div>
                      <span
                        className={`hidden sm:inline text-xs font-mono ${
                          isCurrent ? 'text-white font-bold' : isDone ? 'text-emerald-400' : 'text-slate-500'
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* STEP 1: What are you trying to solve? */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Step 1: What core challenge are you trying to solve?
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Select the primary domain requiring modernization or architecture design.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {problemOptions.map((opt) => {
                      const isSelected = problemCategory === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setProblemCategory(opt.id)}
                          className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-indigo-950/70 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400/30'
                              : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="text-sm font-bold text-white mb-0.5">{opt.label}</div>
                          <div className="text-xs text-slate-400">{opt.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold tracking-wide shadow-md flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Continue to Scale</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Company Size */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Step 2: What is the scale of your organization?
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Helps us identify appropriate concurrency patterns, governance tiers, and infrastructure sizing.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {sizeOptions.map((size, idx) => {
                      const isSelected = companySize === size;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCompanySize(size)}
                          className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between border ${
                            isSelected
                              ? 'bg-indigo-950/70 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400/30'
                              : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="text-sm font-bold">{size}</span>
                          <span className={`text-xs font-mono px-2.5 py-1 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-500 bg-slate-800'}`}>
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 flex items-center space-x-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold tracking-wide shadow-md flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Continue to Project Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Project Description */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Step 3: Project description & current technical constraints
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Briefly describe existing bottlenecks, target latency, compliance mandates, or timeline objectives.
                    </p>
                  </div>

                  <div>
                    <textarea
                      rows={5}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="e.g. We have a high-volume PostgreSQL database hitting connection limits, and we want to architect an event-driven streaming layer with Kafka and private RAG search..."
                      className="w-full bg-[#090D16] border border-slate-800 rounded-2xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-sans resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 flex items-center space-x-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold tracking-wide shadow-md flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Continue to Contact Info</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Contact Information & Summary Review */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Step 4: Contact details & Review
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Review your configuration and provide contact details for direct routing to a Principal Systems Architect.
                    </p>
                  </div>

                  {/* Config Summary Pill Banner */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 font-mono">Project Domain:</span>
                      <span className="text-cyan-300 font-bold px-2 py-0.5 bg-cyan-500/10 rounded border border-cyan-500/20 truncate">{problemCategory}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 font-mono">Organization Scale:</span>
                      <span className="text-indigo-300 font-bold px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20 truncate">{companySize}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (nameError) setNameError('');
                        }}
                        placeholder="Marcus Sterling"
                        className={`w-full bg-[#090D16] border rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none ${
                          nameError ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {nameError && (
                        <div className="flex items-center space-x-1 text-[11px] text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{nameError}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        value={corporateEmail}
                        onChange={(e) => {
                          setCorporateEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        placeholder="marcus@enterprise.com"
                        className={`w-full bg-[#090D16] border rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none ${
                          emailError ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {emailError && (
                        <div className="flex items-center space-x-1 text-[11px] text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{emailError}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          if (companyError) setCompanyError('');
                        }}
                        placeholder="Aetheria Systems"
                        className={`w-full bg-[#090D16] border rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none ${
                          companyError ? 'border-rose-500 focus:border-rose-400' : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {companyError && (
                        <div className="flex items-center space-x-1 text-[11px] text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{companyError}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                        Selected Domain
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={problemCategory}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-cyan-300 font-mono cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any specific architectural preferences or scheduling notes..."
                      className="w-full bg-[#090D16] border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none font-sans"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 flex items-center space-x-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Intake...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Project Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          ) : (
            /* FINAL SCREEN: Demo / Local State Confirmation */
            <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                Thanks, {fullName || 'Architect'}. Your project request has been captured.
              </h3>

              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                We have registered your project inquiry for <strong>{company || 'your organization'}</strong> (Scale: <span className="text-indigo-300 font-semibold">{companySize}</span>) under problem domain <strong>{problemCategory}</strong>.
              </p>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 max-w-md mx-auto space-y-2 text-left">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Demonstration Ticket:</span>
                  <span className="text-cyan-400 font-bold">{ticketId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Contact Email:</span>
                  <span className="text-white">{corporateEmail}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Project Category:</span>
                  <span className="text-cyan-300">{problemCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Company Size:</span>
                  <span className="text-indigo-300">{companySize}</span>
                </div>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800 text-center">
                  Note: Request recorded in client demonstration state. A Principal Architect will route your dossier.
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 cursor-pointer flex items-center space-x-2 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start New Intake</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
