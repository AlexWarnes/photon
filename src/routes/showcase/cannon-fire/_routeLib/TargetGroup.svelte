<script lang="ts">
	import { Group, useFrame } from '@threlte/core';

	import CubeTargets from './CubeTargets.svelte';
	export let targetCount: number = 10;

	$: outerPlatforms = Array(targetCount - (targetCount % 3)).fill('x');
	$: innerPlatforms = Array(targetCount % 3).fill('x');
</script>

{#each outerPlatforms as _, idx}
	<CubeTargets />
{/each}
{#each innerPlatforms as _, idx}
	<CubeTargets inner/>
{/each}
