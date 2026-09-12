import fs from 'fs';
import path from 'path';
import { PRODUCTS } from '../src/data/products';
import { CATEGORIES, SITE_URL, ORGANIZATION_SCHEMA, getCategoryBySlug, slugifyCategory } from '../src/utils/seo';

interface RouteSnapshot {
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
  schemaJson: object[];
  prerenderedHtml: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getAllRoutes(): RouteSnapshot[] {
  const routes: RouteSnapshot[] = [];

  // 1. Home Page
  routes.push({
    path: '/',
    title: 'Kazon India | Precision Orthopedic Implants, Spine Systems & Surgical Tools',
    description: 'Kazon India is a premier CDSCO-licensed and ISO 13485:2016 certified manufacturer of orthopedic implants, locking compression plates, intramedullary nails, spine hardware, and surgical instruments.',
    ogTitle: 'Kazon India - Precision Orthopedic Implants & Surgical Innovation',
    ogDescription: 'Precision-machined medical-grade titanium and stainless steel orthopedic implants with micron tolerances for trauma surgeons and health ministries in 45+ nations.',
    canonicalUrl: `${SITE_URL}/`,
    schemaJson: [ORGANIZATION_SCHEMA],
    prerenderedHtml: `
      <header class="py-6 border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4">
          <span class="text-xs font-mono uppercase text-emerald-700 font-bold">CDSCO Licensed • ISO 13485:2016 Registered Manufacturer</span>
          <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 mt-2">Kazon India - Precision Orthopedic Implants & Surgical Innovation</h1>
          <p class="text-base text-slate-600 mt-2 max-w-3xl">Engineered in Tronica City, NCR Delhi with multi-axis Swiss CNC machine cells. Supplying certified titanium trauma plates, intramedullary nails, pedicle screws, and PEEK interbody fusion devices to surgeons and hospitals across 45+ export corridors.</p>
        </div>
      </header>
      <main class="max-w-7xl mx-auto px-4 py-8">
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">Core Surgical Implant Portfolios</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${CATEGORIES.map(c => `
              <article class="p-6 border border-slate-200 rounded-2xl">
                <h3 class="text-lg font-bold text-slate-900"><a href="/category/${c.slug}">${escapeHtml(c.name)}</a></h3>
                <p class="text-xs text-slate-600 mt-2">${escapeHtml(c.description)}</p>
                <a href="/category/${c.slug}" class="inline-block mt-4 text-xs font-semibold text-emerald-700">Explore ${escapeHtml(c.name)} Systems &rarr;</a>
              </article>
            `).join('')}
          </div>
        </section>
      </main>
    `,
  });

  // 2. Catalog Page
  routes.push({
    path: '/products',
    title: 'Orthopedic Implants & 3D CAD Catalog | Kazon India',
    description: "Explore Kazon India's comprehensive portfolio of titanium & stainless steel orthopedic implants: LCP/DCP plates, intramedullary nails, spine hardware, and external fixators.",
    ogTitle: 'Orthopedic Implants & 3D CAD Catalog | Kazon India',
    ogDescription: 'Precision-machined medical implants with micron tolerances, STEP CAD models, and ISO 13485:2016 certification dossiers.',
    canonicalUrl: `${SITE_URL}/products`,
    schemaJson: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Orthopedic Implants', 'item': `${SITE_URL}/products` }
        ]
      }
    ],
    prerenderedHtml: `
      <main class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Orthopedic Implants & 3D CAD Metrology Catalog</h1>
        <p class="text-sm text-slate-600 mb-8">Direct manufacturer catalog of CDSCO Class IIb and CE MDR compliant orthopedic implants manufactured from medical grade Ti-6Al-4V ELI (ASTM F136) and 316L Stainless Steel (ASTM F138).</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${PRODUCTS.map(p => `
            <article class="p-6 border border-slate-200 rounded-2xl">
              <span class="text-[10px] font-mono uppercase text-emerald-700">${escapeHtml(p.family)} • ${escapeHtml(p.anatomy)}</span>
              <h2 class="text-lg font-bold text-slate-900 mt-1"><a href="/products/${p.id}">${escapeHtml(p.name)}</a></h2>
              <p class="text-xs text-slate-600 mt-2">${escapeHtml(p.tagline)}</p>
              <dl class="mt-4 text-xs font-mono space-y-1">
                <div><dt class="inline text-slate-400">Material: </dt><dd class="inline font-semibold">${escapeHtml(p.material)}</dd></div>
                <div><dt class="inline text-slate-400">Tolerance: </dt><dd class="inline text-emerald-700 font-semibold">${escapeHtml(p.toleranceStandard)}</dd></div>
              </dl>
              <a href="/products/${p.id}" class="inline-block mt-4 text-xs font-semibold text-emerald-700">View 3D Model & Technical Dossier &rarr;</a>
            </article>
          `).join('')}
        </div>
      </main>
    `,
  });

  // 3. Category Pages
  CATEGORIES.forEach((category) => {
    const catCanonical = `${SITE_URL}/category/${category.slug}`;
    const categoryProducts = PRODUCTS.filter(
      (p) => p.family.toLowerCase() === category.name.toLowerCase()
    );

    routes.push({
      path: `/category/${category.slug}`,
      title: `${category.name} Systems & Hardware | Kazon India`,
      description: category.description,
      ogTitle: `${category.name} Systems | Kazon India`,
      ogDescription: category.description,
      canonicalUrl: catCanonical,
      schemaJson: [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Orthopedic Implants', 'item': `${SITE_URL}/products` },
            { '@type': 'ListItem', 'position': 3, 'name': category.name, 'item': catCanonical }
          ]
        }
      ],
      prerenderedHtml: `
        <main class="max-w-7xl mx-auto px-4 py-8">
          <nav aria-label="Breadcrumb" class="text-xs text-slate-500 mb-4">
            <a href="/">Home</a> &gt; <a href="/products">Implants</a> &gt; <span>${escapeHtml(category.name)}</span>
          </nav>
          <h1 class="text-3xl font-extrabold text-slate-900 mb-2">${escapeHtml(category.headline)}</h1>
          <p class="text-sm text-slate-600 mb-8 max-w-3xl">${escapeHtml(category.description)}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${categoryProducts.map(p => `
              <article class="p-6 border border-slate-200 rounded-2xl">
                <span class="text-[10px] font-mono uppercase text-emerald-700">${escapeHtml(p.anatomy)}</span>
                <h2 class="text-lg font-bold text-slate-900 mt-1"><a href="/products/${p.id}">${escapeHtml(p.name)}</a></h2>
                <p class="text-xs text-slate-600 mt-2">${escapeHtml(p.tagline)}</p>
                <dl class="mt-4 text-xs font-mono space-y-1">
                  <div><dt class="inline text-slate-400">Material: </dt><dd class="inline font-semibold">${escapeHtml(p.material)}</dd></div>
                  <div><dt class="inline text-slate-400">Tolerance: </dt><dd class="inline text-emerald-700 font-semibold">${escapeHtml(p.toleranceStandard)}</dd></div>
                </dl>
                <a href="/products/${p.id}" class="inline-block mt-4 text-xs font-semibold text-emerald-700">View 3D Metrology Specs &rarr;</a>
              </article>
            `).join('')}
          </div>
        </main>
      `,
    });
  });

  // 4. Individual Product Pages
  PRODUCTS.forEach((product) => {
    const prodCanonical = `${SITE_URL}/products/${product.id}`;
    const categorySlug = slugifyCategory(product.family);

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${prodCanonical}#product`,
      'name': product.name,
      'description': product.description,
      'category': product.category,
      'brand': { '@type': 'Brand', 'name': 'Kazon India' },
      'manufacturer': { '@type': 'Organization', 'name': 'Kazon India Pvt. Ltd.', 'url': SITE_URL },
      'material': product.material,
      'sku': product.id,
      'mpn': product.id.toUpperCase(),
      'offers': {
        '@type': 'Offer',
        'url': prodCanonical,
        'priceCurrency': 'USD',
        'price': '0',
        'priceSpecification': {
          '@type': 'PriceSpecification',
          'description': 'Direct Institutional RFQ & Export Freight Quotation'
        },
        'availability': 'https://schema.org/InStock',
        'itemCondition': 'https://schema.org/NewCondition'
      }
    };

    const breadcrumbsSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
        { '@type': 'ListItem', 'position': 2, 'name': 'Orthopedic Implants', 'item': `${SITE_URL}/products` },
        { '@type': 'ListItem', 'position': 3, 'name': product.family, 'item': `${SITE_URL}/category/${categorySlug}` },
        { '@type': 'ListItem', 'position': 4, 'name': product.name, 'item': prodCanonical }
      ]
    };

    routes.push({
      path: `/products/${product.id}`,
      title: `${product.name} | Kazon India Orthopedic Implants`,
      description: `${product.tagline}. Medical-grade ${product.material} orthopedic implant engineered by Kazon India under ISO 13485:2016 and CDSCO Class IIb licensure.`,
      ogTitle: `${product.name} | Kazon India`,
      ogDescription: product.tagline,
      canonicalUrl: prodCanonical,
      schemaJson: [productSchema, breadcrumbsSchema],
      prerenderedHtml: `
        <main class="max-w-7xl mx-auto px-4 py-8">
          <nav aria-label="Breadcrumb" class="text-xs text-slate-500 mb-4">
            <a href="/">Home</a> &gt; <a href="/products">Implants</a> &gt; <a href="/category/${categorySlug}">${escapeHtml(product.family)}</a> &gt; <span>${escapeHtml(product.name)}</span>
          </nav>
          <header class="mb-6">
            <span class="text-xs font-mono uppercase text-emerald-700 font-bold">${escapeHtml(product.family)} • ${escapeHtml(product.anatomy)}</span>
            <h1 class="text-3xl font-extrabold text-slate-900 mt-1">${escapeHtml(product.name)}</h1>
            <p class="text-sm text-slate-600 mt-2 max-w-3xl">${escapeHtml(product.tagline)}</p>
          </header>
          <section class="p-6 border border-slate-200 rounded-2xl mb-8">
            <h2 class="text-lg font-bold text-slate-900 mb-3">Metallurgical & Precision Specifications</h2>
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div><dt class="text-slate-500">Material Core:</dt><dd class="font-bold text-slate-900">${escapeHtml(product.material)}</dd></div>
              <div><dt class="text-slate-500">Surface Finish:</dt><dd class="font-bold text-slate-900">${escapeHtml(product.surfaceFinish)}</dd></div>
              <div><dt class="text-slate-500">Precision Tolerance:</dt><dd class="font-bold text-emerald-700">${escapeHtml(product.toleranceStandard)}</dd></div>
              <div><dt class="text-slate-500">Regulatory Approval:</dt><dd class="font-bold text-slate-900">${escapeHtml(product.fdaCeStatus)}</dd></div>
            </dl>
          </section>
          <section class="mb-8">
            <h2 class="text-lg font-bold text-slate-900 mb-3">Surgical Indications</h2>
            <ul class="list-disc list-inside text-xs text-slate-600 space-y-1">
              ${product.indications.map(ind => `<li>${escapeHtml(ind)}</li>`).join('')}
            </ul>
          </section>
        </main>
      `,
    });
  });

  // 5. About Page
  routes.push({
    path: '/about',
    title: 'About Kazon India | Precision Orthopedic Implant Manufacturer',
    description: 'Learn about Kazon India Pvt. Ltd., an elite CDSCO-licensed and ISO 13485:2016 certified manufacturer of orthopedic implants, spine hardware, and surgical instruments based in Tronica City, NCR Delhi.',
    ogTitle: 'About Kazon India - Orthopedic Implant Manufacturing',
    ogDescription: 'Kazon India engineers medical-grade titanium and stainless steel implants with micron tolerances for hospitals and export distributors in 45+ nations.',
    canonicalUrl: `${SITE_URL}/about`,
    schemaJson: [ORGANIZATION_SCHEMA],
    prerenderedHtml: `
      <main class="max-w-7xl mx-auto px-4 py-12">
        <h1 class="text-4xl font-extrabold text-slate-900 mb-4">About Kazon India - Precision Orthopedic Manufacturing</h1>
        <p class="text-base text-slate-600 mb-8 max-w-3xl">Kazon India Pvt. Ltd. is a specialized medical device manufacturer delivering high-tolerance titanium and stainless steel implants to orthopedic trauma surgeons and international health ministries.</p>
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="p-6 border border-slate-200 rounded-2xl">
            <h2 class="text-lg font-bold text-slate-900 mb-2">Swiss CNC Machining</h2>
            <p class="text-xs text-slate-600">Sub-micron ±0.0001" tolerances on sliding-head Citizen and Star CNC lathes operating in Class 10,000 cleanrooms.</p>
          </div>
          <div class="p-6 border border-slate-200 rounded-2xl">
            <h2 class="text-lg font-bold text-slate-900 mb-2">CDSCO & ISO 13485:2016</h2>
            <p class="text-xs text-slate-600">CDSCO Class IIb manufacturing license (MDS-5) and CE MDR harmonized technical documentation.</p>
          </div>
          <div class="p-6 border border-slate-200 rounded-2xl">
            <h2 class="text-lg font-bold text-slate-900 mb-2">Global Export Corridors</h2>
            <p class="text-xs text-slate-600">Direct export corridor registration (IEC: 0516938908) serving hospital tenders across 45+ nations.</p>
          </div>
        </section>
      </main>
    `,
  });

  // 6. Contact Page
  routes.push({
    path: '/contact',
    title: 'Contact Kazon India | Surgical Implant Manufacturer & Global Export Desk',
    description: "Connect with Kazon India's biomedical engineering team and global export desk. Plant in Tronica City Industrial Area, NCR Delhi. Phone: +91-7827237179.",
    ogTitle: 'Contact Kazon India - Orthopedic Implant Manufacturer',
    ogDescription: 'Direct factory procurement and global export desk for CDSCO and CE MDR compliant orthopedic and spinal implants.',
    canonicalUrl: `${SITE_URL}/contact`,
    schemaJson: [ORGANIZATION_SCHEMA],
    prerenderedHtml: `
      <main class="max-w-7xl mx-auto px-4 py-12">
        <h1 class="text-4xl font-extrabold text-slate-900 mb-4">Connect With Kazon India Pvt. Ltd.</h1>
        <p class="text-base text-slate-600 mb-8 max-w-3xl">Direct factory procurement, standing hospital orders, and global export freight quotations.</p>
        <div class="p-6 border border-slate-200 rounded-2xl mb-8">
          <h2 class="text-lg font-bold text-slate-900 mb-2">Manufacturing Plant & Corporate Office</h2>
          <p class="text-xs text-slate-600">Sector A-2, Tronica City Industrial Area, Loni, Ghaziabad, Uttar Pradesh 201102, India</p>
          <p class="text-xs font-mono font-bold text-emerald-700 mt-2">Direct OT Helpline / Export Desk: +91-7827237179 | export@kazonindia.com</p>
        </div>
      </main>
    `,
  });

  // 7. Materials Page
  routes.push({
    path: '/materials',
    title: 'Medical Metallurgy & Biomaterials Science | Kazon India',
    description: 'Technical comparison of medical grade Ti-6Al-4V ELI (ASTM F136), 316L Stainless Steel (ASTM F138), and cortical bone biomechanics by Kazon India.',
    ogTitle: 'Medical Metallurgy & Biomaterials Science | Kazon India',
    ogDescription: 'Certified ASTM F136 titanium and ASTM F138 stainless steel medical implant metallurgy with full heat-lot traceability.',
    canonicalUrl: `${SITE_URL}/materials`,
    schemaJson: [],
    prerenderedHtml: `
      <main class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Materials Science & Biomechanics Matrix</h1>
        <p class="text-sm text-slate-600 mb-8 max-w-3xl">Direct comparative analysis between Ti-6Al-4V ELI (ASTM F136), 316L Stainless Steel (ASTM F138), and Human Cortical Bone.</p>
      </main>
    `,
  });

  // 8. Manufacturing Page
  routes.push({
    path: '/manufacturing',
    title: 'Orthopedic Implant Manufacturing & Swiss CNC Metrology | Kazon India',
    description: "Explore Kazon India's 7-stage manufacturing lifecycle: Swiss CNC sliding-head machining, automated passivation, Zeiss CMM inspection, and ISO Class 7 cleanroom packaging.",
    ogTitle: 'Precision Manufacturing & Quality Lifecycle | Kazon India',
    ogDescription: 'State-of-the-art medical implant manufacturing plant in Tronica City, NCR Delhi with multi-axis Swiss CNC lathes and sub-micron quality metrology.',
    canonicalUrl: `${SITE_URL}/manufacturing`,
    schemaJson: [],
    prerenderedHtml: `
      <main class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Precision Manufacturing & Quality Lifecycle</h1>
        <p class="text-sm text-slate-600 mb-8 max-w-3xl">Follow Kazon India's 7-stage manufacturing process from certified vacuum-arc remelted titanium billet to ISO Class 7 cleanroom vacuum packaging and validated terminal sterilization.</p>
      </main>
    `,
  });

  // 9. Regulatory Page
  routes.push({
    path: '/regulatory',
    title: 'Regulatory Standards, ISO 13485 & CE MDR Approvals | Kazon India',
    description: "View Kazon India's regulatory certifications: CDSCO Class IIb manufacturing license (MDS-5), ISO 13485:2016, and technical dossiers aligned with CE MDR (EU) 2017/745.",
    ogTitle: 'Regulatory Standards & Quality Dossiers | Kazon India',
    ogDescription: 'Verified quality assurance protocols, cleanroom audit reports, and competitor performance benchmarking for Kazon orthopedic implants.',
    canonicalUrl: `${SITE_URL}/regulatory`,
    schemaJson: [],
    prerenderedHtml: `
      <main class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Regulatory Compliance & Competitor Benchmarking</h1>
        <p class="text-sm text-slate-600 mb-8 max-w-3xl">Verified medical device manufacturing standards, international notified body audit scopes, and clinical performance benchmarks against multinational industry leaders.</p>
      </main>
    `,
  });

  // 10. Anatomy Page
  routes.push({
    path: '/anatomy',
    title: 'Surgical Anatomy & Implant Matching Map | Kazon India',
    description: 'Interactive skeletal anatomy map matching clinical fracture pathologies, surgical approaches (ORIF, ACDF, TLIF), and Kazon titanium implants.',
    ogTitle: 'Surgical Anatomy & Implant Matching | Kazon India',
    ogDescription: 'Explore human skeletal anatomy and locate exact titanium trauma, spine, and extremity implants engineered by Kazon India.',
    canonicalUrl: `${SITE_URL}/anatomy`,
    schemaJson: [],
    prerenderedHtml: `
      <main class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Surgical Anatomy & Implant Matching</h1>
        <p class="text-sm text-slate-600 mb-8 max-w-3xl">Explore the human skeletal framework to pinpoint clinical indications, surgical approaches, and verified Kazon India precision implants.</p>
      </main>
    `,
  });

  // 11. Request Quote Page
  routes.push({
    path: '/request-quote',
    title: 'Request Institutional Orthopedic Implant Quote & Samples | Kazon India',
    description: 'Request direct factory pricing, clinical evaluation sample kits, and international export freight terms (FOB/CIF) directly from Kazon India Pvt. Ltd.',
    ogTitle: 'Request Institutional Orthopedic Quote | Kazon India',
    ogDescription: 'Direct factory pricing, evaluation sample kits, and volume standing order discounts for orthopedic surgeons and hospitals.',
    canonicalUrl: `${SITE_URL}/request-quote`,
    schemaJson: [],
    prerenderedHtml: `
      <main class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Request Clinical Sample Kit & Formal Quote</h1>
        <p class="text-sm text-slate-600 mb-8 max-w-3xl">Direct precision manufacturing pricing from Kazon India Pvt. Ltd. with guaranteed 35–50% cost savings over US/EU brands.</p>
      </main>
    `,
  });

  // 12. Ask Engineer Page
  routes.push({
    path: '/ask-engineer',
    title: 'Consult Biomedical & CNC Machining Engineers | Kazon India',
    description: "Consult directly with Kazon India's precision orthopedic engineering leads regarding custom tolerances, STEP CAD files, titanium metallurgy, or OEM manufacturing.",
    ogTitle: 'Consult Biomedical & CNC Machining Engineers | Kazon India',
    ogDescription: 'Direct technical consultation with orthopedic design engineers and Swiss CNC production specialists.',
    canonicalUrl: `${SITE_URL}/ask-engineer`,
    schemaJson: [],
    prerenderedHtml: `
      <main class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Consult With a Precision Orthopedic Engineer</h1>
        <p class="text-sm text-slate-600 mb-8 max-w-3xl">Discuss custom dimensional tolerances (±0.0001"), porous trabecular lattice parameters, or private label OEM contract manufacturing directly with Kazon India machining leads.</p>
      </main>
    `,
  });

  return routes;
}

export function prerenderAllRoutes() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.resolve(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error(`Error: ${templatePath} not found. Run 'vite build' first.`);
    process.exit(1);
  }

  const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
  const routes = getAllRoutes();

  console.log(`Prerendering ${routes.length} static HTML snapshots...`);

  routes.forEach((route) => {
    let html = rawTemplate;

    // 1. Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

    // 2. Replace Meta Description
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    );

    // Strip generic template og:title, og:description, canonical if present
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
    html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/gi, '');

    // 3. Replace or Insert OpenGraph Tags
    const ogTags = `
    <meta property="og:title" content="${escapeHtml(route.ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(route.ogDescription)}" />
    <meta property="og:url" content="${escapeHtml(route.canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <link rel="canonical" href="${escapeHtml(route.canonicalUrl)}" />
    ${route.schemaJson
      .map((s) => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`)
      .join('\n')}
    `;

    // Inject before </head>
    html = html.replace('</head>', `${ogTags}\n  </head>`);

    // 4. Inject Pre-rendered Semantic HTML snapshot inside <div id="root"></div>
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${route.prerenderedHtml}</div>`
    );

    // 5. Determine output path
    let outputPath: string;
    if (route.path === '/') {
      outputPath = path.resolve(distDir, 'index.html');
    } else {
      const routeSubdir = path.resolve(distDir, ...route.path.split('/').filter(Boolean));
      if (!fs.existsSync(routeSubdir)) {
        fs.mkdirSync(routeSubdir, { recursive: true });
      }
      outputPath = path.resolve(routeSubdir, 'index.html');
    }

    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`✓ Snapshot created: ${route.path} -> ${path.relative(distDir, outputPath)}`);
  });

  // Ensure robots.txt & sitemap.xml exist in dist
  const publicRobots = path.resolve(process.cwd(), 'public', 'robots.txt');
  const distRobots = path.resolve(distDir, 'robots.txt');
  if (fs.existsSync(publicRobots)) {
    fs.copyFileSync(publicRobots, distRobots);
  }

  const publicSitemap = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  const distSitemap = path.resolve(distDir, 'sitemap.xml');
  if (fs.existsSync(publicSitemap)) {
    fs.copyFileSync(publicSitemap, distSitemap);
  }

  console.log(`Prerendering completed successfully! All routes have static HTML snapshots.`);
}

prerenderAllRoutes();
