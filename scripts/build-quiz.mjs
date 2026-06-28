#!/usr/bin/env node
/**
 * build-quiz.mjs — sinh file HTML quiz (Flashcard + MCQ) từ file markdown nội dung.
 *
 * Dùng MỘT template chung (scripts/quiz-template.html). Nội dung viết bằng markdown
 * trong Raw/<sach>/Quiz/<slug>.md theo cú pháp ở templates/quiz-content.md.
 *
 * Usage:
 *   node scripts/build-quiz.mjs Raw/on_benh_dai_cuong/Quiz/nguoc-tat.md
 *   node scripts/build-quiz.mjs Raw/on_benh_dai_cuong/Quiz        # cả thư mục
 *   node scripts/build-quiz.mjs --all                              # quét toàn bộ Raw/
 *
 * Output: public/quiz/<book-slug>/<file-slug>.html
 * (book-slug = tên thư mục sách đã slugify; vd on_benh_dai_cuong -> on-benh-dai-cuong)
 */
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const TEMPLATE = fs.readFileSync(path.resolve(cwd, 'scripts/quiz-template.html'), 'utf8');

// ---------- collect inputs ----------
const args = process.argv.slice(2);
let targets = [];
if (args.length === 0 || args.includes('--all')) {
	targets = globQuizMd(path.resolve(cwd, 'Raw'));
} else {
	for (const a of args) {
		const p = path.resolve(cwd, a);
		if (!fs.existsSync(p)) { console.error(`Not found: ${a}`); continue; }
		const stat = fs.statSync(p);
		if (stat.isDirectory()) targets.push(...globQuizMd(p));
		else if (p.endsWith('.md')) targets.push(p);
	}
}
if (!targets.length) { console.error('Không tìm thấy file .md nào để build.'); process.exit(1); }

let built = 0;
for (const file of targets) {
	try { buildOne(file); built++; }
	catch (e) { console.error(`✗ ${path.relative(cwd, file)}: ${e.message}`); }
}
console.log(`\nXong: ${built}/${targets.length} quiz.`);

// ---------- core ----------
function buildOne(mdPath) {
	const raw = fs.readFileSync(mdPath, 'utf8');
	const { meta, flashcards, mcqs } = parse(raw);

	const fileSlug = slugify(path.basename(mdPath, '.md'));
	// book-slug = thư mục cha của Quiz/ (vd .../on_benh_dai_cuong/Quiz/x.md -> on_benh_dai_cuong)
	const quizDir = path.dirname(mdPath);
	const bookDir = path.basename(quizDir).toLowerCase() === 'quiz' ? path.dirname(quizDir) : quizDir;
	const bookSlug = slugify(path.basename(bookDir));

	const title = meta.title || titleFromSlug(fileSlug);
	const html = TEMPLATE
		.replaceAll('{{TITLE}}', esc(title))
		.replaceAll('{{HEADER_H1}}', meta.h1 || esc(title))
		.replaceAll('{{HEADER_P}}', meta.subtitle || '')
		.replace('{{TOPICS_JSON}}', JSON.stringify(meta.topics))
		.replace('{{COLORS_JSON}}', JSON.stringify(meta.colors))
		.replace('{{FLASHCARDS_JSON}}', JSON.stringify(flashcards))
		.replace('{{MCQS_JSON}}', JSON.stringify(mcqs));

	const outDir = path.resolve(cwd, 'public/quiz', bookSlug);
	fs.mkdirSync(outDir, { recursive: true });
	const outPath = path.join(outDir, `${fileSlug}.html`);
	fs.writeFileSync(outPath, html);
	console.log(`✓ ${path.relative(cwd, mdPath)} -> public/quiz/${bookSlug}/${fileSlug}.html  (${flashcards.length} FC, ${mcqs.length} MCQ)`);
}

// ---------- parser ----------
function parse(raw) {
	// frontmatter
	const meta = { topics: [], colors: {} };
	let body = raw;
	const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
	if (fm) {
		body = raw.slice(fm[0].length);
		for (const line of fm[1].split('\n')) {
			const m = line.match(/^(\w+)\s*:\s*(.*)$/);
			if (!m) continue;
			const [, k, v] = m;
			if (k === 'title') meta.title = v.trim();
			else if (k === 'h1') meta.h1 = v.trim();
			else if (k === 'subtitle') meta.subtitle = v.trim();
		}
	}
	if (!meta.h1 && meta.title) meta.h1 = meta.title;

	// split into top-level sections by "# "
	const sections = splitSections(body, /^#\s+(.+)$/);
	for (const sec of sections) {
		const name = sec.heading.trim().toUpperCase();
		if (name === 'TOPICS') parseTopics(sec.content, meta);
		else if (name === 'FLASHCARDS') meta._fcRaw = sec.content;
		else if (name.startsWith('MCQ')) meta._mcqRaw = sec.content;
	}

	const flashcards = parseFlashcards(meta._fcRaw || '', meta);
	const mcqs = parseMCQ(meta._mcqRaw || '', meta);

	// nếu TOPICS không khai báo, suy ra từ dữ liệu
	if (!meta.topics.length) {
		const set = [];
		for (const x of [...flashcards, ...mcqs]) if (x.topic && !set.includes(x.topic)) set.push(x.topic);
		meta.topics = set;
	}
	return { meta, flashcards, mcqs };
}

function parseTopics(content, meta) {
	for (const line of content.split('\n')) {
		const m = line.match(/^\s*[-*]\s*(.+?)\s*:\s*(#[0-9a-fA-F]{3,8})\s*$/);
		if (m) { meta.topics.push(m[1].trim()); meta.colors[m[1].trim()] = m[2]; continue; }
		const m2 = line.match(/^\s*[-*]\s*(.+?)\s*$/);
		if (m2) meta.topics.push(m2[1].trim());
	}
}

// "## [Topic]" hoặc "## [Topic] (Bloom)" -> các khối Q/A hoặc MCQ
function parseFlashcards(content, meta) {
	const out = [];
	const blocks = splitSections(content, /^##\s+(.+)$/);
	let id = 0;
	for (const b of blocks) {
		const topic = parseTopicHeading(b.heading).topic;
		// mỗi cặp Q:/A:
		const re = /(^|\n)\s*Q\s*:\s*([\s\S]*?)\n\s*A\s*:\s*([\s\S]*?)(?=\n\s*Q\s*:|\s*$)/g;
		let m;
		while ((m = re.exec(b.content)) !== null) {
			out.push({ id: ++id, topic, q: inline(m[2].trim()), a: inline(m[3].trim()) });
		}
	}
	return out;
}

function parseMCQ(content, meta) {
	const out = [];
	const blocks = splitSections(content, /^##\s+(.+)$/);
	let id = 0;
	for (const b of blocks) {
		const { topic, bloom } = parseTopicHeading(b.heading);
		// một block có thể chứa nhiều câu. Câu mới bắt đầu ở "Scenario:" (nếu có) hoặc "Stem:".
		const raw = b.content.split(/\n(?=\s*(?:Scenario|Stem)\s*:)/i);
		// gộp chunk chỉ-Scenario (không có Stem) vào chunk kế tiếp
		const chunks = [];
		for (let i = 0; i < raw.length; i++) {
			if (/Scenario\s*:/i.test(raw[i]) && !/Stem\s*:/i.test(raw[i]) && raw[i + 1]) {
				chunks.push(raw[i] + '\n' + raw[++i]);
			} else chunks.push(raw[i]);
		}
		for (const ch of chunks) {
			if (!/Stem\s*:/i.test(ch)) continue;
			const q = parseOneMCQ(ch);
			if (!q) continue;
			q.id = ++id; q.topic = topic; q.bloom = bloom;
			out.push(q);
		}
	}
	return out;
}

function parseOneMCQ(text) {
	const get = (label) => {
		const m = text.match(new RegExp(`^\\s*${label}\\s*:\\s*([\\s\\S]*?)(?=\\n\\s*(?:Scenario|Stem|Answer|Exp|Key|[A-H])\\s*[:.]|$)`, 'im'));
		return m ? m[1].trim() : '';
	};
	const scenario = get('Scenario');
	const stem = get('Stem');
	const exp = get('Exp');
	const key = get('Key');
	const ansM = text.match(/^\s*Answer\s*:\s*([A-H])/im);
	if (!stem || !ansM) return null;
	// options: dòng "A. ..." -> "B. ..."
	const opts = [];
	const optRe = /^\s*([A-H])[.)]\s*(.+?)\s*$/gm;
	let m;
	while ((m = optRe.exec(text)) !== null) {
		opts.push(m[1].toUpperCase() + '. ' + inline(m[2].trim()));
	}
	if (opts.length < 2) return null;
	return {
		scenario: scenario ? inline(scenario) : '',
		stem: inline(stem),
		opts,
		ans: ansM[1].toUpperCase(),
		exp: inline(exp),
		key: key ? inline(key) : '',
	};
}

// ---------- helpers ----------
function parseTopicHeading(h) {
	// "[Topic] (Bloom)" | "Topic (Bloom)" | "Topic"
	let topic = h.trim(), bloom = '';
	const bm = topic.match(/\(([^)]*)\)\s*$/);
	if (bm) { bloom = bm[1].trim(); topic = topic.slice(0, bm.index).trim(); }
	topic = topic.replace(/^\[|\]$/g, '').trim();
	return { topic, bloom };
}

// chia text thành các section theo regex heading; trả về [{heading, content}]
function splitSections(text, headingRe) {
	const lines = text.split('\n');
	const out = [];
	let cur = null;
	for (const line of lines) {
		const m = line.match(headingRe);
		if (m) { cur = { heading: m[1], content: '' }; out.push(cur); }
		else if (cur) cur.content += line + '\n';
	}
	return out;
}

// markdown inline tối thiểu -> HTML: **bold**, *italic*, `code`
function inline(s) {
	if (!s) return '';
	s = s.replace(/\r/g, '').replace(/\n+/g, ' ').trim();
	return s
		.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
		.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<i>$2</i>')
		.replace(/`([^`]+)`/g, '<code>$1</code>');
}

function esc(s) { return String(s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function slugify(s) {
	return String(s)
		.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		.replace(/đ/g, 'd').replace(/Đ/g, 'D')
		.toLowerCase().trim()
		.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function titleFromSlug(slug) {
	return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function globQuizMd(root) {
	const out = [];
	if (!fs.existsSync(root)) return out;
	for (const e of fs.readdirSync(root, { withFileTypes: true })) {
		const full = path.join(root, e.name);
		if (e.isDirectory()) out.push(...globQuizMd(full));
		else if (e.isFile() && e.name.endsWith('.md') && /(^|\/)Quiz(\/|$)/i.test(path.dirname(full) + '/')) out.push(full);
	}
	return out;
}
