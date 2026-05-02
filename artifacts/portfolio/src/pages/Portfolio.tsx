import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Mail, Github, Settings, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';

function CommissionForm({ email, tiers }: { email: string; tiers: string[] }) {
  const [form, setForm] = useState({ name: '', replyEmail: '', tier: tiers[0] ?? '', idea: '' });
  const [sent, setSent] = useState(false);

  const MAROON = '#6B1D2A';
  const BROWN = '#3D2B1F';
  const BROWN_LIGHT = '#6B5040';
  const SAND_LIGHT = '#E8DDD0';
  const CREAM = '#F5F0E8';
  const SERIF = "'Playfair Display', Georgia, serif";
  const SANS = "'Lato', 'Inter', sans-serif";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Commission Request — ${form.tier}`);
    const body = encodeURIComponent(
      `Hi Bahleyh!\n\nName: ${form.name}\nReply to: ${form.replyEmail}\nTier: ${form.tier}\n\nIdea / Description:\n${form.idea}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', backgroundColor: '#fff',
    border: `1px solid ${SAND_LIGHT}`, borderRadius: '8px',
    color: BROWN, fontFamily: SANS, fontSize: '0.9rem', outline: 'none',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl p-8 md:p-10"
      style={{ backgroundColor: SAND_LIGHT, border: `1px solid #d9cfc4` }}
    >
      <h3 className="text-2xl mb-1" style={{ fontFamily: SERIF, color: BROWN, fontStyle: 'italic' }}>
        Send a Request
      </h3>
      <p className="text-sm mb-6" style={{ color: BROWN_LIGHT }}>
        Fill in the form and it will open your email client with everything pre-filled.
      </p>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: MAROON, fontFamily: SANS, letterSpacing: '0.15em' }}>Your Name</label>
          <input required style={inputStyle} placeholder="e.g. Sam" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: MAROON, fontFamily: SANS, letterSpacing: '0.15em' }}>Your Email</label>
          <input required type="email" style={inputStyle} placeholder="you@email.com" value={form.replyEmail} onChange={e => setForm(p => ({ ...p, replyEmail: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: MAROON, fontFamily: SANS, letterSpacing: '0.15em' }}>Commission Tier</label>
          <select required style={{ ...inputStyle, cursor: 'pointer' }} value={form.tier} onChange={e => setForm(p => ({ ...p, tier: e.target.value }))}>
            {tiers.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: MAROON, fontFamily: SANS, letterSpacing: '0.15em' }}>Your Idea / Description</label>
          <textarea required rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tell me about your character, references, mood, any preferences..." value={form.idea} onChange={e => setForm(p => ({ ...p, idea: e.target.value }))} />
        </div>
        <div className="md:col-span-2 flex items-center gap-4">
          <motion.button
            type="submit"
            className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium"
            style={{ backgroundColor: MAROON, color: CREAM, fontFamily: SANS }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Send className="w-4 h-4" />
            Send Request
          </motion.button>
          {sent && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm"
              style={{ color: MAROON, fontFamily: SANS }}
            >
              ✓ Email client opened!
            </motion.span>
          )}
        </div>
      </form>
    </motion.div>
  );
}

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
    { href: '#showreel', label: 'Showreel' },
    { href: '#works', label: 'Works' },
    { href: '#commissions', label: 'Commissions' },
    { href: '#about', label: 'About' },
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

      {/* ── SHOWREEL ── */}
      {(() => {
        const sr = (content as any).showreel ?? {};

        const getEmbedUrl = (url: string): string | null => {
          const ytMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
          if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
          const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
          if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
          return null;
        };

        const embedUrl = sr.videoUrl ? getEmbedUrl(sr.videoUrl) : null;

        return (
          <section id="showreel" style={{ backgroundColor: MAROON, color: CREAM, position: 'relative', overflow: 'hidden' }}>
            {/* subtle texture overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

            <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
              {/* header */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span
                  className="text-xs tracking-widest uppercase block mb-3"
                  style={{ fontFamily: SANS, letterSpacing: '0.3em', color: 'rgba(245,240,232,0.5)' }}
                >
                  Animation & Motion
                </span>
                <h2
                  className="text-5xl md:text-6xl mb-4"
                  style={{ fontFamily: SERIF, fontStyle: 'italic', lineHeight: 1.1 }}
                >
                  {sr.title || 'Animation Showreel'}
                </h2>
                <div style={{ width: 48, height: 2, backgroundColor: 'rgba(245,240,232,0.3)', margin: '16px auto' }} />
                <p
                  className="text-sm md:text-base max-w-lg mx-auto"
                  style={{ fontFamily: SANS, color: 'rgba(245,240,232,0.65)', lineHeight: 1.7 }}
                >
                  {sr.description || 'A curated selection of animations and illustrated works.'}
                </p>
              </motion.div>

              {/* video player */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="w-full rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(245,240,232,0.1)',
                  aspectRatio: '16/9',
                  position: 'relative',
                  backgroundColor: 'rgba(0,0,0,0.35)',
                }}
              >
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={sr.title || 'Showreel'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                ) : sr.videoUrl ? (
                  /* non-embeddable link */
                  <a
                    href={sr.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 hover:bg-white/5 transition-colors"
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(245,240,232,0.12)', border: '2px solid rgba(245,240,232,0.25)' }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 4 }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-sm underline opacity-60" style={{ fontFamily: SANS }}>
                      Watch on external site
                    </span>
                  </a>
                ) : (
                  /* placeholder — no URL yet */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(245,240,232,0.08)', border: '2px solid rgba(245,240,232,0.18)' }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.5 }}>
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-base mb-1" style={{ fontFamily: SERIF, fontStyle: 'italic', opacity: 0.7 }}>
                        Showreel coming soon
                      </p>
                      <p className="text-xs opacity-35" style={{ fontFamily: SANS }}>
                        Add your YouTube or Vimeo URL in the admin panel
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* optional external link label */}
              {sr.videoUrl && !embedUrl && (
                <p className="text-center text-xs mt-4 opacity-40" style={{ fontFamily: SANS }}>
                  {sr.videoUrl}
                </p>
              )}
            </div>
          </section>
        );
      })()}

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
            {/* Profile picture */}
            {(content.about as any).profileImage && (
              <div className="mb-8 flex items-center gap-5">
                <div
                  className="shrink-0"
                  style={{
                    width: 88, height: 88, borderRadius: '50%',
                    border: `3px solid ${MAROON}`,
                    boxShadow: `0 0 0 5px rgba(107,29,42,0.12)`,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={(content.about as any).profileImage}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-lg" style={{ fontFamily: SERIF, color: BROWN, fontStyle: 'italic' }}>
                    Bahleyh
                  </p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: MAROON, fontFamily: SANS, letterSpacing: '0.18em' }}>
                    Digital Artist
                  </p>
                </div>
              </div>
            )}

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

      {/* ── COMMISSIONS ── */}
      <section id="commissions" className="py-20 px-6 md:px-16" style={{ backgroundColor: CREAM }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <h2 className="text-4xl md:text-5xl mb-2" style={{ fontFamily: SERIF, color: BROWN, fontStyle: 'italic' }}>
              Commissions
            </h2>
            <div className="w-12 h-px mt-4 mb-6" style={{ backgroundColor: MAROON }} />
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: BROWN_LIGHT }}>
              Interested in a custom piece? Choose a tier below and send a request — I'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Tier cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-16">
            {content.commissions.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative flex flex-col rounded-xl overflow-hidden border"
                style={{
                  borderColor: tier.available ? SAND_DARK : '#ddd',
                  backgroundColor: tier.available ? '#fff' : '#f9f6f2',
                  opacity: tier.available ? 1 : 0.65,
                }}
              >
                {!tier.available && (
                  <div
                    className="absolute top-3 right-3 text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: SAND, color: BROWN_LIGHT, letterSpacing: '0.12em', fontFamily: SANS }}
                  >
                    Closed
                  </div>
                )}
                <div className="px-6 pt-6 pb-4 flex-1">
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: MAROON, fontFamily: SANS, letterSpacing: '0.18em' }}
                  >
                    {tier.currency} {tier.price}
                  </p>
                  <h3 className="text-xl mb-2" style={{ fontFamily: SERIF, color: BROWN }}>{tier.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: BROWN_LIGHT }}>{tier.description}</p>
                  <ul className="space-y-1.5 mb-4">
                    {tier.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: BROWN_LIGHT }}>
                        <span style={{ color: MAROON, marginTop: '2px', flexShrink: 0 }}>✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-6 pb-5">
                  <div
                    className="text-xs tracking-widest uppercase mb-4"
                    style={{ color: SAND_DARK, fontFamily: SANS, letterSpacing: '0.15em' }}
                  >
                    Est. {tier.turnaround}
                  </div>
                  <a
                    href={tier.available
                      ? `mailto:${content.contact.email}?subject=Commission Request — ${tier.title}&body=Hi Bahleyh!%0A%0AI'm interested in a ${tier.title} commission.%0A%0AHere's what I have in mind:%0A%0A[Please describe your idea, references, and any preferences]`
                      : undefined}
                    className="block text-center py-2.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: tier.available ? MAROON : SAND,
                      color: tier.available ? CREAM : BROWN_LIGHT,
                      cursor: tier.available ? 'pointer' : 'default',
                      fontFamily: SANS,
                    }}
                  >
                    {tier.available ? 'Request This Tier' : 'Currently Closed'}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Request form */}
          <CommissionForm email={content.contact.email} tiers={content.commissions.filter(t => t.available).map(t => t.title)} />
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
