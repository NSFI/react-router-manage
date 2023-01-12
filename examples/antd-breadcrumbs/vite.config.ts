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
            "../../packages/react-router-manage/index.tsx"
          )
        }
      }
    : {}
});
