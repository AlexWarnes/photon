<script lang="ts">
  export let style: string = "";
  export let label: string = "";
  export let color: string = "#fafbfc";
</script>

<div class="box" {style}>
  <span class="dot" style:background={color} style="box-shadow: 0px 0px 4px 2px {color};"></span>
  <slot name="label">
    <p class="label">{label}</p>
  </slot>
</div>

<style>
  .box {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.25rem 0.75rem;
    color: inherit;
  }

  .label {
    margin: 0;
  }

  .dot {
    width: 5px;
    height: 5px;
    margin: 0 1rem 0 0;
    border-radius: 50%;
  }
</style>