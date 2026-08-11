import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Calendar, MessageSquare, Globe } from 'lucide-react';
import { SiBehance, SiUpwork, SiPinterest } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  initialSubject?: string;
  onBookProjectClick?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ initialSubject = '', onBookProjectClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    platformPreference: 'WordPress',
    serviceType: 'WordPress Website Design',
    budget: '$3,000 - $5,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({
        ...prev,
        message: `I am interested in discussing: ${initialSubject}`
      }));
    }
  }, [initialSubject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Start A Conversation
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-yellow-400 tracking-tight">
            Let's Build Something Exceptional Together
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-900 dark:text-yellow-100 font-medium">
            Have a project in mind or need expert guidance on WordPress or Squarespace? Fill out the form or schedule a discovery call.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Information & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 space-y-6 shadow-xl">
              <h3 className="text-xl font-black text-black dark:text-yellow-400">
                Contact Information
              </h3>
              <p className="text-xs text-zinc-800 dark:text-yellow-100/90 leading-relaxed font-semibold">
                I respond to all inquiries within 24 business hours. Let's discuss your timeline, platform needs, and design goals.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-yellow-400/20 border-2 border-zinc-200 dark:border-yellow-500/30 hover:border-yellow-400 transition-all text-black dark:text-yellow-100 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center shrink-0 shadow-xs border border-yellow-500">
                    <Mail className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-zinc-600 dark:text-yellow-200/60">Direct Email</div>
                    <div className="text-xs font-black text-black dark:text-yellow-400 group-hover:text-yellow-500">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.whatsapp || `https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-yellow-400/20 border-2 border-zinc-200 dark:border-yellow-500/30 hover:border-yellow-400 transition-all text-black dark:text-yellow-100 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center shrink-0 shadow-xs border border-yellow-500">
                    <Phone className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-zinc-600 dark:text-yellow-200/60">Phone / WhatsApp</div>
                    <div className="text-xs font-black text-black dark:text-yellow-400 group-hover:text-yellow-500">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-yellow-500/30 text-black dark:text-yellow-100">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center shrink-0 shadow-xs border border-yellow-500">
                    <MapPin className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-zinc-600 dark:text-yellow-200/60">Location</div>
                    <div className="text-xs font-black text-black dark:text-yellow-400">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discovery Call Button / Book A Project */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBookProjectClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-yellow-500"
                >
                  <Calendar className="w-4 h-4 stroke-[2.5]" />
                  <span>Book A Project</span>
                </button>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-zinc-200 dark:border-yellow-500/30">
                <div className="text-xs font-black text-black dark:text-yellow-400 uppercase tracking-wider mb-3">
                  Follow & Connect
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { icon: SiBehance, url: PERSONAL_INFO.social.behance, name: 'Behance' },
                    { icon: SiUpwork, url: PERSONAL_INFO.social.upwork, name: 'Upwork' },
                    { icon: SiPinterest, url: PERSONAL_INFO.social.pinterest, name: 'Pinterest' }
                  ].map((soc, idx) => {
                    const SocIcon = soc.icon as React.ComponentType<{ className?: string }>;
                    return (
                      <a
                        key={idx}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={soc.name}
                        className="p-2.5 rounded-xl border border-zinc-300 dark:border-yellow-500/30 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-yellow-300 hover:bg-yellow-400 hover:text-black hover:border-black transition-all cursor-pointer flex items-center justify-center"
                      >
                        <SocIcon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border-2 border-black dark:border-yellow-500/40 shadow-xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center mx-auto shadow-lg border-2 border-black">
                    <CheckCircle2 className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-black text-black dark:text-yellow-400">
                    Thank You! Message Received.
                  </h3>
                  <p className="text-sm text-zinc-800 dark:text-yellow-100 font-semibold max-w-md mx-auto">
                    I have received your project details and will review them carefully. Expect a response in your inbox within 24 hours!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-yellow-400 text-black font-black text-xs cursor-pointer shadow-md border border-yellow-500 hover:bg-yellow-500"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-black text-black dark:text-yellow-400 mb-2">
                    Project Inquiry Form
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-black text-black dark:text-yellow-400 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-black dark:text-yellow-100 text-xs font-bold focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-black text-black dark:text-yellow-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-black dark:text-yellow-100 text-xs font-bold focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Platform Preference */}
                    <div>
                      <label className="block text-xs font-black text-black dark:text-yellow-400 mb-1.5">
                        Target Platform
                      </label>
                      <select
                        name="platformPreference"
                        value={formData.platformPreference}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-black dark:text-yellow-100 text-xs font-bold focus:outline-none focus:border-yellow-400 transition-colors"
                      >
                        <option value="WordPress">WordPress</option>
                        <option value="Squarespace">Squarespace</option>
                        <option value="Unsure">Unsure / Need Advice</option>
                      </select>
                    </div>

                    {/* Estimated Budget */}
                    <div>
                      <label className="block text-xs font-black text-black dark:text-yellow-400 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-black dark:text-yellow-100 text-xs font-bold focus:outline-none focus:border-yellow-400 transition-colors"
                      >
                        <option value="$1,500 - $3,000">$1,500 - $3,000</option>
                        <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-black text-black dark:text-yellow-400 mb-1.5">
                      Project Overview & Goals *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your current website, business goals, target launch date, and any inspirational sites..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 text-black dark:text-yellow-100 text-xs font-bold focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60 border border-yellow-500"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                        <span>Submit Project Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
