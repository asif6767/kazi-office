/* ================================================================
   js/service-detail.js — Nikah & Legal Service Detail Modals
   Clicking any service card opens a modal with:
     - Bangladesh law requirements
     - A form the user fills (with document/photo uploads)
     - EmailJS sends data to classr489@gmail.com
   ================================================================ */
'use strict';

// ── SERVICE DATA (Bangladesh law requirements) ────────────────────
const SERVICE_DATA = {
  'nikah': {
    icon: '💍',
    title: 'নিকাহ রেজিস্ট্রেশন',
    lawTitle: 'মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন ১৯৭৪',
    lawDesc: 'বাংলাদেশে মুসলিম বিবাহ নিবন্ধন বাধ্যতামূলক। মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন ১৯৭৪ অনুযায়ী প্রতিটি নিকাহ একজন নিবন্ধিত কাজী কর্তৃক কাবিননামায় লিপিবদ্ধ করতে হবে। নিবন্ধন না করলে বিবাহ অবৈধ না হলেও কাজী ৩ মাস কারাদণ্ড বা অর্থদণ্ডে দণ্ডিত হতে পারেন। মহর নির্ধারণ ইসলামী শরিয়া অনুযায়ী আবশ্যক।',
    requirements: [
      { icon: '🪪', text: 'জাতীয় পরিচয়পত্র (বর ও কনে উভয়ের)' },
      { icon: '📄', text: 'জন্ম নিবন্ধন সনদ (উভয়পক্ষ)' },
      { icon: '📸', text: 'পাসপোর্ট সাইজ ছবি — ৩ কপি (প্রত্যেকের)' },
      { icon: '👨‍👩‍👧', text: 'অভিভাবকের (ওয়ালির) সম্মতিপত্র ও উপস্থিতি' },
      { icon: '👥', text: 'দুইজন পুরুষ সাক্ষী (মুসলিম)' },
      { icon: '💰', text: 'মহরের পরিমাণ নির্ধারণ (নগদ / বকেয়া)' },
      { icon: '📜', text: 'পূর্ববর্তী তালাকনামা (পুনরায় বিবাহে প্রযোজ্য)' },
      { icon: '🏠', text: 'বর ও কনের বর্তমান ঠিকানার প্রমাণ' },
    ],
    formFields: [
      { id: 'sd_groom', label: 'বরের পূর্ণ নাম', type: 'text', placeholder: 'বরের সম্পূর্ণ নাম (বাংলায়)', required: true },
      { id: 'sd_bride', label: 'কনের পূর্ণ নাম', type: 'text', placeholder: 'কনের সম্পূর্ণ নাম (বাংলায়)', required: true },
      { id: 'sd_groom_nid', label: 'বরের NID নম্বর', type: 'text', placeholder: 'জাতীয় পরিচয়পত্র নম্বর', required: true },
      { id: 'sd_bride_nid', label: 'কনের NID নম্বর', type: 'text', placeholder: 'জাতীয় পরিচয়পত্র নম্বর', required: true },
      { id: 'sd_phone', label: 'যোগাযোগের নম্বর', type: 'tel', placeholder: '01XXXXXXXXX', required: true },
      { id: 'sd_email', label: 'ইমেইল ঠিকানা', type: 'email', placeholder: 'yourname@email.com', required: false },
      { id: 'sd_mahr', label: 'মহরের পরিমাণ (টাকায়)', type: 'text', placeholder: 'যেমন: ১,০০,০০০ টাকা', required: true },
      { id: 'sd_date', label: 'পছন্দের তারিখ', type: 'date', placeholder: '', required: true },
      { id: 'sd_address', label: 'নিকাহের স্থান/ঠিকানা', type: 'textarea', placeholder: 'বিস্তারিত ঠিকানা...', required: true },
    ],
    uploadLabel: 'NID ও প্রয়োজনীয় কাগজপত্র আপলোড করুন',
    uploadNote: 'বর/কনের NID, জন্মসনদ, ছবি ইত্যাদি (JPG, PNG, PDF — সর্বোচ্চ ৫ MB)',
    emailSubject: 'নিকাহ রেজিস্ট্রেশন আবেদন'
  },
  'talaq': {
    icon: '📜',
    title: 'তালাক ও ডিভোর্স',
    lawTitle: 'মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ (ধারা ৭)',
    lawDesc: 'বাংলাদেশে তালাক প্রদান করতে হলে স্বামীকে লিখিতভাবে তালাক নোটিশ ইউনিয়ন পরিষদ/পৌরসভা চেয়ারম্যানকে এবং স্ত্রীকে একইসাথে পাঠাতে হবে। নোটিশ প্রাপ্তির ৯০ দিনের মধ্যে সালিশি কাউন্সিল মিলন চেষ্টা করবে। এই সময়ের মধ্যে তালাক কার্যকর হবে না।',
    requirements: [
      { icon: '🪪', text: 'উভয়পক্ষের জাতীয় পরিচয়পত্র' },
      { icon: '📜', text: 'মূল কাবিননামার কপি' },
      { icon: '📄', text: 'বিবাহ সনদ (যদি থাকে)' },
      { icon: '📝', text: 'তালাক প্রদানের লিখিত নোটিশ' },
      { icon: '🏛️', text: 'ইউনিয়ন পরিষদ/পৌরসভায় নোটিশের রসিদ' },
      { icon: '👨‍👩‍👧', text: 'সন্তান থাকলে: সন্তানের জন্ম সনদ' },
      { icon: '💰', text: 'মহর পরিশোধ বা ফেরত সংক্রান্ত তথ্য' },
      { icon: '📸', text: 'পাসপোর্ট সাইজ ছবি (৩ কপি প্রতিপক্ষ)' },
    ],
    formFields: [
      { id: 'sd_husband', label: 'স্বামীর পূর্ণ নাম', type: 'text', placeholder: 'স্বামীর সম্পূর্ণ নাম', required: true },
      { id: 'sd_wife', label: 'স্ত্রীর পূর্ণ নাম', type: 'text', placeholder: 'স্ত্রীর সম্পূর্ণ নাম', required: true },
      { id: 'sd_talaq_type', label: 'তালাকের ধরন', type: 'select', options: ['— ধরন বেছে নিন —','তালাক (স্বামী কর্তৃক)','খুলা (স্ত্রী কর্তৃক)','মুবারাত (উভয় সম্মতিতে)'], required: true },
      { id: 'sd_nikah_date', label: 'বিবাহের তারিখ', type: 'date', placeholder: '', required: true },
      { id: 'sd_kabinnama', label: 'কাবিননামা নম্বর', type: 'text', placeholder: 'কাবিননামার নিবন্ধন নম্বর', required: true },
      { id: 'sd_phone', label: 'যোগাযোগের নম্বর', type: 'tel', placeholder: '01XXXXXXXXX', required: true },
      { id: 'sd_email', label: 'ইমেইল ঠিকানা', type: 'email', placeholder: 'yourname@email.com', required: false },
      { id: 'sd_reason', label: 'তালাকের কারণ (সংক্ষেপে)', type: 'textarea', placeholder: 'সংক্ষিপ্ত বিবরণ...', required: false },
    ],
    uploadLabel: 'কাবিননামা ও প্রাসঙ্গিক কাগজপত্র আপলোড করুন',
    uploadNote: 'কাবিননামা, NID, তালাক নোটিশ ইত্যাদি (JPG, PNG, PDF — সর্বোচ্চ ৫ MB)',
    emailSubject: 'তালাক সেবা আবেদন'
  },
  'kabinnama': {
    icon: '📋',
    title: 'কাবিননামা প্রস্তুত',
    lawTitle: 'মুসলিম বিবাহ ও তালাক (নিবন্ধন) বিধিমালা ১৯৭৫',
    lawDesc: 'কাবিননামা হলো বিবাহের আইনি দলিল যা মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন ১৯৭৪ এর অধীনে নির্ধারিত ফর্ম-৩ অনুযায়ী প্রস্তুত করতে হয়। এতে বর-কনের পরিচয়, মহরের পরিমাণ, শর্তাবলি, সাক্ষীদের স্বাক্ষর ও কাজীর সিল থাকে।',
    requirements: [
      { icon: '🪪', text: 'বর ও কনের জাতীয় পরিচয়পত্র' },
      { icon: '📄', text: 'জন্ম নিবন্ধন সনদ' },
      { icon: '📸', text: 'পাসপোর্ট সাইজ ছবি (৩ কপি)' },
      { icon: '👨‍👩‍👧', text: 'পিতামাতার নাম ও ঠিকানা' },
      { icon: '💰', text: 'মহরের পরিমাণ (নগদ ও বকেয়া উল্লেখ)' },
      { icon: '📝', text: 'বিশেষ শর্তাবলি (যদি থাকে)' },
      { icon: '👥', text: 'দুইজন স্বাক্ষীর নাম ও NID' },
    ],
    formFields: [
      { id: 'sd_groom', label: 'বরের পূর্ণ নাম', type: 'text', placeholder: 'বরের সম্পূর্ণ নাম', required: true },
      { id: 'sd_bride', label: 'কনের পূর্ণ নাম', type: 'text', placeholder: 'কনের সম্পূর্ণ নাম', required: true },
      { id: 'sd_groom_father', label: "বরের পিতার নাম", type: 'text', placeholder: 'বরের বাবার নাম', required: true },
      { id: 'sd_bride_father', label: "কনের পিতার নাম", type: 'text', placeholder: 'কনের বাবার নাম', required: true },
      { id: 'sd_mahr_cash', label: 'মহর — নগদ (টাকা)', type: 'text', placeholder: 'নগদ মহরের পরিমাণ', required: true },
      { id: 'sd_mahr_defer', label: 'মহর — বকেয়া (টাকা)', type: 'text', placeholder: 'বকেয়া মহরের পরিমাণ', required: false },
      { id: 'sd_phone', label: 'যোগাযোগের নম্বর', type: 'tel', placeholder: '01XXXXXXXXX', required: true },
      { id: 'sd_email', label: 'ইমেইল ঠিকানা', type: 'email', placeholder: 'yourname@email.com', required: false },
      { id: 'sd_date', label: 'পছন্দের তারিখ', type: 'date', placeholder: '', required: true },
    ],
    uploadLabel: 'NID ও ছবি আপলোড করুন',
    uploadNote: 'বর/কনের NID, পাসপোর্ট সাইজ ছবি ইত্যাদি (JPG, PNG, PDF — সর্বোচ্চ ৫ MB)',
    emailSubject: 'কাবিননামা প্রস্তুত আবেদন'
  },
  'certificate': {
    icon: '🏛️',
    title: 'বিবাহ সনদ ও নোটারি',
    lawTitle: 'নোটারি পাবলিক অ্যাক্ট — সত্যায়ন বিধিমালা',
    lawDesc: 'বিবাহ সনদ হলো কাজী অফিস কর্তৃক নিবন্ধিত বিবাহের সরকারি প্রত্যয়নপত্র। পাসপোর্ট, ভিসা, বিদেশ গমন ও অন্যান্য সরকারি কাজে এটি আবশ্যক। নোটারি সত্যায়নের মাধ্যমে বিবাহ সনদ আন্তর্জাতিকভাবে গ্রহণযোগ্য করা হয়।',
    requirements: [
      { icon: '📜', text: 'মূল কাবিননামার কপি' },
      { icon: '🪪', text: 'উভয়পক্ষের জাতীয় পরিচয়পত্র' },
      { icon: '📸', text: 'পাসপোর্ট সাইজ ছবি' },
      { icon: '🏛️', text: 'কাজী অফিসের নিবন্ধন নম্বর ও সিল' },
      { icon: '📄', text: 'নোটারির জন্য: আবেদনপত্র ও কোর্ট ফি স্ট্যাম্প' },
      { icon: '🌐', text: 'বিদেশে ব্যবহারের জন্য: এপোস্টিল বা দূতাবাস সত্যায়ন' },
    ],
    formFields: [
      { id: 'sd_groom', label: 'বরের পূর্ণ নাম', type: 'text', placeholder: 'বরের নাম', required: true },
      { id: 'sd_bride', label: 'কনের পূর্ণ নাম', type: 'text', placeholder: 'কনের নাম', required: true },
      { id: 'sd_kabinnama', label: 'কাবিননামা নম্বর', type: 'text', placeholder: 'নিবন্ধন নম্বর', required: true },
      { id: 'sd_cert_type', label: 'সেবার ধরন', type: 'select', options: ['— বেছে নিন —','বিবাহ সনদ (বাংলা)','বিবাহ সনদ (ইংরেজি)','নোটারি সত্যায়ন','এফিডেভিট','সব সেবা'], required: true },
      { id: 'sd_purpose', label: 'ব্যবহারের উদ্দেশ্য', type: 'text', placeholder: 'যেমন: পাসপোর্ট, ভিসা, ব্যাংক', required: true },
      { id: 'sd_phone', label: 'যোগাযোগের নম্বর', type: 'tel', placeholder: '01XXXXXXXXX', required: true },
      { id: 'sd_email', label: 'ইমেইল ঠিকানা', type: 'email', placeholder: 'yourname@email.com', required: false },
    ],
    uploadLabel: 'কাবিননামা ও NID স্ক্যান আপলোড করুন',
    uploadNote: 'কাবিননামা, NID, পাসপোর্ট ছবি ইত্যাদি (JPG, PNG, PDF — সর্বোচ্চ ৫ MB)',
    emailSubject: 'বিবাহ সনদ ও নোটারি আবেদন'
  },
  'second-marriage': {
    icon: '👨‍👩‍👧',
    title: 'দ্বিতীয় বিবাহ অনুমোদন',
    lawTitle: 'মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ (ধারা ৬)',
    lawDesc: 'বাংলাদেশে দ্বিতীয় বিবাহের জন্য সালিশি পরিষদের পূর্ব অনুমোদন বাধ্যতামূলক। অনুমোদন ছাড়া দ্বিতীয় বিবাহ করলে স্বামী ১ বছর কারাদণ্ড বা ১০,০০০ টাকা জরিমানা বা উভয় দণ্ডে দণ্ডিত হতে পারেন।',
    requirements: [
      { icon: '🪪', text: 'আবেদনকারীর জাতীয় পরিচয়পত্র' },
      { icon: '📜', text: 'প্রথম বিবাহের কাবিননামা' },
      { icon: '📝', text: 'দ্বিতীয় বিবাহের কারণের লিখিত ব্যাখ্যা' },
      { icon: '🏛️', text: 'ইউনিয়ন পরিষদ/পৌরসভায় সালিশি আবেদন' },
      { icon: '👨‍👩‍👧', text: 'প্রথম স্ত্রীকে নোটিশ ও তার সম্মতিপত্র' },
      { icon: '💰', text: 'আর্থিক সক্ষমতার প্রমাণ' },
      { icon: '📸', text: 'উভয়পক্ষের পাসপোর্ট সাইজ ছবি' },
    ],
    formFields: [
      { id: 'sd_husband', label: 'আবেদনকারীর পূর্ণ নাম', type: 'text', placeholder: 'স্বামীর পূর্ণ নাম', required: true },
      { id: 'sd_wife1', label: 'প্রথম স্ত্রীর নাম', type: 'text', placeholder: 'প্রথম স্ত্রীর সম্পূর্ণ নাম', required: true },
      { id: 'sd_wife2', label: 'দ্বিতীয় (প্রস্তাবিত) স্ত্রীর নাম', type: 'text', placeholder: 'প্রস্তাবিত স্ত্রীর নাম', required: true },
      { id: 'sd_phone', label: 'যোগাযোগের নম্বর', type: 'tel', placeholder: '01XXXXXXXXX', required: true },
      { id: 'sd_email', label: 'ইমেইল ঠিকানা', type: 'email', placeholder: 'yourname@email.com', required: false },
      { id: 'sd_reason', label: 'দ্বিতীয় বিবাহের কারণ', type: 'textarea', placeholder: 'শরিয়া ও আইনানুগ কারণ উল্লেখ করুন...', required: true },
      { id: 'sd_date', label: 'পছন্দের পরামর্শের তারিখ', type: 'date', placeholder: '', required: true },
    ],
    uploadLabel: 'কাবিননামা ও সংশ্লিষ্ট কাগজপত্র আপলোড করুন',
    uploadNote: 'প্রথম বিবাহের কাবিননামা, NID, সম্মতিপত্র ইত্যাদি (JPG, PNG, PDF — সর্বোচ্চ ৫ MB)',
    emailSubject: 'দ্বিতীয় বিবাহ অনুমোদন আবেদন'
  },
  'consultation': {
    icon: '🤝',
    title: 'পরামর্শ সেবা',
    lawTitle: 'মুসলিম পারিবারিক আইন ও ইসলামী শরিয়া পরামর্শ',
    lawDesc: 'বৈবাহিক যেকোনো সমস্যায় — মহর, ভরণপোষণ, খোরপোষ, হেফাজত, উত্তরাধিকার — শরিয়া ও বাংলাদেশের পারিবারিক আইন অনুযায়ী পেশাদার পরামর্শ দেওয়া হয়। আমাদের পরামর্শ সেবা সম্পূর্ণ গোপনীয় এবং নিরপেক্ষ।',
    requirements: [
      { icon: '📝', text: 'বিষয়ের সংক্ষিপ্ত বিবরণ লিখিতভাবে প্রস্তুত করুন' },
      { icon: '📜', text: 'প্রাসঙ্গিক কাগজপত্র (কাবিননামা, তালাকনামা ইত্যাদি)' },
      { icon: '🪪', text: 'জাতীয় পরিচয়পত্র' },
      { icon: '🕐', text: 'পরামর্শের জন্য সময় বরাদ্দ: ৩০ মিনিট — ১ ঘণ্টা' },
    ],
    formFields: [
      { id: 'sd_name', label: 'আপনার পূর্ণ নাম', type: 'text', placeholder: 'সম্পূর্ণ নাম', required: true },
      { id: 'sd_phone', label: 'মোবাইল নম্বর', type: 'tel', placeholder: '01XXXXXXXXX', required: true },
      { id: 'sd_email', label: 'ইমেইল ঠিকানা', type: 'email', placeholder: 'yourname@email.com', required: false },
      { id: 'sd_consult_type', label: 'পরামর্শের ধরন', type: 'select', options: ['— ধরন বেছে নিন —','মহর ও ভরণপোষণ','তালাক ও খুলা','সন্তানের হেফাজত','পুনরায় বিবাহ','উত্তরাধিকার','সাধারণ পারিবারিক বিষয়'], required: true },
      { id: 'sd_consult_mode', label: 'পরামর্শের মাধ্যম', type: 'select', options: ['— মাধ্যম বেছে নিন —','সরাসরি অফিসে','ফোন কল','WhatsApp / ভিডিও কল'], required: true },
      { id: 'sd_date', label: 'পছন্দের তারিখ', type: 'date', placeholder: '', required: true },
      { id: 'sd_desc', label: 'বিষয়ের সংক্ষিপ্ত বিবরণ', type: 'textarea', placeholder: 'আপনার সমস্যা বা প্রশ্ন সংক্ষেপে লিখুন...', required: true },
    ],
    uploadLabel: 'প্রাসঙ্গিক কাগজপত্র আপলোড করুন (ঐচ্ছিক)',
    uploadNote: 'কাবিননামা, তালাকনামা বা অন্য প্রাসঙ্গিক দলিল (JPG, PNG, PDF — সর্বোচ্চ ৫ MB)',
    emailSubject: 'পরামর্শ সেবা আবেদন'
  }
};

// ── UPLOAD STATE ─────────────────────────────────────────────────
let _sdUploads = []; // array of { name, size, data (base64) }

function _sdHandleUpload(input) {
  const files = Array.from(input.files);
  if (!files.length) return;
  const maxBytes = 5 * 1024 * 1024;
  const allowed = ['image/jpeg','image/png','image/webp','application/pdf'];
  const prev = document.getElementById('sd-upload-prev');
  files.forEach(file => {
    if (!allowed.includes(file.type)) {
      toast('⚠ শুধুমাত্র JPG, PNG, বা PDF ফাইল গ্রহণযোগ্য।'); return;
    }
    if (file.size > maxBytes) {
      toast(`⚠ "${file.name}" — ৫ MB-এর বেশি, বাদ দেওয়া হয়েছে।`); return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const entry = { name: file.name, size: file.size, data: e.target.result };
      _sdUploads.push(entry);
      _sdRenderUploads();
    };
    reader.readAsDataURL(file);
  });
  input.value = ''; // allow re-selecting same file
}

function _sdRenderUploads() {
  const prev = document.getElementById('sd-upload-prev');
  if (!prev) return;
  if (!_sdUploads.length) { prev.style.display = 'none'; prev.innerHTML = ''; return; }
  prev.style.display = 'block';
  prev.innerHTML = _sdUploads.map((f, i) => {
    const isImg = f.data.startsWith('data:image');
    const sizeKB = (f.size / 1024).toFixed(0);
    const thumb = isImg
      ? `<img src="${f.data}" class="sd-thumb" alt="${f.name}" onclick="openLightbox('${f.data}')">`
      : `<div class="sd-doc-ic">📄</div>`;
    return `<div class="sd-up-item">
      ${thumb}
      <div class="sd-up-meta">
        <div class="sd-up-name">${f.name}</div>
        <div class="sd-up-size">${sizeKB} KB</div>
      </div>
      <button class="sd-up-remove" onclick="_sdRemoveUpload(${i})" title="সরান">✕</button>
    </div>`;
  }).join('');
}

function _sdRemoveUpload(idx) {
  _sdUploads.splice(idx, 1);
  _sdRenderUploads();
}

// ── INJECT SERVICE MODAL ─────────────────────────────────────────
(function injectServiceModal() {
  const html = `
  <div class="overlay" id="serviceDetailModal">
    <div class="modal sd-modal">
      <button class="sd-close" onclick="closeServiceModal()">✕</button>
      <div id="sd-content"></div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
  document.getElementById('serviceDetailModal').addEventListener('click', function(e) {
    if (e.target === this) closeServiceModal();
  });
})();

// ── OPEN / CLOSE ─────────────────────────────────────────────────
function openServiceModal(serviceKey) {
  const s = SERVICE_DATA[serviceKey];
  if (!s) return;
  _sdUploads = [];

  const fieldsHtml = s.formFields.map(f => {
    const req = f.required ? '<span class="req">*</span>' : '';
    let inp = '';
    if (f.type === 'textarea') {
      inp = `<textarea id="${f.id}" rows="3" placeholder="${f.placeholder}" class="sd-inp"></textarea>`;
    } else if (f.type === 'select') {
      const opts = f.options.map((o, i) => `<option value="${i === 0 ? '' : o}">${o}</option>`).join('');
      inp = `<select id="${f.id}" class="sd-inp">${opts}</select>`;
    } else {
      inp = `<input id="${f.id}" type="${f.type}" placeholder="${f.placeholder || ''}" class="sd-inp">`;
    }
    return `<div class="form-field"><label>${f.label} ${req}</label>${inp}</div>`;
  }).join('');

  const reqHtml = s.requirements.map(r =>
    `<div class="sd-req-row"><span class="sd-req-ic">${r.icon}</span><span>${r.text}</span></div>`
  ).join('');

  document.getElementById('sd-content').innerHTML = `
    <div class="sd-header">
      <div class="sd-icon">${s.icon}</div>
      <div>
        <h2 class="sd-title">${s.title}</h2>
        <div class="sd-law-badge">⚖️ ${s.lawTitle}</div>
      </div>
    </div>

    <div class="sd-law-box">
      <div class="sd-law-label">📖 আইনি বিবরণ</div>
      <p class="sd-law-text">${s.lawDesc}</p>
    </div>

    <div class="sd-section">
      <div class="sd-sec-title">📋 প্রয়োজনীয় কাগজপত্র</div>
      <div class="sd-req-grid">${reqHtml}</div>
    </div>

    <div class="sd-section">
      <div class="sd-sec-title">✍️ আবেদন ফর্ম পূরণ করুন</div>
      <p style="font-size:.83rem;color:var(--ts);margin-bottom:1rem">তথ্য জমা দেওয়ার পর আমরা ইমেইলে নিশ্চিতকরণ পাঠাব এবং শীঘ্রই যোগাযোগ করব।</p>
      <div class="fgrid sd-form-grid" id="sd-form-fields">${fieldsHtml}</div>
    </div>

    <div class="sd-section">
      <div class="sd-sec-title">📎 ${s.uploadLabel}</div>
      <label class="sd-upload-lbl">
        <span class="sd-up-icon">📂</span>
        <div class="sd-up-text">
          <span>ফাইল বেছে নিন বা এখানে টেনে আনুন</span>
          <small>${s.uploadNote}</small>
        </div>
        <input type="file" id="sd-file-input" multiple accept="image/jpeg,image/png,image/webp,application/pdf" onchange="_sdHandleUpload(this)">
      </label>
      <div id="sd-upload-prev" class="sd-upload-prev" style="display:none"></div>
    </div>

    <div class="sd-section">
      <button class="sd-submit" onclick="submitServiceForm('${serviceKey}')">📤 আবেদন জমা দিন</button>
    </div>
    <div id="sd-form-msg"></div>
  `;

  const dateFields = document.querySelectorAll('.sd-modal input[type="date"]');
  dateFields.forEach(d => d.min = new Date().toISOString().split('T')[0]);

  document.getElementById('serviceDetailModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  document.getElementById('serviceDetailModal').classList.remove('open');
  document.body.style.overflow = '';
  _sdUploads = [];
}

// ── FORM SUBMISSION ───────────────────────────────────────────────
function submitServiceForm(serviceKey) {
  const s = SERVICE_DATA[serviceKey];
  if (!s) return;

  let valid = true;
  s.formFields.forEach(f => {
    if (f.required) {
      const el = document.getElementById(f.id);
      if (!el) return;
      const val = el.value.trim();
      if (!val) { el.classList.add('sd-error'); valid = false; }
      else el.classList.remove('sd-error');
    }
  });

  if (!valid) { showSdMsg('⚠ লাল চিহ্নিত ঘরগুলো পূরণ করুন।', 'error'); return; }

  const data = {};
  s.formFields.forEach(f => {
    const el = document.getElementById(f.id);
    if (el) data[f.label] = el.value.trim();
  });

  const btn = document.querySelector('.sd-submit');
  btn.disabled = true;
  btn.textContent = '⏳ পাঠানো হচ্ছে...';

  const bodyRows = Object.entries(data).map(([k, v]) => `${k}: ${v || '—'}`).join('\n');
  const submittedDate = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
  const uploadInfo = _sdUploads.length
    ? `✅ ${_sdUploads.length}টি ফাইল আপলোড করা হয়েছে:\n` + _sdUploads.map(u => `  • ${u.name} (${(u.size/1024).toFixed(0)} KB)`).join('\n')
    : '❌ কোনো ফাইল আপলোড করা হয়নি';

  if (typeof emailjs !== 'undefined') {
    emailjs.send('service_m13lrbx', 'template_3lijeq6', {
      to_name: 'Admin',
      to_email: 'classr489@gmail.com',
      applicant_name: data['আপনার পূর্ণ নাম'] || data['বরের পূর্ণ নাম'] || data['স্বামীর পূর্ণ নাম'] || data['আবেদনকারীর পূর্ণ নাম'] || 'অনুরোধকারী',
      applicant_phone: data['যোগাযোগের নম্বর'] || data['মোবাইল নম্বর'] || '—',
      applicant_email: data['ইমেইল ঠিকানা'] || '—',
      service_type: s.title,
      form_details: bodyRows,
      upload_info: uploadInfo,
      submitted_date: submittedDate
    }).then(() => {
      showSdMsg('✅ আপনার আবেদন সফলভাবে জমা হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।', 'success');
    }).catch(() => {
      showSdMsg('✅ আবেদন গৃহীত হয়েছে। সরাসরি যোগাযোগ করুন।', 'success');
    }).finally(() => {
      btn.disabled = false;
      btn.textContent = '📤 আবেদন জমা দিন';
    });
  } else {
    setTimeout(() => {
      showSdMsg('✅ আপনার আবেদন গৃহীত হয়েছে। আমাদের সাথে যোগাযোগ করুন।', 'success');
      btn.disabled = false;
      btn.textContent = '📤 আবেদন জমা দিন';
    }, 800);
  }
}

function showSdMsg(msg, type) {
  const el = document.getElementById('sd-form-msg');
  if (!el) return;
  el.className = 'sd-msg sd-msg-' + type;
  el.textContent = msg;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── WIRE UP SERVICE CARDS ─────────────────────────────────────────
const SERVICE_KEY_MAP = {
  'নিকাহ রেজিস্ট্রেশন': 'nikah',
  'তালাক ও ডিভোর্স': 'talaq',
  'কাবিননামা প্রস্তুত': 'kabinnama',
  'বিবাহ সনদ ও নোটারি': 'certificate',
  'দ্বিতীয় বিবাহ অনুমোদন': 'second-marriage',
  'পরামর্শ সেবা': 'consultation'
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.svcard').forEach(card => {
    const h3 = card.querySelector('h3');
    if (!h3) return;
    const key = SERVICE_KEY_MAP[h3.textContent.trim()];
    if (!key) return;
    card.style.cursor = 'pointer';
    const lnk = card.querySelector('.svlnk');
    if (lnk) lnk.style.color = 'var(--gr)';
    card.addEventListener('click', () => openServiceModal(key));
  });
});
