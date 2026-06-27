#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const [, , planArg] = process.argv;

if (!planArg) {
	console.error('Usage: node scripts/materialize-ingest.mjs Raw/<book>/INGEST_PLAN.json');
	process.exit(1);
}

const cwd = process.cwd();
const planPath = path.resolve(cwd, planArg);

if (!fs.existsSync(planPath)) {
	console.error(`Plan not found: ${planPath}`);
	process.exit(1);
}

const plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
const book = plan.book;
const sourceRoot = path.resolve(cwd, book.source);
const quizAssets = collectQuizAssets(sourceRoot, book.slug);
const usedQuizAssets = new Set();

let written = 0;
let skipped = 0;
let copiedQuiz = 0;

for (const item of plan.items) {
	if (item.kind !== 'markdown') continue;

	const sourcePath = path.resolve(cwd, item.path);
	if (!fs.existsSync(sourcePath)) {
		console.warn(`Missing source: ${item.path}`);
		continue;
	}

	const raw = fs.readFileSync(sourcePath, 'utf8');
	const body = stripFrontmatter(raw).trim();
	const headings = (item.headings?.length ? item.headings : extractHeadings(body).slice(0, 16))
		.map((heading) => ({ ...heading, text: normalizeHeading(heading.text) }));
	const intro = extractIntro(body);
	const order = Number(item.order) || 999;
	const title = item.title || titleFromPath(item.path);
	const common = {
		title,
		order,
		sourcePath: item.path,
		template: item.template || 'deep-explanation',
		medicineSystem: item.medicineSystem || 'shared',
	};
	const quiz = findQuizForItem(item, quizAssets, usedQuizAssets);
	if (quiz) {
		copyQuizAsset(quiz);
		usedQuizAssets.add(quiz.sourcePath);
	}

	writeGenerated(item.destinations.original.replace(/\.mdx$/, '.md'), originalPage(common, body));
	writeGenerated(item.destinations.summary, summaryPage(common, headings, intro));
	writeGenerated(item.destinations.reference, referencePage(common, headings));
	writeGenerated(item.destinations.explanation, explanationPage(common, headings, intro));
	writeGenerated(item.destinations.assessment, assessmentPage(common, headings, quiz));
}

const learningPathSynced = syncLearningPath(plan);

console.log(`Materialized ${written} file(s), skipped ${skipped} existing generated file(s), copied ${copiedQuiz} quiz asset(s).`);
console.log(learningPathSynced ? `Synced learning path: ${learningPathSynced}` : 'Learning path sync skipped.');

function writeGenerated(relativePath, content) {
	const filePath = path.resolve(cwd, relativePath);
	if (fs.existsSync(filePath) && !fs.readFileSync(filePath, 'utf8').includes('generatedBy: "materialize-ingest"')) {
		console.log(`Skipped hand-authored file: ${relativePath}`);
		skipped += 1;
		return;
	}
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, content);
	written += 1;
}

function originalPage(meta, body) {
	const cleanedBody = cleanOriginalForDisplay(body);
	return `---\ntitle: "${yamlEscape(meta.title)}"\ndescription: "Nguyên thủy từ ${yamlEscape(meta.sourcePath)}."\ntype: "source-original"\ncategory: "books"\ndiataxis: "explanation"\nmedicineSystem: "${meta.medicineSystem}"\nsource: "Raw"\nsourceDetail: "${yamlEscape(meta.sourcePath)}"\nstatus: "draft"\ngeneratedBy: "materialize-ingest"\nsourceCleaning: "light-display-cleanup"\nsidebar:\n  order: ${meta.order}\n---\n\n> **Ghi chú nguồn**\n> Bản trong \`Raw/\` được giữ làm nguồn lưu trữ, không tự ghi đè. Trang này chỉ dọn rác hiển thị mức nhẹ: ký tự điều khiển, khoảng trắng dư, số trang đứng riêng và placeholder ảnh hỏng rõ ràng. Nếu cần sửa nội dung học thuật, sửa ở các bản tóm tắt / tra cứu / hiểu sâu, không sửa âm thầm vào nguồn thô.\n\n${cleanedBody}\n`;
}

function summaryPage(meta, headings, intro) {
	const keyPoints = headings.slice(0, 5).map((heading) => `- ${mdEscape(heading.text)}`).join('\n') || '- Cần biên tập ý chính.';
	const rows = headings.slice(0, 10).map((heading) => `| ${'#'.repeat(heading.level)} | ${tableEscape(heading.text)} | Cần rút ý 80/20 |`).join('\n') || '|  |  |  |';

	return `---\ntitle: "Tóm tắt · ${yamlEscape(meta.title)}"\ndescription: "Bản tóm tắt 80/20 của chương ${yamlEscape(meta.title)}."\ntype: "chapter-summary"\ncategory: "books"\ndiataxis: "tutorial"\nmedicineSystem: "${meta.medicineSystem}"\nsource: "Raw"\nsourceDetail: "${yamlEscape(meta.sourcePath)}"\nstatus: "draft"\ngeneratedBy: "materialize-ingest"\nsummaryRule: "80-20"\nsidebar:\n  order: ${meta.order}\n---\n\nimport KeyPoints from '~/components/KeyPoints.astro';\nimport CompareTable from '~/components/CompareTable.astro';\nimport ClinicalPearl from '~/components/ClinicalPearl.astro';\nimport SelfCheck from '~/components/SelfCheck.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n## Nắm nhanh theo 80/20\n\n<KeyPoints title="20% cốt lõi cần nắm">\n\n${keyPoints}\n\n</KeyPoints>\n\n## Tóm tắt nhanh\n\n${mdEscape(intro || 'Cần biên tập đoạn tóm tắt từ nguyên văn chương.')}\n\n## Sơ đồ 80/20\n\n\`\`\`mermaid\nflowchart TD\n  A["Vấn đề chính của chương"] --> B["Khái niệm / định nghĩa"]\n  A --> C["Cơ chế / lý luận"]\n  A --> D["Dấu hiệu cần nhận ra"]\n  D --> E["Ứng dụng vào case / lượng giá"]\n\`\`\`\n\n## Visual brief\n\n<CompareTable title="Hình nên bổ sung khi biên tập">\n\n| Loại hình | Khi dùng | Gợi ý tạo |\n| --- | --- | --- |\n| Sơ đồ Mermaid | Luồng cơ chế, phân loại, thuật toán | Dùng trực tiếp trong MDX. |\n| SVG tự vẽ | Bảng phân tầng, timeline, bản đồ khái niệm cần kiểm soát chính xác | Tạo file SVG trong \`public/assets/<sách>/\` rồi nhúng. |\n| Ảnh/illustration sinh bởi Codex | Cần minh họa sinh động, không cần độ chính xác giải phẫu tuyệt đối | Sinh ảnh rồi đặt vào \`public/assets/<sách>/\`, ghi chú là hình minh họa. |\n| Hình y khoa từ nguồn | X-quang, mô bệnh học, biểu đồ nghiên cứu | Chỉ dùng khi có quyền/nguồn rõ; ưu tiên trích dẫn. |\n\n</CompareTable>\n\n## Bản đồ chương\n\n<CompareTable title="Cấu trúc chương">\n\n| Cấp | Mục | Cần rút theo 80/20 |\n| --- | --- | --- |\n${rows}\n\n</CompareTable>\n\n<ClinicalPearl>\n\n- Khi biên tập, hãy viết lại phần này sao cho người học nắm được lõi chương trong 3-5 phút trước khi đọc bản hiểu sâu.\n\n</ClinicalPearl>\n\n## Tự kiểm\n\n<SelfCheck>\n\n1. 20% ý nào giúp hiểu phần lớn chương này?\n2. Điểm nào dễ nhầm nhất khi áp dụng vào case?\n3. Nếu phải vẽ một sơ đồ duy nhất cho chương này, sơ đồ đó nên thể hiện quan hệ nào?\n\n</SelfCheck>\n\n<SourceNote>\n\n- Nguồn: \`${meta.sourcePath}\`\n- Gợi ý template: \`${meta.template}\`\n\n</SourceNote>\n`;
}

function referencePage(meta, headings) {
	const rows = headings.slice(0, 12).map((heading) => `| ${tableEscape(heading.text)} | Cần rút định nghĩa / dấu hiệu | [Nguyên thủy](/medical-site/books/${book.slug}/nguyen-thuy/${String(meta.order).padStart(2, '0')}-${slugify(meta.title)}/) |`).join('\n') || '|  |  |  |';

	return `---\ntitle: "Tra cứu · ${yamlEscape(meta.title)}"\ndescription: "Bản tra cứu nhanh từ chương ${yamlEscape(meta.title)}."\ntype: "quick-reference"\ncategory: "topics"\ndiataxis: "reference"\nmedicineSystem: "${meta.medicineSystem}"\nsource: "Raw"\nsourceDetail: "${yamlEscape(meta.sourcePath)}"\nstatus: "draft"\ngeneratedBy: "materialize-ingest"\nsidebar:\n  order: ${meta.order}\n---\n\nimport KeyPoints from '~/components/KeyPoints.astro';\nimport CompareTable from '~/components/CompareTable.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n## Dùng khi cần tra\n\n<KeyPoints>\n\n- Tra nhanh định nghĩa, mục chính và dấu hiệu cần nhớ.\n- Mở nguyên thủy khi cần đọc đầy đủ văn cảnh.\n- Cần biên tập lại sau khi học sâu chương.\n\n</KeyPoints>\n\n<CompareTable title="Bảng tra cứu nhanh">\n\n| Mục | Cần rút ra | Link |\n| --- | --- | --- |\n${rows}\n\n</CompareTable>\n\n<SourceNote>\n\n- Nguồn: \`${meta.sourcePath}\`\n\n</SourceNote>\n`;
}

function explanationPage(meta, headings, intro) {
	const rows = headings.slice(0, 10).map((heading) => `| ${tableEscape(heading.text)} | Cần giải thích cơ chế / lý luận | Cần liên hệ lâm sàng |`).join('\n') || '|  |  |  |';

	return `---\ntitle: "Hiểu sâu · ${yamlEscape(meta.title)}"\ndescription: "Bản hiểu sâu từ chương ${yamlEscape(meta.title)}."\ntype: "deep-explanation"\ncategory: "topics"\ndiataxis: "explanation"\nmedicineSystem: "${meta.medicineSystem}"\nsource: "Raw"\nsourceDetail: "${yamlEscape(meta.sourcePath)}"\nstatus: "draft"\ngeneratedBy: "materialize-ingest"\nsidebar:\n  order: ${meta.order}\n---\n\nimport KeyPoints from '~/components/KeyPoints.astro';\nimport CompareTable from '~/components/CompareTable.astro';\nimport ClinicalPearl from '~/components/ClinicalPearl.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n## Câu hỏi sâu của chương\n\n<KeyPoints>\n\n- Vì sao chương này quan trọng trong Ôn bệnh học?\n- Cơ chế / lý luận nào là trục chính?\n- Điểm nào cần liên hệ với chẩn đoán hoặc điều trị?\n\n</KeyPoints>\n\n## Nền văn bản\n\n${mdEscape(intro || 'Cần biên tập phần nền từ nguyên văn chương.')}\n\n<CompareTable title="Các ý cần đào sâu">\n\n| Mục | Cơ chế / lý luận | Liên hệ lâm sàng |\n| --- | --- | --- |\n${rows}\n\n</CompareTable>\n\n<ClinicalPearl>\n\n- Trang này được sinh tự động từ heading; cần biên tập lại để thành bài hiểu sâu hoàn chỉnh.\n\n</ClinicalPearl>\n\n<SourceNote>\n\n- Nguồn: \`${meta.sourcePath}\`\n- Gợi ý template: \`${meta.template}\`\n\n</SourceNote>\n`;
}

function assessmentPage(meta, headings, quiz) {
	const prompts = headings.slice(0, 5).map((heading, index) => `${index + 1}. ${questionFromHeading(heading.text)}`).join('\n');
	const quizImport = quiz ? "\nimport QuizEmbed from '~/components/QuizEmbed.astro';" : '';
	const quizBlock = quiz ? `\n## Quiz chuyên sâu\n\n<QuizEmbed src="${quiz.publicSrc}" title="${mdEscape(quiz.title)}" height="85vh" />\n\n` : '';
	const sourceNote = quiz
		? `- Đã phát hiện quiz HTML từ Raw và nhúng tự động: \`${quiz.relativeSource}\``
		: '- Chưa thấy quiz HTML phù hợp trong `Raw/<sách>/Quiz` hoặc `Raw/<sách>/Quzi`, nên trang này sinh bộ câu hỏi tự kiểm tạm thời.';

	return `---\ntitle: "Lượng giá · ${yamlEscape(meta.title)}"\ndescription: "Bộ câu hỏi tự kiểm từ chương ${yamlEscape(meta.title)}."\ntype: "assessment-mcq"\ncategory: "books"\ndiataxis: "tutorial"\nmedicineSystem: "${meta.medicineSystem}"\nsource: "Raw"\nsourceDetail: "${yamlEscape(meta.sourcePath)}"\nstatus: "draft"\ngeneratedBy: "materialize-ingest"\nquizSource: "${quiz ? yamlEscape(quiz.relativeSource) : 'auto-generated'}"\nsidebar:\n  order: ${meta.order}\n---\n\nimport SelfCheck from '~/components/SelfCheck.astro';\nimport SourceNote from '~/components/SourceNote.astro';${quizImport}\n\n${quizBlock}## Mục tiêu lượng giá\n\n- Nhớ được thuật ngữ chính.\n- Giải thích được cơ chế hoặc lý luận chính.\n- Phân biệt được các mục dễ nhầm trong chương.\n\n<SelfCheck>\n\n${prompts || '1. Câu hỏi tự kiểm chính của chương là gì?'}\n\n</SelfCheck>\n\n## Đáp án / gợi ý biên tập\n\n| Câu | Gợi ý đáp án | Nguồn trong chương |\n| --- | --- | --- |\n| 1 | Cần biên tập | \`${meta.sourcePath}\` |\n\n<SourceNote>\n\n${sourceNote}\n\n</SourceNote>\n`;
}

function syncLearningPath(planData) {
	const learningPath = path.resolve(cwd, 'src/content/docs/learning-paths', `${planData.book.slug}.mdx`);
	if (fs.existsSync(learningPath)) {
		const existing = fs.readFileSync(learningPath, 'utf8');
		const looksGenerated = existing.includes('Plan sinh từ:') || existing.includes('generatedBy: "materialize-ingest"') || existing.includes('generatedBy: "ingest-book"');
		if (!looksGenerated) return null;
	}

	const rows = planData.items
		.filter((item) => item.kind === 'markdown')
		.map((item) => {
			const status = chapterStatus(item);
			return `| ${item.order} | ${tableEscape(item.title)} | ${item.template} | ${item.sizeKb} KB | ${status} |`;
		})
		.join('\n');
	const counts = planData.items.filter((item) => item.kind === 'markdown').reduce((acc, item) => {
		const status = chapterStatus(item);
		if (status.includes('Đã biên tập')) acc.reviewed += 1;
		else if (status.includes('Đã tạo khung')) acc.materialized += 1;
		else if (status.includes('Đang thiếu')) acc.partial += 1;
		else acc.todo += 1;
		return acc;
	}, { reviewed: 0, materialized: 0, partial: 0, todo: 0 });

	const content = `---\ntitle: "Lộ trình ${yamlEscape(planData.book.title)}"\ndescription: "Lộ trình học tự sinh từ ${yamlEscape(planData.book.source)}."\ntype: "learning-path"\ncategory: "learning-paths"\ndiataxis: "tutorial"\nmedicineSystem: "shared"\nestimatedTime: "Cần biên tập"\ngeneratedBy: "materialize-ingest"\nlastSynced: "${new Date().toISOString()}"\nsidebar:\n  order: 99\n---\n\nimport LearningPath from '~/components/LearningPath.astro';\nimport CompareTable from '~/components/CompareTable.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n<LearningPath\n  title="Lộ trình ${mdEscape(planData.book.title)}"\n  duration="Ước lượng sau khi chia chương"\n  level="Cần biên tập"\n  before="Cần biên tập"\n  goal="Đi qua từng chương, tạo tóm tắt, tra cứu, hiểu sâu và lượng giá."\n  practice="Xử lý từng chương theo TEMPLATE_CATALOG.md"\n  check="Mỗi chương có ít nhất tóm tắt + tự kiểm"\n/>\n\n## Tiến độ\n\n<CompareTable title="Trạng thái xử lý">\n\n| Trạng thái | Số chương |\n| --- | --- |\n| Đã biên tập | ${counts.reviewed} |\n| Đã tạo khung | ${counts.materialized} |\n| Đang thiếu | ${counts.partial} |\n| Chưa xử lý | ${counts.todo} |\n\n</CompareTable>\n\n## Kế hoạch chương\n\n<CompareTable title="Ingest plan">\n\n| # | Chương | Template gợi ý | Kích thước | Trạng thái |\n| --- | --- | --- | --- | --- |\n${rows || '|  |  |  |  |  |'}\n\n</CompareTable>\n\n<SourceNote>\n\n- Plan sinh từ: \`${planData.book.source}\`\n- Đồng bộ tự động khi chạy: \`npm run materialize:ingest -- ${path.relative(cwd, planPath)}\`\n- "Đã tạo khung" nghĩa là các view đã tồn tại nhưng còn là bản tự sinh; "Đã biên tập" nghĩa là có ít nhất một view chương đã được chỉnh tay hoặc đánh dấu \`status: ready\`.\n\n</SourceNote>\n`;

	fs.mkdirSync(path.dirname(learningPath), { recursive: true });
	fs.writeFileSync(learningPath, content);
	return path.relative(cwd, learningPath);
}

function chapterStatus(item) {
	const destinations = destinationPaths(item);
	const states = destinations.map((relativePath) => pageState(relativePath));
	const exists = states.filter((state) => state.exists).length;
	if (exists === 0) return 'Chưa xử lý';
	if (exists < states.length) return `Đang thiếu ${states.length - exists}/${states.length}`;
	if (states.some((state) => state.reviewed)) return 'Đã biên tập';
	return 'Đã tạo khung';
}

function destinationPaths(item) {
	if (!item.destinations) return [];
	return [
		item.destinations.summary,
		item.destinations.original?.replace(/\.mdx$/, '.md'),
		item.destinations.reference,
		item.destinations.explanation,
		item.destinations.assessment,
	].filter(Boolean);
}

function pageState(relativePath) {
	const filePath = path.resolve(cwd, relativePath);
	if (!fs.existsSync(filePath)) return { exists: false, reviewed: false };
	const text = fs.readFileSync(filePath, 'utf8');
	return {
		exists: true,
		reviewed: !text.includes('generatedBy: "materialize-ingest"') || text.includes('status: "ready"') || text.includes("status: 'ready'"),
	};
}

function collectQuizAssets(rootPath, bookSlug) {
	if (!fs.existsSync(rootPath)) return [];
	return collectFiles(rootPath)
		.filter((filePath) => ['.html', '.htm'].includes(path.extname(filePath).toLowerCase()))
		.filter((filePath) => isQuizLikePath(filePath, rootPath))
		.map((filePath, index) => {
			const filename = safeQuizFilename(filePath);
			const relativeSource = path.relative(cwd, filePath);
			return {
				index,
				sourcePath: filePath,
				relativeSource,
				filename,
				destPath: path.resolve(cwd, 'public/quiz', bookSlug, filename),
				publicSrc: `quiz/${bookSlug}/${filename}`,
				title: titleFromPath(filePath),
				tokens: tokenSet(`${relativeSource} ${path.basename(filePath, path.extname(filePath))}`),
				leadingNumber: leadingNumber(path.basename(filePath)),
			};
		});
}

function collectFiles(inputPath) {
	const stat = fs.statSync(inputPath);
	if (stat.isFile()) return [inputPath];
	const files = [];
	for (const entry of fs.readdirSync(inputPath, { withFileTypes: true })) {
		if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') continue;
		const fullPath = path.join(inputPath, entry.name);
		if (entry.isDirectory()) files.push(...collectFiles(fullPath));
		if (entry.isFile()) files.push(fullPath);
	}
	return files;
}

function isQuizLikePath(filePath, rootPath) {
	const rel = removeDiacritics(path.relative(rootPath, filePath).toLowerCase());
	const parts = rel.split(path.sep);
	return parts.some((part) => /^(quiz|quzi|mcq|cau-hoi|cau_hoi|luong-gia|luong_gia)$/.test(part)) || /quiz|quzi|mcq|flashcard|luong[-_ ]?gia/.test(rel);
}

function findQuizForItem(item, assets, used) {
	if (!assets.length) return null;
	const itemTokens = tokenSet(`${item.title} ${item.slug} ${item.path}`);
	const itemOrder = Number(item.order);
	let best = null;
	for (const asset of assets) {
		if (used.has(asset.sourcePath)) continue;
		let score = 0;
		for (const token of itemTokens) {
			if (asset.tokens.has(token)) score += token.length > 3 ? 2 : 1;
		}
		if (asset.leadingNumber && asset.leadingNumber === itemOrder) score += 6;
		if (asset.index + 1 === itemOrder) score += 2;
		if (!best || score > best.score) best = { asset, score };
	}
	if (!best || best.score < 3) return null;
	return best.asset;
}

function copyQuizAsset(asset) {
	fs.mkdirSync(path.dirname(asset.destPath), { recursive: true });
	const current = fs.existsSync(asset.destPath) ? fs.readFileSync(asset.destPath) : null;
	const next = fs.readFileSync(asset.sourcePath);
	if (current && Buffer.compare(current, next) === 0) return;
	fs.copyFileSync(asset.sourcePath, asset.destPath);
	copiedQuiz += 1;
}

function safeQuizFilename(filePath) {
	const ext = path.extname(filePath).toLowerCase() || '.html';
	return `${slugify(path.basename(filePath, ext))}${ext === '.htm' ? '.html' : ext}`;
}

function tokenSet(input) {
	return new Set(
		removeDiacritics(String(input).toLowerCase())
			.split(/[^a-z0-9]+/)
			.filter((token) => token.length >= 2 && !['bai', 'chuong', 'phan', 'html', 'md', 'mdx'].includes(token)),
	);
}

function leadingNumber(input) {
	const match = /^0*(\d{1,3})(?:\D|$)/.exec(String(input));
	return match ? Number(match[1]) : null;
}

function cleanOriginalForDisplay(input) {
	return String(input)
		.replace(/\r\n?/g, '\n')
		.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
		.replace(/^\s*(?:trang|page)\s*\d+\s*$/gim, '')
		.replace(/^\s*\d{1,4}\s*$/gm, '')
		.replace(/!\[[^\]]*]\(\s*\)/g, '')
		.replace(/\n{4,}/g, '\n\n\n')
		.trim();
}

function stripFrontmatter(input) {
	if (!input.startsWith('---')) return input;
	const end = input.indexOf('\n---', 3);
	if (end === -1) return input;
	const after = input.indexOf('\n', end + 4);
	return after === -1 ? '' : input.slice(after + 1);
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

function extractIntro(text) {
	const withoutHeadings = text
		.split(/\r?\n/)
		.filter((line) => !/^#{1,6}\s+/.test(line.trim()))
		.join('\n');
	const paragraphs = withoutHeadings
		.split(/\n{2,}/)
		.map((paragraph) => stripMarkdown(paragraph).trim())
		.filter((paragraph) => paragraph.length > 80);
	return paragraphs.slice(0, 2).join('\n\n').slice(0, 900);
}

function questionFromHeading(text) {
	const clean = normalizeHeading(text).replace(/^\d+(?:\.\d+)*\.?\s*/, '').trim();
	if (/phân biệt/i.test(clean)) return `Phân biệt các ý chính trong mục "${mdEscape(clean)}".`;
	if (/nguyên nhân|cơ chế|phát bệnh/i.test(clean)) return `Giải thích nguyên nhân/cơ chế trong mục "${mdEscape(clean)}".`;
	if (/điều trị|dự phòng|chẩn đoán/i.test(clean)) return `Nêu nguyên tắc ${mdEscape(clean.toLowerCase())}.`;
	return `Trình bày ý chính của mục "${mdEscape(clean)}".`;
}

function normalizeHeading(text) {
	return String(text)
		.replace(/^[-–—]\s+/, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function stripMarkdown(text) {
	return String(text)
		.replace(/```[\s\S]*?```/g, '')
		.replace(/[`*_~[\]()]/g, '')
		.replace(/<[^>]+>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function titleFromPath(filePath) {
	return path.basename(filePath, path.extname(filePath)).replace(/[-_]+/g, ' ');
}

function slugify(input) {
	return String(input)
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd')
		.replace(/Đ/g, 'D')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 90) || 'untitled';
}

function removeDiacritics(input) {
	return String(input).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function yamlEscape(input) {
	return String(input).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function tableEscape(input) {
	return mdEscape(input).replace(/\|/g, '\\|');
}

function mdEscape(input) {
	return String(input).replace(/[{}]/g, '').trim();
}
