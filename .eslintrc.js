const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {},
  env: {
    NODE_ENV,
  },
};
