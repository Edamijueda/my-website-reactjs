const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

/**
 * Flat config, replacing the `.eslintrc` that extended `@upstatement/eslint-config`.
 *
 * That package could not come along: its newest release pins `eslint: ^8.x.x` and is
 * eslintrc-only. Most of what it set was stylistic anyway — `indent`, `quotes`,
 * `semi`, `comma-dangle`, `brace-style` and the rest — and ESLint removed those rules
 * in v9. They were already redundant here, because Prettier owns formatting.
 *
 * What survives below is the half of that config that was about correctness rather
 * than layout.
 */
module.exports = [
  {
    ignores: ['public/**', '.cache/**', 'node_modules/**'],
  },

  js.configs.recommended,
  react.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      /*
       * Stated rather than detected. `version: 'detect'` makes eslint-plugin-react
       * call `context.getFilename()`, which ESLint removed in v10 — it throws before
       * linting a single file. Keep this in step with the React version in
       * package.json.
       */
      react: { version: '17.0' },
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // Best practices. `curly` is not here — see the note at the end of the file.
      eqeqeq: 'error',
      'no-eq-null': 'error',

      // Variables
      'no-use-before-define': ['error', 'nofunc'],
      'one-var': ['error', 'never'],

      // ES6+
      'arrow-body-style': ['error', 'as-needed'],
      'no-duplicate-imports': 'error',
      'no-useless-constructor': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',

      // React. Gatsby injects React, so the import is not required to be in scope.
      'react/no-unescaped-entities': ['error', { forbid: ['>', '"', '}'] }],
      'react/react-in-jsx-scope': 'off',
    },
  },

  {
    // The Gatsby entry points at the repository root are CommonJS, unlike `src/`.
    files: ['gatsby-*.js', 'prettier.config.js', 'eslint.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },

  // Last, so it can switch off anything above that would argue with the formatter.
  prettier,

  {
    /*
     * Restated after the Prettier config, which sets `curly: 0` unconditionally.
     *
     * Under the old `.eslintrc` this rule was on: there, a config's own `rules`
     * block beat whatever it extended, so declaring `curly` alongside `extends:
     * ["prettier"]` kept it. Flat config resolves by order instead, so leaving it
     * above would have silently dropped it.
     *
     * Prettier disables `curly` because its multi-line variants can disagree with
     * the formatter. The "all" form used here only ever adds braces, which Prettier
     * then keeps, so there is nothing to disagree about.
     */
    rules: {
      curly: ['error', 'all'],
    },
  },
];
