import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			runtime: 'edge'
		}),
		inlineStyleThreshold: 6000
	},

	compilerOptions: {
		runes: true
	}
};

export default config;
