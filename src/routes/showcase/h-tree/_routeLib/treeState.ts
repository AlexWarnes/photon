import type { Position, Rotation } from 'threlte';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { writable } from 'svelte/store';
import type { Vector3Tuple } from 'three';
import { degToRad, mapLinear, randInt } from 'three/src/math/MathUtils';
import { rxWritable } from "svelte-fuse-rx";
import { startWith, throttleTime, map, filter } from 'rxjs';
export interface Branch {
	id: string;
	points: Vector3Tuple[];
	material: LineMaterial;
}

export function calculateNextPoint(
	lineStart: Vector3Tuple,
	_angle: number,
	axis: 'x' | 'y' | 'z',
	length: number,
  allowRandom: boolean
): Vector3Tuple {
	const angle = degToRad(_angle + (allowRandom ? randInt(-45, 45) : 0));
	const [x, y, z] = lineStart;
	let endX;
	let endZ;
	let endY;
	switch (axis) {
		case 'x': // z,y
			endZ = z + length * Math.cos(angle);
			endY = y + length * Math.sin(angle);
			return [x, endY, endZ];

		case 'y': // x,z
			endX = x + length * Math.round(Math.cos(angle));
			endZ = z + length * Math.round(Math.sin(angle));
			return [endX, y, endZ];

		case 'z': // x, y
			endX = x + length * Math.cos(angle);
			endY = y + length * Math.sin(angle);
			return [endX, endY, z];
	}
}

export const defaultLineStart: Vector3Tuple = [0, 0, 0];
export const defaultLength: number = 5;
export const defaultAngle: number = 90;
export const defaultAxis: 'x' | 'y' | 'z' = 'z';
export const defaultBranchRate: number = 4;
export const defaultBranchWidth: number = 0.25;
export const defaultColor1: string = '#92e2f9';
export const defaultLineMaterial_0 = new LineMaterial({
  worldUnits: true,
  linewidth: defaultBranchWidth,
  // @ts-ignore bad types
  color: defaultColor1
  // clipIntersection: true
});
export const defaultLineMaterial_1 = new LineMaterial({
  worldUnits: true,
  linewidth: defaultBranchWidth * Math.pow(0.75, 1),
  // @ts-ignore bad types
  color: defaultColor1
  // clipIntersection: true
});
export const defaultLineMaterial_2 = new LineMaterial({
  worldUnits: true,
  linewidth: defaultBranchWidth * Math.pow(0.75, 2),
  // @ts-ignore bad types
  color: defaultColor1
  // clipIntersection: true
});
export const defaultLineMaterial_3 = new LineMaterial({
  worldUnits: true,
  linewidth: defaultBranchWidth * Math.pow(0.75, 3),
  // @ts-ignore bad types
  color: defaultColor1
  // clipIntersection: true
});
export const defaultLineMaterial_4 = new LineMaterial({
  worldUnits: true,
  linewidth: defaultBranchWidth * Math.pow(0.75, 4),
  // @ts-ignore bad types
  color: defaultColor1
  // clipIntersection: true
});

export const connectVectors = writable<boolean>(false);
export const pointerV3Event = new rxWritable(null);
export const pointerX = pointerV3Event.pipe(
  throttleTime(200),
  filter(evt => !!evt),
  map(evt => mapLinear(evt.detail.point['x'] / (window?.innerWidth || 800), 0, 1, -15, 15)),
  startWith(0),
)
export const allowRandomness = writable<boolean>(false);
// export const initialLength = writable<number>(defaultLength);
// export const branchRate = writable<number>(defaultBranchRate);
// export const branches = writable<Branch[]>([]);

// let killCycle = false;
// export function generateTree(
// 	lineStart: Vector3Tuple = defaultLineStart,
// 	length: number = defaultLength,
// 	angle: number = defaultAngle,
// 	axis: 'x' | 'y' | 'z' = defaultAxis,
// 	branchRate: number = defaultBranchRate,
// 	branchWidth: number = defaultBranchWidth,
// 	color1: string = defaultColor1
// ) {
// 	if (length < 1 || killCycle) {
// 		return;
// 	}
// 	let material = new LineMaterial({
// 		worldUnits: true,
// 		linewidth: branchWidth,
// 		// @ts-ignore bad types
// 		color: color1
// 		// clipIntersection: true
// 	});
// 	// @ts-ignore
// 	const lineEnd: Vector3Tuple = calculateNextPoint(lineStart, angle, axis, length);
// 	let points = [lineStart, lineEnd];
// 	let id = generateUUID();

// 	// Effect
// 	branches.update((current) => {
// 		if (current.length > 1500) killCycle = true;
// 		current.push({ id, points, material });
// 		return current;
// 	});

// 	// TODO: Branch rate bug
// 	generateTree(
// 		lineEnd,
// 		// length - (defaultLength * 0.1),
// 		length - defaultLength * 0.15,

// 		// angle
// 		angle - 25,
// 		// axis
// 		'z',
// 		// randInt(1, 4),
//     // 4,
// 		branchRate,
// 		branchWidth * 0.75,
// 		color1
// 	);

// 	if (branchRate > 1) {
// 		generateTree(
// 			lineEnd,
// 			// length - (defaultLength * 0.17),
// 			length - defaultLength * 0.15,

// 			// angle
// 			angle + 25,
// 			// axis
// 			'z',
// 			// randInt(1, 4),
//       // 4,
// 			branchRate,
// 			branchWidth * 0.75,
// 			color1
// 		);
// 	}

// 	if (branchRate > 2) {
// 		generateTree(
// 			lineEnd,
// 			length - defaultLength * 0.15,
// 			// angle
// 			angle + 25,
// 			// axis
// 			'x',
// 			// randInt(1, 4),
//       // 4,
// 			branchRate,
// 			branchWidth * 0.75,
// 			color1
// 		);
// 	}

// 	if (branchRate > 3) {
// 		generateTree(
// 			lineEnd,
// 			// length - (defaultLength * 0.13),
// 			length - defaultLength * 0.15,

// 			// angle
// 			angle - 25,
// 			// axis
// 			'x',
// 			// randInt(1, 4),
//       // 4,
// 			branchRate,
// 			branchWidth * 0.75,
// 			color1
// 		);
// 	}
// }
