import type { Position } from '@threlte/core';
import { writable } from 'svelte/store';
import type { Vector3 } from 'three';

export const defaultPosition: Position = { y: -10 };
export const shockwavePosition = writable<Position>(defaultPosition);
export function handleShockwaveChange(newPosition: Vector3): void {
	const { x, y, z } = newPosition;
	shockwavePosition.set({ x, y: -10, z });
}
