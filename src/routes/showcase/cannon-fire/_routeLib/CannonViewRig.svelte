<script lang="ts">
	import { PerspectiveCamera, Group, useFrame, type Position, useThrelteRoot } from '@threlte/core';
	import Cannon from './Cannon.svelte';
	import { generateUUID } from 'three/src/math/MathUtils';
	import Projectile from './Projectile.svelte';
	import type { Material } from 'three';

	export let showCannon: boolean = true;
	export let fire = false;
	export let power: number = 50;
	export let rotate: boolean = false;
	export let rotateSpeed: number = 0.1;
	export let position: Position = { z: 100 };
	export let projectileMaterial: Material | undefined = undefined;

	const { raycaster } = useThrelteRoot();

	let orbitY = 0;
	let firingSolutions: any[] = [];
	function captureFiringSolution() {
		const { x, y, z } = raycaster.ray.direction;
		const config = {
			id: generateUUID(),
			xPower: x * power,
			// yPower: y * power,
			/**
			 * Adjusted for slightly more accurate aiming. The cannonball velocity is based on raycaster direction,
			 * which originates at the camera. The cannonball starts located 2 units below the camera, so we apply
			 * this slight offset so aiming feels more accurate.
			 */
			yPower: (y + (Math.PI / 2 + Math.atan(100 / -2))) * power,
			zPower: z * power,
			created: Date.now()
		};
		firingSolutions = [...firingSolutions, config];
	}

	useFrame((_, delta) => {
		if (rotate) orbitY += rotateSpeed * delta;
	});

	$: if (fire) {
		fire = false;
		captureFiringSolution();
	}
</script>

<Group rotation={{ y: orbitY }}>
	<PerspectiveCamera fov={60} {position} />
	<Group
		position={{
			x: position.x,
			y: position.y ? position.y - 2 : -2,
			z: position.z ? position.z - 3 : -3
		}}
	>
		{#if showCannon}
			<Cannon />
		{/if}

		{#each firingSolutions as solution (solution.id)}
			{#if Date.now() - solution.created < 10000}
				<Projectile {projectileMaterial} {...solution} />
			{/if}
		{/each}
	</Group>
</Group>
