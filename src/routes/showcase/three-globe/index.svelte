<script lang="ts">
	import { onMount } from 'svelte';
	import { SphereBufferGeometry, MeshBasicMaterial, BackSide } from 'three';
	import { Canvas, PerspectiveCamera, AmbientLight, Mesh, OrbitControls, Text } from 'threlte';
	import { arcsData, pointsData, displayData } from './_routeLib/data';
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
		<PerspectiveCamera fov={55} position={{ z: 20 }}>
			<OrbitControls autoRotate />
		</PerspectiveCamera>
		<AmbientLight intensity={0.5} />

		<!-- BACKGROUND -->
		<Mesh
			geometry={new SphereBufferGeometry()}
			material={new MeshBasicMaterial({ color: 'black', side: BackSide })}
			scale={400}
		/>

		{#if $displayData && $displayData.NAME}
			<Text
				text={$displayData.NAME}
				scale={6}
				position={{ y: 3}}
				font="/assets/ChakraPetch-Medium.ttf"
			/>
		{/if}
		<ThreeGlobe />
	</Canvas>

	{#if $displayData}
		<div class="data-box">
			<pre>{JSON.stringify($displayData, null, 2)}</pre>
		</div>
	{/if}
</div>

<style>
	.canvas-wrapper {
		width: 100%;
		height: 100%;
	}
	.data-box {
		position: fixed;
		bottom: 2rem;
		left: 2rem;
		width: 18rem;
		height: 10rem;
		overflow: auto;
		padding: 1rem;
		background-color: darkcyan;
		color: white;
	}
</style>
