import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioContent {
  nav: { brandName: string };
  hero: { title: string; subtitle: string };
  about: { text: string };
  stats: Stat[];
  projects: Project[];
  services: Service[];
  skills: Skill[];
  testimonials: Testimonial[];
  processSteps: ProcessStep[];
  contact: { email: string; github: string; linkedin: string };
  footer: { text: string };
}

const DEFAULT_CONTENT: PortfolioContent = {
  nav: { brandName: 'Portfolio' },
  hero: {
    title: 'Creative Animator',
    subtitle: 'Bringing imagination to life through motion, color, and storytelling',
  },
  about: {
    text: 'I craft visual narratives that transcend the ordinary. With a passion for experimental animation and a deep understanding of motion design, I create experiences that captivate and inspire. My work blends traditional techniques with cutting-edge digital artistry.',
  },
  stats: [
    { id: '1', label: 'Projects Completed', value: 250, suffix: '+', prefix: '' },
    { id: '2', label: 'Years Experience', value: 8, suffix: '+', prefix: '' },
    { id: '3', label: 'Happy Clients', value: 120, suffix: '+', prefix: '' },
    { id: '4', label: 'Awards Won', value: 15, suffix: '', prefix: '' },
  ],
  projects: [
    { id: '1', title: 'Chromatic Dreams', description: 'An exploration of color theory through abstract motion', imageUrl: 'https://images.unsplash.com/photo-1674305281997-b6538532f388?w=1080', category: 'Abstract' },
    { id: '2', title: 'Fluid Dynamics', description: 'Organic shapes meet digital precision', imageUrl: 'https://images.unsplash.com/photo-1745357404070-b39944400f25?w=1080', category: 'Motion' },
    { id: '3', title: 'Neon Narrative', description: 'A story told through light and shadow', imageUrl: 'https://images.unsplash.com/photo-1697868372007-7130b2fec25e?w=1080', category: 'Experimental' },
    { id: '4', title: 'Gradient Infinity', description: 'Seamless transitions in endless loops', imageUrl: 'https://images.unsplash.com/photo-1759852174174-7beac185d35f?w=1080', category: 'Loop' },
    { id: '5', title: 'Cosmic Octopus', description: 'Surreal characters in vibrant worlds', imageUrl: 'https://images.unsplash.com/photo-1664639985407-c0a62e7c1a54?w=1080', category: 'Character' },
    { id: '6', title: 'Prismatic Flow', description: 'Where geometry dances with chaos', imageUrl: 'https://images.unsplash.com/photo-1764601842167-ba701eed47f5?w=1080', category: 'Abstract' },
  ],
  services: [
    { id: '1', title: 'Motion Graphics', description: 'Eye-catching graphics that move with purpose', icon: 'Layers', features: ['Explainer Videos', 'Logo Animation', 'Title Sequences', 'Kinetic Typography'] },
    { id: '2', title: 'Character Animation', description: 'Bringing characters to life with personality', icon: 'Sparkles', features: ['2D Character Rigging', '3D Characters', 'Lip Sync', 'Walk Cycles'] },
    { id: '3', title: '3D Animation', description: 'Dimensional storytelling in virtual space', icon: 'Globe', features: ['Product Visualization', 'Environment Design', 'Abstract 3D', 'Modeling & Texturing'] },
    { id: '4', title: 'Visual Effects', description: 'Seamless integration of the impossible', icon: 'Film', features: ['Compositing', 'Particle Effects', 'Color Grading', 'Green Screen'] },
    { id: '5', title: 'Brand Identity', description: 'Cohesive visual systems in motion', icon: 'Palette', features: ['Style Guides', 'Brand Animation', 'Social Media Content', 'Templates'] },
    { id: '6', title: 'Video Editing', description: 'Crafting compelling narratives from footage', icon: 'Video', features: ['Short Form', 'Long Form', 'Sound Design', 'Post Production'] },
  ],
  skills: [
    { id: '1', name: 'After Effects', level: 95, category: 'Software' },
    { id: '2', name: 'Cinema 4D', level: 88, category: 'Software' },
    { id: '3', name: 'Blender', level: 85, category: 'Software' },
    { id: '4', name: 'Illustrator', level: 92, category: 'Software' },
    { id: '5', name: 'Premiere Pro', level: 90, category: 'Software' },
    { id: '6', name: 'Character Animation', level: 87, category: 'Technique' },
    { id: '7', name: 'Motion Graphics', level: 93, category: 'Technique' },
    { id: '8', name: '3D Animation', level: 82, category: 'Technique' },
    { id: '9', name: 'VFX Compositing', level: 85, category: 'Technique' },
    { id: '10', name: 'Storyboarding', level: 88, category: 'Technique' },
  ],
  testimonials: [
    { id: '1', name: 'Sarah Chen', role: 'Creative Director', company: 'Pixel Studios', text: 'Working with this animator transformed our vision into reality. The attention to detail and artistic flair exceeded all expectations.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { id: '2', name: 'Marcus Rodriguez', role: 'Marketing Lead', company: 'Brand Dynamics', text: 'Incredible talent and professionalism. The animations brought our campaign to life and engagement skyrocketed.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: '3', name: 'Emily Watson', role: 'Film Producer', company: 'Indie Films Co', text: 'A true artist who understands storytelling through motion. Every frame is crafted with purpose and beauty.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  ],
  processSteps: [
    { id: '1', title: 'Discovery', description: 'Understanding your vision, goals, and target audience to create a solid foundation.', icon: 'Lightbulb' },
    { id: '2', title: 'Concept', description: 'Developing creative concepts, storyboards, and style frames that align with your brand.', icon: 'Pencil' },
    { id: '3', title: 'Production', description: 'Bringing concepts to life through animation, sound design, and meticulous attention to detail.', icon: 'Rocket' },
    { id: '4', title: 'Delivery', description: 'Final touches, revisions, and delivering polished animations ready for the world.', icon: 'CheckCircle' },
  ],
  contact: {
    email: 'hello@example.com',
    github: 'https://github.com/rayynaldgitau',
    linkedin: '#',
  },
  footer: { text: '© 2026 All Rights Reserved' },
};

const STORAGE_KEY = 'portfolio_content';

interface ContentContextType {
  content: PortfolioContent;
  updateContent: (newContent: PortfolioContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_CONTENT, ...JSON.parse(saved) };
    } catch {}
    return DEFAULT_CONTENT;
  });

  const updateContent = (newContent: PortfolioContent) => {
    setContent(newContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}

export { DEFAULT_CONTENT };
