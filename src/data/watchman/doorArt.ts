import type { DoorKey } from './types';

export interface DoorArt { img: string; alt: string; width: number; height: number; caption: string; svg?: boolean }

export interface DoorCredit { title: string; author: string; license: string; licenseUrl: string; page: string; changes: string }

export const doorArt: Partial<Record<DoorKey, DoorArt>> = {
  federal: { img: "rushmore", alt: "Mount Rushmore National Memorial", width: 1600, height: 1088, caption: "Mount Rushmore, South Dakota", svg: false },
  california: { img: "yosemite-tunnel", alt: "Yosemite Valley in the Sierra Nevada from Tunnel View", width: 1600, height: 1044, caption: "Yosemite Valley, Sierra Nevada", svg: false },
  la: { img: "la-from-griffith", alt: "The lights of Los Angeles at night from Griffith Observatory", width: 1600, height: 900, caption: "Los Angeles from Griffith Park", svg: false },
};

export const doorCredits: DoorCredit[] = [
  { title: "Mount Rushmore detail view", author: "Thomas Wolf, www.foto-tw.de", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/wiki/File:Mount_Rushmore_detail_view.jpg", changes: "Resized, cropped, compressed." },
  { title: "Tunnel View, Yosemite Valley, Yosemite NP", author: "Diliff (David Iliff)", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/", page: "https://commons.wikimedia.org/wiki/File:Tunnel_View,_Yosemite_Valley,_Yosemite_NP_-_Diliff.jpg", changes: "Resized, cropped, compressed." },
  { title: "Los Angeles at night from Griffith Observatory", author: "Rlumstead", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", page: "https://commons.wikimedia.org/wiki/File:Los_Angeles_at_night_from_Griffith_Observatory.jpg", changes: "Resized, cropped, compressed." },
];
