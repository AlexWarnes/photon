<script lang="ts">
	import { onMount } from 'svelte';
	import { SphereBufferGeometry, MeshBasicMaterial, BackSide } from 'three';
	import { Canvas, PerspectiveCamera, AmbientLight, Mesh, OrbitControls } from '@threlte/core';
	import { arcsData, pointsData } from './_routeLib/data';
	import ThreeGlobe from './_routeLib/ThreeGlobe.svelte';

	onMount(() => {
		let intervalID = setInterval(() => {
			pointsData.update((current: any) => {
				current.forEach((d: any) => (d.size = Math.random()));
				return current;
			});
		}, 2000);
		return () => {
			clearInterval(intervalID);
		};
	});
</script>

<div class="canvas-wrapper">
	<Canvas>
		<PerspectiveCamera fov={55} position={{ z: -20 }}>
			<OrbitControls autoRotate />
		</PerspectiveCamera>
		<AmbientLight intensity={0.5} />

		<!-- BACKGROUND -->
		<Mesh
			geometry={new SphereBufferGeometry()}
			material={new MeshBasicMaterial({ color: 'black', side: BackSide })}
			scale={400}
		/>

		<ThreeGlobe pointsData={$pointsData} arcsData={$arcsData} />
	</Canvas>
</div>

<style>
	.canvas-wrapper {
		width: 100%;
		height: 100%;
	}
</style>
