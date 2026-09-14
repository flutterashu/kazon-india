import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PRODUCTS } from '../data/products';
import { OrthopedicProduct } from '../types';
import { getCategoryBySlug, CATEGORIES, SITE_URL } from '../utils/seo';
import { trackCTA, trackProductInteraction } from '../utils/analytics';
import { 
  Layers, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Box, 
  ShieldCheck, 
  Cpu, 
  Send 
} from 'lucide-react';

interface CategoryPageProps {
  isDarkMode?: boolean;
  onOpenQuoteModal: (product?: OrthopedicProduct) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  isDarkMode = false,
  onOpenQuoteModal,
}) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug || '');

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <Helmet>
          <title>Category Not Found | Kazon India</title>
          <meta name="description" content="The requested implant category could not be found." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <h1 className="text-2xl font-bold font-tech mb-2">Category Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The requested product family or category does not exist in our catalog.
        </p>
        <Link
          to="/products"
          className="px-4 py-2 rounded-xl bg-[#085F2C] text-white text-xs font-semibold"
        >
          View All Implants
        </Link>
      </div>
    );
  }

  // Filter products by this category/family
  const categoryProducts = PRODUCTS.filter(
    (p) => p.family.toLowerCase() === category.name.toLowerCase()
  );

  const canonicalUrl = `${SITE_URL}/category/${category.slug}`;

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
        'name': category.name,
        'item': canonicalUrl
      }
    ]
  };

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <Helmet>
        <title>{`${category.name} Systems & Hardware | Kazon India`}</title>
        <meta name="description" content={category.description} />
        <meta property="og:title" content={`${category.name} Systems | Kazon India`} />
        <meta property="og:description" content={category.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsSchema)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 py-1">
            <li>
              <Link to="/" className="hover:text-[#085F2C] transition-colors">Home</Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-400" /></li>
            <li>
              <Link to="/products" className="hover:text-[#085F2C] transition-colors">Implants</Link>
            </li>
            <li><ChevronRight className="w-3 h-3 text-slate-400" /></li>
            <li className="font-semibold text-slate-800 dark:text-slate-200">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Category Header: Exactly ONE <h1> */}
        <div className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Layers className="w-3.5 h-3.5 mr-1.5" />
            Product Portfolio / {category.name}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-tech tracking-tight text-slate-900 dark:text-white">
            {category.headline}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Category Switching Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-2">
            Categories:
          </span>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                c.slug === category.slug
                  ? 'bg-[#085F2C] text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#085F2C]'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                    {prod.anatomy}
                  </span>
                  <span className="text-[10px] font-mono-code text-slate-400">
                    {prod.toleranceStandard.split(' ')[0]}
                  </span>
                </div>

                <h2 className="text-base font-bold font-tech mb-2 text-slate-900 dark:text-white line-clamp-2">
                  <Link
                    to={`/products/${prod.id}`}
                    className="hover:text-[#085F2C] transition-colors"
                  >
                    {prod.name}
                  </Link>
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {prod.tagline}
                </p>

                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] font-mono-code text-slate-500 dark:text-slate-400 mb-5">
                  <div className="flex justify-between">
                    <span>Material:</span>
                    <span className="text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                      {prod.material.split('(')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sizes:</span>
                    <span className="text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                      {prod.availableSizes.split('|')[0]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <Link
                  to={`/products/${prod.id}`}
                  onClick={() => trackProductInteraction(prod.id, prod.name, 'view_details', { source: 'category_page_card' })}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Box className="w-3.5 h-3.5 text-[#085F2C]" />
                  <span>3D CAD & Specs</span>
                </Link>

                <button
                  onClick={() => {
                    trackCTA('request_rfq', 'category_page_card', {
                      product_id: prod.id,
                      product_name: prod.name,
                    });
                    onOpenQuoteModal(prod);
                  }}
                  className="py-2 px-3 rounded-xl bg-[#085F2C] text-white hover:bg-[#064a22] text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                  title="Request Quote"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="sr-only">Request Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="text-center pt-4 pb-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#085F2C] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse Full Product Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
