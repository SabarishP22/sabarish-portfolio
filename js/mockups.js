/* Concept UI mockups (HTML/CSS) — illustrative designs, not real project screenshots. */
(function () {
  const sb = `<div class="u-status"><span>9:41</span><i></i><span class="u-sig"><b></b><b></b><b></b></span></div>`;
  const nav = (n, a) => `<div class="u-nav">${Array.from({ length: n }, (_, i) => `<span class="${i === a ? 'on' : ''}"></span>`).join('')}</div>`;

  const M = {
    nutri: () => `${sb}
      <div class="u-head"><div><small>Today</small><h5>Nutrition</h5></div><span class="u-av"></span></div>
      <div class="u-card u-ringcard">
        <div class="u-ring" style="--p:68"><div><b>1,420</b><small>kcal eaten</small></div></div>
        <div class="u-macros">
          <div><small>Protein</small><i style="--w:72%;--c:#A78BFA"></i></div>
          <div><small>Carbs</small><i style="--w:54%;--c:#60A5FA"></i></div>
          <div><small>Fat</small><i style="--w:38%;--c:#34D399"></i></div>
        </div>
      </div>
      <div class="u-sec">Meals</div>
      <div class="u-list"><div class="u-li"><span class="u-ic" style="--c:#F59E0B"></span><div><b>Breakfast</b><small>Oats · Banana</small></div><em>320</em></div>
      <div class="u-li"><span class="u-ic" style="--c:#34D399"></span><div><b>Lunch</b><small>Rice · Dal · Salad</small></div><em>610</em></div></div>
      <div class="u-chal"><span>🔥</span><div><b>7-day challenge</b><small>Keep your streak going</small></div></div>
      ${nav(4, 2)}`,

    agent: () => `${sb}
      <div class="u-head"><div><small>Assistant</small><h5>How can I help?</h5></div><span class="u-orb"></span></div>
      <div class="u-chat">
        <div class="u-msg me">Set an alarm for 6:30 tomorrow</div>
        <div class="u-ents"><span>intent · SET_ALARM</span><span>time · 06:30</span></div>
        <div class="u-msg bot"><b class="u-ok">✓</b> Alarm set for 6:30 AM tomorrow.</div>
        <div class="u-msg me">Add team sync to my calendar at 4</div>
        <div class="u-msg bot u-typing"><i></i><i></i><i></i></div>
      </div>
      <div class="u-voice"><div class="u-wave">${Array.from({ length: 18 }, (_, i) => `<i style="--d:${(i * 0.07).toFixed(2)}s"></i>`).join('')}</div><span class="u-mic"></span></div>`,

    quiz: () => `${sb}
      <div class="u-head"><div><small>Lesson 4 · Fruits</small><h5>Question 3 / 10</h5></div><span class="u-stars">★★☆</span></div>
      <div class="u-prog"><i style="--w:30%"></i></div>
      <div class="u-card u-qcard"><span class="u-apple"></span><b>りんご</b><small>Choose the English word</small></div>
      <div class="u-opts"><span>Orange</span><span class="ok">Apple ✓</span><span>Grape</span><span>Peach</span></div>
      <div class="u-btn" style="--c:#F59E0B">Next question</div>`,

    social: () => `${sb}
      <div class="u-head"><div><small>Community</small><h5>Feed</h5></div><span class="u-bell"><i></i></span></div>
      <div class="u-stories">${['#F97316', '#8B5CF6', '#60A5FA', '#34D399', '#F59E0B'].map(c => `<span style="--c:${c}"></span>`).join('')}</div>
      <div class="u-card u-post"><div class="u-li"><span class="u-av sm"></span><div><b>Morning run</b><small>Community · 5 min ago</small></div></div>
        <div class="u-map"><svg viewBox="0 0 200 90"><path d="M10 70 C40 20, 70 80, 100 40 S160 10, 190 50" fill="none" stroke="#F97316" stroke-width="3" stroke-linecap="round"/><circle cx="190" cy="50" r="5" fill="#fff"/></svg></div>
        <div class="u-acts"><span>♥ Like</span><span>💬 Comment</span><span>↗ Share</span></div></div>
      <div class="u-toast"><span class="u-dot"></span>New activity from your community</div>
      ${nav(4, 0)}`,

    pay: () => `${sb}
      <div class="u-head"><div><small>Signed in · Firebase Auth</small><h5>Group kitty</h5></div><span class="u-lock">🔒</span></div>
      <div class="u-card u-wallet"><small>Shared kitty</small><b>Weekend trip</b><div class="u-avs"><span></span><span></span><span></span><span>+2</span></div></div>
      <div class="u-sec">Live chat</div>
      <div class="u-chat sm">
        <div class="u-msg bot">I've added my share 👍</div>
        <div class="u-msg me">Great — booking tonight</div>
        <div class="u-msg bot u-typing"><i></i><i></i><i></i></div>
      </div>
      <div class="u-input"><span>Message…</span><i></i></div>`,

    auction: () => `${sb}
      <div class="u-head"><div><small>Auctions</small><h5>Live now</h5></div><span class="u-live">● LIVE</span></div>
      <div class="u-card u-lot"><div class="u-lotimg"><span class="u-timer" data-countdown="154">02:34</span></div>
        <div class="u-li"><div><b>Vintage collection</b><small>Lot · ending soon</small></div></div></div>
      <div class="u-sec">Bid activity <span class="u-ws">WebSocket</span></div>
      <div class="u-feed"><div class="u-li u-flash"><span class="u-av sm"></span><div><b>New bid placed</b><small>just now</small></div></div>
      <div class="u-li"><span class="u-av sm b"></span><div><b>New bid placed</b><small>12 s ago</small></div></div></div>
      <div class="u-btn" style="--c:#EF4444">Place bid</div>`,

    scout: () => `${sb}
      <div class="u-offline"><i></i>Offline · saving locally</div>
      <div class="u-head"><div><small>Field data</small><h5>Records</h5></div><span class="u-db">ROOM</span></div>
      <div class="u-list">
        ${[['Entry 014', 'pending'], ['Entry 013', 'pending'], ['Entry 012', 'synced'], ['Entry 011', 'synced']].map(([n, s]) => `<div class="u-li"><span class="u-ic ${s}"></span><div><b>${n}</b><small>Details hidden · confidential</small></div><em class="u-st ${s}">${s === 'synced' ? '✓ Synced' : '◷ Queued'}</em></div>`).join('')}
      </div>
      <div class="u-sync"><small>Auto sync when back online</small><i></i></div>
      <div class="u-btn" style="--c:#10B981">+ New entry</div>`
  };

  window.mockup = function (kind, accent, accent2) {
    return `<div class="phone-mock" style="--a:${accent};--a2:${accent2}"><div class="pm-notch"></div><div class="pm-screen">${(M[kind] || M.nutri)()}</div></div>`;
  };
})();
