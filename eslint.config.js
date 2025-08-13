const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginTypeScript = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
    {
        ignores: ['node_modules', 'build', 'dist', '.vscode', 'coverage'],
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': eslintPluginTypeScript,
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks,
            prettier: eslintPluginPrettier,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/jsx-props-no-spreading': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    },
];