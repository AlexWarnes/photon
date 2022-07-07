<script lang="ts">
	export let value: number;
	export let label: string;
	export let type: "FLOAT" | "INT" | "RADIAN" = "INT";
	export let min: number = 0;
	export let max: number = type === "FLOAT" ? 1 : type === "RADIAN" ? (2 * Math.PI) : 1000;
	export let step: number = type === "FLOAT" ? 0.01 : type === "RADIAN" ? (2 * Math.PI) / 64 : 1;
	export let bindValue: boolean = true;
</script>

{#if bindValue}
	<label
		>{label}
		<input type="range" {min} {max} {step} bind:value on:input on:change />
	</label>
{:else}
	<label
		>{label}
		<input type="range" {min} {max} {step} on:input on:change />
	</label>
{/if}

<style>
	@import '../../styles/forms.css';
</style>