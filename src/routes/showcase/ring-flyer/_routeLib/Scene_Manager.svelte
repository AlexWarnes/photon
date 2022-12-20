<script lang="ts">
	import Shader from '$lib/components/Shader.svelte';
	import { randomVec3 } from '$lib/utils/vectors';
	import { OrbitControls, T } from '@threlte/core';
	import { Collider } from '@threlte/rapier';
	import Earth from './Earth.svelte';
	import Effects from './Effects.svelte';
	import EnemyTurret from './EnemyTurret.svelte';
	import Player from './Player.svelte';
	import Scene_LevelOne from './Scene_LevelOne.svelte';
	import Scene_LevelTwo from './Scene_LevelTwo.svelte';
	import Scene_LevelThree from './Scene_LevelThree.svelte';

	import { gameStatus, level } from './state';
	import Wall from './Wall.svelte';
</script>

<T.DirectionalLight position={[10, 10, -1]} />
<T.AmbientLight />

{#if $level === 1}
	<Scene_LevelOne />
{:else if $level === 2}
	<Scene_LevelTwo />
{:else if $level === 3}
	<Scene_LevelThree />
{/if}

<Player />
