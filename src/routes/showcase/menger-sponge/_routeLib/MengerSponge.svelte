<script lang="ts">
	import type { Position } from '@threlte/core';
	import { getMengerPositions } from './geometry.js';
	import { calcScaleFactor } from './store.js';
	import Cube from './Cube.svelte';
  
	export let origin = { x: 0, y: 0, z: 0 };
	export let level: number;

	let positions: Position[] | any;
	let scaleFactor: number;

	function init(l: number) {
		setTimeout(() => {
			scaleFactor = calcScaleFactor(l);
			positions = getMengerPositions(l, [origin], scaleFactor);
		}, 750);
	}
	$: init(level);
</script>

{#if positions}
	{#each positions as position}
		<Cube {position} {scaleFactor} />
	{/each}
{/if}
