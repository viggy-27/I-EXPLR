import React, { useState } from 'react';
import { X, User, Heart, Compass, CheckCircle, Shield, LogOut } from 'lucide-react';
import { UserProfile, Destination } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  isLoggedIn: boolean;
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  bookedTrips: Array<{ tripName: string; date: string; guests: number; total: string }>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  isLoggedIn,
  onLogin,
  onLogout,
  destinations,
  onSelectDestination,
  bookedTrips,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'bookings'>('profile');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const savedDestinationsList = destinations.filter((d) =>
    user.savedDestinations.includes(d.id)
  );

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput && emailInput) {
      onLogin(nameInput, emailInput);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#13261e] border border-[#244335] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col text-[#f4efe8]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#9cb0a4] hover:text-[#f4efe8] hover:bg-[#152e23] rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isLoggedIn ? (
          <div>
            <div className="text-xs uppercase tracking-widest text-[#e07a5f] font-mono font-bold mb-1">
              Explorer Portal
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f4efe8] mb-2">
              Join the I-EXPLR Circle
            </h3>
            <p className="text-xs text-[#c2d9cc] font-light mb-6">
              Create your explorer identity, save offbeat routes, match with fellow expeditioners, and book certified sherpa guides.
            </p>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Explorer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Sen"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="maya@i-explr.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Enter I-EXPLR Community
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-[#244335]">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/40 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-lg font-bold text-[#f4efe8]">{user.name}</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xs text-[#9cb0a4]">{user.email} · {user.location}</div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="text-[#9cb0a4] hover:text-rose-400 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex items-center gap-2 py-3 border-b border-[#244335] text-xs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeTab === 'profile' ? 'bg-[#1e4a35] text-white border border-emerald-500/30' : 'text-[#9cb0a4] hover:text-[#f4efe8]'
                }`}
              >
                Explorer Bio
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeTab === 'saved' ? 'bg-[#1e4a35] text-white border border-emerald-500/30' : 'text-[#9cb0a4] hover:text-[#f4efe8]'
                }`}
              >
                Saved Wishlist ({user.savedDestinations.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeTab === 'bookings' ? 'bg-[#1e4a35] text-white border border-emerald-500/30' : 'text-[#9cb0a4] hover:text-[#f4efe8]'
                }`}
              >
                Active Bookings ({bookedTrips.length})
              </button>
            </div>

            {/* Tab content */}
            <div className="py-4 overflow-y-auto flex-1 space-y-4">
              {activeTab === 'profile' && (
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[#e07a5f] font-mono uppercase tracking-wider font-bold">About Explorer:</span>
                    <p className="text-[#c2d9cc] mt-1 leading-relaxed">{user.bio}</p>
                  </div>

                  <div>
                    <span className="text-[#e07a5f] font-mono uppercase tracking-wider font-bold">Travel Passions:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.interests.map((interest, i) => (
                        <span key={i} className="text-[#f4efe8] bg-[#0b1612] px-2.5 py-1 rounded-lg border border-[#244335] font-medium">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0b1612] p-4 rounded-xl border border-[#244335] text-[#9cb0a4] space-y-1">
                    <div className="text-[#4ade80] font-semibold">Community Trust Score: 100%</div>
                    <div>Identity verified via phone and digital ID. Leave No Trace badge earned.</div>
                  </div>
                </div>
              )}

              {activeTab === 'saved' && (
                <div className="space-y-3">
                  {savedDestinationsList.length === 0 ? (
                    <div className="text-center py-8 text-[#9cb0a4] text-xs">
                      No saved expeditions yet. Click the heart icon on any trail card to save it here.
                    </div>
                  ) : (
                    savedDestinationsList.map((dest) => (
                      <div
                        key={dest.id}
                        className="flex items-center justify-between p-3 bg-[#0b1612] rounded-xl border border-[#244335] hover:border-amber-500/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={dest.image}
                            alt={dest.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-xs font-semibold text-[#f4efe8] truncate max-w-[200px] sm:max-w-xs">
                              {dest.title}
                            </div>
                            <div className="text-[11px] text-[#e07a5f] font-mono font-medium">{dest.location}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onSelectDestination(dest);
                          }}
                          className="px-3 py-1 bg-[#1e4a35] hover:bg-[#e07a5f] text-white font-bold text-xs uppercase rounded-lg transition-colors shadow-sm cursor-pointer"
                        >
                          View
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="space-y-3">
                  {bookedTrips.length === 0 ? (
                    <div className="text-center py-8 text-[#9cb0a4] text-xs">
                      No active bookings yet. Reserve an expedition slot from any destination page.
                    </div>
                  ) : (
                    bookedTrips.map((b, i) => (
                      <div
                        key={i}
                        className="p-3 bg-[#0b1612] rounded-xl border border-[#244335] space-y-1"
                      >
                        <div className="text-xs font-semibold text-[#f4efe8]">{b.tripName}</div>
                        <div className="text-[11px] text-[#9cb0a4] font-mono">
                          Date: {b.date} · {b.guests} Explorer(s) · {b.total}
                        </div>
                        <div className="text-[10px] text-[#4ade80] font-semibold">
                          ✓ Confirmed with Mountain Guide
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
