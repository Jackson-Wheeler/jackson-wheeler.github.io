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
    note: 'For work, or for other days. Something easy to throw on and actually wear.',
    category: 'style',
    art: 'knit',
  },
  {
    id: 'iron',
    title: 'A portable iron and board',
    note: 'The folding kind. An iron and a board that can tuck away when they aren’t needed.',
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
