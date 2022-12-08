import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	optimizeDeps: {
		include: ['postprocessing', 'lamina']
	},
	ssr: {
		noExternal: ['three', 'troika-three-text', 'postprocessing', 'lamina']
	},
	plugins: [sveltekit()],
};

export default config;
