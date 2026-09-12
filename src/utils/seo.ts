export interface CategoryMeta {
  slug: string;
  name: string;
  headline: string;
  description: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'lcp-plates',
    name: 'LCP Plates',
    headline: 'Locking Compression Plates & Angular Stable Fixation Systems',
    description: 'Precision-machined Ti-6Al-4V ELI & 316L locking compression plates featuring patented combi-holes, anatomical pre-contouring, and limited-contact periosteal preservation.',
  },
  {
    slug: 'dcp-plates',
    name: 'DCP Plates',
    headline: 'Dynamic Compression Plates & Small/Large Fragment Systems',
    description: 'Certified dynamic compression plates engineered with spherical screw-hole gliding geometry for rigid anatomical reduction and interfragmentary compression.',
  },
  {
    slug: 'intramedullary-nails',
    name: 'Intramedullary Nails',
    headline: 'Titanium Antegrade & Retrograde Intramedullary Nailing Systems',
    description: 'High-fatigue cannulated intramedullary nailing solutions for femoral, tibial, and humeral diaphyseal fractures with multi-planar distal locking options.',
  },
  {
    slug: 'spine',
    name: 'Spine',
    headline: 'Thoracolumbar Spinal Systems & PEEK Interbody Fusion Cages',
    description: 'Polyaxial pedicle screw systems, low-profile reduction tulips, titanium interconnecting crosslinks, and PEEK radiolucent cervical & lumbar interbody cages.',
  },
  {
    slug: 'external-fixators',
    name: 'External Fixator',
    headline: 'Modular External Fixation Clamps, Carbon Fiber Rods & Apex Pins',
    description: 'Rapid-assembly modular trauma external fixators engineered with high-rigidity carbon fiber transfixion connecting rods and self-drilling Schanz pins.',
  },
  {
    slug: 'instruments',
    name: 'Instruments',
    headline: 'Surgical Instrument Sets, Modular Cassettes & Metrology Tools',
    description: 'Autoclavable orthopedic surgical instrument sets, cannulated reamers, depth gauges, torque-limiting drivers, and hard-anodized storage sterilization cassettes.',
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.name.toLowerCase() === slug.toLowerCase().replace(/-/g, ' ')
  );
}

export function slugifyCategory(categoryName: string): string {
  const match = CATEGORIES.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());
  if (match) return match.slug;
  return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const SITE_URL = 'https://www.kazonindia.com';

// Organization + LocalBusiness Schema
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      'name': 'Kazon India Pvt. Ltd.',
      'alternateName': ['Kazon Orthopedic Implants', 'Kazon Surgical Instruments'],
      'url': SITE_URL,
      'logo': `${SITE_URL}/kazon-logo.svg`,
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+91-7827237179',
        'contactType': 'sales & global export',
        'email': 'export@kazonindia.com',
        'areaServed': [
          'India',
          'Turkey',
          'Vietnam',
          'Colombia',
          'Kenya',
          'Saudi Arabia',
          'Mexico',
          'Egypt',
          'South Africa',
          'United Arab Emirates',
          'Brazil',
          'Indonesia',
          'Philippines'
        ],
        'availableLanguage': ['English', 'Hindi']
      },
      'sameAs': [
        'https://www.linkedin.com/company/kazonindia'
      ]
    },
    {
      '@type': ['LocalBusiness', 'MedicalBusiness'],
      '@id': `${SITE_URL}/#localbusiness`,
      'name': 'Kazon India - Precision Orthopedic Implant Manufacturing Facility',
      'image': `${SITE_URL}/kazon-logo.svg`,
      'telephone': '+91-7827237179',
      'email': 'export@kazonindia.com',
      'url': SITE_URL,
      'priceRange': '$$$$',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Sector A-2, Tronica City Industrial Area, Loni',
        'addressLocality': 'Ghaziabad',
        'addressRegion': 'Uttar Pradesh',
        'postalCode': '201102',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 28.7758,
        'longitude': 77.2625
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '18:00'
      }
    }
  ]
};
