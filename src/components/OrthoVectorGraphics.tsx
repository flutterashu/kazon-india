import React from 'react';

/**
 * 1. Hero Area Graphic: Biomechanical Metrology Core
 * An isometric composition featuring exploded titanium polyaxial screw,
 * tulip head, gold set screw, laser CMM measurement plane, and dual glassmorphic HUDs.
 */
export const HeroMetrologyGraphic: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 800 600"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={`select-none ${className}`}
  >
    <defs>
      <linearGradient id="hero-plate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#F1F5F9" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="hero-cyan-implant" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#0284C7" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <linearGradient id="hero-kazon-green" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#085F2C" />
      </linearGradient>
      <linearGradient id="hero-gold-setscrew" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="hero-laser-beam" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
        <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
      <filter id="hero-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="16" />
      </filter>
    </defs>

    {/* Isometric Ground Plane Coordinate Grid */}
    <g opacity="0.45">
      <path d="M400 120 L720 280 L400 440 L80 280 Z" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      <path d="M400 160 L640 280 L400 400 L160 280 Z" stroke="#CBD5E1" strokeWidth="0.75" fill="none" />
      <line x1="400" y1="120" x2="400" y2="440" stroke="#085F2C" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
      <line x1="80" y1="280" x2="720" y2="280" stroke="#94A3B8" strokeWidth="0.75" />
    </g>

    {/* Ambient Volumetric Glow */}
    <circle cx="400" cy="270" r="140" fill="#10B981" opacity="0.1" filter="url(#hero-blur)" />
    <circle cx="480" cy="220" r="100" fill="#0284C7" opacity="0.1" filter="url(#hero-blur)" />

    {/* Metrology Inspection Ring (Zeiss CMM Laser Plane) */}
    <g transform="translate(400, 270)">
      <ellipse cx="0" cy="0" rx="220" ry="110" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
      <ellipse cx="0" cy="0" rx="170" ry="85" stroke="#085F2C" strokeWidth="1" opacity="0.4" fill="none" />
      
      {/* Dynamic Laser Scan Line */}
      <line x1="-190" y1="0" x2="190" y2="0" stroke="url(#hero-laser-beam)" strokeWidth="2.5" />
      <circle cx="120" cy="0" r="3.5" fill="#10B981" />
      <circle cx="-80" cy="0" r="3.5" fill="#10B981" />
    </g>

    {/* Exploded Pedicle Screw & Tulip Isometric Assembly */}
    <g transform="translate(400, 250)">
      {/* Screw Axis Center Line */}
      <line x1="0" y1="-120" x2="0" y2="160" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

      {/* Tapered Thread Profiles */}
      <path
        d="M-14 40 L14 48 L-16 62 L16 70 L-14 84 L14 92 L-12 106 L12 114 L0 145 L-6 122 Z"
        fill="url(#hero-cyan-implant)"
        stroke="#0369A1"
        strokeWidth="1.2"
      />
      
      {/* Self-Tapping Helical Cutting Flutes */}
      <path d="M-3 114 L0 145 L4 118" stroke="#F8FAFC" strokeWidth="1.2" opacity="0.85" />

      {/* Spherical Articulation Ball Head */}
      <ellipse cx="0" cy="22" rx="20" ry="16" fill="url(#hero-cyan-implant)" stroke="#0284C7" strokeWidth="1.5" />
      <ellipse cx="-4" cy="18" rx="8" ry="5" fill="#BAE6FD" opacity="0.7" />

      {/* Polyaxial Tulip Receiver Head (Exploded, Floating Above) */}
      <g transform="translate(0, -60)">
        <path d="M-28 -20 C-28 -4 -22 14 0 20 C-12 14 -16 -4 -16 -20 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
        <path d="M28 -20 C28 -4 22 14 0 20 C12 14 16 -4 16 -20 Z" fill="#0369A1" stroke="#0284C7" strokeWidth="1.5" />
        {/* Rod Channel Cutout */}
        <path d="M-16 -20 L-16 0 C-16 8 -8 14 0 14 C8 14 16 8 16 0 L16 -20" fill="none" stroke="#F8FAFC" strokeWidth="2" />
        {/* Tulip Dimples */}
        <circle cx="-22" cy="-5" r="3.5" fill="#0F172A" opacity="0.7" />
        <circle cx="22" cy="-5" r="3.5" fill="#0F172A" opacity="0.7" />
      </g>

      {/* Gold Anodized Set Screw (Floating at Top of Exploded Stack) */}
      <g transform="translate(0, -110)">
        <ellipse cx="0" cy="0" rx="14" ry="7" fill="url(#hero-gold-setscrew)" stroke="#B45309" strokeWidth="1" />
        <polygon points="0,-4 3,-2 3,2 0,4 -3,2 -3,-2" fill="#78350F" />
        <rect x="-14" y="0" width="28" height="6" rx="2" fill="url(#hero-gold-setscrew)" stroke="#B45309" strokeWidth="0.75" />
        <line x1="-12" y1="3" x2="12" y2="3" stroke="#FEF08A" strokeWidth="1" opacity="0.8" />
      </g>
    </g>

    {/* Floating Glassmorphic Telemetry HUD Card (Left: CNC Metrology) */}
    <g transform="translate(110, 150)">
      <rect x="0" y="0" width="210" height="105" rx="16" fill="url(#hero-plate-grad)" stroke="#CBD5E1" strokeWidth="1.2" />
      <circle cx="20" cy="22" r="4.5" fill="#085F2C" />
      <text x="32" y="26" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#085F2C" letterSpacing="0.5">SWISS CNC PROFILE</text>
      
      <text x="20" y="50" fontFamily="sans-serif" fontSize="11" fill="#64748B">Runout (Concentric):</text>
      <text x="190" y="50" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#0F172A" textAnchor="end">&lt; 0.003 mm</text>
      
      <text x="20" y="70" fontFamily="sans-serif" fontSize="11" fill="#64748B">Tolerance Target:</text>
      <text x="190" y="70" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#085F2C" textAnchor="end">±0.0001"</text>

      <path d="M20 90 Q 55 82, 90 90 T 150 90 T 190 85" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Floating Glassmorphic Telemetry HUD Card (Right: ASTM F136 Material State) */}
    <g transform="translate(490, 290)">
      <rect x="0" y="0" width="220" height="110" rx="16" fill="url(#hero-plate-grad)" stroke="#CBD5E1" strokeWidth="1.2" />
      <circle cx="20" cy="22" r="4.5" fill="#0284C7" />
      <text x="32" y="26" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#0284C7" letterSpacing="0.5">ASTM F136 Ti-6Al-4V ELI</text>
      
      <text x="20" y="50" fontFamily="sans-serif" fontSize="11" fill="#64748B">Interstitial Oxygen:</text>
      <text x="200" y="50" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#0F172A" textAnchor="end">≤ 0.13%</text>

      <text x="20" y="70" fontFamily="sans-serif" fontSize="11" fill="#64748B">Surface Roughness:</text>
      <text x="200" y="70" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#0284C7" textAnchor="end">Ra 0.24 µm</text>

      <text x="20" y="92" fontFamily="sans-serif" fontSize="10" fill="#64748B">ISO 5832-3 Biocompatible</text>
      <path d="M186 90 L190 94 L200 84" fill="none" stroke="#085F2C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Caliper Measurement Callout Lines */}
    <g opacity="0.7" stroke="#475569" strokeWidth="1">
      <line x1="330" y1="210" x2="360" y2="210" />
      <line x1="440" y1="210" x2="470" y2="210" />
      <line x1="360" y1="205" x2="360" y2="215" />
      <line x1="440" y1="205" x2="440" y2="215" />
      <text x="400" y="206" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#334155" textAnchor="middle">Ø 6.0 mm</text>
    </g>
  </svg>
);

/**
 * Feature 01: Sub-Micron Swiss CNC Lathe & Micrometer
 */
export const SwissCncMicroIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 96 96" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" className={className}>
    <rect width="96" height="96" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
    <path d="M22 48 H46" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <rect x="46" y="40" width="22" height="16" rx="3" fill="#0F172A" />
    <line x1="52" y1="43" x2="52" y2="47" stroke="#94A3B8" strokeWidth="1" />
    <line x1="57" y1="43" x2="57" y2="49" stroke="#38BDF8" strokeWidth="1.5" />
    <line x1="62" y1="43" x2="62" y2="47" stroke="#94A3B8" strokeWidth="1" />
    <rect x="68" y="44" width="8" height="8" rx="2" fill="#64748B" />
    <path d="M22 36 V48 C22 66 38 72 48 72 C58 72 70 66 70 54" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <rect x="20" y="44" width="4" height="8" fill="#475569" rx="1" />
    <circle cx="34" cy="48" r="7" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="34" cy="48" r="2.5" fill="#085F2C" />
  </svg>
);

/**
 * Feature 02: Titanium Crystal Lattice & Biocompatibility
 */
export const TitaniumMetallurgyMicroIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 96 96" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" className={className}>
    <rect width="96" height="96" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
    <polygon points="48,22 68,34 68,58 48,70 28,58 28,34" stroke="#CBD5E1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
    <line x1="48" y1="46" x2="48" y2="22" stroke="#085F2C" strokeWidth="1.5" />
    <line x1="48" y1="46" x2="68" y2="34" stroke="#0284C7" strokeWidth="1.5" />
    <line x1="48" y1="46" x2="68" y2="58" stroke="#0284C7" strokeWidth="1.5" />
    <line x1="48" y1="46" x2="48" y2="70" stroke="#085F2C" strokeWidth="1.5" />
    <line x1="48" y1="46" x2="28" y2="58" stroke="#0284C7" strokeWidth="1.5" />
    <line x1="48" y1="46" x2="28" y2="34" stroke="#0284C7" strokeWidth="1.5" />
    <circle cx="48" cy="22" r="4.5" fill="#085F2C" />
    <circle cx="68" cy="34" r="4" fill="#0284C7" />
    <circle cx="68" cy="58" r="4" fill="#0284C7" />
    <circle cx="48" cy="70" r="4.5" fill="#085F2C" />
    <circle cx="28" cy="58" r="4" fill="#0284C7" />
    <circle cx="28" cy="34" r="4" fill="#0284C7" />
    <circle cx="48" cy="46" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
  </svg>
);

/**
 * Feature 03: Autoclaved Perforated Sterilization Cassette
 */
export const SterileCassetteMicroIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 96 96" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" className={className}>
    <rect width="96" height="96" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
    <rect x="20" y="38" width="56" height="32" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
    <g fill="#64748B" opacity="0.6">
      <circle cx="28" cy="48" r="1.5" /><circle cx="36" cy="48" r="1.5" /><circle cx="44" cy="48" r="1.5" /><circle cx="52" cy="48" r="1.5" /><circle cx="60" cy="48" r="1.5" /><circle cx="68" cy="48" r="1.5" />
      <circle cx="32" cy="56" r="1.5" /><circle cx="40" cy="56" r="1.5" /><circle cx="48" cy="56" r="1.5" /><circle cx="56" cy="56" r="1.5" /><circle cx="64" cy="56" r="1.5" />
    </g>
    <path d="M18 36 C18 33 21 30 24 30 H72 C75 30 78 33 78 36 V38 H18 V36 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
    <rect x="15" y="42" width="5" height="10" rx="1.5" fill="#475569" />
    <rect x="76" y="42" width="5" height="10" rx="1.5" fill="#475569" />
    <path d="M38 24 Q42 20 40 16" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M48 25 Q52 19 50 14" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M58 24 Q62 20 60 16" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

/**
 * Feature 04: Polyaxial Spine Pedicle Screw & Tulip Architecture
 */
export const PolyaxialSpineMicroIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 96 96" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" className={className}>
    <rect width="96" height="96" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
    <path d="M38 22 C38 22 36 34 38 42 C40 48 44 50 48 50 C52 50 56 48 58 42 C60 34 58 22 58 22 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
    <rect x="43" y="20" width="10" height="18" rx="3" fill="#F8FAFC" stroke="#0284C7" strokeWidth="1.5" />
    <rect x="44" y="24" width="8" height="4" rx="1" fill="#F59E0B" stroke="#D97706" strokeWidth="0.75" />
    <path d="M44 50 L52 50 L50 78 L48 84 L46 78 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
    <line x1="43" y1="56" x2="53" y2="58" stroke="#38BDF8" strokeWidth="1.5" />
    <line x1="43" y1="63" x2="53" y2="65" stroke="#38BDF8" strokeWidth="1.5" />
    <line x1="44" y1="70" x2="52" y2="72" stroke="#38BDF8" strokeWidth="1.5" />
    <path d="M28 58 A 24 24 0 0 0 68 58" stroke="#10B981" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
    <circle cx="28" cy="58" r="2.5" fill="#085F2C" />
    <circle cx="68" cy="58" r="2.5" fill="#085F2C" />
  </svg>
);

/**
 * Support 01: Metrology Technical Grid & Crosshairs
 */
export const MetrologyGridBackground: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" className={`pointer-events-none ${className}`}>
    <defs>
      <pattern id="metrology-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
        <circle cx="0" cy="0" r="1.5" fill="#94A3B8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#metrology-grid)" opacity="0.75" />
    <g transform="translate(200, 200)" stroke="#085F2C" strokeWidth="0.75" opacity="0.35">
      <circle cx="0" cy="0" r="70" strokeDasharray="3 3" />
      <circle cx="0" cy="0" r="35" />
      <line x1="-90" y1="0" x2="90" y2="0" />
      <line x1="0" y1="-90" x2="0" y2="90" />
    </g>
  </svg>
);

/**
 * Support 02: Porous Osseointegration Cellular Mesh
 */
export const OsseointegrationMeshBackground: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 500 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" className={`pointer-events-none ${className}`}>
    <defs>
      <linearGradient id="mesh-fade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#085F2C" stopOpacity="0.12" />
        <stop offset="60%" stopColor="#0284C7" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,40 Q50,10 100,40 T200,40 T300,40 T400,40 T500,40
         M0,80 Q50,50 100,80 T200,80 T300,80 T400,80 T500,80
         M0,120 Q50,90 100,120 T200,120 T300,120 T400,120 T500,120
         M0,160 Q50,130 100,160 T200,160 T300,160 T400,160 T500,160"
      stroke="url(#mesh-fade)"
      strokeWidth="1.2"
      fill="none"
    />
    <g fill="#085F2C" opacity="0.15">
      <circle cx="100" cy="40" r="2.5" />
      <circle cx="200" cy="80" r="2" />
      <circle cx="300" cy="120" r="2.5" />
      <circle cx="150" cy="140" r="1.8" />
    </g>
  </svg>
);
