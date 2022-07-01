import { tweened } from "svelte/motion";
import { elasticOut, linear } from "svelte/easing"
import * as THREE from "three";

const defaultConfig = {
  start: 0,
  end: 15,
  duration: 15000,
  easing: linear,
}

export function oscillatingValue(config = defaultConfig){
  const { start, end, duration, easing } = config;
  return tweened(start, {duration, easing});
}

export const oscillatingVector = () => {
  const v = oscillatingValue(); 
  return [v, v, v]
}

export interface Vec3RangeOptions {
	xMin: number;
	xMax: number;
	yMin: number;
	yMax: number;
	zMin: number;
	zMax: number;
}

const defaultVec3RangeOptions: Vec3RangeOptions = {
	xMin: -25,
	xMax: 25,
	yMin: -25,
	yMax: 25,
	zMin: -25,
	zMax: 25,
}
export function randomVec3(range: Vec3RangeOptions = defaultVec3RangeOptions){
	// TODO: add range config args
	const x = THREE.MathUtils.randInt(range.xMin, range.xMax);
	const y = THREE.MathUtils.randInt(range.yMin, range.yMax);
	const z = THREE.MathUtils.randInt(range.zMin, range.zMax);
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