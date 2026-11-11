import React, { useState } from 'react';
import { X, MapPin, Clock, Check, Heart, ShieldCheck, Sparkles, Utensils, Coffee, Star, CheckCircle2 } from 'lucide-react';
import { LocalExperienceItem } from '../types';

interface ExperienceDetailModalProps {
  experience: LocalExperienceItem | null;
  onClose: () => void;
  currency: 'INR' | 'USD';
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onBookSuccess: (title: string, date: string, guests: number, total: string) => void;
}

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  experience,
  onClose,
  currency,
  isSaved,
  onToggleSave,
  onBookSuccess,
}) => {
  if (!experience) return null;

  const [date, setDate] = useState('2026-11-20');
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const unitPrice = currency === 'INR' ? experience.priceINR : experience.priceUSD;
  const totalPrice = unitPrice * guests;

  const formatPrice = (amount: number) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount}`;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    onBookSuccess(experience.title, date, guests, formatPrice(totalPrice));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#13261e] border border-[#244335] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative text-[#f4efe8]">
        {/* Hero Visual */}
        <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          {/* Top Floating Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {experience.isExclusive ? (
                <div className="text-xs font-mono uppercase tracking-widest text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 rounded-md font-bold flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                  <span>★ I-EXPLR Exclusive</span>
                </div>
              ) : (
                <div className="text-xs font-mono uppercase tracking-widest text-amber-200 bg-black/70 border border-amber-500/40 px-3 py-1 rounded-md font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>✓ Verified: {experience.organizerName || experience.hostName}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(experience.id)}
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors shadow-sm cursor-pointer"
                title={isSaved ? 'Saved' : 'Save'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors shadow-sm cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-mono mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{experience.location}, {experience.state}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {experience.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isBooked ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-900/60 border border-emerald-400 flex items-center justify-center text-emerald-300 mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">Experience Reserved!</h3>
              <p className="text-xs text-[#a1b8ac] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#f4efe8]">{guestName || 'Explorer'}</strong>. Your spot with <strong className="text-amber-300">{experience.hostName}</strong> for <strong className="text-[#f4efe8]">{experience.title}</strong> on {date} has been confirmed. You will receive host address & meet-up instructions via WhatsApp.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#e07a5f] hover:bg-[#cb684e] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Host Quote & Story */}
              <div className="bg-[#0b1612] p-5 rounded-xl border border-[#244335] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={experience.hostAvatar}
                      alt={experience.hostName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40 shadow-xs"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#f4efe8]">{experience.hostName}</div>
                      <div className="text-xs text-amber-400 font-mono font-medium">{experience.hostRole}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] text-emerald-400 font-mono font-semibold flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>100% Fair Wage Host</span>
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono">
                      {experience.isExclusive ? 'Direct I-EXPLR Crew' : `Verified: ${experience.organizerName}`}
                    </div>
                  </div>
                </div>

                <p className="font-serif text-base text-amber-200 italic leading-snug">
                  "{experience.hook}"
                </p>

                <p className="text-xs text-[#c2d9cc] leading-relaxed font-light">
                  {experience.fullStory}
                </p>
              </div>

              {/* Highlights & Inclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-amber-400 font-mono font-bold">
                    Experience Highlights
                  </h4>
                  {experience.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#c2d9cc]">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-bold">
                    What Is Included
                  </h4>
                  {experience.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#c2d9cc]">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBooking} className="pt-4 border-t border-[#1f3a2c] space-y-4">
                <div className="flex items-center justify-between bg-[#0b1612] p-4 rounded-xl border border-[#244335]">
                  <div>
                    <div className="text-xs text-[#9cb0a4] font-mono">Total for {guests} Person(s)</div>
                    <div className="font-serif text-2xl font-bold text-amber-400">
                      {formatPrice(totalPrice)}
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                    ✓ Small intimate group guaranteed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-amber-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Number of People</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-amber-500 shadow-xs cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num} className="bg-[#13261e] text-[#f4efe8]">
                          {num} Guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sen"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-amber-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-amber-500 shadow-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#e07a5f] hover:bg-[#cb684e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Reserve Experience Window ({formatPrice(totalPrice)})
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
