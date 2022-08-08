<script lang="ts" context="module">
	const geometry = new TorusKnotBufferGeometry(1, 0.25, 10);
	const material = new LayerMaterial({
		color: 'black',
		lighting: 'basic',
		layers: [
			new Noise({
				colorA: new Color('#ed0c0c').convertSRGBToLinear(),
				colorB: new Color('#ed0c0c').convertSRGBToLinear(),
				colorC: new Color('#000000').convertSRGBToLinear(),
				colorD: new Color('#000000').convertSRGBToLinear(),
				alpha: 0.5,
				scale: 1,
				type: 'white',
				offset: [0, 0, 0],
				mapping: 'local',
				mode: 'normal',
				visible: true
			})
		]
	});
</script>

<script lang="ts">
	import { Color, TorusKnotBufferGeometry } from 'three';
	import { Mesh } from '@threlte/core';
	import { Collider } from '@threlte/rapier';
	import { randomVec3 } from '$lib';
	import { randFloat, randInt } from 'three/src/math/MathUtils';
	import { LayerMaterial, Noise } from 'lamina/vanilla';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	export let moveOnAxis: 'x' | 'y' | 'z';
	const position = randomVec3({ x: [-100, 100], y: [-20, 20], z: [-100, 100] });
	const p = tweened(position[moveOnAxis], { duration: randInt(4000, 8000) });
	function move() {
		p.set(randInt(-50, 50)).then(() => move());
	}

	onMount(() => move());
</script>

<Collider
	shape={'cuboid'}
	args={[4.5, 4.5, 1]}
	position={{
		x: moveOnAxis === 'x' ? $p : position.x,
		y: moveOnAxis === 'y' ? $p : position.y,
		z: moveOnAxis === 'z' ? $p : position.z
	}}
	rotation={{ y: randFloat(0, 2 * Math.PI), z: randFloat(0, 2 * Math.PI) }}
>
	<Mesh {geometry} {material} scale={4} />
</Collider>
