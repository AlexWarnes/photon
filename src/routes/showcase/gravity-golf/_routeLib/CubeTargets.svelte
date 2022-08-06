<script lang="ts" context="module">
	const geometry = new BoxBufferGeometry();
	const material = new MeshStandardMaterial({ color: new Color('red').convertSRGBToLinear() });
	const baseMaterial = new MeshStandardMaterial({
		color: new Color('sandybrown').convertSRGBToLinear()
	});
	const laminaMaterial = new LayerMaterial({
		color: '#ffffff',
		lighting: 'standard',
		layers: [
			new Noise({
				colorA: new Color('#161616').convertSRGBToLinear(),
				colorB: new Color('#ff1744'),
				colorC: new Color('#390404').convertSRGBToLinear(),
				colorD: new Color('#1976d2'),
				alpha: 1,
				scale: 5,
				type: 'white',
				offset: [0, 0, 0],
				mapping: 'local',
				mode: 'normal',
				visible: true
			})
		]
	});

        
        
        
  const eclipseMaterial = new LayerMaterial({
  color: new Color("#152161").convertSRGBToLinear(),
  lighting: "standard",
  layers: [
    new Fresnel({
      color: new Color("#ed0c0c").convertSRGBToLinear(),
      alpha: 1,
      power: 2,
      intensity: 1,
      bias: 0,
      mode: "screen",
      visible: true,
    }),
    
  ]
});
    
    
    

	const groundMaterial = new LayerMaterial({
		color: 'sandybrown',
		lighting: 'standard',
		layers: [
			new Noise({
				colorA: new Color('#d16500').convertSRGBToLinear(),
				colorB: new Color('#994500').convertSRGBToLinear(),
				colorC: new Color('#311d02').convertSRGBToLinear(),
				colorD: new Color('#186586').convertSRGBToLinear(),
				alpha: 0.5,
				scale: 1,
				type: 'white',
				offset: [0, 0, 0],
				mapping: 'local',
				mode: 'normal',
				visible: true
			})
		]
	});
</script>

<script lang="ts">
	import { MeshStandardMaterial, BoxBufferGeometry, Color } from 'three';
	import { Mesh, Group } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import { randomVec3 } from '$lib';
	import { randInt } from 'three/src/math/MathUtils';
	import { LayerMaterial, Noise, Fresnel, } from 'lamina/vanilla';
	export let cubeCount = randInt(3, 10);
	const cubeStack = Array(cubeCount)
		.fill('x')
		.map((_, idx) => {
			return {
				dimension: 1 - idx / 10
			};
		});
	const position = randomVec3({ x: [-30, 30], y: [-25, 5], z: [-30, 70] });
</script>

<Group {position}>
	{#each cubeStack as cube, idx}
		<RigidBody type={'dynamic'} gravityScale={1} position={{ y: idx + cube.dimension }}>
			<Collider
				shape={'cuboid'}
				args={[cube.dimension / 2, cube.dimension / 2, cube.dimension / 2]}
			/>
			<Mesh {geometry} material={eclipseMaterial} scale={cube.dimension} />
		</RigidBody>
	{/each}

	<!-- BASE -->
	<Collider shape={'cuboid'} args={[10, 0.5, 5]}>
		<Mesh {geometry} material={groundMaterial} scale={{ x: 20, y: 1, z: 10 }} />
	</Collider>
</Group>
