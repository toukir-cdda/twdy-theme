import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json" with { type: "json" };
import external from "rollup-plugin-peer-deps-external";

export default [
  {
    preserveModules: true,
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        // sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        // sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      external(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts"],
        declaration: true,
        declarationDir: "dist",
      }),
      postcss({ extensions: [".css"], inject: true, extract: false }),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
