<script lang="ts">
	import { useShader } from '$lib/utils/materials';
	import { T, } from '@threlte/core';
	import { Collider, } from '@threlte/rapier';
	import { rainbowFrag } from '$lib/utils/test.glsl';
	const { uniforms } = useShader();

	export let position = { x: 0, y: -0.5, z: 0 };
	export let rotation = { x: 0, y: 0, z: 0 };
</script>

<Collider shape="cuboid" args={[30.5, 0.5, 4]} {position} {rotation}>
	<T.Mesh>
		<T.BoxGeometry args={[61, 1, 8]} />
		<T.ShaderMaterial fragmentShader={rainbowFrag} uniforms={$uniforms} />
	</T.Mesh>
</Collider>
