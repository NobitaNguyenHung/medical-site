# WORKFLOW — Thêm nội dung & build

Quy trình chuẩn để đổ nội dung mới và đưa lên web. Đọc cái này mỗi khi thêm bài.

## 0. Nguyên tắc

- **Raw/** = kho thô (copy tay vào đây, được phép lộn xộn: `.md`, `.html`, ảnh).
- **src/content/docs/** = nội dung Starlight render. Chỉ `.md`/`.mdx` ở đây mới thành trang.
- **public/** = file tĩnh bê nguyên (quiz HTML, ảnh dùng đường dẫn tuyệt đối).
- Build chạy tự động trên GitHub Actions **mỗi khi push lên `main`**. Không cần build tay để deploy.
- Sidebar đi theo Diátaxis: **Học theo lộ trình**, **Xử trí lâm sàng**,
  **Tra cứu nhanh**, **Hiểu sâu**. Đường dẫn file hiện tại vẫn giữ ổn định.
- Khi nhận một chương/menu y khoa, dùng `TEMPLATE_CATALOG.md` để nhận dạng loại
  nội dung rồi chọn template trong `src/content/docs/templates/`.
- Workflow ingest có thể gọi lại bằng skill nguồn `codex-skills/medical-book-ingest/SKILL.md`.
- Tóm tắt chương dùng quy tắc **80/20**: rút 20% lõi giúp người học hiểu phần lớn chương,
  kèm sơ đồ/visual brief để biết nên vẽ Mermaid, SVG hay hình minh họa ở đâu.
- `Raw/` là nguồn lưu trữ. Không tự ghi đè Raw khi có rác OCR/PDF; chỉ dọn nhẹ ở bản
  render `nguyen-thuy/`, còn nội dung học thuật được sửa ở `tom-tat/`, `reference/`,
  `explanation/`.

> ⚠️ **File `.html` (quiz) KHÔNG bỏ vào `src/content/docs/`** — Starlight bỏ qua, không render.
> Quiz `.html` **luôn** đặt trong `public/quiz/<sách>/`, rồi nhúng bằng `<QuizEmbed>` (xem §5).
> Nếu đang ingest sách, có thể đặt quiz HTML tạm trong `Raw/<sách>/Quiz/` hoặc
> `Raw/<sách>/Quzi/`; script sẽ phát hiện, copy sang `public/quiz/<sách>/`, rồi nhúng
> vào trang `luong-gia/` phù hợp. Nếu không có HTML quiz, script sinh câu hỏi tự kiểm tạm.

## 1. Vòng đời 1 thay đổi (TL;DR)

```bash
# 1) copy file thô vào Raw/
cp bai-moi.md "Raw/on-benh/"

# 2) (tùy loại) tạo/đổ vào src/content/docs/... — xem mục 3,4,5

# 3) kiểm tra tại chỗ
npm run build && npm run preview      # mở http://localhost:4321

# 4) đưa lên web
git add -A
git commit -m "add: <mô tả>"
git push                               # ~1 phút sau site cập nhật
```

Lỗi build sẽ chặn ngay ở bước 3 (local) — sửa xong mới push.

## 2. Cấu trúc 1 cuốn sách

Mỗi sách nằm trong `src/content/docs/books/<slug-sách>/` với **4 mục**:

```
books/<sách>/
├── tom-tat/          # 1 · Lý thuyết tóm tắt     (.md/.mdx) — 20% cốt lõi
├── bai-giang/        # 2 · Bài giảng chuyên sâu   (.mdx)     — 50-60%, có flow/bảng/pearl
├── nguyen-thuy/      # 3 · Lý thuyết nguyên thủy  (.md/.mdx) — 100%, trích sách gốc
└── luong-gia/        # 4 · Câu hỏi lượng giá      (.mdx)     — nhúng quiz HTML
```

### Phân biệt 4 tầng nội dung

| Tầng | Folder | Độ sâu | Đặc điểm | Sidebar |
| :-- | :-- | :-- | :-- | :-- |
| Tóm tắt | `tom-tat/` | 20% | Bullet, key point, ghi nhớ nhanh | Tra cứu nhanh |
| **Bài giảng** | **`bai-giang/`** | **50-60%** | **Flow, bảng, pearl, lý luận BS** | **Hiểu sâu** |
| Nguyên thủy | `nguyen-thuy/` | 100% | Trích nguyên bản, tra cứu gốc | Hiểu sâu |
| Lượng giá | `luong-gia/` | — | Quiz HTML tương tác | Học theo lộ trình |

### Bài giảng chuyên sâu (`bai-giang/`)

Tầng nội dung giữa tom-tat và nguyen-thuy. Dành cho người đã đọc tóm tắt 20%
và muốn hiểu **tại sao** — không phải thuộc thêm.

**Đặc điểm:**
- Cấu trúc theo luồng tư duy lâm sàng (không theo thứ tự chương sách)
- Visual-first: Mermaid flowchart / SVG trước khi đọc text
- Bảng so sánh, phân loại, decision point
- `<ClinicalPearl>` — điều GS 30 năm sẽ nhấn mạnh
- `<RedFlags>` — bẫy chẩn đoán, sai lầm thường gặp
- 3 câu hỏi kích thích tư duy cuối bài (không phải MCQ)

**Template:** `src/content/docs/templates/shared/deep-lecture.mdx`

**Đặt tên file:** `<số>-<slug>.mdx` — ví dụ: `01-dai-cuong-on-benh.mdx`

**Tạo bài giảng mới:**
```bash
cp src/content/docs/templates/shared/deep-lecture.mdx \
   src/content/docs/books/<sách>/bai-giang/<số>-<slug>.mdx
# Xóa draft/pagefind/sidebar.hidden trong frontmatter
# Điền nội dung, build, push
```

Quiz HTML (build từ skill `html-y-khoa`) đặt riêng trong:
`public/quiz/<sách>/<tên>.html`

Khi mới copy nguyên sách, có thể để MCQ HTML trong:

```
Raw/<sách>/Quiz/*.html
Raw/<sách>/Quzi/*.html   # chấp nhận nếu gõ nhầm
```

Sau khi chạy materialize, file HTML phù hợp sẽ được copy sang `public/quiz/<sách>/`
và trang lượng giá sẽ nhúng bằng `<QuizEmbed>`.

Trong sidebar Diátaxis:

- `luong-gia/` hiện ở **Học theo lộ trình**.
- `tom-tat/` hiện ở **Tra cứu nhanh**.
- `bai-giang/` hiện ở **Hiểu sâu** (trước `nguyen-thuy`).
- `nguyen-thuy/` hiện ở **Hiểu sâu**.

> `tom-tat/` có thể là symlink sang `Raw/<sách>/`. Khi đó `Raw/` vẫn là kho thô,
> nhưng chỉ file `.md`/`.mdx` mới thành trang; `.html` thô trong `Raw/` không dùng
> cho quiz. Quiz HTML vẫn phải đặt ở `public/quiz/<sách>/`.

## 3. Thêm 1 SÁCH mới (vd `vi-sinh`)

### Cách tự động tạo skeleton từ Raw

Nếu đã copy sách/chương vào `Raw/<thu-muc-sach>/`, chạy:

```bash
npm run ingest:book -- Raw/<thu-muc-sach> <slug-sach> "Tên sách"
```

Lệnh trên chỉ scan và in plan. Khi plan hợp lý, tạo skeleton:

```bash
npm run ingest:book -- Raw/<thu-muc-sach> <slug-sach> "Tên sách" --write
```

Sau đó yêu cầu Codex: “đọc `Raw/<thu-muc-sach>/INGEST_PLAN.json` và xử lý từng chương”.
Không xử lý nguyên file 1 MB một lần.

Khi đã có plan và muốn sinh/cập nhật các view theo plan:

```bash
npm run materialize:ingest -- Raw/<thu-muc-sach>/INGEST_PLAN.json
```

Lệnh `materialize:ingest` cũng tự đồng bộ lại `src/content/docs/learning-paths/<slug-sach>.mdx`:

- `Chưa xử lý`: chưa có view nào.
- `Đang thiếu`: mới có một phần view.
- `Đã tạo khung`: đủ tóm tắt, nguyên thủy, tra cứu, hiểu sâu, lượng giá nhưng còn là bản tự sinh.
- `Đã biên tập`: có ít nhất một view đã được chỉnh tay hoặc đánh dấu `status: "ready"`.

Các file đã biên tập tay sẽ không bị ghi đè nếu không còn `generatedBy: "materialize-ingest"`.

### Cách thủ công

1. Tạo thư mục:
   ```bash
   mkdir -p src/content/docs/books/vi-sinh/{tom-tat,nguyen-thuy,luong-gia}
   ```
2. Đổ `.md` vào `tom-tat/` và `nguyen-thuy/` (nếu nội dung ở Raw, dùng symlink tương đối:
   `ln -s ../../../../../Raw/<thư-mục> src/content/docs/books/vi-sinh/tom-tat`).
   - Mỗi file 1 bài. Xếp thứ tự bằng frontmatter `sidebar.order`.
3. Quiz: tạo `public/quiz/vi-sinh/vi-sinh-quiz.html` (hoặc placeholder), rồi tạo
   `src/content/docs/books/vi-sinh/luong-gia/1-vi-sinh-quiz.mdx`:
   ```mdx
   ---
   title: "Câu hỏi lượng giá — Vi sinh"
   sidebar: { order: 1 }
   ---
   import QuizEmbed from '~/components/QuizEmbed.astro';
   <QuizEmbed src="quiz/vi-sinh/vi-sinh-quiz.html" title="Lượng giá Vi sinh" />
   ```
4. Khai báo menu — `astro.config.mjs`, thêm 3 thư mục sách vào đúng nhóm:
   - `books/vi-sinh/luong-gia` → **Học theo lộ trình**
   - `books/vi-sinh/tom-tat` → **Tra cứu nhanh**
   - `books/vi-sinh/nguyen-thuy` → **Hiểu sâu**
5. `npm run build` → push.

> `QuizEmbed` tự thêm base path → quiz chạy đúng cả local lẫn GitHub Pages.

## 4. Chọn template theo Diátaxis

Trước khi thêm bài, chọn theo nhu cầu người đọc:

1. Copy template tương ứng từ `src/content/docs/templates/`:
   | Nhu cầu | Template | Thường bỏ vào |
   | --- | --- | --- |
   | Lộ trình môn/chương | `shared/learning-path.mdx` | `learning-paths/` |
   | Học theo lộ trình | `tutorial.mdx` / `clinical-case.mdx` | `cases/` hoặc `books/<sách>/luong-gia/` |
   | Xử trí lâm sàng | `how-to-guide.mdx` / `treatment-update.mdx` | `updates/` |
   | Tra cứu nhanh | `reference-note.mdx` / `topic-index.mdx` | `topics/reference/` hoặc `books/<sách>/tom-tat/` |
   | Hiểu sâu | `explanation.mdx` / `book-chapter.mdx` | `topics/explanation/` hoặc `books/<sách>/nguyen-thuy/` |

   Nếu thư mục chưa có, tạo trước bằng `mkdir -p src/content/docs/{cases,updates,topics/reference,topics/explanation}`.
2. **Xóa** frontmatter `draft: true`, `pagefind: false`, `sidebar.hidden` để xuất bản.
3. Đổi `type`/`category`/`diataxis`/`title` cho đúng. Điền nội dung. Build → push.

Section tự sinh menu (`autogenerate`) — bỏ file vào là tự hiện, khỏi sửa config.

Nếu nguồn là một chương/menu phức tạp, làm thêm bước nhận dạng:

1. Đọc tiêu đề/mục lục.
2. Tra rule trong `TEMPLATE_CATALOG.md`.
3. Chọn template chuyên biệt:
   - YHHĐ → `src/content/docs/templates/modern/`
   - YHCT → `src/content/docs/templates/tcm/`
   - Dùng chung → `src/content/docs/templates/shared/`
4. Copy template ra thư mục đích, xóa `draft/pagefind/sidebar.hidden`, rồi điền nội dung.

Với một chương sách lớn, ưu tiên tạo nhiều view chuẩn hóa:

- `chapter-summary.mdx` → bản tóm tắt 80/20 + sơ đồ/visual brief.
- `quick-reference.mdx` → bản tra cứu.
- `deep-explanation.mdx` → bản hiểu sâu.
- `assessment-mcq.mdx` / `flashcard-set.mdx` / `case-question-set.mdx` → lượng giá;
  ưu tiên nhúng HTML quiz nếu có trong `Raw/<sách>/Quiz` hoặc `Raw/<sách>/Quzi`.

### Hình vẽ và sơ đồ trong tóm tắt

- Mermaid: dùng cho flowchart, phân loại, thuật toán nhanh.
- SVG: dùng khi cần hình chính xác, có thể chỉnh tay, ví dụ timeline, phân tầng,
  bản đồ khái niệm.
- Ảnh sinh bởi Codex: dùng cho minh họa bài giảng, giúp sinh động; ghi rõ là hình
  minh họa nếu không phải hình y khoa nguồn thật.
- Hình y khoa thật: chỉ dùng khi có quyền/nguồn rõ, ưu tiên đặt trong `public/assets/<sách>/`.

## 5. Thêm / cập nhật quiz HTML

Quiz là file `.html` tương tác (build từ skill `html-y-khoa`). **Đặt trong `public/`,
KHÔNG đặt trong `src/content/docs/`.**

Nếu đang xử lý cả sách bằng ingest, cách nhanh nhất là tạo thư mục `Quiz` trong Raw:

```bash
Raw/<sách>/Quiz/<ten-chuong-hoac-mcq>.html
```

Rồi chạy lại:

```bash
npm run ingest:book -- Raw/<sách> <slug-sách> "Tên sách" --write
npm run materialize:ingest -- Raw/<sách>/INGEST_PLAN.json
```

Script sẽ cố gắng match quiz theo số thứ tự/tên chương. Nếu không match được, nó không
nhúng bừa; trang lượng giá vẫn có câu hỏi tự kiểm để biên tập sau.

### 5a. Thêm quiz MỚI

```bash
# 1) chép file html vào public/quiz/<sách>/
cp OnBenh_ThuThap_LuyenTap.html public/quiz/on-benh/

# 2) tạo 1 trang .mdx trong luong-gia/ của sách đó:
#    src/content/docs/books/on-benh/luong-gia/8-thu-thap-luyen-tap.mdx

# 3) build + push
npm run build && git add -A && git commit -m "add quiz: ..." && git push
```

Ví dụ nội dung file `.mdx`:

```mdx
---
title: "Thử Thấp — Luyện Tập"
sidebar: { order: 8 }
---
import QuizEmbed from '~/components/QuizEmbed.astro';

<QuizEmbed src="quiz/on-benh/OnBenh_ThuThap_LuyenTap.html" title="Thử Thấp — Luyện Tập" />
```

`src` trong `<QuizEmbed>` là đường dẫn **trong `public/`** (bỏ chữ `public/`), không
có base — component tự thêm `/medical-site/`. Có thể nhúng nhiều `<QuizEmbed>` trong
1 trang `.mdx`, nhưng mặc định nên tách mỗi quiz thành 1 trang trong `luong-gia/`.

### 5b. Cập nhật quiz CŨ

Build lại bằng `html-y-khoa` → **ghi đè đúng tên file** trong `public/quiz/<sách>/`.
Không cần sửa `.mdx`. Build → push.

> Nếu lỡ bỏ `.html` vào `src/content/docs/...`: chuyển nó ra `public/quiz/<sách>/`,
> xóa thư mục lạc, rồi trỏ `<QuizEmbed>` tới vị trí mới.

## 6. Deploy

- Workflow: `.github/workflows/deploy.yml` (GitHub Actions, Node 22).
- Push `main` → tự build + deploy → https://nobitanguyenhung.github.io/medical-site/
- Xem trạng thái: `gh run list` / `gh run watch <id>`.

## 7. Xoá chương hoặc xoá sách

Luôn chạy thử trước, vì lệnh xoá có thể ảnh hưởng nhiều view sinh từ cùng một nguồn.

### 7a. Xoá một chương

Dry-run, chỉ xem danh sách sẽ xoá:

```bash
npm run content:delete -- chapter Raw/<sách>/INGEST_PLAN.json <order-hoặc-slug>
```

Xoá thật:

```bash
npm run content:delete -- chapter Raw/<sách>/INGEST_PLAN.json <order-hoặc-slug> --write
```

Mặc định chỉ xoá các view đã sinh trong `src/content/docs/...`: tóm tắt, nguyên thủy,
tra cứu, hiểu sâu, lượng giá. Nếu muốn xoá luôn file thô trong `Raw/`, thêm `--raw`:

```bash
npm run content:delete -- chapter Raw/<sách>/INGEST_PLAN.json 3 --raw --write
```

Sau khi xoá chương, chạy lại:

```bash
npm run materialize:ingest -- Raw/<sách>/INGEST_PLAN.json
npm run build
```

Nếu chỉ xoá view nhưng giữ item trong `INGEST_PLAN.json`, lần materialize sau có thể sinh lại chương đó. Muốn bỏ hẳn khỏi sách thì xoá/di chuyển raw file rồi chạy lại `ingest:book --write`.

### 7b. Xoá cả cuốn sách

Dry-run:

```bash
npm run content:delete -- book <slug-sách>
```

Xoá thật phần đã render:

```bash
npm run content:delete -- book <slug-sách> --write
```

Xoá cả Raw của sách nếu plan tìm được nguồn:

```bash
npm run content:delete -- book <slug-sách> --raw --write
```

Lệnh xoá sách gom các phần liên quan:

- `src/content/docs/books/<slug-sách>/`
- `src/content/docs/learning-paths/<slug-sách>.mdx`
- `src/content/docs/topics/reference/<slug-sách>-*.mdx`
- `src/content/docs/topics/explanation/<slug-sách>-*.mdx`
- `public/quiz/<slug-sách>/`
- Raw source nếu thêm `--raw`

Nếu `astro.config.mjs` có sidebar hard-code cho sách đó, xoá thêm các entry sidebar tương ứng rồi chạy `npm run build`.
