import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Upload, 
  FileText, 
  Building2, 
  Compass, 
  Sparkles, 
  FileCheck, 
  Users, 
  Ticket, 
  AlertCircle 
} from 'lucide-react';

interface PartnerKYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitKYC: (data: any) => void;
}

export type PartnerCategory = 
  | 'Trek organisers'
  | 'Local guides'
  | 'Event planners'
  | 'Brands/Community';

export const PartnerKYCModal: React.FC<PartnerKYCModalProps> = ({
  isOpen,
  onClose,
  onSubmitKYC,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<PartnerCategory>('Trek organisers');
  const [legalName, setLegalName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('Founder / Lead Explorer');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  
  // KYC Specifics
  const [idType, setIdType] = useState<'GST' | 'Tourism License' | 'Mountaineering Cert' | 'MSME Udyam'>('GST');
  const [idNumber, setIdNumber] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [yearsActive, setYearsActive] = useState('4');
  const [safetyProtocols, setSafetyProtocols] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
    } else {
      setUploadedFile('GST_Certificate_Registration_2026.pdf');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `IXP-KYC-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(generatedRef);
    setIsSubmitted(true);
    onSubmitKYC({
      category,
      legalName,
      contactPerson,
      email,
      phone,
      idType,
      idNumber,
      refId: generatedRef,
    });
  };

  const partnerTypes: Array<{
    type: PartnerCategory;
    icon: any;
    desc: string;
    badge: string;
  }> = [
    {
      type: 'Trek organisers',
      icon: Compass,
      desc: 'Adventure outfitters, high-altitude expeditions, and verified weekend trail leads.',
      badge: 'Certified Outfitters',
    },
    {
      type: 'Local guides',
      icon: ShieldCheck,
      desc: 'Indigenous sherpas, certified naturalists, and wilderness navigators.',
      badge: 'Indigenous Custodians',
    },
    {
      type: 'Event planners',
      icon: Ticket,
      desc: 'Open-air cinemas, acoustic circles, secret comedy, and cultural dance meetups.',
      badge: 'Event Creators',
    },
    {
      type: 'Brands/Community',
      icon: Users,
      desc: 'Outdoor gear makers, sustainable retreats, and active travel clubs.',
      badge: 'Ecosystem Partners',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#13261e] border border-[#244335] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden text-[#f4efe8]">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#244335]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-emerald-700 flex items-center justify-center text-white font-bold shadow-sm">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#e07a5f] font-mono font-bold">
                I-EXPLR Trust & Safety
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f4efe8]">
                Partner Onboarding & KYC Verification
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#9cb0a4] hover:text-[#f4efe8] hover:bg-[#152e23] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto flex-1 py-4">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#132f22] border-2 border-emerald-500/50 flex items-center justify-center text-[#4ade80] mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-[#1e2a1b] border border-amber-500/40 text-xs font-mono text-amber-300 font-bold">
                Reference ID: {refId}
              </div>

              <h4 className="font-serif text-2xl font-bold text-[#f4efe8]">
                KYC Dossier Submitted for Verification
              </h4>

              <p className="text-xs sm:text-sm text-[#c2d9cc] max-w-md mx-auto leading-relaxed font-light">
                Thank you, <strong className="text-white">{contactPerson}</strong> from <strong className="text-[#e07a5f]">{legalName || 'your organization'}</strong>. To protect our community and ensure authentic quality, all partner listings are KYC verified before publication.
              </p>

              <div className="p-4 rounded-2xl bg-[#0b1612] border border-[#244335] text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#c2d9cc]">
                  <span className="font-medium text-[#9cb0a4]">Partner Category:</span>
                  <span className="text-[#e07a5f] font-mono font-bold">{category}</span>
                </div>
                <div className="flex items-center justify-between text-[#c2d9cc]">
                  <span className="font-medium text-[#9cb0a4]">License / Tax ID:</span>
                  <span className="text-[#f4efe8] font-mono">{idNumber || 'Verified in doc'}</span>
                </div>
                <div className="flex items-center justify-between text-[#c2d9cc]">
                  <span className="font-medium text-[#9cb0a4]">Document Upload:</span>
                  <span className="text-[#4ade80] font-mono font-semibold">✓ {uploadedFile || 'License Attached'}</span>
                </div>
                <div className="flex items-center justify-between text-[#c2d9cc]">
                  <span className="font-medium text-[#9cb0a4]">Expected SLA:</span>
                  <span className="text-[#c2d9cc] font-mono">24 – 48 Hours</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Return To I-EXPLR
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step Bar */}
              <div className="flex items-center justify-between bg-[#0b1612] p-3 rounded-2xl border border-[#244335] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    step === 1 ? 'bg-[#1e4a35] text-white font-bold border border-emerald-500/30' : 'text-[#9cb0a4] hover:text-[#f4efe8]'
                  }`}
                >
                  <span>1. Category</span>
                </button>
                <span className="text-[#3b5e4c]">→</span>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    step === 2 ? 'bg-[#1e4a35] text-white font-bold border border-emerald-500/30' : 'text-[#9cb0a4] hover:text-[#f4efe8]'
                  }`}
                >
                  <span>2. Details</span>
                </button>
                <span className="text-[#3b5e4c]">→</span>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    step === 3 ? 'bg-[#1e4a35] text-white font-bold border border-emerald-500/30' : 'text-[#9cb0a4] hover:text-[#f4efe8]'
                  }`}
                >
                  <span>3. KYC & GST</span>
                </button>
              </div>

              {/* STEP 1: CATEGORY SELECTION */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-wider text-[#e07a5f] font-mono font-bold">
                    Select Your Partner Classification:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {partnerTypes.map((pt) => {
                      const Icon = pt.icon;
                      const isSelected = category === pt.type;
                      return (
                        <div
                          key={pt.type}
                          onClick={() => setCategory(pt.type)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#18392b] border-emerald-400/80 shadow-md ring-1 ring-emerald-500/30'
                              : 'bg-[#0b1612] border-[#244335] hover:border-amber-500/50 hover:bg-[#0f241a]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#13261e] border border-[#244335] flex items-center justify-center text-[#e07a5f]">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#13261e] text-[#9cb0a4] font-semibold border border-[#244335]">
                              {pt.badge}
                            </span>
                          </div>
                          <div className="font-serif text-base font-bold text-[#f4efe8]">{pt.type}</div>
                          <div className="text-xs text-[#c2d9cc] mt-1 leading-relaxed font-light">
                            {pt.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full mt-4 py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Next: Organization & Contact Details
                  </button>
                </div>
              )}

              {/* STEP 2: BUSINESS & CONTACT DETAILS */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-wider text-[#e07a5f] font-mono font-bold">
                    Business / Operational Identity:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                        Legal Business / Agency Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Western Ghats Mountain Guild"
                        value={legalName}
                        onChange={(e) => setLegalName(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-xl border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                        Primary Operational Region *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Karnataka & Nilgiris / Spiti"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-xl border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                        Lead Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tenzing Sherpa / Chethan G."
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-xl border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                        Official Designation
                      </label>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-xl border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                        Official Registered Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="lead@mountains.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-xl border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                        WhatsApp / Mobile for Expeditions *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-xl border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 bg-[#0b1612] text-[#f4efe8] border border-[#244335] rounded-xl text-xs font-medium hover:bg-[#152e23] cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 py-2.5 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      Next: KYC Identification & GST
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: KYC IDENTIFICATION & GST / REGISTERED LICENSE */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-[#241a10] border border-amber-500/40 flex items-start gap-2.5 text-xs text-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      I-EXPLR requires verified GST or official state tourism/mountaineering credentials to guarantee safe, insured, and fair-wage services for all travellers.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                        Select Verification Document Type *
                      </label>
                      <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-xl border border-[#244335] text-xs text-[#f4efe8] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      >
                        <option value="GST" className="bg-[#0b1612] text-[#f4efe8]">GST Registration Number (GSTIN)</option>
                        <option value="Tourism License" className="bg-[#0b1612] text-[#f4efe8]">State Tourism Department License</option>
                        <option value="Mountaineering Cert" className="bg-[#0b1612] text-[#f4efe8]">IMF / NIM Mountaineering Credential</option>
                        <option value="MSME Udyam" className="bg-[#0b1612] text-[#f4efe8]">MSME / Udyam Enterprise Certificate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                        {idType} Registration Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={idType === 'GST' ? 'e.g. 29AAAAA0000A1Z5' : 'e.g. TOUR-REG-2025-998'}
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b1612] rounded-xl border border-[#244335] text-xs text-[#f4efe8] font-mono placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Document Upload Simulation */}
                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                      Upload Certificate Copy (PDF or JPG) *
                    </label>
                    <label className="border-2 border-dashed border-[#244335] hover:border-[#e07a5f] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#0b1612]">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleSimulateUpload}
                        className="hidden"
                      />
                      <Upload className="w-6 h-6 text-[#e07a5f] mb-1" />
                      <span className="text-xs text-[#f4efe8] font-medium">
                        {uploadedFile ? uploadedFile : 'Click to attach registration / GST certificate'}
                      </span>
                      <span className="text-[10px] text-[#9cb0a4] mt-0.5">
                        {uploadedFile ? '✓ Document attached and checksum validated' : 'Supports PDF, JPEG up to 10MB'}
                      </span>
                    </label>
                  </div>

                  {/* Safety & Experience */}
                  <div>
                    <label className="block text-xs font-semibold text-[#f4efe8] mb-1">
                      Years of Field Experience & Safety Protocols
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly state your safety gears, Wilderness First Aid equipment, and maximum group capacity..."
                      value={safetyProtocols}
                      onChange={(e) => setSafetyProtocols(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0b1612] rounded-xl border border-[#244335] text-xs text-[#f4efe8] placeholder:text-[#6f8277] focus:outline-none focus:border-[#e07a5f] resize-none shadow-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="rounded border-[#244335] text-emerald-600 focus:ring-0 bg-[#0b1612]"
                    />
                    <label htmlFor="terms" className="text-[11px] text-[#c2d9cc]">
                      I pledge adherence to I-EXPLR's 100% fair-wage and Leave-No-Trace environmental protocol.
                    </label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-3 bg-[#0b1612] text-[#f4efe8] border border-[#244335] rounded-xl text-xs font-medium hover:bg-[#152e23] cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!termsAgreed || !idNumber}
                      className="flex-1 py-3 bg-[#e07a5f] hover:bg-[#d0694e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
                    >
                      Submit For KYC Verification & Listing
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
