# ইউনুস কাজী অফিস — ওয়েবসাইট প্যাকেজ v3
## Younus Kazi Office — Complete Website

---

## 📁 ফাইল কাঠামো

```
kazi-office/
├── index.html          ← হোম পেজ (Hero, Services, Booking, Reviews, Gallery, FAQ, Contact)
├── kazis.html          ← আমাদের কাজীরা (প্রধান কাজী + সব কাজীর কার্ড)
├── kazi-profile.html   ← ব্যক্তিগত কাজী প্রোফাইল (?id=younus, hafiz-rahim, ...)
├── feedback.html       ← ফিডব্যাক সেন্টার (রিভিউ দিন, গ্যালারি, সব রিভিউ দেখুন)
├── join-kazi.html      ← কাজী হিসেবে যোগদান আবেদন (CV ফর্ম)
├── about.html          ← আমাদের সম্পর্কে (গল্প, মিশন, মাইলফলক, সনদ)
├── style.css           ← শেয়ার্ড CSS (গোল্ড/ক্রিম থিম)
├── script.js           ← শেয়ার্ড JavaScript (মডাল, রিভিউ, বুকিং)
├── data/
│   └── kazis.js        ← কাজী ডেটা + localStorage হেলপার
└── assets/             ← ছবির ফোল্ডার (আপনি যোগ করবেন)
    ├── kazi-younus.jpg
    ├── kazi-rahim.jpg
    ├── kazi-karim.jpg
    ├── kazi-noman.jpg
    └── wedding-1.jpg ... wedding-N.jpg
```

---

## 🚀 শুরু করুন

1. ZIP ফাইলটি আপনার ওয়েব সার্ভারে আপলোড করুন
2. `index.html` সরাসরি ব্রাউজারেও খোলা যাবে
3. ছবি যোগ করতে `assets/` ফোল্ডারে রাখুন (নির্দেশনা নিচে)

---

## 📸 ছবি যোগ করার পদ্ধতি

### কাজীদের ছবি:
HTML-এ placeholder div সরিয়ে img tag দিন:
```html
<!-- এটি সরান: -->
<div class="chief-photo-ph">...</div>

<!-- এটি দিন: -->
<img src="assets/kazi-younus.jpg" alt="ইউনুস কাজী" class="chief-photo">
```

### বিবাহের ছবি (gallery):
```html
<!-- এটি সরান: -->
<div class="photo-tile-ph">...</div>

<!-- এটি দিন: -->
<img src="assets/wedding-1.jpg" alt="বিবাহের ছবি">
```

---

## ✏️ কাস্টমাইজ করুন

| কী পরিবর্তন করবেন | কোথায় |
|---|---|
| ফোন নম্বর | সব ফাইলে `+880XXXXXXXXXX` খুঁজুন |
| ইমেইল | `info@younuskazi.com` পরিবর্তন করুন |
| ঠিকানা | `[আপনার পূর্ণ ঠিকানা]` পরিবর্তন করুন |
| কাজী লাইসেন্স নং | `data/kazis.js` → `license: 'BD-KZ-XXXXX'` |
| Google Maps | `index.html` → `.mapbox` এ iframe embed করুন |
| নতুন কাজী যোগ | `data/kazis.js` → `KAZIS` array-এ নতুন object যোগ করুন |

---

## 💬 ডেটা স্টোরেজ

- **রিভিউ/ফিডব্যাক**: Browser localStorage (`kazi_reviews_v2` key) — যে কেউ দিতে পারেন, ছবিসহ
- **কাজী আবেদন**: Browser localStorage (`kazi_applications_v2` key) — ইমেইল নিশ্চিতকরণ দেখায়
- **Seed data**: প্রথমবার লোড হলে ডিফল্ট রিভিউ স্বয়ংক্রিয়ভাবে যোগ হয়

---

## 🎨 থিম রঙ (CSS Variables — style.css)

| Variable | Color | ব্যবহার |
|---|---|---|
| `--gd` | #7A5A0A | গাঢ় সোনালি |
| `--gr` | #C9970A | মূল সোনালি |
| `--gl` | #E8C547 | হালকা সোনালি |
| `--cr` | #FDF8EE | ক্রিম পটভূমি |

© ২০২৫ ইউনুস কাজী অফিস
