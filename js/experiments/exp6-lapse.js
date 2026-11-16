/* Experiment 6, part "quan sát": the button "▶ BẮT ĐẦU QUAN SÁT" runs the ready pots (1 to 4) together through NGÀY 0 → 2 → 4 → 7 → 14 (md sections 27–35);
   the student can click a pot to look closer; at day 14 the plantlets are there and the classification opens (sections 36–40);
   "TIẾP TỤC TUA NHANH" then grows the plants up (sections 41–54) and the results, table, diagram and conclusion are shown (sections 68–70). */
(Lab.exp6mods = Lab.exp6mods || []).push(function (X) {
  'use strict';
  var T = X.T, U = X.U, L = X.L, MD = X.MD, APP = X.APP, UI = X.UI, state = X.state, V = X.V, el = U.el;
  var LIFE = { 0: 0, 2: 0.22, 4: 0.5, 7: 0.78, 14: 1 };                 // how far each plant has come at each day (see setLife in js/models/sprouts.js)
  var back = null, zoomTag = null, pending = [];

  function setLife(t) { X.pots.forEach(function (p, i) { if (p && state.active[i]) p.setLife(t); }); }     // only the pots that were ready grow
  function day(d) { UI.caption(MD.days[L.DAYS.indexOf(d)], { ms: 1000, cls: 'day' }); Lab.audio.play('click'); X.refresh(); }
  function tween(t0, t1, secs) { return Lab.tween.value(secs, function (k) { setLife(t0 + (t1 - t0) * k); }, { ease: Lab.tween.ease.linear }).promise; }

  /* ---------------- the fast forward to day 14 ---------------- */
  async function start() {
    if (!L.start(state)) return;
    Lab.audio.play('click'); X.busy++; X.note = null; X.zoomed = -1; X.refresh();
    X.shot('table', 900);
    day(0); await Lab.tween.wait(1.2).promise;
    var legs = [[0, 2, 2.4], [2, 4, 2.6], [4, 7, 3.0], [7, 14, 4.0]];
    for (var i = 0; i < legs.length; i++) {
      await tween(LIFE[legs[i][0]], LIFE[legs[i][1]], legs[i][2]);
      var d = legs[i][1]; L.arrive(state, d); day(d);
      if (d === 2) X.toast(MD.right.germ, { type: 'ok', ms: 4200 });
    }
    X.busy--; X.note = MD.plantlets; Lab.audio.play('step');
    L.cards(state).forEach(function (i, j) { Lab.tween.wait(j * 2.4).promise.then(function () { X.toast(MD.right.made[i], { type: 'ok', ms: 5200 }); }); });
    openClass(); X.refresh();
  }

  /* ---------------- looking closer at one pot (md section 34) ---------------- */
  function tapPot(i) {
    if (!state.started || !state.active[i] || X.zoomed === i || X.busy && state.lapse !== 'run1') return;
    X.zoomed = i; X.shot(function () { return X.SHOTS.pot(i); }, 900); Lab.audio.play('click');
    if (zoomTag) zoomTag.remove(); zoomTag = X.tag(MD.zoom[i], V(X.PX[i], 3.4, X.PZ), 'arrow');
    if (!back) { back = el('button', { class: 'btn btn-blue mode-back', text: L.activeCount(state) === 4 ? MD.back : APP.backSome, on: { click: function () { X.touch(); unzoom(); } } }); UI.el.hud.appendChild(back); }
    back.hidden = false; X.refresh();
  }
  function unzoom() {
    if (X.zoomed < 0) return; X.zoomed = -1; X.shot('table', 900);
    if (zoomTag) { zoomTag.remove(); zoomTag = null; } if (back) back.hidden = true; X.refresh();
  }

  /* ---------------- classification: four cards on the four plants (md sections 36–40) ---------------- */
  function openClass() {
    unzoom();
    UI.setTray(L.cards(state).map(function (i) { return { id: 'c' + i, label: MD.classify.cards[i] }; }), { onClick: function () { } });     // only the cards of the pots that grew
    X.toast(MD.classify.task, { type: 'info', ms: 6500 });
  }
  function classified(card) {
    Lab.audio.play('ok'); UI.setCard('c' + card, { ghost: true, used: true });
    Lab.fx.ringPulse(X.scene, V(X.PX[card], 0, X.PZ), 0x6fe07a, 1.6); Lab.fx.sparkles(X.scene, V(X.PX[card], 1.6, X.PZ), 0xffe066, 8);
    X.toast(state.classDone ? (L.activeCount(state) === 4 ? MD.right.classAll : APP.classAllSome) : MD.right.classOne, { type: 'ok', ms: 5200 });
    if (state.classDone) { Lab.audio.play('step'); X.note = null; }
    X.refresh();
  }

  /* ---------------- growing up (md sections 41–54) ---------------- */
  async function grow() {
    if (!L.grow(state)) return;
    Lab.audio.play('click'); X.busy++; X.note = null; X.stageName = MD.stages.growing; X.refresh(); X.shot('table', 900);
    UI.caption(MD.stages.growing, { ms: 1300, cls: 'day' });
    await tween(1, 1.5, 4.5);
    X.stageName = MD.stages.mature; UI.caption(MD.stages.mature, { ms: 1300, cls: 'day' }); X.refresh();
    await tween(1.5, 2, 4.5);
    L.finish(state); X.busy--; finale();
  }

  /* ---------------- the end (md sections 54, 68–70) ---------------- */
  function finale() {
    UI.panelWide(true); Lab.audio.play('done'); Lab.fx.confetti(3400); X.shot('table', 900);
    UI.caption(MD.result.title, { ms: 1800, cls: 'day' });
    L.cards(state).forEach(function (i) { X.tag(MD.compare[i], V(X.PX[i], 3.4, X.PZ), 'place'); });
    X.refresh();
  }
  X.finale = {
    render: function (stack) {
      var R = MD.result, used = L.cards(state);     // the results list only the pots the student used
      function pick(list) { return used.map(function (i) { return list[i]; }); }
      stack.appendChild(el('div', { class: 'panel-card done-card' }, el('div', { class: 'done-title', text: R.title }),
        el('ul', { class: 'done-list' }, pick(R.lines).map(function (t) { return el('li', {}, el('span', { class: 'ok', text: '✓' }), el('span', { class: 'tx', text: t })); })),
        el('p', { class: 'result-note', text: R.sentence })));
      var S = MD.table;
      stack.appendChild(el('div', { class: 'panel-card' }, el('div', { class: 'obs-head', text: APP.tableTitle }), el('div', {
        html: '<table class="result-table summary"><thead><tr>' + S.head.map(function (h) { return '<th>' + X.esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          pick(S.rows).map(function (r) { return '<tr><th>' + X.esc(r[0]) + '</th><td>' + X.esc(r[1]) + '</td><td>' + X.esc(r[2]) + '</td></tr>'; }).join('') + '</tbody></table>'
      })));
      var rows = [];
      pick(R.diagram).forEach(function (chain, i) {
        rows.push(el('div', { class: 'xd-chain' }, chain.map(function (t, j) { return el('span', { class: 'xd-chip' + (j === 1 ? ' mid' : '') }, [document.createTextNode(t)]); })
          .reduce(function (a, c, j) { a.push(c); if (j < chain.length - 1) a.push(el('span', { class: 'xd-arr', text: '→' })); return a; }, [])));
      });
      stack.appendChild(el('div', { class: 'panel-card xd' }, el('div', { class: 'obs-head', text: APP.diagramTitle }), rows));
      stack.appendChild(el('div', { class: 'panel-card conclusion' }, el('div', { class: 'obs-head', text: APP.conclusionTitle }), el('p', { class: 'result-note', text: R.conclusion })));
    }
  };
  X.lapse = { start: start, grow: grow, tapPot: tapPot, classified: classified };
});
