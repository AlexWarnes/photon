<script lang="ts">
	// 	My attempt to recreate the game from Bruno Simon's tweet: https://twitter.com/bruno_simon/status/1572301729894666240
	import { Canvas } from '@threlte/core';
	import { World, Debug } from '@threlte/rapier';
	import { KeyboardControls } from 'svelte-kbc';
	import GameStatus from './_routeLib/GameStatus.svelte';
	import Scene from './_routeLib/Scene.svelte';
	import { displayPoints, gameStatus } from './_routeLib/state';
	import Stats from './_routeLib/Stats.svelte';
	const keyboardConfig = [
		{ name: 'FIRE', keys: ['Space', ' ', 'F', 'f'] },
		{ name: 'UP', keys: ['W', 'w', 'ArrowUp'] },
		{ name: 'DOWN', keys: ['S', 's', 'ArrowDown'] },
		{ name: 'LEFT', keys: ['A', 'a', 'ArrowLeft'] },
		{ name: 'RIGHT', keys: ['D', 'd', 'ArrowRight'] },
		{ name: 'ROLL', keys: ['B', 'b'] }
	];
</script>

<div class="wrapper">
	<Canvas>
		<World gravity={{ x: 0, y: 0, z: 0 }}>
			<Debug />
			<KeyboardControls config={keyboardConfig}>
				<Scene />
			</KeyboardControls>
		</World>
	</Canvas>
	<h2 class="points">{$displayPoints}</h2>
	<div class="stats">
		<Stats />
	</div>

  {#if $gameStatus !== "PLAY"}
    <GameStatus />
  {/if}
</div>

<style>
	* {
		font-family: Verdana;
	}
	.wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #161616;
	}

	.stats {
		position: absolute;
		bottom: 5rem;
		left: 1rem;
		/* font-size: 5rem; */
		color: red;
		font-family: monospace;
		font-variant-numeric: tabular-nums;
		text-shadow: 0 0 2rem red;
	}

	.points {
		position: absolute;
		bottom: 5rem;
		right: 1rem;
		margin: 0;
		font-size: 5rem;
		color: red;
		font-family: monospace;
		font-variant-numeric: tabular-nums;
		text-shadow: 0 0 2rem red;
    display: flex;
    flex-direction: column;
	}
</style>
