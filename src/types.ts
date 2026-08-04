export type ThemeMode = 'light' | 'dark';

export interface Project {
  id: string;
  title: string;
  client: string;
  industry: string;
  platform: 'WordPress' | 'Squarespace' | 'Both';
  category: 'WordPress' | 'Squarespace' | 'E-Commerce' | 'Landing Page';
  image: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  featured: boolean;
  liveUrl?: string;
  deliverables: string[];
  clientQuote?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface Service {
  id: string;
  title: string;
  platformBadge: 'WordPress' | 'Squarespace' | 'Universal';
  iconName: string;
  shortDesc: string;
  features: string[];
  popularFor: string;
  typicalTimeline: string;
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
  category: 'Platforms & Builders' | 'Design & Frontend' | 'Performance & Strategy';
  icon: string;
  experience: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  platformUsed: 'WordPress' | 'Squarespace';
  projectType: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  duration: string;
  iconName: string;
}

export interface EstimatorAnswer {
  platformNeeded: 'wordpress' | 'squarespace' | 'unsure';
  siteType: 'business' | 'ecommerce' | 'portfolio' | 'landing' | 'custom';
  pagesCount: '1-5' | '5-15' | '15+';
  budgetRange: '$1.5k-$3k' | '$3k-$6k' | '$6k+';
}
