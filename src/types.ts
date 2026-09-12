export type AudienceRole = 'surgeons' | 'procurement' | 'distributors' | 'engineers';

export type ProductFamily =
  | 'LCP Plates'
  | 'DCP Plates'
  | 'Intramedullary Nails'
  | 'Spine'
  | 'External Fixator'
  | 'Instruments'
  | 'Trauma'
  | 'Extremities';

export type MaterialType =
  | 'Titanium (Ti-6Al-4V ELI)'
  | 'Stainless Steel (316L)'
  | 'Stainless Steel (316L) & Titanium (Ti-6Al-4V)'
  | 'Medical Titanium & Stainless Steel'
  | 'Custom Medical Alloy';

export interface ProductSpec {
  label: string;
  value: string;
  tolerance?: string;
}

export interface OrthopedicProduct {
  id: string;
  name: string;
  tagline: string;
  family: ProductFamily;
  category?: string;
  anatomy:
    | 'Cervical Spine'
    | 'Thoracolumbar Spine'
    | 'SI Joint'
    | 'Femur / Hip'
    | 'Tibia / Knee'
    | 'Humerus / Shoulder'
    | 'Radius / Forearm'
    | 'Clavicle / Pelvis'
    | 'Foot & Ankle'
    | 'Upper Extremity'
    | 'Lower Extremity'
    | 'General Orthopedic';
  material: MaterialType;
  surfaceFinish: string;
  toleranceStandard: string;
  fdaCeStatus: string;
  description: string;
  indications: string[];
  keyFeatures: string[];
  specifications: ProductSpec[];
  clinicalBenefits: string[];
  threeModelType:
    | 'pedicle-screw'
    | 'cervical-cage'
    | 'femur-plate'
    | 'si-implant'
    | 'cannulated-screw'
    | 'tibia-plate'
    | 'radius-plate'
    | 'nail'
    | 'fixator';
  availableSizes: string;
  packaging: string;
  downloads: {
    title: string;
    type: 'IFU' | 'Technique Guide' | 'STEP CAD' | 'Material Cert';
    size: string;
  }[];
}

export interface MaterialData {
  id: string;
  name: string;
  grade: string;
  standard: string;
  density: number; // g/cm³
  elasticModulus: number; // GPa
  tensileStrength: number; // MPa
  yieldStrength: number; // MPa
  mriArtifact: 'Negligible (Safe)' | 'Moderate' | 'High';
  biocompatibilityScore: number; // 1-100
  stressShieldingRisk: 'Very Low' | 'Moderate' | 'High';
  osseointegrationPotential: 'Superior (Micro-rough)' | 'Mechanical Fixation' | 'N/A';
  primaryIndications: string[];
  machiningConsiderations: string;
  costIndex: number; // 1 to 5
}

export interface ManufacturingStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  keyEquipment: string;
  precisionMetric: string;
  standardsCompliance: string;
  qaVerification: string;
  highlightIcon: string;
}

export interface TrustCertification {
  id: string;
  code: string;
  title: string;
  issuedBy: string;
  scope: string;
  auditStandard: string;
  certNumber: string;
  validThrough: string;
  status: 'Active & Verified' | 'Fully Compliant';
}

export interface CompetitorBenchmark {
  attribute: string;
  kazon: string;
  stryker: string;
  zimmerBiomet: string;
  eminentSpine: string;
}
