import React, { useState, useMemo } from 'react';
import { OrthopedicProduct } from '../types';
import { Box, Download, ShieldCheck, Check, ArrowRight, Filter, Layers, FileText, CheckCircle2, Search, X } from 'lucide-react';

interface ProductCatalogProps {
  products: OrthopedicProduct[];
  selectedProduct: OrthopedicProduct;
  onSelectProduct: (product: OrthopedicProduct) => void;
  onRequestQuoteForProduct: (product: OrthopedicProduct) => void;
  onOpenDocModal: (title: string, type: string) => void;
  isDarkMode: boolean;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
  onRequestQuoteForProduct,
  onOpenDocModal,
  isDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFamily, setActiveFamily] = useState<string>('All');
  const [activeAnatomyFilter, setActiveAnatomyFilter] = useState<string>('All');
  const [activeMaterialFilter, setActiveMaterialFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'clinical' | 'downloads'>('specs');

  // Derive dynamic list of product families and anatomies
  const families = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.family));
    return ['All', ...Array.from(set)];
  }, [products]);

  const anatomies = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.anatomy));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.anatomy.toLowerCase().includes(q) ||
        p.family.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const matchesFamily = activeFamily === 'All' || p.family === activeFamily;
      const matchesAnatomy = activeAnatomyFilter === 'All' || p.anatomy === activeAnatomyFilter;
      const matchesMaterial =
        activeMaterialFilter === 'All' ||
        (activeMaterialFilter === 'Titanium' && p.material.includes('Titanium')) ||
        (activeMaterialFilter === 'Stainless' && p.material.includes('Stainless'));

      return matchesSearch && matchesFamily && matchesAnatomy && matchesMaterial;
    });
  }, [products, searchQuery, activeFamily, activeAnatomyFilter, activeMaterialFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFamily('All');
    setActiveAnatomyFilter('All');
    setActiveMaterialFilter('All');
  };

  return (
    <section id="product-catalog" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Layers className="w-3.5 h-3.5 mr-1.5" />
            Precision Implant & Instrument Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-tech">
            Orthopedic Hardware Catalog & Technical Dossiers
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Manufactured by Kazon India Pvt. Ltd. from certified medical alloys (Ti-6Al-4V ELI & 316L). Complete range of LCP & DCP plates, intramedullary nails, spine hardware, external fixators, and surgical instrument sets.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by implant name (e.g. PHILOS, PFNA, Distal Femur, Pedicle Screw, Radius)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Anatomy Dropdown */}
            <div className="w-full md:w-auto flex items-center space-x-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Anatomy:</span>
              <select
                value={activeAnatomyFilter}
                onChange={(e) => setActiveAnatomyFilter(e.target.value)}
                className="w-full md:w-44 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
              >
                {anatomies.map((anat) => (
                  <option key={anat} value={anat}>
                    {anat}
                  </option>
                ))}
              </select>
            </div>

            {/* Material Dropdown */}
            <div className="w-full md:w-auto flex items-center space-x-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Alloy:</span>
              <select
                value={activeMaterialFilter}
                onChange={(e) => setActiveMaterialFilter(e.target.value)}
                className="w-full md:w-40 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-[#085F2C] focus:outline-none min-h-[44px]"
              >
                <option value="All">All Metallurgy</option>
                <option value="Titanium">Ti-6Al-4V ELI Only</option>
                <option value="Stainless">316L Stainless Only</option>
              </select>
            </div>
          </div>

          {/* Family Category Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {families.map((fam) => (
              <button
                key={fam}
                onClick={() => setActiveFamily(fam)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
                  activeFamily === fam
                    ? 'bg-[#085F2C] text-white shadow-md shadow-[#085F2C]/25'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/60'
                }`}
              >
                {fam}
              </button>
            ))}
          </div>

          {/* Results Summary & Reset */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
            <span>
              Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> orthopedic products & systems
            </span>
            {(searchQuery || activeFamily !== 'All' || activeAnatomyFilter !== 'All' || activeMaterialFilter !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="text-[#085F2C] dark:text-emerald-400 hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProducts.map((product) => {
              const isSelected = product.id === selectedProduct.id;
              return (
                <div
                  key={product.id}
                  className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? 'border-[#085F2C] ring-2 ring-[#085F2C]/20 shadow-xl'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  } ${isDarkMode ? 'bg-slate-900/80' : 'bg-white'}`}
                >
                  {/* Product Card Top */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20">
                        {product.family} • {product.anatomy}
                      </span>
                      <span className="text-[11px] font-mono-code text-slate-400">
                        {product.material.split('(')[0].trim()}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-tech text-slate-900 dark:text-white mb-2 line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Micro Specs List */}
                    <div className="space-y-1.5 text-xs font-mono-code bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl mb-4 border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span className="text-slate-400">Tolerance:</span>
                        <span className="text-[#085F2C] dark:text-emerald-400 font-semibold">
                          {product.toleranceStandard.split('(')[1]?.replace(')', '') || product.toleranceStandard}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span className="text-slate-400">Finish:</span>
                        <span className="truncate max-w-[160px]">{product.surfaceFinish.split('(')[0]}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span className="text-slate-400">Regulatory:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{product.fdaCeStatus.split('|')[0].trim()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Card Footer Actions */}
                  <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        const el = document.getElementById('implant-3d-inspector');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors min-h-[44px]"
                    >
                      <Box className="w-3.5 h-3.5 mr-1.5 text-[#085F2C] dark:text-emerald-400" />
                      Inspect in 3D
                    </button>

                    <button
                      onClick={() => onRequestQuoteForProduct(product)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors shadow-sm min-h-[44px]"
                    >
                      Request RFQ
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 mb-16">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-tech text-slate-900 dark:text-white">
              No matching products found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or resetting filters to browse our full catalog of plates, nails, spine, and instruments.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-[#085F2C] text-white min-h-[44px]"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Deep Detailed Technical Dossier for Currently Inspected Product */}
        <div
          id="detailed-product-dossier"
          className={`rounded-3xl border overflow-hidden transition-all ${
            isDarkMode
              ? 'bg-slate-900/95 border-slate-800 shadow-2xl'
              : 'bg-white border-slate-200 shadow-xl'
          }`}
        >
          {/* Dossier Header */}
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20">
                  {selectedProduct.material}
                </span>
                <span className="text-xs font-mono-code text-slate-400">
                  {selectedProduct.fdaCeStatus}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-tech text-slate-900 dark:text-white">
                {selectedProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {selectedProduct.description}
              </p>
            </div>

            <button
              onClick={() => onRequestQuoteForProduct(selectedProduct)}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors shrink-0 shadow-lg shadow-[#085F2C]/25 min-h-[44px]"
            >
              Request Clinical Evaluation Kit
            </button>
          </div>

          {/* Dossier Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 sm:px-8 space-x-6 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-3.5 border-b-2 transition-colors whitespace-nowrap min-h-[44px] ${
                activeTab === 'specs'
                  ? 'border-[#085F2C] text-[#085F2C] dark:text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              Dimensional Specifications & Tolerances
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-3.5 border-b-2 transition-colors whitespace-nowrap min-h-[44px] ${
                activeTab === 'features'
                  ? 'border-[#085F2C] text-[#085F2C] dark:text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              Key Features & Biomechanics
            </button>
            <button
              onClick={() => setActiveTab('clinical')}
              className={`py-3.5 border-b-2 transition-colors whitespace-nowrap min-h-[44px] ${
                activeTab === 'clinical'
                  ? 'border-[#085F2C] text-[#085F2C] dark:text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              Indications & Surgical Benefits
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`py-3.5 border-b-2 transition-colors whitespace-nowrap min-h-[44px] ${
                activeTab === 'downloads'
                  ? 'border-[#085F2C] text-[#085F2C] dark:text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              Technical Guides & STEP CAD Files ({selectedProduct.downloads.length})
            </button>
          </div>

          {/* Dossier Content Panels */}
          <div className="p-6 sm:p-8">
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProduct.specifications.map((spec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-mono-code text-slate-400 block uppercase">
                          {spec.label}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                          {spec.value}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20">
                        Tol: {spec.tolerance}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <strong>Available Sizes:</strong> {selectedProduct.availableSizes}
                  </div>
                  <div>
                    <strong>Packaging:</strong> {selectedProduct.packaging}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProduct.keyFeatures.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'clinical' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-xs uppercase font-mono-code text-slate-400 mb-3">
                    Target Clinical Indications
                  </h4>
                  <ul className="space-y-2">
                    {selectedProduct.indications.map((ind, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#085F2C] dark:bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-xs uppercase font-mono-code text-slate-400 mb-3">
                    Surgeon & Patient Outcomes
                  </h4>
                  <ul className="space-y-2">
                    {selectedProduct.clinicalBenefits.map((ben, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProduct.downloads.map((doc, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                          {doc.title}
                        </span>
                        <span className="text-[10px] font-mono-code text-slate-400">
                          {doc.type} • {doc.size}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenDocModal(doc.title, doc.type)}
                      className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title="Download file"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
