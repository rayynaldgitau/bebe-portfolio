import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../context/ContentContext';

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          className="relative p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-orange-900/20 border border-purple-500/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
        >
          <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-500/30" />
          <div className="flex items-center gap-4 mb-4">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-500" />
            <div>
              <h4 className="font-semibold text-white">{testimonial.name}</h4>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
              <p className="text-xs text-purple-400">{testimonial.company}</p>
            </div>
          </div>
          <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
            ))}
          </div>
          <p className="text-gray-300 leading-relaxed">{testimonial.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
