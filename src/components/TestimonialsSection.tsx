import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Creative Director',
      company: 'Pixel Studios',
      text: 'Working with this animator transformed our vision into reality. The attention to detail and artistic flair exceeded all expectations.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Marketing Lead',
      company: 'Brand Dynamics',
      text: 'Incredible talent and professionalism. The animations brought our campaign to life and engagement skyrocketed.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      id: '3',
      name: 'Emily Watson',
      role: 'Film Producer',
      company: 'Indie Films Co',
      text: 'A true artist who understands storytelling through motion. Every frame is crafted with purpose and beauty.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    }
  ];

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
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
            />
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
