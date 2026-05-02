import { motion } from 'motion/react';

export function ArtisticBurst({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 0.15 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="burst1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#F7931E" />
            <stop offset="100%" stopColor="#FDC830" />
          </linearGradient>
          <linearGradient id="burst2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667EEA" />
            <stop offset="50%" stopColor="#764BA2" />
            <stop offset="100%" stopColor="#F093FB" />
          </linearGradient>
        </defs>
        {[...Array(12)].map((_, i) => (
          <motion.path
            key={i}
            d={`M 200 200 L ${200 + Math.cos((i * 30 * Math.PI) / 180) * 150} ${200 + Math.sin((i * 30 * Math.PI) / 180) * 150} L ${200 + Math.cos(((i * 30 + 15) * Math.PI) / 180) * 80} ${200 + Math.sin(((i * 30 + 15) * Math.PI) / 180) * 80} Z`}
            fill={i % 2 === 0 ? "url(#burst1)" : "url(#burst2)"}
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
