<script lang="ts" context="module">
	const geometry = new SphereBufferGeometry();
	const material = new MeshBasicMaterial({ color: '#161616' });
</script>

<script lang="ts">
	import { Material, MeshBasicMaterial, SphereBufferGeometry, AxesHelper } from 'three';
	import { InstancedMesh, Instance } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import AxisHelper from '$lib/components/AxisHelper.svelte';
	export let xPower: any;
	export let yPower: any;
	export let zPower: any;
	export let id: any;
	export let created: number;
	export let projectileMaterial: Material | undefined;
</script>

<InstancedMesh {geometry} material={projectileMaterial || material}>
	<RigidBody
		linearVelocity={{ x: xPower, y: yPower, z: zPower }}
		type={'dynamic'}
		gravityScale={1}
		rotation={{ x: Math.PI / 5 }}
	>
		<Collider shape={'ball'} args={[0.5]} mass={500}>
			<Instance scale={0.5}>
				<AxisHelper length={3} />
			</Instance>
		</Collider>
	</RigidBody>
</InstancedMesh>
