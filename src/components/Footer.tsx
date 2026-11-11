import React, { useState } from 'react';
import { Compass, Flame, Send, Check, Heart, Shield, Trees, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenPartner: () => void;
  onNavigateLittleExplorers?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenPartner, onNavigateLittleExplorers }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0c1f17] text-[#ded6cb] border-t border-[#1b382b] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-emerald-900/40">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-emerald-900 flex items-center justify-center text-amber-200">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] font-bold text-white uppercase">
                I-EXPLR
              </span>
            </div>

            <p className="font-serif text-sm text-amber-200/90 italic">
              "Where Every Journey Finds Meaning."
            </p>

            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              I-EXPLR connects adventurous souls, certified sherpas, and remote homestays to bring purpose, kinship, and ecological stewardship back to exploration.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-stone-400 font-mono">
              <span>Himalayas</span>
              <span aria-hidden="true">·</span>
              <span>Western Ghats</span>
              <span aria-hidden="true">·</span>
              <span>Northeast India</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
              Expeditions
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Mountain Adventures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-amber-300 transition-colors"
                >
                  High Altitude Trekking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Wilderness Camping
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Trans-Himalayan Road Trips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('explore')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Whitewater & Caving
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Guides */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
              Community
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('companions')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Find Travel Companions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('guides')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Certified Mountain Guides
                </button>
              </li>
              {onNavigateLittleExplorers && (
                <li>
                  <button
                    onClick={onNavigateLittleExplorers}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-emerald-300 font-semibold"
                  >
                    <span>Little Explorers (Kids)</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                      New
                    </span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenPartner}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Join as Partner (KYC)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-700/40">
                    Verified
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-amber-300 transition-colors"
                >
                  The I-EXPLR Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Leave No Trace Oath
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
              The Trail Dispatch
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Curated trail openings, astronomical stargazing calendars, and companion dispatch reports delivered every new moon.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-950/60 rounded border border-emerald-700/50 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You're on the trail list! Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#091510] rounded border border-emerald-900/60 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded transition-colors shrink-0"
                    title="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10px] text-stone-400">Zero spam. Sacred trails only.</div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} I-EXPLR Outdoor Technologies Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-emerald-400">100% Direct Fair Wages</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400">Eco-Certified</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-[#0f221a] text-stone-300 hover:text-white border border-emerald-900/60 ml-2"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
