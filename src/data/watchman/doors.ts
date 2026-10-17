import type { DoorImage, DoorLink } from './types';

/** Wide card picture: 1800 AVIF, 1800 WebP, and a phone AVIF. */
function picture(name: string): DoorImage {
  return {
    avif: `/watchman/img/${name}.avif`,
    avifSmall: `/watchman/img/${name}-1100.avif`,
    webp: `/watchman/img/${name}.webp`,
  };
}

export const recordDoors: DoorLink[] = [
  {
    href: '/watchman/federal/',
    title: 'Federal Government',
    image: picture('record-federal'),
  },
  {
    href: '/watchman/california/',
    title: 'California Government',
    image: picture('record-california'),
  },
  {
    href: '/watchman/orange-county/',
    title: 'Orange County',
    image: picture('record-orange-county'),
  },
  {
    href: '/watchman/costa-mesa/',
    title: 'Costa Mesa',
    image: picture('record-costa-mesa'),
  },
  {
    href: '/watchman/la/',
    title: 'LA City/County',
    hidden: true,
    image: picture('record-la'),
  },
];
