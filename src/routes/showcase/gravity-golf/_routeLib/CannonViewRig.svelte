<script lang="ts">
	import { PerspectiveCamera, Group, useFrame, OrbitControls } from '@threlte/core';

	import { power, moveTo } from './state';
	import Cannon from './Cannon.svelte';
	import AxisHelper from '$lib/components/AxisHelper.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	const orbitRotation = tweened(0, { duration: 8000, easing: cubicInOut });
	export let fire = false;

	function handleMove(location: 'LEFT' | 'CENTER' | 'RIGHT') {
		if (location === 'CENTER') {
      orbitRotation.set(0);
    } else if (location === 'LEFT') {
      orbitRotation.set(-(Math.PI / 3))
    } else {
			orbitRotation.set(Math.PI / 3);
		}
	}

  $: handleMove($moveTo)
</script>

<Group rotation={{ y: $orbitRotation }}>
	<AxisHelper length={20} />
	<PerspectiveCamera position={{ y: 2, z: 103 }} fov={60}>
		<OrbitControls enableZoom enablePan={false} enableRotate={false} />
	</PerspectiveCamera>
	<Cannon power={$power} orbitRotationYForProjectileXOffset={$orbitRotation} bind:fire />
</Group>
