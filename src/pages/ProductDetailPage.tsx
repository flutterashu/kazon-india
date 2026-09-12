import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PRODUCTS } from '../data/products';
import { OrthopedicProduct } from '../types';
import { ThreeImplantViewer } from '../components/ThreeImplantViewer';
import { slugifyCategory, SITE_URL } from '../utils/seo';
import { 
  Box, 
  ShieldCheck, 
  FileText, 
  Download, 
  ChevronRight, 
  ArrowLeft, 
  Activity, 
  FileCheck, 
  Cpu, 
  CheckCircle2,
  PhoneCall,
  Send
} from 'lucide-react';

interface ProductDetailPageProps {
  isDarkMode?: boolean;
  onOpenQuoteModal: (product?: OrthopedicProduct) => void;
  onOpenDocModal: (title: string, type: string) => void;
  onOpenEngineerModal: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  isDarkMode = false,
  onOpenQuoteModal,
  onOpenDocModal,
  onOpenEngineerModal,
}) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find(
    (p) => p.id.toLowerCase() === productId?.toLowerCase()
  );

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <Helmet>
          <title>Implant Not Found | Kazon India</title>
          <meta name="description" content="The requested orthopedic implant specification could not be found in Kazon India's product catalog." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="p-4 rounded-full bg-amber-500/10 text-amber-600 mb-4">
          <Box className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-tech mb-2">Implant Not Found</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mb-6">
          The requested technical dossier or product SKU could not be located in our catalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#085F2C] text-white font-medium text-sm hover:bg-[#064a22] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Implants Catalog</span>
        </Link>
      </div>
    );
  }

  const categorySlug = slugifyCategory(product.family);
  const canonicalUrl = `${SITE_URL}/products/${product.id}`;

  // Product Schema (JSON-LD)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonicalUrl}#product`,
    'name': product.name,
    'description': product.description,
    'category': product.category,
    'brand': {
      '@type': 'Brand',
      'name': 'Kazon India'
    },
    'manufacturer': {
      '@type': 'Organization',
      'name': 'Kazon India Pvt. Ltd.',
      'url': SITE_URL
    },
    'material': product.material,
    'sku': product.id,
    'mpn': product.id.toUpperCase(),
    'offers': {
      '@type': 'Offer',
      'url': canonicalUrl,
      'priceCurrency': 'USD',
      'price': '0',
      'priceSpecification': {
        '@type': 'PriceSpecification',
        'description': 'Direct Institutional RFQ & Export Freight Quotation'
      },
      'availability': 'https://schema.org/InStock',
      'itemCondition': 'https://schema.org/NewCondition'
    }
  };

  // BreadcrumbList Schema (JSON-LD)
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
        'item': `${SITE_URL}/products`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': product.family,
        'item': `${SITE_URL}/category/${categorySlug}`
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': product.name,
        'item': canonicalUrl
      }
    ]
  };

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <Helmet>
        <title>{`${product.name} | Kazon India Orthopedic Implants`}</title>
        <meta 
          name="description" 
          content={`${product.tagline}. Medical-grade ${product.material} orthopedic implant engineered by Kazon India under ISO 13485:2016 and CDSCO Class IIb licensure.`} 
        />
        <meta property="og:title" content={`${product.name} | Kazon India`} />
        <meta property="og:description" content={product.tagline} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsSchema)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap py-1">
            <li>
              <Link to="/" className="hover:text-[#085F2C] transition-colors">Home</Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-400" /></li>
            <li>
              <Link to="/products" className="hover:text-[#085F2C] transition-colors">Implants</Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-400" /></li>
            <li>
              <Link to={`/category/${categorySlug}`} className="hover:text-[#085F2C] transition-colors">
                {product.family}
              </Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-400" /></li>
            <li className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Top Product Header: EXACTLY ONE <h1> on this page */}
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 font-semibold uppercase">
              {product.family}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Anatomy: {product.anatomy}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Tolerance: {product.toleranceStandard}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-tech tracking-tight text-slate-900 dark:text-white">
            {product.name}
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Main Grid: 3D CAD Metrology Inspector & Technical Spec Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: 3D CAD Viewer */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <Box className="w-4 h-4 text-[#085F2C] dark:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono-code">
                  Interactive 3D CAD Metrology View
                </span>
              </div>
              <span className="text-[11px] font-mono-code text-slate-400">
                Model: {product.threeModelType}
              </span>
            </div>

            <ThreeImplantViewer
              modelType={product.threeModelType}
              productName={product.name}
              isDarkMode={isDarkMode}
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800 font-mono-code">
              <span>● Rotate: Click + Drag</span>
              <span>● Zoom: Mouse Wheel / Pinch</span>
              <span>● Exploded / Wireframe via viewport controls</span>
            </div>
          </div>

          {/* Right Column: Key Specifications & Commercial Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-base font-bold uppercase tracking-wider font-tech mb-4 text-slate-900 dark:text-white flex items-center">
                <Cpu className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 mr-2" />
                Engineering & Metallurgical Specs
              </h2>

              <dl className="space-y-3 font-mono-code text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Material Core:</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white text-right max-w-[200px]">
                    {product.material}
                  </dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Surface Finish:</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white text-right max-w-[220px]">
                    {product.surfaceFinish}
                  </dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Precision Tolerance:</dt>
                  <dd className="font-semibold text-[#085F2C] dark:text-emerald-400 text-right">
                    {product.toleranceStandard}
                  </dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <dt className="text-slate-500">Available Configurations:</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white text-right max-w-[200px]">
                    {product.availableSizes}
                  </dd>
                </div>
                <div className="flex justify-between py-1.5">
                  <dt className="text-slate-500">Sterile Packaging:</dt>
                  <dd className="font-semibold text-slate-900 dark:text-white text-right max-w-[200px]">
                    {product.packaging}
                  </dd>
                </div>
              </dl>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => onOpenQuoteModal(product)}
                  className="w-full py-3 px-4 rounded-xl bg-[#085F2C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#064a22] transition-colors flex items-center justify-center space-x-2 shadow-md shadow-[#085F2C]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Institutional Quotation (CIF / FOB)</span>
                </button>

                <button
                  onClick={onOpenEngineerModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#085F2C]" />
                  <span>Consult Biomedical Engineering Team</span>
                </button>
              </div>
            </div>

            {/* Regulatory Compliance Pill Box */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs">
              <div className="flex items-center space-x-2 text-[#085F2C] dark:text-emerald-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Certified Regulatory Compliance</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-mono-code">
                {product.fdaCeStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Indications, Key Features, Specifications & Downloads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Clinical Indications */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold font-tech mb-4 text-slate-900 dark:text-white flex items-center">
              <Activity className="w-5 h-5 text-[#085F2C] mr-2" />
              Surgical Indications & Pathologies
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {product.indications.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#085F2C] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Design Features */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold font-tech mb-4 text-slate-900 dark:text-white flex items-center">
              <Cpu className="w-5 h-5 text-[#085F2C] mr-2" />
              Biomechanical & Design Features
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {product.keyFeatures.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#085F2C] shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Downloads & Surgical Technique Guides */}
        {product.downloads && product.downloads.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
            <h2 className="text-lg font-bold font-tech mb-4 text-slate-900 dark:text-white flex items-center">
              <Download className="w-5 h-5 text-[#085F2C] mr-2" />
              Technical Dossiers, CAD Models & Technique Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.downloads.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 font-semibold mb-2 inline-block">
                      {doc.type}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
                      {doc.title}
                    </h3>
                    <span className="text-[10px] font-mono-code text-slate-400">
                      {doc.size}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenDocModal(doc.title, doc.type)}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#085F2C] hover:border-[#085F2C] transition-colors flex items-center justify-center space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Dossier</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Link to Catalog */}
        <div className="text-center pt-4 pb-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#085F2C] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse Full Kazon Orthopedic Implants Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
