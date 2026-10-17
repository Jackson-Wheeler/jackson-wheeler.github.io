import type { DoorLink } from './types';

export const recordDoors: DoorLink[] = [
  {
    href: '/watchman/federal/',
    title: '2024–2028 Federal Government',
    description: 'Executive orders, public laws, budget acts, court rulings.',
    image: {
      avif: '/watchman/img/door-federal.avif',
      avifSmall: '/watchman/img/door-federal-1100.avif',
      webp: '/watchman/img/door-federal.webp',
      place: 'federal',
    },
  },
  {
    href: '/watchman/california/',
    title: '2011–2027 California Government',
    description: 'Chaptered bills, executive orders, budgets, rulings.',
    image: {
      avif: '/watchman/img/door-california.avif',
      avifSmall: '/watchman/img/door-california-1100.avif',
      webp: '/watchman/img/door-california.webp',
      place: 'california',
    },
  },
  {
    href: '/watchman/la/',
    title: 'LA City/County 2013–2027',
    description: 'City and county shown separately.',
    image: {
      avif: '/watchman/img/door-la.avif',
      avifSmall: '/watchman/img/door-la-1100.avif',
      webp: '/watchman/img/door-la.webp',
      place: 'la',
    },
  },
];
