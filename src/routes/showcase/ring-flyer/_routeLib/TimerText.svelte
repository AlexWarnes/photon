<script lang="ts">
	import { T } from '@threlte/core';
	import { stopwatch } from '$lib/customStores/stopwatch';
	import { Text } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { pctFuel } from './state';
	export let positionY = 0;
	export let positionX = 0;

	const timer = stopwatch();
	onMount(() => {
		timer.start();
	});
	let fuelColor = '#32cd32';
	// $: pctFuel = $fuel / fuelCapacity;
	$: if ($pctFuel > 0.66) {
		fuelColor = '#32cd32';
	} else if ($pctFuel > 0.33) {
		fuelColor = '#ffd700';
	} else {
		fuelColor = '#ff0000';
	}

	$: if ($pctFuel <= 0) timer.pause();
</script>

<T.Group position.y={positionY} position.x={positionX} position.z={-600} scale={0.5}>
	<Text
		text={Math.floor($timer).toFixed(0)}
		fontSize={250}
		font="/assets/ChakraPetch-Medium.ttf"
		
		position={{ x: -50, y: 175,}}
		anchorX="right"
		fillOpacity={1}
		color={fuelColor}
		strokeColor={'black'}
		strokeWidth={2}
		strokeOpacity={1}
	/>
	<Text
		text=".{(($timer % 1) * 100).toFixed(0).padEnd(2, '0')}"
		fontSize={250}
		font="/assets/ChakraPetch-Medium.ttf"
		
		position={{ x: 0, y: 175,}}
		anchorX="left"
		fillOpacity={1}
		color={fuelColor}
		strokeColor={'black'}
		strokeWidth={2}
		strokeOpacity={1}
	/>
</T.Group>
