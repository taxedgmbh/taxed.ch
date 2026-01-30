import React from 'react';
import { Helmet } from 'react-helmet';
import ClientPortal from '@/components/ClientPortal';

const ClientPortalPage = () => {
  return (
    <>
      <Helmet>
        <title>Client Portal - Taxed GmbH | Secure Tax Management</title>
        <meta name="description" content="Access your secure client portal to manage tax cases, upload documents, and communicate with your Swiss tax advisor at Taxed GmbH." />
        <meta name="keywords" content="client portal, tax management, secure login, document upload, tax advisor communication, Switzerland" />
        <meta property="og:title" content="Client Portal - Taxed GmbH" />
        <meta property="og:description" content="Secure client portal for managing your Swiss tax affairs" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://taxed.ch/client-portal" />
        <link rel="canonical" href="https://taxed.ch/client-portal" />
      </Helmet>
      
      <ClientPortal />
    </>
  );
};

export default ClientPortalPage;