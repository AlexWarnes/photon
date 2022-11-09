<script lang="ts">
	import { GLTF } from '@threlte/extras';
	import { Collider } from '@threlte/rapier';

	// import Reticule from './Reticule.svelte';
	export let rotX: number = 0;
	export let rotZ: number = 0;
</script>

<Collider
	shape="cuboid"
	args={[5, 2, 5]}
	rotation={{ x: rotX, y: Math.PI, z: rotZ }}
	position={{ y: -1.9, z: -4 }}
  sensor
  on:sensorenter={(e) => console.log("SENSOR:", e)}
>
	<GLTF url="https://alexwarnes.github.io/assets/models/starfox_ship/scene.gltf">
		<!-- <Reticule TODO /> -->
	</GLTF>
</Collider>
