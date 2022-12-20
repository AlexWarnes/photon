<script lang="ts">
	import FollowCam from '$lib/components/FollowCam.svelte';
	import type { RigidBody as RB, Vector } from '@dimforge/rapier3d-compat';
	import { T, useFrame } from '@threlte/core';
	import { RigidBody, Collider, CollisionGroups } from '@threlte/rapier';
	import { useKeyboardControls } from 'svelte-kbc';
	import { writable, type Writable } from 'svelte/store';
	import { Vector3 } from 'three';
	// import Effects from './Effects.svelte';
	import { fuel, pctFuel, gameStatus, playerRBInteger } from './state';
	import SmokeParticle from './SmokeParticle.svelte';
	import { tweened } from 'svelte/motion';

	let rbRef: RB;
	const { UP, LEFT, RIGHT } = useKeyboardControls();
	const rbX: Writable<number> = writable(0);
	const rbY: Writable<number> = writable(0);
	const rbZ: Writable<number> = writable(0);
	const thrustRotation = tweened(0, { duration: 400 })

	const defaultV3 = new Vector3(0, 0, 0);

	function updateRBPosition(rbPosition: Vector) {
		const { x, y, z } = rbPosition;
		rbX.set(Number(x.toFixed(1)));
		rbY.set(Number(y.toFixed(1)));
		rbZ.set(Number(z.toFixed(1)));
	}

	function handleMovement(direction: string) {
		if ($pctFuel <= 0) return; // OUT OF FUEL

		let v3 = new Vector3();
		switch (direction) {
			case 'UP':
				rbRef.applyImpulse(v3.set(0, 0.815, 0), true);
				$fuel -= 1;

				break;
			case 'LEFT':
				rbRef.applyImpulse(v3.set(-0.5, 0, 0), true);
				$fuel -= 0.5;
				break;
			case 'RIGHT':
				rbRef.applyImpulse(v3.set(0.5, 0, 0), true);
				$fuel -= 0.5;
				break;
			default:
				return;
		}
	}

	useFrame(() => {
		if (rbRef) {
			// only handle movement if playing
			if ($gameStatus === 'PLAY') {
				if ($UP) {
					handleMovement('UP');
				}
				if ($LEFT) {
					handleMovement('LEFT');
				}
				if ($RIGHT) {
					handleMovement('RIGHT');
				}
			}
			updateRBPosition(rbRef.translation());
		}
	});

	$: if (rbRef) playerRBInteger.set(rbRef.handle);
	$: if (rbRef && $gameStatus === 'READY') {
		rbRef.setLinvel(defaultV3, true);
		rbRef.setTranslation(new Vector3(0, 1.5, 0), true);
	}
	$: underThrust = $UP || $LEFT || $RIGHT;
	$: thrustRotation.set($LEFT ? Math.PI / 8 : $RIGHT ? -Math.PI / 8 : 0)
</script>

<CollisionGroups memberships={[0, 1]} filter={[0, 9]}>
	<RigidBody
		position={{ y: 1.5 }}
		bind:rigidBody={rbRef}
		angularDamping={1}
		linearDamping={0.25}
		gravityScale={2}
		enabledRotations={[false, false, false]}
		enabledTranslations={[true, true, false]}
	>
		<Collider shape="cone" args={[1.5, 1]} mass={1} restitution={0.2} />
		<T.Mesh rotation.z={$thrustRotation}>
			<T.ConeGeometry args={[1, 3]} />
			<T.MeshStandardMaterial color="green" />
			{#if underThrust}
				<!-- TODO: test if rotation on mesh is to weird since collider doesn't rotate with it -->
				<T.Group rotation.z={0}>
					<SmokeParticle position={[-0.3, -2, 0]} r={0.5} speed={5} randomSeed={1} />
					<SmokeParticle position={[0.3, -2, 0]} r={0.5} speed={5} randomSeed={2} />
					<SmokeParticle position={[-0.15, -2.5, 0]} r={0.35} speed={5} randomSeed={3} />
					<SmokeParticle position={[0.15, -2.5, 0]} r={0.35} speed={5} randomSeed={4} />
					<SmokeParticle position={[0, -3, 0]} r={0.2} speed={5} randomSeed={5} />
				</T.Group>
			{/if}
		</T.Mesh>
	</RigidBody>
</CollisionGroups>
<!-- First-ish person -->
<!-- <FollowCam x={$rbX} y={$rbY} z={$rbZ} offset={{ x: 0, y: -10, z: 5 }} fov={55}/> -->

<!-- Side View -->
<FollowCam x={$rbX} y={$rbY} z={$rbZ} offset={{ x: 0, y: 12, z: 50 }} fov={55} />

<!-- <Effects /> -->

<!-- <TimerText positionY={$rbY} positionX={$rbX} /> -->
