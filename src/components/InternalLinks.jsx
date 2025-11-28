import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Calculator, HelpCircle, BookOpen, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * InternalLinks Component
 *
 * Displays contextually relevant internal links to improve SEO and user navigation.
 * Helps distribute page authority and improve crawlability.
 *
 * @param {string} context - Page context (e.g., "blog-post", "services", "faq")
 * @param {string} currentPage - Current page path to exclude from suggestions
 * @param {number} limit - Maximum number of links to display (default: 4)
 *
 * @example
 * <InternalLinks context="blog-post" currentPage="/blog/tax-guide" limit={3} />
 */

// Define internal link suggestions by context
const linksByContext = {
  'tax-basics': [
    {
      title: 'Swiss Tax Return Guide 2025',
      description: 'Complete step-by-step tutorial for filing your Swiss tax return',
      path: '/blog/swiss-tax-return-guide-2025-complete-step-by-step-tutorial',
      icon: FileText,
      keywords: ['tax return', 'filing', 'steuererklärung']
    },
    {
      title: 'Tax Calculators',
      description: 'Free calculators for income tax, wealth tax, and Pillar 3a',
      path: '/calculators',
      icon: Calculator,
      keywords: ['calculator', 'estimate', 'rates']
    },
    {
      title: 'FAQ - Tax Questions',
      description: 'Answers to the most common Swiss tax questions',
      path: '/faq',
      icon: HelpCircle,
      keywords: ['questions', 'help', 'faq']
    },
    {
      title: 'Professional Tax Services',
      description: 'Expert Swiss tax filing for expatriates',
      path: '/services',
      icon: Users,
      keywords: ['services', 'professional', 'expert']
    }
  ],
  'tax-deductions': [
    {
      title: 'Top 10 Tax Deductions for Expats',
      description: 'Maximize your tax savings with these essential deductions',
      path: '/blog/top-10-tax-deductions-expats-switzerland-2025',
      icon: FileText,
      keywords: ['deductions', 'savings', 'expat']
    },
    {
      title: 'Pillar 3a Complete Guide',
      description: 'Understanding Swiss retirement savings and tax benefits',
      path: '/blog/pillar-3a-complete-guide',
      icon: BookOpen,
      keywords: ['pillar 3a', 'retirement', 'savings']
    },
    {
      title: 'Tax Filing Services',
      description: 'Let experts handle your deductions and optimize your return',
      path: '/services',
      icon: Users,
      keywords: ['services', 'filing', 'optimization']
    },
    {
      title: 'Tax Calculators',
      description: 'Calculate your potential tax savings',
      path: '/calculators',
      icon: Calculator,
      keywords: ['calculator', 'savings', 'estimate']
    }
  ],
  'expat-tax': [
    {
      title: 'Expat Tax Planning Guide',
      description: 'Complete guide for expatriates navigating Swiss taxes',
      path: '/blog/expat-tax-planning-2025',
      icon: FileText,
      keywords: ['expat', 'planning', 'international']
    },
    {
      title: 'Top 10 Tax Deductions for Expats',
      description: 'Essential deductions that expats often miss',
      path: '/blog/top-10-tax-deductions-expats-switzerland-2025',
      icon: FileText,
      keywords: ['expat', 'deductions', 'savings']
    },
    {
      title: 'Expert Tax Services',
      description: 'Specialized Swiss tax filing for expatriates',
      path: '/services',
      icon: Users,
      keywords: ['expat', 'services', 'international']
    },
    {
      title: 'FAQ for Expats',
      description: 'Common questions about Swiss taxes for foreign residents',
      path: '/faq',
      icon: HelpCircle,
      keywords: ['expat', 'questions', 'help']
    }
  ],
  'services': [
    {
      title: 'Swiss Tax Return Guide',
      description: 'Learn the complete tax filing process',
      path: '/blog/swiss-tax-return-guide-2025-complete-step-by-step-tutorial',
      icon: BookOpen,
      keywords: ['guide', 'tutorial', 'filing']
    },
    {
      title: 'Tax Calculators',
      description: 'Estimate your tax liability before filing',
      path: '/calculators',
      icon: Calculator,
      keywords: ['calculator', 'estimate', 'planning']
    },
    {
      title: 'Tax Deductions Guide',
      description: 'Maximize your tax savings with all available deductions',
      path: '/blog/top-10-tax-deductions-expats-switzerland-2025',
      icon: FileText,
      keywords: ['deductions', 'savings', 'optimization']
    },
    {
      title: 'Frequently Asked Questions',
      description: 'Get answers to common tax filing questions',
      path: '/faq',
      icon: HelpCircle,
      keywords: ['faq', 'questions', 'help']
    }
  ],
  'blog-post': [
    {
      title: 'Professional Tax Services',
      description: 'Get expert help with your Swiss tax return',
      path: '/services',
      icon: Users,
      keywords: ['services', 'professional', 'expert']
    },
    {
      title: 'Free Tax Calculators',
      description: 'Calculate income tax, wealth tax, and more',
      path: '/calculators',
      icon: Calculator,
      keywords: ['calculator', 'tools', 'estimate']
    },
    {
      title: 'More Tax Articles',
      description: 'Explore our comprehensive tax blog',
      path: '/blog',
      icon: BookOpen,
      keywords: ['blog', 'articles', 'guides']
    },
    {
      title: 'Tax Filing FAQ',
      description: 'Quick answers to common tax questions',
      path: '/faq',
      icon: HelpCircle,
      keywords: ['faq', 'questions', 'answers']
    }
  ],
  'general': [
    {
      title: 'Tax Filing Services',
      description: 'Expert Swiss tax return preparation for expatriates',
      path: '/services',
      icon: Users,
      keywords: ['services', 'filing', 'professional']
    },
    {
      title: 'Swiss Tax Blog',
      description: 'Expert insights and comprehensive tax guides',
      path: '/blog',
      icon: BookOpen,
      keywords: ['blog', 'articles', 'guides']
    },
    {
      title: 'Tax Calculators',
      description: 'Free online Swiss tax calculators',
      path: '/calculators',
      icon: Calculator,
      keywords: ['calculator', 'tools', 'free']
    },
    {
      title: 'FAQ',
      description: 'Answers to frequently asked tax questions',
      path: '/faq',
      icon: HelpCircle,
      keywords: ['faq', 'help', 'questions']
    }
  ]
};

const InternalLinks = ({ context = 'general', currentPage = '', limit = 4 }) => {
  const links = linksByContext[context] || linksByContext['general'];

  // Filter out current page and limit results
  const filteredLinks = links
    .filter(link => link.path !== currentPage)
    .slice(0, limit);

  if (filteredLinks.length === 0) return null;

  return (
    <div className="my-12 py-8 px-6 bg-gradient-to-br from-steel-blue/5 to-blue-50 rounded-xl border border-steel-blue/10">
      <h3 className="text-2xl font-bold text-dark-gray mb-6 flex items-center">
        <BookOpen className="w-6 h-6 mr-3 text-steel-blue" />
        Related Resources
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link
              key={index}
              to={link.path}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-steel-blue hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Icon className="w-5 h-5 text-steel-blue flex-shrink-0 mt-1" />
                    <ArrowRight className="w-4 h-4 text-steel-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-steel-blue transition-colors">
                    {link.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-dark-gray/70">
                    {link.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default InternalLinks;
