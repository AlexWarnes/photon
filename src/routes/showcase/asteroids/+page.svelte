<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { World } from '@threlte/rapier';
	import { KeyboardControls } from 'svelte-kbc';
	import GameStatus from './_routeLib/GameStatus.svelte';
	import Scene from './_routeLib/Scene.svelte';
	import { gameStatus } from './_routeLib/state';
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
			<KeyboardControls config={keyboardConfig}>
				<Scene />
			</KeyboardControls>
		</World>
	</Canvas>
	<div class="stats">
		<Stats />
	</div>

	{#if $gameStatus !== 'PLAY'}
		<GameStatus />
	{/if}
</div>

<style>
	.wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #161616;
	}

	.stats {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>
