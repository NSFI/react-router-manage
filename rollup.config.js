import babel from "rollup-plugin-babel";
// import compiler from "@ampproject/rollup-plugin-closure-compiler";
import copy from "rollup-plugin-copy";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import prettier from "rollup-plugin-prettier";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import dts from 'rollup-plugin-dts';

const PRETTY = !!process.env.PRETTY;

function createBanner(libraryName, version) {
  return `/**
 * ${libraryName} v${version}
 *
 * Copyright (c) wenxinping@corp.netease.com.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */`;
}

function getVersion(sourceDir) {
  return require(`./${sourceDir}/package.json`).version;
}
const extensions = [".js", ".jsx", ".ts", ".tsx"];
function reactRouterManage() {
  const SOURCE_DIR = "packages/react-router-manage";
  const OUTPUT_DIR = "build/node_modules/react-router-manage";
  const version = getVersion(SOURCE_DIR);

  // JS modules for bundlers
  const modules = [
    {
      input: `${SOURCE_DIR}/index.tsx`,
      output: {
        file: `${OUTPUT_DIR}/index.js`,
        format: "esm",
        sourcemap: !PRETTY,
        banner: createBanner("react-router-manage", version)
      },
      external: ["react-router-dom",'react-router','history', 'react-dom', "react", "ppfish", 'query-string'],
      plugins: [
        nodeResolve({
          extensions: extensions
        }),
        babel({
          exclude: "**/node_modules/**",
          presets: [
            ["@babel/preset-env", { loose: true }],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: ["babel-plugin-dev-expression"],
          extensions: extensions
        }),
        commonjs(),
        copy({
          targets: [
            { src: `${SOURCE_DIR}/package.json`, dest: OUTPUT_DIR },
            { src: `${SOURCE_DIR}/README.md`, dest: OUTPUT_DIR },
            { src: `${SOURCE_DIR}/README.zh-CN.md`, dest: OUTPUT_DIR },
            { src: "LICENSE.md", dest: OUTPUT_DIR }
          ],
          verbose: true
        })
      ].concat(PRETTY ? prettier({ parser: "babel" }) : [])
    }
  ];

  // JS modules for <script type=module>
  // const webModules = [
  //   {
  //     input: `${SOURCE_DIR}/index.tsx`,
  //     output: {
  //       file: `${OUTPUT_DIR}/react-router-manage.development.js`,
  //       format: "esm",
  //       sourcemap: !PRETTY,
  //       banner: createBanner("react-router-manage", version)
  //     },
  //     external: ["react-router-dom",'react-router','history', 'react-dom', "react", "ppfish"],
  //     plugins: [
  //       nodeResolve({
  //         extensions: extensions
  //       }),
  //       babel({
  //         exclude: "**/node_modules/**",
  //         presets: [
  //           ["@babel/preset-env", { loose: true }],
  //           "@babel/preset-react",
  //           "@babel/preset-typescript"
  //         ],
  //         plugins: ["babel-plugin-dev-expression"],
  //         extensions: extensions
  //       }),
  //       commonjs(),
  //       replace({
  //         preventAssignment: true,
  //         values: { "process.env.NODE_ENV": JSON.stringify("development") }
  //       })
  //     ].concat(PRETTY ? prettier({ parser: "babel" }) : [])
  //   },
  //   {
  //     input: `${SOURCE_DIR}/index.tsx`,
  //     output: {
  //       file: `${OUTPUT_DIR}/react-router-manage.production.min.js`,
  //       format: "esm",
  //       sourcemap: !PRETTY,
  //       banner: createBanner("react-router-manage", version)
  //     },
  //     external: ["react-router-dom",'react-router','history', 'react-dom', "react", "ppfish"],
  //     plugins: [
  //       nodeResolve({
  //         extensions: extensions
  //       }),
  //       babel({
  //         exclude: /node_modules/,
  //         presets: [
  //           [
  //             "@babel/preset-modules",
  //             {
  //               // Don't spoof `.name` for Arrow Functions, which breaks when minified anyway.
  //               loose: true
  //             }
  //           ],
  //           [
  //             "@babel/preset-react",
  //             {
  //               // Compile JSX Spread to Object.assign(), which is reliable in ESM browsers.
  //               useBuiltIns: true
  //             }
  //           ],
  //           "@babel/preset-typescript"
  //         ],
  //         plugins: ["babel-plugin-dev-expression"],
  //         extensions: extensions
  //       }),
  //       commonjs(),
  //       replace({
  //         preventAssignment: true,
  //         values: { "process.env.NODE_ENV": JSON.stringify("production") }
  //       }),
  //       // compiler(),
  //       terser({ ecma: 8, safari10: true })
  //     ].concat(PRETTY ? prettier({ parser: "babel" }) : [])
  //   }
  // ];

  // UMD modules for <script> tags and CommonJS (node)
  const globals = [
    {
      input: `${SOURCE_DIR}/index.tsx`,
      output: {
        file: `${OUTPUT_DIR}/umd/ys-router.development.js`,
        format: "umd",
        sourcemap: !PRETTY,
        banner: createBanner("ys Router", version),
        // globals: { history: "HistoryLibrary", react: "React" },
        name: "ysRouter"
      },
      external: ["react-router-dom", "react"],
      plugins: [
        babel({
          exclude: /node_modules/,
          presets: [
            ["@babel/preset-env", { loose: true }],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: ["babel-plugin-dev-expression"],
          extensions: extensions
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
        file: `${OUTPUT_DIR}/umd/ys-router.production.min.js`,
        format: "umd",
        sourcemap: !PRETTY,
        banner: createBanner("ys Router", version),
        // globals: { history: "HistoryLibrary", react: "React" },
        name: "ysRouter"
      },
      external: ["react-router-dom", "react"],
      plugins: [
        babel({
          exclude: /node_modules/,
          presets: [
            ["@babel/preset-env", { loose: true }],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: ["babel-plugin-dev-expression"],
          extensions: extensions
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
        banner: createBanner("React Router", version)
      },
      plugins: [].concat(PRETTY ? prettier({ parser: "babel" }) : [])
    }
  ];

  const declares = [{
    input: `${SOURCE_DIR}/index.tsx`,
    plugins: [dts()],
    output: {
        format: 'esm',
        file: 'build/node_modules/react-router-manage/index.d.ts',
    },
  }]

  return [...modules, ...declares];
}

export default function rollup(options) {
  let builds = [...reactRouterManage(options)];

  return builds;
}
