import { Fresnel, LayerMaterial, Noise } from 'lamina/vanilla';
import { writable } from 'svelte/store';
import { BackSide, Color } from 'three';

export const orbit = writable(false);
export const power = writable(50);
export const moveTo = writable<'LEFT' | 'CENTER' | 'RIGHT'>('CENTER');

export const cloudyMaterial = new LayerMaterial({
	color: '#118be2',
	lighting: 'basic',
	side: BackSide,
	layers: [
		new Noise({
			colorA: new Color('#c3c3c3').convertSRGBToLinear(),
			colorB: new Color('#f8f8f8').convertSRGBToLinear(),
			colorC: new Color('#218ed1').convertSRGBToLinear(),
			colorD: new Color('#118be2').convertSRGBToLinear(),
			alpha: 0.5,
			scale: 2,
			type: 'perlin',
			offset: [0, 0, 0],
			mapping: 'local',
			mode: 'normal',
			visible: true
		})
	]
});

export const eclipseMaterial = new LayerMaterial({
	color: new Color('#152161').convertSRGBToLinear(),
	lighting: 'standard',
	layers: [
		new Fresnel({
			color: new Color('#ed0c0c').convertSRGBToLinear(),
			alpha: 1,
			power: 2,
			intensity: 1,
			bias: 0,
			mode: 'screen',
			visible: true
		})
	]
});
