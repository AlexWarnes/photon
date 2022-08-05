<script lang="ts">
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three';
	import { AutoColliders, Collider } from '@threlte/rapier';
	import { Group, Mesh } from '@threlte/core';
	import { randomColor, randomVec3 } from '$lib';
	import { randFloat } from 'three/src/math/MathUtils';
	import Ball from './Ball.svelte';
	import Body from '../../physics-threlte/_routeLib/Body.svelte';
	import { boardWidth, boardHeight, bumperCount } from './state';

	// const boardWidth = 30;
	// const boardHeight = 40;
	// const bumperCount = 20;
	const boardAngle = -Math.PI / 6;

	$: bumpers = Array($bumperCount)
		.fill('x')
		.map((_) => {
			return {
				// Note: positions are local to board
				position: randomVec3({
					x: [-$boardWidth / 2, $boardWidth / 2],
					y: [-$boardHeight / 2, $boardHeight / 2],
					z: [1, 1]
				}),
				tilt: Math.PI / randFloat(-10, 10)
			};
		});
	let bodies = Array(100)
		.fill('x')
		.map((_) => generateBody());

	function generateBody(): any {
		return {
			color: randomColor(),
			position: randomVec3({ x: [-25, 25], y: [75, 300], z: [-25, 25] }),
			rotation: { x: Math.PI / (Math.random() * 4) }
		};
	}
</script>

<Ball position={{ y: $boardHeight + 1, z: -$boardHeight * Math.cos(boardAngle) + 7 }} />
<!-- {#each bodies as body}
  <Body {body}/>
{/each} -->
<AutoColliders
  shape="convexHull"
	position={{ y: $boardHeight / 2, z: -20 }}
	rotation={{ x: boardAngle }}
>
	<Group>
		<!-- BOARD -->
		<Mesh
			geometry={new BoxBufferGeometry()}
			material={new MeshStandardMaterial({ color: 'seagreen' })}
			scale={{ x: $boardWidth, y: $boardHeight, z: 1 }}
		/>

		<!-- BUMPERS -->
		{#each bumpers as bumper}
			<Mesh
				geometry={new BoxBufferGeometry()}
				material={new MeshStandardMaterial({ color: 'salmon' })}
				scale={{ x: 1, y: 1, z: 5 }}
				rotation={{ x: -Math.PI / 20, z: bumper.tilt }}
				position={bumper.position}
			/>
		{/each}
	</Group>
</AutoColliders>
