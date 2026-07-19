import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections. Every user-facing string on the site lives in a
 * markdown file under src/content/ so copy can be edited without touching
 * a single component. Schemas below validate the frontmatter at build time,
 * so a typo (missing field, wrong shape) fails the build with a clear error
 * instead of shipping a broken page.
 *
 *  - site        one file of brand-wide copy reused on every page
 *  - pages       one file per page (home, about) for that page's section copy
 *  - services    one file per service tile (the six "ways to engage")
 *  - milestones  one file per track-record milestone (About page)
 *  - roles       one file per career role (About page)
 */

const stat = z.object({ stat: z.string(), label: z.string() });

const site = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/site' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    nav: z.object({
      services: z.string(),
      about: z.string(),
      contact: z.string(),
    }),
    scheduleCta: z.string(),
    scheduleHref: z.string().url(),
    seeWhatIDo: z.string(),
    linkedinUrl: z.string().url(),
    linkedinLabel: z.string(),
    numberZooUrl: z.string().url(),
    contactHeading: z.string(),
    contactEmailIntro: z.string(),
    contactEmail: z.string(),
    contactEmailHref: z.string(),
    independenceHeading: z.string(),
    independenceBody: z.string(),
    copyright: z.string(),
    // #contact is an on-page anchor in the prototype; kept configurable in
    // case a real scheduling link (Calendly, mailto, etc.) is wired later.
    contactHref: z.string(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Home-only fields are optional so the About page file can omit them.
    hero: z.object({
      eyebrow: z.string().optional(),
      roller: z.array(z.string()).optional(),
      headline: z.string(),
      subhead: z.string(),
      ctaPrimary: z.string().optional(),
      ctaSecondary: z.string().optional(),
    }),
    proofs: z.array(stat).optional(),
    servicesEyebrow: z.string().optional(),
    servicesHeading: z.string().optional(),
    verticalsEyebrow: z.string().optional(),
    verticals: z.array(z.string()).optional(),
    aboutEyebrow: z.string().optional(),
    aboutHeading: z.string().optional(),
    aboutBody: z.string().optional(),
    // About page fields
    stats: z.array(stat).optional(),
    summaryEyebrow: z.string().optional(),
    summaryHeading: z.string().optional(),
    summaryBody: z.array(z.string()).optional(),
    trackRecordEyebrow: z.string().optional(),
    trackRecordHeading: z.string().optional(),
    careerEyebrow: z.string().optional(),
    careerHeading: z.string().optional(),
    footerCtaHeading: z.string().optional(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    cta: z.string(),
  }),
});

const milestones = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/milestones' }),
  schema: z.object({
    order: z.number(),
    year: z.string(),
    title: z.string(),
  }),
});

const roles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/roles' }),
  schema: z.object({
    order: z.number(),
    years: z.string(),
    title: z.string(),
    org: z.string(),
  }),
});

export const collections = { site, pages, services, milestones, roles };
