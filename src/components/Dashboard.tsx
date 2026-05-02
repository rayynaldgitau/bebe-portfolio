import { useState } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  onUpdateHero: (title: string, subtitle: string) => void;
  onUpdateAbout: (text: string) => void;
}

export function Dashboard({
  isOpen,
  onClose,
  projects,
  onUpdateProjects,
  heroTitle,
  heroSubtitle,
  aboutText,
  onUpdateHero,
  onUpdateAbout
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'about'>('hero');
  const [editingHeroTitle, setEditingHeroTitle] = useState(heroTitle);
  const [editingHeroSubtitle, setEditingHeroSubtitle] = useState(heroSubtitle);
  const [editingAbout, setEditingAbout] = useState(aboutText);
  const [editingProjects, setEditingProjects] = useState(projects);

  const handleSave = () => {
    onUpdateHero(editingHeroTitle, editingHeroSubtitle);
    onUpdateAbout(editingAbout);
    onUpdateProjects(editingProjects);
    onClose();
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      imageUrl: 'https://images.unsplash.com/photo-1674305281997-b6538532f388',
      category: 'Animation'
    };
    setEditingProjects([...editingProjects, newProject]);
  };

  const deleteProject = (id: string) => {
    setEditingProjects(editingProjects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setEditingProjects(editingProjects.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-4 md:inset-8 bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl z-50 overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="h-full flex flex-col">
              <div className="px-6 py-4 border-b border-purple-500/30 flex items-center justify-between bg-black/40">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                  Portfolio Dashboard
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="px-6 py-3 border-b border-purple-500/30 flex gap-4 bg-black/20">
                {(['hero', 'projects', 'about'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg capitalize transition ${
                      activeTab === tab
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'hero' && (
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Hero Title</label>
                      <input
                        type="text"
                        value={editingHeroTitle}
                        onChange={(e) => setEditingHeroTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Hero Subtitle</label>
                      <textarea
                        value={editingHeroSubtitle}
                        onChange={(e) => setEditingHeroSubtitle(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <button
                      onClick={addProject}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                    <div className="grid gap-4">
                      {editingProjects.map((project) => (
                        <div key={project.id} className="p-4 bg-white/5 border border-purple-500/30 rounded-lg space-y-3">
                          <div className="flex items-start justify-between">
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                              className="flex-1 px-3 py-2 bg-white/5 border border-purple-500/30 rounded text-white"
                              placeholder="Project title"
                            />
                            <button
                              onClick={() => deleteProject(project.id)}
                              className="ml-2 p-2 text-red-400 hover:bg-red-500/20 rounded transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={project.category}
                            onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                            className="w-full px-3 py-2 bg-white/5 border border-purple-500/30 rounded text-white"
                            placeholder="Category"
                          />
                          <textarea
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 bg-white/5 border border-purple-500/30 rounded text-white"
                            placeholder="Description"
                          />
                          <input
                            type="text"
                            value={project.imageUrl}
                            onChange={(e) => updateProject(project.id, 'imageUrl', e.target.value)}
                            className="w-full px-3 py-2 bg-white/5 border border-purple-500/30 rounded text-white"
                            placeholder="Image URL"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="max-w-2xl">
                    <label className="block text-sm font-medium text-gray-300 mb-2">About Text</label>
                    <textarea
                      value={editingAbout}
                      onChange={(e) => setEditingAbout(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-purple-500/30 flex justify-end gap-3 bg-black/40">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-300 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white rounded-lg transition"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
