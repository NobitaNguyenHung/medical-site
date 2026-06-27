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
const useQuizAssetPages = quizAssets.length > 0;

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
	writeGenerated(item.destinations.original.replace(/\.mdx$/, '.md'), originalPage(common, body));
	writeGenerated(item.destinations.summary, summaryPage(common, headings, intro));
	writeGenerated(item.destinations.reference, referencePage(common, headings));
	writeGenerated(item.destinations.explanation, explanationPage(common, headings, intro));
	if (!useQuizAssetPages) writeGenerated(item.destinations.assessment, assessmentPage(common, headings));
}

if (useQuizAssetPages) writeQuizAssetPages(quizAssets);

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
	const keyPoints = inferSummaryKeyPoints(meta, headings, intro);
	const frameworkRows = inferFrameworkRows(meta, headings);

	return `---\ntitle: "${yamlEscape(meta.title)}"\ndescription: "Bản tóm tắt 80/20 của chương ${yamlEscape(meta.title)}."\ntype: "chapter-summary"\ncategory: "books"\ndiataxis: "tutorial"\nmedicineSystem: "${meta.medicineSystem}"\nsource: "Raw"\nsourceDetail: "${yamlEscape(meta.sourcePath)}"\nstatus: "draft"\ngeneratedBy: "materialize-ingest"\nsummaryRule: "80-20"\ndraft: true\npagefind: false\nsidebar:\n  order: ${meta.order}\n  hidden: true\n---\n\nimport KeyPoints from '~/components/KeyPoints.astro';\nimport CompareTable from '~/components/CompareTable.astro';\nimport ClinicalPearl from '~/components/ClinicalPearl.astro';\nimport SelfCheck from '~/components/SelfCheck.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n## Nắm nhanh theo 80/20\n\n<KeyPoints title="20% cốt lõi cần nắm">\n\n${keyPoints}\n\n</KeyPoints>\n\n## Một câu nắm bài\n\n${mdEscape(intro || 'Chương này cần được biên tập để rút ra câu lõi từ nguyên văn, không dùng heading thay cho tóm tắt.')}\n\n## Khung đọc chương\n\n<CompareTable title="Từ nội dung sang câu hỏi học">\n\n| Câu hỏi | Vì sao quan trọng | Dữ kiện cần rút từ chương |\n| --- | --- | --- |\n${frameworkRows}\n\n</CompareTable>\n\n<ClinicalPearl>\n\n- Bản này do pipeline tạo để làm nháp. Trước khi xuất bản, thay toàn bộ dòng gợi ý bằng nội dung 80/20 thật của chương và xóa \`draft/pagefind/sidebar.hidden\`.\n\n</ClinicalPearl>\n\n## Tự kiểm\n\n<SelfCheck>\n\n1. Chương này giúp người học ra quyết định gì nhanh hơn?\n2. Cơ chế hoặc phân loại nào chi phối phần lớn nội dung?\n3. Dấu hiệu nào cần nhận ra đầu tiên trong một ca lâm sàng?\n\n</SelfCheck>\n\n<SourceNote>\n\n- Nguồn: \`${meta.sourcePath}\`\n- Gợi ý template: \`${meta.template}\`\n\n</SourceNote>\n`;
}

function inferSummaryKeyPoints(meta, headings, intro) {
	const usefulHeadings = headings
		.map((heading) => normalizeHeading(heading.text))
		.filter((text) => text && !/^tóm tắt$/i.test(removeDiacritics(text)));
	const points = [
		intro ? `- ${mdEscape(firstSentence(intro))}` : '',
		...usefulHeadings.slice(0, 4).map((text) => `- Rút lõi phần **${mdEscape(text)}**: định nghĩa, cơ chế, dấu hiệu nhận ra và ý nghĩa lâm sàng.`),
		`- Bản tự sinh chỉ là nháp: cần thay dòng gợi ý bằng 5-7 ý giá trị nhất của chương **${mdEscape(meta.title)}**, không để heading thay cho nội dung.`,
	].filter(Boolean);
	return points.join('\n') || '- Cần biên tập 5-7 ý lõi thật của chương.';
}

function inferFrameworkRows(meta, headings) {
	const main = headings.slice(0, 5).map((heading) => normalizeHeading(heading.text));
	const rows = [
		`| Chương này nói về vấn đề gì? | Xác định trục học, tránh đọc theo danh mục rời rạc | ${tableEscape(meta.title)} |`,
		`| Cơ chế trung tâm là gì? | Cơ chế giúp nhớ các biểu hiện còn lại | ${tableEscape(main[1] || 'Cần rút từ chương')} |`,
		`| Dấu hiệu nào nhận ra nhanh nhất? | Giúp áp dụng vào case và lượng giá | ${tableEscape(main[2] || 'Cần rút từ triệu chứng / bảng phân loại')} |`,
		`| Dễ nhầm với gì? | Chống học vẹt và chọn sai pháp | ${tableEscape(main[3] || 'Cần thêm khi biên tập')} |`,
	];
	return rows.join('\n');
}

function firstSentence(input) {
	const text = String(input).replace(/\s+/g, ' ').trim();
	const match = text.match(/^(.{30,220}?[.!?。]|.{30,220})(\s|$)/);
	return match ? match[1].trim() : text.slice(0, 220);
}

function referencePage(meta, headings) {
	const rows = headings.slice(0, 12).map((heading) => `| ${tableEscape(heading.text)} | Cần rút định nghĩa / dấu hiệu | [Nguyên thủy](/medical-site/books/${book.slug}/nguyen-thuy/${String(meta.order).padStart(2, '0')}-${slugify(meta.title)}/) |`).join('\n') || '|  |  |  |';

	return `---\ntitle: "Tra cứu · ${yamlEscape(meta.title)}"\ndescription: "Bản tra cứu nhanh từ chương ${yamlEscape(meta.title)}."\ntype: "quick-reference"\ncategory: "topics"\ndiataxis: "reference"\nmedicineSystem: "${meta.medicineSystem}"\nsource: "Raw"\nsourceDetail: "${yamlEscape(meta.sourcePath)}"\nstatus: "draft"\ngeneratedBy: "materialize-ingest"\nsidebar:\n  order: ${meta.order}\n---\n\nimport KeyPoints from '~/components/KeyPoints.astro';\nimport CompareTable from '~/components/CompareTable.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n## Dùng khi cần tra\n\n<KeyPoints>\n\n- Tra nhanh định nghĩa, mục chính và dấu hiệu cần nhớ.\n- Mở nguyên thủy khi cần đọc đầy đủ văn cảnh.\n- Cần biên tập lại sau khi học sâu chương.\n\n</KeyPoints>\n\n<CompareTable title="Bảng tra cứu nhanh">\n\n| Mục | Cần rút ra | Link |\n| --- | --- | --- |\n${rows}\n\n</CompareTable>\n\n<SourceNote>\n\n- Nguồn: \`${meta.sourcePath}\`\n\n</SourceNote>\n`;
}

function explanationPage(meta, headings, intro) {
	const mechanismItems = inferMechanismItems(meta, headings, intro);
	const keyPoints = mechanismItems.slice(0, 5)
		.map((item) => `- **${mdEscape(item.label)}:** ${mdEscape(item.mechanism)} ${mdEscape(item.clinical)}`)
		.join('\n');
	const mapRows = mechanismItems
		.map((item) => `| ${tableEscape(item.label)} | ${tableEscape(item.mechanism)} | ${tableEscape(item.signal)} | ${tableEscape(item.clinical)} |`)
		.join('\n');
	const mermaid = mechanismMermaid(meta, mechanismItems);
	const workedExample = workedExampleForMechanism(meta, mechanismItems);

	return `---\ntitle: "Cơ chế · ${yamlEscape(cleanMechanismTitle(meta.title))}"\ndescription: "Bản giải thích cơ chế bằng sơ đồ, workflow và cầu nối lâm sàng từ chương ${yamlEscape(meta.title)}."\ntype: "deep-explanation"\ncategory: "topics"\ndiataxis: "explanation"\nmedicineSystem: "${meta.medicineSystem}"\nsource: "Raw"\nsourceDetail: "${yamlEscape(meta.sourcePath)}"\nstatus: "draft"\ngeneratedBy: "materialize-ingest"\nexplanationStyle: "mechanism-map"\nsidebar:\n  order: ${meta.order}\n---\n\nimport KeyPoints from '~/components/KeyPoints.astro';\nimport CompareTable from '~/components/CompareTable.astro';\nimport ClinicalPearl from '~/components/ClinicalPearl.astro';\nimport MedicalNote from '~/components/MedicalNote.astro';\nimport RedFlags from '~/components/RedFlags.astro';\nimport SelfCheck from '~/components/SelfCheck.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n## Câu hỏi cơ chế\n\n<MedicalNote title="Đọc trang này để trả lời">\nVì sao **${mdEscape(cleanMechanismTitle(meta.title))}** xảy ra, đi theo chuỗi nào, tạo dấu hiệu gì, và điểm rẽ nào làm đổi hướng chẩn đoán hoặc xử trí?\n</MedicalNote>\n\n## Bản đồ cơ chế 1 trang\n\n<KeyPoints title="Nút cần nối bằng nhân quả">\n\n${keyPoints}\n\n</KeyPoints>\n\n## Workflow diễn tiến\n\n\`\`\`mermaid\n${mermaid}\n\`\`\`\n\n## Cầu nối sách vở → lâm sàng\n\n<CompareTable title="Từ cơ chế đến quyết định">\n\n| Nút cơ chế | Giải thích ngắn | Dấu hiệu kéo theo | Ý nghĩa chẩn đoán / xử trí |\n| --- | --- | --- | --- |\n${mapRows}\n\n</CompareTable>\n\n## Worked example\n\n${workedExample}\n\n<RedFlags>\n\n- Đừng học trang này như một danh sách thuật ngữ. Hãy đọc theo mũi tên: nguyên nhân → cơ chế → dấu hiệu → quyết định.\n- Nếu một dấu hiệu không nối được với cơ chế, quay lại nguyên thủy để kiểm tra văn cảnh trước khi ghi nhớ.\n- Bản tự sinh này là khung cơ chế; khi biên tập, cần thay các nhãn khái quát bằng sơ đồ chuyên biệt hơn cho từng bệnh/chứng.\n\n</RedFlags>\n\n<ClinicalPearl>\n\n- Cơ chế chỉ có giá trị học tập khi nó dự đoán được dấu hiệu tiếp theo hoặc giải thích được vì sao phải chọn pháp trị này thay vì pháp trị khác.\n\n</ClinicalPearl>\n\n## Tự kiểm\n\n<SelfCheck>\n\n1. Cơ chế trung tâm của bài này là gì?\n2. Nút nào là điểm rẽ khiến bệnh nhẹ chuyển nặng hoặc từ biểu vào lý?\n3. Dấu hiệu nào giúp chứng minh cơ chế đang diễn ra?\n4. Nếu phải vẽ lại trong 60 giây, bạn sẽ giữ lại những mũi tên nào?\n\n</SelfCheck>\n\n<SourceNote>\n\n- Nguồn: \`${meta.sourcePath}\`\n- Gợi ý template: \`${meta.template}\`\n- Kiểu trình bày: mechanism map + workflow + worked example.\n\n</SourceNote>\n`;
}

function inferMechanismItems(meta, headings, intro) {
	const cleanTitle = cleanMechanismTitle(meta.title);
	const candidates = headings
		.map((heading) => normalizeHeading(heading.text))
		.filter((text) => text && !/^tóm tắt$/i.test(removeDiacritics(text)))
		.filter((text, index, arr) => arr.indexOf(text) === index)
		.slice(0, 6);
	const base = candidates.length ? candidates : [cleanTitle];
	const items = base.map((heading, index) => mechanismItemFromHeading(heading, index, cleanTitle));
	const introPoint = firstSentence(intro || '');
	if (introPoint && items[0]) {
		items[0].mechanism = `${introPoint} Đây là trục đọc ban đầu, cần được nối tiếp bằng các nút cơ chế phía dưới.`;
	}
	return items.slice(0, 6);
}

function mechanismItemFromHeading(heading, index, title) {
	const clean = cleanMechanismTitle(heading);
	const folded = removeDiacritics(clean).toLowerCase();
	if (/nguyen nhan|can nguyen|benh ta|ta khi|on ta|doc|le khi/.test(folded)) {
		return {
			label: clean,
			mechanism: 'Xác định tác nhân hoặc điều kiện khởi phát, rồi hỏi tác nhân đó đi vào cơ thể theo đường nào và đánh vào hệ nào trước.',
			signal: 'Dấu hiệu sớm, mùa phát, đường vào, vị trí bị phạm đầu tiên.',
			clinical: 'Giúp suy tà, phân biệt tân cảm với phục tà, và chọn hướng thấu tà hay thanh lý nhiệt.',
		};
	}
	if (/co che|sinh benh|phat benh|dien bien|truyen bien/.test(folded)) {
		return {
			label: clean,
			mechanism: 'Biến phần mô tả thành chuỗi nhân quả: nguyên nhân kích hoạt → cơ chế trung gian → tổn thương chức năng hoặc thực thể → biểu hiện.',
			signal: 'Các dấu hiệu thay đổi theo tầng bệnh, mức nhiệt, mức thấp, hao khí tân hoặc tổn thương âm huyết.',
			clinical: 'Giúp dự đoán diễn tiến và nhận ra điểm cần can thiệp trước khi bệnh chuyển sâu.',
		};
	}
	if (/ve khi dinh huyet|tam tieu|bien chung|khi dinh|huyet/.test(folded)) {
		return {
			label: clean,
			mechanism: 'Dùng mô hình tầng để định vị bệnh: vệ thường nông, khí là nhiệt thịnh, dinh-huyết vào sâu; tam tiêu giúp định vị tạng phủ.',
			signal: 'Sốt, khát, phiền, ban chẩn, thần chí, lưỡi mạch và vị trí tổn thương.',
			clinical: 'Giúp chuyển từ thuộc lòng triệu chứng sang định vị tầng bệnh và chọn pháp tương ứng.',
		};
	}
	if (/chan doan|phan biet|xac dinh|dau hieu|trieu chung|bien nhung/.test(folded)) {
		return {
			label: clean,
			mechanism: 'Mỗi dấu hiệu phải được xem như bằng chứng của một cơ chế, không chỉ là tiêu chí liệt kê.',
			signal: 'Dấu hiệu then chốt, dấu hiệu loại trừ, dấu hiệu báo bệnh đã đổi tầng.',
			clinical: 'Giúp tránh nhầm bệnh danh giống nhau nhưng cơ chế khác nhau.',
		};
	}
	if (/dieu tri|du phong|dieu ho|phap|xu tri/.test(folded)) {
		return {
			label: clean,
			mechanism: 'Nguyên tắc xử trí phải đi ngược lại cơ chế gây bệnh: giải cái đang bế, thanh cái đang nhiệt, hóa cái đang thấp, dưỡng cái đang hao.',
			signal: 'Đáp ứng sau xử trí, dấu hiệu cần theo dõi, dấu hiệu không nên công phạt thêm.',
			clinical: 'Giúp hiểu vì sao dùng pháp đó, không học pháp trị như câu thuộc lòng.',
		};
	}
	if (/khai niem|dai cuong|tong quan/.test(folded)) {
		return {
			label: clean,
			mechanism: 'Định nghĩa phải được chuyển thành mô hình: điều kiện nào tạo bệnh, giới hạn khái niệm ở đâu, khác gì với khái niệm gần nó.',
			signal: 'Từ khóa định nghĩa, điểm phân biệt và phạm vi áp dụng.',
			clinical: 'Giúp mở bài bằng khung tư duy, không sa vào định nghĩa rỗng.',
		};
	}
	return {
		label: clean || title,
		mechanism: `Đặt mục này vào chuỗi cơ chế của bài: nó là nguyên nhân, tầng trung gian, biểu hiện, biến chứng hay hướng xử trí?`,
		signal: 'Tìm trong nguyên văn các dấu hiệu đi kèm và nối chúng với nút cơ chế.',
		clinical: index === 0 ? 'Dùng làm trục chính để đọc phần còn lại của bài.' : 'Dùng để hoàn thiện bản đồ cơ chế của chương.',
	};
}

function mechanismMermaid(meta, items) {
	const labels = items.slice(0, 5).map((item) => cleanMechanismTitle(item.label));
	const start = labels[0] || cleanMechanismTitle(meta.title);
	const second = labels[1] || 'Cơ chế trung gian';
	const third = labels[2] || 'Biểu hiện chính';
	const fourth = labels[3] || 'Điểm rẽ lâm sàng';
	const fifth = labels[4] || 'Nguyên tắc xử trí';
	return [
		'flowchart TD',
		`  A["${mermaidLabel(start)}"] --> B["${mermaidLabel(second)}"]`,
		`  B --> C["${mermaidLabel(third)}"]`,
		`  C --> D{"${mermaidLabel(fourth)}"}`,
		`  D -->|còn nông / còn thuận| E["Nhận diện sớm"]`,
		`  D -->|vào sâu / chuyển nặng| F["Theo dõi biến chứng"]`,
		`  E --> G["${mermaidLabel(fifth)}"]`,
		`  F --> G`,
	].join('\n');
}

function workedExampleForMechanism(meta, items) {
	const first = items[0]?.label || cleanMechanismTitle(meta.title);
	const second = items[1]?.label || 'cơ chế trung gian';
	const third = items[2]?.label || 'dấu hiệu quan sát';
	return `1. Bắt đầu từ **${mdEscape(first)}**: hỏi đây là nguyên nhân, điều kiện nền hay định nghĩa khung.\n2. Nối sang **${mdEscape(second)}**: viết thành câu “vì X nên Y”, tránh chỉ chép lại heading.\n3. Kiểm bằng **${mdEscape(third)}**: dấu hiệu nào phải xuất hiện nếu cơ chế này đúng?\n4. Kết luận bằng quyết định: cần phân biệt với gì, theo dõi điểm rẽ nào, và nguyên tắc xử trí đi ngược lại cơ chế nào.`;
}

function cleanMechanismTitle(input) {
	return normalizeHeading(input)
		.replace(/^(bài|chuong|chương)\s*\d+\.?\s*/i, '')
		.replace(/^\d+(?:\.\d+)*\.?\s*/, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function mermaidLabel(input) {
	return mdEscape(input).replace(/"/g, "'").slice(0, 80);
}

function assessmentPage(meta, headings) {
	const prompts = headings.slice(0, 5).map((heading, index) => `${index + 1}. ${questionFromHeading(heading.text)}`).join('\n');
	const sourceNote = '- Chưa thấy quiz HTML phù hợp trong `Raw/<sách>/Quiz` hoặc `Raw/<sách>/Quzi`, nên trang này sinh bộ câu hỏi tự kiểm tạm thời.';

	return `---\ntitle: "Lượng giá · ${yamlEscape(meta.title)}"\ndescription: "Bộ câu hỏi tự kiểm từ chương ${yamlEscape(meta.title)}."\ntype: "assessment-mcq"\ncategory: "books"\ndiataxis: "tutorial"\nmedicineSystem: "${meta.medicineSystem}"\nsource: "Raw"\nsourceDetail: "${yamlEscape(meta.sourcePath)}"\nstatus: "draft"\ngeneratedBy: "materialize-ingest"\nquizSource: "auto-generated"\nsidebar:\n  order: ${meta.order}\n---\n\nimport SelfCheck from '~/components/SelfCheck.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n## Mục tiêu lượng giá\n\n- Nhớ được thuật ngữ chính.\n- Giải thích được cơ chế hoặc lý luận chính.\n- Phân biệt được các mục dễ nhầm trong chương.\n\n<SelfCheck>\n\n${prompts || '1. Câu hỏi tự kiểm chính của chương là gì?'}\n\n</SelfCheck>\n\n## Đáp án / gợi ý biên tập\n\n| Câu | Gợi ý đáp án | Nguồn trong chương |\n| --- | --- | --- |\n| 1 | Cần biên tập | \`${meta.sourcePath}\` |\n\n<SourceNote>\n\n${sourceNote}\n\n</SourceNote>\n`;
}

function writeQuizAssetPages(assets) {
	for (const asset of [...assets].sort(compareQuizAssets)) {
		copyQuizAsset(asset);
		const order = quizAssetOrder(asset);
		const pageSlug = slugify(path.basename(asset.filename, path.extname(asset.filename)));
		const relativePath = `src/content/docs/books/${book.slug}/luong-gia/${String(order).padStart(2, '0')}-${pageSlug}.mdx`;
		writeGenerated(relativePath, quizAssetPage(asset, order));
	}
}

function compareQuizAssets(left, right) {
	return quizAssetOrder(left) - quizAssetOrder(right) || left.filename.localeCompare(right.filename, 'vi');
}

function quizAssetOrder(asset) {
	const normalized = slugify(asset.title);
	const order = new Map([
		['onbenh-thayhung', 1],
		['dai-cuong', 2],
		['nguoc-tat', 3],
		['phong-on', 4],
		['thu-thap', 5],
		['xuan-on', 6],
		['xuan-on-flashcard', 7],
	]);
	return order.get(normalized) || asset.index + 100;
}

function quizAssetPage(asset, order) {
	const title = quizAssetTitle(asset);
	return `---\ntitle: "${yamlEscape(title)}"\ndescription: "Quiz HTML do người dùng cung cấp từ ${yamlEscape(asset.relativeSource)}."\ntype: "assessment-mcq"\ncategory: "books"\ndiataxis: "tutorial"\nmedicineSystem: "shared"\nsource: "Raw"\nsourceDetail: "${yamlEscape(asset.relativeSource)}"\nstatus: "ready"\ngeneratedBy: "materialize-ingest"\nquizSource: "${yamlEscape(asset.relativeSource)}"\nsidebar:\n  order: ${order}\n---\n\nimport QuizEmbed from '~/components/QuizEmbed.astro';\nimport SourceNote from '~/components/SourceNote.astro';\n\n<QuizEmbed src="${asset.publicSrc}" title="${mdEscape(title)}" height="85vh" />\n\n<SourceNote>\n\n- Nguồn quiz: \`${asset.relativeSource}\`\n\n</SourceNote>\n`;
}

function quizAssetTitle(asset) {
	const normalized = slugify(asset.title);
	const labels = new Map([
		['onbenh-thayhung', 'Lượng giá tổng hợp Ôn bệnh'],
		['dai-cuong', 'Lượng giá Đại cương Ôn bệnh'],
		['nguoc-tat', 'Lượng giá Ngược tật'],
		['phong-on', 'Lượng giá Phong ôn'],
		['thu-thap', 'Lượng giá Thử thấp'],
		['xuan-on', 'Lượng giá Xuân ôn'],
		['xuan-on-flashcard', 'Flashcard Xuân ôn'],
	]);
	return labels.get(normalized) || `Lượng giá ${asset.title}`;
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
