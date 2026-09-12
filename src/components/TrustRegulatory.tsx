import React, { useState } from 'react';
import { TRUST_CERTIFICATIONS, COMPETITOR_BENCHMARKS } from '../data/certifications';
import { TrustCertification } from '../types';
import { ShieldCheck, CheckCircle2, Award, FileCheck, ExternalLink, X, Scale, Sparkles, Building2, Stamp, Eye } from 'lucide-react';
import { COMPANY_DATA } from '../data/company';

interface TrustRegulatoryProps {
  isDarkMode: boolean;
  onRequestQuote: () => void;
}

export const TrustRegulatory: React.FC<TrustRegulatoryProps> = ({ isDarkMode, onRequestQuote }) => {
  const [selectedCert, setSelectedCert] = useState<TrustCertification | null>(null);

  return (
    <section id="regulatory-trust" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            Statutory Certifications & Regulatory Dossiers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-tech">
            Quality Assurance & Regulatory Compliance
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            In orthopedic and spinal implant manufacturing, safety, biocompatibility, and precision are paramount. Kazon India Pvt. Ltd. operates under statutory manufacturing licenses under the Drugs & Cosmetics Act 1940, ISO 9001:2015, ISO 13485:2016, CE and FDA aligned facility standards.
          </p>
        </div>

        {/* Corporate Statutory Registration Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 flex items-center justify-center font-bold">
                GST
              </span>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono-code block">GST Registration</span>
                <span className="font-mono-code font-bold text-slate-900 dark:text-white">{COMPANY_DATA.governmentIds.gst}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 flex items-center justify-center font-bold">
                CIN
              </span>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono-code block">Corporate Identity (MCA)</span>
                <span className="font-mono-code font-bold text-slate-900 dark:text-white">{COMPANY_DATA.governmentIds.cin}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 flex items-center justify-center font-bold">
                IEC
              </span>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono-code block">Import Export Code</span>
                <span className="font-mono-code font-bold text-slate-900 dark:text-white">{COMPANY_DATA.governmentIds.iec}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Trust Badge System Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TRUST_CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className={`p-6 rounded-3xl border cursor-pointer group transition-all duration-300 relative flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-800 hover:border-[#085F2C]/50 hover:shadow-xl hover:shadow-[#085F2C]/10'
                  : 'bg-white border-slate-200 hover:border-[#085F2C]/50 hover:shadow-xl hover:shadow-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {cert.status}
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-mono-code text-slate-400 block uppercase">
                    Cert #{cert.certNumber}
                  </span>
                  <h3 className="text-base font-bold font-tech text-slate-900 dark:text-white group-hover:text-[#085F2C] dark:group-hover:text-emerald-400 transition-colors">
                    {cert.code}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {cert.title}
                  </p>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {cert.scope}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono-code text-[11px] text-slate-400">Click for Full Resolution</span>
                <span className="text-[#085F2C] dark:text-emerald-400 font-semibold flex items-center group-hover:underline">
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  Inspect Certificate
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Competitor Benchmark Comparison */}
        <div
          className={`rounded-3xl border overflow-hidden transition-all ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-800 shadow-2xl'
              : 'bg-white border-slate-200 shadow-xl'
          }`}
        >
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Scale className="w-4 h-4 text-[#085F2C] dark:text-emerald-400" />
                <span className="text-xs font-mono-code uppercase text-[#085F2C] dark:text-emerald-400 font-semibold">
                  MedTech Industry Benchmarking
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-tech text-slate-900 dark:text-white">
                How Kazon India Compares with Global Market Leaders
              </h3>
            </div>
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors shrink-0 shadow-md shadow-[#085F2C]/20 min-h-[44px]"
            >
              <FileCheck className="w-3.5 h-3.5 mr-1.5" />
              Request Hospital Sample Kit
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/90 font-mono-code text-slate-500 dark:text-slate-400 uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Engineering & Supply Capability</th>
                  <th className="py-4 px-4 sm:px-6 text-[#085F2C] dark:text-emerald-400 font-bold bg-emerald-500/5">
                    Kazon India (Direct)
                  </th>
                  <th className="py-4 px-4 sm:px-6">Stryker Spine</th>
                  <th className="py-4 px-4 sm:px-6">Zimmer Biomet</th>
                  <th className="py-4 px-4 sm:px-6">Eminent Spine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {COMPETITOR_BENCHMARKS.map((benchmark, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900 dark:text-white">
                      {benchmark.attribute}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#085F2C] dark:text-emerald-400 bg-emerald-500/5">
                      {benchmark.kazon}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-slate-500 dark:text-slate-400">
                      {benchmark.stryker}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-slate-500 dark:text-slate-400">
                      {benchmark.zimmerBiomet}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-xs text-slate-500 dark:text-slate-400">
                      {benchmark.eminentSpine}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Full Resolution Certificate Inspection */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div
              className={`max-w-2xl w-full p-6 sm:p-8 rounded-3xl border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate inspector"
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Document Frame (Full Resolution Representation) */}
              <div className="border-2 border-emerald-600/30 rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-slate-950/70 relative mb-6">
                <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 mb-2">
                    <Award className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#085F2C] dark:text-emerald-400 block font-bold">
                    Official Statutory Document
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-tech text-slate-900 dark:text-white mt-1">
                    {selectedCert.code}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {selectedCert.title}
                  </p>
                </div>

                <div className="py-5 space-y-4 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono-code uppercase text-slate-400 block">
                      Licensed Entity / Certified Enterprise
                    </span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {COMPANY_DATA.legalName}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                      CIN: {COMPANY_DATA.governmentIds.cin} | GSTIN: {COMPANY_DATA.governmentIds.gst} | IEC: {COMPANY_DATA.governmentIds.iec}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Head Office: {COMPANY_DATA.headOffice.fullAddress}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono-code uppercase text-slate-400 block mb-1">
                      Auditing / Regulatory Authority
                    </span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {selectedCert.issuedBy}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono-code uppercase text-slate-400 block mb-1">
                      Certified Scope of Manufacturing & Distribution
                    </span>
                    <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                      {selectedCert.scope}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-mono-code uppercase text-slate-400 block">Certificate #</span>
                      <span className="font-mono-code font-bold text-slate-900 dark:text-white">{selectedCert.certNumber}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-mono-code uppercase text-slate-400 block">Status / Validity</span>
                      <span className="font-mono-code font-bold text-[#085F2C] dark:text-emerald-400">{selectedCert.status} ({selectedCert.validThrough})</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Authorized Signature: Director Mr. Rahis Khan</span>
                  <span className="font-mono-code text-emerald-600 dark:text-emerald-400 font-semibold">VERIFIED CDSCO / ISO REGISTRY</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-h-[44px]"
                >
                  Close Document View
                </button>
                <button
                  onClick={() => {
                    setSelectedCert(null);
                    onRequestQuote();
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors min-h-[44px]"
                >
                  Request Certified Hospital Quality Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
