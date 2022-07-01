<script lang="ts">
	import { SphereBufferGeometry,  } from 'three';
	import {
		Canvas,
		PerspectiveCamera,
		OrbitControls,
		type ThreltePointerEvent,
		Mesh,
		AmbientLight,
Text,
	} from 'threlte';
	import { atoms } from './_routeLib/stores';
	import Hydrogen from './_routeLib/Hydrogen.svelte';
	import { backgroundMaterial } from './_routeLib/materials';
import { tweened } from 'svelte/motion';
import { mapLinear } from 'three/src/math/MathUtils';
import { cubicInOut, quintOut } from 'svelte/easing';

	function handleClick(evt: CustomEvent<ThreltePointerEvent>, atomID: string) {
		console.log(atomID);
		// TODO
	}

	const cameraX = tweened(0, {duration: 500, easing: quintOut})
	const cameraY = tweened(0, {duration: 500, easing: quintOut})
	function handleMousemove(evt: any){
		cameraX.set(mapLinear(evt.clientX / window.innerWidth, 0, 1, -5, 5));
		cameraY.set(mapLinear(evt.clientY / window.innerHeight, 0, 1, 5, -5));
	}
</script>

<div class="canvas-wrapper" on:mousemove={handleMousemove}>
	<Canvas>
		<PerspectiveCamera position={{ x: $cameraX, y: $cameraY, z: 20 }} fov={24} near={0.5}>
			<!-- <OrbitControls /> -->
		</PerspectiveCamera>
		<!-- <AmbientLight intensity={0.3} /> -->
		<!-- BACKGROUND -->
		<Mesh geometry={new SphereBufferGeometry()} material={backgroundMaterial} scale={100} />

		<!-- TEXT -->
		<Text text="ISOTOPES OF HYDROGEN" font="/assets/ChakraPetch-Medium.ttf" scale={9} position={{y: 3, z: -10}}  anchorX="center"/>
		<Text text="PROTIUM" font="/assets/ChakraPetch-Medium.ttf" scale={8} position={{y: 1, z: -10}}  anchorX="center"/>
		<Text text="DEUTERIUM" font="/assets/ChakraPetch-Medium.ttf" scale={8} position={{y: 0, z: -10}} anchorX="center" />
		<Text text="TRITIUM" font="/assets/ChakraPetch-Medium.ttf" scale={8} position={{y: -1, z: -10}}  anchorX="center"/>

		<!-- ATOMS -->
		{#each $atoms as atom (atom.id)}
			<Hydrogen
				position={atom.position}
				rotation={atom.rotation}
				isotope={atom.isotope}
				on:click={(e) => handleClick(e, atom.id)}
			/>
		{/each}
	</Canvas>
</div>

<style>
	.canvas-wrapper {
		width: 100%;
		height: 100%;
	}
</style>
