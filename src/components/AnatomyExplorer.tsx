import React, { useState } from 'react';
import { OrthopedicProduct } from '../types';
import { ArrowRight, CheckCircle2, Shield, Activity, Sparkles, Box } from 'lucide-react';

interface AnatomyExplorerProps {
  products: OrthopedicProduct[];
  onSelectProduct: (product: OrthopedicProduct) => void;
  isDarkMode: boolean;
}

interface AnatomyRegion {
  id: string;
  name: string;
  code: string;
  category: string;
  svgPath: string;
  viewBoxCoords: { cx: number; cy: number };
  clinicalFocus: string;
  associatedProductId: string;
  pathologies: string[];
  surgicalApproaches: string[];
  biomechanicalGoal: string;
}

const REGIONS: AnatomyRegion[] = [
  {
    id: 'cervical-spine',
    name: 'Cervical Spine (C1 – C7)',
    code: 'SPINE-CERV',
    category: 'Spine Portfolio',
    svgPath: 'M 140,50 L 160,50 L 165,95 L 135,95 Z',
    viewBoxCoords: { cx: 150, cy: 75 },
    clinicalFocus: 'Anterior Cervical Discectomy and Fusion (ACDF), radiculopathy, disc herniation, spinal stenosis',
    associatedProductId: 'trabeculacore-cervical-cage',
    pathologies: [
      'Cervical spondylotic myelopathy',
      'Herniated nucleus pulposus (C3–C7)',
      'Traumatic cervical subluxation'
    ],
    surgicalApproaches: ['Anterior Smith-Robinson ACDF approach', 'Zero-profile cervical plate stabilization'],
    biomechanicalGoal: 'Immediate sagittal alignment restoration & osteoblastic trabecular ingrowth without stress shielding.'
  },
  {
    id: 'thoracolumbar-spine',
    name: 'Thoracolumbar Spine (T1 – L5)',
    code: 'SPINE-TL',
    category: 'Spine Portfolio',
    svgPath: 'M 135,98 L 165,98 L 170,220 L 130,220 Z',
    viewBoxCoords: { cx: 150, cy: 160 },
    clinicalFocus: 'Posterior pedicle screw fixation, spondylolisthesis reduction, scoliosis deformity correction',
    associatedProductId: 'novalock-pedicle-screw',
    pathologies: [
      'Degenerative lumbar instability (Grade I-III)',
      'Burst fractures & post-traumatic instability',
      'Adult spinal deformity & multi-level scoliosis'
    ],
    surgicalApproaches: ['Open midline posterior lumbar approach', 'Minimally Invasive Percutaneous Wiltse approach'],
    biomechanicalGoal: 'High-fatigue load sharing, rigid 3-column stabilization with 60° polyaxial maneuverability.'
  },
  {
    id: 'si-joint',
    name: 'Sacroiliac (SI) Joint & Pelvis',
    code: 'PELVIS-SI',
    category: 'Spine & Pelvic Portfolio',
    svgPath: 'M 125,225 L 175,225 L 195,270 L 105,270 Z',
    viewBoxCoords: { cx: 150, cy: 248 },
    clinicalFocus: 'Minimally invasive SI joint arthrodesis, pelvic ring trauma, sacroiliac joint disruption',
    associatedProductId: 'sacrofuse-si-joint-implant',
    pathologies: [
      'Chronic sacroiliitis refractory to therapy',
      'Post-lumbar fusion adjacent segment SI failure',
      'Post-partum pelvic ring laxity & trauma'
    ],
    surgicalApproaches: ['Lateral transiliac approach across the articular SI space'],
    biomechanicalGoal: 'Direct 250N compression and rotational anti-migration across the ilium and sacrum.'
  },
  {
    id: 'distal-femur',
    name: 'Distal Femur & Knee (AO/OTA 33)',
    code: 'TRAUMA-FEMUR',
    category: 'Trauma Portfolio',
    svgPath: 'M 120,290 L 145,285 L 140,410 L 115,405 Z',
    viewBoxCoords: { cx: 130, cy: 350 },
    clinicalFocus: 'Supracondylar and intra-articular femoral fracture fixation, periprosthetic fractures',
    associatedProductId: 'femurpro-locking-plate',
    pathologies: [
      'AO/OTA 33-A, B, and C comminuted distal femur fractures',
      'Periprosthetic fractures above total knee implants',
      'Femoral osteoporotic nonunion and malunion'
    ],
    surgicalApproaches: ['Lateral subvastus or transvastus approach', 'Minimally Invasive Plate Osteosynthesis (MIPPO)'],
    biomechanicalGoal: 'Multi-planar angular stability preserving periosteal blood supply with anatomical condylar fit.'
  },
  {
    id: 'wrist-radius',
    name: 'Volar Distal Radius & Wrist',
    code: 'EXTREMITY-RADIUS',
    category: 'Extremities Portfolio',
    svgPath: 'M 85,210 L 105,210 L 98,280 L 78,280 Z',
    viewBoxCoords: { cx: 90, cy: 245 },
    clinicalFocus: 'Distal radius fractures respecting the watershed line to protect flexor tendons',
    associatedProductId: 'radiusprecision-volar-plate',
    pathologies: [
      'Colles / Smith intra-articular radius fractures',
      'Dorsal rim & radial styloid shear fractures',
      'Wrist malunions requiring corrective osteotomy'
    ],
    surgicalApproaches: ['Modified Henry approach to the volar distal radius'],
    biomechanicalGoal: 'Rigid subchondral raft support restoring 23° radial inclination and 11° volar tilt.'
  },
  {
    id: 'cancellous-bone',
    name: 'Diaphyseal & Periarticular Fixation',
    code: 'TRAUMA-CANNULA',
    category: 'General Trauma Portfolio',
    svgPath: 'M 160,290 L 185,285 L 180,410 L 155,405 Z',
    viewBoxCoords: { cx: 170, cy: 350 },
    clinicalFocus: 'Femoral neck, tibial plateau, and calcaneal fractures with concentric cannulated guidance',
    associatedProductId: 'cannulafix-bone-screws',
    pathologies: [
      'Garden I–IV femoral neck fractures in young & active patients',
      'Schatzker tibial plateau split-depression fractures',
      'Subtalar & talonavicular arthrodesis'
    ],
    surgicalApproaches: ['Percutaneous guide-wire targeted cannulated screw placement'],
    biomechanicalGoal: 'Controlled interfragmentary lag compression up to 400N without wire binding or runout.'
  }
];

export const AnatomyExplorer: React.FC<AnatomyExplorerProps> = ({
  products,
  onSelectProduct,
  isDarkMode,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('thoracolumbar-spine');

  const selectedRegion = REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];
  const matchedProduct = products.find((p) => p.id === selectedRegion.associatedProductId);

  return (
    <section id="anatomy-explorer" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Clinical Anatomy Navigator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-tech">
            Interactive Skeletal & Spine Anatomy Explorer
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Select an anatomical target to examine pathological indications, surgical approaches, and the corresponding Kazon India precision-machined orthopedic solutions.
          </p>
        </div>

        {/* Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Anatomical Body Vector Map */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              className={`w-full max-w-md p-6 rounded-3xl border transition-all ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 shadow-2xl shadow-emerald-950/20'
                  : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400">Anatomical Target</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white font-tech">
                    {selectedRegion.name}
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono-code bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20">
                  {selectedRegion.code}
                </span>
              </div>

              {/* Interactive SVG Anatomical Silhouette */}
              <div className="relative flex justify-center py-4">
                <svg
                  viewBox="0 0 300 480"
                  className="w-56 h-[380px] drop-shadow-md select-none"
                  style={{ overflow: 'visible' }}
                >
                  {/* Human Figure Silhouette Base */}
                  <g className="fill-slate-200 dark:fill-slate-800 transition-colors">
                    {/* Head */}
                    <circle cx="150" cy="30" r="22" />
                    {/* Neck */}
                    <rect x="142" y="50" width="16" height="15" rx="3" />
                    {/* Torso */}
                    <path d="M 105,75 Q 150,65 195,75 L 185,230 Q 150,235 115,230 Z" />
                    {/* Arms */}
                    <path d="M 102,78 L 75,190 L 72,290 L 88,290 L 92,195 L 108,100 Z" />
                    <path d="M 198,78 L 225,190 L 228,290 L 212,290 L 208,195 L 192,100 Z" />
                    {/* Pelvis */}
                    <path d="M 112,230 L 188,230 L 196,280 L 104,280 Z" />
                    {/* Legs */}
                    <path d="M 110,280 L 105,420 L 128,420 L 140,300 Z" />
                    <path d="M 190,280 L 195,420 L 172,420 L 160,300 Z" />
                  </g>

                  {/* Interactive Anatomical Zones */}
                  {REGIONS.map((region) => {
                    const isSelected = region.id === selectedRegionId;
                    return (
                      <g
                        key={region.id}
                        onClick={() => setSelectedRegionId(region.id)}
                        className="cursor-pointer group"
                      >
                        {/* Hit Area */}
                        <path
                          d={region.svgPath}
                          className={`transition-all duration-300 ${
                            isSelected
                              ? 'fill-[#085F2C]/80 stroke-white stroke-2 drop-shadow-[0_0_12px_rgba(8,95,44,0.8)]'
                              : 'fill-[#085F2C]/20 stroke-emerald-500/40 hover:fill-[#085F2C]/40'
                          }`}
                        />
                        {/* Target Marker Pin */}
                        <circle
                          cx={region.viewBoxCoords.cx}
                          cy={region.viewBoxCoords.cy}
                          r={isSelected ? 6 : 4}
                          className={`transition-all ${
                            isSelected
                              ? 'fill-white stroke-[#085F2C] stroke-2 animate-pulse'
                              : 'fill-emerald-500 opacity-70 group-hover:opacity-100 group-hover:r-5'
                          }`}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                {REGIONS.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    className={`text-left px-2.5 py-2 rounded-lg text-xs font-medium transition-all min-h-[44px] ${
                      selectedRegionId === region.id
                        ? 'bg-[#085F2C] text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="block truncate">{region.name.split('(')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Clinical & Engineering Data Sheet */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 shadow-xl'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              {/* Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#085F2C] dark:text-emerald-400 border border-emerald-500/20">
                  {selectedRegion.category}
                </span>
                <span className="text-xs font-mono-code text-slate-400">
                  Clinical Anatomical ID: {selectedRegion.code}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-tech mb-3 text-slate-900 dark:text-white">
                {selectedRegion.name}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {selectedRegion.clinicalFocus}
              </p>

              {/* Pathologies & Approaches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center">
                    <Activity className="w-3.5 h-3.5 mr-1.5 text-rose-500" />
                    Key Pathologies
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {selectedRegion.pathologies.map((pathology, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pathology}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center">
                    <Shield className="w-3.5 h-3.5 mr-1.5 text-[#085F2C] dark:text-emerald-400" />
                    Surgical Approaches
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {selectedRegion.surgicalApproaches.map((appr, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#085F2C] dark:bg-emerald-400 mr-2 shrink-0 mt-1.5" />
                        <span>{appr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Biomechanical Target */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 mb-6">
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#085F2C] dark:text-emerald-400 font-semibold block mb-1">
                  Biomechanical Fixation Objective
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {selectedRegion.biomechanicalGoal}
                </p>
              </div>

              {/* Matched Kazon Implant Card */}
              {matchedProduct && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white border border-slate-700 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {matchedProduct.material}
                      </span>
                      <span className="text-xs text-slate-400 font-mono-code">
                        {matchedProduct.toleranceStandard}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold font-tech text-white">
                      {matchedProduct.name}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {matchedProduct.tagline}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => onSelectProduct(matchedProduct)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#085F2C] hover:bg-[#064e24] text-white transition-colors shadow-lg shadow-[#085F2C]/25 min-h-[44px]"
                    >
                      <Box className="w-3.5 h-3.5 mr-1.5" />
                      View in 3D & Specs
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
