const path = require("path");
const babel = require("@rollup/plugin-babel").default;
const copy = require("rollup-plugin-copy");
const extensions = require("rollup-plugin-extensions");
const prettier = require("rollup-plugin-prettier");
const replace = require("@rollup/plugin-replace");
const { terser } = require("rollup-plugin-terser");
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts");
const {
  createBanner,
  getBuildDirectories,
  PRETTY
} = require("../../rollup.utils");
const { name: packageName, version } = require("./package.json");

const name = packageName.replace(/@rrmc\//, '')

module.exports = function rollup() {
  const { ROOT_DIR, SOURCE_DIR, OUTPUT_DIR } = getBuildDirectories(name);

  // JS modules for bundlers
  const modules = [
    {
      input: `${SOURCE_DIR}/index.tsx`,
      output: {
        file: `${OUTPUT_DIR}/index.js`,
        format: "esm",
        sourcemap: !PRETTY,
        banner: createBanner(
          "React Router Manage Breadcrumbs for antd",
          version
        )
      },
      external: [/node_modules/, "react-router-manage"],
      plugins: [
        extensions({ extensions: [".ts", ".tsx"] }),
        babel({
          babelHelpers: "bundled",
          exclude: /node_modules/,
          presets: [
            ["@babel/preset-env", { loose: true }],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: ["babel-plugin-dev-expression"],
          extensions: [".ts", ".tsx"]
        }),
        typescript({
          tsconfig: path.join(__dirname, "tsconfig.json"),
          exclude: ["__tests__"],
          noEmitOnError: true
        }),
        copy({
          targets: [
            { src: path.join(ROOT_DIR, "LICENSE.md"), dest: SOURCE_DIR }
          ],
          verbose: true
        })
      ].concat(PRETTY ? prettier({ parser: "babel" }) : [])
    }
  ];

  // JS modules for <script type=module>
  // Note: These are experimental. You may not even get them to work
  // unless you are using a React build with JS modules like es-react.
  const webModules = [
    {
      input: `${SOURCE_DIR}/index.tsx`,
      output: {
        file: `${OUTPUT_DIR}/antd-breadcrumbs.development.js`,
        format: "esm",
        sourcemap: !PRETTY,
        banner: createBanner(
          "React Router Manage Breadcrumbs for antd",
          version
        )
      },
      external: [/node_modules/, "react-router-manage"],
      plugins: [
        extensions({ extensions: [".ts", ".tsx"] }),
        babel({
          babelHelpers: "bundled",
          exclude: /node_modules/,
          presets: [
            "@babel/preset-modules",
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: ["babel-plugin-dev-expression"],
          extensions: [".ts", ".tsx"]
        }),
        replace({
          preventAssignment: true,
          values: { "process.env.NODE_ENV": JSON.stringify("development") }
        })
      ].concat(PRETTY ? prettier({ parser: "babel" }) : [])
    },
    {
      input: `${SOURCE_DIR}/index.tsx`,
      output: {
        file: `${OUTPUT_DIR}/antd-breadcrumbs.production.min.js`,
        format: "esm",
        sourcemap: !PRETTY,
        banner: createBanner(
          "React Router Manage Breadcrumbs for antd",
          version
        )
      },
      external: [/node_modules/, "react-router-manage"],
      plugins: [
        extensions({ extensions: [".ts", ".tsx"] }),
        babel({
          babelHelpers: "bundled",
          exclude: /node_modules/,
          presets: [
            [
              "@babel/preset-modules",
              {
                // Don't spoof `.name` for Arrow Functions, which breaks when minified anyway.
                loose: true
              }
            ],
            [
              "@babel/preset-react",
              {
                // Compile JSX Spread to Object.assign(), which is reliable in ESM browsers.
                useBuiltIns: true
              }
            ],
            "@babel/preset-typescript"
          ],
          plugins: ["babel-plugin-dev-expression"],
          extensions: [".ts", ".tsx"]
        }),
        replace({
          preventAssignment: true,
          values: { "process.env.NODE_ENV": JSON.stringify("production") }
        }),
        // compiler(),
        terser({ ecma: 8, safari10: true })
      ].concat(PRETTY ? prettier({ parser: "babel" }) : [])
    }
  ];

  // UMD modules for <script> tags and CommonJS (node)
  const globals = [
    {
      input: `${SOURCE_DIR}/index.tsx`,
      output: {
        file: `${OUTPUT_DIR}/umd/antd-breadcrumbs.development.js`,
        format: "umd",
        sourcemap: !PRETTY,
        banner: createBanner(
          "React Router Manage Breadcrumbs for antd",
          version
        ),
        globals: {
          history: "HistoryLibrary",
          "@remix-run/router": "Router",
          react: "React",
          "react-router": "ReactRouter",
          "react-router-dom": "ReactRouterDOM"
        },
        name: "ReactRouterManage"
      },
      external: [/node_modules/, "react-router-manage"],
      plugins: [
        extensions({ extensions: [".ts", ".tsx"] }),
        babel({
          babelHelpers: "bundled",
          exclude: /node_modules/,
          presets: [
            ["@babel/preset-env", { loose: true }],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: ["babel-plugin-dev-expression"],
          extensions: [".ts", ".tsx"]
        }),
        replace({
          preventAssignment: true,
          values: { "process.env.NODE_ENV": JSON.stringify("development") }
        })
      ].concat(PRETTY ? prettier({ parser: "babel" }) : [])
    },
    {
      input: `${SOURCE_DIR}/index.tsx`,
      output: {
        file: `${OUTPUT_DIR}/umd/antd-breadcrumbs.production.min.js`,
        format: "umd",
        sourcemap: !PRETTY,
        banner: createBanner(
          "React Router Manage Breadcrumbs for antd",
          version
        ),
        globals: {
          history: "HistoryLibrary",
          "@remix-run/router": "Router",
          react: "React",
          "react-router": "ReactRouter"
        },
        name: "ReactRouterDOM"
      },
      external: [/node_modules/, "react-router-manage"],
      plugins: [
        extensions({ extensions: [".ts", ".tsx"] }),
        babel({
          babelHelpers: "bundled",
          exclude: /node_modules/,
          presets: [
            ["@babel/preset-env", { loose: true }],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: ["babel-plugin-dev-expression"],
          extensions: [".ts", ".tsx"]
        }),
        replace({
          preventAssignment: true,
          values: { "process.env.NODE_ENV": JSON.stringify("production") }
        }),
        // compiler(),
        terser()
      ].concat(PRETTY ? prettier({ parser: "babel" }) : [])
    }
  ];

  // Node entry points
  const node = [
    {
      input: `${SOURCE_DIR}/node-main.js`,
      output: {
        file: `${OUTPUT_DIR}/main.js`,
        format: "cjs",
        banner: createBanner(
          "React Router Manage Breadcrumbs for antd",
          version
        )
      },
      plugins: [].concat(PRETTY ? prettier({ parser: "babel" }) : [])
    }
    // {
    //   input: `${SOURCE_DIR}/server.tsx`,
    //   output: [
    //     {
    //       // the server file needs to go in the package root directory
    //       // TODO: Change this in v7
    //       file: `${SOURCE_DIR}/server.js`,
    //       format: "cjs",
    //     },
    //     {
    //       file: `${OUTPUT_DIR}/server.js`,
    //       format: "cjs",
    //     },
    //   ],
    //   external: [
    //     "url",
    //     "history",
    //     "react",
    //     "react-dom/server",
    //     "react-router-dom",
    //     "@remix-run/router",
    //     "react-router-manage",
    //   ],
    //   plugins: [
    //     extensions({ extensions: [".ts", ".tsx"] }),
    //     babel({
    //       babelHelpers: "bundled",
    //       exclude: /node_modules/,
    //       presets: [
    //         ["@babel/preset-env", { loose: true, targets: { node: true } }],
    //         "@babel/preset-react",
    //         "@babel/preset-typescript",
    //       ],
    //       plugins: ["babel-plugin-dev-expression"],
    //       extensions: [".ts", ".tsx"],
    //     }),
    //     typescript({
    //       tsconfig: path.join(__dirname, "tsconfig.json"),
    //       include: ["server.tsx"],
    //       exclude: ["__tests__"],
    //       noEmitOnError: true,
    //     }),
    //     // compiler()
    //   ].concat(PRETTY ? prettier({ parser: "babel" }) : []),
    // },
    // {
    //   input: `${SOURCE_DIR}/server.tsx`,
    //   output: [
    //     {
    //       // the server file needs to go in the package root directory
    //       // TODO: Change this in v7
    //       file: `${SOURCE_DIR}/server.mjs`,
    //       format: "esm",
    //     },
    //     {
    //       file: `${OUTPUT_DIR}/server.mjs`,
    //       format: "esm",
    //     },
    //   ],
    //   external: [
    //     "url",
    //     "history",
    //     "react",
    //     "react-dom/server",
    //     "react-router-dom",
    //     "@remix-run/router",
    //     "react-router-manage",
    //   ],
    //   plugins: [
    //     extensions({ extensions: [".ts", ".tsx"] }),
    //     babel({
    //       babelHelpers: "bundled",
    //       exclude: /node_modules/,
    //       presets: [
    //         [
    //           "@babel/preset-modules",
    //           {
    //             // Don't spoof `.name` for Arrow Functions, which breaks when minified anyway.
    //             loose: true,
    //           },
    //         ],
    //         "@babel/preset-react",
    //         "@babel/preset-typescript",
    //       ],
    //       plugins: ["babel-plugin-dev-expression"],
    //       extensions: [".ts", ".tsx"],
    //     }),
    //     // compiler()
    //   ].concat(PRETTY ? prettier({ parser: "babel" }) : []),
    // },
  ];

  // ts declare
  const declares = [
    {
      input: `${SOURCE_DIR}/index.tsx`,
      plugins: [dts.default()],
      output: {
        format: "esm",
        file: `${OUTPUT_DIR}/index.d.ts`
      }
    }
  ];

  return [...modules, ...webModules, ...globals, ...node, ...declares];
};

/**
 * @typedef {import('rollup').InputOptions} RollupInputOptions
 * @typedef {import('rollup').OutputOptions} RollupOutputOptions
 * @typedef {import('rollup').RollupOptions} RollupOptions
 * @typedef {import('rollup').Plugin} RollupPlugin
 */
