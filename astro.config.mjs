// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Static site (SSG). Every page is prerendered to HTML at build time and
// served as flat files from Cloudflare Pages. React is used only for the
// small interactive island(s); everything else ships zero JS.
export default defineConfig({
  output: 'static',
  integrations: [react()],
  site: 'https://stewardmark.pages.dev',
});
