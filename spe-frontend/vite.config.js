import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Enable polling for file watching
    },
    host: true, // Allow Vite to use the default host (typically localhost)
    strictPort: true, // Ensure that the specified port is used
    port: 3000, // Set the port to 8080
  },
});
