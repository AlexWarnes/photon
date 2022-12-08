<script lang="ts">
	import { useShader } from '$lib/utils/materials';
	import { T, useFrame } from '@threlte/core';
	import { Collider, Attractor } from '@threlte/rapier';
	import { BackSide, Vector2 } from 'three';
	import { rainbowFrag, } from '$lib/utils/test.glsl';
  const { uniforms } = useShader();
</script>

<Collider shape="ball" args={[10]} position={{ y: -5 }}>
	<T.Mesh scale={10}>
		<T.SphereGeometry />
		<!-- <T.MeshBasicMaterial color="black"/> -->
    <T.ShaderMaterial fragmentShader={rainbowFrag} uniforms={$uniforms} />
		<!-- <Attractor strength={1} gravityType="linear"/> -->
	</T.Mesh>
</Collider>

<T.Mesh scale={400}>
  <T.SphereGeometry />
  <T.MeshBasicMaterial side={BackSide} color="darkcyan"/>
  <!-- <T.ShaderMaterial side={BackSide} fragmentShader={morganFrag} uniforms={$uniforms} /> -->
</T.Mesh>
