import React, { useState } from 'react';
import { MATERIALS_DATA, MATERIAL_COMPARISON_POINTS } from '../data/materials';
import { Layers, ShieldCheck, Scale, Zap, Info, Check, Sparkles } from 'lucide-react';
import { trackScientificModule } from '../utils/analytics';

interface MaterialScienceProps {
  isDarkMode: boolean;
}

export const MaterialScienceComparator: React.FC<MaterialScienceProps> = ({ isDarkMode }) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<'ti-6al-4v' | 'ss-316l'>('ti-6al-4v');

  const titanium = MATERIALS_DATA.find((m) => m.id === 'ti-6al-4v')!;
  const stainless = MATERIALS_DATA.find((m) => m.id === 'ss-316l')!;
  const bone = MATERIALS_DATA.find((m) => m.id === 'cortical-bone')!;

  const activeMaterial = selectedMaterialId === 'ti-6al-4v' ? titanium : stainless;

  return (
    <section id="materials-science" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Materials Science & Metallurgy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-tech">
            Precision Metallurgy: Ti-6Al-4V vs. 316L Stainless Steel
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Every surgical implant begins with metallurgical integrity. Compare the physical, biomechanical, and radiographic properties of Kazon’s medical-grade alloys against natural human cortical bone.
          </p>
        </div>

        {/* Material Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-2xl bg-slate-200 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/80 inline-flex shadow-inner">
            <button
              onClick={() => {
                trackScientificModule('material_science_comparator', 'select_alloy', { alloy: 'ti-6al-4v' });
                setSelectedMaterialId('ti-6al-4v');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 min-h-[44px] ${
                selectedMaterialId === 'ti-6al-4v'
                  ? 'bg-[#085F2C] text-white shadow-md shadow-[#085F2C]/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Ti-6Al-4V ELI (Grade 23 Titanium)</span>
            </button>
            <button
              onClick={() => {
                trackScientificModule('material_science_comparator', 'select_alloy', { alloy: 'ss-316l' });
                setSelectedMaterialId('ss-316l');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 min-h-[44px] ${
                selectedMaterialId === 'ss-316l'
                  ? 'bg-[#085F2C] text-white shadow-md shadow-[#085F2C]/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Medical Stainless Steel 316L (VAR)</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Biomechanical Property Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Active Material Deep Dive Card */}
          <div className="lg:col-span-5">
            <div
              className={`h-full p-6 sm:p-8 rounded-3xl border transition-all ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 shadow-xl'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded text-xs font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20">
                  {activeMaterial.standard}
                </span>
                <span className="text-xs font-mono-code text-slate-400">
                  Grade: {activeMaterial.grade.split('(')[0]}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-tech mb-2 text-slate-900 dark:text-white">
                {activeMaterial.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {activeMaterial.machiningConsiderations}
              </p>

              {/* High-Level Spec Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[11px] font-mono-code uppercase text-slate-400 block mb-1">
                    Density
                  </span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-tech">
                    {activeMaterial.density} <span className="text-xs font-normal text-slate-400">g/cm³</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[11px] font-mono-code uppercase text-slate-400 block mb-1">
                    Elastic Modulus
                  </span>
                  <span className="text-lg font-bold text-[#085F2C] dark:text-emerald-400 font-tech">
                    {activeMaterial.elasticModulus} <span className="text-xs font-normal text-slate-400">GPa</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[11px] font-mono-code uppercase text-slate-400 block mb-1">
                    Tensile Yield
                  </span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-tech">
                    {activeMaterial.yieldStrength} <span className="text-xs font-normal text-slate-400">MPa</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[11px] font-mono-code uppercase text-slate-400 block mb-1">
                    MRI Compatibility
                  </span>
                  <span className="text-sm font-bold text-emerald-500 dark:text-emerald-400 font-tech">
                    {activeMaterial.mriArtifact}
                  </span>
                </div>
              </div>

              {/* Primary Clinical Applications */}
              <div>
                <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-400 mb-2.5 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#085F2C] dark:text-emerald-400" />
                  Primary Surgical Indications
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeMaterial.primaryIndications.map((ind, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-3.5 h-3.5 mr-2 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Comparative Property Visualizers */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 shadow-xl'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <h3 className="text-lg font-bold font-tech mb-6 text-slate-900 dark:text-white flex items-center">
                <Scale className="w-4 h-4 mr-2 text-[#085F2C] dark:text-emerald-400" />
                Biomechanical Benchmark vs. Human Cortical Bone
              </h3>

              {/* Metric 1: Density (Weight) */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Density / Implant Mass</span>
                  <span className="font-mono-code text-slate-400">Lower is lighter (g/cm³)</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center text-xs">
                    <span className="w-24 text-slate-500 shrink-0">Cortical Bone:</span>
                    <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '24%' }} />
                    </div>
                    <span className="ml-3 font-mono-code w-14 text-right text-slate-400">1.90</span>
                  </div>

                  <div className="flex items-center text-xs">
                    <span className="w-24 text-[#085F2C] dark:text-emerald-400 font-semibold shrink-0">Ti-6Al-4V:</span>
                    <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-[#085F2C] dark:bg-emerald-500 rounded-full" style={{ width: '55%' }} />
                    </div>
                    <span className="ml-3 font-mono-code w-14 text-right font-bold text-[#085F2C] dark:text-emerald-400">4.43</span>
                  </div>

                  <div className="flex items-center text-xs">
                    <span className="w-24 text-slate-400 shrink-0">316L Steel:</span>
                    <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: '100%' }} />
                    </div>
                    <span className="ml-3 font-mono-code w-14 text-right text-slate-400">8.00</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                  *Titanium is 45% lighter than stainless steel, reducing foreign body sensation in multi-level spine constructs.
                </p>
              </div>

              {/* Metric 2: Elastic Modulus (Stress Shielding Hazard) */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Elastic Modulus (Stiffness vs Stress Shielding)</span>
                  <span className="font-mono-code text-slate-400">Target ~18 GPa (Bone)</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center text-xs">
                    <span className="w-24 text-slate-500 shrink-0">Cortical Bone:</span>
                    <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '9%' }} />
                    </div>
                    <span className="ml-3 font-mono-code w-14 text-right text-slate-400">18 GPa</span>
                  </div>

                  <div className="flex items-center text-xs">
                    <span className="w-24 text-[#085F2C] dark:text-emerald-400 font-semibold shrink-0">Ti-6Al-4V:</span>
                    <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-[#085F2C] dark:bg-emerald-500 rounded-full" style={{ width: '59%' }} />
                    </div>
                    <span className="ml-3 font-mono-code w-14 text-right font-bold text-[#085F2C] dark:text-emerald-400">114 GPa</span>
                  </div>

                  <div className="flex items-center text-xs">
                    <span className="w-24 text-slate-400 shrink-0">316L Steel:</span>
                    <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-rose-500/80 rounded-full" style={{ width: '100%' }} />
                    </div>
                    <span className="ml-3 font-mono-code w-14 text-right text-slate-400">193 GPa</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                  *Titanium’s modulus is nearly 42% closer to human bone than steel, reducing adjacent bone resorption and stress shielding around fusion implants.
                </p>
              </div>

              {/* Metric 3: Osseointegration & Biocompatibility */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Biocompatibility & Osteoblast Affinity Index</span>
                  <span className="font-mono-code text-slate-400">Validated In Vitro / In Vivo</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                    <span className="font-bold text-[#085F2C] dark:text-emerald-400 block mb-1">
                      Ti-6Al-4V TiO₂ Oxide
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      Spontaneous passive titanium dioxide layer creates direct osteointegration; osteoblasts deposit hydroxyapatite matrix directly on micro-rough surface.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      316L Passivated Cr₂O₃
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Excellent inertness for trauma plates and fracture fixation; encapsulating fibrous sheath allows clean explant removal after bone union.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div
          className={`rounded-3xl border overflow-hidden transition-all ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-800 shadow-xl'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold font-tech text-slate-900 dark:text-white flex items-center">
              <Info className="w-4 h-4 mr-2 text-[#085F2C] dark:text-emerald-400" />
              Comprehensive Metallurgical & Clinical Decision Matrix
            </h3>
            <span className="text-xs font-mono-code text-slate-400">ASTM F136 / ASTM F138 Standards</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/80 font-mono-code text-slate-500 dark:text-slate-400 uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Engineering Category</th>
                  <th className="py-3 px-4 sm:px-6 text-[#085F2C] dark:text-emerald-400">Ti-6Al-4V ELI (Titanium)</th>
                  <th className="py-3 px-4 sm:px-6">Medical Stainless Steel (316L)</th>
                  <th className="py-3 px-4 sm:px-6">Clinical Significance for Surgeons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {MATERIAL_COMPARISON_POINTS.map((point, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                      {point.category}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono-code text-[#085F2C] dark:text-emerald-400 font-medium">
                      {point.tiValue}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono-code">
                      {point.ssValue}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {point.clinicalSignificance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
