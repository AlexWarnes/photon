<script lang="ts">
	export let value: number;
	export let label: string;
	export let min: number = 0;
	export let max: number = 1000;
	export let step: number = 1;
	export let bindValue: boolean = true;
</script>

{#if bindValue}
	<label
		>{label}
		<input type="number" {min} {max} {step} bind:value on:input on:change />
	</label>
{:else}
	<label
		>{label}
		<input type="number" {min} {max} {step} on:input on:change />
	</label>
{/if}

<style>
	@import '../../styles/forms.css';
</style>