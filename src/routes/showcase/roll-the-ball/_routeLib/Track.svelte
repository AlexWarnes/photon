<script>
	import {
		BoxGeometry,
		MeshStandardMaterial,
	} from "three";
	import {
		Mesh,
		Group
	} from "@threlte/core"
	import {
		AutoColliders,
		Collider
	} from "@threlte/rapier"
	import {
		trackWidth,
		trackHeight,
		trackLength,
		status
	} from "./state";
	
	const geometry = new BoxGeometry();
	const wallMaterial = new MeshStandardMaterial({color: '#495A6B',});
</script>

	<AutoColliders shape="cuboid" friction={0}>
		<Mesh {geometry} material={wallMaterial}
			receiveShadow
			castShadow
			scale={{x: 1, y: trackHeight, z: trackLength}}
			position={{x: -trackWidth / 2, y: trackHeight / 2, z: -trackLength / 2}}
		/>
		<Mesh {geometry} material={wallMaterial}
			receiveShadow
			castShadow
			scale={{x: 1, y: trackHeight, z: trackLength}}
			position={{x: trackWidth / 2, y: trackHeight / 2, z: -trackLength / 2}}
		/>
		<Mesh {geometry} material={wallMaterial}
			receiveShadow
			castShadow
			scale={{x: trackWidth, y: trackHeight, z: 1}}
			position={{x: 0, y: trackHeight / 2, z: -trackLength}}
		/>
		<Mesh {geometry} material={new MeshStandardMaterial({color: '#03ff00'})}
			receiveShadow
			scale={{x: trackWidth + 1, y: 1, z: trackLength + 0.1}}
			position={{x: 0, y: 0, z: -trackLength / 2}}
		/>
	</AutoColliders>

		