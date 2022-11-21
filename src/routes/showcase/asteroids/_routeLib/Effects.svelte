<script lang="ts">
  import { useThrelte, } from '@threlte/core';
  import {
    BloomEffect,
    ChromaticAberrationEffect,
    PixelationEffect,
    EffectComposer,
    EffectPass,
    RenderPass,
	// GlitchEffect
  } from "postprocessing";
	// import { showGlitch } from './state';

  const ctx = useThrelte()
  const { renderer, camera, scene, } = ctx;
  const composer = new EffectComposer(renderer)
	ctx.composer = composer as any;

  // const glitchStrength = new Vector2(0.01, 0.1)
  // const glitchDelay = new Vector2(2, 8)

  // let glitchPass: any;
  function addComposerAndPasses(){
    composer.addPass(new RenderPass(scene, $camera));

    // Bloom
    composer.addPass(new EffectPass($camera, new BloomEffect({
      luminanceThreshold: 0.5,
      intensity: 2,
      mipmapBlur: false,
      // luminanceSmoothing: 4,
    })));
    
    // // ChromaticAberrationEffect
    composer.addPass(new EffectPass($camera, new ChromaticAberrationEffect()))
    
    // Pixelation
    composer.addPass(new EffectPass($camera, new PixelationEffect(3)))

    // if($showGlitch){
    //   glitchPass = new EffectPass($camera, new GlitchEffect());
    //   composer.addPass(glitchPass);
    //   showGlitch.set(false);
    // } else if (!!glitchPass) {
    //   composer.removePass(glitchPass)
    // }


    composer.render()
  }

  $: if (renderer && scene && $camera) {
    addComposerAndPasses();
  }

</script>

