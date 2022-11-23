<script lang="ts">
	import { useFrame } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import { useKeyboardControls } from 'svelte-kbc';
	import { MeshStandardMaterial, Quaternion, Vector3 } from 'three';
	import { tweened } from 'svelte/motion';
	import CannonViewRig from './CannonViewRig.svelte';
	import { cubicOut } from 'svelte/easing';
	import Ship from './Ship.svelte';
	import { gameStatus } from './state';
	import CameraRig from './CameraRig.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { randomVec3 } from '$lib';
	const { FIRE, UP, DOWN, LEFT, RIGHT, ROLL } = useKeyboardControls();
	const rbX: Writable<number> = writable(0);
	const rbY: Writable<number> = writable(0);
	const rbZ: Writable<number> = writable(0);
	let fire: any;
	const projectileMaterial = new MeshStandardMaterial({ color: 'green' });

	let rbRef: any;
	const defaultV3 = new Vector3(0, 0, 0);
	let shipRotZ = tweened(0, { duration: 750, easing: cubicOut });
	let shipRotX = tweened(0, { duration: 750, easing: cubicOut });
	let movePower = 1;

	function updateRBPosition(rbPosition: Vector3) {
		const { x, y, z } = rbPosition;
		rbX.set(Number(x.toFixed(2)));
		rbY.set(Number(y.toFixed(2)));
		rbZ.set(Number(z.toFixed(2)));
	}

	function levelOut() {
		$shipRotX = 0;
	}

	let v3 = new Vector3(0, 0, 0);
	function applyMovement() {
		const { x, y } = rbRef.translation();
		if ($UP && y < 40) {
			$shipRotX = Math.PI / 6;
			rbRef.applyImpulse(v3.set(0, movePower, 0), true);
		} else {
			levelOut();
		}

		if ($DOWN && y > -40) {
			$shipRotX = -Math.PI / 6;
			rbRef.applyImpulse(v3.set(0, -movePower, 0), true);
		} else {
			levelOut();
		}

		if ($LEFT && x > -100) {
			$shipRotZ = -Math.PI / 4;
			rbRef.applyImpulse(v3.set(-movePower, 0, 0), true);
		} else {
			$shipRotZ = 0;
		}

		if ($RIGHT && x < 100) {
			$shipRotZ = Math.PI / 4;
			rbRef.applyImpulse(v3.set(movePower, 0, 0), true);
		} else {
			$shipRotZ = 0;
		}
	}

	useFrame((_, delta) => {
		if ($gameStatus === 'PLAY') {
			applyMovement();
			if ($FIRE) {
				fire();
			}
		}
		updateRBPosition(rbRef.translation());
	});

	function handleShipContact() {
		$gameStatus = 'OVER';
	}

	$: if (rbRef && $gameStatus === 'READY') {
		rbRef.setAngvel(defaultV3);
		rbRef.setLinvel(defaultV3);
		rbRef.setTranslation(defaultV3, true);
		rbRef.setRotation(new Quaternion(0, 0, 0, 1), true);
		fire = null;
	}
</script>

<svelte:body on:touchstart={() => ($FIRE = true)} on:touchend={() => ($FIRE = false)} />

{#if $gameStatus === 'PLAY'}
	<CannonViewRig
		bind:fire
		{projectileMaterial}
		position={{ x: Math.round($rbX), y: Math.round($rbY), z: Math.round($rbZ) }}
		power={100}
		projectileScale={0.125}
		aimVector={{ x: 0, y: $shipRotX, z: -1 }}
		projectileDuration={2000}
	/>
{/if}
<RigidBody
	angularDamping={$gameStatus === 'OVER' ? 0 : 2.75}
	linearDamping={$gameStatus === 'OVER' ? 0 : 2.75}
	bind:rigidBody={rbRef}
	gravityScale={1}
	angularVelocity={$gameStatus === 'OVER' ? randomVec3() : defaultV3}
	position={defaultV3}
>
	<Collider
		shape="cuboid"
		args={[2, 0.75, 2]}
		mass={1}
		on:contact={handleShipContact}
		position={{ y: 0.75 }}
	/>
	<Ship rotZ={$shipRotZ} rotX={$shipRotX} />
</RigidBody>

<CameraRig x={$rbX} y={$rbY} z={$rbZ} />
