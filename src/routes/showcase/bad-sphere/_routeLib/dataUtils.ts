import { randomAngle } from '$lib/utils/vectors';
import { Matrix4, Vector3 } from 'three';
import { randInt, randFloat } from 'three/src/math/MathUtils';

export type TrigFn = 'sin' | 'cos' | 'tan' | 'asin' | 'acos' | 'atan' | '';
export type ZDimension = 'positive' | 'negative' | 'random';
export type ZFactor =
	| 'instanceRadius - maxRadius'
	| 'maxRadius - instanceRadius'
	| 'maxRadius / instanceRadius'
	| 'maxRadius'
	| 'instanceRadius'
	| 'x'
	| 'y'
	| 'sqrt(x^2 + y^2)'
	| 'maxRadius - sqrt(x^2 + y^2)'
	| 'instanceRadius - sqrt(x^2 + y^2)';

export const getZDimension = (opt: ZDimension) => {
	switch (opt) {
		case 'positive':
			return 1;
		case 'negative':
			return -1;
		case 'random':
			return Math.random() > 0.5 ? 1 : -1;
	}
};
export const getZFactor = (opt: ZFactor, x: number, y: number, rad: number, rRad: number) => {
	switch (opt) {
		case 'instanceRadius - maxRadius':
			return rRad - rad;
		case 'maxRadius - instanceRadius':
			return rad - rRad;
		case 'maxRadius / instanceRadius':
			return rad / rRad;
		case 'maxRadius':
			return rad;
		case 'instanceRadius':
			return rRad;
		case 'x':
			return x;
		case 'y':
			return y;
		case 'sqrt(x^2 + y^2)':
			return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		case 'maxRadius - sqrt(x^2 + y^2)':
			return rad - Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		case 'instanceRadius - sqrt(x^2 + y^2)':
			return rRad - Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		default:
			return rRad - rad;
	}
};

export const randomPosition = (radius: number, trigFn: TrigFn, zF: ZFactor, zDim: ZDimension) => {
	const randRadius = randInt(-radius, radius);
	const angle = randomAngle();
	const x = Math.cos(angle) * randRadius;
	const y = Math.sin(angle) * randRadius;
	const zDimension = getZDimension(zDim);
	const zFactor = getZFactor(zF, x, y, radius, randRadius);
	let z = 0;
	switch (trigFn) {
		case 'asin':
		case 'acos':
			const angleI = -1 + (angle / (Math.PI * 2)) * 2;
			z = Math[trigFn](angleI) * zDimension * zFactor;
			break;
		case 'sin':
		case 'cos':
		case 'tan':
		case 'atan':
			z = Math[trigFn](angle) * zDimension * zFactor;
			break;
		default:
			z = 0;
	}
	return new Vector3(
		x, // x
		y, // y
		z
	);
};

export const staticFormulaText = `const maxRadius = 100;
const angle = randomAngle();
const instanceRadius = randInt(-maxRadius, maxRadius);

const x = cos(angle) * instanceRadius;
const y = sin(angle) * instanceRadius;`;

export function getFormula(trigFn: TrigFn, zF: ZFactor, zDim: ZDimension) {
	const displayZDim = zDim === 'random' ? `(Math.random() > 0.5 ? 1 : -1)` : getZDimension(zDim);
	let zText = ``;
	switch (trigFn) {
		case 'asin':
		case 'acos':
			zText = `
const angleI = -1 + ((angle / (Math.PI * 2)) * 2);
const z = ${trigFn}(angleI) * ${displayZDim} * (${zF});`;
			break;
		case 'sin':
		case 'cos':
		case 'tan':
		case 'atan':
			zText = `const z = ${trigFn}(angle) * ${displayZDim} * (${zF});`;
			break;
		default:
			zText = 'const z = 0;';
	}
	return zText;
}
