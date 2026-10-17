import type { DoorKey } from './types';

export interface DoorArt { img: string; alt: string; width: number; height: number; caption: string; svg?: boolean }

export interface DoorCredit { title: string; author: string; license: string; licenseUrl: string; page: string; changes: string }

export const doorArt: Partial<Record<DoorKey, DoorArt>> = {
  federal: { img: "us-capitol-night", alt: "The United States Capitol lit at night", width: 1600, height: 1208, caption: "United States Capitol, Washington", svg: false },
  california: { img: "ca-capitol-night", alt: "The California State Capitol dome lit at night", width: 1600, height: 1200, caption: "State Capitol, Sacramento", svg: false },
  la: { img: "la-cityhall-grandpark", alt: "Los Angeles City Hall at night, seen from Grand Park", width: 1600, height: 1200, caption: "City Hall, Los Angeles", svg: false },
};

export const doorCredits: DoorCredit[] = [
  { title: "US Capitol Building at night Jan 2006", author: "Diliff (David Iliff)", license: "Public domain (released by author)", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:US_Capitol_Building_at_night_Jan_2006.jpg", changes: "Resized, cropped, compressed." },
  { title: "California State Capitol @ Night", author: "Rojer (Flickr)", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", page: "https://commons.wikimedia.org/wiki/File:California_State_Capitol_@_Night_(2905715075).jpg", changes: "Resized, cropped, compressed." },
  { title: "Los Angeles City Hall as seen from Grand Park at night", author: "Casfreelancer", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", page: "https://commons.wikimedia.org/wiki/File:Los_Angeles_City_Hall_as_seen_from_Grand_Park_at_night..jpg", changes: "Resized, cropped, compressed." },
];
