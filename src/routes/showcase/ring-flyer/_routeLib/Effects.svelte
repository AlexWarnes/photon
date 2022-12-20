<script lang="ts">
	import { Vector2 } from 'three';
	import { Pass, useThrelte } from '@threlte/core';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
	// @ts-ignore
	// import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass';

	const { scene, camera } = useThrelte();
</script>

<!-- {#if $camera && scene} -->
	<Pass pass={new UnrealBloomPass(new Vector2(256, 256), 0.3, 0.5, 0.75)} />
	<!-- <Pass pass={new RenderPixelatedPass(2.0, scene, $camera)} /> -->
<!-- {/if} -->
