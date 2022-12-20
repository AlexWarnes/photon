<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { onDestroy, onMount } from 'svelte';
	import type { Vector3Tuple } from 'three';
	export let position: Vector3Tuple = [0, 0, 0];
	export let r: number = 1;
	export let delay: number = 0;
	export let speed: number = 1;
  export let randomSeed: number = 1;
	let scale: number = r;
	let timeoutID: ReturnType<typeof setTimeout>;
	let visible: boolean = false;
	useFrame((ctx, _) => {
		scale = Math.abs(Math.sin((ctx.clock.getElapsedTime() + randomSeed) * speed));
	});

	onMount(() => {
		timeoutID = setTimeout(() => {
			visible = true;
		}, delay);
	});

	onDestroy(() => {
		if (timeoutID) clearTimeout(timeoutID);
	});
</script>

{#if visible}
	<T.Mesh scale={scale * r} {position}>
		<T.SphereGeometry />
		<T.MeshBasicMaterial transparent opacity={1 - scale} />
	</T.Mesh>
{/if}
