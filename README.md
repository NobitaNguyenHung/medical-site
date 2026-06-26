# MedicalSite

Astro + Starlight + MDX site for a local medical knowledge base.

## Content Architecture

```text
MedicalSite/
├── Raw/
│   └── on-benh/              # raw local source files copied into this repo
├── src/
│   ├── content/
│   │   └── docs/             # Starlight-rendered content
│   │       ├── index.mdx
│   │       ├── books/        # sách: mỗi sách 1 thư mục, 3 mục
│   │       │   └── on-benh/
│   │       │       ├── tom-tat/      -> ../../../../../Raw/on-benh  (1 · tóm tắt)
│   │       │       ├── nguyen-thuy/  (2 · nguyên thủy, .md/.mdx)
│   │       │       └── luong-gia.mdx (3 · nhúng quiz HTML)
│   │       ├── cases/        # template clinical-case
│   │       ├── updates/      # template treatment-update
│   │       ├── topics/       # template topic-index
│   │       └── templates/    # khuôn ẩn (draft)
│   ├── components/           # MDX medical UI components
│   └── styles/
│       └── medical.css
└── public/
    └── quiz/<sách>/<tên>.html   # quiz build sẵn, nhúng qua <QuizEmbed>
```

> **Cách thêm sách / case / quiz: xem [WORKFLOW.md](./WORKFLOW.md).**

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

### Book = 3 sections

Each book lives in `src/content/docs/books/<book>/` and always has the same
three sidebar sections:

| # | Section | Folder / file | Format |
| :-- | :-- | :-- | :-- |
| 1 | Lý thuyết tóm tắt | `tom-tat/` | `.md` / `.mdx` |
| 2 | Lý thuyết nguyên thủy | `nguyen-thuy/` | `.md` / `.mdx` (trích sách gốc) |
| 3 | Câu hỏi lượng giá | `luong-gia.mdx` | nhúng quiz HTML từ `public/quiz/<book>/` |

The sidebar block for a book is explicit in `astro.config.mjs` (group `Sách` →
copy the "MẪU 1 SÁCH" block). Sections 1 & 2 use `autogenerate`; section 3 is a
single `luong-gia.mdx` that embeds the built quiz via `<QuizEmbed>`.

## Metadata

Use consistent frontmatter for search, sidebar, filtering, and future generated indexes.

```yaml
---
title: "Chẩn đoán Ôn bệnh"
description: "Hệ thống hóa chẩn đoán ôn bệnh theo lưỡi, răng, ban chẩn và triệu chứng."
type: "book-chapter"
category: "books"
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

- `book-chapter.mdx` → `books/<book>/tom-tat/`
- `clinical-case.mdx` → `cases/`
- `treatment-update.mdx` → `updates/`
- `topic-index.mdx` → `topics/`

They are draft-only and hidden from search/sidebar. Copy one into `books/`,
`cases/`, `updates/`, or `topics/`, then remove the `draft`/`pagefind`/`hidden`
frontmatter to publish. Also change the template metadata to the real content
type and category:

```yaml
type: "book-chapter" # or clinical-case / treatment-update / topic-index
category: "books"   # or cases / updates / topics
status: "draft"     # draft / review / published, depending on your workflow
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
| `npm run dev` | Start dev server at `http://localhost:4321` (hot reload) |
| `npm run build` | Build static site to `dist/` (also generates the Pagefind search index) |
| `npm run preview` | Serve the built `dist/` locally to verify before deploy |

> Astro's `dev` server runs in the foreground; there is no built-in
> `--background`/`status`/`logs`/`stop`. To background it use your shell
> (`npm run dev &`) or a process manager.

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
   Only `.md`/`.mdx` there become pages; HTML/images in `Raw/` are source artifacts.
3. `npm run build && npm run preview` to verify locally.
4. `git add -A && git commit -m "…" && git push` — GitHub Actions auto-builds and
   deploys to <https://nobitanguyenhung.github.io/medical-site/>.
