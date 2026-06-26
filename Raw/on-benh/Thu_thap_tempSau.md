---
id: disease.thu-thap
entity_type: Disease
schema_version: yhct-kb-note-v1
title: "Thử thấp"
name_en: "Summer-heat damp warm disease"
aliases: ["Thử thấp bệnh", "暑湿", "Shu shi"]
language: vi
medical_system: integrated
specialty: on_benh_yhct
taxonomy:
  disease_group: "Ngoại cảm nhiệt bệnh (Ôn bệnh)"
  system: "Đa hệ — hô hấp, tiêu hóa, gan-mật, thần kinh"
  icd10: "A27 (Leptospirosis); A09 (viêm dạ dày-ruột); A83.0 (viêm não Nhật Bản); J06"
  tcm_categories: ["on_benh", "thap_nhiet_loai", "tan_cam_on_benh"]
population:
  age_group: all
  sex: all
tcm_differentiation:
  required: true
  bat_cuong: ["bieu (so khoi)", "ly", "nhiet", "thuc", "co the chuyen hu (thuong khi tan)"]
  tang_phu: ["ty", "vi", "phe", "dai truong", "tieu truong", "can (hoang dan)", "tam (mong che thanh khieu)"]
  khi_huyet_tan_dich: ["thap", "thu nhiet (hoa)", "khi (hao khi)", "tan dich (thuong tan)", "huyet (hoa hoa dong huyet)"]
  kinh_lac: ["thai am ty", "duong minh vi", "thieu duong"]
  benh_co: "Thu thap benh ta cam qua mieng-mui, phe tien thu benh; thap khon tro trung tieu, lan toa tam tieu; thu nhiet hao khi thuong tan, co the hoa tao hoa hoa nhap dinh huyet"
  phap_tri_chung: "Thanh thu tiet nhiet (uu tien hang dau) + tuyen hoa thap ta"
  vong_van_van_thiet:
    vong: ["mat/mat do", "luoi do reu trang ne hoac vang ne", "da vang (hoang dan)", "ban xuat huyet", "than me (nang)"]
    van: ["hoi tho tho gap", "non oi", "chiem ngu (nang)"]
    van_chan: ["han nhiet dau minh (so khoi)", "than nang", "mieng khat it", "nguc bung bi muon", "tieu ngan do", "dai tien long hoi"]
    thiet: ["mach nhu / nhu sac / hoat sac", "than the nang ne", "an dau co bap chan"]
integrated_safety:
  required: true
  red_flags:
    - "Khac mau / xuat huyet phoi (thu thuong phe lac — the nang)"
    - "Hoang dan tang nhanh + sung gan + xuat huyet (the Weil cua Leptospirosis)"
    - "Than me, co giat, gay cung (mong che thanh khieu / hoa hoa dong phong)"
    - "Thieu nieu / ure mau tang (suy than do Lepto)"
    - "Truy mach do non ta nhieu / khi tuy huyet thoat"
  emergency_referral_criteria:
    - "Xuat huyet nghiem trong, khi tuy huyet thoat"
    - "Roi loan y thuc / co giat"
    - "Suy than, suy gan cap"
    - "Mat nuoc-dien giai nang do non + ta"
  contraindications_yhct:
    - "Khong dung Huong nhu phat tan keo dai khi da han xuat nhiet thoat (cang hao khi)"
    - "Than trong bai luong huyet hoat huyet (Don bi, Xich thuoc, Duong quy) khi dang xuat huyet phoi/roi loan dong mau"
  contraindications_yhhd: ["Tuy can nguyen — vd tranh NSAID khi nghi Lepto co xuat huyet/suy than"]
  herb_drug_interactions:
    - "Cam thao lieu cao/keo dai → giu Na, mat K, tang HA (bat loi khi roi loan dien giai do non-ta)"
    - "Thach cao/Han thuy thach lieu cao + bu dich → theo doi Ca2+/dien giai"
    - "Hoang lien/Hoang ba/Hoang cam (berberin) lieu cao keo dai → theo doi tieu hoa; tranh thai ky"
  anticoagulant_risk: "Bai luong huyet co Don bi/Xich thuoc/Duong quy — than trong khi dang chong dong hoac co xuat huyet (Lepto the Weil)"
  pregnancy_lactation: "Berberin (Hoang lien/Hoang ba) tranh thai ky; nhieu vi thanh nhiet manh can than trong"
  renal_impairment: "Canh giac suy than do Leptospirosis — theo doi ure/creatinin, nuoc tieu (protein, HC)"
  hepatic_impairment: "Theo doi men gan — hoang dan do thu thap uat ket / Lepto ton thuong gan"
  monitoring_plan:
    - "Cong thuc mau (BC, trung tinh), mau lang"
    - "Chuc nang gan, chuc nang than (ure, creatinin)"
    - "Tong phan tich nuoc tieu (protein, hong cau)"
    - "Dien giai do (khi non-ta-han nhieu)"
    - "Huyet thanh chan doan Leptospira (MAT/PCR) khi nghi xoan khuan"
source:
  collection: "on_benh_dai_cuong"
  document: "Giao trinh On Benh — Bai 6 Thu Thap (thu-thap_001.md)"
  publisher: "TS.BS Le Minh Hoang; BS.CKII Le Thi Ngoan"
  edition: ""
  year: 2024
  url: "kb/on_benh_dai_cuong/02_benh-lam-sang/thu-thap_001.md"
evidence:
  level: textbook
  last_checked_at: 2026-06-25
status:
  curation: draft
  reviewed_by: ""
  reviewed_at: null
retrieval:
  ai_summary: >
    Thu thap la ngoai cam nhiet benh cap tinh phat mua he / giao he-thu do thu thap
    benh ta (thu nhiet KEM thap). Bieu hien = thap nhiet chung + thap ta uat tro chung:
    sot, than nang, reu ne, mach nhu, mieng khat it, nguc bung bi, tieu chay phan hoi.
    YHCT quy vao on benh loai thap nhiet, tan cam. Phap tri cot loi: thanh thu tiet nhiet
    (uu tien) + tuyen hoa thap. KB co 7 the bien chung: tai ve, ta can nhieu vi truong,
    khon tro trung tieu, tran lan tam tieu, thuong phe lac (khac mau — the nang),
    thuong khi, du ta chua sach. Phan biet voi thu on (thu thuan), thap on (khoi tu tu),
    phuc thu (sau Lap thu). Tuong ung Tay y dien hinh: Leptospirosis (xoan khuan),
    viem da day-ruot cap, viem nao Nhat Ban. Red flags: khac mau, hoang dan nang, than me
    co giat, suy than. Note huu ich khi hoi: chan doan phan biet on benh mua he, chon the
    bien chung & co phuong, an toan khi Lepto.
  query_intents:
    - dinh_nghia
    - chan_doan
    - chan_doan_phan_biet
    - bien_chung_yhct
    - dieu_tri_yhct
    - dieu_tri_yhhd
    - cham_cuu
    - an_toan
  search_keywords:
    - "thu thap"
    - "thap nhiet on benh"
    - "Leptospirosis YHCT"
    - "Tan gia huong nhu am"
    - "Tam thach thang"
    - "Linh que cam lo am"
    - "Thuong truat bach ho thang"
    - "thanh thu hoa thap"
    - "phan biet thu on thu thap thap on phuc thu"
  must_retrieve_for:
    - "phan biet on benh mua he"
    - "sot mua he kem than nang reu ne"
    - "tieu chay sot dau bap chan mua mua"
kg:
  primary_node:
    type: Disease
    id: thu-thap
    name_vi: "Thử thấp"
  expected_node_types:
    - Disease
    - Symptom
    - TCM_Syndrome
    - TCM_Herbal_Formula
    - Herb
    - Acupoint
    - Drug
    - DrugClass
    - DiagnosticTest
    - Complication
    - RiskFactor
  canonical_edges:
    - HAS_SYMPTOM
    - HAS_TCM_SYNDROME
    - TREATED_BY_FORMULA
    - USES_ACUPOINT
    - TREATED_BY_DRUG_CLASS
    - HAS_COMPLICATION
    - DIAGNOSED_BY
    - HAS_RISK_FACTOR
chunking:
  strategy: semantic_sections
  max_tokens: 450
  overlap_tokens: 60
  priority_sections:
    - AI Retrieval Summary
    - Diagnostic Criteria
    - TCM Differentiation
    - TCM Syndrome Patterns
    - Treatment
    - Integrated Safety
    - KG Edges
---

# Thử thấp

## AI Retrieval Summary

Thử thấp là ngoại cảm nhiệt bệnh cấp tính phát vào mùa hè hoặc giao thời hè-thu, do cảm thụ **thử thấp bệnh tà** — thử nhiệt kết hợp với thấp tà. Bệnh cảnh = **thấp nhiệt chứng + thấp tà uất trở chứng**: sốt, thân thể nặng nề, rêu lưỡi nê, mạch nhu, miệng khát ít, ngực bụng bĩ muộn, có thể nôn và tiêu chảy phân hôi. Trọng tâm bệnh ở **trung tiêu (tỳ vị)**, lan tỏa **tam tiêu**, dễ **hóa táo hóa hỏa** nhập dinh huyết gây xuất huyết, hoặc uất kết phát hoàng. Pháp trị cốt lõi: **thanh thử tiết nhiệt (vị trí đầu tiên) + tuyên hóa thấp tà** — không được trị thử mà bỏ thấp. KB chép đầy đủ **7 thể biện chứng** với cổ phương riêng. Cần phân biệt với thử ôn (thử thuần), thấp ôn (khởi từ từ), phục thử (phục tàng sau Lập thu). Khuôn mặt Tây y điển hình: **Leptospirosis (bệnh xoắn khuẩn)**, viêm dạ dày-ruột cấp, viêm não Nhật Bản. Red flags: khạc máu/xuất huyết phổi, hoàng đản nặng, thần mê co giật, suy thận.

<!-- dt_chunk id="disease.thu-thap.definition" type="definition" priority="high" -->
## Definition

### YHHĐ

- **Định nghĩa:** Không phải một bệnh đơn lẻ mà là một **hội chứng nhiễm trùng-nhiễm độc cấp mùa hè** ánh xạ sang nhiều bệnh Tây y có chung bệnh cảnh sốt cấp + rối loạn tiêu hóa/gan-mật/thần kinh.
- **Tiêu chuẩn chẩn đoán ngắn (ánh xạ chính — Leptospirosis):** sốt cấp + đau cơ (đặc biệt bắp chân) + xung huyết kết mạc (mắt đỏ) ± vàng da, suy thận; xác định bằng huyết thanh (MAT) / PCR.
- **Dịch tễ:** mùa mưa nóng; tiếp xúc nước/bùn ô nhiễm nước tiểu chuột đồng, heo (ổ chứa Leptospira). Viêm dạ dày-ruột cấp: thức ăn-nước nhiễm khuẩn mùa hè.
- **Diễn tiến tự nhiên:** từ sốt-đau mình → toàn phát (vàng da, xuất huyết, suy thận với Lepto thể Weil) → hồi phục hoặc biến chứng nặng (xuất huyết phổi, suy đa tạng).

### YHCT

- **Phạm trù chứng/bệnh:** Ôn bệnh — loại thấp nhiệt; tân cảm ôn bệnh.
- **Bệnh danh cổ liên quan:** "Thử thấp", "thử thấp phong ôn" (Trần Vô Trạch); Tào Bình Chương chia 13 chứng.
- **Bản hư/tiêu thực:** Tiêu thực là chính (thử thấp tà thực) — giai đoạn sau có thể **bản hư** (thử thương khí tân, tỳ vị nguyên khí bất túc).
- **Tạng phủ/kinh lạc liên quan:** trọng tâm **tỳ vị (thái âm/dương minh)**, phế (sơ khởi), đại-tiểu trường, can (hoàng đản), tâm bào (mông che thanh khiếu); thiếu dương (tà trở khu cơ).
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.tcm_differentiation" type="tcm_differentiation" priority="very_high" -->
## TCM Differentiation

### Vong Van Van Thiet

| Chan phap | Dau hieu can ghi | Y nghia bien chung |
| --- | --- | --- |
| Vọng | Mặt/mắt đỏ; lưỡi đỏ rêu trắng nê hoặc vàng nê; nặng → lưỡi đỏ thẫm; da vàng; ban xuất huyết; thần mê | Rêu nê = thấp; lưỡi đỏ = nhiệt; đỏ thẫm = nhập dinh; vàng da = uất kết phát hoàng |
| Văn | Hơi thở thô gấp; nôn ói; (nặng) chiêm ngữ | Vị khí thượng nghịch; nhiệt nhiễu tâm thần |
| Vấn | Hàn nhiệt đau mình (sơ khởi); sốt; **miệng khát mà không muốn uống nhiều**; thân nặng; ngực bụng bĩ muộn; tiểu ngắn đỏ; đại tiện lỏng hôi | Khát ít = thấp ngăn (KHÁC thử ôn khát dữ); thân nặng + bĩ = thấp khôn trở khí cơ |
| Thiết | **Mạch nhu** / nhu sác / hoạt sác / phù hoạt sác; thân nặng; ấn đau cơ bắp chân | Mạch nhu = dấu ấn thấp; ấn đau bắp chân = gợi Leptospirosis |

### Bat Cuong - Tang Phu - Khi Huyet Tan Dich

| Truc bien chung | Nhan dinh | Chung cu | Do tin cay |
| --- | --- | --- | --- |
| Bieu/ly | Sơ khởi biểu (vệ) → nhanh vào lý (khí phần) | Hàn nhiệt đau mình → sốt cao tâm phiền tiểu đỏ | Cao |
| Han/nhiet | Nhiệt (kèm thấp); có thể kiêm hàn sơ khởi | Sốt, tiểu đỏ, rêu vàng nê; kiêm hàn → ố hàn hàn chiến | Cao |
| Hu/thuc | Thực là chính; chuyển hư khi thử thương khí tân | Mạch nhu hoạt sác (thực) → mạch đại vô lực (hư) | Cao |
| Am/duong | Dương nhiệt thiên thịnh; hao âm dịch giai đoạn sau | Miệng khô khát, lưỡi đỏ, tự hãn | Trung bình |
| Tang phu | Tỳ vị (trọng tâm), phế, trường, can, tâm bào | Quản bĩ, nôn, tiêu lỏng; ho khạc máu; hoàng đản; thần mê | Cao |
| Khi/huyet/tan dich | Thấp + thử nhiệt → hao khí thương tân → hóa táo động huyết | Thân nặng rêu nê; tự hãn khí đoản; khạc máu ban chẩn | Cao |
| Kinh lac | Thái âm tỳ, dương minh vị, thiếu dương | Khôn trở trung tiêu; tà trở thiếu dương khu cơ bất lợi | Trung bình |

### Benh Co Va Phap Tri Chung

- **Bệnh cơ:** Thử thấp tà cảm qua miệng-mũi → phế tiên thụ bệnh → thấp khôn trở trung tiêu, lan tỏa tam tiêu; thử nhiệt hao khí thương tân, có thể hóa táo hóa hỏa nhập dinh huyết / uất kết phát hoàng.
- **Bản chất bệnh:** tiêu thực (thử thấp tà) là chính; giai đoạn sau bản hư (khí tân hư, tỳ vị nguyên khí bất túc).
- **Pháp trị chung:** **Thanh thử tiết nhiệt (đầu tiên) + tuyên hóa thấp tà**; tùy vị trí mà thấu biểu / thanh tiết thiếu dương / hóa thấp trung tiêu / thông tam tiêu / lương huyết / ích khí.
- **Dấu hiệu cần đổi thể/chuyển pháp:** xuất huyết → lương huyết an lạc; hoàng đản → thanh can sơ can; tự hãn mệt lả mạch đại vô lực → ích khí hòa trung; sốt lui còn dư tà → thanh hóa dư tà.
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.etiology" type="etiology_pathogenesis" priority="high" -->
## Etiology And Pathogenesis

### YHHĐ

| Nhóm nguyên nhân | Cơ chế | Gợi ý lâm sàng | Cận lâm sàng |
| --- | --- | --- | --- |
| Leptospira (xoắn khuẩn) | Nhiễm qua da/niêm mạc tiếp xúc nước nhiễm → nhiễm khuẩn huyết, viêm mạch, tổn thương gan-thận | Sốt + đau bắp chân + mắt đỏ + vàng da + dịch tễ nước/chuột | BC↑, trung tính↑, máu lắng↑, protein/HC niệu, urê↑, men gan ↑; MAT/PCR |
| Vi khuẩn/virus đường ruột | Viêm dạ dày-ruột cấp, mất nước-điện giải | Sốt + đau bụng + nôn + tiêu chảy phân hôi | Cấy phân; điện giải đồ |
| Virus hướng thần kinh (JEV) | Viêm nhu mô não → phù não, co giật | Cao nhiệt + hôn mê + co giật mùa hè (trẻ em) | Huyết thanh JEV, dịch não tủy |
| Stress nhiệt | Rối loạn điều nhiệt + viêm hệ thống | Sốt cao, mệt lả khi nắng nóng | — |

### YHCT

| Nguyên nhân YHCT | Cơ chế bệnh sinh | Chứng hậu gợi ý | Diễn biến |
| --- | --- | --- | --- |
| Ngoại cảm thử thấp tà | Thử nhiệt + thấp kết hợp mùa hè mưa nóng; cảm qua miệng-mũi, phế tiên thụ | Hàn nhiệt đau mình, thân nặng, rêu nê | Khôn trở trung tiêu, lan tam tiêu |
| Kiêm cảm hàn tà | Tìm mát, uống lạnh, gặp mưa gió → hàn ngoại thúc thử thấp nội uất | Ố hàn, hàn chiến, vô hãn, mạch phù huyền | Thử thấp kiêm hàn (thể tại vệ) |
| Ăn uống/lao dục | Ăn sống uống lạnh, lao quyện → tỳ vị càng hư | Quản bĩ, nôn, tiêu lỏng | Dễ phát + dai dẳng |
| Bệnh lâu/chính khí hư | Tỳ vị hư, nguyên khí bất túc → tam tiêu tinh khí bất túc, tà không thoát | Tự hãn, tứ chi rã rời, mạch đại vô lực | Thử thấp thương khí; hóa táo thương âm |
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.clinical" type="clinical_features" priority="high" -->
## Clinical Features

### Symptoms And Signs

| Triệu chứng/dấu hiệu | Loại | YHHĐ/YHCT | Giá trị gợi ý |
| --- | --- | --- | --- |
| Sốt (hàn nhiệt → tráng nhiệt) | symptom | chung | Tà chính giao tranh; lý nhiệt thịnh |
| Thân thể nặng nề, khớp đau mỏi | symptom | YHCT | Thấp át kinh lạc cơ phu — dấu ấn thấp |
| Rêu lưỡi nê (trắng/vàng), mạch nhu | sign | YHCT | Dấu ấn thấp cốt lõi |
| Miệng khát mà uống không nhiều | symptom | YHCT | Phân biệt thử ôn (khát dữ) |
| Ngực bụng bĩ muộn, nôn | symptom | chung | Thấp khôn trở khí cơ trung tiêu |
| Đại tiện lỏng phân hôi thối, thế cấp | symptom | chung | Thử thấp hạ bức trường đạo |
| Tiểu ngắn đỏ | sign | chung | Thử nhiệt hạ chú |
| Đau ấn cơ bắp chân, mắt đỏ | sign | YHHĐ | Gợi Leptospirosis |
| Vàng da (hoàng đản) | sign | chung | Thử thấp uất kết, độc nhập can |
| Khạc máu/đàm lẫn máu | sign | chung | Thử thương phế lạc — red flag |
| Tai điếc, hoa mắt chóng mặt | symptom | YHCT | Thấp nhiệt uất chưng mông che thanh khiếu |
| Tự hãn, tứ chi rã rời, mạch đại vô lực | sign | YHCT | Thử thương khí (chuyển hư) |

### Red Flags

| Red flag | Ý nghĩa | Hành động |
| --- | --- | --- |
| Khạc máu / xuất huyết phổi | Thử thương phế lạc; Lepto thể Weil | Nằm yên tuyệt đối; cấp cứu Đông-Tây; lương huyết chỉ huyết |
| Hoàng đản tăng nhanh + sưng gan + xuất huyết | Suy gan/độc nhập can | Nhập viện, đánh giá gan-mật, hỗ trợ |
| Thần mê, co giật, gáy cứng | Mông che thanh khiếu / hóa hỏa động phong / viêm não | Cấp cứu, chống co giật, lương khai tức phong |
| Thiểu niệu, urê máu tăng | Suy thận do Lepto | Đánh giá thận, cân nhắc lọc máu |
| Nôn-tả nhiều → truỵ mạch | Khí tùy huyết/tân thoát | Bù dịch-điện giải; Sinh mạch ẩm/Độc sâm thang |
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.diagnosis" type="diagnostic_criteria" priority="very_high" -->
## Diagnostic Criteria

### Workup

| Xét nghiệm/thăm dò | Mục đích | Dấu hiệu dương tính | Ghi chú |
| --- | --- | --- | --- |
| Công thức máu, máu lắng | Đánh giá nhiễm trùng | BC↑, trung tính↑, máu lắng↑ | KB nêu rõ cho bệnh xoắn khuẩn |
| Tổng phân tích nước tiểu | Tổn thương thận | Protein, hồng cầu niệu | — |
| Urê/creatinin | Chức năng thận | Urê máu tăng cao | Lepto thể nặng |
| Men gan, bilirubin | Tổn thương gan-mật | Men gan bất thường, bilirubin↑ | Hoàng đản |
| Huyết thanh MAT / PCR Leptospira | Xác định xoắn khuẩn | Dương tính | Tiêu chuẩn vàng |
| Huyết thanh JEV, DNT | Loại viêm não Nhật Bản | Dương tính | Khi cao nhiệt + thần kinh |

### Differential Diagnosis

| Chẩn đoán phân biệt | Điểm giống | Điểm phân biệt | Test ưu tiên |
| --- | --- | --- | --- |
| **Thử ôn** | Phát mùa hè, có thử nhiệt | Thử ôn thử **thuần**: sốt cao nổi bật, phiền khát, mạch hồng đại, **không/không rõ thấp** | Tìm dấu thấp (thân nặng, rêu nê, mạch nhu) |
| **Thấp ôn** | Có thấp nhiệt | Thấp ôn **khởi từ từ**, nhiệt ẩn trong thấp, bệnh tại tỳ vị, dai dẳng nhất | Khởi phát + mức nhiệt sớm |
| **Phục thử** | Thử thấp, dai dẳng | Phục thử **phát sau Lập thu**, phát là lý nhiệt ngay, vệ chứng chỉ thoáng | Thời điểm phát bệnh |
| **Thấp nhiệt thổ tả** | Nôn tả, thấp nhiệt | Tà cán vị trường (thử thấp) **cấp & nặng hơn**, sốt cao hơn | Mức độ cấp/nặng |
| Điếc thiếu dương | Tai điếc | Thiếu dương: hàn nhiệt vãng lai, miệng đắng, mạch huyền (đờm nhiệt) | Tứ chẩn kèm theo |

> ⚠ **Bẫy:** khi thử thấp **hóa táo hóa hỏa** thì biểu hiện **rất giống thử ôn** — phải truy tiền sử có giai đoạn thấp chứng trước đó.
<!-- /dt_chunk -->

## TCM Syndrome Patterns

<!-- dt_chunk id="disease.thu-thap.syndrome.thu-thap-tai-ve" type="syndrome_pattern" priority="very_high" -->
### Thử thấp tại vệ

```yaml
syndrome:
  id: thu-thap-tai-ve
  name: "Thử thấp tại vệ"
  pathomechanism: "Thử thấp sơ khởi, ngoại tà uất át cơ biểu, bế trở vệ phần; có thể kiêm hàn ngoại thúc"
  treatment_principle: "Thấu tà đạt biểu, địch thử hóa thấp"
  tongue: "Lưỡi đỏ, rêu trắng nê hoặc hơi vàng nê (kiêm hàn: rêu mỏng nê)"
  pulse: "Phù hoạt sác / nhu sác (kiêm hàn: phù huyền)"
  key_symptoms: ["sốt", "hơi ố phong hàn", "đầu đau căng nặng", "thân nặng khớp mỏi", "ít/không mồ hôi", "quản bĩ", "miệng không khát"]
  formula:
    id: ve-phan-tuyen-thap-am
    name: "Vệ phần tuyên thấp ẩm (thử nhiệt nhẹ) / Tân gia hương nhu ẩm (hàn thúc thử uất)"
    modifications: ["đau đầu nhiều + Mạn kinh tử", "sốt cao + Thanh hao, Đại thanh diệp", "đau họng + Thanh quả", "tiểu vàng đỏ + Trúc diệp, Lô căn, Hoạt thạch"]
  acupoints:
    - id: HOP-COC
      name: "Hợp cốc"
      technique: "tả — giải biểu thanh nhiệt"
    - id: KHUC-TRI
      name: "Khúc trì"
      technique: "tả — thanh nhiệt"
  cautions: ["thấy hãn xuất nhiệt thoát thì NGƯNG Hương nhu (hao khí)"]
```

#### Biện chứng
- Ngoại tà uất át cơ biểu; thử thấp tập biểu bế trở vệ phần → ố phong hàn; tà chính giao tranh → sốt (thử viêm nhiệt nên sốt cao). Thấp át kinh lạc cơ phu → thân nặng khớp mỏi; thấp nội trở khí cơ → quản bĩ, miệng không khát.
- Kiêm hàn: hàn ngoại thúc, huyền phủ không mở → vô hãn, ố hàn, hàn chiến, thân co ro, ngực bụng bĩ muộn, nôn.

#### Pháp trị
- Thấu tà đạt biểu, địch thử hóa thấp. Kiêm hàn → tân ôn phục tân lương pháp (Ngô Cúc Thông).

#### Phương dược

| Bài thuốc | Vai trò | Gia giảm | Ghi chú an toàn |
| --- | --- | --- | --- |
| Vệ phần tuyên thấp ẩm (Hương nhu, Thanh hao, Hoạt thạch, Phục linh, Thông thảo, Hạnh nhân, Hà diệp, Đông qua bì, Trúc diệp) | chủ phương — thử nhiệt nhẹ | sốt cao + Thanh hao/Đại thanh diệp | thiên cam đạm thẩm thấp |
| Tân gia hương nhu ẩm (Hương nhu, Hậu phác, Ngân hoa, Liên kiều, Biển đậu hoa) | chủ phương — hàn thúc thử uất | — | ngưng Hương nhu khi hãn xuất nhiệt thoát |

#### Châm cứu

| Huyệt | Vai trò | Kỹ thuật | Ghi chú |
| --- | --- | --- | --- |
| Hợp cốc, Khúc trì | Giải biểu thanh nhiệt | Tả | — |
| Âm lăng tuyền | Kiện tỳ hóa thấp | Bình bổ bình tả | hỗ trợ hóa thấp |
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.syndrome.ta-can-nhieu-vi-truong" type="syndrome_pattern" priority="very_high" -->
### Tà cán nhiễu vị trường

```yaml
syndrome:
  id: ta-can-nhieu-vi-truong
  name: "Tà cán nhiễu vị trường"
  pathomechanism: "Thử thấp trực tiếp xâm phạm trường vị, thăng giáng thất tư, thanh bất thăng trọc bất giáng"
  treatment_principle: "Thanh giải thử nhiệt, hóa khí lợi thấp"
  tongue: "Lưỡi đỏ, rêu nê"
  pulse: "Nhu sác"
  key_symptoms: ["sốt", "đau bụng", "tâm phiền thao nhiễu", "miệng khát thích uống", "nôn liên tục", "tiêu chảy phân hôi thế cấp", "tiểu ngắn đỏ"]
  formula:
    id: linh-que-cam-lo-am
    name: "Linh quế cam lộ ẩm"
    modifications: ["nôn nhiều + Sinh khương, Trúc nhự", "tiểu ngắn đỏ + Xa tiền thảo", "cân mạch co thắt + Mộc qua, Bạch thược"]
  acupoints:
    - id: THIEN-KHU
      name: "Thiên khu"
      technique: "tả — điều trường chỉ tả"
    - id: TUC-TAM-LY
      name: "Túc tam lý"
      technique: "bình bổ bình tả — hòa vị"
  cautions: ["nôn tả nhiều dễ thương âm hóa táo, mất nước — bù dịch điện giải"]
```

#### Biện chứng
- Thử thấp thịnh nhập trung tiêu vị trường, tà chính tương tranh → sốt; khôn trở khí cơ → đau bụng; nhiệt nhiễu tâm thần → tâm phiền; vị thất hòa giáng → nôn; hạ bức trường đạo → tiêu chảy phân hôi thế cấp. So thấp nhiệt thổ tả: thể này **cấp, nặng, sốt cao hơn**.

#### Pháp trị
- Thanh giải thử nhiệt, hóa khí lợi thấp.

#### Phương dược

| Bài thuốc | Vai trò | Gia giảm | Ghi chú an toàn |
| --- | --- | --- | --- |
| Linh quế cam lộ ẩm (= Lục nhất tán + Ngũ linh tán + Thạch cao + Hàn thủy thạch) | chủ phương | nôn nhiều + Sinh khương/Trúc nhự | theo dõi điện giải do nôn-tả |

#### Châm cứu

| Huyệt | Vai trò | Kỹ thuật | Ghi chú |
| --- | --- | --- | --- |
| Thiên khu, Túc tam lý, Âm lăng tuyền | Điều trường, hòa vị, hóa thấp | Tả/bình | chỉ tả chỉ nôn |
| Nội quan | Chỉ nôn | Bình bổ bình tả | — |
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.syndrome.khon-tro-trung-tieu" type="syndrome_pattern" priority="very_high" -->
### Thử thấp khôn trở trung tiêu

```yaml
syndrome:
  id: thu-thap-khon-tro-trung-tieu
  name: "Thử thấp khôn trở trung tiêu"
  pathomechanism: "Thử nhiệt nội tích Dương minh, lý nhiệt chưng bức; thấp tà trung trở (thử nhiệt thiên thịnh)"
  treatment_principle: "Thanh thử hóa thấp"
  tongue: "Lưỡi đỏ thẫm, rêu vàng nê"
  pulse: "Hồng đại"
  key_symptoms: ["tráng nhiệt", "hãn xuất", "mặt đỏ sợ nóng", "hơi thở thô gấp", "chi thể mỏi nhừ", "tâm phiền miệng khát", "tiểu không thông", "quản bĩ nôn"]
  formula:
    id: thuong-truat-bach-ho-thang
    name: "Thương truật bạch hổ thang gia giảm"
    modifications: ["nhiệt cực + Chi tử, Ngân hoa, Liên kiều", "động phong gáy cứng + Bạch cương tằm, Thiền thoái, Cúc hoa, Địa long", "xuất huyết + Sinh địa, Đơn bì, Thiến thảo căn, Bạch mao căn", "chi thể mỏi + Tang chi, Hán phòng kỷ"]
  acupoints:
    - id: KHUC-TRI
      name: "Khúc trì"
      technique: "tả — thanh dương minh nhiệt"
    - id: NOI-DINH
      name: "Nội đình"
      technique: "tả — thanh vị nhiệt"
  cautions: ["gần giống thử ôn — đừng bỏ sót dấu thấp (rêu vàng nê, chi nhừ)"]
```

#### Biện chứng
- Thử nhiệt nội tích Dương minh, lý nhiệt chưng bức → sốt cao, hãn xuất, phiền khát, mặt mắt đỏ, mạch hồng đại. Thấp tà ngấm ra → chi thể nhừ mỏi; thấp trung trở bí uất khí cơ, vị khí thượng nghịch → quản bĩ nôn; thử thấp hạ chú → tiểu không thông.

#### Pháp trị
- Thanh thử hóa thấp (tân thấu hàn tiết Dương minh thử nhiệt + hóa thấp thái âm tỳ).

#### Phương dược

| Bài thuốc | Vai trò | Gia giảm | Ghi chú an toàn |
| --- | --- | --- | --- |
| Thương truật bạch hổ thang gia giảm (Thương truật, sinh Thạch cao, Tri mẫu, Bạch đậu khấu, Hoạt thạch, Thảo quả nhân, Hà diệp, Trúc diệp tâm) | chủ phương | nhiệt cực + Chi tử/Ngân hoa/Liên kiều | Thạch cao liều cao — theo dõi Ca2+/điện giải |

#### Châm cứu

| Huyệt | Vai trò | Kỹ thuật | Ghi chú |
| --- | --- | --- | --- |
| Khúc trì, Hợp cốc, Nội đình | Thanh Dương minh nhiệt | Tả | — |
| Thái xung, Phong trì | Lương can tức phong (nếu động phong) | Tả | khi gáy cứng/co giật |
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.syndrome.tran-lan-tam-tieu" type="syndrome_pattern" priority="very_high" -->
### Thử thấp tràn lan tam tiêu

```yaml
syndrome:
  id: thu-thap-tran-lan-tam-tieu
  name: "Thử thấp tràn lan tam tiêu"
  pathomechanism: "Tà nhập lý lan tỏa mờ mịt tam tiêu — thử nhiệt nặng, thấp tà nhẹ, tà tại khí phần khắp thượng-trung-hạ"
  treatment_principle: "Thanh nhiệt lợi thấp, tuyên thông tam tiêu"
  tongue: "Lưỡi đỏ thẫm, rêu vàng nê"
  pulse: "Hoạt sác"
  key_symptoms: ["sốt", "mặt đỏ", "tai điếc", "hoa mắt chóng mặt", "ho đàm lẫn máu", "miệng không khát lắm", "ngực tức bụng chướng", "đại tiện lỏng hôi", "tiểu ngắn đỏ"]
  formula:
    id: tam-thach-thang
    name: "Tam thạch thang"
    modifications: ["tâm phiền tức ngực + Chi tử bì, Trúc diệp tâm", "đàm nhiều kèm máu + Xuyên bối, Trúc lịch, Bạch mao căn", "tiểu rát đỏ + Xa tiền thảo, Ý dĩ"]
  acupoints:
    - id: AM-LANG-TUYEN
      name: "Âm lăng tuyền"
      technique: "tả — lợi thấp"
    - id: CHI-CAU
      name: "Chi câu"
      technique: "tả — thông tam tiêu"
  cautions: ["tai điếc thử thấp KHÁC điếc thiếu dương (đờm nhiệt)"]
```

#### Biện chứng
- Thử nhiệt kèm thấp chưng ra ngoài → sốt không lui; thử thấp phạm thượng tiêu mông che thanh khiếu → tai điếc, mặt đỏ, chóng mặt; tổn phế lạc → tức ngực, ho đàm máu; trở trung tiêu → bĩ muộn, khát ít; uẩn kết hạ tiêu → tiểu đỏ, đại tiện lỏng hôi.

#### Pháp trị
- Thanh nhiệt lợi thấp, tuyên thông tam tiêu.

#### Phương dược

| Bài thuốc | Vai trò | Gia giảm | Ghi chú an toàn |
| --- | --- | --- | --- |
| Tam thạch thang (Hoạt thạch, sinh Thạch cao, Hàn thủy thạch, Hạnh nhân, Trúc nhự, Ngân hoa, Kim trấp, Bạch thông thảo) | chủ phương | đàm máu + Xuyên bối/Trúc lịch/Bạch mao căn | — |

#### Châm cứu

| Huyệt | Vai trò | Kỹ thuật | Ghi chú |
| --- | --- | --- | --- |
| Âm lăng tuyền, Chi câu, Tam tiêu du | Lợi thấp, thông tam tiêu | Tả | — |
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.syndrome.thu-thuong-phe-lac" type="syndrome_pattern" priority="very_high" -->
### Thử thương phế lạc (thể nặng — red flag)

```yaml
syndrome:
  id: thu-thuong-phe-lac
  name: "Thử thương phế lạc"
  pathomechanism: "Thử nhiệt hóa táo hóa hỏa nội hãm huyết phần, uẩn kết thành độc tổn thương phế lạc → huyết tràn"
  treatment_principle: "Lương huyết an lạc, thanh thử bảo phế"
  tongue: "Lưỡi đỏ, rêu vàng mà khô"
  pulse: "Tế sác"
  key_symptoms: ["sốt phiền khát", "ho khí suyễn", "khạc máu/đàm lẫn máu", "phiền thao suyễn thúc"]
  formula:
    id: te-giac-dia-hoang-hop-hoang-lien-giai-doc
    name: "Tê giác (thủy ngưu giác) địa hoàng thang hợp Hoàng liên giải độc thang gia giảm"
    modifications: ["tăng chỉ huyết + Tam thất, Vân Nam bạch dược"]
  acupoints:
    - id: KHONG-TOI
      name: "Khổng tối"
      technique: "tả — chỉ huyết phế"
    - id: NGU-TE
      name: "Ngư tế"
      technique: "tả — thanh phế nhiệt"
  cautions: ["NẰM YÊN TUYỆT ĐỐI — thao động làm tăng xuất huyết; phối Đông-Tây cấp cứu; thận trọng vị hoạt huyết khi đang chảy máu"]
```

#### Biện chứng
- Thử nhiệt hóa táo hóa hỏa nội hãm huyết phần, uẩn kết thành độc → tổn thương phế lạc, huyết theo đó tràn lên → khạc máu/đàm lẫn máu, có thể máu tươi ra mũi miệng; thử nhiệt bức phế → ho khí suyễn; nhiễu tâm thần → phiền thao.

#### Pháp trị
- Lương huyết an lạc, thanh thử bảo phế (cấp tốc).

#### Phương dược

| Bài thuốc | Vai trò | Gia giảm | Ghi chú an toàn |
| --- | --- | --- | --- |
| Tê giác (thủy ngưu giác) địa hoàng thang + Hoàng liên giải độc thang gia giảm (Thủy ngưu giác, Sinh địa, Đơn bì, Xích thược, Hoàng liên, Hoàng bá, Hoàng cầm, Ngân hoa, Ngẫu tiết, Bạch cập, Bạch mao căn, Chi tử sao) | chủ phương | + Tam thất/Vân Nam bạch dược | thủy ngưu giác thay tê giác (CITES); thận trọng Đơn bì/Xích thược (hoạt huyết) khi đang xuất huyết |

#### Châm cứu

| Huyệt | Vai trò | Kỹ thuật | Ghi chú |
| --- | --- | --- | --- |
| Khổng tối, Ngư tế | Thanh phế chỉ huyết | Tả nhẹ | tránh kích thích mạnh khi đang xuất huyết |
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.syndrome.thu-thap-thuong-khi" type="syndrome_pattern" priority="very_high" -->
### Thử thấp thương khí

```yaml
syndrome:
  id: thu-thap-thuong-khi
  name: "Thử thấp thương khí"
  pathomechanism: "Thử nhiệt trở trệ khí cơ, tổn thương trung khí, hao nguyên khí + thương tân (chuyển hư)"
  treatment_principle: "Thanh thử hóa thấp, bồi nguyên hòa trung"
  tongue: "Rêu nê"
  pulse: "Đại (lớn) vô lực / nhu hoạt đới sắc"
  key_symptoms: ["sốt tự hãn", "tâm phiền khát", "ngực tức khí đoản", "tứ chi rã rời uể oải", "tiểu ngắn đỏ", "đại tiện lỏng"]
  formula:
    id: dong-hang-thanh-thu-ich-khi-thang
    name: "Đông Hằng thanh thử ích khí thang (Lý Đông Hằng)"
    modifications: []
  acupoints:
    - id: TUC-TAM-LY
      name: "Túc tam lý"
      technique: "bổ — ích khí kiện tỳ"
    - id: KHI-HAI
      name: "Khí hải"
      technique: "bổ/cứu — bồi nguyên khí"
  cautions: ["PHÂN BIỆT với Thanh thử ích khí thang Vương Mạnh Anh (dùng cho thử ÔN, thiên dưỡng âm)"]
```

#### Biện chứng
- Thử nhiệt nội uất bức tân ngoại tiết → sốt tự hãn; nhiễu tâm thương tân → tâm phiền khát; trở trệ khí cơ hao trung khí nguyên khí → ngực tức khí đoản, tứ chi rã rời uể oải; hạ bức không phân thanh trọc → tiểu ngắn đỏ, đại tiện lỏng. Mạch đại vô lực = khí suy.

#### Pháp trị
- Thanh thử hóa thấp, bồi nguyên hòa trung (trị bản: bổ ích khí âm).

#### Phương dược

| Bài thuốc | Vai trò | Gia giảm | Ghi chú an toàn |
| --- | --- | --- | --- |
| Đông Hằng thanh thử ích khí thang (Hoàng kỳ, Đảng sâm, Thương/Bạch truật, Thăng ma, Cát căn, Trạch tả, Hoàng bá, Mạch đông, Ngũ vị tử, Đương quy, Thanh bì, Quất bì, Lục khúc, Chích cam thảo) | chủ phương | — | ≠ bài Vương Mạnh Anh (thử ôn) |

#### Châm cứu

| Huyệt | Vai trò | Kỹ thuật | Ghi chú |
| --- | --- | --- | --- |
| Túc tam lý, Khí hải, Quan nguyên | Ích khí bồi nguyên | Bổ/cứu | giai đoạn chuyển hư |
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.syndrome.thu-thap-du-ta" type="syndrome_pattern" priority="very_high" -->
### Thử thấp dư tà chưa sạch (hậu kỳ)

```yaml
syndrome:
  id: thu-thap-du-ta
  name: "Thử thấp dư tà chưa sạch"
  pathomechanism: "Dư tà mỏng che thanh khiếu, tân dịch chưa hồi phục"
  treatment_principle: "Thanh hóa thử thấp dư tà"
  tongue: "Lưỡi đỏ nhạt, rêu mỏng trắng"
  pulse: "Nhu nhẹ"
  key_symptoms: ["sốt thấp còn", "miệng khát không nhiều", "hoa mắt chóng mặt"]
  formula:
    id: thanh-lac-am
    name: "Thanh lạc ẩm"
    modifications: ["tiểu ít vàng rêu nê + Hạnh nhân, Ý dĩ, Hoạt thạch"]
  acupoints:
    - id: AM-LANG-TUYEN
      name: "Âm lăng tuyền"
      technique: "bình bổ bình tả — hóa dư thấp"
  cautions: ["bệnh nhẹ dần, vị trí nông — dùng thuốc nhẹ, tránh công phạt"]
```

#### Biện chứng
- Thử thấp đã giảm nhưng dư tà còn → sốt thấp; tân dịch chưa hồi phục → khát mà không muốn uống; dư tà mỏng che thanh khiếu → hoa mắt chóng mặt.

#### Pháp trị
- Thanh hóa thử thấp dư tà.

#### Phương dược

| Bài thuốc | Vai trò | Gia giảm | Ghi chú an toàn |
| --- | --- | --- | --- |
| Thanh lạc ẩm (Rìa lá sen tươi, Ty qua bì, Ngân hoa tươi, Trúc diệp tâm tươi, Tây qua y, Biển đậu hoa tươi) | chủ phương | tiểu ít vàng + Hạnh nhân/Ý dĩ/Hoạt thạch | thuốc nhẹ giai đoạn hồi phục |

#### Châm cứu

| Huyệt | Vai trò | Kỹ thuật | Ghi chú |
| --- | --- | --- | --- |
| Âm lăng tuyền, Túc tam lý | Hóa dư thấp, kiện tỳ phục chính | Bình bổ bình tả | — |
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.treatment.integrated" type="treatment_protocol" priority="very_high" -->
## Treatment

### YHHĐ

| Nhóm điều trị | Chỉ định | Lựa chọn | Theo dõi | Chống chỉ định |
| --- | --- | --- | --- | --- |
| Kháng sinh (Leptospirosis) | Nghi/xác định xoắn khuẩn | Penicillin G; Doxycycline; nặng → Ceftriaxone | Phản ứng Jarisch-Herxheimer, chức năng gan-thận | Dị ứng nhóm thuốc |
| Bù dịch-điện giải | Viêm dạ dày-ruột cấp, mất nước | ORS / dịch truyền tinh thể | Điện giải, lượng nước tiểu | Quá tải dịch |
| Hỗ trợ tạng | Suy thận/suy gan/xuất huyết phổi | Lọc máu, hồi sức hô hấp, truyền máu | Đa cơ quan | — |
| Viêm não Nhật Bản | Cao nhiệt + thần kinh | Nâng đỡ, chống phù não (mannitol), chống co giật | Áp lực nội sọ, hô hấp | — |
| Dự phòng | Vùng dịch | Vaccin VNNB; diệt chuột, quản lý nguồn nước | — | — |

### YHCT

| Mục tiêu | Pháp trị | Phương pháp | Theo dõi đáp ứng |
| --- | --- | --- | --- |
| Thanh thử tiết nhiệt + hóa thấp | Tùy thể (7 thể KB) | Cổ phương theo thể + gia giảm; châm cứu hỗ trợ | Sốt, rêu lưỡi, mạch, triệu chứng thấp |
| Cứu nguy khí thoát | Ích khí liễm hãn cố thoát | Sinh mạch ẩm, Độc sâm thang | Mạch, HA, mồ hôi |
| Chỉ huyết | Lương huyết chỉ huyết | Gia Tam thất, Vân Nam bạch dược | Lượng xuất huyết |

### Integrated Care Notes
- **Khi nào phối hợp:** đa số ca — YHCT hỗ trợ hạ sốt/hóa thấp/phục hồi; YHHĐ giữ vai trò căn nguyên (kháng sinh, bù dịch).
- **Khi nào ưu tiên chuyển tuyến/cấp cứu:** khạc máu/xuất huyết phổi, hoàng đản nặng + suy gan, suy thận, thần mê co giật, truỵ mạch → KB nhấn "phối hợp Tây y tích cực cấp cứu".
- **Theo dõi tương tác thuốc-dược liệu:** Cam thảo (điện giải), Thạch cao (Ca2+), berberin (thai kỳ), vị hoạt huyết khi đang xuất huyết.
<!-- /dt_chunk -->

<!-- dt_chunk id="disease.thu-thap.safety" type="safety" priority="very_high" -->
## Integrated Safety

| Vấn đề | Mức độ | Liên quan | Khuyến nghị |
| --- | --- | --- | --- |
| Red flags | Cao | Khạc máu, hoàng đản nặng, thần mê co giật, suy thận, truỵ mạch | Cấp cứu Đông-Tây, chuyển tuyến |
| Tiêu chuẩn cấp cứu/chuyển tuyến | Cao | Xuất huyết nặng, suy tạng, rối loạn ý thức | Nhập viện ngay |
| Chống chỉ định YHCT | Trung bình | Hương nhu khi đã hãn xuất nhiệt thoát; hoạt huyết khi đang xuất huyết | Ngưng/điều chỉnh |
| Chống chỉ định YHHĐ | Theo căn nguyên | NSAID khi nghi Lepto xuất huyết/suy thận | Tránh |
| Tương tác thuốc-dược liệu | Trung bình | Cam thảo, Thạch cao, berberin | Theo dõi điện giải, Ca2+ |
| Nguy cơ chảy máu/kháng đông | Cao (thể thương phế lạc/Weil) | Đơn bì, Xích thược, Đương quy | Thận trọng khi đang xuất huyết/chống đông |
| Thai kỳ/cho con bú | Trung bình | Berberin (Hoàng liên/Hoàng bá), thuốc thanh nhiệt mạnh | Cân nhắc, tránh |
| Suy thận/suy gan | Cao | Lepto tổn thương gan-thận | Theo dõi ure/creatinin, men gan |
| Trẻ em/người già | Trung bình | Viêm não Nhật Bản (trẻ), chính khí hư (già) | Giám sát chặt |
| Theo dõi độc tính và đáp ứng | — | CTM, gan, thận, nước tiểu, điện giải | Lập kế hoạch xét nghiệm |

### Mandatory Safety Questions
- Có dấu hiệu cần cấp cứu/chuyển tuyến không? (khạc máu, vàng da nặng, hôn mê, co giật, thiểu niệu)
- Có thai kỳ/cho con bú, trẻ em, người già, suy thận/suy gan không?
- Có dùng kháng đông/kháng kết tập tiểu cầu/NSAID/corticoid không?
- Có vị thuốc/bài thuốc nguy cơ độc tính, chảy máu (hoạt huyết), rối loạn điện giải (Cam thảo) không?
- Cần theo dõi xét nghiệm nào khi phối hợp Đông-Tây? (CTM, gan, thận, nước tiểu, điện giải, huyết thanh Leptospira)
<!-- /dt_chunk -->

## KG Edges

```yaml
kg_edges:
  - id: disease.thu-thap--HAS_SYMPTOM--symptom.than-the-nang-ne
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_SYMPTOM
    object: {type: Symptom, id: than-the-nang-ne, name: "Thân thể nặng nề"}
    properties: {context: "dau an thap", medicine: "yhct"}
    evidence: "thu-thap_001.md muc 1, 5.1"

  - id: disease.thu-thap--HAS_SYMPTOM--symptom.tieu-chay-phan-hoi
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_SYMPTOM
    object: {type: Symptom, id: tieu-chay-phan-hoi, name: "Tiêu chảy phân hôi thế cấp"}
    properties: {context: "ta can nhieu vi truong", medicine: "chung"}
    evidence: "thu-thap_001.md muc 5.2"

  - id: disease.thu-thap--HAS_SYMPTOM--symptom.khac-mau
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_SYMPTOM
    object: {type: Symptom, id: khac-mau, name: "Khạc máu / đàm lẫn máu"}
    properties: {context: "thu thuong phe lac — red flag", medicine: "chung"}
    evidence: "thu-thap_001.md muc 5.5, 6.1"

  - id: disease.thu-thap--HAS_TCM_SYNDROME--tcm_syndrome.thu-thap-tai-ve
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_TCM_SYNDROME
    object: {type: TCM_Syndrome, id: thu-thap-tai-ve, name: "Thử thấp tại vệ"}
    properties: {prevalence_pct: null, stage: "so khoi"}
    evidence: "thu-thap_001.md muc 5.1"

  - id: disease.thu-thap--HAS_TCM_SYNDROME--tcm_syndrome.ta-can-nhieu-vi-truong
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_TCM_SYNDROME
    object: {type: TCM_Syndrome, id: ta-can-nhieu-vi-truong, name: "Tà cán nhiễu vị trường"}
    properties: {prevalence_pct: null, stage: "khi phan trung tieu"}
    evidence: "thu-thap_001.md muc 5.2"

  - id: disease.thu-thap--HAS_TCM_SYNDROME--tcm_syndrome.khon-tro-trung-tieu
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_TCM_SYNDROME
    object: {type: TCM_Syndrome, id: thu-thap-khon-tro-trung-tieu, name: "Thử thấp khôn trở trung tiêu"}
    properties: {prevalence_pct: null, stage: "duong minh nhiet thinh"}
    evidence: "thu-thap_001.md muc 5.3"

  - id: disease.thu-thap--HAS_TCM_SYNDROME--tcm_syndrome.tran-lan-tam-tieu
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_TCM_SYNDROME
    object: {type: TCM_Syndrome, id: thu-thap-tran-lan-tam-tieu, name: "Thử thấp tràn lan tam tiêu"}
    properties: {prevalence_pct: null, stage: "lan tam tieu"}
    evidence: "thu-thap_001.md muc 5.4"

  - id: disease.thu-thap--HAS_TCM_SYNDROME--tcm_syndrome.thu-thuong-phe-lac
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_TCM_SYNDROME
    object: {type: TCM_Syndrome, id: thu-thuong-phe-lac, name: "Thử thương phế lạc"}
    properties: {prevalence_pct: null, stage: "hoa hoa nhap huyet — nang"}
    evidence: "thu-thap_001.md muc 5.5"

  - id: disease.thu-thap--HAS_TCM_SYNDROME--tcm_syndrome.thu-thap-thuong-khi
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_TCM_SYNDROME
    object: {type: TCM_Syndrome, id: thu-thap-thuong-khi, name: "Thử thấp thương khí"}
    properties: {prevalence_pct: null, stage: "chuyen hu"}
    evidence: "thu-thap_001.md muc 5.6"

  - id: disease.thu-thap--HAS_TCM_SYNDROME--tcm_syndrome.thu-thap-du-ta
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_TCM_SYNDROME
    object: {type: TCM_Syndrome, id: thu-thap-du-ta, name: "Thử thấp dư tà chưa sạch"}
    properties: {prevalence_pct: null, stage: "hau ky"}
    evidence: "thu-thap_001.md muc 5.7"

  - id: tcm_syndrome.thu-thap-tai-ve--TREATED_BY_FORMULA--formula.tan-gia-huong-nhu-am
    subject: {type: TCM_Syndrome, id: thu-thap-tai-ve, name: "Thử thấp tại vệ"}
    predicate: TREATED_BY_FORMULA
    object: {type: TCM_Herbal_Formula, id: tan-gia-huong-nhu-am, name: "Tân gia hương nhu ẩm"}
    properties: {treatment_principle: "Thau ta dat bieu, dich thu hoa thap"}
    evidence: "thu-thap_001.md muc 5.1.4"

  - id: tcm_syndrome.ta-can-nhieu-vi-truong--TREATED_BY_FORMULA--formula.linh-que-cam-lo-am
    subject: {type: TCM_Syndrome, id: ta-can-nhieu-vi-truong, name: "Tà cán nhiễu vị trường"}
    predicate: TREATED_BY_FORMULA
    object: {type: TCM_Herbal_Formula, id: linh-que-cam-lo-am, name: "Linh quế cam lộ ẩm"}
    properties: {treatment_principle: "Thanh giai thu nhiet, hoa khi loi thap"}
    evidence: "thu-thap_001.md muc 5.2.4"

  - id: tcm_syndrome.khon-tro-trung-tieu--TREATED_BY_FORMULA--formula.thuong-truat-bach-ho-thang
    subject: {type: TCM_Syndrome, id: thu-thap-khon-tro-trung-tieu, name: "Thử thấp khôn trở trung tiêu"}
    predicate: TREATED_BY_FORMULA
    object: {type: TCM_Herbal_Formula, id: thuong-truat-bach-ho-thang, name: "Thương truật bạch hổ thang gia giảm"}
    properties: {treatment_principle: "Thanh thu hoa thap"}
    evidence: "thu-thap_001.md muc 5.3.4"

  - id: tcm_syndrome.tran-lan-tam-tieu--TREATED_BY_FORMULA--formula.tam-thach-thang
    subject: {type: TCM_Syndrome, id: thu-thap-tran-lan-tam-tieu, name: "Thử thấp tràn lan tam tiêu"}
    predicate: TREATED_BY_FORMULA
    object: {type: TCM_Herbal_Formula, id: tam-thach-thang, name: "Tam thạch thang"}
    properties: {treatment_principle: "Thanh nhiet loi thap, tuyen thong tam tieu"}
    evidence: "thu-thap_001.md muc 5.4.4"

  - id: tcm_syndrome.thu-thuong-phe-lac--TREATED_BY_FORMULA--formula.te-giac-dia-hoang-hop-hoang-lien-giai-doc
    subject: {type: TCM_Syndrome, id: thu-thuong-phe-lac, name: "Thử thương phế lạc"}
    predicate: TREATED_BY_FORMULA
    object: {type: TCM_Herbal_Formula, id: te-giac-dia-hoang-hop-hoang-lien-giai-doc, name: "Tê giác địa hoàng thang hợp Hoàng liên giải độc thang"}
    properties: {treatment_principle: "Luong huyet an lac, thanh thu bao phe", note: "thuy nguu giac thay te giac"}
    evidence: "thu-thap_001.md muc 5.5.4"

  - id: tcm_syndrome.thu-thap-thuong-khi--TREATED_BY_FORMULA--formula.dong-hang-thanh-thu-ich-khi-thang
    subject: {type: TCM_Syndrome, id: thu-thap-thuong-khi, name: "Thử thấp thương khí"}
    predicate: TREATED_BY_FORMULA
    object: {type: TCM_Herbal_Formula, id: dong-hang-thanh-thu-ich-khi-thang, name: "Đông Hằng thanh thử ích khí thang"}
    properties: {treatment_principle: "Thanh thu hoa thap, boi nguyen hoa trung", note: "Ly Dong Hang — khac bai Vuong Manh Anh"}
    evidence: "thu-thap_001.md muc 5.6.4"

  - id: tcm_syndrome.thu-thap-du-ta--TREATED_BY_FORMULA--formula.thanh-lac-am
    subject: {type: TCM_Syndrome, id: thu-thap-du-ta, name: "Thử thấp dư tà chưa sạch"}
    predicate: TREATED_BY_FORMULA
    object: {type: TCM_Herbal_Formula, id: thanh-lac-am, name: "Thanh lạc ẩm"}
    properties: {treatment_principle: "Thanh hoa thu thap du ta"}
    evidence: "thu-thap_001.md muc 5.7.4"

  - id: disease.thu-thap--HAS_COMPLICATION--complication.hoang-dan
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_COMPLICATION
    object: {type: Complication, id: hoang-dan, name: "Hoàng đản (thử thấp uất kết, độc nhập can)"}
    properties: {severity: "nang"}
    evidence: "thu-thap_001.md muc 6.2"

  - id: disease.thu-thap--HAS_COMPLICATION--complication.xuat-huyet
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_COMPLICATION
    object: {type: Complication, id: xuat-huyet, name: "Xuất huyết (máu cam, tiểu/tiện máu, khạc máu)"}
    properties: {severity: "nang", note: "khi tuy huyet thoat → Sinh mach am/Doc sam thang"}
    evidence: "thu-thap_001.md muc 6.1"

  - id: disease.thu-thap--DIAGNOSED_BY--diagnostictest.huyet-thanh-leptospira
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: DIAGNOSED_BY
    object: {type: DiagnosticTest, id: huyet-thanh-leptospira, name: "Huyết thanh MAT / PCR Leptospira"}
    properties: {purpose: "confirm", note: "tuong ung benh xoan khuan"}
    evidence: "thu-thap_001.md muc 3"

  - id: disease.thu-thap--HAS_RISK_FACTOR--risk_factor.tiep-xuc-nuoc-o-nhiem
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_RISK_FACTOR
    object: {type: RiskFactor, id: tiep-xuc-nuoc-o-nhiem, name: "Tiếp xúc nguồn nước/bùn ô nhiễm (chuột đồng, heo)"}
    properties: {context: "dich te Leptospirosis"}
    evidence: "thu-thap_001.md muc 7.1"

  - id: disease.thu-thap--HAS_RISK_FACTOR--risk_factor.ty-vi-hu-nhuoc
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_RISK_FACTOR
    object: {type: RiskFactor, id: ty-vi-hu-nhuoc, name: "Tỳ vị hư nhược, nguyên khí bất túc; ăn lạnh, lao quyện, dầm mưa"}
    properties: {context: "noi nhan YHCT"}
    evidence: "thu-thap_001.md muc 2"

  - id: disease.thu-thap--HAS_RED_FLAG--red_flag.khac-mau-xuat-huyet-phoi
    subject: {type: Disease, id: thu-thap, name: "Thử thấp"}
    predicate: HAS_RED_FLAG
    object: {type: RedFlag, id: khac-mau-xuat-huyet-phoi, name: "Khạc máu / xuất huyết phổi"}
    properties: {urgency: "cap cuu", action: "nam yen tuyet doi, phoi Dong-Tay cap cuu"}
    evidence: "thu-thap_001.md muc 5.5, 6.1"
```
