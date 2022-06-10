<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { elasticOut, linear } from "svelte/easing"
  import { LayerMaterial, Color, Noise } from "lamina/vanilla";
	import { noiseScale } from "./store";
	
	export let delay = 0;
	export let noiseType;
	export let position: [number, number, number];
	const scale = tweened(0, { duration: 1500, easing: elasticOut, delay: 500 + (delay * 400) })
	const offset = tweened(0, {duration: 30000, easing: linear})

	onMount(() => {
		scale.set(1)
		offset.set(5)
	})
	let noisyMaterial = new LayerMaterial({
		layers: [
			new Color({
				color: new THREE.Color("#161616"),
				alpha: 1,
				mode: "normal",
			}),
			new Noise({
				name: "noise",
				colorA: new THREE.Color("#161616").convertSRGBToLinear(),
				colorB: new THREE.Color("#ff1744"),
				colorC: new THREE.Color("#000000").convertSRGBToLinear(),
				colorD: new THREE.Color("#1976d2"),
				alpha: 1,
				mode: "normal",
				scale: 2,
				type: noiseType,
				offset: [$offset, $offset, $offset]
			}),
		]
	})
	function updateNoiseLayer(key: string, value: any): void {
    // @ts-ignore
		noisyMaterial.layers.find(l => l.name === "noise")[key] = value;
		noisyMaterial = noisyMaterial;
	}
	$: updateNoiseLayer("offset", [$offset, $offset, $offset])
	$: updateNoiseLayer("scale", $noiseScale)
	$: {
		if($offset === 5){
			offset.set(0)
		} else if ($offset === 0) {
			offset.set(5)
		}
	}
</script>

<SC.Mesh 
	geometry={new THREE.SphereBufferGeometry()} 
	material={noisyMaterial}
	scale={[$scale, $scale, $scale]}
	{position}
/>
