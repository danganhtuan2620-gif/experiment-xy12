# Kiểm tra kịch bản Thí nghiệm 7 (bướm) theo file Word

Ngày kiểm tra: 15/11/2026. Nhánh: `test/kich-ban-exp7`.

File được kiểm tra: `D:\Download\# Kịch bản thí nghiệm chi tiết_ Hình thành cây con từ hạt, rễ, thân và lá (hỗ trợ 1-4 chậu).docx`

Lưu ý: tên file nói về "hình thành cây con từ hạt, rễ, thân và lá" (Thí nghiệm 6), nhưng nội dung bên trong là vòng đời của bướm (Thí nghiệm 7). Vì vậy tôi kiểm tra theo Thí nghiệm 7. Nếu bạn muốn kiểm tra Thí nghiệm 6, cần gửi lại đúng file.

## Kết quả ngắn

Trang web chạy đúng toàn bộ trình tự trong file Word, từ đặt hai con bướm đến sắp xếp 4 thẻ. Có 1 chỗ ghi chú của dự án viết sai so với chương trình, và 7 chỗ file Word khác với trang web. Tôi chưa sửa chỗ nào trong chương trình, chờ bạn quyết định.

## Cách kiểm tra

1. Test tự động mới `tests/kich-ban-exp7.test.js`: 13 test, mỗi test ứng với một mục của file Word (1, 2.1 đến 2.10, 3, 4, 5). Cả 13 test đều đạt. Toàn bộ bộ test của dự án: 129 test, tất cả đều đạt.
2. Mở trang trong trình duyệt (máy chủ thử, khung 800x600), cho chạy tự động cả thí nghiệm đến màn hình "HOÀN THÀNH THÍ NGHIỆM". Không có lỗi trong bảng điều khiển trình duyệt.
3. Bấm làm lại hai lần: thanh tiến trình về bước 1, số vật thể còn lại sau hai lần làm lại giống hệt nhau.

Chưa kiểm tra: kéo thả bằng tay thật, mở `index.html` trực tiếp từ ổ đĩa, điện thoại và máy tính bảng, âm thanh.

## Những mục khớp với file Word

| Mục | Nội dung | Kết quả |
|---|---|---|
| 1 | Thanh tiến trình 8 bước, sáng dần | Khớp |
| 2.1 | Đặt bướm đực và bướm cái, sai thì quay lại khay, chưa đủ hai con thì chưa giao phối | Khớp |
| 2.2 | Kéo bướm đực đến gần bướm cái, có hiệu ứng và thông báo | Khớp |
| 2.3 | Màn thụ tinh, nhãn TRỨNG ĐÃ THỤ TINH, nút ▶ TIẾP TỤC | Khớp |
| 2.4 | Kéo bướm cái lên lá, đặt sai thì có cảnh báo, chỉ đặt đúng mới có trứng | Khớp |
| 2.5 | Ngày 0, 3, 7, trứng sẫm màu rồi nứt, nút ▶ CHUYỂN SANG GIAI ĐOẠN NỞ | Khớp (xem K2) |
| 2.6 | Cho sâu ăn lá mới lớn, lột xác 3 lần, thước đo tăng dần (3, 8, 16, 28, 42 mm) | Khớp |
| 2.7 | Sâu treo hình chữ J, hóa nhộng ngày 14, thông báo "Sâu non đã hóa thành nhộng." | Khớp |
| 2.8 | Nút [ MẶT CẮT 3D ], xem xong mới mở tua nhanh vũ hóa | Khớp (xem K3, K4) |
| 2.9, 2.10 | Vũ hóa, cánh nhăn rồi giương rộng, bay đi | Khớp (xem K5, K6) |
| 3 | 4 thẻ, sai thì trả lại và có gợi ý, đúng thì sáng, có ✓ và "Chính xác!" | Khớp |
| 4 | Bảng khóa/mở: không bỏ qua được bước nào | Khớp (xem K2) |
| 5 | Kéo sai thì quay về chỗ cũ, nhấp sai chỉ nhắc nhở, nút LÀM LẠI THÍ NGHIỆM luôn bật | Khớp |

## Chỗ ghi chú dự án viết sai

B1. Thanh tiến trình, bước cuối "BƯỚM TRƯỞNG THÀNH". Chương trình cho bước này sáng ngay khi bướm vừa vũ hóa (hai bước cuối sáng cùng lúc). File `SPEC-NOTES.md` lại ghi bước này sáng khi xếp đúng 4 thẻ. File Word (bảng mục 4: "Bướm trưởng thành: kết thúc vũ hóa") đồng ý với chương trình. Đề nghị: sửa câu trong `SPEC-NOTES.md`, không sửa chương trình.

## Chỗ file Word khác với trang web

Trang web làm theo tài liệu chính `THÍ NGHIỆM 1909.md`. Các chỗ dưới đây là nơi file Word nói khác.

K1. Khay dụng cụ. File Word có 4 món: bướm đực, bướm cái, lá cây tươi, thước đo. Trang web có thêm KÍNH LÚP (tài liệu chính, mục 5.3).

K2. Kính lúp có bắt buộc không. File Word (mục 5) nói kính phóng đại và thước đo "chỉ để quan sát, không thay đổi tiến trình", và bảng mục 4 nói có trứng là mở nút nở. Trên trang web, thước đo đúng là tùy chọn, nhưng kính lúp là bắt buộc hai lần: phải soi cụm trứng thì nút ▶ CHUYỂN SANG GIAI ĐOẠN NỞ mới mở, và phải soi nhộng thì nút [ MẶT CẮT 3D ] mới mở (tài liệu chính có dấu "ĐÃ QUAN SÁT TRỨNG ✓" và "ĐÃ QUAN SÁT NHỘNG ✓").

K3. Thông báo ở mục 2.8. File Word: "Toàn bộ cơ thể bên trong biến đổi thành bướm." Trang web: "Bên ngoài nhộng bất động, nhưng bên trong cơ thể đang tiếp tục biến đổi." Câu của file Word không có trong tài liệu chính.

K4. Mặt cắt nhộng. File Word chỉ yêu cầu xem mặt cắt. Trang web yêu cầu thêm nhấp vào 4 chấm sáng (cánh, mắt kép, chân khớp, vòi hút) rồi mới mở tua nhanh vũ hóa.

K5. Thông báo ở mục 2.9. File Word: "Bướm thoát khỏi vỏ nhộng, giương cánh khô ráo, sẵn sàng bay." Trang web: "Bướm thoát khỏi vỏ nhộng, giương rộng đôi cánh khô ráo và có thể bay đi hút mật, bắt đầu vòng đời mới." Ý giống nhau, chữ khác.

K6. Mục 2.10 nói bướm "có thể bay và hút mật hoa". Trên trang web bướm bay lên cành rồi đậu. Tôi không thấy cảnh bướm hút mật hoa.

K7. Mục 2.1, cảnh báo khi đặt sai. File Word: "Hãy đặt bướm vào khu vực quan sát." Trang web nói rõ từng con: "Hãy đặt bướm đực vào khu vực quan sát." hoặc "Hãy đặt bướm cái vào khu vực quan sát." Câu chung của file Word vẫn hiện ở đầu bước làm lời nhắc việc.

Ngoài ra có một chỗ nhỏ: ở mục 2.2 file Word nói "biểu tượng nối hai bộ phận sinh sản". Trang web hiện nhãn GIAO PHỐI và một biểu tượng trái tim giữa hai con bướm.

## Cần bạn quyết định

1. Có làm theo file Word ở các điểm K1 đến K7 không, hay giữ như trang web (theo tài liệu chính)?
2. File Word này có phải là bản dành cho Thí nghiệm 6 bị gắn nhầm nội dung không?
