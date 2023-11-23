const globals = require('globals');
const js = require('@eslint/js');
const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
    {
        ignores: ['dist'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: true,
                tsconfigRootDir: __dirname,
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
