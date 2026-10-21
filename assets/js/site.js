// Draws the Delft skyline (canal houses, Nieuwe Kerk, leaning Oude Kerk) into every <svg class="skyline">.
(function () {
  function rnd(seed) { let s = seed; return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; }

  function draw(svg) {
    const W = 1200, G = 170, r = rnd(42);
    let sil = '', win = '';
    function gable(x, w, h, steps) {
      const sw = w / (2 * steps + 1), sh = Math.min(16, (h * .35) / steps);
      let d = 'M' + x + ' ' + G + 'V' + (G - h), cx = x;
      for (let i = 0; i < steps; i++) { d += 'H' + (cx + sw) + 'V' + (G - h - sh * (i + 1)); cx += sw; }
      d += 'H' + (cx + sw); cx += sw;
      for (let i = steps; i > 0; i--) { d += 'V' + (G - h - sh * (i - 1)) + 'H' + (cx + sw); cx += sw; }
      d += 'V' + G + 'Z';
      for (let fy = G - h + 12; fy < G - 14; fy += 24)
        for (let fx = x + sw * .6; fx < x + w - sw * .8; fx += w / 3.2)
          win += '<rect class="win" x="' + fx.toFixed(1) + '" y="' + fy + '" width="' + (w / 7).toFixed(1) + '" height="12" opacity=".55"/>';
      return d;
    }
    function bell(x, w, h) { return 'M' + x + ' ' + G + 'V' + (G - h) + 'h' + (w * .2) + 'q' + (w * .3) + ' -' + (w * .55) + ' ' + (w * .6) + ' 0h' + (w * .2) + 'V' + G + 'Z'; }
    let x = 0; const skip = [[330, 440], [820, 900]];
    while (x < W) {
      const w = 46 + r() * 34;
      if (skip.some(function (s) { return x + w > s[0] && x < s[1]; })) { x += 6; continue; }
      const h = 50 + r() * 40;
      sil += (r() < .7 ? gable(x, w, h, 2 + Math.floor(r() * 2)) : bell(x, w, h));
      x += w + 2;
    }
    const nk = 'M350 170V100H352V40H360V20H366V8L370 0L374 8V20H380V40H388V100H390V170Z';
    const nkBody = 'M330 170V118L360 104L392 118H440V170Z';
    const ok = 'M828 170V70H834V54L837 46L840 54V70H850V44L855 30L860 44V70H870V54L873 46L876 54V70H882V170Z';
    const okBody = 'M880 170V126L900 118V170Z';
    svg.setAttribute('viewBox', '0 0 1200 230');
    svg.innerHTML =
      '<rect class="sky" width="' + W + '" height="' + G + '"/>' +
      '<path class="sil" d="' + sil + '"/><path class="sil" d="' + nkBody + '"/><path class="sil" d="' + nk + '"/>' +
      '<g transform="rotate(2.2 855 170)"><path class="sil" d="' + ok + '"/></g><path class="sil" d="' + okBody + '"/>' + win +
      '<rect class="water" y="' + G + '" width="' + W + '" height="' + (230 - G) + '"/>' +
      '<g transform="translate(0 ' + (2 * G) + ') scale(1 -1)" class="refl"><path d="' + sil + '"/><path d="' + nk + '"/><path d="' + nkBody + '"/></g>' +
      '<rect class="water" y="' + (G + 34) + '" width="' + W + '" height="30" opacity=".85"/>';
  }

  document.querySelectorAll('svg.skyline').forEach(draw);
})();
