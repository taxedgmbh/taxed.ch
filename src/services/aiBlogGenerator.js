import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

// Blog topics and themes for Swiss tax and expat finance
const BLOG_TOPICS = [
  {
    category: 'Swiss Tax System',
    topics: [
      'Understanding Swiss Tax Brackets and Rates',
      'Swiss VAT (MWST) for Small Businesses',
      'Swiss Inheritance Tax Guide for Expats',
      'Swiss Gift Tax: What You Need to Know',
      'Swiss Corporate Tax for Foreign Companies',
      'Swiss Capital Gains Tax on Investments',
      'Swiss Dividend Tax for Foreign Investors',
      'Swiss Stamp Duty on Financial Transactions',
      'Swiss Withholding Tax on Interest',
      'Swiss Social Security Contributions'
    ]
  },
  {
    category: 'Expat Finance',
    topics: [
      'Swiss Banking for Expats: A Complete Guide',
      'Currency Exchange Strategies for Expats',
      'Swiss Insurance Requirements for Expats',
      'Swiss Credit and Loans for Foreigners',
      'Swiss Investment Opportunities for Expats',
      'Swiss Mortgage Requirements for Expats',
      'Swiss Credit Cards for Foreign Residents',
      'Swiss Financial Planning for Expats',
      'Swiss Retirement Planning for Foreign Workers',
      'Swiss Estate Planning for Expats'
    ]
  },
  {
    category: 'Pillar 3a and Pensions',
    topics: [
      'Maximizing Your Pillar 3a Contributions',
      'Pillar 3a Investment Strategies',
      'Pillar 3a vs Traditional Savings',
      'Pillar 3a for Self-Employed Expats',
      'Pillar 3a Early Withdrawal Strategies',
      'Pillar 3a and Tax Optimization',
      'Pillar 3a for High-Income Earners',
      'Pillar 3a and Retirement Planning',
      'Pillar 3a Insurance vs Bank Solutions',
      'Pillar 3a for Expats Leaving Switzerland'
    ]
  },
  {
    category: 'Real Estate',
    topics: [
      'Swiss Real Estate Investment for Expats',
      'Swiss Property Market Trends',
      'Swiss Rental Income Taxation',
      'Swiss Property Purchase Process',
      'Swiss Real Estate Financing',
      'Swiss Property Maintenance Deductions',
      'Swiss Real Estate for Investment',
      'Swiss Property Market Regulations',
      'Swiss Real Estate and Wealth Tax',
      'Swiss Property for Expats Leaving'
    ]
  },
  {
    category: 'Business and Entrepreneurship',
    topics: [
      'Starting a Business in Switzerland',
      'Swiss Business Tax Optimization',
      'Swiss Company Formation for Expats',
      'Swiss Business Expenses and Deductions',
      'Swiss Freelancer Tax Obligations',
      'Swiss Business Registration Process',
      'Swiss Business Banking for Expats',
      'Swiss Business Insurance Requirements',
      'Swiss Business Succession Planning',
      'Swiss Business Exit Strategies'
    ]
  }
];

// Generate a random topic from the predefined list
const getRandomTopic = () => {
  const category = BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];
  const topic = category.topics[Math.floor(Math.random() * category.topics.length)];
  return { category: category.category, topic };
};

// Generate blog post using AI
export const generateBlogPost = async () => {
  try {
    const { category, topic } = getRandomTopic();
    
    const prompt = `Write a comprehensive blog post about "${topic}" for expats living in Switzerland. 

Requirements:
- Target audience: Expats living in Switzerland
- Tone: Professional but accessible, educational
- Length: 800-1200 words
- Structure: Include introduction, main sections with headings, and conclusion
- Content: Focus on practical advice, tax implications, and actionable insights
- Style: Use clear explanations, examples, and Swiss-specific information
- Include relevant Swiss tax rates, deadlines, or regulations where applicable

Format the response as JSON with the following structure:
{
  "title": "The blog post title",
  "author": "AI Tax Assistant",
  "date": "YYYY-MM-DD",
  "tags": ["tag1", "tag2", "tag3"],
  "summary": "A 2-3 sentence summary of the article",
  "content": "The full HTML content with proper formatting",
  "image": "A descriptive image prompt",
  "alt": "Alt text for the image"
}

Make sure the content is accurate, helpful, and provides real value to expats dealing with Swiss taxes and finance.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a Swiss tax expert specializing in expat taxation. Write clear, accurate, and helpful content that provides real value to expats living in Switzerland."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const response = completion.choices[0].message.content;
    
    // Parse the JSON response
    let blogPost;
    try {
      blogPost = JSON.parse(response);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Invalid AI response format');
    }

    // Validate the blog post structure
    if (!blogPost.title || !blogPost.content || !blogPost.summary) {
      throw new Error('Incomplete blog post generated');
    }

    // Generate a slug from the title
    blogPost.slug = blogPost.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    return blogPost;

  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
};

// Generate multiple blog posts
export const generateMultipleBlogPosts = async (count = 1) => {
  const posts = [];
  for (let i = 0; i < count; i++) {
    try {
      const post = await generateBlogPost();
      posts.push(post);
      // Add delay between requests to avoid rate limiting
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`Failed to generate blog post ${i + 1}:`, error);
    }
  }
  return posts;
};

// Save blog post to local storage (for demo purposes)
export const saveBlogPost = (blogPost) => {
  try {
    const existingPosts = JSON.parse(localStorage.getItem('aiGeneratedPosts') || '[]');
    existingPosts.push(blogPost);
    localStorage.setItem('aiGeneratedPosts', JSON.stringify(existingPosts));
    return true;
  } catch (error) {
    console.error('Error saving blog post:', error);
    return false;
  }
};

// Get all AI-generated blog posts
export const getAIGeneratedPosts = () => {
  try {
    return JSON.parse(localStorage.getItem('aiGeneratedPosts') || '[]');
  } catch (error) {
    console.error('Error retrieving AI blog posts:', error);
    return [];
  }
};

// Schedule daily blog generation
export const scheduleDailyBlogGeneration = () => {
  // Check if we already generated a post today
  const lastGeneration = localStorage.getItem('lastBlogGeneration');
  const today = new Date().toDateString();
  
  if (lastGeneration !== today) {
    // Generate a new blog post
    generateBlogPost()
      .then(post => {
        saveBlogPost(post);
        localStorage.setItem('lastBlogGeneration', today);
        console.log('Daily blog post generated:', post.title);
      })
      .catch(error => {
        console.error('Failed to generate daily blog post:', error);
      });
  }
};
