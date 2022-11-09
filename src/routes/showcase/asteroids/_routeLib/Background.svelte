<script lang="ts" context="module">
	const geometry = new SphereGeometry(0.2);
	const material = new MeshBasicMaterial({ color: 'white' });

	const backgroundMaterial = new MeshStandardMaterial({
		color: '#011111',
		metalness: 0.5,
		roughness: 0.5,
		side: BackSide
	});
</script>

<script lang="ts">
	import { randomPositionOnRing } from '$lib/utils/vectors';

	import { Mesh, MeshInstance, type Rotation } from '@threlte/core';
	import {
		BackSide,
		MeshStandardMaterial,
		MeshBasicMaterial,
		SphereGeometry,
		InstancedMesh,
		Matrix4
	} from 'three';

	export let rotation: Rotation;
	let starCount = 1000;
	let instMesh: InstancedMesh;

	function initMesh(c: number) {
		instMesh = new InstancedMesh(geometry, material, c);
		const matrix = new Matrix4();
		const rings = 5;
		for (let i = 0; i < instMesh.count; i++) {
			matrix.setPosition(randomPositionOnRing({ ringRange: [400, 800], depthRange: [-300, 300] }));
			instMesh.setMatrixAt(i, matrix);
		}
	}

	$: initMesh(starCount);
</script>

<!-- <Mesh geometry={new SphereGeometry()} material={backgroundMaterial} scale={800} /> -->

<MeshInstance {rotation} mesh={instMesh} />
