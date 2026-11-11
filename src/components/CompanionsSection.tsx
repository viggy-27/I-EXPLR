import React, { useState } from 'react';
import { Users, UserPlus, Calendar, MapPin, CheckCircle, Send, Sparkles, Plus } from 'lucide-react';
import { CompanionTrip, Category } from '../types';

interface CompanionsSectionProps {
  companions: CompanionTrip[];
  onRequestJoin: (trip: CompanionTrip) => void;
  onOpenCreateTrip: () => void;
}

export const CompanionsSection: React.FC<CompanionsSectionProps> = ({
  companions,
  onRequestJoin,
  onOpenCreateTrip,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredTrips = companions.filter((trip) => {
    const matchesSearch =
      searchFilter === '' ||
      trip.destination.toLowerCase().includes(searchFilter.toLowerCase()) ||
      trip.travelerName.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStyle =
      selectedStyle === 'All' ||
      trip.category.toLowerCase().includes(selectedStyle.toLowerCase());

    return matchesSearch && matchesStyle;
  });

  return (
    <section id="companions" className="py-24 bg-[#08120e] text-[#fbf9f5] border-t border-emerald-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold mb-3">
              Travel Tribe & Co-Explorers
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Find Your Companions
            </h2>
            <p className="mt-3 text-stone-300/80 text-sm sm:text-base max-w-xl font-light">
              Don’t let a lack of travel buddies keep you indoors. Connect with vetted adventurers planning trips across high passes and hidden hamlets.
            </p>
          </div>

          <button
            onClick={onOpenCreateTrip}
            className="px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-950/40 flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4 text-stone-950" />
            <span>Post An Expedition</span>
          </button>
        </div>

        {/* Filter Sub-Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <input
            type="text"
            placeholder="Search by companion name or destination..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-[#0d1d16] rounded-lg border border-emerald-800/40 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-amber-500/60"
          />

          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 sm:pb-0">
            {['All', 'Mountain Adventures', 'Road Trips', 'Water Adventures', 'Cultural Experiences'].map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-3 py-2 rounded text-xs transition-colors shrink-0 ${
                  selectedStyle === style
                    ? 'bg-amber-600 text-stone-950 font-semibold'
                    : 'bg-[#0d1d16] text-stone-300 hover:text-white border border-emerald-900/40'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Companions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-[#0e2119] rounded-xl border border-emerald-900/50 hover:border-amber-600/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
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
                        <span className="font-semibold text-white text-sm">{trip.travelerName}</span>
                        {trip.verified && (
                          <span title="Identity Verified">
                            <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          </span>
                        )}
                        <span className="text-xs text-stone-400">({trip.travelerAge}y)</span>
                      </div>
                      <div className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-stone-500" />
                        <span>{trip.travelerLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-amber-400 font-mono font-medium">
                      {trip.spotsLeft} spots open
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {trip.confirmedCount} already confirmed
                    </div>
                  </div>
                </div>

                {/* Target Destination & Date Line */}
                <div className="bg-[#081510] p-3.5 rounded-lg border border-emerald-950 mb-4">
                  <div className="text-[11px] uppercase tracking-wider text-amber-500/90 font-medium">
                    Target Expedition
                  </div>
                  <div className="font-serif text-lg font-bold text-white mt-0.5">
                    {trip.destination}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-300 mt-2 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{trip.dates}</span>
                    </div>
                    <span aria-hidden="true" className="text-stone-600">·</span>
                    <span>Est. {trip.estimatedBudget}</span>
                  </div>
                </div>

                {/* Goal & Style */}
                <div className="space-y-2 text-xs text-stone-300/90 leading-relaxed mb-4">
                  <p>
                    <span className="text-amber-300/80 font-medium">Trip Vibe:</span> {trip.groupGoal}
                  </p>
                  <p>
                    <span className="text-amber-300/80 font-medium">Travel Style:</span> {trip.travelStyle}
                  </p>
                  <p>
                    <span className="text-amber-300/80 font-medium">Looking For:</span> {trip.lookingFor}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-emerald-950 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-mono">
                  Verified Trip Leader
                </span>

                <button
                  onClick={() => onRequestJoin(trip)}
                  className="px-4 py-2 bg-[#173327] hover:bg-amber-600 hover:text-stone-950 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request To Join</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
