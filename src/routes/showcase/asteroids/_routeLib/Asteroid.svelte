<script lang="ts" context="module">
	const geometry = new IcosahedronGeometry();
	const material = new MeshStandardMaterial({
		color: 'magenta',
		metalness: 0.8,
		roughness: 0.1
	});
	// const material = new MeshStandardMaterial({ color: '#2e2f36' });
	// const material = new MeshStandardMaterial({ color: 'darkcyan' });
</script>

<script lang="ts">
	import {
		DirectionalLight,
		AmbientLight,
		Mesh,
		Group,
		useFrame,
		type Position
	} from '@threlte/core';
	import { Collider, RigidBody, Attractor } from '@threlte/rapier';
	import { onDestroy, onMount } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import {
		CylinderGeometry,
		IcosahedronGeometry,
		MeshBasicMaterial,
		MeshStandardMaterial,
		SphereGeometry,
		Vector3
	} from 'three';
	import { randFloat, randInt } from 'three/src/math/MathUtils';
	import { destroyAsteroid, points, splitAsteroid, hits, settings } from './state';
	export let position: Position;
	export let scale: number;
	export let id: string;
	export let maxHealth: number;
	export let isFragment: boolean;
	export let floatTo: Position;
	const vectorSeed: number = randInt(-(scale * 4), scale * 4);
	const pX = tweened(position.x, { duration: 5000, easing: cubicOut });
	const pY = tweened(position.y, { duration: 5000, easing: cubicOut });
	const pZ = tweened(position.z, { duration: 5000, easing: cubicOut });
	const s = tweened(scale, { duration: 750, easing: cubicIn });
	let r = randFloat(0, Math.PI * 2);

	let contact = 0;

	function handleHit(e: any) {
		console.log('ASTEROID HIT:', e);
		contact += 1;
		$hits += 1;
		if (contact >= maxHealth) {
			$points += 10 - scale;
			if (scale >= 3) {
				splitAsteroid(id, { x: $pX, y: $pY, z: $pZ });
			} else {
				s.set(0).then(() => {
					destroyAsteroid(id);
				});
			}
		}
	}

	onMount(() => {
		if (isFragment) {
			$pX = floatTo.x!;
			$pY = floatTo.y!;
			$pZ = floatTo.z!;
		}
	});

	useFrame((_, delta) => {
		r += 0.3 * delta;
	});
</script>

<Collider
	shape="ball"
	args={[scale]}
	on:collisionenter={handleHit}
	position={{ x: $pX, y: $pY, z: $pZ }}
>
	<Mesh {geometry} {material} {scale} rotation={{ x: r, y: r }} />
	{#if $settings.asteroidGravity}
		<Mesh
			geometry={new SphereGeometry()}
			material={new MeshBasicMaterial({ color: 'coral', wireframe: true, transparent: true, opacity: 1 })}
			scale={2 * scale}
		>
			<Attractor range={2 * scale} strength={500 * scale} />
		</Mesh>
	{/if}
</Collider>
