<script lang="ts">
	import { BoxGeometry, MeshStandardMaterial, } from "three";
	import { Mesh, Group, useFrame, type Position } from "@threlte/core"
	import { Collider, } from "@threlte/rapier"
	import { trackWidth, trackHeight } from "./state";
	import { tweened } from "svelte/motion";
	import { cubicOut, elasticOut } from "svelte/easing";
	import { onMount } from "svelte";
	
	export let position: Position;
	export let type; // "VERT" | "SPIN"

	const positionY = tweened(position.y, {duration: 2000, easing: elasticOut});
	let rotationY = 0;

	const geometry = new BoxGeometry();
	const material = new MeshStandardMaterial({color: '#ff0000', toneMapped: false});
	
	const width = trackWidth * 0.75;
	const height = 3;
	const depth = 1;
	
	function shift(){
		positionY.set($positionY > (trackHeight - 3) / 2 ? 2 : (trackHeight - 2)).then(() => shift())
	}
	
	if (type === "VERT") {
		onMount(() => {
			shift();
		})		
	}
	
	if (type === "SPIN") {
		useFrame(() => {
			rotationY += 0.08;
		})
	}
</script>

<Collider shape="cuboid" args={[width / 2, height / 2, depth / 2]} 
	position={{x: position.x, y: $positionY, z: position.z}}
	rotation={{ y: rotationY }}
	friction={0}
>
	<Mesh 
		{geometry}
		{material}
		castShadow
		receiveShadow
		scale={{x: width, y: height, z: depth}}
	/>
</Collider>