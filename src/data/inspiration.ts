export type IdeaSpan = 5 | 6 | 7 | 12;

export interface Idea {
  title: string;
  note: string;
  /** Lucide icon (`lucide:name`) or a local SVG in src/icons. */
  icon: string;
  span: IdeaSpan;
  maybe?: boolean;
  href?: string;
  linkLabel?: string;
}

export interface IdeaSection {
  id: string;
  heading: string;
  ideas: Idea[];
}

export const sections: IdeaSection[] = [
  {
    id: 'wear',
    heading: 'To wear',
    ideas: [
      {
        title: 'A simple workout tee',
        note: 'Non-cotton, and nothing fussy — a plain shirt that can breathe. One is plenty; a couple would be even nicer.',
        icon: 'lucide:shirt',
        span: 7,
      },
      {
        title: 'A sweater, sweatshirt, or jacket',
        note: 'For work, or for anywhere else the week goes. The sort of layer you reach for without thinking.',
        icon: 'lucide:jacket',
        span: 5,
      },
      {
        title: 'A simple watch',
        note: 'Clean and quiet. Easy to read, and comfortable enough to forget it’s there.',
        icon: 'lucide:watch',
        span: 12,
      },
    ],
  },
  {
    id: 'home',
    heading: 'Around the house',
    ideas: [
      {
        title: 'A portable iron and board',
        note: 'The compact kind, so a wrinkled shirt doesn’t need a whole laundry room.',
        icon: 'iron',
        span: 6,
      },
      {
        title: 'Shower shoes',
        note: 'US 11. Easy to slip on, and easy to rinse off.',
        icon: 'lucide:sport-shoe',
        span: 6,
      },
      {
        title: 'A massage gun, maybe',
        note: 'I’m still on the fence about this one. Only if it already feels like an easy yes.',
        icon: 'massage-gun',
        span: 12,
        maybe: true,
      },
    ],
  },
  {
    id: 'wash',
    heading: 'Wash and travel',
    ideas: [
      {
        title: 'Dr. Squatch',
        note: 'Soap and the rest of their lineup — a woodsy, everyday sort of thing.',
        icon: 'lucide:tree-pine',
        span: 6,
        href: 'https://www.drsquatch.com',
        linkLabel: 'drsquatch.com',
      },
      {
        title: 'Travel wash, or a case for bar soap',
        note: 'A small shampoo, conditioner, and body wash — or a little case so a bar of soap can travel without making a mess.',
        icon: 'lucide:luggage',
        span: 6,
      },
    ],
  },
];

export const notes = {
  id: 'notes',
  heading: 'Good to know',
  intro: 'A couple of practical notes, if they help.',
  shoesLabel: 'Shoes',
  shoesValue: 'US 11',
  materialsLabel: 'Materials',
  materials:
    'I prefer real leather, and materials that breathe, over synthetics that trap sweat.',
};
