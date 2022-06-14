<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { quintIn } from "svelte/easing";
    
  export let initialPosition: [number, number, number];
  export let delay;
  let hide: boolean;
  let pX = tweened(initialPosition[0], { duration: 1000, easing: quintIn, delay })
  let pY = tweened(initialPosition[1], { duration: 1000, easing: quintIn, delay })
  let pZ = tweened(initialPosition[2], { duration: 1000, easing: quintIn, delay })
  onMount(() => {
    pX.set(-initialPosition[0])
    pY.set(-initialPosition[1])
    pZ.set(-initialPosition[2])
  })
    
  </script>
  
  {#if !hide}
  <SC.Mesh
          geometry={new THREE.SphereBufferGeometry()}      
          material={new THREE.MeshStandardMaterial({
            color: new THREE.Color(0xff3e02),
            wireframe: false,
            metalness: 0,
            roughness: 1,
          })}
          position={[
            $pX, 
            $pY, 
            $pZ
          ]}
           scale={[
           .15,
           .15,
           .15
           ]}
    >
    <SC.PointLight
      color={new THREE.Color(0xff3e02)}
      intensity={0.25}
    />
    </SC.Mesh>
  {/if}