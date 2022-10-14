<script lang="ts">
	import { TorusGeometry, CircleGeometry, MeshStandardMaterial } from 'three';
	import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
	import { Mesh, MeshInstance } from '@threlte/core';
	const mirrorPlane = new CircleGeometry(15, 6);
	const reflector = new Reflector(mirrorPlane, {
		clipBias: 0.003,
		color: '#92e2f9'
	});

</script>

<Mesh
	geometry={new TorusGeometry(15, 0.1, 8, 6)}
	material={new MeshStandardMaterial({color: 'deeppink'})}
	position={{ y: 0 }}
	rotation={{ x: Math.PI / 2 }}
/>
<MeshInstance mesh={reflector} rotation={{ x: -Math.PI / 2 }} />
