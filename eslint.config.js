import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import globals from 'globals';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
    {
        ignores: ['dist'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.nodeBuiltin,
            },
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: true,
                tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
            },
        },
        plugins: {
            '@typescript-eslint': ts,
        },
        rules: {
            ...ts.configs['strict-type-checked'].rules,
            ...ts.configs['stylistic-type-checked'].rules,
        },
    },
];
