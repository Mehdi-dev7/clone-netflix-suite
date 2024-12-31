import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		fs: {
			strict: false,
		},
	},
	optimizeDeps: {
		include: ["msw"],
		exclude: ["@mswjs/interceptors"],
	},
	resolve: {
		mainFields: ["module", "main", "browser"],
		conditions: ["import", "module", "browser", "default"],
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/],
		},
	},
});
