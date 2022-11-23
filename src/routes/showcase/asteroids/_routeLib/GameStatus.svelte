<script lang="ts">
	import StatBox from './StatBox.svelte';
import { difficulty, displayPoints, gameStatus, reset, stats } from './state';
</script>

<div class="box">
	{#if $gameStatus === 'READY'}
		<button on:click={() => ($gameStatus = 'PLAY')}>PLAY</button>
		<h3>DIFFICULTY: {$difficulty}</h3>
		<div class="difficulty-row">
			<button
				class="diff EARTHER"
				class:selected={$difficulty === 'EARTHER'}
				on:click={() => difficulty.set('EARTHER')}>EARTHER (easy)</button
			><button
				class="diff MARTIAN"
				class:selected={$difficulty === 'MARTIAN'}
				on:click={() => difficulty.set('MARTIAN')}>MARTIAN (medium)</button
			><button
				class="diff BELTER"
				class:selected={$difficulty === 'BELTER'}
				on:click={() => difficulty.set('BELTER')}>BELTER (hard)</button
			>
		</div>
	{:else if $gameStatus === 'OVER'}
		<h2>GAME OVER</h2>
		<StatBox />
		<button on:click={reset}>TRY AGAIN</button>
	{:else}
		<h2>VICTORY</h2>
		<StatBox />
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

	h2 {
		font-size: 5rem;
		margin-bottom: 1rem;
		background: #000000a8;
		padding: 1rem;
		border: 5px inset red;
		text-align: center;
	}

	button {
		font-size: 2rem;
		background: #000000a8;
		color: limegreen;
		padding: 1rem;
		border: 5px inset limegreen;
		cursor: pointer;
	}

	h3 {
		margin: 3rem auto 1rem;
		color: white;
		text-align: center;
	}

	button.diff {
		font-size: 1rem;
		color: white;
		border-color: grey;
		margin: 1rem;
	}

	div.diff-row {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: row wrap;
	}

	button.diff.EARTHER.selected {
		border-color: blue;
	}
	button.diff.MARTIAN.selected {
		border-color: red;
	}
	button.diff.BELTER.selected {
		border-color: goldenrod;
	}
</style>
