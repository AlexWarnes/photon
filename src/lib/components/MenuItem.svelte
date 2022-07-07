<script lang="ts">
	// export let
</script>

<div class="menu-item" on:click|stopPropagation>
	<slot />
</div>

<style>
  .menu-item {
    padding: .75rem 1rem;
    transition: all .2s ease;
    text-align: left;
  }
  .menu-item > * {
    margin: 0;
  }
  .menu-item:hover {
    background-color: var(--canvas-overlay-hover);
  }
</style>
