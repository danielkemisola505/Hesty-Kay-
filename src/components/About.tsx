import React, { useEffect, useRef } from 'react';
import { PERSONAL_INFO, OWNER_IMAGE } from '../data/portfolioData';
import { CheckCircle2, ShieldCheck, Heart, Sparkles, Target, Flame, Lightbulb } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const approaches = [
    {
      title: 'Strategy First, Design Second',
      description: 'A beautiful website that fails to convert is just digital decoration. Every layout, button, and sentence is structured to drive inquiries and sales.',
      icon: Target
    },
    {
      title: 'Dual Platform Expertise',
      description: 'Mastery of both WordPress and Squarespace allows me to objectively recommend the exact platform that fits your technical skill, budget, and future maintenance goals.',
      icon: Lightbulb
    },
    {
      title: 'Obsessive Speed & SEO',
      description: 'Search engines and users reward speed. I write clean CSS, optimize images, and implement schema markup to guarantee top PageSpeed scores.',
      icon: Flame
    },
    {
      title: 'Zero Technical Headaches',
      description: 'I empower you with custom recorded Loom video tutorials so updating your blog, changing text, or adding products is effortless after handoff.',
      icon: Heart
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> About The Designer
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-yellow-400 tracking-tight">
            Bridging Creative Artistry with High-Performance Code
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-900 dark:text-yellow-100 font-medium">
            Learn more about my background, technical philosophy, and passion for building memorable web experiences.
          </p>
        </div>

        {/* Top Split Layout: Bio & Experience Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Bio */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-black dark:border-yellow-400 shrink-0 bg-zinc-950 shadow-lg relative">
                <img
                  src={OWNER_IMAGE}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 15%' }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black text-black dark:text-yellow-400">
                  Hi, I'm {PERSONAL_INFO.name}.
                </h3>
                <p className="text-xs font-bold text-zinc-700 dark:text-yellow-200">{PERSONAL_INFO.role}</p>
              </div>
            </div>
            <p className="text-zinc-900 dark:text-yellow-100/90 leading-relaxed text-base sm:text-lg font-medium">
              {PERSONAL_INFO.bio}
            </p>
            <p className="text-zinc-900 dark:text-yellow-100/90 leading-relaxed text-base font-medium">
              Over the past 3+ years, I have specialized in bridging the gap between bespoke visual storytelling and rock-solid platform architecture. Whether building complex e-commerce stores on <strong className="text-black dark:text-yellow-400 bg-yellow-400/20 dark:bg-yellow-400/10 px-1 py-0.5 rounded">WordPress + WooCommerce</strong> or crafting sleek, low-maintenance creative portfolios on <strong className="text-black dark:text-yellow-400 bg-yellow-400/20 dark:bg-yellow-400/10 px-1 py-0.5 rounded">Squarespace 7.1 Fluid Engine</strong>, my goal remains constant: delivering websites that elevate brands and produce measurable ROI.
            </p>

            {/* Quick Expertise Pills */}
            <div className="pt-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-700 dark:text-yellow-400/80 mb-3">
                Core Specializations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Custom WordPress & Elementor Pro',
                  'Squarespace 7.1 & Fluid Engine',
                  'WooCommerce & Stripe E-Commerce',
                  'High-Converting Landing Pages',
                  'Custom CSS & JavaScript Injection',
                  'Core Web Vitals Speed Optimization'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-black dark:text-yellow-200 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-yellow-500 shrink-0 stroke-[2.5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Highlight Stats Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-black text-yellow-400 border-2 border-black dark:border-yellow-400 space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center font-black text-2xl shadow-lg shadow-yellow-400/30">
                  {PERSONAL_INFO.experienceYears}
                </div>
                <div>
                  <div className="text-lg font-black text-yellow-400">Years of Web Excellence</div>
                  <div className="text-xs text-zinc-300 font-bold">Designing & developing since 2023</div>
                </div>
              </div>

              <hr className="border-yellow-500/30" />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-300 font-bold">Completed Projects</span>
                  <span className="text-base font-black text-yellow-400">{PERSONAL_INFO.projectsCompleted}</span>
                </div>
                <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-yellow-500/30">
                  <div className="bg-yellow-400 h-full rounded-full w-[95%]" />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-zinc-300 font-bold">Client Satisfaction</span>
                  <span className="text-base font-black text-yellow-400">{PERSONAL_INFO.satisfactionRate}</span>
                </div>
                <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-yellow-500/30">
                  <div className="bg-yellow-400 h-full rounded-full w-[99%]" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-yellow-500/40 text-xs text-yellow-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-yellow-400" />
                <span>
                  <strong className="text-yellow-400">100% On-Time Guarantee:</strong> Every milestone is backed by transparent communication and strict deadline adherence.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Approach Cards */}
        <div className="mt-12">
          <h3 className="text-xl font-black text-black dark:text-yellow-400 text-center mb-8">
            My Design & Development Philosophy
          </h3>
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approaches.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1 group cursor-default shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform font-bold">
                    <IconComp className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="text-base font-extrabold text-black dark:text-yellow-400 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-800 dark:text-yellow-100/80 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
