
<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import FallingSphere from "./FallingSphere.svelte"
  </script>
  
  
  <SC.Canvas
    background={new THREE.Color("#000000")}
    antialias={true}
    physicallyCorrectLights={false}
  >
  
    <SC.PerspectiveCamera 
      position={[0, 0, 10]}
      near={0.1}
      far={400}
      fov={55}
    />
  
    <SC.OrbitControls 
      enabled={true}
      enableZoom={true}
      autoRotate={false}
      autoRotateSpeed={2}
      enableDamping={true}
      dampingFactor={0.1}
    />
    
    <SC.AmbientLight
      color={new THREE.Color(0xff3e02)}
      intensity={0.75}
    />
  
    {#each {length: 50} as s, idx}
      <FallingSphere 
        initialPosition={[
        Math.cos(Math.PI * 2 * THREE.MathUtils.randFloat(-55, 55)) * 55, 
        Math.sin(Math.PI * 2 * THREE.MathUtils.randFloat(-55, 55)) * 55, 
        Math.sin(Math.PI * 2 * THREE.MathUtils.randFloat(-55, 55)) * 55
        ]} delay={idx * 1500}  
      />
    {/each}
    <SC.Mesh
      geometry={new THREE.SphereBufferGeometry()}      
      material={new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xff3e02),
        wireframe: false,
        metalness: 0,
        roughness: 1,
      })}
      position={[0,0,-55]}
      rotation={[0,0,0]}
      scale={[.15,.15,.15]}
      castShadow={false}
      receiveShadow={false}
    />
  
  
    <SC.Mesh
      geometry={new THREE.SphereBufferGeometry()}      
      material={new THREE.MeshPhysicalMaterial({
        roughness: .15,
        transmission: 1,
        // @ts-ignore
        thickness: 2,
      })}
      position={[0,0,0]}
      rotation={[0,0,0]}
      scale={[1,1,1]}
      castShadow={false}
      receiveShadow={false}
    />
  
  </SC.Canvas>
