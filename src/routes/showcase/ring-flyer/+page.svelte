<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { Debug, World } from '@threlte/rapier';
	import { KeyboardControls } from 'svelte-kbc';
	import { difficulty, setInitialFuel, gameStatus } from './_routeLib/state';
	import ArrowButtons from './_routeLib/ArrowButtons.svelte';
	import FuelGuage from './_routeLib/FuelGuage.svelte';
	import GameStatus from './_routeLib/GameStatus.svelte';
	import SceneManager from './_routeLib/Scene_Manager.svelte';
	const keyboardConfig = [
		{ name: 'FIRE', keys: ['Space', ' ', 'F', 'f'] },
		{ name: 'UP', keys: ['W', 'w', 'ArrowUp'] },
		{ name: 'DOWN', keys: ['S', 's', 'ArrowDown'] },
		{ name: 'LEFT', keys: ['A', 'a', 'ArrowLeft'] },
		{ name: 'RIGHT', keys: ['D', 'd', 'ArrowRight'] },
	];

	$: setInitialFuel($difficulty);

	/**
	 * TODOs:
	 * - View modes (for fun?)
	 * - disable turrets on hit? shoot?
	 * - fuel resupplies?
	 */
</script>

<KeyboardControls config={keyboardConfig}>
	<div class="wrapper">
		<Canvas>
			<World gravity={{ x: 0, y: -9.8, z: 0 }}>
				<!-- <Debug /> -->
				<SceneManager />
			</World>
		</Canvas>
		<div class="button-box">
			<ArrowButtons />
		</div>
		<div class="fuel-box">
			<FuelGuage />
		</div>

		{#if $gameStatus !== 'PLAY'}
			<GameStatus />
		{/if}
	</div>
</KeyboardControls>

<style>
	:global(*){
		font-family: 'ChakraPetch-Medium', monospace;
	}
	.wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: black;
	}
	.button-box {
		position: absolute;
		bottom: 5rem;
		width: 100%;
	}
	.fuel-box {
		position: absolute;
		top: 1rem;
		left: 1rem;
	}
	.time-box {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background-color: #00000088;
		color: white;
	}
</style>
