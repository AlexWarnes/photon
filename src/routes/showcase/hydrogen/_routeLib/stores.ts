import { randInt, randFloat, generateUUID } from 'three/src/math/MathUtils';
import { randomVec3 } from "$lib/utils/vectors";
import { writable } from "svelte/store";
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
const count = 20;
const _atoms = Array(count).fill('x').map(_ => generateAtom());

export const atoms = writable(_atoms);

export function removeAtomByID(id: string){
  atoms.update(current => {
    return current.filter(a => a.id !== id);
  })
}
