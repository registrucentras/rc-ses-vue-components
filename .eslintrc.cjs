/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'airbnb-base',
    'prettier',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-prettier',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: [
    '.eslintrc.cjs',
    'vite.config.build.mts',
    'vite.config.mts',
    'dist',
    'public',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/prop-name-casing': 'off',
    'vue/dot-notation': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.stories.*',
          '**/*.test.*',
          '**/.storybook/**/*.*',
          'vitest.config.ts',
          'src/setupTests.ts',
        ],
        peerDependencies: true,
      },
    ],
  },
  globals: {
    Entry: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  /*  parser: 'vue-eslint-parser',
  /!*parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false,
    },
  },*!/
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.vue'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', 'mjs'],
      },
    },
  }, */
}
