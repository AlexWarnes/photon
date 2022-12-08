<script lang="ts">
	import Projectile from './Projectile.svelte';
	import { T, useFrame } from '@threlte/core';
	import { useRapier } from '@threlte/rapier';
	import { onDestroy } from 'svelte';
	import { Vector3 } from 'three';
	import { generateUUID } from 'three/src/math/MathUtils';
	import { playerRBInteger } from './state';

	export let orientation: string = 'TOP';
	const { world } = useRapier();
	const range = 50;
	const power = 50;
  const rateOfFire = 500;
	const projectileDuration: number = 5000;
	const turretV3 = new Vector3();
	let turretRef: any;
	let firingSolutions: any[] = [];
	let intervalID: any = null;
	function withinOrientationRange(o: string, p: Vector3, t: Vector3) {
		switch (o) {
			case 'TOP':
				return p.y >= t.y;
			case 'BOTTOM':
				return p.y <= t.y;
			default:
				console.warn('Unknown Turret Orientation:', o);
		}
	}
	interface OrientationOffset {
		[key: string]: [number, number, number];
	}
	const orientationOffset: OrientationOffset = {
		TOP: [0, 1, 0],
		BOTTOM: [0, -1, 0]
	};
	function fire(v: Vector3) {
		const config = {
			id: generateUUID(),
			xPower: v.x,
			yPower: v.y,
			zPower: v.z,
			created: Date.now()
		};

		firingSolutions.push(config);
		firingSolutions = firingSolutions;
	}

	const getPlayerV3 = (): Vector3 => {
		if (typeof $playerRBInteger !== 'number') return new Vector3(0, 0, 0);
		const player = world.getRigidBody($playerRBInteger);
		const { x, y, z } = player.translation();

		return new Vector3(x, y, z);
	};

	function seekAndDestroyPlayer() {
		if (typeof $playerRBInteger !== 'number' || !turretRef) return;
		const impulseVector: Vector3 = new Vector3();
		const playerV3 = getPlayerV3();
		const distance = turretRef.getWorldPosition(turretV3).distanceTo(playerV3);
		if (distance < range && withinOrientationRange(orientation, playerV3, turretV3)) {
			if (!intervalID) {
				intervalID = setInterval(() => {
					impulseVector.subVectors(getPlayerV3(), turretV3).normalize().multiplyScalar(power);
					fire(impulseVector);
				}, rateOfFire);
			}
		} else {
			if (intervalID) {
				clearInterval(intervalID);
				intervalID = null;
			}
		}
	}

	useFrame(() => {
		seekAndDestroyPlayer();
	});

	onDestroy(() => {
		if (intervalID) clearInterval(intervalID);
	});
</script>

<T.Mesh bind:ref={turretRef} scale={3}>
	<T.BoxGeometry />
	<T.MeshBasicMaterial color="red" />
</T.Mesh>
<T.Group position={orientationOffset[orientation]}>
	{#each firingSolutions as solution (solution.id)}
		{#if Date.now() - solution.created < projectileDuration}
			<Projectile {...solution} />
		{/if}
	{/each}
</T.Group>
