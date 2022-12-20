<script lang="ts">
	import { T } from '@threlte/core';
	import { BackSide, Color } from 'three';
	// import { LayerMaterial, Gradient } from 'lamina/vanilla';
	import { level } from './state';
  export let color = 'blue';

  $: bgColor = new Color(color);
	// const sunsetMaterial = new LayerMaterial({
	// 	color: '#d9d9d9',
	// 	lighting: 'standard',
	// 	side: BackSide,
	// 	layers: [
	// 		new Gradient({
	// 			colorA: new Color('#110613'),
	// 			colorB: new Color('#f86363'),
	// 			alpha: 1,
	// 			contrast: 2,
	// 			start: 0,
	// 			end: -3,
	// 			axes: 'y',
	// 			mapping: 'local',
	// 			visible: true
	// 		})
	// 	]
	// });
</script>

<!-- Background -->
<T.Mesh scale={800}>
  <T.SphereGeometry />
  <T.MeshStandardMaterial color={bgColor} side={BackSide} />
</T.Mesh>
<!-- {#if $level === 1}
	<T.Mesh scale={800}>
		<T.SphereGeometry />
		<T.MeshStandardMaterial color={new Color('blue')} side={BackSide} />
	</T.Mesh>
{:else if $level === 2}
	<T.Mesh scale={800}>
		<T.SphereGeometry />
		<T.MeshStandardMaterial color={new Color('darkseagreen')} side={BackSide} />
	</T.Mesh>
{:else if $level === 3}
	<T.Mesh scale={800}>
		<T.SphereGeometry />
		<T.MeshStandardMaterial color={new Color('black')} side={BackSide} />
	</T.Mesh>
{/if} -->
