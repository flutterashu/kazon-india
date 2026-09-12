import React, { useState } from 'react';
import { MANUFACTURING_STEPS } from '../data/manufacturing';
import { ShieldCheck, Cpu, Sparkles, Droplets, ScanLine, PackageCheck, CheckCircle2, ArrowRight, Gauge, Check } from 'lucide-react';

interface ManufacturingLifecycleProps {
  isDarkMode: boolean;
}

export const ManufacturingLifecycle: React.FC<ManufacturingLifecycleProps> = ({ isDarkMode }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(1); // Default to Step 2: 5-Axis CNC

  const activeStep = MANUFACTURING_STEPS[activeStepIndex];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'ScanLine':
        return <ScanLine className="w-5 h-5" />;
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="manufacturing-lifecycle" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Gauge className="w-3.5 h-3.5 mr-1.5" />
            Zero-Defect Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-tech">
            From Raw Medical Billet to Operating Room
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Precision in every micron. Walk through the 7-stage manufacturing and quality assurance lifecycle that transforms certified vacuum-melted alloys into sterile, implantable orthopedic hardware.
          </p>
        </div>

        {/* Step Progression Timeline Pills */}
        <div className="mb-10 overflow-x-auto pb-4 pt-2">
          <div className="flex items-center space-x-2 min-w-max mx-auto justify-center">
            {MANUFACTURING_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-[#085F2C] text-white shadow-lg shadow-[#085F2C]/25 scale-105 ring-2 ring-emerald-400/50'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono-code font-bold ${
                      isActive
                        ? 'bg-white text-[#085F2C]'
                        : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    0{step.stepNumber}
                  </span>
                  <span>{step.title.split(' ')[0]} {step.title.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Showcase Card */}
        <div
          className={`p-6 sm:p-10 rounded-3xl border transition-all ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-800 shadow-2xl shadow-emerald-950/20'
              : 'bg-white border-slate-200 shadow-xl'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  {getIcon(activeStep.highlightIcon)}
                </span>
                <div>
                  <span className="text-xs font-mono-code uppercase tracking-wider text-[#085F2C] dark:text-emerald-400 font-semibold">
                    Stage 0{activeStep.stepNumber} of 07
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-tech text-slate-900 dark:text-white">
                    {activeStep.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 font-tech">
                {activeStep.subtitle}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>

              {/* Technical Specifications Callout Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono-code uppercase text-slate-400 block">
                    Key Manufacturing Equipment
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {activeStep.keyEquipment}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono-code uppercase text-slate-400 block">
                    Precision Tolerance Metric
                  </span>
                  <p className="text-xs font-semibold text-[#085F2C] dark:text-emerald-400 font-mono-code">
                    {activeStep.precisionMetric}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono-code uppercase text-slate-400 block">
                    Regulatory Standard
                  </span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {activeStep.standardsCompliance}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono-code uppercase text-slate-400 block">
                    QA Verification Protocol
                  </span>
                  <p className="text-xs font-semibold text-emerald-500 dark:text-emerald-400">
                    {activeStep.qaVerification}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Interactive Precision Metric Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
                {/* Visual Radial Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#085F2C]/30 rounded-full blur-3xl" />

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="text-xs font-mono-code text-slate-400">IN-LINE METROLOGY</span>
                    <span className="inline-flex items-center text-xs font-mono-code text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                      100% Validated
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex justify-between items-center">
                      <span className="text-xs text-slate-300">CNC Spindle Runout</span>
                      <span className="text-xs font-mono-code text-emerald-400 font-bold">&lt; 0.002 mm</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex justify-between items-center">
                      <span className="text-xs text-slate-300">Surface Roughness Ra</span>
                      <span className="text-xs font-mono-code text-emerald-400 font-bold">0.24 ± 0.02 µm</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex justify-between items-center">
                      <span className="text-xs text-slate-300">Cleanroom Particulate</span>
                      <span className="text-xs font-mono-code text-emerald-400 font-bold">ISO Class 7</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex justify-between items-center">
                      <span className="text-xs text-slate-300">Sterility Assurance</span>
                      <span className="text-xs font-mono-code text-emerald-400 font-bold">SAL 10⁻⁶ (Validated)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : 6))}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      ← Previous Stage
                    </button>
                    <button
                      onClick={() => setActiveStepIndex((prev) => (prev < 6 ? prev + 1 : 0))}
                      className="text-xs text-emerald-400 font-semibold hover:text-emerald-300 flex items-center transition-colors min-h-[44px]"
                    >
                      Next Stage <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
