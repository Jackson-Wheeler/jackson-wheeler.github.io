import type { RecordBranch, RecordItem } from './types';
import { branchOf } from './types';
import { federalActions } from './federal';
import { otherBranchActions } from './branches';

export const federalRecords: RecordItem[] = [...federalActions, ...otherBranchActions];
export const californiaRecords: RecordItem[] = [];
export const laCityRecords: RecordItem[] = [];
export const laCountyRecords: RecordItem[] = [];
export const orangeCountyRecords: RecordItem[] = [];
export const costaMesaRecords: RecordItem[] = [];

function registerPage(citation: string | undefined): number {
  if (!citation) return Number.MAX_SAFE_INTEGER;
  const match = /(\d+)\s*$/.exec(citation);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

/** Oldest first. Same-day Register items follow Register page order. */
export function chronicle(records: RecordItem[]): RecordItem[] {
  return [...records].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    const page = registerPage(a.frCitation) - registerPage(b.frCitation);
    if (page !== 0) return page;
    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
  });
}

export function formatRecordDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function actionCountLabel(count: number): string {
  return count === 1 ? '1 action' : `${count} actions`;
}

export function actionId(item: RecordItem): string {
  if (item.id) return item.id;
  const citation = item.citation ?? '';
  const eo = /Executive Order (\d+)/.exec(citation);
  if (eo) return `eo-${eo[1]}`;
  const proc = /Proclamation (\d+)/.exec(citation);
  if (proc) return `proc-${proc[1]}`;
  const nspm = /NSPM-(\d+)/.exec(citation);
  if (nspm) return `nspm-${nspm[1]}`;
  const slug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return `${item.date}-${slug}`;
}

export function actionNumber(item: RecordItem): string | undefined {
  if (item.number) return item.number;
  const citation = item.citation ?? '';
  const match = /(?:Executive Order|Proclamation|Public Law|Roll Call|NSPM-) ?([\d-]+)/.exec(citation);
  return match?.[1];
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface DayNode {
  date: string;
  label: string;
  records: RecordItem[];
}

export interface MonthNode {
  key: string;
  label: string;
  days: DayNode[];
  totals: Record<RecordBranch, number>;
}

export interface YearNode {
  year: string;
  months: MonthNode[];
}

function dayLabel(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

/** Year, then month, then day. The date picker, headings, and totals all read this tree. */
export function ledgerTree(records: RecordItem[]): YearNode[] {
  const sorted = chronicle(records);
  const years: YearNode[] = [];
  for (const item of sorted) {
    const year = item.date.slice(0, 4);
    const monthKey = item.date.slice(0, 7);
    let yearNode = years.find((entry) => entry.year === year);
    if (!yearNode) {
      yearNode = { year, months: [] };
      years.push(yearNode);
    }
    let monthNode = yearNode.months.find((entry) => entry.key === monthKey);
    if (!monthNode) {
      const monthIndex = Number(monthKey.slice(5, 7)) - 1;
      monthNode = {
        key: monthKey,
        label: `${MONTHS[monthIndex]} ${year}`,
        days: [],
        totals: { executive: 0, legislative: 0, judicial: 0 },
      };
      yearNode.months.push(monthNode);
    }
    let dayNode = monthNode.days.find((entry) => entry.date === item.date);
    if (!dayNode) {
      dayNode = { date: item.date, label: dayLabel(item.date), records: [] };
      monthNode.days.push(dayNode);
    }
    dayNode.records.push(item);
    monthNode.totals[branchOf(item.kind)] += 1;
  }
  return years;
}
