<script lang="ts">
	import type { Vector3Tuple } from 'three';
	import { randFloat, randInt } from 'three/src/math/MathUtils';
	import {
		calculateNextPoint,
		defaultAngle,
		defaultAxis,
		defaultBranchRate,
		defaultBranchWidth,
		defaultColor1,
		defaultLength,
		defaultLineMaterial_0,
		defaultLineMaterial_1,
		defaultLineMaterial_2,
		defaultLineMaterial_3,
		defaultLineMaterial_4,
		defaultLineStart,
		allowRandomness
	} from './treeState';
	import { linear } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { Line2 } from '@threlte/core';
	import { onMount } from 'svelte';

	export let lineStart = defaultLineStart;
	export let length = defaultLength;
	export let angle = defaultAngle;
	export let axis = defaultAxis;
	export let branchRate = defaultBranchRate;
	export let branchWidth = defaultBranchWidth;
	export let color1 = defaultColor1;
	export let idx = 0;
	let pX = tweened(lineStart[0], { duration: 1000 / (idx || 1), easing: linear });
	let pY = tweened(lineStart[1], { duration: 1000 / (idx || 1), easing: linear });
	let pZ = tweened(lineStart[2], { duration: 1000 / (idx || 1), easing: linear });
	let renderNextBranches = false;
	let material = defaultLineMaterial_0;
	let lineEnd: Vector3Tuple;

	onMount(() => {
		lineEnd = calculateNextPoint(lineStart, angle, axis, length, !!idx && $allowRandomness);
		if (branchWidth > 0.2) {
			material = defaultLineMaterial_0;
		} else if (branchWidth > 0.18) {
			material = defaultLineMaterial_1;
		} else if (branchWidth > 0.14) {
			material = defaultLineMaterial_2;
		} else if (branchWidth > 0.1) {
			material = defaultLineMaterial_3;
		} else {
			material = defaultLineMaterial_4;
		}

		pX.set(lineEnd[0]);
		pY.set(lineEnd[1]);
		pZ.set(lineEnd[2]).then(() => {
			renderNextBranches = true;
		});
	});
</script>

<Line2 points={[lineStart, [$pX, $pY, $pZ]]} {material} />

{#if length > 1 && renderNextBranches}
	<svelte:self
		lineStart={lineEnd}
		length={length - defaultLength * ($allowRandomness ? randFloat(0.1, 0.2) : 0.165)}
		angle={angle + 90 * ($allowRandomness ? randFloat(0.1, 0.75) : 1)}
		axis="z"
		branchRate={$allowRandomness ? randInt(1, 4) : branchRate}
		branchWidth={branchWidth * 0.75}
		{color1}
		idx={idx + 1}
	/>
	{#if branchRate > 1}
		<svelte:self
			lineStart={lineEnd}
			length={length - defaultLength * ($allowRandomness ? randFloat(0.1, 0.2) : 0.165)}
			angle={angle - 90 * ($allowRandomness ? randFloat(0.1, 0.75) : 1)}
			axis="z"
			branchRate={$allowRandomness ? randInt(1, 4) : branchRate}
			branchWidth={branchWidth * 0.75}
			{color1}
			idx={idx + 1}
		/>
	{/if}
	{#if branchRate > 2}
		<svelte:self
			lineStart={lineEnd}
			length={length - defaultLength * ($allowRandomness ? randFloat(0.1, 0.2) : 0.165)}
			angle={angle + 90 * ($allowRandomness ? randFloat(0.1, 0.75) : 1)}
			axis="x"
			branchRate={$allowRandomness ? randInt(1, 4) : branchRate}
			branchWidth={branchWidth * 0.75}
			{color1}
			idx={idx + 1}
		/>
	{/if}
	{#if branchRate > 3}
		<svelte:self
			lineStart={lineEnd}
			length={length - defaultLength * ($allowRandomness ? randFloat(0.1, 0.2) : 0.165)}
			angle={angle - 90 * ($allowRandomness ? randFloat(0.1, 0.75) : 1)}
			axis="x"
			branchRate={$allowRandomness ? randInt(1, 4) : branchRate}
			branchWidth={branchWidth * 0.75}
			{color1}
			idx={idx + 1}
		/>
	{/if}
{/if}
