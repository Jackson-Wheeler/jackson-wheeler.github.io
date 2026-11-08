/**
 * Outcome-anchored Layout A key stats for Trump-2.
 * Figures are computed from series.ts / department stats where possible;
 * a few readings (latest daily debt, PIT homelessness, Army Reserve note)
 * are entered from named primary sources with as-of dates.
 */
import type { Administration } from './administrations';
import { department, type DepartmentId, type StatPoint } from './departments';
import { recruitingTotal, swEncounters } from './series';

export interface OutcomeKeyStat {
  /** Short comparable headline, e.g. "−88.6%" or "103% of goal". */
  headline: string;
  /** What is measured. */
  title: string;
  /** Baseline, levels, and comparison context (no motives). */
  detail: string;
  /** ISO as-of for the figures shown. */
  asOf: string;
  /** Required honesty note: what the comparison does not show. */
  caveat: string;
  source: string;
  sourceUrl: string;
  /** Department page to open, when the measure lives on one. */
  deptId?: DepartmentId;
}

const DAY = 86_400_000;

function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / DAY);
}

/** Compound annualized rate: (end/start)^(365.25/days) − 1. */
function annualized(start: number, end: number, days: number): number {
  return (end / start) ** (365.25 / days) - 1;
}

function fmtPct(ratio: number, digits = 1): string {
  const pct = ratio * 100;
  const body = Math.abs(pct).toFixed(digits);
  if (pct > 0) return `+${body}%`;
  if (pct < 0) return `−${body}%`;
  return `${body}%`;
}

function fmtCount(n: number): string {
  return n.toLocaleString('en-US');
}

/** Latest southwest-encounter month vs the same calendar month one year earlier. */
function borderYoY(): OutcomeKeyStat | undefined {
  const latest = swEncounters[swEncounters.length - 1];
  if (!latest) return undefined;
  const y = Number(latest.start.slice(0, 4));
  const priorStart = `${y - 1}${latest.start.slice(4)}`;
  const prior = swEncounters.find((p) => p.start === priorStart);
  const priorAdminYear = swEncounters.find((p) => p.start === `${y - 2}${latest.start.slice(4)}`);
  if (!prior) return undefined;
  const yoy = (latest.value - prior.value) / prior.value;
  const vs2024 =
    priorAdminYear !== undefined
      ? `; ${fmtPct((latest.value - priorAdminYear.value) / priorAdminYear.value)} vs ${priorAdminYear.label} (${fmtCount(priorAdminYear.value)})`
      : '';
  const dhs = department('homeland-security').stats[0];
  return {
    headline: fmtPct(yoy),
    title: 'Southwest border encounters, year over year',
    detail: `${latest.label}: ${fmtCount(latest.value)} vs ${prior.label}: ${fmtCount(prior.value)}${vs2024}`,
    asOf: dhs?.asOf ?? latest.start,
    caveat:
      'Encounters are Border Patrol apprehensions plus OFO inadmissibles at the southwest land border. They are not gotaways or interior removals. A year-over-year rise from already-low 2025 months can sit beside a large drop from 2024.',
    source: dhs?.source ?? 'U.S. Customs and Border Protection, Southwest Land Border Encounters',
    sourceUrl: dhs?.sourceUrl ?? 'https://www.cbp.gov/document/stats/southwest-land-border-encounters',
    deptId: 'homeland-security',
  };
}

/** FY25 active-duty recruiting as percent of goal (series totals). */
function recruitingVsGoal(): OutcomeKeyStat | undefined {
  const fy25 = recruitingTotal.find((p) => p.label === 'FY25');
  const fy24 = recruitingTotal.find((p) => p.label === 'FY24');
  if (!fy25?.goal) return undefined;
  const ratio = fy25.value / fy25.goal;
  const services = fy25.breakdown ? Object.keys(fy25.breakdown).length : 5;
  const met =
    fy25.breakdown &&
    Object.values(fy25.breakdown).every(([actual, goal]) => actual >= goal);
  const fy24Note =
    fy24?.goal !== undefined
      ? ` FY24 was ${fmtCount(fy24.value)} against a goal of ${fmtCount(fy24.goal)} (${fmtPct(fy24.value / fy24.goal - 1)}).`
      : '';
  const war = department('war').stats[0];
  return {
    headline: `${Math.round(ratio * 100)}% of goal`,
    title: 'Active-duty recruiting, FY25',
    detail: `${fmtCount(fy25.value)} accessions vs goal ${fmtCount(fy25.goal)}; ${
      met ? `all ${services} active-duty services met goal` : 'not every service met goal'
    }. Army Reserve met 75% of its goal (War.gov).${fy24Note}`,
    asOf: war?.asOf ?? '2025-12-22',
    caveat:
      'FY25 ran October 2024 through September 2025 and straddles administrations. Reserve and Guard recruiting is not in the active-duty total; the Army Reserve miss is from the same War.gov release.',
    source: war?.source ?? 'Department of War FY25 recruiting release',
    sourceUrl:
      war?.sourceUrl ??
      'https://www.war.gov/News/News-Stories/Article/Article/4365687/fy25-sees-best-recruiting-numbers-in-15-years',
    deptId: 'war',
  };
}

/**
 * Inauguration-day debt points already on the Treasury department page,
 * plus the latest Debt to the Penny print used for the open term.
 * Annualized rates are period arithmetic, not a finding of presidential cause.
 */
const debtInauguration: StatPoint[] = department('treasury').stats.find(
  (s) => s.title.startsWith('Total public debt on inauguration'),
)?.points ?? [];

/** Latest daily total from Debt to the Penny (expanded outcomes research). */
const debtLatestDaily: StatPoint = {
  label: 'Nov 5, 2026',
  start: '2026-11-05',
  value: 40.556,
  note: 'Debt to the Penny; Jan 20, 2025 was a holiday so the term start uses Jan 17',
};

function debtAdminComparison(): OutcomeKeyStat | undefined {
  const start = debtInauguration.find((p) => p.start.startsWith('2025'));
  const bidenStart = debtInauguration.find((p) => p.start.startsWith('2021'));
  const trump1Start = debtInauguration.find((p) => p.start.startsWith('2017'));
  const obamaStart = debtInauguration.find((p) => p.start.startsWith('2009'));
  if (!start || !bidenStart || !trump1Start || !obamaStart) return undefined;

  const end = debtLatestDaily;
  // Jan 20, 2025 was a federal holiday; Debt to the Penny uses Jan 17.
  const startDate = '2025-01-17';
  const days = daysBetween(startDate, end.start);
  const totalChange = end.value / start.value - 1;
  const dollarChange = end.value - start.value;
  const trump2Ann = annualized(start.value, end.value, days);
  const dollarsPerYear = dollarChange / (days / 365.25);

  const bidenDays = daysBetween('2021-01-20', '2025-01-17');
  const bidenAnn = annualized(bidenStart.value, start.value, bidenDays);
  const bidenDollarsPerYear = (start.value - bidenStart.value) / (bidenDays / 365.25);

  const trump1Days = daysBetween('2017-01-20', '2021-01-20');
  const trump1Ann = annualized(trump1Start.value, bidenStart.value, trump1Days);
  const obamaDays = daysBetween('2009-01-20', '2017-01-20');
  const obamaAnn = annualized(obamaStart.value, trump1Start.value, obamaDays);

  return {
    headline: fmtPct(totalChange),
    title: 'Public debt since inauguration',
    detail: `$${start.value.toFixed(3)}T (${startDate}) → $${end.value.toFixed(3)}T (${end.start}): ${
      dollarChange >= 0 ? '+' : '−'
    }$${Math.abs(dollarChange).toFixed(2)}T in ${days} days. Annualized ${fmtPct(trump2Ann)}/yr vs Biden ${fmtPct(bidenAnn)}/yr, Trump-1 ${fmtPct(trump1Ann)}/yr, Obama ${fmtPct(obamaAnn)}/yr. Dollar pace $${dollarsPerYear.toFixed(2)}T/yr vs Biden $${bidenDollarsPerYear.toFixed(2)}T/yr.`,
    asOf: end.start,
    caveat:
      'Period measure from Treasury Debt to the Penny. Congress appropriates; recessions, wars, and interest on the existing stock also move the total. A slightly lower annualized percent can sit beside a higher dollars-per-year pace because the base is larger. Not a finding that one president caused the change.',
    source: 'U.S. Treasury, Fiscal Data — Debt to the Penny',
    sourceUrl: 'https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/',
    deptId: 'treasury',
  };
}

/**
 * HUD PIT January 2026 vs January 2025 (HUD No. 26-090).
 * Motives in the press release are not repeated here.
 */
function homelessnessPit(): OutcomeKeyStat {
  const later = 698_425;
  const baseline = 745_652;
  const change = (later - baseline) / baseline;
  return {
    headline: fmtPct(change),
    title: 'Point-in-Time homelessness',
    detail: `January 2026: ${fmtCount(later)} people on a single night vs January 2025: ${fmtCount(baseline)} (HUD AHAR 2025 / HUD No. 26-090). HUD’s release states a 6.3% decrease and that homelessness remains near a historic high.`,
    asOf: '2026-11-06',
    caveat:
      'Point-in-Time is a single-night estimate. Even-numbered years do not require every Continuum of Care to count unsheltered people, so year-to-year national totals need that methodology note. This tile reports HUD’s published counts only; it does not assign a cause.',
    source: 'HUD No. 26-090 (2026 PIT announcement); HUD No. 26-037 (2025 AHAR Part 1)',
    sourceUrl: 'https://www.hud.gov/news/hud-no-26-090',
  };
}

/** Outcome tiles for Layout A when the administration is Trump-2; otherwise empty. */
export function outcomeKeyStats(admin: Administration): OutcomeKeyStat[] {
  if (admin.id !== 'trump-2') return [];
  return [borderYoY(), recruitingVsGoal(), debtAdminComparison(), homelessnessPit()].filter(
    (t): t is OutcomeKeyStat => t !== undefined,
  );
}

/** Exported for reuse of the daily debt print. */
export const trump2DebtLatestDaily = debtLatestDaily;
