<script lang="ts">
	import {
Color,
		CylinderBufferGeometry,
		Material,
		MeshBasicMaterial,
		MeshStandardMaterial,
		SphereBufferGeometry
	} from 'three';
	import { Mesh, useThrelte, Group } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import { tweened } from 'svelte/motion';
	import { degToRad, generateUUID, mapLinear, radToDeg } from 'three/src/math/MathUtils';
	import { quintOut } from 'svelte/easing';
	import Projectile from './Projectile.svelte';
	import AxisHelper from '$lib/components/AxisHelper.svelte';

	export let power: number = 50;
	export let projectileMaterial: Material | undefined = undefined;
	export let delay: number = 0;
	export let fire: boolean = false;
	export let loading: boolean = false;
	const { pointer, renderer, camera } = useThrelte();
	const rotationZ = tweened(0, { duration: 500, easing: quintOut }); // left/right
	const rotationX = tweened(Math.PI / 2, { duration: 500, easing: quintOut }); // left/right
	let firingSolutions: any[] = [];
	export let orbitRotationYForProjectileXOffset = 0;
	function captureFiringSolution(x: number, y: number) {
		const config = {
			id: generateUUID(),
			xPower: Math.tan(y - orbitRotationYForProjectileXOffset) * power,
			yPower: Math.tan(x - Math.PI / 2) * power, // weird but bc of the cylinder rotation everything is weird
			zPower: -power,
			power
		};
		firingSolutions = [...firingSolutions, config];
	}
	//@ts-ignore
	$: rotationZ.set($pointer.x * degToRad(30 * $camera?.aspect)); // 1 = 45deg, -1 = -45deg
	/**
	 * "vertical" movement is weird here because the cannon is not center screen
	 * $pointer.y * degToRad(30) = smaller range of motion vertically (this might be weird on portrait screens)
	 * (Math.PI + Math.atan(100 / -2) = Offset rotation straight ahead + angle from 100m away, and 2m lower than camera
	 */
	$: rotationX.set($pointer.y * degToRad(30) + (Math.PI + Math.atan(100 / -2)));
	$: if (fire) {
		loading = true;
		if (delay) {
			setTimeout(() => {
				loading = false;
			}, delay);
		}
	}
	$: if (fire) {
		captureFiringSolution($rotationX, $rotationZ);
		fire = false;
	}
	$: console.log(firingSolutions[firingSolutions.length - 1]);
</script>

<Group position={{ y: 0, z: 100 }} rotation={{ y: 0 }}>
	<!-- <AxisHelper /> -->
	<Mesh
		geometry={new CylinderBufferGeometry(1, 0.25)}
		material={new MeshStandardMaterial({ color: new Color('#232323') })}
		rotation={{ x: $rotationX, z: $rotationZ }}
		scale={{ x: 0.5, y: 2, z: 0.5 }}
	>
		<!-- <AxisHelper /> -->
	</Mesh>
	{#each firingSolutions as solution (solution.id)}
		<Projectile {projectileMaterial} {...solution} />
	{/each}
</Group>
