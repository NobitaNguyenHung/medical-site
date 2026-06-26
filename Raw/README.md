# Raw Content

This folder stores source material copied into the MedicalSite repo.

Rules:

- Keep raw imports here instead of linking to external folders.
- Use subfolders by domain, for example `Raw/on-benh/`.
- Raw files can be exposed to Starlight with an internal relative symlink from `src/content/docs/`.
- Curated long-term content should move into `src/content/docs/books/`, `cases/`, `updates/`, or `topics/`.
- Only `.md` and `.mdx` files exposed through `src/content/docs/` become pages.
- HTML exports, images, PDFs, and other artifacts can stay here as raw source material.
