// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sitemap } from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'http://localhost:5173',
      routes: [
        '/',
        '/shop',
        '/about',
        '/blog',
        '/contact',
      ],
      changefreq: 'weekly',
      priority: 0.8,
    }),
  ],
});