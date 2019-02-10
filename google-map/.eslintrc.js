module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "react-hooks/rules-of-hooks": "error"
  }
}
