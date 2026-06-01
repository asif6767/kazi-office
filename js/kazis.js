seedReviews();
injectSharedModals();

function buildPhotoPH(k) {
  return `<div class="chief-photo-ph">
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none"><rect x="6" y="6" width="52" height="52" rx="10" stroke="#C9970A" stroke-width="1.5" stroke-dasharray="6 3"/><circle cx="32" cy="24" r="9" stroke="#C9970A" stroke-width="1.5"/><path d="M12 52 Q22 38 32 37 Q42 38 52 52" stroke="#C9970A" stroke-width="1.5" fill="none"/></svg>
    <span style="font-size:.78rem;opacity:.7">${k.name}-এর ছবি</span>
    <span style="font-size:.66rem;opacity:.4">${k.photo}</span>
  </div>`;
}

// Chief Kazi
const chief = KAZIS.find(k => k.isChief);
if (chief) {
  const si = statusInfo(chief.status);
  const revs = getKaziReviews(chief.id);
  const lr = revs.length ? (revs.reduce((a, r) => a + r.rating, 0) / revs.length).toFixed(1) : chief.rating.toFixed(1);
  const stars = '★'.repeat(Math.floor(parseFloat(lr))) + '☆'.repeat(5 - Math.floor(parseFloat(lr)));
  document.getElementById('chiefCard').innerHTML = `
    <div class="chief-photo-col">
      <div class="chief-crown">☪ প্রধান কাজী ও প্রতিষ্ঠাতা</div>
      ${buildPhotoPH(chief)}
    </div>
    <div class="chief-info">
      <div class="chief-role">${chief.role}</div>
      <div class="chief-name">${chief.name}</div>
      <div class="chief-edu">${chief.education}</div>
      <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;margin-bottom:.85rem">
        <div class="avail-badge"><div class="dot ${si.dot}"></div>${si.label}</div>
        <div class="level-badge">${chief.levelBadge} ${chief.level}</div>
      </div>
      <div class="chief-stats">
        <div><div class="cst-num">${chief.totalNikah.toLocaleString('bn-BD')}+</div><div class="cst-lbl">সফল নিকাহ</div></div>
        <div><div class="cst-num">${chief.experience}+</div><div class="cst-lbl">বছরের অভিজ্ঞতা</div></div>
        <div><div class="cst-num" style="font-size:1.55rem">${stars}</div><div class="cst-lbl">⭐ ${lr} / ৫ (${revs.length} রিভিউ)</div></div>
      </div>
      <p class="chief-bio">${chief.bio}</p>
      <div class="chief-tags">${chief.specialties.map(s => `<span class="ctag">${s}</span>`).join('')}</div>
      <div class="achievement-list" style="margin-bottom:1.3rem">${(chief.achievements || []).map(a => `<span class="achievement-tag">✓ ${a}</span>`).join('')}</div>
      <div class="chief-actions">
        <button class="btn btn-primary" onclick="bookKazi('${chief.id}','${chief.name}')">📅 বুকিং করুন</button>
        <a href="kazi-profile.html?id=${chief.id}" class="btn btn-outline">👤 পূর্ণ প্রোফাইল</a>
        <button class="btn btn-ghost btn-sm" onclick="openReviewModal('${chief.id}')">✍️ ফিডব্যাক</button>
      </div>
    </div>`;
}

// Team Kazis
const team = KAZIS.filter(k => !k.isChief);
document.getElementById('teamGrid').innerHTML = team.map(k => {
  const si = statusInfo(k.status);
  const revs = getKaziReviews(k.id);
  const lr = revs.length ? (revs.reduce((a, r) => a + r.rating, 0) / revs.length).toFixed(1) : k.rating.toFixed(1);
  const stars = '★'.repeat(Math.floor(parseFloat(lr))) + '☆'.repeat(5 - Math.floor(parseFloat(lr)));
  return `
  <div class="kazi-card reveal">
    <div class="kc-photo-wrap">
      <div class="kc-photo-ph">
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none"><rect x="6" y="6" width="52" height="52" rx="10" stroke="#C9970A" stroke-width="1.5" stroke-dasharray="6 3"/><circle cx="32" cy="24" r="9" stroke="#C9970A" stroke-width="1.5"/><path d="M12 52 Q22 38 32 37 Q42 38 52 52" stroke="#C9970A" stroke-width="1.5" fill="none"/></svg>
        <span style="font-size:.68rem;opacity:.45">${k.photo}</span>
      </div>
    </div>
    <div class="kc-body">
      <div class="kc-role">${k.role}</div>
      <div class="kc-name">${k.name}</div>
      <div style="display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;margin-bottom:.55rem">
        <div class="avail-badge"><div class="dot ${si.dot}"></div>${si.label}</div>
        <div class="level-badge" style="font-size:.68rem;padding:.2rem .65rem">${k.levelBadge} ${k.level}</div>
      </div>
      <div class="stars" style="margin-bottom:.55rem">${stars} <span style="font-size:.77rem;color:var(--ts);margin-left:.3rem">${lr} / ৫ (${revs.length} রিভিউ)</span></div>
      <div class="kc-stats">
        <div class="kstat">🕌 ${k.totalNikah.toLocaleString('bn-BD')}+ নিকাহ</div>
        <div class="kstat">📅 ${k.experience} বছর</div>
        <div class="kstat">📍 ${k.area.split(',')[0]}</div>
      </div>
      <p class="kc-bio">${k.bio}</p>
      <div class="achievement-list" style="margin-bottom:.9rem">${(k.achievements || []).slice(0, 2).map(a => `<span class="achievement-tag">✓ ${a}</span>`).join('')}</div>
      <div class="kc-footer">
        <button class="btn btn-primary btn-sm" onclick="bookKazi('${k.id}','${k.name}')">📅 বুকিং</button>
        <a href="kazi-profile.html?id=${k.id}" class="btn btn-outline btn-sm">👤 প্রোফাইল</a>
        <button class="btn btn-ghost btn-sm" onclick="openReviewModal('${k.id}')">✍️ রিভিউ</button>
      </div>
    </div>
  </div>`;
}).join('');

document.querySelectorAll('.reveal').forEach(el => _revObs.observe(el));
_onReviewAdded = () => location.reload();
