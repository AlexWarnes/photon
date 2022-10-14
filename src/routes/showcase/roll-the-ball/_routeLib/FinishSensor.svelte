<script>
	import { derived } from "svelte/store";
	import { Object3DInstance, Group } from "@threlte/core";
	import { GLTF, useGltf } from "@threlte/extras";
	import { AutoColliders, Collider } from "@threlte/rapier";
	import { trackLength, status } from "./state";
/*	
	Model Information:
	title:	Basketball hoop
	source:	https://sketchfab.com/3d-models/basketball-hoop-82fda2cfa8974171ae64d4e434aa4b9b
	author:	hotdoghans (https://sketchfab.com/hotdoghans)
*/
	const url = "https://alexwarnes.github.io/assets/models/basketball_hoop/scene.gltf";
	const { gltf } = useGltf(url);
	const coffee = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes["Sketchfab_model"]) return
		return gltf.nodes["Sketchfab_model"];
	})
</script>

<Group position={{y: 2, z: -trackLength + 20}}>
	{#if $coffee} 
	<AutoColliders shape="trimesh"  scale={3} rotation={{y: -Math.PI / 2 }}>
		<Object3DInstance object={$coffee} />
	</AutoColliders>
	{/if}

	<!-- SENSOR	 -->
	<Collider shape="cuboid" sensor args={[1, 1, 1]}
		position={{x: 0, y: 13, z: 1}}
		on:sensorenter={() => $status = "DONE"}
	/>
</Group>
