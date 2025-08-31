# Taxed.ch Website Copy

This repository contains a copy of the website from [www.taxed.ch](https://www.taxed.ch).

## Structure

The website is a React application built with Vite and hosted on Hostinger Horizons. The main content is dynamically loaded through JavaScript.

### Files

- `index.html` - Main HTML file
- `assets/` - Directory containing JavaScript and CSS assets
  - `index-e4bf663f.js` - Main JavaScript bundle (React application)
  - `index-6cecc679.css` - Main CSS styles
- `vite.svg` - Vite logo/favicon

## How to Run

Since this is a static copy of a React application, you can serve it using any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open your browser to `http://localhost:8000`

## Notes

- This is a static copy of the website as of the download date
- The original website uses dynamic content loading, so some functionality may not work in this static copy
- The JavaScript is minified and would need to be analyzed further to understand the full application structure

## Original Website

The original website can be found at: https://www.taxed.ch
