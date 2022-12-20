<script lang="ts">
	import FuelPump from '$lib/svg/FuelPump.svelte';
	import { stopwatch } from '$lib/customStores/stopwatch';
	import { onMount } from 'svelte';
	import { pctFuel, gameStatus, addStats, type GameStatus } from './state';
	let fuelColor = '#32cd32';
	let timer = stopwatch();

	function updateTimerFromGameStatus(status: GameStatus): void {
		switch (status) {
			case 'LEVEL_WIN':
			case 'GAME_WIN':
				timer.pause();
				addStats($timer, $pctFuel);
				break;
			case 'LOSE':
				timer.pause();
				break;
			case 'READY':
				timer.reset();
				break;
			case 'PLAY':
				timer.start();
				break;
			default:
				console.error('Unknown Game Status:', status);
		}
	}

	$: if ($pctFuel > 0.66) {
		fuelColor = '#32cd32';
	} else if ($pctFuel > 0.33) {
		fuelColor = '#ffd700';
	} else {
		fuelColor = '#ff0000';
	}
	$: updateTimerFromGameStatus($gameStatus);

  $: if ($pctFuel <= 0) $gameStatus = "LOSE";
</script>

<div class="info-row">
	<div class="tank">
		<div class="fuel" style:width="{$pctFuel * 100}%" style="background-color: {fuelColor};">
			<FuelPump />
		</div>
	</div>
	<p class="time">{$timer.toFixed(2)}</p>
</div>

<style>
	.info-row {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}
	.tank {
		width: 200px;
		background-color: #00000088;
		padding: 0.125rem;
	}
	.fuel {
		height: 2rem;
	}

	.time {
		margin: 0;
		font-variant-numeric: tabular-nums;
		color: #fafbfc;
		/* margin: 0 1rem; */
		font-size: 2rem;
		font-family: 'ChakraPetch-Medium', monospace;
	}
</style>
