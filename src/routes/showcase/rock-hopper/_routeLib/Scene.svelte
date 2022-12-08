<script lang="ts">
	import Shader from '$lib/components/Shader.svelte';
	import { randomVec3 } from '$lib/utils/vectors';
	import { OrbitControls, T } from '@threlte/core';
	import { Collider } from '@threlte/rapier';
	import Earth from './Earth.svelte';
	import EnemyTurret from './EnemyTurret.svelte';
	import Player from './Player.svelte';
	import Sun from './Sun.svelte';
	import Wall from './Wall.svelte';

	const pads = Array(12)
		.fill('x')
		.map((_, idx) => {
			return {
				position: randomVec3({ x: [-28, 28], y: [15, 300], z: [0, 0] }),
        orientation: idx % 2 ? 'TOP' : 'BOTTOM'
			};
		});
</script>

<!-- <T.PerspectiveCamera makeDefault position={[0, 1, 15]}>
  <OrbitControls />
</T.PerspectiveCamera> -->

<T.DirectionalLight position={[10, 10, 1]} />
<T.AmbientLight />

<T.GridHelper />
<T.GridHelper rotation.x={Math.PI / 2} position.z={-15} position.y={150} args={[300, 50, 'black', 'black']} />

<Player />
<Wall position={[-30, 150, 0]} scale={[1, 300, 8]}/>
<Wall position={[30, 150, 0]} scale={[1, 300, 8]}/>

<Wall position={[16, 50, 0]} scale={[28, 1, 8]}/>
<Wall position={[-16, 50, 0]} scale={[28, 1, 8]}/>

<Wall position={[12, 100, 0]} scale={[36, 1, 8]}/>
<Wall position={[-20, 100, 0]} scale={[20, 1, 8]}/>

<Wall position={[16, 150, 0]} scale={[28, 1, 8]}/>
<Wall position={[-16, 150, 0]} scale={[28, 1, 8]}/>

<Wall position={[-12, 200, 0]} scale={[36, 1, 8]}/>
<Wall position={[20, 200, 0]} scale={[20, 1, 8]}/>



<Shader>
  <Earth />
  <Sun />
</Shader>

{#each pads as pad, idx}
	<T.Group position={[pad.position.x, pad.position.y, pad.position.z]}>
		<Collider shape="cuboid" args={[5, 1, 1]}>
			<T.Mesh scale={[10, 2, 2]}>
				<T.BoxGeometry />
				<T.MeshStandardMaterial color="green" />
			</T.Mesh>
		</Collider>
    <T.Group position={[0, pad.orientation === "TOP" ? 1 : -1, 0]}>
      <EnemyTurret orientation={pad.orientation} />
    </T.Group>
	</T.Group>
  {/each}

