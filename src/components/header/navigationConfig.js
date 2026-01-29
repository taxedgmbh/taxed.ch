/**
 * Navigation configuration for the header
 */

export const navigation = [
  {
    name: 'Services',
    type: 'mega',
    items: [
      {
        title: 'Core Services',
        items: [
          { name: 'How It Works', href: '/how-it-works', description: 'Learn about our process' },
          { name: 'Our Services', href: '/services', description: 'Comprehensive tax solutions' },
          { name: 'Pricing & Packages', href: '/pricing', description: 'Transparent pricing' },
          { name: 'Client Portal', href: '/client-portal', description: 'Secure client access' },
          { name: 'Tax Support', href: '/support', description: 'Help center & support' },
          { name: 'Tax Security', href: '/security', description: 'Data protection & security' },
        ]
      },
      {
        title: 'Expertise & Insights',
        items: [
          { name: 'Case Studies', href: '/case-studies', description: 'Client success stories' },
          { name: 'About Our Team', href: '/about', description: 'Meet our tax experts' },
          { name: 'Industry Specializations', href: '/industry-specializations', description: 'Sector-specific expertise' },
          { name: 'Advanced Tax Tools', href: '/advanced-tax-tools', description: 'Professional analysis tools' },
          { name: 'Client Testimonials', href: '/testimonials', description: 'Client success stories' },
          { name: 'Business Tax Guide', href: '/business-tax-guide', description: 'Corporate tax guidance' },
          { name: 'International Tax', href: '/international-tax', description: 'Cross-border tax services' },
        ]
      },
      {
        title: 'Tools & Resources',
        items: [
          { name: 'Tax Calculators', href: '/calculators', description: 'Free Swiss tax calculators' },
          { name: 'Resource Center', href: '/resources', description: 'Guides, checklists & templates' },
          { name: 'News & Updates', href: '/news', description: 'Latest Swiss tax news' },
          { name: 'Law Section', href: '/law', description: 'Legal documents & regulations' },
          { name: 'Tax Deadlines', href: '/tax-deadlines', description: 'Swiss tax deadline calendar' },
          { name: 'Tax Forms', href: '/tax-forms', description: 'Downloadable tax forms' },
          { name: 'Tax Technology', href: '/technology', description: 'Digital tax solutions' },
          { name: 'Tax Glossary', href: '/tax-glossary', description: 'Swiss tax terminology' },
        ]
      },
      {
        title: 'Shop',
        items: [
          { name: 'All Packages', href: '/store', description: 'Browse all services' },
          { name: 'Tax Consultations', href: '/store', description: 'Professional advice' },
        ]
      }
    ],
  },
  {
    name: 'About Us',
    type: 'link',
    href: '/about',
  },
  { name: 'Blog', href: '/blog', type: 'link' },
  { name: 'Forum', href: '/forum', type: 'link' },
  { name: 'Contact', href: '/contact', type: 'link' },
];

export default navigation;
