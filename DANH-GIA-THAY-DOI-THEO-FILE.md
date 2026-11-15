# Đánh giá: các thay đổi trong file kịch bản có hợp lệ không?

Ngày: 15/11/2026. Nhánh: `test/kich-ban-exp7`.

Nguồn: Google Docs "# Kịch bản thí nghiệm chi tiết: Hình thành cây con từ hạt, rễ, thân và lá (hỗ trợ 1-4 chậu)", 3 tab.

| Tab | Thí nghiệm | Kết luận ngắn |
|---|---|---|
| Tab 1 | 6, cây con từ hạt, rễ, thân, lá | Hợp lệ về nội dung. Thay đổi lớn nhất (cho làm 1 đến 4 chậu) làm được, nhưng file còn thiếu 3 quy tắc, cần bạn quyết định trước |
| Tab 2 | 8, heo | Một phần KHÔNG hợp lệ: vài thông tin về heo bị chép từ mèo, sai với heo thật. Phần còn lại trang web đã làm đúng |
| Tab 3 | 7, bướm | Hợp lệ. Các khác biệt nhỏ, chủ yếu là chọn cách nào cũng được (chi tiết trong `KIEM-TRA-KICH-BAN-EXP7.md`) |

Tôi xét mỗi thay đổi theo 4 câu hỏi: có đúng khoa học không, có trái với tài liệu chính `THÍ NGHIỆM 1909.md` không, file có tự mâu thuẫn không, và làm có khó không. Tôi chưa sửa gì trong chương trình.

Cả Tab 1 và Tab 2 đều kết thúc bằng câu "Nếu bạn muốn, tôi có thể tiếp tục ...". Đây là câu thừa do trợ lý AI viết ra, không phải nội dung thí nghiệm.

## Tab 1, Thí nghiệm 6

Những phần trang web đã làm giống file: thứ tự đặt chậu, đặt mẫu, tưới nước, nút bắt đầu, các mốc Ngày 0, 2, 4, 7, 14, nhấp vào chậu để phóng to, kính phóng đại chỉ để xem, phân loại 4 thẻ, cây lớn lên, hộp thoại "Em có chắc muốn làm lại thí nghiệm không?" với hai nút HỦY và LÀM LẠI.

| # | Thay đổi | Hợp lệ? | Ghi chú |
|---|---|---|---|
| 1.1 | Cho làm 1, 2, 3 hoặc 4 chậu, không bắt buộc đủ 4 | Hợp lệ, cần quyết định thêm | Đúng khoa học. Trái với tài liệu chính, vì tài liệu chính bắt buộc đủ 4 chậu (dòng 9273, 9464, 9568, 9598). Việc khá lớn: luật chơi, lời nhắc, phân loại, bảng so sánh, kết luận và sơ đồ cuối đều đang tính sẵn 4 chậu |
| 1.2 | Thông báo "Đã cung cấp nước cho Chậu [số]." | Hợp lệ | Hiện là "Đã cung cấp nước." Sửa nhỏ |
| 1.3 | Tưới chậu trống thì báo "Hãy tưới nước cho chậu có cây." | Hợp lệ | Hiện là "Hãy tưới nước vào chậu cây." Sửa nhỏ |
| 1.4 | "Cây con được hình thành từ lá cây thuốc bỏng." | Hợp lệ | Hiện là "... từ lá." Sửa nhỏ |
| 1.5 | Khay không có "Đất trồng" | Hợp lệ | Tài liệu chính có món này (dòng 9035). Bỏ đi thì khay gọn hơn |
| 1.6 | Thanh tiến trình cho "tua theo từng giai đoạn đã mở" | Hợp lệ, chưa rõ nghĩa | Hiện thanh tiến trình chỉ để xem, không nhấp được. Cần nói rõ: nhấp vào một bước thì xem lại bước đó, hay tua thời gian đến bước đó? |

Ba chỗ file còn thiếu nếu làm 1.1:

1. Đã bấm BẮT ĐẦU QUAN SÁT rồi, học sinh có được đặt thêm chậu không? Mục 6 viết chậu chưa xong "sẽ không tham gia tua nhanh cho đến khi chuẩn bị xong", nghĩa là có lần tua nhanh thứ hai, nhưng file không tả lần này.
2. Khi phân loại mà chỉ có 2 chậu: vẫn hiện đủ 4 thẻ và 4 hình cây (mục 9 viết như vậy), hay chỉ hiện 2?
3. Kết luận khi làm thiếu chậu dùng câu nào? File chỉ có câu chung cho cả 4 bộ phận.

Đề nghị: nếu bạn muốn làm 1.1, hãy trả lời 3 câu trên trước. 1.2, 1.3, 1.4 sửa ngay được.

## Tab 2, Thí nghiệm 8 (heo)

Tab 2 giống bản mèo trong tài liệu chính, chỉ đổi chữ "mèo" thành "heo". Vì vậy nó mang theo cả những đặc điểm chỉ đúng với mèo. Ngày 10/11/2026, khi đổi mèo sang heo, trang web đã sửa những chỗ này cho đúng với heo (ghi trong `SPEC-NOTES.md`, bảng "Asked later").

| # | Thay đổi | Hợp lệ? | Ghi chú |
|---|---|---|---|
| 2.1 | Heo con sơ sinh "mắt chưa mở" | KHÔNG | Heo con mới sinh đã mở mắt và đứng được ngay. Mèo con mới sinh mới nhắm mắt. Trang web đang ghi "mắt đã mở", nên giữ |
| 2.2 | Lúc heo con lớn dần có "mắt mở" | KHÔNG | Cùng lý do với 2.1 |
| 2.3 | Phôi từ Ngày 0 đến 45, thai Ngày 45 → 60 → gần ngày sinh | KHÔNG đúng với heo | Đây là số của mèo. Heo mang thai khoảng 114 ngày, phôi thành thai vào khoảng ngày 30. Trang web đang dùng Ngày 0, 10, 20, 30 và Ngày 30, 70, gần ngày sinh, nên giữ |
| 2.4 | Kính phóng đại "chỉ quan sát, không thay đổi tiến trình" | File tự mâu thuẫn | Bảng khóa/mở của chính Tab 2 lại ghi "Hợp tử: quan sát hợp tử với kính phóng đại → mở bước phôi". Trang web làm theo bảng này và theo tài liệu chính. Nên giữ |
| 2.5 | Khay có thêm tinh trùng, trứng, hợp tử, phôi, thai, heo con | Hợp lệ nhưng ít lợi ích | Trang web cho các thứ này hiện ra ở đúng giai đoạn. Đưa chúng vào khay từ đầu sẽ làm lộ trước các bước sau |
| 2.6 | Thanh thời gian: "kéo thanh hoặc chọn mốc ngày" | Hợp lệ | Hiện chỉ nhấp vào mốc được. Thêm kéo thanh là việc nhỏ |
| 2.7 | Thanh tiến trình chỉ cho đến những bước đã mở | Hợp lệ, chưa rõ nghĩa | Giống 1.6 |

Phần còn lại của Tab 2 trang web đã làm đúng: lời báo khi đặt heo, nút BẮT ĐẦU QUAN SÁT SỰ SINH SẢN VÀ VÒNG ĐỜI, xác định heo đực và heo cái ("Heo đực tạo ra tế bào sinh dục đực."), kéo tinh trùng và trứng, thụ tinh, hợp tử, nhấp vào các bộ phận của thai, các mốc 1 tuần, 2 tuần, 1 tháng, 2 tháng và 2 tháng, 6 tháng, 1 năm, 8 thẻ sắp xếp, kết luận, nút làm lại.

Đề nghị: không áp dụng 2.1, 2.2, 2.3. Nên báo lại người soạn file để sửa thông tin về heo.

Lưu ý: số ngày mang thai và việc heo con mở mắt lúc mới sinh là kiến thức sinh học phổ biến. Lần này tôi chưa đối chiếu lại với sách hay trang web nào.

## Tab 3, Thí nghiệm 7 (bướm)

Xem chi tiết trong `KIEM-TRA-KICH-BAN-EXP7.md` (từ K1 đến K7). Đánh giá tính hợp lệ:

- K1, K2 (bỏ kính lúp, hoặc cho kính lúp không bắt buộc): hợp lệ, nhưng trái với tài liệu chính. Nếu bỏ hẳn kính lúp như khay của Tab 3 thì mất luôn bước "ĐÃ QUAN SÁT TRỨNG ✓" và "ĐÃ QUAN SÁT NHỘNG ✓".
- K3 ("Toàn bộ cơ thể bên trong biến đổi thành bướm."): hợp lệ. Câu này đơn giản hóa, nhưng hợp với học sinh tiểu học.
- K4 (bỏ bước nhấp 4 chấm trong nhộng): hợp lệ, làm cho thí nghiệm ngắn hơn.
- K5 (câu ngắn hơn khi bướm thoát khỏi nhộng): hợp lệ.
- K6 (bướm hút mật hoa): hợp lệ, nhưng phải thêm hoa vào cây trong cảnh 3D, cây hiện chưa có hoa.
- K7 (câu cảnh báo chung): hợp lệ.
- Lỗi chữ trong file: bảng mục 4 viết "Sâu non bú lá". Đúng ra là "ăn lá".

## Tóm lại

- Không nên áp dụng: 2.1, 2.2, 2.3 (sai với heo thật).
- Sửa ngay được nếu bạn đồng ý: 1.2, 1.3, 1.4, K3, K5, K7.
- Cần bạn trả lời thêm trước khi làm: 1.1 (3 câu hỏi ở trên), 1.6 và 2.7 (thanh tiến trình nhấp được để làm gì).
- Chọn cách nào cũng được, tùy bạn: 1.5, 2.5, 2.6, K1, K2, K4, K6.
