seedReviews();
injectSharedModals();

// Render team mini cards
document.getElementById('teamMiniGrid').innerHTML = KAZIS.map(k => {
  const revs = getKaziReviews(k.id);
  const lr = revs.length ? (revs.reduce((a, r) => a + r.rating, 0) / revs.length) : k.rating;
  const lrStr = lr.toFixed(1);
  const stars = '★'.repeat(Math.floor(lr)) + '☆'.repeat(5 - Math.floor(lr));
  const si = statusInfo(k.status);
  return `
  <div class="team-mini-card reveal" style="position:relative">
    ${k.isChief ? '<div style="position:absolute;top:.8rem;right:.8rem;background:linear-gradient(135deg,var(--gr),var(--gd));color:#fff;font-size:.66rem;font-weight:700;padding:.22rem .65rem;border-radius:50px;letter-spacing:1px">প্রধান</div>' : ''}
    <div class="team-mini-photo">👤</div>
    <div class="team-mini-role">${k.role}</div>
    <div class="team-mini-name">${k.name}</div>
    <div class="avail-badge" style="justify-content:center"><div class="dot ${si.dot}"></div>${si.label}</div>
    <div class="team-mini-stat">🕌 ${k.totalNikah.toLocaleString('bn-BD')}+ নিকাহ · ${k.experience} বছর</div>
    <div class="team-mini-stars">${stars} ${lrStr}</div>
    <div style="display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap">
      <a href="kazi-profile.html?id=${k.id}" class="btn btn-outline btn-sm">প্রোফাইল</a>
      <button class="btn btn-primary btn-sm" onclick="bookKazi('${k.id}','${k.name}')">বুকিং</button>
    </div>
  </div>`;
}).join('');
