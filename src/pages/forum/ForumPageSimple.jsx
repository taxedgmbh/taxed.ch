import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getCategories, getTopics } from '@/services/forum';

const ForumPageSimple = () => {
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and topics using forum service
        const [categoriesData, topicsData] = await Promise.all([
          getCategories(),
          getTopics()
        ]);

        setCategories(categoriesData);
        setTopics(topicsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-steel-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading forum...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Forum</h1>
          <p className="text-gray-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-steel-blue text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Swiss Tax Forum | Taxed GmbH</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Swiss Tax Forum</h1>
          <p className="text-gray-600">Discuss tax questions and get expert advice</p>
          <div className="w-24 h-1 bg-steel-blue mt-4 rounded-full"></div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-steel-blue hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                <div className="mt-2 text-sm text-steel-blue font-medium">
                  {category.topic_count || 0} topics
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Topics</h2>
          {topics.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600">No topics found. Be the first to start a discussion!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topics.map((topic) => (
                <div key={topic.id} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{topic.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>Category: {topic.category_name || 'General'}</span>
                      <span>Score: {topic.score || 0}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>↑ {topic.upvotes || 0}</span>
                      <span>↓ {topic.downvotes || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ForumPageSimple;
