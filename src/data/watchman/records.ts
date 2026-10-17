import type { RecordItem } from './types';

/** Shared placeholder example set. Every door still shows EXAMPLE rows only. */
const sharedExamples: Omit<RecordItem, 'jurisdiction'>[] = [
  {
    date: '2027-03-04',
    kind: 'Executive order',
    title: 'EXAMPLE item title (placeholder)',
    isExample: true,
  },
  {
    date: '2026-11-18',
    kind: 'Court ruling',
    title: 'EXAMPLE item title (placeholder)',
    isExample: true,
    label: { text: 'Enjoined', tone: 'mk' },
    highlight: true,
  },
  {
    date: '2026-06-30',
    kind: 'Public law',
    title: 'EXAMPLE item title (placeholder)',
    isExample: true,
  },
  {
    date: '2025-09-12',
    kind: 'Press release',
    title: 'EXAMPLE item title (placeholder)',
    isExample: true,
    label: { text: 'Press release', tone: 'pr' },
  },
  {
    date: '2025-04-02',
    kind: 'Budget act',
    title: 'EXAMPLE item title (placeholder)',
    isExample: true,
    label: { text: 'Reversed', tone: 'mk' },
  },
  {
    date: '2025-01-20',
    kind: 'Executive order',
    title: 'EXAMPLE item title (placeholder)',
    isExample: true,
    highlight: true,
  },
];

function withJurisdiction(
  jurisdiction: RecordItem['jurisdiction'],
  rows: Omit<RecordItem, 'jurisdiction'>[],
): RecordItem[] {
  return rows.map((r) => ({ ...r, jurisdiction }));
}

export const federalRecords: RecordItem[] = withJurisdiction('federal', sharedExamples);
export const californiaRecords: RecordItem[] = withJurisdiction('california', sharedExamples);
export const laCityRecords: RecordItem[] = withJurisdiction('la-city', sharedExamples);
export const laCountyRecords: RecordItem[] = withJurisdiction('la-county', sharedExamples);
export const orangeCountyRecords: RecordItem[] = withJurisdiction('orange-county', sharedExamples);
export const costaMesaRecords: RecordItem[] = withJurisdiction('costa-mesa', sharedExamples);

export function highlights(records: RecordItem[]): RecordItem[] {
  return records.filter((r) => r.highlight);
}

/** All items newest first (highlights included). */
export function allNewestFirst(records: RecordItem[]): RecordItem[] {
  return [...records].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
