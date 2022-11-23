import type { Position } from '@threlte/core';
import { writable, derived, get } from 'svelte/store';
import { Vector3 } from 'three';
import { generateUUID, randInt } from 'three/src/math/MathUtils';
export interface Asteroid {
	position: Position;
	scale: number;
	id: string;
	maxHealth: number;
	isFragment: boolean;
	floatTo: Position;
	orthoTrigger: boolean;
}
export type GameStatus = 'READY' | 'PLAY' | 'OVER' | 'WIN';
export type Difficulty = 'EARTHER' | 'MARTIAN' | 'BELTER';
const defaultSettings = {
	invertedY: false, // todo
};

export const difficulty = writable<Difficulty>("MARTIAN");
export const asteroidsByDifficulty = {
	"EARTHER": 25,
	"MARTIAN": 50,
	"BELTER": 100,
}

export const asteroids = writable<Asteroid[]>()
export const settings = writable(defaultSettings);
export const points = writable(0);
export const shots = writable(0);
export const hits = writable(0);
export const gameStatus = writable('READY');
export const orthoMode = writable(false);
// export const showGlitch = writable(false);
export const displayPoints = derived(points, ($p) => {
	return $p.toFixed(0).padStart(4, '0');
});
export const speed = derived(points, ($p) => {
	const initialSpeed = 0.1;
	const increment = 0.05;
	// every 100 points adds 0.05 speed
	return Math.floor($p / 100) * increment + initialSpeed;
});
export const stats = derived([shots, hits], ([$shots, $hits]) => {
	return {
		accuracy: isNaN(($hits / $shots) * 100) ? '0' : (($hits / $shots) * 100).toFixed(0),
		shots: $shots,
		hits: $hits
	};
});

export function reset() {
	points.set(0);
	shots.set(0);
	hits.set(0);
	orthoMode.set(false);
	settings.set(defaultSettings)
	initAsteroids(get(difficulty));
	gameStatus.set('READY');
}
// const distanceFromCenter = 400;
function randAngle() {
	return Math.random() * (2 * Math.PI);
}
function generateAsteroid(asteroidConfig: Partial<Asteroid> = {}): Asteroid {
	const angle = randAngle();
	const defaultScale = 8;
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
		orthoTrigger: false,
		// maxHealth: asteroidConfig.scale ? asteroidConfig.scale * 2 : defaultScale * 2,
		isFragment: false,
		floatTo: new Vector3(),
		// add config vals
		...asteroidConfig
	};
}
export function initAsteroids(d: Difficulty) {
	const count = asteroidsByDifficulty[d];
	const ast: Asteroid[] = Array(count)
		.fill('x')
		.map(() => generateAsteroid({ scale: randInt(6, 12) }));
		asteroids.set(ast);
}

export function splitAsteroid(id: string, origin: Position) {
	asteroids.update((current) => {
		const parent = current.find((a) => a.id === id);
		if (parent?.scale! >= 3) {
			for (let i = 0; i < 2; i++) {
				const { newPosition, floatToPosition } = getFragmentPosition(origin, parent!.scale, i);
				let frag = generateAsteroid({
					id: generateUUID(),
					position: newPosition,
					scale: parent!.scale! / 2,
					isFragment: true,
					floatTo: floatToPosition
				});
				current.push(frag);
			}
		}

		return current.filter((a) => a.id !== id);
	});
}

export function destroyAsteroid(id: string) {
	asteroids.update((current) => current.filter((a) => a.id !== id));
}

function getFragmentPosition(initialP: Position, parentScale: number, index: number): any {
	const offset = (parentScale / 2) * (index % 2 ? 1 : -1);
	const initialPV3 = new Vector3(initialP!.x! + offset, initialP!.y!, initialP!.z!);
	const floatToPosition = initialPV3.clone();
	floatToPosition.addScalar(offset);

	return {
		newPosition: initialPV3,
		floatToPosition
	};
}
