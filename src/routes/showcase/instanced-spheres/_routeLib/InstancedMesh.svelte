<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { randomVec3 } from '$lib/utils/vectors';
	let count: number = 1000;
	const geometry = new THREE.SphereBufferGeometry();
	geometry.scale(0.1, 0.1, 0.1);
	const material = new THREE.MeshBasicMaterial({
		color: new THREE.Color('#ffffff')
	});

	let IMesh: any;
	function initMesh(c: number) {
		IMesh = new THREE.InstancedMesh(geometry, material, c);
		const matrix = new THREE.Matrix4();
		for (let i = 0; i < IMesh.count; i++) {
			matrix.setPosition(randomVec3());
			IMesh.setMatrixAt(i, matrix);
		}
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
	$: initMesh(count);
</script>

<SC.Primitive object={IMesh} />

<div class="control">
	<label
		>Instance Count<input bind:value={count} type="range" min="100" max="10000" step="50" /></label
	>
	{count}
</div>

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
