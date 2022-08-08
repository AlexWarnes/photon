<script lang="ts">
	import TargetPlatform from './TargetPlatform.svelte';
	export let targetCount: number = 10;

	$: outerPlatforms = Array(targetCount - (targetCount % 3)).fill('x');
	$: innerPlatforms = Array(targetCount % 3).fill('x');
</script>

{#each outerPlatforms as _, idx}
	<TargetPlatform />
{/each}
{#each innerPlatforms as _, idx}
	<TargetPlatform inner/>
{/each}
