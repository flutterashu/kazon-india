import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Mail, Phone, ArrowUp, Award, Building2, FileText, CheckCircle2 } from 'lucide-react';
import { KazonLogo } from './KazonLogo';
import { COMPANY_DATA } from '../data/company';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs transition-colors">
      {/* Top Banner: Official Statutory Badges */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono-code">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-slate-700 dark:text-slate-300">
            <span className="flex items-center text-[#085F2C] dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              Drugs & Cosmetics Act - 1940 Licensed
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span>ISO 9001:2015 Certified</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span>ISO 13485:2016 Registered</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span>CE & FDA Compliant Facility</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
            <span><strong>GST:</strong> {COMPANY_DATA.governmentIds.gst}</span>
            <span><strong>CIN:</strong> {COMPANY_DATA.governmentIds.cin}</span>
            <span><strong>IEC:</strong> {COMPANY_DATA.governmentIds.iec}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Corporate Leadership Overview */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group" title="Kazon India Pvt. Ltd.">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 inline-block shadow-sm">
                <KazonLogo variant="full" className="h-14 sm:h-16 w-auto" />
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>{COMPANY_DATA.legalName}</strong> — {COMPANY_DATA.tagline}. Engaged in Manufacturing, Exporting & Supplying of Orthopedic Implants & Instruments widely used in Orthopedic & Neurosurgery.
            </p>

            {/* Leadership Contact */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono-code text-slate-400 block uppercase">Leadership</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{COMPANY_DATA.director.name}</span>
                  <span className="text-[11px] text-[#085F2C] dark:text-emerald-400 block font-medium">{COMPANY_DATA.director.designation}</span>
                </div>
                <a
                  href={`tel:${COMPANY_DATA.director.phone}`}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 font-mono-code text-[11px] font-semibold border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                >
                  Direct Call
                </a>
              </div>
            </div>

            {/* Quick Contact Points */}
            <div className="space-y-2 text-slate-600 dark:text-slate-300 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight">
                  <strong>Head Office:</strong> {COMPANY_DATA.headOffice.fullAddress}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Building2 className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight">
                  <strong>Manufacturing Unit:</strong> {COMPANY_DATA.manufacturingUnit.entityName}, {COMPANY_DATA.manufacturingUnit.location}, {COMPANY_DATA.manufacturingUnit.city} (VMC, Sliding Head CNC, Wire/Laser cutting)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0" />
                <span>
                  <strong>Email:</strong> <a href="mailto:info@kazonindia.in" className="hover:underline text-[#085F2C] dark:text-emerald-400">info@kazonindia.in</a>
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-[#085F2C] dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="font-mono-code text-[11px] space-y-0.5">
                  <p>+91-7827237179 | +91-9953572633</p>
                  <p>+91-8046052427 | 011-43433787</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Orthopedic Implants */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white font-tech uppercase text-[11px] tracking-wider flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#085F2C] dark:bg-emerald-400 mr-2" />
              Orthopedic Implants
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  LCP Distal Femur & Tibia Plates
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  3.5mm PHILOS Proximal Humerus
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  2.4mm Volar Distal Radius VA Plates
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Dynamic Compression Plates (DCP)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Calcaneal & Fibula Locking Plates
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Clavicle Hook & Pelvic Recon Plates
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  135° LCP DHS & Buttress Plates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Nails, Spine & Fixators */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white font-tech uppercase text-[11px] tracking-wider flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#085F2C] dark:bg-emerald-400 mr-2" />
              Nails, Spine & Fixators
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Proximal Femoral K2 Nail (PFNA / PFNA2)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Expert Tibia & Universal Femur Nails
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Monoaxial & Polyaxial Pedicular Screws
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Titanium Expandable & Cervical Cages
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Tube-to-Tube & Pin Clamps (External Fixators)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Jess Distractor & Ilizarov Ring Fixator
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  FNS (Femoral Neck System) & Cannulated Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional & RFQ Actions */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white font-tech uppercase text-[11px] tracking-wider flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#085F2C] dark:bg-emerald-400 mr-2" />
              Institutional RFQ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/request-quote" className="text-[#085F2C] dark:text-emerald-400 font-semibold hover:underline flex items-center">
                  Request Clinical Sample Kit →
                </Link>
              </li>
              <li>
                <Link to="/ask-engineer" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Consult Biomechanical Engineer
                </Link>
              </li>
              <li>
                <Link to="/regulatory" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Drug License & ISO Certs
                </Link>
              </li>
              <li>
                <Link to="/manufacturing" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Tronica City Plant CNC Lab
                </Link>
              </li>
              <li>
                <Link to="/materials" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Titanium vs 316L Metallurgy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  About Kazon India
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors">
                  Delhi Head Office Contact
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/request-quote"
                className="w-full py-2.5 px-3 rounded-xl text-[11px] font-bold bg-[#085F2C] hover:bg-[#064e24] text-white transition-all shadow-md shadow-[#085F2C]/25 flex items-center justify-center space-x-1.5 min-h-[44px]"
              >
                <span>Request Formal Quote</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Regulatory Labeling & Statutory Notice */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} Kazon India Pvt. Ltd. All rights reserved. <em>"{COMPANY_DATA.motto}"</em>
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Corporate Identification Number (CIN): {COMPANY_DATA.governmentIds.cin} | GSTIN: {COMPANY_DATA.governmentIds.gst} | Import Export Code (IEC): {COMPANY_DATA.governmentIds.iec}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Disclaimer: Kazon medical devices are intended for use exclusively by licensed orthopedic surgeons, spine specialists, and authorized healthcare institutions.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <span className="font-mono-code text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#085F2C] dark:text-emerald-400" />
              Drugs & Cosmetics Act 1940 / ISO 9001:2015
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#085F2C] dark:hover:text-emerald-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
