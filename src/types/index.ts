export type PillarId = 
  | 'local-experiences'
  | 'weekend-treks'
  | 'local-guides'
  | 'events'
  | 'companions'
  | 'plan-with-ai';

export type Category = 
  | 'Mountain Adventures'
  | 'Trekking'
  | 'Camping'
  | 'Road Trips'
  | 'Water Adventures'
  | 'Nature Escapes'
  | 'Cultural Experiences'
  | 'Weekend Getaways'
  | 'Offbeat Destinations';

export type Difficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Demanding';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  elevation?: string;
  distance?: string;
}

export interface Destination {
  id: string;
  title: string;
  location: string;
  stateOrCountry: string;
  category: Category;
  shortDescription: string;
  longDescription: string;
  image: string;
  gallery: string[];
  duration: string;
  difficulty?: Difficulty;
  priceINR: number;
  priceUSD: number;
  bestSeason: string;
  maxAltitude?: string;
  rating: number;
  reviewsCount: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  gearChecklist: string[];
  itinerary: ItineraryDay[];
  featured?: boolean;
}

export interface LocalExperienceItem {
  id: string;
  title: string;
  location: string;
  state: string;
  hook: string;
  fullStory: string;
  image: string;
  gallery: string[];
  duration: string;
  priceINR: number;
  priceUSD: number;
  hostName: string;
  hostRole: string;
  hostAvatar: string;
  highlights: string[];
  inclusions: string[];
  rating: number;
  reviewsCount: number;
  isExclusive?: boolean;
  organizerType?: 'I-EXPLR Exclusive' | 'Partner Verified';
  organizerName?: string;
}

export interface TrekItem {
  id: string;
  title: string;
  location: string;
  state: string;
  timingType: 'Weekend Escape' | 'Weekday Trail' | 'Sunrise Scramble';
  difficulty: Difficulty;
  duration: string;
  altitude: string;
  distance: string;
  foodHighlight: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  priceINR: number;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  campfireIncluded: boolean;
  highlights: string[];
  inclusions: string[];
  isExclusive?: boolean;
  organizerType?: 'I-EXPLR Exclusive' | 'Partner Verified';
  organizerName?: string;
}

export interface EventItem {
  id: string;
  title: string;
  genre: 
    | 'Concert & Live Music'
    | 'Acoustic Jam'
    | 'Pottery Workshop'
    | 'Painting & Art'
    | 'Standup Comedy'
    | 'Open-Air Cinema'
    | 'Dance Night'
    | 'Creative Workshop';
  categoryGroup?: 'Concerts & Jamming' | 'Pottery & Painting' | 'Standup Comedy' | 'Cinema' | 'Social & Dance';
  venue: string;
  city: string;
  date: string;
  time: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  priceINR: number;
  priceUSD: number;
  vibe: string;
  spotsLeft: number;
  totalSpots: number;
  lineup: string[];
  isExclusive?: boolean;
  organizerType?: 'I-EXPLR Exclusive' | 'Partner Verified';
  organizerName?: string;
}

export interface CompanionTrip {
  id: string;
  travelerName: string;
  travelerAge: number;
  travelerLocation: string;
  avatar: string;
  destination: string;
  dates: string;
  category: Category | string;
  groupGoal: string;
  travelStyle: string;
  lookingFor: string;
  spotsLeft: number;
  estimatedBudget: string;
  confirmedCount: number;
  verified: boolean;
  activityType?: 'Sunrise Trek' | 'Café Date / Food Walk' | 'Music & Events' | 'High Altitude Trail';
}

export interface LocalGuide {
  id: string;
  name: string;
  region: string;
  avatar: string;
  specialty: string;
  experienceYears: number;
  languages: string[];
  bio: string;
  rating: number;
  toursLed: number;
  certifications: string[];
  dailyRateINR: number;
  dailyRateUSD: number;
  noNetworkExpertise: string;
}

export interface TravelerStory {
  id: string;
  author: string;
  avatar: string;
  tripTitle: string;
  location: string;
  quote: string;
  story: string;
  photo: string;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  location: string;
  bio: string;
  interests: string[];
  savedDestinations: string[];
  bookedTrips: string[];
}
