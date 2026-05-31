import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Game } from '../types';

interface GameSliderProps {
  games: Game[];
}

export default function GameSlider({ games }: GameSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [games.length]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={games[currentIndex].id}
          src={games[currentIndex].coverUrl}
          alt={games[currentIndex].title}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
        <h3 className="text-white font-bold">{games[currentIndex].title}</h3>
      </div>
    </div>
  );
}
