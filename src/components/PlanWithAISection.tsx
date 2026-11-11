import React, { useState } from 'react';
import { Sparkles, Compass, Send, Check, Loader2, Calendar, MapPin, Users, Flame, Coffee, Bot, MessageSquareQuote, HeartHandshake } from 'lucide-react';

interface AIPlanResult {
  title: string;
  tagline: string;
  destination: string;
  duration: string;
  vibe: string;
  sakiNote?: string;
  itinerary: Array<{ day: number; title: string; highlight: string; activities: string }>;
  localFoodNote: string;
  guideAdvice: string;
  companionVibe: string;
}

export const PlanWithAISection: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIPlanResult | null>(null);

  const samplePrompts = [
    'Saki, plan a weekend escape from Bangalore: Skandagiri sunrise, hot Benne Dosa & campfire music',
    'Saki, 3-day slow travel in Munnar: misty morning tea picking, village cooking & waterfalls',
    'Saki, offbeat cultural weekend in Kannur with Theyyam rituals and quiet temple kavus',
    'Saki, a spontaneous evening in Mangalore: Pabbas ice cream crawl & coastal food',
    'Saki, no-network wilderness trail with an indigenous guide, pottery workshop & live acoustic jamming',
  ];

  const handleGenerate = async (queryText?: string) => {
    const q = queryText || prompt;
    if (!q.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Curated Saki fallback itinerary matching I-EXPLR's exact pillars
      setTimeout(() => {
        setResult({
          title: 'The Whispering Mist & Mountain Hearthstone',
          tagline: 'Where early dawn clouds meet village aromas and crackling embers.',
          destination: 'Western Ghats & Coorg Highlands',
          duration: '3 Days / 2 Nights',
          vibe: 'Soulful, unrushed, acoustic & nature-immersed',
          sakiNote: "I've tailored this route for slow mornings and unhurried steps. Let the cedar breeze clear the mind, and never rush a cup of fresh filter kaapi on a misty ridge. Travel gently, and leave only footprints.",
          itinerary: [
            {
              day: 1,
              title: 'Trade Traffic for Trails & Hilltop Sunset',
              highlight: 'Arrive at an off-grid plantation homestay, brew fresh mountain filter kaapi, and take a twilight ridge walk.',
              activities: 'Wade across crystal streams with local naturalist; listen to evening bird calls and share stories over simple hearth food.',
            },
            {
              day: 2,
              title: 'Dawn Clouds & Sizzling Benne Dosa Feast',
              highlight: 'Start before the alarm; stand above floating sea of clouds as the sky turns gold.',
              activities: 'Descent to the village hearth for hot Davanagere Benne Dosa; afternoon artisan pottery or tea-plucking masterclass.',
            },
            {
              day: 3,
              title: 'Campfire Harmonies & The Stories That Stay',
              highlight: 'Gather around glowing cedar embers with fellow travelers under the Milky Way.',
              activities: 'Acoustic folk songs, sharing travel lore, and leaving as friends with memories to tell for years.',
            },
          ],
          localFoodNote: 'Crispy Benne Dosa, fresh harvested cardamom tea, and slow clay-pot village dum biryani.',
          guideAdvice: 'Travel with a born-and-raised local tracker who knows trails beyond Google Maps and cellular networks.',
          companionVibe: 'Ideal for 2-4 easygoing explorers who cherish laughter, photography, and slow mornings.',
        });
      }, 700);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="plan-with-ai" className="relative py-16 sm:py-20 lg:py-24 bg-[#0f201a] text-[#f4efe8] border-t border-[#1f3a2c] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-4xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>Meet Saki · Plan with AI</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f4efe8] leading-tight">
            Meet Saki. <br />
            <span className="italic font-normal text-amber-300">
              Your Soulful AI Itinerary Architect.
            </span>
          </h2>

          <p className="mt-4 text-[#a1b8ac] text-xs sm:text-base font-light leading-relaxed">
            Say hello to <strong className="text-emerald-300 font-semibold">Saki</strong>, I-EXPLR's dedicated AI travel companion and trip architect. Tell Saki what your soul craves — whether it’s hot Benne Dosa on a sunrise hilltop, picking tea in misty Munnar, taking a pottery wheel workshop, laughing at a standup comedy show, or finding a secret trail beyond network coverage. Saki weaves verified local custodians, seasonal trails, and kindred companion vibes into an unforgettable, unhurried journey.
          </p>
        </div>

        {/* Saki Bot Interface Card */}
        <div className="bg-[#13261e] p-6 sm:p-8 rounded-2xl border border-[#244335] shadow-xl mb-10 sm:mb-12 text-[#f4efe8]">
          {/* Saki Identity Banner */}
          <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-[#1f3a2c]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 via-amber-500/20 to-emerald-600/30 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-inner">
              <Sparkles className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-[#f4efe8]">Saki</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono font-bold uppercase tracking-wider">
                  I-EXPLR AI Bot
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Online
                </span>
              </div>
              <div className="text-xs text-[#9cb0a4] mt-0.5 font-light">
                Ready to co-create your next trek, workshop, or offbeat cultural getaway.
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerate();
            }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full flex-1 flex items-center gap-3 px-4 py-3 bg-[#0b1612] rounded-xl border border-[#244335] focus-within:border-emerald-500 transition-colors">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Ask Saki (e.g. Saki, plan a 2-day escape with campfire, hot dosa, and misty views)..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#f4efe8] placeholder:text-[#8ea699] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 bg-[#1e4a35] hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Saki is Weaving...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Ask Saki</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Inspiration Pills with Saki Prefix */}
            <div className="pt-2">
              <div className="text-[11px] uppercase tracking-wider text-[#9cb0a4] font-mono font-semibold mb-2">
                Or pick an inspiring prompt for Saki:
              </div>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((sp, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setPrompt(sp);
                      handleGenerate(sp);
                    }}
                    className="text-xs px-3.5 py-1.5 rounded-lg bg-[#0b1612] hover:bg-[#1a382b] text-[#c2decb] hover:text-white border border-[#244335] transition-colors text-left cursor-pointer"
                  >
                    "{sp}"
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* AI Itinerary Result Card */}
        {result && (
          <div className="bg-[#13261e] rounded-2xl border border-emerald-500/40 p-6 sm:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 text-[#f4efe8]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-[#1f3a2c]">
              <div>
                <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-mono font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Curated by Saki · I-EXPLR AI Companion · {result.duration}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#f4efe8]">
                  {result.title}
                </h3>
                <p className="mt-1 font-serif text-amber-300 text-sm sm:text-base italic">
                  "{result.tagline}"
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-[#9cb0a4] font-mono">Location & Vibe</div>
                <div className="text-sm font-bold text-[#f4efe8] mt-0.5">{result.destination}</div>
                <div className="text-xs text-amber-400 mt-0.5 font-medium">{result.vibe}</div>
              </div>
            </div>

            {/* Saki's Trail Wisdom / Personal Note */}
            {result.sakiNote && (
              <div className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#0b1612] via-[#0f241a] to-[#0b1612] border border-amber-500/30 flex items-start gap-3.5 text-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquareQuote className="w-4 h-4 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Saki's Note from the Trail:
                  </div>
                  <p className="text-[#e2ece6] font-serif text-sm italic leading-relaxed">
                    "{result.sakiNote}"
                  </p>
                </div>
              </div>
            )}

            {/* Itinerary Days */}
            <div className="py-8 space-y-6">
              <h4 className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">
                Curated Day-By-Day Flow
              </h4>

              <div className="space-y-4">
                {result.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="p-5 rounded-xl bg-[#0b1612] border border-[#244335] space-y-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#1a382b] text-emerald-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-[#2d5843]">
                        Day {day.day}
                      </span>
                      <h5 className="font-serif text-lg font-bold text-[#f4efe8]">{day.title}</h5>
                    </div>

                    <div className="text-xs text-amber-300 font-semibold pl-11">
                      {day.highlight}
                    </div>

                    <div className="text-xs text-[#c2d9cc] leading-relaxed pl-11 font-light">
                      {day.activities}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillar Integration Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-[#1f3a2c] text-xs">
              <div className="p-4 rounded-xl bg-[#0b1612] border border-[#244335] space-y-1">
                <div className="text-amber-400 font-mono font-bold">Local Flavours Highlight</div>
                <div className="text-[#c2d9cc] leading-relaxed">{result.localFoodNote}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0b1612] border border-[#244335] space-y-1">
                <div className="text-emerald-400 font-mono font-bold">Guide Recommendation</div>
                <div className="text-[#c2d9cc] leading-relaxed">{result.guideAdvice}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0b1612] border border-[#244335] space-y-1">
                <div className="text-amber-400 font-mono font-bold">Companion Match</div>
                <div className="text-[#c2d9cc] leading-relaxed">{result.companionVibe}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
