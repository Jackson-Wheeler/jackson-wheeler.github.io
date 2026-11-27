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

export type GiftArtName = 'tee' | 'knit' | 'iron' | 'watch' | 'sandals' | 'soap' | 'socks';

export interface InspirationItem {
  id: string;
  title: string;
  note?: string;
  size?: string;
  category: ItemCategory;
  art: GiftArtName;
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
    note: 'A simple iron and board.',
    category: 'home',
    art: 'iron',
  },
  {
    id: 'watch',
    title: 'A simple watch',
    category: 'style',
    art: 'watch',
  },
  {
    id: 'sandals',
    title: 'Shower shoes',
    note: 'For retreats and other similar outings or trips.',
    size: 'Size: US 11',
    category: 'active',
    art: 'sandals',
  },
  {
    id: 'squatch',
    title: 'Dr. Squatch',
    note: 'Any product from Dr. Squatch!',
    category: 'travel',
    art: 'soap',
    href: 'https://www.drsquatch.com',
    linkLabel: 'Visit Dr. Squatch',
  },
  {
    id: 'socks',
    title: 'Darn Tough socks',
    note: 'Merino wool, with a lifetime guarantee. Lightweight or regular cushioning is fine.',
    size: 'Size: men’s L (US 11)',
    category: 'active',
    art: 'socks',
    href: 'https://darntough.com/collections/men',
    linkLabel: 'Visit Darn Tough',
  },
];
