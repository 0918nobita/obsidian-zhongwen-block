import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
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
    define: {
        __VOLUME_HIGH_ICON__: JSON.stringify(faVolumeHigh.icon[4]),
        __VOLUME_HIGH_ICON_WIDTH__: JSON.stringify(faVolumeHigh.icon[0]),
        __VOLUME_HIGH_ICON_HEIGHT__: JSON.stringify(faVolumeHigh.icon[1]),
    },
    plugins: [
        vanillaExtractPlugin({
            identifiers: ({ hash }) => `zhongwenBlock_${hash}`,
        }),
    ],
});
