module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
  },
  plugins: [
    "react",
  ],
  rules: {
    quotes: ["error", "double"],
    "no-console": 0,
    "react/prop-types": 0,
    "react/jsx-one-expression-per-line": 0,
    "jsx-a11y/label-has-associated-control": 0,
  },
};
