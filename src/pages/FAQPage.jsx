import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Breadcrumbs from '@/components/Breadcrumbs';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState(new Set());

  const faqCategories = [
    {
      title: "General Tax Questions",
      icon: "📋",
      items: [
        {
          question: "What is Quellensteuer (withholding tax) in Switzerland?",
          answer: "Quellensteuer is a withholding tax deducted directly from your salary by your employer. It's a simplified form of taxation for foreign workers in Switzerland. However, you may need to file a tax return to claim deductions or if you have additional income sources."
        },
        {
          question: "Do I need to file a Swiss tax return as an expat?",
          answer: "Yes, if you're a foreign worker with a B permit or have been in Switzerland for more than 30 days, you typically need to file a tax return. This applies even if you're subject to withholding tax, as you may be eligible for deductions or have additional income to declare."
        },
        {
          question: "What's the difference between federal and cantonal taxes?",
          answer: "Switzerland has a three-tier tax system: federal, cantonal, and municipal. Federal taxes are the same across Switzerland, while cantonal and municipal rates vary significantly. Your total tax burden depends on where you live and work."
        },
        {
          question: "When is the Swiss tax filing deadline?",
          answer: "The deadline varies by canton but is typically March 31st of the following year. Some cantons offer extensions until April 30th. It's important to check your specific canton's deadline and file on time to avoid penalties."
        }
      ]
    },
    {
      title: "Expat-Specific Questions",
      icon: "🌍",
      items: [
        {
          question: "How do I handle foreign income while living in Switzerland?",
          answer: "Foreign income must be declared on your Swiss tax return. Switzerland has tax treaties with many countries to avoid double taxation. You may be able to claim foreign tax credits or exemptions depending on your situation and the relevant tax treaty."
        },
        {
          question: "What happens to my taxes when I leave Switzerland?",
          answer: "When leaving Switzerland, you'll need to file a departure tax return. This covers the period from January 1st until your departure date. You may also need to consider exit taxes on certain assets and plan for tax obligations in your new country."
        },
        {
          question: "Can I claim deductions for moving expenses?",
          answer: "Yes, moving expenses related to your employment in Switzerland are generally deductible. This includes transportation costs, temporary accommodation, and certain relocation services. Keep all receipts and documentation."
        },
        {
          question: "How do I handle my pension contributions from abroad?",
          answer: "Pension contributions to foreign schemes may be deductible in Switzerland, subject to certain conditions. You should also consider the tax implications of receiving pension income from abroad while living in Switzerland."
        }
      ]
    },
    {
      title: "Tax Filing Process",
      icon: "📝",
      items: [
        {
          question: "What documents do I need for my tax return?",
          answer: "You'll need your salary statements, bank statements, rental contracts, insurance certificates, and any other income or expense documentation. For expats, you may also need documents from your home country."
        },
        {
          question: "Can I file my taxes online?",
          answer: "Yes, most cantons offer online tax filing. The process is secure and convenient. You can save your progress and submit when ready. Some cantons also offer pre-filled forms based on information they receive from employers and banks."
        },
        {
          question: "What if I miss the filing deadline?",
          answer: "If you miss the deadline, you may face penalties and interest charges. Contact your canton's tax office immediately to explain your situation. Late filing is better than not filing at all."
        },
        {
          question: "How long does it take to process my tax return?",
          answer: "Processing times vary by canton but typically take 2-6 months. Simple returns are processed faster. You can check the status online in most cantons."
        }
      ]
    },
    {
      title: "Deductions and Credits",
      icon: "💰",
      items: [
        {
          question: "What deductions can I claim?",
          answer: "Common deductions include work-related expenses, health insurance premiums, pension contributions, charitable donations, and certain professional development costs. The specific deductions available vary by canton."
        },
        {
          question: "Can I deduct my rent or mortgage interest?",
          answer: "Rent is generally not deductible for employees, but mortgage interest may be deductible in some cantons. Property taxes are usually deductible. Check your specific canton's rules."
        },
        {
          question: "Are childcare expenses deductible?",
          answer: "Childcare expenses may be deductible in some cantons, subject to certain conditions and limits. This includes daycare, after-school care, and certain educational expenses."
        },
        {
          question: "What about medical expenses?",
          answer: "Medical expenses that exceed a certain threshold (varies by canton) may be deductible. This includes costs not covered by health insurance, such as dental work, glasses, and certain treatments."
        }
      ]
    },
    {
      title: "Business and Self-Employment",
      icon: "🏢",
      items: [
        {
          question: "How do I register as self-employed in Switzerland?",
          answer: "You'll need to register with your canton's commercial registry and obtain a business license. You'll also need to register for VAT if your turnover exceeds CHF 100,000 per year."
        },
        {
          question: "What are the tax implications of starting a business?",
          answer: "As a self-employed person, you'll need to file quarterly VAT returns and annual income tax returns. You may also need to pay social security contributions. Business expenses are generally deductible."
        },
        {
          question: "Can I work as a freelancer while employed?",
          answer: "Yes, but you need to check your employment contract for any restrictions. You'll need to declare freelance income separately and may need to register for VAT depending on your total income."
        },
        {
          question: "What business expenses can I deduct?",
          answer: "Business expenses must be directly related to your business activities. This includes office rent, equipment, professional development, marketing costs, and certain travel expenses. Keep detailed records."
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Taxed GmbH</title>
        <meta name="description" content="Find answers to common questions about Swiss taxes, expat tax filing, deductions, and more. Expert guidance for your tax questions." />
        <meta name="keywords" content="Swiss tax FAQ, tax questions Switzerland, expat tax help, Quellensteuer questions, Swiss tax filing help, tax deductions Switzerland, Swiss tax advice" />
        <meta property="og:title" content="FAQ - Frequently Asked Questions | Taxed GmbH" />
        <meta property="og:description" content="Find answers to common questions about Swiss taxes, expat tax filing, deductions, and more. Expert guidance for your tax questions." />
        <link rel="canonical" href="https://taxed.ch/faq" />

        {/* FAQ Schema Markup for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Quellensteuer (withholding tax) in Switzerland?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Quellensteuer is a withholding tax deducted directly from your salary by your employer. It's a simplified form of taxation for foreign workers in Switzerland. However, you may need to file a tax return to claim deductions or if you have additional income sources."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to file a Swiss tax return as an expat?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, if you're a foreign worker with a B permit or have been in Switzerland for more than 30 days, you typically need to file a tax return. This applies even if you're subject to withholding tax, as you may be eligible for deductions or have additional income to declare."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between federal and cantonal taxes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Switzerland has a three-tier tax system: federal, cantonal, and municipal. Federal taxes are the same across Switzerland, while cantonal and municipal rates vary significantly. Your total tax burden depends on where you live and work."
                }
              },
              {
                "@type": "Question",
                "name": "When is the Swiss tax filing deadline?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The deadline varies by canton but is typically March 31st of the following year. Some cantons offer extensions until April 30th. It's important to check your specific canton's deadline and file on time to avoid penalties."
                }
              },
              {
                "@type": "Question",
                "name": "How do I handle foreign income while living in Switzerland?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Foreign income must be declared on your Swiss tax return. Switzerland has tax treaties with many countries to avoid double taxation. You may be able to claim foreign tax credits or exemptions depending on your situation and the relevant tax treaty."
                }
              },
              {
                "@type": "Question",
                "name": "What documents do I need for my Swiss tax return?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For a complete Swiss tax return, you'll need: (1) Annual salary statements from all employers, (2) Tax certificate (Lohnausweis), (3) Bank statements, (4) Investment documents, (5) Property documents if applicable, (6) Previous year's tax return for reference."
                }
              },
              {
                "@type": "Question",
                "name": "How long does Swiss tax filing take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typically 2-3 business days after you've provided all required documents. Simple returns can be completed in 24 hours. Complex international situations may take up to 5 business days."
                }
              },
              {
                "@type": "Question",
                "name": "Can I get a Quellensteuer refund?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you may be eligible for a Quellensteuer refund if: (1) You're a B or C permit holder, (2) Your actual tax rate is lower than withheld amount, (3) You have deductible expenses. Average refunds range from CHF 500-2,000."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'FAQ', path: '/faq' }]} />
      </div>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Find answers to the most common questions about Swiss taxes, expat filing, 
              and our services. Can't find what you're looking for? Contact us directly.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-steel-blue"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-dark-gray mb-2">
                  {category.icon} {category.title}
                </h2>
                <div className="w-24 h-1 bg-steel-blue mx-auto"></div>
              </div>

              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const key = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openItems.has(key);

                  return (
                    <Card key={itemIndex} className="border-steel-blue/20 shadow-lg">
                      <CardHeader
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleItem(categoryIndex, itemIndex)}
                      >
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-dark-gray pr-4">
                            {item.question}
                          </CardTitle>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-steel-blue flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-steel-blue flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>
                      {isOpen && (
                        <CardContent>
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-dark-gray/80 leading-relaxed"
                          >
                            {item.answer}
                          </motion.div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Card className="border-steel-blue/20 shadow-xl bg-gradient-to-r from-steel-blue to-blue-600 text-white">
              <CardContent className="py-12">
                <HelpCircle className="h-16 w-16 mx-auto mb-6 text-white/80" />
                <h3 className="text-2xl font-bold mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-lg mb-6 text-white/90">
                  Our expert team is here to help with any specific questions about your tax situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.location.href = '/contact'}
                    className="bg-white text-steel-blue hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => {
                      const phoneNumber = '+41799107787';
                      const message = encodeURIComponent("Hello! I have a question about Swiss taxes that I couldn't find in the FAQ. Could you please help me?");
                      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    WhatsApp Chat
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
