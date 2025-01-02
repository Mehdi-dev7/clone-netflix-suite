import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		fs: {
			strict: false,
		},
	},
	resolve: {
		alias: {
			"@mui/icons-material": path.resolve(
				__dirname,
				"node_modules/@mui/icons-material"
			),
		},
		mainFields: ["module", "main", "browser"],
		conditions: ["import", "module", "browser", "default"],
	},
	optimizeDeps: {
		include: ["msw"],
		exclude: ["@mswjs/interceptors"],
	},
	build: {
		commonjsOptions: {
			include: [/node_modules/],
		},
	},
});
