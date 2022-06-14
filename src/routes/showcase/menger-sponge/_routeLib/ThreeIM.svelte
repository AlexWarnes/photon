<script lang="ts">
	import {
		SphereBufferGeometry,
		MeshBasicMaterial,
		InstancedMesh,
		Matrix4,
		Vector3,
		BoxBufferGeometry,
		MeshStandardMaterial
	} from 'three';
	import { MeshInstance } from 'threlte';
	import { randomVec3 } from '$lib/utils/vectors';
	import { getMengerPositions } from './geometry';
	import { calcScaleFactor } from './store';

	export let level: number = 1;
	// let count: number = 1000;
	let IMesh: any;
	function initMesh(c: number) {
    const scaleFactor = calcScaleFactor(c);
    console.log("sf", scaleFactor)
    const vectors: any[] = getMengerPositions(c, [{ x: 0, y: 0, z: 0 }], scaleFactor);
		const geometry = new BoxBufferGeometry();
    geometry.scale(0.9 * scaleFactor, 0.9 * scaleFactor, 0.9 * scaleFactor);
    // geometry.scale(0.9, 0.9, 0.9);
		const material = new MeshStandardMaterial({
      color: '#fafbfc'
		});
		IMesh = new InstancedMesh(geometry, material, vectors.length);
		const matrix = new Matrix4();
		for (let i = 0; i < IMesh.count; i++) {
			const { x, y, z } = vectors[i];
			let asVec3 = new Vector3(x, y, z);
			matrix.setPosition(asVec3);
			IMesh.setMatrixAt(i, matrix);
		}
		IMesh.instanceMatrix.needsUpdate = true;
	}
	// let drift = 0.1;
	// function driftMatrices() {
	// 	let matrix = new THREE.Matrix4();
	// 	let position = new THREE.Vector3();

	// 	for (let i = 0; i < IMesh.count; i++) {
	// 		IMesh.getMatrixAt(i, matrix);
	// 		position.setFromMatrixPosition(matrix); // extract position form transformationmatrix
	// 		position.x += drift; // move
	// 		position.y += drift; // move
	// 		position.z += drift; // move

	// 		matrix.setPosition(position); // write new positon back
	// 		IMesh.setMatrixAt(i, matrix);
	// 	}
	// 	IMesh.instanceMatrix.needsUpdate = true;
	// }
	$: initMesh(level);
</script>

<MeshInstance mesh={IMesh} />

<!-- <div class="control">
	<label
		>Instance Count<input bind:value={count} type="range" min="100" max="10000" step="50" /></label
	>
	{count}
</div> -->
<style>
	.control {
		position: absolute;
		top: 5rem;
		right: 1rem;
		background: #00000088;
		color: #fafbfc;
		padding: 1rem;
	}
	label {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
	}
</style>
