import { rxWritable } from "svelte-fuse-rx";
import { map } from "rxjs";
import { randInt, randFloat, generateUUID } from 'three/src/math/MathUtils';
import { randomVec3 } from "$lib/utils/vectors";
export type HydrogenIsotope = "PROTIUM" | "DEUTERIUM" | "TRITIUM";
export const isotopes: HydrogenIsotope[] = ["PROTIUM", "DEUTERIUM", "TRITIUM"] // 
export const getRandomIsotope = () => isotopes[randInt(0,2)];

export function generateAtom(){
	return {
		id: generateUUID(),
		isotope: getRandomIsotope(),
		rotation: randFloat(0, 2 * Math.PI),
		position: randomVec3({xMin: -1, xMax: 1, yMin: -1, yMax: 1, zMin: -20, zMax: 18}),
	}
}
export const count = new rxWritable(20);
export const atoms = count.pipe(
	map(num => Array(num).fill('x').map(_ => generateAtom()))
)
