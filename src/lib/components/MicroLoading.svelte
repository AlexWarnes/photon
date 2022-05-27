<script lang="ts">
  import { fade } from "svelte/transition";
	export let showLoading: boolean = false;
  export let message: string = "Loading..."
</script>

{#if showLoading}
	<div class="loading-container" transition:fade>
		<p>
			{message}
		</p>	
	</div>
{/if}

<style>
	.loading-container {
		position: fixed;
		left: 1rem;
		bottom: 1rem;
		background: #00000088;
		color: #fafbfc;
		padding: .5rem .875rem;
	}
	
	p {
		margin: 0;
	}
</style>