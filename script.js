/* ================================================================
   script.js — Shared JS (always loaded after data/kazis.js)
   ================================================================ */
'use strict';

/* ── NAVBAR SCROLL ── */
const _navbar  = document.querySelector('.navbar');
const _backTop = document.getElementById('backTop');
window.addEventListener('scroll',()=>{
  _navbar?.classList.toggle('scrolled',window.scrollY>40);
  _backTop?.classList.toggle('show',window.scrollY>400);
},{passive:true});
_backTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ── HAMBURGER ── */
const _ham = document.getElementById('hamburger');
const _mob = document.getElementById('mobileNav');
_ham?.addEventListener('click',()=>{_ham.classList.toggle('open');_mob.classList.toggle('open');});
function closeMobileNav(){_ham?.classList.remove('open');_mob?.classList.remove('open');}

/* ── ACTIVE NAV LINK ── */
const _sections   = document.querySelectorAll('section[id]');
const _navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll',()=>{
  let cur='';
  _sections.forEach(s=>{if(window.scrollY>=s.offsetTop-130)cur=s.id;});
  _navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

/* ── SCROLL REVEAL ── */
const _revObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('revealed'),i*75);_revObs.unobserve(e.target);}
  });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>_revObs.observe(el));

/* ── COUNTER ANIMATION ── */
function _animCount(el){
  const end=parseInt(el.dataset.count),suf=el.dataset.suffix||'';
  let cur=0; const step=end/65;
  const t=setInterval(()=>{cur=Math.min(cur+step,end);el.textContent=Math.floor(cur).toLocaleString('bn-BD')+suf;if(cur>=end)clearInterval(t);},22);
}
const _statsEl=document.querySelector('.stats-ribbon');
if(_statsEl){let done=false;new IntersectionObserver(([e])=>{if(e.isIntersecting&&!done){done=true;document.querySelectorAll('[data-count]').forEach(_animCount);}},{threshold:0.3}).observe(_statsEl);}

/* ── FAQ ── */
function toggleFaq(btn){
  const item=btn.closest('.faq-item'),was=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!was)item.classList.add('open');
}

/* ── MODAL ── */
function openModal(id){document.getElementById(id)?.classList.add('open');}
function closeModal(id){document.getElementById(id)?.classList.remove('open');}
document.addEventListener('click',e=>{
  if(e.target.classList.contains('overlay'))e.target.classList.remove('open');
});

/* ── TOAST ── */
function toast(msg,dur=3200){
  let el=document.getElementById('_toast');
  if(!el){el=document.createElement('div');el.id='_toast';el.className='toast';document.body.append(el);}
  el.textContent=msg;el.classList.add('show');
  clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),dur);
}

/* ── LIGHTBOX ── */
function openLightbox(src){
  let lb=document.getElementById('_lb');
  if(!lb){
    lb=document.createElement('div');lb.className='lightbox';lb.id='_lb';
    lb.innerHTML='<button class="lb-close" onclick="closeLightbox()">✕</button><img id="_lbimg" src="" alt="">';
    lb.addEventListener('click',e=>{if(e.target===lb)closeLightbox();});
    document.body.append(lb);
  }
  document.getElementById('_lbimg').src=src;lb.classList.add('open');
}
function closeLightbox(){document.getElementById('_lb')?.classList.remove('open');}

/* ── BOOKING MODAL ── */
function bookKazi(id,name){
  const ni=document.getElementById('_bKaziName');
  const hi=document.getElementById('_bKaziId');
  if(ni)ni.textContent=name;if(hi)hi.value=id;
  openModal('_bookingModal');
}
function _submitBooking(){
  const g=document.getElementById('_bGroom')?.value.trim();
  const b=document.getElementById('_bBride')?.value.trim();
  const p=document.getElementById('_bPhone')?.value.trim();
  const s=document.getElementById('_bService')?.value;
  const d=document.getElementById('_bDate')?.value;
  if(!g||!b||!p||!s||!d){toast('⚠ সকল * চিহ্নিত তথ্য পূরণ করুন।');return;}
  ['_bGroom','_bBride','_bPhone','_bEmail','_bVenue','_bNote'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  ['_bService','_bTime'].forEach(id=>{const el=document.getElementById(id);if(el)el.selectedIndex=0;});
  const dd=document.getElementById('_bDate');if(dd)dd.value='';
  closeModal('_bookingModal');
  setTimeout(()=>openModal('_successModal'),200);
}

/* ── REVIEW MODAL ── */
let _activeReviewKaziId=null;
function openReviewModal(kaziId){
  _activeReviewKaziId=kaziId;
  const k=KAZIS.find(x=>x.id===kaziId);
  const nm=document.getElementById('_revKaziName');
  if(nm)nm.textContent=k?.name||kaziId;
  // reset stars
  document.querySelectorAll('#_reviewModal input[name="_rStar"]').forEach(r=>r.checked=false);
  const tf=document.getElementById('_revText');if(tf)tf.value='';
  const nf=document.getElementById('_revName');if(nf)nf.value='';
  const lf=document.getElementById('_revLoc');if(lf)lf.value='';
  openModal('_reviewModal');
}
function _submitReview(){
  if(!_activeReviewKaziId){toast('⚠ কাজী নির্বাচন করুন।');return;}
  const name=document.getElementById('_revName')?.value.trim();
  const loc=document.getElementById('_revLoc')?.value.trim()||'বাংলাদেশ';
  const text=document.getElementById('_revText')?.value.trim();
  const ratingEl=document.querySelector('#_reviewModal input[name="_rStar"]:checked');
  if(!name||!text||text.length<10){toast('⚠ নাম ও কমপক্ষে ১০ অক্ষরের মন্তব্য লিখুন।');return;}
  if(!ratingEl){toast('⚠ রেটিং দিন (তারা নির্বাচন করুন)।');return;}
  const rating=parseInt(ratingEl.value);
  const today=new Date();
  const bn=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  const dateStr=`${today.getFullYear()} ${bn[today.getMonth()]} ${today.getDate()}`;
  // Handle photo
  const photoInput=document.getElementById('_revPhoto');
  const file=photoInput?.files[0];
  function doSave(photoData){
    addReview(_activeReviewKaziId,{id:Date.now(),name,location:loc,rating,text,photo:photoData||null,date:dateStr});
    closeModal('_reviewModal');
    toast('✅ আপনার ফিডব্যাক সংরক্ষিত হয়েছে!');
    if(typeof _onReviewAdded==='function')_onReviewAdded();
  }
  if(file){
    const reader=new FileReader();
    reader.onload=e=>doSave(e.target.result);
    reader.readAsDataURL(file);
  } else {
    doSave(null);
  }
}

/* ── INJECT SHARED MODALS ── */
function injectSharedModals(){
  if(document.getElementById('_bookingModal'))return;
  const html=`
  <!-- BOOKING MODAL -->
  <div class="overlay" id="_bookingModal">
    <div class="modal" style="max-width:540px">
      <button class="modal-close" onclick="closeModal('_bookingModal')">✕</button>
      <div style="font-family:'Noto Serif Bengali',serif;font-size:1.25rem;font-weight:900;color:var(--gd);margin-bottom:.3rem">📅 বুকিং করুন</div>
      <div style="font-size:.87rem;color:var(--ts);margin-bottom:1.4rem">কাজী: <strong id="_bKaziName" style="color:var(--gd)"></strong></div>
      <input type="hidden" id="_bKaziId">
      <div class="fgrid" style="gap:.9rem">
        <div class="form-field"><label>বরের নাম <span class="req">*</span></label><input id="_bGroom" type="text" placeholder="বরের পূর্ণ নাম"></div>
        <div class="form-field"><label>কনের নাম <span class="req">*</span></label><input id="_bBride" type="text" placeholder="কনের পূর্ণ নাম"></div>
        <div class="form-field"><label>মোবাইল <span class="req">*</span></label><input id="_bPhone" type="tel" placeholder="01XXXXXXXXX"></div>
        <div class="form-field"><label>ইমেইল</label><input id="_bEmail" type="email" placeholder="yourname@email.com"></div>
        <div class="form-field"><label>সেবার ধরন <span class="req">*</span></label>
          <select id="_bService"><option value="">— সেবা বেছে নিন —</option>
            <option>নিকাহ রেজিস্ট্রেশন</option><option>তালাক সেবা</option>
            <option>কাবিননামা</option><option>বিবাহ সনদ</option><option>পরামর্শ সেবা</option></select></div>
        <div class="form-field"><label>পছন্দের সময় <span class="req">*</span></label>
          <select id="_bTime"><option value="">— সময় —</option>
            <option>সকাল ৯টা</option><option>সকাল ১০টা</option><option>দুপুর ১২টা</option>
            <option>বিকাল ৩টা</option><option>বিকাল ৫টা</option></select></div>
        <div class="form-field"><label>তারিখ <span class="req">*</span></label><input id="_bDate" type="date"></div>
        <div class="form-field"><label>স্থান</label><input id="_bVenue" type="text" placeholder="নিকাহের স্থান"></div>
        <div class="form-field full"><label>বিশেষ বার্তা</label><textarea id="_bNote" rows="2" placeholder="অতিরিক্ত কোনো তথ্য..."></textarea></div>
      </div>
      <button onclick="_submitBooking()" style="width:100%;margin-top:1.3rem;background:linear-gradient(135deg,var(--gr),var(--gd));color:#fff;padding:.88rem;border:none;border-radius:var(--r1);font-family:inherit;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:0 5px 18px rgba(139,105,20,.3)">✔ বুকিং নিশ্চিত করুন</button>
    </div>
  </div>

  <!-- REVIEW MODAL -->
  <div class="overlay" id="_reviewModal">
    <div class="modal" style="max-width:480px">
      <button class="modal-close" onclick="closeModal('_reviewModal')">✕</button>
      <div style="font-family:'Noto Serif Bengali',serif;font-size:1.2rem;font-weight:900;color:var(--gd);margin-bottom:.3rem">✍️ ফিডব্যাক দিন</div>
      <div style="font-size:.87rem;color:var(--ts);margin-bottom:1.3rem">কাজী: <strong id="_revKaziName" style="color:var(--gd)"></strong></div>
      <div class="fgrid" style="gap:.85rem">
        <div class="form-field"><label>আপনার নাম <span class="req">*</span></label><input id="_revName" type="text" placeholder="আপনার নাম"></div>
        <div class="form-field"><label>এলাকা</label><input id="_revLoc" type="text" placeholder="ঢাকা, মিরপুর"></div>
        <div class="form-field full">
          <label>রেটিং <span class="req">*</span></label>
          <div class="modal-star-pick" id="_mStarPick">
            <input type="radio" name="_rStar" id="_rs5" value="5"><label for="_rs5">★</label>
            <input type="radio" name="_rStar" id="_rs4" value="4"><label for="_rs4">★</label>
            <input type="radio" name="_rStar" id="_rs3" value="3"><label for="_rs3">★</label>
            <input type="radio" name="_rStar" id="_rs2" value="2"><label for="_rs2">★</label>
            <input type="radio" name="_rStar" id="_rs1" value="1"><label for="_rs1">★</label>
          </div>
        </div>
        <div class="form-field full"><label>আপনার মন্তব্য <span class="req">*</span></label><textarea id="_revText" rows="4" placeholder="আপনার অভিজ্ঞতা লিখুন (কমপক্ষে ১০ অক্ষর)..."></textarea></div>
        <div class="form-field full">
          <label>বিবাহের ছবি (ঐচ্ছিক)</label>
          <label class="photo-up-lbl" style="border-radius:var(--r1)">
            <span style="font-size:1.3rem">📷</span>
            <div><span style="font-weight:600;color:var(--gd);display:block;font-size:.84rem">ছবি আপলোড করুন</span><small style="font-size:.75rem;color:var(--ts)">JPG বা PNG, সর্বোচ্চ ৫ MB</small></div>
            <input type="file" id="_revPhoto" accept="image/*" onchange="_previewRevPhoto(this)">
          </label>
          <img id="_revPhotoPrev" src="" alt="" style="display:none;max-height:120px;border-radius:var(--r1);margin-top:.45rem;border:1px solid var(--bo)">
        </div>
      </div>
      <button onclick="_submitReview()" style="width:100%;margin-top:1.2rem;background:linear-gradient(135deg,var(--gr),var(--gd));color:#fff;padding:.85rem;border:none;border-radius:var(--r1);font-family:inherit;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:0 5px 18px rgba(139,105,20,.3)">📤 ফিডব্যাক জমা দিন</button>
    </div>
  </div>

  <!-- SUCCESS MODAL -->
  <div class="overlay" id="_successModal">
    <div class="modal" style="text-align:center;max-width:420px">
      <div style="font-size:3.8rem;margin-bottom:.7rem">✅</div>
      <h3 style="font-family:'Noto Serif Bengali',serif;font-size:1.4rem;color:var(--gd);margin-bottom:.6rem">সফলভাবে জমা হয়েছে!</h3>
      <p style="color:var(--tm);line-height:1.75;margin-bottom:1.5rem">আপনার বুকিং নিশ্চিত হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
      <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap">
        <a href="index.html" class="btn btn-primary">হোমে ফিরুন</a>
        <button class="btn btn-ghost" onclick="closeModal('_successModal')">বন্ধ করুন</button>
      </div>
    </div>
  </div>

  <!-- WhatsApp Float -->
  <a href="https://wa.me/880XXXXXXXXXX" class="whatsapp-float" target="_blank" title="WhatsApp এ মেসেজ করুন">
    <span class="wa-tip">WhatsApp মেসেজ</span>
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  <button class="back-top" id="backTop">↑</button>
  `;
  document.body.insertAdjacentHTML('beforeend',html);
  // init date min
  const bd=document.getElementById('_bDate');
  if(bd)bd.min=new Date().toISOString().split('T')[0];
  // re-init overlay close
  document.querySelectorAll('.overlay').forEach(ov=>{
    ov.addEventListener('click',e=>{if(e.target===ov)ov.classList.remove('open');});
  });
  // re-init back top
  const bt=document.getElementById('backTop');
  bt?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

function _previewRevPhoto(inp){
  const file=inp.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const p=document.getElementById('_revPhotoPrev');
    p.src=e.target.result;p.style.display='block';
  };
  reader.readAsDataURL(file);
}

/* ── PAGE LOAD TRANSITION ── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .45s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});

/* ── SMOOTH HOVER SOUND ─ (visual only, no audio needed) ── */
/* ── NAVBAR HEIGHT DYNAMIC CLASS ── */
(function(){
  const nav = document.querySelector('.navbar');
  if(!nav) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if(y > lastY && y > 120) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastY = y;
  }, {passive: true});
  nav.style.transition = 'transform .4s cubic-bezier(.4,0,.2,1), box-shadow .3s, background .3s, height .3s';
})();

/* ── RIPPLE EFFECT ON BUTTONS ── */
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.btn, .bksub, .ql-btn, .rfbtn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const rip = document.createElement('span');
  rip.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,.32);pointer-events:none;transform:scale(0);animation:ripple .5s linear;left:${e.clientX-rect.left-20}px;top:${e.clientY-rect.top-20}px;width:40px;height:40px;z-index:10`;
  if(!['relative','absolute','fixed'].includes(getComputedStyle(btn).position)) btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(rip);
  rip.addEventListener('animationend', () => rip.remove());
});
if(!document.getElementById('_rippleStyle')){
  const s = document.createElement('style');
  s.id = '_rippleStyle';
  s.textContent = '@keyframes ripple{to{transform:scale(3.5);opacity:0}}';
  document.head.appendChild(s);
}
