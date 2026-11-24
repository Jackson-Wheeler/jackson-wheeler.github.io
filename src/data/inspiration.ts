export const categories = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'style', label: 'Style' },
  { id: 'travel', label: 'Travel & Grooming' },
  { id: 'home', label: 'Home' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];
export type ItemCategory = Exclude<CategoryId, 'all'>;

export const categoryLabels: Record<ItemCategory, string> = {
  active: 'Active',
  style: 'Style',
  travel: 'Travel & Grooming',
  home: 'Home',
};

export type GiftArtName = 'tee' | 'massage' | 'knit' | 'iron' | 'watch' | 'sandals' | 'soap' | 'kit';

export interface InspirationItem {
  id: string;
  title: string;
  note?: string;
  size?: string;
  category: ItemCategory;
  art: GiftArtName;
  /** Uncertain item: dashed border. The question mark lives in the title. */
  maybe?: boolean;
  href?: string;
  linkLabel?: string;
}

export const inspirationItems: InspirationItem[] = [
  {
    id: 'tee',
    title: 'A simple workout tee',
    category: 'active',
    art: 'tee',
  },
  {
    id: 'layer',
    title: 'A sweater, sweatshirt, or jacket',
    note: 'For work or just in general.',
    size: 'Size: a tall large (extra length in arms and waist) or an extra large, depending on the brand and fit.',
    category: 'style',
    art: 'knit',
  },
  {
    id: 'iron',
    title: 'A portable iron and board',
    note: 'A simple iron and board that’s easy to pack up and move.',
    category: 'home',
    art: 'iron',
  },
  {
    id: 'watch',
    title: 'A simple watch',
    note: 'Something he’ll actually wear. A clear face, a comfortable strap, nothing extra.',
    category: 'style',
    art: 'watch',
  },
  {
    id: 'sandals',
    title: 'Shower shoes',
    note: 'For the gym or a shared shower. Practical, and nicer than going without.',
    category: 'active',
    art: 'sandals',
  },
  {
    id: 'squatch',
    title: 'Dr. Squatch',
    note: 'Soaps and the rest of the lineup, from a brand he already reaches for.',
    category: 'travel',
    art: 'soap',
    href: 'https://www.drsquatch.com',
    linkLabel: 'Visit Dr. Squatch',
  },
  {
    id: 'kit',
    title: 'A travel wash kit',
    note: 'Travel-size shampoo, conditioner, and body wash — or a case that keeps a bar of soap from making a mess.',
    category: 'travel',
    art: 'kit',
  },
  {
    id: 'massage',
    title: 'Massage gun?',
    note: 'He’s unsure about this one. A straightforward model might be a yes — no need to hunt for the fanciest.',
    category: 'active',
    art: 'massage',
    maybe: true,
  },
];
