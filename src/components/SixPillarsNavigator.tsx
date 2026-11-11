import React from 'react';
import { PillarId } from '../types';

interface SixPillarsNavigatorProps {
  activePillar: PillarId;
  onSelectPillar: (pillar: PillarId) => void;
}

export const SixPillarsNavigator: React.FC<SixPillarsNavigatorProps> = ({
  activePillar,
  onSelectPillar,
}) => {
  const pillars: Array<{
    id: PillarId;
    label: string;
    dotColor: string;
    tagline: string;
  }> = [
    {
      id: 'local-experiences',
      label: 'Local Experiences',
      dotColor: 'bg-[#e07a5f]', // Terracotta / rust
      tagline: 'Village kitchens, tea mists & living traditions',
    },
    {
      id: 'weekend-treks',
      label: 'Weekend/Weekday Treks',
      dotColor: 'bg-[#4ade80]', // Forest green
      tagline: 'Sunrise trails, Benne Dosa & campfire music',
    },
    {
      id: 'local-guides',
      label: 'Local Guides',
      dotColor: 'bg-[#f59e0b]', // Warm amber
      tagline: 'Beyond Google Maps & no-network navigation',
    },
    {
      id: 'events',
      label: 'Events',
      dotColor: 'bg-[#fbbf24]', // Golden yellow
      tagline: 'Starlit cinema, acoustic circles & comedy',
    },
    {
      id: 'companions',
      label: 'Companions',
      dotColor: 'bg-[#fb923c]', // Warm orange
      tagline: 'Find your people. Turn strangers into stories',
    },
    {
      id: 'plan-with-ai',
      label: 'Plan with Saki (AI)',
      dotColor: 'bg-[#34d399]', // Deep emerald
      tagline: 'Soulful custom itineraries co-created with Saki, our AI bot',
    },
  ];

  return (
    <section className="py-10 bg-[#0e2018] text-[#f4efe8] border-y border-[#1f3d2f] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with uniform nature dark theme */}
        <div className="mb-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#f4efe8]">
            Six ways into I-EXPLR
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#9cb0a4] max-w-3xl leading-relaxed font-light">
            Every pillar is a different door into the same idea — exploration is better shared. Jump to the one that speaks to you.
          </p>
        </div>

        {/* The 6 Pills with nature theme and colored indicator dots */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {pillars.map((pillar) => {
            const isActive = activePillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => onSelectPillar(pillar.id)}
                className={`group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full border text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1e4a35] text-white border-emerald-400/60 shadow-lg ring-2 ring-emerald-500/20'
                    : 'bg-[#13261e] text-[#c2d9cc] border-[#244335] hover:border-amber-500/60 hover:text-white hover:bg-[#183428] shadow-sm'
                }`}
              >
                {/* Dot matching the pillar colors */}
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform ${pillar.dotColor} ${
                    isActive ? 'scale-125 ring-2 ring-white/50' : 'group-hover:scale-110'
                  }`}
                />
                <span className="font-semibold tracking-tight whitespace-nowrap">
                  {pillar.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
