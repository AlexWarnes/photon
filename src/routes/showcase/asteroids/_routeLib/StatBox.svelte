<script lang="ts">
	import { difficulty, displayPoints, gameStatus, reset, stats } from './state';
</script>

<div class="stat-box">
	<p class="diff-status">{$difficulty}</p>
	<p class="stat"><span>SCORE:</span> <span>{$displayPoints}</span></p>
	<p class="stat"><span>SHOTS:</span> <span>{$stats.shots}</span></p>
	<p class="stat"><span>HITS:</span> <span>{$stats.hits}</span></p>
	<p class="stat"><span>ACCURACY:</span> <span>{$stats.accuracy}%</span></p>
</div>

<style>
	.stat-box {
		padding: 1rem;
		margin: 1rem;
		max-width: 300px;
		width: 90%;
		background: #000000a8;
	}
	.stat-box .stat {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.diff-status {
		text-align: center;
		margin: 0 auto 1rem;
	}
</style>
