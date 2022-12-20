<script lang="ts">
	import { T } from '@threlte/core';
	import { Collider, CollisionGroups, AutoColliders } from '@threlte/rapier';
	import { ShaderMaterial, TorusGeometry } from 'three';
	import { difficultyToROFMap, gameStatus, level } from './state';
	import { useShader } from '$lib/utils/materials';

	import { rainbowFrag } from '$lib/utils/test.glsl';
	const { uniforms } = useShader();

	export let position = { x: 0, y: 0, z: 0 };
	export let rotation = { x: 0, y: 0, z: 0 };

	function handleWin() {
		if ($level === Object.keys(difficultyToROFMap).length) {
			$gameStatus = 'GAME_WIN';
		} else {
			$gameStatus = 'LEVEL_WIN';
		}
	}
</script>

<T.Group
	position={[position.x, position.y, position.z]}
	rotation={[rotation.x, rotation.y, rotation.z]}
>
	<AutoColliders shape="trimesh">
		<T.Mesh>
			<T.TorusGeometry args={[8, 2, 16, 32]} />
			<T.ShaderMaterial fragmentShader={rainbowFrag} uniforms={$uniforms} />
		</T.Mesh>
	</AutoColliders>
	<CollisionGroups memberships={[9]} filter={[1]}>
		<Collider sensor shape="cuboid" args={[6, 6, 1]} on:sensorenter={handleWin} />
	</CollisionGroups>
</T.Group>
