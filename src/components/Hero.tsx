import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Code2, Zap, Award } from 'lucide-react';
import { PERSONAL_INFO, HERO_IMAGE } from '../data/portfolioData';
import gsap from 'gsap';

interface HeroProps {
  onPortfolioClick: () => void;
  onContactClick: () => void;
  onBookProjectClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPortfolioClick, onContactClick, onBookProjectClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(graphicRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Availability Status Badge */}
            <div ref={badgeRef} className="inline-flex items-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {PERSONAL_INFO.availability}
              </span>
            </div>

            {/* Main Headline */}
            <h1 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              Custom{' '}
              <span className="relative inline-flex items-center px-2.5 py-0.5 my-1 rounded-xl bg-yellow-400/15 dark:bg-yellow-400/10 text-zinc-900 dark:text-yellow-300 border border-yellow-500/30 font-extrabold">
                WordPress & Squarespace
              </span>{' '}
              Websites That Convert.
            </h1>

            {/* Short Tagline / Biography */}
            <p ref={textRef} className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Hi, I'm <span className="font-bold text-zinc-900 dark:text-white">{PERSONAL_INFO.name}</span>. I design and build high-performance, custom websites that help ambitious brands grow.
            </p>

            {/* Platform Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                WordPress & Elementor
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Squarespace Fluid Engine
              </span>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onPortfolioClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 border border-yellow-500"
              >
                <span>View Portfolio</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onBookProjectClick || onContactClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border-2 border-black dark:border-yellow-400 bg-black dark:bg-yellow-400 text-yellow-400 dark:text-black hover:bg-zinc-900 dark:hover:bg-yellow-300 font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Book A Project</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Fast Stats Pill */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-300 dark:border-zinc-800 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-black dark:text-yellow-400">{PERSONAL_INFO.experienceYears}</div>
                <div className="text-xs text-zinc-800 dark:text-yellow-200/80 font-bold">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-black dark:text-yellow-400">150+</div>
                <div className="text-xs text-zinc-800 dark:text-yellow-200/80 font-bold">Sites Launched</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-black dark:text-yellow-400">99.4%</div>
                <div className="text-xs text-zinc-800 dark:text-yellow-200/80 font-bold">Client Rating</div>
              </div>
            </div>
          </div>

          {/* Right Showcase Column - Clean Professional Website Owner Card */}
          <div ref={graphicRef} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden border-2 border-black dark:border-yellow-400 p-3 shadow-xl bg-white dark:bg-zinc-950">
                {/* Browser bar header */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-black text-yellow-400 rounded-xl mb-3 border border-yellow-500/30">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
                  </div>
                  <div className="text-[11px] font-mono text-yellow-300 bg-zinc-900 px-3 py-0.5 rounded-md border border-yellow-500/30">
                    https://hestykaywebstudio.com
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-black text-yellow-400 uppercase tracking-wider">Verified</span>
                  </div>
                </div>

                {/* Main Website Owner Photo */}
                <div className="relative aspect-[4/4.5] sm:aspect-[4/4] rounded-xl overflow-hidden group border border-yellow-500/30 bg-zinc-950">
                  <img
                    src={HERO_IMAGE}
                    alt="WordPress and Squarespace Specialist"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ objectPosition: 'center 15%' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                    <div className="backdrop-blur-xs bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-black px-2 py-0.5 rounded-full bg-yellow-400 text-black mb-0.5 shadow-xs">
                        <Award className="w-3 h-3 text-black stroke-[2.5]" /> Website Specialist
                      </div>
                      <p className="text-sm font-black text-white drop-shadow-sm">{PERSONAL_INFO.name}</p>
                      <p className="text-[11px] font-bold text-yellow-300">{PERSONAL_INFO.role}</p>
                    </div>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-black text-yellow-400 border border-yellow-500/30 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center shrink-0">
                      <Code2 className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-yellow-400">WordPress & SQ</div>
                      <div className="text-[10px] text-zinc-300 font-bold">Custom Development</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black text-yellow-400 border border-yellow-500/30 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-yellow-400">0.8s Load Speed</div>
                      <div className="text-[10px] text-zinc-300 font-bold">Performance First</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
