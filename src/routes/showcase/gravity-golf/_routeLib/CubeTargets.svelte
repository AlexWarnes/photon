<script lang="ts" context="module">
	const geometry = new BoxBufferGeometry();
	const material = new MeshStandardMaterial({ color: 'salmon' });
	const baseMaterial = new MeshStandardMaterial({ color: 'seagreen' });
</script>

<script lang="ts">
	import { MeshStandardMaterial, BoxBufferGeometry } from 'three';
	import { Mesh, Group } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import { randomVec3 } from '$lib';
import { randInt } from 'three/src/math/MathUtils';
  export let cubeCount = randInt(3, 10);
	const cubeStack = Array(cubeCount).fill('x');
	const position = randomVec3({ x: [-30, 30], y: [-25, 5], z: [-30, 70] });
</script>

<Group {position}>
	{#each cubeStack as _, idx}
		<RigidBody type={'dynamic'} gravityScale={1} position={{ y: idx + 1 }}>
			<Collider shape={'cuboid'} args={[0.5, 0.5, 0.5]} />
			<Mesh {geometry} {material} />
		</RigidBody>
	{/each}

	<!-- BASE -->
	<Collider shape={'cuboid'} args={[10, 0.5, 5]}>
		<Mesh {geometry} material={baseMaterial} scale={{ x: 20, y: 1, z: 10 }} />
	</Collider>
</Group>
