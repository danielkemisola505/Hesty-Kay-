import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import gsap from 'gsap';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'estimator', label: 'Estimator' },
    { id: 'skills', label: 'Skills' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    // Initial GSAP animation for header reveal
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // ScrollSpy active section detection
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (mobileMenuOpen && mobileDrawerRef.current) {
      gsap.fromTo(
        mobileDrawerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3 border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center text-left group cursor-pointer focus:outline-none"
          aria-label="Hestykay Web Studio - Go to Home"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-yellow-400 flex items-center justify-center text-black shadow-md shadow-yellow-400/30 group-hover:scale-105 transition-transform border border-black/10 overflow-hidden">
            <img src={PERSONAL_INFO.logoUrl} alt="Hestykay Web Studio Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/90 dark:bg-zinc-900/90 p-1.5 rounded-full border border-zinc-300/80 dark:border-yellow-500/30 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-yellow-400 text-black shadow-xs'
                    : 'text-zinc-800 dark:text-yellow-100/90 hover:text-black dark:hover:text-yellow-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            className="p-2.5 rounded-xl border border-zinc-300 dark:border-yellow-500/30 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all cursor-pointer hover:scale-105"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400 group-hover:text-black" /> : <Moon className="w-4 h-4 text-black" />}
          </button>

          {/* Book A Project CTA Button */}
          <a
            href="https://res.cloudinary.com/v5y8qj7h/image/upload/v1785804169/1d3f96229144389.692e4f47a6130_q8dqti.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-xs transition-all shadow-md shadow-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/30 cursor-pointer active:scale-95 border border-yellow-500/40"
          >
            <span>Book A Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile Hamburger & Theme Switch */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark and light mode"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileDrawerRef}
          className="sm:hidden glass-nav border-b border-zinc-300 dark:border-yellow-500/30 px-4 py-4 mt-2 shadow-xl"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                  activeSection === link.id
                    ? 'bg-yellow-400 text-black font-extrabold'
                    : 'text-zinc-900 dark:text-yellow-100 hover:bg-yellow-400/20'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-yellow-400 text-black font-extrabold text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Start A Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
