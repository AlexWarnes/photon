<script lang="ts">
	import { GLTF } from '@threlte/extras';

	// import Reticule from './Reticule.svelte';
	export let rotX: number = 0;
	export let rotZ: number = 0;
</script>

<GLTF
	url="https://alexwarnes.github.io/assets/models/starfox_ship/scene.gltf"
	rotation={{ x: rotX, y: Math.PI, z: rotZ }}
	position={{ y: -1.9, z: -4 }}
>
	<!-- <Reticule TODO /> -->
</GLTF>
