import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: seqPreprocessor([
		preprocess(),
		preprocessThrelte()
	]),

	kit: {
		adapter: adapter(),
	},
};

export default config;
