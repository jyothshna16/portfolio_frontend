import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default {
  server: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.message.includes('Module level directives cause errors when bundled')) {
          return;
        }
        warn(warning);
      }
    }
  }
}



