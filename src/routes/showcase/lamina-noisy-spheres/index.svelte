<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
	import { noiseScale, spheres } from "./store"

	import NoisySphere from "./NoisySphere.svelte";
	import Controls from "./Controls.svelte";
	import Background from "./Background.svelte";
	import Mirror from "./Mirror.svelte";

	
	
</script>

<SC.Canvas antialias>

  <SC.PerspectiveCamera 
    position={[-2,7,8]}
    near={0.1}
    far={400}
    fov={60}
  />
	<SC.OrbitControls enabled enableDamping dampingFactor={0.2} />

	<Background />
	<Mirror />

	<SC.Group position={[0, 1.5, 0]}>
		{#each spheres as s, idx (s.id)}
			<NoisySphere delay={idx} noiseType={s.noiseType} position={s.position}/>
		{/each}
	</SC.Group>
</SC.Canvas>

<Controls />