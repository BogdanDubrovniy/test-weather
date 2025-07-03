import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'array-bracket-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'computed-property-spacing': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'indent': ['error', 2, { SwitchCase: 1, ignoredNodes: ['PropertyDefinition[decorators]'] }],
      'no-console': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0, maxBOF: 0 }],
      'no-unused-vars': 'off',
      'key-spacing': 'error',
      'object-curly-spacing': ['error', 'always'],
      'prefer-const': 'off',
      'quotes': ['error', 'single'],
      'require-await': 'error',
      'semi': ['error', 'always'],
      'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
      'space-in-parens': ['error', 'never'],
      'template-curly-spacing': ['error', 'never'],
    },
  },
];