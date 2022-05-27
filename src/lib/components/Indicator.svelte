<script lang="ts">
  export let label: string = "";
  export let color: string = "#fafbfc";
</script>

<div class="box">
  <span class="dot" style:background={color} style="box-shadow: 0px 0px 4px 2px {color};"></span>
  <p class="label">{label}</p>
</div>

<style>
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0.75rem;
    color: inherit;
  }

  .dot {
    width: 5px;
    height: 5px;
    margin: 0 1rem 0 0;
    border-radius: 50%;
  }
</style>