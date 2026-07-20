# Stewardmark website

The Stewardmark marketing site: a statically rendered [Astro](https://astro.build)
project deployed on Cloudflare Pages. Two pages, home and about, built from the
approved "Amber Professional" prototypes and the Stewardmark design system.

The site is deliberately simple to run and to edit. **All copy lives in markdown
files** so you can change any text on the site without opening a component. The
only JavaScript that ships to the browser is the hero's cycling eyebrow; every
other pixel is static HTML and CSS.

---

## Editing copy (the common case)

Every user-facing string is a markdown file under [`src/content/`](src/content/).
Edit the file, save, and the site updates. You never need to touch a component.

| To change...                                   | Edit...                                            |
| ---------------------------------------------- | -------------------------------------------------- |
| Brand name, tagline, nav labels, footer, LinkedIn, contact | [`src/content/site/site.md`](src/content/site/site.md) |
| **Home page** hero, stats, section headings, verticals, the About blurb + Number Zoo callout | [`src/content/pages/home.md`](src/content/pages/home.md) |
| **About page** hero, career stats, summary, section headings | [`src/content/pages/about.md`](src/content/pages/about.md) |
| **Contact page** heading, intro, form labels, interest options, privacy note, success/error text | [`src/content/pages/contact.md`](src/content/pages/contact.md) |
| The **six service tiles** (title, description, button text) | one file each in [`src/content/services/`](src/content/services/) |
| The **track-record milestones** (About page)   | one file each in [`src/content/milestones/`](src/content/milestones/) |
| The **career timeline** roles (About page)     | one file each in [`src/content/roles/`](src/content/roles/) |

### How a content file is laid out

Each file has a **frontmatter** block between `---` lines (the short fields) and,
below it, an optional **body** for longer prose. For example, a service tile:

```markdown
---
order: 2                                   # controls position in the grid
title: Put AI Agents to Work in Your Business
cta: Book an AI Opportunity Assessment     # the button text
---

Identify where agentic AI creates measurable efficiency, pilot it safely, scale
it with governance.  Built by someone who runs multi-agent systems himself.
```

The text under the `---` is the tile's description. To reword a tile, edit those
lines. To reorder the six tiles, change the `order` numbers. To add or remove a
tile, add or delete a file in `src/content/services/` (keep the `order` values
sensible).

The milestones and roles collections work the same way: one file per item, an
`order` field for sequence, and the body holds the prose.

A few notes:

- **Links inside prose** use normal markdown, e.g. `[Number Zoo](https://numberzoo.ai)`.
  See the body of `home.md` for the live example.
- **House style** (from the brand guidelines): sentence case, two spaces after a
  sentence, no em dashes, no exclamation points, no emoji. Keep to it and the
  copy stays on-brand.
- If you mistype a field name or leave a required field blank, the build fails
  with a clear message rather than shipping a broken page. The schema that
  enforces this lives in [`src/content.config.ts`](src/content.config.ts).

---

## Running it locally

You need [Node.js](https://nodejs.org) 22.12 or newer.

```bash
npm install      # once, to install dependencies
npm run dev      # start the local dev server
```

Then open the URL it prints (default http://localhost:4321). The site
hot-reloads as you edit content or components.

To produce the exact files that get deployed:

```bash
npm run build    # outputs the static site to dist/
npm run preview  # serve the built dist/ locally to double-check
```

---

## Project structure

```
src/
  content/            All site copy (markdown). See the table above.
    content.config.ts Schemas that validate the frontmatter.
  components/         Astro components + one React island.
    EyebrowRoller.tsx The hero's cycling eyebrow (the only client-side JS).
    Logo, Nav, Footer, ServiceTile, Stat, MilestoneTile, Role
  layouts/Base.astro  Shared <head>, fonts, nav wrapper.
  components/
    ContactForm.tsx   The /contact form (React island: Turnstile + submit).
  pages/
    index.astro       Home page    (/)
    about.astro       About page   (/about)
    contact.astro     Contact page (/contact)
  styles/
    global.css        Design-system primitives (buttons, cards, eyebrows...).
    contact-form.css  Contact form field/control styles.
    tokens/           Colors, type, spacing, fonts — copied from the
                      Stewardmark design system; the source of truth for styling.
  assets/             Benchmark Diamond logo SVGs.
functions/
  api/contact.ts      Cloudflare Pages Function behind the contact form.
public/
  favicon.svg
```

Styling comes from the Stewardmark design system. The token files in
`src/styles/tokens/` are copied straight from it; `global.css` and the
component styles reference those tokens, so brand colors, type, and spacing
stay consistent. React is used only where interactivity requires it (the hero
roller and the contact form). Everything else is a plain Astro component and
renders to static HTML.

---

## Contact form

The `/contact` page has a working email form. The browser posts to a Cloudflare
Pages Function at `/api/contact` ([`functions/api/contact.ts`](functions/api/contact.ts)),
which verifies a Cloudflare Turnstile token (anti-spam), then sends the message
through [Resend](https://resend.com). The visitor never leaves the page: success
and error are shown inline, and on failure the form offers the direct email
address as a fallback.

**One-time setup (required for the form to actually send):**

1. **Set two secrets** on the Cloudflare Pages project
   (Settings → Environment variables), for **both** Production and Preview:
   - `TURNSTILE_SECRET_KEY` — the Turnstile widget's Secret Key.
   - `RESEND_API_KEY` — a Resend API key.
   These are secrets and are never committed to the repo.
2. **Set the public Turnstile site key.** Edit `turnstileSiteKey` in
   [`src/content/site/site.md`](src/content/site/site.md). It currently holds
   Cloudflare's **test** key (always passes) as a placeholder — replace it with
   the real site key. This one is public and belongs in the file.
3. **Verify the sending domain in Resend** so `site@stewardmark.ai` can send.
   Mail goes From `site@stewardmark.ai`, To `info@stewardmark.ai`, with the
   visitor's address as Reply-To.

Change the recipient, sender, or subject in `functions/api/contact.ts`. Change
the form's labels, interest options, and messages in
[`src/content/pages/contact.md`](src/content/pages/contact.md).

**Testing the function locally** (optional) needs the Cloudflare CLI:

```bash
npm run build
# create .dev.vars (gitignored) with test values:
#   TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA   (always passes)
#   RESEND_API_KEY=your_real_or_dummy_key
npx wrangler pages dev dist
```

A real `RESEND_API_KEY` is needed for a message to actually be delivered; with a
dummy key the request is accepted and validated but the send step returns an
error.

---

## SEO and social sharing

- **`sitemap.xml`** is generated at build by `@astrojs/sitemap` (served as
  `sitemap-index.xml` + `sitemap-0.xml`). It uses the `site` origin in
  [`astro.config.mjs`](astro.config.mjs) — keep that set to the real domain.
- **`public/robots.txt`** allows all crawlers and points to the sitemap.
- **Open Graph + Twitter card** tags are set for every page in
  [`src/layouts/Base.astro`](src/layouts/Base.astro) (title and description come
  from each page; the image is the shared card below).
- **Social share image:** [`public/og.png`](public/og.png), 1200x630, on brand
  (Graphite Blue field, Kiln Orange mark and accent, wordmark and tagline in
  Paper). To regenerate it after a brand tweak, render a 1200x630 HTML mockup
  and screenshot it, e.g. with headless Chrome:
  `chrome --headless --window-size=1200,630 --screenshot=public/og.png mock.html`.
- **Icons:** [`public/favicon.svg`](public/favicon.svg) and a 180x180
  `public/apple-touch-icon.png` for iOS and link unfurls.

After deploy, validate the cards with Facebook's Sharing Debugger and X's Post
Inspector (they also refresh each platform's cache).

---

## How deploys work

The site is hosted on **Cloudflare Pages**, connected directly to this GitHub
repository (Cloudflare's Git integration).

- **Every push to `main` triggers a production deploy.** Cloudflare runs
  `npm run build` and publishes the `dist/` folder. No GitHub Actions, no
  secrets to manage.
- **Every pull request gets its own preview URL**, so you can see a change live
  before it merges to `main`.

The build settings in the Cloudflare Pages project are:

| Setting                  | Value           |
| ------------------------ | --------------- |
| Framework preset         | Astro           |
| Build command            | `npm run build` |
| Build output directory   | `dist`          |
| Node version             | 22 (pinned via `.nvmrc`) |

### The normal workflow

1. Edit a content file (see the table above).
2. Commit and push to a branch, open a pull request.
3. Review the change on the pull request's Cloudflare preview URL.
4. Merge to `main`. Cloudflare deploys it to production within a minute or two.

`main` is protected: changes land through pull requests rather than direct
commits, which keeps the deployed site reviewable.
