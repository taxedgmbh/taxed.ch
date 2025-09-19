/**
 * SEO Component
 * Handles meta tags, Open Graph, Twitter Cards, and structured data
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BaseComponentProps } from '@/types/common';

interface SEOProps extends BaseComponentProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile' | 'video' | 'music';
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: any;
  noindex?: boolean;
  nofollow?: boolean;
  lang?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Taxed GmbH - Steuerberatung & Buchhaltung',
  description = 'Professionelle Steuerberatung und Buchhaltung für Unternehmen in der Schweiz. Kompetente Beratung für Ihre Steuerangelegenheiten.',
  keywords = ['Steuerberatung', 'Buchhaltung', 'Schweiz', 'Steuern', 'Unternehmen', 'Beratung'],
  author = 'Taxed GmbH',
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterSite = '@taxed_gmbh',
  twitterCreator = '@taxed_gmbh',
  structuredData,
  noindex = false,
  nofollow = false,
  lang = 'de',
  className,
}) => {
  const fullTitle = title.includes('Taxed GmbH') ? title : `${title} | Taxed GmbH`;
  const fullOgTitle = ogTitle || fullTitle;
  const fullOgDescription = ogDescription || description;
  const fullOgUrl = ogUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const fullCanonical = canonical || fullOgUrl;

  const metaTags = [
    // Basic meta tags
    { name: 'description', content: description },
    { name: 'keywords', content: keywords.join(', ') },
    { name: 'author', content: author },
    { name: 'robots', content: `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}` },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'theme-color', content: '#1e40af' },
    
    // Open Graph tags
    { property: 'og:title', content: fullOgTitle },
    { property: 'og:description', content: fullOgDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:type', content: ogType },
    { property: 'og:url', content: fullOgUrl },
    { property: 'og:site_name', content: 'Taxed GmbH' },
    { property: 'og:locale', content: 'de_CH' },
    
    // Twitter Card tags
    { name: 'twitter:card', content: twitterCard },
    { name: 'twitter:site', content: twitterSite },
    { name: 'twitter:creator', content: twitterCreator },
    { name: 'twitter:title', content: fullOgTitle },
    { name: 'twitter:description', content: fullOgDescription },
    { name: 'twitter:image', content: ogImage },
    
    // Additional meta tags
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'Taxed GmbH' },
  ];

  const linkTags = [
    { rel: 'canonical', href: fullCanonical },
    { rel: 'alternate', hrefLang: 'de', href: fullOgUrl },
    { rel: 'alternate', hrefLang: 'en', href: fullOgUrl.replace('/de/', '/en/') },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      
      {metaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      
      {linkTags.map((link, index) => (
        <link key={index} {...link} />
      ))}
      
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Predefined SEO configurations for common pages
export const SEOConfigs = {
  home: {
    title: 'Taxed GmbH - Steuerberatung & Buchhaltung',
    description: 'Professionelle Steuerberatung und Buchhaltung für Unternehmen in der Schweiz. Kompetente Beratung für Ihre Steuerangelegenheiten.',
    keywords: ['Steuerberatung', 'Buchhaltung', 'Schweiz', 'Steuern', 'Unternehmen', 'Beratung'],
    ogType: 'website' as const,
  },
  
  about: {
    title: 'Über uns - Taxed GmbH',
    description: 'Erfahren Sie mehr über unser Team und unsere Expertise in der Steuerberatung und Buchhaltung.',
    keywords: ['Über uns', 'Team', 'Expertise', 'Steuerberatung', 'Buchhaltung'],
    ogType: 'website' as const,
  },
  
  services: {
    title: 'Unsere Leistungen - Taxed GmbH',
    description: 'Entdecken Sie unser umfassendes Angebot an Steuerberatungs- und Buchhaltungsleistungen.',
    keywords: ['Leistungen', 'Steuerberatung', 'Buchhaltung', 'Services', 'Angebot'],
    ogType: 'website' as const,
  },
  
  contact: {
    title: 'Kontakt - Taxed GmbH',
    description: 'Kontaktieren Sie uns für eine professionelle Beratung. Wir sind für Sie da.',
    keywords: ['Kontakt', 'Beratung', 'Termin', 'Steuerberatung'],
    ogType: 'website' as const,
  },
  
  blog: {
    title: 'Blog - Taxed GmbH',
    description: 'Aktuelle Informationen und Tipps rund um Steuern, Buchhaltung und Unternehmensführung.',
    keywords: ['Blog', 'Steuern', 'Buchhaltung', 'Tipps', 'Informationen'],
    ogType: 'website' as const,
  },
  
  blogPost: (post: { title: string; description: string; publishedAt: string; author: string }) => ({
    title: post.title,
    description: post.description,
    keywords: ['Blog', 'Steuern', 'Buchhaltung', 'Tipps'],
    ogType: 'article' as const,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Taxed GmbH',
        logo: {
          '@type': 'ImageObject',
          url: '/images/logo.png',
        },
      },
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
    },
  }),
};
