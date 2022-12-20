<script lang="ts">
	import StatBox from './StatBox.svelte';
	import { difficulty, gameStatus, handleLevelChange, level, stats } from './state';
</script>

<div class="box">
	{#if $gameStatus === 'READY'}
		<button on:click={() => ($gameStatus = 'PLAY')}>PLAY</button>
		{#if $level === 1}
			<h3 class="diff-label">DIFFICULTY: {$difficulty}</h3>
			<div class="difficulty-row">
				<button
					class="diff EASY"
					class:selected={$difficulty === 'EASY'}
					on:click={() => difficulty.set('EASY')}>EASY</button
				><button
					class="diff MEDIUM"
					class:selected={$difficulty === 'MEDIUM'}
					on:click={() => difficulty.set('MEDIUM')}>MEDIUM</button
				><button
					class="diff HARD"
					class:selected={$difficulty === 'HARD'}
					on:click={() => difficulty.set('HARD')}>HARD</button
				>
			</div>
		{/if}
	{:else if $gameStatus === 'LEVEL_WIN'}
		<h2>LEVEL COMPLETE</h2>
		<StatBox />
		<button on:click={() => handleLevelChange($level + 1)}>Next Level</button>
	{:else if $gameStatus === 'LOSE'}
		<h2>GAME OVER</h2>
		<StatBox />
		<button on:click={() => handleLevelChange(1)}>TRY AGAIN</button>
	{:else}
		<h2>VICTORY</h2>
		<StatBox />
		<button on:click={() => handleLevelChange(1)}>PLAY AGAIN</button>
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
		color: #fafbfc;
	}

	h2 {
		font-size: 4rem;
		margin-bottom: 1rem;
		padding: 0.75rem 1rem;
		background: #000000a8;
		text-align: center;
	}

	button {
		font-size: 1.75rem;
		background: #000000a8;
		color: limegreen;
		padding: 0.5rem;
		border: 5px inset limegreen;
		cursor: pointer;
		margin: 1rem auto 0;
	}

	h3 {
		margin: 3rem auto 1rem;
		color: white;
		text-align: center;
		background: #00000088;
		padding: 0.5rem;
	}

	button.diff {
		font-size: 1rem;
		color: white;
		border-color: grey;
		margin: 1rem;
	}

	button.diff.selected {
		border-color: limegreen;
	}
</style>
