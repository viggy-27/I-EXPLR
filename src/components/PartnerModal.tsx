import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Building, Mountain, MapPin } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (name: string, role: string) => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  if (!isOpen) return null;

  const [partnerType, setPartnerType] = useState('Local Mountain Guide');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pitch, setPitch] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmitSuccess(name, partnerType);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#0b1712] border border-emerald-900/60 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Application Received!</h3>
            <p className="text-xs text-stone-300 leading-relaxed max-w-md mx-auto">
              Welcome to the I-EXPLR fold, <strong className="text-amber-300">{name}</strong>. Our Community Partnership Committee reviews applications weekly. We will reach out via WhatsApp/email within 48 hours for an onboarding conversation.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono mb-1">
              Join Our Network
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Become an I-EXPLR Partner
            </h3>
            <p className="text-xs text-stone-300 mt-2 mb-6 leading-relaxed font-light">
              Are you an indigenous guide, homestay steward, or experiential outfitter committed to authentic travel and Leave-No-Trace principles? Join our verified ecosystem.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">I am applying as a:</label>
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#091510] rounded border border-emerald-900/60 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Local Mountain Guide">Certified Local Mountain Guide / Sherpa</option>
                  <option value="Experiential Homestay Steward">Heritage / Rural Homestay Host</option>
                  <option value="Wilderness Retreat / Camp">Eco-Campsite / Wilderness Retreat</option>
                  <option value="Whitewater / Adventure Specialist">Whitewater / Caving / Adventure Outfitter</option>
                  <option value="Naturalist & Ethnobotanist">Naturalist & Ethnobotanist</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Full Name / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tenzing Sherpa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#091510] rounded border border-emerald-900/60 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Region of Mastery</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Spiti Valley & Ladakh"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 bg-[#091510] rounded border border-emerald-900/60 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="guide@partner.i-explr.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#091510] rounded border border-emerald-900/60 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#091510] rounded border border-emerald-900/60 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Tell us about your experience & safety protocols</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details regarding your field certifications, terrain knowledge, and how you uphold sustainable travel..."
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  className="w-full px-3 py-2 bg-[#091510] rounded border border-emerald-900/60 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded transition-all shadow-lg shadow-emerald-950/40"
                >
                  Submit Partnership Application
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
