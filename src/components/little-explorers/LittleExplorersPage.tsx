import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  GraduationCap, 
  Heart, 
  TreePine, 
  Award, 
  Apple, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  ExternalLink,
  PhoneCall,
  Mail,
  Camera,
  Layers
} from 'lucide-react';
import { 
  LITTLE_EXPLORER_EXPERIENCES, 
  WHY_LITTLE_EXPLORERS_PILLARS, 
  SAFETY_PROTOCOLS, 
  GALLERY_PHOTOS, 
  SCHOOL_OUTINGS_BENEFITS, 
  FAMILY_PACKAGES,
  LittleExplorerExperience,
  GalleryPhoto
} from '../../data/littleExplorersData';
import { LittleExplorersDetailModal } from './LittleExplorersDetailModal';
import { LittleExplorersBookingModal } from './LittleExplorersBookingModal';
import { SchoolEnquiryModal } from './SchoolEnquiryModal';
import { GalleryLightboxModal } from './GalleryLightboxModal';

interface LittleExplorersPageProps {
  onBackToMain: () => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const LittleExplorersPage: React.FC<LittleExplorersPageProps> = ({
  onBackToMain,
  onShowToast,
}) => {
  // Modal states
  const [selectedDetailExp, setSelectedDetailExp] = useState<LittleExplorerExperience | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedBookingExp, setPreselectedBookingExp] = useState<LittleExplorerExperience | null>(null);
  const [schoolModalOpen, setSchoolModalOpen] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('all');
  const [galleryCategory, setGalleryCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'All Adventures' },
    { id: 'farming', label: '🌱 Farm & Soil' },
    { id: 'culinary', label: '👨‍🍳 Junior Masterchef' },
    { id: 'detective', label: '🔍 Forest Detectives' },
    { id: 'artisan', label: '🏺 Pottery & Crafts' },
    { id: 'culture', label: '🌾 Living Heritage' },
    { id: 'nature', label: '🦋 Wild Biology' },
  ];

  const filteredExperiences = LITTLE_EXPLORER_EXPERIENCES.filter((exp) => {
    const matchesCat = selectedCategory === 'all' || exp.category === selectedCategory;
    return matchesCat;
  });

  const filteredGallery = GALLERY_PHOTOS.filter((photo) => {
    if (galleryCategory === 'all') return true;
    return photo.category.toLowerCase() === galleryCategory.toLowerCase();
  });

  const handleOpenBooking = (exp?: LittleExplorerExperience) => {
    setPreselectedBookingExp(exp || null);
    setBookingModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1612] text-[#f4efe8] font-sans selection:bg-amber-500/30 selection:text-white">
      {/* ============================================================== */}
      {/* 1. TOP CO-BRANDING BAR & HEADER NAVIGATION                     */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#0b1612]/95 backdrop-blur-md border-b border-[#1c382a] py-3.5 transition-all shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo Cluster */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToMain}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#13281f] hover:bg-[#1a382b] border border-[#234535] text-stone-300 hover:text-white text-xs font-semibold transition-all group"
                title="Return to I-EXPLR Expeditions"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-amber-400" />
                <span className="hidden sm:inline">I-EXPLR Main</span>
              </button>

              <div className="h-5 w-[1px] bg-[#244534] hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 via-amber-500 to-amber-400 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-500/20">
                  <TreePine className="w-4 h-4 text-stone-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg sm:text-xl font-black text-white tracking-wide uppercase leading-none">
                      LITTLE EXPLORERS
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-900/70 border border-emerald-600/50 text-emerald-300">
                      by I-EXPLR
                    </span>
                  </div>
                  <span className="text-[10px] tracking-wider text-amber-400 font-bold hidden md:block">
                    Little Hands. Big Discoveries.
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs uppercase font-semibold tracking-wider text-[#b8cfc3]">
              <button onClick={() => scrollToSection('experiences')} className="hover:text-amber-400 transition-colors">
                Experiences
              </button>
              <button onClick={() => scrollToSection('why-us')} className="hover:text-amber-400 transition-colors">
                Why Us
              </button>
              <button onClick={() => scrollToSection('schools')} className="hover:text-amber-400 transition-colors">
                School Outings
              </button>
              <button onClick={() => scrollToSection('families')} className="hover:text-amber-400 transition-colors">
                Families
              </button>
              <button onClick={() => scrollToSection('safety')} className="hover:text-amber-400 transition-colors">
                Safety & Care
              </button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-amber-400 transition-colors">
                Moments
              </button>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSchoolModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#132b20] hover:bg-[#1a382b] text-emerald-300 border border-emerald-600/40 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>For Schools</span>
              </button>

              <button
                onClick={() => handleOpenBooking()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                <span>Book Pass</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6">
        {/* Background Visual Canvas with Warm Organic Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=1920&auto=format&fit=crop"
            alt="Little Explorers in outdoor wilderness"
            className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1612] via-[#0b1612]/75 to-[#0b1612]/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#152e22]/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>LITTLE EXPLORERS BY I-EXPLR</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Little Hands.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400">
              Big Discoveries.
            </span>
          </h1>

          {/* Supporting Tagline */}
          <p className="text-lg sm:text-2xl font-serif italic text-amber-200/90 font-medium">
            "Learn by Doing. Explore by Experiencing. Grow by Discovering."
          </p>

          {/* Descriptive Narrative */}
          <p className="text-sm sm:text-base md:text-lg text-[#cad8cf] max-w-2xl mx-auto font-light leading-relaxed">
            Where screen time dissolves into rich dark soil, wood-fired kitchen hearths, pottery wheels, and secret forest detective trails. Thoughtfully curated hands-on adventures for children aged 4 to 15, led by passionate naturalists, master artisans, and certified educators.
          </p>

          {/* 3 CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-xl mx-auto">
            <button
              onClick={() => scrollToSection('experiences')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Explore Experiences</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSchoolModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#142e22] hover:bg-[#1a382b] text-emerald-300 border border-emerald-500/50 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Plan a School Outing</span>
            </button>

            <button
              onClick={() => scrollToSection('discovery')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700/80 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Discover Our Adventures
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#0d1f17]/90 border border-[#1f3f2f] rounded-2xl p-4 backdrop-blur-md">
              <div className="text-center p-2">
                <span className="text-xl sm:text-2xl font-serif font-black text-amber-400 block">100%</span>
                <span className="text-[11px] text-[#a5bdad] uppercase font-semibold">Screen-Free Wonder</span>
              </div>
              <div className="text-center p-2 border-l border-[#1f3f2f]">
                <span className="text-xl sm:text-2xl font-serif font-black text-emerald-400 block">1 : 5</span>
                <span className="text-[11px] text-[#a5bdad] uppercase font-semibold">Staff-to-Child Care</span>
              </div>
              <div className="text-center p-2 border-l border-[#1f3f2f]">
                <span className="text-xl sm:text-2xl font-serif font-black text-amber-400 block">4,800+</span>
                <span className="text-[11px] text-[#a5bdad] uppercase font-semibold">Happy Young Explorers</span>
              </div>
              <div className="text-center p-2 border-l border-[#1f3f2f]">
                <span className="text-xl sm:text-2xl font-serif font-black text-emerald-400 block">100%</span>
                <span className="text-[11px] text-[#a5bdad] uppercase font-semibold">Certified & Vetted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. 6 EXCLUSIVE EXPERIENCE CATEGORIES (THE HEART OF THE PROGRAM) */}
      {/* ============================================================== */}
      <section id="experiences" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Curated Childhood Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Six Doors to Wonder
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            Every experience is engineered from the ground up to give children authentic mastery, deep connection with the natural world, and joyful tactile memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LITTLE_EXPLORER_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#0f231a] border border-[#1f3f2f] hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-56 w-full overflow-hidden shrink-0">
                <img
                  src={exp.heroImage}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f231a] via-[#0f231a]/30 to-transparent" />

                {/* Badge & Age */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 font-sans shadow-md">
                    {exp.badge}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-900/80 border border-stone-700 text-stone-200 backdrop-blur-sm">
                    {exp.ageSuitability}
                  </span>
                </div>

                {/* Duration Tag */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 mb-1 font-medium">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{exp.location}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium italic mt-1">
                    "{exp.tagline}"
                  </p>
                  <p className="text-xs text-stone-300 mt-2.5 line-clamp-3 leading-relaxed">
                    {exp.overview}
                  </p>
                </div>

                {/* 3 Bullet Activity Highlights */}
                <div className="space-y-1.5 pt-2 border-t border-[#1b3829]">
                  {exp.activities.slice(0, 3).map((act, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-300 leading-tight">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="truncate">{act}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Action Row */}
                <div className="pt-4 border-t border-[#1b3829] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">Pass</span>
                    <div className="text-lg font-serif font-bold text-amber-400">
                      ₹{exp.pricePerChild.toLocaleString('en-IN')}
                      <span className="text-[11px] font-sans font-normal text-stone-400"> / child</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDetailExp(exp)}
                      className="px-3 py-2 rounded-xl border border-[#234b36] hover:border-amber-400 text-stone-200 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleOpenBooking(exp)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. EXPERIENCE DISCOVERY FILTER SECTION                         */}
      {/* ============================================================== */}
      <section id="discovery" className="py-16 bg-[#09150f] border-y border-[#183626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Curated Program Filter
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Choose Your Little Adventure
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                      : 'bg-[#11241a] text-stone-300 hover:bg-[#183627] border border-[#1f3f2e]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filtered Summary Count */}
          <div className="text-xs text-stone-400 mb-6">
            Showing <span className="text-amber-400 font-semibold">{filteredExperiences.length}</span> curated experiential learning adventures
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setSelectedDetailExp(exp)}
                className="cursor-pointer bg-[#0f2118] border border-[#1c3a2a] hover:border-amber-400/60 rounded-2xl p-5 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/40 font-mono">
                      {exp.ageSuitability}
                    </span>
                    <span className="text-xs font-serif font-bold text-amber-400">
                      ₹{exp.pricePerChild}
                    </span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {exp.title}
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                    {exp.overview}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#183424] flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> {exp.duration}
                  </span>
                  <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    View Syllabus <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. WHY LITTLE EXPLORERS?                                       */}
      {/* ============================================================== */}
      <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            The Philosophy of Growth
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Because Learning Should Be an Adventure
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            We believe childhood is not a race to accumulate certificates, but a sacred window to build curiosity, courage, and a deep lifelong bond with nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_LITTLE_EXPLORERS_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#0f231a] border border-[#1f3f2f] rounded-2xl p-6 relative hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  {idx === 0 && <TreePine className="w-6 h-6" />}
                  {idx === 1 && <ShieldCheck className="w-6 h-6" />}
                  {idx === 2 && <Award className="w-6 h-6" />}
                  {idx === 3 && <Sparkles className="w-6 h-6" />}
                  {idx === 4 && <Apple className="w-6 h-6" />}
                  {idx === 5 && <Heart className="w-6 h-6" />}
                </div>

                <div className="text-[11px] font-mono uppercase text-emerald-400 font-semibold mb-1">
                  {pillar.highlight}
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1b3829] flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero compromise on safety & joy</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. SCHOOL OUTINGS & GROUP EXPERIENCES                           */}
      {/* ============================================================== */}
      <section id="schools" className="py-20 bg-gradient-to-b from-[#09150f] via-[#0f231a] to-[#09150f] border-y border-[#1c3a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>School & Institutional Journeys</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                Take Learning Beyond the Classroom.
              </h2>

              <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
                Textbooks teach that seeds need water; our farm lets children bury their hands in cool compost and witness earthworms aerate the soil. We partner with forward-thinking ICSE, CBSE, IB, and Cambridge schools to deliver transformative, curriculum-mapped outdoor learning expeditions.
              </p>

              {/* 4 School Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {SCHOOL_OUTINGS_BENEFITS.map((b, i) => (
                  <div key={i} className="bg-[#11271e] border border-[#204331] rounded-xl p-4">
                    <h4 className="text-xs font-bold text-amber-300 font-serif uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-stone-300 leading-snug">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={() => setSchoolModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Plan a School Outing</span>
                </button>

                <div className="text-xs text-stone-400 flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>Institutional Desk: +91 80 4920 1800</span>
                </div>
              </div>
            </div>

            {/* Right Interactive School Card Preview */}
            <div className="lg:col-span-5">
              <div className="bg-[#11241a] border border-[#234b36] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />

                <div className="flex items-center justify-between border-b border-[#1f3f2e] pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                      INSTITUTIONAL DOSSIER
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white">
                      Field Expedition Package
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    20 – 200 Students
                  </span>
                </div>

                <div className="space-y-3 text-xs text-stone-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Breakout Cohorts (Max 15 students per zone)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Complete Pre-Trip Risk Assessment & Teacher Pre-Visit</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>GPS-Tracked Coach Pickups from Campus</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Student Workbooks & Certificate of Environmental Stewardship</span>
                  </div>
                </div>

                <div className="bg-[#09150f] rounded-2xl p-4 border border-[#1b3828] text-xs">
                  <span className="text-stone-400 block mb-1">Trusted By Leading Schools:</span>
                  <p className="text-stone-200 font-serif italic text-sm">
                    "The Little Farmers program completely transformed how our Grade 4 students understand ecology. Safe, pristine, and flawlessly coordinated."
                  </p>
                  <span className="text-[11px] text-amber-400 font-semibold block mt-1.5">
                    — Academic Head, Oakridge Community School
                  </span>
                </div>

                <button
                  onClick={() => setSchoolModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-[#1a382a] hover:bg-[#224836] text-emerald-200 hover:text-white border border-emerald-600/40 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Request School Information Pack
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. PARENT AND FAMILY EXPERIENCES                                */}
      {/* ============================================================== */}
      <section id="families" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Bonding Across Generations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Make Weekends More Wonderful
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            Replace chaotic indoor malls with open skies, wood-fired hearths, and shared family laughter. Explore together as parent and child.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FAMILY_PACKAGES.map((pkg, i) => (
            <div
              key={i}
              className="bg-[#0f231a] border border-[#1f3f2f] rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-xl group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {pkg.badge}
                  </span>
                  <span className="text-xs text-stone-400">{pkg.duration}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {pkg.title}
                </h3>
                <span className="text-xs text-emerald-400 font-medium block mt-1">
                  Ideal for: {pkg.idealFor}
                </span>

                <p className="text-xs text-stone-300 mt-3 font-light leading-relaxed">
                  {pkg.description}
                </p>

                <div className="space-y-1.5 pt-4 mt-4 border-t border-[#1b3829]">
                  {pkg.includes.map((inc, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1b3829] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block font-semibold">Package</span>
                  <span className="text-base font-serif font-bold text-amber-400">{pkg.price}</span>
                </div>

                <button
                  onClick={() => handleOpenBooking()}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. SAFETY AND TRUST                                            */}
      {/* ============================================================== */}
      <section id="safety" className="py-20 bg-[#09150f] border-y border-[#183626]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Uncompromising Protection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Every Adventure, Thoughtfully Guided
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              We care for your children as if they were our own. Learn about our multi-layered safety protocols, certified personnel, and private secure venues.
            </p>
          </div>

          {/* Accordion List of Safety Protocols */}
          <div className="space-y-3">
            {SAFETY_PROTOCOLS.map((proto, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0f2118] border border-[#1d3d2c] rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-stone-100 hover:text-amber-300 transition-colors"
                  >
                    <span className="flex items-center gap-3 text-sm sm:text-base">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      {proto.title}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 font-light leading-relaxed border-t border-[#183626] animate-in fade-in duration-200">
                      {proto.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Safety Hotline Callout */}
          <div className="mt-10 bg-[#12271d] border border-[#214a34] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-serif font-bold text-white">Have specific safety or allergy questions?</h4>
                <p className="text-xs text-stone-400">Speak directly with our Chief Safety & Experience Officer.</p>
              </div>
            </div>
            <a
              href="tel:+918049201800"
              className="px-5 py-2.5 rounded-xl bg-[#193a2b] hover:bg-[#224e39] text-amber-300 text-xs font-bold uppercase tracking-wider border border-[#2b5e43] transition-colors"
            >
              Call Safety Desk
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. GALLERY: LITTLE MOMENTS, BIG MEMORIES                       */}
      {/* ============================================================== */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
              Visual Chronicles
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Little Moments, Big Memories
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
              Click any photograph to view the story in full resolution.
            </p>
          </div>

          {/* Gallery Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Artisan', 'Farming', 'Culinary', 'Detective', 'Culture', 'Nature'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  galleryCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'bg-[#12271d] text-stone-300 hover:bg-[#1a382a] border border-[#204331]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredGallery.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group relative h-60 rounded-2xl overflow-hidden cursor-pointer bg-stone-900 border border-[#1e3c2c] shadow-lg hover:border-amber-400/80 transition-all"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                  {photo.category}
                </span>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight mt-0.5 truncate">
                  {photo.title}
                </h4>
                <p className="text-[10px] text-stone-300 truncate mt-0.5">{photo.location}</p>
              </div>

              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-900/70 text-stone-200 opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. FINAL BRAND MESSAGE CALLOUT                                 */}
      {/* ============================================================== */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#0b1612] via-[#10271d] to-[#08120d] border-t border-[#1a3627]">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 via-amber-500 to-amber-400 flex items-center justify-center mx-auto text-stone-950 font-bold shadow-xl shadow-amber-500/20">
            <TreePine className="w-8 h-8 text-stone-950" />
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block">
            LITTLE EXPLORERS BY I-EXPLR
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            Little Hands. Big Discoveries.
          </h2>

          <p className="text-base sm:text-xl font-serif italic text-amber-200/90 max-w-2xl mx-auto leading-relaxed">
            "Where Every Experience Becomes a Lesson and Every Moment Becomes a Memory."
          </p>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl mx-auto">
            Give your child the gift of wonder, open trails, and creative confidence. Reserve a spot for this upcoming weekend or partner with us for your school's annual nature expedition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book an Experience</span>
            </button>

            <button
              onClick={() => setSchoolModalOpen(true)}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#142e22] hover:bg-[#1a382b] text-emerald-300 border border-emerald-500/50 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Plan a School Outing</span>
            </button>

            <button
              onClick={onBackToMain}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700/80 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Return to I-EXPLR Main
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. FOOTER                                                     */}
      {/* ============================================================== */}
      <footer className="bg-[#050d09] border-t border-[#13281e] py-12 px-4 sm:px-6 lg:px-8 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <TreePine className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-stone-200 text-sm block">
                LITTLE EXPLORERS by I-EXPLR
              </span>
              <span className="text-[10px] text-stone-400">
                Experiential learning, farm discovery & youth nature journeys.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-stone-400 text-xs">
            <button onClick={() => scrollToSection('experiences')} className="hover:text-amber-400 transition-colors">
              Adventures
            </button>
            <button onClick={() => scrollToSection('schools')} className="hover:text-amber-400 transition-colors">
              Schools
            </button>
            <button onClick={() => scrollToSection('safety')} className="hover:text-amber-400 transition-colors">
              Safety Charter
            </button>
            <button onClick={onBackToMain} className="text-amber-400 hover:underline">
              ← I-EXPLR Travel & Treks
            </button>
          </div>

          <div className="text-[11px] text-stone-400">
            © 2026 I-EXPLR Experiences. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* MODALS INTEGRATION                                             */}
      {/* ============================================================== */}
      {/* 1. Detail Modal */}
      <LittleExplorersDetailModal
        experience={selectedDetailExp}
        onClose={() => setSelectedDetailExp(null)}
        onBook={(exp) => handleOpenBooking(exp)}
      />

      {/* 2. Parent Booking Modal */}
      <LittleExplorersBookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setPreselectedBookingExp(null);
        }}
        preselectedExperience={preselectedBookingExp}
        onBookingSuccess={(details) => {
          onShowToast(`Pass reserved for ${details.experienceTitle}! Reference: ${details.refId}`, 'success');
        }}
      />

      {/* 3. School Enquiry Modal */}
      <SchoolEnquiryModal
        isOpen={schoolModalOpen}
        onClose={() => setSchoolModalOpen(false)}
        onSubmitSuccess={(data) => {
          onShowToast(`School dossier generated for ${data.schoolName}! Ref: ${data.refCode}`, 'success');
        }}
      />

      {/* 4. Gallery Lightbox */}
      <GalleryLightboxModal
        photo={lightboxPhoto}
        photos={filteredGallery}
        onClose={() => setLightboxPhoto(null)}
        onSelectPhoto={(p) => setLightboxPhoto(p)}
      />
    </div>
  );
};
