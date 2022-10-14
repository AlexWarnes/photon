<script>
	import { PerspectiveCamera, OrbitControls } from "@threlte/core";
	import { tweened } from "svelte/motion";
	import { quintOut } from "svelte/easing";
	import { selectRigidBodyPos, rbp } from "./state";

	const initialCameraPosition = {
		x: 0,
		y: 10,
		z: 15,
	}
	
	const x = selectRigidBodyPos('x');
	const y = selectRigidBodyPos('y');
	const z = selectRigidBodyPos('z');
	
	const camX = tweened($x, { duration: 2000, easing: quintOut });
	const camY = tweened($y, { duration: 2000, easing: quintOut });
	const camZ = tweened($z, { duration: 1000, easing: quintOut });

	$: if (isNaN($x)){
		camX.set(initialCameraPosition.x, { duration: 4000 });
	} else {
		camX.set($x);
	}
	$: if (isNaN($y)){
		camY.set(initialCameraPosition.y, { duration: 4000 });
	} else {
		camY.set($y + 5);
	}
	$: if (isNaN($z)){
		camZ.set(initialCameraPosition.z, { duration: 4000 });
	} else {
		camZ.set($z + 20);
	}
</script>

<PerspectiveCamera 
	position={{x: $camX, y: $camY, z: $camZ}} 
	lookAt={{x: $camX, y: $camY - 5, z: $camZ - 20}} 
	fov={55} 
/>
