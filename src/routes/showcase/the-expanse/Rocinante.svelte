<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { tweened } from 'svelte/motion';
	import { cubicInOut, cubicOut } from 'svelte/easing';
	import GLTF from '$lib/components/GLTF.svelte';
	import { modelURL } from '$lib/data/resources';
	import { controlStatus, firstPerson, modelsLoading, updateModelStatus } from './stores';
	import ControlPanel from './ControlPanel.svelte';
	import { setContext } from 'svelte';

	const xThrust = tweened(0, { duration: 500, easing: cubicInOut });
	const yThrust = tweened(0, { duration: 500, easing: cubicInOut });
	const zThrust = tweened(0, { duration: 500, easing: cubicInOut });

	setContext('THRUST', {
		xThrust,
		yThrust,
		zThrust
	});

	let rX = 0;
	let rY = Math.PI;
	let rZ = 0;

	const clock = new THREE.Clock();
	SC.onFrame(() => {
		const delta = clock.getDelta();
		rX += $xThrust * delta;
		rY += $yThrust * delta;
		rZ += $zThrust * delta;
	});
</script>

<SC.Group rotation={[rX, rY, rZ]} position={[0, 0, 0]}>
	{#if $firstPerson}
		<SC.PerspectiveCamera position={[0, 10, 17]} near={0.1} far={1000} fov={55} />
	{/if}

	<GLTF
		name="rocinante"
		modelURL={modelURL['rocinante']}
		scale={[0.1, 0.1, 0.1]}
		rotation={[0, Math.PI, 0]}
		position={[0, 0, 5]}
		on:statusChange={({ detail }) => updateModelStatus(detail.name, detail.status)}
	/>
</SC.Group>

<ControlPanel {rZ} />
