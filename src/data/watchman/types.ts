export interface Verse {
  /** Citation shown above/beside the text, e.g. "Ezekiel 33:7 · NKJV" */
  cite: string;
  /** Verse body; may include newlines for poetic lines */
  text: string;
  /** When true, render text lines split on \n as <br>-separated */
  poetic?: boolean;
}

export type Jurisdiction = 'federal' | 'california' | 'la-city' | 'la-county' | 'orange-county' | 'costa-mesa';

export const recordKinds = [
  'Executive order',
  'Proclamation',
  'Memorandum',
  'Clemency',
  'Designation',
  'Notice',
  'Determination',
  'Public law',
  'Vote',
  'Budget act',
  'Court ruling',
] as const;
export type RecordKind = (typeof recordKinds)[number];

export const recordBranches = ['executive', 'legislative', 'judicial'] as const;
export type RecordBranch = (typeof recordBranches)[number];

export const branchLabels: Record<RecordBranch, string> = {
  executive: 'Executive',
  legislative: 'Legislative',
  judicial: 'Judicial',
};

/** Branch follows the kind of action. One table. */
export const branchByKind: Record<RecordKind, RecordBranch> = {
  'Executive order': 'executive',
  Proclamation: 'executive',
  Memorandum: 'executive',
  Clemency: 'executive',
  Designation: 'executive',
  Notice: 'executive',
  Determination: 'executive',
  'Public law': 'legislative',
  Vote: 'legislative',
  'Budget act': 'legislative',
  'Court ruling': 'judicial',
};

export function branchOf(kind: RecordKind): RecordBranch {
  return branchByKind[kind];
}

/** Finding aids. The id is stored on the action. The label is what the page shows. */
export const topicLabels = {
  economy: 'Economy',
  energy: 'Energy',
  environment: 'Environment',
  'federal-workforce': 'Federal workforce',
  'foreign-affairs': 'Foreign affairs',
  government: 'Government',
  health: 'Health',
  immigration: 'Immigration',
  justice: 'Criminal justice',
  'national-security': 'National security',
  sex: 'Sex & gender',
  speech: 'Speech',
  trade: 'Trade',
  transportation: 'Transportation',
} as const;
export type TopicId = keyof typeof topicLabels;

export type RecordStatusValue = 'reversed' | 'enjoined' | 'struck-down' | 'rescinded';

export const statusLabels: Record<RecordStatusValue, string> = {
  reversed: 'Reversed',
  enjoined: 'Enjoined',
  'struck-down': 'Held unconstitutional',
  rescinded: 'Rescinded',
};

export interface RecordStatus {
  value: RecordStatusValue;
  /** One factual sentence, true of the source it links. */
  note: string;
  sourceUrl: string;
}

/** Plain kind label. Color is reserved for branch and topic. */
export const kindMark: Record<RecordKind, { short: string }> = {
  'Executive order': { short: 'Order' },
  Proclamation: { short: 'Procl.' },
  Memorandum: { short: 'Memo' },
  Clemency: { short: 'Clemency' },
  Designation: { short: 'Desig.' },
  Notice: { short: 'Notice' },
  Determination: { short: 'Det.' },
  'Public law': { short: 'Law' },
  Vote: { short: 'Vote' },
  'Budget act': { short: 'Budget' },
  'Court ruling': { short: 'Opinion' },
};

export interface PassageVote {
  chamber: 'House' | 'Senate';
  date: string;
  yeas: number;
  nays: number;
  citation: string;
  sourceUrl: string;
}

export interface RecordItem {
  jurisdiction: Jurisdiction;
  /** ISO date the action was taken, YYYY-MM-DD. */
  date: string;
  /** Set only when the document states a different effective date. */
  effectiveDate?: string;
  kind: RecordKind;
  branch: RecordBranch;
  /** Who took the action. */
  office: string;
  /** Addressees named on the face of the document. */
  addressedTo?: string;
  /** Instrument citation, such as "Executive Order 14147" or "NSPM-1". */
  citation?: string;
  /** Federal Register citation, such as "90 FR 8235". */
  frCitation?: string;
  title: string;
  /** Stable fragment, such as eo-14160. Derived when omitted. */
  id?: string;
  /** Short number shown on the row, such as 14160 or 119-1. */
  number?: string;
  /** Official one-line description from the document or the court. */
  summary?: string;
  /** Passage votes for a law. Empty when the action is not a statute. */
  votes?: PassageVote[];
  /** Primary source. Only https URLs are linked. */
  sourceUrl: string;
  topics: TopicId[];
  status?: RecordStatus;
}

export interface DoorImage {
  avif: string;
  avifSmall: string;
  webp: string;
}

export interface DoorLink {
  href: string;
  title: string;
  image: DoorImage;
  /** Kept in the list, omitted from the page until set false. */
  hidden?: boolean;
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
