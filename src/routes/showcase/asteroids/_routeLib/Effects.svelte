<script lang="ts">
  import { Vector2 } from 'three';
import { Pass, useThrelte, } from '@threlte/core';
// import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';


</script>

<!-- <Pass pass={new FilmPass(0.2, 0.1, 250, 0)} /> -->
<Pass pass={new UnrealBloomPass(new Vector2(256, 256), 5, 1, 0.75)} />
<!-- <Pass pass={new AfterimagePass(0.75) } /> -->

