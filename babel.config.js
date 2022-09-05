const { BABEL_ENV, NODE_ENV } = process.env;
const isCjs = NODE_ENV === "test" || BABEL_ENV === "commonjs";

module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        modules: false,
        loose: true
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ];

  const plugins = [];
  if (isCjs) {
    ["@babel/plugin-transform-runtime"];
    // This plugin transforms ECMAScript modules to CommonJS.
    plugins.push("@babel/plugin-transform-modules-commonjs");
  }

  return { presets, plugins };
};
