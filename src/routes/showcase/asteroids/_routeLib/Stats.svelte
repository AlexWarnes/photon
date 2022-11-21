<script>
	import Panel from '$lib/components/Panel.svelte';
	import { slide } from 'svelte/transition';
	import { displayPoints, stats, orthoMode, gameStatus } from './state';
</script>

<Panel>
	<div class="stats-row">
		<p>
			<span>SCORE:</span><span> {$displayPoints}</span>
		</p>
		<!-- <p>SHOTS: {$stats.shots}</p> -->
		<!-- <p>HITS: {$stats.hits}</p> -->
		<p>
			<span>ACC:</span><span> {$stats.accuracy}%</span>
		</p>

		{#if $orthoMode && $gameStatus === 'PLAY'}
			<p transition:slide class="ortho-warning">DESTROY AN ASTEROID TO ESCAPE ORTHO-MODE!</p>
		{/if}
	</div>
</Panel>

<style>
	.stats-row {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	p {
		margin: 0 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-flow: row wrap;
		color: red;
		text-transform: uppercase;
		font-variant-numeric: tabular-nums;
	}

	.ortho-warning {
		position: fixed;
		top: 9rem;
		right: -1rem;
		max-width: 100%;
		width: 375px;
		border: 3px inset goldenrod;
		padding: 0.75rem;
		background-color: #000000a8;
		color: goldenrod;
	}
</style>
