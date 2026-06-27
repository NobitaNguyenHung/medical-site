#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const [, , mode, ...args] = process.argv;
const cwd = process.cwd();
const shouldWrite = args.includes('--write');
const includeRaw = args.includes('--raw');
const cleanArgs = args.filter((arg) => arg !== '--write' && arg !== '--raw');

if (!mode || !['book', 'chapter'].includes(mode)) {
	console.error('Usage:');
	console.error('  npm run content:delete -- book <book-slug> [--raw] [--write]');
	console.error('  npm run content:delete -- chapter Raw/<book>/INGEST_PLAN.json <order-or-slug> [--raw] [--write]');
	process.exit(1);
}

const targets = mode === 'book'
	? bookTargets(cleanArgs[0])
	: chapterTargets(cleanArgs[0], cleanArgs[1]);

if (!targets.length) {
	console.log('No matching files found.');
	process.exit(0);
}

console.log(shouldWrite ? 'Deleting:' : 'Dry run. These paths would be deleted:');
for (const target of targets) console.log(`- ${path.relative(cwd, target)}`);

if (!shouldWrite) {
	console.log('\nAdd --write to delete for real.');
	process.exit(0);
}

for (const target of targets) {
	if (!fs.existsSync(target)) continue;
	fs.rmSync(target, { recursive: true, force: true });
}

console.log(`Deleted ${targets.length} path(s).`);
console.log('Run npm run build afterward. If astro.config.mjs has explicit sidebar entries for this book, remove those entries too.');

function bookTargets(slug) {
	if (!slug) fail('Missing <book-slug>.');
	const bookSlug = slugify(slug);
	const targets = [
		path.resolve(cwd, 'src/content/docs/books', bookSlug),
		path.resolve(cwd, 'src/content/docs/learning-paths', `${bookSlug}.mdx`),
		path.resolve(cwd, 'src/content/docs/topics/reference', bookSlug),
		path.resolve(cwd, 'src/content/docs/topics/explanation', bookSlug),
		path.resolve(cwd, 'public/quiz', bookSlug),
	];
	targets.push(...filesStartingWith(path.resolve(cwd, 'src/content/docs/topics/reference'), `${bookSlug}-`));
	targets.push(...filesStartingWith(path.resolve(cwd, 'src/content/docs/topics/explanation'), `${bookSlug}-`));
	if (includeRaw) {
		const rawSource = rawSourceForBook(bookSlug);
		if (rawSource) targets.push(path.resolve(cwd, rawSource));
	}
	return uniqueExisting(targets);
}

function chapterTargets(planArg, selector) {
	if (!planArg || !selector) fail('Missing plan path or chapter selector.');
	const planPath = path.resolve(cwd, planArg);
	if (!fs.existsSync(planPath)) fail(`Plan not found: ${planArg}`);
	const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
	const item = plan.items.find((candidate) => {
		const order = String(candidate.order);
		return order === String(selector) || candidate.slug === selector || slugify(candidate.title) === selector;
	});
	if (!item) fail(`Chapter not found in plan: ${selector}`);

	const targets = [];
	if (item.destinations) {
		for (const relativePath of Object.values(item.destinations)) {
			if (!relativePath) continue;
			targets.push(path.resolve(cwd, relativePath));
			if (relativePath.endsWith('.mdx')) targets.push(path.resolve(cwd, relativePath.replace(/\.mdx$/, '.md')));
		}
	}
	if (includeRaw && item.path) targets.push(path.resolve(cwd, item.path));
	return uniqueExisting(targets);
}

function filesStartingWith(dir, prefix) {
	if (!fs.existsSync(dir)) return [];
	return fs.readdirSync(dir, { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.startsWith(prefix))
		.map((entry) => path.join(dir, entry.name));
}

function rawSourceForBook(bookSlug) {
	for (const planPath of findFiles(path.resolve(cwd, 'Raw'), 'INGEST_PLAN.json')) {
		try {
			const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
			if (plan.book?.slug === bookSlug) return plan.book.source;
		} catch {
			// Ignore malformed plans.
		}
	}
	return null;
}

function findFiles(dir, filename) {
	if (!fs.existsSync(dir)) return [];
	const results = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) results.push(...findFiles(fullPath, filename));
		else if (entry.isFile() && entry.name === filename) results.push(fullPath);
	}
	return results;
}

function uniqueExisting(paths) {
	return [...new Set(paths)].filter((target) => fs.existsSync(target));
}

function slugify(input) {
	return String(input)
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function fail(message) {
	console.error(message);
	process.exit(1);
}
