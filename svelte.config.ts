import { type Options, vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config: Options = {
    preprocess: vitePreprocess(),
};

export default config;
