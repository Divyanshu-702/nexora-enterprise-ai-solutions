import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowRight, Search, Shield, Cpu, Briefcase, UserCheck } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (initialCategory?: string) => void;
  onOpenCommandPalette: () => void;
  onNavigate: (sectionId: string) => void;
  userRole: 'all' | 'cto' | 'executive';
  onRoleChange: (role: 'all' | 'cto' | 'executive') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenCommandPalette,
  onNavigate,
  userRole,
  onRoleChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Solutions', id: 'solutions' },
    { label: 'Platform', id: 'platform' },
    { label: 'Architecture', id: 'architecture' },
    { label: 'Case Studies', id: 'case-studies' },
    { label: 'ROI Calculator', id: 'roi-calculator' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About', id: 'about' },
    { label: 'Resources', id: 'resources' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090D16]/95 backdrop-blur-md border-b border-slate-800/90 shadow-xl shadow-black/40'
          : 'bg-[#090D16]/70 backdrop-blur-sm border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center space-x-3 group cursor-pointer text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-600/20 group-hover:shadow-indigo-500/40 transition-all">
            <div className="w-full h-full bg-[#090D16] rounded-xl flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-lg font-mono">
                NX
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                NEXORA<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Enterprise AI
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6 text-xs font-semibold text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="hover:text-white transition-colors cursor-pointer py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-indigo-500 after:to-cyan-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Tools & CTAs */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Role-based View Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 space-x-0.5">
            <button
              onClick={() => onRoleChange('all')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                userRole === 'all'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Standard View"
            >
              Standard
            </button>
            <button
              onClick={() => onRoleChange('cto')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                userRole === 'cto'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="CTO / Technical Perspective"
            >
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>CTO</span>
            </button>
            <button
              onClick={() => onRoleChange('executive')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                userRole === 'executive'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Executive / Business Perspective"
            >
              <Briefcase className="w-3 h-3 text-indigo-400" />
              <span>Executive</span>
            </button>
          </div>

          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 text-xs transition-all cursor-pointer font-mono"
            title="Search & Quick Actions"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400 border border-slate-800">
              Ctrl+K
            </kbd>
          </button>

          {/* Secondary Action: Explore Platform */}
          <button
            onClick={() => handleNavClick('platform')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
          >
            Explore Platform
          </button>

          {/* Primary CTA: Build With Nexora → */}
          <button
            onClick={() => onOpenContact()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-indigo-600/25 hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Build With Nexora</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={onOpenCommandPalette}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#090D16] border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2.5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-sm font-semibold text-slate-300 hover:text-white py-1.5 cursor-pointer flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-slate-600 text-xs">→</span>
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('platform');
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-200 rounded-xl bg-slate-900 border border-slate-800 text-center cursor-pointer"
            >
              Explore Platform
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-indigo-600/25"
            >
              <span>Build With Nexora →</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
