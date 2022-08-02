<script lang="ts">
	import { Color, CylinderBufferGeometry } from 'three';
	import { handleShockwaveChange, } from './state';
	import { AutoColliders } from '@threlte/rapier';
	import { Mesh, type ThreltePointerEvent } from '@threlte/core';

	import { LayerMaterial, Gradient } from 'lamina/vanilla';
	const laminaMaterial = new LayerMaterial({
		color: 'white',
		lighting: 'standard',
		layers: [
			new Gradient({
				colorA: new Color('#ff3e01').convertSRGBToLinear(),
				colorB: new Color('#483d8b').convertSRGBToLinear(),
				alpha: 0.95,
				contrast: 1,
				start: 2,
				end: 0,
				axes: 'x',
				mapping: 'local',
				visible: true
			})
		]
	});

	function handleClick(evt: CustomEvent<ThreltePointerEvent>): void {
		handleShockwaveChange(evt.detail.point);
	}
</script>

<AutoColliders shape={'convexHull'} position={{ y: -4.5 }}>
	<Mesh
		geometry={new CylinderBufferGeometry()}
		material={laminaMaterial}
		scale={{ x: 50, y: 5, z: 50 }}
		interactive
		on:click={handleClick}
	/>
</AutoColliders>
