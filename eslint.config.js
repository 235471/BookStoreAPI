import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 2020, // Set ECMAScript version (adjust if necessary)
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',
      // Prettier-specific formatting rules
      'prettier/prettier': [
        'error',
        {
          printWidth: 180, // Maximum line length
          semi: true, // Enforce semicolons
          singleQuote: true, // Use single quotes
          proseWrap: 'never', // Prevent line breaks in prose content
        },
      ],
      // Disable ESLint's function-paren-newline rule in favor of Prettier
      'function-paren-newline': 'off',
      // Additional ESLint rules
      semi: ['error', 'always'], // Require semicolons
      quotes: ['error', 'single'], // Use single quotes
    },
  },
];
