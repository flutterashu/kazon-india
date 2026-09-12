import React from 'react';
import { AudienceRole } from '../types';
import { Stethoscope, Building2, Globe2, Cpu, ArrowRight } from 'lucide-react';

interface AudienceNavProps {
  activeRole: AudienceRole;
  onSelectRole: (role: AudienceRole) => void;
  onRequestQuote: () => void;
  onAskEngineer: () => void;
  isDarkMode: boolean;
}

export const AudienceNav: React.FC<AudienceNavProps> = ({
  activeRole,
  onSelectRole,
  onRequestQuote,
  onAskEngineer,
  isDarkMode,
}) => {
  const roles: {
    id: AudienceRole;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    bannerMsg: string;
    actionLabel: string;
    onAction: () => void;
  }[] = [
    {
      id: 'surgeons',
      label: 'Orthopedic Surgeons',
      sublabel: 'IFUs, Surgical Technique Guides & Biomechanics',
      icon: <Stethoscope className="w-4 h-4" />,
      bannerMsg: 'Explore surgical technique manuals, anatomical compatibility matrices, and 3D implant CAD models.',
      actionLabel: 'Request Surgical Evaluation Kit',
      onAction: onRequestQuote,
    },
    {
      id: 'procurement',
      label: 'Hospital Procurement',
      sublabel: 'ISO 13485, CE MDR, Tiered Pricing & Supply Chain',
      icon: <Building2 className="w-4 h-4" />,
      bannerMsg: 'Direct precision manufacturer pricing (35-50% savings vs US/EU brands) with complete regulatory dossiers.',
      actionLabel: 'Request Bulk Hospital RFQ',
      onAction: onRequestQuote,
    },
    {
      id: 'distributors',
      label: 'Global Distributors',
      sublabel: 'Territory Partnerships & OEM/ODM Manufacturing',
      icon: <Globe2 className="w-4 h-4" />,
      bannerMsg: 'Partner with Kazon for exclusive regional distribution or private-label precision contract machining.',
      actionLabel: 'Apply for Distribution Rights',
      onAction: onRequestQuote,
    },
    {
      id: 'engineers',
      label: 'Biomedical & R&D Engineers',
      sublabel: '5-Axis Swiss CNC Tolerances & Custom Implants',
      icon: <Cpu className="w-4 h-4" />,
      bannerMsg: 'Tolerances down to ±0.0001" (2.54 µm). Collaborate directly with our medical machining engineering staff.',
      actionLabel: 'Ask an Orthopedic Engineer',
      onAction: onAskEngineer,
    },
  ];

  const currentRoleObj = roles.find((r) => r.id === activeRole) || roles[0];

  return (
    <div className="w-full border-y border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-16 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Persona selector tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-[11px] font-mono-code uppercase text-slate-400 mr-2 shrink-0 hidden lg:inline-block">
              Pathway:
            </span>
            {roles.map((r) => {
              const isActive = r.id === activeRole;
              return (
                <button
                  key={r.id}
                  onClick={() => onSelectRole(r.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className={isActive ? 'text-[#085F2C] dark:text-emerald-400' : 'text-slate-400'}>
                    {r.icon}
                  </span>
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Tailored Message and Action */}
          <div className="flex items-center justify-between md:justify-end space-x-4 w-full md:w-auto text-xs">
            <span className="text-slate-500 dark:text-slate-400 truncate max-w-sm hidden xl:inline-block">
              {currentRoleObj.bannerMsg}
            </span>
            <button
              onClick={currentRoleObj.onAction}
              className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors shadow-sm shrink-0"
            >
              <span>{currentRoleObj.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
