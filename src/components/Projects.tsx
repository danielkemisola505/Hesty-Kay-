import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ExternalLink, Sparkles, Eye, ArrowRight, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'WordPress', 'Squarespace', 'E-Commerce', 'Landing Page'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory || p.platform === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
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
  }, [activeCategory]);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Client Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-yellow-400 tracking-tight">
            Featured Projects & Case Studies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-900 dark:text-yellow-100 font-medium">
            Explore recent custom WordPress and Squarespace builds designed for conversion, speed, and brand authority.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-yellow-400 text-black shadow-md border border-yellow-500'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-yellow-100 border border-zinc-300 dark:border-yellow-500/30 hover:border-yellow-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 overflow-hidden hover:border-yellow-400 dark:hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="w-full py-2.5 px-4 rounded-xl bg-yellow-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:bg-yellow-500 transition-colors cursor-pointer border border-yellow-500"
                    >
                      <Eye className="w-4 h-4 stroke-[2.5]" />
                      <span>View Case Study</span>
                    </button>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-black text-yellow-400 border border-yellow-500/40">
                      {project.platform}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="text-[11px] font-bold text-zinc-700 dark:text-yellow-200/80 mb-1">
                    {project.client} • {project.industry}
                  </div>
                  <h3 className="text-xl font-black text-black dark:text-yellow-400 mb-2 group-hover:text-yellow-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-800 dark:text-yellow-100/90 leading-relaxed font-semibold mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-100 dark:bg-zinc-900 text-black dark:text-yellow-300 border border-zinc-200 dark:border-yellow-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-0">
                <button
                  onClick={() => onSelectProject(project)}
                  className="w-full py-2.5 px-4 rounded-xl border border-yellow-500 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
