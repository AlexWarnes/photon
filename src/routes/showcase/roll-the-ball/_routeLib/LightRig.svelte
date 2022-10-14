<script>
	import { AmbientLight, DirectionalLight } from "@threlte/core";
	import { trackWidth, trackHeight, trackLength, selectRigidBodyPos} from "./state";
	const lightZ = selectRigidBodyPos('z')
</script>


<AmbientLight intensity={0.5} />
<DirectionalLight intensity={2} 
	position={{x: trackWidth, y: trackHeight * 2, z: $lightZ + 15}} 
	target={{x: 0, y: 0, z: $lightZ}}
	shadow={{
   camera: {
     left: -15,
     right: trackLength / 3,
     top: trackWidth * 2,
     bottom: trackWidth * -2,
     near: 0.5,
     far: trackLength,
   },
	}} 
/>