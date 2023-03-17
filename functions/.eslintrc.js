module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "max-len": "off",
    "quotes": "off",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "no-console": "off",
  },
};
