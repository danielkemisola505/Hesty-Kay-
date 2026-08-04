import React, { useEffect, useRef, useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Sparkles, Code, Cpu, Layers, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarsRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Platforms & Builders', 'Design & Frontend', 'Performance & Strategy'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressBarsRef.current) {
        const bars = progressBarsRef.current.querySelectorAll('.skill-bar-inner');
        bars.forEach((bar) => {
          const level = bar.getAttribute('data-level');
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${level}%`,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-28 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Technical Mastery
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-yellow-400 tracking-tight">
            Skills, Tools & Technical Proficiency
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-900 dark:text-yellow-100 font-medium">
            A comprehensive overview of platforms, coding languages, optimization techniques, and web tools I utilize daily.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-yellow-400 text-black shadow-md border border-yellow-500'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-yellow-100 border border-zinc-300 dark:border-yellow-500/30 hover:border-yellow-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div ref={progressBarsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all duration-300 shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block border border-black/20" />
                  <span className="text-sm font-black text-black dark:text-yellow-400">
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-700 dark:text-yellow-200/80 font-bold">
                    {skill.experience}
                  </span>
                  <span className="text-xs font-black text-black dark:text-yellow-400 font-mono bg-yellow-400/20 px-2 py-0.5 rounded border border-yellow-500/30">
                    {skill.level}%
                  </span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-black/10 dark:border-yellow-500/30">
                <div
                  className="skill-bar-inner bg-yellow-400 dark:bg-yellow-400 h-full rounded-full transition-all"
                  data-level={skill.level}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
