<script lang="ts">
	import FollowCam from '$lib/components/FollowCam.svelte';
	import type { RigidBody as RB, Vector } from '@dimforge/rapier3d-compat';
	import { T, useFrame } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import { useKeyboardControls } from 'svelte-kbc';
	import { writable, type Writable } from 'svelte/store';
	import { Vector3 } from 'three';
	import { playerRBInteger } from './state';

	let rbRef: RB;
	const { UP, LEFT, RIGHT } = useKeyboardControls();
	const rbX: Writable<number> = writable(0);
	const rbY: Writable<number> = writable(0);
	const rbZ: Writable<number> = writable(0);

	function updateRBPosition(rbPosition: Vector) {
		const { x, y, z } = rbPosition;
		rbX.set(Number(x.toFixed(1)));
		rbY.set(Number(y.toFixed(1)));
		rbZ.set(Number(z.toFixed(1)));
	}

	function handleMovement(direction: string) {
		let v3 = new Vector3();
		switch (direction) {
			case 'UP':
				rbRef.applyImpulse(v3.set(0, 0.815, 0), true);

				break;
			case 'LEFT':
				rbRef.applyImpulse(v3.set(-0.5, 0, 0), true);

				break;
			case 'RIGHT':
				rbRef.applyImpulse(v3.set(0.5, 0, 0), true);

				break;
			default:
				return;
		}
	}

	useFrame(() => {
		if (rbRef) {
			if (rbRef && $UP) {
				handleMovement('UP');
			}
			if (rbRef && $LEFT) {
				handleMovement('LEFT');
			}
			if (rbRef && $RIGHT) {
				handleMovement('RIGHT');
			}

			updateRBPosition(rbRef.translation());
		}
	});

  $: if (rbRef) playerRBInteger.set(rbRef.handle)

	// $: if (rbRef && $UP) {
	// 	handleMovement('UP');
	// }
	// $: if (rbRef && $LEFT) {
	// 	handleMovement('LEFT');
	// }
	// $: if (rbRef && $RIGHT) {
	// 	handleMovement('RIGHT');
	// }
</script>

<RigidBody
	position={{ y: 1.5 }}
	bind:rigidBody={rbRef}
	angularDamping={1}
	linearDamping={0}
	gravityScale={2}
	enabledRotations={[false, false, true]}
	enabledTranslations={[true, true, false]}
>
	<Collider shape="cone" args={[1.5, 1]} mass={1} restitution={0.2}/>
	<T.Mesh>
		<T.ConeGeometry args={[1, 3]} />
		<T.MeshStandardMaterial color="red" />
	</T.Mesh>
</RigidBody>

<FollowCam x={$rbX} y={$rbY} z={$rbZ} offset={{ x: 0, y: 10, z: 50 }} />
