<script lang="ts">
	import type { Vector3 } from 'three';

	export let groupLabel: string;
	export let value: Vector3;
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;
</script>

<p class="group-label">{groupLabel}</p>
<form on:change on:input class="vec-row">
	<label class="vec3"
		><span>x</span>
		<input class="vec3" type="number" {min} {max} {step} bind:value={value['x']} />
	</label>
	<label class="vec3"
		><span>y</span>
		<input class="vec3" type="number" {min} {max} {step} bind:value={value['y']} />
	</label>
	<label class="vec3"
		><span>z</span>
		<input class="vec3" type="number" {min} {max} {step} bind:value={value['z']} />
	</label>
</form>

<style>
	@import '../../styles/forms.css';

	.group-label {
		margin: 1rem 0 0.25rem;
	}
	.vec-row {
		width: 100%;
		padding: 0 0.25rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
</style>
