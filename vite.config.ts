import svgx from "@svgx/vite-plugin-react";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), wasm(), topLevelAwait(), svgx()],
    build: {
      outDir: "dist",
    },
    // server: {
    //   // host: "0.0.0.0", // or your local network IP
    //   https: {
    //     key: fs.readFileSync(path.resolve(__dirname, "localhost+2-key.pem")),
    //     cert: fs.readFileSync(path.resolve(__dirname, "localhost+2-cert.pem")),
    //   },
    // },
  };
});
