<script lang="ts">
	import { useShader } from '$lib/utils/materials';
	import { T, useFrame } from '@threlte/core';
	import { Collider, Attractor, AutoColliders } from '@threlte/rapier';
	import { BackSide, Color, Vector2 } from 'three';
	import { rainbowFrag, } from '$lib/utils/test.glsl';
	import { LayerMaterial, Gradient } from 'lamina/vanilla';
  const { uniforms } = useShader();
                
const sunsetMaterial = new LayerMaterial({
  color: "#d9d9d9",
  lighting: "standard",
	side: BackSide,
  layers: [
    new Gradient({
      colorA: new Color("#110613"),
      colorB: new Color("#f86363"),
      alpha: 1,
      contrast: 2,
      start: 0,
      end: -3,
      axes: "y",
      mapping: "local",
      visible: true,
    }),
    
  ]
});

</script>

<Collider shape="cuboid" args={[30.5, 0.5, 4]} position={{ y: -0.5 }}>
	<T.Mesh>
		<T.BoxGeometry args={[61, 1, 8]} />
    <T.ShaderMaterial fragmentShader={rainbowFrag} uniforms={$uniforms} />
	</T.Mesh>
</Collider>

<!-- Background -->
<T.Mesh scale={800} material={sunsetMaterial}>
  <T.SphereGeometry />
</T.Mesh>
