import type { ShaderContext } from "$lib/ts-models/general";
import { getContext } from "svelte";

export const glazeProps = {
	roughness: 0.15,
	transmission: 1,
	thickness: 2
};

// Credit: comment on https://css-tricks.com/snippets/javascript/random-hex-color/
export function randomColor(): string {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

export function useShader(): ShaderContext{
	return getContext('threlte-shader')
}