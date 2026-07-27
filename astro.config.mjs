import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  image: {
    domains: ['style.yh-inc.jp'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
