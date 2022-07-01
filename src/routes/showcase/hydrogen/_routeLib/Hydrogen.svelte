<script lang="ts">
	import { SphereBufferGeometry, DodecahedronBufferGeometry, OctahedronBufferGeometry } from 'three';
	import { Mesh, Group, useFrame } from 'threlte';
	import { Float } from 'threlte/extras';
  import { atomicMaterial } from "./materials";
	export let position = { x: 0, y: 0, z: 0 };
	export let isotope = 'TRITIUM'; // "PROTIUM" | "DEUTERIUM" | "TRITIUM"
	export let rotation = 0;

	let dynamicRotation = 0;
	useFrame(() => {
		dynamicRotation += 0.01;
	});
</script>

<Float speed={0.5} rotationIntensity={1} floatIntensity={40} floatingRange={[-0.1, 0.1]}>
	<Group {position} rotation={{ x: rotation, y: rotation, z: rotation }}>

		<!-- PROTON -->
		<Mesh
			geometry={new DodecahedronBufferGeometry()}
			material={atomicMaterial[isotope].proton}
			{position}
			interactive
			on:click
		/>

		<!-- NEUTRONS -->
		{#if isotope === 'DEUTERIUM' || isotope === 'TRITIUM'}
		<Mesh
			geometry={new DodecahedronBufferGeometry(1)}
			material={atomicMaterial[isotope].neutron}
			position={{ x: position.x + 0.66, y: position.y + 0.33, z: position.z }}
			scale={0.75}
			interactive
			on:click
		/>
		{/if}
		
		{#if isotope === 'TRITIUM'}
		<Mesh
			geometry={new DodecahedronBufferGeometry(1)}
			material={atomicMaterial[isotope].neutron}
			position={{ x: position.x + -0.66, y: position.y + 0.33, z: position.z }}
			scale={0.75}
			interactive
			on:click
		/>
			<!-- <Mesh
				geometry={new DodecahedronBufferGeometry(1)}
				material={atomicMaterial[isotope].neutron}
				position={{ x: position.x, y: position.y + -0.66, z: position.z }}
				scale={0.75}
				interactive
				on:click
			/> -->
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
input {

	color: #FF0605;
	color: #9538FF;
	color: #0605FF;
	color: #FFFFFF;
	color: #FFFFC0;
	color: #FFFFA0;
	color: #008FFF;
	color: #006BFF;
	color: #002b4d;
	color: #00204d;

	/* fresnel */
	color: #E7B473;
}
</style>