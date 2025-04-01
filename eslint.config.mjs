import { defineConfig } from 'eslint/config'
import globals from 'globals'
import jsPlugin from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  {
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
    plugins: { prettier: prettierPlugin },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { js: jsPlugin },
    extends: ['js/recommended'],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
  { ignores: ['dist/**', 'build/**'] },
])
