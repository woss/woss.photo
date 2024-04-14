// eslint.config.cjs

import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  js.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  eslintConfigPrettier,
  ...eslintPluginSvelte.configs['flat/prettier'],
  {
    rules: {
      semi: ['warn', 'always'],
      quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'no-nested-ternary': 'error',
      'linebreak-style': ['error', 'unix'],
      'no-cond-assign': ['error', 'always'],
      'no-console': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true
        }
      ]
    }
  },
  { ignores: ['build/', '.svelte-kit/', 'pnpm-lock.yaml'] },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser },
      parser: svelteParser,
      parserOptions: {
        parser: tsEslint.parser,
        extraFileExtensions: ['.svelte']
      }
    }
  }
  // {
  //   files: ['**/*.svelte'],
  //   languageOptions: {
  //     ecmaVersion: 2022,
  //     sourceType: 'module',
  //     parser: svelteParser,
  //     parserOptions: {
  //       parser: tsParser,
  //       extraFileExtensions: ['.svelte']
  //     }
  //   },
  //   rules: {
  //     'svelte/no-target-blank': 'error',
  //     'svelte/no-at-debug-tags': 'error',
  //     'svelte/no-reactive-functions': 'error',
  //     'svelte/no-reactive-literals': 'error'
  //   }
  // }
);
