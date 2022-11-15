<script lang="ts">
	import {
		SphereGeometry,
		MeshBasicMaterial,
		InstancedMesh,
		Matrix4,
		Vector3,
	} from 'three';
	import { randomPosition, type TrigFn, type ZDimension, type ZFactor, } from './dataUtils.js';
	import { MeshInstance, useFrame } from '@threlte/core';
	export let count: number;
	export let fn: TrigFn;
	export let zFactor: ZFactor;
	export let zDimension: ZDimension;
	export let disableInputs: boolean = false;
	
	const geometry = new SphereGeometry(0.18);
	const material = new MeshBasicMaterial({color: 'cyan'});

	let currentPos: Vector3[] = [];
	let nextPos: Vector3[] = [];
	
	let instMesh: InstancedMesh;
	function initMesh(c: number) {
		const tempCurrentPos: Vector3[] = [];
		nextPos = [];
		const tempInstMesh: InstancedMesh = new InstancedMesh(geometry, material, c)
		const matrix: Matrix4 = new Matrix4();
		for (let i = 0; i < tempInstMesh.count; i++) {
			let pos = currentPos[i] || randomPosition(50, fn, zFactor, zDimension);
			tempCurrentPos.push(pos)
			matrix.setPosition(pos);
			tempInstMesh.setMatrixAt(i, matrix);
		}
		
		currentPos = tempCurrentPos;
		instMesh = tempInstMesh;
	}
	function updateNextPositions(f: TrigFn, zF: ZFactor, zDim: ZDimension){
		if (!instMesh) return;
		nextPos = [];
		for (let i = 0; i < instMesh.count; i++) {
			let pos = randomPosition(50, f, zF, zDim);
			nextPos.push(pos)
		}
	}
	
	$: initMesh(count)
	$: updateNextPositions(fn, zFactor, zDimension);
	$: disableInputs = nextPos.length > 0;

  useFrame(() => {
		if(nextPos.length){
			const matrix = new Matrix4();
			let done = true;
			for (let i = 0; i < instMesh.count; i++) {
				if (currentPos[i].distanceTo(nextPos[i]) > 0.05) {
					done = false;
					currentPos[i].lerp(nextPos[i], 0.025)
					matrix.setPosition(currentPos[i]);
					instMesh.setMatrixAt(i, matrix);
				}
			}
			if (done) {
				nextPos = []
				instMesh.instanceMatrix.needsUpdate = false;
			}
			instMesh.instanceMatrix.needsUpdate = true;
		}
	})
</script>

{#if instMesh}
	<MeshInstance mesh={instMesh} />
{/if}