# Template nội dung Quiz (Flashcard + MCQ)

File này là **mẫu nội dung**. Cách dùng:

1. Copy file này vào `Raw/<sách>/Quiz/<slug>.md` (vd `Raw/on_benh_dai_cuong/Quiz/nguoc-tat.md`).
2. Điền câu hỏi / đáp án theo cú pháp dưới (không cần đụng tới HTML).
3. Chạy `npm run quiz:build Raw/<sách>/Quiz/<slug>.md`
   (hoặc `npm run quiz:build` để build toàn bộ `Raw/**/Quiz/*.md`).
4. Sinh ra `public/quiz/<sách-slug>/<slug>.html`. Nhúng vào trang MDX:
   `<QuizEmbed src="quiz/<sách-slug>/<slug>.html" title="..." height="85vh" />`

Định dạng inline trong câu hỏi/đáp án: `**đậm**`, `*nghiêng*`, `` `code` ``.

---

## Cú pháp (copy phần dưới đây làm nội dung thật)

```markdown
---
title: Tên đầy đủ của bài (hiện ở tab trình duyệt)
h1: 🏥 Tiêu đề lớn (mặc định = title)
subtitle: Dòng phụ — môn học, nguồn KB...
---

# TOPICS
- Khái niệm & Lịch sử: #0ea5e9
- Cơ chế YHCT: #f59e0b
- Cơ chế YHHĐ: #3b82f6
- Chẩn đoán & Phân biệt: #8b5cf6
- Bài thuốc: #10b981

# FLASHCARDS

## [Khái niệm & Lịch sử]
Q: Câu hỏi mặt trước thẻ?
A: Đáp án mặt sau, có thể dùng **đậm** và *nghiêng*.

Q: Câu hỏi thẻ 2?
A: Đáp án thẻ 2.

## [Bài thuốc]
Q: Câu hỏi thuộc chủ đề khác?
A: Đáp án.

# MCQ

## [Khái niệm & Lịch sử] (Nhớ)
Stem: Câu hỏi không có tình huống?
A. Lựa chọn A
B. Lựa chọn B
C. Lựa chọn C
D. Lựa chọn D
Answer: B
Exp: Giải thích vì sao B đúng, các phương án khác sai.
Key: Câu chốt ghi nhớ (tùy chọn).

## [Chẩn đoán & Phân biệt] (Áp dụng)
Scenario: BN nam 30 tuổi đi rừng về, sốt thành cơn đúng giờ, lách to.
Stem: Xét nghiệm tiêu chuẩn vàng?
A. Cấy máu
B. Soi lam máu nhuộm Giemsa
C. Công thức máu
D. Siêu âm bụng
Answer: B
Exp: Giemsa giọt đặc + mỏng vừa tìm KST vừa định loài.
Key: Giemsa = tiêu chuẩn vàng.
```

---

## Quy tắc cho người soạn

- **TOPICS**: liệt kê chủ đề + mã màu hex. Nếu bỏ qua cả block `# TOPICS`, generator tự suy ra chủ đề từ dữ liệu (màu mặc định xanh).
- **Heading chủ đề** `## [Tên chủ đề]`; thêm Bloom cho MCQ: `## [Tên chủ đề] (Nhớ|Hiểu|Áp dụng|Phân tích|Đánh giá)`.
- **Flashcard**: từng cặp `Q:` / `A:` liên tiếp dưới cùng một heading chủ đề.
- **MCQ**: mỗi câu gồm `Stem:` bắt buộc, `Scenario:` tùy chọn (đặt TRƯỚC Stem), các phương án `A.` `B.` `C.` `D.`, `Answer:` (1 chữ cái), `Exp:`, `Key:` (tùy chọn). Nhiều câu cùng chủ đề/Bloom có thể đặt chung 1 heading hoặc tách riêng — cách nào cũng được.
- **ID tự đánh số** theo thứ tự xuất hiện — không cần ghi tay.
