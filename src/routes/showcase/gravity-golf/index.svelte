<script lang="ts" context="module">
const cloudyMaterial = new LayerMaterial({
  color: "#118be2",
  lighting: "basic",
  side: BackSide,
  layers: [
    new Noise({
      colorA: new Color("#c3c3c3").convertSRGBToLinear(),
      colorB: new Color("#f8f8f8").convertSRGBToLinear(),
      colorC: new Color("#218ed1").convertSRGBToLinear(),
      colorD: new Color("#118be2").convertSRGBToLinear(),
      alpha: 0.5,
      scale: 2,
      type: "perlin",
      offset: [0,0,0],
      mapping: "local",
      mode: "normal",
      visible: true,
    }),
    
  ]
});

const eclipseMaterial = new LayerMaterial({
  color: new Color("#152161").convertSRGBToLinear(),
  lighting: "standard",
  layers: [
    new Fresnel({
      color: new Color("#ed0c0c").convertSRGBToLinear(),
      alpha: 1,
      power: 2,
      intensity: 1,
      bias: 0,
      mode: "screen",
      visible: true,
    }),
    
  ]
});
    
    
</script>

<script>
	import { AxesHelper, BackSide, Color, DodecahedronBufferGeometry, GridHelper, MeshBasicMaterial, MeshStandardMaterial, SphereBufferGeometry } from 'three';
  import { Fresnel, LayerMaterial, Noise } from "lamina/vanilla";
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
	import Board from './_routeLib/Board.svelte';
	import Panel from '$lib/components/Panel.svelte';
	import { boardWidth, boardHeight, power, moveTo } from './_routeLib/state';
	import Cannon from './_routeLib/Cannon.svelte';
	import CubeTargets from './_routeLib/CubeTargets.svelte';
import CannonViewRig from './_routeLib/CannonViewRig.svelte';
import AxisHelper from '$lib/components/AxisHelper.svelte';
import TargetGroup from './_routeLib/TargetGroup.svelte';
  
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
      <!-- <Object3DInstance position={{x: 0, y: 0, z: 0}} object={new GridHelper(200)}/> -->

			<!-- <Board /> -->

			<Mesh
				geometry={new SphereBufferGeometry()}
				material={eclipseMaterial}
				scale={5}
			/>
			<Mesh
				geometry={new SphereBufferGeometry()}
				material={cloudyMaterial}
				scale={400}
			/>
        <!-- <Object3DInstance object={new AxesHelper( 5 )}/> -->
        <!-- <AxisHelper /> -->

      <CannonViewRig bind:fire/>
			<!-- <Group rotation={{ y: orbitRotation }}>
        <PerspectiveCamera position={{ y: 2, z: 103 }} fov={60} />
				<Cannon power={$power} bind:fire />
			</Group> -->
      <TargetGroup />
		</World>
	</Canvas>
	<div class="controls">
		<Panel>
			<label>
				LEFT
				<input type="radio" value="LEFT" bind:group={$moveTo} />
			</label>
			<label>
				CENTER
				<input type="radio" value="CENTER" bind:group={$moveTo} />
			</label>
			<label>
				RIGHT
				<input type="radio" value="RIGHT" bind:group={$moveTo} />
			</label>
			<label>
				Power
				<input type="range" min="1" max="100" bind:value={$power} />
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
