<script lang="ts">
	import { TorusGeometry, CircleGeometry } from 'three';
	import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
	import { Mesh, MeshInstance } from '@threlte/core';
	import { tweened } from 'svelte/motion';
	import { linear } from 'svelte/easing';
	import { LayerMaterial, Noise } from 'lamina/vanilla';
	import { pointerX } from './treeState';
	const mirrorPlane = new CircleGeometry(15, 50);
	const reflector = new Reflector(mirrorPlane, {
		clipBias: 0.003,
		color: '#92e2f9'
	});

	let offsetX = tweened(0, { duration: 500, easing: linear });
	// dark blue: '#060516'
	// cyan-ish: '#92e2f9'
	// 'deeppink'
	let laminaMaterial: any = new LayerMaterial({
		lighting: 'basic',
		layers: [
			new Noise({
				colorA: 'deeppink',
				colorB: 'deeppink',
				colorC: '#060516',
				colorD: '#060516',
				alpha: 1,
				scale: 2,
				type: 'curl',
				offset: [0, 0, 0],
				mapping: 'local',
				mode: 'normal',
				visible: true
			})
		]
	});

	$: {
		offsetX.set($pointerX);
	}

	$: {
		laminaMaterial.layers[0].offset = [$offsetX, 0, 0];
		laminaMaterial = laminaMaterial;
	}
</script>

<Mesh
	geometry={new TorusGeometry(15, 0.4, 8, 64)}
	material={laminaMaterial}
	position={{ y: 0 }}
	rotation={{ x: Math.PI / 2 }}
/>
<MeshInstance mesh={reflector} rotation={{ x: -Math.PI / 2 }} />
