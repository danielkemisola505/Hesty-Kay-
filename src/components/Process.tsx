import React, { useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Compass, LayoutGrid, Palette, Code, Rocket, HeartHandshake, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'LayoutGrid': return LayoutGrid;
      case 'Palette': return Palette;
      case 'Code': return Code;
      case 'Rocket': return Rocket;
      case 'HeartHandshake': return HeartHandshake;
      default: return Sparkles;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.children,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
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
    <section id="process" ref={sectionRef} className="py-20 md:py-28 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Proven Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-yellow-400 tracking-tight">
            Step-by-Step Project Process
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-900 dark:text-yellow-100 font-medium">
            A transparent, stress-free development methodology designed for predictable timelines and exceptional outcomes.
          </p>
        </div>

        {/* Timeline Grid */}
        <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {PROCESS_STEPS.map((step) => {
            const IconComp = getStepIcon(step.iconName);

            return (
              <div
                key={step.stepNumber}
                className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all duration-300 shadow-lg hover:shadow-2xl relative flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-zinc-300 dark:text-zinc-800 font-mono group-hover:text-yellow-400 transition-colors">
                      {step.stepNumber}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-yellow-400/20 text-black dark:text-yellow-400 flex items-center justify-center border border-yellow-500/30 group-hover:bg-yellow-400 group-hover:text-black transition-all shadow-xs">
                      <IconComp className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-black dark:text-yellow-400 mb-1">
                      {step.title}
                    </h3>
                    <div className="text-xs font-black text-black dark:text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded inline-block border border-yellow-500/30">
                      {step.tagline}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-800 dark:text-yellow-100/90 leading-relaxed font-semibold mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-black uppercase tracking-wider text-black dark:text-yellow-400">Deliverables</div>
                    {step.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-bold text-black dark:text-yellow-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 mt-0.5 shrink-0 stroke-[3]" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Duration */}
                <div className="pt-4 border-t border-zinc-200 dark:border-yellow-500/30 flex items-center justify-between text-xs text-zinc-700 dark:text-yellow-200/80">
                  <span className="flex items-center gap-1 font-bold">
                    <Clock className="w-3.5 h-3.5 text-yellow-400" /> Duration
                  </span>
                  <span className="font-black text-black dark:text-yellow-400">{step.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
