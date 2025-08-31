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
- **AI Blog Generation** - Automated content creation using OpenAI GPT-4
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
- OpenAI API key (for AI blog generation feature)

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
   
   # Add your OpenAI API key
   echo "REACT_APP_OPENAI_API_KEY=your_api_key_here" >> .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### AI Blog Generation Setup

1. **Get OpenAI API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add it to your `.env.local` file

2. **Access Admin Panel**
   - Navigate to `http://localhost:5173/admin`
   - Generate posts manually or enable auto-generation

3. **Daily Auto-Generation**
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
