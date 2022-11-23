<script lang="ts">
	import StarField from '$lib/components/StarField.svelte';
	import  { Group, type Rotation } from '@threlte/core';
	export let rotation: Rotation;
</script>

<Group {rotation}>
	<StarField count={300} innerRadius={400} outerRadius={800} />
</Group>