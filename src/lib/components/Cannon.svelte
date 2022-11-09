<script lang="ts">
	import { Color, CylinderBufferGeometry, MeshStandardMaterial } from 'three';
	import { Mesh, useThrelte, type Position } from '@threlte/core';
	import { tweened } from 'svelte/motion';
	import { degToRad } from 'three/src/math/MathUtils';
	import { quintOut } from 'svelte/easing';

	export let aimOffset: number;
	const { pointer, camera } = useThrelte();
	const rotationZ = tweened(0, { duration: 500, easing: quintOut }); // left/right
	const rotationX = tweened(Math.PI / 2, { duration: 500, easing: quintOut }); // left/right

	// @ts-ignore
	$: rotationZ.set($pointer.x * degToRad(30 * $camera?.aspect)); // 1 = 45deg, -1 = -45deg
	/**
	 * "vertical" movement is weird here because the cannon is not vertically centered on the screen
	 * $pointer.y * degToRad(30) = smaller range of motion vertically (this might be weird on portrait screens)
	 * (Math.PI + Math.atan(100 / -2) = Offset rotation straight ahead + angle from 100m away, and 2m lower than camera
	 */
	$: rotationX.set($pointer.y * degToRad(30) + (Math.PI + Math.atan(aimOffset / -2)));
</script>

<Mesh
	geometry={new CylinderBufferGeometry(1.25, 0.5)}
	material={new MeshStandardMaterial({ color: '#080810', metalness: 0.25, roughness: 0.5 })}
	scale={{ x: 0.5, y: 3.5, z: 0.5 }}
	rotation={{ x: $rotationX, z: $rotationZ }}
/>
