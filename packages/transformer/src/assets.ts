import { mkdirSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { cwd, env, loadEnvFile } from "node:process";

import { getFiles } from "./file.ts";
import { transformPath } from "./path.ts";

export interface AssetProcessParameter {
	getAssets(pattern: string): Asset[];
}

export interface AssetConfig {
	envFile: string;
	srcDir: string;
	dstDir: string;
	transform?: (params: AssetProcessParameter) => Promise<unknown>;
}

export class Asset {
	input: string;
	output: string;

	async wrap(cb: () => Promise<void>) {
		console.log("process:", this.input);
		await cb();
		console.log("created:", this.output);
	}

	static async process(options: AssetConfig) {
		function getOutput(input: string) {
			if (input.endsWith(".exr") || input.endsWith(".hdr")) {
				return transformPath(input, { dir: options.dstDir, ext: ".jpg" });
			}
			return transformPath(input, { dir: options.dstDir });
		}

		function getAssets(pattern: string) {
			const files = getFiles(join(options.srcDir, pattern));
			const assets: Asset[] = [];
			for (const input of files) {
				if (!input) continue;
				const asset = new Asset();
				asset.input = input;
				asset.output = getOutput(input);
				assets.push(asset);
			}
			return assets;
		}

		mkdirSync(options.dstDir, { recursive: true });
		await options.transform?.({ getAssets });
	}
}

export function defineAssetConfig(userOptions: Partial<AssetConfig> = {}) {
	const options: AssetConfig = {
		envFile: ".env",
		srcDir: "resources",
		dstDir: "public/assets/generated",
		...userOptions,
	};

	if (!isAbsolute(options.envFile)) {
		options.envFile = join(cwd(), options.envFile);
	}

	try {
		loadEnvFile(options.envFile);
		options.srcDir = userOptions.srcDir ?? env.SRC_DIR ?? options.srcDir;
		options.dstDir = userOptions.dstDir ?? env.DST_DIR ?? options.dstDir;
	} catch (_e) {}

	if (!isAbsolute(options.srcDir)) {
		options.srcDir = join(cwd(), options.srcDir);
	}

	if (!isAbsolute(options.dstDir)) {
		options.dstDir = join(cwd(), options.dstDir);
	}

	return options;
}
