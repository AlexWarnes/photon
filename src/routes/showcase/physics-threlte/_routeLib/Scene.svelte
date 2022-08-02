<script lang="ts">
	import { DirectionalLight, AmbientLight, OrbitControls, PerspectiveCamera } from '@threlte/core';
	import { randomColor, randomVec3 } from '$lib';
	import Body from './Body.svelte';
	import Shockwave from './Shockwave.svelte';
	import Ground from './Ground.svelte';
	import Background from './Background.svelte';
	import ThrelteText from './ThrelteText.svelte';
	import DropBalls from './DropBalls.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	const camY = tweened(350, { duration: 8000, easing: cubicOut });
	const camX = tweened(1, { duration: 8000, easing: cubicOut });
	let autoRotate = false;
	let dropBalls = false;
	let count = 200;
	let bodies = Array(count)
		.fill('x')
		.map((_) => generateBody());

	function generateBody(): any {
		return {
			color: randomColor(),
			position: randomVec3({ x: [-25, 25], y: [75, 300], z: [-25, 25] }),
			rotation: { x: Math.PI / (Math.random() * 4) }
		};
	}

	onMount(() => {
		camY.set(20);
		camX.set(110).then(() => {
			autoRotate = true;
			dropBalls = true;
		});
	});
</script>

<PerspectiveCamera position={{ x: $camX, y: $camY, z: 0 }} fov={40} lookAt={{ x: 0, y: 0, z: 0 }}>
	<OrbitControls {autoRotate} autoRotateSpeed={0.75} />
</PerspectiveCamera>

<DirectionalLight color={'white'} position={{ x: 100, y: 100, z: 0 }} />
<AmbientLight />

{#each bodies as body}
	<Body {body} />
{/each}

{#if dropBalls}
	<DropBalls />
{/if}
<ThrelteText showVersion={autoRotate} />
<Shockwave />

<Ground />

<Background />
