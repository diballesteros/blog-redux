import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const clientDir = path.join(root, "build", "client");

async function exists(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function main() {
	const spaFallback = path.join(clientDir, "__spa-fallback.html");
	const indexHtml = path.join(clientDir, "index.html");
	const out404 = path.join(clientDir, "404.html");

	const source = (await exists(spaFallback))
		? spaFallback
		: (await exists(indexHtml))
			? indexHtml
			: null;

	if (!source) {
		console.warn(
			"[postbuild] Could not find build/client/__spa-fallback.html or build/client/index.html; skipping 404.html copy."
		);
		return;
	}

	await fs.copyFile(source, out404);
	console.log(
		`[postbuild] Wrote ${path.relative(root, out404)} from ${path.relative(root, source)}`
	);
}

await main();
