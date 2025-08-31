import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Map, Home, FileText, Calculator, Newspaper, Settings, Users, Mail, Shield, Globe } from 'lucide-react';

const SitemapPage = () => {
  const sitemapSections = [
    {
      title: "Main Pages",
      icon: Home,
      pages: [
        { name: "Home", path: "/", description: "Welcome to Taxed GmbH" },
        { name: "About Us", path: "/about", description: "Learn about our company" },
        { name: "How It Works", path: "/how-it-works", description: "Our process explained" },
        { name: "Services", path: "/services", description: "Our tax consulting services" },
        { name: "Pricing", path: "/pricing", description: "Transparent pricing plans" },
        { name: "Contact", path: "/contact", description: "Get in touch with us" },
      ]
    },
    {
      title: "Expertise & Insights",
      icon: Users,
      pages: [
        { name: "Client Portal", path: "/client-portal", description: "Secure client access" },
        { name: "Case Studies", path: "/case-studies", description: "Client success stories" },
        { name: "Our Team", path: "/team", description: "Meet our tax experts" },
        { name: "Industry Specializations", path: "/industry-specializations", description: "Sector expertise" },
        { name: "Advanced Tax Tools", path: "/advanced-tax-tools", description: "Professional analysis tools" },
      ]
    },
    {
      title: "Tools & Resources",
      icon: Calculator,
      pages: [
        { name: "Tax Calculators", path: "/calculators", description: "Free Swiss tax calculators" },
        { name: "Resource Center", path: "/resources", description: "Guides, checklists & templates" },
        { name: "News & Updates", path: "/news", description: "Latest Swiss tax news" },
        { name: "Law Section", path: "/law", description: "Legal documents & regulations" },
        { name: "Blog", path: "/blog", description: "Expert insights & tips" },
      ]
    },
    {
      title: "Legal & Compliance",
      icon: Shield,
      pages: [
        { name: "Impressum", path: "/impressum", description: "Legal company information" },
        { name: "Privacy Policy", path: "/privacy", description: "Data protection information" },
        { name: "Terms of Service", path: "/terms", description: "Terms and conditions" },
        { name: "Cookie Policy", path: "/cookies", description: "Cookie usage information" },
        { name: "Accessibility", path: "/accessibility", description: "Accessibility information" },
      ]
    },
    {
      title: "Additional Pages",
      icon: FileText,
      pages: [
        { name: "FAQ", path: "/faq", description: "Frequently asked questions" },
        { name: "Careers", path: "/careers", description: "Job opportunities" },
        { name: "Sitemap", path: "/sitemap", description: "Complete site structure" },
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap - Taxed GmbH | Swiss Tax Consulting</title>
        <meta name="description" content="Complete sitemap of Taxed GmbH website. Find all pages and sections of our Swiss tax consulting services." />
        <meta name="keywords" content="sitemap, website structure, navigation, Taxed GmbH, Swiss tax consulting" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sitemap</h1>
            <p className="text-gray-600">Complete website structure and navigation</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Map className="h-8 w-8 text-steel-blue mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Website Structure</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  This sitemap provides a complete overview of all pages and sections available on the Taxed GmbH website. 
                  Use this guide to navigate our services and find the information you need.
                </p>
                
                <p className="text-gray-700 mb-4">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </section>

            {/* Sitemap Sections */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Pages</h2>
              
              <div className="space-y-8">
                {sitemapSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <section.icon className="h-6 w-6 text-steel-blue mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.pages.map((page, pageIndex) => (
                        <div key={pageIndex} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0 w-2 h-2 bg-steel-blue rounded-full mt-2"></div>
                          <div className="flex-1">
                            <Link 
                              to={page.path}
                              className="text-steel-blue hover:text-blue-600 font-medium hover:underline"
                            >
                              {page.name}
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">{page.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Navigation */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Navigation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-steel-blue to-blue-600 text-white rounded-lg p-6">
                  <Calculator className="h-8 w-8 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Tax Tools</h3>
                  <p className="text-sm mb-4">Access our free Swiss tax calculators and planning tools</p>
                  <Link to="/calculators" className="text-sm font-medium hover:underline">
                    Try Calculators →
                  </Link>
                </div>
                
                <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-6">
                  <FileText className="h-8 w-8 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Resources</h3>
                  <p className="text-sm mb-4">Download tax guides, checklists, and templates</p>
                  <Link to="/resources" className="text-sm font-medium hover:underline">
                    Browse Resources →
                  </Link>
                </div>
                
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg p-6">
                  <Newspaper className="h-8 w-8 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Latest News</h3>
                  <p className="text-sm mb-4">Stay updated with Swiss tax news and changes</p>
                  <Link to="/news" className="text-sm font-medium hover:underline">
                    Read News →
                  </Link>
                </div>
              </div>
            </section>

            {/* Services Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Services</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Individual Tax Services</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Personal tax return preparation</li>
                      <li>• Quellensteuer (withholding tax) adjustments</li>
                      <li>• International income reporting</li>
                      <li>• Tax planning and optimization</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Digital Platform</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Secure online filing</li>
                      <li>• Real-time status tracking</li>
                      <li>• Document management</li>
                      <li>• Mobile-friendly access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Mail className="h-5 w-5 text-steel-blue mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p>Email: info@taxed.ch</p>
                    <p>Phone: +41 79 910 77 87</p>
                    <p>Location: Biel/Bienne, Switzerland</p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Globe className="h-5 w-5 text-steel-blue mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Quick Links</h3>
                  </div>
                  <div className="space-y-2">
                    <Link to="/contact" className="block text-steel-blue hover:underline">Contact Form</Link>
                    <Link to="/pricing" className="block text-steel-blue hover:underline">View Pricing</Link>
                    <Link to="/services" className="block text-steel-blue hover:underline">Our Services</Link>
                    <Link to="/blog" className="block text-steel-blue hover:underline">Latest Blog Posts</Link>
                  </div>
                </div>
              </div>
            </section>

            {/* XML Sitemap */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">XML Sitemap</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  For search engines and developers, we also provide an XML sitemap:
                </p>
                <div className="flex items-center space-x-4">
                  <a 
                    href="/sitemap.xml" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-steel-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    View XML Sitemap
                  </a>
                  <span className="text-sm text-gray-500">Opens in new tab</span>
                </div>
              </div>
            </section>

            {/* Last Updated */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                This sitemap is automatically updated when new pages are added to the website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SitemapPage;
