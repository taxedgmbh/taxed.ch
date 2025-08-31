# Taxed.ch Website - Complete Source Code

This repository contains the complete source code for the website from [www.taxed.ch](https://www.taxed.ch), exported from Hostinger Horizons.

## 🚀 What's Included

### Complete React Application
- **Full source code** from Hostinger Horizons export
- **React 18** with Vite build system
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Framer Motion** for animations
- **Radix UI** components
- **Shopping cart functionality**
- **Blog system**
- **E-commerce features**

### Pages & Components
- **Landing Page** - Hero, Benefits, Packages, Contact, FAQ sections
- **About Page** - Company information
- **Services Page** - Service offerings
- **Store Page** - Product catalog
- **Product Detail Page** - Individual product views
- **Contact Page** - Contact forms
- **Blog Page** - Blog listing and individual posts
- **Pricing Page** - Pricing information
- **Legal Pages** - Privacy, Terms, Impressum

### Features
- **Responsive design** for all devices
- **Shopping cart** with persistent state
- **Toast notifications**
- **SEO optimization** with React Helmet
- **RSS feed generation**
- **Modern UI components**
- **AI Blog Generation** - Automated content creation using multiple AI providers
- **Free AI Options** - Support for Google Gemini, Claude, and Hugging Face (all free!)
- **Daily Auto-Generation** - Scheduled blog posts for consistent content
- **Admin Panel** - Easy management of AI-generated content
- **Content Management** - Manual and AI-generated posts integration

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, CSS Variables
- **UI Components**: Radix UI, Lucide React icons
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Radix UI components
│   │   ├── landing/        # Landing page sections
│   │   └── ...
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── data/               # Static data and content
│   ├── lib/                # Utility functions
│   └── api/                # API integration
├── public/                 # Static assets
├── tools/                  # Build tools and generators
├── plugins/                # Vite plugins
└── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- AI API key (for AI blog generation feature) - **Free options available!**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/taxedgmbh/homepage.git
   cd homepage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp env.example .env.local
   
   # Choose your AI provider and add the API key:
   
   # Option 1: Google Gemini (FREE - Recommended)
   echo "REACT_APP_AI_PROVIDER=gemini" >> .env.local
   echo "REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here" >> .env.local
   
   # Option 2: OpenAI GPT-4 (PAID)
   echo "REACT_APP_AI_PROVIDER=openai" >> .env.local
   echo "REACT_APP_OPENAI_API_KEY=your_openai_api_key_here" >> .env.local
   
   # Option 3: Anthropic Claude (FREE tier)
   echo "REACT_APP_AI_PROVIDER=claude" >> .env.local
   echo "REACT_APP_CLAUDE_API_KEY=your_claude_api_key_here" >> .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### AI Blog Generation Setup

#### 🆓 **Free AI Options (Recommended)**

1. **Google Gemini (FREE)**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a free account
   - Get your API key (15 requests/minute, 2M characters/minute)
   - Set `REACT_APP_AI_PROVIDER=gemini` in `.env.local`

2. **Anthropic Claude (FREE tier)**
   - Visit [Anthropic Console](https://console.anthropic.com/)
   - Create a free account
   - Get your API key (5 messages per 4 hours)
   - Set `REACT_APP_AI_PROVIDER=claude` in `.env.local`

3. **Hugging Face (FREE)**
   - Visit [Hugging Face](https://huggingface.co/settings/tokens)
   - Create a free account
   - Get your API key
   - Set `REACT_APP_AI_PROVIDER=huggingface` in `.env.local`

#### 💰 **Paid Option**

4. **OpenAI GPT-4 (PAID)**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create an account and add payment method
   - Get your API key
   - Set `REACT_APP_AI_PROVIDER=openai` in `.env.local`

#### 🎛️ **Using the System**

1. **Access Admin Panel**
   - Navigate to `http://localhost:5173/admin`
   - Check your current AI provider in the "AI Provider" card
   - Generate posts manually or enable auto-generation

2. **Daily Auto-Generation**
   - Enable auto-generation in the admin panel
   - Posts will be generated automatically once per day
   - Check the admin panel for generation status

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 Customization

### Colors & Branding
The website uses Swiss-themed colors:
- **Steel Blue**: `#375A7F`
- **Brand Red**: `#C7242E`
- **Light Gray**: `#FAFAFA`

### Styling
- Tailwind CSS classes for styling
- CSS custom properties for theming
- Responsive design with mobile-first approach

## 📦 Build & Deploy

### Production Build
```bash
npm run build
```

### Deployment
The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🔧 Development

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update navigation if needed

### Adding New Components
1. Create component in `src/components/`
2. Import and use in your pages
3. Follow the existing component patterns

## 📄 License

This project contains the source code for the Taxed GmbH website. All rights reserved.

## 🌐 Original Website

The original website can be found at: https://www.taxed.ch
