import { createContext, useContext, useState, ReactNode } from 'react';
import { cover, aboutPage, w1, w2, w3, w4, w5, w6, w7, w8, w9 } from '../lib/artworkImages';

export interface ProjectSection {
  images: string[];
  notes: string;
}

export interface ProjectSections {
  research: ProjectSection;
  thumbnails: ProjectSection;
  characterDesign: ProjectSection;
  characterPoses: ProjectSection;
  layoutDesign: ProjectSection;
  storyboards: ProjectSection;
  illustrations: ProjectSection;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  detail?: string;
  sections?: Partial<ProjectSections>;
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

export interface CommissionType {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  turnaround: string;
  includes: string[];
  available: boolean;
}

export interface RoughAnimation {
  id: string;
  videoUrl: string;
  title: string;
}

export interface Illustration {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface PortfolioContent {
  nav: { brandName: string };
  hero: { title: string; subtitle: string; coverImage: string };
  showreel: { title: string; description: string; videoUrl: string };
  about: { text: string; image: string; profileImage: string };
  stats: Stat[];
  projects: Project[];
  services: Service[];
  skills: Skill[];
  testimonials: Testimonial[];
  processSteps: ProcessStep[];
  commissions: CommissionType[];
  illustrations: Illustration[];
  roughAnimations: RoughAnimation[];
  contact: { email: string; github: string; linkedin: string; tiktok: string; tiktokHandle: string; instagram: string; instagramHandle: string };
  footer: { text: string };
}

const DEFAULT_CONTENT: PortfolioContent = {
  nav: { brandName: "Bahleyh's" },
  hero: {
    title: "Bahleyh's",
    subtitle: 'DIGITAL ART PORTFOLIO',
    coverImage: cover,
  },
  showreel: {
    title: 'Animation Showreel',
    description: 'A selection of animations and illustrations — paste your YouTube or Vimeo URL in the admin panel.',
    videoUrl: '',
  },
  about: {
    text: "Hi! My name is Aurora.\n\nSince I was little, I have been drawing, doing it both as a hobby and as a commission.\n\nMy works span digital illustration, short comics, character design, and animation — all fuelled by a love for storytelling and visual experimentation.",
    image: aboutPage,
    profileImage: '',
  },
  stats: [
    { id: '1', label: 'Works in Portfolio', value: 9, suffix: '', prefix: '' },
    { id: '2', label: 'Competition Awards', value: 1, suffix: '', prefix: '' },
    { id: '3', label: 'Years Drawing', value: 7, suffix: '+', prefix: '' },
    { id: '4', label: 'Commission Projects', value: 20, suffix: '+', prefix: '' },
  ],
  projects: [
    {
      id: '1',
      title: '"Xiao and Venti\'s Flute" Short Animation',
      description: 'A short animation featuring characters from Genshin Impact.',
      imageUrl: w1,
      category: 'Animation',
      detail: 'A short animation I made featuring Xiao and Venti from Genshin Impact. You can see this on my first TikTok video I posted.',
    },
    {
      id: '2',
      title: '"The Bystander" Short Comic',
      description: 'Award-winning short comic about bullying from the witness\'s perspective.',
      imageUrl: w2,
      category: 'Comic',
      detail: '"The Bystander" is a short comic I made in 2020 for IKRAM Teens Johor National Comic Challenge with the theme \'Kami Anti Buli\'. I noticed that most people focus on the bullied and the bully in these type of story but no one ever pay attention to the witnesses. The deer, tiger, and photographer represent the victim, bully, and witnesses respectively. The winner was announced in early January 2021 and I won first place.',
    },
    {
      id: '3',
      title: '"Trial by Fire" Short Comic',
      description: 'A short comic exploring themes of doubt and perseverance.',
      imageUrl: w3,
      category: 'Comic',
      detail: 'A short comic I also posted on my TikTok. All pages are included in the full portfolio.',
    },
    {
      id: '4',
      title: '"Ryujin"',
      description: 'Digital painting made for a competition with the theme "Japan".',
      imageUrl: w4,
      category: 'Digital Art',
      detail: '"Ryujin" is a drawing I made at the end of 2021 for a competition between our Generic teams. The theme was \'Japan\'. I chose the mythological God of Japan, the Dragon King. This piece is purposely made to imitate the characteristics found in traditional Japanese visual arts — with yellowish tone and texture of rice paper, and a panoramic view with no fixed perspective.',
    },
    {
      id: '5',
      title: '"Wandering Samurai"',
      description: 'Drawing of Kaedehara Kazuha from Genshin Impact.',
      imageUrl: w5,
      category: 'Digital Art',
      detail: 'Drawing of \'Kaedehara Kazuha\', a samurai character from Genshin Impact.',
    },
    {
      id: '6',
      title: '"Lone Yaksha, Conqueror of Demons"',
      description: 'Drawing of Xiao from Genshin Impact — a defender of Liyue.',
      imageUrl: w6,
      category: 'Digital Art',
      detail: 'Drawing of Xiao (of Genshin Impact), a defender of Liyue who suffers from karmic debt due to millennia of killings.',
    },
    {
      id: '7',
      title: '"That Mean, Overworked Senior..."',
      description: 'Character study experimenting with perspective and coloring over lineart.',
      imageUrl: w7,
      category: 'Digital Art',
      detail: 'Experimenting with perspective and colors, and trying out coloring on top of the lineart layer.',
    },
    {
      id: '8',
      title: 'Character Design',
      description: 'Original character design based on Dusun cultural elements.',
      imageUrl: w8,
      category: 'Character Design',
      detail: 'Trying out designing a character based on Dusun cultures. Features a strung hat (stylized) as head gear, dalai seeds as beads, botungkat as belt, and bold expressions.',
    },
    {
      id: '9',
      title: 'Poses Study',
      description: 'Pose studies featuring three athletes: baseball, figure skating, and Muay Thai.',
      imageUrl: w9,
      category: 'Illustration',
      detail: 'A poses study featuring three different athletic poses — a baseball player, a figure skater, and a Muay Thai fighter — exploring dynamic movement and form.',
    },
  ],
  services: [
    { id: '1', title: 'Digital Illustration', description: 'Character art, fan art, and original illustrations', icon: 'Palette', features: ['Character Design', 'Fan Art', 'Original Art', 'Full Colour'] },
    { id: '2', title: 'Short Comics', description: 'Sequential art and short comic narratives', icon: 'Layers', features: ['Storyboarding', 'Panelling', 'Lettering', 'Black & White / Colour'] },
    { id: '3', title: 'Short Animation', description: 'Simple animations and animated shorts', icon: 'Film', features: ['Frame-by-frame', '2D Animation', 'Character Animation', 'Short Clips'] },
    { id: '4', title: 'Commission Art', description: 'Custom artwork created to your specifications', icon: 'Sparkles', features: ['Portrait', 'Full Body', 'Scene', 'OC Drawing'] },
  ],
  skills: [
    { id: '1', name: 'Clip Studio Paint', level: 92, category: 'Software' },
    { id: '2', name: 'Procreate', level: 85, category: 'Software' },
    { id: '3', name: 'Adobe Photoshop', level: 78, category: 'Software' },
    { id: '4', name: 'Digital Illustration', level: 90, category: 'Technique' },
    { id: '5', name: 'Character Design', level: 85, category: 'Technique' },
    { id: '6', name: 'Comic Storytelling', level: 88, category: 'Technique' },
    { id: '7', name: 'Frame-by-frame Animation', level: 75, category: 'Technique' },
    { id: '8', name: 'Traditional Drawing', level: 82, category: 'Technique' },
  ],
  testimonials: [],
  processSteps: [
    { id: '1', title: 'Concept', description: 'Sketching ideas and exploring composition, mood, and reference gathering.', icon: 'Lightbulb' },
    { id: '2', title: 'Sketch', description: 'Rough line work and layout — building the foundation of the piece.', icon: 'Pencil' },
    { id: '3', title: 'Lineart', description: 'Clean, refined line work that defines the final shapes and details.', icon: 'Star' },
    { id: '4', title: 'Colour & Finish', description: 'Applying colour, shading, lighting, and final polish to bring it to life.', icon: 'CheckCircle' },
  ],
  commissions: [
    {
      id: '1',
      title: 'Sketch',
      description: 'A clean rough sketch in black and white. Great for quick character concepts.',
      price: '20',
      currency: 'RM',
      turnaround: '3–5 days',
      includes: ['1 character', 'Simple background or none', '1 revision round'],
      available: true,
    },
    {
      id: '2',
      title: 'Line Art',
      description: 'Crisp, clean linework with no colouring. Ideal for those who want to colour themselves.',
      price: '35',
      currency: 'RM',
      turnaround: '5–7 days',
      includes: ['1 character', 'Clean lineart', 'Transparent or white background', '2 revision rounds'],
      available: true,
    },
    {
      id: '3',
      title: 'Full Colour — Flat',
      description: 'Flat colours with minimal shading. Clean, vibrant and striking.',
      price: '55',
      currency: 'RM',
      turnaround: '7–10 days',
      includes: ['1 character', 'Flat colour + basic shading', 'Simple background', '2 revision rounds'],
      available: true,
    },
    {
      id: '4',
      title: 'Full Colour — Shaded',
      description: 'Full rendering with detailed shading, lighting, and a finished background.',
      price: '80',
      currency: 'RM',
      turnaround: '10–14 days',
      includes: ['1 character', 'Full rendering & shading', 'Detailed background', '3 revision rounds'],
      available: true,
    },
    {
      id: '5',
      title: 'Comic Page',
      description: 'A single illustrated comic page with panelling, dialogue, and ink-style art.',
      price: '90',
      currency: 'RM',
      turnaround: '7–14 days per page',
      includes: ['Up to 6 panels', 'Characters + backgrounds', 'Lettering included', '2 revision rounds'],
      available: false,
    },
  ],
  contact: {
    email: 'aurora@example.com',
    github: 'https://github.com/rayynaldgitau',
    linkedin: '#',
    tiktok: 'https://tiktok.com/@meispupo',
    tiktokHandle: '@meispupo',
    instagram: '#',
    instagramHandle: '@meispupo',
  },
  illustrations: [],
  roughAnimations: [],
  footer: { text: '© 2026 Bahleyh. All Rights Reserved.' },
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
      if (saved) {
        const p = JSON.parse(saved);
        const about = { ...DEFAULT_CONTENT.about, ...(p.about ?? {}) };
        // Migration: strip old university references from bio
        if (
          about.text.includes('pre-university') ||
          about.text.includes('UNIMAS') ||
          about.text.includes('Foundation Programme') ||
          about.text.includes('United States International University Africa')
        ) {
          about.text = DEFAULT_CONTENT.about.text;
        }
        return {
          ...DEFAULT_CONTENT,
          ...p,
          nav:      { ...DEFAULT_CONTENT.nav,      ...(p.nav      ?? {}) },
          hero:     { ...DEFAULT_CONTENT.hero,     ...(p.hero     ?? {}) },
          showreel: { ...DEFAULT_CONTENT.showreel, ...(p.showreel ?? {}) },
          about,
          contact:  { ...DEFAULT_CONTENT.contact,  ...(p.contact  ?? {}) },
          footer:   { ...DEFAULT_CONTENT.footer,   ...(p.footer   ?? {}) },
        };
      }
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
