<script lang="ts" context="module">
	const geometry = new SphereGeometry();
	const material = new MeshStandardMaterial({ color: new Color(2, 0, 0), flatShading: false });
</script>

<script lang="ts">
	import { Color, Material, MeshStandardMaterial, SphereGeometry } from 'three';
	import { T, InstancedMesh, Instance, type Scale } from '@threlte/core';
	import { RigidBody, Collider, CollisionGroups } from '@threlte/rapier';
	import AxisHelper from '$lib/components/AxisHelper.svelte';

	export let xPower: any;
	export let yPower: any;
	export let zPower: any;
	export let id: any;
	export let created: number;
	export let projectileMaterial: Material | undefined;
	export let castShadow: boolean = false;
	export let projectileScale: Scale = 0.5;
</script>

<CollisionGroups groups={[0]}>
<InstancedMesh {geometry} material={projectileMaterial || material} {castShadow}>
		<RigidBody
			linearVelocity={{ x: xPower, y: yPower, z: zPower }}
			gravityScale={1}
			rotation={{ x: Math.PI / 5 }}
		>
			<Collider shape={'ball'} args={[0.125]} mass={1} restitution={1} on:collisionenter>
				<Instance scale={projectileScale}>
					<T.AxesHelper args={[3]} />
				</Instance>
			</Collider>
		</RigidBody>
	</InstancedMesh>
</CollisionGroups>
