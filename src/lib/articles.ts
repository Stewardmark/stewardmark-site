import { getCollection } from 'astro:content';

/** Published articles (drafts excluded), newest first. */
export async function getArticles() {
  return (await getCollection('articles', (a) => !a.data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
}

/** Long-form date, e.g. "September 24, 2026". Fixed to UTC so the build
 *  machine's time zone never shifts the day. */
export function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
