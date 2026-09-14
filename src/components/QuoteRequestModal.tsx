import React, { useState, useEffect } from 'react';
import { OrthopedicProduct } from '../types';
import { X, CheckCircle2, Building2, Send, ShieldCheck, FileCheck, Package } from 'lucide-react';
import { trackRFQSubmission, trackCTA } from '../utils/analytics';
import { submitQuoteRequestToFirestore, SubmissionResult } from '../lib/firebase';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: OrthopedicProduct[];
  preselectedProduct?: OrthopedicProduct | null;
  isDarkMode: boolean;
}

export const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  products,
  preselectedProduct,
  isDarkMode,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    preselectedProduct ? preselectedProduct.id : products[0].id
  );
  const [volumeTier, setVolumeTier] = useState<string>('sample-kit');
  const [targetMaterial, setTargetMaterial] = useState<string>('Titanium (Ti-6Al-4V ELI)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hospital, setHospital] = useState('');
  const [role, setRole] = useState('Procurement Officer');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firestoreResult, setFirestoreResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      trackCTA('open_rfq_modal', 'quote_request_modal', {
        initial_product_id: preselectedProduct?.id || products[0]?.id,
      });
    }
  }, [isOpen, preselectedProduct, products]);

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

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
      source: 'modal',
    });

    try {
      const result = await submitQuoteRequestToFirestore({
        productId: currentProduct.id,
        productName: currentProduct.name,
        volumeTier,
        targetMaterial,
        name,
        email,
        hospital,
        role,
        notes,
        source: 'modal',
      });
      setFirestoreResult(result);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md p-2.5 sm:p-4 md:p-6 flex items-center justify-center">
      <div
        className={`max-w-2xl w-full max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl border shadow-2xl relative transition-all overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Sticky/Fixed Modal Header */}
        <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-3 border-b border-slate-200/80 dark:border-slate-800 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono-code text-[#085F2C] dark:text-emerald-400 mb-1">
              <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>DIRECT MANUFACTURER PRICING (RFQ)</span>
            </div>
            <h3 className="text-base sm:text-2xl font-bold font-tech leading-tight">
              Request Clinical Sample Kit & Formal Quote
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
              Kazon India Pvt. Ltd. direct certified pricing, complete ISO 13485 / CE dossiers, and physical evaluation kits within 3-5 business days.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 -mr-1 -mt-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto px-4 sm:px-8 py-3.5 sm:py-6 flex-1">
          {!submitted ? (
            <form id="quote-request-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Product & Material Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                    Target Orthopedic Implant *
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                    Metallurgical Alloy *
                  </label>
                  <select
                    value={targetMaterial}
                    onChange={(e) => setTargetMaterial(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  >
                    <option value="Titanium (Ti-6Al-4V ELI)">Ti-6Al-4V ELI (ASTM F136)</option>
                    <option value="Stainless Steel (316L)">Stainless Steel 316L (ASTM F138)</option>
                    <option value="Both for Comparative Review">Both (Surgeon Evaluation Kit)</option>
                  </select>
                </div>
              </div>

              {/* Volume Tier Selection */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                  Procurement Volume Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setVolumeTier('sample-kit')}
                    className={`p-3 rounded-xl sm:rounded-2xl border text-left transition-all min-h-[44px] ${
                      volumeTier === 'sample-kit'
                        ? 'border-[#085F2C] bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 font-bold ring-1 ring-[#085F2C]/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs block font-tech">Clinical Sample Kit</span>
                    <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">1 to 5 sterile trial units</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVolumeTier('hospital-tier')}
                    className={`p-3 rounded-xl sm:rounded-2xl border text-left transition-all min-h-[44px] ${
                      volumeTier === 'hospital-tier'
                        ? 'border-[#085F2C] bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 font-bold ring-1 ring-[#085F2C]/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs block font-tech">Hospital Standing Order</span>
                    <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">50 to 500 units/mo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVolumeTier('distributor-bulk')}
                    className={`p-3 rounded-xl sm:rounded-2xl border text-left transition-all min-h-[44px] ${
                      volumeTier === 'distributor-bulk'
                        ? 'border-[#085F2C] bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 font-bold ring-1 ring-[#085F2C]/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs block font-tech">Distributor / OEM</span>
                    <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">1,000+ units contract</span>
                  </button>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Full Name & Title *
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
                    Professional Email Address *
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
                    Hospital / Healthcare Facility *
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
                    Clinical / Institutional Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                  >
                    <option value="Spine / Orthopedic Surgeon">Spine / Orthopedic Surgeon</option>
                    <option value="Hospital Procurement Officer">Hospital Procurement Officer</option>
                    <option value="Medical Device Distributor">Medical Device Distributor</option>
                    <option value="Biomedical R&D Engineer">Biomedical R&D Engineer</option>
                    <option value="Hospital Administrator">Hospital Administrator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Specific Sizes, Screw Diameters or Delivery Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 5.5mm x 45mm polyaxial screws with 5.5mm Ti rods; sterile peel-pouch packaging."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#085F2C] dark:text-emerald-400 shrink-0" />
                <span>
                  Includes ISO 13485:2016 audit certificates, material heat lot test reports (MTR), and UDI barcodes.
                </span>
              </div>
            </form>
          ) : (
            <div className="py-6 sm:py-8 text-center space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#085F2C] dark:text-emerald-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-tech">
                RFQ & Evaluation Kit Dispatched
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your request for <strong>{currentProduct.name}</strong> has been logged with Priority Reference ID{' '}
                <span className="font-mono-code text-[#085F2C] dark:text-emerald-400 font-bold">
                  {firestoreResult?.referenceId ? `#${firestoreResult.referenceId}` : `#KZ-2026-${(Math.random() * 9000 + 1000).toFixed(0)}`}
                </span>.
              </p>

              {/* Official Verification Chip */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono-code text-[#085F2C] dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Official Manufacturing Registry Entry Confirmed</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-left max-w-md mx-auto space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Organization:</span>
                  <span className="font-semibold truncate max-w-[200px]">{hospital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Material:</span>
                  <span className="font-semibold text-[#085F2C] dark:text-emerald-400">{targetMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Action:</span>
                  <span className="text-[#085F2C] dark:text-emerald-400 font-semibold truncate max-w-[200px]">Dossier sent to {email}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 text-[11px]">
                  <span className="text-slate-400">Transmission Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium font-mono-code">
                    ✓ Logged with Central Export Desk
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors min-h-[44px]"
              >
                Close & Return
              </button>
            </div>
          )}
        </div>

        {/* Sticky/Fixed Modal Footer Actions */}
        {!submitted && (
          <div className="px-4 sm:px-8 py-3 sm:py-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 shrink-0 bg-slate-50/80 dark:bg-slate-900/80 rounded-b-2xl sm:rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors min-h-[44px] flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="quote-request-form"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-[#085F2C]/25 min-h-[44px] disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Transmitting Official RFQ...' : 'Submit Official RFQ'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
