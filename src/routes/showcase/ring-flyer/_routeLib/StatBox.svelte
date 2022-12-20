<script lang="ts">
	import { difficulty, gameStatus, handleLevelChange, level, stats, type Difficulty } from './state';
	const diffFactor = {
    "EASY": 1,
    "MEDIUM": 2,
    "HARD": 5
  }
  const calcTimePoints = (t: number): number => Math.round(120 - t < 0 ? 0 : 120 - t);
  const calcFuelPoints = (f: number): number => Math.round(f * 100);
  // const calcDifficultyPoints = (d: Difficulty): number => diffToPoints[d];


  $: displayStats = $stats.map(stat => {
    return {
      ...stat,
      timePoints: calcTimePoints(stat.time),
      fuelPoints: calcFuelPoints(stat.fuelRemaining),
    }
  })

  $: totalPoints = displayStats.reduce((acc, val) => acc + val.timePoints + val.fuelPoints, 0) * diffFactor[$difficulty]

</script>
<div class="stats-container">

{#each displayStats as stat, idx}
	<div class="stat-box">
		<div class="level-stats">
      <p class="level-id">Level {idx + 1}</p>
			<div class="row stat col-3">
				<p class="label">Time</p>
        <p class="value">{stat.time.toFixed(2)}s</p>
        <p class="item-points">+{stat.timePoints}</p>
			</div>
			<div class="row stat col-3">
        <p class="label">Fuel</p>
        <p class="value">{(stat.fuelRemaining * 100).toFixed(2)}%</p>
        <p class="item-points">+{stat.fuelPoints}</p>
			</div>
		</div>
	</div>
  {/each}
  <div class="row difficulty">
    <p class="label">Difficulty Factor</p>
    <p class="value">{$difficulty}</p>
    <p class="item-points">x{diffFactor[$difficulty]}</p>
  </div>
  <div class="row total">
    <p class="label">TOTAL POINTS</p>
    <p class="spacer" />
    <p class="item-points">{totalPoints}</p>
  </div>
</div>

<style>

  .stats-container {
    width: 100%;
    max-width: 320px;
    background: #000000c8;
    border: 1px solid #000000;
    padding: 0.75rem;
  }

  .stat-box {
    padding: 0.25rem 0.875rem 0.875rem;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat.row {
    padding: 0.25rem 0.25rem 0.25rem 1.25rem;
  }

  .total.row {
    font-size: 1.25rem;
    margin: 0.75rem 0 0;
    border-top: 2px solid limegreen;
    padding: 0.25rem 0 0;
  }

  .col-3 > * {
    width: 33%;
  }

  p {
    margin: 0;
  }

  .label, .level-id {
    font-weight: 600;
  }

  .level-id {
    border-bottom: 2px solid #b8860b;
  }
</style>
