// News Service for Automated Swiss Tax News Aggregation and AI Rewriting
// This service fetches news from multiple sources, rewrites with AI, and publishes daily

// Configuration for news sources and AI
const NEWS_SOURCES = {
  // Swiss Government Sources
  swissAdmin: {
    name: 'Swiss Federal Administration',
    url: 'https://www.admin.ch/gov/en/start/federal-council/news.html',
    category: 'government'
  },
  efd: {
    name: 'Swiss Federal Department of Finance',
    url: 'https://www.efd.admin.ch/efd/en/home/finanzpolitik/steuerpolitik.html',
    category: 'tax-policy'
  },
  estv: {
    name: 'Swiss Federal Tax Administration',
    url: 'https://www.estv.admin.ch/estv/en/home/steuern.html',
    category: 'tax-law'
  },
  // Swiss News Sources
  swissInfo: {
    name: 'SwissInfo',
    url: 'https://www.swissinfo.ch/eng/tax',
    category: 'news'
  },
  leTemps: {
    name: 'Le Temps',
    url: 'https://www.letemps.ch/economie/fiscalite',
    category: 'news'
  },
  nzz: {
    name: 'NZZ',
    url: 'https://www.nzz.ch/finanzen/steuern',
    category: 'news'
  }
};

// Keywords for filtering relevant tax news
const TAX_KEYWORDS = [
  'tax', 'steuer', 'fiscal', 'fiscalité', 'imposta',
  'income tax', 'wealth tax', 'corporate tax', 'VAT', 'MWST',
  'tax reform', 'tax treaty', 'tax deduction', 'tax credit',
  'pillar 3a', 'retirement', 'pension', 'real estate tax',
  'digital tax', 'cryptocurrency tax', 'expat tax'
];

// AI rewriting prompts for different content types
const AI_REWRITE_PROMPTS = {
  news: `Rewrite this Swiss tax news article in a professional, engaging tone. 
  Requirements:
  - Maintain factual accuracy and key information
  - Use clear, professional language suitable for tax professionals and businesses
  - Include relevant Swiss context and implications
  - Add value through analysis and insights
  - Keep the same key facts but use different wording to avoid plagiarism
  - Include a "Source" section at the end with proper attribution
  - Target length: 200-300 words
  
  Original article:`,
  
  analysis: `Create a comprehensive analysis of this Swiss tax development. 
  Requirements:
  - Provide expert insights and implications
  - Include practical advice for businesses and individuals
  - Reference relevant Swiss tax laws and regulations
  - Add historical context if relevant
  - Include actionable recommendations
  - Maintain professional tone while being accessible
  - Include proper source attribution
  - Target length: 300-400 words
  
  Development to analyze:`
};

// Function to fetch news from multiple sources
export const fetchNewsFromSources = async () => {
  try {
    
    // In a real implementation, this would use web scraping or RSS feeds
    // For now, we'll simulate fetching from different sources
    const fetchedNews = await Promise.all([
      fetchSwissAdminNews(),
      fetchEFDNews(),
      fetchESTVNews(),
      fetchSwissInfoNews(),
      fetchLeTempsNews(),
      fetchNZZNews()
    ]);
    
    // Flatten and filter results
    const allNews = fetchedNews.flat().filter(news => 
      news && TAX_KEYWORDS.some(keyword => 
        news.title.toLowerCase().includes(keyword.toLowerCase()) ||
        news.description.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    return allNews;

  } catch (error) {
    return [];
  }
};

// Simulated news fetching functions (in production, these would use real APIs/scraping)
const fetchSwissAdminNews = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: `admin_${Date.now()}_1`,
      title: 'Federal Council Proposes Digital Tax Reforms for 2025',
      description: 'The Swiss government has announced comprehensive digital tax reforms aimed at modernizing the tax system.',
      source: 'Swiss Federal Administration',
      originalUrl: 'https://www.admin.ch/gov/en/start/federal-council/news.html',
      publishedAt: new Date().toISOString(),
      category: 'government',
      rawContent: 'The Federal Council has proposed new digital tax measures...'
    }
  ];
};

const fetchEFDNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: `efd_${Date.now()}_1`,
      title: 'Swiss Tax Policy Updates: New Corporate Tax Incentives',
      description: 'The Federal Department of Finance announces new corporate tax incentives for innovation and sustainability.',
      source: 'Swiss Federal Department of Finance',
      originalUrl: 'https://www.efd.admin.ch/efd/en/home/finanzpolitik/steuerpolitik.html',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      category: 'tax-policy',
      rawContent: 'The Federal Department of Finance has introduced new corporate tax incentives...'
    }
  ];
};

const fetchESTVNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: `estv_${Date.now()}_1`,
      title: 'Updated VAT Guidelines for Digital Services',
      description: 'The Federal Tax Administration releases new VAT guidelines for digital services and e-commerce.',
      source: 'Swiss Federal Tax Administration',
      originalUrl: 'https://www.estv.admin.ch/estv/en/home/steuern/mehrwertsteuer.html',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'tax-law',
      rawContent: 'The Federal Tax Administration has updated its VAT guidelines...'
    }
  ];
};

const fetchSwissInfoNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: `swissinfo_${Date.now()}_1`,
      title: 'Swiss Cantons Compete for International Business with Tax Reforms',
      description: 'Several Swiss cantons are implementing tax reforms to attract international businesses.',
      source: 'SwissInfo',
      originalUrl: 'https://www.swissinfo.ch/eng/tax',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'news',
      rawContent: 'Swiss cantons are increasingly competing for international business...'
    }
  ];
};

const fetchLeTempsNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: `letemps_${Date.now()}_1`,
      title: 'Nouvelles Mesures Fiscales pour les Startups en Suisse',
      description: 'Le gouvernement suisse annonce de nouvelles mesures fiscales pour soutenir les startups.',
      source: 'Le Temps',
      originalUrl: 'https://www.letemps.ch/economie/fiscalite',
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'news',
      rawContent: 'Le gouvernement suisse a annoncé de nouvelles mesures fiscales...'
    }
  ];
};

const fetchNZZNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: `nzz_${Date.now()}_1`,
      title: 'Steuerreform: Neue Anreize für nachhaltige Investitionen',
      description: 'Die Schweizer Regierung führt neue Steueranreize für nachhaltige Investitionen ein.',
      source: 'NZZ',
      originalUrl: 'https://www.nzz.ch/finanzen/steuern',
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'news',
      rawContent: 'Die Schweizer Regierung hat neue Steueranreize für nachhaltige Investitionen...'
    }
  ];
};

// Function to rewrite news content with AI
export const rewriteNewsWithAI = async (originalNews) => {
  try {
    
    // Get AI provider (using the same system as blog generation)
    const aiProvider = import.meta.env.VITE_AI_PROVIDER || 'gemini';
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('AI API key not configured');
    }
    
    // Create AI rewriting prompt
    const prompt = `${AI_REWRITE_PROMPTS.news}

Title: ${originalNews.title}
Source: ${originalNews.source}
Original Content: ${originalNews.rawContent}

Please rewrite this article with the following requirements:
1. Maintain all key facts and information
2. Use different wording to avoid plagiarism
3. Add professional analysis and insights
4. Include Swiss context and implications
5. End with a "Source" section attributing the original source
6. Keep it professional and engaging
7. Target length: 200-300 words

Respond with ONLY a JSON object in this format:
{
  "title": "Rewritten title",
  "description": "Brief description",
  "content": "Full rewritten content with source attribution",
  "tags": ["tag1", "tag2", "tag3"],
  "category": "category"
}`;

    // Call AI API
    let rewrittenContent;
    if (aiProvider === 'gemini') {
      rewrittenContent = await generateWithGemini(prompt);
    } else {
      throw new Error(`AI provider ${aiProvider} not supported for news rewriting`);
    }
    
    // Parse AI response
    const parsed = JSON.parse(rewrittenContent);
    
    // Create rewritten news object
    const rewrittenNews = {
      id: `rewritten_${originalNews.id}`,
      title: parsed.title,
      description: parsed.description,
      content: parsed.content,
      source: originalNews.source,
      originalUrl: originalNews.originalUrl,
      publishedAt: new Date().toISOString(),
      category: parsed.category,
      tags: parsed.tags,
      isRewritten: true,
      originalNewsId: originalNews.id,
      image: generateNewsImage(parsed.category),
      imageAlt: `News image for ${parsed.category} category`
    };
    
    return rewrittenNews;

  } catch (error) {
    // Return original news if AI rewriting fails
    return {
      ...originalNews,
      isRewritten: false,
      content: `Original content from ${originalNews.source}. For full details, please visit the source.`,
      image: generateNewsImage(originalNews.category),
      imageAlt: `News image for ${originalNews.category} category`
    };
  }
};

// Function to generate news image based on category
const generateNewsImage = (category) => {
  const categoryImages = {
    'government': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center',
    'tax-policy': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop&crop=center',
    'tax-law': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=center',
    'news': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center',
    'business': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop&crop=center'
  };
  
  return categoryImages[category] || categoryImages['news'];
};

// Function to save rewritten news to local storage
export const saveRewrittenNews = (rewrittenNews) => {
  try {
    const existingNews = JSON.parse(localStorage.getItem('rewrittenNews') || '[]');
    
    // Check if news with same original ID already exists
    const existingIndex = existingNews.findIndex(news => 
      news.originalNewsId === rewrittenNews.originalNewsId
    );
    
    if (existingIndex >= 0) {
      // Update existing news
      existingNews[existingIndex] = rewrittenNews;
    } else {
      // Add new news
      existingNews.unshift(rewrittenNews);
    }
    
    // Keep only last 50 news articles
    const trimmedNews = existingNews.slice(0, 50);
    
    localStorage.setItem('rewrittenNews', JSON.stringify(trimmedNews));

    return true;
  } catch (error) {
    return false;
  }
};

// Function to get all rewritten news
export const getRewrittenNews = () => {
  try {
    const news = JSON.parse(localStorage.getItem('rewrittenNews') || '[]');
    return news.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  } catch (error) {
    return [];
  }
};

// Main function to run daily news aggregation and rewriting
export const runDailyNewsAggregation = async () => {
  try {
    // Fetch news from all sources
    const fetchedNews = await fetchNewsFromSources();

    if (fetchedNews.length === 0) {
      return [];
    }
    
    // Rewrite each news article with AI
    const rewrittenNews = [];
    for (const news of fetchedNews.slice(0, 5)) { // Limit to 5 articles per day
      const rewritten = await rewriteNewsWithAI(news);
      if (rewritten) {
        rewrittenNews.push(rewritten);
        // Save each rewritten article
        saveRewrittenNews(rewritten);
        
        // Add delay between AI calls to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    return rewrittenNews;

  } catch (error) {
    return [];
  }
};

// Function to schedule daily news aggregation
export const scheduleDailyNewsUpdate = () => {
  // Check if auto-generation is enabled
  const autoGenerate = localStorage.getItem('autoGenerateNews') === 'true';

  if (!autoGenerate) {
    return;
  }

  // Check if we've already run today
  const lastRun = localStorage.getItem('lastNewsGenerationDate');
  const today = new Date().toDateString();

  if (lastRun === today) {
    return;
  }

  // Run news aggregation
  runDailyNewsAggregation().then(() => {
    localStorage.setItem('lastNewsGenerationDate', today);
  });
};

// Legacy function for backward compatibility
export const fetchSwissTaxNews = async () => {
  // Return rewritten news instead of mock data
  return getRewrittenNews();
};

// Helper function for Gemini AI (reusing from blog generator)
const generateWithGemini = async (prompt) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'YOUR_ACTUAL_GEMINI_API_KEY_HERE') {
      throw new Error('Please replace YOUR_ACTUAL_GEMINI_API_KEY_HERE with your real Google Gemini API key');
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
          maxOutputTokens: 2048,
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }
    
    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    let jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/);
    if (!jsonMatch) {
      jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    }
    
    if (jsonMatch) {
      return jsonMatch[1] || jsonMatch[0];
    } else {
      throw new Error('Invalid AI response format');
    }
    
  } catch (error) {
    throw error;
  }
};


