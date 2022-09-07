<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { Debug, World } from '@threlte/rapier';
	import HeaderScene from './HeaderScene.svelte';
</script>

<div class="canvas-wrapper">
	<Canvas>
		<World>
            <!-- <Debug></Debug> -->
			<HeaderScene />
		</World>
	</Canvas>
</div>

<style>
	.canvas-wrapper {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: salmon;
	}
</style>
