<script lang="ts" context="module">
	const geometry = new SphereBufferGeometry();
	const material = new MeshBasicMaterial({ color: '#161616' });
</script>

<script lang="ts">
	import {
		CylinderBufferGeometry,
		Material,
		MeshBasicMaterial,
		MeshStandardMaterial,
		SphereBufferGeometry,
    AxesHelper
	} from 'three';
	import { Mesh, useThrelte, Group, Object3DInstance } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	export let xPower: any;
	export let yPower: any;
	export let zPower: any;
	export let power: any;
	export let id: any;
	// export let config: any;
	export let projectileMaterial: Material | undefined;

</script>

<RigidBody
	linearVelocity={{ x: xPower, y: yPower, z: zPower }}
	type={'dynamic'}
	gravityScale={1}
  rotation={{x: Math.PI / 5}}
>
	<Collider shape={'ball'} args={[0.25]} mass={1000}>
		<Mesh {geometry} material={projectileMaterial || material} scale={0.5}>
      <Object3DInstance object={new AxesHelper( 5 )}/>
    </Mesh>
	</Collider>
</RigidBody>
