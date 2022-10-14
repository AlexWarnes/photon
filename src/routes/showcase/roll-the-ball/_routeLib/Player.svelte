<script lang="ts">
	import {
		IcosahedronGeometry,
		MeshStandardMaterial,
		SphereGeometry,
		Vector3
		} from "three";
	import {
		Mesh,
		PerspectiveCamera,
		OrbitControls,
		Group,
		useFrame,
		DirectionalLight,
		SpotLight
	} from '@threlte/core';
	import { Collider, RigidBody } from '@threlte/rapier';
	import { status, movement, handleKeys, rbp, trackHeight, type InputAction } from './state';
	
	let rb: any; // RigidBody ref
	let defaultPosition = new Vector3(0, 5, -5);
	const moveForce = 1;
	const jumpForce = 3;
	
	function move(direction: InputAction) {
		const v3 = new Vector3(0, 0, 0)
		switch(direction) {
			case "RIGHT":
				v3.setX(moveForce)
				break
			case "LEFT":
				v3.setX(-moveForce)
				break
			case "FORWARD":
				v3.setZ(-moveForce)
				break
			case "BACKWARD":
				v3.setZ(moveForce)
				break
			default:
				console.log("Unrecognized direction:", direction)
		}
		rb.applyImpulse(v3, true)
	}

	function jump() {
		if(rb?.translation()?.y > trackHeight + 1) return;
		const v3 = new Vector3(0, 0, 0)
		v3.setY(jumpForce)
		rb.applyImpulse(v3, true)
	}

	function reset() {
		if(rb) {
			rb.setTranslation(defaultPosition)
		}
	}
	
	function processMovement(){
		if ($movement["JUMP"]) {
			jump();
		}
		if ($movement["RIGHT"]) {
			move("RIGHT")
		}
		if ($movement["LEFT"]) {
			move("LEFT")
		}
		if ($movement["FORWARD"]) {
			move("FORWARD")
		}
		if ($movement["BACKWARD"]) {
			move("BACKWARD")
		}
	}
	
	useFrame(() => {
		if(rb){
			rbp.next(rb.translation());
			processMovement();
		}
	})
	
	$: if(rb) {
		rb.setLinearDamping(0.5);
		rb.setAngularDamping(0.5);
	}

	$: if ($status === "IDLE") {
		reset();
	}

</script>

<svelte:window 
	on:keydown={(evt) => handleKeys(evt, true)} 
	on:keyup={(evt) => handleKeys(evt, false)}
/>

<RigidBody  bind:rigidBody={rb} position={defaultPosition} gravityScale={5}>
	<Collider shape="ball" args={[1.5]} mass={1.5} restitution={1}/>
	<Mesh 
		geometry={new IcosahedronGeometry(1.5, 1)} 
		material={new MeshStandardMaterial({color: '#612899', flatShading: true})} 
		castShadow
	/>
</RigidBody>

