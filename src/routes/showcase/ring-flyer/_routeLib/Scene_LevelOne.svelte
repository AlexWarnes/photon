<script lang="ts">
	import Shader from '$lib/components/Shader.svelte';
	import { randomVec3 } from '$lib/utils/vectors';
	import { OrbitControls, T } from '@threlte/core';
	import { Collider } from '@threlte/rapier';
	import Background from './Background.svelte';
	import Effects from './Effects.svelte';
	import EnemyTurret from './EnemyTurret.svelte';
	import Player from './Player.svelte';
	import StartingBlock from './StartingBlock.svelte';
	import { difficultyToROFMap, difficulty, gameStatus } from './state';
	import FinishBlock from './FinishBlock.svelte';
	import Wall from './Wall.svelte';
	import type { Vector3Tuple } from 'three';
	import { randInt } from 'three/src/math/MathUtils';
	import SmokeParticle from './SmokeParticle.svelte';
	import StarField from '$lib/components/StarField.svelte';

	const turrets = Array(4)
		.fill('x')
		.map((_, idx) => {
			return {
				position: [70 * (idx + 1), idx === 3 ? 15 : 30, 0] as Vector3Tuple
			};
		});
</script>

<T.DirectionalLight position={[10, 10, -1]} />
<T.AmbientLight />
<Background color="#0000ff" />
<StarField innerRadius={1} outerRadius={500} count={300} />

<Shader>
	<Wall position={[145.5, -0.05, 0]} scale={[300, 1, 8]} />
	<Wall position={[145.5, 60, 0]} scale={[300, 1, 8]} />

	{#each turrets as t, idx}
		<Wall colorful position={[t.position[0] + 4, randInt(12, 48), t.position[2]]} scale={[1, 24, 8]}/>
	{/each}

	<StartingBlock rotation={{ x: 0, y: 0, z: Math.PI / 2 }} position={{ x: -5, y: 30, z: 0 }} />
	<FinishBlock position={{ x: 300, y: 30, z: 0 }} rotation={{ x: 0, y: Math.PI / 1.75, z: 0 }} />
</Shader>

{#if $gameStatus === 'PLAY'}
	{#each turrets as t, idx}
		<EnemyTurret
			position={t.position}
			rateOfFire={difficultyToROFMap[$difficulty]}
		/>
	{/each}
{/if}
