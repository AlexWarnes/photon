import {
	LayerMaterial,
	Color as LaminaColor,
	Depth,
	Fresnel,
	Noise,
	Gradient
} from 'lamina/vanilla';
import { BackSide, Color } from 'three';
import type { HydrogenIsotope } from './stores';
const fresnel = new Color('#E7B473').convertSRGBToLinear();

// Proton: #FF0605
// Neutron: #9538FF
// Electron: #0605FF

// Protium: #FFFFFF
// Deuterium: #FFFFC0
// Tritium: #FFFFA0

// Uranium: #008FFF
// Plutonium: #006BFF

const colors: any = {
	proton: new Color('#FF0605').convertSRGBToLinear(),
	neutron: new Color('#9538FF').convertSRGBToLinear(),
	electron: new Color('#0605FF').convertSRGBToLinear(),
	protium: new Color('#0000FF').convertSRGBToLinear(),
	deuterium: new Color('#0000C0').convertSRGBToLinear(),
	tritium: new Color('#0000A0').convertSRGBToLinear(),
	uranium: new Color('#002b4d').convertSRGBToLinear(),
	// uranium: new Color('#008FFF').convertSRGBToLinear(),
	plutonium: new Color('#006BFF').convertSRGBToLinear()
	// plutonium: new Color('#00204d').convertSRGBToLinear()
};

export const atomicMaterial: any = {
	PROTIUM: {
		proton: atomicNoiseMaterial('PROTIUM', 'PROTON'),
		neutron: atomicNoiseMaterial('PROTIUM', 'NEUTRON'),
		electron: atomicNoiseMaterial('PROTIUM', 'ELECTRON')
	},
	DEUTERIUM: {
		proton: atomicNoiseMaterial('DEUTERIUM', 'PROTON'),
		neutron: atomicNoiseMaterial('DEUTERIUM', 'NEUTRON'),
		electron: atomicNoiseMaterial('DEUTERIUM', 'ELECTRON')
	},
	TRITIUM: {
		proton: atomicNoiseMaterial('TRITIUM', 'PROTON'),
		neutron: atomicNoiseMaterial('TRITIUM', 'NEUTRON'),
		electron: atomicNoiseMaterial('TRITIUM', 'ELECTRON')
	}
};

function atomicNoiseMaterial(
	isotope: HydrogenIsotope,
	particle: 'PROTON' | 'NEUTRON' | 'ELECTRON'
) {
	return new LayerMaterial({
		lighting: 'basic',
		layers: [
			new LaminaColor({ color: colors[particle.toLowerCase()] }),
			new Depth({
				colorA: colors[isotope.toLowerCase()],
				colorB: colors[particle.toLowerCase()],
				alpha: 0.5,
				mode: 'normal',
				near: 0,
				far: 2,
				origin: [1, 1, 1]
			}),
			new Depth({
				colorA: colors.neutron,
				colorB: colors[particle.toLowerCase()],
				alpha: 0.5,
				mode: 'add',
				near: 3,
				far: 2,
				origin: [1, 1, 1]
			}),
			new Fresnel({ mode: 'add', color: fresnel, intensity: 0.3, power: 2.5, bias: 0.0 }),
			new Noise({
				mapping: 'local',
				type: 'white',
				scale: 1,
				colorA: colors[particle.toLowerCase()],
				colorB: colors[isotope.toLowerCase()],
				mode: 'overlay'
			})
		]
	});
}
// export const specialNoiseMaterial = new LayerMaterial({
// 	layers: [
// 		new LaminaColor({ color: colorA }),
// 		new Depth({
// 			colorA: colorA,
// 			colorB: colorB,
// 			alpha: 0.5,
// 			mode: 'normal',
// 			near: 0,
// 			far: 2,
// 			origin: [1, 1, 1]
// 		}),
// 		new Depth({
// 			colorA: 'purple',
// 			colorB: colorB,
// 			alpha: 0.5,
// 			mode: 'add',
// 			near: 3,
// 			far: 2,
// 			origin: [1, 1, 1]
// 		}),
// 		new Fresnel({ mode: 'add', color: fresnel, intensity: 0.3, power: 2.5, bias: 0.0 }),
// 		new Noise({
// 			mapping: 'local',
// 			type: 'white',
// 			scale: 1,
// 			colorA: '#ffaf40',
// 			colorB: 'black',
// 			mode: 'overlay'
// 		})
// 	]
// });

export const backgroundMaterial = new LayerMaterial({
	side: BackSide,
	layers: [
		// new LaminaColor({
		// 	color: colors.uranium,
		// 	alpha: 0.95,
		// }),
		// new LaminaColor({
		// 	color: colors.proton,
		// 	alpha: 0.05,
		// }),
		// new Depth({
		// 	colorA: colors.uranium,
		// 	colorB: colors.proton,
		// 	alpha: 1,
		// 	mode: 'normal',
		// 	near: 130,
		// 	far: 200,
		// 	origin: [100, 100, -100]
		// }),
		new Gradient({
			colorA: colors.uranium,
			colorB: colors.proton,
			alpha: 1,
			contrast: 0.5,
			start: 1,
			end: -4,
			axes: 'x',
			mapping: 'local',
			visible: true
		}),

		new Noise({
			mapping: 'local',
			type: 'white',
			scale: 1,
			colorA: 'white',
			colorB: 'black',
			mode: 'subtract',
			alpha: 0.2
		})
	]
});

/*
blue/purple

        
import { 
	LayerMaterial,
	Noise,
	Gradient,
	Fresnel
} from "lamina/vanilla";
        
const laminaMaterial = new LayerMaterial({
  color: "#ffffff",
  lighting: "standard",
  layers: [
    new Noise({
      colorA: new THREE.Color("#ff0605"),
      colorB: new THREE.Color("#ff0605"),
      colorC: new THREE.Color("#e9d3d3"),
      colorD: new THREE.Color("#e9e7e7"),
      alpha: 1,
      scale: 1,
      type: "white",
      offset: [0,0,0],
      mapping: "local",
      mode: "normal",
      visible: true,
    }),
    new Gradient({
      colorA: new THREE.Color("#00129e"),
      colorB: new THREE.Color("#350061"),
      alpha: 0.45,
      contrast: 1,
      start: 1,
      end: "-1",
      axes: "x",
      mapping: "local",
      visible: true,
    }),
    new Fresnel({
      color: new THREE.Color("#faffff"),
      alpha: 1,
      power: 2,
      intensity: 1,
      bias: 0,
      mode: "softlight",
      visible: true,
    }),
    
  ]
});
    
    
*/
