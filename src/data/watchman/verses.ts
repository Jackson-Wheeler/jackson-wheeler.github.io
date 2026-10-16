import type { Verse } from './types';

/** Featured verse on the landing page (NKJV text exact; unpaired trailing quote dropped). */
export const featuredVerse: Verse = {
  cite: 'Ezekiel 33:6 · NKJV',
  text: 'But if the watchman sees the sword coming and does not blow the trumpet, and the people are not warned, and the sword comes and takes any person from among them, he is taken away in his iniquity; but his blood I will require at the watchman’s hand.',
};

export const supportingVerses: Verse[] = [
  {
    cite: 'Nehemiah 4:9 · NKJV',
    text: 'Nevertheless we made our prayer to our God, and because of them we set a watch against them day and night.',
  },
  {
    cite: 'Ezekiel 33:7 · NKJV',
    text: 'So you, son of man: I have made you a watchman for the house of Israel; therefore you shall hear a word from My mouth and warn them for Me.',
  },
];

/**
 * NKJV, checked against Bible Gateway.
 * Ephesians 5:11 is the charge. Luke 12:2 and Ephesians 5:15–16 stand with it.
 * Prayer for rulers, then the peace of the city, come before the records.
 */
export const exposeVerse: Verse = {
  cite: 'Ephesians 5:11 · NKJV',
  text: 'And have no fellowship with the unfruitful works of darkness, but rather expose them.',
};

export const exposeSupporting: Verse[] = [
  {
    cite: 'Luke 12:2 · NKJV',
    text: 'For there is nothing covered that will not be revealed, nor hidden that will not be known.',
  },
  {
    cite: 'Ephesians 5:15–16 · NKJV',
    text: 'See then that you walk circumspectly, not as fools but as wise, redeeming the time, because the days are evil.',
  },
];

export const prayerVerse: Verse = {
  cite: '1 Timothy 2:1–2 · NKJV',
  text: 'Therefore I exhort first of all that supplications, prayers, intercessions, and giving of thanks be made for all men, for kings and all who are in authority, that we may lead a quiet and peaceable life in all godliness and reverence.',
};

export const peaceVerse: Verse = {
  cite: 'Jeremiah 29:7 · NKJV',
  text: 'And seek the peace of the city where I have caused you to be carried away captive, and pray to the Lord for it; for in its peace you will have peace.',
};
