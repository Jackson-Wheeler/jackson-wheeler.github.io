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
    wide: {
      avif: '/watchman/img/wide-federal.avif',
      avifSmall: '/watchman/img/wide-federal-800.avif',
      webp: '/watchman/img/wide-federal.webp',
      webpSmall: '/watchman/img/wide-federal-800.webp',
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
    wide: {
      avif: '/watchman/img/wide-california.avif',
      avifSmall: '/watchman/img/wide-california-800.avif',
      webp: '/watchman/img/wide-california.webp',
      webpSmall: '/watchman/img/wide-california-800.webp',
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
    wide: {
      avif: '/watchman/img/wide-la.avif',
      avifSmall: '/watchman/img/wide-la-800.avif',
      webp: '/watchman/img/wide-la.webp',
      webpSmall: '/watchman/img/wide-la-800.webp',
    },
  },
];
