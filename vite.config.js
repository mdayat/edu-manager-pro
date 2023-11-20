import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  publicDir: "static",

  server: {
    port: 3000,
  },

  build: {
    sourcemap: true,
    outDir: ".svelte",
  },

  preview: {
    port: 3000,
  },
});
