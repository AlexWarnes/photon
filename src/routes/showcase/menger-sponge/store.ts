import { writable } from "svelte/store";

export const mLevel = writable(1);
export const calcScaleFactor = (l: number): number => 3 / Math.pow(3, l);