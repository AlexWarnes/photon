<script lang="ts">
	import { MeshBasicMaterial, SphereBufferGeometry, BackSide } from 'three';
	import {
		Canvas,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		type ThreltePointerEvent
	} from 'threlte';
	import { allowRandomness, pointerV3Event } from './_routeLib/treeState';
	import Panel from '$lib/components/Panel.svelte';
	// import HTree from './_routeLib/HTree.svelte';
	import Branch from './_routeLib/Branch.svelte';
	import SeedPod from './_routeLib/SeedPod.svelte';
	let showTree = true;
	function handleGrow() {
		showTree = false;
		setTimeout(() => (showTree = true));
	}

	function handlePointerMove(evt: ThreltePointerEvent | any) {
		$pointerV3Event = evt;
	}
</script>

<div class="canvas-wrapper">
	<Canvas>
		<PerspectiveCamera position={{ x: 0, y: 15, z: 30 }} fov={55}>
			<OrbitControls autoRotate enabled enableDamping target={{ x: 0, y: 10, z: 0 }} />
		</PerspectiveCamera>
		<!-- BACKGROUND -->
		<Mesh
			interactive
			on:pointermove={(e) => handlePointerMove(e)}
			geometry={new SphereBufferGeometry()}
			material={new MeshBasicMaterial({ color: '#060516', side: BackSide })}
			scale={400}
		/>

		<!-- BASE -->
		<SeedPod />

		<!-- TREE -->
		<!-- <HTree /> -->
		{#if showTree}
			<Branch />
		{/if}
	</Canvas>

	<!-- CONTROLS -->
	<div class="control">
		<Panel>
			<button on:click={handleGrow}>REGROW</button>
			<label>
				Allow Randomness
				<input type="checkbox" bind:checked={$allowRandomness} on:change={handleGrow} />
			</label>
		</Panel>
	</div>
</div>

<style>
	.canvas-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.control {
		position: absolute;
		left: 1rem;
		bottom: 1rem;
	}

	.control label {
		display: block;
		margin: 0.75rem 0;
	}

	button {
		background-color: deeppink;
		color: white;
		border: none;
		padding: 1rem;
		cursor: pointer;
	}
	button:hover {
		background-color: rgb(202, 14, 114);
	}
</style>
