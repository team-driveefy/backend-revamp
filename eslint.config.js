import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      // Possible Errors
      'no-console': 'warn',
      'no-debugger': 'error',

      // Best Practices
      'eqeqeq': 'error',
      'curly': 'error',
      'consistent-return': 'warn',

      // Variables
      'no-unused-vars': ['warn', { argsIgnorePattern: 'next' }],
      'no-undef': 'error',

      // Style and Formatting
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'eol-last': ['error', 'always'],

      // Node.js and CommonJS
      'handle-callback-err': 'warn',
      'no-process-exit': 'error',
      'global-require': 'error',

      // Security
      'no-eval': 'error',
      'no-new-func': 'error',
      'no-path-concat': 'error',

      // Performance
      'no-sync': 'warn',
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
