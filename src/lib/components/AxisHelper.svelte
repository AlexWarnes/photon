<script lang="ts">
	import { AxesHelper, DodecahedronBufferGeometry, GridHelper, MeshStandardMaterial } from 'three';
	import { Object3DInstance } from '@threlte/core';

	export let length: number = 5;
</script>

<Object3DInstance object={new AxesHelper(length)} />
