// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Static site (SSG). Every page is prerendered to HTML at build time and
// served as flat files from Cloudflare Pages. React is used only for the
// small interactive island(s); everything else ships zero JS.
//
// `site` is the canonical production origin. It drives the sitemap URLs and
// the absolute canonical / Open Graph URLs built in the Base layout, so it
// must be the real domain, not the *.pages.dev alias.
export default defineConfig({
  output: 'static',
  site: 'https://stewardmark.ai',
  integrations: [react(), sitemap()],
});
