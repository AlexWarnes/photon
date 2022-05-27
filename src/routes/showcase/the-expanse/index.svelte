<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { tweened } from 'svelte/motion';
	import { cubicInOut, cubicOut } from 'svelte/easing';
	import GLTF from '$lib/components/GLTF.svelte';
	import { modelURL } from '$lib/data/resources';
	import { controlStatus, firstPerson, modelsLoading, updateModelStatus } from './stores';
	import MicroLoading from '$lib/components/MicroLoading.svelte';
	import RingGate from './RingGate.svelte';
	import Rocinante from './Rocinante.svelte';

	const cameraPosX = tweened(0, { duration: 4000, easing: cubicInOut, delay: 10000 });
	const cameraPosZ = tweened(1, { duration: 6000, easing: cubicInOut, delay: 4000 });

	$: if (!$modelsLoading) {
		cameraPosZ.set(50);
		cameraPosX.set(-25).then(() => controlStatus.set('Available'));
	}
</script>

<SC.Canvas background={new THREE.Color('#000000')} antialias>
	<SC.DirectionalLight
		color={new THREE.Color('#ffffff')}
		position={[0, 50, -40]}
		intensity={2.75}
	/>
	<SC.AmbientLight color={new THREE.Color('#ffffff')} intensity={0.75} />

	{#if !$modelsLoading}
		<RingGate />
	{/if}

	<Rocinante />
	{#if !$firstPerson}
		<SC.PerspectiveCamera
			position={[$cameraPosX, 20, $cameraPosZ]}
			near={0.1}
			far={1000}
			fov={70}
		/>
	{/if}
</SC.Canvas>
<MicroLoading showLoading={$modelsLoading} />
