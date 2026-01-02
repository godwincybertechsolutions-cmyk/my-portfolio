import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    return {
      // IMPORTANT: Set base to empty or '/' for Vercel
      base: '',
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      build: {
        outDir: 'dist',
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor': ['react', 'react-dom', 'react-router-dom'],
              'animations': ['framer-motion'],
            },
            // Proper asset naming
            assetFileNames: 'assets/[name]-[hash][extname]',
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
          },
        },
        minify: 'esbuild',
        target: 'esnext',
        cssCodeSplit: true,
        sourcemap: false,
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
