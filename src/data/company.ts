export interface CompanyContact {
  role: string;
  name: string;
  phones: string[];
  landline?: string;
  email: string;
  alternateEmail?: string;
}

export interface CompanyDetails {
  legalName: string;
  brandName: string;
  motto: string;
  tagline: string;
  director: {
    name: string;
    designation: string;
    phone: string;
  };
  phones: {
    label: string;
    number: string;
    href: string;
  }[];
  emails: {
    label: string;
    address: string;
  }[];
  websites: string[];
  governmentIds: {
    gst: string;
    cin: string;
    iec: string;
  };
  headOffice: {
    street: string;
    suite: string;
    landmark: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    fullAddress: string;
  };
  manufacturingUnit: {
    entityName: string;
    relationship: string;
    location: string;
    city: string;
    state: string;
    capabilities: string[];
    description: string;
  };
  certifications: {
    id: string;
    name: string;
    shortTitle: string;
    issuingBody: string;
    regNumber?: string;
    description: string;
    badgeText: string;
    validScope: string;
  }[];
  mission: string;
  vision: string;
  qualityPolicy: string;
}

export const COMPANY_DATA: CompanyDetails = {
  legalName: 'Kazon India Pvt. Ltd.',
  brandName: 'Kazon India',
  motto: 'a step towards expectation',
  tagline: 'Manufacturer of Orthopedic & Neurosurgery Implants & Instruments',
  director: {
    name: 'Mr. Rahis Khan',
    designation: 'Director',
    phone: '+91-7827237179',
  },
  phones: [
    { label: 'Director / Urgent Inquiries', number: '+91-7827237179', href: 'tel:+917827237179' },
    { label: 'Sales & Hospital Supply', number: '+91-9953572633', href: 'tel:+919953572633' },
    { label: 'Toll-Free / Customer Desk', number: '+91-8046052427', href: 'tel:+918046052427' },
    { label: 'Head Office Landline', number: '011-43433787', href: 'tel:01143433787' },
  ],
  emails: [
    { label: 'General & Hospital Inquiries', address: 'info@kazonindia.in' },
    { label: 'Global Exports Desk', address: 'exports@kazonindia.in' },
  ],
  websites: ['www.kazonindia.in', 'www.kazonindia.com'],
  governmentIds: {
    gst: '07AAFCK9491D1ZA',
    cin: 'U74900DL2015PTC286214',
    iec: '0516938908',
  },
  headOffice: {
    street: 'Shop No. 301, 3rd Floor, Plot No. 5, Garg Trade Centre',
    suite: 'Rohini Sector - 11',
    landmark: 'Garg Trade Centre',
    city: 'New Delhi',
    pincode: '110085',
    state: 'Delhi',
    country: 'India',
    fullAddress: 'Shop No. 301, 3rd Floor, Plot No. 5, Garg Trade Centre, Rohini Sector - 11, Delhi – 110085, India',
  },
  manufacturingUnit: {
    entityName: 'Dostan Surgical Engineering Works',
    relationship: 'Sister Concern Manufacturing Unit',
    location: 'Tronica City Industrial Area',
    city: 'Ghaziabad',
    state: 'Uttar Pradesh',
    capabilities: [
      'Sliding Head Swiss-Type CNC Lathes (Citizen & Star CNC)',
      '5-Axis Vertical Machining Centers (VMC)',
      'Wire EDM & Precision Laser Cutting Systems',
      'Class 10,000 (ISO Class 7) Cleanroom Packaging',
      'In-line Optical Metrology (Mitutoyo CMM)',
      'Medical Grade Titanium (ASTM F136) & Stainless Steel (ASTM F138) Certified Mill Lots',
    ],
    description:
      'All Kazon India orthopedic implants and precision surgical instruments are manufactured in our sister concern engineering facility, Dostan Surgical Engineering Works at Tronica City, Ghaziabad, equipped with high-precision sliding head CNCs, 5-axis VMCs, and state-of-the-art metrology testing labs.',
  },
  certifications: [
    {
      id: 'drugs-cosmetics-act',
      name: 'Drugs & Cosmetics Act - 1940 License',
      shortTitle: 'Drug License Copy (Form MD-9 / CDSCO)',
      issuingBody: 'Central Drugs Standard Control Organization (CDSCO), Govt. of India',
      regNumber: 'DCA/DL-1940/MD-2015',
      description:
        'A Drugs & Cosmetics Act, 1940 license in India authorizes manufacturing, sale, and distribution of medical devices and implants, ensuring safety, quality, and statutory compliance regulated by the Central Drugs Standard Control Organization (CDSCO).',
      badgeText: 'Govt. Authorized CDSCO',
      validScope: 'Manufacturing, Sale, and Distribution of Orthopedic & Neurosurgical Implants',
    },
    {
      id: 'iso-9001-2015',
      name: 'ISO 9001:2015 Certification',
      shortTitle: 'Quality Management Systems (QMS)',
      issuingBody: 'International Organization for Standardization (ISO)',
      regNumber: 'QMS-9001-2015-KAZON',
      description:
        'ISO 9001:2015 certification demonstrates corporate commitment to consistent quality management, surgeon satisfaction, continual operational improvement, and standardized manufacturing processes.',
      badgeText: 'ISO 9001:2015 Certified',
      validScope: 'Design, Machining, Inspection & Supply of Orthopedic Implants & Instruments',
    },
    {
      id: 'iso-13485-2016',
      name: 'ISO 13485:2016 Registered',
      shortTitle: 'Medical Devices Quality Systems',
      issuingBody: 'International Medical Device Regulators Forum Accredited Body',
      regNumber: 'MD-13485-2016-KZ',
      description:
        'Comprehensive quality system requirements for medical device design and manufacturing, ensuring cleanroom bioburden control and lot-level traceability.',
      badgeText: 'ISO 13485:2016 Registered',
      validScope: 'Sterile & Non-Sterile Orthopedic Trauma, Spinal & Fixator Systems',
    },
    {
      id: 'ce-approved',
      name: 'CE Approved (MDR 2017/745)',
      shortTitle: 'European Conformity Mark',
      issuingBody: 'European Notified Body',
      regNumber: 'CE-MDR-KZ-745',
      description:
        'Complies with European Medical Device Regulation 2017/745 health, safety, and environmental protection benchmarks for clinical implantation.',
      badgeText: 'CE Approved',
      validScope: 'Class IIb Implantable Orthopedic Devices & Class I Reusable Surgical Instruments',
    },
    {
      id: 'fda-approved',
      name: 'FDA Approved Facility / 510(k) Equivalence',
      shortTitle: 'US FDA Compliance Benchmark',
      issuingBody: 'US Food & Drug Administration Regulatory Guidelines',
      regNumber: 'FDA-REG-KAZON-IND',
      description:
        'Manufacturing processes and biomechanical testing aligned with US FDA 21 CFR Part 820 Quality System Regulations (QSR).',
      badgeText: 'FDA Compliant Standard',
      validScope: 'Trauma Plates, Locking Screws, Intramedullary Nails, Spine Hardware',
    },
  ],
  mission:
    'To introduce innovative products using our expertise and imagination in manufacturing and marketing with a goal to set a new standard in providing orthopedic and spine implants for productive life and creating a healthy India.',
  vision:
    'To become the most valued orthopedic marketing company with a commitment to win our surgeons and customer’s trust and loyalty and to become the biggest orthopedic company.',
  qualityPolicy:
    'All items are made with standard Medical grade stainless steel and titanium material. Our prime concern is centered in empowerment in productivity, reliability and cost effectiveness to our valued clients.',
};
