<script lang="ts">
	import { useKeyboardControls } from "svelte-kbc";


  const { UP, RIGHT, DOWN, LEFT } = useKeyboardControls();
</script>

<div class="buttons">
  <div class="row">
    <div class="btn up" class:active={$UP}></div>
  </div>
  <div class="row">
    <div class="btn left" class:active={$LEFT}></div>
    <div class="btn down" class:active={$DOWN}></div>
    <div class="btn right" class:active={$RIGHT}></div>
  </div>
</div>

<style>
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 0 0;
  }

  .btn {
    width: 2rem;
    height: 2rem;
    border: 2px solid #696969;
    background-color: #00000020;
    margin: 0.125rem;
  }

  .btn.active {
    border: 2px solid lime;
  }
</style>