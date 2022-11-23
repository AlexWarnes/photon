<script lang="ts">
	import { DirectionalLight, AmbientLight, Group, useFrame } from '@threlte/core';
	import { asteroids, gameStatus, speed, difficulty, initAsteroids } from './state';
	import Effects from './Effects.svelte';
	import Player from './Player.svelte';
	import Planet from './Planet.svelte';
	import Asteroid from './Asteroid.svelte';
	import Background from './Background.svelte';

	let r = 0;
	useFrame((_, delta) => {
		r += $speed * delta;
	});

	$: if ($asteroids?.length === 0){
		$gameStatus = "WIN"
	}

	$: initAsteroids($difficulty)
</script>

<DirectionalLight shadow intensity={1.5} position={{ x: 10, y: 1, z: 0 }} />
<AmbientLight intensity={0.5} />

<Group position={{ y: -390, z: -100 }} rotation={{ x: r }}>
	<Planet />
	{#if $gameStatus !== 'READY'}
		{#each $asteroids as rock (rock.id)}
			<Asteroid {...rock} />
		{/each}
	{/if}
</Group>
<Player />
<Effects />

<Background rotation={{ x: r, y: Math.PI / 2 }} />
