<script lang="ts">
	import { clickOutside } from '$lib/actions/ClickOutside';
	import { slide } from 'svelte/transition';
	export let open: boolean = false;
	export let position: "RIGHT" | "LEFT" | "BOTTOM"

	// TODO: Make this better
	const style = {
		"RIGHT": "transform-origin: top left; top: 0; left: 110%;",
		"LEFT": "transform-origin: top right; top: 0; right: 130%;",
		"BOTTOM": "transform-origin: top right; top: 0; right: 0;",
	}
</script>

{#if open}
	<div class="menu-container" style={style[position]} in:slide use:clickOutside on:clickOutside={() => (open = false)}>
		<slot />
	</div>
{/if}

<style>
	.menu-container {
		position: absolute;
		background: var(--canvas-overlay);
		/* transform-origin: top left; */
		/* open right */
		/* top: 0; */
		/* left: 110%; */
	}
</style>
