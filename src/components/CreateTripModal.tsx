import React, { useState } from 'react';
import { X, Plus, Calendar, MapPin, Users, Sparkles } from 'lucide-react';
import { CompanionTrip, Category } from '../types';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrip: (trip: CompanionTrip) => void;
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({
  isOpen,
  onClose,
  onAddTrip,
}) => {
  if (!isOpen) return null;

  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [category, setCategory] = useState<Category>('Mountain Adventures');
  const [groupGoal, setGroupGoal] = useState('');
  const [travelStyle, setTravelStyle] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [spotsLeft, setSpotsLeft] = useState(2);
  const [estimatedBudget, setEstimatedBudget] = useState('₹25,000 / $300 per person');
  const [travelerName, setTravelerName] = useState('Kavya Sharma');
  const [travelerAge, setTravelerAge] = useState(26);
  const [travelerLocation, setTravelerLocation] = useState('Pune, India');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrip: CompanionTrip = {
      id: `trip-${Date.now()}`,
      travelerName,
      travelerAge,
      travelerLocation,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      destination,
      dates,
      category,
      groupGoal,
      travelStyle,
      lookingFor,
      spotsLeft,
      estimatedBudget,
      confirmedCount: 1,
      verified: true,
    };
    onAddTrip(newTrip);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#13261e] border border-[#244335] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-[#f4efe8]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#9cb0a4] hover:text-[#f4efe8] hover:bg-[#152e23] rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs uppercase tracking-widest text-[#e07a5f] font-mono font-bold mb-1">
          Community Dispatch
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">
          Post An Upcoming Expedition
        </h3>
        <p className="text-xs text-[#c2d9cc] mt-1 mb-6 font-light">
          Planning a mountain trail or road trip and looking for companions to split costs and share the trail? Broadcast your trip.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Target Trail or Destination</label>
              <input
                type="text"
                required
                placeholder="e.g. Rupin Pass Trek"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Travel Dates</label>
              <input
                type="text"
                required
                placeholder="e.g. Sept 18 – Sept 25"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Expedition Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-[#e07a5f] shadow-sm"
              >
                <option value="Mountain Adventures" className="bg-[#0b1612] text-[#f4efe8]">Mountain Adventures</option>
                <option value="Trekking" className="bg-[#0b1612] text-[#f4efe8]">Trekking</option>
                <option value="Camping" className="bg-[#0b1612] text-[#f4efe8]">Camping</option>
                <option value="Road Trips" className="bg-[#0b1612] text-[#f4efe8]">Road Trips</option>
                <option value="Water Adventures" className="bg-[#0b1612] text-[#f4efe8]">Water Adventures</option>
                <option value="Cultural Experiences" className="bg-[#0b1612] text-[#f4efe8]">Cultural Experiences</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Spots Still Open</label>
              <input
                type="number"
                min={1}
                max={8}
                value={spotsLeft}
                onChange={(e) => setSpotsLeft(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-[#e07a5f] shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Trip Vibe & Goal</label>
            <input
              type="text"
              required
              placeholder="e.g. Alpine crossing, sleeping in tents, sharing sunset cooking"
              value={groupGoal}
              onChange={(e) => setGroupGoal(e.target.value)}
              className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Your Travel Pace / Style</label>
              <input
                type="text"
                required
                placeholder="e.g. Early riser, camera enthusiast, moderate pace"
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Ideal Companion Attributes</label>
              <input
                type="text"
                required
                placeholder="e.g. Positive mindset, endurance trek experience"
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              Publish Expedition & Find Companions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
