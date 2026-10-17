export interface Verse {
  /** Citation shown above/beside the text, e.g. "Ezekiel 33:7 · NKJV" */
  cite: string;
  /** Verse body; may include newlines for poetic lines */
  text: string;
  /** When true, render text lines split on \n as <br>-separated */
  poetic?: boolean;
}

export type Jurisdiction = 'federal' | 'california' | 'la-city' | 'la-county' | 'orange-county' | 'costa-mesa';

export type RecordLabelTone = 'mk' | 'pr';

export interface RecordItem {
  jurisdiction: Jurisdiction;
  /** ISO date YYYY-MM-DD */
  date: string;
  kind: string;
  title: string;
  /** Primary source; only https: URLs are linked */
  sourceUrl?: string;
  isExample: boolean;
  /** Optional status / kind label (Enjoined, Press release, …) */
  label?: { text: string; tone: RecordLabelTone };
  /** Shown on the highlight shelf when true */
  highlight?: boolean;
}

export interface DoorLink {
  href: string;
  title: string;
  description: string;
  image: {
    avif: string;
    avifSmall: string;
    webp: string;
    place: 'federal' | 'california' | 'la';
  };
}

/** Return url only when it is a valid https: URL; otherwise undefined. */
export function httpsSourceUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    if (u.protocol === 'https:') return url;
  } catch {
    /* invalid */
  }
  return undefined;
}
