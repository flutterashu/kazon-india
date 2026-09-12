import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { OrthopedicProduct } from '../types';
import { AnatomyExplorer } from '../components/AnatomyExplorer';
import { Activity } from 'lucide-react';
import { SITE_URL } from '../utils/seo';

interface AnatomyPageProps {
  isDarkMode: boolean;
}

export const AnatomyPage: React.FC<AnatomyPageProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const handleSelectProduct = (product: OrthopedicProduct) => {
    navigate(`/products/${product.id}`);
  };

  const canonicalUrl = `${SITE_URL}/anatomy`;

  return (
    <div className="py-8">
      <Helmet>
        <title>Surgical Anatomy & Implant Matching Map | Kazon India</title>
        <meta 
          name="description" 
          content="Interactive skeletal anatomy map matching clinical fracture pathologies, surgical approaches (ORIF, ACDF, TLIF), and Kazon titanium implants." 
        />
        <meta property="og:title" content="Surgical Anatomy & Implant Matching | Kazon India" />
        <meta property="og:description" content="Explore human skeletal anatomy and locate exact titanium trauma, spine, and extremity implants engineered by Kazon India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-2">
          <Activity className="w-3.5 h-3.5 mr-1.5" />
          Clinical Pathology & Biomechanics
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-tech tracking-tight">
          Surgical Anatomy & Implant Matching
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Explore the human skeletal framework to pinpoint clinical indications, surgical approaches (ACDF, TLIF, MIS posterior, ORIF), and verified Kazon India precision implants.
        </p>
      </div>

      <AnatomyExplorer
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
