<script lang="ts">
	import { Collider } from '@threlte/rapier';
	import { tweened } from 'svelte/motion';

	import { shockwavePosition } from './state';
	let yPos = tweened(-5, { duration: 75 });
	$: if ($shockwavePosition) {
		yPos.set(1).then(() => yPos.set(-5));
	}
</script>

<Collider
	shape={'cone'}
	position={{ x: $shockwavePosition.x, y: $yPos, z: $shockwavePosition.z }}
	args={[5, 15]}
/>
