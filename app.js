'use strict';

// v16 clean rebuild: no automatic cloud overwrite, no service-worker cache.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister())).catch(()=>{});
}

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBzxU5UV87QyxvvpaUVW9KSqYTzguJwGOQ",
  authDomain: "ministry-hub-app-da2c7.firebaseapp.com",
  projectId: "ministry-hub-app-da2c7",
  storageBucket: "ministry-hub-app-da2c7.firebasestorage.app",
  messagingSenderId: "975594347445",
  appId: "1:975594347445:web:3b1354103e41a41ac817fc"
};
const FIREBASE_CONFIG_KEY='ministryHubFirebaseConfig';
const STORE_KEY='ministryHubV16';
const OLD_KEYS=['ministryHubV3','serviceApp'];
const THUMB = id => `assets/thumbs/${id}.jpg`;
const MASTER_RAW = [
 ['p-life-forever','publication','書籍','いつまでも幸せに暮らせます','いつ幸',true],
 ['p-life-study','publication','書籍','いつまでも幸せに暮らせます ― 聖書を学んでみませんか','聖書レッスン',true],
 ['p-listen','publication','書籍','神さまの言われることを聞いていつまでも生き続けてください','神さま',false],
 ['p-peace','publication','冊子','安らぎと幸せへの道','安らぎ',true],
 ['p-origin','publication','冊子','生命 どこから？','生命',false],
 ['p-origin5','publication','冊子','生命の起源 5つの大切な質問','生命の起源',false],
 ['p-young','publication','冊子','若い人が知りたい10の質問 役立つ答え','若い人',false],
 ['p-bible-first','publication','冊子','初めて聖書を読む方へ','初めて聖書',false],
 ['p-family-book','publication','冊子','あなたの家族も幸せになれます','家族冊子',true],
 ['p-who','publication','冊子','今の時代にだれがエホバのご意志を行なっていますか','どんな人',false],
 ['p-convention','publication','招待状','2026 地区大会招待状','地区大会',true],
 ['p-meeting-invite','publication','招待状','会衆の集会の招待状','集会招待状',true],
 ['p-kingdom-heard','publication','トラクト','神の王国について聞いたことがありますか','王国とは',true],
 ['p-question','publication','トラクト','知りたいことがあったらどうする？','知りたい',false],
 ['p-bible-image','publication','トラクト','聖書ってどんなイメージ？','聖書',true],
 ['p-future','publication','トラクト','世の中はこれからどうなる？','世の中',true],
 ['p-family','publication','トラクト','家族に大切なのは？','家族',true],
 ['p-problems','publication','トラクト','世界に問題が多いのはどうして？','問題',false],
 ['p-suffering-end','publication','トラクト','つらいことはいつかなくなる？','つらいこと',true],
 ['p-dead-meet','publication','トラクト','亡くなった人にまた会えたらと思いますか','また会える',true],
 ['p-live-forever','publication','トラクト','いつまでも生きられるようになる？','生きられる',true],
 ['p-happy-family','publication','トラクト','ずっと幸せな家族でいるには？','幸せ家族',true],
 ['p-help-god','publication','トラクト','助けてくれる神はいる？','助ける神',true],
 ['p-prayer','publication','トラクト','誰かが祈りを聞いてくれている？','祈り',true],
 ['p-jesus','publication','トラクト','人生にプラスになるイエスの言葉','イエス',true],
 ['p-kingdom-fix','publication','トラクト','神の王国は全ての問題を解決してくれる','王国解決',true],
 ['p-religion','publication','トラクト','どの宗教を信じるかは重要？','宗教',false],
 ['p-g-awake-2025','publication','雑誌','目ざめよ！ 2025 No.1 物価の高騰','目ざめよ25',false],
 ['p-w-watch-2026','publication','雑誌','ものみの塔 2026 No.1 世界平和','ものみの塔26',false],
 ['v-origin','video','出版物紹介','「生命 どこから？」の紹介','生命動画',true],
 ['v-conv','video','招待動画','大会にぜひおいでください','大会動画',true],
 ['v-help-god','video','神について','助けてくれる神はいる？','助ける神',true],
 ['v-family','video','家族','ずっと幸せな家族でいるには？','幸せ家族',true],
 ['v-sad-end','video','人生・将来','つらいことや悲しいこと いつかなくなる？','悲しみ',true],
 ['v-kingdom-hall','video','組織紹介','王国会館においでください','王国会館',true],
 ['v-who','video','組織紹介','エホバの証人 どんな人たちですか','証人とは',false],
 ['v-study-enjoy','video','聖書・学び','聖書レッスンを楽しんでください！','レッスン',true],
 ['v-dead-loved','video','神について','大切な人を亡くしても','亡くしても',true],
 ['v-death-end','video','神について','死んだらそれで終わりですか','死',false],
 ['v-family-intro','video','家族','「あなたの家族も幸せになれます」の紹介','家族紹介',false],
 ['v-good-news','video','神について','良い知らせを聞きたいと思いませんか','良い知らせ',false],
 ['v-2026conv','video','招待動画','2026年 エホバの証人の「永遠の幸せ」大会にお越しください','2026大会',true],
 ['v-jesus-death','video','招待動画','イエスの死を思い起こしましょう','記念式',false],
 ['v-why-study','video','聖書・学び','聖書を学ぶとよいのはどうして？','聖書学ぶ',true],
 ['v-lesson-info','video','聖書・学び','聖書レッスンのご案内','案内',true],
 ['w-friends','video','ホワイトボード','本当の友達とは？','友達',true,'whiteboard'],
 ['w-bully','video','ホワイトボード','いじめっ子を殴らずに撃退する','いじめ',false,'whiteboard'],
 ['w-parent','video','ホワイトボード','親と上手に話すには？','親と話す',false,'whiteboard'],
 ['w-devices','video','ホワイトボード','電子機器 使っている？使われている？','電子機器',true,'whiteboard'],
 ['w-freedom','video','ホワイトボード','もっと自由がほしいなら','自由',false,'whiteboard'],
 ['w-gossip','video','ホワイトボード','うわさ話をやめるには？','うわさ',false,'whiteboard'],
 ['w-love','video','ホワイトボード','愛？それとも恋？','愛恋',false,'whiteboard'],
 ['w-pressure','video','ホワイトボード','仲間の圧力に負けないために','圧力',true,'whiteboard'],
 ['w-sns','video','ホワイトボード','SNSをスマートに','SNS',true,'whiteboard'],
 ['w-info','video','ホワイトボード','間違った情報に気を付けて！','情報',true,'whiteboard'],
 ['w-money','video','ホワイトボード','お金を上手に使おう','お金',false,'whiteboard'],
 ['w-smoking','video','ホワイトボード','煙と一緒に消えないで！','たばこ',false,'whiteboard'],
 ['w-game','video','ホワイトボード','ゲーム あなたは本当の勇者？','ゲーム',false,'whiteboard'],
 ['w-tears','video','ホワイトボード','涙から，笑顔へ','涙',false,'whiteboard'],
 ['w-lonely','video','ホワイトボード','寂しいと感じる時どうしたらいい？','寂しい',false,'whiteboard'],
 ['w-school','video','ホワイトボード','なんで学校に行かなきゃいけないの？','学校',false,'whiteboard'],
 ['w-honest','video','ホワイトボード','なぜ正直って大切？','正直',false,'whiteboard'],
 ['w-prejudice','video','ホワイトボード','偏見 もしかして私も？','偏見',false,'whiteboard']
];
const MASTER=MASTER_RAW.map(a=>({id:a[0],kind:a[1],category:a[2],title:a[3],short:a[4],favorite:a[5],style:a[6]||'',image:THUMB(a[0])}));
const $=s=>document.querySelector(s); const $$=s=>Array.from(document.querySelectorAll(s));
const safe=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const today=()=>new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
const uid=()=>crypto.randomUUID?crypto.randomUUID():'id-'+Date.now()+'-'+Math.random().toString(16).slice(2);
const fmt=m=>{m=Math.max(0,Math.round(Number(m)||0)); return `${Math.floor(m/60)}:${String(m%60).padStart(2,'0')}`};
const serviceYearStart=()=>{const d=new Date(); const y=d.getMonth()>=8?d.getFullYear():d.getFullYear()-1; return `${y}-09-01`};
const split=m=>({h:Math.floor((+m||0)/60),min:(+m||0)%60});
const item=id=>MASTER.find(x=>x.id===id)||{id,title:id,short:id,kind:'publication',category:'その他',image:''};

let serviceMinutes=0, extraMinutes=0, selected={publication:{},video:{}}, pickerKind='publication', pickerFilter='favorite', libFilter='favorite';
let cloudUser=null, cloudDb=null, cloudAuth=null, cloudUnsub=null;

function defaultState(){return {schema:16, records:[], contacts:[], favorites:Object.fromEntries(MASTER.filter(x=>x.favorite).map(x=>[x.id,true])), recent:[], baseline:{start:'2025-09-01', note:'2025年9月〜アプリ開始前', serviceMinutes:403*60+5, extraMinutes:0, returnVisits:0, studies:0}};}
function migrateRecord(r){
  const sm = r.serviceMinutes!=null ? +r.serviceMinutes : (r.extra ? 0 : (+r.minutes||0));
  const em = r.extraMinutes!=null ? +r.extraMinutes : (r.extra ? (+r.minutes||0) : 0);
  return {...r, id:r.id||uid(), serviceMinutes:sm, extraMinutes:em, minutes:sm+em, publications:r.publications||{}, videos:r.videos||{}, topics:Array.isArray(r.topics)?r.topics:(String(r.topics||'').split(',').map(x=>x.trim()).filter(Boolean))};
}
function contactKeyFromRecord(r){return [r.contactName||'', r.address||'', r.building||''].join('|').trim();}
function buildContacts(records, existing=[]){
  const map=new Map();
  (existing||[]).forEach(c=>{ if(c && c.id) map.set(c.id,{...c}); });
  records.forEach(r=>{
    if(!r.contactName && !r.returnVisitPoint && !r.address) return;
    const key=r.contactId || contactKeyFromRecord(r);
    if(!key) return;
    let c=[...map.values()].find(x=>x.id===r.contactId || (!r.contactId && contactKeyFromRecord(x)===key));
    if(!c){ c={id:r.contactId||uid(), name:r.contactName||'名前未設定', createdAt:r.date||today()}; map.set(c.id,c); }
    Object.assign(c, {
      name: r.contactName || c.name || '', building: r.building || c.building || '', address: r.address || c.address || '',
      lat: r.lat ?? c.lat ?? null, lng: r.lng ?? c.lng ?? null, territory: r.territory || c.territory || '', block: r.block || c.block || '',
      gender: r.gender || c.gender || '', ageGroup: r.ageGroup || c.ageGroup || '', rvStatus: r.rvStatus || c.rvStatus || '関心あり',
      nextDate: r.nextDate || c.nextDate || '', studyMaterial: r.studyMaterial || c.studyMaterial || '', studyLesson: r.studyLesson || c.studyLesson || '',
      topics: r.topics?.length ? r.topics : (c.topics||[]), updatedAt: r.date || c.updatedAt || today()
    });
    r.contactId=c.id;
  });
  return [...map.values()].sort((a,b)=>(a.name||'').localeCompare(b.name||'','ja'));
}
function normalizeState(obj){
  obj={...defaultState(), ...(obj||{})};
  obj.records=(obj.records||[]).map(migrateRecord);
  obj.contacts=buildContacts(obj.records, obj.contacts||[]);
  obj.favorites={...defaultState().favorites, ...(obj.favorites||{})};
  obj.recent=(obj.recent||[]).filter(Boolean).slice(0,50);
  obj.baseline={...defaultState().baseline, ...(obj.baseline||{})};
  obj.schema=16;
  return obj;
}
function loadState(){
  for(const k of [STORE_KEY,...OLD_KEYS]){
    try{const raw=localStorage.getItem(k); if(raw) return normalizeState(JSON.parse(raw));}catch{}
  }
  return normalizeState({});
}
let state=loadState();
function persist(){localStorage.setItem(STORE_KEY, JSON.stringify(state));}
function save(){persist(); renderAll();}
function mergeState(local, remote){
  local=normalizeState(local); remote=normalizeState(remote);
  const recs=new Map(); [...remote.records, ...local.records].forEach(r=>{ if(r&&r.id) recs.set(r.id, migrateRecord(r)); });
  const contacts=buildContacts([...recs.values()], [...remote.contacts, ...local.contacts]);
  const favorites={...remote.favorites, ...local.favorites};
  const recent=[...local.recent, ...remote.recent].filter((v,i,a)=>v&&a.indexOf(v)===i).slice(0,50);
  // baseline: keep the one that has more explicit extra/studies data, not add them together
  const lb=local.baseline||{}, rb=remote.baseline||{};
  const baseline=(lb.extraMinutes||lb.studies||lb.serviceMinutes>=rb.serviceMinutes)?lb:rb;
  return normalizeState({records:[...recs.values()], contacts, favorites, recent, baseline});
}

function recordService(r){return r.serviceMinutes!=null?+r.serviceMinutes:(r.extra?0:(+r.minutes||0));}
function recordExtra(r){return r.extraMinutes!=null?+r.extraMinutes:(r.extra?(+r.minutes||0):0);}
function inMonth(r, ym=today().slice(0,7)){return (r.date||'').startsWith(ym);}
function inServiceYear(r){return (r.date||'') >= (state.baseline?.start||serviceYearStart());}
function totals(filter=()=>true){let s=0,e=0,rv=0,st=0; state.records.filter(filter).forEach(r=>{s+=recordService(r); e+=recordExtra(r); rv+=+r.returnVisits||0; st+=+r.studies||0;}); return {service:s, extra:e, total:s+e, returnVisits:rv, studies:st};}

function thumbHtml(it, cls=''){const c=it.style==='whiteboard'?'whiteboard':it.category==='招待状'?'invite':it.kind==='video'?'video':''; return `<div class="thumb ${c} ${cls}"><img src="${safe(it.image)}" alt="" onerror="this.remove();this.parentElement.classList.add('fallback')"><span>${safe(it.short)}</span></div>`;}
function card(it, action='pick'){return `<div class="item" data-id="${safe(it.id)}" data-action="${action}">${thumbHtml(it)}<button class="star" data-star="${safe(it.id)}">${state.favorites[it.id]?'★':'☆'}</button><div class="item-title">${safe(it.title)}</div><small>${safe(it.category)}</small></div>`;}
function listFor(kind,filter){let arr=MASTER.filter(x=>x.kind===kind); if(filter==='favorite') arr=arr.filter(x=>state.favorites[x.id]); if(filter==='recent') arr=state.recent.map(id=>item(id)).filter(x=>x.kind===kind); return arr;}
function renderSelected(kind){const box=$(kind==='publication'?'#selectedPubs':'#selectedVideos'); if(!box) return; box.innerHTML=Object.entries(selected[kind]).map(([id,c])=>{const it=item(id);return `<div class="selected-row">${thumbHtml(it,'mini')}<div>${safe(it.title)}</div><div class="qty"><button type="button" data-dec="${safe(id)}">−</button><strong>${c}</strong><button type="button" data-inc="${safe(id)}">＋</button></div></div>`}).join('')||'<p class="muted">未選択</p>';}
function renderPicker(){const q=($('#pickerSearch')?.value||'').toLowerCase(); const arr=listFor(pickerKind,pickerFilter).filter(x=>(x.title+x.category+x.short).toLowerCase().includes(q)); $('#pickerGrid').innerHTML=arr.map(x=>card(x,'pick')).join('')||'<p>該当なし</p>';}
function renderLibrary(){const q=($('#librarySearch')?.value||'').toLowerCase(); const arr=[...listFor('publication',libFilter),...listFor('video',libFilter)].filter(x=>(x.title+x.category+x.short).toLowerCase().includes(q)); $('#libraryGrid').innerHTML=arr.map(x=>card(x,'none')).join('')||'<p>該当なし</p>';}
function renderTime(){ $('#serviceTimeDisplay').textContent=fmt(serviceMinutes); $('#extraTimeDisplay').textContent=fmt(extraMinutes); }
function renderDash(){const m=totals(inMonth); const y=totals(inServiceYear); const b=state.baseline||{}; $('#monthService').textContent=fmt(m.service); $('#monthExtra').textContent=fmt(m.extra); $('#monthTotal').textContent=fmt(m.total); $('#contactCount').textContent=state.contacts.length; $('#yearService').textContent=fmt((+b.serviceMinutes||0)+y.service); $('#yearExtra').textContent=fmt((+b.extraMinutes||0)+y.extra); $('#yearTotal').textContent=fmt((+b.serviceMinutes||0)+(+b.extraMinutes||0)+y.total); $('#studyCount').textContent=state.contacts.filter(c=>c.rvStatus==='レッスン中'||c.studyMaterial||c.studyLesson).length || ((+b.studies||0)+y.studies);}
function renderContactSelect(){const sel=$('#contactSelect'); const current=sel.value; sel.innerHTML='<option value="">新規・未選択</option>'+state.contacts.map(c=>`<option value="${safe(c.id)}">${safe(c.name||'名前未設定')} ${c.territory?`(${safe(c.territory)}${c.block?'-'+safe(c.block):''})`:''}</option>`).join(''); sel.value=current;}
function renderContacts(){const box=$('#contactList'); if(!box) return; box.innerHTML=state.contacts.map(c=>`<div class="contact-card"><b>${safe(c.name||'名前未設定')}</b><span class="badge">${safe(c.rvStatus||'関心あり')}</span><br><small>${safe(c.gender||'')} ${safe(c.ageGroup||'')} ${safe(c.territory||'')}${c.block?'-'+safe(c.block):''}</small><br>${safe(c.address||'')}${c.building?' / '+safe(c.building):''}<br><small>次回: ${safe(c.nextDate||'未定')} ${c.studyMaterial?' / '+safe(c.studyMaterial):''} ${c.studyLesson?' '+safe(c.studyLesson):''}</small><div class="button-row"><button class="ghost" data-use-contact="${safe(c.id)}">記録に使う</button>${c.lat&&c.lng?`<a class="ghost linkbtn" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}">Map</a>`:''}</div></div>`).join('')||'<p>再訪問先はまだありません。</p>';}
function renderHistory(){const box=$('#historyList'); if(!box) return; const arr=[...state.records].sort((a,b)=>(b.date||'').localeCompare(a.date||'')); box.innerHTML=arr.map(r=>`<div class="history-row"><div><b>${safe(r.date)}</b> ${safe(r.activityType||'')} <b>${fmt(recordService(r))}</b>${recordExtra(r)?` <span class="badge">付加 ${fmt(recordExtra(r))}</span>`:''}<br><small>${safe(r.contactName||'')} ${safe(r.territory||'')}${r.block?'-'+safe(r.block):''} ${safe(r.memo||'')}</small></div><div><button class="ghost" data-edit="${safe(r.id)}">編集</button><button class="ghost danger" data-delete="${safe(r.id)}">削除</button></div></div>`).join('')||'<p>履歴はありません。</p>';}
function rows(obj){return Object.entries(obj).sort((a,b)=>b[1]-a[1]).slice(0,15).map(([id,c])=>`<tr><td>${safe(item(id).title)}</td><td>${c}</td></tr>`).join('')||'<tr><td>なし</td><td></td></tr>';}
function renderStats(){const all=totals(()=>true), m=totals(inMonth), y=totals(inServiceYear), pubs={}, vids={}; state.records.forEach(r=>{Object.entries(r.publications||{}).forEach(([id,c])=>pubs[id]=(pubs[id]||0)+(+c||0)); Object.entries(r.videos||{}).forEach(([id,c])=>vids[id]=(vids[id]||0)+(+c||0));}); $('#statsContent').innerHTML=`<h3>今月</h3><table class="stats-table"><tr><th>通常</th><td>${fmt(m.service)}</td></tr><tr><th>付加</th><td>${fmt(m.extra)}</td></tr><tr><th>合計</th><td>${fmt(m.total)}</td></tr></table><h3>奉仕年度（初期累計込み）</h3><table class="stats-table"><tr><th>通常</th><td>${fmt((state.baseline.serviceMinutes||0)+y.service)}</td></tr><tr><th>付加</th><td>${fmt((state.baseline.extraMinutes||0)+y.extra)}</td></tr><tr><th>合計</th><td>${fmt((state.baseline.serviceMinutes||0)+(state.baseline.extraMinutes||0)+y.total)}</td></tr></table><h3>配布物</h3><table class="stats-table">${rows(pubs)}</table><h3>動画</h3><table class="stats-table">${rows(vids)}</table>`;}
function renderMap(){const pts=state.contacts.filter(c=>c.lat&&c.lng).filter(c=>!$('#mapStatusFilter').value||c.rvStatus===$('#mapStatusFilter').value).filter(c=>!$('#mapTerritoryFilter').value||c.territory===$('#mapTerritoryFilter').value.padStart(3,'0')); $('#rvList').innerHTML=pts.map(c=>`<div class="rv-card"><b>${safe(c.name)}</b> ${safe(c.rvStatus||'')}<br>${safe(c.address||'')}<br><a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}">Google Mapで開く</a></div>`).join('')||'<p>表示できるピンはありません。</p>'; setTimeout(()=>{ if(!window.L) return; if(window.mapObj){window.mapObj.remove(); window.mapObj=null;} const center=pts[0]?[pts[0].lat,pts[0].lng]:[34.7108,137.7261]; window.mapObj=L.map('mapCanvas').setView(center, pts[0]?14:11); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(window.mapObj); pts.forEach(c=>L.marker([c.lat,c.lng]).addTo(window.mapObj).bindPopup(`<b>${safe(c.name)}</b><br>${safe(c.address||'')}<br>${safe(c.rvStatus||'')}`)); },80);}
function renderBaseline(){const b=state.baseline||{}; $('#baselineStart').value=b.start||serviceYearStart(); $('#baselineNote').value=b.note||''; const s=split(b.serviceMinutes||0), e=split(b.extraMinutes||0); $('#baselineServiceH').value=s.h; $('#baselineServiceM').value=s.min; $('#baselineExtraH').value=e.h; $('#baselineExtraM').value=e.min; $('#baselineReturnVisits').value=b.returnVisits||0; $('#baselineStudies').value=b.studies||0;}
function renderAll(){renderDash(); renderContactSelect(); renderContacts(); renderLibrary(); renderHistory(); renderStats(); if($('#map').classList.contains('active')) renderMap();}

function fillContact(c){ if(!c) return; $('#contactSelect').value=c.id||''; $('#contactName').value=c.name||''; $('#building').value=c.building||''; $('#address').value=c.address||''; $('#lat').value=c.lat||''; $('#lng').value=c.lng||''; $('#territory').value=c.territory||''; $('#block').value=c.block||''; $('#gender').value=c.gender||''; $('#ageGroup').value=c.ageGroup||''; $('#rvStatus').value=c.rvStatus||'関心あり'; $('#nextDate').value=c.nextDate||''; $('#studyMaterial').value=c.studyMaterial||''; $('#studyLesson').value=c.studyLesson||''; $('#topics').value=(c.topics||[]).join(', '); $('#saveReturnVisit').checked=true; }
function clearForm(){ $('#recordForm').reset(); $('#editingRecordId').value=''; $('#date').value=today(); serviceMinutes=0; extraMinutes=0; selected={publication:{},video:{}}; renderTime(); renderSelected('publication'); renderSelected('video'); $('#cancelEditBtn').hidden=true; $('#saveRecordBtn').textContent='保存'; }
function formRecord(){const contactId=$('#contactSelect').value||''; const topics=$('#topics').value.split(',').map(x=>x.trim()).filter(Boolean); const rec={id:$('#editingRecordId').value||uid(), date:$('#date').value||today(), activityType:$('#activityType').value, serviceMinutes, extraMinutes, minutes:serviceMinutes+extraMinutes, extra:extraMinutes>0&&serviceMinutes===0, extraKind:$('#extraMaintenance').checked?'付加的奉仕':'', contactId, contactName:$('#contactName').value.trim(), building:$('#building').value.trim(), address:$('#address').value.trim(), lat:parseFloat($('#lat').value)||null, lng:parseFloat($('#lng').value)||null, returnVisitPoint:$('#saveReturnVisit').checked, rvStatus:$('#rvStatus').value, nextDate:$('#nextDate').value, topics, gender:$('#gender').value, ageGroup:$('#ageGroup').value, territory:$('#territory').value.trim()?$('#territory').value.trim().padStart(3,'0'):'', block:$('#block').value, studyMaterial:$('#studyMaterial').value.trim(), studyLesson:$('#studyLesson').value.trim(), publications:{...selected.publication}, videos:{...selected.video}, returnVisits:+$('#returnVisits').value||0, studies:+$('#studies').value||0, memo:$('#memo').value.trim()}; return rec;}
function saveContactFromRecord(r){ if(!r.returnVisitPoint && !r.contactName && !r.address) return; let c=state.contacts.find(x=>x.id===r.contactId); if(!c){c={id:r.contactId||uid(), createdAt:r.date||today()}; state.contacts.push(c); r.contactId=c.id;} Object.assign(c,{name:r.contactName||c.name||'名前未設定', building:r.building, address:r.address, lat:r.lat, lng:r.lng, territory:r.territory, block:r.block, gender:r.gender, ageGroup:r.ageGroup, rvStatus:r.rvStatus, nextDate:r.nextDate, topics:r.topics, studyMaterial:r.studyMaterial, studyLesson:r.studyLesson, updatedAt:r.date||today()}); }
async function geocodeAddress(){const addr=$('#address').value.trim(); if(!addr){alert('住所を入力してください'); return;} const q=encodeURIComponent(addr); try{const res=await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=jp&q=${q}`); const js=await res.json(); if(js&&js[0]){ $('#lat').value=js[0].lat; $('#lng').value=js[0].lon; alert('ピン位置を取得しました'); } else alert('住所から位置を見つけられませんでした'); }catch(e){alert('位置取得に失敗しました：'+e.message);} }

function firebaseConfigTextToObject(txt){txt=(txt||'').trim(); if(!txt) return FIREBASE_CONFIG; txt=txt.replace(/^const\s+firebaseConfig\s*=\s*/,'').replace(/;\s*$/,''); try{return JSON.parse(txt)}catch{return Function('return ('+txt+')')();}}
function setSyncStatus(msg){$('#syncStatus').textContent=msg;}
function savedConfig(){try{return JSON.parse(localStorage.getItem(FIREBASE_CONFIG_KEY)||'null')||FIREBASE_CONFIG}catch{return FIREBASE_CONFIG}}
async function initFirebase(config=savedConfig()){
 if(!window.firebase){setSyncStatus('Firebaseライブラリ未読込');return;}
 try{ if(!firebase.apps.length) firebase.initializeApp(config); cloudAuth=firebase.auth(); cloudDb=firebase.firestore(); localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
  cloudAuth.onAuthStateChanged(async user=>{cloudUser=user; $('#googleLoginBtn').hidden=!!user; $('#googleLogoutBtn').hidden=!user; if(cloudUnsub){cloudUnsub();cloudUnsub=null;} if(!user){setSyncStatus('未ログイン。端末内には保存されています。');return;} setSyncStatus('同期済み：'+(user.email||user.displayName||'Googleアカウント'));});
 }catch(e){setSyncStatus('Firebase設定エラー：'+e.message);}
}
async function cloudRef(){ if(!cloudDb||!cloudUser) throw new Error('Googleログインが必要です'); return cloudDb.collection('users').doc(cloudUser.uid).collection('apps').doc('ministryHub'); }
async function uploadCloud(){try{const ref=await cloudRef(); await ref.set({state:normalizeState(state), updatedAt:firebase.firestore.FieldValue.serverTimestamp()}); setSyncStatus('クラウドへ保存しました：'+(cloudUser.email||'')); alert('クラウドへ保存しました');}catch(e){alert('保存できません：'+e.message);}}
async function downloadCloud(){try{const ref=await cloudRef(); const snap=await ref.get(); if(!snap.exists||!snap.data().state){alert('クラウドにデータがありません');return;} if(confirm('クラウドのデータをこの端末に取り込みます。現在の端末データと統合しますか？')){state=mergeState(state, snap.data().state); save(); alert('取り込みました');}}catch(e){alert('取得できません：'+e.message);}}

function init(){
 $('#date').value=today(); renderTime(); renderSelected('publication'); renderSelected('video'); renderBaseline(); renderAll(); initFirebase();
 $$('.tab').forEach(b=>b.onclick=()=>{$$('.tab').forEach(x=>x.classList.remove('active')); b.classList.add('active'); $$('.view').forEach(v=>v.classList.remove('active')); $('#'+b.dataset.view).classList.add('active'); if(b.dataset.view==='map') renderMap(); renderAll();});
 document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>{const type=b.dataset.time, d=+b.dataset.delta; if(type==='service') serviceMinutes=Math.max(0,serviceMinutes+d); else extraMinutes=Math.max(0,extraMinutes+d); renderTime();});
 $('#contactSelect').onchange=()=>fillContact(state.contacts.find(c=>c.id===$('#contactSelect').value));
 $('#newContactBtn').onclick=()=>{document.querySelector('[data-view="record"]').click(); clearForm(); $('#saveReturnVisit').checked=true;};
 $('#locateBtn').onclick=()=>navigator.geolocation?navigator.geolocation.getCurrentPosition(pos=>{ $('#lat').value=pos.coords.latitude; $('#lng').value=pos.coords.longitude; $('#address').value=$('#address').value||`${pos.coords.latitude},${pos.coords.longitude}`; alert('現在地を取得しました');},e=>alert('現在地を取得できません：'+e.message),{enableHighAccuracy:true,timeout:10000}):alert('位置情報が使えません');
 $('#geocodeBtn').onclick=geocodeAddress;
 $('#openMapBtn').onclick=()=>{const q=$('#lat').value&&$('#lng').value?`${$('#lat').value},${$('#lng').value}`:encodeURIComponent($('#address').value); if(q) window.open(`https://www.google.com/maps/search/?api=1&query=${q}`,'_blank');};
 $$('[data-open-picker]').forEach(b=>b.onclick=()=>{pickerKind=b.dataset.openPicker; $('#pickerTitle').textContent=pickerKind==='publication'?'配布物を追加':'動画を追加'; $('#picker').showModal(); renderPicker();});
 $('#closePicker').onclick=()=>$('#picker').close(); $('#pickerSearch').oninput=renderPicker; $('#librarySearch').oninput=renderLibrary;
 $$('.picker-tab').forEach(b=>b.onclick=()=>{$$('.picker-tab').forEach(x=>x.classList.remove('active')); b.classList.add('active'); pickerFilter=b.dataset.filter; renderPicker();});
 $$('.lib-tab').forEach(b=>b.onclick=()=>{$$('.lib-tab').forEach(x=>x.classList.remove('active')); b.classList.add('active'); libFilter=b.dataset.lib; renderLibrary();});
 document.addEventListener('click',e=>{const star=e.target.closest('[data-star]'); if(star){e.stopPropagation(); state.favorites[star.dataset.star]=!state.favorites[star.dataset.star]; save(); renderPicker(); return;} const it=e.target.closest('.item[data-id]'); if(it&&it.dataset.action==='pick'){const id=it.dataset.id; selected[pickerKind][id]=(selected[pickerKind][id]||0)+1; state.recent=[id,...state.recent.filter(x=>x!==id)].slice(0,50); persist(); renderSelected(pickerKind); renderPicker(); return;} const inc=e.target.closest('[data-inc]'); if(inc){const id=inc.dataset.inc, k=item(id).kind; selected[k][id]++; renderSelected(k);} const dec=e.target.closest('[data-dec]'); if(dec){const id=dec.dataset.dec, k=item(id).kind; selected[k][id]--; if(selected[k][id]<=0) delete selected[k][id]; renderSelected(k);} const use=e.target.closest('[data-use-contact]'); if(use){document.querySelector('[data-view="record"]').click(); clearForm(); fillContact(state.contacts.find(c=>c.id===use.dataset.useContact));} const edit=e.target.closest('[data-edit]'); if(edit){const r=state.records.find(x=>x.id===edit.dataset.edit); if(r){document.querySelector('[data-view="record"]').click(); clearForm(); $('#editingRecordId').value=r.id; $('#date').value=r.date||today(); $('#activityType').value=r.activityType||'戸別'; serviceMinutes=recordService(r); extraMinutes=recordExtra(r); renderTime(); selected={publication:{...(r.publications||{})}, video:{...(r.videos||{})}}; renderSelected('publication'); renderSelected('video'); ['contactName','building','address','territory','block','gender','ageGroup','rvStatus','nextDate','studyMaterial','studyLesson','memo'].forEach(id=>{if($('#'+id)) $('#'+id).value=r[id]||''}); $('#lat').value=r.lat||''; $('#lng').value=r.lng||''; $('#topics').value=(r.topics||[]).join(', '); $('#saveReturnVisit').checked=!!r.returnVisitPoint; $('#returnVisits').value=r.returnVisits||0; $('#studies').value=r.studies||0; $('#contactSelect').value=r.contactId||''; $('#cancelEditBtn').hidden=false; $('#saveRecordBtn').textContent='更新';}} const del=e.target.closest('[data-delete]'); if(del&&confirm('この記録を削除しますか？')){state.records=state.records.filter(r=>r.id!==del.dataset.delete); state=normalizeState(state); save();}});
 $('#recordForm').onsubmit=e=>{e.preventDefault(); const rec=formRecord(); const idx=state.records.findIndex(r=>r.id===rec.id); if(idx>=0) state.records[idx]=rec; else state.records.push(rec); saveContactFromRecord(rec); state=normalizeState(state); save(); alert(idx>=0?'更新しました':'保存しました'); clearForm();};
 $('#cancelEditBtn').onclick=clearForm;
 $('#saveBaselineBtn').onclick=()=>{state.baseline={start:$('#baselineStart').value||serviceYearStart(), note:$('#baselineNote').value, serviceMinutes:(+$('#baselineServiceH').value||0)*60+(+$('#baselineServiceM').value||0), extraMinutes:(+$('#baselineExtraH').value||0)*60+(+$('#baselineExtraM').value||0), returnVisits:+$('#baselineReturnVisits').value||0, studies:+$('#baselineStudies').value||0}; save(); alert('初期累計を保存しました');};
 $('#exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(normalizeState(state),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='service-record-backup.json'; a.click();};
 $('#importBtn').onclick=()=>$('#importFile').click(); $('#importFile').onchange=async e=>{const f=e.target.files?.[0]; if(!f) return; try{const imported=JSON.parse(await f.text()); if(confirm('バックアップを取り込み、現在の端末データと統合しますか？')){state=mergeState(state, imported); save(); alert('復元しました');}}catch(err){alert('復元できません：'+err.message);} e.target.value='';};
 $('#saveFirebaseConfigBtn').onclick=()=>{try{const cfg=firebaseConfigTextToObject($('#firebaseConfigInput').value); localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(cfg)); initFirebase(cfg); alert('Firebase設定を保存しました');}catch(e){alert('設定を読み取れません：'+e.message);}};
 $('#firebaseConfigInput').value=JSON.stringify(savedConfig(),null,2);
 $('#googleLoginBtn').onclick=()=>{if(!cloudAuth) return alert('Firebase設定を保存してください'); cloudAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(e=>alert('ログインできません：'+e.message));};
 $('#googleLogoutBtn').onclick=()=>cloudAuth?.signOut(); $('#cloudUploadBtn').onclick=uploadCloud; $('#cloudDownloadBtn').onclick=downloadCloud;
 $('#mapStatusFilter').onchange=renderMap; $('#mapTerritoryFilter').oninput=renderMap;
}
document.addEventListener('DOMContentLoaded', init);
