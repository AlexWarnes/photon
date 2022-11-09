<script lang="ts">
	import { PerspectiveCamera, Group, useFrame, type Position, useThrelteRoot, useThrelte, type Rotation, type Scale, } from '@threlte/core';
	import Cannon from './Cannon.svelte';
	import { degToRad, generateUUID } from 'three/src/math/MathUtils';
	import Projectile from './Projectile.svelte';
	import type { Material } from 'three';
	import { onDestroy, onMount } from 'svelte';

	export let showCannon: boolean = true;
	export function fire() {
		captureFiringSolution()
	};
	export let power: number = 50;
	export let position: Position = { x: 0, y: 0, z: 0 };
	export let rotation: Rotation = { x: 0, y: 0, z: 0 };
	export let aimOffset: number = 100;
	export let projectileMaterial: Material | undefined = undefined;
	export let projectileDuration: number = 10000;
	export let fireOnClick: boolean = true;
	export let castShadow: boolean = true;
	export let projectileScale: Scale = 0.5;
	// TODO: export let pointerLock: boolean = false;

	const { raycaster } = useThrelteRoot();
	const { renderer, pointer } = useThrelte();
	
	let firingSolutions: any[] = [];
	function captureFiringSolution() {
		const { x, y, z } = raycaster.ray.direction;
		console.log("debug:", {x, y, z, $pointer})
		const config = {
			id: generateUUID(),
			xPower: x * power,
			// yPower: y * power,
			/**
			 * Adjusted for slightly more accurate aiming. The cannonball velocity is based on raycaster direction,
			 * which originates at the camera. The cannonball starts located 2 units below the camera, so we apply
			 * this slight offset so aiming feels more accurate.
			 */
			yPower: (y + (Math.PI / 2 + Math.atan(aimOffset / -2))) * power,
			zPower: z * power,
			created: Date.now()
		};
		// console.log("debug fire config:", config)
		firingSolutions = [...firingSolutions, config];
	}

	$: if (fireOnClick) {
		renderer?.domElement.addEventListener('click', fire)
	} else {
		renderer?.domElement.removeEventListener('click', fire)
	}

</script>

<Group {position} {rotation}>
	<PerspectiveCamera fov={60} />
	<Group
		position={{
			x: 0,
			y: -2,
			z: -3
		}}
	>
		{#if showCannon}
			<Cannon {aimOffset} />
		{/if}

		{#each firingSolutions as solution (solution.id)}
			{#if Date.now() - solution.created < projectileDuration}
				<Projectile {projectileMaterial} {...solution} {castShadow} {projectileScale}/>
			{/if}
		{/each}

		<slot />
	</Group>
</Group>
