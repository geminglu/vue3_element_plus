module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: [1, 'always'],
    'comma-dangle': [0, 'always'],
    'space-before-function-paren': 0,
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
};
