import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Gauge, ArrowRight, Heart, Filter, X, Sparkles } from 'lucide-react';
import { Destination, Category, Difficulty } from '../types';

interface ExploreSectionProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  currency: 'INR' | 'USD';
  savedIds: string[];
  onToggleSave: (id: string) => void;
  initialCategory?: Category | '';
  initialSearch?: string;
}

const ALL_CATEGORIES: Category[] = [
  'Mountain Adventures',
  'Trekking',
  'Camping',
  'Road Trips',
  'Water Adventures',
  'Nature Escapes',
  'Cultural Experiences',
  'Weekend Getaways',
  'Offbeat Destinations',
];

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  destinations,
  onSelectDestination,
  currency,
  savedIds,
  onToggleSave,
  initialCategory = '',
  initialSearch = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(
    initialCategory || 'All'
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'duration'>('featured');

  // Sync if initial props change
  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialSearch]);

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;

        const matchesQuery =
          searchQuery.trim() === '' ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.stateOrCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDifficulty =
          selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;

        return matchesCategory && matchesQuery && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') {
          return (currency === 'INR' ? a.priceINR : a.priceUSD) - (currency === 'INR' ? b.priceINR : b.priceUSD);
        }
        if (sortBy === 'priceDesc') {
          return (currency === 'INR' ? b.priceINR : b.priceUSD) - (currency === 'INR' ? a.priceINR : a.priceUSD);
        }
        if (sortBy === 'duration') {
          return parseInt(a.duration) - parseInt(b.duration);
        }
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [destinations, selectedCategory, searchQuery, selectedDifficulty, sortBy, currency]);

  const formatPrice = (item: Destination) => {
    if (currency === 'INR') {
      return `₹${item.priceINR.toLocaleString('en-IN')}`;
    }
    return `$${item.priceUSD}`;
  };

  return (
    <section id="explore" className="py-16 sm:py-20 lg:py-24 bg-[#0f201a] text-[#f4efe8] border-t border-[#1f3a2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Natural Editorial Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-bold mb-3">
              Curated Expeditions
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4efe8]">
              Discover Your Next Adventure
            </h2>
            <p className="mt-2.5 sm:mt-3 text-[#9cb0a4] text-xs sm:text-base max-w-xl font-light">
              From alpine passes to sacred forest reserves, explore verified expeditions led by local custodians.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#9cb0a4] font-mono">
            <span>Showing {filteredDestinations.length} of {destinations.length} journeys</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          {/* Search & Difficulty / Sort Sub-row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-[#13261e] rounded-lg border border-[#244335] focus-within:border-emerald-500 shadow-xs transition-colors">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by state, mountain, or trail name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-[#f4efe8] placeholder:text-[#8ea699] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-stone-400 hover:text-stone-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#13261e] rounded-lg border border-[#244335] shadow-xs">
              <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'All')}
                className="bg-transparent text-xs text-[#f4efe8] focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#13261e] text-[#f4efe8]">All Difficulties</option>
                <option value="Easy" className="bg-[#13261e] text-[#f4efe8]">Easy (Gentle trails)</option>
                <option value="Moderate" className="bg-[#13261e] text-[#f4efe8]">Moderate (Weekend active)</option>
                <option value="Challenging" className="bg-[#13261e] text-[#f4efe8]">Challenging (High passes)</option>
                <option value="Demanding" className="bg-[#13261e] text-[#f4efe8]">Demanding (Expedition grade)</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#13261e] rounded-lg border border-[#244335] shadow-xs">
              <span className="text-xs text-[#9cb0a4] font-mono">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-[#f4efe8] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#13261e] text-[#f4efe8]">Featured & Certified</option>
                <option value="priceAsc" className="bg-[#13261e] text-[#f4efe8]">Price: Low to High</option>
                <option value="priceDesc" className="bg-[#13261e] text-[#f4efe8]">Price: High to Low</option>
                <option value="duration" className="bg-[#13261e] text-[#f4efe8]">Duration</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-[#13261e] text-[#a1b8ac] hover:text-white hover:bg-[#1a382b] border border-[#244335] shadow-xs'
              }`}
            >
              All Categories
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-[#13261e] text-[#a1b8ac] hover:text-white hover:bg-[#1a382b] border border-[#244335] shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-[#13261e] rounded-2xl border border-[#244335] shadow-sm">
            <p className="font-serif text-xl text-[#f4efe8]">No expeditions found matching your filters.</p>
            <p className="text-xs text-[#9cb0a4] mt-2">Try clearing your search query or selecting "All Categories".</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedDifficulty('All');
              }}
              className="mt-5 px-4 py-2 bg-[#1a382b] hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#2d5843] transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => {
              const isSaved = savedIds.includes(destination.id);

              return (
                <div
                  key={destination.id}
                  className="group bg-[#13261e] rounded-2xl overflow-hidden border border-[#244335] hover:border-emerald-500/60 transition-all duration-300 flex flex-col hover:shadow-2xl shadow-md"
                >
                  {/* Card Visual / Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#07130f]">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Bookmark Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(destination.id);
                      }}
                      title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white shadow-sm backdrop-blur-xs transition-colors z-10"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isSaved ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Body with Zero-Pill Typographic Metadata */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Metadata Kicker */}
                      <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2">
                        <span>{destination.category}</span>
                        <span aria-hidden="true" className="text-stone-600">·</span>
                        <span className="text-[#9cb0a4]">{destination.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl font-bold text-[#f4efe8] group-hover:text-emerald-300 transition-colors leading-snug">
                        {destination.title}
                      </h3>

                      {/* Short Description */}
                      <p className="mt-2.5 text-xs text-[#9cb0a4] line-clamp-2 leading-relaxed">
                        {destination.shortDescription}
                      </p>

                      {/* Technical Spec Line: Duration & Difficulty with separators */}
                      <div className="mt-4 pt-3 border-t border-[#1f3a2c] flex items-center gap-3 text-xs text-[#9cb0a4]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{destination.duration}</span>
                        </div>
                        {destination.difficulty && (
                          <>
                            <span aria-hidden="true" className="text-stone-600">·</span>
                            <div className="flex items-center gap-1.5">
                              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{destination.difficulty}</span>
                            </div>
                          </>
                        )}
                        <span aria-hidden="true" className="text-stone-600">·</span>
                        <span className="font-medium text-[#c2d9cc]">★ {destination.rating} ({destination.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Footer: Price & Explore Details Button */}
                    <div className="mt-6 pt-4 border-t border-[#1f3a2c] flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#9cb0a4]">Starting from</div>
                        <div className="font-serif text-lg font-bold text-amber-400">
                          {formatPrice(destination)}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectDestination(destination)}
                        className="px-4 py-2 bg-[#1a382b] hover:bg-emerald-800 text-white border border-[#2d5843] text-xs font-semibold tracking-wider uppercase rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Explore Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
