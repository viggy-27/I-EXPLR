import React, { useState } from 'react';
import { X, Mountain, Flame, Clock, Gauge, Utensils, Check, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { TrekItem } from '../types';

interface TrekDetailModalProps {
  trek: TrekItem | null;
  onClose: () => void;
  currency: 'INR' | 'USD';
  onBookSuccess: (title: string, date: string, count: number, total: string) => void;
}

export const TrekDetailModal: React.FC<TrekDetailModalProps> = ({
  trek,
  onClose,
  currency,
  onBookSuccess,
}) => {
  if (!trek) return null;

  const [date, setDate] = useState('2026-11-21');
  const [explorers, setExplorers] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isDone, setIsDone] = useState(false);

  const unitPrice = currency === 'INR' ? trek.priceINR : trek.priceUSD;
  const totalPrice = unitPrice * explorers;

  const formatPrice = (amount: number) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDone(true);
    onBookSuccess(trek.title, date, explorers, formatPrice(totalPrice));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#13261e] border border-[#244335] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative text-[#f4efe8]">
        {/* Visual Hero */}
        <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
          <img
            src={trek.image}
            alt={trek.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {trek.isExclusive ? (
                <div className="text-xs font-mono uppercase tracking-widest text-stone-950 bg-gradient-to-r from-emerald-400 to-teal-400 px-3 py-1 rounded-md font-bold flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-stone-950" />
                  <span>★ I-EXPLR Exclusive</span>
                </div>
              ) : (
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-300 bg-black/70 border border-emerald-500/40 px-3 py-1 rounded-md font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>✓ Verified: {trek.organizerName}</span>
                </div>
              )}
              <span className="text-xs font-mono text-emerald-200 bg-black/60 px-2.5 py-1 rounded-md">
                {trek.timingType}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors shadow-sm cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="text-xs text-amber-300 font-mono mb-1">
              {trek.location}, {trek.state} · Altitude: {trek.altitude}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {trek.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isDone ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-900/60 border border-emerald-400 flex items-center justify-center text-emerald-300 mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">Trail Slot Confirmed!</h3>
              <p className="text-xs text-[#a1b8ac] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#f4efe8]">{name || 'Explorer'}</strong>. Your spot on <strong className="text-emerald-300">{trek.title}</strong> for {date} has been confirmed. Pack your rucksack — pickup point instructions will be sent via WhatsApp.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Organizer Trust Row */}
              <div className="p-3.5 rounded-xl bg-[#0b1612] border border-[#244335] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[#e0e8e4]">
                    {trek.isExclusive
                      ? 'Conducted directly by I-EXPLR certified mountain leads'
                      : `Organized by KYC verified operator: ${trek.organizerName}`}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-300 font-mono">Permits & Insurance Verified</span>
              </div>

              {/* Narrative */}
              <div>
                <h4 className="font-serif text-xl font-bold text-[#f4efe8] mb-2">The Trail Story</h4>
                <p className="text-xs text-[#c2d9cc] leading-relaxed font-light">
                  {trek.fullDescription}
                </p>
              </div>

              {/* Trail Feast Highlight */}
              <div className="p-4 rounded-xl bg-[#0b1612] border border-[#244335] flex items-start gap-3">
                <Utensils className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                    Special Trail Feast Included
                  </div>
                  <div className="text-xs text-[#c2d9cc] mt-1 leading-relaxed">
                    {trek.foodHighlight}
                  </div>
                </div>
              </div>

              {/* Highlights & Inclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-xs uppercase tracking-wider text-amber-400 font-mono font-bold">Highlights</h5>
                  {trek.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#c2d9cc]">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h5 className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-bold">Inclusions</h5>
                  {trek.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#c2d9cc]">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="pt-4 border-t border-[#1f3a2c] space-y-4">
                <div className="flex items-center justify-between bg-[#0b1612] p-4 rounded-xl border border-[#244335]">
                  <div>
                    <div className="text-xs text-[#9cb0a4] font-mono">Total for {explorers} Explorer(s)</div>
                    <div className="font-serif text-2xl font-bold text-emerald-300">
                      {formatPrice(totalPrice)}
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                    ✓ Verified trail lead & forest permits included
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Departure Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-emerald-500 shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Number of Explorers</label>
                    <select
                      value={explorers}
                      onChange={(e) => setExplorers(parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-emerald-500 shadow-xs cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n} className="bg-[#13261e] text-[#f4efe8]">
                          {n} Explorer{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Lead Explorer Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Varma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-emerald-500 shadow-xs"
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
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-emerald-500 shadow-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Confirm Trail Slot ({formatPrice(totalPrice)})
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
