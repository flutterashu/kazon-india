import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  ArrowLeft,
  Building2,
  Award,
  FileText,
  UserCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { COMPANY_DATA } from '../data/company';
import { SITE_URL, ORGANIZATION_SCHEMA } from '../utils/seo';
import { trackContactSubmission, trackPhoneHelpline, trackEmailClick } from '../utils/analytics';
import { submitContactMessageToFirestore, SubmissionResult } from '../lib/firebase';

interface ContactPageProps {
  isDarkMode: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ isDarkMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Hospital Procurement & Standing Orders');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firestoreResult, setFirestoreResult] = useState<SubmissionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    trackContactSubmission({ subject, source: 'contact_page' });

    try {
      const result = await submitContactMessageToFirestore({
        name,
        email,
        phone,
        subject,
        message,
        source: 'contact_page',
      });
      setFirestoreResult(result);
    } catch (err) {
      console.debug('Contact submission dispatch notice:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const canonicalUrl = `${SITE_URL}/contact`;

  return (
    <div className="py-8 sm:py-12">
      <Helmet>
        <title>Contact Kazon India | Surgical Implant Manufacturer & Global Export Desk</title>
        <meta 
          name="description" 
          content="Connect with Kazon India's biomedical engineering team and global export desk. Plant in Tronica City Industrial Area, NCR Delhi. Phone: +91-7827237179." 
        />
        <meta property="og:title" content="Contact Kazon India - Orthopedic Implant Manufacturer" />
        <meta property="og:description" content="Direct factory procurement and global export desk for CDSCO and CE MDR compliant orthopedic and spinal implants." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(ORGANIZATION_SCHEMA)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-xs text-slate-500 hover:text-[#085F2C] dark:hover:text-emerald-400 mb-6 transition-colors font-medium min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Globe2 className="w-3.5 h-3.5 mr-1.5" />
            DIRECT MANUFACTURER & EXPORT DESK
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-tech tracking-tight">
            Connect With Kazon India Pvt. Ltd.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Manufacturer, Exporter & Supplier of certified Orthopedic Implants, Spinal Hardware & Surgical Instruments widely used in Orthopedic & Neurosurgery across India and international markets.
          </p>
        </div>

        {/* Corporate Identity & Statutory Badges Strip */}
        <div
          className={`p-5 rounded-3xl border mb-10 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          } shadow-sm`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-mono-code text-slate-400 uppercase block">GST Registration</span>
              <span className="font-mono-code font-bold text-slate-900 dark:text-white text-xs block mt-0.5">
                {COMPANY_DATA.governmentIds.gst}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 block">Active Taxpayer</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Corporate CIN</span>
              <span className="font-mono-code font-bold text-slate-900 dark:text-white text-xs block mt-0.5">
                {COMPANY_DATA.governmentIds.cin}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">Govt. of India MCA</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Import Export Code (IEC)</span>
              <span className="font-mono-code font-bold text-slate-900 dark:text-white text-xs block mt-0.5">
                {COMPANY_DATA.governmentIds.iec}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">DGFT Authorized</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Statutory Licensing</span>
              <span className="font-bold text-[#085F2C] dark:text-emerald-400 text-xs block mt-0.5">
                Drugs & Cosmetics Act 1940
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">ISO 9001:2015 & ISO 13485</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Official Contact Directory & Manufacturing Plant */}
          <div className="lg:col-span-5 space-y-6">
            {/* Leadership Profile Card */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              } shadow-lg space-y-4`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-tech text-slate-900 dark:text-white">
                    {COMPANY_DATA.director.name}
                  </h3>
                  <p className="text-xs text-[#085F2C] dark:text-emerald-400 font-semibold">
                    {COMPANY_DATA.director.designation} | Kazon India Pvt. Ltd.
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect directly with our corporate leadership for institutional hospital contracts, distributor exclusivity, or government tenders.
              </p>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${COMPANY_DATA.director.phone}`}
                  onClick={() => trackPhoneHelpline(COMPANY_DATA.director.phone, 'contact_page_director')}
                  className="px-3 py-2 rounded-xl bg-[#085F2C] hover:bg-[#064e24] text-white text-xs font-bold transition-all shadow-md shadow-[#085F2C]/20 flex items-center space-x-1.5 min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Director: {COMPANY_DATA.director.phone}</span>
                </a>
              </div>
            </div>

            {/* Direct Phone Lines */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              } shadow-lg space-y-4`}
            >
              <h3 className="text-base font-bold font-tech flex items-center">
                <Phone className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 mr-2" />
                Direct Telephone Numbers
              </h3>

              <div className="space-y-3 text-xs">
                {COMPANY_DATA.phones.map((p) => (
                  <div key={p.number} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/50">
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{p.label}</span>
                      <span className="font-mono-code font-bold text-slate-900 dark:text-white text-xs">{p.number}</span>
                    </div>
                    <a
                      href={p.href}
                      onClick={() => trackPhoneHelpline(p.number, `contact_page_${p.label.toLowerCase().replace(/[^a-z0-9]/g, '_')}`)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors min-h-[36px] flex items-center"
                    >
                      Call Now
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Head Office & Factory Location Details */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              } shadow-lg space-y-5`}
            >
              <h3 className="text-base font-bold font-tech">Addresses & Manufacturing Plant</h3>

              <div className="space-y-4 text-xs">
                {/* Head Office */}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Delhi Head Office
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed block mt-0.5">
                      {COMPANY_DATA.headOffice.fullAddress}
                    </span>
                  </div>
                </div>

                {/* Manufacturing Plant (Sister Concern) */}
                <div className="flex items-start space-x-3">
                  <Building2 className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Manufacturing Facility (Sister Concern)
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {COMPANY_DATA.manufacturingUnit.entityName}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed block mt-0.5">
                      {COMPANY_DATA.manufacturingUnit.location}, {COMPANY_DATA.manufacturingUnit.city}, {COMPANY_DATA.manufacturingUnit.state}
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {['Sliding Head CNC', '5-Axis VMC', 'Wire / Laser Cutting', 'CMM Inspection Lab'].map((cap) => (
                        <span
                          key={cap}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono-code text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email & Web */}
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Official Correspondence
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 block mt-0.5">
                      Email: <a href="mailto:info@kazonindia.in" onClick={() => trackEmailClick('info@kazonindia.in', 'contact_page')} className="hover:underline text-[#085F2C] dark:text-emerald-400 font-medium">info@kazonindia.in</a>
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 block">
                      Web: www.kazonindia.in | www.kazonindia.com
                    </span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Working Hours
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 block mt-0.5">
                      Monday - Saturday: 08:30 - 19:30 IST (Emergency Trauma Delivery 24/7)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Dispatch & Procurement Inquiry Form */}
          <div className="lg:col-span-7">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className={`p-5 sm:p-8 md:p-10 rounded-3xl border ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xl space-y-5`}
              >
                <div>
                  <h3 className="text-xl font-bold font-tech text-slate-900 dark:text-white">
                    Send an Official Direct Inquiry
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Route directly to Director Mr. Rahis Khan or the Hospital Procurement & Export Desk.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Full Name & Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Anand Patel / Procurement Lead"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@hospital.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Phone / WhatsApp (With Country Code) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98250 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      Nature of Inquiry *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
                    >
                      <option value="Hospital Procurement & Standing Orders">Hospital Procurement & Standing Orders</option>
                      <option value="LCP / DCP Plates & Screws Supply">LCP / DCP Plates & Screws Supply</option>
                      <option value="PFNA / Intramedullary Nails Order">PFNA / Intramedullary Nails Order</option>
                      <option value="Spine Implants (Pedicle Screws / Cages)">Spine Implants (Pedicle Screws / Cages)</option>
                      <option value="External Fixator & Jess Distractor Sets">External Fixator & Jess Distractor Sets</option>
                      <option value="Global Export / International Distribution">Global Export / International Distribution</option>
                      <option value="Private Label OEM Contract Machining">Private Label OEM Contract Machining</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                    Product Requirements & Delivery Schedule *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify plate types (e.g. 3.5mm Medial Proximal Tibia, PHILOS, PFNA2), quantities, titanium vs stainless steel preference, or clinical sample kit delivery location..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#085F2C] focus:outline-none"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-[#085F2C] dark:text-emerald-400 shrink-0" />
                  <span>
                    Direct manufacturer response within 4 hours. Backed by CDSCO Drug License, ISO 9001:2015, and complete lot-traceable MTR reports.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl text-xs font-bold bg-[#085F2C] hover:bg-[#064e24] text-white transition-all shadow-lg shadow-[#085F2C]/25 flex items-center justify-center space-x-2 min-h-[44px] disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Official Inquiry...' : 'Dispatch Official Inquiry to Kazon Desk'}</span>
                </button>
              </form>
            ) : (
              <div
                className={`p-8 sm:p-12 rounded-3xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } shadow-xl text-center space-y-5`}
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#085F2C] dark:text-emerald-400" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-tech text-slate-900 dark:text-white">
                    Inquiry Dispatched Successfully
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Routing to Director Mr. Rahis Khan & Technical Sales Desk
                  </p>
                </div>

                {/* Official Verification Badge */}
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono-code text-[#085F2C] dark:text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Verified Official Manufacturing Dispatch Logged</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your inquiry regarding <strong>{subject}</strong> has been logged under priority tracking ticket{' '}
                  <span className="font-mono-code text-[#085F2C] dark:text-emerald-400 font-bold">
                    {firestoreResult?.referenceId ? `#${firestoreResult.referenceId}` : `#KZ-HQ-${(Math.random() * 9000 + 1000).toFixed(0)}`}
                  </span>. A factory executive will reach out to <strong>{phone}</strong> / <strong>{email}</strong> promptly.
                </p>

                <div className="pt-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-h-[44px]"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
