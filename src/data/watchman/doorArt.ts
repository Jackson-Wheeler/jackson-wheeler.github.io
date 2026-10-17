import type { DoorKey } from './types';

export interface DoorArt { img: string; alt: string; width: number; height: number; caption: string; svg?: boolean }

export interface DoorCredit { title: string; author: string; license: string; licenseUrl: string; page: string; changes: string }

export const doorArt: Partial<Record<DoorKey, DoorArt>> = {
  federal: { img: "lincoln-night", alt: "The Lincoln Memorial lit at night across the Reflecting Pool", width: 1600, height: 900, caption: "Lincoln Memorial, Washington", svg: false },
  california: { img: "golden-gate-night", alt: "The Golden Gate Bridge lit at night", width: 1600, height: 1140, caption: "Golden Gate, San Francisco", svg: false },
  la: { img: "griffith-night", alt: "Griffith Observatory lit at night", width: 1600, height: 1066, caption: "Griffith Observatory, Los Angeles", svg: false },
};

export const doorCredits: DoorCredit[] = [
  { title: "Lincoln Memorial at Night", author: "Bradley Weber", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", page: "https://commons.wikimedia.org/wiki/File:Lincoln_Memorial_at_Night_(11487533623).jpg", changes: "Resized, cropped, compressed." },
  { title: "Golden Gate Bridge by night", author: "Daniel Schwen", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/wiki/File:Golden_Gate_Bridge_by_night.jpg", changes: "Resized, cropped, compressed." },
  { title: "Griffith Observatory night 2010", author: "FairbanksMike", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", page: "https://commons.wikimedia.org/wiki/File:Griffith_Observatory_night_2010.jpg", changes: "Resized, cropped, compressed." },
];
