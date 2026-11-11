import React, { useState } from 'react';
import { X, Flame, Check, Sparkles } from 'lucide-react';
import { TravelerStory } from '../types';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitStory: (story: TravelerStory) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  onSubmitStory,
}) => {
  if (!isOpen) return null;

  const [author, setAuthor] = useState('');
  const [tripTitle, setTripTitle] = useState('');
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [story, setStory] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStory: TravelerStory = {
      id: `story-${Date.now()}`,
      author,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      tripTitle,
      location,
      quote,
      story,
      photo: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1200&auto=format&fit=crop',
      date: 'Just now',
    };
    onSubmitStory(newStory);
    setIsDone(true);
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
            <div className="w-14 h-14 rounded-full bg-[#241a10] border border-amber-500/50 flex items-center justify-center text-amber-400 mx-auto">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">Story Added to the Embers!</h3>
            <p className="text-xs text-[#c2d9cc] leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-[#e07a5f]">{author}</strong>. Your story will now kindle the campfire carousel for fellow travelers seeking meaning.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#e07a5f] hover:bg-[#d0694e] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Back To Campfire
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#e07a5f] font-mono font-bold mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Embers & Lore</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f4efe8]">
              Share Your Trail Story
            </h3>
            <p className="text-xs text-[#c2d9cc] mt-1 mb-6 font-light">
              What meaningful revelation or fireside bond did you discover on the trail? Share your words with the I-EXPLR community.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya & Siddharth"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Trail / Region</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pin Parvati Pass"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Trip / Story Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Night Over the Glacial Cirque"
                  value={tripTitle}
                  onChange={(e) => setTripTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Key Fireside Quote</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The mountain didn't challenge us; it welcomed us back to ourselves."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f4efe8] mb-1">Full Story</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write from the heart about the silence, the companions, or the lesson learned..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1612] rounded-lg border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] resize-none shadow-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-200" />
                  <span>Kindle This Story Around The Campfire</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
