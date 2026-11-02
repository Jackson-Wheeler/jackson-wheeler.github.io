import type { RecordItem } from './types';
import { federalRecords } from './records';

export type AdministrationId = 'obama' | 'trump-1' | 'biden' | 'trump-2';

export interface Administration {
  id: AdministrationId;
  president: string;
  /** Card and page heading. */
  name: string;
  /** ISO dates. Inauguration at noon ET on January 20 (20th Amendment). */
  start: string;
  /** Absent while in office. */
  end?: string;
  /** 'recorded' when actions are entered; 'coming' shows the honest empty state. */
  status: 'recorded' | 'coming';
  sourceUrl: string;
}

const constitutionSource = 'https://constitution.congress.gov/constitution/amendment-20/';

/** Newest first, as the picker shows them. */
export const administrations: Administration[] = [
  { id: 'trump-2', president: 'Donald J. Trump', name: 'Trump Administration (second)', start: '2025-01-20', status: 'recorded', sourceUrl: constitutionSource },
  { id: 'biden', president: 'Joseph R. Biden Jr.', name: 'Biden Administration', start: '2021-01-20', end: '2025-01-20', status: 'coming', sourceUrl: constitutionSource },
  { id: 'trump-1', president: 'Donald J. Trump', name: 'Trump Administration (first)', start: '2017-01-20', end: '2021-01-20', status: 'coming', sourceUrl: constitutionSource },
  { id: 'obama', president: 'Barack Obama', name: 'Obama Administration', start: '2009-01-20', end: '2017-01-20', status: 'coming', sourceUrl: constitutionSource },
];

export function administration(id: AdministrationId): Administration {
  const found = administrations.find((entry) => entry.id === id);
  if (!found) throw new Error(`Unknown administration ${id}`);
  return found;
}

export interface Congress {
  number: number;
  /** Convenes January 3 of odd years (20th Amendment, sec. 2). */
  start: string;
  end: string;
}

export function congressOf(number: number): Congress {
  const year = 1789 + 2 * (number - 1);
  return { number, start: `${year}-01-03`, end: `${year + 2}-01-03` };
}

/** Every Congress that sits for part of the administration. Through the end of the term when in office. */
export function congressesIn(admin: Administration): Congress[] {
  const startYear = Number(admin.start.slice(0, 4));
  const endYear = admin.end ? Number(admin.end.slice(0, 4)) : startYear + 4;
  const result: Congress[] = [];
  for (let n = 1; n < 200; n += 1) {
    const c = congressOf(n);
    const cs = Number(c.start.slice(0, 4));
    if (cs + 2 <= startYear) continue;
    if (cs >= endYear) break;
    result.push(c);
  }
  return result;
}

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

export function within(date: string, start: string, end?: string): boolean {
  return date >= start && (!end || date < end);
}

export function recordsIn(admin: Administration): RecordItem[] {
  return federalRecords.filter((item) => within(item.date, admin.start, admin.end));
}

export function yearSpan(admin: Administration): string {
  return `${admin.start.slice(0, 4)}–${admin.end ? admin.end.slice(0, 4) : 'present'}`;
}
