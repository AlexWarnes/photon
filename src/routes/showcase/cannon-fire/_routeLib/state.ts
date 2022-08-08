import { LayerMaterial, Noise } from 'lamina/vanilla';
import { writable } from 'svelte/store';
import { BackSide, Color } from 'three';

export const gravity = writable(1);
export const orbit = writable(false);
export const debug = writable(false);
export const power = writable(50);

export const cloudyMaterial = new LayerMaterial({
	color: new Color('lightskyblue').convertSRGBToLinear(),
	lighting: 'basic',
	side: BackSide,
	layers: [
		new Noise({
			colorA: new Color('#c3c3c3').convertSRGBToLinear(),
			colorB: new Color('#f8f8f8').convertSRGBToLinear(),
			colorC: new Color('#218ed1').convertSRGBToLinear(),
			colorD: new Color('#118be2').convertSRGBToLinear(),
			alpha: 0.3,
			scale: 2,
			type: 'perlin',
			offset: [0, 0, 0],
			mapping: 'local',
			mode: 'normal',
			visible: true
		})
	]
});
