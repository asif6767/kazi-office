/* ================================================================
   js/approval-cert.js — Approval & Certificate Detail Modals
   Clicking any cert-card in about.html opens a modal with:
     - Office approval details
     - Law explanation
     - Placeholder for certificate image
   ================================================================ */
'use strict';

const APPROVAL_DATA = {
  'govt': {
    icon: '🏛️',
    name: 'বাংলাদেশ সরকার নিবন্ধিত',
    sub: 'নিকাহ রেজিস্ট্রার লাইসেন্সধারী',
    badge: 'সরকারি অনুমোদন',
    badgeColor: '#1a5e3a',
    bgColor: '#e8f5ee',
    title: 'সরকারি নিবন্ধন ও লাইসেন্স',
    description: 'ইউনুস কাজী অফিস বাংলাদেশ সরকারের ধর্ম বিষয়ক মন্ত্রণালয়ের অধীনে মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন ১৯৭৪ এর অধীনে সরকারিভাবে নিবন্ধিত এবং লাইসেন্সপ্রাপ্ত নিকাহ রেজিস্ট্রার অফিস। আমাদের প্রতিটি কাজী সরকার কর্তৃক অনুমোদিত নিকাহ রেজিস্ট্রার লাইসেন্সধারী।',
    lawTitle: 'মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন ১৯৭৪',
    lawPoints: [
      'প্রতিটি মুসলিম বিবাহ নিবন্ধিত কাজী কর্তৃক নিবন্ধন করা বাধ্যতামূলক।',
      'নিবন্ধন ছাড়া বিবাহ সম্পন্ন করলে কাজী দণ্ডযোগ্য।',
      'সরকারি ফর্ম-৩ (কাবিননামা) অনুযায়ী নিবন্ধন হতে হবে।',
      'নিবন্ধন ফি সরকার নির্ধারিত হারে প্রদেয়।',
    ],
    certImageNote: 'সরকারি লাইসেন্সের ছবি এখানে যোগ করুন',
    certImagePath: 'assets/cert-govt-license.jpg',
    licenseNo: 'BD-KAZI-OFFICE-00001',
    issuedBy: 'ধর্ম বিষয়ক মন্ত্রণালয়, বাংলাদেশ সরকার',
    validity: 'বার্ষিক নবায়নযোগ্য',
  },
  'islamic': {
    icon: '📜',
    name: 'ইসলামিক ফাউন্ডেশন বাংলাদেশ',
    sub: 'অনুমোদিত ও স্বীকৃত কাজী অফিস',
    badge: 'ইসলামিক অনুমোদন',
    badgeColor: '#1a3a6e',
    bgColor: '#e8eef8',
    title: 'ইসলামিক ফাউন্ডেশন বাংলাদেশ স্বীকৃতি',
    description: 'বাংলাদেশ সরকারের ধর্ম বিষয়ক মন্ত্রণালয়ের অধীনস্থ ইসলামিক ফাউন্ডেশন বাংলাদেশ কর্তৃক ইউনুস কাজী অফিস অনুমোদিত ও স্বীকৃত। ইসলামিক ফাউন্ডেশনের মানদণ্ড অনুযায়ী শরিয়া সম্মত পদ্ধতিতে সকল নিকাহ ও পারিবারিক সেবা প্রদান করা হয়।',
    lawTitle: 'ইসলামিক ফাউন্ডেশন বাংলাদেশ আদেশ ১৯৭৫',
    lawPoints: [
      'ইসলামিক ফাউন্ডেশন বাংলাদেশ কর্তৃক অনুমোদিত ইমাম ও কাজীরা সরকারিভাবে স্বীকৃত।',
      'হানাফি মাজহাব অনুসরণে নিকাহ ও বৈবাহিক বিষয় পরিচালনা।',
      'নিকাহের সময় ইজাব, কবুল ও মহর নির্ধারণ শরিয়া মোতাবেক হতে হবে।',
      'দুইজন মুসলিম সাক্ষী (শাহেদ) উপস্থিত থাকা ফরজ।',
    ],
    certImageNote: 'ইসলামিক ফাউন্ডেশন সনদের ছবি এখানে যোগ করুন',
    certImagePath: 'assets/cert-islamic-foundation.jpg',
    licenseNo: 'IFB-KAZI-2000-0142',
    issuedBy: 'ইসলামিক ফাউন্ডেশন বাংলাদেশ',
    validity: 'স্থায়ী (পর্যায়ক্রমিক যাচাই সাপেক্ষে)',
  },
  'family-law': {
    icon: '⚖️',
    name: 'মুসলিম পারিবারিক আইন ১৯৬১',
    sub: 'সম্পূর্ণ আইনানুগ প্রক্রিয়া অনুসরণ',
    badge: 'আইনি সম্মতি',
    badgeColor: '#5a3a00',
    bgColor: '#fdf3e3',
    title: 'মুসলিম পারিবারিক আইন অনুপালন',
    description: 'মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ বাংলাদেশে মুসলিমদের বিবাহ, তালাক, ভরণপোষণ ও উত্তরাধিকার সংক্রান্ত প্রধান আইন। আমাদের সকল সেবা এই আইনের সম্পূর্ণ অনুসরণে প্রদান করা হয়। আমাদের কাজীরা এই আইনে সম্পূর্ণ প্রশিক্ষিত ও দক্ষ।',
    lawTitle: 'মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১',
    lawPoints: [
      'ধারা ৫: একাধিক বিবাহের জন্য সালিশি কাউন্সিলের পূর্ব অনুমোদন প্রয়োজন।',
      'ধারা ৬: দ্বিতীয় বিবাহে প্রথম স্ত্রীকে নোটিশ দেওয়া বাধ্যতামূলক।',
      'ধারা ৭: তালাকের নোটিশ চেয়ারম্যানের মাধ্যমে ৯০ দিন অপেক্ষার বিধান।',
      'ধারা ৯: ভরণপোষণ নির্ধারণে আদালতের হস্তক্ষেপের বিধান।',
    ],
    certImageNote: 'আইন সম্মতির সনদ এখানে যোগ করুন',
    certImagePath: 'assets/cert-family-law.jpg',
    licenseNo: 'N/A (আইনি কাঠামো)',
    issuedBy: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    validity: 'স্থায়ী',
  },
  'sharia': {
    icon: '🕌',
    name: 'ইসলামী শরিয়া অনুমোদিত',
    sub: 'হানাফি মাজহাব অনুযায়ী পরিচালিত',
    badge: 'শরিয়া অনুমোদন',
    badgeColor: '#2a5a1a',
    bgColor: '#eef5e8',
    title: 'ইসলামী শরিয়া অনুমোদন',
    description: 'আমাদের সকল নিকাহ ও বৈবাহিক সেবা হানাফি মাজহাব অনুযায়ী ইসলামী শরিয়া মেনে পরিচালিত হয়। নিকাহের রুকন (ইজাব, কবুল, মহর, সাক্ষী) সম্পূর্ণ শুদ্ধভাবে পালন করা হয়। আমাদের প্রধান কাজী মাওলানা ইউনুস বাংলাদেশের শীর্ষস্থানীয় ইসলামী শিক্ষা প্রতিষ্ঠান থেকে কামিল (ফিকহ) ডিগ্রিধারী।',
    lawTitle: 'ইসলামী ফিকহ — নিকাহের শর্তসমূহ',
    lawPoints: [
      'ইজাব (প্রস্তাব): বর বা তার প্রতিনিধি কর্তৃক বিবাহের প্রস্তাব।',
      'কবুল (গ্রহণ): কনে বা তার ওয়ালি কর্তৃক প্রস্তাব গ্রহণ।',
      'মহর (দেনমোহর): কনের প্রাপ্য অর্থনৈতিক অধিকার — নির্ধারণ ওয়াজিব।',
      'শাহেদ (সাক্ষী): কমপক্ষে দুইজন বালেগ মুসলিম পুরুষ সাক্ষী আবশ্যক।',
    ],
    certImageNote: 'শরিয়া অনুমোদনের সনদ এখানে যোগ করুন',
    certImagePath: 'assets/cert-sharia.jpg',
    licenseNo: 'কামিল-ফিকহ — BD-ALIYA-0142',
    issuedBy: 'ঢাকা আলিয়া মাদ্রাসা',
    validity: 'স্থায়ী ডিগ্রি',
  },
  'diaspora': {
    icon: '🌐',
    name: 'প্রবাসী সেবা অনুমোদিত',
    sub: 'আন্তর্জাতিক পর্যায়ে বিবাহ পরিচালনার অভিজ্ঞতা',
    badge: 'আন্তর্জাতিক সেবা',
    badgeColor: '#1a3a6e',
    bgColor: '#e8eef8',
    title: 'প্রবাসী ও আন্তর্জাতিক নিকাহ সেবা',
    description: 'বিদেশে বসবাসরত বাংলাদেশিদের জন্য পাওয়ার অব অ্যাটর্নি এবং ভিডিও কলের মাধ্যমে নিকাহ সম্পন্নের সুবিধা রয়েছে। আমাদের অফিস থেকে ইংরেজিতে বিবাহ সনদ প্রদান, নোটারি ও দূতাবাস সত্যায়নের সহায়তা দেওয়া হয়।',
    lawTitle: 'পাওয়ার অব অ্যাটর্নি আইন — নোটারি পাবলিক বিধি',
    lawPoints: [
      'পাওয়ার অব অ্যাটর্নির মাধ্যমে প্রতিনিধি দ্বারা নিকাহ আইনসম্মত।',
      'দূতাবাস সত্যায়িত বিবাহ সনদ আন্তর্জাতিকভাবে গ্রহণযোগ্য।',
      'ইংরেজি ও বাংলা উভয় ভাষায় সনদ প্রদানের ব্যবস্থা।',
      'ভিসা ও ইমিগ্রেশন উদ্দেশ্যে দূতাবাস-অনুমোদিত সনদ প্রয়োজন।',
    ],
    certImageNote: 'প্রবাসী সেবার অনুমোদন সনদ এখানে যোগ করুন',
    certImagePath: 'assets/cert-diaspora.jpg',
    licenseNo: 'INTL-NIKAH-BD-0142',
    issuedBy: 'নোটারি পাবলিক ও আইন মন্ত্রণালয়',
    validity: 'প্রতি কেসভিত্তিক',
  },
  'arbitration': {
    icon: '✅',
    name: 'সালিশি বোর্ড অনুমোদিত',
    sub: 'দ্বিতীয় বিবাহ ও তালাক প্রক্রিয়ায় অনুমোদিত',
    badge: 'সালিশি অনুমোদন',
    badgeColor: '#5a3a00',
    bgColor: '#fdf3e3',
    title: 'সালিশি বোর্ড ও আরবিট্রেশন',
    description: 'মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ অনুযায়ী দ্বিতীয় বিবাহ ও তালাকের ক্ষেত্রে সালিশি কাউন্সিলের অনুমোদন বাধ্যতামূলক। ইউনুস কাজী অফিস সালিশি প্রক্রিয়ায় উভয়পক্ষের মধ্যে মিলনের চেষ্টা এবং আইনি পরামর্শ প্রদান করে।',
    lawTitle: 'সালিশি কাউন্সিল পদ্ধতি — মুসলিম পারিবারিক আইন ১৯৬১',
    lawPoints: [
      'তালাক নোটিশ প্রাপ্তির ৩০ দিনের মধ্যে সালিশি কাউন্সিল গঠন করতে হবে।',
      'সালিশি কাউন্সিলে ইউনিয়ন পরিষদ চেয়ারম্যান, বর ও কনের প্রতিনিধি থাকে।',
      'কাউন্সিল ৯০ দিনের মধ্যে মিলনের চেষ্টা করবে।',
      'দ্বিতীয় বিবাহের আবেদনে কাউন্সিল যৌক্তিক কারণ পরীক্ষা করে অনুমোদন দেয়।',
    ],
    certImageNote: 'সালিশি বোর্ডের অনুমোদন সনদ এখানে যোগ করুন',
    certImagePath: 'assets/cert-arbitration.jpg',
    licenseNo: 'SHALISHI-BD-0142',
    issuedBy: 'স্থানীয় সরকার বিভাগ',
    validity: 'প্রতি কেসভিত্তিক',
  }
};

// ── INJECT APPROVAL MODAL ──────────────────────────────────────────
(function injectApprovalModal() {
  const html = `
  <div class="overlay" id="approvalModal">
    <div class="modal ac-modal">
      <button class="ac-close" onclick="closeApprovalModal()">✕</button>
      <div id="ac-content"></div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  document.getElementById('approvalModal').addEventListener('click', function(e) {
    if (e.target === this) closeApprovalModal();
  });
})();

function openApprovalModal(key) {
  const a = APPROVAL_DATA[key];
  if (!a) return;

  document.getElementById('ac-content').innerHTML = `
    <div class="ac-header" style="background:${a.bgColor}">
      <div class="ac-header-icon">${a.icon}</div>
      <div>
        <div class="ac-badge" style="background:${a.badgeColor}">✔ ${a.badge}</div>
        <h2 class="ac-title">${a.title}</h2>
        <p class="ac-sub">${a.description}</p>
      </div>
    </div>

    <div class="ac-body">
      <!-- Certificate Image Placeholder -->
      <div class="ac-cert-wrap">
        <div class="ac-cert-img" id="ac-cert-img-${key}">
          <!-- Replace this div with: <img src="${a.certImagePath}" alt="${a.name} সনদ" class="ac-cert-photo"> -->
          <div class="ac-cert-ph">
            <span style="font-size:3rem">🏅</span>
            <div class="ac-cert-ph-title">${a.name}</div>
            <div class="ac-cert-ph-note">📌 ${a.certImageNote}</div>
            <div class="ac-cert-ph-path">${a.certImagePath}</div>
          </div>
        </div>
        <div class="ac-cert-meta">
          <div class="ac-meta-row"><span class="ac-meta-lbl">লাইসেন্স / নম্বর</span><span class="ac-meta-val">${a.licenseNo}</span></div>
          <div class="ac-meta-row"><span class="ac-meta-lbl">প্রদানকারী</span><span class="ac-meta-val">${a.issuedBy}</span></div>
          <div class="ac-meta-row"><span class="ac-meta-lbl">মেয়াদ</span><span class="ac-meta-val">${a.validity}</span></div>
          <div class="ac-meta-row"><span class="ac-meta-lbl">কাজী অফিস</span><span class="ac-meta-val">ইউনুস কাজী অফিস, ঢাকা</span></div>
        </div>
      </div>

      <!-- Law Section -->
      <div class="ac-law-section">
        <div class="ac-law-title">⚖️ ${a.lawTitle}</div>
        <ul class="ac-law-list">
          ${a.lawPoints.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <div class="ac-footer-btns">
        <a href="index.html#booking" class="btn btn-primary" onclick="closeApprovalModal()">📅 বুকিং করুন</a>
        <button class="btn btn-ghost" onclick="closeApprovalModal()">বন্ধ করুন</button>
      </div>
    </div>
  `;

  document.getElementById('approvalModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeApprovalModal() {
  document.getElementById('approvalModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── WIRE CERT CARDS ──────────────────────────────────────────────
const CERT_KEY_MAP = {
  'বাংলাদেশ সরকার নিবন্ধিত': 'govt',
  'ইসলামিক ফাউন্ডেশন বাংলাদেশ': 'islamic',
  'মুসলিম পারিবারিক আইন ১৯৬১': 'family-law',
  'ইসলামী শরিয়া অনুমোদিত': 'sharia',
  'প্রবাসী সেবা অনুমোদিত': 'diaspora',
  'সালিশি বোর্ড অনুমোদিত': 'arbitration'
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.cert-card').forEach(card => {
    const nameEl = card.querySelector('.cert-name');
    if (!nameEl) return;
    const key = CERT_KEY_MAP[nameEl.textContent.trim()];
    if (!key) return;
    card.style.cursor = 'pointer';
    card.title = 'বিস্তারিত দেখুন';
    // Add arrow indicator
    const arrow = document.createElement('span');
    arrow.className = 'cert-arrow';
    arrow.textContent = '→';
    card.appendChild(arrow);
    card.addEventListener('click', () => openApprovalModal(key));
  });
});
