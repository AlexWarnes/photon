<script lang="ts" context="module">
	const geometry = new SphereGeometry();
	const material = new MeshBasicMaterial({ color: '#161616' });
</script>

<script lang="ts">
	import { Material, MeshBasicMaterial, SphereGeometry, } from 'three';
	import { InstancedMesh, Instance, type Scale } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import AxisHelper from '$lib/components/AxisHelper.svelte';
	export let xPower: any;
	export let yPower: any;
	export let zPower: any;
	export let id: any;
	export let created: number;
	export let projectileMaterial: Material | undefined;
	export let castShadow: boolean;
	export let projectileScale: number;
</script>

<InstancedMesh {geometry} material={projectileMaterial || material} {castShadow}>
	<RigidBody
		linearVelocity={{ x: xPower, y: yPower, z: zPower }}
		gravityScale={1}
		rotation={{ x: Math.PI / 5 }}
	>
		<Collider shape={'ball'} args={[projectileScale]} mass={500} restitution={1}>
			<Instance scale={projectileScale}>
				<!-- <AxisHelper length={projectileScale + 1} /> -->
			</Instance>
		</Collider>
	</RigidBody>
</InstancedMesh>
