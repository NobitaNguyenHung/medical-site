# TEMPLATE_CATALOG — Medical Knowledge Templates

Catalog này dùng khi người dùng đưa **một chương sách**, **một mục lục**, hoặc
**một file thô** và muốn Codex nhận dạng loại nội dung rồi áp template phù hợp.

## 1. Cách Codex chọn template

Luôn phân loại theo 4 tầng:

1. **Nhu cầu đọc Diátaxis**
   - `tutorial`: học từng bước, case dẫn đường, bài nhập môn.
   - `how-to`: làm một việc cụ thể, xử trí, chẩn đoán, điều trị, thủ thuật.
   - `reference`: tra cứu nhanh, bảng, tiêu chuẩn, liều, hình ảnh, danh mục.
   - `explanation`: hiểu sâu, cơ chế, lý luận, sinh lý bệnh, chú giải cổ văn.
2. **Hệ y học**
   - `modern`: Y học hiện đại.
   - `tcm`: Y học cổ truyền.
   - `integrative`: tích hợp YHHĐ + YHCT.
   - `shared`: dùng chung.
3. **Loại chuyên môn**
   - Bệnh, triệu chứng, chẩn đoán, điều trị, thuốc, vi sinh, hình ảnh, case,
     huyệt, vị thuốc, phương tễ, chứng trạng, kinh lạc...
4. **Vị trí trong site**
   - `cases/` → học theo lộ trình / ca lâm sàng.
   - `updates/` → how-to / xử trí / guideline / thuật toán.
   - `topics/reference/` → tra cứu nhanh.
   - `topics/explanation/` → hiểu sâu.
   - `books/<sách>/tom-tat/` → tóm tắt / reference theo sách.
   - `books/<sách>/nguyen-thuy/` → nguyên thủy / explanation.
   - `books/<sách>/luong-gia/` → lượng giá / quiz wrapper.

## 2. Rule nhận dạng nhanh

| Dấu hiệu trong chương/menu | Template ưu tiên |
| --- | --- |
| Mục lục môn học, kế hoạch chương, học bao lâu, thứ tự học | `learning-path` |
| Tóm tắt chương, ý chính, bản đồ chương, học nhanh 80/20 | `chapter-summary` |
| Tra cứu nhanh, bảng nhớ, tiêu chuẩn, link nhanh | `quick-reference` |
| Hiểu sâu, cơ chế, lý luận, chú giải | `deep-explanation` |
| MCQ, câu hỏi trắc nghiệm, lượng giá | `assessment-mcq` |
| Flashcard, ôn lặp lại | `flashcard-set` |
| Case ngắn, câu hỏi tình huống | `case-question-set` |
| Đại cương, dịch tễ, yếu tố nguy cơ, lâm sàng, chẩn đoán, điều trị | `modern-disease-topic` |
| Tiếp cận sốt/ho/đau ngực/khó thở/đau bụng/phù... | `symptom-approach` |
| Tiêu chuẩn chẩn đoán, test, xét nghiệm, độ nhạy/độ đặc hiệu | `diagnosis-workup` |
| Chẩn đoán phân biệt, phân biệt với, mimics | `differential-diagnosis` |
| Phác đồ điều trị, xử trí, theo dõi, chuyển tuyến | `treatment-guide` |
| Cấp cứu, shock, ABCDE, xử trí ban đầu | `emergency-algorithm` |
| Thuốc, dược lực, dược động, chỉ định, ADR | `drug-monograph` |
| Kháng sinh, nhiễm trùng, vi khuẩn thường gặp, stewardship | `antibiotic-guide` |
| Vi khuẩn/virus/ký sinh trùng/nấm, độc lực, đường lây | `microbiology-pathogen` |
| Đại thể, vi thể, marker, mô bệnh học | `pathology-note` |
| X-quang, CT, MRI, siêu âm, nội soi, hình ảnh | `imaging-interpretation` hoặc `image-atlas` |
| Xét nghiệm, chỉ số, diễn giải tăng/giảm | `lab-interpretation` |
| Ca bệnh, bệnh án, timeline, diễn biến | `clinical-case-care` hoặc `tcm-case` |
| PICO, systematic review, guideline, chứng cứ | `evidence-review` |
| Thủ thuật, kỹ năng, checklist thao tác | `procedure-skill` |
| Âm dương, ngũ hành, tạng tượng, khí huyết tân dịch | `tcm-theory` |
| Nội Kinh, Thương Hàn, Kim Quỹ, Ôn bệnh điều biện, nguyên văn/chú giải | `tcm-classic-chapter` |
| Biện chứng, chứng, lưỡi mạch, pháp trị | `tcm-pattern` |
| Bệnh danh YHCT, phân thể, bệnh cơ | `tcm-disease-name` |
| Triệu chứng theo hàn/nhiệt, hư/thực, biểu/lý | `tcm-symptom-approach` |
| Phân biệt chứng trạng gần giống | `tcm-differential-pattern` |
| Tính vị quy kinh, công năng chủ trị, liều, kiêng kỵ | `tcm-herb-monograph` |
| Quân thần tá sứ, phương nghĩa, gia giảm | `tcm-formula` |
| Huyệt, vị trí, châm cứu, phối huyệt | `tcm-acupoint` |
| Kinh lạc, tuần hành, bệnh hậu kinh | `tcm-meridian` |
| Châm, cứu, xoa bóp, giác hơi, dưỡng sinh | `tcm-method` |
| Một bệnh YHHĐ nhìn từ YHCT | `tcm-integrative-topic` |
| An toàn thảo dược, độc tính, tương tác thuốc | `tcm-safety-evidence` |
| Quiz HTML | `quiz-wrapper` |
| Raw có `Quiz/` hoặc `Quzi/` chứa HTML MCQ | `assessment-mcq` nhúng `QuizEmbed` |

## 3. Template hiện có

### Diátaxis core

| Template | File | Dùng cho |
| --- | --- | --- |
| `tutorial` | `src/content/docs/templates/tutorial.mdx` | Bài học dẫn từng bước |
| `learning-path` | `src/content/docs/templates/shared/learning-path.mdx` | Lộ trình môn/chương |
| `how-to-guide` | `src/content/docs/templates/how-to-guide.mdx` | Hướng dẫn làm một việc |
| `reference-note` | `src/content/docs/templates/reference-note.mdx` | Tra cứu nhanh |
| `explanation` | `src/content/docs/templates/explanation.mdx` | Giải thích sâu |

### Y học hiện đại

| Template | File | Diátaxis | Dùng cho |
| --- | --- | --- | --- |
| `modern-disease-topic` | `templates/modern/modern-disease-topic.mdx` | reference/explanation | Bài bệnh học đầy đủ |
| `symptom-approach` | `templates/modern/symptom-approach.mdx` | how-to | Tiếp cận triệu chứng |
| `diagnosis-workup` | `templates/modern/diagnosis-workup.mdx` | how-to/reference | Chẩn đoán và cận lâm sàng |
| `differential-diagnosis` | `templates/modern/differential-diagnosis.mdx` | reference | Chẩn đoán phân biệt |
| `treatment-guide` | `templates/modern/treatment-guide.mdx` | how-to | Điều trị và theo dõi |
| `emergency-algorithm` | `templates/modern/emergency-algorithm.mdx` | how-to | Cấp cứu / xử trí nhanh |
| `drug-monograph` | `templates/modern/drug-monograph.mdx` | reference | Thuốc |
| `antibiotic-guide` | `templates/modern/antibiotic-guide.mdx` | how-to/reference | Kháng sinh |
| `microbiology-pathogen` | `templates/modern/microbiology-pathogen.mdx` | reference/explanation | Vi sinh |
| `pathology-note` | `templates/modern/pathology-note.mdx` | reference/explanation | Giải phẫu bệnh |
| `imaging-interpretation` | `templates/modern/imaging-interpretation.mdx` | how-to/reference | Hình ảnh học |
| `lab-interpretation` | `templates/modern/lab-interpretation.mdx` | reference | Xét nghiệm |
| `clinical-case-care` | `templates/modern/clinical-case-care.mdx` | tutorial | Ca lâm sàng |
| `evidence-review` | `templates/modern/evidence-review.mdx` | explanation/reference | Tổng quan chứng cứ |
| `procedure-skill` | `templates/modern/procedure-skill.mdx` | how-to | Thủ thuật |

### Y học cổ truyền

| Template | File | Diátaxis | Dùng cho |
| --- | --- | --- | --- |
| `tcm-theory` | `templates/tcm/tcm-theory.mdx` | explanation | Học thuyết / lý luận |
| `tcm-classic-chapter` | `templates/tcm/tcm-classic-chapter.mdx` | explanation | Nguyên văn và chú giải |
| `tcm-pattern` | `templates/tcm/tcm-pattern.mdx` | reference/explanation | Chứng trạng |
| `tcm-disease-name` | `templates/tcm/tcm-disease-name.mdx` | reference | Bệnh danh YHCT |
| `tcm-symptom-approach` | `templates/tcm/tcm-symptom-approach.mdx` | how-to | Tiếp cận triệu chứng YHCT |
| `tcm-differential-pattern` | `templates/tcm/tcm-differential-pattern.mdx` | reference | Phân biệt chứng |
| `tcm-herb-monograph` | `templates/tcm/tcm-herb-monograph.mdx` | reference | Vị thuốc |
| `tcm-formula` | `templates/tcm/tcm-formula.mdx` | reference/how-to | Phương tễ |
| `tcm-acupoint` | `templates/tcm/tcm-acupoint.mdx` | reference | Huyệt |
| `tcm-meridian` | `templates/tcm/tcm-meridian.mdx` | explanation/reference | Kinh lạc |
| `tcm-method` | `templates/tcm/tcm-method.mdx` | how-to | Phương pháp trị liệu |
| `tcm-integrative-topic` | `templates/tcm/tcm-integrative-topic.mdx` | explanation/how-to | Tích hợp YHHĐ + YHCT |
| `tcm-case` | `templates/tcm/tcm-case.mdx` | tutorial | Ca YHCT |
| `tcm-safety-evidence` | `templates/tcm/tcm-safety-evidence.mdx` | reference/how-to | An toàn và chứng cứ |

### Dùng chung

| Template | File | Dùng cho |
| --- | --- | --- |
| `image-atlas` | `templates/shared/image-atlas.mdx` | Atlas ảnh, hình vẽ, biểu đồ |
| `comparison-table` | `templates/shared/comparison-table.mdx` | Bảng phân biệt nhanh |
| `flowchart-algorithm` | `templates/shared/flowchart-algorithm.mdx` | Thuật toán Mermaid |
| `quiz-wrapper` | `templates/shared/quiz-wrapper.mdx` | Nhúng quiz HTML |
| `patient-education` | `templates/shared/patient-education.mdx` | Giải thích cho người bệnh |
| `exam-review` | `templates/shared/exam-review.mdx` | Ôn thi |
| `concept-map` | `templates/shared/concept-map.mdx` | Bản đồ khái niệm |
| `source-original` | `templates/shared/source-original.mdx` | Nguyên thủy / trích sách |
| `chapter-summary` | `templates/shared/chapter-summary.mdx` | Bản tóm tắt chương theo 80/20, kèm sơ đồ/visual brief |
| `quick-reference` | `templates/shared/quick-reference.mdx` | Bản tra cứu nhanh |
| `deep-explanation` | `templates/shared/deep-explanation.mdx` | Bản hiểu sâu |
| `assessment-mcq` | `templates/shared/assessment-mcq.mdx` | Bộ câu hỏi MCQ |
| `flashcard-set` | `templates/shared/flashcard-set.mdx` | Bộ flashcard |
| `case-question-set` | `templates/shared/case-question-set.mdx` | Bộ câu hỏi case |

## 4. Lệnh ingest sách

Dùng khi người dùng copy một cuốn sách hoặc nhiều chương vào `Raw/`.

```bash
npm run ingest:book -- Raw/<thu-muc-sach> <slug-sach> "Tên sách"
```

Lệnh này chỉ scan và in plan. Khi plan ổn, tạo skeleton bằng:

```bash
npm run ingest:book -- Raw/<thu-muc-sach> <slug-sach> "Tên sách" --write
```

Output của `--write`:

- `Raw/<thu-muc-sach>/INGEST_PLAN.json`
- `src/content/docs/books/<slug-sach>/{tom-tat,nguyen-thuy,luong-gia}/`
- `src/content/docs/learning-paths/<slug-sach>.mdx`
- `public/quiz/<slug-sach>/`
- Nếu Raw có `Quiz/` hoặc `Quzi/`, materialize sẽ copy HTML phù hợp sang
  `public/quiz/<slug-sach>/` và nhúng vào `luong-gia/`.

Sau đó yêu cầu Codex xử lý từng chương theo plan, không đọc nguyên cuốn một lần.

## 5. Chuẩn tóm tắt 80/20 và hình minh họa

Với `chapter-summary`, ưu tiên để người học nắm nhanh:

1. **20% cốt lõi:** 4-7 ý nếu nắm được thì hiểu phần lớn chương.
2. **Tóm tắt nhanh:** 1-3 đoạn ngắn, không bê nguyên văn.
3. **Sơ đồ 80/20:** Mermaid mặc định; khi cần đẹp/chính xác hơn thì tạo SVG.
4. **Visual brief:** ghi rõ nên dùng Mermaid, SVG, ảnh sinh bởi Codex, hay hình y khoa nguồn thật.
5. **Tự kiểm:** hỏi lại đúng lõi 80/20, điểm dễ nhầm, và cách dùng trong case.

Quy ước hình:

- Mermaid cho luồng, phân loại, thuật toán.
- SVG cho bản đồ khái niệm/timeline cần kiểm soát chính xác.
- Ảnh sinh bởi Codex cho minh họa bài giảng; ghi rõ là hình minh họa.
- Hình y khoa thật chỉ dùng khi có quyền/nguồn rõ.

## 6. Chính sách nguyên thủy và rác OCR/PDF

- Không tự sửa đè `Raw/`; Raw là bản lưu trữ để đối chiếu.
- Bản `books/<sách>/nguyen-thuy/` có thể dọn hiển thị mức nhẹ: ký tự điều khiển,
  số trang đứng riêng, khoảng trắng dư, placeholder ảnh hỏng.
- Nếu OCR sai làm đổi nghĩa, ghi chú và sửa ở bản tóm tắt/tra cứu/hiểu sâu, không
  âm thầm sửa vào nguyên thủy.
- Nếu một chương quá rác, tạo việc riêng: "clean source display", rồi đối chiếu lại
  trước khi dùng làm nội dung học chính.

## 7. Nguồn định hướng

- Diátaxis: https://diataxis.fr/
- BMJ Best Practice: https://bestpractice.bmj.com/info/
- NICE guideline manual: https://www.nice.org.uk/process/pmg20/chapter/introduction
- CARE case reports: https://www.equator-network.org/reporting-guidelines/care/
- STARD diagnostic accuracy: https://www.equator-network.org/reporting-guidelines/stard/
- PRISMA 2020: https://www.prisma-statement.org/prisma-2020
- WHO ICD classifications: https://www.who.int/standards/classifications/classification-of-diseases
- WHO traditional, complementary and integrative medicine: https://www.who.int/health-topics/traditional-complementary-and-integrative-medicine
- CDC antibiotic stewardship: https://www.cdc.gov/antibiotic-use/
