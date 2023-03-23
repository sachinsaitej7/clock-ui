const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  extends: ["react-app"],
  rules: {},
  env: {
    NODE_ENV,
  },
};
