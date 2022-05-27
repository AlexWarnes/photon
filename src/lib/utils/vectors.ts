import { tweened } from "svelte/motion";
import { elasticOut, linear } from "svelte/easing"

const defaultConfig = {
  start: 0,
  end: 15,
  duration: 15000,
  easing: linear,
}

export function oscillatingValue(config = defaultConfig){
  const { start, end, duration, easing } = config;
  return tweened(start, {duration, easing});
}

export const oscillatingVector = () => {
  const v = oscillatingValue(); 
  return [v, v, v]
}

/*
	import { rxThrottle } from 'svelte-fuse-rx';

	// 	Variables to handle mousemoves
	let cameraShift = true;
	let innerHeight: number;
	let innerWidth: number;
	let defaultRigPosition = [0, 10, 50];
	let rigPosition = defaultRigPosition;
	function handleMM({ detail }: any) {
		if (cameraShift) {
			const m = new THREE.Vector2(
				THREE.MathUtils.mapLinear(detail.x / innerWidth, 0, 1, 15, -15),
				THREE.MathUtils.mapLinear(detail.y / innerHeight, 0, 1, 15, -15)
			);
			console.log("rig:",m, [defaultRigPosition[0] - m.x, defaultRigPosition[1] + m.y, 50])
			rigPosition = [-m.x, m.y, 50];
			// rigPosition = [defaultRigPosition[0] - m.x, defaultRigPosition[1] + m.y, 50];
		}
	}
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div
	use:rxThrottle={{
		on: 'mousemove',
		duration: 30
	}}
	on:rxEmit={handleMM}
>
</div>
*/