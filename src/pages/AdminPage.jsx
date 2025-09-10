import React from 'react';
import { Helmet } from 'react-helmet';
import AdminPanel from '@/components/AdminPanel';

const AdminPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin Panel - Taxed GmbH | Secure Administration</title>
        <meta name="description" content="Secure administrative access to Taxed GmbH client portal and system management." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Admin Panel - Taxed GmbH" />
        <meta property="og:description" content="Secure administrative access" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://taxed.ch/admin" />
      </Helmet>
      
      <AdminPanel />
    </>
  );
};

export default AdminPage;