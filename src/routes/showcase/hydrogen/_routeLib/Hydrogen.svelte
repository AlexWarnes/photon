<script lang="ts">
	import { elasticOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	import {
		DodecahedronBufferGeometry,
		OctahedronBufferGeometry
	} from 'three';
	import { Mesh, Group, useFrame } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { atomicMaterial } from './materials';
	import { removeAtomByID, type HydrogenIsotope } from './stores';
	export let position = { x: 0, y: 0, z: 0 };
	export let isotope: HydrogenIsotope = 'TRITIUM';
	export let rotation = 0;
	export let id: string;
	const scale = tweened(1, { easing: elasticOut, delay: 200 });
	let dynamicRotation = 0;
	useFrame(() => {
		dynamicRotation += 0.01;
	});

	function handleClick() {
		scale.set(0).then(() => removeAtomByID(id));
	}
</script>

<Float speed={0.5} rotationIntensity={1} floatIntensity={40} floatingRange={[-0.1, 0.1]}>
	<Group {position} rotation={{ x: rotation, y: rotation, z: rotation }} scale={{x: $scale, y: $scale}}>
		<!-- PROTON -->
		<Mesh
			geometry={new DodecahedronBufferGeometry()}
			material={atomicMaterial[isotope].proton}
			{position}
			interactive
			on:click={handleClick}
		/>

		<!-- NEUTRONS -->
		{#if isotope === 'DEUTERIUM' || isotope === 'TRITIUM'}
			<Mesh
				geometry={new DodecahedronBufferGeometry(1)}
				material={atomicMaterial[isotope].neutron}
				position={{ x: position.x + 0.66, y: position.y + 0.33, z: position.z }}
				scale={0.75}
				interactive
				on:click={handleClick}
			/>
		{/if}

		{#if isotope === 'TRITIUM'}
			<Mesh
				geometry={new DodecahedronBufferGeometry(1)}
				material={atomicMaterial[isotope].neutron}
				position={{ x: position.x + -0.66, y: position.y + 0.33, z: position.z }}
				scale={0.75}
				interactive
				on:click={handleClick}
			/>
		{/if}

		<!-- ELECTRON	 -->
		<Group rotation={{ x: rotation, y: dynamicRotation, z: rotation }}>
			<Mesh
				geometry={new OctahedronBufferGeometry(0.25)}
				material={atomicMaterial[isotope].electron}
				position={{ x: 10 }}
			/>
		</Group>
	</Group>
</Float>

<style>
	/* input {
		color: #ff0605;
		color: #9538ff;
		color: #0605ff;
		color: #ffffff;
		color: #ffffc0;
		color: #ffffa0;
		color: #008fff;
		color: #006bff;
		color: #002b4d;
		color: #00204d;

		color: #e7b473;
	} */
</style>
