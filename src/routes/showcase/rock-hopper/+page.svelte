<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { Debug, World } from '@threlte/rapier';
	import { KeyboardControls } from 'svelte-kbc';
	import ArrowButtons from './_routeLib/ArrowButtons.svelte';
	import Scene from "./_routeLib/Scene.svelte";
	const keyboardConfig = [
		{ name: 'FIRE', keys: ['Space', ' ', 'F', 'f'] },
		{ name: 'UP', keys: ['W', 'w', 'ArrowUp'] },
		{ name: 'DOWN', keys: ['S', 's', 'ArrowDown'] },
		{ name: 'LEFT', keys: ['A', 'a', 'ArrowLeft'] },
		{ name: 'RIGHT', keys: ['D', 'd', 'ArrowRight'] },
		{ name: 'ROLL', keys: ['B', 'b'] }
	];
</script>

<KeyboardControls config={keyboardConfig}>
<div class="wrapper">
	<Canvas>
		<World gravity={{ x: 0, y: -9.8, z: 0 }}>
			<Debug />
				<Scene />
			</World>
		</Canvas>
		<div class="button-box">
			<ArrowButtons />
		</div>
	</div>
</KeyboardControls>

<style>
	.wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: paleturquoise;
	}
	.button-box {
		position: absolute;
		bottom: 5rem;
		width: 100%;
	}
</style>
