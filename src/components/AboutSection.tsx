import React, { useState } from 'react';
import { Compass, Flame, Heart, MapPin, Quote, Sparkles, X } from 'lucide-react';
import { USER_ASSETS } from '../data/mockData';

interface TravelerStoryCard {
  id: string;
  name: string;
  location: string;
  city: string;
  avatar: string;
  image: string;
  quote: string;
  story: string;
  trip: string;
}

const TRAVELLER_STORIES: TravelerStoryCard[] = [
  {
    id: 'ts-1',
    name: 'Devika & Siddharth',
    city: 'Pune',
    location: 'Tirthan Valley Wilderness',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    image: USER_ASSETS.sunsetCampfireFriends, // P6
    quote: 'We stepped outside our cubicles and found ourselves sharing silent awe as sparks floated into the sunset.',
    story: 'Sitting beside that crackling fire with an acoustic guitar while the sun dipped behind the mountain ridges completely rewired our definition of vacation. We weren’t just tourists; we were part of a sanctuary.',
    trip: 'Wilderness Sunset Camp',
  },
  {
    id: 'ts-2',
    name: 'Maya Sen',
    city: 'Mumbai',
    location: 'Lockhart Gap, Munnar',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    image: USER_ASSETS.munnarTeaPlucking, // P2
    quote: 'Picking tea leaves on a misty winter morning in Munnar and brewing our very own cup — pure grounding magic.',
    story: 'Walking shoulder-to-shoulder with estate tea pluckers on the dewy green slopes taught me patience. Drinking a hot cup crafted from leaves I plucked an hour ago overlooking infinite green was unforgettable.',
    trip: 'Artisan Tea Harvesting & Cupping',
  },
  {
    id: 'ts-3',
    name: 'Aarav Mehta & Friends',
    city: 'Bengaluru',
    location: 'The Orchard Meadow, Hessarghatta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    image: USER_ASSETS.cinemaUnderStars, // P4
    quote: 'A movie night under a sky full of stars. Blankets, fairy lights, and strangers becoming friends.',
    story: 'Trade cramped multiplexes for open starry skies. Lounging on cushions on the grass with gourmet sourdough pizza and headphones under the trees was the most magical Friday night we’ve had this year.',
    trip: 'Cinema Under the Stars',
  },
  {
    id: 'ts-4',
    name: 'Raghav & Elena',
    city: 'Delhi & Berlin',
    location: 'Village Kavu, Kannur',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    image: USER_ASSETS.theyyamRitual, // P3
    quote: 'Feeling the wild, divine energy of Theyyam in Kannur as ancient traditions come alive before your eyes.',
    story: 'No tourist stage. Just the raw, hypnotic rhythm of Chenda percussion and the fiery deity dancing over glowing embers in an ancient village shrine grove under the banyan canopy.',
    trip: 'Sacred Theyyam Ritual Immersion',
  },
  {
    id: 'ts-5',
    name: 'Zameer & Friends',
    city: 'Srinagar / Mumbai',
    location: 'Wuyan Village, Kashmir',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    image: USER_ASSETS.kashmiriBiryani, // P1
    quote: 'Cooking a pot of Kashmiri dum biryani with a local family in a quiet village turned an ordinary day into a memory.',
    story: 'Sitting in Zarina’s kitchen crushing fresh saffron and watching wood smoke rise from copper degchis slow-cooked over burning pine embers felt like stepping back in time.',
    trip: 'Kashmiri Village Dum Cooking',
  },
  {
    id: 'ts-6',
    name: 'Rohan, Kabir & Choir',
    city: 'Bengaluru',
    location: 'Rustic Barn & Campfire Lawn',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop',
    image: USER_ASSETS.embersAcousticJam, // P5
    quote: 'A jamming session where strangers become your kind of people. Singing under warm string lights.',
    story: 'I brought an acoustic guitar and zero expectations. Within twenty minutes, forty strangers were singing indie folk harmonies together under the gazebo lights. Less scrolling, more living.',
    trip: 'The Embers Acoustic Circle',
  },
];

export const AboutSection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<TravelerStoryCard | null>(null);

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...TRAVELLER_STORIES, ...TRAVELLER_STORIES];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-[#0b1612] text-[#f4efe8] border-t border-[#1b3427] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#e07a5f] font-bold mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Traveller Chronicles</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4efe8] leading-tight">
            Stories That Live Long <br />
            <span className="italic font-normal text-amber-300">
              After The Journey Ends.
            </span>
          </h2>

          <p className="mt-4 text-[#a1b8ac] text-xs sm:text-base font-light leading-relaxed">
            "Travel is not just about reaching a destination. It is about the people you meet, experiences you share, stories you create, and memories you carry."
          </p>
        </div>
      </div>

      {/* CONTINUOUS MARQUEE SLIDING FROM RIGHT TO LEFT */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Edge Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0b1612] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0b1612] to-transparent z-10 pointer-events-none" />

        <div className="animate-slide-left flex gap-6 px-4">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedStory(item)}
              className="w-[320px] sm:w-[380px] bg-[#13261e] rounded-3xl overflow-hidden border border-[#244335] hover:border-amber-500 transition-all duration-300 shrink-0 cursor-pointer group shadow-md hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#07130f]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Location Badge */}
                <div className="absolute bottom-3 left-3 text-[11px] text-white font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Quote className="w-5 h-5 text-amber-400/70 mb-2" />
                  <blockquote className="font-serif text-base text-[#f4efe8] italic leading-snug line-clamp-2 font-medium">
                    "{item.quote}"
                  </blockquote>

                  <p className="mt-2.5 text-xs text-[#9cb0a4] line-clamp-3 leading-relaxed font-light">
                    {item.story}
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-4 pt-3 border-t border-[#1f3a2c] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#f4efe8]">{item.name}</div>
                      <div className="text-[10px] text-[#9cb0a4]">{item.city}</div>
                    </div>
                  </div>

                  <span className="text-[10px] text-amber-400 font-mono font-bold">
                    {item.trip}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Detail Modal when a card is clicked */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#13261e] border border-[#244335] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative text-[#f4efe8]">
            <div className="relative aspect-[16/9]">
              <img
                src={selectedStory.image}
                alt={selectedStory.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-xs text-amber-300 font-mono font-semibold">{selectedStory.location}</span>
                <h3 className="font-serif text-2xl font-bold text-white drop-shadow-md">{selectedStory.trip}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <blockquote className="font-serif text-xl text-amber-300 italic leading-snug">
                "{selectedStory.quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-[#c2d9cc] leading-relaxed font-light">
                {selectedStory.story}
              </p>

              <div className="pt-4 border-t border-[#1f3a2c] flex items-center gap-3">
                <img
                  src={selectedStory.avatar}
                  alt={selectedStory.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <div className="text-sm font-bold text-[#f4efe8]">{selectedStory.name}</div>
                  <div className="text-xs text-[#9cb0a4]">{selectedStory.city} · I-EXPLR Explorer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
