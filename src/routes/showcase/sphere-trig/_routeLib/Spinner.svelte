<script lang="ts">
  export let show: boolean = false;
</script>

<div class="spinner" hidden={!show} />

<style>
  .spinner {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    border: 2px solid cyan;
    border-top: 2px solid transparent;
    animation: Spin 400ms linear 0s infinite;
  }

  @keyframes Spin {
    from {
      transform: rotate(0deg);
    }
    to  {
      transform: rotate(359deg);
    }
  }
</style>