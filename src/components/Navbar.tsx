import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Cpu, 
  FileCheck, 
  ShieldCheck, 
  Box, 
  Crosshair, 
  Layers, 
  Phone, 
  ChevronRight,
  Activity,
  Gauge,
  PhoneCall,
  Globe
} from 'lucide-react';
import { KazonLogo } from './KazonLogo';

const EXPORT_CORRIDORS = [
  { country: 'TURKEY', port: 'Istanbul (IST) Air Cargo', compliance: 'CE MDR Registered' },
  { country: 'VIETNAM', port: 'Hanoi & HCMC Clinical Hubs', compliance: 'MOH Cleared' },
  { country: 'COLOMBIA', port: 'Bogotá & Medellín Trauma Centres', compliance: 'INVIMA Certified' },
  { country: 'KENYA', port: 'Nairobi East Africa Logistics', compliance: 'PPB Cleared' },
  { country: 'SAUDI ARABIA', port: 'Riyadh & Jeddah Consignments', compliance: 'SFDA Medical Device' },
  { country: 'MEXICO', port: 'CDMX & Guadalajara Hubs', compliance: 'COFEPRIS Expedited' },
  { country: 'EGYPT', port: 'Cairo Arthroplasty & Spine Supply', compliance: 'EDA Registered' },
  { country: 'SOUTH AFRICA', port: 'Johannesburg Level-1 Trauma', compliance: 'SAHPRA Class IIb' },
  { country: 'UNITED ARAB EMIRATES', port: 'Dubai Logistics City (DWC)', compliance: 'MoHAP Cleared' },
  { country: 'BRAZIL', port: 'São Paulo Specialized Hubs', compliance: 'ANVISA Technical' },
  { country: 'INDONESIA', port: 'Jakarta Orthopedic Supply', compliance: 'Kemenkes Approved' },
  { country: 'PHILIPPINES', port: 'Manila Spine & Trauma Hospitals', compliance: 'FDA CDRRHR' },
  { country: 'POLAND & CZECH REP', port: 'Central Europe Direct Freight', compliance: 'CE MDR 2017/745' },
  { country: 'MALAYSIA', port: 'Kuala Lumpur Ortho Facilities', compliance: 'MDA Registered' },
  { country: 'PERU', port: 'Lima Arthrodesis Networks', compliance: 'DIGEMID Authorized' },
];

interface NavbarProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onRequestQuote: () => void;
  onAskEngineer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode = false,
  onRequestQuote,
  onAskEngineer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { 
      label: 'Home', 
      path: '/',
      badge: null
    },
    { 
      label: 'Implants & 3D CAD', 
      path: '/products',
      icon: Box,
      badge: '3D CAD'
    },
    { 
      label: 'Anatomy Map', 
      path: '/anatomy',
      icon: Crosshair,
      badge: null
    },
    { 
      label: 'Metallurgy', 
      path: '/materials',
      icon: Layers,
      badge: 'Ti-6Al-4V'
    },
    { 
      label: 'Swiss CNC', 
      path: '/manufacturing',
      icon: Gauge,
      badge: '±0.0001"'
    },
    { 
      label: 'Quality & Trust', 
      path: '/regulatory',
      icon: ShieldCheck,
      badge: 'ISO 13485'
    },
    { 
      label: 'About', 
      path: '/about',
      badge: null
    },
    { 
      label: 'Contact', 
      path: '/contact',
      icon: Phone,
      badge: null
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      {/* 0. CONTINUOUS GLOBAL EXPORT CORRIDORS TICKER (Positioned on the Very Top of Nav Bar) */}
      <div className="w-full bg-[#0C1015] text-[#ECE8DC] border-b border-[#15171C] text-[11px] font-mono-code select-none relative overflow-hidden flex items-center h-8">
        {/* Left Fixed Authority Pill */}
        <div className="bg-[#15171C] text-emerald-400 font-bold px-3 py-1 flex items-center space-x-2 shrink-0 z-20 border-r border-[#ECE8DC]/15 shadow-sm h-full">
          <Globe className="w-3.5 h-3.5 text-[#7BD9E4] animate-pulse" />
          <span className="tracking-wider uppercase text-[10px] text-white">
            GLOBAL EXPORT
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono-code text-[9px] border border-emerald-500/30">
            45+ NATIONS
          </span>
        </div>

        {/* Gradient Left Fade Mask */}
        <div className="pointer-events-none absolute left-48 sm:left-56 top-0 bottom-0 w-10 bg-gradient-to-r from-[#0C1015] to-transparent z-10 hidden sm:block" />

        {/* Continuous Seamless Infinite Marquee Track */}
        <div className="overflow-hidden whitespace-nowrap flex-1 relative flex items-center">
          <div className="animate-marquee flex items-center text-[10.5px] uppercase tracking-wider py-1 hover:cursor-pointer">
            {/* Iteration 1 */}
            <div className="flex items-center space-x-8 shrink-0 pr-8">
              {EXPORT_CORRIDORS.map((c, idx) => (
                <span key={`corridor-1-${idx}`} className="inline-flex items-center space-x-2">
                  <span className="font-bold text-[#7BD9E4]">● {c.country}:</span>
                  <span className="text-[#ECE8DC]/90">{c.port}</span>
                  <span className="text-emerald-400 font-semibold text-[9.5px] bg-emerald-950/60 px-1 rounded border border-emerald-800/40">
                    [{c.compliance}]
                  </span>
                  <span className="text-[#ECE8DC]/20 ml-2">|</span>
                </span>
              ))}
            </div>

            {/* Iteration 2 (Seamless loop duplicate) */}
            <div className="flex items-center space-x-8 shrink-0 pr-8" aria-hidden="true">
              {EXPORT_CORRIDORS.map((c, idx) => (
                <span key={`corridor-2-${idx}`} className="inline-flex items-center space-x-2">
                  <span className="font-bold text-[#7BD9E4]">● {c.country}:</span>
                  <span className="text-[#ECE8DC]/90">{c.port}</span>
                  <span className="text-emerald-400 font-semibold text-[9.5px] bg-emerald-950/60 px-1 rounded border border-emerald-800/40">
                    [{c.compliance}]
                  </span>
                  <span className="text-[#ECE8DC]/20 ml-2">|</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient Right Fade Mask */}
        <div className="pointer-events-none absolute right-32 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0C1015] to-transparent z-10 hidden md:block" />

        {/* Right Fixed Direct Action Pill */}
        <button
          onClick={onRequestQuote}
          className="bg-[#11161D] hover:bg-[#085F2C] text-[#ECE8DC] font-bold px-3 py-1 flex items-center space-x-1.5 shrink-0 z-20 border-l border-[#ECE8DC]/15 transition-colors text-[10px] uppercase tracking-wider h-full group"
          title="Click to dispatch instant export CIF / FOB quotation"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
          <span className="hidden sm:inline">EXPORT DESK:</span>
          <span className="text-emerald-300 group-hover:text-white">DISPATCH</span>
          <span className="group-hover:translate-x-0.5 transition-transform duration-150">→</span>
        </button>
      </div>

      {/* Precision Orthopedic Sterile Metrology Top Strip */}
      <div className="w-full bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] font-mono-code transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          {/* Regulatory & Metrology Credential */}
          <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 overflow-hidden">
            <span className="flex items-center space-x-1.5 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#085F2C] dark:bg-emerald-400"></span>
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                CDSCO LICENSED
              </span>
              <span className="text-slate-400 dark:text-slate-600">|</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                ISO 13485:2016
              </span>
            </span>

            <span className="hidden md:inline-flex items-center space-x-2 text-slate-500 dark:text-slate-400 truncate">
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>CLASS IIb ORTHOPEDIC & SPINE IMPLANTS</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                TOLERANCE ±0.0001" (2.54µm)
              </span>
            </span>
          </div>

          {/* Direct Surgical Hotline & Plant Dispatch */}
          <div className="flex items-center space-x-3 shrink-0 text-slate-600 dark:text-slate-400">
            <span className="hidden lg:inline text-slate-400 dark:text-slate-500">
              Direct Plant Dispatch:
            </span>
            <a
              href="tel:+917827237179"
              className="flex items-center space-x-1 text-[#085F2C] dark:text-emerald-400 font-bold hover:underline"
              title="Direct OT Surgical Emergency Helpline"
            >
              <Phone className="w-3 h-3" />
              <span>+91-7827237179</span>
            </a>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">
              Delhi HQ
            </span>
          </div>
        </div>
      </div>

      {/* Main Tactical Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-17 sm:h-18">
          
          {/* Authentic Kazon Brand Identity with Orthopedic Badge */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/" 
              className="flex items-center group py-1" 
              title="Kazon India Pvt. Ltd. - Orthopedic & Spine Surgical Implants"
            >
              <KazonLogo
                variant="inline"
                isDarkMode={isDarkMode}
                className="h-9 sm:h-10.5 transition-transform group-hover:scale-[1.01]"
              />
            </Link>

            {/* Orthopedic Micro Specification Pill (Visible on md+) */}
            <div className="hidden lg:flex flex-col border-l border-slate-200 dark:border-slate-800 pl-3">
              <span className="text-[10px] font-mono-code font-bold tracking-wider uppercase text-[#085F2C] dark:text-emerald-400">
                Precision Trauma Hardware
              </span>
              <span className="text-[9px] font-mono-code text-slate-400 dark:text-slate-500">
                Ti-6Al-4V ELI & 316L SS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Visible on 2xl / xl) */}
          <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const IconComponent = link.icon;
              return (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive: active }) =>
                    `group relative px-2.5 py-2 rounded-lg transition-all flex items-center space-x-1.5 ${
                      active
                        ? 'text-[#085F2C] dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 font-bold'
                        : 'hover:text-[#085F2C] dark:hover:text-emerald-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {IconComponent && (
                    <IconComponent className={`w-3.5 h-3.5 transition-colors ${
                      isActive ? 'text-[#085F2C] dark:text-emerald-400' : 'text-slate-400 group-hover:text-[#085F2C] dark:group-hover:text-emerald-400'
                    }`} />
                  )}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono-code ${
                      isActive 
                        ? 'bg-[#085F2C] text-white dark:bg-emerald-500 dark:text-slate-950' 
                        : 'bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-100 dark:group-hover:bg-slate-700'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#085F2C] dark:bg-emerald-400 rounded-full" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Cluster: Direct Dispatch Hotline, Ask Engineer, and Hospital RFQ */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            
            {/* Direct Factory Dispatch & Export Hotline */}
            <a
              href="tel:+917827237179"
              title="Direct Plant Export Hotline (+91-7827237179)"
              className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-300 transition-all text-xs text-slate-700 min-h-[42px] shadow-sm group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#085F2C]"></span>
              </span>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono-code">Plant Dispatch</span>
                <span className="text-[11px] font-bold text-slate-900 group-hover:text-[#085F2C] font-mono-code">+91-7827237179</span>
              </div>
            </a>

            {/* Ask an Orthopedic Engineer (Hidden on phone, visible on tablet & desktop) */}
            <Link
              to="/ask-engineer"
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#085F2C] border border-slate-200 bg-white hover:border-emerald-200 transition-colors min-h-[42px] shadow-sm"
            >
              <Cpu className="w-3.5 h-3.5 text-[#085F2C]" />
              <span className="hidden lg:inline">Ask Engineer</span>
              <span className="lg:hidden">Engineer</span>
            </Link>

            {/* Primary RFQ Action in Kazon Surgical Green */}
            <Link
              to="/request-quote"
              className="px-3.5 sm:px-4 py-2 rounded-lg text-xs font-bold bg-[#085F2C] hover:bg-[#064e24] text-white transition-all shadow-md shadow-[#085F2C]/25 flex items-center space-x-1.5 min-h-[42px] shrink-0 active:scale-95"
            >
              <FileCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Request Hospital RFQ</span>
              <span className="sm:hidden">RFQ</span>
            </Link>

            {/* Mobile & Tablet Drawer Trigger (Visible below xl) */}
            <button
              id="ortho-mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 min-h-[42px] min-w-[42px] flex items-center justify-center transition-colors active:scale-95"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Surgical Navigation Menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-900 dark:text-white" />
              ) : (
                <div className="flex items-center space-x-1">
                  <Menu className="w-5 h-5" />
                  <span className="hidden sm:inline text-[10px] font-mono-code font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Menu
                  </span>
                </div>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Tactile Orthopedic Mobile & Tablet Tray Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
          
          {/* Sterile Directory Subtitle */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] font-mono-code">
            <span className="text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
              <Activity className="w-3 h-3 text-[#085F2C] dark:text-emerald-400" />
              <span>Surgical Trauma Directory</span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              ISO 13485:2016
            </span>
          </div>

          {/* Navigation Links with Ortho Touch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const IconComponent = link.icon || Activity;
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-[#085F2C]/10 text-[#085F2C] dark:text-emerald-400 font-bold border border-[#085F2C]/30'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <IconComponent className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#085F2C] dark:text-emerald-400' : 'text-slate-400'
                    }`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge ? (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-mono-code bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Quick Technical Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
            <Link
              to="/ask-engineer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white flex items-center justify-center space-x-2 min-h-[44px] border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Cpu className="w-4 h-4 text-[#085F2C] dark:text-emerald-400" />
              <span>Ask Orthopedic Engineer</span>
            </Link>

            <Link
              to="/request-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 px-3 rounded-lg text-xs font-bold bg-[#085F2C] hover:bg-[#064e24] text-white flex items-center justify-center space-x-2 shadow-md shadow-[#085F2C]/25 min-h-[44px] transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              <span>Request Hospital RFQ</span>
            </Link>
          </div>

          {/* Direct Emergency Contact in Tray */}
          <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                OT Dispatch / Rahis Khan (Director)
              </div>
              <div className="text-slate-500 text-[11px] font-mono-code">
                Rohini Sector-11, Delhi • Tronica City Plant
              </div>
            </div>
            <a
              href="tel:+917827237179"
              className="px-3 py-1.5 rounded bg-[#085F2C] text-white font-mono-code text-[11px] font-bold shrink-0 hover:bg-[#064e24]"
            >
              Call Hotline
            </a>
          </div>

        </div>
      )}
    </header>
  );
};

