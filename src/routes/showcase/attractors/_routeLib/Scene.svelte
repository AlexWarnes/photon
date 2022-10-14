<script>
	import {
		PerspectiveCamera,
		DirectionalLight,
		AmbientLight,
		OrbitControls,
	} from '@threlte/core';
	import Objects from "./Objects.svelte";
</script>

<PerspectiveCamera  position={{ x: 0, y: 0, z: 400, }} fov={65} far="{1000}">
		<OrbitControls />
</PerspectiveCamera>

<DirectionalLight position={{x: 10, y: 10, z: 0}}/>
<AmbientLight intensity={0.35} />

<Objects />
