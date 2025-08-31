// AI Provider Configuration
const AI_PROVIDERS = {
  OPENAI: 'openai',
  GEMINI: 'gemini',
  CLAUDE: 'claude',
  HUGGINGFACE: 'huggingface'
};

// Get the configured AI provider
const getAIProvider = () => {
  return process.env.REACT_APP_AI_PROVIDER || AI_PROVIDERS.GEMINI; // Default to Gemini (free)
};

// Initialize AI clients based on provider
const initializeAIClient = () => {
  const provider = getAIProvider();
  
  switch (provider) {
    case AI_PROVIDERS.OPENAI:
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }
      return { provider: AI_PROVIDERS.OPENAI };
      
    case AI_PROVIDERS.GEMINI:
      if (!process.env.REACT_APP_GEMINI_API_KEY) {
        throw new Error('Google Gemini API key not configured');
      }
      return { provider: AI_PROVIDERS.GEMINI };
      
    case AI_PROVIDERS.CLAUDE:
      if (!process.env.REACT_APP_CLAUDE_API_KEY) {
        throw new Error('Anthropic Claude API key not configured');
      }
      return { provider: AI_PROVIDERS.CLAUDE };
      
    case AI_PROVIDERS.HUGGINGFACE:
      if (!process.env.REACT_APP_HUGGINGFACE_API_KEY) {
        throw new Error('Hugging Face API key not configured');
      }
      return { provider: AI_PROVIDERS.HUGGINGFACE };
      
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
};

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

// Generate blog post using Google Gemini (Free)
const generateWithGemini = async (topic) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
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

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

// Generate blog post using OpenAI
const generateWithOpenAI = async (topic) => {
  const OpenAI = require('openai');
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

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

  return completion.choices[0].message.content;
};

// Generate blog post using Anthropic Claude
const generateWithClaude = async (topic) => {
  const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
  const url = 'https://api.anthropic.com/v1/messages';
  
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

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 3000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text;
};

// Generate blog post using Hugging Face
const generateWithHuggingFace = async (topic) => {
  const apiKey = process.env.REACT_APP_HUGGINGFACE_API_KEY;
  const url = 'https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf';
  
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

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 3000,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const data = await response.json();
  return data[0].generated_text;
};

// Generate blog post using AI
export const generateBlogPost = async () => {
  try {
    const { category, topic } = getRandomTopic();
    const aiClient = initializeAIClient();
    
    let response;
    
    switch (aiClient.provider) {
      case AI_PROVIDERS.GEMINI:
        response = await generateWithGemini(topic);
        break;
      case AI_PROVIDERS.OPENAI:
        response = await generateWithOpenAI(topic);
        break;
      case AI_PROVIDERS.CLAUDE:
        response = await generateWithClaude(topic);
        break;
      case AI_PROVIDERS.HUGGINGFACE:
        response = await generateWithHuggingFace(topic);
        break;
      default:
        throw new Error(`Unsupported AI provider: ${aiClient.provider}`);
    }
    
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

// Get current AI provider info
export const getAIProviderInfo = () => {
  const provider = getAIProvider();
  const providerInfo = {
    [AI_PROVIDERS.GEMINI]: {
      name: 'Google Gemini',
      free: true,
      limits: '15 requests/minute, 2M characters/minute',
      setup: 'Get free API key from Google AI Studio'
    },
    [AI_PROVIDERS.OPENAI]: {
      name: 'OpenAI GPT-4',
      free: false,
      limits: 'Pay per use',
      setup: 'Requires OpenAI API key'
    },
    [AI_PROVIDERS.CLAUDE]: {
      name: 'Anthropic Claude',
      free: true,
      limits: '5 messages per 4 hours',
      setup: 'Get free API key from Anthropic'
    },
    [AI_PROVIDERS.HUGGINGFACE]: {
      name: 'Hugging Face',
      free: true,
      limits: 'Rate limited',
      setup: 'Get free API key from Hugging Face'
    }
  };
  
  return providerInfo[provider] || providerInfo[AI_PROVIDERS.GEMINI];
};
