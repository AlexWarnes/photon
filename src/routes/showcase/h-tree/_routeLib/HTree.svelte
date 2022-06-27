<script lang="ts">
	// import { SphereBufferGeometry, MeshStandardMaterial, type Vector3Tuple } from 'three';
	// import type { Vector3Tuple } from 'three';
	// import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
	// import { Mesh, InstancedMesh, Line2, Instance } from 'threlte';
	// import { branches, connectVectors, type Branch } from './treeState';

	// let allThePoints: Vector3Tuple[] = [];
	// $: if ($branches && $connectVectors) {
	// 	console.log('Mapping...');
	// 	allThePoints = [[0, 0, 0], ...$branches.map((b: Branch) => b.points[1])];
	// }
</script>

<!-- <InstancedMesh
	geometry={new SphereBufferGeometry(0.08)}
	material={new MeshStandardMaterial({
		color: 'coral'
	})}
>
	{#each $branches as branch (branch.id)}
		<Instance
			position={{ x: branch.points[1][0], y: branch.points[1][1], z: branch.points[1][2] }}
		/>
	{/each}
</InstancedMesh> -->

<!-- {#if allThePoints.length > 2 && $connectVectors}
	<Line2
		points={allThePoints}
		material={new LineMaterial({
			worldUnits: true,
			linewidth: 0.03,
			// @ts-ignore bad types
			color: 'limegreen'
			// clipIntersection: true
		})}
	/>
{:else}
	{#each $branches as branch (branch.id)}
		<Line2 points={branch.points} material={branch.material} />
	{/each}
{/if} -->
