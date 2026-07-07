// tsup.config.js
export default {
  entry: ["src/index.jsx"],
  format: ["cjs", "esm"],
  external: ["react"],
  splitting: false,
  dts: false,
  clean: true,
};
