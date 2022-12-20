<script lang="ts">
	import Shader from '$lib/components/Shader.svelte';
	import { randomVec3 } from '$lib/utils/vectors';
	import { OrbitControls, T } from '@threlte/core';
	import { Attractor, Collider } from '@threlte/rapier';
	import StartingBlock from './StartingBlock.svelte';
	import Effects from './Effects.svelte';
	import EnemyTurret from './EnemyTurret.svelte';
	import Player from './Player.svelte';
	import { difficultyToROFMap, difficulty, gameStatus } from './state';
	import FinishBlock from './FinishBlock.svelte';
	import Wall from './Wall.svelte';
	import Background from './Background.svelte';
	import type { Vector3Tuple } from 'three';
	import StarField from '$lib/components/StarField.svelte';

	const turretPositions: Vector3Tuple[] = [
		[0, 25, 0],
		[0, 75, 0],
		[0, 125, 0],
		[0, 175, 0],
		[0, 250, 0],
		[30, 275, 0],
		[60, 265, 0],
		[90, 285, 0],
		[120, 265, 0],
		[150, 285, 0],
		[180, 265, 0],
		[210, 285, 0],
		[240, 265, 0],
		[270, 285, 0],
		[280, 270, 0]
	];
	const turrets = Array(turretPositions.length - 1)
		.fill('x')
		.map((_, idx) => {
			return {
				position: turretPositions[idx]
			};
		});
</script>

<T.DirectionalLight position={[10, 10, -1]} />
<T.AmbientLight />
<Background color="#000106"/>
<StarField />

<Shader>
	<StartingBlock />

	<!-- VERTICAL -->
	<Wall position={[-30, 150, 0]} scale={[1, 300, 8]} />
	<Wall position={[30, 125, 0]} scale={[1, 250, 8]} />

	<!-- HORIZONTAL -->
	<Wall position={[119.5, 300.5, 0]} scale={[300, 1, 8]} />
	<Wall position={[149.5, 250.5, 0]} scale={[240, 1, 8]} />

	<FinishBlock position={{ x: 270, y: 275, z: 0 }} rotation={{ x: 0, y: Math.PI / 1.75, z: 0 }} />
</Shader>

{#if $gameStatus === 'PLAY'}
	{#each turrets as t, idx}
		<EnemyTurret position={t.position} rateOfFire={difficultyToROFMap[$difficulty]} />
		<T.Mesh position={t.position}>
			<T.SphereGeometry args={[30]} />
			<T.MeshBasicMaterial color="red" wireframe transparent opacity={0.25} />
			<Attractor
				strength={1}
				gravityType="linear"
				range={30}
			/>
		</T.Mesh>
	{/each}
{/if}
