import type { DoorKey } from './types';

export interface DoorArt { img: string; alt: string; width: number; height: number; caption: string; svg?: boolean }

export interface DoorCredit { title: string; author: string; license: string; licenseUrl: string; page: string; changes: string }

export const doorArt: Partial<Record<DoorKey, DoorArt>> = {
  federal: { img: "us-capitol-night", alt: "The United States Capitol lit at night", width: 1600, height: 1208, caption: "United States Capitol, Washington", svg: false },
  california: { img: "ca-capitol-blue", alt: "The California State Capitol at blue hour", width: 1600, height: 1600, caption: "State Capitol, Sacramento", svg: false },
  la: { img: "sixth-street", alt: "The Sixth Street Viaduct arches over the Los Angeles River at dusk", width: 1600, height: 1280, caption: "Sixth Street Viaduct, Los Angeles River", svg: false },
};

export const doorCredits: DoorCredit[] = [
  { title: "US Capitol Building at night Jan 2006", author: "Diliff (David Iliff)", license: "Public domain (released by author)", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:US_Capitol_Building_at_night_Jan_2006.jpg", changes: "Resized, cropped, compressed." },
  { title: "California State Capitol during blue hour", author: "Frank Schulenburg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", page: "https://commons.wikimedia.org/wiki/File:California_State_Capitol_during_blue_hour.jpg", changes: "Resized, cropped, compressed." },
  { title: "Sixth Street Viaduct Los Angeles River", author: "Steve Lyon", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", page: "https://commons.wikimedia.org/wiki/File:Sixth_Street_Viaduct_Los_Angeles_River_(9066252968).jpg", changes: "Resized, cropped, compressed." },
];
