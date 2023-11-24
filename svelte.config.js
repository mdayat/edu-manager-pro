import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    csp: {
      mode: "auto",
      directives: {
        "script-src": ["self", "https://accounts.google.com/gsi/client"],
        "style-src": [
          "self",
          "unsafe-inline",
          "https://accounts.google.com/gsi/style",
        ],
        "connect-src": ["self", "https://accounts.google.com/gsi/"],
        "frame-src": ["self", "https://accounts.google.com/gsi/"],
      },
    },
  },
};

export default config;
