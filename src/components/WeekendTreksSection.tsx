import React, { useState } from 'react';
import { Mountain, Compass, Flame, ArrowRight, Clock, Gauge, Utensils, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { USER_ASSETS } from '../data/mockData';
import { TrekItem } from '../types';

interface WeekendTreksSectionProps {
  treks: TrekItem[];
  onSelectTrek: (trek: TrekItem) => void;
  currency: 'INR' | 'USD';
  onOpenPartner?: () => void;
}

export const WeekendTreksSection: React.FC<WeekendTreksSectionProps> = ({
  treks,
  onSelectTrek,
  currency,
  onOpenPartner,
}) => {
  const [activeTimingFilter, setActiveTimingFilter] = useState<'All' | 'Weekend Escape' | 'Weekday Trail' | 'Sunrise Scramble'>('All');
  const [hostFilter, setHostFilter] = useState<'All' | 'Exclusive' | 'Partner'>('All');

  const filteredTreks = treks.filter((t) => {
    const timingMatch = activeTimingFilter === 'All' || t.timingType === activeTimingFilter;
    const hostMatch =
      hostFilter === 'All' ||
      (hostFilter === 'Exclusive' && t.isExclusive) ||
      (hostFilter === 'Partner' && !t.isExclusive);
    return timingMatch && hostMatch;
  });

  const formatPrice = (trek: TrekItem) => {
    if (currency === 'INR') {
      return `₹${trek.priceINR.toLocaleString('en-IN')}`;
    }
    return `$${trek.priceUSD}`;
  };

  return (
    <section id="weekend-treks" className="relative py-16 sm:py-20 lg:py-24 bg-[#0f201a] text-[#f4efe8] border-t border-[#1f3a2c] overflow-hidden">
      {/* Background Image: WhatsApp Image 2026-11-03 at 22.20.32 (1).jpeg in deep nature forest atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src={USER_ASSETS.forestGlowingTent}
          alt="Nighttime pine forest camping with glowing canvas tent and moon"
          className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.1] opacity-35 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f201a] via-transparent to-[#0f201a]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-4xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Curated Marketplace · Weekend / Weekday Treks</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4efe8] leading-tight">
            Not every adventure needs a long weekend. <br />
            <span className="italic font-normal text-emerald-300">
              Sometimes, all you need is a trail, a little fresh air, and a reason to step away.
            </span>
          </h2>

          <div className="mt-5 space-y-3 sm:space-y-4 text-[#a1b8ac] text-xs sm:text-base font-light leading-relaxed">
            <p>
              From spontaneous weekday escapes to unforgettable weekend adventures, we bring you verified treks and experiences that let you trade traffic for trails, alarms for sunrise, and city noise for the rhythm of nature.
            </p>
            <p className="text-emerald-300 font-serif text-base sm:text-lg italic font-normal">
              "Chase breathtaking views, take on adventurous trails, and welcome the calm of peaceful mountain mornings. Savour hot Benne Dosa on a hilltop, sing along with the wind, dance under open skies, and spend slow evenings around a campfire with people who might just become your favourite travel stories."
            </p>
            <p className="text-xs sm:text-sm text-[#9cb0a4]">
              I-EXPLR operates direct <strong className="text-emerald-300 font-semibold">★ I-EXPLR Exclusive</strong> alpine expeditions and verifies licensed community trek organisers with verified GST and emergency protocols.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-emerald-300 font-mono">
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm">
              Come for the trek. Stay for the moments. Return with stories.
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm font-semibold">
              Pick a trail. Leave the routine behind.
            </span>
          </div>
        </div>

        {/* Dual Filters: Timing Filters & Host Origin Filter */}
        <div className="space-y-4 mb-8 sm:mb-10">
          {/* Timing Filters with silky mobile scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'All', label: 'All Treks & Trails' },
              { id: 'Sunrise Scramble', label: '🌅 Sunrise Trails (Skandagiri & Benne Dosa)' },
              { id: 'Weekday Trail', label: '🌿 Weekday Solitude (Kudremukh & Off-Grid)' },
              { id: 'Weekend Escape', label: '🏕️ Weekend Escapes & Campfires' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTimingFilter(item.id as any)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  activeTimingFilter === item.id
                    ? 'bg-emerald-700 text-white font-bold shadow-md ring-2 ring-emerald-400/30'
                    : 'bg-[#13261e] text-[#a1b8ac] hover:text-white border border-[#244335] hover:border-emerald-500/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Host Origin Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1f3a2c]/60">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#9cb0a4] font-mono text-[11px] uppercase tracking-wider mr-1">Filter by Host:</span>
              <button
                onClick={() => setHostFilter('All')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                  hostFilter === 'All'
                    ? 'bg-[#1e4a35] text-white border border-emerald-400/60 font-semibold'
                    : 'bg-[#0b1612] text-[#9cb0a4] border border-[#244335] hover:text-white'
                }`}
              >
                All Trails ({treks.length})
              </button>
              <button
                onClick={() => setHostFilter('Exclusive')}
                className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  hostFilter === 'Exclusive'
                    ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                    : 'bg-[#0b1612] text-emerald-300 border border-emerald-500/30 hover:border-emerald-400'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>★ I-EXPLR Exclusive ({treks.filter(t => t.isExclusive).length})</span>
              </button>
              <button
                onClick={() => setHostFilter('Partner')}
                className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  hostFilter === 'Partner'
                    ? 'bg-teal-600 text-white font-bold shadow-sm'
                    : 'bg-[#0b1612] text-teal-300 border border-teal-500/30 hover:border-teal-400'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>✓ Partner Verified ({treks.filter(t => !t.isExclusive).length})</span>
              </button>
            </div>

            <div className="text-xs text-[#9cb0a4] font-mono">
              Showing <span className="text-[#f4efe8] font-semibold">{filteredTreks.length}</span> verified treks
            </div>
          </div>
        </div>

        {/* Treks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredTreks.map((trek) => (
            <div
              key={trek.id}
              className="group bg-[#13261e]/90 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#244335] hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl"
            >
              {/* Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#07130f]">
                <img
                  src={trek.image}
                  alt={trek.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

                {/* Top Badges: Host Origin & Campfire */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  {trek.isExclusive ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-400 text-stone-950 font-bold text-xs shadow-md">
                      <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                      <span>★ I-EXPLR Exclusive</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 border border-emerald-400/50 backdrop-blur-md text-emerald-200 text-xs font-mono font-medium shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>✓ Partner Verified · {trek.organizerName}</span>
                    </div>
                  )}

                  {trek.campfireIncluded && (
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-200 font-mono bg-amber-950/85 border border-amber-500/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                      <span>Campfire & Music</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-mono">
                  <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    {trek.location}, {trek.state} · Alt: {trek.altitude}
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-emerald-300 flex items-center gap-1">
                    <Mountain className="w-3 h-3" />
                    <span>{trek.timingType}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#f4efe8] group-hover:text-emerald-300 transition-colors leading-snug">
                    {trek.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#9cb0a4] leading-relaxed font-light">
                    {trek.shortDescription}
                  </p>

                  {/* Food Highlight Box */}
                  <div className="mt-3.5 p-3 rounded-xl bg-[#0b1612] border border-[#224433] flex items-start gap-2.5 text-xs">
                    <Utensils className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-amber-400 font-bold font-mono">Trail Feast: </span>
                      <span className="text-[#e0e8e4]">{trek.foodHighlight}</span>
                    </div>
                  </div>

                  {/* Technical row */}
                  <div className="mt-3.5 pt-3 border-t border-[#1f3a2c] flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#9cb0a4] font-mono">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#9cb0a4]" />
                      <span>{trek.duration}</span>
                    </div>
                    <span aria-hidden="true" className="text-stone-600">·</span>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{trek.difficulty}</span>
                    </div>
                    <span aria-hidden="true" className="text-stone-600">·</span>
                    <span>Distance: {trek.distance}</span>
                  </div>
                </div>

                {/* Footer Price & Join Button */}
                <div className="mt-5 pt-4 border-t border-[#1f3a2c] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#9cb0a4] font-mono">
                      {trek.isExclusive ? 'Conducted by I-EXPLR Leads' : `Organized by ${trek.organizerName}`}
                    </div>
                    <div className="font-serif text-lg sm:text-xl font-bold text-emerald-300">
                      {formatPrice(trek)}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectTrek(trek)}
                    className="min-h-[40px] px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>View Trail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trek Organizers Marketplace Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#13261e] via-[#163327] to-[#13261e] border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Are You a Certified Trek Organiser or Mountain Guide?</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f4efe8]">
              List Your Weekday & Weekend Treks on I-EXPLR Marketplace
            </h4>
            <p className="text-xs sm:text-sm text-[#9cb0a4] max-w-2xl font-light">
              Connect with safety-conscious trekkers across India. Fast-track your registration with KYC document submission (GST, IMF / NIM certifications, or registered enterprise license) for direct group bookings.
            </p>
          </div>

          <button
            onClick={onOpenPartner}
            className="shrink-0 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Apply as Trek Partner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
