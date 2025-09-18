import { defineConfig } from "vite";
import { join } from "node:path";
import { cwd } from "node:process";

export default defineConfig({
	resolve: {
		alias: {
			"@": join(cwd(), "./src"),
		},
	},
});
