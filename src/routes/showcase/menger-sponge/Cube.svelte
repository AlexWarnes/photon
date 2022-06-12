<script lang="ts">
	import { Instance } from 'threlte';
	import { tweened } from 'svelte/motion';
	import { elasticOut } from 'svelte/easing';
	import type { Position } from 'threlte';

	export let position: Position;

	const s = tweened(0.9, { duration: 2500, easing: elasticOut, });

</script>

<Instance
	id="m"
	{position}
	scale={$s}
	on:pointerenter={() => ($s = 0.6)}
	on:pointerleave={() => ($s = 0.9)}
/>
