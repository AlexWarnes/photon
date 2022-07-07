<script lang="ts">
	import { slide } from 'svelte/transition';
	import Chevron from '$lib/svg/Chevron.svelte';
	import VisibilityCheckbox from './inputs/VisibilityCheckbox.svelte';
	export let title: string = '';
	export let open: boolean = false;
	export let style: string = '';
	export let visToggle: boolean | null = null;
	const handleKeydown = (evt: KeyboardEvent) => {
		if (evt && evt.code && evt.code === 'Enter') {
			open = !open;
		}
	};
</script>

<div class="accordion-container" {style}>
	<div
		class="header"
		role="button"
		aria-haspopup="menu"
		on:click
		tabindex="0"
		on:keydown={handleKeydown}
	>
		{#if typeof visToggle === 'boolean'}
			<VisibilityCheckbox bind:visible={visToggle} />
		{/if}
		<p>{title}</p>
		<span class="icon-wrapper">
			<Chevron direction={open ? 'DOWN' : 'RIGHT'} />
		</span>
	</div>
	{#if open}
		<div class="content" transition:slide>
			<slot />
		</div>
	{/if}
</div>

<style>
	p {
		margin: 0;
	}
	.accordion-container {
		width: 100%;
		font-size: inherit;
	}
	.header {
		width: 100%;
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		font-size: inherit;
		background-color: #676778;
	}
	.content {
		width: 100%;
		transform-origin: top;
		padding: 0.1rem;
		border-left: 2px solid #676778;
	}
</style>
