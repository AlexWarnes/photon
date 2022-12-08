import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	optimizeDeps: {
		include: ['postprocessing', 'lamina', 'three-custom-shader-material']
	},
	ssr: {
		noExternal: ['three', 'troika-three-text', 'postprocessing', 'lamina', 'three-custom-shader-material']
	},
	plugins: [sveltekit()],
};

export default config;
