<script lang="ts">
	import { SphereGeometry, MeshBasicMaterial, InstancedMesh, Matrix4, Vector3 } from 'three';
	import { randInt, randFloat } from 'three/src/math/MathUtils';
	import { MeshInstance } from '@threlte/core';
	import { vec3OnSphere } from '$lib/utils/vectors';

	interface Range {
		min: number;
		max: number;
	}
	export let count: number = 5000;
	export let innerRadius: number = 450;
	export let outerRadius: number = 500;

	const geometry = new SphereGeometry(0.5);
	const material = new MeshBasicMaterial({ color: 'lightsalmon' });

	let instMesh: InstancedMesh;
	function initMesh(c: number, r: Range): void {
		instMesh = new InstancedMesh(geometry, material, c);
		const matrix = new Matrix4();
		for (let i = 0; i < instMesh.count; i++) {
			matrix.setPosition(vec3OnSphere(r));
			instMesh.setMatrixAt(i, matrix);
		}
	}

	$: range = { min: innerRadius, max: outerRadius } as Range;
	$: initMesh(count, range);
</script>

<MeshInstance mesh={instMesh} />
