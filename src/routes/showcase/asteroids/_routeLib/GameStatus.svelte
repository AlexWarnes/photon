<script lang="ts">
	import { gameStatus } from './state';
</script>

<div class="box">
	{#if $gameStatus === 'READY'}
		<button on:click={() => ($gameStatus = 'PLAY')}>PLAY</button>
	{:else if $gameStatus === 'OVER'}
		<h2>GAME OVER</h2>
		<button on:click={() => ($gameStatus = 'READY')}>TRY AGAIN</button>
	{:else}
  <h2>VICTORY</h2>
  <button on:click={() => ($gameStatus = 'READY')}>PLAY AGAIN</button>
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
		background-color: #00000018;
		position: fixed;
		top: 0;
		left: 0;
    color: red;
	}

  h2 {
    font-size: 5rem;
    background: #000000a8;
    padding: 1rem;
    border: 5px inset red;
  }

  button {
    font-size: 2rem;
    background: black;
    color: limegreen;
    padding: 1rem;
    border: 5px inset limegreen;
  }

</style>
