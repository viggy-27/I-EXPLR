import React, { useState } from 'react';
import { ShieldCheck, Award, MessageSquare, Calendar, Star, Compass } from 'lucide-react';
import { LocalGuide } from '../types';

interface GuidesSectionProps {
  guides: LocalGuide[];
  onBookGuide: (guide: LocalGuide) => void;
  currency: 'INR' | 'USD';
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({
  guides,
  onBookGuide,
  currency,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<LocalGuide | null>(null);

  const formatRate = (guide: LocalGuide) => {
    if (currency === 'INR') {
      return `₹${guide.dailyRateINR.toLocaleString('en-IN')}`;
    }
    return `$${guide.dailyRateUSD}`;
  };

  return (
    <section id="guides" className="py-24 bg-[#0a1712] text-[#fbf9f5] border-t border-emerald-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold mb-3">
            Indigenous Mastery & Alpine Sherpas
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Certified Local Custodians
          </h2>
          <p className="mt-3 text-stone-300/80 text-sm sm:text-base font-light">
            We partner directly with born-and-raised local guides, certified mountaineers, and tribal elders. Zero agency middlemen — 100% fair equity and direct economic empowerment.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-[#0e2219] rounded-xl border border-emerald-900/50 hover:border-amber-600/40 p-5 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:shadow-black/50"
            >
              <div>
                {/* Avatar & Main Info */}
                <div className="relative mb-4">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-full aspect-[4/3] object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[11px] text-amber-300 font-mono flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{guide.rating}</span>
                  </div>
                </div>

                <div className="text-xs text-amber-400 font-medium">{guide.region}</div>
                <h3 className="font-serif text-lg font-bold text-white mt-1 group-hover:text-amber-200 transition-colors">
                  {guide.name}
                </h3>
                <div className="text-xs text-stone-300 font-medium mt-0.5">
                  {guide.specialty}
                </div>

                {/* Bio snippet */}
                <p className="mt-3 text-xs text-stone-400 line-clamp-3 leading-relaxed">
                  {guide.bio}
                </p>

                {/* Experience & Certifications (Clean unboxed text) */}
                <div className="mt-4 pt-3 border-t border-emerald-950 text-xs text-stone-400 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span>Field Experience:</span>
                    <span className="text-white font-mono">{guide.experienceYears} Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tours Completed:</span>
                    <span className="text-white font-mono">{guide.toursLed} Expeditions</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 pt-1">
                    ✓ {guide.certifications[0]}
                  </div>
                </div>
              </div>

              {/* Rate & Book Button */}
              <div className="mt-6 pt-4 border-t border-emerald-950 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400">Daily honorarium</div>
                  <div className="font-serif text-base font-bold text-amber-300">
                    {formatRate(guide)} <span className="text-xs text-stone-400 font-sans font-normal">/ day</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookGuide(guide)}
                  className="px-3 py-1.5 bg-[#173327] hover:bg-amber-600 hover:text-stone-950 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book Guide</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fair Wage Banner */}
        <div className="mt-12 bg-[#0d1d16] border border-emerald-800/40 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-900/60 flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-serif text-base font-bold text-white">I-EXPLR Direct Indigenous Fair-Trade Guarantee</div>
              <div className="text-xs text-stone-400 mt-0.5">
                100% of guide fees are disbursed directly to the local guides and porters within 24 hours of expedition completion.
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-amber-300/90 shrink-0">
            Certified Fair-Wage Protocol
          </div>
        </div>
      </div>
    </section>
  );
};
