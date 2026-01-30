import React, { useState, useEffect } from 'react';
import { getCategories } from '@/services/forum';

const ForumTestPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        setData({ success: true, data: categories });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Forum Test Page</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Forum Test Page</h1>
        <h2>❌ Error</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Forum Test Page</h1>
      <h2>✅ API Response</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
      <h2>🔗 Navigation Test</h2>
      <p>If you can see this page, React Router is working!</p>
      <p>API Response: {data?.success ? 'Success' : 'Failed'}</p>
      <p>Categories found: {data?.data?.length || 0}</p>
    </div>
  );
};

export default ForumTestPage;
