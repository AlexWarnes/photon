<script lang="ts">
	import { OrthographicCamera, PerspectiveCamera } from '@threlte/core';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { gameStatus, orthoMode } from './state';

	const initialCameraPosition = {
		x: 0,
		y: 10,
		z: 15
	};

	export let x: number;
	export let y: number;
	export let z: number;

	const camX = tweened(x, { duration: 300, easing: cubicOut });
	const camY = tweened(y, { duration: 300, easing: cubicOut });
	const camZ = tweened(z, { duration: 1000, easing: cubicOut });

	let positionOffset = {
		x: 0,
		y: 4.5,
		z: 8
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
			y: 4.5,
			z: 8
		};
	} else if ($gameStatus === 'OVER') {
		positionOffset = {
			x: 0,
			y: 2.5,
			z: 30
		};
	}
</script>

{#if $orthoMode}
	<OrthographicCamera
		near={0.1}
		left={-30}
		right={30}
		top={30}
		bottom={-30}
		position={{ x: 15, y: 25, z: 30 }}
		lookAt={{ x: $camX, y: $camY, z: -50 }}
	/>
{:else}
	<PerspectiveCamera
		position={{ x: $camX, y: $camY, z: $camZ }}
		lookAt={{ x: $camX, y: $camY - 2, z: $camZ - 10 }}
		fov={60}
	/>
{/if}
