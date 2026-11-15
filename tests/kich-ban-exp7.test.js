/* Kiểm tra Thí nghiệm 7 theo file Word của người dùng
   "# Kịch bản thí nghiệm chi tiết_ Hình thành cây con từ hạt, rễ, thân và lá (hỗ trợ 1-4 chậu).docx".
   Tên file nói về cây con (Thí nghiệm 6), nhưng nội dung là vòng đời của bướm (Thí nghiệm 7).
   Mỗi test ứng với một mục của file Word (2.1 … 2.10, 3, 4, 5). Những chỗ file Word khác với trang web
   được ghi trong KIEM-TRA-KICH-BAN-EXP7.md, không có test ở đây. */
const test = require('node:test');
const assert = require('node:assert');
const L = require('../js/logic/exp7.js');

global.window = { Lab: { content: {} } };
require('../js/content/exp7.vi.js');
const MD = global.window.Lab.content.exp7.md;

const STEPS = ['BƯỚM ĐỰC + BƯỚM CÁI', 'GIAO PHỐI', 'THỤ TINH', 'BƯỚM CÁI ĐẺ TRỨNG', 'TRỨNG', 'SÂU NON', 'NHỘNG', 'BƯỚM TRƯỞNG THÀNH'];

/* chơi từ đầu đến bước `upTo`, đúng như học sinh làm trên trang web */
function play(upTo) {
  const s = L.initialState(), order = ['place', 'mate', 'fert', 'cont', 'lay', 'lensEggs', 'hatch', 'feed', 'grow', 'pupa', 'lensPupa', 'cut', 'parts', 'emerge', 'sort'];
  const run = {
    place: () => { L.applyButterfly(s, L.decideButterfly(s, 'male', 'area').action); L.applyButterfly(s, L.decideButterfly(s, 'female', 'area').action); },
    mate: () => { assert.ok(L.decideMating(s, true).ok); L.applyMating(s); },
    fert: () => assert.ok(L.applyFertilization(s)),
    cont: () => assert.ok(L.applyContinue(s)),
    lay: () => { assert.strictEqual(L.decideButterfly(s, 'female', 'leaf').action, 'layEggs'); L.applyButterfly(s, 'layEggs'); },
    lensEggs: () => L.applyLens(s, L.decideLens(s, 'eggs').action),
    hatch: () => { assert.ok(L.startHatching(s)); L.arriveDay(s, 3); L.arriveDay(s, 7); },
    feed: () => { assert.ok(L.decideLeaf(s, true).ok); L.applyFeed(s); },
    grow: () => { for (let i = 0; i < 3; i++) assert.ok(L.applyMolt(s)); assert.ok(L.applyGrown(s)); },
    pupa: () => assert.ok(L.applyPupation(s)),
    lensPupa: () => { L.applyLens(s, L.decideLens(s, 'pupa').action); L.arriveDay(s, 18); },
    cut: () => { assert.ok(L.openCutaway(s)); assert.ok(L.observeCutaway(s)); },
    parts: () => L.PARTS.forEach((p) => L.applyPart(s, p)),
    emerge: () => { assert.ok(L.startMetamorphosis(s)); assert.ok(L.applyAdult(s)); },
    sort: () => [0, 1, 2, 3].forEach((c) => L.applySort(s, c))
  };
  for (const k of order) { run[k](); if (k === upTo) break; }
  return s;
}

test('1. Thanh tiến trình có đúng 8 bước theo file Word và sáng dần từng bước', () => {
  assert.deepStrictEqual(MD.steps, STEPS);
  const lit = (s) => L.stepStates(s).filter((x) => x === 'done').length;
  assert.strictEqual(lit(L.initialState()), 0);
  const seq = ['place', 'mate', 'fert', 'lay', 'hatch', 'pupa', 'emerge', 'sort'].map((k) => lit(play(k)));
  assert.deepStrictEqual(seq.slice(0, 6), [1, 2, 3, 4, 5, 6]);
  for (let i = 1; i < seq.length; i++) assert.ok(seq[i] >= seq[i - 1], 'thanh không được tắt bớt: ' + seq.join(', '));
  assert.strictEqual(seq[7], 8);
  /* Ghi chú: khi bướm vừa vũ hóa, hai bước cuối sáng cùng lúc (8, không phải 7).
     SPEC-NOTES.md lại ghi bước BƯỚM TRƯỞNG THÀNH sáng khi xếp đúng 4 thẻ. Xem KIEM-TRA-KICH-BAN-EXP7.md, mục B1. */
  assert.strictEqual(seq[6], 8);
});

test('2.1 Đặt bướm: đặt sai thì quay lại khay và có cảnh báo; chưa đủ hai con thì chưa giao phối được', () => {
  const s = L.initialState();
  assert.strictEqual(L.decideButterfly(s, 'male', null).ok, false);
  assert.match(MD.msg[L.decideButterfly(s, 'male', null).msg], /vào khu vực quan sát\.$/);
  assert.strictEqual(MD.msg.placeTask, 'Hãy đặt bướm vào khu vực quan sát.');
  L.applyButterfly(s, 'placeMale');
  assert.strictEqual(L.decideMating(s, true).ok, false);
  L.applyButterfly(s, 'placeFemale');
  assert.strictEqual(L.decideMating(s, true).ok, true);
  assert.strictEqual(MD.right.pair, 'Bướm đực và bướm cái trưởng thành có thể sinh sản.');
});

test('2.2 Giao phối: phải kéo bướm đực đến gần bướm cái; xong thì mở thụ tinh', () => {
  const s = play('place');
  assert.strictEqual(L.decideMating(s, false).ok, false);
  assert.strictEqual(L.applyFertilization(s), false);
  L.applyMating(s);
  assert.strictEqual(L.applyFertilization(s), true);
  assert.strictEqual(MD.right.mate, 'Bướm đực và bướm cái giao phối để thực hiện quá trình sinh sản.');
});

test('2.3 Thụ tinh: có tinh trùng, trứng, nhãn TRỨNG ĐÃ THỤ TINH; nút TIẾP TỤC chỉ mở sau thụ tinh', () => {
  const s = play('mate');
  assert.strictEqual(L.canContinue(s), false);
  L.applyFertilization(s);
  assert.strictEqual(L.canContinue(s), true);
  assert.strictEqual(MD.labels.zygote, 'TRỨNG ĐÃ THỤ TINH');
  assert.strictEqual(MD.buttons.go, '▶ TIẾP TỤC');
  assert.strictEqual(MD.right.fert, 'Thụ tinh xảy ra khi tinh trùng của bướm đực kết hợp với trứng của bướm cái.');
});

test('2.4 Đẻ trứng: chỉ đặt lên lá mới có trứng; đặt chỗ khác thì có cảnh báo', () => {
  const s = play('cont');
  assert.deepStrictEqual(L.decideButterfly(s, 'female', 'area'), { ok: false, msg: 'femaleLeaf' });
  assert.deepStrictEqual(L.decideButterfly(s, 'female', null), { ok: false, msg: 'femaleLeaf' });
  assert.strictEqual(s.eggLaid, false);
  L.applyButterfly(s, L.decideButterfly(s, 'female', 'leaf').action);
  assert.strictEqual(s.eggLaid, true);
});

test('2.5 Trứng và nở: các mốc Ngày 0, 3, 7; nút CHUYỂN SANG GIAI ĐOẠN NỞ; trứng sẫm ở ngày 3, sâu ra ở ngày 7', () => {
  assert.deepStrictEqual(L.DAYS.slice(0, 3), [0, 3, 7]);
  assert.strictEqual(MD.buttons.hatch, '▶ CHUYỂN SANG GIAI ĐOẠN NỞ');
  const s = play('lay');
  assert.ok(L.startHatching(s));                                     // mục 5: kính lúp chỉ để quan sát, không cần soi trứng
  L.arriveDay(s, 3);
  assert.strictEqual(s.eggsDark, true); assert.strictEqual(s.larvaAppeared, false);
  L.arriveDay(s, 7);
  assert.strictEqual(s.larvaAppeared, true);
});

test('2.6 Sâu non: phải cho ăn lá mới lớn và lột xác; thước đo cho chiều dài tăng dần', () => {
  const s = play('hatch');
  assert.strictEqual(L.applyMolt(s), false);                         // chưa ăn thì chưa lớn
  assert.strictEqual(L.decideLeaf(s, false).ok, false);              // lá ở xa sâu
  const mm = [L.decideRuler(s, true).mm];
  L.applyFeed(s);
  for (let i = 0; i < 3; i++) { L.applyMolt(s); mm.push(L.decideRuler(s, true).mm); }
  L.applyGrown(s); mm.push(L.decideRuler(s, true).mm);
  for (let i = 1; i < mm.length; i++) assert.ok(mm[i] > mm[i - 1], 'chiều dài phải tăng: ' + mm.join(', '));
});

test('2.7 Hóa nhộng: chỉ khi sâu đủ lớn; ngày 14; thông báo đúng', () => {
  const s = play('feed');
  assert.strictEqual(L.applyPupation(s), false);
  const g = play('grow');
  assert.strictEqual(L.applyPupation(g), true);
  assert.strictEqual(g.day, 14);
  assert.strictEqual(MD.right.pupa, 'Sâu non đã hóa thành nhộng.');
});

test('2.8 Nhộng: có nút MẶT CẮT 3D (không cần kính lúp); chỉ mở tua nhanh vũ hóa khi đã xem xong mặt cắt', () => {
  assert.strictEqual(MD.buttons.cut, '[ MẶT CẮT 3D ]');
  const s = play('pupa');
  assert.strictEqual(L.canCutaway(s), true);
  L.openCutaway(s);
  assert.strictEqual(L.canMetamorph(s), false);
  L.observeCutaway(s);
  assert.strictEqual(L.canMetamorph(s), true);                       // không cần nhấp 4 chấm sáng
});

test('2.9 và 2.10 Vũ hóa: có nút tua nhanh; xong thì có bướm trưởng thành và mở sắp xếp vòng đời', () => {
  assert.strictEqual(MD.buttons.emerge, '▶ TUA NHANH THỜI GIAN VŨ HÓA');
  const s = play('parts');
  assert.strictEqual(L.sorting(s), false);
  L.startMetamorphosis(s); L.applyAdult(s);
  assert.strictEqual(s.adult, true);
  assert.strictEqual(L.sorting(s), true);
});

test('3. Sắp xếp vòng đời: 4 thẻ đúng tên; sai thì trả lại; đúng hết thì "Chính xác!" và hoàn tất', () => {
  assert.deepStrictEqual(MD.sort.cards, ['TRỨNG', 'SÂU NON', 'NHỘNG', 'BƯỚM TRƯỞNG THÀNH']);
  const s = play('emerge');
  assert.deepStrictEqual(L.decideSort(s, 0, 1), { ok: false, msg: 'sortWrong' });
  assert.strictEqual(s.sorted[0], false);
  [0, 1, 2, 3].forEach((c) => { assert.ok(L.decideSort(s, c, c).ok); L.applySort(s, c); });
  assert.strictEqual(s.complete, true);
  assert.match(MD.sort.right, /^Chính xác!/);
});

test('4. Bảng khóa/mở: không bỏ qua được bước nào', () => {
  const s = L.initialState();
  assert.strictEqual(L.decideMating(s, true).ok, false);
  assert.strictEqual(L.applyFertilization(s), false);
  assert.strictEqual(L.applyContinue(s), false);
  assert.strictEqual(L.startHatching(s), false);
  assert.strictEqual(L.decideLeaf(s, true).ok, false);
  assert.strictEqual(L.applyPupation(s), false);
  assert.strictEqual(L.openCutaway(s), false);
  assert.strictEqual(L.startMetamorphosis(s), false);
  assert.strictEqual(L.applyAdult(s), false);
  assert.strictEqual(L.decideSort(s, 0, 0).ok, false);
});

test('5. Nhấp hoặc kéo sai chỉ nhắc nhở, không làm thay đổi tiến trình', () => {
  const s = play('hatch'), before = JSON.stringify(s);
  L.decideLeaf(s, false); L.decideRuler(s, false); L.decideLens(s, null); L.decideButterfly(s, 'male', null);
  assert.strictEqual(JSON.stringify(s), before);
});

/* Các câu lấy từ file kịch bản (từ 15/11/2026, nhóm user trong js/content/exp7.vi.js) */
test('Câu chữ theo file kịch bản: 2.1, 2.8, 2.9, 2.10', () => {
  const U = global.window.Lab.content.exp7.user, A = global.window.Lab.content.exp7.app;
  assert.strictEqual(U.msg.maleOff, 'Hãy đặt bướm vào khu vực quan sát.');
  assert.strictEqual(U.msg.femaleOff, 'Hãy đặt bướm vào khu vực quan sát.');
  assert.strictEqual(U.right.pupaStill, 'Toàn bộ cơ thể bên trong biến đổi thành bướm.');
  assert.strictEqual(U.right.adult, 'Bướm thoát khỏi vỏ nhộng, giương cánh khô ráo, sẵn sàng bay.');
  assert.ok(A.nectar && A.hatchTask && A.cutTask);
});
