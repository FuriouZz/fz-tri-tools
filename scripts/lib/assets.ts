import { join } from "node:path";
import { cwd } from "node:process";
import { getFiles } from "./file.ts";
import { transformPath } from "./path.ts";

export const SRC_DIR = join(cwd(), "resources");
export const DST_DIR = join(cwd(), "public/assets/generated");

export type Asset = [input: string, output: string];

export function getOutput(input: string) {
	if (input.endsWith(".exr") || input.endsWith(".hdr")) {
		return transformPath(input, { dir: DST_DIR, ext: ".jpg" });
	}
	return transformPath(input, { dir: DST_DIR });
}

export function getAssets(pattern: string) {
	return getFiles(join(SRC_DIR, pattern)).map((input) => {
		return [input, getOutput(input)] as Asset;
	});
}

export async function processAsset(
	asset: Asset,
	process: (asset: Asset) => Promise<unknown>,
) {
	console.log("Process", asset[0]);
	await process(asset);
	console.log("Generated", asset[1], "\n");
}
