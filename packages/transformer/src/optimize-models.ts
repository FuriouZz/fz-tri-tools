import { Mode } from "@gltf-transform/cli";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { draco } from "@gltf-transform/functions";
import draco3d from "draco3dgltf";
import sharp from "sharp";

import type { Asset } from "./assets.ts";
import { ktx2Transform } from "./ktx2-transform.ts";

export async function optimizeModels(assets: Asset[]) {
	const io = new NodeIO()
		.registerExtensions(ALL_EXTENSIONS)
		.registerDependencies({
			"draco3d.decoder": await draco3d.createDecoderModule(), // Optional.
			"draco3d.encoder": await draco3d.createEncoderModule(), // Optional.
		});

	for (const asset of assets) {
		await asset.wrap(async () => {
			const doc = await io.read(asset.input);

			await doc.transform(
				draco(),
				ktx2Transform({
					encoder: sharp,
					mode: Mode.ETC1S,
				}),
			);

			await io.write(asset.output, doc);
		});
	}
}
