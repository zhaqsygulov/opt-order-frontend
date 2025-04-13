import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
server: {
    proxy: {
      '/api': {
        target: 'https://ms-onec-plugin-master-3.onrender.com', // или адрес Render-бэкенда
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
