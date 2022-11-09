<script lang="ts">
  // Copied from https://github.com/threlte/threlte/blob/827aed24273e034f7b622a841209ff443bd3293b/apps/docs/src/examples/core/three-arcade-game/ArcadeMachineScene.svelte
	import { useThrelte } from '@threlte/core'
	import {
		BloomEffect,
		BrightnessContrastEffect,
		ChromaticAberrationEffect,
		EffectComposer,
		EffectPass,
		KernelSize,
		RenderPass,
		SMAAEffect,
		SMAAPreset
	} from 'postprocessing'
	import { onDestroy } from 'svelte'
	import { tweened } from 'svelte/motion'
	import { Vector2 } from 'three'

	const ctx = useThrelte()

  const state: string = 'on'
  const arcadeMachineScene = ctx.scene;
	const { camera, renderer, } = ctx

	let bloomEffect: BloomEffect | undefined = undefined

	const bloomIntensity = tweened(state === 'off' ? 0 : 0.5, {
		duration: 3e3
	})
	// $: bloomIntensity.set(state === 'off' ? 0 : 1)
	$: if (bloomEffect) bloomEffect.intensity = $bloomIntensity

	const composer = new EffectComposer(renderer)
	ctx.composer = composer as any

	const addComposerAndPasses = () => {
		composer.removeAllPasses()

		composer.addPass(new RenderPass(arcadeMachineScene, $camera))
		bloomEffect = new BloomEffect({
			intensity: $bloomIntensity,
			luminanceThreshold: 0.25,
			height: 512,
			width: 512,
			luminanceSmoothing: 0.08,
			mipmapBlur: false,
			kernelSize: KernelSize.MEDIUM
		})
		bloomEffect.luminancePass.enabled = true
		;(bloomEffect as any).ignoreBackground = true
		composer.addPass(new EffectPass($camera, bloomEffect))
		// composer.addPass(
		// 	new EffectPass(
		// 		$camera,
		// 		new ChromaticAberrationEffect({
		// 			offset: new Vector2(0.0005, 0.0005),
		// 			modulationOffset: 0,
		// 			radialModulation: false
		// 		})
		// 	)
		// )
		composer.addPass(
			new EffectPass(
				$camera,
				new BrightnessContrastEffect({
					brightness: 0,
					contrast: 0.1
				})
			)
		)
		composer.addPass(
			new EffectPass(
				$camera,
				new SMAAEffect({
					preset: SMAAPreset.LOW
				})
			)
		)
	}

	$: if (renderer && $camera && arcadeMachineScene) {
		addComposerAndPasses()
	}
	onDestroy(() => {
		composer.removeAllPasses()
	})
</script>