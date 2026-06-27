#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const DOC_EXTENSIONS = new Set(['.md', '.mdx']);
const HTML_EXTENSIONS = new Set(['.html', '.htm']);

const [, , sourceArg, slugArg, ...restArgs] = process.argv;
const shouldWrite = restArgs.includes('--write');
const titleArg = restArgs.filter((arg) => arg !== '--write').join(' ').trim();

if (!sourceArg || !slugArg) {
	console.error('Usage: node scripts/ingest-book.mjs <raw-path> <book-slug> [book-title] [--write]');
	process.exit(1);
}

const cwd = process.cwd();
const sourcePath = path.resolve(cwd, sourceArg);
const bookSlug = slugify(slugArg);
const bookTitle = titleArg || titleFromSlug(bookSlug);

if (!fs.existsSync(sourcePath)) {
	console.error(`Source not found: ${sourcePath}`);
	process.exit(1);
}

const files = collectFiles(sourcePath)
	.filter((file) => DOC_EXTENSIONS.has(path.extname(file).toLowerCase()) || HTML_EXTENSIONS.has(path.extname(file).toLowerCase()))
	.sort((a, b) => a.localeCompare(b, 'vi'));

const quizHtmlFiles = files.filter((file) => HTML_EXTENSIONS.has(path.extname(file).toLowerCase()) && isQuizLikePath(file, sourcePath));
const contentFiles = files.filter((file) => !quizHtmlFiles.includes(file));
const items = contentFiles.map((file, index) => analyzeFile(file, index + 1));
const plan = {
	book: {
		title: bookTitle,
		slug: bookSlug,
		source: path.relative(cwd, sourcePath),
		generatedAt: new Date().toISOString(),
	},
	counts: {
		total: items.length,
		markdown: items.filter((item) => item.kind === 'markdown').length,
		html: items.filter((item) => item.kind === 'html').length,
		quizHtml: quizHtmlFiles.length,
	},
	quizAssets: quizHtmlFiles.map((file) => ({
		path: path.relative(cwd, file),
		title: titleFromFilename(path.basename(file, path.extname(file))),
		destination: `public/quiz/${bookSlug}/${safeQuizFilename(file)}`,
		embedSrc: `quiz/${bookSlug}/${safeQuizFilename(file)}`,
	})),
	actions: {
		writeSkeleton: shouldWrite,
		nextStep: 'Ask Codex to process one chapter at a time using TEMPLATE_CATALOG.md and this plan. Quiz HTML under Raw/<book>/Quiz or Quzi will be copied and embedded during materialize.',
	},
	items,
};

printPlan(plan);

if (shouldWrite) {
	writePlan(plan);
	writeSkeleton(plan);
}

function collectFiles(inputPath) {
	const stat = fs.statSync(inputPath);
	if (stat.isFile()) return [inputPath];

	const results = [];
	for (const entry of fs.readdirSync(inputPath, { withFileTypes: true })) {
		if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') continue;
		const fullPath = path.join(inputPath, entry.name);
		if (entry.isDirectory()) {
			results.push(...collectFiles(fullPath));
		} else if (entry.isFile()) {
			results.push(fullPath);
		}
	}
	return results;
}

function analyzeFile(file, order) {
	const ext = path.extname(file).toLowerCase();
	const relativePath = path.relative(cwd, file);
	const stat = fs.statSync(file);
	const baseName = path.basename(file, ext);

	if (HTML_EXTENSIONS.has(ext)) {
		return {
			order,
			kind: 'html',
			path: relativePath,
			sizeKb: Math.round(stat.size / 1024),
			title: titleFromFilename(baseName),
			slug: slugify(baseName),
			diataxis: 'tutorial',
			medicineSystem: 'shared',
			template: 'quiz-wrapper',
			destination: `src/content/docs/books/${bookSlug}/luong-gia/${String(order).padStart(2, '0')}-${slugify(baseName)}.mdx`,
			notes: ['HTML should stay in public/quiz/<book>/ and be embedded via QuizEmbed.'],
		};
	}

	const text = fs.readFileSync(file, 'utf8');
	const headings = extractHeadings(text);
	const title = headings[0]?.text || titleFromFilename(baseName);
	const signalText = `${baseName}\n${headings.slice(0, 6).map((heading) => heading.text).join('\n')}`;
	const classification = classify(signalText);
	const outputSlug = slugify(title || baseName);

	return {
		order,
		kind: 'markdown',
		path: relativePath,
		sizeKb: Math.round(stat.size / 1024),
		title,
		slug: outputSlug,
		headings: headings.slice(0, 16),
		...classification,
		destinations: recommendedDestinations(classification, outputSlug, order),
	};
}

function extractHeadings(text) {
	const headings = [];
	for (const line of text.split(/\r?\n/)) {
		const match = /^(#{1,4})\s+(.+?)\s*$/.exec(line);
		if (!match) continue;
		headings.push({ level: match[1].length, text: stripMarkdown(match[2]).slice(0, 140) });
	}
	return headings;
}

function classify(text) {
	const normalized = removeDiacritics(text.toLowerCase());
	const titleSignal = normalized.split('\n').slice(0, 2).join(' ');
	const has = (...words) => words.some((word) => normalized.includes(removeDiacritics(word.toLowerCase())));
	const titleHas = (...words) => words.some((word) => titleSignal.includes(removeDiacritics(word.toLowerCase())));

	if (titleHas('quiz', 'mcq', 'luong gia', 'flashcard', 'cau hoi')) {
		return { medicineSystem: 'shared', diataxis: 'tutorial', template: 'assessment-mcq' };
	}
	if (has('muc luc', 'lo trinh', 'chuong trinh', 'hoc phan', 'ke hoach hoc')) {
		return { medicineSystem: 'shared', diataxis: 'tutorial', template: 'learning-path' };
	}
	if (titleHas('cham cuu') || has('vi tri huyet', 'ma huyet', 'phoi huyet', 'du huyet', 'huyet vi', 'kinh huyet')) {
		return { medicineSystem: 'tcm', diataxis: 'reference', template: 'tcm-acupoint' };
	}
	if (has('kinh lac', 'tuan hanh', 'duong kinh')) {
		return { medicineSystem: 'tcm', diataxis: 'explanation', template: 'tcm-meridian' };
	}
	if (has('tinh vi quy kinh', 'cong nang chu tri', 'vi thuoc')) {
		return { medicineSystem: 'tcm', diataxis: 'reference', template: 'tcm-herb-monograph' };
	}
	if (has('quan than ta su', 'phuong te', 'gia giam', 'phuong nghia')) {
		return { medicineSystem: 'tcm', diataxis: 'reference', template: 'tcm-formula' };
	}
	if (has('bien chung', 'luoi mach', 'phap tri', 'chung trang')) {
		return { medicineSystem: 'tcm', diataxis: 'reference', template: 'tcm-pattern' };
	}
	if (has('on benh', 'phong on', 'thu on', 'thap on', 'xuan on', 'bai giang chuyen sau', 'yhct')) {
		return { medicineSystem: 'tcm', diataxis: 'explanation', template: 'deep-explanation' };
	}
	if (has('nguyen van', 'chu giai', 'noi kinh', 'thuong han', 'kim quy', 'on benh dieu bien')) {
		return { medicineSystem: 'tcm', diataxis: 'explanation', template: 'tcm-classic-chapter' };
	}
	if (has('am duong', 'ngu hanh', 'tang tuong', 'khi huyet', 'tan dich', 'hoc thuyet')) {
		return { medicineSystem: 'tcm', diataxis: 'explanation', template: 'tcm-theory' };
	}
	if (has('khang sinh', 'nhiem trung', 'khang thuoc')) {
		return { medicineSystem: 'modern', diataxis: 'how-to', template: 'antibiotic-guide' };
	}
	if (has('vi khuan', 'virus', 'vi sinh', 'ky sinh trung', 'nam')) {
		return { medicineSystem: 'modern', diataxis: 'reference', template: 'microbiology-pathogen' };
	}
	if (has('chan doan phan biet', 'phan biet voi')) {
		return { medicineSystem: 'modern', diataxis: 'reference', template: 'differential-diagnosis' };
	}
	if (has('tiep can', 'trieu chung', 'dau bung', 'dau nguc', 'kho tho', 'sot', 'ho')) {
		return { medicineSystem: 'modern', diataxis: 'how-to', template: 'symptom-approach' };
	}
	if (has('chan doan', 'xet nghiem', 'tieu chuan')) {
		return { medicineSystem: 'modern', diataxis: 'how-to', template: 'diagnosis-workup' };
	}
	if (has('dieu tri', 'xu tri', 'theo doi', 'phac do')) {
		return { medicineSystem: 'modern', diataxis: 'how-to', template: 'treatment-guide' };
	}
	if (has('dich te', 'sinh ly benh', 'co che benh sinh', 'lam sang')) {
		return { medicineSystem: 'modern', diataxis: 'reference', template: 'modern-disease-topic' };
	}

	return { medicineSystem: 'shared', diataxis: 'explanation', template: 'deep-explanation' };
}

function recommendedDestinations(classification, slug, order) {
	const prefix = `${String(order).padStart(2, '0')}-${slug}`;
	return {
		summary: `src/content/docs/books/${bookSlug}/tom-tat/${prefix}.mdx`,
		original: `src/content/docs/books/${bookSlug}/nguyen-thuy/${prefix}.mdx`,
		reference: `src/content/docs/topics/reference/${bookSlug}-${slug}.mdx`,
		explanation: `src/content/docs/topics/explanation/${bookSlug}-${slug}.mdx`,
		assessment: `src/content/docs/books/${bookSlug}/luong-gia/${prefix}-luong-gia.mdx`,
		primary: classification.diataxis === 'how-to'
			? `src/content/docs/updates/${bookSlug}-${slug}.mdx`
			: classification.diataxis === 'reference'
				? `src/content/docs/topics/reference/${bookSlug}-${slug}.mdx`
				: classification.diataxis === 'tutorial'
					? `src/content/docs/cases/${bookSlug}-${slug}.mdx`
					: `src/content/docs/topics/explanation/${bookSlug}-${slug}.mdx`,
	};
}

function writePlan(planData) {
	const planPath = path.join(sourcePath, 'INGEST_PLAN.json');
	writeFileIfChanged(planPath, `${JSON.stringify(planData, null, 2)}\n`);
	console.log(`\nWrote plan: ${path.relative(cwd, planPath)}`);
}

function writeSkeleton(planData) {
	const bookRoot = path.join(cwd, 'src/content/docs/books', bookSlug);
	const dirs = [
		path.join(bookRoot, 'tom-tat'),
		path.join(bookRoot, 'nguyen-thuy'),
		path.join(bookRoot, 'luong-gia'),
		path.join(cwd, 'src/content/docs/learning-paths'),
		path.join(cwd, 'public/quiz', bookSlug),
	];

	for (const dir of dirs) fs.mkdirSync(dir, { recursive: true });

	const learningPath = path.join(cwd, 'src/content/docs/learning-paths', `${bookSlug}.mdx`);
	const chapterRows = planData.items
		.filter((item) => item.kind === 'markdown')
		.map((item, index) => `| ${index + 1} | ${escapePipe(item.title)} | ${item.template} | ${item.sizeKb} KB | Chưa xử lý |`)
		.join('\n');

	writeFileIfMissing(learningPath, `---\ntitle: "Lộ trình ${bookTitle}"\ndescription: "Lộ trình học tự sinh từ ${planData.book.source}."\ntype: "learning-path"\ncategory: "learning-paths"\ndiataxis: "tutorial"\nmedicineSystem: "shared"\nestimatedTime: "Cần biên tập"\nsidebar:\n  order: 99\n---\n\nimport LearningPath from '~/components/LearningPath.astro';\nimport CompareTable from '~/components/CompareTable.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n<LearningPath\n  title="Lộ trình ${bookTitle}"\n  duration="Ước lượng sau khi chia chương"\n  level="Cần biên tập"\n  before="Cần biên tập"\n  goal="Đi qua từng chương, tạo tóm tắt, tra cứu, hiểu sâu và lượng giá."\n  practice="Xử lý từng chương theo TEMPLATE_CATALOG.md"\n  check="Mỗi chương có ít nhất tóm tắt + tự kiểm"\n/>\n\n## Kế hoạch chương\n\n<CompareTable title="Ingest plan">\n\n| # | Chương | Template gợi ý | Kích thước | Trạng thái |\n| --- | --- | --- | --- | --- |\n${chapterRows || '|  |  |  |  |  |'}\n\n</CompareTable>\n\n<SourceNote>\n\n- Plan sinh từ: \`${planData.book.source}\`\n- Chạy lại: \`npm run ingest:book -- ${planData.book.source} ${bookSlug} "${bookTitle}" --write\`\n\n</SourceNote>\n`);

	const readmePath = path.join(bookRoot, 'README.md');
	writeFileIfMissing(readmePath, `# ${bookTitle}\n\nSkeleton sách được tạo bởi \`npm run ingest:book\`.\n\n- Raw source: \`${planData.book.source}\`\n- Lộ trình: \`src/content/docs/learning-paths/${bookSlug}.mdx\`\n- Tóm tắt: \`tom-tat/\`\n- Nguyên thủy: \`nguyen-thuy/\`\n- Lượng giá: \`luong-gia/\`\n\nTiếp theo: yêu cầu Codex xử lý từng chương theo \`INGEST_PLAN.json\`.\n`);

	console.log(`Wrote skeleton under: src/content/docs/books/${bookSlug}/`);
	console.log(`Wrote learning path: src/content/docs/learning-paths/${bookSlug}.mdx`);
}

function printPlan(planData) {
	console.log(`Book: ${planData.book.title} (${planData.book.slug})`);
	console.log(`Source: ${planData.book.source}`);
	console.log(`Files: ${planData.counts.total} (${planData.counts.markdown} markdown, ${planData.counts.html} html, ${planData.counts.quizHtml} quiz html)\n`);
	if (planData.quizAssets.length) {
		console.log('Quiz HTML detected:');
		for (const quiz of planData.quizAssets) console.log(`    ${quiz.path} -> ${quiz.destination}`);
		console.log('');
	}
	for (const item of planData.items) {
		console.log(`${String(item.order).padStart(2, '0')}. [${item.kind}] ${item.title}`);
		console.log(`    ${item.path}`);
		console.log(`    ${item.template} · ${item.diataxis} · ${item.medicineSystem} · ${item.sizeKb} KB`);
		if (item.headings?.length) {
			console.log(`    headings: ${item.headings.map((heading) => `${'#'.repeat(heading.level)} ${heading.text}`).slice(0, 3).join(' | ')}`);
		}
	}
}

function writeFileIfMissing(filePath, content) {
	if (fs.existsSync(filePath)) {
		console.log(`Skipped existing: ${path.relative(cwd, filePath)}`);
		return;
	}
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, content);
}

function writeFileIfChanged(filePath, content) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8') === content) return;
	fs.writeFileSync(filePath, content);
}

function isQuizLikePath(filePath, rootPath) {
	const rel = removeDiacritics(path.relative(rootPath, filePath).toLowerCase());
	const parts = rel.split(path.sep);
	return parts.some((part) => /^(quiz|quzi|mcq|cau-hoi|cau_hoi|luong-gia|luong_gia)$/.test(part)) || /quiz|quzi|mcq|flashcard|luong[-_ ]?gia/.test(rel);
}

function safeQuizFilename(filePath) {
	const ext = path.extname(filePath).toLowerCase() || '.html';
	return `${slugify(path.basename(filePath, ext))}${ext === '.htm' ? '.html' : ext}`;
}

function stripMarkdown(text) {
	return text
		.replace(/[`*_~[\]()]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function titleFromFilename(name) {
	return name
		.replace(/[_-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function titleFromSlug(slug) {
	return slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function slugify(input) {
	return removeDiacritics(input)
		.toLowerCase()
		.replace(/đ/g, 'd')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 90) || 'untitled';
}

function removeDiacritics(input) {
	return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function escapePipe(input) {
	return String(input).replace(/\|/g, '\\|');
}
