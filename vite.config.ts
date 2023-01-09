import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupReplace from "@rollup/plugin-replace";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("development")
      }
    }),
    react()
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        breadcrumbs: path.resolve(
          __dirname,
          "entry/antd-breadcrumbs/index.html"
        ),
        basic: path.resolve(__dirname, "entry/basic/index.html")
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: process.env.USE_SOURCE
    ? {
        alias: {
          "react-router-manage": path.join(
            __dirname,
            "./packages/react-router-manage"
          )
        }
      }
    : {}
});
