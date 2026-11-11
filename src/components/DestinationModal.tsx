import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Gauge, Check, ShieldCheck, Heart, Share2, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Destination } from '../types';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  currency: 'INR' | 'USD';
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onBookSuccess: (tripName: string, date: string, guests: number, total: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  currency,
  isSaved,
  onToggleSave,
  onBookSuccess,
}) => {
  if (!destination) return null;

  const [activeTab, setActiveTab] = useState<'itinerary' | 'details' | 'gear' | 'book'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-15');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [checkedGear, setCheckedGear] = useState<Record<string, boolean>>({});
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const unitPrice = currency === 'INR' ? destination.priceINR : destination.priceUSD;
  const totalPrice = unitPrice * guestsCount;

  const formatPrice = (amount: number) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    onBookSuccess(destination.title, selectedDate, guestsCount, formatPrice(totalPrice));
  };

  const toggleGearItem = (gear: string) => {
    setCheckedGear((prev) => ({ ...prev, [gear]: !prev[gear] }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#13261e] border border-[#244335] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative text-[#f4efe8]">
        {/* Header Bar */}
        <div className="relative h-64 sm:h-80 overflow-hidden shrink-0">
          <img
            src={destination.image}
            alt={destination.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Top Floating Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md font-semibold">
              {destination.category}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(destination.id)}
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-[#f4efe8] transition-colors shadow-sm"
                title={isSaved ? 'Saved' : 'Save'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-[#f4efe8] transition-colors shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & Metadata Overlay */}
          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{destination.location}, {destination.stateOrCountry}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              {destination.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-200 mt-2 font-mono">
              <span>{destination.duration}</span>
              {destination.difficulty && (
                <>
                  <span aria-hidden="true" className="text-stone-400">·</span>
                  <span>Difficulty: {destination.difficulty}</span>
                </>
              )}
              {destination.maxAltitude && (
                <>
                  <span aria-hidden="true" className="text-stone-400">·</span>
                  <span>Altitude: {destination.maxAltitude}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 bg-[#0b1612] border-b border-[#244335] text-xs overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'itinerary'
                ? 'bg-[#1e4a35] text-white shadow-sm border border-emerald-500/30'
                : 'text-[#9cb0a4] hover:text-[#f4efe8] hover:bg-[#152e23]'
            }`}
          >
            Day-by-Day Itinerary ({destination.itinerary.length} Days)
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'details'
                ? 'bg-[#1e4a35] text-white shadow-sm border border-emerald-500/30'
                : 'text-[#9cb0a4] hover:text-[#f4efe8] hover:bg-[#152e23]'
            }`}
          >
            Inclusions & Highlights
          </button>
          <button
            onClick={() => setActiveTab('gear')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'gear'
                ? 'bg-[#1e4a35] text-white shadow-sm border border-emerald-500/30'
                : 'text-[#9cb0a4] hover:text-[#f4efe8] hover:bg-[#152e23]'
            }`}
          >
            Gear Checklist ({destination.gearChecklist.length})
          </button>
          <button
            onClick={() => setActiveTab('book')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'book'
                ? 'bg-[#e07a5f] text-white shadow-sm'
                : 'bg-[#0b1612] border border-[#244335] text-[#e07a5f] hover:text-white hover:bg-[#152e23]'
            }`}
          >
            Reserve Slot ({formatPrice(unitPrice)})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#e07a5f] font-mono font-bold">
                Expedition Route Breakdown
              </div>
              <div className="space-y-3">
                {destination.itinerary.map((day) => {
                  const isExpanded = expandedDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className="bg-[#0b1612] rounded-xl border border-[#244335] overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedDay(isExpanded ? 0 : day.day)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#152e23] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded bg-[#1e4a35] text-[#4ade80] text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-[#244335]">
                            D{day.day}
                          </span>
                          <div>
                            <div className="text-sm font-semibold text-[#f4efe8]">{day.title}</div>
                            {(day.elevation || day.distance) && (
                              <div className="text-[11px] text-[#9cb0a4] font-mono">
                                {day.elevation && `Elevation: ${day.elevation}`}
                                {day.elevation && day.distance && ' · '}
                                {day.distance && `Trek: ${day.distance}`}
                              </div>
                            )}
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#9cb0a4]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#9cb0a4]" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 text-xs text-[#c2d9cc] leading-relaxed border-t border-[#244335]">
                          {day.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: INCLUSIONS & HIGHLIGHTS */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#f4efe8] mb-3">About This Expedition</h4>
                <p className="text-xs text-[#c2d9cc] leading-relaxed font-light">
                  {destination.longDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#e07a5f] font-mono font-bold mb-3">
                  Key Journey Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#c2d9cc]">
                      <Check className="w-3.5 h-3.5 text-[#e07a5f] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#244335]">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#4ade80] font-mono font-bold mb-3">
                    What's Included
                  </h4>
                  <ul className="space-y-2 text-xs text-[#c2d9cc]">
                    {destination.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#4ade80] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#9cb0a4] font-mono font-bold mb-3">
                    Exclusions
                  </h4>
                  <ul className="space-y-2 text-xs text-[#9cb0a4]">
                    {destination.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-stone-500 font-bold">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GEAR CHECKLIST */}
          {activeTab === 'gear' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#f4efe8]">Recommended Trail Gear</h4>
                <p className="text-xs text-[#9cb0a4] mt-1">
                  Check off items as you pack your rucksack. Inadequate equipment will prevent departure for safety reasons.
                </p>
              </div>

              <div className="space-y-2">
                {destination.gearChecklist.map((gear, i) => {
                  const isChecked = !!checkedGear[gear];
                  return (
                    <button
                      key={i}
                      onClick={() => toggleGearItem(gear)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                        isChecked
                          ? 'bg-[#132f22] border-emerald-500/50 text-[#f4efe8]'
                          : 'bg-[#0b1612] border-[#244335] text-[#c2d9cc] hover:bg-[#152e23]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-[#1e4a35] border-emerald-500 text-white' : 'border-[#244335]'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-[#4ade80]" />}
                      </div>
                      <span className={`text-xs ${isChecked ? 'line-through text-[#6f8277]' : ''}`}>
                        {gear}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: BOOKING / INQUIRY */}
          {activeTab === 'book' && (
            <div>
              {bookingConfirmed ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#132f22] border border-emerald-500/50 flex items-center justify-center text-[#4ade80] mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">Expedition Slot Reserved!</h3>
                  <p className="text-xs text-[#c2d9cc] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{fullName || 'Explorer'}</strong>. Your provisional booking for <strong className="text-[#e07a5f]">{destination.title}</strong> has been secured. Our expedition lead will connect via WhatsApp/Email with pre-trek fitness protocols.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2.5 bg-[#e07a5f] hover:bg-[#d0694e] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                  >
                    Done & Return To Explore
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="bg-[#0b1612] p-4 rounded-xl border border-[#244335] flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#e07a5f] font-mono font-bold">Total Estimated Cost</div>
                      <div className="font-serif text-2xl font-bold text-[#f4efe8]">
                        {formatPrice(totalPrice)}
                      </div>
                      <div className="text-[10px] text-[#9cb0a4]">
                        {guestsCount} Explorer{guestsCount > 1 ? 's' : ''} · Includes permits, meals & sherpa team
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-[#4ade80] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Zero Cancellation Risk</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Select Cohort Date</label>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Number of Explorers</label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num} className="bg-[#0b1612] text-[#f4efe8]">
                            {num} Explorer{num > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Sen"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="explorer@i-explr.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Confirm Expedition Reservation ({formatPrice(totalPrice)})
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
