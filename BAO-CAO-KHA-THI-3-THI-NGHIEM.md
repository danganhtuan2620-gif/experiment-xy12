# Báo cáo: thay đổi 3 thí nghiệm theo file kịch bản có làm được không?

Ngày: 15/11/2026. Nhánh: `test/kich-ban-3-thi-nghiem`. Chưa sửa code.

## Nguồn đã đọc

- File Word `D:\Download\# Kịch bản ... (hỗ trợ 1-4 chậu) (1).docx`. Nội dung giống hệt file tải lúc 18:51 và chỉ có Thí nghiệm 7 (bướm). Google Docs chỉ xuất tab đang mở ra file Word.
- Bản gốc trên Google Docs (cùng tên, 3 tab: Thí nghiệm 6, 8, 7), sửa lần cuối lúc 19:13 hôm nay. Tôi đọc bản này để có đủ 3 thí nghiệm.
- So với lần kiểm tra trước (`DANH-GIA-THAY-DOI-THEO-FILE.md`): Tab 1 có thêm câu trả lời cho 2 trong 3 câu hỏi. Tab 2 và Tab 3 không đổi.

## Kết luận ngắn

| Thí nghiệm | Khả thi? | Khối lượng | Nên làm? |
|---|---|---|---|
| 6 (cây con, 1 đến 4 chậu) | Khả thi | Vừa: chỉ sửa các file của Thí nghiệm 6 | Nên, sau khi bạn trả lời 2 câu hỏi ở dưới |
| 8 (heo) | Về kỹ thuật làm được | Nhỏ | Không nên làm 3 điểm chính, vì sai với heo thật |
| 7 (bướm) | Khả thi | Nhỏ đến vừa | Tùy bạn chọn từng điểm |

Không thay đổi nào cần sửa các thí nghiệm khác hay phần dùng chung (`js/core`, `js/three`).

## Thí nghiệm 6: cho làm 1 đến 4 chậu

### File Google Docs đã bổ sung

- Mục 4: có thể chỉ đặt vật mẫu cho một số chậu.
- Mục 9: nếu chỉ có 2 chậu thì chỉ cần kéo 2 thẻ.
- Mục 11: làm 1, 2 hoặc 3 chậu thì có kết luận tương ứng, câu chung vẫn là "Cây con có thể được hình thành từ hạt, rễ, thân hoặc lá..."

### Hiện trang web làm thế nào

Mã luật chơi (`js/logic/exp6.js`) bắt buộc làm theo lượt cho cả 4 chậu: đặt đủ 4 chậu, rồi đủ 4 vật mẫu, rồi tưới đủ 4 chậu, rồi mới bấm BẮT ĐẦU. Phân loại cũng đòi đủ 4 thẻ. Bảng so sánh, sơ đồ và kết luận cuối bài luôn in đủ 4 dòng.

### Phải sửa gì

1. `js/logic/exp6.js`: xét từng chậu riêng (chậu có vật mẫu và đã tưới là "sẵn sàng"). Nút BẮT ĐẦU mở khi có ít nhất 1 chậu sẵn sàng. Phân loại xong khi các chậu đã trồng đều có thẻ đúng. Thanh tiến trình và lời nhắc tính theo số chậu đã dùng.
2. `tests/exp6.test.js`: viết lại khoảng 5 trong 9 bài kiểm tra, thêm bài cho trường hợp 1, 2, 3 chậu.
3. `js/experiments/exp6.js` và `exp6-lapse.js`: chỉ cây ở chậu sẵn sàng mới lớn khi tua nhanh, chỉ hiện thẻ của chậu đã trồng, bảng so sánh, sơ đồ và kết quả chỉ in các chậu đã làm.
4. `js/content/exp6.vi.js`: thêm nhóm câu riêng cho các câu mới của file ("Đã cung cấp nước cho Chậu [số].", "Hãy tưới nước cho chậu có cây.", "...từ lá cây thuốc bỏng.", câu kết luận). Làm theo cách đã dùng ở Thí nghiệm 2 và 8, nên bài kiểm tra câu chữ của tài liệu chính vẫn chạy.
5. `HUONG-DAN.txt` và `SPEC-NOTES.md`: ghi lại thay đổi, vì nó trái với tài liệu chính (tài liệu chính bắt buộc đủ 4 chậu).

Mô hình 3D không phải làm mới. Mỗi chậu đã có điều khiển riêng để lớn lên (`setLife` trong `js/models/sprouts.js`), nên chỉ cần gọi cho đúng chậu.

### Còn 2 chỗ file chưa nói rõ, cần bạn chọn

1. Đã bấm BẮT ĐẦU rồi, có được đặt thêm chậu không? Mục 6 viết chậu chưa xong "sẽ không tham gia tua nhanh cho đến khi chuẩn bị xong", nghe như có lần tua thứ hai, nhưng file không tả lần đó.
   Đề nghị: khi đã bấm BẮT ĐẦU thì khóa bàn. Chậu chưa xong đứng yên. Muốn làm thêm chậu thì bấm LÀM LẠI. Cách này đơn giản, ít lỗi. Làm lần tua thứ hai thì mất thêm khá nhiều công và học sinh dễ rối.
2. Lúc phân loại có hiện thẻ của chậu không trồng không? Mục 9 vừa nói "hiển thị 4 thẻ" và "4 hình cây", vừa nói "chỉ cần kéo 2 thẻ".
   Đề nghị: chỉ hiện thẻ của các chậu đã trồng. Nếu hiện đủ 4 thẻ, học sinh sẽ không có chỗ đặt 2 thẻ thừa.

### Các điểm nhỏ khác của Tab 1

- Khay không có "Đất trồng": bỏ được, việc nhỏ.
- "Thanh tiến trình cho phép tua theo từng giai đoạn đã mở": chưa rõ nghĩa (bấm vào để xem lại, hay để tua đến?). Đề nghị để sau, không làm lần này.

## Thí nghiệm 8: heo

Tab 2 không đổi so với lần trước. Kết luận vẫn giữ:

- Không nên áp dụng: heo con sơ sinh "mắt chưa mở", "mắt mở" lúc lớn dần, và các mốc Ngày 0 đến 45, thai Ngày 45 → 60. Đây là đặc điểm và số ngày của mèo. Heo con sinh ra đã mở mắt, heo mang thai khoảng 114 ngày. Trang web hiện đang ghi đúng với heo. (Tôi chưa đối chiếu lại với sách, đây là kiến thức phổ biến.)
- Tab 2 tự mâu thuẫn về kính phóng đại: chỗ thì nói "không thay đổi tiến trình", bảng khóa/mở lại nói phải soi hợp tử mới mở bước phôi. Trang web làm theo bảng, nên giữ.
- Làm được, việc nhỏ, nếu bạn muốn: kéo thanh thời gian (hiện chỉ bấm vào mốc ngày).
  Sửa lại sau khi kiểm tra code: thanh kéo đã có từ khi làm Thí nghiệm 8. Câu "hiện chỉ bấm vào mốc ngày" ở trên là sai. Khi làm, tôi chỉ sửa một lỗi của thanh kéo (kéo quá mốc còn khóa thì thanh nhảy về mốc cũ).
- Không nên: đưa tinh trùng, trứng, hợp tử, phôi, thai, heo con vào khay từ đầu, vì lộ trước các bước sau.

## Thí nghiệm 7: bướm

Tab 3 không đổi. Chi tiết ở `KIEM-TRA-KICH-BAN-EXP7.md` (K1 đến K7). Tất cả đều làm được:

- Việc nhỏ (chỉ đổi câu chữ): K3 (câu về nhộng), K5 (câu khi bướm ra khỏi nhộng), K7 (câu cảnh báo chung).
- Việc vừa: K1, K2 (bỏ kính lúp, hoặc cho kính lúp không bắt buộc), K4 (bỏ bước nhấp 4 chấm trong nhộng). Bỏ kính lúp thì mất hai dấu "ĐÃ QUAN SÁT TRỨNG ✓" và "ĐÃ QUAN SÁT NHỘNG ✓" của tài liệu chính.
- Việc lớn nhất: K6 (bướm hút mật hoa), phải thêm hoa vào cây trong cảnh 3D.
- Lỗi chữ trong file: "Sâu non bú lá" nên là "ăn lá".

## Thứ tự đề nghị nếu bạn đồng ý

1. Thí nghiệm 6, sau khi bạn trả lời 2 câu hỏi ở trên.
2. Các câu chữ nhỏ của Thí nghiệm 7 (K3, K5, K7).
3. Các điểm còn lại của Thí nghiệm 7 và thanh thời gian kéo được của Thí nghiệm 8, nếu bạn muốn.

Cả 3 việc đều chỉ đụng file của thí nghiệm đó, nên làm riêng từng cái được, thí nghiệm khác không bị ảnh hưởng.
