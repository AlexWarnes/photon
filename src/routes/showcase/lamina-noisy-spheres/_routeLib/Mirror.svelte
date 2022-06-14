<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
	import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

	const mirrorPlane = new THREE.PlaneGeometry(64, 7);
	const reflector = new Reflector( mirrorPlane, {
		clipBias: 0.003,
		color: "#1976d2"
	})

</script>

	<SC.Primitive 
		object={reflector} 
		position={[0, 0, 0]}
		rotation={[-Math.PI / 2, 0, 0]}
	/>
