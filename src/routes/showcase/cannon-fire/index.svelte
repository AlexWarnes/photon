<script>
	import {
		AxesHelper,
		BackSide,
		Color,
		DodecahedronBufferGeometry,
		GridHelper,
		MeshBasicMaterial,
		MeshPhysicalMaterial,
		MeshStandardMaterial,
		SphereBufferGeometry
	} from 'three';
	import { Fresnel, LayerMaterial, Noise } from 'lamina/vanilla';
	import {
		Canvas,
		PerspectiveCamera,
		OrbitControls,
		Mesh,
		DirectionalLight,
		AmbientLight,
		Group,
		useFrame,
		Object3DInstance
	} from '@threlte/core';
	import { Debug, World } from '@threlte/rapier';
	import Panel from '$lib/components/Panel.svelte';
	import { power, orbit, } from './_routeLib/state';
	import CannonViewRig from './_routeLib/CannonViewRig.svelte';
	import TargetGroup from './_routeLib/TargetGroup.svelte';
	import { glazeProps } from '$lib/utils/materials';
import ShiftyBlockers from './_routeLib/ShiftyBlockers.svelte';

	let fire = false;
</script>

<div class="canvas-wrapper" on:click={() => (fire = true)}>
	<Canvas>
		<World>
			<Debug />
			<!-- <PerspectiveCamera position={{ y: 2, z: 103 }} fov={60}>
				<OrbitControls />
			</PerspectiveCamera> -->

			<DirectionalLight position={{ x: 100, y: 100, z: 100 }} />
			<AmbientLight />
			<Object3DInstance position={{x: 0, y: 0, z: 0}} object={new GridHelper(200)}/>

			<!-- <Board /> -->

			<!-- <Mesh
				geometry={new SphereBufferGeometry()}
				material={new MeshPhysicalMaterial(glazeProps)}
				scale={5}
			/> -->
			<Mesh
				geometry={new SphereBufferGeometry()}
				material={new MeshBasicMaterial({
					color: new Color('lightskyblue').convertSRGBToLinear(),
					side: BackSide
				})}
				scale={400}
				interactive
				on:click={() => console.log('bgClick')}
			/>
			<!-- <Object3DInstance object={new AxesHelper( 5 )}/> -->
			<!-- <AxisHelper /> -->

			<CannonViewRig bind:fire />
			<TargetGroup targetCount={14} />
			<ShiftyBlockers />
		</World>
	</Canvas>
	<div class="controls" on:click|stopPropagation>
		<Panel>
			<label>
				Orbit
				<input type="checkbox" bind:checked={$orbit} />
			</label>
			<label>
				Power
				<input type="range" min="10" max="100" bind:value={$power} />
			</label>
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
	label {
		display: block;
	}
</style>
