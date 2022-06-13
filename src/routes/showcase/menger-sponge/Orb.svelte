<script lang="ts">
	import { IcosahedronBufferGeometry, MeshPhysicalMaterial } from 'three';
	import { PointLight, Mesh, Group } from 'threlte';
	import { onMount } from 'svelte';
	import { mLevel } from './store';
	import { tweened } from 'svelte/motion';
	import { quintOut } from 'svelte/easing';
	const sourceY = tweened(10, { duration: 8000, easing: quintOut });

	onMount(() => {
		sourceY.set(0);
	});
</script>

<Group position={{ x: 0, y: $sourceY, z: 0 }}>
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
		scale={0.5 * (3 / Math.pow(3, $mLevel))}
	/>
</Group>
