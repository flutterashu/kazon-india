import { ManufacturingStep } from '../types';

export const MANUFACTURING_STEPS: ManufacturingStep[] = [
  {
    stepNumber: 1,
    title: 'Certified Medical Alloy Sourcing',
    subtitle: 'Vacuum Arc Remelted (VAR) Billets with 100% Heat Batch Traceability',
    description: 'Every bar of Ti-6Al-4V ELI (ASTM F136) and 316L (ASTM F138) is procured with certified mill test reports (MTR). Optical emission spectrometry validates zero trace radioactive isotopes or ferrite inclusions before machining begins.',
    keyEquipment: 'Optical Emission Spectrometer & Ultrasonic Ingot Flaw Detectors',
    precisionMetric: 'Chemical purity > 99.95%, grain size ASTM 7 or finer',
    standardsCompliance: 'ASTM F136 / ASTM F138 / ISO 5832-1 & 3',
    qaVerification: 'Chemical composition & mechanical elongation tensile pull test per batch',
    highlightIcon: 'ShieldCheck'
  },
  {
    stepNumber: 2,
    title: '5-Axis Swiss-Type CNC Machining',
    subtitle: 'Simultaneous Multi-Axis Machining for Complex Micro-Geometries',
    description: 'Operating in temperature-controlled clean machining bays, high-speed Swiss-type CNC lathes and 5-axis milling centers turn complex bone screw threads, spherical polyaxial tulips, and anatomical plate contours in a single uninterrupted setup.',
    keyEquipment: 'Swiss CNC Turning Centers (Star & Citizen) with 100-bar Through-Spindle Coolant',
    precisionMetric: 'Dimensional tolerances held to ±0.0001" (2.54 µm); runout < 0.005 mm',
    standardsCompliance: 'ISO 286-2 Grade IT4 / ISO 2768-mH',
    qaVerification: 'In-process digital probe probing and tool wear sensor monitoring every 12 minutes',
    highlightIcon: 'Cpu'
  },
  {
    stepNumber: 3,
    title: 'Robotic Surface Finishing & Micro-Blasting',
    subtitle: 'Dual-Zone Texturing Balancing Osseointegration with Low-Friction Articulation',
    description: 'Using automated robotic blasting cells with medical-grade titanium oxide and bio-inert ceramic media, Kazon engineers controlled micro-roughness on bone-interfacing zones (Ra 1.2–1.8 µm) while mirror-electropolishing tendon-contact areas (Ra < 0.15 µm).',
    keyEquipment: 'Robotic Blasting Cells & Centrifugal High-Energy Isotropic Finishers',
    precisionMetric: 'Surface roughness Ra controlled within ±0.03 µm deviation',
    standardsCompliance: 'ISO 10993-5 / ASTM F86',
    qaVerification: 'White-light interferometer 3D optical profilometry',
    highlightIcon: 'Sparkles'
  },
  {
    stepNumber: 4,
    title: 'Ultrasonic Cleaning & ASTM F86 Passivation',
    subtitle: 'Deep Chemical Passivation Generating Stable Protective Oxide Barriers',
    description: 'Implanted hardware undergoes multi-stage ultrasonic degreasing in deionized water (conductivity < 0.1 µS/cm) followed by acid passivation (ASTM A967 / F86). This forms a chemically inert, corrosion-resistant titanium oxide (TiO₂) or chromium oxide (Cr₂O₃) protective layer.',
    keyEquipment: 'Multi-Tank Ultrasonic Cleaning Station with Continuous Cascade Rinsing',
    precisionMetric: 'Zero residual hydrocarbon residues (<0.1 mg/m² TOC limit)',
    standardsCompliance: 'ASTM A967 / ASTM F86 / ISO 19227',
    qaVerification: 'Copper sulfate immersion test & water break-free surface verification',
    highlightIcon: 'Droplets'
  },
  {
    stepNumber: 5,
    title: 'Metrology & 100% Optical/Laser CMM Inspection',
    subtitle: 'Sub-Micron Coordinate Measurement and Pitch Verification',
    description: 'Every production lot is measured in an ISO/IEC 17025 accredited metrology lab on Zeiss coordinate measuring machines and high-speed multi-sensor optical comparators. Thread leads, taper angles, and wall thicknesses are verified against digital CAD masters.',
    keyEquipment: 'Zeiss Prismo CMM, Keyence Optical Measurement Systems, Non-Contact Laser Scanners',
    precisionMetric: 'Measurement uncertainty under 0.5 µm (0.00002 in)',
    standardsCompliance: 'ISO 10360-2 / ISO 13485:2016 Clause 7.5.8',
    qaVerification: '100% Go/No-Go thread gauging and automated 3D point cloud deviation analysis',
    highlightIcon: 'ScanLine'
  },
  {
    stepNumber: 6,
    title: 'ISO Class 7 Cleanroom Packaging',
    subtitle: 'Controlled Particulate Environment with UDI GS1 Traceability Barcodes',
    description: 'Final assembly, inspection, and sterile packaging occur in an ISO Class 7 (10,000 particles/ft³) cleanroom with positive pressure and continuous particulate monitoring. Implants are sealed in medical-grade Tyvek® and thermoformed PETG trays with tamper-evident indicators.',
    keyEquipment: 'ISO Class 7 Cleanroom, Automated Medical Tray Heat Sealers',
    precisionMetric: 'Particulate air filtration efficiency 99.97% down to 0.3 µm',
    standardsCompliance: 'ISO 14644-1 Class 7 / ISO 11607-1 & 2',
    qaVerification: 'Dye penetration seal integrity test & burst peel strength validation',
    highlightIcon: 'PackageCheck'
  },
  {
    stepNumber: 7,
    title: 'Validated Terminal Sterilization & Release',
    subtitle: 'SAL 10⁻⁶ Sterility Assurance Level with Complete Digital Lot Archival',
    description: 'Products are terminally sterilized using validated Gamma irradiation or Ethylene Oxide (EO) cycles, achieving a Sterility Assurance Level of SAL 10⁻⁶. Every box carries a unique device identifier (UDI) linked to its digital raw material heat batch and inspection log.',
    keyEquipment: 'Gamma Irradiator & EO Vacuum Chambers with Temperature/Humidity Loggers',
    precisionMetric: 'Sterility Assurance Level (SAL) 10⁻⁶ per EN 556-1',
    standardsCompliance: 'ISO 11137 (Radiation) / ISO 11135 (EO) / FDA 21 CFR Part 830 (UDI)',
    qaVerification: 'Biological indicators (Bacillus pumilus / Bacillus atrophaeus) per sterilization cycle',
    highlightIcon: 'CheckCircle2'
  }
];
