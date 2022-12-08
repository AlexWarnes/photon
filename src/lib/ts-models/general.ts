import type { Writable } from "svelte/store";
import type { IUniform, Vector2 } from "three";

export type RequestStatus = 'LOADING' | 'ERROR' | 'SUCCESS';

export interface OptionConfig {
	value: any;
	displayValue: string;
}

export type Option = OptionConfig | string;

export type ModelName =
	| 'littleCity'
	| 'mountains'
	| 'llama'
	| 'pug'
	| 'sheep'
	| 'rocinante'
	| 'dsn'
	| 'nefertiti';

export type ModelURLConfig = {
	[key in ModelName]: string;
};

export interface Vec3RangeObj {
  x?: [number, number];
  y?: [number, number];
  z?: [number, number];
}

export type Vec3RangeOptions = Vec3RangeObj | [number, number];


// SHADER STUFF
export interface ThrelteUniforms {
	// u_time: { type: 'f'; value: number };
	// u_resolution: { type: 'v2'; value: Vector2 };
	// u_mouse: { type: 'v2'; value: Vector2 };
	// u_mouse_norm: { type: 'v2'; value: Vector2 };
	[uniform: string]: IUniform<any>;
}
export interface ShaderContext {
	uniforms: Writable<ThrelteUniforms>
}

