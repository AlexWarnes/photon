<script lang="ts">
	import {
		Group,
		type Position,
		useThrelteRoot,
		useThrelte,
		type Rotation,
		type Scale
	} from '@threlte/core';
	import { generateUUID, mapLinear } from 'three/src/math/MathUtils';
	import Projectile from './Projectile.svelte';
	import type { Material } from 'three';
	import { shots } from './state';
	import { onDestroy } from 'svelte';

	export function fire() {
		$shots += 1;
		captureFiringSolution();
	}
	export let power: number = 50;
	export let position: Position = { x: 0, y: 0, z: 0 };
	export let rotation: Rotation = { x: 0, y: 0, z: 0 };
	// export let aimOffset: number = 100;
	export let projectileMaterial: Material | undefined = undefined;
	export let projectileDuration: number = 10000;
	export let castShadow: boolean = true;
	export let projectileScale: Scale = 0.5;
	// TODO: export let pointerLock: boolean = false;
	export let aimVector: { x: number; y: number; z: number } = { x: 0, y: Math.PI / 4, z: -1 };

	const { renderer, } = useThrelte();

	let firingSolutions: any[] = [];

	// Adjust up/down aim based on rotation
	const mapRotationToVector = (val: number): number => {
		return mapLinear(val, -Math.PI / 4, Math.PI / 4, -0.5, 0.5);
	};
	function captureFiringSolution() {
		const { x, y, z } = aimVector;
		// const { x, y, z } = raycaster.ray.direction;
		const config = {
			id: generateUUID(),
			xPower: x * power,
			yPower: mapRotationToVector(y) * power,
			zPower: z * power,
			created: Date.now()
		};

		firingSolutions = [...firingSolutions, config];
	}

</script>

<Group {position} {rotation}>
	<!-- NOTE: would be useful to designate fireOriginPosition and slotPosition so 
	the rigid body projectiles don't collide with a potentially rigid body source in slot -->

	<!-- Projectile Origin Position -->
	<Group
		position={{
			x: 0,
			y: -2,
			z: -10
		}}
	>
		{#each firingSolutions as solution (solution.id)}
			{#if Date.now() - solution.created < projectileDuration}
				<Projectile {projectileMaterial} {...solution} {castShadow} {projectileScale} />
			{/if}
		{/each}
	</Group>
</Group>
