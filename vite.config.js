import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],

  server: {
    port: 3000,
  },

  build: {
    sourcemap: true,
  },

  preview: {
    port: 3000,
  },
});
