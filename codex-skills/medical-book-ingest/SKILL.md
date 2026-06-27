---
name: medical-book-ingest
description: Use when processing a medical book, textbook chapter, table of contents, or raw Markdown/HTML folder into this Astro/Starlight MedicalSite. Scans Raw input, creates an ingest plan, chooses templates from TEMPLATE_CATALOG.md, and generates book skeletons, learning paths, summaries, references, explanations, and assessments without loading the whole book at once.
---

# Medical Book Ingest

Use this skill when the user says they copied a medical book/chapter/menu into `Raw/`
and wants it turned into site content.

## Core rule

Never load a large book all at once. Work in passes:

1. Scan filenames, size, and headings.
2. Create/read `INGEST_PLAN.json`.
3. Choose templates using `TEMPLATE_CATALOG.md`.
4. Process one chapter at a time.
5. Build and fix errors.

## Commands

Scan only:

```bash
npm run ingest:book -- Raw/<book-folder> <book-slug> "Book title"
```

Create skeleton:

```bash
npm run ingest:book -- Raw/<book-folder> <book-slug> "Book title" --write
```

Then read:

```text
Raw/<book-folder>/INGEST_PLAN.json
```

## Output model

For each chapter, prefer these views:

- `chapter-summary` → `books/<book>/tom-tat/` using the 80/20 rule: a small set
  of core ideas, a quick summary, and a visual brief for Mermaid/SVG/generated images.
- `source-original` or cleaned original → `books/<book>/nguyen-thuy/`
- `quick-reference` → `topics/reference/`
- `deep-explanation` → `topics/explanation/`
- `assessment-mcq`, `flashcard-set`, or `case-question-set` → `books/<book>/luong-gia/`

For HTML quiz files:

- If the user places MCQ HTML in `Raw/<book>/Quiz/` or `Raw/<book>/Quzi/`,
  `materialize:ingest` should copy matched files into `public/quiz/<book>/` and
  embed them in the relevant `luong-gia/` page.
- If no matching HTML quiz exists, generate a temporary self-check/MCQ assessment.

For messy OCR/PDF source:

- Do not overwrite `Raw/`; it is archival.
- Clean only the rendered source page lightly when generating `nguyen-thuy/`.
- Put interpretive fixes in summary/reference/explanation pages, with source notes
  when meaning is uncertain.

## Template selection

Read `TEMPLATE_CATALOG.md` before deciding template types. Do not re-invent the
template taxonomy unless the catalog is missing a real content type.

Fast rules:

- Course/book menu → `learning-path`
- Chapter summary → `chapter-summary`
- Lookup table → `quick-reference`
- Mechanism/theory/classic explanation → `deep-explanation`
- MCQ → `assessment-mcq`
- Flashcard → `flashcard-set`
- Case questions → `case-question-set`
- TCM pattern/lưỡi mạch/pháp trị → `tcm-pattern`
- Herb/tính vị quy kinh → `tcm-herb-monograph`
- Formula/quân thần tá sứ → `tcm-formula`
- Acupoint/huyệt → `tcm-acupoint`
- Modern symptom approach → `symptom-approach`
- Antibiotics → `antibiotic-guide`

## Validation

Always run:

```bash
npm run build
```

Also run:

```bash
git diff --check
```

Report any warnings separately from blocking errors.
