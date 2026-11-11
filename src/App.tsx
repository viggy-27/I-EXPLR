import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SixPillarsNavigator } from './components/SixPillarsNavigator';
import { LocalExperiencesSection } from './components/LocalExperiencesSection';
import { WeekendTreksSection } from './components/WeekendTreksSection';
import { LocalGuidesProductSection } from './components/LocalGuidesProductSection';
import { EventsProductSection } from './components/EventsProductSection';
import { CompanionsProductSection } from './components/CompanionsProductSection';
import { PlanWithAISection } from './components/PlanWithAISection';
import { CampfireFeature } from './components/CampfireFeature';
import { ExploreSection } from './components/ExploreSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { LittleExplorersPage } from './components/little-explorers/LittleExplorersPage';

// Modals
import { ExperienceDetailModal } from './components/ExperienceDetailModal';
import { TrekDetailModal } from './components/TrekDetailModal';
import { EventDetailModal } from './components/EventDetailModal';
import { DestinationModal } from './components/DestinationModal';
import { PartnerKYCModal } from './components/PartnerKYCModal';
import { CreateTripModal } from './components/CreateTripModal';
import { JoinTripModal } from './components/JoinTripModal';
import { BookGuideModal } from './components/BookGuideModal';
import { StoryModal } from './components/StoryModal';
import { AuthModal } from './components/AuthModal';

import { campfireAudio } from './utils/audio';
import { 
  DESTINATIONS_DATA, 
  COMPANIONS_DATA, 
  LOCAL_GUIDES_DATA, 
  TRAVELER_STORIES,
  LOCAL_EXPERIENCES_DATA,
  TREKS_DATA,
  EVENTS_DATA
} from './data/mockData';
import { 
  Destination, 
  CompanionTrip, 
  LocalGuide, 
  Category, 
  UserProfile, 
  PillarId,
  LocalExperienceItem,
  TrekItem,
  EventItem
} from './types';
import { Sparkles, X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activePillar, setActivePillar] = useState<PillarId>('local-experiences');
  const [currency] = useState<'INR' | 'USD'>('INR');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Dedicated Route State for Little Explorers vs Main Platform
  const [activeRoute, setActiveRoute] = useState<'main' | 'little-explorers'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/little-explorers' || hash.includes('little-explorers')) {
        return 'little-explorers';
      }
    }
    return 'main';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/little-explorers' || hash.includes('little-explorers')) {
        setActiveRoute('little-explorers');
        document.title = 'Little Explorers by I-EXPLR | Little Hands. Big Discoveries.';
      } else {
        setActiveRoute('main');
        document.title = 'I-EXPLR | Where Every Journey Finds Meaning';
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    handleLocationChange();
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToLittleExplorers = () => {
    setActiveRoute('little-explorers');
    try {
      window.history.pushState({}, '', '/little-explorers');
    } catch {
      window.location.hash = '/little-explorers';
    }
    document.title = 'Little Explorers by I-EXPLR | Little Hands. Big Discoveries.';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToMain = (targetTab?: string) => {
    setActiveRoute('main');
    try {
      window.history.pushState({}, '', '/');
    } catch {
      window.location.hash = '';
    }
    document.title = 'I-EXPLR | Where Every Journey Finds Meaning';
    if (targetTab) {
      setCurrentTab(targetTab);
      setTimeout(() => {
        const el = document.getElementById(targetTab);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Catalogs
  const [localExperiences] = useState<LocalExperienceItem[]>(LOCAL_EXPERIENCES_DATA);
  const [treks] = useState<TrekItem[]>(TREKS_DATA);
  const [events] = useState<EventItem[]>(EVENTS_DATA);
  const [guides] = useState<LocalGuide[]>(LOCAL_GUIDES_DATA);
  const [companions, setCompanions] = useState<CompanionTrip[]>(COMPANIONS_DATA);
  const [destinations] = useState<Destination[]>(DESTINATIONS_DATA);

  // User State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>({
    name: 'Maya Sen',
    email: 'maya@i-explr.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    location: 'Mumbai, India',
    bio: 'Passionate high-altitude trekker, amateur astrophotographer, and believer in Leave-No-Trace exploration.',
    interests: ['Kashmiri Dum Biryani', 'Munnar Tea', 'Skandagiri Benne Dosa', 'Theyyam', 'Starlit Cinema'],
    savedDestinations: ['kashmiri-dum-biryani-village', 'skandagiri-sunrise-benne-dosa'],
    bookedTrips: [],
  });

  const [bookedTripsList, setBookedTripsList] = useState<Array<{ tripName: string; date: string; guests: number; total: string }>>([
    {
      tripName: 'Skandagiri Midnight Ascent & Sunrise Benne Dosa',
      date: '2026-11-21',
      guests: 2,
      total: '₹3,900',
    },
  ]);

  // Modal Selection States
  const [selectedExperience, setSelectedExperience] = useState<LocalExperienceItem | null>(null);
  const [selectedTrek, setSelectedTrek] = useState<TrekItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<LocalGuide | null>(null);
  const [selectedCompanionTrip, setSelectedCompanionTrip] = useState<CompanionTrip | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Standalone Modals
  const [partnerKYCModalOpen, setPartnerKYCModalOpen] = useState(false);
  const [createTripModalOpen, setCreateTripModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Search in Explore
  const [exploreInitialSearch, setExploreInitialSearch] = useState('');
  const [exploreInitialCategory, setExploreInitialCategory] = useState<Category | ''>('');

  // Toast feedback
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Audio Toggle for Campfire Feature section
  const handleToggleAudio = async () => {
    try {
      const playing = await campfireAudio.toggle();
      setIsAudioPlaying(playing);
      if (playing) {
        addToast('Campfire and pine breeze ambience activated.', 'info');
      } else {
        addToast('Campfire ambience paused.', 'info');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Saved / Wishlist Toggle
  const handleToggleSave = (id: string) => {
    setUser((prev) => {
      const exists = prev.savedDestinations.includes(id);
      const newSaved = exists
        ? prev.savedDestinations.filter((item) => item !== id)
        : [...prev.savedDestinations, id];

      if (exists) {
        addToast('Removed from saved list.');
      } else {
        addToast('Added to your I-EXPLR wishlist!');
      }

      return {
        ...prev,
        savedDestinations: newSaved,
      };
    });
  };

  // Handle Pillar Selection from Navigator
  const handleSelectPillar = (pillar: PillarId) => {
    setActivePillar(pillar);
    const element = document.getElementById(pillar);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Booking handlers
  const handleBookExperienceSuccess = (title: string, date: string, guests: number, total: string) => {
    setBookedTripsList((prev) => [{ tripName: title, date, guests, total }, ...prev]);
    addToast(`Experience window reserved for ${title}!`, 'success');
  };

  const handleBookTrekSuccess = (title: string, date: string, guests: number, total: string) => {
    setBookedTripsList((prev) => [{ tripName: title, date, guests, total }, ...prev]);
    addToast(`Trail slot confirmed for ${title}!`, 'success');
  };

  const handleBookEventSuccess = (title: string, date: string, passes: number, total: string) => {
    setBookedTripsList((prev) => [{ tripName: title, date, guests: passes, total }, ...prev]);
    addToast(`Pass issued for ${title}!`, 'success');
  };

  const handleBookGuideSuccess = (guideName: string, dates: string) => {
    addToast(`Inquiry forwarded to ${guideName} for ${dates}!`, 'success');
  };

  const handleAddCustomTrip = (newTrip: CompanionTrip) => {
    setCompanions((prev) => [newTrip, ...prev]);
    addToast(`Companion plan for "${newTrip.destination}" posted to community!`, 'success');
  };

  const handleHeroSearch = (query: string, category?: Category) => {
    setExploreInitialSearch(query);
    if (category) {
      setExploreInitialCategory(category);
    }
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b1612] text-[#f4efe8] flex flex-col font-sans selection:bg-[#e07a5f]/30 selection:text-white">
      {activeRoute === 'little-explorers' ? (
        /* DEDICATED WEBPAGE: LITTLE EXPLORERS BY I-EXPLR */
        <LittleExplorersPage
          onBackToMain={() => navigateToMain('home')}
          onShowToast={addToast}
        />
      ) : (
        /* MAIN I-EXPLR APPLICATION */
        <>
          {/* Sticky Navigation with Pick Your Vibe & Join Us dropdowns */}
          <Navbar
            currentTab={currentTab}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              const el = document.getElementById(tab);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            savedCount={user.savedDestinations.length}
            onOpenSaved={() => setAuthModalOpen(true)}
            onOpenTravellerAuth={() => setAuthModalOpen(true)}
            onOpenPartnerKYC={() => setPartnerKYCModalOpen(true)}
            userLoggedIn={isLoggedIn}
            userName={user.name}
            onNavigateLittleExplorers={navigateToLittleExplorers}
            isLittleExplorersActive={false}
          />

          {/* Main Content */}
          <main className="flex-1">
            {/* Cinematic Hero */}
            <Hero
              onExploreClick={() => {
                document.getElementById('local-experiences')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onCompanionsClick={() => {
                document.getElementById('companions')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSearch={handleHeroSearch}
            />

            {/* SIX WAYS INTO I-EXPLR NAVIGATOR */}
            <SixPillarsNavigator
              activePillar={activePillar}
              onSelectPillar={handleSelectPillar}
            />

            {/* LOCAL EXPERIENCES (With P1 Kashmiri Biryani, P2 Munnar Tea, P3 Theyyam, Mangalore Pabbas) */}
            <LocalExperiencesSection
              experiences={localExperiences}
              onSelectExperience={setSelectedExperience}
              currency={currency}
              savedIds={user.savedDestinations}
              onToggleSave={handleToggleSave}
              onOpenPartner={() => setPartnerKYCModalOpen(true)}
            />

            {/* WEEKEND / WEEKDAY TREKS (With Skandagiri sunrise Benne Dosa, Kudremukh, Prabalmachi, Triund) */}
            <WeekendTreksSection
              treks={treks}
              onSelectTrek={setSelectedTrek}
              currency={currency}
              onOpenPartner={() => setPartnerKYCModalOpen(true)}
            />

            {/* LOCAL GUIDES (Zero-network navigators & indigenous trackers) */}
            <LocalGuidesProductSection
              guides={guides}
              onBookGuide={setSelectedGuide}
              currency={currency}
            />

            {/* EVENTS (With P4 Cinema Under the Stars & P5 Acoustic Bonfire Jamming Circle) */}
            <EventsProductSection
              events={events}
              onBookEvent={setSelectedEvent}
              currency={currency}
              onOpenPartner={() => setPartnerKYCModalOpen(true)}
            />

            {/* COMPANIONS (With P6 Sunset campfire friends & genuine human connection) */}
            <CompanionsProductSection
              companions={companions}
              onRequestJoin={setSelectedCompanionTrip}
              onOpenCreateTrip={() => setCreateTripModalOpen(true)}
            />

            {/* PLAN WITH AI (Soulful Itinerary Architect powered by Gemini 3.8 Flash) */}
            <PlanWithAISection />

            {/* TRAVELLER CHRONICLES (Sliding right to left marquee with authentic photos P1 to P6) */}
            <AboutSection />

            {/* CAMPFIRE SOUL & COMMUNITY LORE */}
            <CampfireFeature
              isAudioPlaying={isAudioPlaying}
              onToggleAudio={handleToggleAudio}
              onOpenStoryModal={() => setStoryModalOpen(true)}
            />

            {/* EXPEDITIONS CATALOG (Explore by Categories) */}
            <ExploreSection
              destinations={destinations}
              onSelectDestination={setSelectedDestination}
              currency={currency}
              savedIds={user.savedDestinations}
              onToggleSave={handleToggleSave}
              initialCategory={exploreInitialCategory}
              initialSearch={exploreInitialSearch}
            />
          </main>

          {/* Footer */}
          <Footer
            onSelectTab={(tab) => {
              document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenPartner={() => setPartnerKYCModalOpen(true)}
            onNavigateLittleExplorers={navigateToLittleExplorers}
          />
        </>
      )}

      {/* MODALS */}
      {/* 1. Local Experience Modal */}
      <ExperienceDetailModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        currency={currency}
        isSaved={selectedExperience ? user.savedDestinations.includes(selectedExperience.id) : false}
        onToggleSave={handleToggleSave}
        onBookSuccess={handleBookExperienceSuccess}
      />

      {/* 2. Trek Detail Modal */}
      <TrekDetailModal
        trek={selectedTrek}
        onClose={() => setSelectedTrek(null)}
        currency={currency}
        onBookSuccess={handleBookTrekSuccess}
      />

      {/* 3. Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        currency={currency}
        onBookSuccess={handleBookEventSuccess}
      />

      {/* 4. Expedition / Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        currency={currency}
        isSaved={selectedDestination ? user.savedDestinations.includes(selectedDestination.id) : false}
        onToggleSave={handleToggleSave}
        onBookSuccess={(name, date, count, total) => {
          setBookedTripsList((prev) => [{ tripName: name, date, guests: count, total }, ...prev]);
          addToast(`Slot reserved for ${name}!`, 'success');
        }}
      />

      {/* 5. Hire Local Guide Modal */}
      <BookGuideModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
        currency={currency}
        onBookingSuccess={handleBookGuideSuccess}
      />

      {/* 6. Join Companion Trip Modal */}
      <JoinTripModal
        trip={selectedCompanionTrip}
        onClose={() => setSelectedCompanionTrip(null)}
        onSubmitRequest={(tripId) => {
          addToast('Companion request sent! The organizer will connect shortly.', 'success');
        }}
      />

      {/* 7. Post Companion Trip Modal */}
      <CreateTripModal
        isOpen={createTripModalOpen}
        onClose={() => setCreateTripModalOpen(false)}
        onAddTrip={handleAddCustomTrip}
      />

      {/* 8. Partner Onboarding & KYC Modal */}
      <PartnerKYCModal
        isOpen={partnerKYCModalOpen}
        onClose={() => setPartnerKYCModalOpen(false)}
        onSubmitKYC={(kycData) => {
          addToast(`KYC submitted for ${kycData.legalName}! Reference: ${kycData.refId}`, 'success');
        }}
      />

      {/* 9. Fireside Story Modal */}
      <StoryModal
        isOpen={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
        onSubmitStory={(story) => {
          TRAVELER_STORIES.unshift(story);
          addToast('Your story has been added to the embers!', 'success');
        }}
      />

      {/* 10. Traveller Auth / Profile Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        user={user}
        isLoggedIn={isLoggedIn}
        onLogin={(name, email) => {
          setIsLoggedIn(true);
          setUser((prev) => ({ ...prev, name, email }));
          addToast(`Welcome back, ${name}!`);
          setAuthModalOpen(false);
        }}
        onLogout={() => {
          setIsLoggedIn(false);
          addToast('Signed out of I-EXPLR.');
          setAuthModalOpen(false);
        }}
        destinations={destinations}
        onSelectDestination={(dest) => {
          setAuthModalOpen(false);
          setSelectedDestination(dest);
        }}
        bookedTrips={bookedTripsList}
      />

      {/* Toast Feedback Stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#13261e]/95 border border-[#244335] text-[#f4efe8] px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs backdrop-blur-md animate-in slide-in-from-bottom-3 duration-300"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-200 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
