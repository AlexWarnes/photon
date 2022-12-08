<script lang="ts">
	import type { ShaderContext, ThrelteUniforms } from '$lib/ts-models/general';
	import { useFrame, useThrelte, type Size } from '@threlte/core';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { writable, } from 'svelte/store';
	import { Vector2, type IUniform } from 'three';
  const { size, renderer, pointer } = useThrelte();
  
	let m = {
    x: 0,
		y: 0
	};

	const defaultUniforms: ThrelteUniforms = {
    u_time: { type: 'f', value: 1.0 } as IUniform<any>,
		u_resolution: { type: 'v2', value: new Vector2() } as IUniform<any>,
		u_mouse: { type: 'v2', value: new Vector2() } as IUniform<any>,
		u_mouse_norm: { type: 'v2', value: new Vector2() } as IUniform<any>
	};
	const uniforms = writable(defaultUniforms);
  
  setContext<ShaderContext>('threlte-shader', {
		uniforms,
    // add other helpful things here
	});
	let { uniforms: _uniforms } = getContext<ShaderContext>('threlte-shader');


	function updateUTime(d: number): void {
    _uniforms.update((u) => {
      u.u_time.value += d;
			return u;
		});
	}
	function updateUSize(s: Size): void {
    _uniforms.update((u) => {
      u.u_resolution.value.set(s.width, s.height);
			return u;
		});
	}
	function updateUMouse(m: { x: number; y: number }, p: Vector2): void {
    _uniforms.update((u) => {
      u.u_mouse.value.set(m.x, m.y);
			u.u_mouse_norm.value = p;
			return u;
		});
	}
  function handleMM(e: MouseEvent) {
    m = {
      x: e.clientX,
      y: e.clientY
    };
  }
  
  // See comment below for pointer trade-offs
	onMount(() => {
    renderer?.domElement.addEventListener('pointermove', handleMM);
	});
  onDestroy(() => {
    renderer?.domElement.removeEventListener('pointermove', handleMM);
  })
  
  // Constantly updating time
	useFrame((_, delta) => {
    updateUTime(delta);
	});

  // Handles resizing
	$: updateUSize($size);
  
  /**
   * Downside with $pointer and renderer.domElement approach 
   * is that canvas overlays prevent updates,but maybe that's 
   * okay/expected?
   * 
   * The alternative is to use svelte:window, but the downside
   * there is that will capture ALL mousemovements, not just 
   * the ones over the canvas. 
   * 
   * Could maybe allow for a wrapper id argument that we could bind to.
   * That would capture movement over the wrapper, and would
   * include overlays. :shrug:
   */
  $: updateUMouse(m, $pointer);


// const basicVertexShader = `
//   varying vec3 vUv; 

//   void main() {
//     vUv = position; 

//     vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
//     gl_Position = projectionMatrix * modelViewPosition; 
//   }
// `;
</script>

<slot />
