import React, { useEffect, useState } from 'react';
import { X, Calendar, Sparkles, Loader2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl h-[90vh] max-h-[780px] bg-white dark:bg-zinc-950 border-2 border-yellow-400 rounded-2xl shadow-2xl shadow-yellow-400/10 flex flex-col z-10 overflow-hidden"
          >
            {/* Modal Top Header Bar */}
            <div className="px-5 py-4 bg-black text-white dark:bg-zinc-900 border-b border-zinc-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold shadow-md shrink-0">
                  <Calendar className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-yellow-400">
                      Book A Consultation Call
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-yellow-400/20 text-yellow-300 border border-yellow-500/40">
                      <Sparkles className="w-3 h-3 text-yellow-400" /> Free 30-Min
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-medium hidden sm:block">
                    Select a date & time to discuss your project with Esther
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 transition-colors text-xs font-semibold hidden md:flex items-center gap-1"
                  title="Open in new tab if embed doesn't render"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen</span>
                </a>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-yellow-400 hover:text-black text-zinc-300 transition-all cursor-pointer border border-zinc-700"
                  aria-label="Close Calendly scheduler"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Calendly iFrame Container */}
            <div className="relative flex-1 w-full h-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 z-10 gap-3">
                  <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
                  <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                    Loading Calendly Scheduler...
                  </p>
                </div>
              )}

              <iframe
                src={`${PERSONAL_INFO.calendly}?hide_landing_page_details=0&hide_gdpr_banner=1`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a 30-Min Meeting with Esther (Hestykay)"
                onLoad={() => setIsLoading(false)}
                className="w-full h-full border-none"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
