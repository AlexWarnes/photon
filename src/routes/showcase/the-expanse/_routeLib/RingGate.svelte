<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { LayerMaterial, Noise, Fresnel } from 'lamina/vanilla';
	import { onMount } from 'svelte';

	const offset = tweened(0, { duration: 30000 });
	const alpha = tweened(0, { duration: 5000 });
	// const scale = tweened(0, { duration: 13000, easing: cubicOut, delay: 4000 });
	const posZ = tweened(-1000, { duration: 16000, easing: cubicOut, delay: 1000 });

	let activeRingMat: any = new LayerMaterial({
		color: '#000000',
		lighting: 'basic',
		layers: [
			new Noise({
				name: 'ring-noise',
				// Colorful version
				// colorA: new THREE.Color('#2a2204'),
				// colorB: new THREE.Color('#0e4044'),
				// colorC: new THREE.Color('#000000'),
				// colorD: new THREE.Color('#ff1900'),
				colorA: new THREE.Color('#f50000'),
				colorB: new THREE.Color('#1f2929'),
				colorC: new THREE.Color('#030303'),
				colorD: new THREE.Color('#6bf5ec'),
				alpha: 0,
				scale: 3,
				type: 'curl',
				offset: [5, 0, 0],
				mapping: 'local',
				mode: 'normal',
				visible: true
			})
		]
	});

	const inactiveRingMat = new THREE.MeshPhysicalMaterial({
		roughness: 0.15,
		transmission: 1,
		// @ts-ignore
		thickness: 0.25
	});

	let ringMat: any = new LayerMaterial({
		color: '#000000',
		lighting: 'standard',
		layers: [
			new Fresnel({
				color: new THREE.Color('#70baff'),
				alpha: 1,
				power: 2.5,
				intensity: 1.5,
				bias: 0,
				mode: 'add',
				visible: true
			})
		]
	});

	onMount(() => {
		offset.set(5);
		posZ.set(-100).then(() => alpha.set(0.85));
		// scale.set(20).then(() => alpha.set(0.85));
	});

	function updateRingNoise(key: string, value: any): void {
		activeRingMat.layers.find((l: any) => l.name === 'ring-noise')[key] = value;
		activeRingMat = activeRingMat;
	}

	$: updateRingNoise('offset', [$offset, $offset, $offset]);
	$: updateRingNoise('alpha', $alpha);
	$: {
		if ($offset === 5) {
			offset.set(0);
		} else if ($offset === 0) {
			offset.set(5);
		}
	}
</script>

<SC.Group position={[0, 0, $posZ]} scale={[20, 20, 20]}>
	<SC.Mesh
		geometry={new THREE.CylinderBufferGeometry(5, 5, 5, 30, 1)}
		material={activeRingMat}
		rotation={[Math.PI / 2, 0, 0]}
		scale={[1, 0.1, 1]}
	/>
	<SC.Mesh
		geometry={new THREE.TorusBufferGeometry(5, 0.25, 16, 100)}
		material={ringMat}
		rotation={[0, 0, 0]}
	/>
</SC.Group>
