<script lang="ts">
	import {
		BoxBufferGeometry,
		MeshStandardMaterial,
		MeshBasicMaterial,
		SphereBufferGeometry,
		BackSide
	} from 'three';
	import {
		Canvas,
		DirectionalLight,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		InstancedMesh
	} from 'threlte';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicIn } from 'svelte/easing';
	import { mLevel } from './_routeLib/store';
	import MengerSponge from './_routeLib/MengerSponge.svelte';
	import Orb from './_routeLib/Orb.svelte';
	import Panel from '$lib/components/Panel.svelte';

	const geo = new BoxBufferGeometry();
	const mat = new MeshStandardMaterial({
		color: '#fafbfc'
	});

	const s = tweened(0, { duration: 750, });
	function scaleOnLevelChange() {
		s.set(0).then(() => s.set(1));
	}

	onMount(() => s.set(1, { delay: 750 }));
</script>

<div class="canvas-wrapper">
	<Canvas>
		<PerspectiveCamera position={{ x: -8, y: 8, z: 8 }}>
			<OrbitControls enabled enableDamping />
		</PerspectiveCamera>

		<DirectionalLight intensity={0.25} color={'dodgerblue'} position={{ x: -15, y: 45, z: 20 }} />

		<!-- BACKGROUND -->
		<Mesh
			geometry={new SphereBufferGeometry()}
			material={new MeshBasicMaterial({ color: '#ff92cf', side: BackSide })}
			scale={400}
		/>

		<!-- MENGER INSTANCES -->
		<InstancedMesh id="m" interactive geometry={geo} material={mat} scale={$s}>
			<MengerSponge level={$mLevel} />
		</InstancedMesh>

		<!-- LIGHT/ORB -->
		<Orb />
	</Canvas>

	<!-- MENGER LEVEL CONTROLS -->
	<div class="control">
		<Panel>
			<label>
				Menger Level 1
				<input type="radio" on:click={scaleOnLevelChange} value={1} bind:group={$mLevel} />
			</label>
			<label>
				Menger Level 2
				<input type="radio" on:click={scaleOnLevelChange} value={2} bind:group={$mLevel} />
			</label>
			<label>
				Menger Level 3
				<input type="radio" on:click={scaleOnLevelChange} value={3} bind:group={$mLevel} />
			</label>

			<!-- WARNING WARNING WARNING -->
			<!-- Do not exceed Menger Level 3 unless you have something very powerful to run these. -->
			<!-- Use at your own risk. But also share if you do because if it works I bet it would look really cool.  -->
			<!-- WARNING WARNING WARNING -->

			<!-- <label>
			Menger Level 4
			<input type="radio" value={4} bind:group={$mLevel} />
		</label>
		<label>
			Menger Level 5
			<input type="radio" value={5} bind:group={$mLevel} />
		</label>
		<label>
			Menger Level 6
			<input type="radio" value={6} bind:group={$mLevel} />
		</label> -->
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
</style>
