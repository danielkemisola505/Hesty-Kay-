import { Project, Service, Skill, Testimonial, ProcessStep } from '../types';

export const HERO_IMAGE = 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785942138/ChatGPT_Image_Aug_5_2026_12_39_42_PM_sj96y0.png';
export const OWNER_IMAGE = 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785807074/WhatsApp_Image_2026-06-03_at_3.56.32_PM_1_ef7z4w.jpg';
export const PORTFOLIO_IMAGE = 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785804169/1d3f96229144389.692e4f47a6130_q8dqti.jpg';
export const LOGO_IMAGE = 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785806485/ChatGPT_Image_Aug_4_2026_02_16_51_AM_qb6txt.png';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'luxe-interiors',
    title: 'Aura Atelier Architecture',
    client: 'Aura Design Co.',
    industry: 'Architecture & Interior Design',
    platform: 'Squarespace',
    category: 'Squarespace',
    image: 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785804169/1d3f96229144389.692e4f47a6130_q8dqti.jpg',
    shortDescription: 'Minimalist, fluid Squarespace 7.1 showcase with bespoke typography and custom CSS hover galleries.',
    fullDescription: 'A custom Fluid Engine Squarespace website designed for an award-winning architectural firm. Features horizontal gallery sliders, custom page transitions, project filtering by typology, and integrated client consultation booking.',
    technologies: ['Squarespace 7.1', 'Fluid Engine', 'Custom CSS', 'JavaScript', 'Cal.com Embed', 'SEO Schema'],
    metrics: [
      { label: 'Inquiry Increase', value: '+140%' },
      { label: 'Mobile Bounce Rate', value: '-32%' },
      { label: 'Page Load Speed', value: '0.9s' }
    ],
    featured: true,
    liveUrl: 'https://squarespace.com',
    deliverables: ['Custom Squarespace Layout', 'Brand Guidelines Integration', 'Mobile Optimization', 'SEO Setup'],
    clientQuote: {
      text: 'Daniel transformed our outdated portfolio into an ethereal, high-end online gallery. Clients comment on the seamless experience daily.',
      author: 'Julian Vance',
      role: 'Principal Architect, Aura Design Co.'
    }
  },
  {
    id: 'velour-botanicals',
    title: 'Velour Organic Skincare',
    client: 'Velour Beauty LLC',
    industry: 'E-Commerce / Skincare',
    platform: 'WordPress',
    category: 'E-Commerce',
    image: 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785804169/1d3f96229144389.692e4f47a6130_q8dqti.jpg',
    shortDescription: 'High-converting WordPress + WooCommerce store built with Elementor Pro and custom checkout flows.',
    fullDescription: 'A custom WooCommerce e-commerce website with subscription purchasing options, dynamic ingredient highlights, cart upsells, and sub-second load times via Redis caching and WP Rocket optimization.',
    technologies: ['WordPress', 'WooCommerce', 'Elementor Pro', 'PHP', 'Tailwind CSS', 'Stripe API'],
    metrics: [
      { label: 'E-commerce Revenue', value: '+215%' },
      { label: 'Average Order Value', value: '+$38' },
      { label: 'Core Web Vitals Score', value: '99/100' }
    ],
    featured: true,
    liveUrl: 'https://wordpress.org',
    deliverables: ['WooCommerce Store Setup', 'Subscription Engine', 'Custom Checkout', 'Speed Optimization'],
    clientQuote: {
      text: 'Our online sales tripled within 60 days of launch. The custom WooCommerce workflow is fast, reliable, and effortless for our fulfillment team.',
      author: 'Sophia Martinez',
      role: 'Founder, Velour Beauty'
    }
  },
  {
    id: 'nexus-venture-capital',
    title: 'Nexus Capital Partners',
    client: 'Nexus Group',
    industry: 'Venture Capital & Finance',
    platform: 'Squarespace',
    category: 'Squarespace',
    image: 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785804169/1d3f96229144389.692e4f47a6130_q8dqti.jpg',
    shortDescription: 'High-authority Squarespace corporate portal featuring dynamic investment portfolio grids and LP login integration.',
    fullDescription: 'Designed a authoritative, sleek financial website for a $500M VC firm. Built on Squarespace with custom code snippets for interactive portfolio filtering, founder testimonials, and secure portal links.',
    technologies: ['Squarespace', 'Custom Code Injection', 'JSON-LD Schema', 'Interactive JS Grids'],
    metrics: [
      { label: 'Dealflow Inquiries', value: '+85%' },
      { label: 'Time on Site', value: '4m 12s' }
    ],
    featured: true,
    liveUrl: 'https://squarespace.com',
    deliverables: ['Squarespace Site Design', 'Portfolio Grid Filter', 'LP Login Gateway', 'SEO Optimization']
  },
  {
    id: 'solas-coffee-roasters',
    title: 'Solas Artisan Coffee',
    client: 'Solas Coffee Co.',
    industry: 'Food & Beverage / Hospitality',
    platform: 'WordPress',
    category: 'WordPress',
    image: 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785804169/1d3f96229144389.692e4f47a6130_q8dqti.jpg',
    shortDescription: 'Editorial WordPress web build with Gutenberg blocks, coffee subscription portal, and location finder.',
    fullDescription: 'Crafted a rich storytelling WordPress website celebrating artisanal coffee. Uses custom Gutenberg block development for lightning performance, interactive roast profile quizzes, and wholesale inquiry funnels.',
    technologies: ['WordPress', 'Gutenberg Blocks', 'ACF Pro', 'Custom PHP/Sass', 'Mapbox API'],
    metrics: [
      { label: 'Wholesale Leads', value: '+310%' },
      { label: 'Mobile Conversion Rate', value: '4.8%' }
    ],
    featured: false,
    liveUrl: 'https://wordpress.org',
    deliverables: ['Custom WordPress Theme', 'Coffee Quiz Tool', 'Store Locator', 'Wholesale Funnel']
  },
  {
    id: 'apex-saas-launch',
    title: 'Apex AI Platform Landing Page',
    client: 'Apex Tech Inc.',
    industry: 'Technology / SaaS',
    platform: 'WordPress',
    category: 'Landing Page',
    image: 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785804169/1d3f96229144389.692e4f47a6130_q8dqti.jpg',
    shortDescription: 'High-converting WordPress landing page with interactive pricing calculator and GSAP micro-interactions.',
    fullDescription: 'A high-stakes product launch page built on WordPress. Optimized for maximum conversions with sticky CTA bars, interactive pricing sliders, live feature comparisons, and zero bloat.',
    technologies: ['WordPress', 'GSAP Animations', 'Tailwind CSS', 'HubSpot Integration', 'Cloudflare CDN'],
    metrics: [
      { label: 'Signup Rate', value: '18.4%' },
      { label: 'LCP Score', value: '0.6s' }
    ],
    featured: true,
    liveUrl: 'https://wordpress.org',
    deliverables: ['Landing Page Architecture', 'GSAP Interactive Widgets', 'HubSpot CRM Integration']
  },
  {
    id: 'kinfolk-wellness',
    title: 'Kinfolk Holistic Clinic',
    client: 'Kinfolk Health',
    industry: 'Health & Wellness',
    platform: 'Squarespace',
    category: 'Squarespace',
    image: 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785804169/1d3f96229144389.692e4f47a6130_q8dqti.jpg',
    shortDescription: 'Calming Squarespace patient portal with Acuity Scheduling, membership area, and practitioner profiles.',
    fullDescription: 'Complete Squarespace website design and Acuity scheduling setup for a multi-practitioner holistic clinic. Designed with organic color palettes, patient intake form integration, and digital gift card sales.',
    technologies: ['Squarespace 7.1', 'Acuity Scheduling', 'Member Areas', 'Custom CSS Styling'],
    metrics: [
      { label: 'Online Bookings', value: '92% of total' },
      { label: 'Admin Time Saved', value: '15 hrs/wk' }
    ],
    featured: false,
    liveUrl: 'https://squarespace.com',
    deliverables: ['Squarespace Setup', 'Acuity Booking System', 'Intake Forms', 'Member Portal']
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'wp-design',
    title: 'WordPress Website Design & Development',
    platformBadge: 'WordPress',
    iconName: 'Globe',
    shortDesc: 'Bespoke, scalable WordPress websites built with custom Elementor Pro, Gutenberg, or custom themes tailored to your exact business goals.',
    features: [
      'Custom theme & layout design',
      'Elementor Pro / Gutenberg block building',
      'WooCommerce e-commerce capabilities',
      'ACF (Advanced Custom Fields) architecture',
      'Plugin auditing & lightweight setup'
    ],
    popularFor: 'Growing businesses, e-commerce stores, SaaS, and content-rich sites.',
    typicalTimeline: '3 - 6 Weeks'
  },
  {
    id: 'sq-design',
    title: 'Squarespace Website Design',
    platformBadge: 'Squarespace',
    iconName: 'Layout',
    shortDesc: 'Sleek, award-winning Squarespace websites utilizing Fluid Engine and custom CSS/JS injection for an effortless, low-maintenance client experience.',
    features: [
      'Squarespace 7.1 & Fluid Engine customization',
      'Custom CSS & JavaScript enhancements',
      'Acuity scheduling & Member Area setup',
      'E-commerce & digital product stores',
      'Comprehensive recorded video training'
    ],
    popularFor: 'Creatives, boutique agencies, consultants, studios, and service providers.',
    typicalTimeline: '2 - 4 Weeks'
  },
  {
    id: 'redesign',
    title: 'Website Redesign & Modernization',
    platformBadge: 'Universal',
    iconName: 'RefreshCw',
    shortDesc: 'Transform your outdated website into a modern, mobile-first conversion engine with refreshed UI, faster load times, and better navigation.',
    features: [
      'Full UI/UX audit & strategy session',
      'Mobile-first responsive overhaul',
      '301 SEO redirects to protect rankings',
      'Copy structure & conversion funnel tune-up',
      'Modern typography & visual refresh'
    ],
    popularFor: 'Businesses with aging sites that aren’t converting or reflecting their current brand.',
    typicalTimeline: '2 - 4 Weeks'
  },
  {
    id: 'landing-page',
    title: 'High-Converting Landing Pages',
    platformBadge: 'Universal',
    iconName: 'Zap',
    shortDesc: 'Single-page powerhouses designed specifically for ad campaigns, product launches, lead generation, or event signups.',
    features: [
      'Conversion-focused layout hierarchy',
      'Interactive pricing & feature tables',
      'Fast-loading GSAP micro-animations',
      'CRM & email marketing integration (Klaviyo, Mailchimp)',
      'A/B testing ready setup'
    ],
    popularFor: 'Product launches, marketing campaigns, event registrations, and lead magnets.',
    typicalTimeline: '1 - 2 Weeks'
  },
  {
    id: 'maintenance',
    title: 'Website Maintenance & Security',
    platformBadge: 'WordPress',
    iconName: 'ShieldCheck',
    shortDesc: 'Worry-free ongoing website management. Keeps your WordPress or Squarespace site updated, secure, backed up, and running at top performance.',
    features: [
      'Weekly/Monthly plugin & core updates',
      'Daily cloud backups & instant restore',
      'Uptime & malware security monitoring',
      'Emergency bug fixes & design tweaks',
      'Monthly performance report'
    ],
    popularFor: 'Busy business owners who want total peace of mind without technical headaches.',
    typicalTimeline: 'Ongoing Monthly Plan'
  },
  {
    id: 'speed-optimization',
    title: 'Website Speed & Core Web Vitals Optimization',
    platformBadge: 'Universal',
    iconName: 'Gauge',
    shortDesc: 'Pass Google Core Web Vitals with flying colors. We optimize assets, database queries, caching, and CDN routing for sub-second speeds.',
    features: [
      'PageSpeed Insights score boost (90+)',
      'Image & asset compression (WebP/AVIF)',
      'Advanced caching (WP Rocket, Redis, CDN)',
      'Database cleanup & JS/CSS minification',
      'Google Lighthouse audit report'
    ],
    popularFor: 'Sites suffering from slow load times, poor mobile performance, or SEO penalties.',
    typicalTimeline: '3 - 5 Days'
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: 'WordPress', level: 98, category: 'Platforms & Builders', icon: 'Wordpress', experience: '3+ Years' },
  { name: 'Squarespace 7.1 & Fluid Engine', level: 96, category: 'Platforms & Builders', icon: 'Box', experience: '3+ Years' },
  { name: 'Elementor Pro', level: 95, category: 'Platforms & Builders', icon: 'Layers', experience: '3+ Years' },
  { name: 'WooCommerce & E-Commerce', level: 92, category: 'Platforms & Builders', icon: 'ShoppingBag', experience: '3+ Years' },
  { name: 'HTML5 & CSS3 / Modern CSS', level: 98, category: 'Design & Frontend', icon: 'Code', experience: '3+ Years' },
  { name: 'JavaScript & GSAP Animations', level: 90, category: 'Design & Frontend', icon: 'Sparkles', experience: '3+ Years' },
  { name: 'Tailwind CSS & Utility Frameworks', level: 92, category: 'Design & Frontend', icon: 'Palette', experience: '3+ Years' },
  { name: 'Responsive UI/UX Design', level: 99, category: 'Design & Frontend', icon: 'Smartphone', experience: '3+ Years' },
  { name: 'SEO & Schema Markup', level: 92, category: 'Performance & Strategy', icon: 'Search', experience: '3+ Years' },
  { name: 'Website Speed & Core Web Vitals', level: 96, category: 'Performance & Strategy', icon: 'Zap', experience: '3+ Years' },
  { name: 'Acuity Scheduling & Member Areas', level: 94, category: 'Platforms & Builders', icon: 'Calendar', experience: '3+ Years' },
  { name: 'Figma to WordPress/Squarespace', level: 98, category: 'Design & Frontend', icon: 'Figma', experience: '3+ Years' }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Sarah Jenkins',
    role: 'Creative Director',
    company: 'Luminary Brand Studio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    content: 'Daniel is an absolute wizard with both WordPress and Squarespace. He took our Figma designs and built a pixel-perfect Squarespace site with custom CSS interactions that blew our team away.',
    platformUsed: 'Squarespace',
    projectType: 'Agency Website & Portfolio'
  },
  {
    id: 't2',
    clientName: 'Marcus Thorne',
    role: 'Co-Founder & CMO',
    company: 'Aetheria Goods',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    content: 'Our WooCommerce store was sluggish and losing sales. Daniel overhauled our WordPress setup, optimized our speed, and redesigned our checkout. Our sales skyrocketed 215% in two months!',
    platformUsed: 'WordPress',
    projectType: 'WooCommerce Redesign'
  },
  {
    id: 't3',
    clientName: 'Victoria Rostova',
    role: 'Managing Director',
    company: 'Vanguard Legal Group',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    content: 'Fast, professional, and extraordinarily attentive to detail. Daniel guided us on when to choose Squarespace versus WordPress, saving us thousands in unnecessary maintenance costs.',
    platformUsed: 'Squarespace',
    projectType: 'Corporate Web Redesign'
  },
  {
    id: 't4',
    clientName: 'David Chen',
    role: 'Head of Growth',
    company: 'SaaSFlow Systems',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    content: 'The GSAP animations and sleek landing page Daniel built on WordPress helped us convert 18% of traffic during our product launch. His technical skill and design sense are world-class.',
    platformUsed: 'WordPress',
    projectType: 'Product Launch Landing Page'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery & Strategy',
    tagline: 'Understanding Your Brand & Goals',
    description: 'We begin with a deep dive into your business, brand identity, target audience, and functional needs. We decide whether WordPress or Squarespace is the optimal platform for your long-term growth.',
    deliverables: ['Design Brief & Sitemap', 'Platform Recommendation', 'Wireframe Sketches', 'Project Roadmap'],
    duration: '3 - 5 Days',
    iconName: 'Compass'
  },
  {
    stepNumber: '02',
    title: 'UX & Architecture',
    tagline: 'Wireframes & Conversion Pathways',
    description: 'We map out user flows, content hierarchy, and key calls-to-action to ensure visitors seamlessly convert into inquiries or buyers.',
    deliverables: ['Interactive Figma Prototypes', 'Content Structure Guide', 'Mobile Layout Blueprints'],
    duration: '1 Week',
    iconName: 'LayoutGrid'
  },
  {
    stepNumber: '03',
    title: 'Visual Design',
    tagline: 'High-End Aesthetic & Brand Expression',
    description: 'Crafting custom visual designs with refined typography, bespoke color palettes, high-resolution media, and subtle micro-interactions.',
    deliverables: ['Full Page UI Mockups', 'Custom Graphics & Assets', 'Typography & Color Specs'],
    duration: '1 - 2 Weeks',
    iconName: 'Palette'
  },
  {
    stepNumber: '04',
    title: 'Development & Build',
    tagline: 'Clean Code & Platform Customization',
    description: 'Bringing the design to life on WordPress or Squarespace. Writing custom CSS/JS, setting up Elementor or Fluid Engine, configuring e-commerce, and embedding third-party tools.',
    deliverables: ['Functional Staging Site', 'Custom Plugins/CSS', 'E-Commerce/Booking Integrations'],
    duration: '1 - 3 Weeks',
    iconName: 'Code'
  },
  {
    stepNumber: '05',
    title: 'Testing & Launch',
    tagline: 'Speed, SEO & Cross-Browser QA',
    description: 'Rigorous testing on mobile, tablet, and desktop browsers. We execute 301 redirects, speed optimization, Google Analytics/Search Console setup, and push live!',
    deliverables: ['Live Website Deployment', 'Speed Audit (90+ Scores)', 'SEO Schema Validation', '301 Redirect Check'],
    duration: '3 - 5 Days',
    iconName: 'Rocket'
  },
  {
    stepNumber: '06',
    title: 'Client Empowerment & Support',
    tagline: 'Video Tutorials & 30-Day Care',
    description: 'You get full ownership. I provide custom recorded video tutorials so you or your team can easily update text, add blog posts, or manage products. Plus 30 days of complimentary support.',
    deliverables: ['Loom Video Training Library', 'Admin Access Transfer', '30-Day Free Warranty', 'Maintenance Plan Option'],
    duration: '30 Days Post-Launch',
    iconName: 'HeartHandshake'
  }
];

export const PERSONAL_INFO = {
  name: 'Daniel Esther',
  logoUrl: 'https://res.cloudinary.com/v5y8qj7h/image/upload/v1785806485/ChatGPT_Image_Aug_4_2026_02_16_51_AM_qb6txt.png',
  role: 'WordPress & Squarespace Designer & Developer',
  tagline: 'Crafting Bespoke, High-Converting Web Experiences with Precision & Style.',
  bio: 'With over 3 years of hands-on experience, I help ambitious brands, agencies, and entrepreneurs build high-impact websites that combine award-winning visual design with technical excellence.',
  experienceYears: '3+',
  projectsCompleted: '150+',
  satisfactionRate: '99.4%',
  email: 'danielkemisola506@gmail.com',
  phone: '+2348130051246',
  whatsapp: 'https://wa.me/2348130051246',
  location: 'Available Worldwide',
  availability: '🟢 Accepting New Projects for Q3/Q4',
  social: {
    dribbble: 'https://dribbble.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    behance: 'https://behance.net',
    instagram: 'https://instagram.com'
  }
};
