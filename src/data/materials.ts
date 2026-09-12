import { MaterialData } from '../types';

export const MATERIALS_DATA: MaterialData[] = [
  {
    id: 'ti-6al-4v',
    name: 'Titanium Ti-6Al-4V ELI (Grade 23)',
    grade: 'Extra Low Interstitial (ASTM F136 / ISO 5832-3)',
    standard: 'ASTM F136 / ISO 5832-3 Medical Implant Grade',
    density: 4.43, // g/cm³ (~45% lighter than steel)
    elasticModulus: 114, // GPa (Closer to human bone, drastically reducing stress shielding)
    tensileStrength: 965, // MPa
    yieldStrength: 860, // MPa
    mriArtifact: 'Negligible (Safe)',
    biocompatibilityScore: 98,
    stressShieldingRisk: 'Very Low',
    osseointegrationPotential: 'Superior (Micro-rough)',
    primaryIndications: [
      'Spinal fusion cages & pedicle screw systems',
      'Sacroiliac (SI) joint fusion implants',
      'Long-term and permanent joint reconstruction',
      'Patients with metal sensitivity or nickel allergies'
    ],
    machiningConsiderations: 'Requires high-pressure through-spindle coolant (100 bar) on 5-axis Swiss CNC to dissipate heat without work hardening.',
    costIndex: 4
  },
  {
    id: 'ss-316l',
    name: 'Implant-Grade Stainless Steel 316L',
    grade: 'Vacuum Arc Remelted (ASTM F138 / ISO 5832-1)',
    standard: 'ASTM F138 / ASTM F139 / ISO 5832-1',
    density: 8.00, // g/cm³
    elasticModulus: 193, // GPa (High stiffness, ideal for rigid trauma bridging)
    tensileStrength: 860, // MPa (Cold worked)
    yieldStrength: 690, // MPa
    mriArtifact: 'Moderate',
    biocompatibilityScore: 86,
    stressShieldingRisk: 'Moderate',
    osseointegrationPotential: 'Mechanical Fixation',
    primaryIndications: [
      'Trauma plates and cortical bone screws',
      'Distal femoral & tibial fracture fixation',
      'Temporary internal fixation and intramedullary nails',
      'Precision surgical instruments, drivers & torque limiters'
    ],
    machiningConsiderations: 'Exceptional machinability and polishability; allows mirror-finished edges (Ra < 0.15 µm) to protect adjacent tendons.',
    costIndex: 2
  },
  {
    id: 'cortical-bone',
    name: 'Human Cortical Bone (Physiological Baseline)',
    grade: 'Natural Human Femoral / Diaphyseal Cortex',
    standard: 'Biomechanics Reference Standard',
    density: 1.90, // g/cm³
    elasticModulus: 18, // GPa
    tensileStrength: 135, // MPa
    yieldStrength: 115, // MPa
    mriArtifact: 'Negligible (Safe)',
    biocompatibilityScore: 100,
    stressShieldingRisk: 'Very Low',
    osseointegrationPotential: 'Superior (Micro-rough)',
    primaryIndications: [
      'Reference physiological target for orthopedic implant mechanics and load distribution'
    ],
    machiningConsiderations: 'Living biological tissue; remodels according to Wolff\'s Law under balanced mechanical loading.',
    costIndex: 1
  }
];

export const MATERIAL_COMPARISON_POINTS = [
  {
    category: 'Density & Weight',
    tiValue: '4.43 g/cm³',
    ssValue: '8.00 g/cm³',
    clinicalSignificance: 'Titanium is 45% lighter, reducing foreign body sensation and implant weight in multi-level spine deformity constructs.'
  },
  {
    category: 'Elastic Modulus (Stiffness)',
    tiValue: '114 GPa',
    ssValue: '193 GPa',
    clinicalSignificance: 'Titanium\'s lower modulus is much closer to cortical bone (18 GPa), drastically reducing stress shielding and bone resorption around implants.'
  },
  {
    category: 'Osseointegration & Surface',
    tiValue: 'Forms TiO₂ passive oxide film; osteoblasts adhere directly',
    ssValue: 'Encapsulated by fibrous tissue (mechanical interlock)',
    clinicalSignificance: 'Titanium achieves direct biological fixation for fusion cages; stainless steel is easier to explant after trauma healing.'
  },
  {
    category: 'MRI Compatibility',
    tiValue: 'Zero magnetic susceptibility (minimal artifacting)',
    ssValue: 'Low magnetic susceptibility, causes moderate local halo artifact',
    clinicalSignificance: 'Surgeons can accurately assess post-operative neural decompression on MRI scans with titanium spinal instrumentation.'
  },
  {
    category: 'Tensile & Fatigue Limit',
    tiValue: 'High endurance ratio; >5M cycles under cyclic load',
    ssValue: 'High yield strength, ductile before catastrophic failure',
    clinicalSignificance: 'Titanium handles repetitive spinal motion cycles; stainless steel excels at load-bearing trauma plates where high ductility allows anatomical bending.'
  },
  {
    category: 'Economics & Sourcing',
    tiValue: 'Higher raw material & high-speed machining investment',
    ssValue: 'Cost-effective raw stock; fast cycle times on CNC mills',
    clinicalSignificance: 'Kazon provides both materials with certified metallurgy to match hospital budgets and clinical indications.'
  }
];
