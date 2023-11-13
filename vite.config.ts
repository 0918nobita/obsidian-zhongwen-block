import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.ts',
            formats: ['cjs'],
        },
        emptyOutDir: false,
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                assetFileNames: (chunkInfo) =>
                    chunkInfo.name === 'style.css'
                        ? 'styles.css'
                        : '[name].[ext]',
            },
            external: ['obsidian'],
        },
    },
    plugins: [
        vanillaExtractPlugin({
            identifiers: ({ hash }) => `zhongwenBlock_${hash}`,
        }),
    ],
});
