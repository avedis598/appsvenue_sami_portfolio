import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase/auth') || id.includes('@firebase/auth') || id.includes('firebase/storage') || id.includes('@firebase/storage')) {
              return 'firebase-admin';
            }
            if (id.includes('firebase') || id.includes('@firebase')) {
              return 'firebase-core';
            }
            if (id.includes('motion') || id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('react-dom') || id.includes('react-router') || id.includes('/react/')) {
              return 'react-vendor';
            }
          }
        },
      },
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
