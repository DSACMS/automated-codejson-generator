// See: https://rollupjs.org/introduction/

import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const config = {
  input: "src/index.ts",
  // native llama.cpp bindings load their own .node binaries, they can't be bundled
  external: ["node-llama-cpp"],
  output: {
    esModule: true,
    file: "dist/index.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [typescript(), nodeResolve(), commonjs()],
};

export default config;
