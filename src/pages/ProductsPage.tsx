import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PRODUCTS } from '../data/products';
import { OrthopedicProduct } from '../types';
import { ThreeImplantViewer } from '../components/ThreeImplantViewer';
import { ProductCatalog } from '../components/ProductCatalog';
import { Box, FileCheck, FileText, Download, ShieldCheck, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../utils/seo';

interface ProductsPageProps {
  isDarkMode: boolean;
  onOpenQuoteModal: (product?: OrthopedicProduct) => void;
  onOpenDocModal: (title: string, type: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  isDarkMode,
  onOpenQuoteModal,
  onOpenDocModal,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<OrthopedicProduct>(PRODUCTS[0]);

  const canonicalUrl = `${SITE_URL}/products`;
  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${SITE_URL}/`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Orthopedic Implants',
        'item': canonicalUrl
      }
    ]
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Orthopedic Implants & 3D CAD Catalog | Kazon India</title>
        <meta 
          name="description" 
          content="Explore Kazon India's comprehensive portfolio of titanium & stainless steel orthopedic implants: LCP/DCP plates, intramedullary nails, spine hardware, and external fixators." 
        />
        <meta property="og:title" content="Orthopedic Implants & 3D CAD Catalog | Kazon India" />
        <meta property="og:description" content="Precision-machined medical implants with micron tolerances, STEP CAD models, and ISO 13485:2016 certification dossiers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsSchema)}
        </script>
      </Helmet>

      {/* 3D CAD Metrology Inspector Section */}
      <section id="implant-3d-inspector" className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-2">
                <Box className="w-3.5 h-3.5 mr-1.5" />
                WebGL Hardware Metrology Viewer
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-tech tracking-tight">
                Orthopedic Implants & 3D CAD Metrology Catalog
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                Click and drag to rotate in full 360°. Inspect multi-part exploded assemblies, wireframe CNC toolpath meshes, and micron-level caliper callouts.
              </p>
            </div>

            {/* Implant Selector Pills for 3D View */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0">
              {PRODUCTS.slice(0, 5).map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedProduct.id === prod.id
                      ? 'bg-[#085F2C] text-white shadow-md shadow-[#085F2C]/25'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {prod.name.split('™')[0]}™
                </button>
              ))}
            </div>
          </div>

          {/* 3D Viewport Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main 3D Canvas Box */}
            <div className="lg:col-span-8">
              <ThreeImplantViewer
                modelType={selectedProduct.threeModelType}
                productName={selectedProduct.name}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Live Technical Specs Panel Beside 3D Viewer */}
            <div className="lg:col-span-4 space-y-5">
              <div
                className={`p-6 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20">
                    {selectedProduct.family} Portfolio
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">
                    {selectedProduct.anatomy}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-tech mb-2">
                  {selectedProduct.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {selectedProduct.tagline}
                </p>

                {/* Micro Specs List */}
                <div className="space-y-2 border-y border-slate-200 dark:border-slate-800 py-3.5 mb-5 font-mono-code text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Material Core:</span>
                    <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[160px]">
                      {selectedProduct.material}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tolerance Class:</span>
                    <span className="font-semibold text-[#085F2C] dark:text-emerald-400">
                      {selectedProduct.toleranceStandard}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Surface Finish:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Ra 0.24 µm (ISO 4287)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Regulatory Clearance:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {selectedProduct.fdaCeStatus.split('|')[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => onOpenQuoteModal(selectedProduct)}
                    className="w-full py-3 rounded-xl text-xs font-bold bg-[#085F2C] hover:bg-[#064e24] text-white transition-all shadow-md shadow-[#085F2C]/25 flex items-center justify-center space-x-2"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Request RFQ for {selectedProduct.name.split('™')[0]}</span>
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('detailed-product-dossier');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#085F2C] dark:text-emerald-400" />
                    <span>Open Full Dimensional Dossier</span>
                  </button>
                </div>
              </div>

              {/* Surgeon Technique & CAD Planning Quick Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Download className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      STEP CAD File Available
                    </span>
                    <span className="text-[11px] text-slate-500">For preoperative surgical planning</span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenDocModal(`${selectedProduct.name} STEP CAD Planning Model`, 'STEP CAD')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#085F2C]/10 text-[#085F2C] dark:text-emerald-400 hover:bg-[#085F2C] hover:text-white transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Product Catalog & Technical Dossiers */}
      <ProductCatalog
        products={PRODUCTS}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
        onRequestQuoteForProduct={onOpenQuoteModal}
        onOpenDocModal={onOpenDocModal}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
