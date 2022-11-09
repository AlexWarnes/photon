<script>
	import Panel from "$lib/components/Panel.svelte";
	import { displayPoints, stats } from "./state";

</script>


<Panel>
  <h2>STATS</h2>
  <p>Points: {$displayPoints}</p>
  <p>Shots: {$stats.shots}</p>
  <p>Hits: {$stats.hits}</p>
  <p>Accuracy: {$stats.accuracy}%</p>
</Panel>

<style>
  h2, p {
    color: red;
  }

  h2 {
    margin-top: 0;
  }

</style>