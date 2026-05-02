import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

export function VideoReel() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos: Video[] = [
    {
      id: '1',
      title: 'Motion Reel 2026',
      thumbnail: 'https://images.unsplash.com/photo-1674305281997-b6538532f388?w=600',
      duration: '2:30'
    },
    {
      id: '2',
      title: 'Character Animation',
      thumbnail: 'https://images.unsplash.com/photo-1664639985407-c0a62e7c1a54?w=600',
      duration: '1:45'
    },
    {
      id: '3',
      title: 'Abstract Experiments',
      thumbnail: 'https://images.unsplash.com/photo-1697868372007-7130b2fec25e?w=600',
      duration: '3:15'
    },
    {
      id: '4',
      title: 'Commercial Work',
      thumbnail: 'https://images.unsplash.com/photo-1759852174174-7beac185d35f?w=600',
      duration: '2:00'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          className="relative group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-orange-900/40 border border-purple-500/30"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedVideo(video.id)}
        >
          <div className="aspect-video relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <motion.div
                className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
              >
                <Play className="w-8 h-8 ml-1" fill="white" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 rounded-full text-sm text-white">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg text-white">{video.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
