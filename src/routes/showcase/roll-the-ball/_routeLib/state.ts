import { Vector3 } from 'three';
import { writable, derived } from 'svelte/store';
import { BehaviorSubject, distinctUntilKeyChanged, filter, map } from 'rxjs';

export type Axis = 'x' | 'y' | 'z';
export type InputAction = 'FORWARD' | 'RIGHT' | 'BACKWARD' | 'LEFT' | 'JUMP';
export const trackWidth = 26;
export const trackHeight = 10;
export const trackLength = 400;
export const initialPlayerPosition = new Vector3(0, 5, -5);
export const shiftyWalls = Array(Math.floor(trackLength / 100))
	.fill('x')
	.map((_, i) => {
		return {
			position: {
				x: i % 2 ? -(trackWidth / 2 - 4) : trackWidth / 2 - 4,
				y: (trackHeight - 2) / 2,
				z: (trackLength / (trackLength / 100 + 1)) * (i + 1) * -1
			}
		};
	});
export const shiftyBars = Array(Math.floor(trackLength / 100))
	.fill('x')
	.map((_, i) => {
		const type = i % 2 ? 'VERT' : 'SPIN';
		return {
			type,
			position: {
				x: 0,
				y: type === 'VERT' ? trackHeight - 2 : 2,
				z: (trackLength / (trackLength / 100 + 1)) * (i + 1) * -1 + 40
			}
		};
	});

export const status = writable('IDLE'); // IDLE | PLAYING | DONE
export const time = writable('0.00');
export const movement = writable({
	FORWARD: false,
	RIGHT: false,
	BACKWARD: false,
	LEFT: false,
	JUMP: false
});

// Not sure how to write a distinctUntilKeyChanged inside a svelte derived store
export const rbp = new BehaviorSubject(initialPlayerPosition);
export const selectRigidBodyPos = (axis: Axis) => {
	return rbp.asObservable().pipe(
		filter((rbp) => !!rbp),
		distinctUntilKeyChanged(axis),
		map((rbp) => rbp[axis])
	);
};

function updateMovement(action: InputAction, status: boolean) {
	movement.update((current) => {
		current[action] = status;
		return current;
	});
}

/*
1. Inside Player.svelte, keydown/up events fire this handleKeys() fn
2. This switch maps the key to the movement store movement 
3. Player.svelte uses processMovement() every frame to apply an impulse
   for whatever value from the movement store is true
	 
This way if movement["LEFT"] is true,
an impulse in that direction will be applied 
every frame until it is false, instead of just 
applying once per press
*/
export function handleKeys(evt: KeyboardEvent, status: boolean) {
	switch (evt.code) {
		case 'Space':
			updateMovement('JUMP', status);
			break;
		case 'ArrowRight':
		case 'd':
			updateMovement('RIGHT', status);
			break;
		case 'ArrowLeft':
		case 'a':
			updateMovement('LEFT', status);
			break;
		case 'ArrowUp':
		case 'w':
			updateMovement('FORWARD', status);
			break;
		case 'ArrowDown':
		case 's':
			updateMovement('BACKWARD', status);
			break;
	}
}
