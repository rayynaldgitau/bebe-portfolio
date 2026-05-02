import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Play, Settings } from 'lucide-react';
import { ArtisticBurst } from '../components/ArtisticBurst';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { VideoReel } from '../components/VideoReel';
import { SkillsSection } from '../components/SkillsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ServicesSection } from '../components/ServicesSection';
import { StatsSection } from '../components/StatsSection';
import { ProcessSection } from '../components/ProcessSection';
import { ContactForm } from '../components/ContactForm';
import { useContent } from '../context/ContentContext';

export default function Portfolio() {
  const { content } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(content.projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === 'All'
    ? content.projects
    : content.projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Admin Button */}
      <motion.a
        href="/admin"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full shadow-lg hover:shadow-purple-500/50 text-white text-sm font-medium transition-all duration-300"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Settings className="w-4 h-4" />
        Admin
      </motion.a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {content.nav.brandName}
          </motion.div>
          <div className="hidden md:flex gap-8">
            {['Work', 'Services', 'Process', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ArtisticBurst className="top-0 right-0 opacity-30" />
        <ArtisticBurst className="bottom-0 left-0 opacity-20 rotate-180" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-orange-900/20" />
        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-1">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <Play className="w-12 h-12 text-purple-400" fill="currentColor" />
              </div>
            </div>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <StatsSection stats={content.stats} />
        </div>
      </section>

      {/* Showreel */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Showreel
          </motion.h2>
          <VideoReel />
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative py-24 px-6 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Featured Work
          </motion.h2>
          <motion.div className="flex flex-wrap justify-center gap-3 mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {categories.map(category => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-2 rounded-full transition ${selectedCategory === category ? 'bg-gradient-to-r from-purple-600 to-orange-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white border border-purple-500/30'}`}>
                {category}
              </button>
            ))}
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-orange-900/20 border border-purple-500/20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }}>
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold text-orange-400 mb-2">{project.category}</span>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm">{project.description}</p>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs font-medium">{project.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            What I Do
          </motion.h2>
          <motion.p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            From concept to delivery, I offer comprehensive animation services tailored to your needs
          </motion.p>
          <ServicesSection services={content.services} />
        </div>
      </section>

      {/* Process */}
      <section id="process" className="relative py-24 px-6 bg-gradient-to-b from-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            My Process
          </motion.h2>
          <motion.p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            A proven workflow that ensures quality results every time
          </motion.p>
          <ProcessSection steps={content.processSteps} />
        </div>
      </section>

      {/* Skills */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Skills & Expertise
          </motion.h2>
          <SkillsSection skills={content.skills} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Client Testimonials
          </motion.h2>
          <motion.p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Don't just take my word for it — hear from those I've worked with
          </motion.p>
          <TestimonialsSection testimonials={content.testimonials} />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            About Me
          </motion.h2>
          <motion.p className="text-xl text-gray-300 leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {content.about.text}
          </motion.p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-24 px-6 bg-gradient-to-b from-purple-900/10 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Let's Create Together
          </motion.h2>
          <motion.p className="text-center text-gray-400 mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Have a project in mind? Let's bring your vision to life
          </motion.p>
          <ContactForm />
          <div className="flex justify-center gap-6 mt-12">
            {[
              { icon: Mail, label: 'Email', color: 'from-orange-500 to-red-500', href: `mailto:${content.contact.email}` },
              { icon: Github, label: 'GitHub', color: 'from-purple-500 to-pink-500', href: content.contact.github },
              { icon: Linkedin, label: 'LinkedIn', color: 'from-blue-500 to-cyan-500', href: content.contact.linkedin },
            ].map(social => (
              <motion.a key={social.label} href={social.href} className={`p-4 rounded-full bg-gradient-to-r ${social.color} hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300`} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }} title={social.label}>
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900/40 to-orange-900/40 border border-purple-500/30 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Stay Inspired</h3>
            <p className="text-gray-300 mb-6">Get animation tips, creative insights, and project updates</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
              <motion.button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-600 rounded-lg font-semibold text-white" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Subscribe</motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-purple-500/20 text-center text-gray-500">
        <p>{content.footer.text}</p>
        <a href="/admin" className="text-gray-700 hover:text-gray-500 text-xs mt-2 inline-block transition">Admin</a>
      </footer>
    </div>
  );
}
