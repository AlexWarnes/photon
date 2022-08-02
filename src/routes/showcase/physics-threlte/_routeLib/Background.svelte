<script lang="ts">
	import { BackSide, Color, SphereBufferGeometry } from 'three';
	import { Mesh } from '@threlte/core';

	import { LayerMaterial, Depth, Fresnel, } from 'lamina/vanilla';
	const laminaMaterial = new LayerMaterial({
		color: '#ffffff',
		lighting: 'standard',
		side: BackSide,
		layers: [
			new Depth({
				colorA: new Color('#4166fc').convertSRGBToLinear(),
				colorB: new Color('#0030f1').convertSRGBToLinear(),
				alpha: 0.8,
				near: 0.4854,
				far: 0.7661999999999932,
				origin: [-0.4920000000000004, 0.4250000000000003, 0],
				mapping: 'vector',
				mode: 'multiply',
				visible: true
			}),
			new Fresnel({
				color: new Color('#fc0000').convertSRGBToLinear(),
				alpha: 1,
				power: 2,
				intensity: 1,
				bias: 0,
				mode: 'screen',
				visible: true
			}),
		]
	});
</script>

<Mesh geometry={new SphereBufferGeometry()} material={laminaMaterial} scale={300} />
