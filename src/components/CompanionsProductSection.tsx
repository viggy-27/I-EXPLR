import React, { useState } from 'react';
import { Users, UserPlus, Calendar, MapPin, CheckCircle, Send, Plus, Coffee, Mountain, Music } from 'lucide-react';
import { CompanionTrip } from '../types';

interface CompanionsProductSectionProps {
  companions: CompanionTrip[];
  onRequestJoin: (trip: CompanionTrip) => void;
  onOpenCreateTrip: () => void;
}

export const CompanionsProductSection: React.FC<CompanionsProductSectionProps> = ({
  companions,
  onRequestJoin,
  onOpenCreateTrip,
}) => {
  const [selectedActivity, setSelectedActivity] = useState<string>('All');

  const filteredTrips = companions.filter((trip) => {
    if (selectedActivity === 'All') return true;
    return trip.category.toLowerCase().includes(selectedActivity.toLowerCase());
  });

  return (
    <section id="companions" className="relative py-16 sm:py-20 lg:py-24 bg-[#0b1612] text-[#f4efe8] border-t border-[#1b3427] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header - "Product Pillar" word removed */}
        <div className="max-w-4xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#fb923c] font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#fb923c]" />
            <span>Companions</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4efe8] leading-tight">
            Come for the experience. <br />
            <span className="italic font-normal text-amber-300">
              Leave with new connections.
            </span>
          </h2>

          <div className="mt-5 space-y-3 sm:space-y-4 text-[#a1b8ac] text-xs sm:text-base font-light leading-relaxed">
            <p className="text-amber-300 font-serif text-base sm:text-lg italic font-normal">
              "Sometimes, the best part of travelling isn't the place you visit, but the people you meet along the way."
            </p>
            <p>
              Maybe you're looking for someone to join you on a sunrise trek, a friend to explore a new city with, a companion for that long-awaited café visit, or simply someone who shares your kind of travel vibe. Whatever it is, you don't always have to do it alone.
            </p>
            <p>
              Companions is a space to meet people, find your kind of crowd, and turn shared interests into shared experiences. Connect with fellow travellers, discover people who enjoy the things you do, and make plans to explore, laugh, talk, and create memories together.
            </p>
            <p className="text-amber-300 font-mono text-xs sm:text-sm font-semibold">
              No bookings. No hidden agenda. No price tag on human connection. Just people meeting people, discovering common interests, and making life a little more interesting — one connection at a time.
            </p>
            <p className="text-xs sm:text-sm text-[#9cb0a4]">
              You might arrive as strangers, but who knows? You might leave as friends, travel buddies, or part of a story you'll tell for years.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-amber-300 font-mono">
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm">
              Find your people. Share your plans. Make memories together.
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#13261e] border border-[#244335] shadow-sm font-semibold">
              Because some journeys are better when you don't take them alone.
            </span>
          </div>
        </div>

        {/* Action Button & Filter Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'All', label: 'All Companions' },
              { id: 'Sunrise Trek', label: 'Sunrise Treks' },
              { id: 'Café Date', label: 'Café Visits & Food Crawls' },
              { id: 'Music', label: 'Events & Jam Sessions' },
              { id: 'Mountain', label: 'Alpine Expeditions' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedActivity(item.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl font-medium transition-colors shrink-0 text-xs ${
                  selectedActivity === item.id
                    ? 'bg-[#e07a5f] text-white font-semibold shadow-md'
                    : 'bg-[#13261e] text-[#a1b8ac] hover:text-white border border-[#244335] shadow-sm'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenCreateTrip}
            className="min-h-[42px] px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 self-start sm:self-auto active:scale-95"
          >
            <Plus className="w-4 h-4 text-stone-950" />
            <span>Post A Companion Plan</span>
          </button>
        </div>

        {/* Companions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-[#13261e] rounded-2xl border border-[#244335] hover:border-amber-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-2xl"
            >
              <div>
                {/* Host Profile Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={trip.avatar}
                      alt={trip.travelerName}
                      className="w-12 h-12 rounded-full object-cover border border-amber-600/40"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#f4efe8] text-sm">{trip.travelerName}</span>
                        {trip.verified && (
                          <span title="Identity Verified">
                            <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          </span>
                        )}
                        <span className="text-xs text-[#9cb0a4] font-mono">({trip.travelerAge}y)</span>
                      </div>
                      <div className="text-xs text-[#9cb0a4] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{trip.travelerLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-amber-400 font-mono font-bold">
                      {trip.spotsLeft} spots open
                    </div>
                    <div className="text-[10px] text-[#9cb0a4]">
                      {trip.confirmedCount} confirmed buddies
                    </div>
                  </div>
                </div>

                {/* Target Plan */}
                <div className="bg-[#0b1612] p-3.5 rounded-xl border border-[#244335] mb-4">
                  <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    Proposed Plan & Shared Experience
                  </div>
                  <div className="font-serif text-lg font-bold text-[#f4efe8] mt-0.5">
                    {trip.destination}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#9cb0a4] mt-2 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{trip.dates}</span>
                    </div>
                    <span aria-hidden="true" className="text-stone-600">·</span>
                    <span>Est. {trip.estimatedBudget}</span>
                  </div>
                </div>

                {/* Vibe Details */}
                <div className="space-y-2 text-xs text-[#c2d9cc] leading-relaxed mb-4 font-light">
                  <p>
                    <span className="text-[#f4efe8] font-semibold">What we'll do:</span> {trip.groupGoal}
                  </p>
                  <p>
                    <span className="text-[#f4efe8] font-semibold">Travel vibe:</span> {trip.travelStyle}
                  </p>
                  <p>
                    <span className="text-[#f4efe8] font-semibold">Looking for:</span> {trip.lookingFor}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#1f3a2c] flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-mono font-medium">
                  ✓ Free community connection
                </span>

                <button
                  onClick={() => onRequestJoin(trip)}
                  className="min-h-[40px] px-4 py-2 bg-[#1a382b] hover:bg-[#e07a5f] text-white border border-[#2d5843] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Connect & Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
