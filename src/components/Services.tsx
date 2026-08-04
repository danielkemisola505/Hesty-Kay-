import React, { useEffect, useRef } from 'react';
import { SERVICES_DATA } from '../data/portfolioData';
import { Globe, Layout, RefreshCw, Zap, ShieldCheck, Gauge, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onInquireService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onInquireService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Layout': return Layout;
      case 'RefreshCw': return RefreshCw;
      case 'Zap': return Zap;
      case 'ShieldCheck': return ShieldCheck;
      case 'Gauge': return Gauge;
      default: return Globe;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
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
    <section id="services" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> What I Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-yellow-400 tracking-tight">
            Specialized Web Design & Development Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-900 dark:text-yellow-100 font-medium">
            Tailored solutions built specifically for WordPress and Squarespace to help your business stand out, convert traffic, and scale effortlessly.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const IconComponent = getIcon(service.iconName);

            return (
              <div
                key={service.id}
                className="group relative rounded-3xl p-7 bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md">
                      <IconComponent className="w-6 h-6 stroke-[2.5]" />
                    </div>

                    {/* Badge */}
                    <span className="text-[11px] font-black px-3 py-1 rounded-full border bg-black text-yellow-400 border-yellow-500/40">
                      {service.platformBadge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black text-black dark:text-yellow-400 mb-3 group-hover:text-yellow-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-800 dark:text-yellow-100/90 leading-relaxed font-semibold mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Features checklist */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-black dark:text-yellow-200 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 mt-0.5 shrink-0 stroke-[2.5]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <div className="pt-5 border-t border-zinc-200 dark:border-yellow-500/30 space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-zinc-700 dark:text-yellow-300 font-bold">
                    <span className="flex items-center gap-1 font-bold">
                      <Clock className="w-3.5 h-3.5 text-yellow-500" /> Timeline: {service.typicalTimeline}
                    </span>
                  </div>

                  <button
                    onClick={() => onInquireService(service.title)}
                    className="w-full py-2.5 px-4 rounded-xl border border-yellow-500 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
