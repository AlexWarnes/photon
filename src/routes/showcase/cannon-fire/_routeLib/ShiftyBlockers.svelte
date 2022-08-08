<script lang="ts" context="module">
	const material = new MeshStandardMaterial({ color: new Color('red').convertSRGBToLinear() });
</script>

<script lang="ts">
	import {
		MeshStandardMaterial,
		DodecahedronBufferGeometry,
		Color,
		MeshBasicMaterial,
TorusBufferGeometry
	} from 'three';
	import { Mesh, Group } from '@threlte/core';
	import { RigidBody, Collider } from '@threlte/rapier';
	import { randomColor, randomVec3 } from '$lib';
	import { randInt } from 'three/src/math/MathUtils';
	import { LayerMaterial, Noise, Fresnel, Gradient } from 'lamina/vanilla';
	import { tweened } from 'svelte/motion';
	import Blocker from './Blocker.svelte';
	const count = 10;
	const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z'];
	const randomAxis = (): 'x' | 'y' | 'z' => axes[randInt(0, 2)];

	$: blockers = Array(count).fill('x');
</script>

{#each blockers as _}
	<Blocker moveOnAxis={randomAxis()} />
{/each}
