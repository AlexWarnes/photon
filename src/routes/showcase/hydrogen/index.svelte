<script lang="ts">
	/**
	 * This scene was inspired by Paul Henschel's codesandbox here: https://codesandbox.io/s/figma-noodles-iedfg?file=/src/Noodles.js:230-1026
	*/
	import { SphereBufferGeometry } from 'three';
	import { Canvas, PerspectiveCamera, Mesh } from 'threlte';
	import { atoms } from './_routeLib/stores';
	import Hydrogen from './_routeLib/Hydrogen.svelte';
	import Text from './_routeLib/Text.svelte';
	import { backgroundMaterial } from './_routeLib/materials';
	import { tweened } from 'svelte/motion';
	import { mapLinear } from 'three/src/math/MathUtils';
	import { quintOut } from 'svelte/easing';

	const cameraX = tweened(0, { duration: 500, easing: quintOut });
	const cameraY = tweened(0, { duration: 500, easing: quintOut });
	function handleMousemove(evt: any) {
		cameraX.set(mapLinear(evt.clientX / window.innerWidth, 0, 1, -5, 5));
		cameraY.set(mapLinear(evt.clientY / window.innerHeight, 0, 1, 5, -5));
	}
</script>

<!-- mousemove and click shift camera -->
<div class="canvas-wrapper" on:mousemove={handleMousemove} on:click={handleMousemove}>
	<Canvas>
		<PerspectiveCamera position={{ x: $cameraX, y: $cameraY, z: 20 }} fov={24} near={0.5} />

		<!-- BACKGROUND -->
		<Mesh geometry={new SphereBufferGeometry()} material={backgroundMaterial} scale={100} />

		<!-- TEXT -->
		<Text />

		<!-- ATOMS -->
		{#each $atoms as atom (atom.id)}
			<Hydrogen {...atom} />
		{/each}
	</Canvas>
</div>

<style>
	.canvas-wrapper {
		width: 100%;
		height: 100%;
	}
</style>
