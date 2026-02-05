import { ResumeData, SectionConfig } from '@/types/portfolio';

export const portfolioData: ResumeData = {
  personalInfo: {
    name: 'Philip John Cerbas',
    title: 'Full Stack Developer',
    email: 'pjc1john@gmail.com',
    phone: '09177503274',
    linkedin: '',
    github: '',
    location: 'Cadajug, Laua-an, Antique, Philippines',
    summary:
      'Philip John Cerbas is an experienced Full Stack Developer specializing in Laralve, VueJs, WordPress, WooCommerce, and full-stack web applications. His expertise lies in web development, server management, and software designing, with a keen ability to solve complex system flows and deliver high-quality projects.',
  },
  experience: [
    {
      title: 'Full Stack Developer',
      company: 'BuiltMighty',
      dates: 'June 2023 – January 2026',
      description:
        'Managed Clients WordPress/WooCommerce sites, developed LARAVEL-VUEJS applications, and implemented Docker-based containerization.',
      highlights: [
        'Integrated APIs with QuickBooks and Slack',
        'Developed Chrome App Extension',
        'Staging and Production deployments through KINSTA, Digital Ocean, CloudWays',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'WarpVisions Information System Services',
      dates: 'November 2017 – May 2023',
      description:
        'Lead Developer for Trademaster, managing sales and inventory data collection for UNAHCO agents.',
      highlights: [
        'Back-end developer using CodeIgniter',
        'Server Administrator for dedicated Linux server',
      ],
    },
    {
      title: 'Full Stack Developer (Freelance)',
      company: 'Stallion Express',
      dates: 'May 2020 – November 2022',
      description:
        "Developed a Database scrambler and contributed to 'Kaddy Connect' and 'Cybermate' projects.",
      highlights: ['Sole Developer of subscription-based Cybermate program'],
    },
    {
      title: 'Full Stack Developer (Freelance)',
      company: 'Stallion Express',
      dates: 'November 2017 – September 2018',
      description:
        'Involved in AWS server migrations and the development of shipping platform version 2.',
      highlights: [
        'Managed domains in AWS LightSail',
        "Used MVC Framework 'Laravel' and 'VueJs'",
      ],
    },
    {
      title: 'WEB DEVELOPER / I.T. ADMINISTRATOR',
      company: 'Hack and Hustle Inc.',
      dates: 'April 2013 – Dec 2016',
      description: 'Led B2B Systems development and managed web servers.',
      highlights: [
        'Team Leader for web development projects',
        'Taught newly hired developers in PHP, MYSQL, HTML, etc.',
      ],
    },
    {
      title: 'College Instructor',
      company: 'AMA Computer College ILOILO Campus',
      dates: 'June 2011 – December 2012',
      description:
        'Taught courses in Web Development, Database Management, and Server/Network Management.',
      highlights: [
        'IT organization adviser',
        'Led program development for various competitions',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Information Technology',
      institution: 'AMA Computer College',
      years: '2007-2011',
      gpa: '',
    },
  ],
  skills: {
    frontend: [],
    backend: [],
    devops: [],
    additional: [],
  },
  projects: [
    {
      name: 'Pawnshop Management System (Villarica Pawnshop)',
      description:
        'A cloud-based application for managing entire pawning cycle from New Loan, Renewal, and Redemption.',
      technologies: ['Cloud-based technology'],
      link: '',
      github: '',
    },
    {
      name: 'Inventory Management System (Beyond the Box)',
      description:
        'A cloud-based application intended to manage and organize products and inventories.',
      technologies: ['Cloud-based technology'],
      link: '',
      github: '',
    },
  ],
};

export const sectionConfig: SectionConfig = {
  hero: 'floating-shapes',
  about: 'modern',
  experience: 'detailed',
  projects: 'showcase',
  skills: 'categories',
  skillsDisplay: 'hero',
  contact: 'card',
  colorPalette: 'indigo',
};
