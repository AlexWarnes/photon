<script lang="ts">
	import { Object3DInstance, useFrame } from '@threlte/core';
	import ThreeGlobe from 'three-globe';

	export let pointsData: any = [];
	export let arcsData: any = [];

	let globe: any = new ThreeGlobe()
		.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
		.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
		.pointsData(pointsData)
		.pointAltitude('size')
		.pointColor('color')
		.arcsData(arcsData)
		.arcColor('color')
		.arcDashLength(0.4)
		.arcDashGap(4)
		.arcDashInitialGap(() => Math.random() * 5)
		.arcDashAnimateTime(1000);

	useFrame(() => {
		globe = globe;
	});

	function updateGlobeData(key: string, value: any[]) {
		if (globe) {
			if (key === 'pointsData') {
				globe.pointsData(value);
			} else if (key === 'arcsData') {
				globe.arcsData(value);
			}
		}
	}

	$: updateGlobeData('pointsData', pointsData);
	$: updateGlobeData('arcsData', arcsData);
</script>

<Object3DInstance object={globe} scale={0.05} />
