<script lang="ts">
	import { useFrame, Group, useThrelteRoot } from '@threlte/core';
	import { useKeyboardControls } from 'svelte-kbc';
	import { MeshStandardMaterial, Vector3 } from 'three';
	import { tweened } from 'svelte/motion';
	import CannonViewRig from './CannonViewRig.svelte';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { degToRad } from 'three/src/math/MathUtils';
	import Ship from './Ship.svelte';
	import { settings } from './state';
	const { FIRE, UP, DOWN, LEFT, RIGHT, ROLL } = useKeyboardControls();

	let fire: any;
	const projectileMaterial = new MeshStandardMaterial({ color: 'red' });

	let posX = tweened(0, { duration: 750, easing: cubicOut });
	let posY = tweened(0, { duration: 750, easing: cubicOut });

	let shipRotZ = tweened(0, { duration: 750, easing: cubicOut });
	let shipRotX = tweened(0, { duration: 750, easing: cubicOut });
	let lockZ = false;
	let moveDistance = 5;

	function levelOut() {
		$shipRotX = 0;
	}

	useFrame(() => {
		if ($FIRE) fire();
	});
	// $: if ($FIRE) fire();
	$: if ($UP && $posY < 40) {
		$shipRotX = Math.PI / 6;
		$posY += moveDistance;
	} else {
		levelOut();
	}
	$: if ($DOWN && $posY > -40) {
		$shipRotX = -Math.PI / 6;
		$posY -= moveDistance;
	} else {
		levelOut();
	}
	$: if ($LEFT && $posX > -100) {
		$shipRotZ = -Math.PI / 4;
		$posX -= moveDistance;
	} else {
		$shipRotZ = 0;
	}
	$: if ($RIGHT && $posX < 100) {
		$shipRotZ = Math.PI / 4;
		$posX += moveDistance;
	} else {
		$shipRotZ = 0;
	}

	// Buggy barrel roll O__O
	$: if ($ROLL && !lockZ && !($RIGHT || $LEFT)) {
		lockZ = true;
		shipRotZ.set($shipRotZ + 2 * Math.PI).then(() => (lockZ = false));
	}
</script>

<CannonViewRig
	bind:fire
	showCannon={false}
	{projectileMaterial}
	position={{ x: $posX, y: $posY, z: 0 }}
	aimOffset={100}
	power={100}
	fireOnClick={true}
	projectileScale={0.125}
	aimVector={{ x: 0, y: $shipRotX, z: -1 }}
	projectileDuration={2000}
>
	<Ship rotZ={$shipRotZ} rotX={$shipRotX} />
</CannonViewRig>
