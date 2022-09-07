<script context="module" lang="ts">
	const mat = {
		STANDARD: new MeshStandardMaterial({flatShading: true}),
		RED: new MeshStandardMaterial({ color: '#cd5c5c', roughness: 0.25 }),
		GREEN: new MeshStandardMaterial({ color: 'seagreen', roughness: 0.25 }),
		BLUE: new MeshStandardMaterial({ color: 'skyblue', roughness: 0.25 }),
		GLASS: new MeshPhysicalMaterial({ color: '#ffffff', ...glazeProps, flatShading: true })
	};

	const geo = {
		dodec: new DodecahedronBufferGeometry(),
		box: new BoxBufferGeometry(),
		sphere: new SphereBufferGeometry(),
		icos: new IcosahedronBufferGeometry()
	};
</script>

<script lang="ts">
	import {
		SphereBufferGeometry,
		BoxBufferGeometry,
		MeshStandardMaterial,
		BackSide,
		Color,
		GridHelper,
		MeshPhysicalMaterial,
		CylinderGeometry,
		Sphere,
		SphereGeometry,
		IcosahedronBufferGeometry,
		Mesh as ThreeMesh,
		DodecahedronBufferGeometry,
		MeshBasicMaterial
	} from 'three';
	import {
		Canvas,
		PerspectiveCamera,
		DirectionalLight,
		AmbientLight,
		PointLight,
		Mesh,
		Object3DInstance,
		OrbitControls,
		Group,
		InstancedMesh,
		Instance,
		type Position
	} from '@threlte/core';
	import { AutoColliders, Collider, Debug, RigidBody } from '@threlte/rapier';
	import { glazeProps, randomColor } from '$lib/utils/materials';
	import { tweened } from 'svelte/motion';
	import { elasticOut, cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { randomVec3 } from '$lib/utils/vectors';
	import { randInt } from 'three/src/math/MathUtils';
	let icosColor: string = '#ffffff';
	const lightRotation = tweened(0, { duration: 2000, easing: cubicInOut });
	const entryScale = tweened(0, { duration: 2000, easing: elasticOut });
	const guardScaleX = tweened(0, { duration: 2000, easing: elasticOut });
	const guardScaleY = tweened(0, { duration: 2000, easing: elasticOut });
	const guardScaleZ = tweened(0, { duration: 2000, easing: elasticOut });
	let showGuard: string = '';

	let drops: any[] = [];

	function activateDrops(origin: 'LEFT' | 'RIGHT' | 'TOP') {
		if (!drops.length) {
			activateGuard(origin);
			drops = Array(100)
				.fill('x')
				.map((_) => {
					const colorMap = {
						TOP: 'seagreen',
						LEFT: '#cd5c5c',
						RIGHT: 'skyblue'
					};
					const originMap = {
						TOP: randomVec3({ x: [-3, 3], y: [40, 100], z: [-3, 3] }),
						LEFT: randomVec3({ x: [-50, -200], y: [-3, 20], z: [-3, 3] }),
						RIGHT: randomVec3({ x: [50, 200], y: [-3, 20], z: [-3, 3] })
					};
					const lvMap = {
						TOP: { x: 0, z: 0 },
						LEFT: { z: randInt(-15, 15) },
						RIGHT: randomVec3({ x: [50, 200], y: [-3, 3], z: [-3, 3] })
					};
					return {
						color: colorMap[origin],
						origin: originMap[origin],
						linearVelocity: (_p: Position) => {
							let p = {
								x: 0,
								y: 0,
								z: 0,
								..._p
							};
							const lv = {
								x: origin === 'LEFT' ? 50 : origin === 'RIGHT' ? -50 : 0,
								y: origin === 'LEFT' || origin === 'RIGHT' ? randInt(5, 10) : 0,
								z: origin === 'LEFT' || origin === 'RIGHT' ? randInt(-5, 5) : 0
							};
							return lv;
						}
					};
				});
			setTimeout(() => {
				drops = [];
			}, 15000);
		}
	}

	const scaleGuardUp = () => {
		guardScaleX.set(20);
		guardScaleY.set(1);
		return guardScaleZ.set(20);
	};

	const scaleGuardDown = (delay = 15000) => {
		return guardScaleZ.set(0, { delay }).then(() => {
			guardScaleX.set(0);
			return guardScaleY.set(0);
		});
	};

	function activateGuard(origin: 'LEFT' | 'RIGHT' | 'TOP') {
		showGuard = origin === 'LEFT' ? 'RIGHT' : origin === 'RIGHT' ? 'LEFT' : '';
		scaleGuardUp()
			.then(() => scaleGuardDown())
			.then(() => {
				showGuard = '';
			});
	}

	function rotateLight() {
		lightRotation.set($lightRotation + Math.PI);
	}

	const guardPosition: any = {
		RIGHT: { x: 21 },
		LEFT: { x: -21 }
	};
	const guardRotation: any = {
		RIGHT: Math.PI / 2,
		LEFT: -Math.PI / 2
	};
	onMount(() => {
		entryScale.set(1.5);
	});
</script>

<PerspectiveCamera position={{ y: 25, z: 100 }} fov={30}>
	<OrbitControls
		autoRotate
		autoRotateSpeed={0.75}
		enablePan={false}
		enableZoom={true}
		enableRotate={false}
		target={{ x: 0, y: 10, z: 0 }}
	/>
</PerspectiveCamera>

<!-- LIGHT GROUP -->
<Group rotation={{ z: $lightRotation }}>
	<DirectionalLight shadow position={{ x: 35, y: 35, z: 35 }} />
</Group>

<!-- RANDOM DODEC -->
<RigidBody position={{ z: 0, y: 10 }}>
	<Collider shape="ball" args={[1]} />
	<Mesh
		geometry={geo.dodec}
		material={new MeshStandardMaterial({ color: 'pink', roughness: 0.25 })}
		castShadow
	/>
</RigidBody>

<!-- BACKGROUND -->
<Mesh
	geometry={geo.sphere}
	material={new MeshStandardMaterial({
		color: 'lightgrey',
		roughness: 0.5,
		metalness: 0.5,
		side: BackSide
	})}
	scale={400}
/>

<!-- ICOSAHEDRON MIRRORS -->

<AutoColliders shape="convexHull">
	<Mesh
		geometry={geo.icos}
		material={mat.GLASS}
		scale={{ x: 20, y: 1, z: 20 }}
		position={{ y: -2 }}
		receiveShadow
		interactive
		on:click={() => rotateLight()}
	/>
</AutoColliders>

<AutoColliders shape="convexHull">
	<Mesh
		geometry={geo.icos}
		material={mat.GLASS}
		scale={{ x: 20, y: 1, z: 20 }}
		position={{ x: -35, y: 20, z: -50 }}
		rotation={{ x: Math.PI / 8, z: Math.PI / 10 }}
		interactive
		on:click={() => (icosColor = '#ffffff')}
	/>
</AutoColliders>
<AutoColliders shape="convexHull">
	<Mesh
		geometry={geo.icos}
		material={mat.GLASS}
		scale={{ x: 20, y: 1, z: 20 }}
		position={{ x: 35, y: 15, z: 50 }}
		rotation={{ x: -Math.PI / 8, z: Math.PI / 10 }}
		interactive
		on:click={() => (icosColor = '#ffffff')}
	/>
</AutoColliders>
<AutoColliders shape="convexHull">
	<Mesh
		geometry={geo.icos}
		material={mat.GLASS}
		scale={{ x: 20, y: 1, z: 20 }}
		position={{ x: 35, y: -15, z: -50 }}
		rotation={{ x: Math.PI / 12, z: -Math.PI / 10 }}
		interactive
		on:click={() => (icosColor = '#ffffff')}
	/>
</AutoColliders>

<!-- GUARD -->
{#if showGuard}
	<Collider
		shape="cuboid"
		args={[20, 0.75, 20]}
		position={guardPosition[showGuard] || { x: 0 }}
		rotation={{ z: guardRotation[showGuard] }}
	>
		<Mesh
			geometry={geo.icos}
			material={mat.STANDARD}
			scale={{ x: $guardScaleX, y: $guardScaleY, z: $guardScaleZ }}
			receiveShadow
		/>
	</Collider>
{/if}
<!-- MAIN BOXES -->
<Group position={{ y: 1 }}>
	<Collider
		shape="cuboid"
		args={[0.75, 0.75, 0.75]}
		position={{ x: -3 }}
		rotation={{ x: Math.PI / 4, z: Math.PI / 4 }}
	>
		<Mesh
			geometry={geo.box}
			material={mat.RED}
			scale={$entryScale}
			castShadow
			interactive
			on:pointerenter={() => (icosColor = 'indianred')}
			on:click={() => activateDrops('LEFT')}
		/>
	</Collider>

	<Collider shape="cuboid" args={[0.75, 0.75, 0.75]} rotation={{ x: Math.PI / 4, z: Math.PI / 4 }}>
		<Mesh
			geometry={geo.box}
			material={mat.GREEN}
			scale={$entryScale}
			castShadow
			interactive
			on:pointerenter={() => (icosColor = 'seagreen')}
			on:click={() => activateDrops('TOP')}
		/>
	</Collider>
	<Collider
		shape="cuboid"
		args={[0.75, 0.75, 0.75]}
		position={{ x: 3 }}
		rotation={{ x: Math.PI / 4, z: Math.PI / 4 }}
	>
		<Mesh
			geometry={geo.box}
			material={mat.BLUE}
			scale={$entryScale}
			castShadow
			interactive
			on:pointerenter={() => (icosColor = 'skyblue')}
			on:click={() => activateDrops('RIGHT')}
		/>
	</Collider>
</Group>
<InstancedMesh geometry={geo.icos} material={mat.BLUE}>
	{#each Array(100) as _}
		<Collider shape="ball" args={[0.5]} position={randomVec3([-50, 50])}>
			<Instance color={randomColor()} rotation={{ z: -$lightRotation }} scale={0.25} />
		</Collider>
	{/each}
</InstancedMesh>
<InstancedMesh geometry={geo.sphere} material={mat.STANDARD}>
	{#each drops as drop}
		<RigidBody
			gravityScale={0.75}
			angularVelocity={{ x: Math.random() }}
			linearVelocity={drop.linearVelocity(drop.origin, drop.position)}
		>
			<Collider friction={-1} shape="ball" args={[0.5]} position={drop.origin}>
				<Instance color={drop.color} scale={0.5} />
			</Collider>
		</RigidBody>
	{/each}
</InstancedMesh>
