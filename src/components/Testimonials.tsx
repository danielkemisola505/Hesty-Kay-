import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { Star, Sparkles, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = TESTIMONIALS_DATA.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Continuous automatic slide from right to left every 3.5s
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 3500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, currentIndex]);

  // Always compute 3 visible items starting from currentIndex
  const visibleTestimonials = [
    TESTIMONIALS_DATA[currentIndex],
    TESTIMONIALS_DATA[(currentIndex + 1) % total],
    TESTIMONIALS_DATA[(currentIndex + 2) % total],
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-yellow-400/5 dark:bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Verified Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-yellow-400 tracking-tight">
            What Clients Say About Working With Me
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-900 dark:text-yellow-100 font-medium">
            Real feedback from agency founders, business owners, and marketing leaders.
          </p>
        </div>

        {/* Reviews Container - 3 cards side-by-side sliding right to left */}
        <div
          className="relative min-h-[380px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 overflow-hidden py-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleTestimonials.map((data, idx) => (
                <motion.div
                  key={data.id}
                  layout
                  initial={{ opacity: 0, x: 120, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -120, scale: 0.94 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 hover:border-yellow-400 dark:hover:border-yellow-400 transition-colors duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between relative group h-full"
                >
                  <div>
                    {/* Top Row: Stars & Platform badge */}
                    <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                      <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(data.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                        ))}
                      </div>

                      <span className="px-3 py-1 rounded-full text-[11px] font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/30">
                        {data.platformUsed} • {data.projectType}
                      </span>
                    </div>

                    {/* Review Quote */}
                    <p className="text-black dark:text-yellow-100 text-sm sm:text-base leading-relaxed italic mb-6 font-semibold">
                      "{data.content}"
                    </p>
                  </div>

                  {/* Client Profile Footer */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-200 dark:border-yellow-500/30 mt-auto">
                    <img
                      src={data.avatar}
                      alt={data.clientName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-yellow-400 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-black text-black dark:text-yellow-400 text-sm">
                        <span>{data.clientName}</span>
                        <CheckCircle className="w-4 h-4 text-yellow-400 fill-black stroke-[2.5]" title="Verified Client" />
                      </div>
                      <div className="text-xs text-zinc-700 dark:text-yellow-200/80 font-bold">
                        {data.role}, <span className="font-extrabold text-black dark:text-yellow-300">{data.company}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Navigation Controls (No Play/Pause Button) */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-900 flex-wrap gap-4">
          {/* Slide Progress Indicator Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-8 bg-yellow-400'
                    : 'w-2.5 bg-zinc-300 dark:bg-zinc-800 hover:bg-yellow-400/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Left / Right Arrow Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full border-2 border-yellow-400 bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={handleNext}
              className="p-3.5 rounded-full border-2 border-yellow-400 bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

