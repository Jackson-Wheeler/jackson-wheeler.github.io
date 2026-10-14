/**
 * Projects shown on the landing page.
 * To add one, append an entry below; it appears as a card automatically.
 */
export type ProjectStatus = 'active' | 'in-progress' | 'archived';

export interface Project {
  title: string;
  description: string;
  url?: string;
  tags: string[];
  status: ProjectStatus;
}

export const projects: Project[] = [
  {
    title: 'Watchman',
    // TODO: draft description, pending Jackson's approval.
    description: 'A plain, sourced record of what government has actually done.',
    url: '/watchman/',
    tags: [],
    status: 'in-progress',
  },
  // {
  //   title: 'Example',
  //   description: 'One or two sentences about what it does.',
  //   url: 'https://github.com/Jackson-Wheeler/example',
  //   tags: ['TypeScript', 'Astro'],
  //   status: 'in-progress',
  // },
];
