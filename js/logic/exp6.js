/* Experiment 6 – pure logic (no 3D, no DOM): new plants from four parts (bean seed, sweet potato root, potato tuber, kalanchoe leaf).
   Order per pot: pot → sample → water. BẮT ĐẦU opens when at least one pot is ready (1 to 4 pots: the user's scenario file of 2026-11-15, Tab 1;
   the md, sections 56, 57 and 66, asked for all four) → look (fast forward to day 14) → classify the pots that grew → grow up.
   Index 0..3 is the pot and the sample: 0 bean (seed), 1 sweet potato (root), 2 potato (stem), 3 kalanchoe (leaf).
   Runs in the browser and in Node (tests). */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else { root.Lab = root.Lab || {}; root.Lab.logic = root.Lab.logic || {}; root.Lab.logic.exp6 = api; }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  var N = 4, DAYS = [0, 2, 4, 7, 14];

  function four() { return [false, false, false, false]; }
  function initialState() {
    return {
      pots: four(), samples: four(), watered: four(),               // pot1Placed…, beanPlaced…, pot1Watered…
      active: four(),                                               // the pots that were ready when BẮT ĐẦU was pressed; only these grow
      started: false, day: 0, lapse: 'idle',                        // idle | run1 (day 0 → 14) | at14 (plantlets formed, classification open) | run2 (growing up) | done
      classified: four(), classDone: false, mature: false, complete: false
    };
  }
  function all(a) { return a.every(function (x) { return x; }); }
  function any(a) { return a.some(function (x) { return x; }); }
  function allPots(s) { return all(s.pots); }
  function allSamples(s) { return all(s.samples); }
  function allWatered(s) { return all(s.watered); }
  /* a pot is ready when it is on the table, has its sample and was watered */
  function ready(s, i) { return s.pots[i] && s.samples[i] && s.watered[i]; }
  function readyList(s) { return s.pots.map(function (_, i) { return ready(s, i); }); }
  function activeCount(s) { return s.active.filter(Boolean).length; }

  /* ---------------- pots, samples, water, magnifier ---------------- */
  /* After BẮT ĐẦU the table is locked: no more pots, samples or water (press LÀM LẠI to use more pots). */
  /* pot: 0..3; target: the position it was dropped on (0..3) or null (anywhere else) */
  function decidePot(s, pot, target) {
    if (s.started) return { ok: false, msg: 'locked' };
    if (s.pots[pot]) return { ok: false, msg: null };
    return target === pot ? { ok: true, action: 'pot', pot: pot } : { ok: false, msg: 'potWrong' };
  }
  function applyPot(s, pot) { s.pots[pot] = true; return { all: allPots(s) }; }
  /* a sample goes only into its own pot, and only when that pot is on the table */
  function decideSample(s, sample, target) {
    if (s.started) return { ok: false, msg: 'locked' };
    if (s.samples[sample]) return { ok: false, msg: null };
    if (!s.pots[sample]) return { ok: false, msg: 'potFirst' };
    return target === sample ? { ok: true, action: 'sample', sample: sample } : { ok: false, msg: 'wrong' + sample };
  }
  function applySample(s, sample) { s.samples[sample] = true; return { all: allSamples(s), msg: 'right' + sample }; }
  /* water only a pot that has its sample; a miss or an empty pot gives the same message */
  function decideWater(s, target) {
    if (s.started) return { ok: false, msg: 'locked' };
    if (target === null || target === undefined || !s.pots[target] || !s.samples[target]) return { ok: false, msg: 'waterOff' };
    if (s.watered[target]) return { ok: false, msg: null };
    return { ok: true, action: 'water', pot: target };
  }
  function applyWater(s, pot) { s.watered[pot] = true; return { all: allWatered(s) }; }
  /* the magnifier only looks; it never changes the plants (md section 59) */
  function decideLens(s, target) {
    if (target === null || target === undefined) return { ok: false, msg: 'lensOff' };
    if (!s.samples[target]) return { ok: false, msg: 'lensEmpty' };
    return { ok: true, action: 'lens', pot: target };
  }

  /* ---------------- the fast forward ---------------- */
  function canStart(s) { return !s.started && any(readyList(s)); }
  function start(s) { if (!canStart(s)) return false; s.active = readyList(s); s.started = true; s.lapse = 'run1'; s.day = 0; return true; }
  /* the picture reached a day of the time bar; day 14 stops with the plantlets and opens the classification */
  function arrive(s, day) {
    if (s.lapse !== 'run1' || DAYS.indexOf(day) < 0 || day < s.day) return null;
    s.day = day;
    if (day === 14) { s.lapse = 'at14'; return { plantlets: true }; }
    return { plantlets: false };
  }
  function plantletsFormed(s) { return s.lapse === 'at14' || s.lapse === 'run2' || s.lapse === 'done'; }

  /* ---------------- classification: card i (HẠT, RỄ, THÂN, LÁ) goes onto plant j; only the cards of the pots that grew ---------------- */
  function classifying(s) { return s.lapse === 'at14' && !s.classDone; }
  function cards(s) { var out = []; for (var i = 0; i < N; i++) if (s.active[i]) out.push(i); return out; }
  function decideClass(s, card, target) {
    if (!classifying(s) || !s.active[card] || s.classified[card]) return { ok: false, msg: null };
    return target === card ? { ok: true, action: 'class', card: card } : { ok: false, msg: 'classWrong' };
  }
  function applyClass(s, card) {
    s.classified[card] = true;
    if (cards(s).every(function (i) { return s.classified[i]; })) s.classDone = true;
    return { done: s.classDone };
  }

  /* ---------------- growing up ---------------- */
  function canGrow(s) { return s.classDone && s.lapse === 'at14'; }
  function grow(s) { if (!canGrow(s)) return false; s.lapse = 'run2'; return true; }
  function finish(s) { if (s.lapse !== 'run2') return false; s.lapse = 'done'; s.mature = true; s.complete = true; return true; }

  /* ---------------- prompts and the progress bar ---------------- */
  /* CHUẨN BỊ → ĐẶT MẪU → TƯỚI NƯỚC → QUAN SÁT → CÂY CON → PHÂN LOẠI → CÂY TRƯỞNG THÀNH → HOÀN THÀNH
     a preparation step is done as soon as one pot has it (one pot is enough) */
  function stepStates(s) {
    var st = s.started, pots = st || any(s.pots), samples = st || any(s.samples), water = st || any(readyList(s)), plantlets = plantletsFormed(s);
    return [
      pots ? 'done' : 'active',
      !pots ? 'locked' : samples ? 'done' : 'active',
      !samples ? 'locked' : water ? 'done' : 'active',
      !water ? 'locked' : !st ? 'open' : plantlets ? 'done' : 'active',
      !st ? 'locked' : plantlets ? 'done' : 'active',
      !plantlets ? 'locked' : s.classDone ? 'done' : 'active',
      !s.classDone ? 'locked' : s.mature ? 'done' : 'active',
      s.complete ? 'done' : 'locked'
    ];
  }
  /* which sentence to show now: 'potsTask' | 'sampleTask' | 'waterTask' | 'startTask' | 'classTask' | 'growTask' | null
     before BẮT ĐẦU: the first pot that still misses something decides; the button itself shows whenever canStart is true */
  function promptKey(s) {
    if (s.complete) return null;
    if (!s.started) {
      if (!any(s.pots)) return 'potsTask';
      for (var i = 0; i < N; i++) if (s.pots[i] && !s.samples[i]) return 'sampleTask';
      for (i = 0; i < N; i++) if (s.samples[i] && !s.watered[i]) return 'waterTask';
      return 'startTask';
    }
    if (classifying(s)) return 'classTask';
    if (canGrow(s)) return 'growTask';
    return null;
  }
  /* the days on the time bar: 'done' | 'active' | 'todo' */
  function dayStates(s) { return DAYS.map(function (d) { return !s.started ? 'todo' : d < s.day ? 'done' : d === s.day ? 'active' : 'todo'; }); }

  return {
    N: N, DAYS: DAYS, initialState: initialState, allPots: allPots, allSamples: allSamples, allWatered: allWatered,
    ready: ready, readyList: readyList, activeCount: activeCount, cards: cards,
    decidePot: decidePot, applyPot: applyPot, decideSample: decideSample, applySample: applySample,
    decideWater: decideWater, applyWater: applyWater, decideLens: decideLens,
    canStart: canStart, start: start, arrive: arrive, plantletsFormed: plantletsFormed,
    classifying: classifying, decideClass: decideClass, applyClass: applyClass,
    canGrow: canGrow, grow: grow, finish: finish, stepStates: stepStates, promptKey: promptKey, dayStates: dayStates
  };
});
