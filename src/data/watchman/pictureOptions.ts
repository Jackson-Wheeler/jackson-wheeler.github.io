export interface PictureCard {
  name: string;
  slug: string;
  href: string;
  title: string;
  description: string;
}

const federal = {
  href: '/watchman/federal/',
  title: '2024–2028 Federal Government',
  description: 'Executive orders, public laws, budget acts, court rulings.',
};
const california = {
  href: '/watchman/california/',
  title: '2011–2027 California Government',
  description: 'Chaptered bills, executive orders, budgets, rulings.',
};
const la = {
  href: '/watchman/la/',
  title: 'LA City/County 2013–2027',
  description: 'City and county shown separately.',
};

function card(
  base: { href: string; title: string; description: string },
  name: string,
  slug: string,
): PictureCard {
  return { ...base, name, slug };
}

export interface PictureGroup {
  id: string;
  heading: string;
  lead: string;
  cards: PictureCard[];
  wide: PictureCard[];
}

export const pictureGroups: PictureGroup[] = [
  {
    id: 'fed-pics',
    heading: 'Federal',
    lead: 'capitol',
    cards: [
      card(federal, 'Capitol', 'capitol'),
      card(federal, 'White House', 'white-house'),
      card(federal, 'Supreme Court', 'court'),
      card(federal, 'The Mall', 'mall'),
      card(federal, 'The record', 'ledger'),
      card(federal, 'The scales', 'scales'),
      card(federal, 'The stars', 'stars'),
      card(federal, 'Flag, close', 'flag-close'),
      card(federal, 'Flag, hanging', 'flag-hall'),
      card(federal, 'Flag, folded', 'flag-fold'),
    ],
    wide: [
      card(federal, 'Full width · Capitol', 'capitol'),
      card(federal, 'Full width · The Mall', 'mall'),
      card(federal, 'Full width · The stripes', 'stripes'),
      card(federal, 'Full width · The record', 'ledger'),
      card(federal, 'Full width · The stars', 'stars'),
      card(federal, 'Full width · Flag, hanging', 'flag-hall'),
    ],
  },
  {
    id: 'ca-pics',
    heading: 'California',
    lead: 'sacramento',
    cards: [
      card(california, 'State Capitol', 'sacramento'),
      card(california, 'Bear flag', 'bear'),
      card(california, 'The grizzly', 'grizzly'),
      card(california, 'Redwoods', 'redwood'),
      card(california, 'The fields', 'fields'),
      card(california, 'The coast', 'coast'),
    ],
    wide: [
      card(california, 'Full width · State Capitol', 'sacramento'),
      card(california, 'Full width · The fields', 'fields'),
      card(california, 'Full width · Redwoods', 'redwood'),
      card(california, 'Full width · The coast', 'coast'),
      card(california, 'Full width · The grizzly', 'grizzly'),
      card(california, 'Full width · Bear flag', 'bear'),
    ],
  },
  {
    id: 'la-pics',
    heading: 'Los Angeles',
    lead: 'civic',
    cards: [
      card(la, 'City Hall', 'city-hall'),
      card(la, 'Civic center', 'civic'),
      card(la, 'The basin', 'basin'),
      card(la, 'Palms', 'palms'),
      card(la, 'The river', 'river'),
      card(la, 'The horizon', 'horizon'),
    ],
    wide: [
      card(la, 'Full width · Civic center', 'civic'),
      card(la, 'Full width · The horizon', 'horizon'),
      card(la, 'Full width · The basin', 'basin'),
      card(la, 'Full width · Palms', 'palms'),
      card(la, 'Full width · The river', 'river'),
      card(la, 'Full width · City Hall', 'city-hall'),
    ],
  },
];
