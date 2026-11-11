import React, { useState } from 'react';
import { Sparkles, MapPin, Clock, Heart, ArrowRight, Utensils, Coffee, Flame, IceCream, CheckCircle2, ShieldCheck } from 'lucide-react';
import { LocalExperienceItem } from '../types';

interface LocalExperiencesSectionProps {
  experiences: LocalExperienceItem[];
  onSelectExperience: (item: LocalExperienceItem) => void;
  currency: 'INR' | 'USD';
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenPartner?: () => void;
}

export const LocalExperiencesSection: React.FC<LocalExperiencesSectionProps> = ({
  experiences,
  onSelectExperience,
  currency,
  savedIds,
  onToggleSave,
  onOpenPartner,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [hostFilter, setHostFilter] = useState<'All' | 'Exclusive' | 'Partner'>('All');

  const filteredExperiences = experiences.filter((exp: LocalExperienceItem) => {
    const locMatch = selectedLocation === 'All' || exp.state === selectedLocation;
    const hostMatch =
      hostFilter === 'All' ||
      (hostFilter === 'Exclusive' && exp.isExclusive) ||
      (hostFilter === 'Partner' && !exp.isExclusive);
    return locMatch && hostMatch;
  });

  const formatPrice = (item: LocalExperienceItem) => {
    if (currency === 'INR') {
      return `₹${item.priceINR.toLocaleString('en-IN')}`;
    }
    return `$${item.priceUSD}`;
  };

  return (
    <section id="local-experiences" className="relative py-16 sm:py-20 lg:py-24 bg-[#0b1612] text-[#f4efe8] border-t border-[#1b3427] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-4xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#e07a5f] font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#e07a5f]" />
            <span>Curated Marketplace · Local Cultural Experiences</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4efe8] leading-tight">
            Travel beyond places. <br />
            <span className="italic font-normal text-amber-300">
              Into people, stories, and little moments that stay.
            </span>
          </h2>

          <div className="mt-5 space-y-3 sm:space-y-4 text-[#a1b8ac] text-xs sm:text-base font-light leading-relaxed">
            <p className="text-amber-300 font-serif text-base sm:text-lg italic font-normal">
              "What if travel wasn’t just about seeing a place, but living a little piece of it?"
            </p>
            <p>
              Imagine cooking a pot of Kashmiri dum biryani with a local family in a quiet village, on an ordinary afternoon that turns into a memory. Picking tea leaves on a misty winter morning in Munnar and brewing your very own cup, surrounded by endless green. Feeling the wild, divine energy of Theyyam in Kannur as ancient traditions come alive before your eyes. Or doing absolutely nothing special on a random evening in Mangalore, except sharing an ice cream date at Pabbas.
            </p>
            <p className="text-xs sm:text-sm text-[#9cb0a4]">
              No packed itineraries. No tourist checklists. Just real places, real people, local traditions, unexpected adventures, and the simple joy of being somewhere new. Filter between our <strong className="text-amber-300 font-semibold">★ I-EXPLR Exclusive</strong> immersive programs and KYC-verified local community hosts.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-amber-300 font-mono">
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm">
              Come as a traveller. Leave with a story.
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm font-semibold">
              Discover the local. Feel the extraordinary.
            </span>
          </div>
        </div>

        {/* Dual Filters: Location Filter & Host Filter */}
        <div className="space-y-4 mb-8 sm:mb-10">
          {/* Location Filter Strip with silky mobile scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {['All', 'Kashmir', 'Kerala', 'Karnataka'].map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedLocation === loc
                    ? 'bg-[#e07a5f] text-white font-bold shadow-md ring-2 ring-[#e07a5f]/30'
                    : 'bg-[#13261e] text-[#a1b8ac] hover:text-white border border-[#244335] hover:border-[#e07a5f]/40'
                }`}
              >
                {loc === 'All' ? 'All Experience Regions' : `${loc} Windows`}
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
                All Windows ({experiences.length})
              </button>
              <button
                onClick={() => setHostFilter('Exclusive')}
                className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  hostFilter === 'Exclusive'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'bg-[#0b1612] text-amber-300 border border-amber-500/30 hover:border-amber-400'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>★ I-EXPLR Exclusive ({experiences.filter(e => e.isExclusive).length})</span>
              </button>
              <button
                onClick={() => setHostFilter('Partner')}
                className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  hostFilter === 'Partner'
                    ? 'bg-[#e07a5f] text-white font-bold shadow-sm'
                    : 'bg-[#0b1612] text-[#e07a5f] border border-[#e07a5f]/30 hover:border-[#e07a5f]'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>✓ Partner Verified ({experiences.filter(e => !e.isExclusive).length})</span>
              </button>
            </div>

            <div className="text-xs text-[#9cb0a4] font-mono">
              Showing <span className="text-[#f4efe8] font-semibold">{filteredExperiences.length}</span> curated experiences
            </div>
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredExperiences.map((item) => {
            const isSaved = savedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="group bg-[#13261e] rounded-2xl overflow-hidden border border-[#244335] hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl"
              >
                {/* Visual */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#07130f]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

                  {/* Top Badges: Host Origin & Save Button */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    {item.isExclusive ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs shadow-md">
                        <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                        <span>★ I-EXPLR Exclusive</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 border border-amber-400/50 backdrop-blur-md text-amber-200 text-xs font-mono font-medium shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>✓ Partner Verified · {item.organizerName}</span>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(item.id);
                      }}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition-colors z-10 shadow-md cursor-pointer"
                      title={isSaved ? 'Saved' : 'Save'}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span>{item.location}, {item.state}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Host Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={item.hostAvatar}
                        alt={item.hostName}
                        className="w-8 h-8 rounded-full object-cover border border-amber-600/40"
                      />
                      <div className="text-xs">
                        <span className="text-[#f4efe8] font-semibold">{item.hostName}</span>
                        <span className="text-[#9cb0a4] font-light"> · {item.hostRole}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f4efe8] group-hover:text-amber-300 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#9cb0a4] leading-relaxed font-light">
                      {item.hook}
                    </p>

                    {/* Highlights */}
                    <div className="mt-4 pt-3 border-t border-[#1f3a2c] space-y-1.5 text-xs text-[#c2d9cc]">
                      {item.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-amber-400">✦</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Reserve Button */}
                  <div className="mt-6 pt-4 border-t border-[#1f3a2c] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#9cb0a4] font-mono">
                        {item.duration} · {item.isExclusive ? 'Direct I-EXPLR' : item.organizerName}
                      </div>
                      <div className="font-serif text-xl font-bold text-amber-400">
                        {formatPrice(item)} <span className="text-xs font-normal text-[#9cb0a4] font-sans">/ experience</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectExperience(item)}
                      className="min-h-[42px] px-4 py-2 bg-[#1a382b] hover:bg-[#e07a5f] text-white text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#2e5944] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <span>Explore Window</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Homestay & Artisan Host Invitation */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#13261e] via-[#1a2f24] to-[#13261e] border border-[#e07a5f]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#e07a5f] font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#e07a5f]" />
              <span>Are You a Village Homestay, Tea Estate, or Cultural Custodian?</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f4efe8]">
              Host Mindful Travellers on I-EXPLR Local Experiences
            </h4>
            <p className="text-xs sm:text-sm text-[#9cb0a4] max-w-2xl font-light">
              We never commoditize lands or traditions. Local sherpas and village hosts receive 100% direct fair wages with zero middleman deductions. Get verified with KYC license verification.
            </p>
          </div>

          <button
            onClick={onOpenPartner}
            className="shrink-0 px-6 py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Apply as Local Host</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
