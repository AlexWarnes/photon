import { LayerMaterial, Noise } from "lamina/vanilla";
import { writable } from "svelte/store";
import { BackSide, Color } from "three";

export const boardHeight = writable(40);
export const boardWidth = writable(30);
export const bumperCount = writable(20);
export const power = writable(50);
export const moveTo = writable<'LEFT' | 'CENTER' | 'RIGHT'>('CENTER');

    