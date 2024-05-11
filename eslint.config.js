// @ts-check

import eslint from '@eslint/js';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

export default tseslint.config(
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
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                extraFileExtensions: ['.svelte'],
            },
        },
    },
    {
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        files: ['**/*.svelte'],
        plugins: {
            svelte: eslintPluginSvelte,
        },
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },
);
