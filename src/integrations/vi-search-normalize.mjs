import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

function removeVnDiacritics(str) {
	return str
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D');
}

async function walkHtml(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) await walkHtml(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

function extractPagefindText(html) {
	html = html.replace(/<svg[\s\S]*?<\/svg>/gi, '');

	const match =
		html.match(/<main[^>]*data-pagefind-body[^>]*>([\s\S]*?)<\/main>/i) ||
		html.match(/<article[^>]*data-pagefind-body[^>]*>([\s\S]*?)<\/article>/i) ||
		html.match(/<div[^>]*data-pagefind-body[^>]*>([\s\S]*?)<\/div>/i);

	if (!match) return null;

	return match[1]
		.replace(/<[^>]+>/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&nbsp;/g, ' ')
		.replace(/&#?\w+;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function viSearchNormalize() {
	return {
		name: 'vi-search-normalize',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const distPath = dir instanceof URL ? dir.pathname : String(dir);
				const htmlFiles = await walkHtml(distPath);
				let count = 0;

				for (const file of htmlFiles) {
					let html = await readFile(file, 'utf-8');
					if (!html.includes('data-pagefind-body')) continue;

					const text = extractPagefindText(html);
					if (!text) continue;

					const normalized = removeVnDiacritics(text);
					if (normalized === text) continue;

					const injection =
						`<div data-pagefind-body class="pagefind-vi-normalized" ` +
						`aria-hidden="true" style="position:absolute;width:1px;height:1px;` +
						`overflow:hidden;clip:rect(0 0 0 0)">${normalized}</div>`;

					html = html.replace('</body>', `${injection}</body>`);
					await writeFile(file, html, 'utf-8');
					count++;
				}

				logger.info(`vi-search-normalize: ${count}/${htmlFiles.length} pages indexed`);
			},
		},
	};
}
