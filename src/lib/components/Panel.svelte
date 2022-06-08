<script lang="ts">
  export let style: string = "";
  export let width: string = "100%";
  export let height: string = "auto";
</script>

<div class="panel" style:width style:height {style}>
  <slot />
</div>

<style>
  .panel {
    padding: 1rem;
    background-color: #00000088;
    color: #fafbfc;
  }
</style>