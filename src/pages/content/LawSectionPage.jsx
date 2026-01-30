import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Scale, 
  Gavel,
  Calendar,
  MapPin,
  Users,
  Shield,
  Globe,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LawSectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const categories = [
    { id: 'all', name: 'All Documents', icon: FileText },
    { id: 'federal', name: 'Federal Law', icon: Shield },
    { id: 'cantonal', name: 'Cantonal Law', icon: MapPin },
    { id: 'treaties', name: 'Tax Treaties', icon: Globe },
    { id: 'regulations', name: 'Regulations', icon: Gavel },
    { id: 'guidelines', name: 'Guidelines', icon: BookOpen },
    { id: 'decisions', name: 'Court Decisions', icon: Scale },
    { id: 'updates', name: 'Recent Updates', icon: TrendingUp }
  ];

  const years = [
    { id: 'all', name: 'All Years' },
    { id: '2025', name: '2025' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' },
    { id: '2021', name: '2021' },
    { id: '2020', name: '2020' }
  ];

  const legalDocuments = [
    // Federal Laws
    {
      id: 1,
      title: "Federal Act on Direct Federal Tax (DBG)",
      category: "federal",
      year: "2024",
      description: "The main federal law governing direct federal taxation in Switzerland, including income tax and wealth tax.",
      type: "Federal Law",
      jurisdiction: "Switzerland",
      status: "Active",
      lastUpdated: "2024-01-15",
      tags: ["income tax", "wealth tax", "federal", "direct tax"],
      url: "https://www.fedlex.admin.ch/eli/cc/1990/2414_2414_2414/en",
      downloadUrl: "/documents/dbg-2024.pdf",
      importance: "high"
    },
    {
      id: 2,
      title: "Federal Act on Value Added Tax (MWSTG)",
      category: "federal",
      year: "2024",
      description: "Federal law regulating value added tax (VAT) in Switzerland, including rates, exemptions, and procedures.",
      type: "Federal Law",
      jurisdiction: "Switzerland",
      status: "Active",
      lastUpdated: "2024-02-20",
      tags: ["VAT", "value added tax", "federal", "indirect tax"],
      url: "https://www.fedlex.admin.ch/eli/cc/2009/758/en",
      downloadUrl: "/documents/mwstg-2024.pdf",
      importance: "high"
    },
    {
      id: 3,
      title: "Federal Act on Stamp Duties (StG)",
      category: "federal",
      year: "2023",
      description: "Federal law governing stamp duties on securities, insurance premiums, and other transactions.",
      type: "Federal Law",
      jurisdiction: "Switzerland",
      status: "Active",
      lastUpdated: "2023-12-10",
      tags: ["stamp duty", "securities", "insurance", "federal"],
      url: "https://www.fedlex.admin.ch/eli/cc/1973/1973_1973_1973/en",
      downloadUrl: "/documents/stg-2023.pdf",
      importance: "medium"
    },

    // Cantonal Laws
    {
      id: 4,
      title: "Bern Canton Tax Law (StG BE)",
      category: "cantonal",
      year: "2024",
      description: "Cantonal tax law for the Canton of Bern, including income tax, wealth tax, and real estate tax rates.",
      type: "Cantonal Law",
      jurisdiction: "Canton of Bern",
      status: "Active",
      lastUpdated: "2024-01-30",
      tags: ["cantonal", "bern", "income tax", "wealth tax"],
      url: "https://www.belex.syslaws.ch/frontend/versions/1234",
      downloadUrl: "/documents/stg-be-2024.pdf",
      importance: "high"
    },
    {
      id: 5,
      title: "Zurich Canton Tax Law (StG ZH)",
      category: "cantonal",
      year: "2024",
      description: "Cantonal tax law for the Canton of Zurich, including progressive tax rates and deductions.",
      type: "Cantonal Law",
      jurisdiction: "Canton of Zurich",
      status: "Active",
      lastUpdated: "2024-02-15",
      tags: ["cantonal", "zurich", "progressive tax", "deductions"],
      url: "https://www.zhlex.zh.ch/internet/justiz_inneres/zhlex/de/index.html",
      downloadUrl: "/documents/stg-zh-2024.pdf",
      importance: "high"
    },
    {
      id: 6,
      title: "Geneva Canton Tax Law (LIFD)",
      category: "cantonal",
      year: "2024",
      description: "Cantonal tax law for the Canton of Geneva, including specific provisions for international organizations.",
      type: "Cantonal Law",
      jurisdiction: "Canton of Geneva",
      status: "Active",
      lastUpdated: "2024-01-20",
      tags: ["cantonal", "geneva", "international", "organizations"],
      url: "https://ge.ch/legislation/rsg/f/s/rsg_a2_10.html",
      downloadUrl: "/documents/lifd-ge-2024.pdf",
      importance: "high"
    },

    // Tax Treaties
    {
      id: 7,
      title: "Switzerland-Germany Double Taxation Agreement",
      category: "treaties",
      year: "2023",
      description: "Comprehensive double taxation agreement between Switzerland and Germany, including provisions for income, capital gains, and pensions.",
      type: "Tax Treaty",
      jurisdiction: "Switzerland-Germany",
      status: "Active",
      lastUpdated: "2023-11-15",
      tags: ["tax treaty", "germany", "double taxation", "pensions"],
      url: "https://www.estv.admin.ch/estv/en/home/international-affairs/double-taxation-agreements.html",
      downloadUrl: "/documents/dta-ch-de-2023.pdf",
      importance: "high"
    },
    {
      id: 8,
      title: "Switzerland-France Double Taxation Agreement",
      category: "treaties",
      year: "2024",
      description: "Updated double taxation agreement between Switzerland and France, including frontier worker provisions.",
      type: "Tax Treaty",
      jurisdiction: "Switzerland-France",
      status: "Active",
      lastUpdated: "2024-01-10",
      tags: ["tax treaty", "france", "frontier workers", "border regions"],
      url: "https://www.estv.admin.ch/estv/en/home/international-affairs/double-taxation-agreements.html",
      downloadUrl: "/documents/dta-ch-fr-2024.pdf",
      importance: "high"
    },
    {
      id: 9,
      title: "Switzerland-USA Double Taxation Agreement",
      category: "treaties",
      year: "2023",
      description: "Double taxation agreement between Switzerland and the United States, including FATCA provisions.",
      type: "Tax Treaty",
      jurisdiction: "Switzerland-USA",
      status: "Active",
      lastUpdated: "2023-09-20",
      tags: ["tax treaty", "usa", "fatca", "information exchange"],
      url: "https://www.estv.admin.ch/estv/en/home/international-affairs/double-taxation-agreements.html",
      downloadUrl: "/documents/dta-ch-us-2023.pdf",
      importance: "high"
    },

    // Regulations
    {
      id: 10,
      title: "Federal Tax Administration Regulations (FTA)",
      category: "regulations",
      year: "2024",
      description: "Administrative regulations issued by the Federal Tax Administration for the implementation of federal tax laws.",
      type: "Administrative Regulation",
      jurisdiction: "Switzerland",
      status: "Active",
      lastUpdated: "2024-03-01",
      tags: ["administration", "regulations", "implementation", "federal"],
      url: "https://www.estv.admin.ch/estv/en/home.html",
      downloadUrl: "/documents/fta-regulations-2024.pdf",
      importance: "medium"
    },
    {
      id: 11,
      title: "Cantonal Tax Administration Guidelines",
      category: "regulations",
      year: "2024",
      description: "Guidelines for cantonal tax administrations on the uniform application of cantonal tax laws.",
      type: "Administrative Guideline",
      jurisdiction: "All Cantons",
      status: "Active",
      lastUpdated: "2024-02-28",
      tags: ["cantonal", "guidelines", "uniform application"],
      url: "https://www.estv.admin.ch/estv/en/home.html",
      downloadUrl: "/documents/cantonal-guidelines-2024.pdf",
      importance: "medium"
    },

    // Guidelines
    {
      id: 12,
      title: "Expat Tax Filing Guidelines",
      category: "guidelines",
      year: "2024",
      description: "Comprehensive guidelines for expatriates on Swiss tax filing requirements, deadlines, and procedures.",
      type: "Guideline",
      jurisdiction: "Switzerland",
      status: "Active",
      lastUpdated: "2024-01-15",
      tags: ["expat", "guidelines", "filing", "requirements"],
      url: "/resources/expat-tax-guidelines",
      downloadUrl: "/documents/expat-guidelines-2024.pdf",
      importance: "high"
    },
    {
      id: 13,
      title: "Digital Tax Filing Guidelines",
      category: "guidelines",
      year: "2024",
      description: "Step-by-step guidelines for digital tax filing, including technical requirements and best practices.",
      type: "Guideline",
      jurisdiction: "Switzerland",
      status: "Active",
      lastUpdated: "2024-02-10",
      tags: ["digital", "filing", "guidelines", "technical"],
      url: "/resources/digital-filing-guidelines",
      downloadUrl: "/documents/digital-filing-2024.pdf",
      importance: "high"
    },

    // Court Decisions
    {
      id: 14,
      title: "Federal Supreme Court Decision on Crypto Taxation",
      category: "decisions",
      year: "2024",
      description: "Landmark decision by the Federal Supreme Court clarifying the taxation of cryptocurrency transactions.",
      type: "Court Decision",
      jurisdiction: "Switzerland",
      status: "Final",
      lastUpdated: "2024-01-25",
      tags: ["crypto", "cryptocurrency", "supreme court", "landmark"],
      url: "https://www.bger.ch/ext/eurospider/live/de/php/aza/http/index.php?lang=de&type=highlight_simple_query&page=1&from_date=&to_date=&sort=relevance&insertion_date=&top_subcollection_aza=all&query_words=crypto",
      downloadUrl: "/documents/crypto-tax-decision-2024.pdf",
      importance: "high"
    },
    {
      id: 15,
      title: "Federal Administrative Court on Home Office Deductions",
      category: "decisions",
      year: "2023",
      description: "Important decision on the deductibility of home office expenses for employees.",
      type: "Court Decision",
      jurisdiction: "Switzerland",
      status: "Final",
      lastUpdated: "2023-12-15",
      tags: ["home office", "deductions", "administrative court"],
      url: "https://www.bvger.ch/bvger/en/home.html",
      downloadUrl: "/documents/home-office-decision-2023.pdf",
      importance: "medium"
    },

    // Recent Updates
    {
      id: 16,
      title: "2024 Tax Rate Changes",
      category: "updates",
      year: "2024",
      description: "Summary of all tax rate changes for 2024, including federal, cantonal, and municipal adjustments.",
      type: "Update",
      jurisdiction: "Switzerland",
      status: "Active",
      lastUpdated: "2024-01-01",
      tags: ["2024", "tax rates", "changes", "federal", "cantonal"],
      url: "/news/2024-tax-rate-changes",
      downloadUrl: "/documents/2024-tax-rates.pdf",
      importance: "high"
    },
    {
      id: 17,
      title: "New Digital Tax Filing Requirements",
      category: "updates",
      year: "2024",
      description: "Updated requirements for digital tax filing, including new mandatory electronic submission rules.",
      type: "Update",
      jurisdiction: "Switzerland",
      status: "Active",
      lastUpdated: "2024-02-15",
      tags: ["digital", "filing", "requirements", "electronic"],
      url: "/news/digital-filing-requirements-2024",
      downloadUrl: "/documents/digital-requirements-2024.pdf",
      importance: "high"
    }
  ];

  const filteredDocuments = legalDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || doc.year === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50';
      case 'Final': return 'text-blue-600 bg-blue-50';
      case 'Draft': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <>
      <Helmet>
        <title>Law Section - Swiss Tax Legal Documents | Taxed GmbH</title>
        <meta name="description" content="Comprehensive collection of Swiss tax laws, regulations, treaties, and legal documents. Stay updated with the latest tax legislation and court decisions." />
        <meta property="og:title" content="Law Section - Swiss Tax Legal Documents | Taxed GmbH" />
        <meta property="og:description" content="Comprehensive collection of Swiss tax laws, regulations, treaties, and legal documents. Stay updated with the latest tax legislation and court decisions." />
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Law Section
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Comprehensive collection of Swiss tax laws, regulations, treaties, and legal documents. 
              Stay informed with the latest legislation and court decisions.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search legal documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-steel-blue"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-steel-blue rounded-md bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 focus:border-steel-blue rounded-md bg-white"
                >
                  {years.map(year => (
                    <option key={year.id} value={year.id}>
                      {year.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-lg text-dark-gray/80">
              Found <span className="font-semibold text-steel-blue">{filteredDocuments.length}</span> legal documents
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-steel-blue/20 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-dark-gray mb-2">
                          {doc.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImportanceColor(doc.importance)}`}>
                            {doc.importance.toUpperCase()} PRIORITY
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-dark-gray/70 mb-3">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{doc.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{doc.jurisdiction}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{doc.year}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-dark-gray/80 mb-4 leading-relaxed">
                      {doc.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-dark-gray/60 mb-4">
                      <span>Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => window.open(doc.url, '_blank')}
                        variant="outline"
                        className="flex-1 border-steel-blue text-steel-blue hover:bg-steel-blue hover:text-white"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Source
                      </Button>
                      <Button
                        onClick={() => window.open(doc.downloadUrl, '_blank')}
                        className="flex-1 bg-steel-blue hover:bg-steel-blue/90 text-white"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredDocuments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                No documents found
              </h3>
              <p className="text-dark-gray/80">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
              Quick Access
            </h2>
            <p className="text-lg text-dark-gray/80 max-w-2xl mx-auto">
              Frequently accessed legal documents and resources for quick reference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Federal Tax Laws",
                description: "Core federal tax legislation",
                icon: Shield,
                count: "3 documents",
                color: "bg-blue-100 text-blue-600"
              },
              {
                title: "Cantonal Laws",
                description: "Cantonal tax regulations",
                icon: MapPin,
                count: "26 documents",
                color: "bg-green-100 text-green-600"
              },
              {
                title: "Tax Treaties",
                description: "International agreements",
                icon: Globe,
                count: "120+ treaties",
                color: "bg-purple-100 text-purple-600"
              },
              {
                title: "Court Decisions",
                description: "Important legal precedents",
                icon: Scale,
                count: "50+ decisions",
                color: "bg-orange-100 text-orange-600"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-steel-blue/20 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg text-dark-gray">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-dark-gray/80 mb-3">{item.description}</p>
                    <p className="text-sm font-semibold text-steel-blue">{item.count}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 swiss-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Need Legal Interpretation?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Our expert team can help you understand complex tax laws and regulations. 
              Get professional guidance on your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-steel-blue hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => window.location.href = '/contact'}
              >
                Get Legal Advice
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-steel-blue text-lg px-8 py-4"
                onClick={() => {
                  const phoneNumber = '+41799107787';
                  const message = encodeURIComponent("Hello! I need help understanding Swiss tax laws and regulations. Could you please provide legal guidance?");
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                WhatsApp Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LawSectionPage;
