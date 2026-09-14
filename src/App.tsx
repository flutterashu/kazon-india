import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PRODUCTS } from './data/products';
import { OrthopedicProduct, AudienceRole } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AnalyticsTracker } from './components/AnalyticsTracker';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { AskAnEngineerModal } from './components/AskAnEngineerModal';
import { TechnicalDocModal } from './components/TechnicalDocModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { AnatomyPage } from './pages/AnatomyPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { RegulatoryPage } from './pages/RegulatoryPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { AskEngineerPage } from './pages/AskEngineerPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  // Pure Cleanroom Light Mode strictly enforced for optimal contrast and readability
  const isDarkMode = false;
  const [activeRole, setActiveRole] = useState<AudienceRole>('surgeons');
  
  // Modals state for quick on-page popup actions
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<OrthopedicProduct | null>(null);
  const [isAskEngineerModalOpen, setIsAskEngineerModalOpen] = useState(false);
  const [docModal, setDocModal] = useState<{ isOpen: boolean; title: string; type: string }>({
    isOpen: false,
    title: '',
    type: '',
  });

  // Ensure 'dark' class is strictly removed from document
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const handleOpenQuote = (product?: OrthopedicProduct) => {
    setQuoteProduct(product || PRODUCTS[0]);
    setIsQuoteModalOpen(true);
  };

  const handleOpenDoc = (title: string, type: string) => {
    setDocModal({ isOpen: true, title, type });
  };

  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#085F2C] selection:text-white">
        {/* Persistent Top Navbar */}
        <Navbar
          onRequestQuote={() => handleOpenQuote()}
          onAskEngineer={() => setIsAskEngineerModalOpen(true)}
        />

        {/* Multi-Page Routed Content */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isDarkMode={isDarkMode}
                  activeRole={activeRole}
                  setActiveRole={setActiveRole}
                  onOpenQuoteModal={handleOpenQuote}
                  onOpenEngineerModal={() => setIsAskEngineerModalOpen(true)}
                />
              }
            />
            <Route
              path="/products"
              element={
                <ProductsPage
                  isDarkMode={isDarkMode}
                  onOpenQuoteModal={handleOpenQuote}
                  onOpenDocModal={handleOpenDoc}
                />
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProductDetailPage
                  isDarkMode={isDarkMode}
                  onOpenQuoteModal={handleOpenQuote}
                  onOpenDocModal={handleOpenDoc}
                  onOpenEngineerModal={() => setIsAskEngineerModalOpen(true)}
                />
              }
            />
            <Route
              path="/product/:productId"
              element={
                <ProductDetailPage
                  isDarkMode={isDarkMode}
                  onOpenQuoteModal={handleOpenQuote}
                  onOpenDocModal={handleOpenDoc}
                  onOpenEngineerModal={() => setIsAskEngineerModalOpen(true)}
                />
              }
            />
            <Route
              path="/category/:categorySlug"
              element={
                <CategoryPage
                  isDarkMode={isDarkMode}
                  onOpenQuoteModal={handleOpenQuote}
                />
              }
            />
            <Route
              path="/products/category/:categorySlug"
              element={
                <CategoryPage
                  isDarkMode={isDarkMode}
                  onOpenQuoteModal={handleOpenQuote}
                />
              }
            />
            <Route
              path="/about"
              element={<AboutPage isDarkMode={isDarkMode} />}
            />
            <Route
              path="/anatomy"
              element={<AnatomyPage isDarkMode={isDarkMode} />}
            />
            <Route
              path="/materials"
              element={<MaterialsPage isDarkMode={isDarkMode} />}
            />
            <Route
              path="/manufacturing"
              element={<ManufacturingPage isDarkMode={isDarkMode} />}
            />
            <Route
              path="/regulatory"
              element={
                <RegulatoryPage
                  isDarkMode={isDarkMode}
                  onOpenQuoteModal={() => handleOpenQuote()}
                />
              }
            />
            <Route
              path="/request-quote"
              element={<RequestQuotePage isDarkMode={isDarkMode} />}
            />
            <Route
              path="/ask-engineer"
              element={<AskEngineerPage isDarkMode={isDarkMode} />}
            />
            <Route
              path="/contact"
              element={<ContactPage isDarkMode={isDarkMode} />}
            />
          </Routes>
        </main>

        {/* Persistent Footer */}
        <Footer />

        {/* Global Quick Action Modals */}
        {isQuoteModalOpen && (
          <QuoteRequestModal
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
            preselectedProduct={quoteProduct}
            isDarkMode={isDarkMode}
          />
        )}

        {isAskEngineerModalOpen && (
          <AskAnEngineerModal
            isOpen={isAskEngineerModalOpen}
            onClose={() => setIsAskEngineerModalOpen(false)}
            isDarkMode={isDarkMode}
          />
        )}

        {docModal.isOpen && (
          <TechnicalDocModal
            isOpen={docModal.isOpen}
            onClose={() => setDocModal({ isOpen: false, title: '', type: '' })}
            title={docModal.title}
            type={docModal.type}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </Router>
  );
}
