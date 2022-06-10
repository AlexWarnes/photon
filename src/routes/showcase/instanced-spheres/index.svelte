<script>
	console.clear();
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import PointsGLTF from './PointsGLTF.svelte';
	import InstancedMesh from './InstancedMesh.svelte';
</script>

<SC.Canvas
	background={new THREE.Color(0x161616)}
	shadows={true}
	antialias={true}
	physicallyCorrectLights={false}
>
	<SC.PerspectiveCamera position={[0, 20, 30]} near={0.1} far={400} fov={55} />

	<SC.OrbitControls
		enabled={true}
		enableZoom={true}
		autoRotate={true}
		autoRotateSpeed={2}
		enableDamping={true}
		dampingFactor={0.1}
	/>

	<SC.DirectionalLight
		color={new THREE.Color(0xffffff)}
		position={[0, 10, 10]}
		intensity={0.75}
		shadow={false}
	/>
	<SC.AmbientLight color={new THREE.Color(0xffffff)} intensity={0.75} />
	<InstancedMesh />
	<PointsGLTF />
</SC.Canvas>
