import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Root alias for src folder
      '@': resolve(__dirname, './src'),

      // Optional: only the main packages you actually import often
      'react-hook-form': 'react-hook-form',
      'react-day-picker': 'react-day-picker',
      'next-themes': 'next-themes',
      'lucide-react': 'lucide-react',
      'embla-carousel-react': 'embla-carousel-react',
      'cmdk': 'cmdk',
      'class-variance-authority': 'class-variance-authority',

      // Radix UI core packages you use
      '@radix-ui/react-tooltip': '@radix-ui/react-tooltip',
      '@radix-ui/react-dialog': '@radix-ui/react-dialog',
      '@radix-ui/react-popover': '@radix-ui/react-popover',
      '@radix-ui/react-accordion': '@radix-ui/react-accordion',
      '@radix-ui/react-tabs': '@radix-ui/react-tabs',
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist', // Vercel expects dist folder
    sourcemap: false,
    minify: 'terser',
  },
  server: {
    port: 3000,
    open: true,
  },
});
