module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-new": "off",
    "no-param-reassign": ["error", { props: false }],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  },
  parserOptions: {
    parser: "babel-eslint",
    "no-plusplus": "off"
  }
};
