import type { RecordItem } from './types';
import { actionId } from './records';
import type { Administration, AdministrationId } from './administrations';
import { debtFyEnd, swEncounters } from './series';

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
  /** ISO start of the period (fiscal year starts October 1 of the prior year). */
  start: string;
  /** Label this point on the chart axis when the series is dense. */
  tick?: boolean;
  note?: string;
}

export interface Stat {
  title: string;
  /** One sentence on what is measured. */
  measure: string;
  points: StatPoint[];
  /** How a point's period is read: a fiscal year, a calendar month, or a single date. */
  period: 'fy' | 'month' | 'date';
  unit: 'count' | 'percent' | 'trillion';
  /** Years before the administration to show for comparison. Default 4. */
  lookback?: number;
  /** Limit the stat to these administrations. */
  only?: AdministrationId[];
  /** Further primary sources behind individual points. */
  more?: { label: string; url: string }[];
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
const dodOfficials = 'https://history.defense.gov/Portals/70/Documents/key_officials/KeyOfficials-2025-07-14.pdf';
const dhsSecretaries = 'https://www.dhs.gov/secretaries-homeland-security';
const stateHistory = (slug: string) => `https://history.state.gov/departmenthistory/people/${slug}`;
const agBio = (slug: string) => `https://www.justice.gov/ag/bio/attorney-general-${slug}`;
const treasuryPrior = 'https://home.treasury.gov/about/history/prior-secretaries';
const hhsHistory = 'https://www.hhs.gov/about/historical-highlights/index.html';
const prhome = 'https://prhome.defense.gov/Portals/52/Documents/MRA_Docs/MPP/pressreleases';
const fy25War = 'https://www.war.gov/News/News-Stories/Article/Article/4365687/fy25-sees-best-recruiting-numbers-in-15-years';

const fy = (n: number) => ({ label: `FY${String(n).slice(2)}`, start: `${n - 1}-10-01` });

/** Active-component accessions against goal, from the year-end DoD/War recruiting releases. FY19's year-end release was not found. */
const accessions = (rows: [number, number, number][]): StatPoint[] => rows.map(([year, value, goal]) => ({ ...fy(year), value, goal }));
const recruitingSources = [
  { label: 'FY16 release', url: `${prhome}/Press%20Release_FY2016%20EOY%20September%202016.pdf` },
  { label: 'FY17 release', url: `${prhome}/Press%20Release_FY2017%20EOY%20Sep%202017.pdf` },
  { label: 'FY18 release', url: `${prhome}/Press%20Release%20Sep%202018%20FY18%20End%20of%20FY%20Report.pdf` },
  { label: 'FY20 release', url: `${prhome}/2020/12%20-%20Press%20Release%20Sep%202020%20FY20%20EOY.pdf` },
  { label: 'FY21 release', url: `${prhome}/2021/2021%20EOY%20Press%20Release%20September%202021.pdf` },
  { label: 'FY22 release', url: `${prhome}/2022/Press%20Release%20September%202022%20-%20FY%202022.pdf` },
  { label: 'FY23 release', url: `${prhome}/2023/TAB%20A%20-%20Press%20Release%20EOM%20SEP%2023%20Recruiting%20and%20Retention%20Report.pdf` },
  { label: 'FY24 release', url: 'https://prhome.defense.gov/Portals/52/TAB%20A%20-%20Press%20Release_10172024_v4forMPP.pdf' },
  { label: 'FY25 (Department of War)', url: fy25War },
];
const recruitingGap = 'Each fiscal year runs October through September and is counted with the administration that held office for most of it. FY19’s year-end release was not found and is left out. Releases before FY16 were not entered.';
const recruitingStat = (service: string, rows: [number, number, number][], extraGap = ''): Stat => ({
  title: `${service} recruits against goal`,
  measure: `Active-duty ${service} accessions (new enlistees shipped to training) by fiscal year, against the service’s goal.`,
  points: accessions(rows),
  period: 'fy',
  unit: 'count',
  lookback: 8,
  gap: `${recruitingGap}${extraGap ? ` ${extraGap}` : ''}`,
  source: 'Department of Defense / Department of War year-end recruiting and retention releases (Office of the Under Secretary for Personnel and Readiness)',
  sourceUrl: 'https://prhome.defense.gov/M-RA/Inside-M-RA/MPP/Accession-Policy/Recruiting-and-Retention/',
  more: recruitingSources,
  asOf: '2025-12-22',
});

export const departments: Department[] = [
  {
    id: 'war',
    name: 'Department of War',
    aka: 'Department of Defense in statute; “Department of War” is a secondary name under Executive Order 14347 (September 5, 2025).',
    recordLabel: 'Department of Defense',
    leaders: [
      { name: 'Robert M. Gates', title: 'Secretary of Defense', start: '2006-12-18', end: '2011-06-30', sourceUrl: dodOfficials },
      { name: 'Leon E. Panetta', title: 'Secretary of Defense', start: '2011-07-01', end: '2013-02-26', sourceUrl: dodOfficials },
      { name: 'Chuck Hagel', title: 'Secretary of Defense', start: '2013-02-27', end: '2015-02-17', sourceUrl: dodOfficials },
      { name: 'Ashton B. Carter', title: 'Secretary of Defense', start: '2015-02-17', end: '2017-01-20', sourceUrl: dodOfficials },
      { name: 'James N. Mattis', title: 'Secretary of Defense', start: '2017-01-20', end: '2018-12-31', sourceUrl: dodOfficials },
      { name: 'Patrick M. Shanahan', title: 'Acting Secretary of Defense', acting: true, start: '2019-01-01', end: '2019-06-23', sourceUrl: dodOfficials },
      { name: 'Mark T. Esper', title: 'Acting Secretary of Defense', acting: true, start: '2019-06-24', end: '2019-07-15', sourceUrl: dodOfficials },
      { name: 'Richard V. Spencer', title: 'Acting Secretary of Defense', acting: true, start: '2019-07-15', end: '2019-07-23', sourceUrl: dodOfficials },
      { name: 'Mark T. Esper', title: 'Secretary of Defense', start: '2019-07-23', end: '2020-11-09', sourceUrl: dodOfficials },
      { name: 'Christopher C. Miller', title: 'Acting Secretary of Defense', acting: true, start: '2020-11-09', end: '2021-01-20', sourceUrl: dodOfficials },
      { name: 'David L. Norquist', title: 'Acting Secretary of Defense', acting: true, start: '2021-01-20', end: '2021-01-22', sourceUrl: dodOfficials },
      { name: 'Lloyd J. Austin III', title: 'Secretary of Defense', start: '2021-01-22', end: '2025-01-20', sourceUrl: 'https://history.defense.gov/Multimedia/Biographies/Article-View/Article/2485520/lloyd-j-austin-iii/' },
      { name: 'Robert G. Salesses', title: 'Acting Secretary of Defense', acting: true, start: '2025-01-20', end: '2025-01-25', sourceUrl: 'https://www.war.gov/News/News-Stories/Article/Article/4035270/trump-names-acting-secretary-of-defense-designates-acting-service-secretaries/' },
      { name: 'Pete Hegseth', title: 'Secretary of Defense; Secretary of War from September 5, 2025', start: '2025-01-25', sourceUrl: 'https://www.defense.gov/About/Biographies/Biography/Article/4040890/hon-pete-hegseth/' },
    ],
    stats: [
      recruitingStat('Navy', [[2016, 30606, 30606], [2017, 35225, 35200], [2018, 39018, 39000], [2020, 39678, 39600], [2021, 33559, 33400], [2022, 33442, 33400], [2023, 30236, 37700], [2024, 35804, 40600], [2025, 44096, 40600]],
        'In FY24 the Navy contracted past its goal but could not ship all recruits to training within the year, per the FY24 release.'),
      recruitingStat('Air Force', [[2016, 31757, 31461], [2017, 31296, 31250], [2018, 30343, 29450], [2020, 26373, 26373], [2021, 26656, 26641], [2022, 26196, 26196], [2023, 24100, 26977], [2024, 27303, 27200], [2025, 30166, 30100]]),
      recruitingStat('Marine Corps', [[2016, 30508, 30500], [2017, 32059, 31994], [2018, 31567, 31556], [2020, 28048, 28028], [2021, 30617, 30607], [2022, 28608, 28600], [2023, 28921, 28900], [2024, 27500, 27500], [2025, 26600, 26600]]),
      recruitingStat('Space Force', [[2022, 532, 521], [2023, 537, 492], [2024, 716, 704], [2025, 819, 796]],
        'The Space Force was established December 20, 2019; its first year-end figures in the releases are FY22.'),
      {
        title: 'Regular Army recruits against goal',
        measure: 'Active-duty (Regular Army) accessions by fiscal year, October through September.',
        points: [
          { ...fy(2021), value: 57606, goal: 57500 },
          { ...fy(2022), value: 44901, goal: 60000 },
          { ...fy(2023), value: 50181, goal: 65500 },
          { ...fy(2024), value: 55150, goal: 55000 },
          { ...fy(2025), value: 62050, goal: 60500 },
          { ...fy(2026), value: 61530, goal: 61500 },
        ],
        period: 'fy',
        unit: 'count',
        only: ['biden', 'trump-2'],
        gap: 'FY25 began October 1, 2024, almost four months before the second Trump administration. The Department of War’s FY25 release states the Army goal as 61,000; Army Recruiting Command lists 60,500.',
        source: 'U.S. Army Recruiting Command, Facts and Figures',
        sourceUrl: 'https://recruiting.army.mil/pao/facts_figures/',
        asOf: '2026-11-01',
      },
    ],
    keyActions: [
      { recordId: 'eo-14167' },
      { date: '2025-09-05', title: 'Restoring the United States Department of War (Executive Order 14347)', note: 'Authorizes “Department of War” and “Secretary of War” as secondary names; statutory references to the Department of Defense remain in force.', sourceUrl: 'https://www.federalregister.gov/documents/2025/09/10/2025-17508/restoring-the-united-states-department-of-war' },
      { date: '2025-12-22', title: 'FY25 recruiting: every active-duty service met its goal', note: 'Army 62,050, Navy 44,096, Air Force 30,166, Marine Corps 26,600, Space Force 819 accessions.', sourceUrl: fy25War },
    ],
  },
  {
    id: 'homeland-security',
    name: 'Department of Homeland Security',
    recordLabel: 'Department of Homeland Security',
    leaders: [
      { name: 'Michael Chertoff', title: 'Secretary', start: '2005-02-15', end: '2009-01-21', sourceUrl: dhsSecretaries },
      { name: 'Janet Napolitano', title: 'Secretary', start: '2009-01-20', end: '2013-09-06', sourceUrl: dhsSecretaries },
      { name: 'Jeh Charles Johnson', title: 'Secretary', start: '2013-12-23', end: '2017-01-20', sourceUrl: dhsSecretaries },
      { name: 'John F. Kelly', title: 'Secretary', start: '2017-01-20', end: '2017-07-28', sourceUrl: dhsSecretaries },
      { name: 'Kirstjen M. Nielsen', title: 'Secretary', start: '2017-12-06', end: '2019-04-10', sourceUrl: dhsSecretaries },
      { name: 'Alejandro N. Mayorkas', title: 'Secretary', start: '2021-02-01', end: '2025-01-20', sourceUrl: dhsSecretaries },
      { name: 'Benjamine Huffman', title: 'Acting Secretary', acting: true, start: '2025-01-20', end: '2025-01-25', sourceUrl: actingDesignation },
      { name: 'Kristi Noem', title: 'Secretary', start: '2025-01-25', end: '2026-03-24', sourceUrl: dhsSecretaries },
      { name: 'Markwayne Mullin', title: 'Secretary', start: '2026-03-24', sourceUrl: 'https://www.dhs.gov/news/2026/03/24/us-senate-confirms-markwayne-mullin-secretary-department-homeland-security' },
    ],
    stats: [
      {
        title: 'Southwest border encounters by month',
        measure: 'U.S. Border Patrol apprehensions plus Office of Field Operations inadmissibles at the southwest land border, all ages and citizenships. From March 2020 to May 2023 the count includes Title 42 expulsions.',
        points: swEncounters,
        period: 'month',
        unit: 'count',
        lookback: 2,
        gap: 'CBP’s published southwest-encounter files begin in October 2018, so there is no monthly figure here for the Obama years or the first 20 months of the first Trump administration. Each later file restates earlier months; the newest file is used where they overlap. September 2026 is not yet published.',
        source: 'U.S. Customs and Border Protection, Southwest Land Border Encounters (CSV downloads FY19–FY22, FY21–FY24, FY22–FY25, FY23–FY26 through August)',
        sourceUrl: 'https://www.cbp.gov/document/stats/southwest-land-border-encounters',
        more: [
          { label: 'FY23–FY26 CSV', url: 'https://www.cbp.gov/sites/default/files/2026-09/sbo-encounters-fy23-fy26-aug.csv' },
          { label: 'FY22–FY25 CSV', url: 'https://www.cbp.gov/sites/default/files/2025-11/sbo-encounters-fy22-fy25.csv' },
          { label: 'FY21–FY24 CSV', url: 'https://www.cbp.gov/sites/default/files/2024-10/sbo-encounters-fy21-fy24.csv' },
          { label: 'FY19–FY22 CSV', url: 'https://www.cbp.gov/sites/default/files/assets/documents/2022-Oct/sbo-encounters-fy19-fy22.csv' },
        ],
        asOf: '2026-09-04',
      },
    ],
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
      { name: 'Hillary Rodham Clinton', title: 'Secretary', start: '2009-01-21', end: '2013-02-01', sourceUrl: stateHistory('clinton-hillary-rodham') },
      { name: 'John F. Kerry', title: 'Secretary', start: '2013-02-01', end: '2017-01-20', sourceUrl: stateHistory('kerry-john-forbes') },
      { name: 'Rex W. Tillerson', title: 'Secretary', start: '2017-02-01', end: '2018-03-31', sourceUrl: stateHistory('tillerson-rex-wayne') },
      { name: 'Michael R. Pompeo', title: 'Secretary', start: '2018-04-26', end: '2021-01-20', sourceUrl: stateHistory('pompeo-michael-r') },
      { name: 'Antony J. Blinken', title: 'Secretary', start: '2021-01-26', end: '2025-01-20', sourceUrl: stateHistory('blinken-antony-john') },
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
      { name: 'Eric H. Holder Jr.', title: 'Attorney General', start: '2009-02-03', end: '2015-04-24', sourceUrl: agBio('eric-h-holder-jr') },
      { name: 'Loretta E. Lynch', title: 'Attorney General', start: '2015-04-27', end: '2017-01-20', sourceUrl: agBio('loretta-e-lynch') },
      { name: 'Jeff Sessions', title: 'Attorney General', start: '2017-02-09', end: '2018-11-07', sourceUrl: agBio('jeff-sessions') },
      { name: 'William P. Barr', title: 'Attorney General', start: '2019-02-14', end: '2020-12-23', sourceUrl: agBio('william-pelham-barr') },
      { name: 'Merrick B. Garland', title: 'Attorney General', start: '2021-03-11', end: '2025-01-20', sourceUrl: agBio('merrick-b-garland') },
      { name: 'James McHenry', title: 'Acting Attorney General', acting: true, start: '2025-01-20', end: '2025-02-05', sourceUrl: actingDesignation },
      { name: 'Pam Bondi', title: 'Attorney General', start: '2025-02-05', end: '2026-04-02', sourceUrl: 'https://www.govinfo.gov/content/pkg/DCPD-202500226/html/DCPD-202500226.htm' },
      { name: 'Todd Blanche', title: 'Acting Attorney General', acting: true, start: '2026-04-02', end: '2026-08-10', sourceUrl: 'https://www.justice.gov/ag/staff-profile/meet-attorney-general' },
      { name: 'Todd Blanche', title: 'Attorney General', start: '2026-08-10', sourceUrl: 'https://www.justice.gov/ag/staff-profile/meet-attorney-general' },
    ],
    stats: [
      {
        title: 'Federal criminal defendants charged',
        measure: 'Criminal defendants filed in the U.S. district courts each fiscal year, including defendants transferred from other districts. Nearly every federal prosecution brought by the Justice Department’s U.S. Attorneys is counted here.',
        points: [
          [2011, 102931], [2012, 94121], [2013, 91266], [2014, 81226], [2015, 80069],
          [2016, 77357], [2017, 77018], [2018, 87149], [2019, 92678], [2020, 73879],
          [2021, 74465], [2022, 68482], [2023, 66147], [2024, 69802], [2025, 79129],
        ].map(([year, value]) => ({ ...fy(year), value })),
        period: 'fy',
        unit: 'count',
        lookback: 6,
        gap: 'Chosen over the Justice Department’s own Executive Office for U.S. Attorneys reports because the courts count every case on their dockets the same way across administrations and publish on a fixed schedule. Filings measure charges brought, not convictions. FY09–FY10 were not retrieved (the Judicial Business 2010 page did not load) and are left out; FY26 is published after September 30, 2026.',
        source: 'Administrative Office of the U.S. Courts, Judicial Business, Table 5 (U.S. District Courts — Criminal Defendants Filed), 2025 edition',
        sourceUrl: 'https://www.uscourts.gov/data-news/reports/statistical-reports/judicial-business-united-states-courts/judicial-business-2025/us-district-courts-judicial-business-2025',
        more: [
          { label: 'FY16–FY20 (Judicial Business 2020)', url: 'https://www.uscourts.gov/data-news/reports/statistical-reports/judicial-business-united-states-courts/judicial-business-2020/us-district-courts-judicial-business-2020' },
          { label: 'FY11–FY15 (Judicial Business 2015)', url: 'https://www.uscourts.gov/data-news/reports/statistical-reports/judicial-business-united-states/judicial-business-2015/us-district-courts-judicial-business-2015' },
        ],
        asOf: '2025-09-30',
      },
    ],
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
      { name: 'Henry M. Paulson Jr.', title: 'Secretary', start: '2006-07-10', end: '2009-01-20', sourceUrl: treasuryPrior },
      { name: 'Timothy F. Geithner', title: 'Secretary', start: '2009-01-26', end: '2013-01-25', sourceUrl: treasuryPrior },
      { name: 'Jacob J. Lew', title: 'Secretary', start: '2013-02-28', end: '2017-01-20', sourceUrl: treasuryPrior },
      { name: 'Steven T. Mnuchin', title: 'Secretary', start: '2017-02-13', end: '2021-01-20', sourceUrl: treasuryPrior },
      { name: 'Janet L. Yellen', title: 'Secretary', start: '2021-01-26', end: '2025-01-20', sourceUrl: treasuryPrior },
      { name: 'David Lebryk', title: 'Acting Secretary', acting: true, start: '2025-01-20', end: '2025-01-28', sourceUrl: actingDesignation },
      { name: 'Scott Bessent', title: 'Secretary', start: '2025-01-28', sourceUrl: 'https://home.treasury.gov/news/press-releases/sb0001' },
    ],
    stats: [
      {
        title: 'Total public debt outstanding at fiscal year end',
        measure: 'Debt held by the public plus intragovernmental holdings, in trillions of dollars, on the last record date of each fiscal year (September 30).',
        points: debtFyEnd,
        period: 'fy',
        unit: 'trillion',
        lookback: 4,
        gap: 'A fiscal year is counted with the administration that held office for most of it. Not adjusted for inflation or the size of the economy. The latest daily figure is $40.59 trillion on October 29, 2026.',
        source: 'U.S. Treasury, Fiscal Data — Debt to the Penny',
        sourceUrl: 'https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/',
        asOf: '2026-10-29',
      },
      {
        title: 'Total public debt on inauguration day',
        measure: 'Total public debt outstanding, in trillions of dollars, on the record date at or just before each inauguration.',
        points: [
          { label: '2009', start: '2009-01-20', value: 10.627, note: 'Recorded January 20, 2009' },
          { label: '2013', start: '2013-01-20', value: 16.433, note: 'Recorded January 18, 2013 (last business day before the January 20–21 inauguration)' },
          { label: '2017', start: '2017-01-20', value: 19.947, note: 'Recorded January 20, 2017' },
          { label: '2021', start: '2021-01-20', value: 27.752, note: 'Recorded January 20, 2021' },
          { label: '2025', start: '2025-01-20', value: 36.207, note: 'Recorded January 17, 2025 (January 20 was a federal holiday)' },
        ],
        period: 'date',
        unit: 'trillion',
        lookback: 40,
        gap: 'Treasury records the debt on business days only, so holidays and weekends use the prior record date.',
        source: 'U.S. Treasury, Fiscal Data — Debt to the Penny',
        sourceUrl: 'https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/',
        asOf: '2026-10-29',
      },
    ],
    keyActions: [{ recordId: '2025-01-20-the-organization-for-economic-co-operation-and-d' }],
  },
  {
    id: 'hhs',
    name: 'Department of Health and Human Services',
    recordLabel: 'Department of Health and Human Services',
    leaders: [
      { name: 'Kathleen Sebelius', title: 'Secretary', start: '2009-04-28', end: '2014-06-06', sourceUrl: hhsHistory },
      { name: 'Sylvia Mathews Burwell', title: 'Secretary', start: '2014-06-09', end: '2017-01-20', sourceUrl: hhsHistory },
      { name: 'Tom Price', title: 'Secretary', start: '2017-02-10', end: '2017-09-29', sourceUrl: hhsHistory },
      { name: 'Alex M. Azar II', title: 'Secretary', start: '2018-01-24', end: '2021-01-20', sourceUrl: hhsHistory },
      { name: 'Xavier Becerra', title: 'Secretary', start: '2021-03-19', end: '2025-01-20', sourceUrl: 'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1171/vote_117_1_00125.htm' },
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


const DAY = 86_400_000;
const ms = (d: string) => Date.parse(`${d}T00:00:00Z`);

/** Share of a point's period that falls inside [start, end). */
function overlap(p: StatPoint, period: Stat['period'], start: string, end: string): number {
  if (period === 'date') return p.start >= start && p.start < end ? 1 : 0;
  const s = ms(p.start);
  const d = new Date(s);
  const e = period === 'fy' ? Date.UTC(d.getUTCFullYear() + 1, d.getUTCMonth(), 1) : Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1);
  const o = Math.min(e, ms(end)) - Math.max(s, ms(start));
  return Math.max(0, o) / (e - s);
}

export interface ShownPoint extends StatPoint { inAdmin: boolean }

/** The points to show for an administration: its own periods plus the lookback years before it. A period is the administration’s when it held office for most of it. */
export function pointsFor(stat: Stat, admin: Administration, today: string): ShownPoint[] {
  if (stat.only && !stat.only.includes(admin.id)) return [];
  const end = admin.end ?? today;
  const from = `${Number(admin.start.slice(0, 4)) - (stat.lookback ?? 4)}${admin.start.slice(4)}`;
  return stat.points
    .filter((p) => overlap(p, stat.period, from, end) > 0)
    .map((p) => ({ ...p, inAdmin: overlap(p, stat.period, admin.start, end) > 0.5 }));
}

export interface Segment { start: string; end?: string; tenure?: Tenure }

/** Tenures overlapping the window, with uncovered stretches of more than a day as gaps. */
export function leadersIn(dept: Department, start: string, end: string | undefined, today: string): Segment[] {
  const stop = end ?? today;
  const inside = dept.leaders.filter((t) => t.start < stop && (t.end ?? today) > start);
  const segs: Segment[] = [];
  let cursor = start;
  for (const t of inside) {
    if (ms(t.start) - ms(cursor) > DAY) segs.push({ start: cursor, end: t.start });
    segs.push({ start: t.start, end: t.end, tenure: t });
    const tEnd = t.end ?? stop;
    if (tEnd > cursor) cursor = tEnd;
  }
  if (end && ms(end) - ms(cursor) > DAY) segs.push({ start: cursor, end });
  return segs;
}
