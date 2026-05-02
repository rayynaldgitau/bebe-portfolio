import { motion } from 'motion/react';
import { Lightbulb, Pencil, Rocket, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ProcessSection() {
  const steps: ProcessStep[] = [
    {
      id: '1',
      title: 'Discovery',
      description: 'Understanding your vision, goals, and target audience to create a solid foundation.',
      icon: Lightbulb
    },
    {
      id: '2',
      title: 'Concept',
      description: 'Developing creative concepts, storyboards, and style frames that align with your brand.',
      icon: Pencil
    },
    {
      id: '3',
      title: 'Production',
      description: 'Bringing concepts to life through animation, sound design, and meticulous attention to detail.',
      icon: Rocket
    },
    {
      id: '4',
      title: 'Delivery',
      description: 'Final touches, revisions, and delivering polished animations ready for the world.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="relative">
      <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 opacity-30" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 to-orange-600 flex items-center justify-center relative z-10"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 text-6xl font-bold text-white/5 -z-10">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
