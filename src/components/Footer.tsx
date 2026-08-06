import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import { SiBehance, SiUpwork, SiPinterest } from 'react-icons/si';
import gsap from 'gsap';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    const homeEl = document.getElementById('home');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-zinc-400 py-16 border-t border-yellow-500/30 relative overflow-hidden">
      {/* Glow background decorative accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-yellow-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-yellow-400 text-black font-black text-base flex items-center justify-center border border-black/20 shadow-md shadow-yellow-400/20 overflow-hidden shrink-0">
                <img src={PERSONAL_INFO.logoUrl} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-yellow-400 tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-yellow-100/90 leading-relaxed max-w-sm font-semibold">
              {PERSONAL_INFO.tagline}
            </p>
            <div className="text-xs text-yellow-400 font-black">
              Specializing in Custom WordPress & Squarespace Design
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-yellow-400">
              Quick Navigation
            </div>
            <ul className="space-y-2 text-xs font-bold">
              {['home', 'about', 'services', 'portfolio', 'estimator', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="hover:text-yellow-400 transition-colors capitalize cursor-pointer text-zinc-300"
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider text-yellow-400">
              Let's Connect
            </div>
            <p className="text-xs text-yellow-100/90 font-semibold">
              Open for freelance projects, agency white-label retainers, and website consultations.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: SiBehance, url: PERSONAL_INFO.social.behance, label: 'Behance' },
                { icon: SiUpwork, url: PERSONAL_INFO.social.upwork, label: 'Upwork' },
                { icon: SiPinterest, url: PERSONAL_INFO.social.pinterest, label: 'Pinterest' }
              ].map((soc, idx) => {
                const SocIcon = soc.icon as React.ComponentType<{ className?: string }>;
                return (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className="p-2.5 rounded-xl border border-yellow-500/30 bg-zinc-900 text-yellow-400 hover:text-black hover:bg-yellow-400 hover:border-black transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <SocIcon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
          <div className="flex items-center gap-1 text-zinc-400">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</span>
          </div>

          {/* Smooth Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400/10 border border-yellow-500/40 hover:border-yellow-400 hover:bg-yellow-400 text-yellow-300 hover:text-black text-xs font-black transition-all cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
