import React, { useState } from 'react';
import { Flame, Volume2, VolumeX, Sparkles, MessageCircle, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { REFERENCE_IMAGES, TRAVELER_STORIES } from '../data/mockData';

interface CampfireFeatureProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenStoryModal: () => void;
}

export const CampfireFeature: React.FC<CampfireFeatureProps> = ({
  isAudioPlaying,
  onToggleAudio,
  onOpenStoryModal,
}) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const currentStory = TRAVELER_STORIES[activeStoryIdx];

  const handlePrev = () => {
    setActiveStoryIdx((prev) => (prev === 0 ? TRAVELER_STORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStoryIdx((prev) => (prev === TRAVELER_STORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#0b1612] text-[#f4efe8] border-t border-[#1b3427] overflow-hidden">
      {/* Soft atmospheric background photograph */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={REFERENCE_IMAGES.nightCampingFire}
          alt="Nighttime forest camping with a glowing tent and crackling campfire under pine trees and stars"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] opacity-25 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1612] via-transparent to-[#0b1612]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1612]/90 via-[#0b1612]/40 to-[#0b1612]/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Philosophy & Ambient Fireside Audio */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Wilderness Evenings</span>
              <span aria-hidden="true">·</span>
              <span>The Campfire Circle</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#f4efe8] leading-tight">
              Where Journeys <br />
              <span className="italic font-normal text-amber-300">Find Their Meaning.</span>
            </h2>

            <p className="text-amber-200 text-sm sm:text-lg leading-relaxed font-light border-l-2 border-amber-500/60 pl-4 py-1 italic bg-[#13261e]/60 rounded-r-lg">
              "Travel is not just about reaching a destination. It is about the people you meet, experiences you share, stories you create, and memories you carry."
            </p>

            <p className="text-[#a1b8ac] text-sm leading-relaxed">
              When twilight settles over pine glades and mountain winds whisper through the canopy, explorers gather around glowing embers. Here, strangerhood dissolves into lifelong kinship.
            </p>

            {/* Interactive Campfire Sound Controls */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onToggleAudio}
                className={`flex items-center gap-3 px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md ${
                  isAudioPlaying
                    ? 'bg-amber-600 text-stone-950 hover:bg-amber-500 shadow-amber-600/20'
                    : 'bg-[#13261e] text-[#f4efe8] border border-[#244335] hover:border-amber-500 hover:bg-[#1a382b]'
                }`}
              >
                {isAudioPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 text-stone-950" />
                    <span>Mute Ambient Campfire</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Listen To Campfire Soundscape</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenStoryModal}
                className="px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#f4efe8] hover:text-amber-300 bg-[#13261e] border border-[#244335] hover:border-amber-500 shadow-sm transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Submit A Trail Story</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Fireside Story Quote Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#13261e] border border-[#244335] p-6 sm:p-8 rounded-2xl shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
                  Fireside Story #{activeStoryIdx + 1} of {TRAVELER_STORIES.length}
                </span>
                <div className="flex items-center gap-2 text-[#9cb0a4] text-xs">
                  <span>{currentStory.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentStory.date}</span>
                </div>
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl text-[#f4efe8] italic leading-snug mb-4">
                "{currentStory.quote}"
              </blockquote>

              <p className="text-[#c2d9cc] text-sm leading-relaxed mb-6 font-light">
                {currentStory.story}
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1f3a2c]">
                <div className="flex items-center gap-3">
                  <img
                    src={currentStory.avatar}
                    alt={currentStory.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/30 shadow-sm"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#f4efe8]">{currentStory.author}</div>
                    <div className="text-xs text-amber-400 font-medium">{currentStory.tripTitle}</div>
                  </div>
                </div>

                {/* Story Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded bg-[#0b1612] hover:bg-[#1a382b] border border-[#244335] text-stone-300 hover:text-white transition-colors shadow-xs"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded bg-[#0b1612] hover:bg-[#1a382b] border border-[#244335] text-stone-300 hover:text-white transition-colors shadow-xs"
                    aria-label="Next story"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
