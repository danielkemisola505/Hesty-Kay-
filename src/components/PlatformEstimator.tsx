import React, { useState } from 'react';
import { HelpCircle, Check, ArrowRight, Sparkles, Layers, Box, DollarSign, Clock, ShieldCheck, Zap } from 'lucide-react';

interface PlatformEstimatorProps {
  onSelectEstimate: (details: string) => void;
}

export const PlatformEstimator: React.FC<PlatformEstimatorProps> = ({ onSelectEstimate }) => {
  const [platform, setPlatform] = useState<'wordpress' | 'squarespace' | 'unsure'>('unsure');
  const [projectType, setProjectType] = useState<'business' | 'ecommerce' | 'portfolio' | 'landing'>('business');
  const [pageCount, setPageCount] = useState<'small' | 'medium' | 'large'>('medium');
  const [primaryGoal, setPrimaryGoal] = useState<'flexibility' | 'maintenance' | 'conversions' | 'speed'>('conversions');

  // Logic calculation for recommendation & estimate
  const getRecommendation = () => {
    let recPlatform = 'Squarespace 7.1 (Fluid Engine)';
    let reason = 'Ideal for low maintenance, stunning visual showcase, and zero technical hassle.';
    let estTimeline = '2 - 3 Weeks';
    let estRange = '$2,500 - $3,800';

    if (platform === 'wordpress') {
      recPlatform = 'WordPress (Custom Elementor Pro / Gutenberg)';
      reason = 'Gives you infinite customization, advanced custom post types, and scalable plugin ecosystem.';
      estTimeline = '3 - 5 Weeks';
      estRange = '$3,500 - $5,500';
    } else if (platform === 'squarespace') {
      recPlatform = 'Squarespace 7.1 Fluid Engine';
      reason = 'Perfect all-in-one platform with built-in hosting, top security, and effortless content updates.';
      estTimeline = '2 - 3 Weeks';
      estRange = '$2,200 - $3,500';
    } else {
      // Unsure logic
      if (projectType === 'ecommerce' || pageCount === 'large' || primaryGoal === 'flexibility') {
        recPlatform = 'WordPress + WooCommerce';
        reason = 'Recommended based on your scale & desire for maximum custom functionality and custom database post types.';
        estTimeline = '4 - 6 Weeks';
        estRange = '$4,200 - $6,500';
      } else {
        recPlatform = 'Squarespace 7.1';
        reason = 'Recommended for your timeline and ease of ownership—no plugin updates required!';
        estTimeline = '2 - 3 Weeks';
        estRange = '$2,400 - $3,600';
      }
    }

    if (projectType === 'landing') {
      estTimeline = '1 - 2 Weeks';
      estRange = '$1,500 - $2,500';
    }

    return { recPlatform, reason, estTimeline, estRange };
  };

  const result = getRecommendation();

  const handleInquire = () => {
    const summary = `Platform Estimator Result: ${result.recPlatform} | Project Type: ${projectType} | Pages: ${pageCount} | Est Budget: ${result.estRange}`;
    onSelectEstimate(summary);
  };

  return (
    <section id="estimator" className="py-20 md:py-28 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-yellow-500/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-yellow-400/20 text-black dark:text-yellow-300 border border-yellow-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Interactive Project Scope Tool
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-yellow-400 tracking-tight">
            WordPress or Squarespace? Find Your Best Fit
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-900 dark:text-yellow-100 font-medium">
            Select your project preferences below to receive an instant platform recommendation, estimated timeline, and budget estimate.
          </p>
        </div>

        {/* Interactive Estimator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Questions Column */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-950 p-6 sm:p-8 rounded-3xl border-2 border-black dark:border-yellow-500/40 space-y-6 shadow-xl">
            {/* Question 1: Platform Preference */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black dark:text-yellow-400 mb-2.5">
                1. Do you have a platform preference?
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'wordpress', label: 'WordPress', sub: 'Infinite flexibility' },
                  { id: 'squarespace', label: 'Squarespace', sub: 'Easy & low hassle' },
                  { id: 'unsure', label: 'Help Me Decide', sub: 'Recommended' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPlatform(opt.id as any)}
                    className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                      platform === opt.id
                        ? 'bg-yellow-400 text-black border-black shadow-md'
                        : 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-yellow-100 border-zinc-300 dark:border-zinc-800 hover:border-yellow-400'
                    }`}
                  >
                    <div className="font-extrabold">{opt.label}</div>
                    <div className={`text-[10px] font-bold ${platform === opt.id ? 'text-black/80' : 'text-zinc-600 dark:text-yellow-200/60'}`}>
                      {opt.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Project Type */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black dark:text-yellow-400 mb-2.5">
                2. What type of website are you building?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'business', label: 'Business / Agency' },
                  { id: 'ecommerce', label: 'E-Commerce Store' },
                  { id: 'portfolio', label: 'Portfolio / Studio' },
                  { id: 'landing', label: 'Landing Page' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setProjectType(opt.id as any)}
                    className={`p-3 rounded-xl border-2 text-center text-xs font-extrabold transition-all cursor-pointer ${
                      projectType === opt.id
                        ? 'bg-yellow-400 text-black border-black shadow-md'
                        : 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-yellow-100 border-zinc-300 dark:border-zinc-800 hover:border-yellow-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Estimated Pages */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black dark:text-yellow-400 mb-2.5">
                3. Approximate Page Count
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'small', label: '1 - 4 Pages', desc: 'Starter / Single-page' },
                  { id: 'medium', label: '5 - 12 Pages', desc: 'Standard Business' },
                  { id: 'large', label: '12+ Pages', desc: 'Complex / Catalog' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPageCount(opt.id as any)}
                    className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                      pageCount === opt.id
                        ? 'bg-yellow-400 text-black border-black shadow-md'
                        : 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-yellow-100 border-zinc-300 dark:border-zinc-800 hover:border-yellow-400'
                    }`}
                  >
                    <div className="font-extrabold">{opt.label}</div>
                    <div className={`text-[10px] font-bold ${pageCount === opt.id ? 'text-black/80' : 'text-zinc-600 dark:text-yellow-200/60'}`}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Primary Goal */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black dark:text-yellow-400 mb-2.5">
                4. What matters most to you?
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'conversions', label: 'High Conversion Rate & Leads' },
                  { id: 'maintenance', label: 'Low Maintenance & Easy Edits' },
                  { id: 'flexibility', label: 'Custom Code & Custom Post Types' },
                  { id: 'speed', label: 'Sub-Second Page Load Speeds' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPrimaryGoal(opt.id as any)}
                    className={`p-3 rounded-xl border-2 text-left text-xs font-extrabold transition-all cursor-pointer ${
                      primaryGoal === opt.id
                        ? 'bg-yellow-400 text-black border-black shadow-md'
                        : 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-yellow-100 border-zinc-300 dark:border-zinc-800 hover:border-yellow-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5">
            <div className="p-7 rounded-3xl bg-black text-yellow-400 border-2 border-yellow-400 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full pointer-events-none blur-xl" />

              <div className="flex items-center gap-2 text-xs font-black text-yellow-400 uppercase tracking-widest">
                <Zap className="w-4 h-4 text-yellow-400 stroke-[2.5]" /> Instant Recommendation
              </div>

              <div>
                <h3 className="text-xl font-black text-white mb-2">
                  {result.recPlatform}
                </h3>
                <p className="text-xs text-yellow-100/90 leading-relaxed font-semibold">
                  {result.reason}
                </p>
              </div>

              <hr className="border-yellow-500/30" />

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-yellow-500/30">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5 text-yellow-400" /> Est. Timeline
                  </div>
                  <div className="text-base font-black text-yellow-400">{result.estTimeline}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-yellow-500/30">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-bold mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-yellow-400" /> Investment Range
                  </div>
                  <div className="text-base font-black text-yellow-400">{result.estRange}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-yellow-100/90 font-bold">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-yellow-400 shrink-0 stroke-[3]" />
                  <span>Includes mobile optimization & SEO setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-yellow-400 shrink-0 stroke-[3]" />
                  <span>Includes custom Loom video training library</span>
                </div>
              </div>

              <button
                onClick={handleInquire}
                className="w-full py-3.5 px-6 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-yellow-400/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98 border border-yellow-500"
              >
                <span>Request Proposal For This Scope</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
