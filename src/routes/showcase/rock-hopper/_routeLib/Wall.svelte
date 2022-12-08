<script lang="ts">
	import { T, } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	export let position: [number, number, number];
	// export let rotation: [number, number, number] = [0, 0, 0];
	export let scale: [number, number, number] | number;
</script>

<AutoColliders shape="cuboid">
	<T.Mesh {scale} {position} >
	<!-- <T.Mesh {scale} {position} > -->
		<T.BoxGeometry />
		<T.MeshBasicMaterial color="black" />
	</T.Mesh>
</AutoColliders>
