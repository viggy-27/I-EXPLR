import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Clock, Ticket, CheckCircle2, ShieldCheck, Music, Palette, Flame, ArrowRight } from 'lucide-react';
import { EventItem } from '../types';

interface EventsProductSectionProps {
  events: EventItem[];
  onBookEvent: (event: EventItem) => void;
  currency: 'INR' | 'USD';
  onOpenPartner?: () => void;
}

export const EventsProductSection: React.FC<EventsProductSectionProps> = ({
  events,
  onBookEvent,
  currency,
  onOpenPartner,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hostFilter, setHostFilter] = useState<'All' | 'Exclusive' | 'Partner'>('All');

  const filteredEvents = events.filter((e) => {
    // Category match
    const categoryMatch = 
      selectedCategory === 'All' ||
      e.categoryGroup === selectedCategory ||
      (selectedCategory === 'Concerts & Jamming' && (e.genre === 'Concert & Live Music' || e.genre === 'Acoustic Jam')) ||
      (selectedCategory === 'Pottery & Painting' && (e.genre === 'Pottery Workshop' || e.genre === 'Painting & Art')) ||
      (selectedCategory === 'Standup Comedy' && e.genre === 'Standup Comedy') ||
      (selectedCategory === 'Open-Air Cinema' && e.genre === 'Open-Air Cinema') ||
      (selectedCategory === 'Social & Dance' && e.genre === 'Dance Night');

    // Host match
    const hostMatch =
      hostFilter === 'All' ||
      (hostFilter === 'Exclusive' && e.isExclusive) ||
      (hostFilter === 'Partner' && !e.isExclusive);

    return categoryMatch && hostMatch;
  });

  const formatPrice = (event: EventItem) => {
    if (currency === 'INR') {
      return `₹${event.priceINR.toLocaleString('en-IN')}`;
    }
    return `$${event.priceUSD}`;
  };

  const categories = [
    { id: 'All', label: 'All Experiences & Workshops' },
    { id: 'Concerts & Jamming', label: '🎵 Concerts & Jamming' },
    { id: 'Pottery & Painting', label: '🎨 Pottery & Painting' },
    { id: 'Standup Comedy', label: '🎙️ Standup Comedy' },
    { id: 'Open-Air Cinema', label: '🎬 Open-Air Cinema' },
    { id: 'Social & Dance', label: '💃 Social Dance' },
  ];

  return (
    <section id="events" className="relative py-16 sm:py-20 lg:py-24 bg-[#0f201a] text-[#f4efe8] border-t border-[#1f3a2c] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-4xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
            <span>Curated Marketplace · Events & Creative Workshops</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4efe8] leading-tight">
            Less scrolling. <br />
            <span className="italic font-normal text-amber-300">
              More living.
            </span>
          </h2>

          <div className="mt-5 space-y-3 sm:space-y-4 text-[#a1b8ac] text-xs sm:text-base font-light leading-relaxed">
            <p className="text-amber-300 font-serif text-base sm:text-lg italic font-normal">
              "The best plans are often the ones you didn't know existed."
            </p>
            <p>
              A movie night under a sky full of stars. A jamming session where strangers become your kind of people. Shaping ceramic clay on a spinning wheel, painting canvases in an orchard, laughing until your cheeks hurt at standup comedy, or singing your heart out at a live concert.
            </p>
            <p className="text-xs sm:text-sm text-[#9cb0a4]">
              I-EXPLR is a verified marketplace uniting city culture creators and indie talent. Explore our in-house <strong className="text-amber-300 font-semibold">★ I-EXPLR Exclusive</strong> productions as well as verified partner community workshops.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-amber-300 font-mono">
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm">
              Your city is alive. Go be a part of it.
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm font-semibold">
              Find your scene. Feel the vibe. Make a night of it.
            </span>
          </div>
        </div>

        {/* Dual Filter Controls: Category Tabs & Host Filter Toggle */}
        <div className="space-y-4 mb-8 sm:mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md ring-2 ring-amber-400/30'
                    : 'bg-[#13261e] text-[#a1b8ac] hover:text-white border border-[#244335] hover:border-amber-500/40'
                }`}
              >
                {cat.label}
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
                All Events ({events.length})
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
                <span>★ I-EXPLR Exclusive ({events.filter(e => e.isExclusive).length})</span>
              </button>
              <button
                onClick={() => setHostFilter('Partner')}
                className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  hostFilter === 'Partner'
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'bg-[#0b1612] text-emerald-300 border border-emerald-500/30 hover:border-emerald-400'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>✓ Partner Verified ({events.filter(e => !e.isExclusive).length})</span>
              </button>
            </div>

            <div className="text-xs text-[#9cb0a4] font-mono">
              Showing <span className="text-[#f4efe8] font-semibold">{filteredEvents.length}</span> verified events
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-[#13261e] rounded-2xl border border-[#244335] p-8">
            <p className="text-sm text-[#9cb0a4]">No events currently match this filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setHostFilter('All'); }}
              className="mt-3 px-4 py-2 bg-amber-500 text-stone-950 font-semibold text-xs rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-[#13261e] rounded-2xl overflow-hidden border border-[#244335] hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl"
              >
                {/* Photo with Overlay & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#07130f]">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

                  {/* Top Badges: Host Origin & Passes Remaining */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    {event.isExclusive ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs shadow-md">
                        <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                        <span>★ I-EXPLR Exclusive</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/85 border border-emerald-400/50 backdrop-blur-md text-emerald-200 text-xs font-mono font-medium shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>✓ Partner Verified · {event.organizerName}</span>
                      </div>
                    )}

                    <div className="text-xs text-rose-200 font-mono bg-rose-950/85 border border-rose-500/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      {event.spotsLeft} passes left
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-mono">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-amber-300" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-300">
                      {event.genre}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date & Time */}
                    <div className="flex items-center gap-3 text-xs text-amber-400 font-mono font-bold mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f4efe8] group-hover:text-amber-300 transition-colors leading-snug">
                      {event.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-[#9cb0a4] leading-relaxed font-light">
                      {event.shortDescription}
                    </p>

                    {/* Vibe banner */}
                    <div className="mt-4 p-3 rounded-xl bg-[#0b1612] border border-[#244335] text-xs">
                      <span className="text-amber-400 font-mono font-bold">Night Vibe: </span>
                      <span className="text-[#e0e8e4]">{event.vibe}</span>
                    </div>

                    {/* Lineup items */}
                    <div className="mt-4 pt-3 border-t border-[#1f3a2c] space-y-1 text-xs text-[#9cb0a4]">
                      <div className="text-[11px] text-[#9cb0a4] font-mono uppercase tracking-wider font-semibold">Experience Highlights:</div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {event.lineup.map((l, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-[#1a382b] text-[#c2decb] text-[11px] border border-[#2d5843] font-medium">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Pass & RSVP */}
                  <div className="mt-6 pt-4 border-t border-[#1f3a2c] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#9cb0a4] font-mono">
                        {event.isExclusive ? 'I-EXPLR Production' : `Hosted by ${event.organizerName}`}
                      </div>
                      <div className="font-serif text-xl font-bold text-amber-400">
                        {formatPrice(event)}
                      </div>
                    </div>

                    <button
                      onClick={() => onBookEvent(event)}
                      className="min-h-[42px] px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Get Event Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Creator / Host Marketplace Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#13261e] via-[#173026] to-[#13261e] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Are You an Artist, Comedian, Studio or Event Host?</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f4efe8]">
              List Your Live Event or Workshop on the I-EXPLR Marketplace
            </h4>
            <p className="text-xs sm:text-sm text-[#9cb0a4] max-w-2xl font-light">
              Reach genuine explorers seeking intimate gigs, pottery studios, acoustic circles, and standup shows. Complete KYC verification (GST / registered license) for 100% fair pass payouts and zero hidden listing fees.
            </p>
          </div>

          <button
            onClick={onOpenPartner}
            className="shrink-0 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Apply as Event Partner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
