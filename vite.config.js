import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      content: [
        "./index.html",
        "./src/App.jsx", // <-- ADD THIS LINE
        "./src/**/*.{js,jsx}",
      ],
    }),
  ],
})