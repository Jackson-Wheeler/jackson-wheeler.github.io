import type { DoorKey } from './types';

export interface DoorArt { img: string; alt: string; width: number; height: number; caption: string; svg?: boolean }

export interface DoorCredit { title: string; author: string; license: string; licenseUrl: string; page: string; changes: string }

export const doorArt: Partial<Record<DoorKey, DoorArt>> = {
  federal: { img: "flag-us", alt: "Flag of the United States", width: 1235, height: 650, caption: "Flag of the United States", svg: true },
  california: { img: "flag-ca", alt: "Flag of California (Bear Flag)", width: 1500, height: 1000, caption: "Bear Flag of California", svg: true },
  la: { img: "flag-la", alt: "Flag of the City of Los Angeles", width: 1500, height: 1000, caption: "Flag of the City of Los Angeles", svg: true },
};

export const doorCredits: DoorCredit[] = [
  { title: "Flag of the United States", author: "Wikimedia Commons contributors (Dbenbenn et al.)", license: "Public domain", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:Flag_of_the_United_States.svg", changes: "Shown as-is with a CSS shading overlay." },
  { title: "Flag of California", author: "Design: State of California (1911); vector: Devin Cook", license: "Public domain", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:Flag_of_California.svg", changes: "Shown as-is with a CSS shading overlay." },
  { title: "Flag of Los Angeles, California", author: "Design: City of Los Angeles (1931); vector: Mysid", license: "Public domain", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:Flag_of_Los_Angeles,_California.svg", changes: "Shown as-is with a CSS shading overlay." },
];
