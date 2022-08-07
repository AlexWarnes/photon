<script lang="ts" context="module">
	const geometry = new SphereBufferGeometry();
	// const material = new MeshStandardMaterial({ color: new Color('red').convertSRGBToLinear() });

const material = new LayerMaterial({
	color: 'black',
	// color: new Color('#152161').convertSRGBToLinear(),
	lighting: 'standard',
	layers: [
		new Fresnel({
			// color: 'orangered',
			color: new Color('palevioletred').convertSRGBToLinear(),
			// color: new Color('#ed0c0c').convertSRGBToLinear(),
			alpha: 1,
			power: 5,
			intensity: 1.5,
			bias: 0,
			mode: 'normal',
			visible: true
		})
	]
});
</script>

<script lang="ts">
	import {
		MeshStandardMaterial,
		SphereBufferGeometry,
		Color,
		MeshBasicMaterial
	} from 'three';
	import { Mesh, Group } from '@threlte/core';
	import { RigidBody, Collider, AutoColliders } from '@threlte/rapier';
	import { randomColor, randomVec3 } from '$lib';
	import { randInt } from 'three/src/math/MathUtils';
	import { LayerMaterial, Noise, Fresnel, Gradient } from 'lamina/vanilla';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	export let moveOnAxis: 'x' | 'y' | 'z';
	const position = randomVec3({ x: [-100, 100], y: [-20, 20], z: [-100, 100] });
	const p = tweened(position[moveOnAxis], { duration: 4000 });
	function move() {
		p.set(randInt(-50, 50)).then(() => move());
	}

	onMount(() => move());
</script>

<Collider
	shape={'ball'}
  args={[4]}
	position={{
		x: moveOnAxis === 'x' ? $p : position.x,
		y: moveOnAxis === 'y' ? $p : position.y,
		z: moveOnAxis === 'z' ? $p : position.z
	}}
>
	<Mesh
		{geometry}
		{material}
		scale={4}
	/>
</Collider>
