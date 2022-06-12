<script lang="ts">
	import { IcosahedronBufferGeometry, MeshPhysicalMaterial } from 'three';
	import { PointLight, Mesh, Group } from 'threlte';

	import { sourceX, sourceY, sourceZ } from './store';
	import { onMount } from 'svelte';

	onMount(() => {
		sourceY.set(0);
	});
</script>

<Group position={{ x: $sourceX, y: $sourceY, z: $sourceZ }}>
	<PointLight color={'red'} intensity={1} position={{ x: 0, y: 1, z: 0 }} />
	<Mesh
		geometry={new IcosahedronBufferGeometry()}
		material={new MeshPhysicalMaterial({
			color: 'pink',
			roughness: 0.15,
			transmission: 1,
			// @ts-ignore
			thickness: 2
		})}
		scale={0.5}
	/>
</Group>
