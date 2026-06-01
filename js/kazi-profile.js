seedReviews();
injectSharedModals();

const kaziId = new URLSearchParams(location.search).get('id') || 'younus';
const k = KAZIS.find(x => x.id === kaziId) || KAZIS[0];
document.title = k.name + ' — ইউনুস কাজী অফিস';

const si = statusInfo(k.status);
let revs = getKaziReviews(k.id);
function getLR() {
  revs = getKaziReviews(k.id);
  return revs.length ? (revs.reduce((a, r) => a + r.rating, 0) / revs.length) : k.rating;
}
let lr = getLR();
const lrStr = lr.toFixed(1);
const stars = '★'.repeat(Math.floor(lr)) + '☆'.repeat(5 - Math.floor(lr));

// Photo column
document.getElementById('profilePhotoCol').innerHTML = `
  <div class="profile-photo-ph">
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none"><rect x="6" y="6" width="52" height="52" rx="10" stroke="rgba(255,255,255,0.38)" stroke-width="1.5" stroke-dasharray="6 3"/><circle cx="32" cy="24" r="9" stroke="rgba(255,255,255,0.38)" stroke-width="1.5"/><path d="M12 52 Q22 38 32 37 Q42 38 52 52" stroke="rgba(255,255,255,0.38)" stroke-width="1.5" fill="none"/></svg>
    <span>${k.name}-এর ছবি</span>
    <span style="font-size:.68rem;opacity:.38">${k.photo}</span>
  </div>`;

// Profile info — single role badge, no duplicate, name size toned down
document.getElementById('profileInfo').innerHTML = `
  <div class="breadcrumb" style="justify-content:flex-start;margin-bottom:.9rem">
    <a href="index.html">হোম</a><span class="sep">›</span><a href="kazis.html">কাজীরা</a><span class="sep">›</span><span>${k.name}</span>
  </div>
  ${k.isChief ? '<div class="profile-chief-crown">☪ প্রধান কাজী ও প্রতিষ্ঠাতা</div>' : ''}
  <div class="profile-role-lbl">${k.role}</div>
  <div class="profile-name">${k.name}</div>
  <div class="profile-sub">${k.education} | লাইসেন্স: ${k.license}</div>
  <div class="profile-avail"><div class="dot ${si.dot}" style="display:inline-block"></div>${si.label}</div>
  <div class="profile-rating-row">
    <div><div class="big-rating">${lrStr}</div><div class="rating-cnt">${revs.length} রিভিউ</div></div>
    <div class="rating-stars-lg">${stars}</div>
  </div>
  <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;margin-bottom:.85rem">
    <div class="level-badge">${k.levelBadge || '🏅'} ${k.level || k.role}</div>
  </div>
  <div class="profile-stats-row">
    <div><div class="pst-num">${k.totalNikah.toLocaleString('bn-BD')}+</div><div class="pst-lbl">সফল নিকাহ</div></div>
    <div><div class="pst-num">${k.experience}+</div><div class="pst-lbl">বছরের অভিজ্ঞতা</div></div>
  </div>
  <div class="achievement-list" style="margin-bottom:1rem">${(k.achievements || []).map(a => `<span class="achievement-tag" style="background:rgba(232,197,71,.12);border-color:rgba(232,197,71,.3);color:var(--gl)">✓ ${a}</span>`).join('')}</div>
  <div class="profile-actions">
    <button class="btn btn-inv btn-lg" onclick="bookKazi('${k.id}','${k.name}')">📅 বুকিং করুন</button>
    <button class="btn btn-lg" style="background:rgba(255,255,255,.12);color:#fff;border:1.5px solid rgba(232,197,71,.4)" onclick="openReviewModal('${k.id}')">✍️ ফিডব্যাক দিন</button>
  </div>`;

// Side panel
function buildRatingBars() {
  const counts = [0, 0, 0, 0, 0];
  revs.forEach(r => { if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++; });
  const total = revs.length || 1;
  return [5, 4, 3, 2, 1].map(i => {
    const pct = Math.round(counts[i - 1] / total * 100);
    return `<div class="rbar-row"><div class="rbar-lbl">${i}★</div><div class="rbar-track"><div class="rbar-fill" style="width:${pct}%"></div></div><div class="rbar-cnt">${counts[i - 1]}</div></div>`;
  }).join('');
}

document.getElementById('profileSide').innerHTML = `
  <div class="book-side">
    <h4>📅 এখনই বুকিং দিন</h4>
    <p>${k.name}-এর সাথে আপনার বিশেষ দিনটি নিশ্চিত করুন।</p>
    <button class="btn btn-inv" style="width:100%;justify-content:center" onclick="bookKazi('${k.id}','${k.name}')">বুকিং করুন</button>
  </div>
  <div class="side-card">
    <h4>📋 তথ্যাদি</h4>
    <div class="info-row"><span class="info-icon">🪪</span><div><span class="info-lbl">লাইসেন্স নং</span><span class="info-val">${k.license}</span></div></div>
    <div class="info-row"><span class="info-icon">🎓</span><div><span class="info-lbl">শিক্ষাগত যোগ্যতা</span><span class="info-val">${k.education}</span></div></div>
    <div class="info-row"><span class="info-icon">📍</span><div><span class="info-lbl">সেবা এলাকা</span><span class="info-val">${k.area}</span></div></div>
    <div class="info-row"><span class="info-icon">📅</span><div><span class="info-lbl">অভিজ্ঞতা</span><span class="info-val">${k.experience}+ বছর</span></div></div>
    <div class="info-row"><span class="info-icon">🕌</span><div><span class="info-lbl">সম্পন্ন নিকাহ</span><span class="info-val">${k.totalNikah.toLocaleString('bn-BD')}+</span></div></div>
    <div class="info-row"><span class="info-icon">📞</span><div><span class="info-lbl">যোগাযোগ</span><a href="tel:${k.phone}" class="info-val" style="color:var(--gr)">${k.phone}</a></div></div>
  </div>
  <div class="side-card" id="ratingBarSide">
    <h4>⭐ রেটিং বিশ্লেষণ</h4>
    <div style="text-align:center;margin-bottom:1rem">
      <div style="font-family:'Noto Serif Bengali',serif;font-size:2.4rem;font-weight:900;color:var(--gd)">${lrStr}</div>
      <div style="color:var(--gr);font-size:1.1rem;letter-spacing:2px">${stars}</div>
      <div style="font-size:.76rem;color:var(--ts)">${revs.length} রিভিউ</div>
    </div>
    ${buildRatingBars()}
  </div>
  <div class="side-card">
    <h4>অন্যান্য কাজীরা</h4>
    ${KAZIS.filter(x => x.id !== k.id).map(x => `
      <a href="kazi-profile.html?id=${x.id}" class="other-kazi-link">
        <div class="ok-avatar">👤</div>
        <div><div class="ok-name">${x.name}</div><div class="ok-role">${x.role}</div></div>
      </a>`).join('')}
  </div>`;

// Main content
function renderReviews() {
  revs = getKaziReviews(k.id);
  const wall = document.getElementById('reviewsWall');
  if (!revs.length) {
    wall.innerHTML = '<div class="no-reviews">এই কাজীর জন্য এখনও কোনো ফিডব্যাক নেই। প্রথম ফিডব্যাক দিন!</div>';
    return;
  }
  wall.innerHTML = revs.map(r => `
    <div class="review-card">
      <div class="review-quote">"</div>
      <div class="stars" style="margin-bottom:.5rem">${'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}</div>
      ${r.photo ? `<div class="review-photo"><img src="${r.photo}" alt="ছবি" onclick="openLightbox('${r.photo}')"></div>` : ''}
      <p class="review-text">${escH(r.text)}</p>
      <div class="review-author">
        <div class="review-avatar">👤</div>
        <div><div class="review-name">${escH(r.name)}</div><div class="review-date">${escH(r.location)} · ${r.date || ''}</div></div>
      </div>
    </div>`).join('');
}

document.getElementById('profileMain').innerHTML = `
  <div class="psec">
    <div class="psec-title">👤 পরিচিতি ও বায়ো</div>
    <p class="bio-text">${k.bio}</p>
  </div>
  <div class="psec">
    <div class="psec-title">✦ বিশেষত্ব</div>
    <div class="spec-tags">${k.specialties.map(s => `<span class="spec-tag">${s}</span>`).join('')}</div>
  </div>
  <div class="psec">
    <div class="psec-title">🕐 সাপ্তাহিক সময়সূচি</div>
    <div class="avail-table">
      ${k.availability.map(a => `
        <div class="avail-row">
          <span class="avail-day">${a.day}</span>
          ${a.time === 'বন্ধ' ? '<span class="avail-off">বন্ধ</span>' : `<span class="avail-time">${a.time}</span>`}
        </div>`).join('')}
    </div>
  </div>
  <div class="psec">
    <div class="psec-title">⭐ গ্রাহকদের ফিডব্যাক</div>
    <div id="reviewsWall"></div>
    <button class="btn btn-ghost btn-sm" style="margin-top:1rem" onclick="openReviewModal('${k.id}')">✍️ আপনার মন্তব্য দিন</button>
  </div>`;

renderReviews();

_onReviewAdded = () => {
  lr = getLR();
  renderReviews();
  document.getElementById('ratingBarSide').innerHTML = `
    <h4>⭐ রেটিং বিশ্লেষণ</h4>
    <div style="text-align:center;margin-bottom:1rem">
      <div style="font-family:'Noto Serif Bengali',serif;font-size:2.4rem;font-weight:900;color:var(--gd)">${lr.toFixed(1)}</div>
      <div style="color:var(--gr);font-size:1.1rem;letter-spacing:2px">${'★'.repeat(Math.floor(lr)) + '☆'.repeat(5 - Math.floor(lr))}</div>
      <div style="font-size:.76rem;color:var(--ts)">${revs.length} রিভিউ</div>
    </div>
    ${buildRatingBars()}`;
};
