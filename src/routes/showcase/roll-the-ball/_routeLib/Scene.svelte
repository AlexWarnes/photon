<script>
	import { shiftyWalls, shiftyBars } from "./state";
	import Track from "./Track.svelte";
	import Player from "./Player.svelte";
	import ShiftyWall from "./ShiftyWall.svelte";
	import ShiftyBar from "./ShiftyBar.svelte";
	import CameraRig from "./CameraRig.svelte";
	import LightRig from "./LightRig.svelte";
	import FinishSensor from "./FinishSensor.svelte";
</script>

<LightRig />
<CameraRig />
<Track />
<Player />
<FinishSensor />

{#each shiftyWalls as wall}
	<ShiftyWall position={wall.position} />
{/each}

{#each shiftyBars as bar}
	<ShiftyBar type={bar.type} position={bar.position} />
{/each}
