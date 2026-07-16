import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) {
            return 'vendor-react';
          }
          if (/node_modules\/(framer-motion|lucide-react|@radix-ui)\//.test(id)) {
            return 'vendor-ui';
          }
          if (id.includes('node_modules/react-helmet')) {
            return 'vendor-helmet';
          }
          if (/node_modules\/(@firebase|firebase)\//.test(id)) {
            return 'vendor-firebase';
          }
        }
      }
    }
  },
  server: {
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
    allowedHosts: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
});
