<script>
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
	import { mLevel } from './store';
	import MengerSponge from './MengerSponge.svelte';
	import Orb from './Orb.svelte';
	import Panel from '$lib/components/Panel.svelte';
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
			scale={200}
		/>

		<!-- MENGER INSTANCES -->
		<InstancedMesh
			id="m"
			interactive
			geometry={new BoxBufferGeometry()}
			material={new MeshStandardMaterial({
				color: '#fafbfc'
			})}
		>
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
				<input type="radio" value={1} bind:group={$mLevel} />
			</label>
			<label>
				Menger Level 2
				<input type="radio" value={2} bind:group={$mLevel} />
			</label>
			<label>
				Menger Level 3
				<input type="radio" value={3} bind:group={$mLevel} />
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
