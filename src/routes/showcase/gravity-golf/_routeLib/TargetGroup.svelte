<script lang="ts">
	import { Group, useFrame } from '@threlte/core';

	import CubeTargets from './CubeTargets.svelte';
	export let targetCount: number = 8;
	$: platforms = Array(targetCount).fill('x');
</script>

{#each platforms as platform}
	<CubeTargets />
{/each}
