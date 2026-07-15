import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            if (id.includes('recharts')) return 'vendor-recharts';
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('/react/')) return 'vendor-react';
            if (id.includes('/react-dom/')) return 'vendor-react';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('@tanstack')) return 'vendor-query';
            if (id.includes('lucide-react')) return 'vendor-icons';
          }
        },
      },
    },
  },
});
