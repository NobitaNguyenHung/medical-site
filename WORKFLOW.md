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
- `<CompareTable>` — bảng phân biệt (xem cú pháp bên dưới)
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

## 3. MDX Components — cú pháp chuẩn

Import ở đầu file (chỉ import cái dùng):

```mdx
import CompareTable from '~/components/CompareTable.astro';
import KeyPoints from '~/components/KeyPoints.astro';
import ClinicalPearl from '~/components/ClinicalPearl.astro';
import RedFlags from '~/components/RedFlags.astro';
import MedicalNote from '~/components/MedicalNote.astro';
import SelfCheck from '~/components/SelfCheck.astro';
import SourceNote from '~/components/SourceNote.astro';
```

### CompareTable — 2 cách dùng hợp lệ

**Cách 1 — props (plain text, khuyến nghị cho bảng thuần text):**

```mdx
<CompareTable
  title="Tên bảng tùy chọn"
  headers={["", "Cột A", "Cột B"]}
  rows={[
    ["Hàng 1", "dữ liệu A", "dữ liệu B"],
    ["Hàng 2", "dữ liệu A", "dữ liệu B"],
  ]}
/>
```

> Cột đầu tiên (`i === 0`) tự động render `<th scope="row">` — dùng làm nhãn hàng.

**Cách 2 — slot (khi cần markdown / bold / link trong ô):**

```mdx
<CompareTable title="Tên bảng">

| Tiêu chí | A | B |
|---|---|---|
| **Chỉ định** | Ho khan | Ho đờm |

</CompareTable>
```

> ⚠ Không được trộn 2 cách: nếu có `headers` prop, slot bị bỏ qua.

### KeyPoints

```mdx
<KeyPoints title="5 ý lõi">

- **Điểm 1:** nội dung
- **Điểm 2:** nội dung

</KeyPoints>
```

### ClinicalPearl / RedFlags / MedicalNote

Đều dùng slot — không có props ngoài `title`:

```mdx
<ClinicalPearl>Nội dung pearl lâm sàng.</ClinicalPearl>

<RedFlags title="Cảnh báo">
1. Tình huống nguy hiểm A
2. Tình huống nguy hiểm B
</RedFlags>

<MedicalNote>Ghi chú bổ sung.</MedicalNote>
```

---

## 4. Trang chủ Dashboard

> **Quy tắc vàng: không viết lại component — chỉ thêm data.**
> Mọi thay đổi hiển thị (sách mới, tool mới, stats mới) chỉ cần sửa file `src/data/`.

### Kiến trúc

```
src/pages/index.astro          ← page root, bypass Starlight hoàn toàn
src/data/
  books.ts                     ← config card sách (MÔN HỌC)
  home-config.ts               ← config nav, tool cards, stats bar, user profile
src/components/home/
  BookCard.astro               ← component card sách (SVG bg + progress + stats)
  ToolCard.astro               ← tool card, prop variant="wide"|"small"
  StatsBar.astro               ← thanh stats dưới cùng với pagoda SVG
```

`src/pages/index.astro` tự override `src/content/docs/index.mdx` — Astro ưu tiên `pages/` trên collection. Không cần xóa file MDX.

---

### Thêm sách mới → chỉ sửa `src/data/books.ts`

Thêm 1 object vào mảng `books`:

```ts
{
  num: '03',
  system: 'YHHĐ',
  icon: 'ti-heart-rate-monitor',    // Tabler icon name
  color: {
    bg: '#E6F1FB',                  // nền icon (pastel)
    accent: '#378ADD',              // màu progress bar + arrow hover
    text: '#185FA5',                // màu icon
  },
  name: 'Tim mạch học',
  desc: 'Điện tim · suy tim · van tim · rối loạn nhịp',
  progress: 0,                      // 0–100, hiển thị progress bar
  stats: [                          // tối đa 3, hiển thị dưới card
    { value: 0, label: 'Bài giảng' },
  ],
  illustration: 'anatomy',          // 'bamboo' | 'brain' | 'anatomy' | 'herb' | 'none'
  href: `/medical-site/books/tim-mach/`,
  status: 'planned',                // 'ready' | 'building' | 'planned'
},
```

Grid dùng `auto-fit` — thêm bao nhiêu sách cũng tự scale, 0 CSS cần sửa.

#### Màu sắc gợi ý theo môn

| Môn | bg | accent | text |
|---|---|---|---|
| YHCT | `#E1F5EE` | `#1D9E75` | `#0F6E56` |
| Nội khoa | `#EEEDFE` | `#7F77DD` | `#534AB7` |
| Tim mạch | `#E6F1FB` | `#378ADD` | `#185FA5` |
| Nhi khoa | `#FAEEDA` | `#BA7517` | `#854F0B` |
| Ngoại khoa | `#FAECE7` | `#D85A30` | `#712B13` |
| Vi sinh | `#EAF3DE` | `#639922` | `#3B6D11` |

---

### Thêm tool card mới → chỉ sửa `src/data/home-config.ts`

Thêm vào mảng `utilitiesSmall`:

```ts
{
  icon: 'ti-brain',
  iconBg: '#EEEDFE',
  iconColor: '#534AB7',
  name: 'Tên công cụ',
  desc: 'Mô tả ngắn',
  stat: 'X đang học',
  progress: 0,              // 0–100
  progressColor: '#7F77DD',
  href: `/medical-site/...`,
},
```

Wide card (lộ trình) sửa object `utilityWide` trong cùng file.

---

### Đổi stats bar → sửa `siteStats` trong `home-config.ts`

```ts
export const siteStats: SiteStat[] = [
  { icon: 'ti-books', value: '3', label: 'Môn học' },
  // ...
];
```

---

### Đổi tên / lời chào → sửa `userProfile` trong `home-config.ts`

```ts
export const userProfile = {
  name: 'Hưng',
  greeting: 'Chào mừng trở lại',
  subtext: 'Hành trình học tập hôm nay của bạn như thế nào?',
  avatarInitial: 'H',
};
```

---

## 5. Thêm 1 SÁCH mới (vd `vi-sinh`)

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
4. Tạo thư mục `bai-giang/` (tầng bài giảng chuyên sâu):
   ```bash
   mkdir -p src/content/docs/books/vi-sinh/bai-giang
   touch src/content/docs/books/vi-sinh/bai-giang/_README.md
   ```
   Sau đó tạo từng file bài giảng từ template `templates/shared/deep-lecture.mdx`.

5. Khai báo menu — `astro.config.mjs`:

   **Học theo lộ trình** — thêm group theo tên sách. Bên trong sách có lộ trình
   và lượng giá:
   ```js
   {
     label: 'Vi sinh',
     items: [
       { label: 'Lộ trình học', link: 'learning-paths/vi-sinh/' },
       { label: 'Lượng giá', items: [{ autogenerate: { directory: 'books/vi-sinh/luong-gia' } }] },
     ],
   },
   ```

   > **Quy tắc lượng giá:** Nếu `Raw/<sách>/Quiz/` hoặc `Raw/<sách>/Quzi/`
   > có file HTML, `materialize:ingest` tạo wrapper từ chính các HTML đó và
   > không sinh trang lượng giá tự động theo từng chương. Chỉ khi không có HTML
   > quiz mới sinh câu hỏi tự kiểm tạm.

   **Tra cứu nhanh** — thêm group theo tên sách. Bên trong sách, nhóm `tom-tat/`
   theo chương thay vì xổ phẳng toàn bộ bài:
   ```js
   {
     label: 'Vi sinh',
     items: [
       {
         label: 'Tóm tắt theo chương',
         items: [
           {
             label: 'Chương 1. Đại cương',
             items: [
               { label: 'Đại cương vi sinh', link: 'books/vi-sinh/tom-tat/01-dai-cuong/' },
               { label: 'Phân loại vi sinh', link: 'books/vi-sinh/tom-tat/02-phan-loai/' },
             ],
           },
         ],
       },
       { label: 'Bảng tra cứu', items: [{ autogenerate: { directory: 'topics/reference/vi-sinh' } }] },
     ],
   },
   ```

   > **Quy tắc sidebar Tra cứu nhanh:** Luôn nhóm theo sách trước, rồi nhóm
   > `Tóm tắt theo chương`. Không đặt tất cả file `tom-tat/` phẳng dưới một group.
   > Title trang tóm tắt không thêm tiền tố “Tóm tắt 80/20” hoặc “Tóm tắt ·”.

   **Hiểu sâu** — thêm group cha theo tên sách. `bai-giang/` có thể autogenerate
   khi còn ít bài, nhưng `nguyen-thuy/` và `topics/explanation/` nên nhóm theo
   chương/bài như `tom-tat/` để dễ đọc và dễ quản lý:
   ```js
   {
     label: 'Vi sinh',          // ← group cha = tên sách
     items: [
       { label: 'Bài giảng chuyên sâu', items: [{ autogenerate: { directory: 'books/vi-sinh/bai-giang' } }] },
       {
         label: 'Nguyên thủy theo chương',
         items: [
           {
             label: 'Chương 1. Đại cương',
             items: [
               { label: 'Nguyên văn chương 1', link: 'books/vi-sinh/nguyen-thuy/01-dai-cuong/' },
               { label: 'Phân loại vi sinh', link: 'books/vi-sinh/nguyen-thuy/02-phan-loai/' },
             ],
           },
         ],
       },
       {
         label: 'Giải thích cơ chế theo chương',
         items: [
           {
             label: 'Chương 1. Đại cương',
             items: [
               { label: 'Cơ chế nền', link: 'topics/explanation/vi-sinh/01-dai-cuong/' },
               { label: 'Cơ chế phân loại', link: 'topics/explanation/vi-sinh/02-phan-loai/' },
             ],
           },
         ],
       },
     ],
   },
   ```

   > **Quy tắc sidebar Hiểu sâu:** Luôn nhóm theo sách (group cha = tên sách).
   > Không đặt `bai-giang/` và `nguyen-thuy/` ngang hàng với các sách khác. Với
   > `nguyen-thuy/` và `topics/explanation/`, không autogenerate phẳng khi có nhiều
   > file; giữ URL ổn định và chỉ chỉnh cách nhóm sidebar. Mẫu hiện tại: xem block
   > `Ôn bệnh đại cương` trong `astro.config.mjs`.

6. `npm run build` → push.

> `QuizEmbed` tự thêm base path → quiz chạy đúng cả local lẫn GitHub Pages.

## 6. Chọn template theo Diátaxis

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
- `deep-explanation.mdx` → bản đồ cơ chế + workflow + cầu nối lâm sàng.
- `assessment-mcq.mdx` / `flashcard-set.mdx` / `case-question-set.mdx` → lượng giá;
  ưu tiên nhúng HTML quiz nếu có trong `Raw/<sách>/Quiz` hoặc `Raw/<sách>/Quzi`.

### Giải thích cơ chế (`deep-explanation`)

Mục này không được là bảng liệt kê heading. Nó là nơi cô đọng phần khó bằng sơ đồ
và chuỗi nhân quả, đặc biệt quan trọng cho bệnh học.

Một trang cơ chế đạt yêu cầu cần có:

- **Câu hỏi cơ chế:** vì sao bệnh/chứng xảy ra, đi theo chuỗi nào?
- **Bản đồ cơ chế 1 trang:** 4-6 nút chính, mỗi nút nối được bằng quan hệ nhân quả.
- **Workflow Mermaid:** nguyên nhân → cơ chế trung gian → dấu hiệu → điểm rẽ → xử trí.
- **Cầu nối sách vở → lâm sàng:** cơ chế nào tạo dấu hiệu nào và đổi quyết định gì.
- **Worked example:** một tình huống ngắn để người học thấy cách suy từ dấu hiệu về cơ chế.

Nếu chưa đủ dữ kiện để viết chi tiết, vẫn phải sinh khung theo hướng mechanism map,
không để các câu như “Cần giải thích cơ chế / lý luận”.

### Hình vẽ và sơ đồ trong tóm tắt

- Mermaid: dùng cho flowchart, phân loại, thuật toán nhanh.
- SVG: dùng khi cần hình chính xác, có thể chỉnh tay, ví dụ timeline, phân tầng,
  bản đồ khái niệm.
- Ảnh sinh bởi Codex: dùng cho minh họa bài giảng, giúp sinh động; ghi rõ là hình
  minh họa nếu không phải hình y khoa nguồn thật.
- Hình y khoa thật: chỉ dùng khi có quyền/nguồn rõ, ưu tiên đặt trong `public/assets/<sách>/`.

## 7. Thêm / cập nhật quiz HTML

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

### 6a. Thêm quiz MỚI

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

### 6b. Cập nhật quiz CŨ

Build lại bằng `html-y-khoa` → **ghi đè đúng tên file** trong `public/quiz/<sách>/`.
Không cần sửa `.mdx`. Build → push.

> Nếu lỡ bỏ `.html` vào `src/content/docs/...`: chuyển nó ra `public/quiz/<sách>/`,
> xóa thư mục lạc, rồi trỏ `<QuizEmbed>` tới vị trí mới.

### 6c. Quiz từ MARKDOWN (khuyến nghị) — `npm run quiz:build`

Thay vì viết tay HTML, soạn nội dung bằng **markdown** rồi để dự án tự sinh HTML từ
**một template chung**. Không lặp lại HTML cho mỗi câu hỏi.

**Thành phần:**

| File | Vai trò |
|---|---|
| `scripts/quiz-template.html` | Engine dùng chung (CSS + JS, tab Flashcard + MCQ). KHÔNG sửa khi thêm câu. |
| `scripts/build-quiz.mjs` | Generator: markdown → JSON → chèn vào template → ghi HTML. |
| `scripts/quiz-content.template.md` | Mẫu nội dung + cú pháp. Copy file này để soạn. |

**Cách dùng:**

1. Copy `scripts/quiz-content.template.md` → `Raw/<sách>/Quiz/<slug>.md`
   (vd `Raw/on_benh_dai_cuong/Quiz/nguoc-tat.md`).
2. Điền câu hỏi / đáp án theo cú pháp (không đụng HTML). Inline: `**đậm**`, `*nghiêng*`, `` `code` ``.
3. Build:

```bash
npm run quiz:build Raw/<sách>/Quiz/<slug>.md   # 1 file
npm run quiz:build                              # toàn bộ Raw/**/Quiz/*.md
```

4. Ra `public/quiz/<sách-slug>/<slug>.html` (slug hóa tên thư mục sách:
   `on_benh_dai_cuong` → `on-benh-dai-cuong`). Nhúng như §6a:

```mdx
<QuizEmbed src="quiz/<sách-slug>/<slug>.html" title="..." height="85vh" />
```

**Cú pháp markdown (tóm tắt):**

```markdown
---
title: ...
subtitle: ...
---
# TOPICS
- Chủ đề: #hex        # tùy chọn; bỏ qua thì tự suy ra từ dữ liệu
# FLASHCARDS
## [Chủ đề]
Q: câu hỏi?
A: đáp án
# MCQ
## [Chủ đề] (Nhớ)
Scenario: ...          # tùy chọn, đặt TRƯỚC Stem
Stem: câu hỏi?
A. ...
B. ...
Answer: B
Exp: giải thích
Key: chốt              # tùy chọn
```

- ID tự đánh số theo thứ tự — không ghi tay.
- Sửa câu hỏi: sửa `.md` → chạy lại `quiz:build` (ghi đè HTML) → không đụng `.mdx`.
- §6a/§6b vẫn dùng cho quiz HTML có sẵn (build từ `html-y-khoa`); §6c dành cho quiz soạn mới từ markdown.

## 8. Deploy

- Workflow: `.github/workflows/deploy.yml` (GitHub Actions, Node 22).
- Push `main` → tự build + deploy → https://nobitanguyenhung.github.io/medical-site/
- Xem trạng thái: `gh run list` / `gh run watch <id>`.

## 9. Xoá chương hoặc xoá sách

Luôn chạy thử trước, vì lệnh xoá có thể ảnh hưởng nhiều view sinh từ cùng một nguồn.

### 8a. Xoá một chương

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

### 8b. Xoá cả cuốn sách

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
- `src/content/docs/topics/reference/<slug-sách>/`
- `src/content/docs/topics/explanation/<slug-sách>/`
- `src/content/docs/topics/reference/<slug-sách>-*.mdx` nếu còn dữ liệu cũ
- `src/content/docs/topics/explanation/<slug-sách>-*.mdx` nếu còn dữ liệu cũ
- `public/quiz/<slug-sách>/`
- Raw source nếu thêm `--raw`

Nếu `astro.config.mjs` có sidebar hard-code cho sách đó, xoá thêm các entry sidebar tương ứng rồi chạy `npm run build`.
