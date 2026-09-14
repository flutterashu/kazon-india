import React, { useState, useEffect } from 'react';
import { X, Download, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { trackDossierDownload, trackCTA } from '../utils/analytics';

interface TechnicalDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: string;
  isDarkMode: boolean;
}

export const TechnicalDocModal: React.FC<TechnicalDocModalProps> = ({
  isOpen,
  onClose,
  title,
  type,
  isDarkMode,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      trackCTA('view_technical_dossier_modal', 'technical_doc_modal', {
        doc_title: title,
        doc_type: type,
      });
    }
  }, [isOpen, title, type]);

  if (!isOpen) return null;

  const handleDownload = () => {
    trackDossierDownload(title, type);
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div
        className={`max-w-2xl w-full my-auto max-h-[92vh] flex flex-col p-5 sm:p-8 rounded-3xl border shadow-2xl relative transition-all overflow-y-auto ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono-code text-[#085F2C] dark:text-emerald-400">
            <FileText className="w-4 h-4" />
            <span>KAZON REGULATORY CLINICAL DOSSIER</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-tech pr-8">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 font-mono-code border border-emerald-500/20">
              Document Type: {type}
            </span>
            <span>Revision: 2026.4</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono-code">CE MDR / ISO 13485 Validated</span>
          </div>

          {/* Document Simulated Preview Pane */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-4 font-mono-code">
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-slate-400">DOCUMENT ID: KZ-IFU-7049-REV4</span>
              <span className="text-slate-400">SECURITY: UNRESTRICTED CLINICAL</span>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white font-tech text-sm">
                1. Intended Use & Clinical Scope
              </h4>
              <p className="leading-relaxed">
                This medical hardware is indicated for rigid internal fixation, spinal arthrodesis, and fracture reduction. Fabricated from certified vacuum-arc remelted Ti-6Al-4V ELI (ASTM F136) or 316L Stainless Steel (ASTM F138).
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white font-tech text-sm">
                2. Surgical Technique Summary & Torque Limits
              </h4>
              <p className="leading-relaxed">
                Ensure pedicle screw trajectories follow standard anatomical landmarks. The dovetail set screw locking mechanism requires a calibrated torque limiter set to <strong>90 in-lb (10.2 N·m)</strong>. An audible clutch click indicates definitive locking.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white font-tech text-sm">
                3. Decontamination, Cleaning & Steam Sterilization
              </h4>
              <p className="leading-relaxed">
                Pre-vacuum steam cycle: 134°C (273°F) for 4 minutes minimum exposure time, followed by 30 minutes vacuum dry cycle. Comply with ISO 17665-1 validation guidelines.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Authorized Signatory: Head of Clinical Regulatory Affairs</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">DIGITALLY NOTARIZED</span>
            </div>
          </div>

          {downloaded ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-[#085F2C] dark:text-emerald-400 flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#085F2C] dark:text-emerald-400" />
                <span>Package downloaded successfully (PDF + STEP bundle)</span>
              </span>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#085F2C] text-white min-h-[36px]"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-[#085F2C]/25 min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>Download Certified PDF & CAD Package</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
