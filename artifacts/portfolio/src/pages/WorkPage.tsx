import { useParams, useLocation } from 'wouter';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../context/ContentContext';

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Lato', 'Inter', sans-serif";
const SAND = '#C9B49A';
const SAND_LIGHT = '#E8DDD0';
const MAROON = '#6B1D2A';
const CREAM = '#F5F0E8';
const BROWN = '#3D2B1F';
const BROWN_LIGHT = '#6B5040';

const SECTIONS = [
  { key: 'research',        label: 'Research & Visual Development' },
  { key: 'thumbnails',      label: 'Thumbnails' },
  { key: 'characterDesign', label: 'Character Design & Turnaround Sheets' },
  { key: 'characterPoses',  label: 'Character Poses' },
  { key: 'layoutDesign',    label: 'Layout Design' },
  { key: 'storyboards',     label: 'Storyboards' },
];

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <img src={src} alt="" className="max-w-full max-h-full rounded-xl object-contain shadow-2xl" />
      <button
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
        onClick={onClose}
      >
        ✕
      </button>
    </motion.div>
  );
}

export default function WorkPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { content } = useContent();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const work = content.projects.find(p => p.id === id);

  if (!work) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: CREAM }}>
        <p style={{ fontFamily: SERIF, color: BROWN, fontSize: '1.5rem' }}>Project not found.</p>
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
          style={{ backgroundColor: MAROON, color: CREAM, fontFamily: SANS }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to portfolio
        </button>
      </div>
    );
  }

  const filledSections = SECTIONS.filter(s => {
    const data = (work.sections as any)?.[s.key];
    return data?.images?.length > 0 || data?.notes;
  });

  return (
    <div style={{ backgroundColor: CREAM, minHeight: '100vh', color: BROWN }}>
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}

      {/* ── sticky nav ── */}
      <nav
        className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-12 h-14 border-b"
        style={{ backgroundColor: CREAM, borderColor: SAND + '80' }}
      >
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ fontFamily: SANS, color: BROWN }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </button>
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: SANS, color: MAROON, letterSpacing: '0.25em' }}>
          {work.category}
        </span>
      </nav>

      {/* ── hero ── */}
      <div className="relative" style={{ maxHeight: 500, overflow: 'hidden' }}>
        <img
          src={work.imageUrl}
          alt={work.title}
          className="w-full object-cover"
          style={{ height: 440, objectFit: 'cover', objectPosition: 'top' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(61,43,31,0.85) 0%, rgba(61,43,31,0.2) 50%, transparent 100%)' }}
        />
        <div className="absolute bottom-0 left-0 px-6 md:px-16 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span
              className="text-xs font-bold tracking-widest uppercase mb-3 block"
              style={{ color: SAND, fontFamily: SANS, letterSpacing: '0.3em' }}
            >
              {work.category}
            </span>
            <h1
              className="text-4xl md:text-6xl leading-tight mb-4"
              style={{ fontFamily: SERIF, color: CREAM, fontStyle: 'italic' }}
            >
              {work.title}
            </h1>
            {(work.detail || work.description) && (
              <p
                className="max-w-2xl text-sm md:text-base leading-relaxed"
                style={{ color: 'rgba(245,240,232,0.8)', fontFamily: SANS }}
              >
                {work.detail || work.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── section jump nav ── */}
      {filledSections.length > 0 && (
        <div
          className="sticky top-14 z-20 flex overflow-x-auto border-b"
          style={{ backgroundColor: CREAM, borderColor: SAND + '80', scrollbarWidth: 'none' }}
        >
          {filledSections.map(s => (
            <a
              key={s.key}
              href={`#section-${s.key}`}
              className="shrink-0 px-6 py-3.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap hover:text-maroon"
              style={{ fontFamily: SANS, color: BROWN_LIGHT, letterSpacing: '0.05em' }}
              onClick={e => {
                e.preventDefault();
                document.getElementById(`section-${s.key}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      )}

      {/* ── sections ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-24">
        {SECTIONS.map((s, si) => {
          const data: { images: string[]; notes: string } = (work.sections as any)?.[s.key] ?? { images: [], notes: '' };
          const hasContent = data.images.length > 0 || !!data.notes;
          if (!hasContent) return null;

          return (
            <motion.section
              key={s.key}
              id={`section-${s.key}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              {/* section header */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: MAROON, fontFamily: SANS, letterSpacing: '0.25em', minWidth: 24 }}
                >
                  0{si + 1}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: SAND }} />
                <h2
                  className="text-2xl md:text-3xl"
                  style={{ fontFamily: SERIF, color: BROWN, fontStyle: 'italic' }}
                >
                  {s.label}
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: SAND }} />
              </div>

              {/* notes */}
              {data.notes && (
                <p
                  className="mb-8 max-w-3xl mx-auto text-center text-sm md:text-base leading-relaxed"
                  style={{ fontFamily: SANS, color: BROWN_LIGHT }}
                >
                  {data.notes}
                </p>
              )}

              {/* image grid */}
              {data.images.length > 0 && (
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: data.images.length === 1
                      ? '1fr'
                      : data.images.length === 2
                        ? 'repeat(2, 1fr)'
                        : 'repeat(auto-fill, minmax(280px, 1fr))',
                  }}
                >
                  {data.images.map((img, i) => (
                    <motion.div
                      key={i}
                      className="overflow-hidden rounded-xl cursor-zoom-in"
                      style={{
                        backgroundColor: SAND_LIGHT,
                        aspectRatio: data.images.length === 1 ? '16/9' : '4/3',
                      }}
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setLightbox(img)}
                    >
                      <img
                        src={img}
                        alt={`${s.label} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>
          );
        })}

        {/* fallback if no sections filled */}
        {filledSections.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 opacity-40">
            <div style={{ fontSize: 48 }}>🎨</div>
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', color: BROWN }}>
              Sections coming soon
            </p>
            <p className="text-sm text-center" style={{ fontFamily: SANS, color: BROWN_LIGHT }}>
              Upload images for each section in the admin panel.
            </p>
          </div>
        )}
      </div>

      {/* ── footer strip ── */}
      <div
        className="border-t flex items-center justify-between px-6 md:px-12 py-6"
        style={{ borderColor: SAND + '80' }}
      >
        <button
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
          style={{ fontFamily: SANS, color: BROWN }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to all works
        </button>
        <span style={{ fontFamily: SERIF, color: MAROON, fontStyle: 'italic', fontSize: '1rem' }}>
          {work.title}
        </span>
      </div>
    </div>
  );
}
