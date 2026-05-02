import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
}

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
}

export function StatsSection() {
  const stats: Stat[] = [
    { label: 'Projects Completed', value: 250, suffix: '+', prefix: '' },
    { label: 'Years Experience', value: 8, suffix: '+', prefix: '' },
    { label: 'Happy Clients', value: 120, suffix: '+', prefix: '' },
    { label: 'Awards Won', value: 15, suffix: '', prefix: '' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-2">
            {stat.prefix}
            <CountUp end={stat.value} />
            {stat.suffix}
          </div>
          <div className="text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
