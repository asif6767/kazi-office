injectSharedModals();
let jPhotoData = null;
let jCVName = null;
let jCVData = null; // base64 or filename for email

document.getElementById('jPhoto').addEventListener('change', function () {
  const file = this.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    jPhotoData = e.target.result;
    const p = document.getElementById('jPhotoPrev'); p.src = jPhotoData; p.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

// CV upload handler
document.getElementById('jCV').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  jCVName = file.name;
  const maxMB = 5;
  if (file.size > maxMB * 1024 * 1024) {
    toast('⚠ CV ফাইলের আকার সর্বোচ্চ ৫ MB হতে পারে।');
    this.value = '';
    jCVName = null;
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    jCVData = e.target.result;
    const prev = document.getElementById('jCVPrev');
    const icon = file.type === 'application/pdf' ? '📄' : '📝';
    const sizeKB = (file.size / 1024).toFixed(0);
    prev.innerHTML = `
      <div class="cv-preview-inner">
        <span class="cv-prev-ic">${icon}</span>
        <div class="cv-prev-info">
          <div class="cv-prev-name">${escH(file.name)}</div>
          <div class="cv-prev-size">${sizeKB} KB — আপলোড প্রস্তুত</div>
        </div>
        <button type="button" class="cv-remove-btn" onclick="removeCVUpload()">✕</button>
      </div>`;
    prev.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

function removeCVUpload() {
  jCVData = null; jCVName = null;
  document.getElementById('jCV').value = '';
  const prev = document.getElementById('jCVPrev');
  prev.innerHTML = '';
  prev.style.display = 'none';
}

// simple HTML escape (script.js has escH, but define fallback)
function escH(str) {
  return (str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// EmailJS initialization
(function () {
  emailjs.init({ publicKey: 'off2fO4OdEsS111Xk' });
})();

function submitJoinForm() {
  const name    = document.getElementById('jName').value.trim();
  const nameEn  = document.getElementById('jNameEn').value.trim();
  const phone   = document.getElementById('jPhone').value.trim();
  const email   = document.getElementById('jEmail').value.trim();
  const nid     = document.getElementById('jNID').value.trim();
  const dob     = document.getElementById('jDOB').value;
  const address = document.getElementById('jAddress').value.trim();
  const edu     = document.getElementById('jEdu').value.trim();
  const inst    = document.getElementById('jInst').value.trim();
  const license = document.getElementById('jLicense').value.trim();
  const exp     = document.getElementById('jExp').value;
  const area    = document.getElementById('jArea').value.trim();
  const bio     = document.getElementById('jBio').value.trim();
  const allChecked = ['chk1', 'chk2', 'chk3', 'chk4'].every(id => document.getElementById(id).checked);

  if (!name || !nameEn || !phone || !email || !nid || !dob || !address || !edu || !inst || !license || !exp || !area || bio.length < 50) {
    toast('⚠ সকল * চিহ্নিত ঘর এবং বায়ো (৫০+ অক্ষর) পূরণ করুন।'); return;
  }
  if (!email.includes('@')) { toast('⚠ সঠিক ইমেইল ঠিকানা দিন।'); return; }
  if (!allChecked) { toast('⚠ সকল ঘোষণাপত্রে টিক দিন।'); return; }

  const appData = {
    id: Date.now(), name, nameEn, phone, email, nid, dob, address,
    edu, institute: inst, license, experience: exp,
    nikahCount: document.getElementById('jNikah').value || '0',
    area, bio, specialty: document.getElementById('jSpec').value,
    photo: jPhotoData, cv: jCVName ? { name: jCVName, hasData: !!jCVData } : null,
    submittedAt: new Date().toISOString()
  };
  saveApp(appData);

  // Send application email via EmailJS to classr489@gmail.com
  const submittedDate = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
  const cvInfo = jCVName ? `✅ CV আপলোড করা হয়েছে: ${jCVName}` : '❌ CV আপলোড করা হয়নি';
  emailjs.send('service_m13lrbx', 'template_3lijeq6', {
    to_name: 'Admin',
    to_email: 'classr489@gmail.com',
    applicant_name: name,
    applicant_name_en: nameEn,
    applicant_phone: phone,
    applicant_email: email,
    applicant_nid: nid,
    applicant_dob: dob,
    applicant_address: address,
    applicant_edu: edu,
    applicant_institute: inst,
    applicant_license: license,
    applicant_area: area,
    applicant_experience: exp,
    cv_status: cvInfo,
    submitted_date: submittedDate
  }).then(() => {
    console.log('Application email sent successfully to classr489@gmail.com');
  }).catch(err => {
    console.warn('Email not sent:', err);
  });

  document.getElementById('submittedEmail').textContent = email;
  openModal('joinSuccessModal');

  // Reset
  ['jName', 'jNameEn', 'jPhone', 'jEmail', 'jNID', 'jAddress', 'jEdu', 'jInst', 'jLicense', 'jArea', 'jBio', 'jSpec', 'jNikah'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('jDOB').value = '';
  document.getElementById('jExp').selectedIndex = 0;
  ['chk1', 'chk2', 'chk3', 'chk4'].forEach(id => document.getElementById(id).checked = false);
  jPhotoData = null;
  document.getElementById('jPhotoPrev').style.display = 'none';
  document.getElementById('jPhoto').value = '';
  removeCVUpload();
}
