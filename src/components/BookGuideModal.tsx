import React, { useState } from 'react';
import { X, Calendar, MessageSquare, Check, ShieldCheck, Star } from 'lucide-react';
import { LocalGuide } from '../types';

interface BookGuideModalProps {
  guide: LocalGuide | null;
  onClose: () => void;
  currency: 'INR' | 'USD';
  onBookingSuccess: (guideName: string, dates: string) => void;
}

export const BookGuideModal: React.FC<BookGuideModalProps> = ({
  guide,
  onClose,
  currency,
  onBookingSuccess,
}) => {
  if (!guide) return null;

  const [dateRange, setDateRange] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [details, setDetails] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isDone, setIsDone] = useState(false);

  const formatRate = (amount: number) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDone(true);
    onBookingSuccess(guide.name, dateRange);
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

        {isDone ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#132f22] border border-emerald-500/50 flex items-center justify-center text-[#4ade80] mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">Inquiry Forwarded to {guide.name}!</h3>
            <p className="text-xs text-[#c2d9cc] leading-relaxed max-w-sm mx-auto">
              Your inquiry has been directly dispatched to {guide.name}. You will receive a direct WhatsApp / SMS confirmation within 12 hours with route feasibility notes.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#e07a5f] hover:bg-[#d0694e] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            {/* Guide Header Card */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-[#244335] mb-5">
              <img
                src={guide.avatar}
                alt={guide.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/40 shadow-xs"
              />
              <div>
                <div className="text-xs text-[#e07a5f] font-mono font-bold">{guide.region}</div>
                <h3 className="font-serif text-xl font-bold text-[#f4efe8]">{guide.name}</h3>
                <div className="text-xs text-[#c2d9cc] font-medium">
                  {guide.specialty} · <span className="text-amber-400">★ {guide.rating}</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-[#c2d9cc] mb-4 bg-[#0b1612] p-3 rounded-xl border border-[#244335] flex justify-between items-center">
              <span className="font-medium text-[#9cb0a4]">Daily Honorarium:</span>
              <span className="font-serif text-sm font-bold text-amber-400">
                {formatRate(currency === 'INR' ? guide.dailyRateINR : guide.dailyRateUSD)} / day
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Joshi"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#f4efe8] mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Target Dates / Month</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oct 12 – Oct 16"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Party Size</label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n} className="bg-[#0b1612] text-[#f4efe8]">
                        {n} Explorer{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Route Objectives or Custom Request</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell the guide about your expected trail, desired summit, acclimatization requirements..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] resize-none shadow-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Send Booking Request To {guide.name}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
