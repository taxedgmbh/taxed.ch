/**
 * Structured Data Utilities
 *
 * Centralized schema.org structured data generators for SEO
 * Implements advanced schema types for maximum search visibility
 */

/**
 * Organization Schema (Site-wide)
 * Implements ProfessionalService type for tax consulting business
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://taxed.ch/#organization",
  "name": "Taxed GmbH",
  "alternateName": "Taxed Swiss Tax Consulting",
  "legalName": "Taxed GmbH",
  "description": "Leading Swiss tax consulting firm specializing in expat tax returns, Quellensteuer adjustments, and international tax planning. Professional Swiss tax services for individuals and businesses.",
  "url": "https://taxed.ch",
  "telephone": "+41799107787",
  "email": "info@taxed.ch",
  "foundingDate": "2021",
  "logo": {
    "@type": "ImageObject",
    "url": "https://taxed.ch/images/og-taxed-logo.jpg",
    "width": 512,
    "height": 512
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://taxed.ch/images/og-taxed-logo.jpg",
    "width": 1200,
    "height": 630
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Biel/Bienne",
    "addressLocality": "Biel",
    "addressRegion": "BE",
    "postalCode": "2500",
    "addressCountry": "CH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.1372,
    "longitude": 7.2466
  },
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland"
  },
  "priceRange": "CHF 249 - CHF 799",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tax Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Basic Tax Return",
          "description": "Complete Swiss tax return preparation for simple tax situations",
          "provider": {
            "@type": "Organization",
            "name": "Taxed GmbH"
          }
        },
        "price": "249",
        "priceCurrency": "CHF"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Standard Tax Return",
          "description": "Most popular for expats with multiple income sources",
          "provider": {
            "@type": "Organization",
            "name": "Taxed GmbH"
          }
        },
        "price": "449",
        "priceCurrency": "CHF"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Premium Tax Return",
          "description": "Complete solution with dedicated expert and optimization",
          "provider": {
            "@type": "Organization",
            "name": "Taxed GmbH"
          }
        },
        "price": "799",
        "priceCurrency": "CHF"
      }
    ]
  },
  "sameAs": [
    "https://www.linkedin.com/company/taxed-gmbh",
    "https://twitter.com/taxedgmbh",
    "https://www.facebook.com/taxedgmbh"
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "paymentAccepted": "Cash, Credit Card, Bank Transfer, Twint",
  "currenciesAccepted": "CHF"
};

/**
 * WebSite Schema (Site-wide)
 * Enables sitelinks search box in Google
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://taxed.ch/#website",
  "url": "https://taxed.ch",
  "name": "Taxed GmbH - Swiss Tax Services for Expats",
  "description": "Professional Swiss tax return filing and Quellensteuer services for expatriates",
  "publisher": {
    "@id": "https://taxed.ch/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://taxed.ch/blog?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

/**
 * Review Schema Generator
 * Creates individual review structured data
 */
export const generateReviewSchema = (review) => ({
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": review.author
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": review.rating,
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": review.text,
  "datePublished": review.date
});

/**
 * Sample Reviews for Homepage
 */
export const sampleReviews = [
  {
    author: "Sarah Müller",
    rating: "5",
    text: "Taxed GmbH made my Swiss tax filing incredibly simple. As an American expat, I was overwhelmed by the forms, but they handled everything professionally and got me a CHF 1,200 refund!",
    date: "2024-03-15"
  },
  {
    author: "James Chen",
    rating: "5",
    text: "Best tax service in Switzerland! They understand the complexities of international income and helped me optimize my deductions. Saved me over CHF 3,000.",
    date: "2024-02-28"
  },
  {
    author: "Maria Rodriguez",
    rating: "5",
    text: "Professional, efficient, and affordable. I've been using Taxed GmbH for 3 years and wouldn't trust anyone else with my Swiss taxes.",
    date: "2024-01-10"
  }
];

/**
 * HowTo Schema Generator
 * For tutorial and guide content
 */
export const generateHowToSchema = (howTo) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howTo.name,
  "description": howTo.description,
  "image": howTo.image,
  "totalTime": howTo.totalTime,
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "CHF",
    "value": howTo.cost || "0"
  },
  "tool": howTo.tools || [],
  "supply": howTo.supplies || [],
  "step": howTo.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "image": step.image,
    "url": step.url
  }))
});

/**
 * Service Schema Generator
 * For individual service pages
 */
export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.name,
  "provider": {
    "@id": "https://taxed.ch/#organization"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": service.name,
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        },
        "price": service.price,
        "priceCurrency": "CHF",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2025-12-31",
        "url": service.url
      }
    ]
  },
  "audience": {
    "@type": "Audience",
    "audienceType": service.audience || "Expatriates in Switzerland"
  }
});

/**
 * FAQ Schema Generator
 * Already implemented in FAQPage.jsx but can be reused
 */
export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * VideoObject Schema Generator
 * For future webinar and video content
 */
export const generateVideoSchema = (video) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.title,
  "description": video.description,
  "thumbnailUrl": video.thumbnail,
  "uploadDate": video.uploadDate,
  "duration": video.duration, // ISO 8601 format: "PT1H30M"
  "contentUrl": video.url,
  "embedUrl": video.embedUrl,
  "publisher": {
    "@id": "https://taxed.ch/#organization"
  },
  "author": {
    "@type": "Person",
    "name": video.author
  }
});

/**
 * Course Schema Generator
 * For educational content and tax courses
 */
export const generateCourseSchema = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "provider": {
    "@id": "https://taxed.ch/#organization"
  },
  "offers": {
    "@type": "Offer",
    "price": course.price || "0",
    "priceCurrency": "CHF",
    "availability": "https://schema.org/InStock"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "instructor": {
      "@type": "Person",
      "name": course.instructor
    }
  }
});

export default {
  organizationSchema,
  websiteSchema,
  sampleReviews,
  generateReviewSchema,
  generateHowToSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateVideoSchema,
  generateCourseSchema
};
