import React, { useState, useEffect } from 'react';
import { 
  auth, db, googleProvider, 
  signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  signOut, onAuthStateChanged, User 
} from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { Shield, Lock, Mail, Key, User as UserIcon, LogOut, CheckCircle2, Clock, Upload, FileText, Calendar, Video, ArrowRight, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  phase: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  dueDate: string;
  description: string;
}

interface DocItem {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadedAt: string;
  status: 'Verified' | 'Pending Review';
}

interface EngineeringSync {
  id: string;
  title: string;
  engineer: string;
  datetime: string;
  topic: string;
  meetLink: string;
}

export const ClientPortal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'milestones' | 'documents' | 'syncs'>('milestones');

  // New Document Upload Form State
  const [newDocName, setNewDocName] = useState<string>('');
  const [newDocCategory, setNewDocCategory] = useState<string>('Architecture Spec');
  const [uploading, setUploading] = useState<boolean>(false);

  // Firestore Data State
  const [documents, setDocuments] = useState<DocItem[]>([
    { id: '1', name: 'Enterprise_AI_Security_Whitepaper_v4.pdf', category: 'Security Audit', size: '4.2 MB', uploadedAt: '2026-09-24', status: 'Verified' },
    { id: '2', name: 'MultiRegion_Kubernetes_Topology_Spec.yaml', category: 'Infrastructure', size: '1.8 MB', uploadedAt: '2026-09-25', status: 'Verified' },
    { id: '3', name: 'LangGraph_Agent_Workflow_Schema.json', category: 'AI Orchestration', size: '850 KB', uploadedAt: '2026-09-26', status: 'Pending Review' }
  ]);

  const milestones: Milestone[] = [
    { id: 'm1', title: 'Zero-Trust Perimeter & mTLS Mesh Setup', phase: 'Phase 1', status: 'Completed', dueDate: 'Sep 10, 2026', description: 'Configured Envoy proxies and SPIFFE/SPIRE workload identities across multi-cloud clusters.' },
    { id: 'm2', title: 'Qdrant Partitioned Vector Store & RAG Pipeline', phase: 'Phase 2', status: 'Completed', dueDate: 'Sep 18, 2026', description: 'Deployed high-throughput vector database with sub-25ms hybrid retrieval.' },
    { id: 'm3', title: 'Private vLLM GPU Inference Cluster Deployment', phase: 'Phase 3', status: 'In Progress', dueDate: 'Oct 05, 2026', description: 'Provisioning dedicated NVIDIA H100 GPU pools for fine-tuned Llama-3 enterprise models.' },
    { id: 'm4', title: 'Enterprise Handover & SOC2 Final Audit', phase: 'Phase 4', status: 'Upcoming', dueDate: 'Oct 20, 2026', description: 'Comprehensive penetration testing, team training, and production traffic cutover.' }
  ];

  const syncs: EngineeringSync[] = [
    { id: 's1', title: 'Weekly Architecture Review & GPU Throughput Sync', engineer: 'Dr. Alistair Vance (Chief AI Architect)', datetime: 'Sep 28, 2026 • 14:00 UTC', topic: 'Reviewing token latency benchmarks and vLLM quantization parameters.', meetLink: 'https://meet.google.com/nex-ai-sync' },
    { id: 's2', title: 'Zero-Trust Security & Compliance Audit Checkpoint', engineer: 'Marcus Thorne (Head of Security)', datetime: 'Oct 02, 2026 • 16:30 UTC', topic: 'SOC2 Type II evidence collection and IAM least-privilege verification.', meetLink: 'https://meet.google.com/nex-sec-audit' }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('enterprise.client@nexora.io');
    setPassword('NexoraSecure2026!');
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, 'enterprise.client@nexora.io', 'NexoraSecure2026!');
    } catch {
      // If demo account doesn't exist yet, create it automatically!
      try {
        await createUserWithEmailAndPassword(auth, 'enterprise.client@nexora.io', 'NexoraSecure2026!');
      } catch (err: any) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    setUploading(true);
    setTimeout(() => {
      const newDoc: DocItem = {
        id: Date.now().toString(),
        name: newDocName.endsWith('.pdf') || newDocName.endsWith('.yaml') || newDocName.endsWith('.json') ? newDocName : `${newDocName}.pdf`,
        category: newDocCategory,
        size: '2.4 MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'Pending Review'
      };
      setDocuments([newDoc, ...documents]);
      setNewDocName('');
      setUploading(false);
    }, 600);
  };

  if (loading && !user) {
    return (
      <div className="py-24 bg-[#070B14] flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-sm">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Authenticating Enterprise Session...</span>
        </div>
      </div>
    );
  }

  return (
    <section id="client-portal" className="py-24 bg-[#070B14] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unauthenticated State: Auth Card */}
        {!user ? (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8 space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Secure Enterprise Portal</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Client Portal Login
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Access your dedicated milestones, document repository, and scheduled engineering syncs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0F172A]/90 border border-slate-800 shadow-2xl space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Enterprise Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@enterprise.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>{isSignUp ? 'Create Enterprise Account' : 'Sign In to Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-xs font-mono uppercase">or</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-800 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"/>
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                    <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z"/>
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z"/>
                  </svg>
                  <span>Sign In with Google</span>
                </button>

                <button
                  onClick={handleDemoLogin}
                  className="w-full py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Instant Demo Client Login</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an enterprise account? Create one"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-8">
            
            {/* Dashboard Header Bar */}
            <div className="p-8 rounded-3xl bg-[#0F172A]/90 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active Enterprise Session</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-2">
                  Welcome back, {user.email?.split('@')[0]}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-mono">
                  Client ID: <span className="text-cyan-400">{user.uid}</span> • Project: <strong className="text-white">Enterprise AI & Cloud Infrastructure</strong>
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-rose-400 font-bold text-xs border border-slate-800 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-4">
              <button
                onClick={() => setActiveTab('milestones')}
                className={`px-6 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center space-x-2 ${
                  activeTab === 'milestones'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg'
                    : 'bg-[#0F172A] hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Project Milestones (4 Active)</span>
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className={`px-6 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center space-x-2 ${
                  activeTab === 'documents'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg'
                    : 'bg-[#0F172A] hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Document Repository ({documents.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('syncs')}
                className={`px-6 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center space-x-2 ${
                  activeTab === 'syncs'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg'
                    : 'bg-[#0F172A] hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Scheduled Engineering Syncs ({syncs.length})</span>
              </button>
            </div>

            {/* Tab 1: Project Milestones */}
            {activeTab === 'milestones' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {milestones.map((m) => {
                    const isDone = m.status === 'Completed';
                    const isInProgress = m.status === 'In Progress';
                    return (
                      <div key={m.id} className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-cyan-400">
                            {m.phase}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            isDone ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            isInProgress ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white">{m.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                        <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                          <span>Target Due: {m.dueDate}</span>
                          <span className={isDone ? 'text-emerald-400' : 'text-cyan-400'}>{isDone ? 'Verified & Deployed' : 'In Execution'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Document Repository */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                
                {/* Upload Document Box */}
                <div className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span>Upload Architecture Spec or Compliance File</span>
                  </h3>
                  <form onSubmit={handleUploadDocument} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      required
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      placeholder="Document title (e.g. Security_Review_v2.pdf)"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <select
                      value={newDocCategory}
                      onChange={(e) => setNewDocCategory(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Architecture Spec">Architecture Spec</option>
                      <option value="Security Audit">Security Audit</option>
                      <option value="AI Orchestration">AI Orchestration</option>
                      <option value="Compliance">Compliance</option>
                    </select>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {uploading ? 'Uploading...' : 'Upload File'}
                    </button>
                  </form>
                </div>

                {/* Documents Table */}
                <div className="rounded-2xl bg-[#0F172A]/90 border border-slate-800 overflow-hidden">
                  <div className="p-4 border-b border-slate-800 text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Secure Vault Documents
                  </div>
                  <div className="divide-y divide-slate-800">
                    {documents.map((doc) => (
                      <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-900/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-bold text-white font-mono">{doc.name}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{doc.category} • {doc.size} • Uploaded {doc.uploadedAt}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            doc.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Tab 3: Scheduled Engineering Syncs */}
            {activeTab === 'syncs' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {syncs.map((sync) => (
                    <div key={sync.id} className="p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-mono font-bold">
                          Live Video Sync
                        </span>
                        <span className="text-xs font-mono text-cyan-400 flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {sync.datetime.split('•')[1]}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{sync.title}</h3>
                      <div className="text-xs text-slate-300 font-mono">Lead: {sync.engineer}</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{sync.topic}</p>
                      
                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-mono">{sync.datetime.split('•')[0]}</span>
                        <a
                          href={sync.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 transition-all flex items-center space-x-1.5 cursor-pointer"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Meeting</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
