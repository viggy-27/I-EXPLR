import React, { useState } from 'react';
import { Calendar, Compass, Shield, ArrowRight, Check, Sparkles, MapPin, Users } from 'lucide-react';
import { Destination } from '../types';

interface ExperiencesSectionProps {
  destinations: Destination[];
  onSelectExperience: (dest: Destination) => void;
  currency: 'INR' | 'USD';
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  destinations,
  onSelectExperience,
  currency,
}) => {
  const [activeExpId, setActiveExpId] = useState<string>(destinations[0]?.id || '');
  const activeDestination = destinations.find((d) => d.id === activeExpId) || destinations[0];

  const formatPrice = (dest: Destination) => {
    if (currency === 'INR') {
      return `₹${dest.priceINR.toLocaleString('en-IN')}`;
    }
    return `$${dest.priceUSD}`;
  };

  if (!activeDestination) return null;

  return (
    <section id="experiences" className="py-24 bg-[#08130f] text-[#fbf9f5] border-t border-emerald-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold mb-3">
              Handcrafted Expeditions
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Signature I-EXPLR Journeys
            </h2>
            <p className="mt-3 text-stone-300/80 text-sm sm:text-base max-w-xl font-light">
              Limited-cohort expeditions with certified mountain sherpas, private camp setups, and deep cultural immersion.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
            <span>Guaranteed Small Groups: 8–10 Travelers Max</span>
          </div>
        </div>

        {/* Horizontal Experience Selector Strip */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {destinations.slice(0, 5).map((dest) => (
            <button
              key={dest.id}
              onClick={() => setActiveExpId(dest.id)}
              className={`px-4 py-3 rounded-xl text-left transition-all shrink-0 min-w-[220px] border ${
                activeExpId === dest.id
                  ? 'bg-[#152e22] border-amber-500/70 shadow-lg shadow-black/40'
                  : 'bg-[#0d1d16] border-emerald-900/40 text-stone-300 hover:text-white hover:bg-[#11241b]'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider text-amber-400 font-medium">
                {dest.category}
              </div>
              <div className="font-serif text-sm font-bold text-white mt-0.5 truncate">
                {dest.title}
              </div>
              <div className="text-[11px] text-stone-400 mt-1">
                {dest.duration} · {formatPrice(dest)}
              </div>
            </button>
          ))}
        </div>

        {/* Active Signature Journey Showcase */}
        <div className="bg-[#0e2219] rounded-2xl border border-emerald-900/50 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full">
              <img
                src={activeDestination.image}
                alt={activeDestination.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2219] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[#0e2219]" />
              
              <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                <div className="text-xs text-amber-400 font-mono font-medium">
                  {activeDestination.category} · {activeDestination.location}
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {activeDestination.title}
                </h3>
              </div>
            </div>

            {/* Details & Itinerary Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="hidden lg:block">
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-medium mb-1">
                    {activeDestination.category} · {activeDestination.location}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {activeDestination.title}
                  </h3>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {activeDestination.longDescription}
                </p>

                {/* Key Expedition Highlights */}
                <div className="mt-6 space-y-2.5">
                  <div className="text-xs uppercase tracking-wider text-amber-400/90 font-mono font-medium">
                    Journey Highlights
                  </div>
                  {activeDestination.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-200">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Info Grid */}
                <div className="mt-6 pt-5 border-t border-emerald-950 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400">Best Season:</span>
                    <div className="text-white font-medium mt-0.5">{activeDestination.bestSeason}</div>
                  </div>
                  <div>
                    <span className="text-stone-400">Max Altitude:</span>
                    <div className="text-white font-medium mt-0.5">{activeDestination.maxAltitude || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-stone-400">Cohort Size:</span>
                    <div className="text-white font-medium mt-0.5">8 – 10 Explorers</div>
                  </div>
                  <div>
                    <span className="text-stone-400">Starting Price:</span>
                    <div className="text-amber-300 font-serif font-bold text-sm mt-0.5">
                      {formatPrice(activeDestination)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-emerald-950 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onSelectExperience(activeDestination)}
                  className="w-full sm:flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2"
                >
                  <span>View Complete Itinerary & Dates</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
