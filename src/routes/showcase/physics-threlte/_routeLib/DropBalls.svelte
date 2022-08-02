<script lang="ts">
	import Ball from './Ball.svelte';
	import { randomVec3 } from '$lib/utils/vectors';

	let count = 5;
	let balls = Array(count)
		.fill('x')
		.map((_) => generateBall());

	function generateBall(): any {
		return {
			position: randomVec3({ x: [-5, 5], y: [75, 300], z: [-5, 5] })
		};
	}
</script>

{#each balls as ball}
	<Ball position={ball.position} />
{/each}
