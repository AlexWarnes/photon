<script lang="ts">
	import { DirectionalLight, AmbientLight, Mesh, Group, useFrame } from '@threlte/core';
	import { Collider } from '@threlte/rapier';
	import {
		BackSide,
		CylinderGeometry,
		IcosahedronGeometry,
		MeshStandardMaterial,
		SphereGeometry
	} from 'three';
	import { asteroids, points, speed } from './state';
	import Effects from './Effects.svelte';
	import Player from './Player.svelte';
	import Planet from './Planet.svelte';
	import Asteroid from './Asteroid.svelte';
	import Background from './Background.svelte';

	let r = 0;
	useFrame((_, delta) => {
		r += $speed * delta;
	});

	$: console.log('Speed:', $speed);

	// $: if ($points) {
	// 	// every 100 points, incr 0.05
	// 	$speed = ($points / 100);
	// }
</script>

<DirectionalLight shadow intensity={1} position={{ x: 10, y: 1, z: 0 }} />
<AmbientLight intensity={0.5} />

<Group position={{ y: -390, z: -100 }} rotation={{ x: r }}>
	<Planet />
	{#each $asteroids as rock (rock.id)}
		<Asteroid {...rock} />
	{/each}
</Group>
<Player />
<Effects />

<Background rotation={{ x: r, y: Math.PI / 2 }} />