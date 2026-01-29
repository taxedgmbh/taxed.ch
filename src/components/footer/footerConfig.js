import { Linkedin, Twitter, Facebook, Instagram, Award, Shield } from 'lucide-react';

export const footerSections = [
  {
    title: "Services",
    links: [
      { name: "Individual Tax Returns", href: "/services", description: "Personal tax filing for expats" },
      { name: "Quellensteuer Adjustments", href: "/services", description: "Withholding tax corrections" },
      { name: "International Income", href: "/services", description: "Cross-border income reporting" },
      { name: "Tax Planning", href: "/services", description: "Strategic tax optimization" },
      { name: "Client Portal", href: "/client-portal", description: "Secure client access" },
      { name: "Advanced Tax Tools", href: "/advanced-tax-tools", description: "Professional analysis tools" },
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Tax Calculators", href: "/calculators", description: "Free Swiss tax calculators" },
      { name: "Resource Center", href: "/resources", description: "Guides, checklists & templates" },
      { name: "News & Updates", href: "/news", description: "Latest Swiss tax news" },
      { name: "Law Section", href: "/law", description: "Legal documents & regulations" },
      { name: "Blog", href: "/blog", description: "Expert insights & tips" },
      { name: "FAQ", href: "/faq", description: "Frequently asked questions" },
      { name: "Tax Deadlines", href: "/tax-deadlines", description: "Swiss tax deadline calendar" },
      { name: "Expat Tax Guide", href: "/expat-tax-guide", description: "Complete expat tax guide" },
      { name: "Tax Planning Guide", href: "/tax-planning-guide", description: "Tax planning strategies" },
      { name: "Tax Updates", href: "/tax-updates", description: "Latest tax law changes" },
      { name: "Tax Webinars", href: "/webinars", description: "Educational tax webinars" },
      { name: "Tax Events", href: "/events", description: "Tax seminars & workshops" },
    ]
  },
  {
    title: "Experience",
    links: [
      { name: "Case Studies", href: "/case-studies", description: "Client success stories" },
      { name: "Our Team", href: "/team", description: "Meet our tax experts" },
      { name: "Industry Specializations", href: "/industry-specializations", description: "Sector expertise" },
      { name: "Advanced Tax Tools", href: "/advanced-tax-tools", description: "Professional analysis tools" },
      { name: "Client Testimonials", href: "/testimonials", description: "Client success stories" },
      { name: "Business Tax Guide", href: "/business-tax-guide", description: "Corporate tax guidance" },
      { name: "International Tax", href: "/international-tax", description: "Cross-border tax services" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about", description: "Our story & mission" },
      { name: "How It Works", href: "/how-it-works", description: "Our process explained" },
      { name: "Pricing", href: "/pricing", description: "Transparent flat-rate pricing" },
      { name: "Contact", href: "/contact", description: "Get in touch with us" },
      { name: "Careers", href: "/careers", description: "Join our team" },
      { name: "Tax Support", href: "/support", description: "Help center & support" },
      { name: "Tax Security", href: "/security", description: "Data protection & security" },
      { name: "Tax Technology", href: "/technology", description: "Digital tax solutions" },
      { name: "Tax Forms", href: "/tax-forms", description: "Downloadable tax forms" },
      { name: "Tax Glossary", href: "/tax-glossary", description: "Swiss tax terminology" },
    ]
  }
];

export const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/company/taxed-gmbh", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/taxed_gmbh", icon: Twitter },
  { name: "Facebook", href: "https://facebook.com/taxedgmbh", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/taxed_gmbh", icon: Instagram },
];

export const certifications = [
  { name: "Swiss Tax Expert", icon: Award },
  { name: "GDPR Compliant", icon: Shield },
  { name: "Data Protection", icon: Shield },
  { name: "Swiss Quality", icon: Award },
];

export default { footerSections, socialLinks, certifications };
