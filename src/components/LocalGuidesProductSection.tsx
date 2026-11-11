import React from 'react';
import { Compass, ShieldCheck, MapPin, Radio, Waves, Trees, Star, Calendar, ArrowRight } from 'lucide-react';
import { LocalGuide } from '../types';

interface LocalGuidesProductSectionProps {
  guides: LocalGuide[];
  onBookGuide: (guide: LocalGuide) => void;
  currency: 'INR' | 'USD';
}

export const LocalGuidesProductSection: React.FC<LocalGuidesProductSectionProps> = ({
  guides,
  onBookGuide,
  currency,
}) => {
  const formatPrice = (guide: LocalGuide) => {
    if (currency === 'INR') {
      return `₹${guide.dailyRateINR.toLocaleString('en-IN')}`;
    }
    return `$${guide.dailyRateUSD}`;
  };

  return (
    <section id="local-guides" className="relative py-16 sm:py-20 lg:py-24 bg-[#0b1612] text-[#f4efe8] border-t border-[#1b3427] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header - "Product Pillar" word removed */}
        <div className="max-w-4xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            <span>Local Guides</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4efe8] leading-tight">
            Lost in the network? <br />
            <span className="italic font-normal text-amber-300">
              Never lost on the trail.
            </span>
          </h2>

          <div className="mt-5 space-y-3 sm:space-y-4 text-[#a1b8ac] text-xs sm:text-base font-light leading-relaxed">
            <p className="text-amber-300 font-serif text-base sm:text-lg italic font-normal">
              "Some paths don't show up on Google Maps. Some of the most beautiful destinations lie beyond network coverage, deep inside forests, across wild streams, and along trails only the locals know."
            </p>
            <p>
              That's where our local guides come in. Meet the people who know the wilderness like the back of their hands — the real navigators who can read a forest trail, find a way through winding streams, uncover hidden spots, and lead you to places you might never discover on your own.
            </p>
            <p className="text-xs sm:text-sm text-[#9cb0a4]">
              Hire a local guide and explore beyond the familiar. Whether you're trekking through dense forests, chasing a hidden waterfall, crossing rugged terrain, or finding your way through a no-network zone, let their local knowledge guide your journey.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-amber-300 font-mono">
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm">
              Because an adventure feels different when you're exploring with someone who knows the way.
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm">
              Go beyond the map. Explore with the locals.
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm font-semibold">
              You bring the curiosity. They know the way.
            </span>
          </div>
        </div>

        {/* Feature Badges for No-Network Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 sm:mb-12">
          <div className="p-4 bg-[#13261e] rounded-xl border border-[#244335] shadow-sm flex items-start gap-3">
            <Radio className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#f4efe8]">Zero-Network Mastery</div>
              <div className="text-[11px] text-[#9cb0a4] mt-0.5">Navigating remote valleys without cellular reception or Google Maps.</div>
            </div>
          </div>
          <div className="p-4 bg-[#13261e] rounded-xl border border-[#244335] shadow-sm flex items-start gap-3">
            <Waves className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#f4efe8]">Wild Stream & Cascade Crossing</div>
              <div className="text-[11px] text-[#9cb0a4] mt-0.5">Reading currents, discovering secluded lagoons, and safe ford passages.</div>
            </div>
          </div>
          <div className="p-4 bg-[#13261e] rounded-xl border border-[#244335] shadow-sm flex items-start gap-3">
            <Trees className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#f4efe8]">Forest Trail Intuition</div>
              <div className="text-[11px] text-[#9cb0a4] mt-0.5">Indigenous knowledge of animal corridors, flora, weather, and ancestral lore.</div>
            </div>
          </div>
        </div>

        {/* Guides Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-[#13261e] rounded-2xl border border-[#244335] hover:border-amber-500/50 p-5 flex flex-col justify-between transition-all duration-300 group shadow-md hover:shadow-2xl"
            >
              <div>
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[11px] text-amber-300 font-mono flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{guide.rating}</span>
                  </div>
                </div>

                <div className="text-xs text-amber-400 font-bold font-mono">{guide.region}</div>
                <h3 className="font-serif text-lg font-bold text-[#f4efe8] mt-1 group-hover:text-amber-300 transition-colors">
                  {guide.name}
                </h3>
                <div className="text-xs text-stone-300 font-medium mt-0.5">
                  {guide.specialty}
                </div>

                <p className="mt-2.5 text-xs text-[#9cb0a4] line-clamp-3 leading-relaxed">
                  {guide.bio}
                </p>

                {/* No-Network Specialization Callout */}
                <div className="mt-3 p-2.5 rounded-xl bg-[#0b1612] border border-[#244335] text-[11px] text-amber-200 leading-tight">
                  <span className="font-bold text-amber-400">Trail Superpower: </span>
                  {guide.noNetworkExpertise}
                </div>
              </div>

              {/* Booking Row */}
              <div className="mt-5 pt-4 border-t border-[#1f3a2c] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#9cb0a4] font-mono">Daily fee</div>
                  <div className="font-serif text-base font-bold text-amber-400">
                    {formatPrice(guide)} <span className="text-xs text-[#9cb0a4] font-sans font-normal">/ day</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookGuide(guide)}
                  className="px-3.5 py-1.5 bg-[#1a382b] hover:bg-amber-600 hover:text-stone-950 text-white border border-[#2d5843] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Hire Guide</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
