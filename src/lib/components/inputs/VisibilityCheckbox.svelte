<script lang="ts">
	import Visibility from '../../svg/visibility.svelte';
	import VisibilityOff from '../../svg/visibility_off.svelte';

	export let visible: boolean;
</script>

<label
	style:background={visible ? 'transparent' : '#cd5c5c'}
	title="Toggle Visibility"
	aria-label="Toggle Visibility"
	><input type="checkbox" bind:checked={visible} on:change|stopPropagation />

	{#if visible}
		<Visibility />
	{:else}
		<VisibilityOff />
	{/if}
</label>

<style>
	@import '../../styles/forms.css';
	
	input[type='checkbox'] {
		display: none;
	}
	label {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		padding: 3px;
		border-radius: 50%;
		fill: #ffffff;
	}
</style>

