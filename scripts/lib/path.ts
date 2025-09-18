import { dirname, extname, basename, join } from "node:path";

export function transformPath(
	path: string,
	options?: {
		dir?: string;
		ext?: string;
		base?: string;
		prefix?: string;
		suffix?: string;
	},
) {
	const ext = extname(path);
	const base = basename(path, ext);
	const dir = dirname(path);

	const opts = {
		ext: ext,
		base: base,
		dir: dir,
		prefix: "",
		suffix: "",
		...options,
	};

	return join(
		opts.dir,
		[opts.suffix, opts.base, opts.prefix, opts.ext].join(""),
	);
}
