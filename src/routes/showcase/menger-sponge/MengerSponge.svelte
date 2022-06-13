<script lang="ts">
	import { getMengerPositions } from './geometry.js';
	import Cube from './Cube.svelte';

	export let origin = { x: 0, y: 0, z: 0 };
	export let level: number;


	$: positions = getMengerPositions(level, origin);
</script>

{#each positions as position}
	{#if level === 1}
		<Cube {position} />
	{:else}
		<svelte:self level={level - 1} origin={position} />
	{/if}
{/each}
