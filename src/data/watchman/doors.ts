import type { DoorLink } from './types';

export const recordDoors: DoorLink[] = [
  {
    href: '/watchman/federal/',
    title: '2024–2028 Federal Government',
    description: 'Executive orders, public laws, budget acts, court rulings.',
    image: {
      avif: '/watchman/img/opt-flag-hall.avif',
      avifSmall: '/watchman/img/opt-flag-hall-1100.avif',
      webp: '/watchman/img/opt-flag-hall.webp',
      place: 'federal',
    },
    wide: {
      avif: '/watchman/img/wide-flag-hall.avif',
      avifSmall: '/watchman/img/wide-flag-hall-800.avif',
      webp: '/watchman/img/wide-flag-hall.webp',
      webpSmall: '/watchman/img/wide-flag-hall-800.webp',
    },
  },
  {
    href: '/watchman/california/',
    title: '2011–2027 California Government',
    description: 'Chaptered bills, executive orders, budgets, rulings.',
    image: {
      avif: '/watchman/img/opt-grizzly.avif',
      avifSmall: '/watchman/img/opt-grizzly-1100.avif',
      webp: '/watchman/img/opt-grizzly.webp',
      place: 'california',
    },
    wide: {
      avif: '/watchman/img/wide-grizzly.avif',
      avifSmall: '/watchman/img/wide-grizzly-800.avif',
      webp: '/watchman/img/wide-grizzly.webp',
      webpSmall: '/watchman/img/wide-grizzly-800.webp',
    },
  },
  {
    href: '/watchman/la/',
    title: 'LA City/County 2013–2027',
    description: 'City and county shown separately.',
    image: {
      avif: '/watchman/img/opt-civic.avif',
      avifSmall: '/watchman/img/opt-civic-1100.avif',
      webp: '/watchman/img/opt-civic.webp',
      place: 'la',
    },
    wide: {
      avif: '/watchman/img/wide-civic.avif',
      avifSmall: '/watchman/img/wide-civic-800.avif',
      webp: '/watchman/img/wide-civic.webp',
      webpSmall: '/watchman/img/wide-civic-800.webp',
    },
  },
];
