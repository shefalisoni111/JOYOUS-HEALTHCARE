import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const API_URL = 'https://recpalapp.co.uk/api/';
// const API_URL = 'http://194.31.150.133:3000';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: API_URL, 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  define: {
      VITE_API_URL: JSON.stringify(API_URL),
  },
  optimizeDeps: {
    include: ['vue'],
    exclude: ['vue-demi'],
  },
});
