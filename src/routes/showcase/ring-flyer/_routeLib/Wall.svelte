<script lang="ts">
	import { useShader } from '$lib/utils/materials';
	import { rainbowFrag } from '$lib/utils/test.glsl';
	import { T } from '@threlte/core';
	import { AutoColliders, CollisionGroups } from '@threlte/rapier';
	export let position: [number, number, number];
	// export let rotation: [number, number, number] = [0, 0, 0];
	export let scale: [number, number, number] | number;
	export let colorful: boolean = false;
	const { uniforms } = useShader();
</script>

<CollisionGroups groups={[0]}>
	<AutoColliders shape="cuboid">
		<T.Mesh {scale} {position}>
			<T.BoxGeometry />
			{#if colorful}
				<T.ShaderMaterial fragmentShader={rainbowFrag} uniforms={$uniforms} />
			{:else}
				<T.MeshStandardMaterial color="black" />
			{/if}
		</T.Mesh>
	</AutoColliders>
</CollisionGroups>
