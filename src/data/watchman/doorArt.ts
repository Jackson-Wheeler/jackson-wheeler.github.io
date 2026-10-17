import type { DoorKey } from './types';

export interface DoorArt { img: string; alt: string; width: number; height: number; caption: string; svg?: boolean }

export interface DoorCredit { title: string; author: string; license: string; licenseUrl: string; page: string; changes: string }

export const doorArt: Partial<Record<DoorKey, DoorArt>> = {
  federal: { img: "us-dome-1860s-sepia", alt: "The U.S. Capitol dome under construction, about 1860", width: 1536, height: 1306, caption: "Capitol dome under construction, c. 1860", svg: false },
  california: { img: "ca-capitol-1868-sepia", alt: "The California State Capitol under construction in 1868", width: 1600, height: 1002, caption: "State Capitol under construction, 1868", svg: false },
  la: { img: "la-plaza-1869-sepia", alt: "The Los Angeles Plaza in 1869", width: 1022, height: 400, caption: "The Plaza, Los Angeles, 1869", svg: false },
};

export const doorCredits: DoorCredit[] = [
  { title: "Construction of the U.S. Capitol Dome (c. 1860)", author: "Unknown photographer; Library of Congress, LCCN 2004681888", license: "Public domain", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:Construction_of_the_U.S._Capitol_Dome_LCCN2004681888.jpg", changes: "Resized, cropped, compressed, toned sepia." },
  { title: "Construction of the California Capitol in 1868", author: "Unknown photographer", license: "Public domain", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:Construction_of_the_California_Capitol_in_1868.jpg", changes: "Resized, cropped, compressed, toned sepia." },
  { title: "Los Angeles Plaza, 1869", author: "Unknown photographer", license: "Public domain", licenseUrl: "", page: "https://commons.wikimedia.org/wiki/File:LosAngeles-Plaza-1869.jpg", changes: "Resized, cropped, compressed, toned sepia." },
];
