import { tweened } from 'svelte/motion';
import { linear } from 'svelte/easing';
import type { Vec3RangeOptions } from '$lib/ts-models/general';
import { Vector3 } from 'three';
import { randFloat, randInt } from 'three/src/math/MathUtils';

const defaultConfig = {
	start: 0,
	end: 15,
	duration: 15000,
	easing: linear
};

export function oscillatingValue(config = defaultConfig) {
	const { start, end, duration, easing } = config;
	return tweened(start, { duration, easing });
}

export const oscillatingVector = () => {
	const v = oscillatingValue();
	return [v, v, v];
};

const defaultMin: number = -25;
const defaultMax: number = 25;
const defaultVec3RangeOptions: [number, number] = [defaultMin, defaultMax];

// {x: [min, max], y: [min, max], z: [min, max]} | [min, max]
export function randomVec3(range: Vec3RangeOptions = defaultVec3RangeOptions): Vector3 {
	let xMin = defaultMin;
	let xMax = defaultMax;
	let yMin = defaultMin;
	let yMax = defaultMax;
	let zMin = defaultMin;
	let zMax = defaultMax;
	if (Array.isArray(range)){
		xMin = range[0];
		yMin = range[0];
		zMin = range[0];
		
		xMax = range[1];
		yMax = range[1];
		zMax = range[1];
	} else if (typeof range === 'object') {
		if (range.hasOwnProperty('x')){
			// @ts-ignore
			xMin = range['x'][0];
			// @ts-ignore
			xMax = range['x'][1];
		}
		if (range.hasOwnProperty('y')){
			// @ts-ignore
			yMin = range['y'][0];
			// @ts-ignore
			yMax = range['y'][1];
		}
		if (range.hasOwnProperty('z')){
			// @ts-ignore
			zMin = range['z'][0];
			// @ts-ignore
			zMax = range['z'][1];
		}
	}
	// TODO: add range config args
	const x = randInt(xMin, xMax);
	const y = randInt(yMin, yMax);
	const z = randInt(zMin, zMax);
	return new Vector3(x, y, z);
}

export function randomAngle() {
	return (randFloat(0, 0.99) * (2 * Math.PI));
}

export function randomPositionOnRing(config = { ringRange: [50, 60], depthRange: [-15, 15] }): Vector3 {
	const distanceFromCenter = randInt(config.ringRange[0], config.ringRange[1]);
	const angle = randomAngle();
	return new Vector3(
		Math.cos(angle) * distanceFromCenter, // x
		Math.sin(angle) * distanceFromCenter, // y
		randInt(config.depthRange[0], config.depthRange[1]) // z
	);
}
