# Workflow Learning Setup

Tài liệu này ghi lại quy trình tạo một `LearningLayout` song song với Starlight.
Mục tiêu: sau này chỉ cần đưa source Markdown/MDX vào đúng cấu trúc, khai báo workflow data, rồi sinh được một trang học có sidebar, tab học, quiz, ca lâm sàng và zoom hình.

## Nguyên tắc kiến trúc

- Starlight giữ vai trò đọc tài liệu/reference chuẩn.
- Learning layer là route riêng, không redesign Starlight.
- Markdown/MDX vẫn là nguồn nội dung chính.
- Astro layout/component chỉ làm lớp trình bày và điều phối.
- Frontmatter/data file là hợp đồng giữa nội dung và template.
- Không copy nội dung vào layout nếu đã có trong `src/content/docs`.
- Tối thiểu JavaScript: chỉ dùng cho tab, collapse/expand và zoom hình.

## Stack hiện tại

- Astro 7
- `@astrojs/starlight` cho documentation reader
- `astro:content` để query và render Markdown/MDX
- `LearningLayout.astro` cho study workflow
- Vanilla JS nhỏ trong layout cho tương tác

## File đã tạo trong slice thử

- `src/pages/learn/[...slug].astro`
  - Route học riêng.
  - Query content collection.
  - Render nhiều MDX entry vào các slot của `LearningLayout`.

- `src/layouts/LearningLayout.astro`
  - Shell giao diện học.
  - Sidebar trái dạng course tree.
  - Topbar/search/profile placeholder.
  - Header bài học.
  - Tab học thật, không xếp dọc.
  - Right rail mục tiêu/khái niệm/liên kết.
  - Quiz iframe.
  - Ca lâm sàng mẫu.
  - Collapse/expand sidebar.
  - Zoom SVG/Mermaid.

- `src/data/learning-courses.ts`
  - Course navigation.
  - Tab labels.
  - Objectives.
  - Mapping nhiều workflow bài học: summary, deep lecture, source, reasoning, quiz, case.

## Mô hình URL

Starlight documentation:

```txt
/medical-site/books/on-benh-dai-cuong/tom-tat/06-bai-3-bien-chung-ve-on-benh/
```

Learning layer:

```txt
/medical-site/learn/books/on-benh-dai-cuong/tom-tat/06-bai-3-bien-chung-ve-on-benh/
```

Cùng một source nội dung có thể được đọc theo hai trải nghiệm:

- Starlight: đọc tài liệu dài, tra cứu, reference.
- LearningLayout: học theo workflow có tabs, progress, quiz, case.

## Workflow data mẫu

Khai báo trong `src/data/learning-courses.ts`:

```ts
export const lessonOneWorkflow = {
  id: 'on-benh-dai-cuong-bai-1',
  summary: 'books/on-benh-dai-cuong/tom-tat/01-bai-1-dai-cuong-ve-on-benh',
  deepLecture: 'books/on-benh-dai-cuong/bai-giang/01-dai-cuong-on-benh',
  source: 'books/on-benh-dai-cuong/nguyen-thuy/01-bai-1-dai-cuong-ve-on-benh',
  reasoning: 'topics/explanation/on-benh-dai-cuong-bai-1-dai-cuong-ve-on-benh',
  quiz: {
    src: 'quiz/on-benh-dai-cuong/dai-cuong.html',
    title: 'Lượng giá Đại cương Ôn bệnh',
  },
  caseStudy: {
    title: 'Ca nhận diện phạm vi Ôn bệnh',
    stem: '...',
    tasks: ['...'],
    keyPoints: ['...'],
  },
  objectives: ['...'],
};

export const learningWorkflows = [lessonOneWorkflow, lessonThreeWorkflow];
```

## Route render workflow

Route hiện tại: `src/pages/learn/[...slug].astro`

Quy trình:

1. Import `getCollection` và `render` từ `astro:content`.
2. Import `learningWorkflows`.
3. Trong `getStaticPaths()`, lặp qua `learningWorkflows`, tìm entry chính bằng `workflow.summary`.
4. Trong page body, query lại các entry liên quan:
   - `summary`
   - `deepLecture`
   - `source`
   - `reasoning`
5. Render từng entry:

```ts
const { Content: SummaryContent } = await render(summaryEntry);
const { Content: DeepContent } = deepEntry ? await render(deepEntry) : { Content: undefined };
const { Content: SourceContent } = sourceEntry ? await render(sourceEntry) : { Content: undefined };
const { Content: ReasoningContent } = reasoningEntry ? await render(reasoningEntry) : { Content: undefined };
```

6. Truyền vào layout:

```astro
<LearningLayout ... workflow={workflow}>
  <SummaryContent />
  {DeepContent && <DeepContent slot="deep" />}
  {SourceContent && <SourceContent slot="source" />}
  {ReasoningContent && <ReasoningContent slot="reasoning" />}
</LearningLayout>
```

## Tab workflow

Các tab hiện tại:

- `overview`
- `eightyTwenty`
- `deep`
- `source`
- `reasoning`
- `quiz`
- `case`

Lưu ý:

- Mỗi tab link có `data-tab-target`.
- Mỗi panel có `data-tab-panel`.
- Chỉ panel active được hiện.
- Không dùng anchor-only vì sẽ làm các phần xếp dọc xuống.
- JS dùng `hidden` để đóng/mở panel.

## Sidebar course tree

Thiết kế hiện tại:

- Top nav nhỏ:
  - Tổng quan
  - Học của tôi
  - Đọc tài liệu
  - Lượng giá
- Nhóm `MÔN HỌC`
- Course pill: `Ôn bệnh đại cương`
- Tree bài học có indent, line dọc, dot active.
- Collapse/expand dùng `data-collapse-target`.

Lưu ý lỗi đã gặp:

- Không tìm panel bằng `nextElementSibling` mơ hồ.
- Nên dùng target ID rõ ràng:

```html
<button data-collapse-toggle data-collapse-target="course-lessons">...</button>
<div id="course-lessons" data-collapse-panel>...</div>
```

## Zoom SVG/Mermaid

Yêu cầu:

- SVG/Mermaid ban đầu trong tab có thể rất nhỏ.
- User bấm vào hình để mở modal zoom lớn.

Cách làm:

- Dùng event delegation trên `.markdown-content`.
- Không wrap SVG tại load time vì Mermaid có thể render sau.
- Bỏ qua SVG icon của Starlight heading anchor:

```js
if (svg.closest('.sl-anchor-link')) return null;
```

Flow:

1. User click trong `.markdown-content`.
2. Tìm SVG gần nhất hoặc `.mermaid`.
3. Clone node.
4. Đưa clone vào `.zoom-stage`.
5. Hiện `.zoom-modal`.
6. Đóng bằng nút `×`, click nền hoặc `Esc`.

## Những lỗi đã gặp và cách tránh

### 1. Tab xếp dọc

Nguyên nhân:

- Dùng anchor `href="#deep"` mà không ẩn panel.

Cách sửa:

- Dùng `data-tab-panel`.
- Panel không active phải có `hidden`.

### 2. Collapse không hoạt động

Nguyên nhân:

- Script tìm panel bằng DOM vị trí tương đối, nhưng layout thay đổi.

Cách sửa:

- Mỗi nút có `data-collapse-target`.
- Panel có `id` tương ứng.

### 3. Zoom SVG không hoạt động

Nguyên nhân có thể:

- Mermaid render SVG sau khi script chạy.
- Script bắt nhầm SVG icon anchor nhỏ.

Cách sửa:

- Event delegation thay vì wrap SVG tại load time.
- Exclude `.sl-anchor-link`.

### 4. Dev server background

Theo `AGENTS.md` nên dùng:

```bash
astro dev --background
```

Nhưng trong shell hiện tại, `astro` không có trong PATH. Gọi local binary từng báo:

```txt
Dev server process exited before becoming ready.
```

Do đó bước xác nhận tối thiểu hiện tại là:

```bash
npm run build
```

Build pass nghĩa là route tĩnh đã sinh đúng. Khi debug UX thật, nên chạy dev server trong môi trường có Astro background hoạt động hoặc dùng preview/browser riêng.

## Checklist tạo Learning slice mới

1. Chọn bài chính.
2. Xác định các entry:
   - summary
   - deep lecture
   - source original
   - reasoning/deep explanation
   - quiz html
   - case study
3. Thêm workflow data vào `src/data/learning-courses.ts`.
4. Cho route `/learn/[...slug].astro` đọc workflow đó.
5. Render các content entry vào slot tương ứng.
6. Kiểm tra tab không xếp dọc.
7. Kiểm tra collapse/expand sidebar.
8. Kiểm tra Mermaid/SVG có thể zoom.
9. Kiểm tra iframe quiz đúng base path.
10. Chạy:

```bash
npm run build
```

## Hướng nâng cấp tiếp theo

- Tách `LearningLayout.astro` thành component nhỏ:
  - `LearningSidebar.astro`
  - `LearningTabs.astro`
  - `LearningHeader.astro`
  - `LearningRightRail.astro`
  - `SvgZoomModal.astro`
- Biến `lessonThreeWorkflow` thành registry nhiều bài.
- Tạo schema frontmatter chuẩn cho learning metadata.
- Sinh navigation từ content collection thay vì hard-code.
- Đưa case study thành MDX/data riêng.
- Chuẩn hóa quiz thành data/component thay vì iframe HTML tĩnh khi có thời gian.
