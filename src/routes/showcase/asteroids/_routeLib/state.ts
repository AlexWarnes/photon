import type { Position } from '@threlte/core';
import { writable, derived } from 'svelte/store';
import { Vector3 } from 'three';
import { generateUUID, randInt } from 'three/src/math/MathUtils';
export interface Asteroid {
	position: Position;
	scale: number;
	id: string;
	maxHealth: number;
	linVel: Position;
  isFragment: boolean;
  floatTo: Position;
}
export type GameStatus = "READY" | "PLAY" | "OVER" | "WIN"
const defaultSettings = {
	invertedY: false, // todo
	// speed: 0.1
};
export const settings = writable(defaultSettings);
export const points = writable(0);
export const shots = writable(0);
export const hits = writable(0);
export const gameStatus = writable("READY")
export const displayPoints = derived(points, ($p) => {
	return String($p).padStart(6, '0');
});
export const speed = derived(points, ($p) => {
  const initialSpeed = 0.1;
  const increment = 0.05;
  // every 100 points adds 0.05 speed
  return Math.floor($p / 100) * increment + initialSpeed;
})
export const stats = derived([shots, hits], ([$shots, $hits]) => {
  return {
    accuracy: isNaN($hits / $shots * 100) ? "0.00" : ($hits / $shots * 100).toFixed(1),
    shots: $shots,
    hits: $hits
  }
})

// const distanceFromCenter = 400;
const randAngle = () => Math.random() * (2 * Math.PI);
function generateAsteroid(asteroidConfig: Partial<Asteroid> = {}): Asteroid {
	const angle = randAngle();
	const defaultScale = 4;
  const distanceFromCenter = randInt(365, 435);

	return {
		id: generateUUID(),
		position: {
			x: randInt(-75, 75),
			y: Math.sin(angle) * distanceFromCenter,
			z: Math.cos(angle) * distanceFromCenter
		},
		scale: asteroidConfig.scale ? asteroidConfig.scale * 2 : defaultScale,
		maxHealth: 1,
		// maxHealth: asteroidConfig.scale ? asteroidConfig.scale * 2 : defaultScale * 2,
		linVel: { x: 0, y: 0, z: 0 },
    isFragment: false,
    floatTo: new Vector3(),
		// add config vals
		...asteroidConfig
	};
}
const initialAsteroids = Array(50)
	.fill('x')
	.map(() => generateAsteroid({ scale: randInt(2, 8) }));
export const asteroids = writable(initialAsteroids);

export function splitAsteroid(id: string, origin: Position) {
	asteroids.update((current) => {
		const parent = current.find((a) => a.id === id);
		if (parent?.scale! >= 3) {
      for (let i = 0; i < 2; i++){
        const {newPosition, floatToPosition} = getFragmentPosition(origin, parent!.scale, i)
        let frag = generateAsteroid({
          id: generateUUID(),
          position: newPosition,
          scale: parent!.scale! / 2,
          isFragment: true,
          floatTo: floatToPosition,
        });
        current.push(frag)
      }
		}

		return current.filter((a) => a.id !== id);
	});
}

export function destroyAsteroid(id: string) {
	asteroids.update((current) => current.filter((a) => a.id !== id));
}

function getFragmentPosition(initialP: Position, parentScale: number, index: number): any {
  const offset = (parentScale / 2) * (index % 2 ? 1 : -1)
  const initialPV3 = new Vector3(initialP!.x! + offset, initialP!.y!, initialP!.z!);
	const floatToPosition = initialPV3.clone();
	floatToPosition.addScalar(offset)
	// floatToPosition.addScalar(randInt(-parentScale * (10 - parentScale), parentScale * (10 - parentScale)));

	return {
    newPosition: initialPV3,
    floatToPosition,
  };
}
