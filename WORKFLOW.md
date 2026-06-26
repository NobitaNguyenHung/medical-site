# WORKFLOW — Thêm nội dung & build

Quy trình chuẩn để đổ nội dung mới và đưa lên web. Đọc cái này mỗi khi thêm bài.

## 0. Nguyên tắc

- **Raw/** = kho thô (copy tay vào đây, được phép lộn xộn: `.md`, `.html`, ảnh).
- **src/content/docs/** = nội dung Starlight render. Chỉ `.md`/`.mdx` ở đây mới thành trang.
- **public/** = file tĩnh bê nguyên (quiz HTML, ảnh dùng đường dẫn tuyệt đối).
- Build chạy tự động trên GitHub Actions **mỗi khi push lên `main`**. Không cần build tay để deploy.

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

Mỗi sách nằm trong `src/content/docs/books/<slug-sách>/` với **3 mục**:

```
books/<sách>/
├── tom-tat/          # 1 · Lý thuyết tóm tắt   (.md/.mdx)
├── nguyen-thuy/      # 2 · Lý thuyết nguyên thủy (.md/.mdx, trích sách gốc)
└── luong-gia.mdx     # 3 · Câu hỏi lượng giá   (nhúng quiz HTML)
```

Quiz HTML (build từ skill `html-y-khoa`) đặt riêng trong:
`public/quiz/<sách>/<tên>.html`

## 3. Thêm 1 SÁCH mới (vd `vi-sinh`)

1. Tạo thư mục:
   ```bash
   mkdir -p src/content/docs/books/vi-sinh/{tom-tat,nguyen-thuy}
   ```
2. Đổ `.md` vào `tom-tat/` và `nguyen-thuy/` (nếu nội dung ở Raw, dùng symlink tương đối:
   `ln -s ../../../../../Raw/<thư-mục> src/content/docs/books/vi-sinh/tom-tat`).
   - Mỗi file 1 bài. Xếp thứ tự bằng frontmatter `sidebar.order`.
3. Quiz: tạo `public/quiz/vi-sinh/vi-sinh-quiz.html` (hoặc placeholder), rồi tạo
   `src/content/docs/books/vi-sinh/luong-gia.mdx`:
   ```mdx
   ---
   title: "Câu hỏi lượng giá — Vi sinh"
   sidebar: { order: 3 }
   ---
   import QuizEmbed from '~/components/QuizEmbed.astro';
   <QuizEmbed src="quiz/vi-sinh/vi-sinh-quiz.html" title="Lượng giá Vi sinh" />
   ```
4. Khai báo menu — `astro.config.mjs`, trong group `Sách`, **copy block "MẪU 1 SÁCH"**
   và đổi `on-benh` → `vi-sinh`, đổi nhãn.
5. `npm run build` → push.

> `QuizEmbed` tự thêm base path → quiz chạy đúng cả local lẫn GitHub Pages.

## 4. Thêm Case / Update / Topic

Đã có sẵn section + template. Chỉ cần:

1. Copy template tương ứng từ `src/content/docs/templates/`:
   | Loại | Template | Bỏ vào |
   | --- | --- | --- |
   | Ca lâm sàng | `clinical-case.mdx` | `cases/` |
   | Cập nhật điều trị | `treatment-update.mdx` | `updates/` |
   | Chủ đề tổng hợp | `topic-index.mdx` | `topics/` |
   | Chương sách | `book-chapter.mdx` | `books/<sách>/tom-tat/` |
2. **Xóa** frontmatter `draft: true`, `pagefind: false`, `sidebar.hidden` để xuất bản.
3. Đổi `type`/`category`/`title` cho đúng. Điền nội dung. Build → push.

Section tự sinh menu (`autogenerate`) — bỏ file vào là tự hiện, khỏi sửa config.

## 5. Cập nhật quiz đã có

Build quiz mới bằng skill `html-y-khoa` → ghi đè đúng file trong `public/quiz/<sách>/`.
Không cần sửa `.mdx`. Build → push.

## 6. Deploy

- Workflow: `.github/workflows/deploy.yml` (GitHub Actions, Node 22).
- Push `main` → tự build + deploy → https://nobitanguyenhung.github.io/medical-site/
- Xem trạng thái: `gh run list` / `gh run watch <id>`.
