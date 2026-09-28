import React, { useState, useEffect } from 'react';
import { Search, X, Bot, Layers, BarChart3, Calculator, FileCheck, Shield, Mail, ArrowRight, Activity, Sun, Moon } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenContact: (category?: string) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenTelemetry: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenContact,
  reducedMotion,
  onToggleReducedMotion,
  theme,
  onToggleTheme,
  onOpenTelemetry
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = [
    {
      id: 'solutions',
      title: 'Explore AI Solutions',
      category: 'Solutions',
      icon: <Bot className="w-4 h-4 text-indigo-400" />,
      action: () => onNavigate('solutions')
    },
    {
      id: 'architecture',
      title: 'Open Architecture Playground',
      category: 'Interactive Platform',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => onNavigate('architecture')
    },
    {
      id: 'intelligence',
      title: 'Nexora Intelligence AI Demo',
      category: 'Interactive Platform',
      icon: <Bot className="w-4 h-4 text-purple-400" />,
      action: () => onNavigate('platform')
    },
    {
      id: 'assessment',
      title: 'Start AI Readiness Assessment',
      category: 'Diagnostic Tools',
      icon: <BarChart3 className="w-4 h-4 text-emerald-400" />,
      action: () => onNavigate('assessment')
    },
    {
      id: 'roi-calculator',
      title: 'Open ROI Calculator',
      category: 'Financial Modeling',
      icon: <Calculator className="w-4 h-4 text-amber-400" />,
      action: () => onNavigate('roi-calculator')
    },
    {
      id: 'cost-estimator',
      title: 'Open AI Infrastructure Cost Estimator',
      category: 'Financial Modeling',
      icon: <Calculator className="w-4 h-4 text-cyan-400" />,
      action: () => onNavigate('cost-estimator')
    },
    {
      id: 'case-studies',
      title: 'View Domain Case Studies',
      category: 'Case Studies',
      icon: <FileCheck className="w-4 h-4 text-rose-400" />,
      action: () => onNavigate('case-studies')
    },
    {
      id: 'security',
      title: 'Explore Nexora Security Center',
      category: 'Governance & Security',
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      action: () => onNavigate('security')
    },
    {
      id: 'system-telemetry',
      title: 'Open System Telemetry Live Dashboard Overlay',
      category: 'Telemetry & Reliability',
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onOpenTelemetry();
        onClose();
      }
    },
    {
      id: 'theme-toggle',
      title: theme === 'light' ? 'Switch to Deep Slate Theme' : 'Switch to High-Contrast Light Mode',
      category: 'Accessibility',
      icon: theme === 'light' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />,
      action: () => {
        onToggleTheme();
        onClose();
      }
    },
    {
      id: 'reduced-motion',
      title: reducedMotion ? 'Disable Reduced Motion (Enable Animations)' : 'Enable Reduced Motion (Disable Animations)',
      category: 'Accessibility',
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onToggleReducedMotion();
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Contact Nexora & Discuss Scope',
      category: 'Intake',
      icon: <Mail className="w-4 h-4 text-cyan-300" />,
      action: () => onOpenContact()
    }
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation & scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#0F172A] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Nexora... (e.g. ROI, Architecture, Security)"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Items List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full px-4 py-2.5 rounded-xl text-left transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected ? 'bg-indigo-600/20 text-white' : 'text-slate-300 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      {cmd.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{cmd.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{cmd.category}</div>
                    </div>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Command Palette Keyboard Hints */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Nexora Command Hub</span>
        </div>

      </div>
    </div>
  );
};
