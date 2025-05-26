import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],  // Use React plugin for Vite
  base: '/',  // Set the base path for the application
})
