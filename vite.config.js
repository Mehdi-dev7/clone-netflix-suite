import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
	},
	resolve: {
		mainFields: ["module", "main", "browser"],
		conditions: ["import", "module", "browser", "default"],
	},
});