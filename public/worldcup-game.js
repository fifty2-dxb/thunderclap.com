(function () {
  "use strict";

  /* ======================= CONFIG (edit these) ======================= */
  var COUPON_CODE  = "WORLDCUP20";   // the code revealed to players
  var DISCOUNT_PCT = 20;             // discount percentage shown everywhere
  var SHOP_URL     = "/";            // where the "Shop now" button sends them
  var HIDE_ON      = [];             // route hiding handled in React (components/worldcup-game.tsx)
  var BEST_KEY     = "wc_best_score";// localStorage key for the best score
  /* =================================================================== */

  // Don't show on excluded paths; don't double-inject.
  if (HIDE_ON.some(function (p) { return location.pathname.indexOf(p) === 0; })) return;
  if (window.__wcGameLoaded) return;
  window.__wcGameLoaded = true;

  var D = DISCOUNT_PCT;

  /* ----------------------------- Styles ----------------------------- */
  var CSS = ''
    + '@keyframes wcg-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}'
    + '@keyframes wcg-ring{0%{transform:scale(.65);opacity:.55}100%{transform:scale(1.7);opacity:0}}'
    + '@keyframes wcg-spin{to{transform:rotate(360deg)}}'
    + '@keyframes wcg-pop{0%{transform:scale(.86);opacity:0}100%{transform:scale(1);opacity:1}}'
    + '@keyframes wcg-fade{from{opacity:0}to{opacity:1}}'
    + '@keyframes wcg-shimmer{0%{background-position:-120% 0}100%{background-position:220% 0}}'
    + '.wcg-launch{position:fixed;right:18px;bottom:22px;z-index:2147483000;display:flex;align-items:center;gap:10px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}'
    + '@media(max-width:960px){.wcg-launch{bottom:calc(84px + env(safe-area-inset-bottom));right:14px}}'
    + '.wcg-label{background:#0e1d3d;color:#fff;font-weight:700;font-size:12.5px;padding:8px 13px;border-radius:999px;white-space:nowrap;box-shadow:0 10px 22px -12px rgba(14,29,61,.6);position:relative}'
    + '.wcg-label::after{content:"";position:absolute;right:-5px;top:50%;width:10px;height:10px;background:#0e1d3d;transform:translateY(-50%) rotate(45deg)}'
    + '@media(max-width:520px){.wcg-label{display:none}}'
    + '.wcg-launch-btn{position:relative;width:62px;height:62px;flex:none;border:none;cursor:pointer;border-radius:999px;padding:0;background:radial-gradient(circle at 35% 28%,#4f86ff 0%,#2563eb 48%,#1d4ed8 100%);box-shadow:0 14px 30px -10px rgba(37,99,235,.65),inset 0 2px 4px rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;animation:wcg-bounce 2.4s ease-in-out infinite;-webkit-tap-highlight-color:transparent}'
    + '.wcg-launch-btn:active{transform:scale(.94)}'
    + '.wcg-launch-btn .wcg-ball{font-size:30px;line-height:1;animation:wcg-spin 6s linear infinite}'
    + '.wcg-ring{position:absolute;inset:0;border-radius:999px;border:3px solid #f5a524;animation:wcg-ring 1.8s ease-out infinite;pointer-events:none}'
    + '.wcg-badge{position:absolute;top:-8px;right:-10px;background:linear-gradient(180deg,#ffce5c,#f5a524);color:#3a2400;font-weight:900;font-size:10.5px;letter-spacing:.2px;padding:3px 7px;border-radius:999px;border:2px solid #fff;box-shadow:0 4px 10px -3px rgba(212,134,10,.7)}'
    + '.wcg-overlay{position:fixed;inset:0;z-index:2147483600;display:flex;align-items:center;justify-content:center;background:rgba(8,16,33,.62);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);padding:14px;animation:wcg-fade .18s ease;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}'
    + '.wcg-modal{position:relative;width:min(420px,96vw);height:min(760px,92vh);background:#5ec7f2;border-radius:22px;overflow:hidden;box-shadow:0 40px 90px -30px rgba(8,16,33,.7);display:flex;flex-direction:column;animation:wcg-pop .2s cubic-bezier(.2,.8,.2,1)}'
    + '@media(max-width:520px){.wcg-modal{width:100vw;height:100dvh;border-radius:0}.wcg-overlay{padding:0}}'
    + '.wcg-head{display:flex;align-items:center;gap:8px;padding:12px 14px;background:#0e1d3d;color:#fff;flex:none}'
    + '.wcg-title{font-weight:700;font-size:16px;flex:1;display:flex;align-items:center;gap:8px}'
    + '.wcg-pill{background:#f5a524;color:#3a2400;font-weight:800;font-size:11px;padding:3px 8px;border-radius:999px}'
    + '.wcg-close{width:34px;height:34px;border-radius:999px;border:none;cursor:pointer;flex:none;background:rgba(255,255,255,.14);color:#fff;font-size:20px;line-height:1;display:flex;align-items:center;justify-content:center}'
    + '.wcg-close:hover{background:rgba(255,255,255,.26)}'
    + '.wcg-stage{position:relative;flex:1;min-height:0}'
    + '.wcg-canvas{display:block;width:100%;height:100%;touch-action:none}'
    + '.wcg-reward{position:absolute;inset:0;z-index:2;background:rgba(10,20,40,.72);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;padding:24px 22px;gap:4px;animation:wcg-fade .25s ease}'
    + '.wcg-trophy{font-size:46px;animation:wcg-bounce 1.6s ease-in-out infinite}'
    + '.wcg-score{font-size:15px;color:#d6f3ff;font-weight:600;margin-top:2px}'
    + '.wcg-headline{font-weight:700;font-size:22px;margin-top:8px;line-height:1.15}'
    + '.wcg-pct{color:#ffd54f;font-size:1.35em}'
    + '.wcg-sub{font-size:13.5px;color:#c8d6ea;margin-top:4px;max-width:280px}'
    + '.wcg-code{margin-top:16px;display:inline-flex;align-items:center;gap:10px;background:#fff;color:#0e1d3d;border-radius:14px;padding:10px 12px 10px 16px;box-shadow:0 16px 30px -16px rgba(0,0,0,.6);position:relative;overflow:hidden}'
    + '.wcg-code::before{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 20%,rgba(245,165,36,.18) 50%,transparent 80%);background-size:220% 100%;animation:wcg-shimmer 2.8s linear infinite}'
    + '.wcg-code-val{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:700;font-size:20px;letter-spacing:2px;position:relative}'
    + '.wcg-copy{position:relative;border:none;cursor:pointer;border-radius:9px;padding:8px 12px;background:#2563eb;color:#fff;font-weight:700;font-size:13px}'
    + '.wcg-copy.copied{background:#15a35a}'
    + '.wcg-actions{margin-top:18px;display:flex;flex-direction:column;gap:9px;width:min(300px,100%)}'
    + '.wcg-btn{width:100%;box-sizing:border-box;border-radius:12px;padding:12px 16px;font-weight:700;font-size:14.5px;cursor:pointer;border:1px solid transparent;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px}'
    + '.wcg-btn-primary{background:linear-gradient(180deg,#ffce5c,#f5a524);color:#3a2400}'
    + '.wcg-btn-ghost{background:transparent;border-color:rgba(255,255,255,.4);color:#fff}'
    + '.wcg-fine{font-size:11.5px;color:#9fb1c9;margin-top:12px}';
  var styleEl = document.createElement("style");
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ---------------------------- Launcher ---------------------------- */
  var launch = document.createElement("div");
  launch.className = "wcg-launch";
  launch.innerHTML =
      '<span class="wcg-label">⚽ World Cup game — win ' + D + '% off!</span>'
    + '<button class="wcg-launch-btn" aria-label="Play the World Cup mini-game and win a ' + D + '% discount">'
    + '<span class="wcg-ring" aria-hidden="true"></span>'
    + '<span class="wcg-ball" aria-hidden="true">⚽</span>'
    + '<span class="wcg-badge">' + D + '% OFF</span>'
    + '</button>';
  document.body.appendChild(launch);
  launch.querySelector(".wcg-launch-btn").addEventListener("click", openModal);

  /* ------------------------------ Modal ----------------------------- */
  var overlay = null, engine = null, bodyOverflow = "";
  var best = 0;
  try { var b = parseInt(localStorage.getItem(BEST_KEY) || "0", 10); if (b > 0) best = b; } catch (e) {}

  function openModal() {
    launch.style.display = "none";
    bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    overlay = document.createElement("div");
    overlay.className = "wcg-overlay";
    overlay.innerHTML =
        '<div class="wcg-modal" role="dialog" aria-modal="true" aria-label="World Cup mini-game">'
      + '<div class="wcg-head"><span class="wcg-title">⚽ Super Kick-Up! <span class="wcg-pill">WIN ' + D + '% OFF</span></span>'
      + '<button class="wcg-close" aria-label="Close game">×</button></div>'
      + '<div class="wcg-stage"><canvas class="wcg-canvas"></canvas></div>'
      + '</div>';
    document.body.appendChild(overlay);

    overlay.addEventListener("mousedown", function (e) { if (e.target === overlay) closeModal(); });
    overlay.querySelector(".wcg-close").addEventListener("click", closeModal);
    document.addEventListener("keydown", onEsc);

    var canvas = overlay.querySelector(".wcg-canvas");
    engine = createKickUpGame(canvas, { initialBest: best, onGameOver: showReward });
  }

  function onEsc(e) { if (e.key === "Escape") closeModal(); }

  function closeModal() {
    document.removeEventListener("keydown", onEsc);
    if (engine) { engine.destroy(); engine = null; }
    if (overlay) { overlay.remove(); overlay = null; }
    document.body.style.overflow = bodyOverflow;
    launch.style.display = "";
  }

  function showReward(score, newBest) {
    if (newBest > best) { best = newBest; try { localStorage.setItem(BEST_KEY, String(best)); } catch (e) {} }
    var stage = overlay.querySelector(".wcg-stage");
    var pts = score === 1 ? "point" : "points";
    var r = document.createElement("div");
    r.className = "wcg-reward";
    r.innerHTML =
        '<div class="wcg-trophy" aria-hidden="true">🏆</div>'
      + '<div class="wcg-score">Full time — you scored ' + score + ' ' + pts + '!</div>'
      + '<div class="wcg-headline">Your World Cup gift:<br><span class="wcg-pct">' + D + '% OFF</span> everything</div>'
      + '<div class="wcg-sub">Every player wins the full ' + D + '% — win or lose. Use this code at checkout:</div>'
      + '<div class="wcg-code"><span class="wcg-code-val">' + COUPON_CODE + '</span>'
      + '<button class="wcg-copy" type="button">Copy</button></div>'
      + '<div class="wcg-actions">'
      + '<a class="wcg-btn wcg-btn-primary" href="' + SHOP_URL + '">Shop now &amp; save ' + D + '% →</a>'
      + '<button class="wcg-btn wcg-btn-ghost" type="button" data-wcg="again">Play again</button>'
      + '</div>'
      + '<div class="wcg-fine">Best score: ' + best + ' · Code ' + COUPON_CODE + ' · ' + D + '% off your order</div>';
    stage.appendChild(r);

    r.querySelector(".wcg-copy").addEventListener("click", function () {
      var btn = this;
      copyText(COUPON_CODE);
      btn.textContent = "Copied!"; btn.classList.add("copied");
      setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 2000);
    });
    r.querySelector('[data-wcg="again"]').addEventListener("click", function () {
      r.remove(); if (engine) engine.restart();
    });
  }

  function copyText(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).catch(fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  /* ===================================================================
     GAME ENGINE — "Super Kick-Up!" (canvas, sized to its container)
     Tap / click / Space = kick. Dodge the posts + defenders, fly through
     the bonus goal (+5). Reports the final score via handlers.onGameOver.
     =================================================================== */
  function createKickUpGame(canvas, handlers) {
    handlers = handlers || {};
    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, DPR = 1, rafId = 0, destroyed = false;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      var rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    // Audio
    var AC = null;
    function audio() {
      if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
      if (AC && AC.state === "suspended") AC.resume();
    }
    function tone(freq, dur, type, vol, slide) {
      if (!AC) return;
      type = type || "square"; vol = vol || 0.15; slide = slide || 0;
      var o = AC.createOscillator(), g = AC.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, AC.currentTime);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), AC.currentTime + dur);
      g.gain.setValueAtTime(vol, AC.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + dur);
      o.connect(g).connect(AC.destination);
      o.start(); o.stop(AC.currentTime + dur);
    }
    var sKick = function () { tone(150, 0.12, "sine", 0.3, -90); tone(600, 0.05, "square", 0.06); };
    var sPoint = function () { tone(880, 0.09, "square", 0.12); setTimeout(function () { tone(1175, 0.12, "square", 0.12); }, 70); };
    var sGoal = function () { [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { tone(f, 0.18, "square", 0.16); }, i * 90); }); };
    var sHit = function () { tone(220, 0.35, "sawtooth", 0.2, -160); };
    var vibrate = function (ms) { if (navigator.vibrate) navigator.vibrate(ms); };

    var rand = function (a, b) { return a + Math.random() * (b - a); };
    var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
    function rr(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }

    var state = "menu";
    var ball, obstacles, bonusGoal, particles, floats, score, best = handlers.initialBest || 0;
    var speed, time, goalTimer, kickAnim, shake, deadT, groundScroll, cloudOff = 0;

    function S() { return Math.min(W, 480) / 380; }

    function reset() {
      var s = S();
      ball = { x: W * 0.3, y: H * 0.4, vy: 0, r: 17 * s, rot: 0 };
      obstacles = []; particles = []; floats = []; bonusGoal = null;
      score = 0; speed = 170 * s;
      time = 0; goalTimer = 0; kickAnim = 0; shake = 0; deadT = 0; groundScroll = 0;
    }
    reset();

    function tap(e) {
      if (e && e.preventDefault) e.preventDefault();
      audio();
      if (state === "menu") { state = "play"; reset(); kick(); return; }
      if (state === "play") { kick(); return; }
      if (state === "dead" && deadT > 0.6) { state = "play"; reset(); kick(); }
    }
    function kick() {
      ball.vy = -560 * S(); kickAnim = 1; sKick(); vibrate(15);
      for (var i = 0; i < 6; i++) particles.push({
        x: ball.x - ball.r, y: ball.y + ball.r,
        vx: rand(-120, -30), vy: rand(-60, 60), life: rand(0.25, 0.5), r: rand(2, 5) * S(), col: "#ffffff"
      });
    }
    var onTouch = function (e) { tap(e); };
    var onMouse = function (e) { tap(e); };
    var onKey = function (e) { if (e.code === "Space") tap(e); };
    canvas.addEventListener("touchstart", onTouch, { passive: false });
    canvas.addEventListener("mousedown", onMouse);
    window.addEventListener("keydown", onKey);

    function groundH() { return 90 * S(); }
    function postW() { return 16 * S(); }

    function spawnObstacle() {
      var s = S(), w = 62 * s;
      var gap = clamp(185 * s - score * 1.1 * s, 138 * s, 185 * s);
      var margin = 70 * s;
      var gapY = rand(margin + gap / 2, H - groundH() - margin - gap / 2);
      obstacles.push({ x: W + w, w: w, topH: gapY - gap / 2, botY: gapY + gap / 2, passed: false, seed: Math.floor(Math.random() * 1000) });
    }
    function spawnBonusGoal() {
      var s = S(), opening = ball.r * 6;
      var y = rand(120 * s + opening / 2, H - groundH() - 60 * s - opening / 2);
      bonusGoal = { x: W + 160 * s, y: y, opening: opening, scored: false };
      floats.push({ x: W / 2, y: 110 * s, txt: "BONUS GOAL!", life: 1.6, col: "#ff8c1a", size: 26 * s });
    }

    function update(dt) {
      var s = S();
      cloudOff += dt * 18 * s;
      if (kickAnim > 0) kickAnim = Math.max(0, kickAnim - dt * 4.5);
      if (shake > 0) shake = Math.max(0, shake - dt * 30);
      particles.forEach(function (p) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt; p.life -= dt; });
      particles = particles.filter(function (p) { return p.life > 0; });
      floats.forEach(function (f) { f.y -= 30 * s * dt; f.life -= dt; });
      floats = floats.filter(function (f) { return f.life > 0; });

      if (state !== "play") { if (state === "dead") { deadT += dt; ballPhysics(dt, true); } return; }

      time += dt; goalTimer += dt;
      groundScroll = (groundScroll + speed * dt) % (40 * s);
      speed = Math.min(speed + dt * 4 * s, 330 * s);
      ballPhysics(dt, false);

      var last = obstacles[obstacles.length - 1];
      if (!last || last.x < W - 240 * s) { if (!(bonusGoal && bonusGoal.x > W - 200 * s)) spawnObstacle(); }
      if (goalTimer >= 20) { goalTimer = 0; spawnBonusGoal(); }

      var pw = postW();
      for (var k = 0; k < obstacles.length; k++) {
        var o = obstacles[k];
        o.x -= speed * dt;
        if (!o.passed && o.x + o.w < ball.x - ball.r) {
          o.passed = true; score += 1; sPoint();
          floats.push({ x: ball.x, y: ball.y - 40 * s, txt: "+1", life: 0.8, col: "#2e7d32", size: 20 * s });
        }
        var px = o.x + (o.w - pw) / 2;
        if (circleRect(ball.x, ball.y, ball.r * 0.85, px, 0, pw, o.topH) ||
            circleRect(ball.x, ball.y, ball.r * 0.85, o.x, o.botY, o.w, H - groundH() - o.botY)) { die(); }
      }
      obstacles = obstacles.filter(function (o) { return o.x + o.w > -20; });

      if (bonusGoal) {
        bonusGoal.x -= speed * dt;
        var g = bonusGoal;
        if (!g.scored && ball.x > g.x - 6 * s && ball.x < g.x + 26 * s && Math.abs(ball.y - g.y) < g.opening / 2 - ball.r * 0.4) {
          g.scored = true; score += 5; sGoal(); vibrate([30, 40, 30]);
          floats.push({ x: ball.x, y: ball.y - 50 * s, txt: "GOAL!!! +5", life: 1.5, col: "#e91e63", size: 30 * s });
          for (var i = 0; i < 40; i++) particles.push({
            x: g.x, y: g.y, vx: rand(-250, 250), vy: rand(-350, 100), life: rand(0.5, 1.1), r: rand(3, 7) * s,
            col: ["#ff5252", "#ffd600", "#40c4ff", "#69f0ae", "#e040fb"][i % 5]
          });
        }
        if (g.x < -120 * s) bonusGoal = null;
      }

      if (ball.y + ball.r > H - groundH()) die();
      if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy = Math.max(ball.vy, 0); }
    }

    function ballPhysics(dt, deadMode) {
      ball.vy += 1750 * S() * dt;
      ball.vy = Math.min(ball.vy, 900 * S());
      ball.y += ball.vy * dt;
      ball.rot += (deadMode ? 6 : speed / 60) * dt;
      if (deadMode && ball.y + ball.r > H - groundH()) {
        ball.y = H - groundH() - ball.r; ball.vy = -Math.abs(ball.vy) * 0.35;
        if (Math.abs(ball.vy) < 40) ball.vy = 0;
      }
    }
    function circleRect(cx, cy, r, rx, ry, rw, rh) {
      var nx = clamp(cx, rx, rx + rw), ny = clamp(cy, ry, ry + rh);
      return (cx - nx) * (cx - nx) + (cy - ny) * (cy - ny) < r * r;
    }
    function die() {
      if (state !== "play") return;
      state = "dead"; deadT = 0; shake = 12; ball.vy = -300 * S();
      best = Math.max(best, score); sHit(); vibrate(120);
      if (handlers.onGameOver) handlers.onGameOver(score, best);
    }

    // Stadium (prerendered + tiled)
    var stadium = null, stadiumKey = "";
    function buildStadium() {
      var key = W + "x" + H + "x" + DPR;
      if (stadium && stadiumKey === key) return;
      stadiumKey = key;
      var s = S(), gy = H - groundH(), top = Math.round(H * 0.5), sh = gy - top;
      if (sh <= 20) { stadium = null; return; }
      var TILE = Math.round(260 * s);
      var c = document.createElement("canvas");
      c.width = TILE * DPR; c.height = sh * DPR;
      var g = c.getContext("2d"); g.scale(DPR, DPR);
      var bg = g.createLinearGradient(0, 0, 0, sh);
      bg.addColorStop(0, "#4a5a6e"); bg.addColorStop(1, "#36455a");
      g.fillStyle = bg; g.fillRect(0, 0, TILE, sh);
      var roofH = 12 * s, adH = 22 * s;
      g.fillStyle = "#2c3a4d"; g.fillRect(0, 0, TILE, roofH);
      g.fillStyle = "#ffffff"; g.fillRect(0, roofH, TILE, 2 * s);
      g.fillStyle = "#ffe082";
      for (var fi = 0; fi < 3; fi++) g.fillRect(fi * TILE / 3 + TILE / 6 - 8 * s, 3 * s, 16 * s, 4 * s);
      var rowsH = sh - roofH - adH - 2 * s, nRows = Math.max(2, Math.floor(rowsH / (26 * s))), rh = rowsH / nRows;
      var seatCols = ["#35508f", "#2e4682"];
      function srnd(a) { var x = Math.sin(a * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
      var shirtCols = ["#37474f", "#5d6d7e", "#7b241c", "#6e7f4f", "#d5d8dc", "#34495e", "#8e6e53", "#212f3c", "#aab7b8", "#c0392b"];
      var skinCols = ["#f1c9a5", "#e3b58a", "#c68642", "#8d5524", "#6b4423"];
      var hairCols = ["#1b1b1b", "#2d2218", "#4a3320", "#6b4f2f", "#8a8a8a", "#b8b8b8"];
      for (var r2 = 0; r2 < nRows; r2++) {
        var ry = roofH + 2 * s + r2 * rh, depth = r2 / Math.max(1, nRows - 1), pscale = 0.78 + 0.22 * depth;
        g.fillStyle = seatCols[r2 % 2]; g.fillRect(0, ry, TILE, rh);
        g.fillStyle = "rgba(0,0,0,0.22)"; g.fillRect(0, ry + rh - 3 * s, TILE, 3 * s);
        var nP = Math.floor(TILE / (18 * s));
        for (var pi = 0; pi < nP; pi++) {
          var rv = srnd(r2 * 97 + pi), rv2 = srnd(r2 * 131 + pi * 17 + 7), rv3 = srnd(r2 * 53 + pi * 29 + 13);
          if (rv < 0.10) continue;
          var x = (pi + 0.5) * TILE / nP + (rv2 - 0.5) * 4 * s, baseY = ry + rh - 2 * s + (rv3 - 0.5) * 2 * s;
          var shirt = shirtCols[Math.floor(rv * 97) % shirtCols.length], skin = skinCols[Math.floor(rv2 * 61) % skinCols.length], hairC = hairCols[Math.floor(rv3 * 43) % hairCols.length];
          var hr2 = rh * 0.155 * pscale, shoulderW = rh * 0.32 * pscale, torsoH2 = rh * 0.46 * pscale, hy2 = baseY - torsoH2 - hr2 * 0.85;
          g.fillStyle = shirt;
          g.beginPath();
          g.moveTo(x - shoulderW, baseY);
          g.lineTo(x - shoulderW * 0.92, baseY - torsoH2 * 0.72);
          g.quadraticCurveTo(x - shoulderW * 0.85, baseY - torsoH2, x - shoulderW * 0.45, baseY - torsoH2);
          g.lineTo(x + shoulderW * 0.45, baseY - torsoH2);
          g.quadraticCurveTo(x + shoulderW * 0.85, baseY - torsoH2, x + shoulderW * 0.92, baseY - torsoH2 * 0.72);
          g.lineTo(x + shoulderW, baseY); g.closePath(); g.fill();
          g.fillStyle = "rgba(0,0,0,0.15)";
          g.beginPath();
          g.moveTo(x + shoulderW * 0.2, baseY); g.lineTo(x + shoulderW * 0.3, baseY - torsoH2 * 0.9);
          g.lineTo(x + shoulderW * 0.92, baseY - torsoH2 * 0.72); g.lineTo(x + shoulderW, baseY); g.closePath(); g.fill();
          g.fillStyle = rv2 > 0.5 ? shirt : skin;
          g.fillRect(x - shoulderW * 1.02, baseY - torsoH2 * 0.6, 3 * s * pscale, torsoH2 * 0.6);
          g.fillRect(x + shoulderW * 1.02 - 3 * s * pscale, baseY - torsoH2 * 0.6, 3 * s * pscale, torsoH2 * 0.6);
          if (rv > 0.92) { g.fillStyle = skin; g.fillRect(x + shoulderW * 0.55, hy2 - hr2 * 1.4, 2.4 * s * pscale, hr2 * 1.6); g.fillStyle = "#cfd8dc"; g.fillRect(x + shoulderW * 0.40, hy2 - hr2 * 1.9, 5 * s * pscale, 7 * s * pscale); }
          if (rv3 > 0.85) { g.fillStyle = ["#c0392b", "#2471a3", "#d4ac0d"][Math.floor(rv * 31) % 3]; g.fillRect(x - shoulderW * 0.5, baseY - torsoH2 + 1 * s, shoulderW, 3 * s * pscale); }
          g.fillStyle = skin; g.fillRect(x - hr2 * 0.28, hy2 + hr2 * 0.6, hr2 * 0.56, hr2 * 0.6);
          g.beginPath(); g.arc(x, hy2, hr2, 0, 7); g.fill();
          var hs = (rv * 13) % 1;
          if (hs > 0.15) {
            g.fillStyle = hairC;
            if (hs > 0.7) { g.beginPath(); g.arc(x, hy2 - hr2 * 0.15, hr2 * 1.02, Math.PI, 0); g.fill(); g.fillRect(x - hr2 * 1.0, hy2 - hr2 * 0.2, hr2 * 0.35, hr2 * 1.1); g.fillRect(x + hr2 * 0.65, hy2 - hr2 * 0.2, hr2 * 0.35, hr2 * 1.1); }
            else { g.beginPath(); g.arc(x, hy2 - hr2 * 0.22, hr2 * 0.95, Math.PI * 1.05, -0.05 * Math.PI); g.fill(); }
          }
          g.fillStyle = "rgba(0,0,0,0.10)"; g.beginPath(); g.arc(x + hr2 * 0.35, hy2 + hr2 * 0.1, hr2 * 0.5, -0.6, 1.8); g.fill();
        }
        g.fillStyle = "rgba(40,55,75," + (0.28 * (1 - depth)).toFixed(3) + ")"; g.fillRect(0, ry, TILE, rh);
      }
      g.fillStyle = "#eceff1"; g.fillRect(0, sh - adH, TILE, adH);
      g.fillStyle = "#b0bec5"; g.fillRect(0, sh - adH, TILE, 2 * s);
      var adCols = ["#e53935", "#1e88e5", "#43a047", "#fb8c00"];
      for (var ai = 0; ai < 4; ai++) { g.fillStyle = adCols[ai]; g.fillRect(ai * TILE / 4 + 8 * s, sh - adH + 5 * s, TILE / 4 - 16 * s, adH - 10 * s); }
      stadium = { c: c, TILE: TILE, top: top, sh: sh };
    }
    function drawStadium() {
      buildStadium(); if (!stadium) return;
      var off = ((cloudOff * 0.5) % stadium.TILE + stadium.TILE) % stadium.TILE;
      for (var x = -off; x < W; x += stadium.TILE) ctx.drawImage(stadium.c, x, stadium.top, stadium.TILE, stadium.sh);
    }

    function draw() {
      var s = S();
      ctx.save();
      if (shake > 0) ctx.translate(rand(-shake, shake), rand(-shake, shake));
      var sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#6fd2ff"); sky.addColorStop(0.7, "#aee7ff"); sky.addColorStop(1, "#d8f4ff");
      ctx.fillStyle = sky; ctx.fillRect(-20, -20, W + 40, H + 40);
      drawClouds(s); drawStadium();
      if (bonusGoal) drawBonusGoal(bonusGoal, s);
      for (var i = 0; i < obstacles.length; i++) drawObstacle(obstacles[i], s);
      drawGround(s); drawBoot(s); drawBall(s);
      for (var pj = 0; pj < particles.length; pj++) { var p = particles[pj]; ctx.globalAlpha = clamp(p.life * 2, 0, 1); ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
      for (var fj = 0; fj < floats.length; fj++) { var f = floats[fj]; ctx.globalAlpha = clamp(f.life, 0, 1); cartoonText(f.txt, f.x, f.y, f.size, f.col); }
      ctx.globalAlpha = 1;
      if (state === "play" || state === "dead") {
        cartoonText(String(score), W / 2, 70 * s, 44 * s, "#ffffff");
        if (state === "play" && goalTimer > 15 && !bonusGoal) cartoonText("Goal in " + Math.ceil(20 - goalTimer) + "…", W / 2, 108 * s, 16 * s, "#ffec99");
      }
      if (state === "menu") drawMenu(s);
      if (state === "dead" && deadT > 0.5) drawGameOver(s);
      ctx.restore();
    }

    function cartoonText(txt, x, y, size, col) {
      ctx.font = 'bold ' + size + 'px "Chalkboard SE","Comic Sans MS",cursive';
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.lineWidth = size / 6; ctx.lineJoin = "round";
      ctx.strokeStyle = "#23323f"; ctx.strokeText(txt, x, y);
      ctx.fillStyle = col; ctx.fillText(txt, x, y);
    }
    function drawClouds(s) {
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      var cs = [[0.15, 0.10, 1], [0.55, 0.18, 1.4], [0.85, 0.07, 0.8], [0.35, 0.28, 0.7]];
      for (var i = 0; i < cs.length; i++) {
        var fx = cs[i][0], fy = cs[i][1], sc = cs[i][2];
        var x = ((fx * W - cloudOff * sc) % (W + 200 * s) + W + 200 * s) % (W + 200 * s) - 100 * s, y = fy * H, r = 22 * s * sc;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.arc(x + r * 1.1, y + 4 * s, r * 0.8, 0, 7); ctx.arc(x - r * 1.1, y + 5 * s, r * 0.75, 0, 7); ctx.fill();
      }
    }
    function drawGround(s) {
      var gy = H - groundH();
      ctx.fillStyle = "#58b94c"; ctx.fillRect(-20, gy, W + 40, groundH() + 20);
      ctx.fillStyle = "#4caf43";
      for (var i = -1; i < W / (40 * s) + 2; i++) { var x = i * 40 * s - groundScroll; ctx.fillRect(x, gy, 20 * s, groundH() + 20); }
      ctx.fillStyle = "#ffffff"; ctx.fillRect(-20, gy, W + 40, 5 * s);
      ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.fillRect(-20, gy + 5 * s, W + 40, 4 * s);
    }
    function drawBall(s) {
      var x = ball.x, y = ball.y, r = ball.r, rot = ball.rot, gy = H - groundH();
      var sh = clamp(1 - (gy - y) / (H * 0.7), 0.15, 0.8);
      ctx.save(); ctx.globalAlpha = 0.25 * sh; ctx.fillStyle = "#1b3a17";
      ctx.beginPath(); ctx.ellipse(x, gy + 8 * s, r * 1.1 * sh + r * 0.4, r * 0.3, 0, 0, 7); ctx.fill(); ctx.restore();
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fillStyle = "#ffffff"; ctx.fill();
      ctx.lineWidth = 3.5 * s; ctx.strokeStyle = "#23323f"; ctx.stroke(); ctx.fillStyle = "#23323f";
      pent(0, 0, r * 0.42);
      for (var i = 0; i < 5; i++) { var a = i * Math.PI * 2 / 5 - Math.PI / 2; pent(Math.cos(a) * r * 0.78, Math.sin(a) * r * 0.78, r * 0.26); }
      ctx.restore();
      function pent(px, py, pr) {
        ctx.beginPath();
        for (var i = 0; i < 5; i++) { var a = i * Math.PI * 2 / 5 - Math.PI / 2, X = px + Math.cos(a) * pr, Y = py + Math.sin(a) * pr; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
        ctx.closePath(); ctx.fill();
      }
    }
    function drawBoot(s) {
      if (kickAnim <= 0) return;
      var t = 1 - kickAnim, swing = Math.sin(Math.min(t * 1.6, 1) * Math.PI), u = S();
      var ax = ball.x - ball.r * 2.3 + swing * ball.r * 0.7, ay = ball.y + ball.r * 1.6 - swing * ball.r * 0.9;
      ctx.save(); ctx.globalAlpha = clamp(kickAnim * 1.6, 0, 1); ctx.translate(ax, ay); ctx.rotate(0.55 - swing * 0.85);
      ctx.strokeStyle = "#23323f"; ctx.lineWidth = 3 * u; ctx.lineJoin = "round";
      ctx.fillStyle = "#e53935"; rr(-62 * u, -16 * u, 56 * u, 17 * u, 7 * u); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#ffffff"; ctx.fillRect(-50 * u, -16 * u, 6 * u, 17 * u); ctx.fillRect(-38 * u, -16 * u, 6 * u, 17 * u);
      ctx.fillStyle = "#1e88e5";
      ctx.beginPath(); ctx.moveTo(-12 * u, 9 * u);
      ctx.quadraticCurveTo(-15 * u, -8 * u, 2 * u, -12 * u); ctx.quadraticCurveTo(27 * u, -16 * u, 32 * u, -5 * u);
      ctx.quadraticCurveTo(33 * u, 5 * u, 17 * u, 7 * u); ctx.lineTo(12 * u, 11 * u); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath(); ctx.moveTo(18 * u, -13.5 * u);
      ctx.quadraticCurveTo(28 * u, -15 * u, 32 * u, -5 * u); ctx.quadraticCurveTo(32.5 * u, 2 * u, 24 * u, 5 * u);
      ctx.quadraticCurveTo(26 * u, -6 * u, 18 * u, -13.5 * u); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2.2 * u;
      for (var i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo((-2 + i * 6) * u, (-9 + i) * u); ctx.lineTo((4 + i * 6) * u, (-12 + i) * u); ctx.stroke(); }
      ctx.fillStyle = "#23323f";
      for (var j = 0; j < 4; j++) { ctx.beginPath(); ctx.arc((-6 + j * 9) * u, (10 - j * 1.2) * u, 2.2 * u, 0, 7); ctx.fill(); }
      ctx.restore();
    }
    function drawObstacle(o, s) { drawTopPost(o, s); drawDefenders(o, s); }
    function drawTopPost(o, s) {
      var pw = postW(), px = o.x + (o.w - pw) / 2;
      ctx.fillStyle = "#ffffff"; ctx.strokeStyle = "#23323f"; ctx.lineWidth = 3 * s; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(px, -10); ctx.lineTo(px, o.topH - pw / 2);
      ctx.arc(px + pw / 2, o.topH - pw / 2, pw / 2, Math.PI, 0, true); ctx.lineTo(px + pw, -10); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "rgba(35,50,63,0.12)"; ctx.fillRect(px + pw * 0.6, -10, pw * 0.28, Math.max(0, o.topH - pw / 2 + 6));
    }
    function drawDefenders(o, s) {
      var gy = H - groundH(), totalH = gy - o.botY, dh = 105 * s, n = Math.max(1, Math.ceil(totalH / dh)), each = totalH / n;
      for (var i = 0; i < n; i++) drawDefender(o.x + o.w / 2, gy - i * each, o.w * 0.95, each, s, o.seed + i * 7);
    }
    function drawDefender(cx, footY, w, h, s, seed) {
      var sd = ((seed % 1000) + 1000) % 1000;
      var pick = function (arr, k) { return arr[(sd * k + k) % arr.length]; };
      ctx.save(); ctx.translate(cx, footY); ctx.strokeStyle = "#1d2733"; ctx.lineWidth = 2.6 * s; ctx.lineJoin = "round";
      var kits = [["#e53945", "#ffffff", "#e53945", "#ffd54f"], ["#1e63d0", "#ffffff", "#1e63d0", "#ffffff"], ["#2e7d32", "#ffffff", "#2e7d32", "#ffeb3b"], ["#1b1b2a", "#f9a825", "#1b1b2a", "#f9a825"]];
      var kit = pick(kits, 3), jers = kit[0], shortCol = kit[1], sockCol = kit[2], trim = kit[3];
      var skin = pick(["#ffd9b0", "#f3c08e", "#c98e5a", "#8d5524"], 7);
      var hairC = pick(["#14141e", "#4a2c14", "#fdd835", "#c62828", "#3949ab", "#e8e8e8"], 5);
      var irisC = pick(["#4a2c14", "#1976d2", "#2e7d32", "#8e24aa"], 11);
      var hr = Math.min(h * 0.105, 17 * s), bootH = h * 0.045, legH = h * 0.27, shortH = h * 0.10, torsoH = h * 0.27, neckH = h * 0.028;
      var shW = Math.min(w * 0.56, h * 0.34), hipW = shW * 0.70, legW = shW * 0.25, y = 0;
      ctx.fillStyle = "#1d2733";
      rr(-hipW * 0.5 - 3 * s, -bootH, legW + 8 * s, bootH, 3 * s); ctx.fill();
      rr(hipW * 0.5 - legW - 5 * s, -bootH, legW + 8 * s, bootH, 3 * s); ctx.fill();
      ctx.fillStyle = trim; ctx.fillRect(-hipW * 0.5 - 3 * s, -bootH, legW + 8 * s, 2.2 * s); ctx.fillRect(hipW * 0.5 - legW - 5 * s, -bootH, legW + 8 * s, 2.2 * s);
      y -= bootH;
      var sockH = legH * 0.58, thighH = legH * 0.42;
      ctx.fillStyle = sockCol; ctx.fillRect(-hipW * 0.5, y - sockH, legW, sockH); ctx.fillRect(hipW * 0.5 - legW, y - sockH, legW, sockH);
      ctx.strokeRect(-hipW * 0.5, y - sockH, legW, sockH); ctx.strokeRect(hipW * 0.5 - legW, y - sockH, legW, sockH);
      ctx.fillStyle = trim; ctx.fillRect(-hipW * 0.5, y - sockH, legW, 3.5 * s); ctx.fillRect(hipW * 0.5 - legW, y - sockH, legW, 3.5 * s);
      ctx.fillStyle = "rgba(255,255,255,0.30)";
      rr(-hipW * 0.5 + legW * 0.22, y - sockH * 0.85, legW * 0.5, sockH * 0.62, 3 * s); ctx.fill();
      rr(hipW * 0.5 - legW + legW * 0.22, y - sockH * 0.85, legW * 0.5, sockH * 0.62, 3 * s); ctx.fill();
      ctx.fillStyle = skin; ctx.fillRect(-hipW * 0.5, y - legH, legW, thighH); ctx.fillRect(hipW * 0.5 - legW, y - legH, legW, thighH);
      ctx.strokeRect(-hipW * 0.5, y - legH, legW, thighH); ctx.strokeRect(hipW * 0.5 - legW, y - legH, legW, thighH);
      ctx.fillStyle = "rgba(0,0,0,0.13)"; ctx.fillRect(-hipW * 0.5 + legW * 0.62, y - legH, legW * 0.38, thighH); ctx.fillRect(hipW * 0.5 - legW * 0.38, y - legH, legW * 0.38, thighH);
      y -= legH;
      ctx.fillStyle = shortCol; rr(-hipW * 0.56, y - shortH, hipW * 1.12, shortH + 2 * s, 4 * s); ctx.fill(); ctx.stroke();
      ctx.fillStyle = (trim === "#ffffff") ? jers : trim; ctx.fillRect(-hipW * 0.56, y - shortH, 3 * s, shortH); ctx.fillRect(hipW * 0.56 - 3 * s, y - shortH, 3 * s, shortH);
      y -= shortH;
      ctx.fillStyle = jers;
      ctx.beginPath(); ctx.moveTo(-hipW * 0.5, y); ctx.lineTo(hipW * 0.5, y); ctx.lineTo(shW * 0.52, y - torsoH * 0.85);
      ctx.quadraticCurveTo(shW * 0.5, y - torsoH, shW * 0.30, y - torsoH); ctx.lineTo(-shW * 0.30, y - torsoH);
      ctx.quadraticCurveTo(-shW * 0.5, y - torsoH, -shW * 0.52, y - torsoH * 0.85); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0.14)";
      ctx.beginPath(); ctx.moveTo(hipW * 0.15, y); ctx.lineTo(hipW * 0.5, y); ctx.lineTo(shW * 0.52, y - torsoH * 0.85);
      ctx.quadraticCurveTo(shW * 0.5, y - torsoH, shW * 0.30, y - torsoH); ctx.lineTo(shW * 0.12, y - torsoH); ctx.closePath(); ctx.fill();
      ctx.fillStyle = trim; ctx.fillRect(-hipW * 0.5, y - 3.5 * s, hipW, 3.5 * s);
      ctx.strokeStyle = trim; ctx.lineWidth = 2.4 * s;
      ctx.beginPath(); ctx.moveTo(-shW * 0.14, y - torsoH); ctx.lineTo(0, y - torsoH + 7 * s); ctx.lineTo(shW * 0.14, y - torsoH); ctx.stroke();
      ctx.strokeStyle = "#1d2733"; ctx.lineWidth = 2.6 * s;
      var ayy = y - torsoH + 4 * s;
      ctx.fillStyle = jers; rr(-shW * 0.52 - 8 * s, ayy, 10 * s, torsoH * 0.34, 4 * s); ctx.fill(); ctx.stroke(); rr(shW * 0.52 - 2 * s, ayy, 10 * s, torsoH * 0.34, 4 * s); ctx.fill(); ctx.stroke();
      ctx.fillStyle = trim; ctx.fillRect(-shW * 0.52 - 8 * s, ayy + torsoH * 0.34 - 3 * s, 10 * s, 3 * s); ctx.fillRect(shW * 0.52 - 2 * s, ayy + torsoH * 0.34 - 3 * s, 10 * s, 3 * s);
      ctx.fillStyle = skin; rr(-shW * 0.52 - 10 * s, ayy + torsoH * 0.33, 9 * s, torsoH * 0.46, 4 * s); ctx.fill(); ctx.stroke(); rr(shW * 0.52 + 1 * s, ayy + torsoH * 0.33, 9 * s, torsoH * 0.46, 4 * s); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(-shW * 0.52 - 5.5 * s, ayy + torsoH * 0.82, 4.5 * s, 0, 7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(shW * 0.52 + 5.5 * s, ayy + torsoH * 0.82, 4.5 * s, 0, 7); ctx.fill(); ctx.stroke();
      cartoonText(String((sd % 9) + 2), 0, y - torsoH * 0.45, torsoH * 0.40, "#ffffff");
      y -= torsoH;
      ctx.fillStyle = skin; ctx.fillRect(-3.5 * s, y - neckH, 7 * s, neckH + 2 * s); y -= neckH;
      var hy = y - hr;
      ctx.fillStyle = skin;
      ctx.beginPath(); ctx.arc(0, hy - hr * 0.08, hr, Math.PI * 0.95, Math.PI * 0.05);
      ctx.quadraticCurveTo(hr * 1.0, hy + hr * 0.55, 0, hy + hr * 1.05); ctx.quadraticCurveTo(-hr * 1.0, hy + hr * 0.55, -hr * 0.998, hy - hr * 0.06); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(-hr * 0.98, hy + hr * 0.08, hr * 0.20, 0, 7); ctx.arc(hr * 0.98, hy + hr * 0.08, hr * 0.20, 0, 7); ctx.fill();
      var ey = hy + hr * 0.12, ew = hr * 0.34, eh = hr * 0.30, ex = hr * 0.42, signs = [-1, 1];
      for (var si = 0; si < 2; si++) {
        var sgn = signs[si];
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.ellipse(sgn * ex, ey, ew, eh, 0, 0, 7); ctx.fill();
        ctx.fillStyle = irisC; ctx.beginPath(); ctx.arc(sgn * ex, ey + eh * 0.08, ew * 0.62, 0, 7); ctx.fill();
        ctx.fillStyle = "#1d2733"; ctx.beginPath(); ctx.arc(sgn * ex, ey + eh * 0.10, ew * 0.30, 0, 7); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(sgn * ex - ew * 0.22, ey - eh * 0.22, ew * 0.20, 0, 7); ctx.fill();
        ctx.strokeStyle = "#1d2733"; ctx.lineWidth = 2.4 * s;
        ctx.beginPath(); ctx.moveTo(sgn * ex - sgn * ew, ey - eh * 0.55); ctx.quadraticCurveTo(sgn * ex, ey - eh * 1.05, sgn * ex + sgn * ew * 1.05, ey - eh * 0.45); ctx.stroke();
      }
      ctx.lineWidth = 2.2 * s;
      ctx.beginPath(); ctx.moveTo(-hr * 0.72, hy - hr * 0.32); ctx.lineTo(-hr * 0.14, hy - hr * 0.14); ctx.moveTo(hr * 0.72, hy - hr * 0.32); ctx.lineTo(hr * 0.14, hy - hr * 0.14); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hr * 0.02, hy + hr * 0.42); ctx.lineTo(hr * 0.10, hy + hr * 0.50); ctx.stroke();
      ctx.fillStyle = "#ffffff"; rr(-hr * 0.24, hy + hr * 0.62, hr * 0.48, hr * 0.18, 2 * s); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "rgba(229,57,69,0.55)"; ctx.lineWidth = 1.6 * s;
      ctx.beginPath(); ctx.moveTo(-hr * 0.74, hy + hr * 0.40); ctx.lineTo(-hr * 0.52, hy + hr * 0.34); ctx.moveTo(hr * 0.74, hy + hr * 0.40); ctx.lineTo(hr * 0.52, hy + hr * 0.34); ctx.stroke();
      ctx.strokeStyle = "#1d2733"; ctx.lineWidth = 2.6 * s;
      ctx.fillStyle = hairC; ctx.beginPath();
      var spikes = 7; ctx.moveTo(-hr * 1.02, hy + hr * 0.05);
      for (var hi = 0; hi <= spikes; hi++) {
        var a = Math.PI - (Math.PI * hi / spikes), rad = (hi % 2 === 0) ? hr * 1.05 : hr * 1.55;
        ctx.lineTo(Math.cos(a) * rad, hy - hr * 0.10 - Math.abs(Math.sin(a)) * rad * 0.9 + (hi % 2 === 0 ? hr * 0.18 : 0));
      }
      ctx.lineTo(hr * 1.02, hy + hr * 0.05); ctx.lineTo(hr * 0.65, hy - hr * 0.18); ctx.lineTo(hr * 0.35, hy + hr * 0.06);
      ctx.lineTo(hr * 0.05, hy - hr * 0.26); ctx.lineTo(-hr * 0.3, hy + hr * 0.04); ctx.lineTo(-hr * 0.6, hy - hr * 0.2); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 2 * s;
      ctx.beginPath(); ctx.arc(0, hy - hr * 0.35, hr * 0.95, Math.PI * 1.25, Math.PI * 1.6); ctx.stroke();
      ctx.strokeStyle = "#1d2733"; ctx.lineWidth = 2.6 * s;
      if (sd % 3 === 0) {
        ctx.fillStyle = "#8ed4ff"; ctx.beginPath(); ctx.moveTo(hr * 1.25, hy - hr * 0.45);
        ctx.quadraticCurveTo(hr * 1.55, hy - hr * 0.05, hr * 1.25, hy + hr * 0.02); ctx.quadraticCurveTo(hr * 0.98, hy - hr * 0.05, hr * 1.25, hy - hr * 0.45); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    }
    function drawBonusGoal(g, s) {
      var x = g.x, y = g.y, opening = g.opening, scored = g.scored, half = opening / 2, depth = 46 * s;
      ctx.save(); ctx.strokeStyle = "#23323f"; ctx.lineWidth = 3 * s;
      if (!scored) { ctx.save(); ctx.globalAlpha = 0.35 + 0.2 * Math.sin(performance.now() / 180); ctx.fillStyle = "#ffd600"; ctx.beginPath(); ctx.ellipse(x + 8 * s, y, half + 18 * s, half + 18 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
      ctx.fillStyle = scored ? "rgba(105,240,174,0.30)" : "rgba(255,255,255,0.45)";
      ctx.beginPath(); ctx.moveTo(x, y - half); ctx.lineTo(x + depth, y - half * 0.55); ctx.lineTo(x + depth, y + half * 0.55); ctx.lineTo(x, y + half); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = "rgba(35,50,63,0.4)"; ctx.lineWidth = 1.4 * s; ctx.beginPath();
      for (var i = 1; i < 4; i++) { var t = i / 4; ctx.moveTo(x + depth * t, y - half + (half - half * 0.55) * t); ctx.lineTo(x + depth * t, y + half - (half - half * 0.55) * t); }
      for (var j = 1; j < 5; j++) { var t2 = j / 5; ctx.moveTo(x, y - half + opening * t2); ctx.lineTo(x + depth, y - half * 0.55 + half * 1.1 * t2); }
      ctx.stroke();
      ctx.fillStyle = "#ffffff"; ctx.strokeStyle = "#23323f"; ctx.lineWidth = 3 * s;
      ctx.beginPath(); ctx.arc(x, y - half, 8 * s, 0, 7); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y + half, 8 * s, 0, 7); ctx.fill(); ctx.stroke();
      ctx.fillRect(x - 4 * s, y - half, 8 * s, opening); ctx.strokeRect(x - 4 * s, y - half, 8 * s, opening);
      if (scored) cartoonText("✔", x + depth / 2, y, 28 * s, "#2e7d32");
      ctx.restore();
    }
    function drawMenu(s) {
      ctx.fillStyle = "rgba(20,40,60,0.25)"; ctx.fillRect(-20, -20, W + 40, H + 40);
      cartoonText("SUPER", W / 2, H * 0.22, 56 * s, "#ffd600");
      cartoonText("KICK-UP!", W / 2, H * 0.22 + 60 * s, 56 * s, "#ff7043");
      var t = performance.now() / 400;
      ctx.save(); ctx.translate(W / 2, H * 0.45 + Math.sin(t) * 14 * s); ctx.rotate(t / 2);
      ctx.beginPath(); ctx.arc(0, 0, 30 * s, 0, 7); ctx.fillStyle = "#fff"; ctx.fill();
      ctx.lineWidth = 4 * s; ctx.strokeStyle = "#23323f"; ctx.stroke(); ctx.fillStyle = "#23323f";
      for (var i = 0; i < 5; i++) { var a = i * Math.PI * 2 / 5; ctx.beginPath(); ctx.arc(Math.cos(a) * 20 * s, Math.sin(a) * 20 * s, 7 * s, 0, 7); ctx.fill(); }
      ctx.beginPath(); ctx.arc(0, 0, 9 * s, 0, 7); ctx.fill(); ctx.restore();
      cartoonText("Tap to kick the ball!", W / 2, H * 0.6, 22 * s, "#ffffff");
      cartoonText("Dodge defenders & posts", W / 2, H * 0.6 + 32 * s, 17 * s, "#d6f3ff");
      cartoonText("Score in the bonus goal = +5", W / 2, H * 0.6 + 58 * s, 17 * s, "#d6f3ff");
      if (Math.sin(performance.now() / 300) > -0.3) cartoonText("TAP TO START", W / 2, H * 0.82, 26 * s, "#ffd600");
    }
    function drawGameOver(s) {
      ctx.fillStyle = "rgba(20,40,60,0.45)"; ctx.fillRect(-20, -20, W + 40, H + 40);
      cartoonText("FULL TIME!", W / 2, H * 0.3, 44 * s, "#ff5252");
      cartoonText("Score: " + score, W / 2, H * 0.43, 34 * s, "#ffffff");
      cartoonText("Best: " + best, W / 2, H * 0.43 + 44 * s, 24 * s, "#ffd600");
    }

    var lastT = performance.now();
    function loop(now) {
      if (destroyed) return;
      var dt = Math.min((now - lastT) / 1000, 0.033); lastT = now;
      update(dt); draw(); rafId = requestAnimationFrame(loop);
    }

    resize();
    var ro = null;
    if (typeof ResizeObserver !== "undefined") { ro = new ResizeObserver(function () { resize(); }); ro.observe(canvas); }
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(loop);

    return {
      restart: function () { audio(); state = "play"; reset(); kick(); },
      destroy: function () {
        destroyed = true; cancelAnimationFrame(rafId);
        if (ro) ro.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("keydown", onKey);
        canvas.removeEventListener("touchstart", onTouch);
        canvas.removeEventListener("mousedown", onMouse);
        try { if (AC) AC.close(); } catch (e) {}
      }
    };
  }
})();
