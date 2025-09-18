import { mkdirSync } from "node:fs";
import { DST_DIR, getAssets } from "./lib/assets.ts";
import { generateGainmap } from "./lib/generate-gainmap.ts";
import { optimizeModels } from "./lib/optimize-models.ts";

mkdirSync(DST_DIR, { recursive: true });
await generateGainmap(getAssets("*.{exr,hdr}"));
await optimizeModels(getAssets("*.glb"));
