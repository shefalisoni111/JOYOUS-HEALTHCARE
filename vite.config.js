import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const API_URL = "https://api.joyoushealthcareuk.com";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    watch: {
      ignored: ["**/vite.config.js"],
    },
    host: true,
    strictPort: true,
    allowedHosts: [".recpalapp.co.uk"],
  },
  define: {
    VITE_API_URL: JSON.stringify(API_URL),
  },
});
