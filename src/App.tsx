import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArchitecturePlayground } from './components/ArchitecturePlayground';
import { IntelligenceDemo } from './components/IntelligenceDemo';
import { CoreCapabilities } from './components/CoreCapabilities';
import { ROICalculator } from './components/ROICalculator';
import { CostEstimator } from './components/CostEstimator';
import { CaseStudies } from './components/CaseStudies';
import { AIReadinessAssessment } from './components/AIReadinessAssessment';
import { EngineeringPrinciples } from './components/EngineeringPrinciples';
import { HowWeWork } from './components/HowWeWork';
import { SecurityCenter } from './components/SecurityCenter';
import { ResponsibleAIFramework } from './components/ResponsibleAIFramework';
import { TechnologyEcosystem } from './components/TechnologyEcosystem';
import { EngagementModels } from './components/EngagementModels';
import { ResourceLibrary } from './components/ResourceLibrary';
import { AboutNexora } from './components/AboutNexora';
import { ContactWizard } from './components/ContactWizard';
import { Footer } from './components/Footer';
import { GlobalLatencyMap } from './components/GlobalLatencyMap';
import { ArchitecturalDossierExport } from './components/ArchitecturalDossierExport';
import { EngineeringTalentRadar } from './components/EngineeringTalentRadar';
import { ClientPortal } from './components/ClientPortal';
import { VerifiedImpact } from './components/VerifiedImpact';
import { SystemReliabilityStatus } from './components/SystemReliabilityStatus';
import { SystemTelemetryModal } from './components/SystemTelemetryModal';

// Modals & Overlays
import { ArchitectureDetailModal } from './components/ArchitectureDetailModal';
import { SecurityArchitectureModal } from './components/SecurityArchitectureModal';
import { CommandPalette } from './components/CommandPalette';

import { CapabilityCard, EngagementTier } from './types/nexora';
import { Sparkles, ArrowUp, Terminal, Search, ShieldCheck, Activity, ArrowLeft } from 'lucide-react';

export default function App() {
  // Modal states
  const [selectedCapability, setSelectedCapability] = useState<CapabilityCard | null>(null);
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [telemetryModalOpen, setTelemetryModalOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Navigation History state for Rollback / Back Arrow
  const [navHistory, setNavHistory] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState<string>('hero');

  // Reduced Motion state
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return localStorage.getItem('nexora_reduced_motion') === 'true';
  });

  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('nexora_theme') as 'dark' | 'light') || 'dark';
  });

  // Role-based view state ('all' | 'cto' | 'executive')
  const [userRole, setUserRole] = useState<'all' | 'cto' | 'executive'>(() => {
    return (localStorage.getItem('nexora_user_role') as 'all' | 'cto' | 'executive') || 'all';
  });

  useEffect(() => {
    localStorage.setItem('nexora_reduced_motion', String(reducedMotion));
    document.body.classList.toggle('reduced-motion', reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem('nexora_theme', theme);
    document.body.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('nexora_user_role', userRole);
  }, [userRole]);

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Scoping & pre-fill states for Contact Wizard
  const [contactInitialCategory, setContactInitialCategory] = useState<string>('AI / LLM');
  const [contactPrefilledScope, setContactPrefilledScope] = useState<string>('');

  // Scroll Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (currentSection && currentSection !== sectionId) {
        setNavHistory((prev) => [...prev, currentSection]);
      }
      setCurrentSection(sectionId);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoBack = () => {
    if (navHistory.length === 0) return;
    const newHistory = [...navHistory];
    const previousSection = newHistory.pop()!;
    setNavHistory(newHistory);
    setCurrentSection(previousSection);
    const el = document.getElementById(previousSection);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenContact = (category?: string, scope?: string) => {
    if (category) setContactInitialCategory(category);
    if (scope) setContactPrefilledScope(scope);
    scrollToSection('contact');
  };

  const handleDiscussTier = (tier: EngagementTier) => {
    setContactInitialCategory(tier.name);
    setContactPrefilledScope(
      `Engagement Inquiry for "${tier.name}": ${tier.tagline}. Primary objective: ${tier.scopeSummary}`
    );
    scrollToSection('contact');
  };

  const handleDiscussFromRoi = (reportText: string) => {
    setContactInitialCategory('Cloud');
    setContactPrefilledScope(reportText);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Thin Animated Scroll-Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/60 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(6,182,212,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 1. Global Navigation Bar */}
      <Navbar
        onOpenContact={(cat) => handleOpenContact(cat)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onNavigate={scrollToSection}
        userRole={userRole}
        onRoleChange={setUserRole}
      />

      {/* Role-based Perspective Highlight Banner */}
      {userRole !== 'all' && (
        <div className="sticky top-20 z-40 bg-[#090D16]/95 backdrop-blur-md border-b border-indigo-500/30 px-4 py-2.5 shadow-xl animate-in fade-in duration-200">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2 font-mono">
              {userRole === 'cto' ? (
                <>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">CTO Perspective Active</span>
                  <span className="text-slate-300 hidden md:inline">• Highlighting Security Enclaves, vLLM Clusters, SPIFFE/SPIRE & Architecture Blueprints</span>
                </>
              ) : (
                <>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">Executive Perspective Active</span>
                  <span className="text-slate-300 hidden md:inline">• Highlighting Dynamic ROI Calculations, Case Studies, Cost Estimators & TCO Modeling</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {userRole === 'cto' ? (
                <button
                  onClick={() => scrollToSection('security')}
                  className="text-cyan-400 hover:underline font-mono font-semibold cursor-pointer"
                >
                  Jump to Security Center →
                </button>
              ) : (
                <button
                  onClick={() => scrollToSection('roi-calculator')}
                  className="text-indigo-400 hover:underline font-mono font-semibold cursor-pointer"
                >
                  Jump to ROI Calculator →
                </button>
              )}
              <button
                onClick={() => setUserRole('all')}
                className="text-slate-400 hover:text-white font-mono underline cursor-pointer"
              >
                Reset View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Flow - 18 Integrated Technical Sections */}
      <main className="flex-1 flex flex-col">
        
        {/* 2. Hero Section Above the Fold */}
        <Hero
          onBuildClick={() => handleOpenContact()}
          onExploreArchitecture={() => scrollToSection('architecture')}
        />

        {/* 3. Signature Interactive System: Architecture Topology Playground */}
        <ArchitecturePlayground />

        {/* 4. Nexora Intelligence Platform Demo (Live Gemini AI Architecture Analyzer) */}
        <div id="platform">
          <IntelligenceDemo />
        </div>

        {/* 5. Core Capabilities & 6 Engineering Pillars */}
        <CoreCapabilities
          onSelectCapability={(cap) => setSelectedCapability(cap)}
        />

        {/* 6. Financial Impact: Dynamic ROI Estimator */}
        <ROICalculator
          onDiscussScope={handleDiscussFromRoi}
        />

        {/* 7. Cloud Infrastructure & AI Cost Estimator */}
        <CostEstimator
          onDiscussCost={(costSummary) => handleOpenContact('Cloud', costSummary)}
        />

        {/* 7.5. Global Latency & Edge Node Map */}
        <GlobalLatencyMap />

        {/* 8. Audited / Illustrative Case Studies */}
        <CaseStudies />

        {/* 9. Interactive AI Readiness Diagnostic Assessment */}
        <div id="assessment">
          <AIReadinessAssessment
            onDiscussProfile={(profileSummary) => handleOpenContact('AI / LLM', profileSummary)}
          />
        </div>

        {/* 10. Engineering Principles & Ethos */}
        <div id="principles">
          <EngineeringPrinciples />
        </div>

        {/* 11. Delivery Lifecycle: How We Work */}
        <div id="how-we-work">
          <HowWeWork />
        </div>

        {/* 12. Security Center (Zero-Trust & Compliance) */}
        <SecurityCenter
          onOpenSecurityModal={() => setSecurityModalOpen(true)}
        />

        {/* 13. Responsible AI Governance Framework */}
        <div id="responsible-ai">
          <ResponsibleAIFramework />
        </div>

        {/* 14. Technology Ecosystem & Open Standards */}
        <div id="ecosystem">
          <TechnologyEcosystem />
        </div>

        {/* 15. Engagement Models & Delivery Partnerships */}
        <EngagementModels
          onSelectTier={handleDiscussTier}
        />

        {/* 15.5. Engineering Talent Radar */}
        <EngineeringTalentRadar />

        {/* 16. Technical Resource Library & Architecture Whitepapers */}
        <ResourceLibrary />

        {/* 16.5. Automated Architectural Dossier & PDF Export */}
        <ArchitecturalDossierExport
          onOpenContact={() => handleOpenContact()}
        />

        {/* 16.8. Verified Impact & Carousel Quotes */}
        <VerifiedImpact />

        {/* 16.9. System Reliability Status & Streaming Telemetry */}
        <SystemReliabilityStatus />

        {/* 17. Client Portal (Firebase Authentication & Client Dashboard) */}
        <ClientPortal />

        {/* 18. About Nexora & Technical Positioning */}
        <AboutNexora />

        {/* 18. Contact & Multi-Step Scoping Wizard */}
        <div id="contact">
          <ContactWizard
            initialProblem={contactInitialCategory}
            prefilledScope={contactPrefilledScope}
          />
        </div>

      </main>

      {/* Enterprise Footer */}
      <Footer
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Floating Action Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-2">
        {/* Back Arrow / Rollback Button */}
        {navHistory.length > 0 && (
          <button
            onClick={handleGoBack}
            className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-indigo-300 hover:text-white border border-indigo-500/40 shadow-xl transition-all cursor-pointer flex items-center space-x-1.5 px-3.5 group animate-in fade-in duration-200"
            title="Rollback to previous section/page"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-mono font-bold hidden sm:inline">Back</span>
          </button>
        )}

        {/* System Telemetry Trigger */}
        <button
          onClick={() => setTelemetryModalOpen(true)}
          className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 shadow-xl transition-all cursor-pointer flex items-center justify-center group"
          title="Open System Telemetry Live Dashboard"
        >
          <Activity className="w-4 h-4 group-hover:scale-110 transition-transform animate-pulse" />
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 shadow-xl transition-all cursor-pointer hidden sm:flex items-center justify-center group"
          title="Command Palette (Cmd+K)"
        >
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* Scroll To Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800 shadow-xl hover:bg-slate-800 transition-colors cursor-pointer"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Modals & Dialogs */}
      <ArchitectureDetailModal
        capability={selectedCapability}
        onClose={() => setSelectedCapability(null)}
        onDiscussScope={() => {
          if (selectedCapability) {
            handleOpenContact(
              selectedCapability.title,
              `Inquiry regarding ${selectedCapability.blueprint.title}. We are interested in reviewing this architectural pattern.`
            );
          }
          setSelectedCapability(null);
        }}
      />

      <SecurityArchitectureModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
        onDiscussScope={() => {
          handleOpenContact(
            'Security',
            'Requesting detailed security architecture review covering zero-trust perimeter, workload identities, and compliance boundary isolation.'
          );
          setSecurityModalOpen(false);
        }}
      />

      <SystemTelemetryModal
        isOpen={telemetryModalOpen}
        onClose={() => setTelemetryModalOpen(false)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={scrollToSection}
        onOpenContact={handleOpenContact}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={toggleReducedMotion}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenTelemetry={() => setTelemetryModalOpen(true)}
      />

    </div>
  );
}
