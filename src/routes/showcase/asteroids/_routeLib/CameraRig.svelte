<script lang="ts">
	import { PerspectiveCamera } from '@threlte/core';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { gameStatus } from './state';

	const initialCameraPosition = {
		x: 0,
		y: 10,
		z: 15
	};

	export let x: number;
	export let y: number;
	export let z: number;

	// const x = selectRigidBodyPos('x');
	// const y = selectRigidBodyPos('y');
	// const z = selectRigidBodyPos('z');

	const camX = tweened(x, { duration: 300, easing: cubicOut });
	const camY = tweened(y, { duration: 300, easing: cubicOut });
	const camZ = tweened(z, { duration: 1000, easing: cubicOut });

	let positionOffset = {
		x: 0,
		y: 2.5,
		z: 4
	};

	$: if (isNaN(x)) {
		camX.set(initialCameraPosition.x, { duration: 4000 });
	} else {
		camX.set(x);
	}
	$: if (isNaN(y)) {
		camY.set(initialCameraPosition.y, { duration: 4000 });
	} else {
		camY.set(y + positionOffset.y);
	}
	$: if (isNaN(z)) {
		camZ.set(initialCameraPosition.z, { duration: 4000 });
	} else {
		camZ.set(z + positionOffset.z);
	}

	$: if ($gameStatus === 'PLAY') {
		positionOffset = {
			x: 0,
			y: 2.5,
			z: 4
		};
	} else if ($gameStatus === 'OVER') {
    positionOffset = {
    x: 0,
    y: 2.5,
    z: 30
  }
  }
</script>

<PerspectiveCamera
	position={{ x: $camX, y: $camY, z: $camZ }}
	lookAt={{ x: $camX, y: $camY - 2, z: $camZ - 10 }}
	fov={60}
/>
