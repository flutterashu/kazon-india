import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE_URL } from '../utils/seo';
import { trackCTA } from '../utils/analytics';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Gauge, 
  Globe, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';

interface AboutPageProps {
  isDarkMode?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({ isDarkMode = false }) => {
  const canonicalUrl = `${SITE_URL}/about`;

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <Helmet>
        <title>About Kazon India | Precision Orthopedic Implant Manufacturer</title>
        <meta 
          name="description" 
          content="Learn about Kazon India Pvt. Ltd., an elite CDSCO-licensed and ISO 13485:2016 certified manufacturer of orthopedic implants, spine hardware, and surgical instruments based in Tronica City, NCR Delhi." 
        />
        <meta property="og:title" content="About Kazon India - Orthopedic Implant Manufacturing" />
        <meta property="og:description" content="Kazon India engineers medical-grade titanium and stainless steel implants with micron tolerances for hospitals and export distributors in 45+ nations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: EXACTLY ONE <h1> */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Building2 className="w-3.5 h-3.5 mr-1.5" />
            Corporate Profile & Industrial Infrastructure
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-tech tracking-tight text-slate-900 dark:text-white">
            About Kazon India - Precision Orthopedic Manufacturing
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Founded with an unyielding commitment to surgical precision, Kazon India Pvt. Ltd. is a specialized medical device manufacturer delivering high-tolerance titanium and stainless steel implants to orthopedic trauma surgeons and international health ministries.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#085F2C] flex items-center justify-center mb-6">
              <Gauge className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-tech mb-3 text-slate-900 dark:text-white">
              Swiss CNC Micro-Machining
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Equipped with multi-axis Citizen & Star Swiss sliding-head lathes operating in Class 10,000 cleanrooms, capable of sustaining ±0.0001" (2.54µm) dimensional tolerances on complex anatomical contours.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#085F2C] flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-tech mb-3 text-slate-900 dark:text-white">
              Global Regulatory Rigor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Operating under CDSCO Class IIb manufacturing licensure (MDS-5), ISO 13485:2016 quality management systems, and harmonized technical dossiers aligned with European Union CE MDR (EU) 2017/745.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#085F2C] flex items-center justify-center mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-tech mb-3 text-slate-900 dark:text-white">
              45+ Export Corridors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Supplying government healthcare tenders and private surgical distributors across Latin America, Eastern Europe, Middle East, Africa, and Southeast Asia under direct DGFT export registration (IEC: 0516938908).
            </p>
          </div>
        </div>

        {/* Manufacturing Infrastructure Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-mono-code uppercase text-[#085F2C] dark:text-emerald-400 font-semibold tracking-wider">
                Industrial Heritage & Plant
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-tech mt-2 mb-4 text-slate-900 dark:text-white">
                Engineered in Tronica City, NCR Delhi
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Our purpose-built 25,000 sq. ft. orthopedic machining and passivating facility in the Tronica City Industrial Area is built to aerospace and sterile medical device standards.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#085F2C] shrink-0" />
                  <span>100% Raw Material Chemical Testing (ASTM F136 Ti-6Al-4V ELI & ASTM F138 316L)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#085F2C] shrink-0" />
                  <span>Zeiss Coordinate Measuring Machines (CMM) & Mitutoyo Optical Comparators</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#085F2C] shrink-0" />
                  <span>Automated Ultrasonic Cleaning & ASTM A967 Citric/Nitric Passivation Lines</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#085F2C] shrink-0" />
                  <span>ISO Class 7 Cleanroom Double-Blister Sterile Packaging & UDI Laser Marking</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 font-mono-code text-xs space-y-4">
              <div className="text-slate-400 text-[11px] uppercase tracking-wider pb-2 border-b border-slate-200 dark:border-slate-700">
                Corporate Credentials
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Legal Entity:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Kazon India Pvt. Ltd.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Facility Location:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Sector A-2, Tronica City, NCR Delhi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CDSCO License:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Class IIb (MDS-5)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Quality Standard:</span>
                <span className="font-semibold text-slate-900 dark:text-white">ISO 13485:2016 & ISO 9001:2015</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">DGFT IEC:</span>
                <span className="font-semibold text-slate-900 dark:text-white">0516938908</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  onClick={() => trackCTA('contact_engineering_desk', 'about_page')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#085F2C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#064a22] transition-colors flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Contact Engineering Desk</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
