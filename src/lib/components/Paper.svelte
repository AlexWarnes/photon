<script lang="ts">
	export let level: 'l0' | 'l1' | 'l2' | 'l3' = 'l1';
	export let style = '';
</script>

<div class="paper {level}" {style}>
	<slot />
</div>

<style>
  .paper {
    width: fit-content;
  }
	.paper.l1 {
		box-shadow: 0 1px 1px 0 rgb(66 66 66 / 8%), 0 1px 3px 1px rgb(66 66 66 / 16%);
	}
</style>
