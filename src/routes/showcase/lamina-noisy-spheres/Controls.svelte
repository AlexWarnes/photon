<script lang="ts">
	import { noiseScale } from "./store";
	let scaleValue: number = 3;
	$: noiseScale.set(scaleValue)
</script>

<div class="controls">
	<label>Noise Scale:
		<span>{scaleValue}</span>
		<input 
			type="range" 
			min="1" 
			max="10" 
			bind:value={scaleValue} 
		/>
	</label>
</div>

<style>
	.controls {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		padding: 1rem;
		background: #000;
		color: #ffffff;
		border: 1px solid #1976d288;
		border-radius: 4px;
		font-family: Verdana;
	}
	
	input {
		display: block;
		margin: 0;
	}
</style>