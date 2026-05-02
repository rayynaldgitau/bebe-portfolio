import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Image, Wrench, Star, Users, GitBranch,
  BarChart2, MessageSquare, User, Mail, Lock, LogOut,
  Plus, Trash2, Save, RotateCcw, ChevronDown, ChevronUp, Eye
} from 'lucide-react';
import { useContent, PortfolioContent, Project, Service, Skill, Stat, Testimonial, ProcessStep, CommissionType } from '../context/ContentContext';
import { changePassword, clearAdminSession } from '../lib/auth';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabId = 'general' | 'projects' | 'services' | 'skills' | 'stats' | 'testimonials' | 'process' | 'commissions' | 'contact' | 'security';

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: 'general', label: 'General', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: Image },
  { id: 'commissions', label: 'Commissions', icon: Star },
  { id: 'skills', label: 'Skills', icon: BarChart2 },
  { id: 'stats', label: 'Stats', icon: Users },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'process', label: 'Process', icon: GitBranch },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'security', label: 'Security', icon: Lock },
];

function uid() { return Date.now().toString() + Math.random().toString(36).slice(2); }

const inputCls = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition text-sm";
const labelCls = "block text-xs font-medium text-gray-400 mb-1";
const sectionTitle = "text-lg font-bold text-white mb-4";

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { content, updateContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [draft, setDraft] = useState<PortfolioContent>(content);
  const [saved, setSaved] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSave = () => {
    updateContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      resetContent();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    onLogout();
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) { setPasswordMsg('Password must be at least 6 characters.'); return; }
    if (newPassword !== confirmPassword) { setPasswordMsg('Passwords do not match.'); return; }
    await changePassword(newPassword);
    setPasswordMsg('Password updated successfully!');
    setNewPassword(''); setConfirmPassword('');
    setTimeout(() => setPasswordMsg(''), 3000);
  };

  const update = (path: string, value: any) => {
    const parts = path.split('.');
    setDraft(prev => {
      const next = { ...prev } as any;
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) {
        cur[parts[i]] = { ...cur[parts[i]] };
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <motion.aside
        className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0"
        animate={{ width: sidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-4 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-white text-sm truncate">Portfolio Admin</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm ${
                  activeTab === tab.id
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-800 space-y-1">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition text-sm"
          >
            <Eye className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>View Portfolio</span>}
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition text-sm"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition">
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <h1 className="text-white font-semibold">
              {TABS.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <motion.button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 text-sm bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Save className="w-4 h-4" />
              {saved ? 'Saved!' : 'Save Changes'}
            </motion.button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >

              {/* GENERAL */}
              {activeTab === 'general' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                    <h2 className={sectionTitle}>Navigation</h2>
                    <div>
                      <label className={labelCls}>Brand Name</label>
                      <input className={inputCls} value={draft.nav.brandName} onChange={e => update('nav.brandName', e.target.value)} />
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                    <h2 className={sectionTitle}>Hero Section</h2>
                    <div className="space-y-3">
                      <div>
                        <label className={labelCls}>Title</label>
                        <input className={inputCls} value={draft.hero.title} onChange={e => update('hero.title', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Subtitle</label>
                        <textarea className={inputCls} rows={3} value={draft.hero.subtitle} onChange={e => update('hero.subtitle', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                    <h2 className={sectionTitle}>About Me</h2>
                    <textarea className={inputCls} rows={6} value={draft.about.text} onChange={e => update('about.text', e.target.value)} />
                  </div>

                  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                    <h2 className={sectionTitle}>Footer</h2>
                    <input className={inputCls} value={draft.footer.text} onChange={e => update('footer.text', e.target.value)} />
                  </div>
                </div>
              )}

              {/* PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{draft.projects.length} projects</p>
                    <button
                      onClick={() => setDraft(p => ({ ...p, projects: [...p.projects, { id: uid(), title: 'New Project', description: '', imageUrl: 'https://images.unsplash.com/photo-1674305281997-b6538532f388?w=1080', category: 'Animation' }] }))}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition"
                    >
                      <Plus className="w-4 h-4" /> Add Project
                    </button>
                  </div>
                  {draft.projects.map((p, i) => (
                    <CollapsibleCard
                      key={p.id}
                      id={p.id}
                      title={p.title || 'Untitled'}
                      subtitle={p.category}
                      expanded={expandedId === p.id}
                      onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
                      onDelete={() => setDraft(prev => ({ ...prev, projects: prev.projects.filter(x => x.id !== p.id) }))}
                    >
                      <ProjectForm project={p} onChange={updated => setDraft(prev => ({ ...prev, projects: prev.projects.map(x => x.id === p.id ? updated : x) }))} />
                    </CollapsibleCard>
                  ))}
                </div>
              )}

              {/* SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{draft.services.length} services</p>
                    <button
                      onClick={() => setDraft(p => ({ ...p, services: [...p.services, { id: uid(), title: 'New Service', description: '', icon: 'Layers', features: ['Feature 1'] }] }))}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition"
                    >
                      <Plus className="w-4 h-4" /> Add Service
                    </button>
                  </div>
                  {draft.services.map(s => (
                    <CollapsibleCard key={s.id} id={s.id} title={s.title} expanded={expandedId === s.id} onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)} onDelete={() => setDraft(prev => ({ ...prev, services: prev.services.filter(x => x.id !== s.id) }))}>
                      <ServiceForm service={s} onChange={updated => setDraft(prev => ({ ...prev, services: prev.services.map(x => x.id === s.id ? updated : x) }))} />
                    </CollapsibleCard>
                  ))}
                </div>
              )}

              {/* SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{draft.skills.length} skills</p>
                    <button
                      onClick={() => setDraft(p => ({ ...p, skills: [...p.skills, { id: uid(), name: 'New Skill', level: 80, category: 'Software' }] }))}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition"
                    >
                      <Plus className="w-4 h-4" /> Add Skill
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                    {draft.skills.map((sk, i) => (
                      <div key={sk.id} className={`p-4 ${i > 0 ? 'border-t border-gray-800' : ''}`}>
                        <div className="grid grid-cols-3 gap-3 items-center">
                          <input className={inputCls} value={sk.name} placeholder="Skill name" onChange={e => setDraft(prev => ({ ...prev, skills: prev.skills.map(x => x.id === sk.id ? { ...x, name: e.target.value } : x) }))} />
                          <select className={inputCls} value={sk.category} onChange={e => setDraft(prev => ({ ...prev, skills: prev.skills.map(x => x.id === sk.id ? { ...x, category: e.target.value } : x) }))}>
                            <option>Software</option>
                            <option>Technique</option>
                          </select>
                          <div className="flex items-center gap-2">
                            <input type="number" min="0" max="100" className={inputCls} value={sk.level} onChange={e => setDraft(prev => ({ ...prev, skills: prev.skills.map(x => x.id === sk.id ? { ...x, level: Number(e.target.value) } : x) }))} />
                            <button onClick={() => setDraft(prev => ({ ...prev, skills: prev.skills.filter(x => x.id !== sk.id) }))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-600 to-orange-600 rounded-full transition-all" style={{ width: `${sk.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STATS */}
              {activeTab === 'stats' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{draft.stats.length} stats</p>
                    <button onClick={() => setDraft(p => ({ ...p, stats: [...p.stats, { id: uid(), label: 'New Stat', value: 0, suffix: '+', prefix: '' }] }))} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition">
                      <Plus className="w-4 h-4" /> Add Stat
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                    {draft.stats.map((st, i) => (
                      <div key={st.id} className={`p-4 ${i > 0 ? 'border-t border-gray-800' : ''}`}>
                        <div className="grid grid-cols-4 gap-3 items-end">
                          <div>
                            <label className={labelCls}>Label</label>
                            <input className={inputCls} value={st.label} onChange={e => setDraft(prev => ({ ...prev, stats: prev.stats.map(x => x.id === st.id ? { ...x, label: e.target.value } : x) }))} />
                          </div>
                          <div>
                            <label className={labelCls}>Value</label>
                            <input type="number" className={inputCls} value={st.value} onChange={e => setDraft(prev => ({ ...prev, stats: prev.stats.map(x => x.id === st.id ? { ...x, value: Number(e.target.value) } : x) }))} />
                          </div>
                          <div>
                            <label className={labelCls}>Prefix / Suffix</label>
                            <div className="flex gap-1">
                              <input className={inputCls} placeholder="Prefix" value={st.prefix} onChange={e => setDraft(prev => ({ ...prev, stats: prev.stats.map(x => x.id === st.id ? { ...x, prefix: e.target.value } : x) }))} />
                              <input className={inputCls} placeholder="Suffix" value={st.suffix} onChange={e => setDraft(prev => ({ ...prev, stats: prev.stats.map(x => x.id === st.id ? { ...x, suffix: e.target.value } : x) }))} />
                            </div>
                          </div>
                          <button onClick={() => setDraft(prev => ({ ...prev, stats: prev.stats.filter(x => x.id !== st.id) }))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-2 text-2xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                          {st.prefix}{st.value}{st.suffix}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{draft.testimonials.length} testimonials</p>
                    <button onClick={() => setDraft(p => ({ ...p, testimonials: [...p.testimonials, { id: uid(), name: 'New Person', role: 'Role', company: 'Company', text: 'Testimonial text...', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' }] }))} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition">
                      <Plus className="w-4 h-4" /> Add Testimonial
                    </button>
                  </div>
                  {draft.testimonials.map(t => (
                    <CollapsibleCard key={t.id} id={t.id} title={t.name} subtitle={`${t.role} @ ${t.company}`} expanded={expandedId === t.id} onToggle={() => setExpandedId(expandedId === t.id ? null : t.id)} onDelete={() => setDraft(prev => ({ ...prev, testimonials: prev.testimonials.filter(x => x.id !== t.id) }))}>
                      <TestimonialForm testimonial={t} onChange={updated => setDraft(prev => ({ ...prev, testimonials: prev.testimonials.map(x => x.id === t.id ? updated : x) }))} />
                    </CollapsibleCard>
                  ))}
                </div>
              )}

              {/* PROCESS */}
              {activeTab === 'process' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{draft.processSteps.length} steps</p>
                    <button onClick={() => setDraft(p => ({ ...p, processSteps: [...p.processSteps, { id: uid(), title: 'New Step', description: 'Step description.', icon: 'Lightbulb' }] }))} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition">
                      <Plus className="w-4 h-4" /> Add Step
                    </button>
                  </div>
                  {draft.processSteps.map((step, i) => (
                    <CollapsibleCard key={step.id} id={step.id} title={`${i + 1}. ${step.title}`} expanded={expandedId === step.id} onToggle={() => setExpandedId(expandedId === step.id ? null : step.id)} onDelete={() => setDraft(prev => ({ ...prev, processSteps: prev.processSteps.filter(x => x.id !== step.id) }))}>
                      <div className="space-y-3">
                        <div>
                          <label className={labelCls}>Title</label>
                          <input className={inputCls} value={step.title} onChange={e => setDraft(prev => ({ ...prev, processSteps: prev.processSteps.map(x => x.id === step.id ? { ...x, title: e.target.value } : x) }))} />
                        </div>
                        <div>
                          <label className={labelCls}>Description</label>
                          <textarea className={inputCls} rows={3} value={step.description} onChange={e => setDraft(prev => ({ ...prev, processSteps: prev.processSteps.map(x => x.id === step.id ? { ...x, description: e.target.value } : x) }))} />
                        </div>
                      </div>
                    </CollapsibleCard>
                  ))}
                </div>
              )}

              {/* COMMISSIONS */}
              {activeTab === 'commissions' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{draft.commissions?.length ?? 0} tiers</p>
                    <button
                      onClick={() => setDraft(p => ({ ...p, commissions: [...(p.commissions ?? []), { id: uid(), title: 'New Tier', description: '', price: '0', currency: 'RM', turnaround: '7 days', includes: ['1 character'], available: true }] }))}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition"
                    >
                      <Plus className="w-4 h-4" /> Add Tier
                    </button>
                  </div>
                  {(draft.commissions ?? []).map((tier, i) => (
                    <CollapsibleCard
                      key={tier.id}
                      id={tier.id}
                      title={tier.title}
                      subtitle={`${tier.currency} ${tier.price} · ${tier.available ? 'Open' : 'Closed'}`}
                      expanded={expandedId === tier.id}
                      onToggle={() => setExpandedId(expandedId === tier.id ? null : tier.id)}
                      onDelete={() => setDraft(prev => ({ ...prev, commissions: prev.commissions.filter(x => x.id !== tier.id) }))}
                    >
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Title</label>
                            <input className={inputCls} value={tier.title} onChange={e => setDraft(p => ({ ...p, commissions: p.commissions.map(x => x.id === tier.id ? { ...x, title: e.target.value } : x) }))} />
                          </div>
                          <div>
                            <label className={labelCls}>Price</label>
                            <input className={inputCls} value={tier.price} onChange={e => setDraft(p => ({ ...p, commissions: p.commissions.map(x => x.id === tier.id ? { ...x, price: e.target.value } : x) }))} />
                          </div>
                          <div>
                            <label className={labelCls}>Currency</label>
                            <input className={inputCls} value={tier.currency} placeholder="RM" onChange={e => setDraft(p => ({ ...p, commissions: p.commissions.map(x => x.id === tier.id ? { ...x, currency: e.target.value } : x) }))} />
                          </div>
                          <div>
                            <label className={labelCls}>Turnaround</label>
                            <input className={inputCls} value={tier.turnaround} placeholder="7–10 days" onChange={e => setDraft(p => ({ ...p, commissions: p.commissions.map(x => x.id === tier.id ? { ...x, turnaround: e.target.value } : x) }))} />
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Description</label>
                          <textarea className={inputCls} rows={2} value={tier.description} onChange={e => setDraft(p => ({ ...p, commissions: p.commissions.map(x => x.id === tier.id ? { ...x, description: e.target.value } : x) }))} />
                        </div>
                        <div>
                          <label className={labelCls}>Includes (one per line)</label>
                          <textarea
                            className={inputCls}
                            rows={3}
                            value={tier.includes.join('\n')}
                            onChange={e => setDraft(p => ({ ...p, commissions: p.commissions.map(x => x.id === tier.id ? { ...x, includes: e.target.value.split('\n').filter(Boolean) } : x) }))}
                          />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tier.available}
                            onChange={e => setDraft(p => ({ ...p, commissions: p.commissions.map(x => x.id === tier.id ? { ...x, available: e.target.checked } : x) }))}
                            className="w-4 h-4 accent-purple-500"
                          />
                          <span className="text-sm text-gray-300">Open for commissions</span>
                        </label>
                      </div>
                    </CollapsibleCard>
                  ))}
                </div>
              )}

              {/* CONTACT */}
              {activeTab === 'contact' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                    <h2 className={sectionTitle}>Contact Links</h2>
                    <div className="space-y-3">
                      <div>
                        <label className={labelCls}>Email Address</label>
                        <input className={inputCls} type="email" value={draft.contact.email} onChange={e => update('contact.email', e.target.value)} placeholder="hello@example.com" />
                      </div>
                      <div>
                        <label className={labelCls}>TikTok URL</label>
                        <input className={inputCls} value={(draft.contact as any).tiktok ?? ''} onChange={e => update('contact.tiktok', e.target.value)} placeholder="https://tiktok.com/@username" />
                      </div>
                      <div>
                        <label className={labelCls}>Instagram URL</label>
                        <input className={inputCls} value={(draft.contact as any).instagram ?? ''} onChange={e => update('contact.instagram', e.target.value)} placeholder="https://instagram.com/username" />
                      </div>
                      <div>
                        <label className={labelCls}>GitHub URL</label>
                        <input className={inputCls} value={draft.contact.github} onChange={e => update('contact.github', e.target.value)} placeholder="https://github.com/username" />
                      </div>
                      <div>
                        <label className={labelCls}>LinkedIn URL</label>
                        <input className={inputCls} value={draft.contact.linkedin} onChange={e => update('contact.linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY */}
              {activeTab === 'security' && (
                <div className="space-y-6 max-w-md">
                  <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                    <h2 className={sectionTitle}>Change Admin Password</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-3">
                      <div>
                        <label className={labelCls}>New Password</label>
                        <input className={inputCls} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min 6 characters" required />
                      </div>
                      <div>
                        <label className={labelCls}>Confirm New Password</label>
                        <input className={inputCls} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat password" required />
                      </div>
                      {passwordMsg && (
                        <div className={`p-3 rounded-lg text-sm ${passwordMsg.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                          {passwordMsg}
                        </div>
                      )}
                      <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-lg font-medium text-sm transition hover:opacity-90">
                        Update Password
                      </button>
                    </form>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-5 border border-red-500/20">
                    <h2 className="text-lg font-bold text-red-400 mb-2">Danger Zone</h2>
                    <p className="text-gray-400 text-sm mb-4">Reset all portfolio content back to the original defaults.</p>
                    <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/20 transition">
                      <RotateCcw className="w-4 h-4" /> Reset All Content
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function CollapsibleCard({ id, title, subtitle, expanded, onToggle, onDelete, children }: {
  id: string; title: string; subtitle?: string; expanded: boolean;
  onToggle: () => void; onDelete: () => void; children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-800/50 transition" onClick={onToggle}>
        <div>
          <span className="text-white text-sm font-medium">{title}</span>
          {subtitle && <span className="text-gray-500 text-xs ml-2">{subtitle}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={e => { e.stopPropagation(); onDelete(); }}
            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-gray-800">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectForm({ project, onChange }: { project: Project; onChange: (p: Project) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Title</label>
          <input className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={project.title} onChange={e => onChange({ ...project, title: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Category</label>
          <input className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={project.category} onChange={e => onChange({ ...project, category: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Description</label>
        <textarea rows={2} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 resize-none" value={project.description} onChange={e => onChange({ ...project, description: e.target.value })} />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Image URL</label>
        <input className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={project.imageUrl} onChange={e => onChange({ ...project, imageUrl: e.target.value })} />
      </div>
      {project.imageUrl && (
        <img src={project.imageUrl} alt="" className="w-full h-32 object-cover rounded-lg opacity-70" onError={e => (e.currentTarget.style.display = 'none')} />
      )}
    </div>
  );
}

function ServiceForm({ service, onChange }: { service: Service; onChange: (s: Service) => void }) {
  const addFeature = () => onChange({ ...service, features: [...service.features, 'New Feature'] });
  const removeFeature = (i: number) => onChange({ ...service, features: service.features.filter((_, idx) => idx !== i) });
  const updateFeature = (i: number, val: string) => onChange({ ...service, features: service.features.map((f, idx) => idx === i ? val : f) });

  return (
    <div className="space-y-3 pt-2">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Title</label>
          <input className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={service.title} onChange={e => onChange({ ...service, title: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Icon name</label>
          <input className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={service.icon} onChange={e => onChange({ ...service, icon: e.target.value })} placeholder="Layers, Film, Palette…" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Description</label>
        <textarea rows={2} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 resize-none" value={service.description} onChange={e => onChange({ ...service, description: e.target.value })} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs text-gray-400">Features</label>
          <button onClick={addFeature} className="text-xs text-purple-400 hover:text-purple-300 transition">+ Add</button>
        </div>
        <div className="space-y-2">
          {service.features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={f} onChange={e => updateFeature(i, e.target.value)} />
              <button onClick={() => removeFeature(i)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialForm({ testimonial, onChange }: { testimonial: Testimonial; onChange: (t: Testimonial) => void }) {
  return (
    <div className="space-y-3 pt-2">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Name</label>
          <input className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={testimonial.name} onChange={e => onChange({ ...testimonial, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Role</label>
          <input className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={testimonial.role} onChange={e => onChange({ ...testimonial, role: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Company</label>
          <input className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={testimonial.company} onChange={e => onChange({ ...testimonial, company: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Testimonial</label>
        <textarea rows={3} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 resize-none" value={testimonial.text} onChange={e => onChange({ ...testimonial, text: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Avatar URL</label>
          <input className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={testimonial.avatar} onChange={e => onChange({ ...testimonial, avatar: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Rating (1–5)</label>
          <input type="number" min={1} max={5} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500" value={testimonial.rating} onChange={e => onChange({ ...testimonial, rating: Number(e.target.value) })} />
        </div>
      </div>
    </div>
  );
}
