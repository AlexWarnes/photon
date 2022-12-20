<script lang="ts">
	import Shader from '$lib/components/Shader.svelte';
	import { randomVec3 } from '$lib/utils/vectors';
	import { OrbitControls, T } from '@threlte/core';
	import { Collider } from '@threlte/rapier';
	import StartingBlock from './StartingBlock.svelte';
	import Effects from './Effects.svelte';
	import EnemyTurret from './EnemyTurret.svelte';
	import Player from './Player.svelte';
	import { difficultyToROFMap, difficulty, gameStatus } from './state';
	import FinishBlock from './FinishBlock.svelte';
	import Wall from './Wall.svelte';
	import Background from './Background.svelte';
	import StarField from '$lib/components/StarField.svelte';

	const turrets = Array(12)
		.fill('x')
		.map((_, idx) => {
			return {
				position: randomVec3({ x: [-28, 28], y: [15, 300], z: [0, 0] }),
				orientation: idx % 2 ? 'TOP' : 'BOTTOM'
			};
		});
</script>

<T.DirectionalLight position={[10, 10, -1]} />
<T.AmbientLight />
<Background color="#320040" />
<StarField innerRadius={100} outerRadius={200} count={500} />

<Shader>
	<Wall position={[-30, 150, 0]} scale={[1, 300, 8]} />
	<Wall position={[30, 150, 0]} scale={[1, 300, 8]} />

	<Wall colorful position={[16, 50, 0]} scale={[27, 1, 8]} />
	<Wall colorful position={[-16, 50, 0]} scale={[27, 1, 8]} />

	<Wall colorful position={[12, 100, 0]} scale={[35, 1, 8]} />
	<Wall colorful position={[-20, 100, 0]} scale={[19, 1, 8]} />

	<Wall colorful position={[16, 150, 0]} scale={[27, 1, 8]} />
	<Wall colorful position={[-16, 150, 0]} scale={[27, 1, 8]} />

	<Wall colorful position={[-12, 200, 0]} scale={[35, 1, 8]} />
	<Wall colorful position={[20, 200, 0]} scale={[19, 1, 8]} />

	<StartingBlock />
	<FinishBlock position={{ x: 0, y: 300, z: 0 }} rotation={{ x: -Math.PI / 1.5, y: 0, z: 0 }} />
</Shader>

{#if $gameStatus === 'PLAY'}
	{#each turrets as t, idx}
		<EnemyTurret
			position={[t.position.x, t.position.y, t.position.z]}
			rateOfFire={difficultyToROFMap[$difficulty]}
		/>
	{/each}
{/if}
