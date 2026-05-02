import { motion } from 'motion/react';
import { Palette, Video, Sparkles, Globe, Film, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Service } from '../context/ContentContext';

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, Sparkles, Globe, Film, Palette, Video,
};

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => {
        const Icon = ICON_MAP[service.icon] ?? Layers;
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
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
            <p className="text-gray-400 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map(feature => (
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
