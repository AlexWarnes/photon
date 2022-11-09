<script lang="ts">
	import { Mesh, OrthographicCamera } from "@threlte/core";
	import { MeshBasicMaterial, TorusGeometry } from "three";


</script>

<Mesh 
  geometry={new TorusGeometry(1, 0.025)}
  material={new MeshBasicMaterial({color: 'red', wireframe: true})}
  position={{ z: 100 }}
  scale={3}
/>
