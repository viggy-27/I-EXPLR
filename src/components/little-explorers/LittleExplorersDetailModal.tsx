import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  Heart,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { LittleExplorerExperience } from '../../data/littleExplorersData';

interface LittleExplorersDetailModalProps {
  experience: LittleExplorerExperience | null;
  onClose: () => void;
  onBook: (experience: LittleExplorerExperience) => void;
}

export const LittleExplorersDetailModal: React.FC<LittleExplorersDetailModalProps> = ({
  experience,
  onClose,
  onBook,
}) => {
  if (!experience) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0d1d16] border border-[#214332] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden text-[#f4efe8] max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Image & Hero Overlay */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0">
          <img
            src={experience.heroImage}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1d16] via-[#0d1d16]/50 to-stone-950/40" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-900/80 border border-stone-700/60 text-stone-200 hover:text-white hover:bg-stone-800 transition-all z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Age */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-500 text-stone-950 shadow-md">
              {experience.badge}
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#142e22]/90 border border-[#2b543f] text-emerald-300 backdrop-blur-sm">
              {experience.ageSuitability}
            </span>
          </div>

          {/* Title & Tagline in hero bottom */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{experience.location}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {experience.title}
            </h2>
            <p className="text-sm text-stone-300 italic mt-0.5">
              "{experience.tagline}"
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#11271e] border border-[#1e3f2f] rounded-2xl p-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Duration
              </div>
              <div className="text-sm font-bold text-stone-100 mt-1">{experience.duration}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" /> Group Size
              </div>
              <div className="text-sm font-bold text-stone-100 mt-1">{experience.groupSize}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Staff Ratio
              </div>
              <div className="text-sm font-bold text-emerald-300 mt-1">{experience.ratio}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Child Pass
              </div>
              <div className="text-sm font-bold text-amber-300 mt-1">₹{experience.pricePerChild.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">The Experience</h3>
            <p className="text-stone-300 text-sm leading-relaxed sm:text-base font-light">
              {experience.overview}
            </p>
          </div>

          {/* Curriculum Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400 font-medium mr-1">Core Learning Themes:</span>
            {experience.curriculumTags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[#183427] border border-[#264e3b] text-emerald-200">
                🌱 {tag}
              </span>
            ))}
          </div>

          {/* Two-Column Breakdown: Activities & Learning Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hands-on Activities */}
            <div className="bg-[#12241b] border border-[#1d3d2c] rounded-2xl p-5">
              <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Hands-On Activities
              </h4>
              <ul className="space-y-2.5">
                {experience.activities.map((act, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-[#12241b] border border-[#1d3d2c] rounded-2xl p-5">
              <h4 className="text-sm font-serif font-bold text-emerald-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-400" /> What Children Take Home Inside
              </h4>
              <ul className="space-y-2.5">
                {experience.learningOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sample Schedule */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Sample Flow of the Day
            </h4>
            <div className="space-y-2">
              {experience.sampleSchedule.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-2 border-b border-[#1b3829] text-xs sm:text-sm">
                  <span className="font-mono text-amber-300 font-semibold w-24 shrink-0">{item.time}</span>
                  <span className="text-stone-300">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Safety */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">What's Included</h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-300">
                {experience.whatsIncluded.map((inc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Safety & Care
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-300">
                {experience.safetyNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Fixed Action Bar */}
        <div className="p-4 sm:p-6 bg-[#09150f] border-t border-[#1a3828] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">Pricing</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-amber-400 font-serif">
                  ₹{experience.pricePerChild.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-400">/ child</span>
                {experience.escortPrice && (
                  <span className="text-xs text-stone-400 ml-2">
                    (Adult escort ₹{experience.escortPrice})
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors text-xs font-semibold uppercase tracking-wider"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(experience);
              }}
              className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <span>Enquire & Book</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
