// Image service for generating unique blog post images
export const generateBlogImage = (imagePrompt, postId) => {
  // For now, we'll use placeholder images with unique IDs
  // In a production environment, you could integrate with:
  // - Unsplash API for real photos
  // - DALL-E or Midjourney for AI-generated images
  // - Your own image library
  
  const imageCategories = {
    // Swiss Tax System 2025
    'tax': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    'digital-tax': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    'crypto-tax': 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
    
    // Real Estate & Housing
    'real-estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
    'housing': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
    'green-building': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop',
    
    // Business & Innovation
    'business': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop',
    'startup': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'innovation': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop',
    
    // International & Expat Finance
    'expat': 'https://images.unsplash.com/photo-1554224154-26032cdc-304d?w=800&h=400&fit=crop',
    'international': 'https://images.unsplash.com/photo-1554224154-26032cdc-304d?w=800&h=400&fit=crop',
    'banking': 'https://images.unsplash.com/photo-1554224154-26032cdc-304d?w=800&h=400&fit=crop',
    
    // Sustainability & Green Finance
    'sustainability': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop',
    'green-finance': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=400&fit=crop',
    'electric-vehicle': 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=400&fit=crop',
    
    // Technology & Digital Economy
    'technology': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop',
    'digital': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop',
    'cryptocurrency': 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
    
    // Healthcare & Insurance
    'healthcare': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    'insurance': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    'medical': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    
    // Education & Professional Development
    'education': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'professional': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'learning': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    
    // Default
    'finance': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
  };

  // Determine category based on image prompt and topic
  let category = 'finance'; // default
  const prompt = imagePrompt.toLowerCase();
  
  if (prompt.includes('tax') || prompt.includes('documents')) {
    category = 'tax';
  } else if (prompt.includes('digital') || prompt.includes('crypto') || prompt.includes('blockchain')) {
    category = 'digital-tax';
  } else if (prompt.includes('real estate') || prompt.includes('property') || prompt.includes('housing')) {
    category = 'real-estate';
  } else if (prompt.includes('green') || prompt.includes('sustainable') || prompt.includes('environmental')) {
    category = 'sustainability';
  } else if (prompt.includes('business') || prompt.includes('startup') || prompt.includes('entrepreneur')) {
    category = 'business';
  } else if (prompt.includes('technology') || prompt.includes('innovation') || prompt.includes('digital')) {
    category = 'technology';
  } else if (prompt.includes('health') || prompt.includes('medical') || prompt.includes('insurance')) {
    category = 'healthcare';
  } else if (prompt.includes('education') || prompt.includes('learning') || prompt.includes('professional')) {
    category = 'education';
  } else if (prompt.includes('expat') || prompt.includes('international') || prompt.includes('foreign')) {
    category = 'expat';
  } else if (prompt.includes('pension') || prompt.includes('retirement')) {
    category = 'finance';
  }

  // Add unique identifier to prevent caching issues
  const timestamp = Date.now();
  const uniqueId = postId || `post-${timestamp}`;
  
  return {
    url: `${imageCategories[category]}?id=${uniqueId}`,
    alt: imagePrompt,
    category: category
  };
};

// Generate a unique image for each blog post
export const createUniqueBlogImage = (blogPost) => {
  const imageData = generateBlogImage(blogPost.image, blogPost.slug);
  
  return {
    ...blogPost,
    imageUrl: imageData.url,
    imageAlt: imageData.alt,
    imageCategory: imageData.category
  };
};
