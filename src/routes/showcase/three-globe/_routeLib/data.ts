import { writable } from "svelte/store";

// Source: https://github.com/vasturiano/three-globe/blob/master/example/basic/index.html
const pointsCount = 300;
const _pointsData = [...Array(pointsCount).keys()].map(() => ({
	lat: (Math.random() - 0.5) * 180,
	lng: (Math.random() - 0.5) * 360,
	size: Math.random() / 3,
	color: ['salmon', 'goldenrod', 'dodgerblue', 'lightseagreen'][Math.round(Math.random() * 3)]
}));

// Source: https://github.com/vasturiano/three-globe/blob/master/example/links/index.html
const arcsCount = 20;
const _arcsData = [...Array(arcsCount).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: ['salmon', 'goldenrod', 'dodgerblue', 'lightseagreen'][Math.round(Math.random() * 3)]
}));


export const pointsData = writable(_pointsData)
export const arcsData = writable(_arcsData)