import { writable } from "svelte/store";

export const nbodyCount = writable(100);
export const attractorCount = writable(3);
export const dynamicAttractors = writable(false);