<script>
	import { SphereBufferGeometry } from 'three';
	import { Canvas, Mesh, DirectionalLight, AmbientLight } from '@threlte/core';
	import { Debug, World } from '@threlte/rapier';
	import Panel from '$lib/components/Panel.svelte';
	import { power, orbit, cloudyMaterial, gravity, debug } from './_routeLib/state';
	import CannonViewRig from './_routeLib/CannonViewRig.svelte';
	import TargetGroup from './_routeLib/TargetGroup.svelte';
	import ShiftyBlockers from './_routeLib/ShiftyBlockers.svelte';

	let fire = false;
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === ' ' || e.key === 'Spacebar') {
			e.preventDefault();
			fire = true;
		} 
	}}
/>

<div class="canvas-wrapper" on:click={() => (fire = true)}>
	<Canvas>
		<World>
			{#if $debug}
				<Debug />
			{/if}

			<DirectionalLight position={{ x: 100, y: 100, z: 100 }} />
			<AmbientLight intensity={0.75} />

			<!-- Background -->
			<Mesh
				geometry={new SphereBufferGeometry()}
				material={cloudyMaterial}
				scale={400}
				interactive
			/>

			<CannonViewRig bind:fire rotate={$orbit} power={$power} />
			<TargetGroup targetCount={14} />
			<ShiftyBlockers />
		</World>
	</Canvas>
	<div class="controls" on:click|stopPropagation>
		<Panel>
			<div class="input-wrapper">
				<label>
					Rotate
					<input type="checkbox" bind:checked={$orbit} />
				</label>
				<label>
					Physics Debug
					<input type="checkbox" bind:checked={$debug} />
				</label>
				<label class="power-label">
					Power: {$power}
					<input type="range" min="50" max="100" bind:value={$power} />
				</label>
				<label class="power-label">
					Gravity: {$gravity}
					<input type="range" step="0.1" min="0" max="1" bind:value={$gravity} />
				</label>
			</div>
		</Panel>
	</div>
</div>

<style>
	.canvas-wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.controls {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
	}
	.input-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	label:not(:last-child) {
		margin: 0 0 1rem;
	}
	.power-label input {
		display: block;
	}
</style>
