// Comprehensive search service for the entire website
export const searchService = {
  // Complete index of all pages and their content
  searchIndex: [
    // Main Pages
    {
      title: "Home",
      href: "/",
      description: "Welcome to Taxed GmbH - Swiss tax consulting made simple",
      keywords: ["home", "welcome", "taxed", "swiss", "tax", "consulting", "main", "landing"],
      category: "Main"
    },
    {
      title: "About Us",
      href: "/about",
      description: "Learn about Taxed GmbH, our mission, and our team of Swiss tax experts",
      keywords: ["about", "company", "team", "mission", "story", "who we are", "our team"],
      category: "Company"
    },
    {
      title: "How It Works",
      href: "/how-it-works",
      description: "Our simple 3-step process for Swiss tax filing - upload, review, submit",
      keywords: ["process", "how it works", "steps", "procedure", "workflow", "method"],
      category: "Services"
    },
    {
      title: "Services",
      href: "/services",
      description: "Comprehensive Swiss tax services including individual returns, business tax, and expat tax solutions",
      keywords: ["services", "tax services", "individual tax", "business tax", "expat tax", "consulting"],
      category: "Services"
    },
    {
      title: "Pricing",
      href: "/pricing",
      description: "Transparent, flat-rate pricing for all Swiss tax services with no hidden costs",
      keywords: ["pricing", "cost", "price", "rates", "fees", "costs", "transparent pricing"],
      category: "Company"
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Get in touch with our Swiss tax experts - phone, email, or visit us in Biel",
      keywords: ["contact", "get in touch", "phone", "email", "address", "location", "biel"],
      category: "Company"
    },

    // Tax Tools & Calculators
    {
      title: "Tax Calculators",
      href: "/calculators",
      description: "Free Swiss tax calculators for income tax, wealth tax, and real estate tax",
      keywords: ["calculator", "calculators", "tax calculator", "income tax", "wealth tax", "real estate tax", "compute", "calculate"],
      category: "Tools"
    },
    {
      title: "Tax Deadlines",
      href: "/tax-deadlines",
      description: "Important Swiss tax deadlines and filing dates for 2024",
      keywords: ["deadlines", "dates", "filing dates", "tax deadlines", "calendar", "important dates", "due dates"],
      category: "Resources"
    },
    {
      title: "Tax Forms",
      href: "/tax-forms",
      description: "Download official Swiss tax forms and documents",
      keywords: ["forms", "tax forms", "documents", "download", "official forms", "swiss forms"],
      category: "Resources"
    },
    {
      title: "Tax Glossary",
      href: "/tax-glossary",
      description: "Comprehensive Swiss tax terminology and definitions",
      keywords: ["glossary", "terms", "definitions", "terminology", "tax terms", "swiss tax terms"],
      category: "Resources"
    },

    // Guides & Resources
    {
      title: "Expat Tax Guide",
      href: "/expat-tax-guide",
      description: "Complete guide for expats filing Swiss taxes - residency, double taxation, and planning",
      keywords: ["expat", "expatriate", "foreigner", "international", "expat tax", "expat guide", "foreign tax"],
      category: "Guides"
    },
    {
      title: "Business Tax Guide",
      href: "/business-tax-guide",
      description: "Comprehensive guide for Swiss business tax obligations and planning",
      keywords: ["business", "corporate", "company tax", "business tax", "corporate tax", "business guide"],
      category: "Guides"
    },
    {
      title: "Tax Planning Guide",
      href: "/tax-planning-guide",
      description: "Strategic tax planning strategies for individuals and businesses in Switzerland",
      keywords: ["planning", "tax planning", "strategy", "strategies", "optimization", "tax optimization"],
      category: "Guides"
    },
    {
      title: "Resource Center",
      href: "/resources",
      description: "Downloadable guides, checklists, templates, and tax resources",
      keywords: ["resources", "guides", "checklists", "templates", "downloads", "materials", "documents"],
      category: "Resources"
    },

    // News & Updates
    {
      title: "Blog",
      href: "/blog",
      description: "Latest Swiss tax insights, news, and expert advice from our team",
      keywords: ["blog", "news", "insights", "articles", "posts", "updates", "latest"],
      category: "News"
    },
    {
      title: "News & Updates",
      href: "/news",
      description: "Daily Swiss tax news and regulatory updates",
      keywords: ["news", "updates", "latest", "regulatory", "changes", "law changes"],
      category: "News"
    },
    {
      title: "Tax Updates",
      href: "/tax-updates",
      description: "Latest changes in Swiss tax law and regulations",
      keywords: ["updates", "changes", "law changes", "regulatory updates", "new laws"],
      category: "News"
    },

    // Legal & Compliance
    {
      title: "Law Section",
      href: "/law",
      description: "Swiss tax law documents, regulations, and legal references",
      keywords: ["law", "legal", "regulations", "legal documents", "swiss law", "tax law"],
      category: "Legal"
    },
    {
      title: "Privacy Policy",
      href: "/privacy",
      description: "Data protection and privacy policy for Taxed GmbH",
      keywords: ["privacy", "data protection", "gdpr", "privacy policy", "data security"],
      category: "Legal"
    },
    {
      title: "Terms of Service",
      href: "/terms",
      description: "Terms and conditions for using Taxed GmbH services",
      keywords: ["terms", "conditions", "terms of service", "agreement", "legal terms"],
      category: "Legal"
    },
    {
      title: "Impressum",
      href: "/impressum",
      description: "Legal company information and contact details",
      keywords: ["impressum", "legal info", "company info", "legal information"],
      category: "Legal"
    },

    // Client Services
    {
      title: "Client Portal",
      href: "/client-portal",
      description: "Secure client dashboard for document management and communication",
      keywords: ["client portal", "dashboard", "secure access", "client area", "login", "account"],
      category: "Client"
    },
    {
      title: "Tax Support",
      href: "/support",
      description: "Help center and customer support for tax-related questions",
      keywords: ["support", "help", "customer service", "assistance", "help center", "faq"],
      category: "Client"
    },
    {
      title: "FAQ",
      href: "/faq",
      description: "Frequently asked questions about Swiss tax filing and our services",
      keywords: ["faq", "questions", "answers", "help", "frequently asked", "common questions"],
      category: "Client"
    },

    // Team & Expertise
    {
      title: "Our Team",
      href: "/team",
      description: "Meet our certified Swiss tax experts and professionals",
      keywords: ["team", "experts", "professionals", "staff", "our team", "tax experts"],
      category: "Team"
    },
    {
      title: "Case Studies",
      href: "/case-studies",
      description: "Real client success stories and tax solutions",
      keywords: ["case studies", "success stories", "examples", "client stories", "testimonials"],
      category: "Team"
    },
    {
      title: "Industry Specializations",
      href: "/industry-specializations",
      description: "Our expertise across different industries and sectors",
      keywords: ["industry", "specializations", "sectors", "expertise", "industries"],
      category: "Team"
    },
    {
      title: "Advanced Tax Tools",
      href: "/advanced-tax-tools",
      description: "Professional tax analysis and planning tools for complex cases",
      keywords: ["advanced tools", "professional tools", "analysis tools", "planning tools", "complex cases"],
      category: "Tools"
    },

    // Additional Pages
    {
      title: "Careers",
      href: "/careers",
      description: "Join our team of Swiss tax professionals",
      keywords: ["careers", "jobs", "employment", "join us", "work with us", "hiring"],
      category: "Company"
    },
    {
      title: "Tax Security",
      href: "/security",
      description: "Data protection and security measures for client information",
      keywords: ["security", "data security", "protection", "privacy", "secure", "data protection"],
      category: "Legal"
    },
    {
      title: "Tax Technology",
      href: "/technology",
      description: "Digital tax solutions and technology platform",
      keywords: ["technology", "digital", "platform", "tech", "digital solutions", "online"],
      category: "Services"
    },
    {
      title: "Sitemap",
      href: "/sitemap",
      description: "Complete site structure and page index",
      keywords: ["sitemap", "site map", "pages", "structure", "navigation"],
      category: "Navigation"
    }
  ],

  // Search function that searches through all content
  search(query) {
    if (!query || query.length < 2) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results = [];

    // Search through all indexed content
    this.searchIndex.forEach(item => {
      let score = 0;
      
      // Title match (highest priority)
      if (item.title.toLowerCase().includes(searchTerm)) {
        score += 100;
      }
      
      // Description match
      if (item.description.toLowerCase().includes(searchTerm)) {
        score += 50;
      }
      
      // Keywords match
      item.keywords.forEach(keyword => {
        if (keyword.includes(searchTerm)) {
          score += 25;
        }
      });

      // Category match
      if (item.category.toLowerCase().includes(searchTerm)) {
        score += 10;
      }

      // If we have a match, add to results
      if (score > 0) {
        results.push({
          ...item,
          score,
          matchType: this.getMatchType(item, searchTerm)
        });
      }
    });

    // Sort by score (highest first) and return top 10 results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  },

  // Determine the type of match for better UX
  getMatchType(item, searchTerm) {
    if (item.title.toLowerCase().includes(searchTerm)) {
      return 'title';
    } else if (item.description.toLowerCase().includes(searchTerm)) {
      return 'description';
    } else {
      return 'keyword';
    }
  },

  // Get popular searches
  getPopularSearches() {
    return [
      'Tax Calculator',
      'Tax Deadlines',
      'Expat Tax Guide',
      'Tax Forms',
      'About Us',
      'Contact',
      'Pricing',
      'Services',
      'Client Portal',
      'Blog'
    ];
  },

  // Get search suggestions based on partial input
  getSuggestions(partialQuery) {
    if (!partialQuery || partialQuery.length < 2) {
      return this.getPopularSearches().slice(0, 6);
    }

    const query = partialQuery.toLowerCase();
    const suggestions = this.searchIndex
      .filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.includes(query))
      )
      .slice(0, 6)
      .map(item => item.title);

    return suggestions.length > 0 ? suggestions : this.getPopularSearches().slice(0, 6);
  }
};

export default searchService;
