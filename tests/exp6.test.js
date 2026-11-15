const test = require('node:test');
const assert = require('node:assert');
const L = require('../js/logic/exp6.js');

function potsDone() { const s = L.initialState(); for (let i = 0; i < 4; i++) L.applyPot(s, i); return s; }
function samplesDone() { const s = potsDone(); for (let i = 0; i < 4; i++) L.applySample(s, i); return s; }
function watered() { const s = samplesDone(); for (let i = 0; i < 4; i++) L.applyWater(s, i); return s; }
function at14() { const s = watered(); L.start(s); [2, 4, 7, 14].forEach((d) => L.arrive(s, d)); return s; }

test('each pot goes only to its own place; a wrong drop changes nothing', () => {
  const s = L.initialState();
  assert.deepStrictEqual(L.decidePot(s, 0, 2), { ok: false, msg: 'potWrong' });
  assert.deepStrictEqual(L.decidePot(s, 0, null), { ok: false, msg: 'potWrong' });
  assert.strictEqual(L.decidePot(s, 0, 0).ok, true);
  assert.strictEqual(s.pots[0], false);
  assert.strictEqual(L.applyPot(s, 0).all, false);
  assert.strictEqual(L.decidePot(s, 0, 0).ok, false);                     // already placed
  [1, 2].forEach((i) => L.applyPot(s, i)); assert.strictEqual(L.applyPot(s, 3).all, true);
});

test('a sample waits for its own pot and goes to its own pot with the md sentences', () => {
  const s = L.initialState();
  assert.strictEqual(L.decideSample(s, 0, 0).msg, 'potFirst');
  for (let i = 0; i < 4; i++) L.applyPot(s, i);
  assert.deepStrictEqual(L.decideSample(s, 0, 2), { ok: false, msg: 'wrong0' });
  assert.deepStrictEqual(L.decideSample(s, 3, null), { ok: false, msg: 'wrong3' });
  assert.deepStrictEqual(L.decideSample(s, 2, 2), { ok: true, action: 'sample', sample: 2 });
  assert.strictEqual(L.applySample(s, 2).msg, 'right2');
  assert.strictEqual(L.decideSample(s, 2, 2).ok, false);
  [0, 1].forEach((i) => L.applySample(s, i)); assert.strictEqual(L.applySample(s, 3).all, true);
});

test('watering needs a pot with its sample, must hit a pot, and each pot once', () => {
  const s = potsDone();
  assert.strictEqual(L.decideWater(s, 0).msg, 'waterOff');
  for (let i = 0; i < 4; i++) L.applySample(s, i);
  assert.deepStrictEqual(L.decideWater(s, null), { ok: false, msg: 'waterOff' });
  assert.strictEqual(L.decideWater(s, 1).ok, true);
  assert.strictEqual(L.canStart(s), false);
  L.applyWater(s, 1); assert.strictEqual(L.decideWater(s, 1).ok, false);
  assert.strictEqual(L.canStart(s), true);                              // one ready pot is enough
  [0, 2].forEach((i) => L.applyWater(s, i)); assert.strictEqual(L.applyWater(s, 3).all, true);
  assert.strictEqual(L.canStart(s), true);
});

test('the magnifier needs a sample in the pot and never changes anything', () => {
  const s = potsDone();
  assert.strictEqual(L.decideLens(s, null).msg, 'lensOff');
  assert.strictEqual(L.decideLens(s, 1).msg, 'lensEmpty');
  L.applySample(s, 1);
  const before = JSON.stringify(s);
  assert.deepStrictEqual(L.decideLens(s, 1), { ok: true, action: 'lens', pot: 1 });
  assert.strictEqual(JSON.stringify(s), before);
});

test('the fast forward starts only after a watering and stops at day 14', () => {
  const s = samplesDone();
  assert.strictEqual(L.start(s), false);
  for (let i = 0; i < 4; i++) L.applyWater(s, i);
  assert.strictEqual(L.start(s), true); assert.strictEqual(L.start(s), false);
  assert.strictEqual(L.arrive(s, 2).plantlets, false); assert.strictEqual(s.day, 2);
  assert.strictEqual(L.arrive(s, 1), null);                              // not a day of the bar / going back
  assert.strictEqual(L.arrive(s, 4).plantlets, false); L.arrive(s, 7);
  assert.strictEqual(L.plantletsFormed(s), false);
  assert.strictEqual(L.arrive(s, 14).plantlets, true);
  assert.strictEqual(s.lapse, 'at14'); assert.strictEqual(L.plantletsFormed(s), true);
});

test('classification opens at day 14; wrong cards go back; four right cards finish it', () => {
  const early = watered(); L.start(early);
  assert.strictEqual(L.decideClass(early, 0, 0).ok, false);
  const s = at14();
  assert.strictEqual(L.classifying(s), true);
  assert.deepStrictEqual(L.decideClass(s, 0, 1), { ok: false, msg: 'classWrong' });
  assert.deepStrictEqual(L.decideClass(s, 3, null), { ok: false, msg: 'classWrong' });
  assert.strictEqual(L.decideClass(s, 1, 1).ok, true);
  L.applyClass(s, 1); assert.strictEqual(L.decideClass(s, 1, 1).ok, false);
  assert.strictEqual(L.canGrow(s), false);
  [0, 2].forEach((i) => L.applyClass(s, i)); assert.strictEqual(L.applyClass(s, 3).done, true);
  assert.strictEqual(L.classifying(s), false); assert.strictEqual(L.canGrow(s), true);
});

test('growing up only after the classification, then complete', () => {
  const s = at14();
  assert.strictEqual(L.grow(s), false);
  for (let i = 0; i < 4; i++) L.applyClass(s, i);
  assert.strictEqual(L.grow(s), true); assert.strictEqual(L.grow(s), false);
  assert.strictEqual(s.complete, false);
  assert.strictEqual(L.finish(s), true); assert.strictEqual(s.complete, true); assert.strictEqual(s.mature, true);
});

test('progress bar follows the story', () => {
  const s = L.initialState();
  assert.deepStrictEqual(L.stepStates(s), ['active', 'locked', 'locked', 'locked', 'locked', 'locked', 'locked', 'locked']);
  assert.deepStrictEqual(L.stepStates(potsDone()), ['done', 'active', 'locked', 'locked', 'locked', 'locked', 'locked', 'locked']);
  assert.deepStrictEqual(L.stepStates(samplesDone()), ['done', 'done', 'active', 'locked', 'locked', 'locked', 'locked', 'locked']);
  assert.deepStrictEqual(L.stepStates(watered()), ['done', 'done', 'done', 'open', 'locked', 'locked', 'locked', 'locked']);
  const r = watered(); L.start(r);
  assert.deepStrictEqual(L.stepStates(r), ['done', 'done', 'done', 'active', 'active', 'locked', 'locked', 'locked']);
  const c = at14();
  assert.deepStrictEqual(L.stepStates(c), ['done', 'done', 'done', 'done', 'done', 'active', 'locked', 'locked']);
  for (let i = 0; i < 4; i++) L.applyClass(c, i); L.grow(c);
  assert.deepStrictEqual(L.stepStates(c), ['done', 'done', 'done', 'done', 'done', 'done', 'active', 'locked']);
  L.finish(c);
  assert.deepStrictEqual(L.stepStates(c), ['done', 'done', 'done', 'done', 'done', 'done', 'done', 'done']);
});

test('prompts and day states', () => {
  assert.strictEqual(L.promptKey(L.initialState()), 'potsTask');
  assert.strictEqual(L.promptKey(potsDone()), 'sampleTask');
  assert.strictEqual(L.promptKey(samplesDone()), 'waterTask');
  assert.strictEqual(L.promptKey(watered()), 'startTask');
  const s = at14();
  assert.strictEqual(L.promptKey(s), 'classTask');
  for (let i = 0; i < 4; i++) L.applyClass(s, i);
  assert.strictEqual(L.promptKey(s), 'growTask');
  L.grow(s); L.finish(s); assert.strictEqual(L.promptKey(s), null);
  const d = watered(); assert.deepStrictEqual(L.dayStates(d), ['todo', 'todo', 'todo', 'todo', 'todo']);
  L.start(d); L.arrive(d, 2); L.arrive(d, 4);
  assert.deepStrictEqual(L.dayStates(d), ['done', 'done', 'active', 'todo', 'todo']);
});

// 1 to 4 pots (the user's scenario file of 2026-11-15, Tab 1)
function two() { const s = L.initialState(); [0, 3].forEach((i) => { L.applyPot(s, i); L.applySample(s, i); L.applyWater(s, i); }); return s; }

test('one or two pots are enough; only the ready pots grow', () => {
  const one = L.initialState(); L.applyPot(one, 2);
  assert.strictEqual(L.canStart(one), false);
  assert.strictEqual(L.decideSample(one, 1, 2).msg, 'potFirst');          // pot 2 (sweet potato) is not on the table
  assert.deepStrictEqual(L.decideSample(one, 2, null), { ok: false, msg: 'wrong2' });
  L.applySample(one, 2); assert.strictEqual(L.canStart(one), false);
  L.applyWater(one, 2); assert.strictEqual(L.canStart(one), true);
  const s = two(); L.applyPot(s, 1); L.applySample(s, 1);                 // pot 2 has its sample but no water
  assert.deepStrictEqual(L.readyList(s), [true, false, false, true]);
  assert.strictEqual(L.start(s), true);
  assert.deepStrictEqual(s.active, [true, false, false, true]); assert.strictEqual(L.activeCount(s), 2);
  assert.deepStrictEqual(L.cards(s), [0, 3]);
});

test('watering an empty pot or a pot without its sample gives the same message', () => {
  const s = L.initialState(); L.applyPot(s, 0);
  assert.deepStrictEqual(L.decideWater(s, 0), { ok: false, msg: 'waterOff' });
  assert.deepStrictEqual(L.decideWater(s, 1), { ok: false, msg: 'waterOff' });
});

test('after BẮT ĐẦU the table is locked', () => {
  const s = two(); L.start(s);
  assert.strictEqual(L.decidePot(s, 1, 1).msg, 'locked');
  assert.strictEqual(L.decideSample(s, 1, 1).msg, 'locked');
  assert.strictEqual(L.decideWater(s, 0).msg, 'locked');
  assert.strictEqual(L.decideLens(s, 0).ok, true);                         // the magnifier still looks
});

test('with two pots only their two cards are needed', () => {
  const s = two(); L.start(s); [2, 4, 7, 14].forEach((d) => L.arrive(s, d));
  assert.strictEqual(L.decideClass(s, 1, 1).ok, false);                    // the RỄ card belongs to a pot that did not grow
  assert.strictEqual(L.decideClass(s, 0, 3).msg, 'classWrong');
  L.applyClass(s, 0); assert.strictEqual(s.classDone, false);
  assert.strictEqual(L.applyClass(s, 3).done, true);
  assert.strictEqual(L.promptKey(s), 'growTask');
  L.grow(s); L.finish(s); assert.strictEqual(s.complete, true);
});

test('progress and prompts with some pots', () => {
  const s = L.initialState(); L.applyPot(s, 1);
  assert.deepStrictEqual(L.stepStates(s).slice(0, 4), ['done', 'active', 'locked', 'locked']);
  assert.strictEqual(L.promptKey(s), 'sampleTask');
  L.applySample(s, 1); assert.strictEqual(L.promptKey(s), 'waterTask');
  L.applyWater(s, 1); assert.strictEqual(L.promptKey(s), 'startTask');
  assert.deepStrictEqual(L.stepStates(s).slice(0, 4), ['done', 'done', 'done', 'open']);
  L.applyPot(s, 3); assert.strictEqual(L.promptKey(s), 'sampleTask');      // a new pot asks for its sample, BẮT ĐẦU stays possible
  assert.strictEqual(L.canStart(s), true);
});
