<script lang="ts">
import type { Option, OptionConfig } from "$lib/ts-models/general";


	export let bindValue = true;
	export let value: any;
	export let label: string;
	export let options: Option[] = [];

	let formattedOptions: OptionConfig[];
	$: formattedOptions = options.map(opt => {
		if (typeof opt === "string" || typeof opt === "number" || typeof opt === "boolean") {
			return {
				value: opt,
				displayValue: String(opt)
			}
		} else {
			return opt;
		}
	})
</script>

{#if bindValue}
	<label
		>{label}
		<select bind:value on:change>
			{#each formattedOptions as o}
				<option value={o.value}>{o.displayValue}</option>
			{/each}
		</select>
	</label>
{:else}
	<label
		>{label}
		<select on:change>
			{#each formattedOptions as o}
				<option value={o.value}>{o.displayValue}</option>
			{/each}
		</select>
	</label>
{/if}

<style>
	@import '../../styles/forms.css';
</style>