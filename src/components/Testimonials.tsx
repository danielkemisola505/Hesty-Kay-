import React, { useEffect, useRef } from 'react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { Star, Quote, Sparkles, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Verified Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-yellow-400 tracking-tight">
            What Clients Say About Working With Me
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-900 dark:text-yellow-100 font-medium">
            Read real feedback from agency founders, business owners, and marketing leaders.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all duration-300 shadow-lg hover:shadow-2xl relative flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars & Platform */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                    ))}
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/30">
                    {t.platformUsed} • {t.projectType}
                  </span>
                </div>

                {/* Review Quote */}
                <p className="text-black dark:text-yellow-100 text-sm sm:text-base leading-relaxed italic mb-8 relative z-10 font-semibold">
                  "{t.content}"
                </p>
              </div>

              {/* Client Profile */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-200 dark:border-yellow-500/30">
                <img
                  src={t.avatar}
                  alt={t.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-black text-black dark:text-yellow-400 text-sm">
                    <span>{t.clientName}</span>
                    <CheckCircle className="w-4 h-4 text-yellow-400 fill-black stroke-[2.5]" title="Verified Client" />
                  </div>
                  <div className="text-xs text-zinc-700 dark:text-yellow-200/80 font-bold">
                    {t.role}, <span className="font-extrabold text-black dark:text-yellow-300">{t.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
