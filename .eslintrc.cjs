module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/prettier',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['eslint-plugin-simple-import-sort', 'eslint-plugin-unused-imports', '@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  ignorePatterns: ['*.cjs'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ],
  rules: {
    'svelte/valid-compile': [
      'error',
      {
        ignoreWarnings: true
      }
    ]
  }
  // settings: {
  //   svelte: {
  //     ignoreWarnings: [
  //       "a11y-no-noninteractive-tabindex",
  //       "a11y-label-has-associated-control",
  //     ],
  //     compileOptions: {
  //       postcss: {
  //         configFilePath: "./postcss.config.cjs",
  //       },
  //     },
  //   },
  // },
};
