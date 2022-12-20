<script lang="ts">
	import Projectile from './Projectile.svelte';
	import { T, TransformableObject, useFrame, } from '@threlte/core';
	import { useRapier } from '@threlte/rapier';
	import { onDestroy } from 'svelte';
	import { Vector3 } from 'three';
	import { generateUUID } from 'three/src/math/MathUtils';
	import { playerRBInteger } from './state';

	export let position: [number, number, number] = [0, 0, 0];
	export let rateOfFire: number = 500;
	export let range: number = 50;
	export let power: number = 50;
	const { world } = useRapier();
	const projectileDuration: number = 5000;
	const turretV3 = new Vector3();
	let turretRef: any;
	let firingSolutions: any[] = [];
	let intervalID: any = null;
	let playerV3: Vector3 = new Vector3(0, 0, 0);
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

	function seekAndDestroyPlayer(pv3: Vector3) {
		if (typeof $playerRBInteger !== 'number' || !turretRef) return;
		const impulseVector: Vector3 = new Vector3();
		// const playerV3 = getPlayerV3();
		const distance = turretRef.getWorldPosition(turretV3).distanceTo(pv3);
		if (distance < range) {
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
		playerV3 = getPlayerV3();
		seekAndDestroyPlayer(playerV3);
	});

	onDestroy(() => {
		if (intervalID) clearInterval(intervalID);
	});
</script>

<T.Group {position}>
	<T.Mesh bind:ref={turretRef} let:ref={turret}>
		<T.SphereGeometry args={[2]}/>
		<T.MeshStandardMaterial color="red" />
		<TransformableObject object={turret}  lookAt={playerV3}/>
		<T.Mesh position.z={3} position.x={0}>
			<T.BoxGeometry args={[1, 1, 2]} />
			<T.MeshStandardMaterial color="black" />
			<T.Group position={[0, 0, 1]}>
				{#each firingSolutions as solution (solution.id)}
					{#if Date.now() - solution.created < projectileDuration}
						<Projectile {...solution} />
					{/if}
				{/each}
			</T.Group>		
		</T.Mesh>
	</T.Mesh>
	<!-- <T.Group position={orientationOffset[orientation]}>
		{#each firingSolutions as solution (solution.id)}
			{#if Date.now() - solution.created < projectileDuration}
				<Projectile {...solution} />
			{/if}
		{/each}
	</T.Group> -->
</T.Group>
