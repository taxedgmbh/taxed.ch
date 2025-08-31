// AI Provider Configuration
const AI_PROVIDERS = {
  GEMINI: 'gemini',
  OPENAI: 'openai',
  CLAUDE: 'claude',
  HUGGINGFACE: 'huggingface'
};

// Get the configured AI provider
const getAIProvider = () => {
  return import.meta.env.VITE_AI_PROVIDER || import.meta.env.REACT_APP_AI_PROVIDER || AI_PROVIDERS.GEMINI; // Default to Gemini (free)
};

// Initialize AI clients based on provider
const initializeAIClient = () => {
  const provider = getAIProvider();
  
  switch (provider) {
    case AI_PROVIDERS.GEMINI:
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Google Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env.local file');
      }
      if (apiKey === 'YOUR_ACTUAL_GEMINI_API_KEY_HERE') {
        throw new Error('Please replace YOUR_ACTUAL_GEMINI_API_KEY_HERE with your real Google Gemini API key');
      }
      if (!apiKey.startsWith('AIza')) {
        throw new Error('Invalid Google Gemini API key format. API keys should start with "AIza"');
      }
      return { provider: AI_PROVIDERS.GEMINI };
      
    case AI_PROVIDERS.OPENAI:
      if (!import.meta.env.VITE_OPENAI_API_KEY && !import.meta.env.REACT_APP_OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }
      return { provider: AI_PROVIDERS.OPENAI };
      
    case AI_PROVIDERS.CLAUDE:
      if (!import.meta.env.VITE_CLAUDE_API_KEY && !import.meta.env.REACT_APP_CLAUDE_API_KEY) {
        throw new Error('Anthropic Claude API key not configured');
      }
      return { provider: AI_PROVIDERS.CLAUDE };
      
    case AI_PROVIDERS.HUGGINGFACE:
      if (!import.meta.env.VITE_HUGGINGFACE_API_KEY && !import.meta.env.REACT_APP_HUGGINGFACE_API_KEY) {
        throw new Error('Hugging Face API key not configured');
      }
      return { provider: AI_PROVIDERS.HUGGINGFACE };
      
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
};

// Blog topics and themes for Swiss tax and expat finance - Updated with trending topics
const BLOG_TOPICS = [
  {
    category: 'Swiss Tax System 2025',
    topics: [
      'Swiss Digital Tax Implementation 2025',
      'Cryptocurrency Taxation in Switzerland',
      'ESG Investment Tax Benefits in Switzerland',
      'Swiss Banking Secrecy Changes 2025',
      'Fintech Tax Regulations in Switzerland',
      'Swiss Corporate Tax Reform Impact',
      'Swiss-US Tax Treaty Updates 2025',
      'Swiss Carbon Tax Implementation',
      'Swiss Digital Services Tax',
      'Swiss Innovation Tax Credits'
    ]
  },
  {
    category: 'Real Estate & Housing Trends',
    topics: [
      'Swiss Housing Market Trends 2025',
      'Green Building Tax Incentives in Switzerland',
      'Short-term Rental Tax Rules (Airbnb)',
      'Swiss Mortgage Interest Rate Changes',
      'Property Investment Tax Strategies',
      'Swiss Real Estate Bubble Concerns',
      'Swiss Rental Market Regulations',
      'Swiss Property Transfer Tax Changes',
      'Swiss Vacation Home Tax Rules',
      'Swiss Real Estate Investment Trusts'
    ]
  },
  {
    category: 'Business & Innovation',
    topics: [
      'Swiss Startup Tax Benefits 2025',
      'Remote Work Tax Implications in Switzerland',
      'E-commerce Tax Compliance in Switzerland',
      'AI and Automation Tax Implications',
      'Blockchain Business Tax in Switzerland',
      'Swiss Data Privacy Tax Considerations',
      'Swiss Export Tax Incentives',
      'Swiss Research & Development Tax Credits',
      'Swiss Patent Box Tax Benefits',
      'Swiss International Business Tax'
    ]
  },
  {
    category: 'International & Expat Finance',
    topics: [
      'Brexit Impact on Swiss-UK Tax Relations',
      'Swiss-EU Tax Cooperation Changes',
      'Expat Pension Transfer Tax Rules',
      'Swiss Citizenship Tax Implications',
      'Swiss Double Taxation Agreements',
      'Swiss Foreign Account Tax Compliance',
      'Swiss International Tax Planning',
      'Swiss Cross-Border Employment Tax',
      'Swiss International Investment Tax',
      'Swiss Expatriate Tax Services'
    ]
  },
  {
    category: 'Sustainability & Green Finance',
    topics: [
      'Green Investment Tax Deductions',
      'Sustainable Business Tax Incentives',
      'Swiss Climate Finance Regulations',
      'Electric Vehicle Tax Benefits in Switzerland',
      'Swiss Renewable Energy Tax Credits',
      'Swiss Green Bond Tax Benefits',
      'Swiss Carbon Trading Tax Implications',
      'Swiss Environmental Tax Incentives',
      'Swiss Sustainable Investment Tax',
      'Swiss Green Technology Tax Breaks'
    ]
  },
  {
    category: 'Technology & Digital Economy',
    topics: [
      'Digital Asset Inheritance Tax',
      'Swiss Digital Banking Tax Rules',
      'Swiss Cryptocurrency Mining Tax',
      'Swiss NFT Tax Implications',
      'Swiss Digital Nomad Tax Rules',
      'Swiss Cloud Computing Tax',
      'Swiss Digital Transformation Tax',
      'Swiss Cybersecurity Tax Deductions',
      'Swiss Digital Marketing Tax',
      'Swiss E-learning Tax Benefits'
    ]
  },
  {
    category: 'Healthcare & Insurance',
    topics: [
      'Swiss Health Insurance Tax Changes',
      'Private Insurance Tax Deductions',
      'Swiss Medical Expense Tax Benefits',
      'Long-term Care Tax Planning',
      'Swiss Accident Insurance Tax Rules',
      'Swiss Dental Care Tax Deductions',
      'Swiss Mental Health Tax Benefits',
      'Swiss Alternative Medicine Tax',
      'Swiss Health Savings Accounts',
      'Swiss Medical Tourism Tax'
    ]
  },
  {
    category: 'Education & Professional Development',
    topics: [
      'Swiss Education Tax Deductions',
      'Professional Development Tax Benefits',
      'Swiss Student Loan Tax Implications',
      'International School Tax Considerations',
      'Swiss Research Tax Credits',
      'Swiss Language Course Tax Benefits',
      'Swiss Certification Tax Deductions',
      'Swiss Conference and Seminar Tax',
      'Swiss Online Education Tax Benefits',
      'Swiss Professional Association Tax'
    ]
  }
];

// Generate a random topic from the predefined list, avoiding recently used topics
const getRandomTopic = () => {
  // Get recently used topics from localStorage to avoid repetition
  const usedTopics = JSON.parse(localStorage.getItem('aiBlogUsedTopics') || '[]');
  const maxUsedTopics = 20; // Keep track of last 20 topics
  
  // Filter out recently used topics
  const availableCategories = BLOG_TOPICS.filter(category => {
    const availableTopics = category.topics.filter(topic => !usedTopics.includes(topic));
    return availableTopics.length > 0;
  });
  
  // If all topics have been used recently, reset the used topics list
  if (availableCategories.length === 0) {
    localStorage.setItem('aiBlogUsedTopics', '[]');
    const category = BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];
    const topic = category.topics[Math.floor(Math.random() * category.topics.length)];
    return { category: category.category, topic };
  }
  
  // Select a random category with available topics
  const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
  const availableTopics = category.topics.filter(topic => !usedTopics.includes(topic));
  const topic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
  
  // Add the selected topic to used topics
  usedTopics.push(topic);
  if (usedTopics.length > maxUsedTopics) {
    usedTopics.shift(); // Remove oldest topic
  }
  localStorage.setItem('aiBlogUsedTopics', JSON.stringify(usedTopics));
  
  return { category: category.category, topic };
};

// Generate a professional image prompt based on the topic and category
const generateImagePrompt = (topic, category) => {
  const imagePrompts = {
    'Swiss Tax System 2025': [
      'Professional Swiss tax documents and forms on a modern wooden desk, with calculator and coffee, Zurich office setting, high quality photography',
      'Swiss tax return forms and documents with Swiss flag in background, professional office environment, clean and modern',
      'Tax documents and Swiss franc notes on desk, professional lighting, modern Swiss office interior',
      'Digital tax filing interface with Swiss tax documents, modern office setting, professional lighting'
    ],
    'Real Estate & Housing Trends': [
      'Swiss real estate documents and property photos, modern real estate office, Zurich cityscape',
      'Property investment portfolio with Swiss architecture, professional real estate workspace',
      'Swiss mortgage documents and house keys, modern real estate office setting',
      'Green building certification documents with Swiss mountains background, sustainable architecture',
      'Swiss housing market charts and property listings, modern real estate office, professional setting'
    ],
    'Business & Innovation': [
      'Swiss business registration documents and startup materials, modern co-working space, Zurich',
      'Entrepreneur workspace with Swiss business documents, laptop and coffee, modern office',
      'Swiss company formation documents and business plan, professional startup environment',
      'AI and blockchain technology with Swiss business documents, modern innovation workspace',
      'Swiss startup office with digital transformation tools, modern co-working space'
    ],
    'International & Expat Finance': [
      'Swiss bank cards and documents on desk, modern banking interface, Zurich financial district background',
      'International banking documents with Swiss and foreign currencies, professional financial advisor workspace',
      'Swiss banking app on tablet with financial charts, modern office setting, professional lighting',
      'Passport and Swiss residence permit with financial documents, international banking setup',
      'Global financial charts with Swiss franc and other currencies, international finance workspace'
    ],
    'Sustainability & Green Finance': [
      'Green investment portfolio with Swiss mountains, sustainable finance documents, eco-friendly office',
      'Electric vehicle charging station with Swiss tax documents, sustainable transportation setup',
      'Renewable energy certificates with Swiss environmental documents, green finance workspace',
      'Carbon trading documents with Swiss sustainability reports, environmental finance office',
      'Green building materials with Swiss tax incentives documentation, sustainable development'
    ],
    'Technology & Digital Economy': [
      'Cryptocurrency trading interface with Swiss financial regulations, digital finance workspace',
      'Digital banking app on multiple devices, Swiss fintech innovation, modern office setting',
      'Blockchain technology visualization with Swiss tax documents, digital transformation office',
      'NFT marketplace interface with Swiss digital asset regulations, modern tech workspace',
      'Cloud computing infrastructure with Swiss data privacy documents, digital economy setup'
    ],
    'Healthcare & Insurance': [
      'Swiss health insurance documents and medical certificates, healthcare office setting',
      'Medical expense receipts with Swiss tax forms, healthcare finance workspace',
      'Health insurance cards and Swiss medical documents, professional healthcare office',
      'Dental care documents with Swiss insurance forms, healthcare finance setup',
      'Mental health and wellness documents with Swiss healthcare regulations, modern medical office'
    ],
    'Education & Professional Development': [
      'Swiss education certificates and tax deduction forms, professional development office',
      'Language course materials with Swiss education documents, learning environment',
      'Professional certification documents with Swiss tax benefits, career development workspace',
      'International school documents with Swiss education regulations, academic office setting',
      'Online learning platform with Swiss education tax documents, modern learning environment'
    ]
  };

  const prompts = imagePrompts[category] || imagePrompts['Swiss Tax System 2025'];
  return prompts[Math.floor(Math.random() * prompts.length)];
};

// Generate blog post using Google Gemini (Free)
const generateWithGemini = async (topic) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.REACT_APP_GEMINI_API_KEY;
  console.log('Gemini API key available:', !!apiKey);
  console.log('API Key (first 10 chars):', apiKey ? apiKey.substring(0, 10) + '...' : 'Not found');
  
  // Use the correct Gemini model name
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const prompt = `Write a comprehensive blog post about "${topic}" for expats living in Switzerland. 

Requirements:
- Target audience: Expats living in Switzerland
- Tone: Professional but accessible, educational, and engaging
- Length: 800-1200 words
- Structure: Include introduction, main sections with headings, and conclusion
- Content: Focus on practical advice, tax implications, and actionable insights
- Style: Use clear explanations, examples, and Swiss-specific information
- Include relevant Swiss tax rates, deadlines, or regulations where applicable
- Make it current and relevant to 2025 trends and developments
- Include specific Swiss examples, case studies, or scenarios
- Address both opportunities and challenges for expats
- Provide actionable next steps or recommendations

IMPORTANT: You must respond with ONLY valid JSON. Do not include any text before or after the JSON.

Format the response as JSON with the following structure:
{
  "title": "The blog post title",
  "author": "AI Tax Assistant",
  "date": "YYYY-MM-DD",
  "tags": ["tag1", "tag2", "tag3"],
  "summary": "A 2-3 sentence summary of the article",
  "content": "The full HTML content with proper formatting including <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em> tags",
  "image": "A detailed, professional image prompt for Swiss tax/finance context (e.g., 'Professional Swiss tax documents on wooden desk with calculator and coffee, modern office setting, high quality')",
  "alt": "Descriptive alt text for accessibility"
}

Make sure the content is accurate, helpful, and provides real value to expats dealing with Swiss taxes and finance.`;

  console.log('Making request to Gemini API...');
  
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
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4000,
      }
    })
  });

  console.log('Response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error response:', errorText);
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Gemini API response received');
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    console.error('Unexpected Gemini API response structure:', data);
    throw new Error('Invalid response structure from Gemini API');
  }
  
  const aiResponse = data.candidates[0].content.parts[0].text;
  console.log('AI Response length:', aiResponse.length);
  console.log('AI Response preview:', aiResponse.substring(0, 300) + '...');
  
  return aiResponse;
};

// Generate blog post using AI
export const generateBlogPost = async () => {
  try {
    console.log('generateBlogPost called');
    const { category, topic } = getRandomTopic();
    console.log('Selected topic:', { category, topic });
    
    const aiClient = initializeAIClient();
    console.log('AI client initialized:', aiClient);
    
    let response;
    
    switch (aiClient.provider) {
      case AI_PROVIDERS.GEMINI:
        console.log('Using Gemini provider');
        response = await generateWithGemini(topic);
        break;
      case AI_PROVIDERS.OPENAI:
        throw new Error('OpenAI integration requires server-side implementation');
      case AI_PROVIDERS.CLAUDE:
        throw new Error('Claude integration requires server-side implementation');
      case AI_PROVIDERS.HUGGINGFACE:
        throw new Error('Hugging Face integration requires server-side implementation');
      default:
        throw new Error(`Unsupported AI provider: ${aiClient.provider}`);
    }
    
    // Parse the JSON response
    let blogPost;
    try {
      // Try to extract JSON from the response (in case AI added extra text)
      let jsonText = response.trim();
      
      // Remove any markdown code blocks
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Try to find JSON object in the response
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      }
      
      console.log('Attempting to parse JSON:', jsonText.substring(0, 200) + '...');
      blogPost = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw response:', response);
      throw new Error('Invalid AI response format - AI did not return valid JSON');
    }

    // Validate the blog post structure
    if (!blogPost.title || !blogPost.content || !blogPost.summary) {
      console.error('Incomplete blog post structure:', blogPost);
      
      // Create a fallback blog post if the AI response is incomplete
      const today = new Date().toISOString().split('T')[0];
      blogPost = {
        title: blogPost.title || `Guide to ${topic}`,
        author: "AI Tax Assistant",
        date: blogPost.date || today,
        tags: blogPost.tags || ["Swiss Tax", "Expat", "Finance"],
        summary: blogPost.summary || `A comprehensive guide to ${topic} for expats living in Switzerland.`,
        content: blogPost.content || `<h1>${blogPost.title || `Guide to ${topic}`}</h1><p>This article provides essential information about ${topic} for expats in Switzerland.</p>`,
        image: blogPost.image || "Swiss tax documents and calculator",
        alt: blogPost.alt || "Swiss tax preparation"
      };
    }

    // Ensure accurate date and time
    const now = new Date();
    blogPost.date = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    blogPost.timestamp = now.toISOString(); // Full ISO timestamp
    blogPost.formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }); // e.g., "August 31, 2025"
    blogPost.formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Zurich'
    }); // e.g., "20:51" (Swiss time)

    // Improve image prompt if it's generic
    if (!blogPost.image || blogPost.image.includes('descriptive image prompt') || blogPost.image.length < 50) {
      blogPost.image = generateImagePrompt(topic, category);
    }

    // Improve alt text if it's generic
    if (!blogPost.alt || blogPost.alt.includes('Alt text') || blogPost.alt.length < 20) {
      blogPost.alt = `Professional Swiss tax and finance content about ${topic}`;
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
        console.log('Daily blog post generated:', post.title, 'at', post.formattedTime);
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
