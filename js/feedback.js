seedReviews();
injectSharedModals();

// Populate dropdowns
KAZIS.forEach(k => {
  document.getElementById('fKazi').innerHTML += `<option value="${k.id}">${k.name} (${k.role})</option>`;
  document.getElementById('kaziFilter').innerHTML += `<option value="${k.id}">${k.name}</option>`;
});

// Star picker — JS based, left to right
let _feedRating = 0;
function pickStar(n) {
  _feedRating = n;
  document.getElementById('fStarVal').value = n;
  document.querySelectorAll('#starPick label').forEach((lbl, i) => {
    lbl.style.color = i < n ? 'var(--gr)' : '#ddd';
  });
}
document.querySelectorAll('#starPick label').forEach((lbl, i) => {
  lbl.addEventListener('mouseenter', () => {
    document.querySelectorAll('#starPick label').forEach((l, j) => l.style.color = j <= i ? 'var(--gr)' : '#ddd');
  });
  lbl.addEventListener('mouseleave', () => pickStar(_feedRating));
});

// Photo upload
let feedPhotoData = null;
document.getElementById('feedPhoto').addEventListener('change', function () {
  const file = this.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    feedPhotoData = e.target.result;
    const p = document.getElementById('feedPhotoPrev'); p.src = feedPhotoData; p.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

// EmailJS initialization
(function () { emailjs.init({ publicKey: 'off2fO4OdEsS111Xk' }); })();

function submitFeedback() {
  const name = document.getElementById('fName').value.trim();
  const loc = document.getElementById('fLoc').value.trim();
  const kaziId = document.getElementById('fKazi').value;
  const rating = parseInt(document.getElementById('fStarVal').value) || 0;
  const text = document.getElementById('fText').value.trim();
  if (!name || !kaziId || !rating || text.length < 10) { toast('⚠ নাম, কাজী, রেটিং ও মন্তব্য (১০+ অক্ষর) দিন।'); return; }
  const bn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const d = new Date(); const dateStr = `${d.getFullYear()} ${bn[d.getMonth()]} ${d.getDate()}`;
  const kaziName = document.getElementById('fKazi').options[document.getElementById('fKazi').selectedIndex]?.text || kaziId;
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  addReview(kaziId, { id: Date.now(), name, location: loc || 'বাংলাদেশ', rating, text, photo: feedPhotoData, date: dateStr });

  // Send feedback email via EmailJS to classr489@gmail.com
  emailjs.send('service_m13lrbx', 'template_3lijeq6', {
    to_name: 'Admin',
    to_email: 'classr489@gmail.com',
    feedback_name: name,
    feedback_location: loc || 'বাংলাদেশ',
    feedback_kazi: kaziName,
    feedback_rating: stars + ' (' + rating + '/5)',
    feedback_text: text,
    feedback_date: dateStr
  }).then(() => {
    console.log('Feedback email sent to classr489@gmail.com');
  }).catch(err => {
    console.warn('Email not sent:', err);
  });

  // Reset
  document.getElementById('fName').value = '';
  document.getElementById('fLoc').value = '';
  document.getElementById('fText').value = '';
  document.getElementById('fKazi').selectedIndex = 0;
  feedPhotoData = null; _feedRating = 0;
  document.getElementById('fStarVal').value = 0;
  document.querySelectorAll('#starPick label').forEach(l => l.style.color = '#ddd');
  const p = document.getElementById('feedPhotoPrev'); p.src = ''; p.style.display = 'none';
  document.getElementById('feedPhoto').value = '';
  toast('✅ আপনার মন্তব্য সফলভাবে যোগ হয়েছে!');
  renderRevWall('all'); renderDynamicPhotos();
}

function getAllFlat() {
  const all = getAllReviews(); let flat = [];
  Object.entries(all).forEach(([kid, revs]) => {
    const k = KAZIS.find(x => x.id === kid);
    revs.forEach(r => flat.push({ ...r, kaziId: kid, kaziName: k?.name || kid }));
  });
  return flat.sort((a, b) => b.id - a.id);
}

function renderRevWall(filter, kaziId = '') {
  let revs = getAllFlat();
  if (kaziId) revs = revs.filter(r => r.kaziId === kaziId);
  if (filter === '5') revs = revs.filter(r => r.rating === 5);
  if (filter === 'photo') revs = revs.filter(r => r.photo);
  const wall = document.getElementById('revWall');
  if (!revs.length) { wall.innerHTML = '<div class="no-rev">💬 এই বিভাগে কোনো মন্তব্য নেই।</div>'; return; }
  wall.innerHTML = revs.map(r => `
    <div class="review-card">
      <div class="review-quote">"</div>
      <a href="kazi-profile.html?id=${r.kaziId}" class="rev-card-kazi-tag">👤 ${escH(r.kaziName)}</a>
      <div class="stars" style="margin-bottom:.5rem">${'★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)}</div>
      ${r.photo ? `<div class="review-photo"><img src="${r.photo}" alt="ছবি" onclick="openLightbox('${r.photo}')"></div>` : ''}
      <p class="review-text">${escH(r.text)}</p>
      <div class="review-author">
        <div class="review-avatar">👤</div>
        <div><div class="review-name">${escH(r.name)}</div><div class="review-date">${escH(r.location)} · ${r.date || ''}</div></div>
      </div>
    </div>`).join('');
}

function filterRevs(filter, btn) {
  document.querySelectorAll('.rfbtn').forEach(b => b.classList.remove('active')); btn.classList.add('active');
  document.getElementById('kaziFilter').value = '';
  renderRevWall(filter, '');
}
function filterByKazi(kaziId) {
  document.querySelectorAll('.rfbtn').forEach(b => b.classList.remove('active'));
  renderRevWall('all', kaziId);
}

function renderDynamicPhotos() {
  const photos = getAllFlat().filter(r => r.photo);
  const grid = document.getElementById('dynamicPhotoGrid');
  grid.innerHTML = photos.map(r => `
    <div class="photo-tile" onclick="openLightbox('${r.photo}')">
      <img src="${r.photo}" alt="${escH(r.name)}-এর ছবি">
      <div class="tile-ov">🔍</div>
    </div>`).join('');
}

function tryLightbox(tile) {
  const img = tile.querySelector('img'); if (img) openLightbox(img.src);
}

renderRevWall('all');
renderDynamicPhotos();
