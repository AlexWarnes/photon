import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	// legacy: { buildSsrCjsExternalHeuristics: true },
	optimizeDeps: {
		include: ['postprocessing',]
	},
	ssr: {
		noExternal: ['three', 'troika-three-text', 'postprocessing',]
	},
	plugins: [sveltekit()],
};

export default config;
