import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs Component with Schema Markup
 *
 * Displays hierarchical navigation breadcrumbs with SEO-optimized schema.org structured data
 *
 * @param {Array} items - Array of breadcrumb items [{label, path}]
 * @example
 * <Breadcrumbs items={[
 *   {label: 'Services', path: '/services'},
 *   {label: 'Tax Filing', path: '/services/tax-filing'}
 * ]} />
 */
const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  // Always include Home as first item
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    ...items
  ];

  // Generate schema.org BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://taxed.ch${item.path}`
    }))
  };

  return (
    <>
      {/* Schema Markup for SEO */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm text-dark-gray/70">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isHome = index === 0;

            return (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-dark-gray/40" />
                )}
                {isLast ? (
                  <span
                    className="text-dark-gray font-medium"
                    aria-current="page"
                  >
                    {isHome ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      item.label
                    )}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-steel-blue transition-colors flex items-center"
                  >
                    {isHome ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      item.label
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
