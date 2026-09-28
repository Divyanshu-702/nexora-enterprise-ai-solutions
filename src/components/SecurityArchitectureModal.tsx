import React, { useEffect } from 'react';
import { X, Shield, Lock, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

interface SecurityArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscussScope: () => void;
}

export const SecurityArchitectureModal: React.FC<SecurityArchitectureModalProps> = ({
  isOpen,
  onClose,
  onDiscussScope
}) => {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="security-modal-title"
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
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-semibold">
              Security Architecture Specification
            </span>
            <h3 id="security-modal-title" className="text-xl sm:text-2xl font-extrabold text-white mt-2">
              Zero-Trust Cryptographic Perimeter & Compliance Architecture
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Architecture engineered to eliminate implicit trust and secure multi-cloud distributed inference.
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

        {/* Content */}
        <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          
          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <p className="leading-relaxed">
              Nexora’s security framework operates under the mandate of <strong>verifiable cryptographic isolation</strong>. We replace perimeter-based firewalls with workload-level identity attestation and kernel-space eBPF inspection.
            </p>

            {/* Architecture Tiers */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs font-mono flex items-center space-x-2">
                  <span className="text-cyan-400">1. Workload Identity (SPIFFE/SPIRE)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Short-lived X.509 SVID certificates issued per container instance. Containers authenticate each other via mutual TLS with automated 60-minute certificate rotation, eliminating static secrets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs font-mono flex items-center space-x-2">
                  <span className="text-emerald-400">2. Kernel-Space Syscall Inspection (Cilium Tetragon)</span>
                </div>
                <p className="text-xs text-slate-400">
                  eBPF sensors hook directly into kernel execution pathways, detecting anomalous file access, unexpected shell execution, or unauthorized outbound network connections with zero-overhead isolation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs font-mono flex items-center space-x-2">
                  <span className="text-indigo-400">3. Deterministic Pre-Retrieval ACL Filtering</span>
                </div>
                <p className="text-xs text-slate-400">
                  Vector similarity queries are filtered through user role attributes before embedding execution, ensuring proprietary enterprise documents are never synthesized for unauthorized personnel.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs font-mono flex items-center space-x-2">
                  <span className="text-purple-400">4. Confidential Cloud Compute Enclaves</span>
                </div>
                <p className="text-xs text-slate-400">
                  Hardware-isolated CPU memory encryption (AMD SEV-SNP / AWS Nitro Enclaves) protecting proprietary weights and customer data from hypervisor-level inspection.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-500 font-mono">
              Notice: Engineered to support enterprise compliance frameworks (such as SOC 2, ISO 27001, and HIPAA) when deployed inside client cloud accounts.
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Close Specification
          </button>

          <button
            onClick={() => {
              onClose();
              onDiscussScope();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Review Security Controls with an Architect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
