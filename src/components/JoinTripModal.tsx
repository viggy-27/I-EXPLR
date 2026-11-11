import React, { useState } from 'react';
import { X, Send, Check, ShieldCheck } from 'lucide-react';
import { CompanionTrip } from '../types';

interface JoinTripModalProps {
  trip: CompanionTrip | null;
  onClose: () => void;
  onSubmitRequest: (tripId: string, message: string) => void;
}

export const JoinTripModal: React.FC<JoinTripModalProps> = ({
  trip,
  onClose,
  onSubmitRequest,
}) => {
  if (!trip) return null;

  const [message, setMessage] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate Explorer');
  const [contactHandle, setContactHandle] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    onSubmitRequest(trip.id, message);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#13261e] border border-[#244335] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#f4efe8]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#9cb0a4] hover:text-[#f4efe8] hover:bg-[#152e23] rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#132f22] border border-emerald-500/50 flex items-center justify-center text-[#4ade80] mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">Request Sent to {trip.travelerName}!</h3>
            <p className="text-xs text-[#c2d9cc] leading-relaxed max-w-sm mx-auto">
              Your introductory dispatch for the <strong className="text-[#e07a5f]">{trip.destination}</strong> trip has been delivered. {trip.travelerName} will review your profile and reach out via I-EXPLR chat.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#e07a5f] hover:bg-[#d0694e] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Back To Community
            </button>
          </div>
        ) : (
          <div>
            <div className="text-xs uppercase tracking-widest text-[#e07a5f] font-mono font-bold mb-1">
              Join Cohort
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">
              Connect with {trip.travelerName}
            </h3>
            <p className="text-xs text-[#c2d9cc] mt-1 mb-6 font-light">
              Expedition: <strong className="text-[#e07a5f]">{trip.destination}</strong> ({trip.dates})
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Your Trail Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                >
                  <option value="Beginner Outdoor Enthusiast" className="bg-[#0b1612] text-[#f4efe8]">Beginner Outdoor Enthusiast</option>
                  <option value="Intermediate Explorer" className="bg-[#0b1612] text-[#f4efe8]">Intermediate Explorer (Weekend treks completed)</option>
                  <option value="Advanced High-Altitude Trekker" className="bg-[#0b1612] text-[#f4efe8]">Advanced High-Altitude Trekker</option>
                  <option value="Certified Mountaineer" className="bg-[#0b1612] text-[#f4efe8]">Certified Mountaineer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Introduce Yourself to {trip.travelerName}</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share a bit about your past travel, fitness level, and why you’d love to join this journey..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] resize-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Your Instagram / WhatsApp handle</label>
                <input
                  type="text"
                  required
                  placeholder="@yourhandle or +91 98765 43210"
                  value={contactHandle}
                  onChange={(e) => setContactHandle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Companion Request</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
