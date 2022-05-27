<script lang="ts">
	import * as SC from 'svelte-cubed';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import type { RequestStatus } from '../ts-models/general';

	// Component Props
	export let modelURL: string;
	export let scale: [number, number, number] = [1, 1, 1];
	export let position: [number, number, number] = [0, 0, 0];
	export let rotation: [number, number, number] = [0, 0, 0];
	export let name: string = 'UniqueName_' + Math.random() + Date.now();

	let model: any = null;

	// 	Custom Event to track loading status from parent
	const dispatch = createEventDispatcher();
	function emitStatus(status: RequestStatus): void {
		dispatch('statusChange', { name, status });
	}

	function loadGLTF(): Promise<any> {
		const loader = new GLTFLoader();
		return loader.loadAsync(modelURL);
	}

	onMount(() => {
		if (modelURL) {
			emitStatus('LOADING');
			loadGLTF()
				.then((_model) => {
					model = _model;
					emitStatus('SUCCESS');
				})
				.catch((err) => {
					console.error('Error loading model:', name, err);
					emitStatus('ERROR');
				});
		}
	});
</script>

{#if model}
	<SC.Primitive object={model.scene} {scale} {position} {rotation} />
{/if}
