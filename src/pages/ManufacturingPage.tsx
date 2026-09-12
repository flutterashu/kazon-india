import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ManufacturingLifecycle } from '../components/ManufacturingLifecycle';
import { Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../utils/seo';

interface ManufacturingPageProps {
  isDarkMode: boolean;
}

export const ManufacturingPage: React.FC<ManufacturingPageProps> = ({ isDarkMode }) => {
  const canonicalUrl = `${SITE_URL}/manufacturing`;

  return (
    <div className="py-8">
      <Helmet>
        <title>Orthopedic Implant Manufacturing & Swiss CNC Metrology | Kazon India</title>
        <meta 
          name="description" 
          content="Explore Kazon India's 7-stage manufacturing lifecycle: Swiss CNC sliding-head machining, automated passivation, Zeiss CMM inspection, and ISO Class 7 cleanroom packaging." 
        />
        <meta property="og:title" content="Precision Manufacturing & Quality Lifecycle | Kazon India" />
        <meta property="og:description" content="State-of-the-art medical implant manufacturing plant in Tronica City, NCR Delhi with multi-axis Swiss CNC lathes and sub-micron quality metrology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-2">
          <Cpu className="w-3.5 h-3.5 mr-1.5" />
          5-Axis Swiss CNC Machining & Metrology
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-tech tracking-tight">
          Precision Manufacturing & Quality Lifecycle
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Follow Kazon India's 7-stage manufacturing process from certified vacuum-arc remelted titanium billet to ISO Class 7 cleanroom vacuum packaging and validated terminal sterilization.
        </p>
      </div>

      <ManufacturingLifecycle isDarkMode={isDarkMode} />

      {/* OEM Machining & Contract Capabilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div
          className={`p-8 sm:p-10 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          } shadow-xl`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono-code text-[#085F2C] dark:text-emerald-400 uppercase tracking-widest block">
                OEM / ODM CONTRACT MANUFACTURING
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-tech">
                Custom Orthopedic Implant Machining & Private Label Packaging
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Looking for a certified manufacturing partner for private-label spinal fixation systems, complex trauma plates, or custom patient-matched implants? Kazon India offers dedicated Swiss CNC machine cells with complete DHF/DMR regulatory transfer.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center space-x-2 text-xs font-mono-code text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#085F2C]" />
                  <span>±2.54 µm Tolerances</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono-code text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#085F2C]" />
                  <span>Ra ≤ 0.05 µm Finish</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono-code text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#085F2C]" />
                  <span>ISO 13485:2016 Certified</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <Link
                to="/request-quote"
                className="w-full py-3 px-6 rounded-xl bg-[#085F2C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#064a22] transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-[#085F2C]/20"
              >
                <span>Request OEM / ODM Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ask-engineer"
                className="w-full py-3 px-6 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-center"
              >
                Book Machining Cell Tour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
