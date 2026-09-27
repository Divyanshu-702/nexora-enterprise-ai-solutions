import React, { useState, useEffect } from 'react';
import { X, Check, Copy, Sparkles, Camera, ArrowRight } from 'lucide-react';

interface Task3ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (id: string) => void;
}

export const Task3SubmissionModal: React.FC<Task3ModalProps> = ({ isOpen, onClose, onNavigateSection }) => {
  const [copiedPost, setCopiedPost] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const linkedInPostText = `🚀 TASK 3 COMPLETED: AI-Generated B2B Enterprise Website! 🌐✨

Excited to share my submission for Task 3 – AI Website Generation for InAmigos Foundation!

🏢 Domain Chosen:
B2B Enterprise AI & Scalable Cloud Solutions consultancy ("Nexora Enterprise & AI Solutions").

🛠️ AI Tools Utilized:
Generated using next-generation AI website architecture with Gemini 3.8 Flash, featuring dynamic multi-tier UI/UX generation, live interactive ROI calculation models, and audited technical blueprints.

✨ Key Sections Built:
1️⃣ Homepage & Above-the-fold Hero with SOC-2 certification badges & live cluster telemetry
2️⃣ Core Capabilities & Services Grid with expandable "Architecture Blueprint" drawers
3️⃣ Interactive Dynamic ROI Estimator (calculating annual savings, reclaimed engineering hours, and payback horizon)
4️⃣ Audited Case Studies (Fintech sub-15ms fraud detection, Healthcare multimodal AI, Logistics routing)
5️⃣ Engagement Models & Pricing with Quarterly vs Annual 20% discount toggle
6️⃣ Leadership, Governance Constitution & Mutual NDA Strategy Consultation Form

💡 Key Learnings & Takeaways:
• Rapid AI Prototyping: AI enables engineering teams to translate complex enterprise requirements into high-converting, accessible, and responsive user experiences in minutes rather than weeks.
• Grounded Enterprise UX: Integrating real-time financial models (like the ROI Estimator) transforms a static site into a credible B2B sales engine.

Special thanks to InAmigos Foundation for this insightful learning assignment!

#InAmigosFoundation #AIWebsiteBuilder #WebDevelopment #ArtificialIntelligence #B2BTech #Task3 #GeminiAI #PromptEngineering #CloudArchitecture`;

  const handleCopyPost = () => {
    navigator.clipboard.writeText(linkedInPostText);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="task3-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0F172A] border border-indigo-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left animate-in fade-in duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 id="task3-modal-title" className="text-xl font-bold text-white">Task 3 Submission & Pro-Tip Kit</h3>
              <p className="text-xs text-indigo-300">Ready for submission to InAmigos Foundation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: 4 Required Screenshots Guide */}
        <div className="py-5 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>Step 1: Capture the 4 Required Screenshots</span>
          </div>
          <p className="text-xs text-slate-300">
            Click any section below to scroll directly to it for clean screenshots:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                onClose();
                onNavigateSection('hero');
              }}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-slate-200 flex items-center justify-between cursor-pointer"
            >
              <span>1. Full Hero & Dual CTAs</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateSection('solutions');
              }}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-slate-200 flex items-center justify-between cursor-pointer"
            >
              <span>2. Services & Blueprint Grid</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateSection('roi-calculator');
              }}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-slate-200 flex items-center justify-between cursor-pointer"
            >
              <span>3. Interactive ROI Estimator</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateSection('contact');
              }}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-xs font-semibold text-slate-200 flex items-center justify-between cursor-pointer"
            >
              <span>4. Contact Wizard & Footer</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Section 2: LinkedIn Post Generator */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Step 2: Ready-to-Post LinkedIn Draft</span>
            </div>
            <button
              onClick={handleCopyPost}
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1 cursor-pointer"
            >
              {copiedPost ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPost ? 'Copied!' : 'Copy Post'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 text-xs text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap font-sans leading-relaxed">
            {linkedInPostText}
          </div>
        </div>

        {/* Section 3: Submission Checklist */}
        <div className="mt-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="font-bold text-white flex items-center space-x-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Task 3 Checklist:</span>
          </div>
          <div>✅ AI-generated website with all required sections (Home, About, Services, Contact, ROI, Case Studies)</div>
          <div>✅ Screenshots saved to Google Drive</div>
          <div>✅ LinkedIn Post tagged with InAmigos Foundation</div>
          <div>✅ Completed before deadline: 29th September | 7pm</div>
        </div>

        <div className="pt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
