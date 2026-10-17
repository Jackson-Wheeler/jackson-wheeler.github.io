import type { DoorKey } from './types';

export interface DoorArt { img: string; alt: string; width: number; height: number; caption: string; svg?: boolean }

export interface DoorCredit { title: string; author: string; license: string; licenseUrl: string; page: string; changes: string }

export const doorArt: Partial<Record<DoorKey, DoorArt>> = {
  federal: { img: "usmc-memorial-night-duo", alt: "The Marine Corps War Memorial at night: six bronze figures raising the flag", width: 1600, height: 1074, caption: "Marine Corps War Memorial, Arlington", svg: false },
  california: { img: "sequoias-duo", alt: "Giant sequoias rising toward the canopy", width: 1600, height: 1060, caption: "Giant sequoias, Sierra Nevada", svg: false },
  la: { img: "la-cityhall-grandpark-duo", alt: "Los Angeles City Hall at night, seen from Grand Park", width: 1600, height: 1200, caption: "City Hall, Los Angeles", svg: false },
};

export const doorCredits: DoorCredit[] = [
  { title: "Marine Corps War Memorial at night - 1", author: "APK", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", page: "https://commons.wikimedia.org/wiki/File:Marine_Corps_War_Memorial_at_night_-_1.jpg", changes: "Resized, cropped, compressed, toned to a brass duotone." },
  { title: "Giant sequoias in Sequoia National Park 2013", author: "Tuxyso", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/wiki/File:Giant_sequoias_in_Sequoia_National_Park_2013.jpg", changes: "Resized, cropped, compressed, toned to a brass duotone." },
  { title: "Los Angeles City Hall as seen from Grand Park at night", author: "Casfreelancer", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", page: "https://commons.wikimedia.org/wiki/File:Los_Angeles_City_Hall_as_seen_from_Grand_Park_at_night..jpg", changes: "Resized, cropped, compressed, toned to a brass duotone." },
];
