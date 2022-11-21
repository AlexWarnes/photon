<script lang="ts">
	import { displayPoints, gameStatus, reset, stats } from './state';
</script>

<div class="box">
	{#if $gameStatus === 'READY'}
		<button on:click={() => ($gameStatus = 'PLAY')}>PLAY</button>
	{:else if $gameStatus === 'OVER'}
		<h2>GAME OVER</h2>
		<div class="stat-box">
			<p>SCORE: {$displayPoints}</p>
			<p>SHOTS: {$stats.shots}</p>
			<p>HITS: {$stats.hits}</p>
			<p>ACCURACY: {$stats.accuracy}%</p>
		</div>
		<button on:click={reset}>TRY AGAIN</button>
	{:else}
		<h2>VICTORY</h2>
		<button on:click={reset}>PLAY AGAIN</button>
	{/if}
</div>

<style>
	.box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		position: fixed;
		top: 0;
		left: 0;
		color: red;
	}

	.stat-box {
		padding: 1rem;
		margin: 1rem;
		background: #000000a8;
	}

	h2 {
		font-size: 5rem;
		margin-bottom: 1rem;
		background: #000000a8;
		padding: 1rem;
		border: 5px inset red;
	}

	button {
		font-size: 2rem;
		background: #000000a8;
		color: limegreen;
		padding: 1rem;
		border: 5px inset limegreen;
	}
</style>
