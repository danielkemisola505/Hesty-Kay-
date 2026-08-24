import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, CheckCircle2, Award, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onContactClick }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 rounded-3xl shadow-2xl overflow-hidden text-black dark:text-yellow-400 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-950 border-b-2 border-zinc-200 dark:border-yellow-500/30">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-yellow-400 text-black border border-yellow-500">
              {project.platform}
            </span>
            <span className="text-xs font-bold text-zinc-700 dark:text-yellow-200/80">
              {project.industry}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-2 rounded-xl border-2 border-yellow-400 bg-black text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          {/* Main Hero Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-black dark:border-yellow-500/40 shadow-md bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-yellow-400 bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 font-black text-xs transition-all duration-200 shadow-lg cursor-pointer active:scale-95 group"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>

          {/* Title & Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-yellow-400 tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-900 dark:text-yellow-100 leading-relaxed font-semibold">
              {project.fullDescription}
            </p>
          </div>

          {/* Metrics Highlight Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="p-5 rounded-2xl bg-yellow-400/20 border border-yellow-500/40 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric, idx) => (
                <div key={idx}>
                  <div className="text-xl sm:text-2xl font-black text-black dark:text-yellow-400">
                    {metric.value}
                  </div>
                  <div className="text-xs text-zinc-800 dark:text-yellow-200/90 font-bold">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Deliverables & Technologies Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deliverables */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-yellow-500/30 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-yellow-400">Key Deliverables</h3>
              <ul className="space-y-2">
                {project.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-bold text-black dark:text-yellow-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0 stroke-[3]" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-yellow-500/30 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-yellow-400">Tech Stack & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Client Quote if available */}
          {project.clientQuote && (
            <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-yellow-500/30 space-y-3">
              <p className="text-xs sm:text-sm italic text-black dark:text-yellow-100 leading-relaxed font-semibold">
                "{project.clientQuote.text}"
              </p>
              <div>
                <div className="text-xs font-black text-black dark:text-yellow-400">
                  {project.clientQuote.author}
                </div>
                <div className="text-[11px] font-bold text-zinc-700 dark:text-yellow-200/80">
                  {project.clientQuote.role}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 px-6 bg-zinc-100 dark:bg-zinc-900 border-t-2 border-zinc-200 dark:border-yellow-500/30 flex items-center justify-between">
          <div className="text-xs font-bold text-zinc-800 dark:text-yellow-200/90">
            Client: <span className="font-black text-black dark:text-yellow-400">{project.client}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onContactClick();
            }}
            className="px-5 py-2.5 rounded-xl border-2 border-yellow-400 bg-yellow-400 hover:bg-black text-black hover:text-yellow-400 font-black text-xs transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer active:scale-95 group"
          >
            <span>Request Similar Site</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
