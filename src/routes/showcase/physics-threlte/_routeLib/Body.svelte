<script lang="ts" context="module">
	let geometry = new OctahedronBufferGeometry();
</script>

<script lang="ts">
	import { MeshStandardMaterial, OctahedronBufferGeometry } from 'three';
	import { Mesh, type ThreltePointerEvent } from '@threlte/core';
	import { RigidBody, AutoColliders } from '@threlte/rapier';
	import { handleShockwaveChange } from './state';
	import { randFloat } from 'three/src/math/MathUtils';

	export let body: any;
	let material = new MeshStandardMaterial({ color: body.color });
	function handleClick(evt: CustomEvent<ThreltePointerEvent>): void {
		handleShockwaveChange(evt.detail.point);
	}
</script>

<RigidBody
	type={'dynamic'}
	position={body.position}
	rotation={body.rotation}
	gravityScale={randFloat(0.1, 0.5)}
>
	<AutoColliders shape={'convexHull'}>
		<Mesh interactive on:click={handleClick} {geometry} {material} />
	</AutoColliders>
</RigidBody>
