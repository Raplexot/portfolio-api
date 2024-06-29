module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    '@typescript-eslint/indent': ['error', 2],
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    '@typescript-eslint/no-unused-vars': [1, { 'varsIgnorePattern': 'props|emits' }],
    'tailwindcss/no-custom-classname': 'off',
    '@typescript-eslint/type-annotation-spacing': ['warn', {
      after: true,
    }],
    'object-curly-spacing': [1, 'always'],
    'key-spacing': [1, { beforeColon: false, afterColon: true }],
    'keyword-spacing': [1, { before: true, after: true }],
    'block-spacing': [1, 'always'],
    "space-before-blocks": [1, "always"],
    "arrow-spacing": [1, { "before": true, "after": true }],
    'space-infix-ops': [1, { 'int32Hint': false }],
    'semi-spacing': [1, { 'before': false, 'after': true }],
    "comma-spacing": [1, { "before": false, "after": true }]
  },
};
