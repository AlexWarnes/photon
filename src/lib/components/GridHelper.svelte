<script lang="ts">
	import { GridHelper } from 'three';
	import { Object3DInstance } from '@threlte/core';

	export let size: number = 100;
	export let divisions: number = 50;
</script>

<Object3DInstance object={new GridHelper(size, divisions)} />
