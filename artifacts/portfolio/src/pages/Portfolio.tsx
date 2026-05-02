import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Mail, Github, Settings } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Lato', 'Inter', sans-serif";

const SAND = '#C9B49A';
const SAND_LIGHT = '#E8DDD0';
const SAND_DARK = '#B8A485';
const MAROON = '#6B1D2A';
const MAROON_LIGHT = '#8B2F3F';
const OLIVE = '#7A8C4A';
const CREAM = '#F5F0E8';
const BROWN = '#3D2B1F';
const BROWN_LIGHT = '#6B5040';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  detail?: string;
};

function WorkModal({ work, onClose }: { work: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ backgroundColor: CREAM, color: BROWN }}
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: SAND, color: BROWN }}
        >
          <X className="w-4 h-4" />
        </button>
        <img
          src={work.imageUrl}
          alt={work.title}
          className="w-full object-cover rounded-t-2xl"
          style={{ maxHeight: '420px', objectFit: 'cover', objectPosition: 'top' }}
        />
        <div className="p-8">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-3 inline-block"
            style={{ color: MAROON, fontFamily: SANS }}
          >
            {work.category}
          </span>
          <h2 className="text-2xl mb-4 leading-tight" style={{ fontFamily: SERIF, color: BROWN }}>
            {work.title}
          </h2>
          <p className="leading-relaxed whitespace-pre-line" style={{ fontFamily: SANS, color: BROWN_LIGHT, fontSize: '0.95rem' }}>
            {work.detail || work.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WorkCard({ work, index }: { work: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative overflow-hidden cursor-pointer"
        style={{ borderRadius: '4px' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07, duration: 0.5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        <div className="aspect-[3/4] overflow-hidden">
          <motion.img
            src={work.imageUrl}
            alt={work.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-4"
              style={{ background: 'linear-gradient(to top, rgba(107,29,42,0.92) 0%, rgba(107,29,42,0.4) 60%, transparent 100%)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: SAND, fontFamily: SANS }}>
                {work.category}
              </span>
              <p className="text-sm font-medium leading-snug" style={{ color: CREAM, fontFamily: SERIF }}>
                {work.title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {modalOpen && <WorkModal work={work} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function Portfolio() {
  const { content } = useContent();
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ['All', ...Array.from(new Set(content.projects.map(p => p.category)))];
  const filtered = activeCategory === 'All'
    ? content.projects
    : content.projects.filter(p => p.category === activeCategory);

  const navLinks = [
    { href: '#works', label: 'Works' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <div style={{ fontFamily: SANS, color: BROWN, backgroundColor: CREAM, overflowX: 'hidden' }}>

      {/* Admin button */}
      <motion.a
        href="/admin"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-sm font-medium"
        style={{ backgroundColor: MAROON, color: CREAM, fontFamily: SANS }}
        whileHover={{ scale: 1.06, backgroundColor: MAROON_LIGHT }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Settings className="w-4 h-4" />
        Admin
      </motion.a>

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-5"
        style={{ backgroundColor: 'rgba(229,221,208,0.92)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${SAND_DARK}` }}
      >
        <a href="#" className="text-xl" style={{ fontFamily: SERIF, color: BROWN, fontStyle: 'italic' }}>
          {content.nav.brandName}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wider uppercase hover:opacity-60 transition-opacity"
              style={{ color: BROWN, fontFamily: SANS, letterSpacing: '0.12em' }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: BROWN }}>
          <div className="space-y-1.5">
            <span className="block w-6 h-px" style={{ backgroundColor: BROWN }} />
            <span className="block w-6 h-px" style={{ backgroundColor: BROWN }} />
            <span className="block w-4 h-px" style={{ backgroundColor: BROWN }} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: SAND_LIGHT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="absolute top-5 right-8 text-2xl" onClick={() => setMenuOpen(false)} style={{ color: BROWN }}>
              <X className="w-6 h-6" />
            </button>
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-3xl tracking-wider"
                style={{ fontFamily: SERIF, color: BROWN, fontStyle: 'italic' }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 relative overflow-hidden"
        style={{ backgroundColor: SAND }}
      >
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="rounded-lg overflow-hidden shadow-2xl"
            style={{ maxWidth: '520px', width: '100%' }}
          >
            <img
              src={content.hero.coverImage}
              alt="Aurora's portfolio cover"
              className="w-full object-cover"
              style={{ maxHeight: '340px', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            className="text-7xl md:text-8xl leading-none mb-3"
            style={{ fontFamily: SERIF, color: CREAM, fontStyle: 'italic', textShadow: '0 2px 20px rgba(61,43,31,0.2)' }}
          >
            {content.hero.title}
          </h1>
          <p
            className="text-xs tracking-widest mb-8"
            style={{ color: CREAM, fontFamily: SANS, letterSpacing: '0.35em', opacity: 0.85 }}
          >
            {content.hero.subtitle}
          </p>
          <a
            href={content.contact.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: BROWN, fontFamily: SANS }}
          >
            ✦ @meispupo
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-10 opacity-40" style={{ backgroundColor: BROWN }} />
          <span className="text-xs tracking-widest opacity-40" style={{ fontFamily: SANS, letterSpacing: '0.2em' }}>SCROLL</span>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="flex flex-col md:flex-row min-h-[60vh]">
        {/* Left — text */}
        <div
          className="flex-1 flex flex-col justify-center px-10 md:px-16 py-16"
          style={{ backgroundColor: SAND_LIGHT }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl mb-8" style={{ fontFamily: SERIF, color: BROWN, fontStyle: 'italic' }}>
              About Me
            </h2>
            {content.about.text.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed" style={{ color: BROWN_LIGHT, fontSize: '1rem' }}>
                {para}
              </p>
            ))}
            <div className="mt-8 flex items-center gap-2">
              <div className="w-8 h-px" style={{ backgroundColor: MAROON }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: MAROON, fontFamily: SANS, letterSpacing: '0.2em' }}>
                Pre-University · UNIMAS Foundation
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right — image panel */}
        <div
          className="flex-1 relative flex flex-col items-center justify-center px-10 py-16 gap-6"
          style={{ backgroundColor: OLIVE }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="rounded-xl overflow-hidden shadow-xl"
              style={{ maxWidth: '340px', border: `3px solid rgba(245,240,232,0.25)` }}
            >
              <img
                src={content.about.image}
                alt="About Aurora"
                className="w-full object-cover"
              />
            </div>
          </motion.div>
          <motion.a
            href={content.contact.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm border transition-all"
            style={{ color: CREAM, borderColor: 'rgba(245,240,232,0.5)', fontFamily: SANS, letterSpacing: '0.05em' }}
            whileHover={{ backgroundColor: 'rgba(245,240,232,0.15)' }}
          >
            <ExternalLink className="w-4 h-4" />
            Introduction Video
          </motion.a>
        </div>
      </section>

      {/* ── MY WORKS ── */}
      <section id="works" className="py-20 px-6 md:px-12" style={{ backgroundColor: MAROON }}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl mb-2" style={{ fontFamily: SERIF, color: CREAM, fontStyle: 'italic' }}>
            My Works
          </h2>
          <div className="flex justify-center mt-2">
            <a
              href={content.contact.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest opacity-50 hover:opacity-80 transition-opacity"
              style={{ color: CREAM, fontFamily: SANS, letterSpacing: '0.2em' }}
            >
              ✦ @meispupo
            </a>
          </div>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all border"
              style={{
                fontFamily: SANS,
                letterSpacing: '0.15em',
                backgroundColor: activeCategory === cat ? CREAM : 'transparent',
                color: activeCategory === cat ? MAROON : CREAM,
                borderColor: activeCategory === cat ? CREAM : 'rgba(245,240,232,0.35)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
          {filtered.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </section>

      {/* ── SKILLS / TOOLS ── */}
      <section id="skills" className="py-20 px-6 md:px-16" style={{ backgroundColor: SAND_LIGHT }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-2" style={{ fontFamily: SERIF, color: BROWN, fontStyle: 'italic' }}>
              Skills & Tools
            </h2>
            <div className="w-12 h-px mt-4" style={{ backgroundColor: MAROON }} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {['Software', 'Technique'].map(cat => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: cat === 'Technique' ? 0.15 : 0 }}
              >
                <h3
                  className="text-xs font-bold tracking-widest uppercase mb-6"
                  style={{ color: MAROON, fontFamily: SANS, letterSpacing: '0.2em' }}
                >
                  {cat}
                </h3>
                <div className="space-y-5">
                  {content.skills.filter(s => s.category === cat).map((skill, i) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm" style={{ color: BROWN, fontFamily: SANS }}>{skill.name}</span>
                        <span className="text-xs" style={{ color: BROWN_LIGHT }}>{skill.level}%</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: SAND }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: MAROON }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.08 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      {content.processSteps.length > 0 && (
        <section className="py-20 px-6 md:px-16" style={{ backgroundColor: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl mb-2" style={{ fontFamily: SERIF, color: BROWN, fontStyle: 'italic' }}>
                My Process
              </h2>
              <div className="w-12 h-px mt-4" style={{ backgroundColor: MAROON }} />
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.processSteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="text-center"
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: SAND, color: MAROON, fontFamily: SANS }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg mb-2" style={{ fontFamily: SERIF, color: BROWN }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: BROWN_LIGHT }}>
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STATS ── */}
      <section className="py-16 px-6" style={{ backgroundColor: MAROON }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl mb-1" style={{ fontFamily: SERIF, color: CREAM, fontStyle: 'italic' }}>
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: SAND, fontFamily: SANS, letterSpacing: '0.15em', opacity: 0.8 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6 text-center" style={{ backgroundColor: SAND }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: SERIF, color: CREAM, fontStyle: 'italic' }}>
            Get in Touch
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: BROWN, opacity: 0.8 }}>
            For commissions, collaborations, or just to say hello — feel free to reach out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${content.contact.email}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all"
              style={{ backgroundColor: MAROON, color: CREAM, fontFamily: SANS }}
            >
              <Mail className="w-4 h-4" />
              Email Me
            </a>
            <a
              href={content.contact.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm border transition-all"
              style={{ color: BROWN, borderColor: BROWN, fontFamily: SANS }}
            >
              TikTok @meispupo
            </a>
            {content.contact.github && content.contact.github !== '#' && (
              <a
                href={content.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm border transition-all"
                style={{ color: BROWN, borderColor: BROWN, fontFamily: SANS }}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ backgroundColor: BROWN, color: SAND }}
      >
        <span className="text-lg" style={{ fontFamily: SERIF, fontStyle: 'italic' }}>
          {content.nav.brandName}
        </span>
        <span className="text-xs tracking-widest opacity-60" style={{ fontFamily: SANS, letterSpacing: '0.15em' }}>
          {content.footer.text}
        </span>
        <a
          href={content.contact.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest opacity-60 hover:opacity-100 transition-opacity"
          style={{ fontFamily: SANS, color: SAND, letterSpacing: '0.15em' }}
        >
          ✦ @meispupo
        </a>
      </footer>

    </div>
  );
}
