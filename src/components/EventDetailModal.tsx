import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Ticket, Check, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { EventItem } from '../types';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  currency: 'INR' | 'USD';
  onBookSuccess: (title: string, date: string, count: number, total: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  currency,
  onBookSuccess,
}) => {
  if (!event) return null;

  const [passesCount, setPassesCount] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isDone, setIsDone] = useState(false);

  const unitPrice = currency === 'INR' ? event.priceINR : event.priceUSD;
  const totalPrice = unitPrice * passesCount;

  const formatPrice = (amount: number) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDone(true);
    onBookSuccess(event.title, event.date, passesCount, formatPrice(totalPrice));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#13261e] border border-[#244335] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-[#f4efe8]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-900/60 border border-amber-400 flex items-center justify-center text-amber-300 mx-auto">
              <Ticket className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">Event Pass Issued!</h3>
            <div className="bg-[#0b1612] p-4 rounded-xl border border-[#244335] max-w-sm mx-auto text-left space-y-1 text-xs">
              <div className="text-[#f4efe8] font-semibold">{event.title}</div>
              <div className="text-amber-400 font-mono font-medium">{event.date} · {event.time}</div>
              <div className="text-[#9cb0a4]">{event.venue}, {event.city}</div>
              <div className="text-[11px] text-stone-400 pt-2 border-t border-[#1f3a2c]">
                Passholder: {name} ({passesCount} Pass{passesCount > 1 ? 'es' : ''})
              </div>
              <div className="text-[10px] text-amber-300 font-mono">
                {event.isExclusive ? '★ Conducted by I-EXPLR' : `Hosted by ${event.organizerName}`}
              </div>
            </div>
            <p className="text-xs text-[#a1b8ac] max-w-sm mx-auto leading-relaxed">
              Your digital entry pass has been emailed to <strong className="text-[#f4efe8]">{email}</strong>. Show this screen or the email QR at the entrance gate.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Done & Make It A Night
            </button>
          </div>
        ) : (
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-2">
              {event.isExclusive ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-[11px] shadow-sm">
                  <Sparkles className="w-3 h-3 fill-stone-950" />
                  ★ I-EXPLR Exclusive Production
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px]">
                  <CheckCircle2 className="w-3 h-3" />
                  ✓ Partner Verified Host: {event.organizerName}
                </span>
              )}
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">
                {event.genre}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#f4efe8] leading-tight">
              {event.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#9cb0a4] font-mono mt-2 mb-4">
              <span>{event.date}</span>
              <span aria-hidden="true">·</span>
              <span>{event.time}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-medium">{event.venue}, {event.city}</span>
            </div>

            {/* Host info box */}
            <div className="p-3 mb-4 rounded-xl bg-[#0b1612] border border-[#244335] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[#e0e8e4]">
                  {event.isExclusive
                    ? 'Conducted directly by I-EXPLR Experiential Crew'
                    : `Organized by verified partner: ${event.organizerName}`}
                </span>
              </div>
              <span className="text-[11px] text-amber-300 font-mono">KYC Verified</span>
            </div>

            <p className="text-xs text-[#c2d9cc] leading-relaxed font-light mb-4">
              {event.fullDescription}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 pt-3 border-t border-[#1f3a2c]">
              <div className="flex items-center justify-between bg-[#0b1612] p-3.5 rounded-xl border border-[#244335]">
                <div>
                  <div className="text-xs text-[#9cb0a4] font-mono">Total for {passesCount} Pass(es)</div>
                  <div className="font-serif text-xl font-bold text-amber-400">
                    {formatPrice(totalPrice)}
                  </div>
                </div>
                <div className="text-xs text-[#9cb0a4] font-mono">
                  {event.spotsLeft} remaining
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Sen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-amber-500 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Pass Count</label>
                  <select
                    value={passesCount}
                    onChange={(e) => setPassesCount(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-amber-500 shadow-xs cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-[#13261e] text-[#f4efe8]">
                        {n} Pass{n > 1 ? 'es' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Email for Pass Delivery</label>
                <input
                  type="email"
                  required
                  placeholder="maya@i-explr.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-amber-500 shadow-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Confirm Event Pass ({formatPrice(totalPrice)})
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
