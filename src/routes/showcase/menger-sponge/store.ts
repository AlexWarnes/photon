import { writable } from "svelte/store";
import { tweened } from "svelte/motion";
import { quintOut } from "svelte/easing";

export const sourceX = tweened(0, { duration: 750, easing: quintOut });
export const sourceY = tweened(10, { duration: 5000, easing: quintOut });
export const sourceZ = tweened(0, { duration: 750, easing: quintOut });
export const mLevel = writable(1);