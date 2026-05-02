import { motion } from 'motion/react';
import { Palette, Video, Sparkles, Globe, Film, Layers } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
}

export function ServicesSection() {
  const services: Service[] = [
    {
      id: '1',
      title: 'Motion Graphics',
      description: 'Eye-catching graphics that move with purpose',
      icon: Layers,
      features: ['Explainer Videos', 'Logo Animation', 'Title Sequences', 'Kinetic Typography']
    },
    {
      id: '2',
      title: 'Character Animation',
      description: 'Bringing characters to life with personality',
      icon: Sparkles,
      features: ['2D Character Rigging', '3D Characters', 'Lip Sync', 'Walk Cycles']
    },
    {
      id: '3',
      title: '3D Animation',
      description: 'Dimensional storytelling in virtual space',
      icon: Globe,
      features: ['Product Visualization', 'Environment Design', 'Abstract 3D', 'Modeling & Texturing']
    },
    {
      id: '4',
      title: 'Visual Effects',
      description: 'Seamless integration of the impossible',
      icon: Film,
      features: ['Compositing', 'Particle Effects', 'Color Grading', 'Green Screen']
    },
    {
      id: '5',
      title: 'Brand Identity',
      description: 'Cohesive visual systems in motion',
      icon: Palette,
      features: ['Style Guides', 'Brand Animation', 'Social Media Content', 'Templates']
    },
    {
      id: '6',
      title: 'Video Editing',
      description: 'Crafting compelling narratives from footage',
      icon: Video,
      features: ['Short Form', 'Long Form', 'Sound Design', 'Post Production']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.id}
            className="group p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-orange-900/20 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <motion.div
              className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-orange-600 flex items-center justify-center mb-4"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-7 h-7" />
            </motion.div>

            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-400 mb-4">{service.description}</p>

            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
