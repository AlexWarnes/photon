import { tweened } from 'svelte/motion';
import { linear } from 'svelte/easing';
import * as THREE from 'three';
import type { Vec3RangeOptions } from '$lib/ts-models/general';
import type { Vector3 } from 'three';

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
	const x = THREE.MathUtils.randInt(xMin, xMax);
	const y = THREE.MathUtils.randInt(yMin, yMax);
	const z = THREE.MathUtils.randInt(zMin, zMax);
	return new THREE.Vector3(x, y, z);
}

/*
	import { rxThrottle } from 'svelte-fuse-rx';

	// 	Variables to handle mousemoves
	let cameraShift = true;
	let innerHeight: number;
	let innerWidth: number;
	let defaultRigPosition = [0, 10, 50];
	let rigPosition = defaultRigPosition;
	function handleMM({ detail }: any) {
		if (cameraShift) {
			const m = new THREE.Vector2(
				THREE.MathUtils.mapLinear(detail.x / innerWidth, 0, 1, 15, -15),
				THREE.MathUtils.mapLinear(detail.y / innerHeight, 0, 1, 15, -15)
			);
			console.log("rig:",m, [defaultRigPosition[0] - m.x, defaultRigPosition[1] + m.y, 50])
			rigPosition = [-m.x, m.y, 50];
			// rigPosition = [defaultRigPosition[0] - m.x, defaultRigPosition[1] + m.y, 50];
		}
	}
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div
	use:rxThrottle={{
		on: 'mousemove',
		duration: 30
	}}
	on:rxEmit={handleMM}
>
</div>
*/
