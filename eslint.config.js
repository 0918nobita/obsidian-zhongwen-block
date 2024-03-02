// @ts-check

import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('typescript-eslint').Config} */
export default [
    {
        ignores: ['dist'],
    },

    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.nodeBuiltin,
            },
        },
    },

    eslint.configs.recommended,

    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    {
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked,
    },

    ...tseslint.configs.recommendedTypeChecked.map((config) => ({
        ...config,
        files: ['**/*.ts'],
    })),

    ...tseslint.configs.stylisticTypeChecked.map((config) => ({
        ...config,
        files: ['**/*.ts'],
    })),
];
