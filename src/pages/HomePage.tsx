import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { AudienceNav } from '../components/AudienceNav';
import { ThreeImplantViewer } from '../components/ThreeImplantViewer';
import { PRODUCTS } from '../data/products';
import { OrthopedicProduct, AudienceRole } from '../types';
import {
  SwissCncMicroIllustration,
  TitaniumMetallurgyMicroIllustration,
  SterileCassetteMicroIllustration,
  PolyaxialSpineMicroIllustration,
  MetrologyGridBackground,
  OsseointegrationMeshBackground
} from '../components/OrthoVectorGraphics';
import {
  Box,
  Cpu,
  Gauge,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  FileCheck,
  Download,
  Flame,
  Award,
} from 'lucide-react';

interface HomePageProps {
  isDarkMode: boolean;
  activeRole: AudienceRole;
  setActiveRole: (role: AudienceRole) => void;
  onOpenQuoteModal: (product?: OrthopedicProduct) => void;
  onOpenEngineerModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  isDarkMode,
  activeRole,
  setActiveRole,
  onOpenQuoteModal,
  onOpenEngineerModal,
}) => {
  const navigate = useNavigate();
  const featuredProduct = PRODUCTS[0]; // NovaLock Pedicle Screw System

  return (
    <div className="bg-white text-slate-900">
      {/* 1. Award-Winning Manufacturer & Global Exporter Hero Viewport */}
      <Hero
        onExploreCatalog={() => navigate('/products')}
        onRequestQuote={() => navigate('/request-quote')}
        onSelectProduct={(product) => {
          navigate('/products');
        }}
        featuredProduct={featuredProduct}
        isDarkMode={false}
      />

      {/* 2. Targeted Stakeholder Navigation (Surgeons, Hospital Procurement, Global Distributors) */}
      <AudienceNav
        activeRole={activeRole}
        onSelectRole={setActiveRole}
        onRequestQuote={() => navigate('/request-quote')}
        onAskEngineer={() => navigate('/ask-engineer')}
        isDarkMode={false}
      />

      {/* 3. Direct Plant Manufacturing Infrastructure & Export Corridors Banner */}
      <section className="py-14 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        {/* Technical Support Pattern Accent */}
        <MetrologyGridBackground className="absolute -right-20 -top-20 w-96 h-96 opacity-30 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#085F2C]/10 text-[#085F2C] text-xs font-mono-code font-bold">
                <span>DIRECT MANUFACTURING INFRASTRUCTURE // NCR DELHI</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono-code">
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold shadow-xs">
                  IEC: 0516938908 (DGFT Exporter)
                </span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold shadow-xs">
                  GST: 07AAFCK9491D1ZA
                </span>
                <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-emerald-800 font-bold shadow-xs">
                  CDSCO CLASS IIb LICENSED
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-tech text-slate-900 tracking-tight">
                  Dostan Surgical Engineering Works
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 max-w-3xl">
                  Located in the heavy engineering zone of <strong>Tronica City Industrial Area, Ghaziabad (NCR Delhi)</strong>, our dedicated facility houses synchronized Swiss CNC sliding head machines, robotic passivation baths, and cleanrooms producing certified orthopedic & spinal implants under the statutory oversight of the <em>Drugs & Cosmetics Act, 1940</em>.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <Link
                  to="/manufacturing"
                  className="px-4 py-2 rounded-xl bg-[#085F2C] hover:bg-[#064e24] text-white text-xs font-bold font-mono-code transition-colors inline-flex items-center shadow-sm"
                >
                  <span>Tour Plant Facilities</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Matching Feature Micro-Illustrations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Feature 01: Swiss CNC */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <SwissCncMicroIllustration className="w-16 h-16" />
                </div>
                <div className="text-[11px] font-mono-code font-bold text-[#085F2C] uppercase tracking-wider mb-1">
                  01 // SWISS TURNING
                </div>
                <div className="text-base font-bold font-tech text-slate-900 mb-2">
                  Sub-Micron Swiss CNC
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Synchronized multi-axis sliding head turning centers holding ±0.0001" (2.54µm) thread tolerances without cumulative drift.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                <span>Concentricity:</span>
                <span className="font-bold text-slate-900">&lt; 0.003 mm</span>
              </div>
            </div>

            {/* Feature 02: Titanium Metallurgy */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <TitaniumMetallurgyMicroIllustration className="w-16 h-16" />
                </div>
                <div className="text-[11px] font-mono-code font-bold text-[#0284C7] uppercase tracking-wider mb-1">
                  02 // METALLURGY
                </div>
                <div className="text-base font-bold font-tech text-slate-900 mb-2">
                  ASTM F136 Ti-6Al-4V ELI
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Optical emission spectrometry verifying interstitial oxygen ≤ 0.13% with 100% heat-lot ingot traceability.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                <span>Modulus:</span>
                <span className="font-bold text-slate-900">110 GPa (Cortical)</span>
              </div>
            </div>

            {/* Feature 03: Sterile Cassette Systems */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <SterileCassetteMicroIllustration className="w-16 h-16" />
                </div>
                <div className="text-[11px] font-mono-code font-bold text-[#085F2C] uppercase tracking-wider mb-1">
                  03 // PACKAGING & KITS
                </div>
                <div className="text-base font-bold font-tech text-slate-900 mb-2">
                  Autoclaved Cassette Trays
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Perforated anodized medical aluminum containers and double Tyvek blister packs maintaining SAL 10⁻⁶ sterility.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                <span>Autoclave Temp:</span>
                <span className="font-bold text-slate-900">134°C / 2.2 Bar</span>
              </div>
            </div>

            {/* Feature 04: Polyaxial Spine Architecture */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <PolyaxialSpineMicroIllustration className="w-16 h-16" />
                </div>
                <div className="text-[11px] font-mono-code font-bold text-emerald-700 uppercase tracking-wider mb-1">
                  04 // ANATOMICAL LOCK
                </div>
                <div className="text-base font-bold font-tech text-slate-900 mb-2">
                  Polyaxial Spine & Trauma
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ±25° spherical polyaxial head articulation and reverse buttress threads with zero tulip splay under 12.8 N·m torque.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                <span>Articulation:</span>
                <span className="font-bold text-slate-900">±25° Universal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Transformation & Pillars Section */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
        {/* Support Vector Mesh Pattern */}
        <OsseointegrationMeshBackground className="absolute top-0 right-0 w-full h-32 opacity-45 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono-code text-[#085F2C] dark:text-emerald-400 uppercase tracking-widest font-bold">
              THE KAZON PRECISION ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-tech tracking-tight">
              Bridging the Gap Between Precision Engineering and Global Affordability
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Medical device procurement has traditionally forced a painful compromise: pay exorbitant multi-tier premiums for Western multinational brands, or risk variable tolerances from non-certified generic machinists. Kazon India Pvt. Ltd. dissolves this dilemma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className={`p-6 rounded-3xl border transition-all ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
              } shadow-sm`}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-tech mb-2">5-Axis Swiss CNC</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                High-speed synchronized dual-spindle machining guaranteeing continuous concentricity and runout under 0.003 mm.
              </p>
              <Link
                to="/manufacturing"
                className="text-xs font-semibold text-[#085F2C] dark:text-emerald-400 hover:text-[#064e24] inline-flex items-center"
              >
                <span>View Machining Specs</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div
              className={`p-6 rounded-3xl border transition-all ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
              } shadow-sm`}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-tech mb-2">ASTM F136 Metallurgy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Certified Ti-6Al-4V ELI (Extra Low Interstitial) bars with 100% heat lot test traceability and 18 GPa cortical modulus tuning.
              </p>
              <Link
                to="/materials"
                className="text-xs font-semibold text-emerald-500 hover:text-emerald-400 inline-flex items-center"
              >
                <span>Compare Materials</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div
              className={`p-6 rounded-3xl border transition-all ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
              } shadow-sm`}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-tech mb-2">Anatomical Matching</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Surgically verified contouring for Cervical C1-C7, Thoracolumbar T1-L5, Sacroiliac, and distal femoral articulations.
              </p>
              <Link
                to="/anatomy"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center"
              >
                <span>Explore Anatomy Map</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div
              className={`p-6 rounded-3xl border transition-all ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
              } shadow-sm`}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-tech mb-2">ISO 13485 & CE MDR</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                ISO Class 7 cleanroom packaging, gamma irradiation (SAL 10⁻⁶), and full GS1 UDI tracking for global regulatory clearance.
              </p>
              <Link
                to="/regulatory"
                className="text-xs font-semibold text-amber-500 hover:text-amber-400 inline-flex items-center"
              >
                <span>Audit & Benchmarks</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Portfolio Quick Grid */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono-code text-[#085F2C] dark:text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                COMPREHENSIVE CLINICAL PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-tech tracking-tight">
                Engineered for Every Anatomical Challenge
              </h2>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-[#085F2C] hover:bg-[#064e24] text-white transition-all shadow-md shadow-[#085F2C]/25 shrink-0"
            >
              <span>View All Products & Dossiers</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40'
                    : 'bg-white border-slate-200 hover:border-emerald-500/40'
                } shadow-sm hover:shadow-md`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20">
                      {product.family}
                    </span>
                    <span className="text-xs font-mono-code text-slate-400">
                      {product.anatomy}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-tech text-slate-900 dark:text-white mb-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {product.tagline}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-code mb-4">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400 block text-[10px]">TOLERANCE</span>
                      <span className="font-semibold text-[#085F2C] dark:text-emerald-400 truncate block">
                        {product.toleranceStandard}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400 block text-[10px]">MATERIAL</span>
                      <span className="font-semibold text-slate-900 dark:text-white truncate block">
                        {product.material.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-2">
                  <Link
                    to="/products"
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-center transition-colors"
                  >
                    Inspect 3D CAD
                  </Link>
                  <Link
                    to="/request-quote"
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors"
                  >
                    RFQ
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct RFQ Call to Action Banner in Brand Forest Green */}
      <section className="py-16 bg-gradient-to-r from-[#085F2C] via-emerald-800 to-[#043819] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            Direct Precision Manufacturing Advantage
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-tech tracking-tight">
            Ready to Upgrade Your Hospital or Distribution Portfolio?
          </h2>

          <p className="text-sm sm:text-base max-w-2xl mx-auto text-emerald-100 leading-relaxed">
            Connect directly with Kazon India Pvt. Ltd.’s engineering and regulatory affairs team. Request a physical evaluation sample kit, certified technical dossier, or submit custom CNC machining specifications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/request-quote"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-white text-[#085F2C] hover:bg-emerald-50 transition-all shadow-xl"
            >
              Request Clinical Sample Kit & Pricing
            </Link>

            <Link
              to="/ask-engineer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-[#043819]/60 hover:bg-[#043819] text-white border border-white/30 transition-all"
            >
              Consult With an Orthopedic Engineer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
