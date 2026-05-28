import { defineConfig, globalIgnores } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import github from 'eslint-plugin-github'

const githubFlatConfigs = github.getFlatConfigs()

export default defineConfig([
  globalIgnores([
    '**/dist/',
    '**/lib/',
    '**/node_modules/',
    '**/jest.config.js'
  ]),
  githubFlatConfigs.recommended,
  ...githubFlatConfigs.typescript,
  {
    files: ['src/**/*.ts'],

    // eslint-plugin-github enables import/no-unresolved, which uses
    // eslint-plugin-import's default Node resolver by default. That resolver
    // can't follow TypeScript path mappings or type-only package exports
    // (e.g. `@octokit/openapi-types`). eslint-import-resolver-typescript
    // bridges the gap by delegating resolution to the TS compiler, so the
    // rule correctly validates all imports without false positives.
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // resolve @types/* packages even when the package has no typings of its own
          project: './tsconfig.json'
        }
      }
    },

    plugins: {
      '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
      globals: {
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json'
      }
    },

    rules: {
      'i18n-text/no-en': 'off',
      'eslint-comments/no-use': 'off',
      'import/no-namespace': 'off',
      'import/no-unresolved': 'error',
      'no-unused-vars': 'off',
      'filenames/match-regex': 'off',
      '@typescript-eslint/no-unused-vars': 'error',

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public'
        }
      ],

      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      camelcase: 'off',
      '@typescript-eslint/consistent-type-assertions': 'error',

      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true
        }
      ],

      'func-call-spacing': ['error', 'never'],
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      semi: ['error', 'never'],
      '@typescript-eslint/unbound-method': 'error'
    }
  }
])
