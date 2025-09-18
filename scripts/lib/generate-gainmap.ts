import { chromium, type Page } from "playwright";

import { type Asset, processAsset } from "./assets.ts";

async function convert(page: Page, input: string, output: string) {
	await page.reload();

	await page.setInputFiles("input", input);

	await page.waitForFunction(() => () => {
		const buttons = Array.from(document.querySelectorAll("button"));
		for (const button of buttons) {
			if (button.textContent === "Save") return true;
		}
		return false;
	});

	await page.getByRole("button", { name: "Save" }).click();
	// await waitSeconds(1);

	const [download] = await Promise.all([
		page.waitForEvent("download"),
		page.getByRole("button", { name: "JPEG" }).click(),
	]);

	await download.saveAs(output);
}

export async function generateGainmap(assets: Asset[]) {
	const browser = await chromium.launch({
		// headless: false,
		// executablePath:
		// 	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	});
	const page = await browser.newPage();

	await page.goto("https://gainmap-creator.monogrid.com/");

	for (const asset of assets) {
		await processAsset(asset, async ([input, output]) => {
			await convert(page, input, output);
		});
	}

	await browser.close();
}
