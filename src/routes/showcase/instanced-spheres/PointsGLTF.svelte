<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { onMount } from 'svelte';
	import { modelURL } from '$lib/data/resources';
import MicroLoading from '$lib/components/MicroLoading.svelte';

  let status = "LOADING";
	let model: any = null;
	function loadGLTF() {
		const loader = new GLTFLoader();
		loader.loadAsync(modelURL['nefertiti']).then((_model: any) => {
			let material = new THREE.PointsMaterial({
				color: 0xff3e02,
				size: 0.1
			});
			model = new THREE.Points(_model.scene.children[0].geometry, material);
      status = "SUCCESS";
		});
	}

	onMount(() => {
		loadGLTF();
	});
</script>

{#if model}
	<SC.Primitive object={model} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
{/if}
<MicroLoading showLoading={status === "LOADING"} />
