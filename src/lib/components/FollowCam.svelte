<script lang="ts">
	import { T, TransformableObject, useFrame, type Position } from '@threlte/core';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { afterUpdate, onMount, tick } from 'svelte';

	interface FollowCamOffset {
		x: number;
		y: number;
		z: number;
	}
	export let offset: FollowCamOffset = {
		x: 0,
		y: 10,
		z: 15
	};
  export let xLag: number = 750;
  export let yLag: number = 750;
  export let zLag: number = 1000;
	export let fov: number | undefined = undefined;

	export let x: number;
	export let y: number;
	export let z: number;

	const camX = tweened(x, { duration: xLag, easing: cubicOut });
	const camY = tweened(y, { duration: yLag, easing: cubicOut });
	const camZ = tweened(z, { duration: zLag, easing: cubicOut });

	$: if (isNaN(x)) {
		camX.set(offset.x, { duration: 4000 });
	} else {
		camX.set(x);
	}
	$: if (isNaN(y)) {
		camY.set(offset.y, { duration: 4000 });
	} else {
		camY.set(y + offset.y);
	}
	$: if (isNaN(z)) {
		camZ.set(offset.z, { duration: 4000 });
	} else {
		camZ.set(z + offset.z);
	}

</script>

<T.PerspectiveCamera
	makeDefault
	{fov}
	position.x={$camX}
	position.y={$camY}
	position.z={$camZ}
	let:ref={camRef}
>
	<TransformableObject
		object={camRef}
		lookAt={{ x: $camX - offset.x, y: $camY - offset.y, z: $camZ - offset.z }}
	/>
</T.PerspectiveCamera>
