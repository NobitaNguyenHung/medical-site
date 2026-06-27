# MedicalSite

Astro + Starlight + MDX site for a local medical knowledge base.

## Content Architecture

The site follows a Diataxis-style information architecture: organize pages by
what the reader is trying to do, while keeping the current file paths stable.

| Reader need | Sidebar group | Typical content |
| :-- | :-- | :-- |
| Learn step by step | Học theo lộ trình | tutorials, clinical cases, quizzes |
| Solve a clinical task | Xử trí lâm sàng | how-to guides, algorithms, treatment updates |
| Look something up | Tra cứu nhanh | definitions, criteria, tables, drug notes |
| Understand why | Hiểu sâu | mechanisms, source text, explanations |

```text
MedicalSite/
├── Raw/
│   └── <sách>/               # raw local source files — inbox, được phép lộn xộn
├── src/
│   ├── content/
│   │   └── docs/             # Starlight-rendered content
│   │       ├── index.mdx
│   │       ├── books/        # sách: mỗi sách 1 thư mục, 4 mục
│   │       │   └── <sách>/
│   │       │       ├── tom-tat/      (1 · tóm tắt 20%,  .md/.mdx)
│   │       │       ├── bai-giang/    (2 · bài giảng chuyên sâu 50-60%, .mdx)
│   │       │       ├── nguyen-thuy/  (3 · nguyên thủy 100%, .md/.mdx)
│   │       │       └── luong-gia/    (4 · .mdx nhúng quiz HTML)
│   │       ├── cases/        # template clinical-case
│   │       ├── updates/      # template treatment-update
│   │       ├── topics/       # template topic-index
│   │       ├── learning-paths/ # lộ trình học theo sách/môn
│   │       └── templates/    # khuôn ẩn (draft)
│   ├── components/           # MDX medical UI components
│   └── styles/
│       └── medical.css
└── public/
    └── quiz/<sách>/<tên>.html   # quiz build sẵn, nhúng qua <QuizEmbed>
```

> **Cách thêm sách / case / quiz: xem [WORKFLOW.md](./WORKFLOW.md).**
> **Cách chọn template cho chương/menu y khoa: xem [TEMPLATE_CATALOG.md](./TEMPLATE_CATALOG.md).**
> **Skill nguồn để tái sử dụng workflow ingest: [medical-book-ingest](./codex-skills/medical-book-ingest/SKILL.md).**

`Raw/` is the local inbox/source area. Copy files here first. It can contain
messy imports such as Markdown, HTML exports, images, and source artifacts.
Starlight only renders files under `src/content/docs/`, so a topic can either
be curated into `books/`, `cases/`, `updates/`, or `topics/`, or temporarily
exposed with an internal symlink like `src/content/docs/on-benh`.

No content should depend on an external absolute path outside this repo.

Recommended split:

- `Raw/`: inbox/source material; allowed to be messy.
- `src/content/docs/books|cases|updates|topics`: curated MDX; consistent metadata; uses medical components.
- `src/content/docs/templates`: hidden MDX templates for creating new content.

### Book = 4 sections, shown through Diataxis

Each book lives in `src/content/docs/books/<book>/` and always has the same
four content sections. The sidebar groups these sections by reader need rather
than by folder name.

| # | Section | Folder | Format | Độ sâu |
| :-- | :-- | :-- | :-- | :-- |
| 1 | Lý thuyết tóm tắt | `tom-tat/` | `.md` / `.mdx` | 20% — key points, ghi nhớ nhanh |
| 2 | Bài giảng chuyên sâu | `bai-giang/` | `.mdx` | 50-60% — flow, bảng, pearl lâm sàng |
| 3 | Lý thuyết nguyên thủy | `nguyen-thuy/` | `.md` / `.mdx` (trích sách gốc) | 100% — tra cứu gốc |
| 4 | Câu hỏi lượng giá | `luong-gia/` | `.mdx` nhúng quiz HTML từ `public/quiz/<book>/` | — |

**Tầng `bai-giang/`** là nội dung giữa tom-tat và nguyen-thuy: dành cho người đã
đọc tóm tắt 20% và muốn hiểu **tại sao** — cấu trúc theo luồng tư duy lâm sàng,
có Mermaid/SVG flowchart, bảng so sánh, `<ClinicalPearl>`, và 3 câu hỏi tư duy
cuối bài. Template: `src/content/docs/templates/shared/deep-lecture.mdx`.

The sidebar block is explicit in `astro.config.mjs`. For a new book, add its
folders to the relevant Diataxis groups:

- `luong-gia/` → `Học theo lộ trình`
- `tom-tat/` → `Tra cứu nhanh`
- `bai-giang/` → `Hiểu sâu` (trước `nguyen-thuy`)
- `nguyen-thuy/` → `Hiểu sâu`

## Metadata

Use consistent frontmatter for search, sidebar, filtering, and future generated indexes.

```yaml
---
title: "Chẩn đoán Ôn bệnh"
description: "Hệ thống hóa chẩn đoán ôn bệnh theo lưỡi, răng, ban chẩn và triệu chứng."
type: "book-chapter"
category: "books"
diataxis: "explanation" # tutorial / how-to / reference / explanation
specialty: "YHCT"
source: "Giáo trình Ôn bệnh"
status: "draft"
difficulty: "intermediate"
tags: ["yhct", "on-benh", "chan-doan", "luoi"]
lastReviewed: 2026-06-26
pagefind: true
sidebar:
  order: 10
---
```

Legacy imported notes may still use compatibility fields such as `source_kb`,
`nguon_KB`, or `chunk_nguon`. New curated content should prefer `source`,
`sourceType`, `sourceDetail`, and `sourceUrl` if those fields are later added
to the schema.

For template files, use:

```yaml
draft: true
pagefind: false
sidebar:
  hidden: true
```

## MDX Templates

Templates live in `src/content/docs/templates/`:

Diataxis-first templates:

- `tutorial.mdx` → `cases/` or guided book lessons (`diataxis: "tutorial"`)
- `shared/learning-path.mdx` → course/chapter path pages in `learning-paths/`
- `how-to-guide.mdx` → `updates/` or clinical algorithms (`diataxis: "how-to"`)
- `reference-note.mdx` → quick lookup pages, usually `topics/reference/` (`diataxis: "reference"`)
- `explanation.mdx` → mechanisms, theory, original-text commentary, usually `topics/explanation/` (`diataxis: "explanation"`)

Specialized medical template sets:

- `templates/modern/` → Y học hiện đại: disease, symptom, diagnosis, treatment, drug, antibiotic, micro, imaging, lab, case, evidence, procedure.
- `templates/tcm/` → Y học cổ truyền: lý luận, cổ văn, chứng trạng, bệnh danh, vị thuốc, phương tễ, huyệt, kinh lạc, ca, an toàn.
- `templates/shared/` → dùng chung: atlas ảnh, bảng so sánh, thuật toán, quiz, patient education, ôn thi, concept map, source original.
- `templates/shared/chapter-summary.mdx`, `quick-reference.mdx`, `deep-explanation.mdx`, `assessment-mcq.mdx`, `flashcard-set.mdx`, `case-question-set.mdx` → output chuẩn cho mỗi chương sách.

Use [TEMPLATE_CATALOG.md](./TEMPLATE_CATALOG.md) when deciding which one fits a
chapter title, menu, or raw source file.

Legacy/specialized templates are still available:

- `book-chapter.mdx` → `books/<book>/tom-tat/`
- `clinical-case.mdx` → `cases/`
- `treatment-update.mdx` → `updates/`
- `topic-index.mdx` → `topics/`

They are draft-only and hidden from search/sidebar. Copy one into `books/`,
`cases/`, `updates/`, or `topics/`, then remove the `draft`/`pagefind`/`hidden`
frontmatter to publish. Also change the template metadata to the real content
type and category:

```yaml
type: "tutorial"      # or how-to-guide / reference-note / explanation
category: "cases"     # or books / updates / topics
diataxis: "tutorial"  # tutorial / how-to / reference / explanation
status: "draft"       # draft / review / published
```

## Medical Components

Reusable MDX UI in `src/components/` (import via the `~/components/` alias, e.g.
`import RedFlags from '~/components/RedFlags.astro'`):

| Component | Use |
| :-- | :-- |
| `MedicalNote` | Generic boxed note (optional `title`) |
| `KeyPoints` | Bulleted key-takeaways block |
| `RedFlags` | Danger / refer-out warnings |
| `EvidenceBox` | Evidence block with `level="A/B/C"` |
| `AlgorithmBox` | Numbered decision/treatment steps |
| `CompareTable` | Side-by-side comparison wrapper |
| `ClinicalCase` | Clinical-case wrapper (optional `title`) |
| `ClinicalPearl` | Single highlighted clinical pearl |
| `SelfCheck` | Self-assessment / quiz block |
| `SourceNote` | Source / citation footer |
| `TreatmentUpdate` | Guideline-update wrapper (optional `title`) |
| `QuizEmbed` | Embed a built quiz HTML from `public/` (`src`, `title`, `height`); auto-prefixes the base path |

## Theme

UI uses the [Flexoki](https://www.npmjs.com/package/starlight-theme-flexoki)
Starlight theme — a warm, paper-like palette tuned for long-form reading.
Configured in `astro.config.mjs` inside `starlight({ ... })`:

```js
plugins: [starlightThemeFlexoki({ accentColor: 'blue' })],
```

- `accentColor`: `red` · `orange` · `yellow` · `green` · `cyan` · `blue` ·
  `purple` · `magenta` (default `cyan`; this repo uses `blue`).
- The theme registers its CSS **before** `customCss`, so `src/styles/medical.css`
  loads last and always wins — local component styling is never overridden.
- Installed with `--legacy-peer-deps` (its peer range predates Astro 7; harmless).

## Commands

Run from the project root:

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `astro dev --background` | Start managed background dev server |
| `astro dev status` | Check background dev server status |
| `astro dev logs` | Read background dev server logs |
| `astro dev stop` | Stop background dev server |
| `npm run build` | Build static site to `dist/` (also generates the Pagefind search index) |
| `npm run preview` | Serve the built `dist/` locally to verify before deploy |
| `npm run ingest:book -- Raw/<book> <slug> "Tên sách"` | Scan raw book and print ingest plan |
| `npm run ingest:book -- Raw/<book> <slug> "Tên sách" --write` | Create book skeleton and learning path |

Use the managed Astro background commands for local development in this repo.

## CodeGraph (code intelligence)

The repo is wired to [CodeGraph](https://www.npmjs.com/package/@colbymchenry/codegraph),
a local MCP server that builds a symbol/call/dependency graph for agents.

| Command | Action |
| :-- | :-- |
| `codegraph status` | Show graph stats (files / nodes / edges) |
| `codegraph init` | (Re)build the index for this repo |

State lives in `.codegraph/`.

> **Limited value here.** CodeGraph currently parses only `.js` / `.ts` / `.mjs`.
> It does **not** parse `.astro` or `.md`/`.mdx`, so on this project it indexes
> just the three config files (`astro.config.mjs`, `src/content.config.ts`, the
> remark plugin) — the 11 `.astro` components and all Markdown content are
> invisible to it. It becomes useful only if real `.ts`/`.js` logic is added.
> Content relationships (wikilinks, tags, disease graph) need a different tool.

## Workflow & Deploy

Full step-by-step for adding books, cases, updates, topics, and quizzes:
**[WORKFLOW.md](./WORKFLOW.md)**.

Quick version:

1. Copy raw files into `Raw/<domain>/`.
2. Expose / curate under `src/content/docs/` (symlink for quick, MDX for curated).
   Choose the location by reader need: `luong-gia/` or `cases/` for learning,
   `updates/` for how-to, `tom-tat/` or `topics/reference/` for reference,
   `nguyen-thuy/` or `topics/explanation/` for explanation. Only `.md`/`.mdx` become pages; HTML/images in `Raw/` are
   source artifacts.
3. `npm run build && npm run preview` to verify locally.
4. `git add -A && git commit -m "…" && git push` — GitHub Actions auto-builds and
   deploys to <https://nobitanguyenhung.github.io/medical-site/>.

## Thêm 1 file — chạy thế nào

### A. Thêm 1 file `.md` / `.mdx` (1 bài đọc)

1. Đặt file vào **đúng thư mục** dưới `src/content/docs/`:
   - Học theo lộ trình → `cases/` hoặc `books/<sách>/luong-gia/`.
   - Xử trí lâm sàng → `updates/`.
   - Tra cứu nhanh → `Raw/on-benh/` nếu là tóm tắt Ôn bệnh, hoặc `topics/reference/`.
   - Hiểu sâu → `books/<sách>/nguyen-thuy/` hoặc `topics/explanation/`.
2. Frontmatter tối thiểu: `title`. Tùy chọn: `sidebar: { order: N }` để xếp thứ tự.
3. Chạy:
   ```bash
   npm run build && npm run preview      # xem http://localhost:4321
   git add -A && git commit -m "add: <bài>" && git push
   ```
4. ~1 phút sau hiện trên web. Menu tự cập nhật (section dùng `autogenerate`).

> File `.md` **không cần** sửa config nếu nằm trong thư mục đã `autogenerate`.
> Thêm **sách mới** mới phải sửa `astro.config.mjs` để thêm 3 nhánh sách vào
> đúng nhóm Diátaxis.

### B. Thêm 1 file `.html` (quiz / trang tương tác build sẵn)

`.html` **KHÔNG** bỏ vào `src/content/docs/` (Starlight bỏ qua, không render).

1. Đặt vào **`public/`**, theo quy ước: `public/quiz/<sách>/<tên>.html`.
2. Nhúng vào 1 trang bằng component `QuizEmbed` (tự thêm base path):
   ```mdx
   import QuizEmbed from '~/components/QuizEmbed.astro';
   <QuizEmbed src="quiz/<sách>/<tên>.html" title="..." />
   ```
   Nếu cập nhật quiz cũ và giữ nguyên tên file `.html`, thường khỏi sửa trang `.mdx`
   trong `books/<sách>/luong-gia/`.
3. `npm run build && git add -A && git commit -m "…" && git push`.

> Mọi thứ trong `public/` được bê nguyên vào `dist/` theo đúng đường dẫn.
> Link tới nó **phải có base**: dùng `<QuizEmbed>` hoặc `/medical-site/...`.

## Tránh lỗi (đã từng dính)

| Lỗi | Vì sao | Cách tránh |
| :-- | :-- | :-- |
| Link nội bộ 404 | Tự gõ link thiếu base `/medical-site/` | Link tay phải bắt đầu `/medical-site/…` **hoặc** dùng đường dẫn tương đối. Để Starlight tự sinh link (sidebar) khi có thể. |
| Đổi/di chuyển bài → link cũ 404 | Link tay trỏ path cũ (vd hero trong `index.mdx`) | Khi **rename/move** nội dung, sửa luôn mọi link tay. Quét: `grep -rE 'href=\"/medical-site' dist` sau build. |
| Trang/nút cũ vẫn hiện sau deploy | Cache PWA | Giờ SW chạy **NetworkFirst** → online luôn mới. Nếu vẫn cũ: hard-refresh / tab ẩn danh 1 lần. |
| `.html` không hiện thành trang | Starlight chỉ render `.md`/`.mdx` | `.html` để trong `public/`, nhúng bằng `<QuizEmbed>`. |
| `npm install` báo ERESOLVE | Dep peer cũ hơn Astro 7 | Đã có `.npmrc` (`legacy-peer-deps=true`). Giữ nguyên. |
| CI build fail (engine) | Astro 7 cần Node ≥22.12; action mặc định 20 | `.github/workflows/deploy.yml` đã ép `node-version: 22`. Đừng hạ. |
| Sidebar config invalid | Starlight ≥0.39 bỏ nhóm `autogenerate` có `label` | Nhóm phải `{ label, items: [{ autogenerate: { directory } }] }`. |
| URL bài xấu / khó gõ (tiếng Việt dấu) | Slug lấy từ tên file | Đặt tên file ASCII, hoặc thêm `slug:` trong frontmatter cho URL sạch. |

> Kiểm tra nhanh trước khi push: `npm run build` (chặn lỗi tại chỗ) +
> `grep -rE 'href="/(on-benh|books|cases|updates|topics)/' dist` không ra dòng nào
> = không còn link thiếu base.
