module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'google'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
