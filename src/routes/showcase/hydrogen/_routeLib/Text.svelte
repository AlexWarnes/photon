<script lang="ts">
	import { type ThreltePointerEvent, Text, Group } from 'threlte';
	import { HTML, useCursor } from 'threlte/extras';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	const { onPointerEnter, onPointerLeave } = useCursor();

	let showDetails: boolean = false;

	const positionX = tweened(0, { duration: 400, easing: cubicOut });
	const detailScale = tweened(0, { duration: 400, easing: cubicOut });
	$: if (showDetails) {
		positionX.set(-5).then(() => detailScale.set(3));
	} else {
		detailScale.set(0).then(() => positionX.set(0));
	}

	const toggleDetails = (_: CustomEvent<ThreltePointerEvent>, status: boolean = !showDetails) =>
		(showDetails = status);
</script>

<Text
	text="SIPRI Yearbook 2022"
	font="/assets/ChakraPetch-Medium.ttf"
	scale={3}
	position={{ y: 2, z: -8 }}
	anchorX="center"
/>

<Group position={{ x: $positionX }}>
	<Text
		text="WORLD"
		font="/assets/ChakraPetch-Medium.ttf"
		scale={9}
		position={{ y: 1.5, z: -10 }}
		anchorX="center"
		interactive
		on:click={toggleDetails}
		on:pointerenter={onPointerEnter}
		on:pointerleave={onPointerLeave}
	/>
	<Text
		text="NUCLEAR"
		font="/assets/ChakraPetch-Medium.ttf"
		scale={9}
		position={{ y: 0, z: -10 }}
		anchorX="center"
		interactive
		on:click={toggleDetails}
		on:pointerenter={onPointerEnter}
		on:pointerleave={onPointerLeave}
	/>
	<Text
		text="FORCES"
		font="/assets/ChakraPetch-Medium.ttf"
		scale={9}
		position={{ y: -1.5, z: -10 }}
		anchorX="center"
		interactive
		on:click={toggleDetails}
		on:pointerenter={onPointerEnter}
		on:pointerleave={onPointerLeave}
	/>
</Group>

{#if showDetails}
	<Group
		position={{ x: 1, y: 1, z: -5 }}
		scale={{ x: $detailScale, y: $detailScale, z: $detailScale }}
	>
		<Text
			text="...although the total number of nuclear weapons declined slightly between January 2021 and January 2022, the number will probably increase in the next decade."
			font="/assets/ChakraPetch-Medium.ttf"
			maxWidth={2}
			position={{ y: 0 }}
			anchorX="center"
		/>
		<Text
			text={`"There are clear indications that the reductions that have characterized global nuclear arsenals since the end of the cold war have ended."`}
			font="/assets/ChakraPetch-Medium.ttf"
			maxWidth={2}
			position={{ y: -0.75 }}
			anchorX="center"
		/>
		<Text
			text="- Hans M. Kristensen, Stockholm International Peace Research Institute"
			font="/assets/ChakraPetch-Medium.ttf"
			maxWidth={2}
			position={{ x: 0.125, y: -1.5 }}
			anchorX="center"
		/>

		<HTML position={{ x: 1, y: -2 }}>
			<a
				in:fade={{ delay: 500 }}
				href="https://sipri.org/media/press-release/2022/global-nuclear-arsenals-are-expected-grow-states-continue-modernize-new-sipri-yearbook-out-now"
				target="_blank">Learn More</a
			>
		</HTML>
	</Group>
{/if}

<style>
	a {
		background: #fafbfc;
		color: #444444;
		display: inline-block;
		padding: 0.5rem;
		width: 8rem;
		text-align: center;
	}
</style>
