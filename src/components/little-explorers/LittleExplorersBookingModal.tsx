import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Download, 
  Share2 
} from 'lucide-react';
import { LittleExplorerExperience, LITTLE_EXPLORER_EXPERIENCES } from '../../data/littleExplorersData';

interface LittleExplorersBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedExperience: LittleExplorerExperience | null;
  onBookingSuccess: (bookingDetails: {
    refId: string;
    experienceTitle: string;
    parentName: string;
    childrenCount: number;
    adultsCount: number;
    date: string;
    totalAmount: number;
  }) => void;
}

export const LittleExplorersBookingModal: React.FC<LittleExplorersBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedExperience,
  onBookingSuccess,
}) => {
  const [selectedExpId, setSelectedExpId] = useState<string>(
    preselectedExperience?.id || LITTLE_EXPLORER_EXPERIENCES[0].id
  );
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('7');
  const [childrenCount, setChildrenCount] = useState(1);
  const [adultsCount, setAdultsCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState('Saturday, Nov 15');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [transportNeeded, setTransportNeeded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const currentExp = LITTLE_EXPLORER_EXPERIENCES.find((e) => e.id === selectedExpId) || LITTLE_EXPLORER_EXPERIENCES[0];

  const childTotal = currentExp.pricePerChild * childrenCount;
  const adultTotal = (currentExp.escortPrice || 600) * adultsCount;
  const transportFee = transportNeeded ? 350 * (childrenCount + adultsCount) : 0;
  const grandTotal = childTotal + adultTotal + transportFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `LE-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
    onBookingSuccess({
      refId: ref,
      experienceTitle: currentExp.title,
      parentName,
      childrenCount,
      adultsCount,
      date: selectedDate,
      totalAmount: grandTotal,
    });
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0d1d16] border border-[#214332] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden text-[#f4efe8] max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 bg-gradient-to-b from-[#132c20] to-[#0d1d16] border-b border-[#1d3d2c] flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400 block">
              LITTLE EXPLORERS BY I-EXPLR
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
              {isSubmitted ? 'Adventure Reserved!' : 'Enquire & Book Experience'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full bg-stone-900/60 border border-stone-700/60 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Success Receipt View */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  Booking Confirmed
                </span>
                <h4 className="text-2xl font-serif font-bold text-white">
                  Welcome to Little Explorers!
                </h4>
                <p className="text-stone-300 text-sm mt-1 max-w-md mx-auto">
                  We've reserved the spot for <span className="text-amber-300 font-semibold">{childName || 'your young explorer'}</span> on <span className="text-white font-medium">{currentExp.title}</span>.
                </p>
              </div>

              {/* Receipt Ticket Box */}
              <div className="bg-[#12271e] border border-[#234b36] rounded-2xl p-5 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-[#1f3f2e] pb-2">
                  <span className="text-stone-400">Reservation Reference:</span>
                  <span className="text-amber-400 font-bold tracking-wider">{bookingRef}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1f3f2e] pb-2">
                  <span className="text-stone-400">Date:</span>
                  <span className="text-stone-100">{selectedDate}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1f3f2e] pb-2">
                  <span className="text-stone-400">Location:</span>
                  <span className="text-stone-100">{currentExp.location}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1f3f2e] pb-2">
                  <span className="text-stone-400">Explorers:</span>
                  <span className="text-stone-100">{childrenCount} Child{childrenCount > 1 ? 'ren' : ''}, {adultsCount} Adult{adultsCount > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between items-center pt-1 text-sm font-sans font-bold">
                  <span className="text-stone-200">Total Payable:</span>
                  <span className="text-emerald-300">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="bg-[#14261d] border border-[#1e3c2d] rounded-xl p-4 text-left text-xs text-stone-300 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold font-serif uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" /> What to expect next:
                </div>
                <p>
                  1. A detailed WhatsApp packing list (boots, water bottle, extra change) will be sent to <span className="text-white font-medium">{phone || '+91 98450 12345'}</span>.
                </p>
                <p>
                  2. Our lead naturalist will coordinate the morning arrival point and dietary preparations.
                </p>
                <p>
                  3. Emergency contacts and live broadcast group link will be shared 24 hours prior.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Done & Back to Adventures
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Experience */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2">
                  Choose Experience Category
                </label>
                <select
                  value={selectedExpId}
                  onChange={(e) => setSelectedExpId(e.target.value)}
                  className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {LITTLE_EXPLORER_EXPERIENCES.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.title} ({exp.ageSuitability}) — ₹{exp.pricePerChild}/child
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Available Weekend Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {currentExp.nextAvailableDates.map((date) => (
                    <button
                      type="button"
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        selectedDate === date
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md'
                          : 'bg-[#12271d] text-stone-300 border-[#204231] hover:border-amber-500/50'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Headcount Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#11231a] border border-[#1f3d2e] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-stone-100 block">Children</span>
                    <span className="text-[11px] text-stone-400">₹{currentExp.pricePerChild} per child</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildrenCount(Math.max(1, childrenCount - 1))}
                      className="w-8 h-8 rounded-lg bg-[#183627] border border-[#255039] text-stone-200 hover:bg-[#204432] flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-amber-300">{childrenCount}</span>
                    <button
                      type="button"
                      onClick={() => setChildrenCount(Math.min(6, childrenCount + 1))}
                      className="w-8 h-8 rounded-lg bg-[#183627] border border-[#255039] text-stone-200 hover:bg-[#204432] flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:border-l sm:border-[#1f3d2e] sm:pl-4">
                  <div>
                    <span className="text-xs font-bold text-stone-100 block">Accompanying Adults</span>
                    <span className="text-[11px] text-stone-400">₹{currentExp.escortPrice || 600} per escort</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                      className="w-8 h-8 rounded-lg bg-[#183627] border border-[#255039] text-stone-200 hover:bg-[#204432] flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-amber-300">{adultsCount}</span>
                    <button
                      type="button"
                      onClick={() => setAdultsCount(Math.min(4, adultsCount + 1))}
                      className="w-8 h-8 rounded-lg bg-[#183627] border border-[#255039] text-stone-200 hover:bg-[#204432] flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Child Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                    Child's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                    Child's Age (Years) *
                  </label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((age) => (
                      <option key={age} value={age}>
                        {age} Years Old
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Parent Contact Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98450 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                      Emergency Secondary Contact
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 99800 54321"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Dietary / Allergies & Optional Transport */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                  Dietary Preferences / Allergies (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nut allergy, Vegetarian, Mild spices only"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-3 bg-[#11241b] border border-[#1f3f2f] rounded-xl p-3">
                <input
                  type="checkbox"
                  id="transportCheck"
                  checked={transportNeeded}
                  onChange={(e) => setTransportNeeded(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-stone-900 border-stone-700"
                />
                <label htmlFor="transportCheck" className="text-xs text-stone-300 cursor-pointer">
                  Require sanitized AC mini-coach pickup & drop from central city hub (+₹350/person)
                </label>
              </div>

              {/* Pricing Summary Box */}
              <div className="bg-[#09150f] border border-[#1d3d2c] rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-xs text-stone-400">
                  <span>Children Passes ({childrenCount} × ₹{currentExp.pricePerChild}):</span>
                  <span>₹{childTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-400">
                  <span>Adult Escorts ({adultsCount} × ₹{currentExp.escortPrice || 600}):</span>
                  <span>₹{adultTotal.toLocaleString('en-IN')}</span>
                </div>
                {transportNeeded && (
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>AC Group Shuttle ({childrenCount + adultsCount} × ₹350):</span>
                    <span>₹{transportFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="border-t border-[#1d3d2c] pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Estimated Total:</span>
                  <span className="text-xl font-serif font-bold text-amber-400">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm Reservation & Generate Pass</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
