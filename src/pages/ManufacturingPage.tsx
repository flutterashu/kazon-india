import React from 'react';
import { ManufacturingLifecycle } from '../components/ManufacturingLifecycle';
import { Cpu, ShieldCheck, ArrowRight, Gauge, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ManufacturingPageProps {
  isDarkMode: boolean;
}

export const ManufacturingPage: React.FC<ManufacturingPageProps> = ({ isDarkMode }) => {
  return (
    <div className="py-8">
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Tolerances</span>
                  <span className="font-bold text-[#085F2C] dark:text-emerald-400 font-mono-code">±0.0001" (2.54µm)</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Lead Times</span>
                  <span className="font-bold text-emerald-500 font-mono-code">3 - 6 Weeks</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Regulatory Transfer</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono-code">CE MDR & FDA 510(k)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-3">
              <Link
                to="/ask-engineer"
                className="w-full py-3.5 rounded-xl text-xs font-bold bg-[#085F2C] hover:bg-[#064e24] text-white transition-all shadow-md shadow-[#085F2C]/25 text-center flex items-center justify-center space-x-2"
              >
                <Cpu className="w-4 h-4" />
                <span>Consult With Lead Machinist</span>
              </Link>
              <Link
                to="/request-quote"
                className="w-full py-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors text-center"
              >
                Request Contract Machining RFQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
