<script lang="ts">
	import { Instance, type Position } from '@threlte/core';
	import { tweened } from 'svelte/motion';
	import { elasticOut } from 'svelte/easing';

	export let position: Position;
	export let scaleFactor: number;
	$: s = tweened(0.9 * scaleFactor, { duration: 2500, easing: elasticOut });
</script>

<Instance
	id="m"
	{position}
	scale={$s}
	on:pointerenter={() => ($s = 0.6 * scaleFactor)}
	on:pointerleave={() => ($s = 0.9 * scaleFactor)}
/>
