import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Split stable, rarely-changing vendor code into its own chunks so
        // repeat visits (and navigation between routes) can serve them from
        // cache instead of re-downloading everything as one monolithic
        // bundle whenever app code changes.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          // React and everything that depends directly on its internals
          // (react-dom, the router, the scheduler) has to stay in one chunk
          // — splitting scheduler/react-dom apart from react caused a
          // circular chunk reference.
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) {
            return 'vendor-react'
          }
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('@supabase')) return 'vendor-supabase'
          return 'vendor'
        },
      },
    },
  },
})
