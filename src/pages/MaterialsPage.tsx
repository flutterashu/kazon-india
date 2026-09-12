import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MaterialScienceComparator } from '../components/MaterialScienceComparator';
import { Layers, ShieldCheck, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../utils/seo';

interface MaterialsPageProps {
  isDarkMode: boolean;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ isDarkMode }) => {
  const canonicalUrl = `${SITE_URL}/materials`;

  return (
    <div className="py-8">
      <Helmet>
        <title>Medical Metallurgy & Biomaterials Science | Kazon India</title>
        <meta 
          name="description" 
          content="Technical comparison of medical grade Ti-6Al-4V ELI (ASTM F136), 316L Stainless Steel (ASTM F138), and cortical bone biomechanics by Kazon India." 
        />
        <meta property="og:title" content="Medical Metallurgy & Biomaterials Science | Kazon India" />
        <meta property="og:description" content="Certified ASTM F136 titanium and ASTM F138 stainless steel medical implant metallurgy with full heat-lot traceability." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
          <Layers className="w-3.5 h-3.5 mr-1.5" />
          Metallurgical Engineering Laboratory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-tech tracking-tight">
          Materials Science & Biomechanics Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Direct comparative analysis between Ti-6Al-4V ELI (ASTM F136), 316L Stainless Steel (ASTM F138), and Human Cortical Bone. Tuned for load distribution and biological osseointegration.
        </p>
      </div>

      <MaterialScienceComparator isDarkMode={isDarkMode} />

      {/* Materials Sourcing Assurance Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono-code text-emerald-400 block">
              100% VACUUM ARC REMELTED (VAR) SUPPLY CHAIN
            </span>
            <h3 className="text-2xl font-bold font-tech">
              Need Raw Material Test Reports (MTR) or Chemistry Mill Certs?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Every bar of medical alloy procured by Kazon India Pvt. Ltd. undergoes ultrasonic flaw detection and spectrographic chemical verification before CNC loading.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Link
              to="/request-quote"
              className="px-6 py-3 rounded-xl bg-[#085F2C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#064a22] transition-colors flex items-center space-x-2"
            >
              <span>Request Mill Test Certs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
