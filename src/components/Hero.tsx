import React, { useState } from 'react';
import { Search, MapPin, Compass, Users, Sparkles, ChevronDown } from 'lucide-react';
import { USER_ASSETS } from '../data/mockData';
import { Category } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onCompanionsClick: () => void;
  onSearch: (searchTerm: string, category?: Category) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onCompanionsClick,
  onSearch,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, selectedCategory ? (selectedCategory as Category) : undefined);
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image: WhatsApp Image 2026-11-03 at 22.20.32 (2).jpeg */}
      <div className="absolute inset-0 z-0">
        <img
          src={USER_ASSETS.heroHikersHimalayas}
          alt="Two adventure hikers overlooking snow-covered Himalayan peaks"
          className="w-full h-full object-cover object-[center_35%] filter brightness-[0.92] contrast-[1.05]"
        />
        {/* Gradients blending into the deep nature forest canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1612] via-[#0b1612]/50 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      </div>

      {/* Hero Content Container with mobile-first alignment */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-14 sm:pb-20 text-center flex flex-col items-center">
        {/* Brand Kicker */}
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-amber-300 font-bold mb-4 sm:mb-6 px-4 py-1.5 rounded-full bg-[#0b1612]/85 backdrop-blur-md border border-[#244335] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>The Curated Marketplace for Treks, Live Events & Workshops</span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
          Where Every Journey <br />
          <span className="italic font-normal text-amber-200">Finds Meaning.</span>
        </h1>

        {/* Supporting Copy showcasing marketplace variety & I-EXPLR Exclusives */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-stone-100 max-w-2xl font-light leading-relaxed px-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          Book weekend & weekday treks, live acoustic concerts, pottery & painting sessions, secret standup comedy, and certified local guides. Join verified hosts or experience our signature <strong className="text-amber-300 font-semibold">★ I-EXPLR Exclusives</strong>.
        </p>

        {/* Action CTAs */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={() => {
              document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto min-h-[46px] px-7 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>Discover Events & Workshops</span>
          </button>

          <button
            onClick={() => {
              document.getElementById('weekend-treks')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto min-h-[46px] px-7 py-3.5 bg-[#13261e]/90 hover:bg-[#1a382b] text-[#f4efe8] font-bold text-xs tracking-wider uppercase rounded-xl transition-all border border-[#244335] shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Weekend & Weekday Treks</span>
          </button>
        </div>

        {/* Integrated Marketplace Discovery Bar */}
        <div className="mt-8 sm:mt-12 w-full max-w-3xl bg-[#0e2219]/90 backdrop-blur-xl border border-[#244335] p-2.5 sm:p-4 rounded-2xl shadow-xl text-[#f4efe8]">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-2.5 sm:gap-3">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2.5 w-full min-h-[44px] px-3.5 py-2.5 bg-[#091510] rounded-xl border border-[#1f3a2c] focus-within:border-amber-500 transition-colors">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <input
                type="text"
                placeholder="Search treks, pottery, jamming, comedy, concerts or guides..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#f4efe8] placeholder:text-[#8aa294] focus:outline-none"
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-56 min-h-[44px] px-3 py-2 bg-[#091510] rounded-xl border border-[#1f3a2c] flex items-center justify-between">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | '')}
                className="w-full bg-transparent text-xs text-[#f4efe8] focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-[#0e2219] text-[#f4efe8]">All Categories</option>
                <option value="Trekking" className="bg-[#0e2219] text-[#f4efe8]">Treks (Weekend/Weekday)</option>
                <option value="Cultural Experiences" className="bg-[#0e2219] text-[#f4efe8]">Concerts & Jamming</option>
                <option value="Nature Escapes" className="bg-[#0e2219] text-[#f4efe8]">Pottery & Painting</option>
                <option value="Weekend Getaways" className="bg-[#0e2219] text-[#f4efe8]">Standup Comedy</option>
                <option value="Mountain Adventures" className="bg-[#0e2219] text-[#f4efe8]">Local Guides & Treks</option>
                <option value="Offbeat Destinations" className="bg-[#0e2219] text-[#f4efe8]">Curated Local Experiences</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto min-h-[44px] px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-md cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </form>

          {/* Quick Marketplace Jump Chips */}
          <div className="mt-3 pt-3 border-t border-[#1c382b] flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[11px] text-stone-400 font-mono">Popular Marketplace Categories:</span>
            <button
              type="button"
              onClick={() => document.getElementById('weekend-treks')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-2.5 py-1 rounded-lg bg-[#142a1f] hover:bg-[#1a382a] border border-[#244b36] text-[#c2decb] hover:text-white transition-colors"
            >
              🏔️ Treks
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-2.5 py-1 rounded-lg bg-[#142a1f] hover:bg-[#1a382a] border border-[#244b36] text-[#c2decb] hover:text-white transition-colors"
            >
              🎸 Concerts & Jamming
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-2.5 py-1 rounded-lg bg-[#142a1f] hover:bg-[#1a382a] border border-[#244b36] text-[#c2decb] hover:text-white transition-colors"
            >
              🎨 Pottery & Painting
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-2.5 py-1 rounded-lg bg-[#142a1f] hover:bg-[#1a382a] border border-[#244b36] text-[#c2decb] hover:text-white transition-colors"
            >
              🎤 Standup Comedy
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('local-guides')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-2.5 py-1 rounded-lg bg-[#142a1f] hover:bg-[#1a382a] border border-[#244b36] text-[#c2decb] hover:text-white transition-colors"
            >
              🧭 Local Guides
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-semibold transition-colors"
            >
              ★ I-EXPLR Exclusives
            </button>
          </div>
        </div>

        {/* Trust Highlights (Responsive 2-col to 4-col in Dark Forest Theme) */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full text-[#9cb0a4] text-xs font-medium">
          <div className="bg-[#0e2219]/85 backdrop-blur-sm p-3.5 rounded-xl border border-[#244335] shadow-sm">
            <div className="font-serif text-base sm:text-lg text-[#f4efe8] font-bold">100% Certified</div>
            <div className="text-[11px] text-[#9cb0a4] mt-0.5">Indigenous & Sherpa Guides</div>
          </div>
          <div className="bg-[#0e2219]/85 backdrop-blur-sm p-3.5 rounded-xl border border-[#244335] shadow-sm">
            <div className="font-serif text-base sm:text-lg text-[#f4efe8] font-bold">Small Cohorts</div>
            <div className="text-[11px] text-[#9cb0a4] mt-0.5">Max 8-10 Explorers</div>
          </div>
          <div className="bg-[#0e2219]/85 backdrop-blur-sm p-3.5 rounded-xl border border-[#244335] shadow-sm">
            <div className="font-serif text-base sm:text-lg text-[#f4efe8] font-bold">Zero Trace</div>
            <div className="text-[11px] text-[#9cb0a4] mt-0.5">Clean Alpine Trails</div>
          </div>
          <div className="bg-[#0e2219]/85 backdrop-blur-sm p-3.5 rounded-xl border border-[#244335] shadow-sm">
            <div className="font-serif text-base sm:text-lg text-[#f4efe8] font-bold">KYC Verified</div>
            <div className="text-[11px] text-[#9cb0a4] mt-0.5">Vetted Partners & Hosts</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={onExploreClick}
          className="mt-8 sm:mt-12 text-[#f4efe8] hover:text-amber-400 transition-colors flex flex-col items-center gap-1 focus-visible:outline-none"
          aria-label="Scroll down to explore"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#9cb0a4] font-mono font-semibold">
            Descend Into The Wild
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
        </button>
      </div>
    </section>
  );
};
