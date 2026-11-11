import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Briefcase, 
  MapPin, 
  Mountain, 
  Compass as CompassIcon, 
  Flame, 
  TreePine, 
  ArrowRight,
  Sparkle
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenTravellerAuth: () => void;
  onOpenPartnerKYC: () => void;
  userLoggedIn: boolean;
  userName: string;
  onNavigateLittleExplorers: () => void;
  isLittleExplorersActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  onOpenSaved,
  onOpenTravellerAuth,
  onOpenPartnerKYC,
  userLoggedIn,
  userName,
  onNavigateLittleExplorers,
  isLittleExplorersActive = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vibeDropdownOpen, setVibeDropdownOpen] = useState(false);
  const [joinDropdownOpen, setJoinDropdownOpen] = useState(false);
  const [mobileVibeExpanded, setMobileVibeExpanded] = useState(false);

  const vibeDropdownRef = useRef<HTMLDivElement>(null);
  const joinDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (vibeDropdownRef.current && !vibeDropdownRef.current.contains(event.target as Node)) {
        setVibeDropdownOpen(false);
      }
      if (joinDropdownRef.current && !joinDropdownRef.current.contains(event.target as Node)) {
        setJoinDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 5 Vibe Options for "Pick Your Vibe" dropdown
  const vibeOptions = [
    {
      id: 'local-experiences',
      label: 'Local Experiences',
      tagline: 'Real people, village kitchens & sacred traditions',
      icon: Sparkles,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'weekend-treks',
      label: 'Weekday / Weekend Treks',
      tagline: 'Summit clouds, dawn ridges & benne dosa feasts',
      icon: Mountain,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
    },
    {
      id: 'local-guides',
      label: 'Local Guides',
      tagline: 'Zero-network indigenous trackers & story keepers',
      icon: CompassIcon,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/30',
    },
    {
      id: 'events',
      label: 'Events',
      tagline: 'Starlit cinema & acoustic bonfire circles',
      icon: Flame,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/30',
    },
    {
      id: 'companions',
      label: 'Companions',
      tagline: 'Connect with verified kindred travel companions',
      icon: Users,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10 border-orange-500/30',
    },
  ];

  const handleSelectVibeOption = (id: string) => {
    setVibeDropdownOpen(false);
    setMobileMenuOpen(false);
    onSelectTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0b1612]/95 backdrop-blur-md border-b border-[#1f382b] py-3 shadow-md text-[#f4efe8]'
            : 'bg-gradient-to-b from-[#0b1612]/95 via-[#0b1612]/80 to-transparent py-4 text-[#f4efe8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group transition-transform focus-visible:outline-none rounded-lg shrink-0"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-700 via-amber-600 to-amber-500 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-all">
                <Compass className="w-5 h-5 text-stone-950 transition-transform duration-700 group-hover:rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] font-extrabold text-[#f4efe8] uppercase leading-none">
                  I-EXPLR
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-amber-400 font-bold uppercase mt-1">
                  Where Every Journey Finds Meaning
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6">
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`text-xs uppercase tracking-wider transition-colors relative py-1 font-semibold ${
                  currentTab === 'home' && !isLittleExplorersActive
                    ? 'text-amber-400'
                    : 'text-[#c2d6cc] hover:text-amber-400'
                }`}
              >
                Home
                {currentTab === 'home' && !isLittleExplorersActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                )}
              </button>

              {/* "PICK YOUR VIBE" TAB WITH DROPDOWN */}
              <div className="relative" ref={vibeDropdownRef}>
                <button
                  onClick={() => {
                    setVibeDropdownOpen(!vibeDropdownOpen);
                    setJoinDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all border ${
                    vibeDropdownOpen || ['local-experiences', 'weekend-treks', 'local-guides', 'events', 'companions'].includes(currentTab)
                      ? 'bg-[#183627] text-amber-300 border-amber-500/40 shadow-sm'
                      : 'bg-[#12241b]/60 hover:bg-[#183627] text-[#c2d6cc] border-[#224434]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pick Your Vibe</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      vibeDropdownOpen ? 'rotate-180 text-amber-400' : 'text-stone-400'
                    }`}
                  />
                </button>

                {/* Vibe Dropdown Menu */}
                {vibeDropdownOpen && (
                  <div className="absolute left-0 mt-2.5 w-80 bg-[#10241b] border border-[#234535] rounded-2xl p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50 text-[#f4efe8]">
                    <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-amber-400/90 font-bold border-b border-[#1c382b] flex items-center justify-between">
                      <span>Choose Your Adventure Style</span>
                      <span className="text-stone-400 font-sans">5 Pillars</span>
                    </div>

                    <div className="space-y-1 mt-1">
                      {vibeOptions.map((opt) => {
                        const Icon = opt.icon;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectVibeOption(opt.id)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-[#163326] transition-colors group flex items-start gap-3"
                          >
                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${opt.bgColor} ${opt.color} group-hover:scale-105 transition-transform`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-[#f4efe8] group-hover:text-amber-400 flex items-center justify-between">
                                <span>{opt.label}</span>
                                <ArrowRight className="w-3 h-3 text-stone-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </div>
                              <p className="text-[11px] text-[#9cb0a4] leading-snug mt-0.5 line-clamp-1">
                                {opt.tagline}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* "LITTLE EXPLORERS" SEPARATE DEDICATED WEBPAGE TAB */}
              <button
                onClick={onNavigateLittleExplorers}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all border ${
                  isLittleExplorersActive
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-extrabold'
                    : 'bg-[#153023]/80 hover:bg-[#1c402f] text-emerald-300 border-emerald-600/40 hover:text-white'
                }`}
              >
                <TreePine className={`w-3.5 h-3.5 ${isLittleExplorersActive ? 'text-stone-950' : 'text-amber-400'}`} />
                <span>Little Explorers</span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Kids
                </span>
              </button>

              {/* Plan with Saki (AI) */}
              <button
                onClick={() => handleNavClick('plan-with-ai')}
                className={`text-xs uppercase tracking-wider transition-colors relative py-1 font-semibold flex items-center gap-1.5 ${
                  currentTab === 'plan-with-ai'
                    ? 'text-amber-400'
                    : 'text-[#c2d6cc] hover:text-amber-400'
                }`}
              >
                <span>Plan with Saki</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {currentTab === 'plan-with-ai' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                )}
              </button>

              {/* Stories */}
              <button
                onClick={() => handleNavClick('about')}
                className={`text-xs uppercase tracking-wider transition-colors relative py-1 font-semibold ${
                  currentTab === 'about'
                    ? 'text-amber-400'
                    : 'text-[#c2d6cc] hover:text-amber-400'
                }`}
              >
                Stories
                {currentTab === 'about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                )}
              </button>
            </nav>

            {/* Right Action Cluster: Join Us Dropdown & Saved & Profile */}
            <div className="hidden sm:flex items-center gap-3">
              {/* JOIN US DROPDOWN */}
              <div className="relative" ref={joinDropdownRef}>
                <button
                  onClick={() => {
                    setJoinDropdownOpen(!joinDropdownOpen);
                    setVibeDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border shadow-sm ${
                    joinDropdownOpen
                      ? 'bg-[#1a382b] text-white border-amber-500/50'
                      : 'bg-[#13261e] hover:bg-[#1a382b] text-[#f4efe8] border-[#244335]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Join us</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      joinDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {joinDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#10241b] border border-[#234535] rounded-2xl p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50 text-[#f4efe8]">
                    {/* Option 1: As Partners */}
                    <button
                      onClick={() => {
                        setJoinDropdownOpen(false);
                        onOpenPartnerKYC();
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-[#163326] transition-colors group flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 group-hover:bg-amber-600 group-hover:text-stone-950 transition-colors">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#f4efe8] group-hover:text-amber-400 flex items-center gap-1.5">
                          <span>as partners</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-700/50 font-mono">
                            KYC Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9cb0a4] leading-tight mt-0.5">
                          Trek organisers, local guides, event planners & brands/communities.
                        </p>
                      </div>
                    </button>

                    <div className="h-[1px] bg-[#1f3d2f] my-1" />

                    {/* Option 2: As Travellers */}
                    <button
                      onClick={() => {
                        setJoinDropdownOpen(false);
                        onOpenTravellerAuth();
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-[#163326] transition-colors group flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-700/20 border border-emerald-600/40 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#f4efe8] group-hover:text-emerald-300">
                          as travellers
                        </div>
                        <p className="text-[11px] text-[#9cb0a4] leading-tight mt-0.5">
                          Connect with companions, save wishlist trails & join expeditions.
                        </p>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist Heart Icon */}
              <button
                onClick={onOpenSaved}
                className="relative p-2.5 rounded-xl text-stone-300 hover:text-rose-400 bg-[#13261e] border border-[#244335] hover:border-rose-500/40 shadow-sm transition-colors"
                title="Saved expeditions"
              >
                <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Sign In / Profile */}
              <button
                onClick={onOpenTravellerAuth}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs tracking-wider uppercase transition-all shadow-md active:scale-95"
              >
                <User className="w-3.5 h-3.5 text-stone-950" />
                <span>{userLoggedIn ? userName.split(' ')[0] : 'Sign In'}</span>
              </button>
            </div>

            {/* Mobile Header Right Controls: Wishlist + Hamburger */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={onNavigateLittleExplorers}
                className="p-2 rounded-xl text-amber-300 bg-[#13261e] border border-amber-500/40 shadow-sm text-xs font-bold flex items-center gap-1"
                title="Little Explorers"
              >
                <TreePine className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">Kids</span>
              </button>

              <button
                onClick={onOpenSaved}
                className="relative p-2 rounded-xl text-stone-300 hover:text-rose-400 bg-[#13261e] border border-[#244335] shadow-sm"
                title="Saved expeditions"
              >
                <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#f4efe8] hover:text-amber-400 bg-[#13261e] border border-[#244335] shadow-sm"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0b1612]/98 backdrop-blur-2xl xl:hidden pt-20 px-6 flex flex-col justify-between pb-8 animate-in fade-in overflow-y-auto text-[#f4efe8]">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono pb-2 border-b border-[#1f382b] flex items-center justify-between">
              <span className="font-bold">Explore I-EXPLR</span>
              <span className="text-[10px] text-[#9cb0a4] font-sans">Where Every Journey Finds Meaning</span>
            </div>

            {/* Home Link */}
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-2 text-base font-serif tracking-wider flex items-center justify-between ${
                currentTab === 'home' && !isLittleExplorersActive ? 'text-amber-400 font-bold' : 'text-[#c2d6cc]'
              }`}
            >
              <span>Home</span>
              {currentTab === 'home' && !isLittleExplorersActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </button>

            {/* Mobile "Pick Your Vibe" Accordion */}
            <div className="border-y border-[#1c392b] py-2">
              <button
                onClick={() => setMobileVibeExpanded(!mobileVibeExpanded)}
                className="w-full flex items-center justify-between text-base font-serif font-bold text-amber-300 py-1"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Pick Your Vibe</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileVibeExpanded ? 'rotate-180' : ''}`} />
              </button>

              {mobileVibeExpanded && (
                <div className="pl-3 pr-1 pt-2 space-y-2 animate-in fade-in duration-150">
                  {vibeOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectVibeOption(opt.id)}
                        className="w-full text-left p-2 rounded-xl bg-[#12271e] border border-[#204332] flex items-center gap-3 text-xs"
                      >
                        <div className={`p-1.5 rounded-lg ${opt.bgColor} ${opt.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-stone-100">{opt.label}</div>
                          <div className="text-[10px] text-stone-400 line-clamp-1">{opt.tagline}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Little Explorers Dedicated Tab in Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateLittleExplorers();
              }}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-emerald-950 via-[#143124] to-emerald-950 border border-emerald-500/50 flex items-center justify-between text-left shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                  <TreePine className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>LITTLE EXPLORERS</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono">
                      Dedicated Page
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-300">
                    Farm, pottery, cooking & nature adventures for kids
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            {/* Plan with Saki (AI) */}
            <button
              onClick={() => handleNavClick('plan-with-ai')}
              className={`w-full text-left py-2 text-base font-serif tracking-wider flex items-center justify-between ${
                currentTab === 'plan-with-ai' ? 'text-amber-400 font-bold' : 'text-[#c2d6cc]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>Plan with Saki</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono">
                  AI
                </span>
              </span>
            </button>

            {/* Stories */}
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left py-2 text-base font-serif tracking-wider flex items-center justify-between ${
                currentTab === 'about' ? 'text-amber-400 font-bold' : 'text-[#c2d6cc]'
              }`}
            >
              <span>Stories</span>
            </button>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#1f382b]">
            {/* User Profile Pill in Mobile Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTravellerAuth();
              }}
              className="w-full p-3 rounded-xl bg-[#13261e] border border-[#244335] shadow-sm flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#f4efe8]">
                    {userLoggedIn ? userName : 'Sign In / Register'}
                  </div>
                  <div className="text-[10px] text-[#9cb0a4]">
                    {userLoggedIn ? 'View Profile & Bookings' : 'Save trails & join companions'}
                  </div>
                </div>
              </div>
              <span className="text-xs text-amber-400 font-mono font-medium">Open →</span>
            </button>

            <div className="text-xs uppercase tracking-wider text-[#9cb0a4] font-mono font-medium">
              Join Us
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerKYC();
                }}
                className="p-3 rounded-xl bg-[#13261e] border border-amber-500/40 shadow-sm text-left active:scale-95 transition-transform"
              >
                <div className="text-xs font-bold text-amber-300">as partners</div>
                <div className="text-[10px] text-[#9cb0a4] mt-0.5 leading-tight">Trek leads & guides (KYC)</div>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTravellerAuth();
                }}
                className="p-3 rounded-xl bg-[#13261e] border border-emerald-600/40 shadow-sm text-left active:scale-95 transition-transform"
              >
                <div className="text-xs font-bold text-emerald-300">as travellers</div>
                <div className="text-[10px] text-[#9cb0a4] mt-0.5 leading-tight">Companions & trails</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
