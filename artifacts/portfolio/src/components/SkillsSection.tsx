import { motion } from 'motion/react';
import type { Skill } from '../context/ContentContext';

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <div className="space-y-12">
      {categories.map(category => (
        <div key={category}>
          <h3 className="text-2xl font-bold mb-6 text-purple-400">{category}</h3>
          <div className="space-y-4">
            {skills.filter(s => s.category === category).map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-orange-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
