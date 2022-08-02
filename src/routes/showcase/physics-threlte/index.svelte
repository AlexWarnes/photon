<script>
	import { Color } from 'three';
	import { Canvas } from '@threlte/core';
	import { Debug, World } from '@threlte/rapier';
	import Scene from './_routeLib/Scene.svelte';
	import Panel from '$lib/components/Panel.svelte';
	let showDebug = false;
</script>

<div class="canvas-wrapper">
	<Canvas>
		<World>
			{#if showDebug}
				<Debug color={new Color('#ff3e01').convertSRGBToLinear()} />
			{/if}
			<Scene />
		</World>
	</Canvas>

	<div class="controls">
		<Panel>
			<label>
				Debug
				<input type="checkbox" bind:checked={showDebug} />
			</label>
		</Panel>
	</div>
</div>

<style>
	.canvas-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.controls {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
	}
</style>
