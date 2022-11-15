<script>
	import { Canvas } from '@threlte/core';
	import { World, } from '@threlte/rapier';
	import { dynamicAttractors, } from './_routeLib/systemState';
	import Scene from './_routeLib/Scene.svelte';
	import SvelteHead from '$lib/components/SvelteHead.svelte';
</script>

<!-- TODO: Update -->
<SvelteHead />

<div class="wrapper">
	<Canvas>
		<World gravity={{y: 0}}>
			<Scene />
		</World>
	</Canvas>
	<div class="controls">
		<label>
			Dynamic Attractors
			<input 
				type="checkbox" 
				bind:checked={$dynamicAttractors} />
		</label>
	</div>
</div>

<style>
	.wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		background: black;
	}
	.controls {
		position: absolute;
		top: 1rem;
		left: 1rem;
		background: #00000088;
		color: #fafbfc;
	}
</style>