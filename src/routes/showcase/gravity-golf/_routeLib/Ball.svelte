<script lang="ts" context="module">
	let geometry = new SphereBufferGeometry();
</script>

<script lang="ts">
	import { MeshStandardMaterial, SphereBufferGeometry } from 'three';
	import { Mesh, type Position, type ThreltePointerEvent } from '@threlte/core';
	import { RigidBody, AutoColliders } from '@threlte/rapier';
	import { randFloat } from 'three/src/math/MathUtils';
  import { bumperCount } from "./state";
	export let position: Position;
	export let rotation: any = undefined;
	let drop: boolean = false;
	let material = new MeshStandardMaterial({ color: 'grey' });
	function handleClick(evt: CustomEvent<ThreltePointerEvent>): void {
		// drop
    drop = true;
	}
</script>

{#if drop}
	<RigidBody linearVelocity={{z:$bumperCount}} type={'dynamic'} {position} {rotation} gravityScale={1}>
		<AutoColliders shape={'convexHull'}>
			<Mesh {geometry} {material} />
		</AutoColliders>
	</RigidBody>
{:else}
	<Mesh interactive on:click={handleClick} {position} {rotation} {geometry} {material} />
{/if}
