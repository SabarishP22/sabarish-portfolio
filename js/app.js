/* App — renders all data-driven sections and interactions. */
(function () {
  const P = window.PROFILE;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const mailto = (subject, body) => `mailto:${P.email}?subject=${encodeURIComponent(subject)}${body ? '&body=' + encodeURIComponent(body) : ''}`;

  /* ---------- profile binding ---------- */
  function bindProfile() {
    const v = { name: P.name, firstName: P.firstName, email: P.email, location: P.location, nameUpper: P.name.toUpperCase(), nameUpperDot: P.name.toUpperCase() + '.', titleUpper: P.title.toUpperCase() };
    $$('[data-bind]').forEach(e => { if (v[e.dataset.bind] != null) e.textContent = v[e.dataset.bind]; });
    const h = { linkedin: P.linkedin, github: P.github, mailto: 'mailto:' + P.email };
    $$('[data-bind-href]').forEach(e => e.href = h[e.dataset.bindHref]);
    const gh = $('#gh-text'); if (gh) gh.textContent = P.github.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '') + ' ↗';
    $('#year').textContent = new Date().getFullYear();
    // resume
    const rb = $('#resume-btn'), rl = $('#resume-link');
    if (P.resume) { [rb, rl].forEach(e => { e.href = P.resume; e.setAttribute('download', ''); e.target = '_blank'; e.rel = 'noopener'; }); rb.firstChild.textContent = 'Download resume '; rl.textContent = 'Download PDF ↓'; }
    else { const m = mailto('Resume request — ' + P.name, 'Hi Sabarish, could you share your latest resume?'); rb.href = m; rl.href = m; rb.firstChild.textContent = 'Request resume '; rl.textContent = 'Request by email ↗'; }
    // photo
    if (P.photo) $('#photo-slot').innerHTML = `<div class="photo"><img src="${esc(P.photo)}" alt="Portrait of ${esc(P.name)}" loading="lazy"></div>`;
    // availability
    const A = { available: ['#4ade80', 'Available for new projects'], limited: ['#FBBF24', 'Limited availability'], unavailable: ['#71717A', 'Currently booked'], discuss: ['#A78BFA', 'Get in touch to discuss timelines'] };
    const a = A[P.availability.status] || A.discuss; const el = $('#avail'); el.style.setProperty('--c', a[0]); el.querySelector('span').textContent = P.availability.note || a[1];
    // copy email
    $('#copy-email').addEventListener('click', async e => { const b = e.currentTarget; try { await navigator.clipboard.writeText(P.email); b.textContent = 'Copied ✓'; } catch (_) { const r = document.createRange(); r.selectNodeContents($('.c-row a[data-bind="email"]')); getSelection().removeAllRanges(); getSelection().addRange(r); b.textContent = 'Selected — press ⌘/Ctrl+C'; } setTimeout(() => b.textContent = 'Copy', 2500); });
  }

  /* ---------- education ---------- */
  function renderEdu() {
    const E = window.EDUCATION;
    $('#edu').innerHTML = `<div><div class="k mono">Education</div><b>${esc(E.degree.title)}</b><small>${esc(E.degree.place)}<br>${esc(E.degree.when)} · ${esc(E.degree.where)}</small></div>` +
      E.certs.map(c => `<div><div class="k mono">${c.by === 'Training' ? 'Training' : 'Certification'}</div><b>${esc(c.title)}</b><small>${esc(c.by)}</small></div>`).join('');
  }

  /* ---------- split text + reveal ---------- */
  function splitText(el) {
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(part => { if (!part) return; if (/^\s+$/.test(part)) { f.appendChild(document.createTextNode(' ')); return; } const w = document.createElement('span'); w.className = 'w'; const i = document.createElement('span'); i.textContent = part; w.appendChild(i); f.appendChild(w); }); n.replaceWith(f); }
      else if (n.nodeType === 1) walk(n);
    });
    walk(el); $$('.w>span', el).forEach((s, i) => s.style.transitionDelay = (i * .05) + 's');
  }
  let io;
  function observe(el) { io.observe(el); }
  function initReveal() {
    $$('[data-split]').forEach(splitText);
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal],[data-split]:not(#hero-title),[data-ph]').forEach(observe);
  }

  /* ---------- loader ---------- */
  function runLoader(ready) {
    const n = $('#ld-n'), bar = $('#ld-bar'), L = $('#loader'); let shown = 0, done = false; const t0 = performance.now(), minT = RM ? 200 : 1100;
    ready.then(() => done = true); setTimeout(() => done = true, 2600);
    (function tick() {
      const el = performance.now() - t0, target = done && el > minT ? 100 : Math.min(90, el / minT * 90);
      shown += (target - shown) * .12; if (target === 100 && shown > 99.4) shown = 100;
      n.textContent = Math.round(shown); bar.style.transform = `scaleX(${shown / 100})`;
      if (shown >= 100) { L.classList.add('done'); document.body.classList.add('ready'); $('#hero-title').classList.add('in'); setTimeout(() => L.style.display = 'none', 1200); return; }
      requestAnimationFrame(tick);
    })();
  }

  /* ---------- cursor + magnetic ---------- */
  function initCursor() {
    if (!FINE || RM) return;
    const c = $('.cursor'), d = $('.cursor-dot'); let x = -100, y = -100, cx = x, cy = y;
    document.body.classList.add('has-cursor');
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px)`; }, { passive: true });
    (function loop() { cx += (x - cx) * .18; cy += (y - cy) * .18; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    const sel = 'a,button,select,label,.tnode';
    document.addEventListener('pointerover', e => { if (e.target.closest(sel)) c.classList.add('hover'); });
    document.addEventListener('pointerout', e => { if (e.target.closest(sel)) c.classList.remove('hover'); });
    document.addEventListener('mouseleave', () => document.body.classList.remove('has-cursor'));
    document.addEventListener('mouseenter', () => document.body.classList.add('has-cursor'));
  }
  function initMagnetic(root = document) {
    if (!FINE || RM) return;
    $$('.magnetic', root).forEach(el => {
      if (el.dataset.mag) return; el.dataset.mag = 1;
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px,${(e.clientY - r.top - r.height / 2) * .32}px)`; });
      el.addEventListener('pointerleave', () => { el.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1),border-color .4s,color .4s'; el.style.transform = ''; setTimeout(() => el.style.transition = '', 700); });
    });
  }

  /* ---------- nav ---------- */
  function initNav() {
    const nav = $('#nav'); let last = scrollY; const links = $$('.nav ul a');
    addEventListener('scroll', () => { const y = scrollY; nav.classList.toggle('scrolled', y > 40); if (!document.body.classList.contains('locked')) nav.classList.toggle('hide', y > last && y > 400); last = y; }, { passive: true });
    const sio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
    ['about', 'work', 'services', 'stack', 'approach', 'contact'].forEach(id => sio.observe(document.getElementById(id)));
    const btn = $('#menu-btn'), mm = $('#mobile-menu');
    const set = open => { btn.setAttribute('aria-expanded', open); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); mm.classList.toggle('open', open); document.body.classList.toggle('locked', open); if (open) { nav.classList.remove('hide'); setTimeout(() => mm.querySelector('a').focus(), 300); } };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    $$('a', mm).forEach(a => a.addEventListener('click', () => set(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape' && mm.classList.contains('open')) { set(false); btn.focus(); } });
  }

  /* ---------- services ---------- */
  const VIS = {
    android: `<svg viewBox="0 0 300 300"><rect class="v-stroke v1-frame" x="95" y="25" width="110" height="250" rx="20"/><rect class="v1-b" x="110" y="55" width="80" height="44" rx="5" style="animation-delay:.2s"/><rect class="v1-b" x="110" y="110" width="80" height="12" rx="3" style="animation-delay:.35s"/><rect class="v1-b" x="110" y="130" width="54" height="12" rx="3" style="animation-delay:.45s"/><rect class="v1-b" x="110" y="155" width="80" height="62" rx="5" style="animation-delay:.6s"/><rect class="v1-b" x="110" y="245" width="80" height="12" rx="6" style="animation-delay:.75s"/><text class="v-label" x="150" y="296">KOTLIN · COMPOSE</text></svg>`,
    ui: `<svg viewBox="0 0 300 300"><rect class="v-stroke" x="60" y="40" width="180" height="220" rx="8" stroke-dasharray="3 4" opacity=".5"/><rect class="v2-r v2-a" x="75" y="55" width="70" height="70" rx="6"/><rect class="v2-r v2-b" x="195" y="55" width="30" height="70" rx="6"/><rect class="v2-r v2-c" x="75" y="140" width="150" height="56" rx="6" style="fill:rgba(96,165,250,.25)"/><circle class="v2-dot" cx="90" cy="230" r="10" fill="#8B5CF6"/><circle class="v2-dot" cx="118" cy="230" r="10" fill="#A78BFA" style="animation-delay:.2s"/><circle class="v2-dot" cx="146" cy="230" r="10" fill="#C4B5FD" style="animation-delay:.4s"/><circle class="v2-dot" cx="174" cy="230" r="10" fill="#60A5FA" style="animation-delay:.6s"/><text class="v-label" x="150" y="290">MATERIAL 3 · COMPONENTS</text></svg>`,
    layers: `<div class="layers"><div class="layer old">LEGACY · XML + ACTIVITIES</div><div class="layer">CLEAN ARCHITECTURE</div><div class="layer">MODERN UI · COMPOSE</div></div>`,
    api: `<svg viewBox="0 0 300 300"><path id="pa" class="v4-path" d="M80 150 C 130 80, 180 80, 230 90"/><path id="pb" class="v4-path" d="M80 150 C 130 210, 180 220, 230 215"/><path id="pc" class="v4-path" d="M80 150 L 150 262"/><circle class="v4-node" cx="70" cy="150" r="30"/><text class="v4-t" x="70" y="154">APP</text><rect class="v4-node" x="200" y="68" width="80" height="44" rx="6"/><text class="v4-t" x="240" y="94">REST</text><rect class="v4-node" x="200" y="193" width="80" height="44" rx="6"/><text class="v4-t" x="240" y="219">WEBSOCKET</text><circle class="v4-node" cx="150" cy="262" r="24"/><text class="v4-t" x="150" y="266" style="font-size:8px">FIREBASE</text><circle r="4" fill="#8B5CF6"><animateMotion dur="2.2s" repeatCount="indefinite"><mpath href="#pa"/></animateMotion></circle><circle r="4" fill="#60A5FA"><animateMotion dur="2.2s" begin="1.1s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1"><mpath href="#pa"/></animateMotion></circle><circle r="4" fill="#EF4444"><animateMotion dur="1.4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1"><mpath href="#pb"/></animateMotion></circle><circle r="3.5" fill="#A78BFA"><animateMotion dur="2.4s" begin=".6s" repeatCount="indefinite"><mpath href="#pc"/></animateMotion></circle></svg>`,
    ai: `<svg viewBox="0 0 300 300"><defs><linearGradient id="vaiG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A78BFA"/><stop offset="1" stop-color="#60A5FA"/></linearGradient></defs><circle class="vai-ring" cx="150" cy="120" r="60"/><circle class="vai-ring" cx="150" cy="120" r="60" style="animation-delay:1s"/><circle cx="150" cy="120" r="36" fill="rgba(139,92,246,.35)" stroke="#A78BFA"/><circle cx="150" cy="120" r="14" fill="#fff"/>${Array.from({ length: 15 }, (_, i) => `<rect class="vai-bar" x="${60 + i * 12.5}" y="${215}" width="6" height="16" rx="3" style="animation-delay:${(i * .08).toFixed(2)}s"/>`).join('')}<text class="v-label" x="150" y="275">VOICE → INTENT → ACTION</text></svg>`,
    offline: `<svg viewBox="0 0 300 300"><path class="voff-cloud" d="M105 95 a28 28 0 0 1 52-18 a24 24 0 0 1 40 22 a20 20 0 0 1-4 40 h-84 a22 22 0 0 1-4-44z"/><line class="voff-x" x1="120" y1="80" x2="180" y2="140"/><line class="voff-x" x1="180" y1="80" x2="120" y2="140"/><ellipse class="voff-db" cx="150" cy="208" rx="46" ry="12"/><path class="voff-db" d="M104 208 v40 a46 12 0 0 0 92 0 v-40"/><path class="voff-db" d="M104 228 a46 12 0 0 0 92 0" fill="none"/><circle class="voff-pk" cx="135" cy="200" r="4"/><circle class="voff-pk" cx="150" cy="200" r="4" style="animation-delay:.25s"/><circle class="voff-pk" cx="165" cy="200" r="4" style="animation-delay:.5s"/><text class="v-label" x="150" y="290">ROOM · SYNC ON RECONNECT</text></svg>`,
    kmp: `<svg viewBox="0 0 300 300"><line class="v5-line" x1="150" y1="150" x2="150" y2="45"/><line class="v5-line" x1="150" y1="150" x2="55" y2="225"/><line class="v5-line" x1="150" y1="150" x2="245" y2="225"/><polygon class="v5-hex" points="150,105 189,127 189,173 150,195 111,173 111,127"/><text class="v-label" x="150" y="148" style="fill:#fff">COMMON</text><text class="v-label" x="150" y="161">MAIN</text><circle class="v5-sat" cx="150" cy="40" r="24"/><text class="v-label" x="150" y="44">ANDROID</text><circle class="v5-sat" cx="52" cy="228" r="24"/><text class="v-label" x="52" y="232">iOS</text><circle class="v5-sat" cx="248" cy="228" r="24"/><text class="v-label" x="248" y="232">DESKTOP</text><text class="v-label" x="150" y="292">SHARED BUSINESS LOGIC</text></svg>`,
    cmp: `<svg viewBox="0 0 300 300"><rect class="v6-dev" x="20" y="95" width="56" height="110" rx="10"/><rect class="v6-dev" x="96" y="80" width="90" height="130" rx="8"/><rect class="v6-dev" x="200" y="90" width="90" height="70" rx="4"/><path class="v6-dev" d="M232 160 v14 M222 176 h30"/><rect class="v6-card" x="28" y="110" width="40" height="22" rx="3"/><rect class="v6-line" x="28" y="140" width="40" height="5" rx="2"/><rect class="v6-line" x="28" y="150" width="28" height="5" rx="2"/><rect class="v6-card" x="106" y="95" width="70" height="34" rx="3"/><rect class="v6-line" x="106" y="138" width="70" height="6" rx="2"/><rect class="v6-line" x="106" y="150" width="48" height="6" rx="2"/><rect class="v6-card" x="208" y="98" width="74" height="22" rx="2"/><rect class="v6-line" x="208" y="128" width="74" height="5" rx="2"/><path class="v6-sync" d="M48 230 Q150 280 245 230"/><text class="v-label" x="150" y="270">ONE UI · MANY TARGETS</text></svg>`
  };
  const LBL = { android: 'Native Android', ui: 'Interface', layers: 'Modernization', api: 'Integration', ai: 'Intelligence', offline: 'Offline-first', kmp: 'Shared logic · developing', cmp: 'Shared UI · developing' };
  function initServices() {
    const list = $('#svc-list'), stage = $('#svc-stage'), S = window.SERVICES;
    S.forEach((s, i) => {
      const li = document.createElement('li'); li.className = 'svc-item' + (i === 0 ? ' is-active' : '');
      li.innerHTML = `<button class="svc-btn" aria-expanded="${i === 0}" aria-controls="svc-b${i}" id="svc-h${i}"><span class="n">${pad(i + 1)}</span><span class="t">${esc(s.t)}${s.developing ? '<small>Developing</small>' : ''}</span><span class="pl" aria-hidden="true"></span></button>
      <div class="svc-body" id="svc-b${i}" role="region" aria-labelledby="svc-h${i}"><div><div class="svc-inline" aria-hidden="true"><div class="svc-vis is-active">${VIS[s.vis]}</div></div><p>${esc(s.d)}</p><div class="chips">${s.tags.map(t => `<span class="chip${s.developing ? ' dev' : ''}">${esc(t)}</span>`).join('')}</div></div></div>`;
      list.appendChild(li);
      const v = document.createElement('div'); v.className = 'svc-vis' + (i === 0 ? ' is-active' : ''); v.innerHTML = VIS[s.vis]; stage.appendChild(v);
    });
    // unique ids for duplicated SVGs
    $$('.svc-inline svg, #svc-stage svg').forEach((svg, k) => svg.querySelectorAll('[id]').forEach(el => { const o = el.id, n = o + '-' + k; el.id = n; svg.querySelectorAll(`mpath[href="#${o}"]`).forEach(m => m.setAttribute('href', '#' + n)); svg.querySelectorAll('[class*="vai-bar"]').forEach(b => b.style.fill = `url(#${n})`); }));
    const items = $$('.svc-item', list), vis = $$('.svc-vis', stage);
    const act = (i, toggle) => {
      const wide = innerWidth > 1024;
      items.forEach((it, k) => { const on = k === i ? (toggle && !wide ? !it.classList.contains('is-active') : true) : false; it.classList.toggle('is-active', on); it.querySelector('.svc-btn').setAttribute('aria-expanded', on); });
      vis.forEach((v, k) => v.classList.toggle('is-active', k === i));
      $('#svc-lbl').textContent = LBL[S[i].vis]; $('#svc-idx').textContent = pad(i + 1) + ' / ' + pad(S.length);
    };
    act(0);
    items.forEach((it, i) => { const b = it.querySelector('.svc-btn'); b.addEventListener('click', () => act(i, true)); b.addEventListener('pointerenter', () => { if (FINE && innerWidth > 1024) act(i); }); b.addEventListener('focus', () => { if (innerWidth > 1024) act(i); }); });
  }

  /* ---------- projects ---------- */
  function initProjects() {
    const PR = window.PROJECTS, f = $('#filters'), g = $('#projects');
    f.innerHTML = window.PROJECT_FILTERS.map((x, i) => `<button class="filter" aria-pressed="${i === 0}" data-f="${x.id}">${esc(x.label)}</button>`).join('');
    g.innerHTML = PR.map((p, i) => `<a class="proj${i % 2 ? ' flip' : ''}" href="#case-${p.id}" data-f="${p.filters.join(' ')}" data-reveal style="--a:${p.accent};--a2:${p.accent2}" aria-label="${esc(p.name)} — open case study">
      <div class="proj-info"><div class="top mono"><span>${pad(i + 1)} / ${pad(PR.length)}</span><span>${esc(p.year)}</span></div>
        <h3>${esc(p.name)}</h3><div class="dom mono">${esc(p.domain)}</div><p>${esc(p.tagline)}</p>
        <div class="tags">${p.tech.slice(0, 4).map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <span class="open">View case study <i aria-hidden="true">↗</i></span></div>
      <div class="proj-vis"><span class="badge mono">${p.screenshots.length ? 'Screenshot' : 'Concept mockup'}</span><div class="tilt"><div class="pm-fit" style="--s:.78">${window.mockup(p.mock, p.accent, p.accent2)}</div></div></div></a>`).join('');
    f.addEventListener('click', e => { const b = e.target.closest('.filter'); if (!b) return; $$('.filter', f).forEach(x => x.setAttribute('aria-pressed', x === b)); const id = b.dataset.f;
      $$('.proj', g).forEach(p => { const show = id === 'all' || p.dataset.f.split(' ').includes(id); p.classList.toggle('hidden', !show); if (show) p.classList.add('in'); }); });
    if (FINE && !RM) $$('.proj', g).forEach(p => { const t = $('.tilt', p); p.addEventListener('pointermove', e => { const r = p.getBoundingClientRect(); t.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 18 + 'deg'); t.style.setProperty('--rx', -((e.clientY - r.top) / r.height - .5) * 12 + 'deg'); }); p.addEventListener('pointerleave', () => { t.style.removeProperty('--ry'); t.style.removeProperty('--rx'); }); });
  }

  /* ---------- case study ---------- */
  let lastFocus = null;
  function caseHTML(p) {
    const PR = window.PROJECTS, i = PR.indexOf(p), next = PR[(i + 1) % PR.length];
    const arch = p.architecture.map((l, k) => `${k ? '<div class="arch-arrow" aria-hidden="true"><svg width="14" height="30" viewBox="0 0 14 30"><path d="M7 0v26M2 21l5 6 5-6" stroke="currentColor" fill="none"/></svg></div>' : ''}<div class="arch-layer"><span class="ln">${esc(l.layer)}</span><div class="li">${l.items.map(x => `<span>${esc(x)}</span>`).join('')}</div></div>`).join('');
    const links = [p.github && `<a class="btn magnetic" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub <span class="arr">→</span></a>`, p.demo && `<a class="btn primary magnetic" href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo <span class="arr">→</span></a>`].filter(Boolean).join('');
    const secs = [
      ['Technical implementation', `<div style="display:flex;gap:8px;flex-wrap:wrap">${p.tech.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>`],
      ['Key contributions', `<ul>${p.contributions.map(c => `<li>${esc(c)}</li>`).join('')}</ul>`],
      ['Architecture', `<div class="arch">${arch}</div><p style="margin:14px 0 0;color:var(--dim);font-size:13px">Simplified overview.</p>`]
    ];
    if (p.screenshots.length) secs.push(['Screenshots', `<div class="shots">${p.screenshots.map((s, k) => `<img src="${esc(s)}" alt="${esc(p.name)} screenshot ${k + 1}" loading="lazy">`).join('')}</div>`]);
    if (links) secs.push(['Links', `<div style="display:flex;gap:12px;flex-wrap:wrap">${links}</div>`]);
    return `<div class="case-top"><span class="mono" style="color:var(--muted)">Case study · ${pad(i + 1)} / ${pad(PR.length)}</span><button class="case-close" id="case-close">Close <span aria-hidden="true">✕</span></button></div>
    <div class="wrap" style="--a:${p.accent};--a2:${p.accent2}">
      <div class="case-hero"><div><span class="mono" style="color:var(--violet)">${esc(p.domain)}</span><h2 id="case-title">${esc(p.name)}</h2><p class="ov">${esc(p.overview)}</p>
        <div class="meta mono"><div>Year<b>${esc(p.year)}</b></div><div>Platform<b>Android</b></div><div>Focus<b>${esc(p.tech.slice(0, 2).join(' · '))}</b></div></div></div>
        <div class="case-vis"><div class="halo" style="background:${p.accent}"></div><div class="pm-fit" style="--s:${innerWidth < 500 ? .8 : 1}">${window.mockup(p.mock, p.accent, p.accent2)}</div><small class="mono">Concept mockup — not an actual screenshot</small></div></div>
      ${secs.map((s, k) => `<section class="case-sec"><h3 class="mono"><span>${pad(k + 1)}</span>${s[0]}</h3><div class="content">${s[1]}</div></section>`).join('')}
      <div class="case-next"><a class="btn magnetic" href="#contact" data-close>Discuss a similar project <span class="arr">→</span></a><a class="btn primary magnetic" href="#case-${next.id}">Next: ${esc(next.name)} <span class="arr">→</span></a></div></div>`;
  }
  function initRouting() {
    const C = $('#case');
    const open = p => { if (!C.classList.contains('open')) lastFocus = document.activeElement; C.innerHTML = caseHTML(p); C.scrollTop = 0; C.classList.add('open'); document.body.classList.add('locked'); $('#case-close').addEventListener('click', close); initMagnetic(C); startCountdowns(C); setTimeout(() => $('#case-close').focus(), 60); };
    const close = () => { location.hash = 'work'; };
    const route = () => { const m = location.hash.slice(1).match(/^case-(.+)$/), p = m && window.PROJECTS.find(x => x.id === m[1]);
      if (p) open(p); else if (C.classList.contains('open')) { C.classList.remove('open'); document.body.classList.remove('locked'); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); } };
    addEventListener('hashchange', route); route();
    C.addEventListener('keydown', e => { if (e.key === 'Escape') close();
      if (e.key === 'Tab') { const f = $$('a[href],button', C); if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } } });
  }
  function startCountdowns(root = document) {
    $$('[data-countdown]', root).forEach(el => { if (el.dataset.run) return; el.dataset.run = 1; let s = +el.dataset.countdown; setInterval(() => { s = s > 0 ? s - 1 : 154; el.textContent = pad(Math.floor(s / 60)) + ':' + pad(s % 60); }, 1000); });
  }

  /* ---------- stack orbit ---------- */
  function initStack() {
    const G = window.STACK, tabs = $('#stack-tabs'), orbit = $('#orbit'), svg = $('#orbit-svg'), core = $('#orbit-core'), info = $('#orbit-info'), chips = $('#stack-chips');
    const usedIn = it => { const names = [it.n, ...(it.match || [])].map(s => s.toLowerCase()); return window.PROJECTS.filter(p => p.tech.some(t => names.includes(t.toLowerCase()))).map(p => p.name); };
    tabs.innerHTML = G.map((g, i) => `<button class="stack-tab" role="tab" aria-selected="${i === 0}" data-i="${i}" id="tab-${g.id}">${esc(g.name)}<span>${pad(g.items.length)}</span></button>`).join('');
    let nodes = [], cur = 0, run = false, mx = 0, my = 0, tX = 0, tY = 0;
    const NS = 'http://www.w3.org/2000/svg';
    const setInfo = (it, g) => { const u = usedIn(it), dev = it.level === 'dev'; info.innerHTML = `<div class="st mono ${dev ? 'dev' : ''}">${dev ? 'Developing expertise' : 'Professional experience'} · ${esc(g.name)}</div><h4>${esc(it.n)}</h4><p>${u.length ? 'Used in ' + u.map(esc).join(', ') : dev ? 'Actively learning and building with it.' : 'Part of my everyday engineering toolkit.'}</p>`; };
    const defInfo = g => { info.innerHTML = `<div class="st mono">${esc(g.name)} · ${g.items.length} technologies</div><h4>Hover a technology</h4><p>See where it was used across my projects.</p>`; };
    function show(i) {
      cur = i; const g = G[i];
      $$('.stack-tab', tabs).forEach((t, k) => t.setAttribute('aria-selected', k === i));
      core.textContent = g.name; defInfo(g);
      chips.innerHTML = g.items.map(it => `<span class="${it.level === 'dev' ? 'dev' : ''}">${esc(it.n)}${it.level === 'dev' ? '<span class="sr-only"> (developing)</span>' : ''}</span>`).join('') + `<small>${g.items.some(x => x.level === 'dev') ? 'Dashed = developing expertise.' : ''}</small>`;
      nodes.forEach(n => { n.el.remove(); n.l.remove(); });
      nodes = g.items.map((it, k) => { const el = document.createElement('button'); el.type = 'button'; el.className = 'tnode' + (it.level === 'dev' ? ' dev' : ''); el.textContent = it.n; el.setAttribute('aria-label', `${it.n} — ${it.level === 'dev' ? 'developing expertise' : 'professional experience'}`); orbit.appendChild(el);
        const l = document.createElementNS(NS, 'line'); svg.appendChild(l);
        const ring = g.items.length > 6 ? (k % 2 ? 1 : 0) : 0;
        const n = { it, el, l, a: k / g.items.length * Math.PI * 2 - Math.PI / 2, ring, ph: Math.random() * 6 };
        ['pointerenter', 'focus'].forEach(ev => el.addEventListener(ev, () => { el.classList.add('on'); l.classList.add('hot'); setInfo(it, g); }));
        ['pointerleave', 'blur'].forEach(ev => el.addEventListener(ev, () => { el.classList.remove('on'); l.classList.remove('hot'); }));
        el.addEventListener('click', () => setInfo(it, g));
        setTimeout(() => el.classList.add('show'), 40 + k * 45); return n; });
      frame(performance.now());
    }
    function frame(t) {
      const W = orbit.clientWidth, H = orbit.clientHeight; if (!W) return;
      mx += (tX - mx) * .06; my += (tY - my) * .06;
      const cx = W / 2, cy = H / 2 - 20, rot = RM ? 0 : t * .00004;
      nodes.forEach(n => { const R = (n.ring ? 245 : 165), a = n.a + rot * (n.ring ? -1 : 1); const rx = Math.min(R * 1.25, W / 2 - 90), ry = Math.min(R * .82, H / 2 - 70);
        const x = cx + Math.cos(a) * rx - mx * 24 * (n.ring ? 1.4 : .8), y = cy + Math.sin(a) * ry - my * 18 * (n.ring ? 1.4 : .8) + (RM ? 0 : Math.sin(t * .0008 + n.ph) * 5);
        const w = n.el.offsetWidth, h = n.el.offsetHeight; n.el.style.transform = `translate(${x - w / 2}px,${y - h / 2}px)`;
        n.l.setAttribute('x1', cx); n.l.setAttribute('y1', cy); n.l.setAttribute('x2', x); n.l.setAttribute('y2', y); });
      core.style.top = cy + 'px';
    }
    function loop() { if (!run || innerWidth <= 1024) return; frame(performance.now()); if (!RM) requestAnimationFrame(loop); }
    orbit.addEventListener('pointermove', e => { const r = orbit.getBoundingClientRect(); tX = (e.clientX - r.left) / r.width - .5; tY = (e.clientY - r.top) / r.height - .5; });
    orbit.addEventListener('pointerleave', () => { tX = 0; tY = 0; });
    new IntersectionObserver(es => { const was = run; run = es[0].isIntersecting; if (run && !was) loop(); }).observe(orbit);
    addEventListener('resize', () => frame(performance.now()));
    tabs.addEventListener('click', e => { const b = e.target.closest('.stack-tab'); if (b) show(+b.dataset.i); });
    tabs.addEventListener('keydown', e => { if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return; e.preventDefault(); const d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1; const i = (cur + d + G.length) % G.length; show(i); $$('.stack-tab', tabs)[i].focus(); });
    show(0);
  }

  /* ---------- approach ---------- */
  function initApproach() {
    const kinds = ['ph-rise', 'ph-wipe', 'ph-blur', 'ph-line', 'ph-split'];
    $('#principles').innerHTML = window.PRINCIPLES.map((s, i) => {
      let inner = esc(s);
      if (kinds[i] === 'ph-split') { const w = s.split(' '), h = Math.ceil(w.length / 2); inner = `<span class="a">${esc(w.slice(0, h).join(' '))}</span> <span class="b"><em>${esc(w.slice(h).join(' '))}</em></span>`; }
      if (kinds[i] === 'ph-wipe') inner = inner.replace(/(part of the experience\.)/, '<em>$1</em>');
      return `<div class="ph-item ${kinds[i]}" data-ph><span class="n mono">${pad(i + 1)}</span><p class="s${kinds[i] === 'ph-rise' ? ' split" data-split' : '"'}>${inner}</p></div>`;
    }).join('');
    const steps = $('#steps'); steps.insertAdjacentHTML('beforeend', window.PROCESS.map((s, i) => `<li class="step"><span class="num">${pad(i + 1)}</span><h4>${esc(s.t)}</h4><p>${esc(s.d)}</p></li>`).join(''));
    const items = $$('.step', steps), fill = $('.fill', steps);
    const upd = () => { const r = steps.getBoundingClientRect(), vh = innerHeight; const p = Math.max(0, Math.min(1, (vh * .85 - r.top) / (vh * .55)));
      fill.style.setProperty('--p', p); const mobile = innerWidth <= 820;
      items.forEach((s, k) => s.classList.toggle('on', mobile ? s.getBoundingClientRect().top < vh * .8 : p >= k / items.length + .02)); };
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  }

  /* ---------- form ---------- */
  function initForm() {
    const form = $('#inq'), status = $('#form-status'), btn = $('#f-submit'), useEP = !!P.formEndpoint;
    $('#f-type').insertAdjacentHTML('beforeend', window.PROJECT_TYPES.map(t => `<option>${esc(t)}</option>`).join(''));
    $('#form-note').textContent = useEP ? 'Your details are only used to reply to your inquiry.' : 'Opens your email app with the message ready — you press send.';
    const rules = { name: v => v.trim().length >= 2 || 'Please enter your full name.', email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.', type: v => !!v || 'Please choose a project type.', description: v => v.trim().length >= 20 || 'Please add a few more details (at least 20 characters).' };
    const check = el => { const r = rules[el.name]; if (!r) return true; const res = r(el.value), f = el.closest('.field'), err = f.querySelector('.err');
      if (res === true) { f.classList.remove('invalid'); el.removeAttribute('aria-invalid'); err.textContent = ''; return true; }
      f.classList.add('invalid'); el.setAttribute('aria-invalid', 'true'); err.textContent = res; return false; };
    $$('input,select,textarea', form).forEach(el => { el.addEventListener('blur', () => { if (el.value) check(el); }); el.addEventListener('input', () => { if (el.closest('.field').classList.contains('invalid')) check(el); }); });
    const show = (h, err) => { status.innerHTML = h; status.classList.add('show'); status.classList.toggle('err', !!err); };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const bad = $$('input,select,textarea', form).filter(el => !check(el));
      if (bad.length) { bad[0].focus(); show('<h4>A few details are missing</h4>Please fix the highlighted fields.', true); return; }
      const d = Object.fromEntries(new FormData(form));
      const subject = `Project inquiry: ${d.type} — ${d.name}`;
      const body = `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company || '—'}\nProject type: ${d.type}\nBudget: ${d.budget || 'Prefer to discuss'}\nTimeline: ${d.timeline || 'Flexible'}\n\n${d.description}`;
      if (useEP) {
        btn.disabled = true; const old = btn.innerHTML; btn.innerHTML = 'Sending…';
        try { const r = await fetch(P.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, _subject: subject }) }); if (!r.ok) throw new Error(r.status); form.reset(); show('<h4>Inquiry received</h4>Thanks — I’ll get back to you soon.'); }
        catch (_) { show(`<h4>Couldn’t send right now</h4>Please email me directly at <a href="mailto:${esc(P.email)}">${esc(P.email)}</a>.`, true); }
        finally { btn.disabled = false; btn.innerHTML = old; }
        return;
      }
      const href = mailto(subject, body);
      show(`<h4>Almost there — nothing has been sent yet</h4>Your email app should open with the message ready. Press send there to reach me. If it didn’t open, copy the message and email it to <strong>${esc(P.email)}</strong>.<div class="acts"><a href="${esc(href)}">Open email app again</a><button type="button" id="copy-msg">Copy message</button></div>`);
      $('#copy-msg').addEventListener('click', async ev => { try { await navigator.clipboard.writeText(`To: ${P.email}\nSubject: ${subject}\n\n${body}`); ev.target.textContent = 'Copied ✓'; } catch (_) { ev.target.textContent = 'Copy blocked — please select manually'; } });
      try { location.href = href; } catch (_) { }
    });
  }

  /* ---------- footer spotlight ---------- */
  function initFooter() {
    const n = $('#f-name-big'), s = n.querySelector('span');
    if (RM) { s.style.webkitMaskImage = s.style.maskImage = 'none'; return; }
    let t0 = performance.now(), hovering = false;
    n.addEventListener('pointermove', e => { hovering = true; const r = n.getBoundingClientRect(); s.style.setProperty('--mx', (e.clientX - r.left) + 'px'); s.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
    n.addEventListener('pointerleave', () => hovering = false);
    let vis = false; new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis) loop(); }).observe(n);
    function loop() { if (!vis) return; if (!hovering) { const t = (performance.now() - t0) / 1000, w = n.offsetWidth; s.style.setProperty('--mx', (w / 2 + Math.sin(t * .6) * w * .42) + 'px'); s.style.setProperty('--my', '50%'); } requestAnimationFrame(loop); }
  }

  /* ---------- boot ---------- */
  bindProfile(); renderEdu(); initServices(); initProjects(); initApproach(); initReveal(); initNav(); initCursor(); initMagnetic(); initStack(); initForm(); initRouting(); initFooter(); startCountdowns();
  const dots = $$('#now-dots i'), lbl = $('#now-label');
  let ready;
  try { ready = window.initHero((i, label) => { lbl.textContent = label; dots.forEach((d, k) => d.classList.toggle('on', k === i)); }); }
  catch (e) { console.error(e); document.body.classList.add('nogl'); ready = Promise.resolve(); }
  runLoader(ready || Promise.resolve());
})();
