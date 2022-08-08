<script lang="ts" context="module">
	const geometry = new BoxBufferGeometry();
	const maxCubes = 10;
	const cubeMaterials = Array(maxCubes)
		.fill('x')
		.map(() => {
			if (Math.random() > 0.8) {
				return new MeshPhysicalMaterial({ color: randomColor(), ...glazeProps });
			} else {
				return new MeshStandardMaterial({ color: randomColor() });
			}
		});

	const groundMaterial = new LayerMaterial({
		color: '#d9d9d9',
		lighting: 'standard',
		layers: [
			new Gradient({
				colorA: new Color('#145b09').convertSRGBToLinear(),
				colorB: new Color('#9e5b3b').convertSRGBToLinear(),
				alpha: 1,
				contrast: 20,
				start: 3,
				end: -1,
				axes: 'y',
				mapping: 'local',
				visible: true
			})
		]
	});
</script>

<script lang="ts">
	import { BoxBufferGeometry, Color, MeshStandardMaterial, MeshPhysicalMaterial } from 'three';
	import { InstancedMesh, Instance, Group, Mesh } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import { randomColor, randomVec3 } from '$lib';
	import { randInt } from 'three/src/math/MathUtils';
	import { LayerMaterial, Gradient } from 'lamina/vanilla';
	import { gravity } from './state';
	import { glazeProps } from '$lib/utils/materials';
	export let cubeCount = randInt(3, maxCubes);
	export let inner: boolean = false;
	const groundHeight = 1;
	const cubeStack = Array(cubeCount)
		.fill('x')
		.map((_, idx) => {
			return {
				// dimension: 2 - idx / 5
				dimension: 2
			};
		});
	const position = inner ? randomVec3() : randomVec3({ x: [-60, 60], y: [-25, 5], z: [-60, 60] });
</script>

<Group {position}>
	{#each cubeStack as cube, idx}
		<InstancedMesh {geometry} material={cubeMaterials[idx]}>
			<RigidBody
				type={'dynamic'}
				gravityScale={$gravity || 1}
				position={{ y: idx * 1.05 * cube.dimension + (groundHeight / 2 + cube.dimension / 2) }}
			>
				<Collider
					shape={'cuboid'}
					args={[cube.dimension / 2, cube.dimension / 2, cube.dimension / 2]}
				/>
				<Instance scale={cube.dimension} />
			</RigidBody>
		</InstancedMesh>
	{/each}

	<!-- BASE -->
	<Collider shape={'cuboid'} args={[5, groundHeight / 2, 5]}>
		<Mesh {geometry} material={groundMaterial} scale={{ x: 10, y: groundHeight, z: 10 }} />
	</Collider>
</Group>
