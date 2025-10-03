import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	base: "./", // ensures relative paths for PHP server
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				register: resolve(__dirname, "register.html"),
				// add more pages here if needed
			},
		},
	},
});
