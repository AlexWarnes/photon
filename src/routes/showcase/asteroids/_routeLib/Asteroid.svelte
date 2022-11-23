<script lang="ts" context="module">
	const geometry = new IcosahedronGeometry();
	const material = new MeshStandardMaterial({
		emissive: 'red',
		emissiveIntensity: 1,
		metalness: 0.8,
		roughness: 0.1
	});
	const orthoMaterial = new MeshStandardMaterial({
		emissive: 'black',
		emissiveIntensity: 1,
		metalness: 0.8,
		roughness: 0.1
	});
</script>

<script lang="ts">
	import { Mesh, useFrame, type Position } from '@threlte/core';
	import { Collider } from '@threlte/rapier';
	import { onMount } from 'svelte';
	import { cubicOut, elasticOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { IcosahedronGeometry, MeshStandardMaterial } from 'three';
	import { randFloat } from 'three/src/math/MathUtils';
	import { destroyAsteroid, points, splitAsteroid, hits, orthoMode, } from './state';
	export let position: Position;
	export let scale: number;
	export let id: string;
	export let maxHealth: number;
	export let isFragment: boolean;
	export let orthoTrigger: boolean;
	export let floatTo: Position;
	const pX = tweened(position.x, { duration: 5000, easing: cubicOut });
	const pY = tweened(position.y, { duration: 5000, easing: cubicOut });
	const pZ = tweened(position.z, { duration: 5000, easing: cubicOut });
	const s = tweened(0, { duration: 750, easing: elasticOut });
	let r = randFloat(0, Math.PI * 2);

	let contact = 0;
	let orthoTransition = false;

	function handleHit() {
		contact += 1;
		$hits += 1;
		if (contact >= maxHealth) {
			handleOrthoMode();
			$points += 20 - scale;
			if (scale >= 8) {
				splitAsteroid(id, { x: $pX, y: $pY, z: $pZ });
			} else {
				s.set(0).then(() => {
					destroyAsteroid(id);
				});
			}
		}
	}

	function handleOrthoMode() {
		if (orthoTrigger) {
			startOrthoTransitionTimer();
			// showGlitch.set(true);
			orthoMode.set(true);
			return;
		}

		if ($orthoMode && orthoTransition === false) {
			// showGlitch.set(true);
			orthoMode.set(false);
		}
	}

	function startOrthoTransitionTimer() {
		orthoTransition = true;
		setTimeout(() => {
			orthoTransition = false;
		}, 1500);
	}

	onMount(() => {
		if (isFragment) {
			$pX = floatTo.x!;
			$pY = floatTo.y!;
			$pZ = floatTo.z!;
		}
		$s = scale;
	});

	useFrame((_, delta) => {
		r += 0.3 * delta;
	});
</script>

<Collider
	shape="ball"
	args={[scale + 0.1]}
	on:collisionenter={handleHit}
	position={{ x: $pX, y: $pY, z: $pZ }}
>
	<Mesh
		{geometry}
		material={orthoTrigger ? orthoMaterial : material}
		scale={$s}
		rotation={{ x: r, y: r }}
	/>
</Collider>
