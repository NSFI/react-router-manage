const { BABEL_ENV, NODE_ENV } = process.env;
const isCjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs';

module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
        loose: true,
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-json-strings',
    [
      '@babel/plugin-proposal-decorators',
      { decoratorsBeforeExport: true }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      { loose: true }
    ],
    [
      '@babel/proposal-object-rest-spread',
      { loose: true }
    ],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-optional-chaining',
    // https://www.babeljs.cn/docs/babel-plugin-transform-remove-debugger
    'transform-remove-debugger',
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        proposal: 'minimal'
      }
    ],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-function-bind',
    [
      '@babel/plugin-transform-runtime',
    ]
  ];
  if (isCjs) {
    // This plugin transforms ECMAScript modules to CommonJS.
    plugins.push('@babel/plugin-transform-modules-commonjs');
  }

  return { presets, plugins };
};
