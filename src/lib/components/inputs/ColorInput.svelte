<script lang="ts">
	import { rxThrottle } from 'svelte-fuse-rx';
	import type { Color } from 'three';
	export let bindValue = true;
	export let value: Color | string;
	export let label: string;
	export let throttleTime: number = 150;
	export let block: boolean = false;
</script>

{#if bindValue}
	<label class:block
		>{label}
		<input type="color" bind:value />
	</label>
{:else}
	<label class:block
		>{label}
		<input
			type="color"
			value={typeof value === "string" ? value : `#${value.getHexString()}`}
			use:rxThrottle={{ on: 'input', duration: throttleTime }}
			on:rxEmit
			on:change
		/>
	</label>
{/if}

<style>
		@import '../../styles/forms.css';
</style>