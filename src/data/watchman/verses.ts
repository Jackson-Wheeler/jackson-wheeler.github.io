import type { Verse } from './types';

/** Featured verse on the landing page (NKJV text exact; leading quote dropped as continuing quotation). */
export const featuredVerse: Verse = {
  cite: 'Ezekiel 33:7 · NKJV',
  text: 'So you, son of man: I have made you a watchman for the house of Israel; therefore you shall hear a word from My mouth and warn them for Me.',
};

export const supportingVerses: Verse[] = [
  {
    cite: 'Nehemiah 4:9 · NKJV',
    text: 'Nevertheless we made our prayer to our God, and because of them we set a watch against them day and night.',
  },
  {
    cite: 'Isaiah 5:20 · NKJV',
    text: 'Woe to those who call evil good, and good evil;\nWho put darkness for light, and light for darkness;\nWho put bitter for sweet, and sweet for bitter!',
    poetic: true,
  },
  // Third card is a TBD pick. Alternative candidates to weigh (verify NKJV text before swapping):
  //   Ezekiel 3:17, Habakkuk 2:1, Isaiah 62:6, Proverbs 14:15, 1 Thessalonians 5:21.
  {
    cite: 'Proverbs 18:17 · NKJV',
    text: 'The first one to plead his cause seems right,\nUntil his neighbor comes and examines him.',
    poetic: true,
  },
];
