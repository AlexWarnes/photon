<script lang="ts">
	import { Collider, RigidBody } from '@threlte/rapier';
	import { Text } from '@threlte/extras';
	import { Color } from 'three';
	import { tweened } from 'svelte/motion';
	import { elasticOut } from 'svelte/easing';

	export let showVersion: boolean = false;
	let versionRigid: boolean = false;
	const color = new Color('#ff3e01').convertSRGBToLinear();
	const outlineColor = new Color('#483d8b').convertSRGBToLinear();
	const versionY = tweened(-7, { duration: 4000, easing: elasticOut, delay: 1750 });

	$: if (showVersion) {
		versionY.set(15).then(() => (versionRigid = true));
	}
</script>

<Collider
	shape="cuboid"
	args={[12, 2, 1]}
	position={{ x: -5, y: 25, z: -5 }}
	rotation={{ y: Math.PI / 4 }}
>
	<Text
		text="threlte"
		{color}
		{outlineColor}
		outlineWidth={0.01}
		position={{ x: 0, y: -2 }}
		anchorY="bottom-baseline"
		anchorX="center"
		scale={75}
		letterSpacing={0.125}
		font="/assets/ChakraPetch-Medium.ttf"
	/>
</Collider>

{#if versionRigid}
	<RigidBody position={{ y: 15 }} rotation={{ x: 0.015, y: Math.PI / 4 }}>
		<Collider shape="cuboid" args={[2.5, 1.75, 1]}>
			<Text
				text="v4"
				{color}
				{outlineColor}
				outlineWidth={0.01}
				position={{ y: -2 }}
				anchorY="bottom-baseline"
				anchorX="center"
				scale={50}
				letterSpacing={0.125}
				font="/assets/ChakraPetch-Medium.ttf"
			/>
		</Collider>
	</RigidBody>
{:else}
	<Collider
		shape="cuboid"
		args={[2.5, 1.75, 1]}
		position={{ y: $versionY }}
		rotation={{ x: 0.015, y: Math.PI / 4 }}
	>
		<Text
			text="v4"
			{color}
			{outlineColor}
			outlineWidth={0.01}
			position={{ y: -2 }}
			anchorY="bottom-baseline"
			anchorX="center"
			scale={50}
			letterSpacing={0.125}
			font="/assets/ChakraPetch-Medium.ttf"
		/>
	</Collider>
{/if}
