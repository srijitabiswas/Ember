import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    // Keep large animation/vendor libraries in their own chunks so a change
    // in application code doesn't invalidate the vendor cache, and so the
    // initial payload stays lean.
    rollupOptions: {
      output: {
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
