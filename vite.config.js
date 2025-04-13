import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://ms-onec-plugin-master-3.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
