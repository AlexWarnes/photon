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
