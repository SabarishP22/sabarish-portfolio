/* Hero 3D scene — floating phone cycling through five concept app screens. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(pointer: fine)').matches;
  const F = { d: 'Bricolage Grotesque, sans-serif', b: 'Geist, Inter, sans-serif', m: 'Geist Mono, monospace' };

  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function box(c, x, y, w, h, r, fill) { rr(c, x, y, w, h, r); c.fillStyle = fill; c.fill(); }
  function tx(c, s, x, y, font, col, al) { c.font = font; c.fillStyle = col; c.textAlign = al || 'left'; c.fillText(s, x, y); c.textAlign = 'left'; }
  function lg(c, x0, y0, x1, y1, a, b) { const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, a); g.addColorStop(1, b); return g; }

  function chrome(c, W, H, accent) {
    c.fillStyle = lg(c, 0, 0, 0, H, '#120e20', '#08070d'); c.fillRect(0, 0, W, H);
    const g = c.createRadialGradient(W * .85, H * .04, 10, W * .85, H * .04, W); g.addColorStop(0, accent); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    tx(c, '9:41', 44, 62, `600 26px ${F.b}`, '#fff');
    c.fillStyle = '#fff'; c.fillRect(W - 112, 46, 40, 18); c.fillRect(W - 64, 46, 22, 18);
    c.beginPath(); c.arc(W / 2, 52, 14, 0, 7); c.fillStyle = '#000'; c.fill();
    box(c, W / 2 - 80, H - 28, 160, 8, 4, 'rgba(255,255,255,.5)');
  }
  function header(c, W, small, big, y = 150) { tx(c, small, 44, y, `500 24px ${F.b}`, '#a1a1aa'); tx(c, big, 44, y + 58, `700 52px ${F.d}`, '#fff'); }
  function navbar(c, W, H, active) { c.fillStyle = 'rgba(255,255,255,.04)'; c.fillRect(0, H - 140, W, 140); for (let i = 0; i < 4; i++) { const nx = W / 8 + i * W / 4; if (i === active) box(c, nx - 46, H - 112, 92, 52, 26, 'rgba(139,92,246,.45)'); box(c, nx - 14, H - 100, 28, 28, 8, i === active ? '#fff' : '#52525b'); } }

  const SCREENS = [
    { label: 'Nutrition dashboard', draw(c, W, H, t) {
      chrome(c, W, H, 'rgba(139,92,246,.45)'); header(c, W, 'Today', 'Nutrition');
      const cx = 36, cy = 250, cw = W - 72, ch = 330; rr(c, cx, cy, cw, ch, 38); c.fillStyle = lg(c, cx, cy, cx + cw, cy + ch, '#6d28d9', '#312e81'); c.fill();
      const p = .62 + .08 * Math.sin(t * .7), rx = cx + 150, ry = cy + ch / 2;
      c.lineWidth = 24; c.lineCap = 'round'; c.strokeStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.arc(rx, ry, 92, 0, 7); c.stroke();
      c.strokeStyle = '#fff'; c.beginPath(); c.arc(rx, ry, 92, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); c.stroke();
      tx(c, Math.round(2100 * p).toLocaleString(), rx, ry + 8, `700 40px ${F.d}`, '#fff', 'center'); tx(c, 'kcal eaten', rx, ry + 42, `500 20px ${F.b}`, '#c4b5fd', 'center');
      [['Protein', .72, '#A78BFA'], ['Carbs', .54, '#60A5FA'], ['Fat', .38, '#34D399']].forEach(([n, v, col], i) => { const y = cy + 92 + i * 78; tx(c, n, cx + 290, y, `500 22px ${F.b}`, '#e4e4e7'); box(c, cx + 290, y + 16, 230, 12, 6, 'rgba(255,255,255,.15)'); box(c, cx + 290, y + 16, 230 * (v + .05 * Math.sin(t + i)), 12, 6, col); });
      tx(c, 'Meals', 44, 650, `600 30px ${F.d}`, '#fff');
      [['Breakfast', 'Oats · Banana', '#F59E0B'], ['Lunch', 'Rice · Dal · Salad', '#34D399'], ['Snack', 'Greek yogurt', '#60A5FA']].forEach(([a, b, col], i) => { const y = 680 + i * 118; box(c, 36, y, W - 72, 100, 28, 'rgba(255,255,255,.05)'); box(c, 60, y + 20, 60, 60, 18, col + '55'); tx(c, a, 142, y + 46, `600 26px ${F.b}`, '#fff'); tx(c, b, 142, y + 78, `400 20px ${F.b}`, '#a1a1aa'); });
      rr(c, 36, 1040, W - 72, 96, 28); c.fillStyle = lg(c, 36, 0, W - 36, 0, 'rgba(245,158,11,.3)', 'rgba(139,92,246,.2)'); c.fill(); tx(c, '🔥  7-day challenge', 64, 1098, `600 26px ${F.b}`, '#fff');
      navbar(c, W, H, 2);
    } },
    { label: 'AI assistant', draw(c, W, H, t) {
      chrome(c, W, H, 'rgba(96,165,250,.4)'); header(c, W, 'Assistant', 'How can I help?');
      const ox = W - 90, oy = 180, pr = 34 + 4 * Math.sin(t * 2); const og = c.createRadialGradient(ox - 10, oy - 10, 2, ox, oy, pr); og.addColorStop(0, '#fff'); og.addColorStop(.4, '#60A5FA'); og.addColorStop(1, '#8B5CF6'); c.beginPath(); c.arc(ox, oy, pr, 0, 7); c.fillStyle = og; c.shadowColor = '#60A5FA'; c.shadowBlur = 40; c.fill(); c.shadowBlur = 0;
      const me = (s, y, w) => { rr(c, W - 36 - w, y, w, 78, 30); c.fillStyle = lg(c, W - 36 - w, y, W - 36, y + 78, '#3b82f6', '#7c3aed'); c.fill(); tx(c, s, W - 10 - w, y + 49, `500 23px ${F.b}`, '#fff'); };
      const bot = (s, y, w) => { box(c, 36, y, w, 78, 30, 'rgba(255,255,255,.08)'); tx(c, s, 62, y + 49, `500 23px ${F.b}`, '#fff'); };
      me('Set an alarm for 6:30 tomorrow', 290, 430);
      [['intent · SET_ALARM', 230], ['time · 06:30', 160]].reduce((x, [s, w]) => { rr(c, x - w, 386, w, 44, 12); c.setLineDash([6, 5]); c.strokeStyle = '#93c5fd'; c.lineWidth = 2; c.stroke(); c.setLineDash([]); tx(c, s, x - w / 2, 415, `500 17px ${F.m}`, '#dbeafe', 'center'); return x - w - 12; }, W - 36);
      bot('✓  Alarm set for 6:30 AM tomorrow', 456, 470);
      me('Add team sync to my calendar at 4', 560, 470);
      box(c, 36, 664, 130, 70, 30, 'rgba(255,255,255,.08)'); for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(76 + i * 26, 699 - 6 * Math.max(0, Math.sin(t * 6 - i)), 7, 0, 7); c.fillStyle = '#d4d4d8'; c.fill(); }
      c.fillStyle = lg(c, 0, H - 330, 0, H, 'rgba(0,0,0,0)', 'rgba(96,165,250,.25)'); c.fillRect(0, H - 330, W, 330);
      for (let i = 0; i < 26; i++) { const h = 20 + 90 * Math.abs(Math.sin(t * 3 + i * .55)) * (0.4 + 0.6 * Math.sin(i / 26 * Math.PI)); box(c, 50 + i * 17, H - 210 - h / 2, 9, h, 4, i % 2 ? '#8B5CF6' : '#60A5FA'); }
      c.beginPath(); c.arc(W - 90, H - 210, 44, 0, 7); c.fillStyle = '#fff'; c.fill(); box(c, W - 99, H - 236, 18, 34, 9, '#08080C');
      tx(c, 'Listening…', W / 2, H - 100, `500 22px ${F.m}`, '#bfdbfe', 'center');
    } },
    { label: 'Social feed', draw(c, W, H, t) {
      chrome(c, W, H, 'rgba(249,115,22,.35)'); header(c, W, 'Community', 'Feed');
      ['#F97316', '#8B5CF6', '#60A5FA', '#34D399', '#F59E0B'].forEach((col, i) => { const x = 82 + i * 112, y = 300; c.beginPath(); c.arc(x, y, 44, 0, 7); c.lineWidth = 6; c.strokeStyle = col; c.stroke(); c.beginPath(); c.arc(x, y, 34, 0, 7); c.fillStyle = '#231b38'; c.fill(); });
      box(c, 36, 380, W - 72, 640, 36, 'rgba(255,255,255,.05)');
      c.beginPath(); c.arc(90, 440, 28, 0, 7); c.fillStyle = lg(c, 60, 410, 120, 470, '#F97316', '#8B5CF6'); c.fill();
      tx(c, 'Morning run', 136, 434, `600 26px ${F.b}`, '#fff'); tx(c, 'Community · 5 min ago', 136, 466, `400 20px ${F.b}`, '#a1a1aa');
      rr(c, 60, 500, W - 120, 380, 26); c.fillStyle = lg(c, 60, 500, W - 60, 880, 'rgba(249,115,22,.3)', 'rgba(139,92,246,.3)'); c.fill();
      c.save(); rr(c, 60, 500, W - 120, 380, 26); c.clip(); c.lineWidth = 8; c.lineCap = 'round'; c.strokeStyle = '#F97316'; const len = 900, prog = (t * .25) % 1.2; c.setLineDash([len * Math.min(1, prog), len]); c.beginPath(); c.moveTo(90, 800); c.bezierCurveTo(200, 560, 300, 860, 400, 660); c.bezierCurveTo(470, 520, 520, 600, 560, 560); c.stroke(); c.setLineDash([]); c.restore();
      ['♥  Like', '💬  Comment', '↗  Share'].forEach((s, i) => tx(c, s, 70 + i * 180, 950, `500 22px ${F.b}`, '#d4d4d8'));
      const a = Math.max(0, Math.min(1, Math.sin(t * .9) * 2)); c.globalAlpha = a; box(c, 36, 1050, W - 72, 86, 28, 'rgba(255,255,255,.1)'); c.beginPath(); c.arc(76, 1093, 9, 0, 7); c.fillStyle = '#F97316'; c.fill(); tx(c, 'New activity from your community', 100, 1101, `500 22px ${F.b}`, '#fff'); c.globalAlpha = 1;
      navbar(c, W, H, 0);
    } },
    { label: 'Live auction', draw(c, W, H, t) {
      chrome(c, W, H, 'rgba(239,68,68,.35)'); header(c, W, 'Auctions', 'Live now');
      c.globalAlpha = .65 + .35 * Math.sin(t * 4); box(c, W - 160, 176, 118, 48, 14, 'rgba(239,68,68,.25)'); tx(c, '● LIVE', W - 101, 208, `600 20px ${F.m}`, '#fca5a5', 'center'); c.globalAlpha = 1;
      rr(c, 36, 250, W - 72, 420, 34); c.fillStyle = lg(c, 36, 250, W - 36, 670, '#7f1d1d', '#4c1d95'); c.fill();
      const sg = c.createRadialGradient(240, 400, 10, 240, 400, 200); sg.addColorStop(0, 'rgba(255,255,255,.35)'); sg.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = sg; c.fillRect(36, 250, W - 72, 420);
      const left = Math.max(0, 154 - Math.floor(t) % 155); const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0');
      box(c, W - 210, 590, 150, 56, 16, 'rgba(0,0,0,.55)'); tx(c, `${mm}:${ss}`, W - 135, 628, `500 28px ${F.m}`, '#fff', 'center');
      tx(c, 'Vintage collection', 44, 730, `600 30px ${F.b}`, '#fff'); tx(c, 'Lot · ending soon', 44, 766, `400 21px ${F.b}`, '#a1a1aa');
      tx(c, 'Bid activity', 44, 840, `600 28px ${F.d}`, '#fff'); tx(c, 'WEBSOCKET', W - 44, 840, `500 17px ${F.m}`, '#a1a1aa', 'right');
      const fl = Math.max(0, Math.sin(t * 2.2)); ['just now', '12 s ago'].forEach((s, i) => { const y = 866 + i * 112; box(c, 36, y, W - 72, 96, 26, i === 0 ? `rgba(239,68,68,${.08 + .2 * fl})` : 'rgba(255,255,255,.05)'); c.beginPath(); c.arc(86, y + 48, 24, 0, 7); c.fillStyle = i ? '#60A5FA' : '#EF4444'; c.fill(); tx(c, 'New bid placed', 128, y + 44, `600 24px ${F.b}`, '#fff'); tx(c, s, 128, y + 74, `400 19px ${F.b}`, '#a1a1aa'); });
      box(c, 36, H - 150, W - 72, 92, 30, '#EF4444'); tx(c, 'Place bid', W / 2, H - 94, `600 28px ${F.b}`, '#fff', 'center');
    } },
    { label: 'Learning quiz', draw(c, W, H, t) {
      chrome(c, W, H, 'rgba(245,158,11,.35)'); header(c, W, 'Lesson 4 · Fruits', 'Question 3 / 10');
      tx(c, '★★☆', W - 44, 200, `400 34px ${F.b}`, '#FBBF24', 'right');
      box(c, 44, 250, W - 88, 14, 7, 'rgba(255,255,255,.1)'); box(c, 44, 250, (W - 88) * .3, 14, 7, '#F59E0B');
      rr(c, 36, 300, W - 72, 400, 36); c.fillStyle = lg(c, 36, 300, W - 36, 700, 'rgba(245,158,11,.28)', 'rgba(139,92,246,.2)'); c.fill();
      const by = 440 + 10 * Math.sin(t * 2.4); const ag = c.createRadialGradient(W / 2 - 25, by - 30, 5, W / 2, by, 90); ag.addColorStop(0, '#fca5a5'); ag.addColorStop(.6, '#ef4444'); ag.addColorStop(1, '#991b1b'); c.beginPath(); c.ellipse(W / 2, by, 78, 70, 0, 0, 7); c.fillStyle = ag; c.fill();
      box(c, W / 2 - 5, by - 96, 10, 34, 5, '#78350f'); c.beginPath(); c.ellipse(W / 2 + 28, by - 84, 26, 12, -.5, 0, 7); c.fillStyle = '#22c55e'; c.fill();
      tx(c, 'りんご', W / 2, 610, `700 58px ${F.b}`, '#fff', 'center'); tx(c, 'Choose the English word', W / 2, 660, `400 22px ${F.b}`, '#d4d4d8', 'center');
      const ok = (Math.floor(t / 2) % 2) === 1;
      ['Orange', 'Apple', 'Grape', 'Peach'].forEach((s, i) => { const x = 36 + (i % 2) * ((W - 72) / 2 + 8), y = 740 + Math.floor(i / 2) * 124, w = (W - 72) / 2 - 8; const good = ok && i === 1; box(c, x, y, w, 106, 28, good ? 'rgba(16,185,129,.25)' : 'rgba(255,255,255,.06)'); if (good) { rr(c, x, y, w, 106, 28); c.strokeStyle = '#10B981'; c.lineWidth = 3; c.stroke(); } tx(c, s + (good ? ' ✓' : ''), x + w / 2, y + 64, `600 28px ${F.b}`, good ? '#a7f3d0' : '#fff', 'center'); });
      box(c, 36, H - 150, W - 72, 92, 30, '#F59E0B'); tx(c, 'Next question', W / 2, H - 94, `600 28px ${F.b}`, '#fff', 'center');
    } }
  ];

  function card(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.anisotropy = 4; t.encoding = THREE.sRGBEncoding; return t; }
  function glass(c, w, h) { rr(c, 2, 2, w - 4, h - 4, 28); c.fillStyle = 'rgba(17,13,32,.86)'; c.fill(); c.lineWidth = 2; c.strokeStyle = 'rgba(167,139,250,.35)'; c.stroke(); }
  function rrShape(w, h, r) { const s = new THREE.Shape(), x = -w / 2, y = -h / 2; s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s; }
  function planarUV(geo, w, h) { const p = geo.attributes.position, u = geo.attributes.uv; for (let i = 0; i < p.count; i++) u.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h); }

  window.initHero = function (onScreen) {
    const canvas = document.getElementById('hero-canvas');
    if (typeof THREE === 'undefined') { document.body.classList.add('nogl'); return Promise.resolve(); }
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
    catch (e) { document.body.classList.add('nogl'); canvas.remove(); return Promise.resolve(); }
    const mobile = innerWidth <= 820;
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(32, 1, .1, 100); camera.position.set(0, 0, 14);
    scene.add(new THREE.AmbientLight(0x8b7bff, .35));
    const key = new THREE.DirectionalLight(0xffffff, .8); key.position.set(4, 6, 8); scene.add(key);
    const l1 = new THREE.PointLight(0x8B5CF6, 4, 22); l1.position.set(-4, 3, 3); scene.add(l1);
    const l2 = new THREE.PointLight(0x60A5FA, 3.5, 22); l2.position.set(4, -3, 2.5); scene.add(l2);
    const rig = new THREE.Group(); scene.add(rig);
    const phone = new THREE.Group(); rig.add(phone);
    const PW = 2.9, PH = 6, PR = .46, PD = .26;
    const body = new THREE.Mesh(new THREE.ExtrudeGeometry(rrShape(PW, PH, PR), { depth: PD, bevelEnabled: true, bevelThickness: .07, bevelSize: .07, bevelSegments: 6, curveSegments: 24 }), new THREE.MeshStandardMaterial({ color: 0x1b1630, metalness: .85, roughness: .28 }));
    body.geometry.center(); phone.add(body);
    const face = new THREE.Mesh(new THREE.ShapeGeometry(rrShape(PW - .02, PH - .02, PR), 24), new THREE.MeshStandardMaterial({ color: 0x050409, roughness: .15, metalness: .2 })); face.position.z = PD / 2 + .071; phone.add(face);
    const SW = PW - .2, SH = PH - .2, CW = 640, CH = Math.round(640 * SH / SW);
    const sc = document.createElement('canvas'); sc.width = CW; sc.height = CH; const sx = sc.getContext('2d');
    const tmp = document.createElement('canvas'); tmp.width = CW; tmp.height = CH; const tx2 = tmp.getContext('2d');
    const stex = new THREE.CanvasTexture(sc); stex.encoding = THREE.sRGBEncoding; stex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const sg = new THREE.ShapeGeometry(rrShape(SW, SH, PR - .1), 24); planarUV(sg, SW, SH);
    const screen = new THREE.Mesh(sg, new THREE.MeshBasicMaterial({ map: stex, toneMapped: false })); screen.position.z = PD / 2 + .075; phone.add(screen);
    const sheenG = new THREE.ShapeGeometry(rrShape(SW, SH, PR - .1), 24); planarUV(sheenG, SW, SH);
    const sheen = new THREE.Mesh(sheenG, new THREE.MeshBasicMaterial({ map: card(256, 512, (c, w, h) => { const g = c.createLinearGradient(0, 0, w, h); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.44, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,255,255,.09)'); g.addColorStop(.56, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); }), transparent: true, depthWrite: false }));
    sheen.position.z = PD / 2 + .08; phone.add(sheen);
    const bm = new THREE.MeshStandardMaterial({ color: 0x2a2245, metalness: .9, roughness: .3 });
    [[1.2, .7], [.3, .45]].forEach(([y, h]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(.06, h, .14), bm); b.position.set(PW / 2 + .09, y, 0); phone.add(b); });

    // orbiting UI chips
    const chips = [];
    const addChip = (tex, w, h, x, y, z, sp) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false })); m.userData = { x, y, z, sp, ph: Math.random() * 6 }; rig.add(m); chips.push(m); };
    addChip(card(560, 230, (c, w, h) => { glass(c, w, h); tx(c, '@Composable', 34, 62, `500 26px ${F.m}`, '#A78BFA'); tx(c, 'fun AuctionScreen(', 34, 108, `500 26px ${F.m}`, '#fff'); tx(c, '  state: UiState', 34, 152, `500 26px ${F.m}`, '#a1a1aa'); tx(c, ') { … }', 34, 196, `500 26px ${F.m}`, '#fff'); }), 2.1, .86, -2.5, 1.7, 1.0, 1);
    addChip(card(440, 120, (c, w, h) => { rr(c, 2, 2, w - 4, h - 4, 58); c.fillStyle = 'rgba(96,165,250,.2)'; c.fill(); c.strokeStyle = 'rgba(147,197,253,.6)'; c.lineWidth = 2; c.stroke(); tx(c, 'intent · SET_ALARM', w / 2, 72, `500 26px ${F.m}`, '#dbeafe', 'center'); }), 1.8, .49, 2.1, 2.75, 1.2, 1.2);
    addChip(card(440, 130, (c, w, h) => { glass(c, w, h); c.beginPath(); c.arc(56, 65, 12, 0, 7); c.fillStyle = '#EF4444'; c.fill(); tx(c, 'WebSocket · live bid', 86, 75, `500 25px ${F.m}`, '#fff'); }), 1.8, .53, 2.25, -.5, 1.4, .9);
    addChip(card(440, 130, (c, w, h) => { glass(c, w, h); c.beginPath(); c.arc(56, 65, 12, 0, 7); c.fillStyle = '#10B981'; c.fill(); tx(c, 'Room · synced', 86, 75, `500 25px ${F.m}`, '#fff'); }), 1.7, .5, -2.45, -1.55, 1.1, 1.1);
    addChip(card(400, 140, (c, w, h) => { glass(c, w, h); tx(c, 'Dark theme', 34, 82, `600 28px ${F.b}`, '#fff'); rr(c, w - 130, 40, 96, 58, 29); c.fillStyle = '#8B5CF6'; c.fill(); c.beginPath(); c.arc(w - 63, 69, 21, 0, 7); c.fillStyle = '#fff'; c.fill(); }), 1.5, .53, 2.0, -2.75, 1.6, .8);

    // particles + halo
    const N = mobile ? 220 : 520, pg = new THREE.BufferGeometry(), pa = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { pa[i * 3] = (Math.random() - .5) * 26; pa[i * 3 + 1] = (Math.random() - .5) * 16; pa[i * 3 + 2] = (Math.random() - .5) * 10 - 2; }
    pg.setAttribute('position', new THREE.BufferAttribute(pa, 3));
    const ptex = card(64, 64, c => { const g = c.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(220,210,255,1)'); g.addColorStop(.3, 'rgba(139,92,246,.6)'); g.addColorStop(1, 'rgba(139,92,246,0)'); c.fillStyle = g; c.fillRect(0, 0, 64, 64); });
    const points = new THREE.Points(pg, new THREE.PointsMaterial({ size: .09, map: ptex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .8 })); scene.add(points);
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), new THREE.MeshBasicMaterial({ map: card(256, 256, c => { const g = c.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, 'rgba(139,92,246,.55)'); g.addColorStop(.5, 'rgba(96,165,250,.14)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, 256, 256); }), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.position.z = -2.5; rig.add(halo);

    let base = { x: 0, y: 0, s: 1, m: 0 };
    function layout() {
      const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      const vh = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z, vw = vh * camera.aspect;
      if (w <= 820) { const upp = vh / h, s = Math.min(.8, (400 * upp) / PH, vw * .9 / 6.6); base = { x: 0, y: -vh / 2 + (PH * s) / 2 + 40 * upp, s, m: 1 }; }
      else { base = { x: vw * .235, y: 0, s: Math.min(1, vw / 16), m: 0 }; }
      rig.scale.setScalar(base.s);
    }
    layout(); addEventListener('resize', layout);
    let mx = 0, my = 0, tX = 0, tY = 0;
    if (FINE) addEventListener('pointermove', e => { tX = e.clientX / innerWidth * 2 - 1; tY = e.clientY / innerHeight * 2 - 1; }, { passive: true });
    let visible = true; new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(document.querySelector('.hero'));

    const DUR = 4.5, FADE = .6; let lastIdx = -1;
    function paintScreen(t) {
      const cyc = t / DUR, idx = Math.floor(cyc) % SCREENS.length, f = cyc % 1, nxt = (idx + 1) % SCREENS.length;
      SCREENS[idx].draw(sx, CW, CH, t);
      const fadeStart = 1 - FADE / DUR;
      if (f > fadeStart) { SCREENS[nxt].draw(tx2, CW, CH, t); sx.globalAlpha = (f - fadeStart) / (1 - fadeStart); sx.drawImage(tmp, 0, 0); sx.globalAlpha = 1; }
      if (idx !== lastIdx) { lastIdx = idx; onScreen && onScreen(idx, SCREENS[idx].label); }
      stex.needsUpdate = true;
    }
    const clock = new THREE.Clock(); let frame = 0;
    function render() {
      const t = clock.getElapsedTime();
      mx += (tX - mx) * .05; my += (tY - my) * .05;
      const sp = Math.min(1, scrollY / innerHeight), idle = RM ? 0 : Math.sin(t * .5) * .12;
      rig.position.set(base.x - sp * base.x * .25, base.y + sp * (base.m ? -1.2 : 1.8) + (RM ? 0 : Math.sin(t * .8) * .08), 0);
      phone.rotation.y = -.36 + mx * .45 + idle + sp * .9; phone.rotation.x = .08 + my * .22 - sp * .25; phone.rotation.z = .04 + mx * .03;
      camera.position.z = 14 + sp * 3;
      const orbitT = RM ? 0 : t * .12;
      chips.forEach(c => { const u = c.userData, a = orbitT * 4 * u.sp + u.ph; c.position.x = u.x + Math.sin(a) * .18 * Math.sign(u.x) + mx * .35 * u.sp; c.position.z = u.z + Math.cos(a) * .35; c.position.y = u.y + (RM ? 0 : Math.sin(t * u.sp + u.ph) * .12) - my * .25 + sp * u.sp * 1.1; c.rotation.y = mx * .2 - Math.sign(u.x) * .08; c.material.opacity = Math.max(0, 1 - sp * 1.1); });
      points.rotation.y = t * .015 + mx * .05; points.position.y = sp * 2;
      if (!RM && frame++ % 2 === 0) paintScreen(t);
      renderer.render(scene, camera);
    }
    return new Promise(res => {
      const go = () => { paintScreen(.5); render(); res();
        if (RM) { addEventListener('resize', render); addEventListener('scroll', () => { if (visible) render(); }, { passive: true }); return; }
        (function loop() { requestAnimationFrame(loop); if (visible && !document.hidden) render(); })(); };
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go, go);
    });
  };
})();
