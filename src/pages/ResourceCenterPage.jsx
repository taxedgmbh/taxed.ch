import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Download, 
  FileText, 
  CheckSquare, 
  FileSpreadsheet, 
  Calendar,
  Building2,
  PiggyBank,
  Home,
  TrendingUp,
  Users,
  Mail,
  ArrowRight,
  Star,
  Clock,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ResourceCenterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [downloadedResources, setDownloadedResources] = useState([]);

  const handleDownload = (resourceId, resourceName) => {
    // Simulate download and track
    setDownloadedResources(prev => [...prev, resourceId]);
    
    // In a real implementation, this would trigger an actual download
    // and potentially send the email to your CRM
    if (email && name) {
      // Integration point for email service or CRM
    }
    
    // Show success message
    alert(`Thank you! ${resourceName} is being prepared for download.`);
  };

  const handleEmailSignup = (e) => {
    e.preventDefault();
    if (email && name) {
      alert('Thank you for subscribing! You\'ll receive our latest tax resources and updates.');
      setEmail('');
      setName('');
    }
  };

  const taxGuides = [
    {
      id: 'swiss-tax-guide-2025',
      title: 'Complete Swiss Tax Guide 2025',
      description: 'Comprehensive guide covering all aspects of Swiss taxation including federal, cantonal, and communal taxes.',
      category: 'Tax Guide',
      icon: FileText,
      downloads: 1247,
      rating: 4.8,
      size: '2.3 MB',
      featured: true,
      tags: ['Federal Tax', 'Cantonal Tax', 'Communal Tax', 'Deductions']
    },
    {
      id: 'expat-tax-guide',
      title: 'Expat Tax Guide for Switzerland',
      description: 'Essential information for expatriates living and working in Switzerland, including tax treaties and obligations.',
      category: 'Tax Guide',
      icon: Users,
      downloads: 892,
      rating: 4.7,
      size: '1.8 MB',
      featured: true,
      tags: ['Expatriates', 'Tax Treaties', 'Residence', 'Work Permits']
    },
    {
      id: 'business-tax-guide',
      title: 'Swiss Business Tax Guide',
      description: 'Complete guide to business taxation in Switzerland, including corporate tax, VAT, and business deductions.',
      category: 'Tax Guide',
      icon: Building2,
      downloads: 654,
      rating: 4.6,
      size: '3.1 MB',
      featured: false,
      tags: ['Corporate Tax', 'VAT', 'Business Deductions', 'Compliance']
    },
    {
      id: 'wealth-tax-guide',
      title: 'Wealth Tax Optimization Guide',
      description: 'Strategies and tips for optimizing wealth tax obligations across different Swiss cantons.',
      category: 'Tax Guide',
      icon: TrendingUp,
      downloads: 445,
      rating: 4.5,
      size: '1.5 MB',
      featured: false,
      tags: ['Wealth Tax', 'Optimization', 'Cantonal Rates', 'Planning']
    }
  ];

  const checklists = [
    {
      id: 'tax-return-checklist',
      title: 'Swiss Tax Return Checklist',
      description: 'Step-by-step checklist to ensure you have all required documents for your Swiss tax return.',
      category: 'Checklist',
      icon: CheckSquare,
      downloads: 2156,
      rating: 4.9,
      size: '0.8 MB',
      featured: true,
      tags: ['Tax Return', 'Documents', 'Deadlines', 'Compliance']
    },
    {
      id: 'business-startup-checklist',
      title: 'Business Startup Tax Checklist',
      description: 'Essential tax considerations and requirements when starting a business in Switzerland.',
      category: 'Checklist',
      icon: Building2,
      downloads: 789,
      rating: 4.7,
      size: '1.2 MB',
      featured: false,
      tags: ['Business Startup', 'Registration', 'VAT', 'Corporate Tax']
    },
    {
      id: 'expat-checklist',
      title: 'Expat Tax Compliance Checklist',
      description: 'Comprehensive checklist for expatriates to ensure full tax compliance in Switzerland.',
      category: 'Checklist',
      icon: Users,
      downloads: 567,
      rating: 4.6,
      size: '1.0 MB',
      featured: false,
      tags: ['Expatriates', 'Compliance', 'Residence', 'Obligations']
    },
    {
      id: 'year-end-checklist',
      title: 'Year-End Tax Planning Checklist',
      description: 'Essential year-end tax planning steps to optimize your tax position for the coming year.',
      category: 'Checklist',
      icon: Calendar,
      downloads: 1234,
      rating: 4.8,
      size: '0.9 MB',
      featured: true,
      tags: ['Year-End', 'Planning', 'Optimization', 'Deadlines']
    }
  ];

  const templates = [
    {
      id: 'expense-tracker',
      title: 'Tax Deductible Expense Tracker',
      description: 'Excel template to track and categorize tax-deductible expenses throughout the year.',
      category: 'Template',
      icon: FileSpreadsheet,
      downloads: 1890,
      rating: 4.8,
      size: '0.5 MB',
      featured: true,
      tags: ['Expenses', 'Tracking', 'Deductions', 'Excel']
    },
    {
      id: 'income-tracker',
      title: 'Income and Revenue Tracker',
      description: 'Comprehensive template to track all income sources and revenue streams for tax purposes.',
      category: 'Template',
      icon: FileSpreadsheet,
      downloads: 1456,
      rating: 4.7,
      size: '0.6 MB',
      featured: false,
      tags: ['Income', 'Revenue', 'Tracking', 'Excel']
    },
    {
      id: 'investment-tracker',
      title: 'Investment Portfolio Tracker',
      description: 'Template to track investment income, capital gains, and wealth tax calculations.',
      category: 'Template',
      icon: TrendingUp,
      downloads: 678,
      rating: 4.6,
      size: '0.7 MB',
      featured: false,
      tags: ['Investments', 'Capital Gains', 'Wealth Tax', 'Portfolio']
    },
    {
      id: 'real-estate-tracker',
      title: 'Real Estate Tax Tracker',
      description: 'Template for tracking real estate income, expenses, and tax calculations.',
      category: 'Template',
      icon: Home,
      downloads: 432,
      rating: 4.5,
      size: '0.8 MB',
      featured: false,
      tags: ['Real Estate', 'Property Tax', 'Rental Income', 'Expenses']
    }
  ];

  const allResources = [...taxGuides, ...checklists, ...templates];

  const ResourceCard = ({ resource }) => {
    const IconComponent = resource.icon;
    const isDownloaded = downloadedResources.includes(resource.id);

    return (
      <Card className={`h-full transition-all duration-300 hover:shadow-lg ${resource.featured ? 'ring-2 ring-steel-blue' : ''}`}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${resource.featured ? 'bg-steel-blue text-white' : 'bg-gray-100 text-gray-600'}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <Badge variant={resource.featured ? "default" : "secondary"} className="mb-2">
                  {resource.category}
                </Badge>
                {resource.featured && (
                  <Badge variant="outline" className="ml-2 border-yellow-400 text-yellow-600">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>{resource.downloads}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{resource.rating}</span>
              </div>
            </div>
          </div>
          <CardTitle className="text-lg font-semibold text-dark-gray mt-3">
            {resource.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {resource.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {resource.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>{resource.size}</span>
              </span>
            </div>
            <Button 
              onClick={() => handleDownload(resource.id, resource.title)}
              className={`${isDownloaded ? 'bg-green-600 hover:bg-green-700' : 'bg-steel-blue hover:bg-steel-blue/90'} text-white`}
              size="sm"
            >
              {isDownloaded ? 'Downloaded' : 'Download'}
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Helmet>
        <title>Resource Center - Free Swiss Tax Guides & Templates | Taxed GmbH</title>
        <meta name="description" content="Download free Swiss tax guides, checklists, and templates. Expert resources for individuals and businesses in Switzerland." />
        <meta name="keywords" content="Swiss tax guides, tax templates, tax checklists, free downloads, Switzerland taxation" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-steel-blue to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Swiss Tax Resource Center
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Free expert guides, checklists, and templates to help you navigate Swiss taxation with confidence
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                  <Download className="w-4 h-4" />
                  <span>Free Downloads</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4" />
                  <span>Expert Quality</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>Updated 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Email Signup Section */}
          <Card className="max-w-2xl mx-auto mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-dark-gray mb-2">
                  Get Latest Tax Resources
                </h2>
                <p className="text-gray-600">
                  Subscribe to receive new guides, updates, and exclusive tax tips directly to your inbox.
                </p>
              </div>
              
              {/* HubSpot Newsletter Signup Form */}
              <div className="hubspot-newsletter-container">
                <iframe 
                  src="https://share-eu1.hsforms.com/1uITtAEHOS8OOaBP67HZnYQ2ds4ox"
                  width="100%"
                  height="350"
                  frameBorder="0"
                  scrolling="no"
                  title="Taxed GmbH Newsletter Signup - Resources"
                  className="border-0 rounded-lg"
                  style={{ minHeight: '350px' }}
                />
              </div>
              <div className="text-center mt-4">
                <Button 
                  onClick={() => {
                    const subject = encodeURIComponent('Resource Center Inquiry');
                    const body = encodeURIComponent("Hello Taxed GmbH,\n\nI'm interested in your tax resources and guides. Could you please send me more information?");
                    const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;
                    window.open(emailUrl, '_blank');
                  }}
                  className="bg-gradient-to-r from-steel-blue to-blue-600 hover:from-steel-blue/90 hover:to-blue-600/90 text-white font-semibold py-3"
                >
                  Or Contact Us Directly
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Featured Resources */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-dark-gray mb-8 text-center">
              Featured Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allResources.filter(r => r.featured).map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>

          {/* Tax Guides Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-dark-gray mb-8 text-center">
              Tax Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {taxGuides.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>

          {/* Checklists Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-dark-gray mb-8 text-center">
              Tax Checklists
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {checklists.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>

          {/* Templates Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-dark-gray mb-8 text-center">
              Tax Templates
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-steel-blue to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need Professional Tax Advice?
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Our expert team is ready to help you with personalized tax planning and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-steel-blue"
                  size="lg"
                >
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-steel-blue"
                  size="lg"
                >
                  Contact Us
                  <Mail className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ResourceCenterPage;
