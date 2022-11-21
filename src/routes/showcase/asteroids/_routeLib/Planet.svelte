<script lang="ts">
	import { Mesh, useFrame, useTexture } from '@threlte/core';
	import { Collider } from '@threlte/rapier';
	import { MeshBasicMaterial, MeshStandardMaterial, SphereGeometry } from 'three';

	const textures = useTexture({
		// map: '/assets/textures/moonMap_2k.jpeg',
		bumpMap: '/assets/textures/moonBump_2k.jpeg'
	});
	const material = new MeshStandardMaterial({ ...textures, metalness: 0.5, roughness: 0.5 });

	let r = 0;
	useFrame((_, delta) => {
		r -= 0.1 * delta;
	});
</script>

<Collider position={{ z: 0 }} shape="ball" args={[350]} rotation={{ z: Math.PI / 2 }}>
	<Mesh geometry={new SphereGeometry(1, 128, 32)} {material} scale={350} />
</Collider>

<Mesh
	geometry={new SphereGeometry()}
	material={new MeshBasicMaterial({ color: 'cyan', wireframe: true })}
	scale={355}
	rotation={{ z: Math.PI / 2 }}
/>
