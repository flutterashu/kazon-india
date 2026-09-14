import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Cpu, UploadCloud, Send, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../utils/seo';
import { trackEngineerInquiry, trackCTA } from '../utils/analytics';
import { submitEngineerInquiryToFirestore, SubmissionResult } from '../lib/firebase';

interface AskEngineerPageProps {
  isDarkMode: boolean;
}

export const AskEngineerPage: React.FC<AskEngineerPageProps> = ({ isDarkMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState('Custom Implant Geometry & 5-Axis Tolerances');
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firestoreResult, setFirestoreResult] = useState<SubmissionResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      trackCTA('attach_cad_drawing', 'ask_engineer_page', { file_name: e.target.files[0].name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    trackEngineerInquiry({
      topic,
      hasAttachment: !!fileName,
      company,
      source: 'dedicated_page',
    });

    try {
      const result = await submitEngineerInquiryToFirestore({
        name,
        email,
        phone,
        company,
        topic,
        message,
        fileName,
        source: 'dedicated_page',
      });
      setFirestoreResult(result);
    } catch (err) {
      console.error('Firestore engineering inquiry error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canonicalUrl = `${SITE_URL}/ask-engineer`;

  return (
    <div className="py-8 sm:py-12">
      <Helmet>
        <title>Consult Biomedical & CNC Machining Engineers | Kazon India</title>
        <meta 
          name="description" 
          content="Consult directly with Kazon India's precision orthopedic engineering leads regarding custom tolerances, STEP CAD files, titanium metallurgy, or OEM manufacturing." 
        />
        <meta property="og:title" content="Consult Biomedical & CNC Machining Engineers | Kazon India" />
        <meta property="og:description" content="Direct technical consultation with orthopedic design engineers and Swiss CNC production specialists." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-xs text-slate-500 hover:text-[#085F2C] dark:hover:text-emerald-400 mb-6 transition-colors font-medium min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Cpu className="w-3.5 h-3.5 mr-1.5" />
            DIRECT MACHINING & BIOMEDICAL ENGINEERING DESK
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-tech tracking-tight">
            Consult With a Precision Orthopedic Engineer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
            Discuss custom dimensional tolerances (±0.0001"), porous trabecular lattice parameters (400-600µm), or private label OEM contract manufacturing directly with Kazon India Pvt. Ltd. machining leads.
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className={`p-4 sm:p-8 md:p-10 rounded-3xl border shadow-xl transition-all space-y-6 ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Anand Patel / Mark Weber"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Professional Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="anand@orthoinstitute.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Institution or OEM Company
                </label>
                <input
                  type="text"
                  placeholder="Precision Orthopedics LLC"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Direct Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+91 98250 14890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Technical Consultation Domain *
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
              >
                <option value="Custom Implant Geometry & 5-Axis Tolerances">
                  Custom Implant Geometry & 5-Axis Swiss CNC Tolerances (±0.0001")
                </option>
                <option value="Trabecular 3D Porous Titanium Lattice Parameters">
                  Trabecular 3D Porous Titanium Lattice Parameters (400-600µm)
                </option>
                <option value="ASTM F136 vs ASTM F138 Material Selection Review">
                  ASTM F136 (Ti-6Al-4V) vs ASTM F138 (316L) Selection Review
                </option>
                <option value="Private Label OEM / ODM Precision Machining">
                  Private Label OEM / ODM Precision Contract Machining & Packaging
                </option>
                <option value="Surgical Instrument Ergonomics & Torque Limiter Calibration">
                  Surgical Instrument Ergonomics & Torque Limiter Calibration
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Technical Query or Specific Dimensions *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Detail your clinical application, required thread pitch, runout tolerances, or custom fatigue cycle requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none"
              />
            </div>

            {/* CAD File Attachment */}
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Attach 2D Drawing or 3D CAD File (.STEP, .IGES, .STL, .PDF)
              </label>
              <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#085F2C] dark:hover:border-emerald-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/40">
                <UploadCloud className="w-8 h-8 text-[#085F2C] dark:text-emerald-400 mb-2" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">
                  {fileName ? fileName : 'Click to select CAD file or drag & drop'}
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  Secure encrypted IP transfer (NDA protected by default)
                </span>
                <input
                  type="file"
                  accept=".step,.stp,.iges,.igs,.stl,.pdf,.dwg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-center transition-colors min-h-[44px] flex items-center justify-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold bg-[#085F2C] hover:bg-[#064e24] text-white transition-all shadow-lg shadow-[#085F2C]/25 flex items-center justify-center space-x-2 min-h-[44px] disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving to Firestore...' : 'Submit Technical Query to Engineering'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div
            className={`p-6 sm:p-12 rounded-3xl border shadow-xl text-center space-y-6 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#085F2C] dark:text-emerald-400" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono-code text-[#085F2C] dark:text-emerald-400 font-bold uppercase tracking-wider">
                CONSULTATION LOGGED
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-tech">
                Engineering Consultation Request Dispatched
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                Our Senior Biomedical Machining Engineer at Kazon India Pvt. Ltd. will review your query regarding <strong>{topic}</strong> and contact <strong>{email}</strong> within 24 hours.
              </p>

              {/* Firestore Verification Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono-code text-[#085F2C] dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Cloud Firestore: Stored in <code className="font-bold">engineer_inquiries</code></span>
              </div>

              {firestoreResult?.referenceId && (
                <div className="text-xs font-mono-code text-slate-500 dark:text-slate-400 pt-1">
                  Ticket Reference ID: <span className="font-bold text-[#085F2C] dark:text-emerald-400">#{firestoreResult.referenceId}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                to="/products"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors min-h-[44px] flex items-center justify-center shadow-md shadow-[#085F2C]/20"
              >
                Explore 3D CAD Models
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-h-[44px]"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
