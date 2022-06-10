<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { LayerMaterial, Gradient } from "lamina/vanilla";

  const backgroundMaterial = new LayerMaterial({
    side: THREE.BackSide,
    layers: [
      new Gradient({
        colorA: new THREE.Color("#e74c3c"),
        colorB: new THREE.Color("#000000"),
        alpha: 1,
				end: .5,
      }),
    ],
  });
</script>

<SC.Mesh
  geometry={new THREE.SphereBufferGeometry(1, 64, 64)}
  material={backgroundMaterial}
  scale={[50, 50, 50]}
/>
