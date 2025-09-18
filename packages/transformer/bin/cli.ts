import { cwd } from "node:process";
import { Asset } from "../src/index.ts";

const { default: config } = await import(`${cwd()}/assets.config.ts`);
Asset.process(config);
