// Portfolio section design variants
export type HeroVariant = 'interactive-boxes' | 'spotlight' | 'shiny-text' | 'floating-shapes' | 'animated-border' | 'falling-snow';
export type AboutVariant = 'simple' | 'split' | 'modern' | 'cards';
export type ExperienceVariant = 'cards' | 'list' | 'accordion' | 'detailed' | 'timeline' | 'chain';
export type ProjectsVariant = 'grid' | 'carousel' | 'masonry' | 'featured' | 'minimal' | 'showcase';
export type SkillsVariant = 'bars' | 'tags' | 'circular' | 'categories' | 'grid' | 'minimal';
export type ContactVariant = 'simple' | 'split' | 'card' | 'floating' | 'minimal' | 'modern';

export type SkillsDisplay = 'hero' | 'separate';

export type ColorPalette = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber' | 'slate' | 'cyan' | 'indigo' | 'orange' | 'teal';

// Pre-made templates
export type TemplateId = 'minimal' | 'creative' | 'corporate' | 'developer' | 'designer' | 'custom';

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  config: Omit<SectionConfig, 'colorPalette'>;
}

export const templates: Template[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design',
    config: { hero: 'interactive-boxes', about: 'simple', experience: 'list', projects: 'minimal', skills: 'minimal', skillsDisplay: 'separate', contact: 'minimal' }
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and expressive',
    config: { hero: 'spotlight', about: 'cards', experience: 'cards', projects: 'masonry', skills: 'circular', skillsDisplay: 'separate', contact: 'floating' }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional and structured',
    config: { hero: 'shiny-text', about: 'simple', experience: 'list', projects: 'grid', skills: 'bars', skillsDisplay: 'separate', contact: 'simple' }
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Tech-focused layout',
    config: { hero: 'floating-shapes', about: 'modern', experience: 'detailed', projects: 'showcase', skills: 'categories', skillsDisplay: 'hero', contact: 'card' }
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Visual and artistic',
    config: { hero: 'animated-border', about: 'split', experience: 'accordion', projects: 'featured', skills: 'tags', skillsDisplay: 'separate', contact: 'modern' }
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Build your own',
    config: { hero: 'falling-snow', about: 'simple', experience: 'cards', projects: 'grid', skills: 'tags', skillsDisplay: 'separate', contact: 'simple' }
  }
];

export interface SectionConfig {
  hero: HeroVariant;
  about: AboutVariant;
  experience: ExperienceVariant;
  projects: ProjectsVariant;
  skills: SkillsVariant;
  skillsDisplay: SkillsDisplay;
  contact: ContactVariant;
  colorPalette: ColorPalette;
}

// Dynamic skills - categories are determined by the resume content
// e.g., { "Frontend": ["React", "Vue"], "Accounting": ["QuickBooks", "SAP"] }
export type SkillsGrouped = Record<string, string[]>;

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    dates: string;
    description: string;
    highlights: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    years: string;
    gpa?: string;
  }>;
  skills: SkillsGrouped;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link: string;
    github?: string;
  }>;
}

export interface PortfolioTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export const defaultTheme: PortfolioTheme = {
  primary: '#2563eb',
  secondary: '#1e40af',
  background: '#ffffff',
  text: '#1f2937',
  accent: '#3b82f6',
};

export const defaultSectionConfig: SectionConfig = {
  hero: 'falling-snow',
  about: 'split',
  experience: 'timeline',
  projects: 'grid',
  skills: 'tags',
  skillsDisplay: 'separate',
  contact: 'simple',
  colorPalette: 'slate',
};
