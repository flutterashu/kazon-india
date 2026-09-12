import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Box, 
  FileCheck, 
  ArrowRight, 
  Gauge, 
  Cpu, 
  Globe, 
  Scale, 
  ExternalLink,
  Compass,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { OrthopedicProduct } from '../types';
import { ThreeImplantViewer } from './ThreeImplantViewer';
import { PRODUCTS } from '../data/products';

interface HeroProps {
  onExploreCatalog: () => void;
  onRequestQuote: () => void;
  onSelectProduct: (product: OrthopedicProduct) => void;
  featuredProduct?: OrthopedicProduct;
  isDarkMode?: boolean;
}

interface PlateDatum {
  id: string;
  x: number;
  y: number;
}

const TABS_DATA = {
  trauma: {
    key: 'trauma',
    tabNumber: '01',
    tabLabel: 'TRAUMA',
    dwg: 'KZN-TR-4511',
    desc: 'CORTICAL BONE SCREW Ø 4.5',
    mat: 'Ti-6Al-4V ELI — ASTM F136',
    fin: 'MIRROR · Ra ≤ 0.05 µm',
    rev: 'C',
    cap: 'FIG. 01 — THREAD FORM · 20×',
    modelType: 'cannulated-screw' as const,
    photoUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    tolerance: '±0.0001" (2.54µm)',
    statTitle: 'Self-Tapping Pitch',
    statVal: '1.75 mm',
    product: PRODUCTS.find(p => p.id === 'cannulated-screws') || PRODUCTS[0]
  },
  spine: {
    key: 'spine',
    tabNumber: '02',
    tabLabel: 'SPINE',
    dwg: 'KZN-SP-5520',
    desc: 'POLYAXIAL PEDICLE SCREW Ø 6.5',
    mat: 'Ti-6Al-4V ELI — ASTM F136',
    fin: 'BEAD-BLAST + PASSIVATED',
    rev: 'D',
    cap: 'FIG. 02 — TULIP ASSEMBLY · 8×',
    modelType: 'pedicle-screw' as const,
    photoUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80',
    tolerance: '±0.0001" (2.54µm)',
    statTitle: 'Tulip Articulation',
    statVal: '±25° Polyaxial',
    product: PRODUCTS.find(p => p.threeModelType === 'pedicle-screw') || PRODUCTS[0]
  },
  neuro: {
    key: 'neuro',
    tabNumber: '03',
    tabLabel: 'NEURO',
    dwg: 'KZN-NR-3308',
    desc: 'CRANIAL PERFORATED PLATE',
    mat: 'CP TITANIUM GR.2 — ASTM F67',
    fin: 'Ra ≤ 0.2 µm · EDGES DEBURRED',
    rev: 'B',
    cap: 'FIG. 03 — MESH TOPOLOGY · 12×',
    modelType: 'femur-plate' as const,
    photoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80',
    tolerance: '±0.0002" (5.08µm)',
    statTitle: 'Perforation Pitch',
    statVal: 'Ø 1.2 mm / T 0.6 mm',
    product: PRODUCTS[0]
  }
};

type TabKey = keyof typeof TABS_DATA;

const GLYPHS = '▓▒░<>/\\KZ0147#—';

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onRequestQuote,
  onSelectProduct,
  isDarkMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('spine');
  const [stageMode, setStageMode] = useState<'blueprint' | '3d'>('blueprint');
  const [istTime, setIstTime] = useState<string>('--:--:--');
  const [pins, setPins] = useState<PlateDatum[]>([
    { id: 'REF-01', x: 42, y: 35 },
    { id: 'REF-02', x: 65, y: 78 }
  ]);
  const [reticlePos, setReticlePos] = useState<{ x: number; y: number; on: boolean; mmX: string; mmY: string }>({
    x: 0,
    y: 0,
    on: false,
    mmX: '00.0',
    mmY: '00.0'
  });

  // Scramble text state for title block fields
  const [scrambledDwg, setScrambledDwg] = useState(TABS_DATA[activeTab].dwg);
  const [scrambledDesc, setScrambledDesc] = useState(TABS_DATA[activeTab].desc);
  const [scrambledMat, setScrambledMat] = useState(TABS_DATA[activeTab].mat);
  const [scrambledFin, setScrambledFin] = useState(TABS_DATA[activeTab].fin);

  const stageRef = useRef<HTMLDivElement>(null);
  const currentData = TABS_DATA[activeTab];

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      setIstTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Text Scramble Effect Helper
  const triggerScramble = (targetText: string, setter: (val: string) => void) => {
    let iteration = 0;
    const interval = setInterval(() => {
      const revealCount = Math.floor(iteration * 1.5);
      let output = '';
      for (let i = 0; i < targetText.length; i++) {
        if (i < revealCount) {
          output += targetText[i];
        } else if (targetText[i] === ' ') {
          output += ' ';
        } else {
          output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setter(output);
      iteration++;
      if (revealCount >= targetText.length) {
        clearInterval(interval);
        setter(targetText);
      }
    }, 28);
  };

  // Trigger scramble upon changing active tab
  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    const item = TABS_DATA[key];
    triggerScramble(item.dwg, setScrambledDwg);
    triggerScramble(item.desc, setScrambledDesc);
    triggerScramble(item.mat, setScrambledMat);
    triggerScramble(item.fin, setScrambledFin);
  };

  // Pointer movement over the drafting stage
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mmX = (Math.max(0, Math.min(x, rect.width)) / rect.width * 80).toFixed(1);
    const mmY = (Math.max(0, Math.min(y, rect.height)) / rect.height * 110).toFixed(1);
    setReticlePos({
      x,
      y,
      on: true,
      mmX,
      mmY
    });
  };

  const handlePointerLeave = () => {
    setReticlePos(prev => ({ ...prev, on: false }));
  };

  // Click on stage to drop a Datum Pin
  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPins(prev => {
      const nextNum = prev.length + 1;
      const newPin: PlateDatum = {
        id: `REF-${String(nextNum).padStart(2, '0')}`,
        x: Math.round(xPct),
        y: Math.round(yPct)
      };
      const updated = [...prev, newPin];
      return updated.length > 5 ? updated.slice(1) : updated;
    });
  };

  return (
    <section className="relative bg-[#F4F1EA] text-[#15171C] border-b border-[#15171C]/20 overflow-hidden select-none blueprint-grid">
      
      {/* 1. TOP MICRO-STRIP (Industrial Plant Coordinates & Live Desk) */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 px-4 sm:px-7 py-2.5 border-b border-[#15171C]/20 font-ibm-mono text-[10.5px] uppercase tracking-[0.14em] bg-[#ECE8DC]/90 backdrop-blur-xs">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#085F2C] animate-ping mr-1" />
          <span className="font-bold text-[#15171C]">
            KAZON INDIA — ORTHOPAEDIC &amp; NEUROSURGICAL IMPLANT WORKS
          </span>
          <span className="hidden md:inline text-[#15171C]/30">|</span>
          <span className="hidden md:inline text-[#15171C]/70">
            PLANT: TRONICA CITY (NCR DELHI) 28.7758° N, 77.2625° E
          </span>
        </div>

        <div className="flex items-center space-x-5 text-[#15171C]/80">
          <span className="flex items-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E14B2A] mr-2 animate-pulse" />
            EXPORT DESK: <strong className="ml-1 text-[#085F2C] font-bold">ACTIVE</strong>
          </span>
          <span className="hidden sm:inline text-[#15171C]/30">•</span>
          <span className="flex items-center font-bold">
            <Clock className="w-3 h-3 text-[#085F2C] mr-1.5 inline" />
            IST <span className="ml-1 font-mono text-[#15171C]">{istTime}</span>
          </span>
        </div>
      </div>

      {/* 2. CONTINUOUS EXPORT MARQUEE TICKER */}
      <div className="bg-[#15171C] text-[#ECE8DC] border-b border-[#15171C] py-2.5 overflow-hidden whitespace-nowrap relative select-none">
        <div className="animate-marquee flex items-center text-xs font-ibm-mono uppercase tracking-widest">
          <div className="flex items-center space-x-10 shrink-0">
            <span className="font-bold text-[#7BD9E4]">CORTICAL &amp; CANCELLOUS SCREWS ✚</span>
            <span>LOCKING COMPRESSION PLATES (LCP) ✚</span>
            <span className="font-bold text-[#7BD9E4]">SPINAL PEDICLE FIXATION ✚</span>
            <span>INTERBODY PEEK CAGES ✚</span>
            <span className="font-bold text-[#7BD9E4]">CRANIAL TITANIUM MESH ✚</span>
            <span>INTRAMEDULLARY INTERLOCKING NAILS ✚</span>
            <span className="font-bold text-[#7BD9E4]">HIP &amp; KNEE ARTHROPLASTY ✚</span>
            <span>OEM / ODM PRIVATE CONTRACT PROGRAMMES ✚</span>
          </div>
          <div className="flex items-center space-x-10 shrink-0" aria-hidden="true">
            <span className="font-bold text-[#7BD9E4]">CORTICAL &amp; CANCELLOUS SCREWS ✚</span>
            <span>LOCKING COMPRESSION PLATES (LCP) ✚</span>
            <span className="font-bold text-[#7BD9E4]">SPINAL PEDICLE FIXATION ✚</span>
            <span>INTERBODY PEEK CAGES ✚</span>
            <span className="font-bold text-[#7BD9E4]">CRANIAL TITANIUM MESH ✚</span>
            <span>INTRAMEDULLARY INTERLOCKING NAILS ✚</span>
            <span className="font-bold text-[#7BD9E4]">HIP &amp; KNEE ARTHROPLASTY ✚</span>
            <span>OEM / ODM PRIVATE CONTRACT PROGRAMMES ✚</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN ARCHITECTURAL HERO (Left: Industrial Typography / Right: CAD Drawing Plate) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 relative">
        
        {/* Vertical Millimeter Measurement Edge Ruler */}
        <div className="ruler-edge-bg hidden lg:block absolute left-2 top-0 bottom-0 w-3.5 pointer-events-none opacity-60 border-r border-[#15171C]/20" aria-hidden="true" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:pl-6">
          
          {/* LEFT COLUMN: Editorial Typography Statement & Authority Metrics */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Scrambled Eyebrow */}
            <div className="font-ibm-mono text-[11px] font-bold tracking-[0.22em] text-[#085F2C] uppercase flex items-center">
              <span className="mr-2">✚</span>
              <span>ISO 13485:2016 CDSCO CLASS IIb MANUFACTURER &amp; EXPORTER</span>
            </div>

            {/* Huge Headline in Big Shoulders Display */}
            <h1 className="font-display-condensed font-extrabold uppercase text-[54px] sm:text-[76px] lg:text-[88px] xl:text-[104px] leading-[0.88] tracking-tight text-[#15171C]">
              <span className="block overflow-hidden">
                <span className="inline-block animate-rise">Titanium,</span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block animate-rise ghost-stroke" style={{ animationDelay: '0.12s' }}>
                  Machined For
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block animate-rise" style={{ animationDelay: '0.24s' }}>
                  The <span className="text-[#085F2C]">Human</span> Frame.
                </span>
              </span>
            </h1>

            {/* Authoritative Lede */}
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#15171C]/85 font-normal">
              Kazon India forges, machines, and finishes <strong>orthopaedic &amp; neurosurgical implant systems</strong> under one roof at Dostan Surgical Works — then dispatches them, complete with apostilled CE &amp; CDSCO technical dossiers, to surgical teams in <strong>45+ countries</strong>. Micron tolerances in. Lives out.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRequestQuote}
                className="font-ibm-mono text-xs uppercase tracking-[0.16em] bg-[#15171C] hover:bg-[#085F2C] text-[#ECE8DC] px-6 py-4 border border-[#15171C] inline-flex items-center space-x-3 transition-all duration-200 active:scale-95 shadow-md group"
              >
                <span>Request Export Dossier</span>
                <b className="group-hover:translate-x-1.5 transition-transform duration-200">→</b>
              </button>

              <button
                onClick={onExploreCatalog}
                className="font-ibm-mono text-xs uppercase tracking-[0.14em] text-[#15171C] hover:text-[#085F2C] border-b border-[#15171C] hover:border-[#085F2C] pb-1 inline-flex items-center space-x-2 transition-colors duration-200 group"
              >
                <span>Browse Implant Systems</span>
                <b className="group-hover:translate-x-1 transition-transform duration-200">→</b>
              </button>
            </div>

            {/* Technical Authority Stats Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 pt-6 border-t border-[#15171C]/20">
              <div className="p-3.5 pl-0 border-r border-[#15171C]/15">
                <div className="font-display-condensed font-bold text-4xl sm:text-5xl text-[#15171C] leading-none">
                  45<sup className="text-xl text-[#085F2C] ml-0.5">+</sup>
                </div>
                <div className="font-ibm-mono text-[9.5px] uppercase tracking-[0.18em] text-[#15171C]/60 mt-2">
                  Export Corridors
                </div>
              </div>

              <div className="p-3.5 border-r border-[#15171C]/15">
                <div className="font-display-condensed font-bold text-4xl sm:text-5xl text-[#15171C] leading-none">
                  1,250<sup className="text-xl text-[#085F2C] ml-0.5">+</sup>
                </div>
                <div className="font-ibm-mono text-[9.5px] uppercase tracking-[0.18em] text-[#15171C]/60 mt-2">
                  Active SKUs
                </div>
              </div>

              <div className="p-3.5 border-r border-[#15171C]/15">
                <div className="font-display-condensed font-bold text-4xl sm:text-5xl text-[#15171C] leading-none">
                  11<sup className="text-xl text-[#085F2C] ml-0.5">YRS</sup>
                </div>
                <div className="font-ibm-mono text-[9.5px] uppercase tracking-[0.18em] text-[#15171C]/60 mt-2">
                  Est. 2015 Plant
                </div>
              </div>

              <div className="p-3.5 pr-0">
                <div className="font-display-condensed font-bold text-4xl sm:text-5xl text-[#085F2C] leading-none">
                  99.98<sup className="text-lg text-[#085F2C] ml-0.5">%</sup>
                </div>
                <div className="font-ibm-mono text-[9.5px] uppercase tracking-[0.18em] text-[#15171C]/60 mt-2">
                  CMM Pass Rate
                </div>
              </div>
            </div>

            {/* Facility Trust Banner */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-ibm-mono text-[#15171C]/70">
              <span className="px-2.5 py-1 rounded bg-[#15171C]/5 border border-[#15171C]/15 text-[#15171C]">
                DGFT IEC: <strong>0516938908</strong>
              </span>
              <span className="px-2.5 py-1 rounded bg-[#15171C]/5 border border-[#15171C]/15 text-[#15171C]">
                SWISS CNC: <strong>±0.0001" (2.54µm)</strong>
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold">
                CDSCO CLASS IIb LICENSED
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: The Award-Winning Engineering Drawing Plate */}
          <div className="lg:col-span-6">
            
            {/* Tabbed Division Buttons */}
            <div className="flex items-center space-x-1 relative z-10 -mb-[1px]">
              {(['trauma', 'spine', 'neuro'] as TabKey[]).map((tabKey) => {
                const item = TABS_DATA[tabKey];
                const isActive = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    onClick={() => handleTabChange(tabKey)}
                    className={`font-ibm-mono text-[10.5px] tracking-[0.16em] uppercase px-4 py-2.5 border border-[#15171C] border-b-0 transition-colors ${
                      isActive
                        ? 'bg-[#0C1015] text-[#ECE8DC] font-bold shadow-md'
                        : 'bg-[#E7E3D6] text-[#15171C]/70 hover:text-[#15171C] hover:bg-[#DDD8C9]'
                    }`}
                  >
                    <i className={`not-italic mr-2 ${isActive ? 'text-[#7BD9E4]' : 'text-[#E14B2A]'}`}>
                      {item.tabNumber}
                    </i>
                    {item.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* The Drafting Plate Container */}
            <div className="bg-[#0C1015] text-[#ECE8DC] border border-[#15171C] shadow-[10px_10px_0px_rgba(21,23,28,0.15)] relative overflow-hidden">
              
              {/* Plate Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#ECE8DC]/20 font-ibm-mono text-[10px] tracking-[0.2em] uppercase bg-[#11161D]">
                <div className="flex items-center space-x-2">
                  <span className="text-[#085F2C] font-bold">✚</span>
                  <span className="text-[#ECE8DC] font-bold">
                    KAZON WORKS — IMPLANT METROLOGY STAGE
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Mode Switcher: 2D Blueprint vs 3D Orbit */}
                  <div className="flex items-center bg-[#1E2530] p-0.5 rounded border border-[#ECE8DC]/20">
                    <button
                      onClick={() => setStageMode('blueprint')}
                      className={`px-2 py-0.5 text-[9px] uppercase tracking-wider rounded transition-colors ${
                        stageMode === 'blueprint'
                          ? 'bg-[#7BD9E4] text-[#0C1015] font-bold'
                          : 'text-[#ECE8DC]/60 hover:text-[#ECE8DC]'
                      }`}
                    >
                      Drafting Blueprint
                    </button>
                    <button
                      onClick={() => setStageMode('3d')}
                      className={`px-2 py-0.5 text-[9px] uppercase tracking-wider rounded transition-colors ${
                        stageMode === '3d'
                          ? 'bg-[#7BD9E4] text-[#0C1015] font-bold'
                          : 'text-[#ECE8DC]/60 hover:text-[#ECE8DC]'
                      }`}
                    >
                      3D CAD Orbit
                    </button>
                  </div>

                  <span className="text-[#7BD9E4] flex items-center font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7BD9E4] animate-ping mr-1.5" />
                    QC PASS
                  </span>
                </div>
              </div>

              {/* The Interactive Metrology Stage */}
              <div
                ref={stageRef}
                onClick={handleStageClick}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                className="relative h-[440px] sm:h-[500px] overflow-hidden cursor-crosshair bg-[#0C1015]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(to bottom, rgba(236,232,220,0.12) 0 1px, transparent 1px 10px),
                    repeating-linear-gradient(to right, rgba(236,232,220,0.12) 0 1px, transparent 1px 10px)
                  `,
                  backgroundSize: '10px 100%, 100% 10px',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Rotating Engineering Ring */}
                <div 
                  className="absolute left-1/2 top-1/2 w-[320px] h-[320px] -ml-[160px] -mt-[160px] border border-dashed border-[#ECE8DC]/15 rounded-full pointer-events-none animate-spin"
                  style={{ animationDuration: '46s' }}
                >
                  <div className="absolute left-1/2 -top-1 w-2 h-2 -ml-1 bg-[#7BD9E4] rounded-full shadow-[0_0_8px_#7BD9E4]" />
                </div>

                {/* STAGE CONTENT: EITHER 2D DRAFTING BLUEPRINT OR 3D WEBGL CAD VIEWER */}
                {stageMode === 'blueprint' ? (
                  <div className="absolute inset-0 grid place-items-center p-4">
                    
                    {/* Active Schematic SVG Rendering */}
                    {activeTab === 'trauma' && (
                      <svg viewBox="0 0 340 440" fill="none" className="h-[88%] max-w-[92%]">
                        <g stroke="#ECE8DC" strokeWidth="1.4">
                          <path d="M136 46 L184 46 L178 76 L142 76 Z" />
                          <path d="M150 46 V58 H170 V46" />
                          <path d="M142 76 L147 88 M178 76 L173 88" />
                          <path d="M147 88 V330 M173 88 V330" />
                          <path d="M147 330 L160 372 L173 330" />
                          <g strokeWidth="1.1">
                            <path d="M139 96 L181 105" /><path d="M139 113 L181 122" /><path d="M139 130 L181 139" />
                            <path d="M139 147 L181 156" /><path d="M139 164 L181 173" /><path d="M139 181 L181 190" />
                            <path d="M139 198 L181 207" /><path d="M139 215 L181 224" /><path d="M139 232 L181 241" />
                            <path d="M139 249 L181 258" /><path d="M139 266 L181 275" /><path d="M139 283 L181 292" />
                            <path d="M139 300 L181 309" /><path d="M139 317 L181 326" />
                          </g>
                        </g>
                        <line x1="160" y1="28" x2="160" y2="398" stroke="#7BD9E4" strokeWidth="0.8" strokeDasharray="14 5 3 5" opacity="0.7" />
                        <g stroke="#7BD9E4" strokeWidth="0.8">
                          <path d="M136 46 V34 M184 46 V34 M138 34 H182" />
                          <path d="M184 46 H252 M173 372 H252 M246 48 V370" />
                          <path d="M150 52 L86 44 M139 180 L74 170 M160 372 L212 398" />
                        </g>
                        <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#7BD9E4">
                          <text x="160" y="27" textAnchor="middle">Ø 4.5</text>
                          <text transform="rotate(90 260 209)" x="260" y="209" textAnchor="middle">L 45.0</text>
                          <text x="84" y="40" textAnchor="end">HEX 3.5</text>
                          <text x="72" y="166" textAnchor="end">PITCH 1.75</text>
                          <text x="214" y="412">SELF-TAPPING TIP</text>
                        </g>
                      </svg>
                    )}

                    {activeTab === 'spine' && (
                      <svg viewBox="0 0 340 440" fill="none" className="h-[88%] max-w-[92%]">
                        <g stroke="#ECE8DC" strokeWidth="1.4">
                          <circle cx="160" cy="46" r="20" />
                          <path d="M148 34 L172 58 M148 58 L172 34" strokeWidth="0.9" />
                          <path d="M136 78 V118 Q136 146 160 146 Q184 146 184 118 V78 H172 V116 Q172 132 160 132 Q148 132 148 116 V78 Z" />
                          <path d="M150 88 H170 V100 H150 Z" strokeWidth="1" />
                          <path d="M152 146 V158 M168 146 V158" />
                          <path d="M146 158 V316 M174 158 V316" />
                          <path d="M146 316 L160 356 L174 316" />
                          <g strokeWidth="1.1">
                            <path d="M136 166 L184 176" /><path d="M136 186 L184 196" /><path d="M136 206 L184 216" />
                            <path d="M136 226 L184 236" /><path d="M136 246 L184 256" /><path d="M136 266 L184 276" />
                            <path d="M136 286 L184 296" />
                          </g>
                        </g>
                        <line x1="160" y1="18" x2="160" y2="392" stroke="#7BD9E4" strokeWidth="0.8" strokeDasharray="14 5 3 5" opacity="0.7" />
                        <g stroke="#7BD9E4" strokeWidth="0.8">
                          <path d="M180 46 L246 46 M184 118 H252 M174 356 H252 M246 50 V352" />
                          <path d="M146 250 H174 M146 244 V256 M174 244 V256" />
                          <path d="M136 90 L70 74" />
                        </g>
                        <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#7BD9E4">
                          <text x="252" y="42">ROD Ø 5.5</text>
                          <text x="252" y="114">TULIP</text>
                          <text transform="rotate(90 262 200)" x="262" y="200" textAnchor="middle">L 45.0</text>
                          <text x="160" y="268" textAnchor="middle">Ø 6.5</text>
                          <text x="68" y="70" textAnchor="end">POLYAXIAL ±25°</text>
                        </g>
                      </svg>
                    )}

                    {activeTab === 'neuro' && (
                      <svg viewBox="0 0 340 440" fill="none" className="h-[88%] max-w-[92%]">
                        <g stroke="#ECE8DC" strokeWidth="1.4">
                          <path d="M56 300 A104 118 0 0 1 264 300" />
                          <path d="M40 300 H280" />
                          <circle cx="52" cy="300" r="4" /><circle cx="160" cy="300" r="4" /><circle cx="268" cy="300" r="4" />
                          <g strokeWidth="0.9">
                            <path d="M160 182 V300" />
                            <path d="M160 182 Q118 214 100 300 M160 182 Q202 214 220 300" />
                            <path d="M160 182 Q136 210 128 300 M160 182 Q184 210 192 300" />
                            <path d="M92 262 Q160 224 228 262 M104 230 Q160 198 216 230 M126 204 Q160 182 194 204" />
                          </g>
                          <path d="M292 240 V300 M300 240 V300 M292 240 H300 M292 300 H300" />
                        </g>
                        <g stroke="#7BD9E4" strokeWidth="0.8">
                          <path d="M56 300 V336 M264 300 V336 M58 330 H262" />
                          <path d="M56 182 H34 M56 300 H34 M40 184 V298" />
                          <path d="M210 200 L268 168" />
                        </g>
                        <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#7BD9E4">
                          <text x="160" y="352" textAnchor="middle">W 96.0</text>
                          <text transform="rotate(-90 30 241)" x="30" y="241" textAnchor="middle">H 62.0</text>
                          <text x="270" y="164">PERF. Ø 1.2</text>
                          <text x="306" y="274">T 0.6</text>
                        </g>
                      </svg>
                    )}

                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <ThreeImplantViewer
                      modelType={currentData.modelType}
                      productName={currentData.desc}
                      isDarkMode={true}
                    />
                  </div>
                )}

                {/* Macro Loupe Photo Box */}
                <figure className="absolute top-4 right-4 w-28 sm:w-32 border border-[#ECE8DC]/30 bg-black z-10 shadow-lg pointer-events-none">
                  <div className="overflow-hidden h-20 sm:h-22">
                    <img
                      src={currentData.photoUrl}
                      alt={currentData.cap}
                      className="w-full h-full object-cover opacity-90 animate-kenburns"
                    />
                  </div>
                  <figcaption className="font-ibm-mono text-[8.5px] tracking-wider p-1.5 border-t border-[#ECE8DC]/30 text-[#7BD9E4] uppercase bg-black/90">
                    {currentData.cap}
                  </figcaption>
                </figure>

                {/* Angled QC Inspection Stamp */}
                <div 
                  className="absolute left-4 bottom-4 z-10 font-ibm-mono text-[9px] tracking-[0.24em] text-[#E14B2A] border-[1.5px] border-[#E14B2A] px-2.5 py-1.5 uppercase font-bold bg-[#0C1015]/80 pointer-events-none"
                  style={{ transform: 'rotate(-5deg)' }}
                >
                  EXPORT GRADE — QC ✓
                </div>

                {/* Interactive Click-to-Drop Datum Pins */}
                {pins.map((pin) => (
                  <div
                    key={pin.id}
                    className="absolute z-20 pointer-events-none"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  >
                    <div className="w-2.5 h-2.5 border border-[#E14B2A] rotate-45 -ml-1.5 -mt-1.5 bg-[#0C1015]/60 relative">
                      <span className="absolute left-3.5 -top-2 font-ibm-mono text-[8.5px] text-[#E14B2A] whitespace-nowrap tracking-wider font-bold">
                        {pin.id}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Interactive CMM Reticle Crosshair Following Pointer */}
                {reticlePos.on && (
                  <div className="pointer-events-none z-30 absolute inset-0">
                    {/* Vertical Hairline */}
                    <div
                      className="absolute top-0 bottom-0 w-[1px] bg-[#7BD9E4]/40"
                      style={{ left: `${reticlePos.x}px` }}
                    />
                    {/* Horizontal Hairline */}
                    <div
                      className="absolute left-0 right-0 h-[1px] bg-[#7BD9E4]/40"
                      style={{ top: `${reticlePos.y}px` }}
                    />
                    {/* Central Target Ring */}
                    <div
                      className="absolute w-7 h-7 border border-[#7BD9E4] rounded-full -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${reticlePos.x}px`, top: `${reticlePos.y}px` }}
                    />
                    {/* Real-Time Millimeter Coordinate Badge */}
                    <div
                      className="absolute font-ibm-mono text-[9px] tracking-wider text-[#7BD9E4] bg-[#0C1015]/90 border border-[#7BD9E4]/40 px-2 py-0.5 whitespace-nowrap shadow-sm"
                      style={{ left: `${reticlePos.x + 14}px`, top: `${reticlePos.y + 14}px` }}
                    >
                      X {reticlePos.mmX} / Y {reticlePos.mmY} mm
                    </div>
                  </div>
                )}

              </div>

              {/* Real ASME / ISO 128 Engineering Title Block */}
              <div className="grid grid-cols-2 sm:grid-cols-5 border-t border-[#ECE8DC]/20 bg-[#11161D]">
                
                <div className="p-3 sm:p-3.5 border-r border-b sm:border-b-0 border-[#ECE8DC]/20">
                  <div className="font-ibm-mono text-[8.5px] uppercase tracking-[0.22em] text-[#ECE8DC]/50">
                    DWG No.
                  </div>
                  <div className="font-ibm-mono text-xs font-bold text-[#ECE8DC] mt-1 truncate">
                    {scrambledDwg}
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 border-r border-b sm:border-b-0 border-[#ECE8DC]/20 sm:col-span-1">
                  <div className="font-ibm-mono text-[8.5px] uppercase tracking-[0.22em] text-[#ECE8DC]/50">
                    Description
                  </div>
                  <div className="font-ibm-mono text-xs font-bold text-[#ECE8DC] mt-1 truncate">
                    {scrambledDesc}
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 border-r border-[#ECE8DC]/20">
                  <div className="font-ibm-mono text-[8.5px] uppercase tracking-[0.22em] text-[#ECE8DC]/50">
                    Material
                  </div>
                  <div className="font-ibm-mono text-xs font-bold text-[#7BD9E4] mt-1 truncate">
                    {scrambledMat}
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 border-r border-[#ECE8DC]/20">
                  <div className="font-ibm-mono text-[8.5px] uppercase tracking-[0.22em] text-[#ECE8DC]/50">
                    Finish / Tolerance
                  </div>
                  <div className="font-ibm-mono text-xs font-bold text-[#ECE8DC] mt-1 truncate">
                    {scrambledFin}
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 flex sm:flex-col items-center justify-between sm:justify-center">
                  <div className="font-ibm-mono text-[8.5px] uppercase tracking-[0.22em] text-[#ECE8DC]/50">
                    Rev.
                  </div>
                  <div className="font-ibm-mono text-sm font-bold text-[#E14B2A] sm:mt-1">
                    {currentData.rev}
                  </div>
                </div>

              </div>

            </div>

            {/* Quick Inspection Direct Dossier Link */}
            <div className="mt-3 flex items-center justify-between font-ibm-mono text-xs text-[#15171C]/70">
              <span className="flex items-center">
                <Compass className="w-3.5 h-3.5 text-[#085F2C] mr-1.5" />
                Click stage to drop inspection datum reference pins
              </span>
              <button
                onClick={() => onSelectProduct(currentData.product)}
                className="font-bold text-[#085F2C] hover:underline flex items-center"
              >
                <span>Full Tech Dossier</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 4. CERTIFICATIONS STRIP */}
      <div className="border-t border-[#15171C]/20 border-b border-[#15171C]/20 py-3.5 px-4 sm:px-7 bg-[#ECE8DC]/70">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-y-3 font-ibm-mono text-[10px] tracking-[0.18em] uppercase text-[#15171C]/80">
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#085F2C]" />
            <span>ISO 13485:2016 — QMS Certified</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#085F2C]" />
            <span>CDSCO Class IIb — Drugs &amp; Cosmetics Act 1940</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#085F2C]" />
            <span>CE Mark MDR (EU) 2017/745 Technical Dossiers</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#085F2C]" />
            <span>DGFT IEC: 0516938908 — 100% Export Oriented Unit</span>
          </span>
        </div>
      </div>

    </section>
  );
};
