<script lang="ts">
	import { MeshStandardMaterial, Vector3, SphereGeometry, MeshBasicMaterial } from 'three';
	import { Collider, RigidBody } from '@threlte/rapier';
	import { Mesh } from '@threlte/core';
	import { nbodyCount, dynamicAttractors } from './systemState';
	import Attractor from '$lib/components/Attractor.svelte';
	import { randomVec3 } from '$lib';

	$: attractors = [
		{
			id: 'LEFT',
			pos: { x: -100 },
			m: 15,
			range: 75
		},
		{
			id: 'CENTER',
			pos: { x: 0, y: 50 },
			m: 15,
			range: 75
		},
		{
			id: 'RIGHT',
			pos: { x: 100 },
			m: 15,
			range: 75
		}
	];
	$: randomBodies = Array($nbodyCount)
		.fill('x')
		.map((_) => {
			return {
				id: Date.now() + Math.random(),
				pos: randomVec3({ x: [-75, 75], y: [25, 50], z: [-40, 40] }),
				lv: randomVec3({ x: [-2, 2], y: [0, -5], z: [-2, 2] })
			};
		});
</script>

{#each attractors as body (body.id)}
	{#if $dynamicAttractors}
		<RigidBody position={body.pos}>
			<Collider shape="ball" args={[0.5]} mass={body.m * 2} />
			<Mesh
				geometry={new SphereGeometry()}
				scale={0.5}
				material={new MeshBasicMaterial({ color: 'gold' })}
			/>
			<Mesh
				geometry={new SphereGeometry()}
				scale={body.range * 1.5}
				material={new MeshBasicMaterial({
					wireframe: true,
					transparent: true,
					opacity: 0.125,
					color: 'cyan'
				})}
			/>

			<Attractor
				strength={body.m}
				gravityType="linear"
				gravitationalConstant={0.26674}
				range={body.range * 1.5}
			/>
		</RigidBody>
	{:else}
		<Mesh
			position={body.pos}
			geometry={new SphereGeometry(0.5)}
			material={new MeshBasicMaterial({ color: 'gold' })}
		>
			<Mesh
				geometry={new SphereGeometry()}
				scale={body.range}
				material={new MeshBasicMaterial({
					wireframe: true,
					transparent: true,
					opacity: 0.125,
					color: 'cyan'
				})}
			/>

			<Attractor
				strength={body.m}
				gravityType="linear"
				gravitationalConstant={0.26674}
				range={body.range}
			/>
		</Mesh>
	{/if}
{/each}

{#each randomBodies as body}
	<RigidBody position={body.pos.multiplyScalar(3)} linearVelocity={body.lv}>
		<Collider shape="ball" args={[1]} mass={1} />
		<Mesh
			geometry={new SphereGeometry()}
			scale={1}
			material={new MeshBasicMaterial({ color: 'red' })}
		/>
	</RigidBody>
{/each}
