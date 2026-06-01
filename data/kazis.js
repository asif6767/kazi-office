/* ================================================================
   data/kazis.js — Shared Kazi data + localStorage helpers
   ================================================================ */
'use strict';

const KAZIS = [
  {
    id:'younus', isChief:true,
    role:'প্রধান কাজী ও প্রতিষ্ঠাতা',
    name:'মাওলানা ইউনুস কাজী',
    photo:'assets/kazi-younus.jpg',
    rating:5.0, totalNikah:5200, experience:25,
    license:'BD-KZ-00142',
    area:'ঢাকা, নারায়ণগঞ্জ, গাজীপুর',
    education:'কামিল (ফিকহ) — ঢাকা আলিয়া মাদ্রাসা',
    phone:'+880XXXXXXXXXX', email:'younus@younuskazi.com',
    bio:'মাওলানা ইউনুস কাজী বাংলাদেশ সরকার কর্তৃক নিবন্ধিত একজন অভিজ্ঞ ও বিশ্বস্ত নিকাহ রেজিস্ট্রার। দীর্ঘ ২৫ বছরেরও বেশি সময় ধরে ইসলামী শরিয়া ও দেশের প্রচলিত আইন অনুযায়ী নিকাহ, তালাক এবং পারিবারিক বিষয়াদিতে নির্ভরযোগ্য সেবা প্রদান করে আসছেন। ঢাকা ও আশেপাশের ১৫টি জেলায় তাঁর সেবার পরিধি বিস্তৃত।',
    specialties:['নিকাহ রেজিস্ট্রেশন','তালাক প্রক্রিয়া','কাবিননামা','প্রবাসী নিকাহ','মধ্যস্থতা'],
    status:'available',
    level:'গ্র্যান্ড মাস্টার কাজী',
    levelBadge:'🏆',
    achievements:['৫০০০+ নিকাহ সম্পন্ন','২৫ বছরের অভিজ্ঞতা','সরকার পুরস্কৃত','প্রধান নিকাহ রেজিস্ট্রার'],
    availability:[
      {day:'শনিবার',time:'সকাল ৯টা — সন্ধ্যা ৭টা'},
      {day:'রবিবার',time:'সকাল ৯টা — সন্ধ্যা ৭টা'},
      {day:'সোমবার',time:'সকাল ৯টা — সন্ধ্যা ৭টা'},
      {day:'মঙ্গলবার',time:'সকাল ৯টা — সন্ধ্যা ৭টা'},
      {day:'বুধবার',time:'সকাল ৯টা — সন্ধ্যা ৭টা'},
      {day:'বৃহস্পতিবার',time:'সকাল ৯টা — সন্ধ্যা ৭টা'},
      {day:'শুক্রবার',time:'বিকাল ৩টা — সন্ধ্যা ৭টা'},
    ]
  },
  {
    id:'hafiz-rahim', isChief:false,
    role:'সিনিয়র কাজী',
    name:'হাফেজ আব্দুর রহিম',
    photo:'assets/kazi-rahim.jpg',
    rating:4.8, totalNikah:2100, experience:14,
    license:'BD-KZ-00287',
    area:'ঢাকা, মুন্সিগঞ্জ',
    education:'ফাজিল (শরিয়া) — জামিয়া ইসলামিয়া',
    phone:'+880XXXXXXXXXX', email:'rahim@younuskazi.com',
    bio:'হাফেজ আব্দুর রহিম একজন দক্ষ ও পেশাদার কাজী। ১৪ বছরের অভিজ্ঞতায় ২১০০টিরও বেশি নিকাহ সম্পন্ন করেছেন। তিনি বিশেষভাবে প্রবাসী ও জরুরি নিকাহ সেবায় পারদর্শী। তাঁর মিষ্টভাষী স্বভাব ও ধৈর্যশীলতা তাঁকে পরিবারগুলোর কাছে অত্যন্ত প্রিয় করে তুলেছে।',
    specialties:['নিকাহ রেজিস্ট্রেশন','কাবিননামা','জরুরি নিকাহ'],
    status:'available',
    level:'এক্সপার্ট কাজী',
    levelBadge:'🥇',
    achievements:['২০০০+ নিকাহ সম্পন্ন','প্রবাসী নিকাহ বিশেষজ্ঞ','জরুরি সেবায় দক্ষ'],
    availability:[
      {day:'শনিবার',time:'সকাল ১০টা — বিকাল ৫টা'},
      {day:'রবিবার',time:'সকাল ১০টা — বিকাল ৫টা'},
      {day:'সোমবার',time:'সকাল ১০টা — বিকাল ৫টা'},
      {day:'মঙ্গলবার',time:'বন্ধ'},
      {day:'বুধবার',time:'সকাল ১০টা — বিকাল ৫টা'},
      {day:'বৃহস্পতিবার',time:'সকাল ১০টা — বিকাল ৫টা'},
      {day:'শুক্রবার',time:'বন্ধ'},
    ]
  },
  {
    id:'mufti-karim', isChief:false,
    role:'কাজী',
    name:'মুফতি আব্দুল করিম',
    photo:'assets/kazi-karim.jpg',
    rating:4.7, totalNikah:980, experience:8,
    license:'BD-KZ-00415',
    area:'ঢাকা উত্তর, গাজীপুর',
    education:'কামিল (হাদিস) — মাদ্রাসা-ই-আলিয়া',
    phone:'+880XXXXXXXXXX', email:'karim@younuskazi.com',
    bio:'মুফতি আব্দুল করিম একজন তরুণ ও উদ্যমী কাজী। ৮ বছরের অভিজ্ঞতায় ইসলামী শরিয়ার গভীর জ্ঞান নিয়ে পেশাদার সেবা দিয়ে আসছেন। তিনি বিশেষভাবে মধ্যস্থতা ও পারিবারিক বিরোধ নিষ্পত্তিতে দক্ষ।',
    specialties:['নিকাহ রেজিস্ট্রেশন','মধ্যস্থতা','পারিবারিক পরামর্শ'],
    status:'busy',
    level:'সিনিয়র কাজী',
    levelBadge:'🥈',
    achievements:['৯০০+ নিকাহ সম্পন্ন','মধ্যস্থতা বিশেষজ্ঞ'],
    availability:[
      {day:'শনিবার',time:'সকাল ৯টা — দুপুর ২টা'},
      {day:'রবিবার',time:'সকাল ৯টা — দুপুর ২টা'},
      {day:'সোমবার',time:'বন্ধ'},
      {day:'মঙ্গলবার',time:'সকাল ৯টা — দুপুর ২টা'},
      {day:'বুধবার',time:'সকাল ৯টা — দুপুর ২টা'},
      {day:'বৃহস্পতিবার',time:'বন্ধ'},
      {day:'শুক্রবার',time:'বন্ধ'},
    ]
  },
  {
    id:'sheikh-noman', isChief:false,
    role:'কাজী',
    name:'শেখ নোমান সিদ্দিকী',
    photo:'assets/kazi-noman.jpg',
    rating:4.6, totalNikah:640, experience:6,
    license:'BD-KZ-00533',
    area:'নারায়ণগঞ্জ, ঢাকা দক্ষিণ',
    education:'ফাজিল (ফিকহ) — ঢাকা আলিয়া',
    phone:'+880XXXXXXXXXX', email:'noman@younuskazi.com',
    bio:'শেখ নোমান সিদ্দিকী নারায়ণগঞ্জ ও ঢাকা দক্ষিণ এলাকায় সক্রিয়ভাবে সেবা প্রদান করছেন। তিনি সময়নিষ্ঠ ও আন্তরিক আচরণের জন্য পরিচিত।',
    specialties:['নিকাহ রেজিস্ট্রেশন','কাবিননামা','তালাক সেবা'],
    status:'available',
    level:'কাজী',
    levelBadge:'🥉',
    achievements:['৬০০+ নিকাহ সম্পন্ন','সময়নিষ্ঠ সেবা'],
    availability:[
      {day:'শনিবার',time:'বিকাল ২টা — সন্ধ্যা ৭টা'},
      {day:'রবিবার',time:'বিকাল ২টা — সন্ধ্যা ৭টা'},
      {day:'সোমবার',time:'বিকাল ২টা — সন্ধ্যা ৭টা'},
      {day:'মঙ্গলবার',time:'বিকাল ২টা — সন্ধ্যা ৭টা'},
      {day:'বুধবার',time:'বন্ধ'},
      {day:'বৃহস্পতিবার',time:'বিকাল ২টা — সন্ধ্যা ৭টা'},
      {day:'শুক্রবার',time:'বন্ধ'},
    ]
  }
];

/* ── helpers ── */
function statusInfo(s){
  if(s==='available') return {label:'এখন উপলব্ধ',dot:'dot-green'};
  if(s==='busy')      return {label:'ব্যস্ত আছেন', dot:'dot-yellow'};
  return {label:'অনুপলব্ধ',dot:'dot-red'};
}
function starsStr(r){
  const f=Math.floor(r);
  return '★'.repeat(f)+'☆'.repeat(5-f);
}
function escH(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function liveRating(kaziId){
  const revs=getKaziReviews(kaziId);
  if(!revs.length) return KAZIS.find(k=>k.id===kaziId)?.rating||5;
  return revs.reduce((a,r)=>a+r.rating,0)/revs.length;
}

/* ── localStorage keys ── */
const LS_REVIEWS='kazi_reviews_v2';
const LS_APPS='kazi_applications_v2';

function getAllReviews(){try{return JSON.parse(localStorage.getItem(LS_REVIEWS))||{};}catch{return {};}}
function getKaziReviews(id){return getAllReviews()[id]||[];}
function addReview(kaziId,rev){
  const all=getAllReviews();
  if(!all[kaziId])all[kaziId]=[];
  all[kaziId].unshift(rev);
  localStorage.setItem(LS_REVIEWS,JSON.stringify(all));
}
function getApps(){try{return JSON.parse(localStorage.getItem(LS_APPS))||[];}catch{return [];}}
function saveApp(app){
  const apps=getApps();
  apps.unshift(app);
  localStorage.setItem(LS_APPS,JSON.stringify(apps));
}

let _onReviewAdded = null;

function seedReviews(){
  if(Object.keys(getAllReviews()).length>0) return;
  localStorage.setItem(LS_REVIEWS,JSON.stringify({
    younus:[
      {id:1,name:'রাফি আহমেদ',location:'ঢাকা, মিরপুর',rating:5,text:'অত্যন্ত পেশাদার ও সৎ সেবা। আমাদের নিকাহ খুব সুন্দরভাবে সম্পন্ন হয়েছে। সব কাগজপত্র ঠিকঠাক করে দিয়েছেন।',photo:null,date:'২০২৫ জানুয়ারি ১৫'},
      {id:2,name:'করিম সাহেব',location:'প্রবাসী, কুয়েত',rating:5,text:'বিদেশ থেকে এসে মাত্র একদিনে নিকাহ সম্পন্ন করেছি। ইউনুস কাজী সাহেব সব ব্যবস্থা করে দিয়েছেন।',photo:null,date:'২০২৫ মার্চ ১০'},
    ],
    'hafiz-rahim':[
      {id:3,name:'সুমাইয়া বেগম',location:'চট্টগ্রাম',rating:5,text:'কাজী সাহেব খুব ধৈর্যশীল ও আন্তরিক। কাবিননামা থেকে সনদ সব কিছু দ্রুত পেয়েছি। সবাইকে রেকমেন্ড করব।',photo:null,date:'২০২৫ ফেব্রুয়ারি ৩'},
    ],
    'mufti-karim':[
      {id:4,name:'নাদিয়া পারভীন',location:'সিলেট',rating:4,text:'খুব ভালো সেবা পেয়েছি। নিকাহের সব আনুষ্ঠানিকতা সুন্দরভাবে সম্পন্ন হয়েছে।',photo:null,date:'২০২৫ এপ্রিল ২২'},
    ],
    'sheikh-noman':[
      {id:5,name:'মো. হাসান',location:'নারায়ণগঞ্জ',rating:5,text:'সময়মতো আসেন এবং দ্রুত কাজ করেন। অনেক ভালো কাজী।',photo:null,date:'২০২৫ মে ৫'},
    ]
  }));
}
