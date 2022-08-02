<script lang="ts" context="module">
	const geometry = new DodecahedronBufferGeometry(2);
	const laminaMaterial = new LayerMaterial({
		color: '#483d8b',
		lighting: 'standard',
		layers: [
			new Fresnel({
				color: new Color('#ff3e01').convertSRGBToLinear(),
				alpha: 0.4,
				power: 2,
				intensity: 1,
				bias: 0,
				mode: 'normal',
				visible: true
			})
		]
	});
</script>

<script lang="ts">
	import { Color, DodecahedronBufferGeometry, } from 'three';
	import { LayerMaterial, Fresnel, } from 'lamina/vanilla';
	import { Mesh, type Position, type ThreltePointerEvent } from '@threlte/core';
	import { AutoColliders, RigidBody } from '@threlte/rapier';
	import { handleShockwaveChange } from './state';
	import { randFloat } from 'three/src/math/MathUtils';

	export let position: Position;
	function handleClick(evt: CustomEvent<ThreltePointerEvent>): void {
		handleShockwaveChange(evt.detail.point);
	}
</script>

<RigidBody type={'dynamic'} {position} gravityScale={randFloat(0.1, 0.5)}>
	<AutoColliders shape="convexHull">
		<Mesh {geometry} material={laminaMaterial} interactive on:click={handleClick} />
	</AutoColliders>
</RigidBody>
