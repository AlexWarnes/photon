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
	import { onMount } from 'svelte';
	const { FIRE, UP, DOWN, LEFT, RIGHT, ROLL } = useKeyboardControls();

	let fire: any;
	const projectileMaterial = new MeshStandardMaterial({ color: 'green' });

	let rbRef: any;
	const defaultPlayerPosition = new Vector3(0,0,0)
	let shipRotZ = tweened(0, { duration: 750, easing: cubicOut });
	let shipRotX = tweened(0, { duration: 750, easing: cubicOut });
	// let lockZ = false;
	let movePower = 2;

	let camV3: Vector3;
	function updateCamera(rbPosition: Vector3) {
		camV3 = rbPosition;
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
		if($gameStatus === "PLAY"){
			applyMovement();
			if ($FIRE) fire();
		}
		updateCamera(rbRef.translation());
	});

	function handleShipContact(){
		// TODO
		$gameStatus = "OVER";
		// angularVelocity?
	}

	$: if (rbRef && $gameStatus === "READY") {
		rbRef.setTranslation(defaultPlayerPosition, true);
		rbRef.setRotation(new Quaternion(0,0,0,1), true)
	}
	// TODO: angularVelocity barrel roll O__O
	// $: if ($ROLL && !lockZ && !($RIGHT || $LEFT)) {
	// 	lockZ = true;
	// 	shipRotZ.set($shipRotZ + 2 * Math.PI).then(() => (lockZ = false));
	// }

	// TODO: stop linear/angular velocity on rbRef reset
	// TODO: distinctUntilChanged camV3 axis values for camera and CVR
	// TODO: fix CVR position lag on projectiles when moving L/R
	// TODO: angularVelocity on ship contact
	// TODO: scale in asteroids
	// TODO: postprocessing
	// TODO: Easy Medium Hard for asteroid count & speed?
	// TODO: HULL vs 3P view?
	$: console.log(camV3?.x)
</script>

{#if $gameStatus === "PLAY"}
<CannonViewRig
	bind:fire
	showCannon={false}
	{projectileMaterial}
	position={camV3 || defaultPlayerPosition}
	aimOffset={100}
	power={100}
	fireOnClick={true}
	projectileScale={0.125}
	aimVector={{ x: 0, y: $shipRotX, z: -1 }}
	projectileDuration={2000}
/>
{/if}
<RigidBody
	angularDamping={0.75}
	linearDamping={0.75}
	bind:rigidBody={rbRef}
	gravityScale={0.1}
	position={defaultPlayerPosition}
>
	<Collider shape="cuboid" args={[2,1,2]} mass={1} on:contact={handleShipContact} />
	<Ship rotZ={$shipRotZ} rotX={$shipRotX} />
</RigidBody>

<CameraRig x={!!camV3 ? camV3.x : NaN} y={!!camV3 ? camV3.y : NaN} z={!!camV3 ? camV3.z : NaN} />
