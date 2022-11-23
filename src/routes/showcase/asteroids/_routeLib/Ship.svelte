<script lang="ts">
	/**
	 * Model Information:
		* title:	low poly space ship
		* source:	https://sketchfab.com/3d-models/low-poly-space-ship-587941c9c11742c6b82dfb99e7b210b9
		* author:	chrisonciuconcepts (https://sketchfab.com/chrisonciuconcepts)

		Model License:
		* license type:	CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
		* requirements:	Author must be credited. Commercial use is allowed.

		If you use this 3D model in your project be sure to copy paste this credit wherever you share it:
		This work is based on "low poly space ship" (https://sketchfab.com/3d-models/low-poly-space-ship-587941c9c11742c6b82dfb99e7b210b9) by chrisonciuconcepts (https://sketchfab.com/chrisonciuconcepts) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
	*/

	import { GLTF } from '@threlte/extras';

	// import Reticule from './Reticule.svelte';
	export let rotX: number = 0;
	export let rotZ: number = 0;
</script>

<GLTF
	url="https://alexwarnes.github.io/assets/models/starfox_ship/scene.gltf"
	rotation={{ x: rotX, y: Math.PI, z: rotZ }}
>
	<!-- <Reticule TODO /> -->
</GLTF>
