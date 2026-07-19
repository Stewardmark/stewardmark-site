import { useEffect, useState } from 'react';

interface Props {
  /** Phrases to cycle through. The first renders server-side for no-JS. */
  items: string[];
}

/**
 * The hero's cycling eyebrow. Every 4.8s it fades out (450ms), swaps to the
 * next phrase, and fades back in, matching the approved prototype. This is
 * the site's only stateful, time-driven element, so it is the only React
 * island. With JS disabled the first phrase renders statically.
 */
export default function EyebrowRoller({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (items.length <= 1) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cycle = setInterval(() => {
      if (prefersReduced) {
        setIndex((i) => (i + 1) % items.length);
        return;
      }
      setOpacity(0);
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setOpacity(1);
      }, 450);
    }, 4800);

    return () => clearInterval(cycle);
  }, [items.length]);

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '13px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--color-slate)',
        marginBottom: '20px',
        minHeight: '20px',
        transition: 'opacity 0.45s ease',
        opacity,
      }}
    >
      {items[index]}
    </div>
  );
}
