<script lang="ts">
	import { Object3DInstance, useFrame, useThrelte } from 'threlte';
	import ThreeGlobe from 'three-globe';
	import { Raycaster } from 'three';
	import { displayData, hexData } from './data';
	import { randomColor } from '$lib';

	let globe: any = new ThreeGlobe()
		.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
		.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
		.hexPolygonsData(hexData)
		.hexPolygonColor(randomColor)
		.hexPolygonResolution(4)
		.hexPolygonAltitude(0.05)
		.hexPolygonMargin(0.2);

	const raycaster = new Raycaster();
	const { pointer, camera } = useThrelte();

	// This only works... sometimes? Very buggy
	function checkHover(vec2: any, cam: any) {
		if (!(globe && vec2 && cam && !!pointsAsObj3d[0])) return;
		raycaster.setFromCamera(vec2, cam);

		// Determine what the raycaster is intersecting with
		let io = raycaster.intersectObjects(pointsAsObj3d, false);

		// If anything
		if (io.length) {
			// handle intersected objects,
			console.log('io:', io);

			// set displayData to the data we want to display (this is rendered in index.svelte)
			//@ts-ignore
			$displayData = io[0]?.object?.__data.properties || {};
		}
	}

	// An array of Obj3d for the raycaster to determine intersections
	// three-globe data is not Obj3d type, but includes the __threeObj property which is
	let pointsAsObj3d: any[] = [];
	$: if (globe && globe.hexPolygonsData()) {
		let tempArr = [];
		for (let h of globe.hexPolygonsData()){
			if(h.__threeObj){
				tempArr.push(h.__threeObj)
			}
		}
		pointsAsObj3d = tempArr;
	}
	$: checkHover($pointer, $camera);

</script>

{#if globe}
	<Object3DInstance object={globe} scale={0.02} />
{/if}
