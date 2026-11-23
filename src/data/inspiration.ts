import type { IconNode } from 'lucide';
import {
  ExternalLink,
  Feather,
  Footprints,
  Jacket,
  Leaf,
  Ruler,
  Shirt,
  TubeLotion,
  Vibrate,
  Watch,
} from 'lucide';

/** Lucide has no iron. Same stroke language, so it sits with the set. */
const Iron: IconNode = [
  ['path', { d: 'M3 19h18' }],
  ['path', { d: 'M5 19 9 13h8a2 2 0 0 1 2 2v4' }],
  ['path', { d: 'M11.5 13V9.8A2.3 2.3 0 0 1 13.8 7.5H17' }],
  ['path', { d: 'M7 10c.5-1.2-.1-1.7.6-2.8' }],
  ['path', { d: 'M10.2 9c.5-1.2-.1-1.7.6-2.8' }],
];

export interface Idea {
  title: string;
  note: string;
  icon: IconNode;
  maybe?: boolean;
  href?: string;
  linkLabel?: string;
}

export interface IdeaSection {
  id: string;
  label: string;
  lede: string;
  ideas: Idea[];
}

export const sections: IdeaSection[] = [
  {
    id: 'active',
    label: 'Active',
    lede: 'For the workout, and the minute after.',
    ideas: [
      {
        title: 'A simple workout shirt — not cotton',
        note: 'A plain athletic tee that breathes and dries. One is a complete gift; a spare would not sit in a drawer.',
        icon: Shirt,
      },
      {
        title: 'Shower shoes',
        note: 'Easy ones for the gym shower. He wears a US 11, and they last longer if they can dry out.',
        icon: Footprints,
      },
      {
        title: 'A massage gun — maybe',
        note: 'He’s curious, and not quite convinced. If it feels like the right gift, a basic one is plenty.',
        icon: Vibrate,
        maybe: true,
      },
    ],
  },
  {
    id: 'everyday',
    label: 'Everyday style',
    lede: 'For work, and the rest of an ordinary week.',
    ideas: [
      {
        title: 'A sweater, sweatshirt, or jacket',
        note: 'For work or any other occasion. Leather, or a cloth that breathes, is what he’ll actually reach for.',
        icon: Jacket,
      },
      {
        title: 'A simple watch',
        note: 'Clean and quiet — a plain face, and a leather strap if you see one.',
        icon: Watch,
      },
    ],
  },
  {
    id: 'travel',
    label: 'Travel & grooming',
    lede: 'For the bag, and the morning away from home.',
    ideas: [
      {
        title: 'A portable iron and ironing board',
        note: 'The compact pair, for looking pulled-together on the road.',
        icon: Iron,
      },
      {
        title: 'Dr. Squatch',
        note: 'Soap, deodorant, or anything else from their line — straightforward, and good-smelling.',
        icon: Leaf,
        href: 'https://www.drsquatch.com',
        linkLabel: 'drsquatch.com',
      },
      {
        title: 'Travel wash, or a case for bar soap',
        note: 'Small shampoo, conditioner, and body wash — or a little case that lets a bar of soap travel well.',
        icon: TubeLotion,
      },
    ],
  },
];

export const notes: { title: string; body: string; icon: IconNode }[] = [
  {
    title: 'Shoe size',
    body: 'US 11.',
    icon: Ruler,
  },
  {
    title: 'Materials',
    body: 'He prefers real leather, and materials that breathe, over synthetics that trap sweat.',
    icon: Feather,
  },
];

export const externalLinkIcon = ExternalLink;
