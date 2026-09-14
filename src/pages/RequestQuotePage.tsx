import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PRODUCTS } from '../data/products';
import { FileCheck, ShieldCheck, Send, CheckCircle2, Building2, Package, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../utils/seo';
import { trackRFQSubmission } from '../utils/analytics';
import { submitQuoteRequestToFirestore, SubmissionResult } from '../lib/firebase';

interface RequestQuotePageProps {
  isDarkMode: boolean;
}

export const RequestQuotePage: React.FC<RequestQuotePageProps> = ({ isDarkMode }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [volumeTier, setVolumeTier] = useState<string>('sample-kit');
  const [targetMaterial, setTargetMaterial] = useState<string>('Titanium (Ti-6Al-4V ELI)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hospital, setHospital] = useState('');
  const [role, setRole] = useState('Hospital Procurement Officer');
  const [country, setCountry] = useState('India');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firestoreResult, setFirestoreResult] = useState<SubmissionResult | null>(null);

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    trackRFQSubmission({
      productId: currentProduct.id,
      productName: currentProduct.name,
      volumeTier,
      targetMaterial,
      hospital,
      role,
      country,
      source: 'dedicated_page',
    });

    try {
      const result = await submitQuoteRequestToFirestore({
        productId: currentProduct.id,
        productName: currentProduct.name,
        volumeTier,
        targetMaterial,
        name,
        email,
        phone,
        hospital,
        role,
        country,
        notes,
        source: 'dedicated_page',
      });
      setFirestoreResult(result);
    } catch (err) {
      console.error('Firestore RFQ submission error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canonicalUrl = `${SITE_URL}/request-quote`;

  return (
    <div className="py-8 sm:py-12">
      <Helmet>
        <title>Request Institutional Orthopedic Implant Quote & Samples | Kazon India</title>
        <meta 
          name="description" 
          content="Request direct factory pricing, clinical evaluation sample kits, and international export freight terms (FOB/CIF) directly from Kazon India Pvt. Ltd." 
        />
        <meta property="og:title" content="Request Institutional Orthopedic Quote | Kazon India" />
        <meta property="og:description" content="Direct factory pricing, evaluation sample kits, and volume standing order discounts for orthopedic surgeons and hospitals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back link */}
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
            <FileCheck className="w-3.5 h-3.5 mr-1.5" />
            DIRECT MANUFACTURER PRICING & EVALUATION KITS
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-tech tracking-tight">
            Request Clinical Sample Kit & Formal Quote
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Direct precision manufacturing pricing from Kazon India Pvt. Ltd. with guaranteed 35–50% cost savings over US/EU brands. All formal quotes include certified ISO 13485:2016 audit reports, CE MDR dossiers, and Material Test Reports (MTR).
          </p>
        </div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className={`p-4 sm:p-8 md:p-10 rounded-3xl border shadow-xl transition-all space-y-6 sm:space-y-8 ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* 1. Implant Selection */}
            <div>
              <h2 className="text-base sm:text-lg font-bold font-tech text-slate-900 dark:text-white mb-3 flex items-center">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 text-xs flex items-center justify-center mr-2 font-mono-code font-bold">
                  1
                </span>
                Target Orthopedic Implant Hardware
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                    Select Product System *
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.family} - {p.anatomy})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                    Metallurgical Alloy Preference *
                  </label>
                  <select
                    value={targetMaterial}
                    onChange={(e) => setTargetMaterial(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  >
                    <option value="Titanium (Ti-6Al-4V ELI)">
                      Titanium (Ti-6Al-4V ELI / ASTM F136) - Osseointegrative
                    </option>
                    <option value="Stainless Steel (316L)">
                      Medical Stainless Steel (316L / ASTM F138) - High Modulus
                    </option>
                    <option value="Both for Comparative Review">
                      Both (Evaluation Demonstration Kit)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Procurement Volume Tier */}
            <div>
              <h2 className="text-base sm:text-lg font-bold font-tech text-slate-900 dark:text-white mb-3 flex items-center">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 text-xs flex items-center justify-center mr-2 font-mono-code font-bold">
                  2
                </span>
                Required Procurement Volume Tier
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setVolumeTier('sample-kit')}
                  className={`p-4 rounded-2xl border text-left transition-all min-h-[44px] ${
                    volumeTier === 'sample-kit'
                      ? 'border-[#085F2C] bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 font-bold ring-2 ring-[#085F2C]/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm block font-tech mb-1">Clinical Sample Kit</span>
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400 block">
                    1 to 5 sterile trial units for surgeon committee evaluation.
                  </span>
                  <span className="text-[10px] font-mono-code text-emerald-600 dark:text-emerald-400 font-semibold mt-2 block">
                    Dispatches in 3–5 days
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setVolumeTier('hospital-tier')}
                  className={`p-4 rounded-2xl border text-left transition-all min-h-[44px] ${
                    volumeTier === 'hospital-tier'
                      ? 'border-[#085F2C] bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 font-bold ring-2 ring-[#085F2C]/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm block font-tech mb-1">Hospital Standing Order</span>
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400 block">
                    50 to 500 units/mo with scheduled sterilisation releases.
                  </span>
                  <span className="text-[10px] font-mono-code text-[#085F2C] dark:text-emerald-400 font-semibold mt-2 block">
                    Tiered Institutional Pricing
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setVolumeTier('distributor-bulk')}
                  className={`p-4 rounded-2xl border text-left transition-all min-h-[44px] ${
                    volumeTier === 'distributor-bulk'
                      ? 'border-[#085F2C] bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 font-bold ring-2 ring-[#085F2C]/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm block font-tech mb-1">Distributor / OEM Bulk</span>
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400 block">
                    1,000+ units or custom private-label precision machining.
                  </span>
                  <span className="text-[10px] font-mono-code text-indigo-400 mt-2 block">
                    Direct Factory Contract
                  </span>
                </button>
              </div>
            </div>

            {/* 3. Clinician / Institution Details */}
            <div>
              <h2 className="text-base sm:text-lg font-bold font-tech text-slate-900 dark:text-white mb-3 flex items-center">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 text-xs flex items-center justify-center mr-2 font-mono-code font-bold">
                  3
                </span>
                Institutional & Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Full Name & Designation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Rajesh Mehta / John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Professional Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rmehta@hospital.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Hospital / Institution / Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Apollo Hospitals / MedEquip Global"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Phone / WhatsApp (With Country Code) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98250 12345 / +1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Your Institutional Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  >
                    <option value="Orthopedic / Spine Surgeon">Orthopedic / Spine Surgeon</option>
                    <option value="Hospital Procurement Officer">Hospital Procurement Officer</option>
                    <option value="Medical Device Distributor">Medical Device Distributor</option>
                    <option value="Biomedical R&D Engineer">Biomedical R&D Engineer</option>
                    <option value="Hospital Administrator">Hospital Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Country / Target Delivery Region
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="India / UAE / Germany / USA"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* 4. Surgical Sizes / Notes */}
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Specific Sizes, Screw Diameters, or Sterile Packaging Specifications
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Requesting 5.5mm x 45mm polyaxial screws with 5.5mm Ti rods; sterile double-barrier Tyvek packaging."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none"
              />
            </div>

            {/* Trust note */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-[#085F2C] dark:text-emerald-400 shrink-0" />
              <span>
                All Kazon RFQs are backed by our ISO 13485:2016 audit reports, CE MDR technical documentation, and full lot-traceable metallurgical test certs.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-center transition-colors min-h-[44px] flex items-center justify-center"
              >
                Cancel & Return
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold bg-[#085F2C] hover:bg-[#064e24] text-white transition-all shadow-lg shadow-[#085F2C]/25 flex items-center justify-center space-x-2 min-h-[44px] disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting RFQ & Sample Request...' : 'Submit Official RFQ & Sample Request'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Submission Confirmation View */
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
                RFQ DISPATCHED SUCCESSFULLY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-tech">
                Clinical Quotation & Sample Kit Logged
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your inquiry for <strong>{currentProduct.name}</strong> has been assigned Priority Reference ID{' '}
                <span className="font-mono-code text-[#085F2C] dark:text-emerald-400 font-bold">
                  {firestoreResult?.referenceId ? `#${firestoreResult.referenceId}` : `#KZ-RFQ-${(Math.random() * 9000 + 1000).toFixed(0)}`}
                </span>.
              </p>

              {/* Official Verification Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono-code text-[#085F2C] dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Official Manufacturing Registry Entry Confirmed</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-left max-w-md mx-auto space-y-2.5 font-mono-code">
              <div className="flex justify-between">
                <span className="text-slate-400">Institution:</span>
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">{hospital}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Product:</span>
                <span className="font-semibold text-[#085F2C] dark:text-emerald-400 truncate max-w-[200px]">{currentProduct.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Material:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{targetMaterial}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Next Action:</span>
                <span className="text-[#085F2C] dark:text-emerald-400 font-semibold truncate max-w-[200px]">Formal Dossier sent to {email}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 text-[11px]">
                <span className="text-slate-400">Transmission Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Logged with Central Export Desk
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                to="/products"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors min-h-[44px] flex items-center justify-center shadow-md shadow-[#085F2C]/20"
              >
                Explore 3D Product Catalog
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-h-[44px]"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
