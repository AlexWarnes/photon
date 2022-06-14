import { tweened } from "svelte/motion";
import { cubicInOut } from "svelte/easing";
export interface SphereConfig {
  id: string;
  noiseType: "perlin" | "curl" | "cell" | "white" | "simplex";
  position: [number, number, number]
}
export const noiseScale = tweened(3, { duration: 2000, easing: cubicInOut })

export const spheres = [
		{
			id: "s1",
			noiseType: "perlin",
			position: [-5, 0, 0]
		},
		{
			id: "s2",
			noiseType: "curl",
			position: [-2.5, 0, 0]
		},
		{
			id: "s3",
			noiseType: "cell",
			position: [0, 0, 0]
		},
		{
			id: "s4",
			noiseType: "white",
			position: [2.5, 0, 0]
		},
		{
			id: "s5",
			noiseType: "simplex",
			position: [5, 0, 0]
		},
	] as SphereConfig[]
