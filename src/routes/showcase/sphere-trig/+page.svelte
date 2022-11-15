<script lang="ts">
	import { Canvas, PerspectiveCamera, OrbitControls, Object3DInstance } from '@threlte/core';
	import { AxesHelper } from 'three';
	import InstMeshDots from './_routeLib/InstMeshDots.svelte';
	import Formula from './_routeLib/Formula.svelte';
	import type { TrigFn, ZDimension, ZFactor } from './_routeLib/dataUtils';
	import Spinner from './_routeLib/Spinner.svelte';
	let count = 5000;
	let fn: TrigFn = '';
	let zFactor: ZFactor = 'instanceRadius - maxRadius';
	let zDimension: ZDimension = 'random';
	let showCode = false;
	let disableInputs = false;

	const fnOptions: TrigFn[] = ['', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan'];
	const zFactorOptions: ZFactor[] = [
		'instanceRadius - maxRadius',
		'maxRadius - instanceRadius',
		'maxRadius / instanceRadius',
		'maxRadius',
		'instanceRadius',
		'x',
		'y',
		'sqrt(x^2 + y^2)',
		'maxRadius - sqrt(x^2 + y^2)',
		'instanceRadius - sqrt(x^2 + y^2)'
	];
	const zDimensionOptions: ZDimension[] = ['positive', 'negative', 'random'];
</script>

<div class="canvas-wrapper">
	<Canvas>
		<Object3DInstance object={new AxesHelper(100)} />
		<PerspectiveCamera position={{ y: 100, z: 350 }} far={2000} fov={55}>
			<OrbitControls autoRotate={true} />
		</PerspectiveCamera>
		<InstMeshDots {count} {fn} {zFactor} {zDimension} bind:disableInputs />
	</Canvas>

	<div class="controls">
		<span class="spin-wrapper">
			<Spinner show={disableInputs} />
		</span>
		<label
			>Count: {count}
			<input
				type="range"
				bind:value={count}
				step="500"
				min="500"
				max="20000"
				disabled={disableInputs}
			/>
		</label>
		<label
			>z trig fn
			<select bind:value={fn} disabled={disableInputs}>
				{#each fnOptions as option (option)}
					<option value={option}>{option}</option>
				{/each}
			</select>
		</label>
		<label
			>zDimension
			<select bind:value={zDimension} disabled={disableInputs}>
				{#each zDimensionOptions as option (option)}
					<option value={option}>{option}</option>
				{/each}
			</select>
		</label>
		<label
			>zFactor
			<select bind:value={zFactor} disabled={disableInputs}>
				{#each zFactorOptions as option (option)}
					<option value={option}>{option}</option>
				{/each}
			</select>
		</label>
		<label class="show-code-label">
			<input type="checkbox" bind:checked={showCode} />
			Show Pseudocode:
		</label>
		{#if showCode}
			<div class="formula-box">
				<Formula {fn} {zFactor} {zDimension} />
			</div>
		{/if}
	</div>
</div>

<style>
	.canvas-wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		background: #161616;
		font-size: 0.875rem;
	}
	.controls {
		position: absolute;
		top: 1rem;
		left: 1rem;
		padding: 0.5rem;
		background-color: #00000088;
		color: #fafbfc;
	}
	.formula-box {
		position: absolute;
		left: 0;
		background-color: #00000088;
		padding: 0.75rem;
		margin: 1rem 0 0;
	}
	input {
		display: block;
	}
	label {
		display: flex;
		justify-content: space-between;
		flex-flow: column;
	}
	.show-code-label {
		display: flex;
		flex-flow: row;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		margin: 1.5rem 0 0;
		font-weight: 600;
		font-size: 1rem;
	}
	.show-code-label input {
		margin: 0;
	}

	.spin-wrapper {
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
	}
</style>
