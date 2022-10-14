<script lang="ts">
	import { BoxGeometry, MeshStandardMaterial, } from "three";
	import { Mesh, Group, type Position } from "@threlte/core"
	import { Collider, } from "@threlte/rapier"
	import { tweened } from "svelte/motion";
	import { elasticInOut } from "svelte/easing";
	import { onMount } from "svelte";
	import {
		trackWidth,
		trackHeight,
		trackLength,
	} from "./state";

	
	export let position: Position;
	const positionX = tweened(position.x, {duration: 4000, easing: elasticInOut})
	const geometry = new BoxGeometry();
	const material = new MeshStandardMaterial({color: '#ff0000', toneMapped: false});
	const width = trackWidth / 2 - 2;
	const height = trackHeight - 2
	const depth = 1;
	
	function shift(){
		positionX.set($positionX > 0 ? -(width - 2): width - 2).then(() => shift())
	}
	
	onMount(() => {
		shift();
	})
</script>

<Collider shape="cuboid" args={[width / 2, height / 2, depth / 2]} position={{x: $positionX, y: position.y, z: position.z}}>
	<Mesh 
		{geometry}
		{material}
		castShadow
		receiveShadow
		scale={{x: width, y: height, z: depth}}
	/>
</Collider>