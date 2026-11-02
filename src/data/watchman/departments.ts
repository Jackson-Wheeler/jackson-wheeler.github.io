import type { RecordItem } from './types';
import { actionId } from './records';

export type DepartmentId = 'war' | 'homeland-security' | 'state' | 'justice' | 'treasury' | 'hhs';

export interface Tenure {
  name: string;
  title: string;
  acting?: boolean;
  /** ISO date the person took the office or its duties. */
  start: string;
  /** ISO date they left it. Absent while serving. */
  end?: string;
  sourceUrl: string;
}

export interface StatPoint {
  label: string;
  value: number;
  goal?: number;
}

export interface Stat {
  title: string;
  /** One sentence on what is measured. */
  measure: string;
  points: StatPoint[];
  /** Index into points of the first period that falls in the administration. */
  firstInAdministration?: number;
  /** Plain statement of what is missing or differs between sources. */
  gap?: string;
  source: string;
  sourceUrl: string;
  asOf: string;
}

export type KeyAction =
  | { recordId: string; note?: string }
  | { date: string; title: string; note: string; sourceUrl: string };

export interface Department {
  id: DepartmentId;
  name: string;
  /** Shown under the name, e.g. the statutory name. */
  aka?: string;
  /** The label records use in their departments field. */
  recordLabel: string;
  leaders: Tenure[];
  stats: Stat[];
  /** Said on the page when stats is empty. */
  statsGap?: string;
  keyActions: KeyAction[];
}

const actingDesignation = 'https://www.whitehouse.gov/presidential-actions/2025/01/designation-of-acting-leaders/';

export const departments: Department[] = [
  {
    id: 'war',
    name: 'Department of War',
    aka: 'Department of Defense in statute; “Department of War” is a secondary name under Executive Order 14347 (September 5, 2025).',
    recordLabel: 'Department of Defense',
    leaders: [
      { name: 'Robert G. Salesses', title: 'Acting Secretary of Defense', acting: true, start: '2025-01-20', end: '2025-01-25', sourceUrl: 'https://www.war.gov/News/News-Stories/Article/Article/4035270/trump-names-acting-secretary-of-defense-designates-acting-service-secretaries/' },
      { name: 'Pete Hegseth', title: 'Secretary of Defense; Secretary of War from September 5, 2025', start: '2025-01-25', sourceUrl: 'https://www.defense.gov/About/Biographies/Biography/Article/4040890/hon-pete-hegseth/' },
    ],
    stats: [
      {
        title: 'Regular Army recruits against goal',
        measure: 'Active-duty (Regular Army) accessions by fiscal year, October through September.',
        points: [
          { label: 'FY21', value: 57606, goal: 57500 },
          { label: 'FY22', value: 44901, goal: 60000 },
          { label: 'FY23', value: 50181, goal: 65500 },
          { label: 'FY24', value: 55150, goal: 55000 },
          { label: 'FY25', value: 62050, goal: 60500 },
          { label: 'FY26', value: 61530, goal: 61500 },
        ],
        firstInAdministration: 4,
        gap: 'FY25 began October 1, 2024, almost four months before the administration. The Department of War’s FY25 release states the Army goal as 61,000; Army Recruiting Command lists 60,500. Navy, Air Force, Marine Corps and Space Force series are not entered yet.',
        source: 'U.S. Army Recruiting Command, Facts and Figures',
        sourceUrl: 'https://recruiting.army.mil/pao/facts_figures/',
        asOf: '2026-11-01',
      },
      {
        title: 'All five active-duty services met FY25 goals',
        measure: 'Share of the FY25 active-duty accession goal each service reached.',
        points: [
          { label: 'Army', value: 101.72 },
          { label: 'Navy', value: 108.61 },
          { label: 'Air Force', value: 100.22 },
          { label: 'Marines', value: 100 },
          { label: 'Space Force', value: 102.89 },
        ],
        gap: 'The Army Reserve met 75% of its goal in FY25, per the same release.',
        source: 'Department of War, “FY25 Sees Best Recruiting Numbers in 15 Years” (Dec. 22, 2025)',
        sourceUrl: 'https://www.war.gov/News/News-Stories/Article/Article/4365687/fy25-sees-best-recruiting-numbers-in-15-years',
        asOf: '2025-12-22',
      },
    ],
    keyActions: [
      { recordId: 'eo-14167' },
      { date: '2025-09-05', title: 'Restoring the United States Department of War (Executive Order 14347)', note: 'Authorizes “Department of War” and “Secretary of War” as secondary names; statutory references to the Department of Defense remain in force.', sourceUrl: 'https://www.federalregister.gov/documents/2025/09/10/2025-17508/restoring-the-united-states-department-of-war' },
      { date: '2025-12-22', title: 'FY25 recruiting: every active-duty service met its goal', note: 'Army 62,050, Navy 44,096, Air Force 30,166, Marine Corps 26,600, Space Force 819 accessions.', sourceUrl: 'https://www.war.gov/News/News-Stories/Article/Article/4365687/fy25-sees-best-recruiting-numbers-in-15-years' },
    ],
  },
  {
    id: 'homeland-security',
    name: 'Department of Homeland Security',
    recordLabel: 'Department of Homeland Security',
    leaders: [
      { name: 'Benjamine Huffman', title: 'Acting Secretary', acting: true, start: '2025-01-20', end: '2025-01-25', sourceUrl: actingDesignation },
      { name: 'Kristi Noem', title: 'Secretary', start: '2025-01-25', end: '2026-03-24', sourceUrl: 'https://www.dhs.gov/secretaries-homeland-security' },
      { name: 'Markwayne Mullin', title: 'Secretary', start: '2026-03-24', sourceUrl: 'https://www.dhs.gov/news/2026/03/24/us-senate-confirms-markwayne-mullin-secretary-department-homeland-security' },
    ],
    stats: [],
    statsGap: 'No statistic entered yet. CBP publishes monthly southwest border encounters; it will be added with its source and as-of date.',
    keyActions: [
      { recordId: 'proc-10886' },
      { recordId: 'pl-119-1' },
      { date: '2026-03-23', title: 'Senate confirms Markwayne Mullin, 54–45', note: 'Sworn in March 24, 2026 as the ninth Secretary of Homeland Security.', sourceUrl: 'https://www.dhs.gov/news/2026/03/24/us-senate-confirms-markwayne-mullin-secretary-department-homeland-security' },
    ],
  },
  {
    id: 'state',
    name: 'Department of State',
    recordLabel: 'Department of State',
    leaders: [
      { name: 'Lisa Kenna', title: 'Acting Secretary', acting: true, start: '2025-01-20', end: '2025-01-21', sourceUrl: actingDesignation },
      { name: 'Marco Rubio', title: 'Secretary', start: '2025-01-21', sourceUrl: 'https://www.state.gov/biographies/marco-rubio' },
    ],
    stats: [],
    statsGap: 'No statistic entered yet.',
    keyActions: [{ recordId: 'eo-14150' }, { recordId: 'eo-14169' }, { recordId: 'eo-14175' }],
  },
  {
    id: 'justice',
    name: 'Department of Justice',
    recordLabel: 'Department of Justice',
    leaders: [
      { name: 'James McHenry', title: 'Acting Attorney General', acting: true, start: '2025-01-20', end: '2025-02-05', sourceUrl: actingDesignation },
      { name: 'Pam Bondi', title: 'Attorney General', start: '2025-02-05', end: '2026-04-02', sourceUrl: 'https://www.govinfo.gov/content/pkg/DCPD-202500226/html/DCPD-202500226.htm' },
      { name: 'Todd Blanche', title: 'Acting Attorney General', acting: true, start: '2026-04-02', end: '2026-08-10', sourceUrl: 'https://www.justice.gov/ag/staff-profile/meet-attorney-general' },
      { name: 'Todd Blanche', title: 'Attorney General', start: '2026-08-10', sourceUrl: 'https://www.justice.gov/ag/staff-profile/meet-attorney-general' },
    ],
    stats: [],
    statsGap: 'No statistic entered yet.',
    keyActions: [
      { recordId: 'eo-14164' },
      { recordId: 'proc-10887' },
      { date: '2026-08-08', title: 'Senate confirms Todd Blanche as Attorney General, 50–49', note: 'Roll call vote 230, 119th Congress, 2nd session. Sworn in August 10, 2026.', sourceUrl: 'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1192/vote_119_2_00230.htm' },
    ],
  },
  {
    id: 'treasury',
    name: 'Department of the Treasury',
    recordLabel: 'Department of the Treasury',
    leaders: [
      { name: 'David Lebryk', title: 'Acting Secretary', acting: true, start: '2025-01-20', end: '2025-01-28', sourceUrl: actingDesignation },
      { name: 'Scott Bessent', title: 'Secretary', start: '2025-01-28', sourceUrl: 'https://home.treasury.gov/news/press-releases/sb0001' },
    ],
    stats: [],
    statsGap: 'No statistic entered yet. Treasury’s Fiscal Data publishes the daily public debt; it will be added with its source and as-of date.',
    keyActions: [{ recordId: '2025-01-20-the-organization-for-economic-co-operation-and-d' }],
  },
  {
    id: 'hhs',
    name: 'Department of Health and Human Services',
    recordLabel: 'Department of Health and Human Services',
    leaders: [
      { name: 'Dorothy Fink', title: 'Acting Secretary', acting: true, start: '2025-01-20', end: '2025-02-13', sourceUrl: actingDesignation },
      { name: 'Robert F. Kennedy Jr.', title: 'Secretary', start: '2025-02-13', sourceUrl: 'https://www.hhs.gov/press-room/eo-maha.html' },
    ],
    stats: [],
    statsGap: 'No statistic entered yet.',
    keyActions: [
      { recordId: 'eo-14155' },
      { date: '2025-02-13', title: 'Kennedy sworn in; Make America Healthy Again Commission established', note: 'Sworn in as the 26th Secretary the same day the President signed the order creating the commission.', sourceUrl: 'https://www.hhs.gov/press-room/eo-maha.html' },
    ],
  },
];

/** Records entered before the departments field existed (January 20–22, 2025), tagged by the departments their text directs. */
const legacyTags: Record<string, DepartmentId[]> = {
  'eo-14167': ['war'],
  'proc-10886': ['war', 'homeland-security'],
  'proc-10888': ['homeland-security', 'state', 'justice'],
  'eo-14159': ['homeland-security', 'justice'],
  'eo-14165': ['homeland-security', 'war'],
  'eo-14161': ['state', 'homeland-security', 'justice'],
  'eo-14163': ['state', 'homeland-security'],
  'eo-14150': ['state'],
  'eo-14169': ['state'],
  'eo-14175': ['state'],
  'eo-14157': ['state', 'treasury'],
  'eo-14164': ['justice'],
  'eo-14160': ['state', 'homeland-security', 'justice'],
  'pl-119-1': ['homeland-security'],
  '2025-01-22-executive-grant-of-clemency-for-andrew-zabavsky': ['justice'],
  '2025-01-22-executive-grant-of-clemency-for-terence-sutton': ['justice'],
  'proc-10887': ['justice'],
  'eo-14147': ['justice'],
  'eo-14155': ['hhs', 'state'],
  '2025-01-20-the-organization-for-economic-co-operation-and-d': ['treasury'],
  '2025-01-20-america-first-trade-policy': ['state', 'treasury', 'war', 'homeland-security'],
};

export function department(id: DepartmentId): Department {
  const found = departments.find((entry) => entry.id === id);
  if (!found) throw new Error(`Unknown department ${id}`);
  return found;
}

/** The record's own departments field first; the legacy table only for records entered before it. */
export function belongsTo(item: RecordItem, dept: Department): boolean {
  if (item.departments) return item.departments.includes(dept.recordLabel);
  return legacyTags[actionId(item)]?.includes(dept.id) ?? false;
}

/** Who led on a date. */
export function leaderOn(dept: Department, date: string): Tenure | undefined {
  return dept.leaders.find((t) => date >= t.start && (!t.end || date < t.end));
}
