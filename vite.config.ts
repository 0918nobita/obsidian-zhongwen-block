import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: { entry: 'src/main.ts', formats: ['cjs'] },
        emptyOutDir: false,
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                assetFileNames: (chunkInfo) =>
                    (chunkInfo.names as string[] | undefined)?.includes(
                        'obsidian-zhongwen-block.css',
                    )
                        ? 'styles.css'
                        : '[name].[ext]',
            },
            external: ['obsidian'],
        },
    },
    plugins: [svelte()],
});
