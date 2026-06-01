seedReviews();
injectSharedModals();
document.getElementById('hDate').min = new Date().toISOString().split('T')[0];

// Populate kazi dropdown
KAZIS.forEach(k => {
  document.getElementById('hKazi').innerHTML += `<option value="${k.id}">${k.name}${k.isChief ? ' (প্রধান)' : ''}</option>`;
});

// Home reviews
function renderHomeRevs() {
  const all = getAllReviews();
  let flat = [];
  Object.entries(all).forEach(([kid, revs]) => {
    const k = KAZIS.find(x => x.id === kid);
    revs.forEach(r => flat.push({ ...r, kaziId: kid, kaziName: k?.name || kid }));
  });
  flat.sort((a, b) => b.id - a.id);
  const grid = document.getElementById('homeRevGrid');
  if (!flat.length) {
    grid.innerHTML = '<p style="color:var(--ts);padding:1rem">এখনও কোনো ফিডব্যাক নেই।</p>';
    return;
  }
  grid.innerHTML = flat.slice(0, 3).map(r => `
    <div class="review-card reveal">
      <div class="review-quote">"</div>
      <div class="stars" style="margin-bottom:.5rem">${'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}</div>
      ${r.photo ? `<div class="review-photo"><img src="${r.photo}" alt="ছবি" onclick="openLightbox('${r.photo}')"></div>` : ''}
      <p class="review-text">${escH(r.text)}</p>
      <div class="review-author"><div class="review-avatar">👤</div><div>
        <div class="review-name">${escH(r.name)}</div>
        <div class="review-date">${escH(r.location)} · <a href="kazi-profile.html?id=${r.kaziId}" style="color:var(--gr)">${escH(r.kaziName)}</a></div>
      </div></div>
    </div>`).join('');
  document.querySelectorAll('#homeRevGrid .reveal').forEach(el => _revObs.observe(el));
}
renderHomeRevs();
_onReviewAdded = () => renderHomeRevs();

function submitHomeBooking() {
  const g = document.getElementById('hGroom').value.trim();
  const b = document.getElementById('hBride').value.trim();
  const p = document.getElementById('hPhone').value.trim();
  const s = document.getElementById('hService').value;
  const d = document.getElementById('hDate').value;
  if (!g || !b || !p || !s || !d) { toast('⚠ সকল * চিহ্নিত তথ্য পূরণ করুন।'); return; }
  ['hGroom', 'hBride', 'hPhone', 'hNote'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('hService').selectedIndex = 0;
  document.getElementById('hKazi').selectedIndex = 0;
  document.getElementById('hDate').value = '';
  openModal('_successModal');
}
