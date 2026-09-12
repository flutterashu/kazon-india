import React from 'react';
import { TrustRegulatory } from '../components/TrustRegulatory';
import { ShieldCheck, Award, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RegulatoryPageProps {
  isDarkMode: boolean;
  onOpenQuoteModal: () => void;
}

export const RegulatoryPage: React.FC<RegulatoryPageProps> = ({
  isDarkMode,
  onOpenQuoteModal,
}) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
          Global Quality Assurance & Trust Dossiers
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-tech tracking-tight">
          Regulatory Compliance & Competitor Benchmarking
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Verified medical device manufacturing standards, international notified body audit scopes, and clinical performance benchmarks against multinational industry leaders.
        </p>
      </div>

      <TrustRegulatory
        isDarkMode={isDarkMode}
        onRequestQuote={onOpenQuoteModal}
      />
    </div>
  );
};
