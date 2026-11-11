import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Building, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';

interface SchoolEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (data: {
    refCode: string;
    schoolName: string;
    contactName: string;
    studentCount: number;
    theme: string;
  }) => void;
}

export const SchoolEnquiryModal: React.FC<SchoolEnquiryModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [designation, setDesignation] = useState('Activity Coordinator');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gradeBand, setGradeBand] = useState('Grades 3 – 5 (Ages 8 – 11)');
  const [studentCount, setStudentCount] = useState(45);
  const [teacherCount, setTeacherCount] = useState(4);
  const [proposedDate, setProposedDate] = useState('Late November 2026');
  const [selectedTheme, setSelectedTheme] = useState('Farming & Soil Ecology');
  const [transportNeeded, setTransportNeeded] = useState(true);
  const [mealType, setMealType] = useState('Wholesome Organic Hot Buffet');
  const [learningGoals, setLearningGoals] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `SCH-${Math.floor(10000 + Math.random() * 90000)}`;
    setRefCode(generatedRef);
    setIsSubmitted(true);
    onSubmitSuccess({
      refCode: generatedRef,
      schoolName,
      contactName,
      studentCount,
      theme: selectedTheme,
    });
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0d1d16] border border-[#214332] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden text-[#f4efe8] max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-b from-[#152e22] to-[#0d1d16] border-b border-[#1d3d2c] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400 block">
                INSTITUTIONAL & SCHOOL PARTNERSHIP
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {isSubmitted ? 'School Proposal Initiated' : 'Plan a School Learning Outing'}
              </h3>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full bg-stone-900/60 border border-stone-700/60 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Success View */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  Enquiry Registered Successfully
                </span>
                <h4 className="text-2xl font-serif font-bold text-white">
                  Institutional Outing Dossier Generated
                </h4>
                <p className="text-stone-300 text-sm mt-1 max-w-lg mx-auto">
                  Thank you, <span className="text-amber-300 font-semibold">{contactName}</span>. We have created a tailored experiential learning proposal for <span className="text-white font-medium">{schoolName}</span>.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#12271e] border border-[#234b36] rounded-2xl p-5 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-[#1f3f2e] pb-2">
                  <span className="text-stone-400">Institutional Reference ID:</span>
                  <span className="text-amber-400 font-bold tracking-wider">{refCode}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1f3f2e] pb-2">
                  <span className="text-stone-400">School / Academy:</span>
                  <span className="text-stone-100">{schoolName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1f3f2e] pb-2">
                  <span className="text-stone-400">Student Cohort:</span>
                  <span className="text-stone-100">{studentCount} Students ({gradeBand}) + {teacherCount} Faculty</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1f3f2e] pb-2">
                  <span className="text-stone-400">Experience Theme:</span>
                  <span className="text-emerald-300">{selectedTheme}</span>
                </div>
                <div className="flex justify-between items-center pt-1 text-stone-300">
                  <span>Transportation & Meals:</span>
                  <span className="text-stone-100">{transportNeeded ? 'End-to-End AC Coach' : 'Self-Arranged'} • {mealType}</span>
                </div>
              </div>

              <div className="bg-[#14261d] border border-[#1e3c2d] rounded-xl p-4 text-left text-xs text-stone-300 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold font-serif uppercase tracking-wider text-[11px]">
                  <FileText className="w-3.5 h-3.5" /> What happens within 24 hours:
                </div>
                <p>
                  1. Our Academic Experience Director will email your complete 12-page <span className="text-white font-medium">Curriculum Integration Dossier</span> and Risk Assessment Sheet.
                </p>
                <p>
                  2. A short virtual walkthrough will be scheduled to customize breakout session timings and student allergy logs.
                </p>
                <p>
                  3. Direct phone contact: <span className="text-amber-300 font-medium">+91 80 4920 1800</span> (Institutional Outings Desk).
                </p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Close & Return
              </button>
            </div>
          ) : (
            /* Enquiry Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Institution & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-amber-400" /> School / Institution Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Green Valley International School"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" /> Coordinator / Principal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Radhika Menon"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Role, Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                    Designation / Department *
                  </label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Activity Coordinator">Activity Coordinator</option>
                    <option value="Principal / Vice-Principal">Principal / Vice-Principal</option>
                    <option value="Science / EVS Department Head">Science / EVS Dept Head</option>
                    <option value="Grade Level Coordinator">Grade Level Coordinator</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" /> Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="coordinator@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" /> Direct Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 11223"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Cohort Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#11231a] border border-[#1f3d2e] rounded-2xl p-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                    Target Grade / Age Band
                  </label>
                  <select
                    value={gradeBand}
                    onChange={(e) => setGradeBand(e.target.value)}
                    className="w-full bg-[#163023] border border-[#234e38] rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Kindergarten & Early Years (Ages 4 – 6)">Kindergarten (Ages 4 – 6)</option>
                    <option value="Grades 1 – 2 (Ages 6 – 8)">Grades 1 – 2 (Ages 6 – 8)</option>
                    <option value="Grades 3 – 5 (Ages 8 – 11)">Grades 3 – 5 (Ages 8 – 11)</option>
                    <option value="Grades 6 – 8 (Ages 11 – 14)">Grades 6 – 8 (Ages 11 – 14)</option>
                    <option value="Grades 9 – 12 (Ages 14 – 17)">Grades 9 – 12 (Ages 14 – 17)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                    Expected Students
                  </label>
                  <input
                    type="number"
                    min="15"
                    max="350"
                    value={studentCount}
                    onChange={(e) => setStudentCount(Number(e.target.value))}
                    className="w-full bg-[#163023] border border-[#234e38] rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                    Accompanying Faculty
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="30"
                    value={teacherCount}
                    onChange={(e) => setTeacherCount(Number(e.target.value))}
                    className="w-full bg-[#163023] border border-[#234e38] rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Experience Theme & Target Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                    Core Experience Track
                  </label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Farming & Soil Ecology (Little Farmers)">Farming & Soil Ecology (Little Farmers)</option>
                    <option value="Culinary Chemistry & Baking (Junior Masterchef)">Culinary Chemistry & Baking (Junior Masterchef)</option>
                    <option value="Logic, Orienteering & Deductive Mystery (Mystery Detectives)">Logic & Orienteering (Mystery Detectives)</option>
                    <option value="Pottery Wheel & Block Printing (Artisan for a Day)">Pottery & Traditional Crafts (Artisan for a Day)</option>
                    <option value="Village Life, Folk Games & Heritage">Village Life, Folk Games & Heritage</option>
                    <option value="Biodiversity & Micro-Canopy Ecology (Nature Detectives)">Biodiversity & Micro-Canopy (Nature Detectives)</option>
                    <option value="Custom Multi-Track Rotation (Full Day)">Custom Multi-Track Rotation (Full Day)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> Proposed Date / Month
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2nd Week of December 2026"
                    value={proposedDate}
                    onChange={(e) => setProposedDate(e.target.value)}
                    className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Transportation & Meals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-[#11241b] border border-[#1f3f2f] rounded-xl p-3">
                  <input
                    type="checkbox"
                    id="schoolTransport"
                    checked={transportNeeded}
                    onChange={(e) => setTransportNeeded(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-stone-900 border-stone-700"
                  />
                  <label htmlFor="schoolTransport" className="text-xs text-stone-300 cursor-pointer">
                    Request GPS-tracked, school-bus fleet with verified drivers from campus
                  </label>
                </div>

                <div>
                  <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    className="w-full h-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Wholesome Organic Hot Buffet (Standard)">Wholesome Organic Hot Buffet (Standard)</option>
                    <option value="Jain & Nut-Free Certified Buffet">Jain & Nut-Free Certified Buffet</option>
                    <option value="Packed Eco-Friendly Snack Box Only">Packed Eco-Friendly Snack Box Only</option>
                    <option value="School Will Arrange Own Lunch">School Will Arrange Own Lunch</option>
                  </select>
                </div>
              </div>

              {/* Learning Objectives & Special Needs */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-300 font-semibold mb-1.5">
                  Curriculum Objectives & Special Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Aligns with Grade 4 Science unit on plant adaptations. Need wheelchair accessibility for 2 students."
                  value={learningGoals}
                  onChange={(e) => setLearningGoals(e.target.value)}
                  className="w-full bg-[#11241b] border border-[#1f3f2f] rounded-xl px-4 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit School Enquiry & Request Dossier</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
