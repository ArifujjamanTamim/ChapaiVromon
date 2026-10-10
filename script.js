// অ্যাপের লজিক: স্টেট, পেজ, মানচিত্র, শেয়ার কার্ড
const T=49,toBn=n=>Number(n).toLocaleString("bn-BD");
const U=[];G.forEach(([up,ue,ns])=>ns.forEach(([n,e,p])=>U.push({id:"u"+String(U.length+1).padStart(2,"0"),name:n,en:e,up,ue,p})));
const ALT={"Gomastapur":"gomostapur","Rohanpur":"rahanpur rohonpur","Boalia":"bolia balia boyalia","Chowdala":"chaudala choudala","Bhangabaria":"bangabari bhangabari","Baragharia":"borogoria barogharia","Manakosa":"monakosa monakasha","Mobarakpur":"mubarakpur","Chak Kirti":"chakkirti","Naya Naobhanga":"nayalabhanga nayanaobhanga","Satrujitpur":"chhatrajitpur chatrajitpur","Uzirpur":"ujirpur","Alatuli":"alatoli","Chapai Nababganj Paurashava":"chapainawabganj nawabganj sadar","Rahanpur Paurashava":"rohanpur rahonpur"};
const nz=t=>t.toLowerCase().replace(/[^a-z\u0980-\u09ff]/g,"");
const hit=(u,q)=>nz(u.name+u.en+u.up+u.ue+(u.p?"paurashavapourashavamunicipality":"")+(ALT[u.en]||"")).includes(nz(q));
let st={},nm="",DL=null,dlReady=false,photo=null;
try{st=JSON.parse(localStorage.getItem("chapai49")||"{}");nm=localStorage.getItem("chapai49name")||""}catch(e){}
const save=()=>{try{localStorage.setItem("chapai49",JSON.stringify(st));localStorage.setItem("chapai49name",nm)}catch(e){}};
const V=id=>st[id]==="VISITED",cnt=()=>U.filter(u=>V(u.id)).length,$=s=>document.querySelector(s);
const cl=id=>V(id)?"v":"",lbl=id=>V(id)?"ভ্রমণ করেছি":"ভ্রমণ করিনি";
const cu=up=>{const t=U.filter(u=>u.up===up);return toBn(t.filter(u=>V(u.id)).length)+"/"+toBn(t.length)};
let view="home",sel=null,q="",flt="ALL",pu=0;
function toggle(id,on){if(on)st[id]="VISITED";else delete st[id];save();render()}
function stats(){const v=cnt(),p=(v/T*100).toFixed(1);
return `<section class="stats" aria-label="পরিসংখ্যান"><div class="stat"><b>${toBn(T)}</b><span>মোট এলাকা</span></div><div class="stat"><b>${toBn(v)}</b><span>ভ্রমণ করেছি</span></div><div class="stat"><b>${toBn(T-v)}</b><span>বাকি</span></div></section>
<div class="bar" role="progressbar" aria-valuenow="${v}" aria-valuemin="0" aria-valuemax="${T}"><i style="width:${p}%"></i></div>
<div class="pct"><span>${toBn(v)} / ${toBn(T)} সম্পন্ন</span><span>${toBn(p)}%</span></div>`}
function map(){const L=G.map(g=>{const t=U.filter(u=>u.up===g[0]);return `<h3>${g[0]} <small>${cu(g[0])}</small></h3><div class="tiles">${t.map(u=>`<button class="tile ${cl(u.id)}" data-id="${u.id}" aria-label="${u.name}, ${u.up}, ${lbl(u.id)}">${u.name}</button>`).join("")}</div>`}).join("");
return `<div class="mapbox"><svg viewBox="${VB}" role="group" aria-label="চাঁপাইনবাবগঞ্জ মানচিত্র">${U.map((u,i)=>`<path class="u ${cl(u.id)}${u.id===sel?" sel":""}" d="${P[i]}" data-id="${u.id}" tabindex="0" role="button" aria-label="${u.name}, ${u.up}, ${lbl(u.id)}"><title>${u.name} (${u.up})</title></path>`).join("")}</svg>
<div class="legend"><span><i class="dot" style="background:var(--none)"></i>ভ্রমণ করিনি</span><span><i class="dot" style="background:var(--green2)"></i>ভ্রমণ করেছি</span></div>
<details class="lst"><summary>তালিকা থেকে বাছুন</summary>${L}</details></div>`}
function panel(){const u=U.find(x=>x.id===sel);if(!u)return `<p class="sub" style="margin-top:12px">বিস্তারিত দেখতে মানচিত্রে কোনো এলাকায় ক্লিক করুন।</p>`;const v=V(u.id);
return `<div class="panel" id="panel"><h3>${u.name}</h3><p>উপজেলা: ${u.up}${u.p?" · পৌরসভা":" · ইউনিয়ন"}</p><div class="seg"><button data-s="0" aria-pressed="${!v}">ভ্রমণ করিনি</button><button data-s="1" aria-pressed="${v}">ভ্রমণ করেছি</button></div></div>`}
function card(u){return `<div class="card"><b>${u.name}</b><small>${u.up} উপজেলা${u.p?" · পৌরসভা":""}</small><span class="tag ${cl(u.id)}">${lbl(u.id)}</span><br><button class="btn s" data-map="${u.id}">মানচিত্রে দেখুন</button></div>`}
function home(){return `<section class="hero"><h1>চাঁপাইনবাবগঞ্জের ৪৫ ইউনিয়ন <small class="h1s">ও ৪টি পৌরসভা</small></h1><p class="sub">নিজের জেলার প্রতিটি ইউনিয়ন ও পৌরসভা ঘুরে দেখুন, আপনার যাত্রা ট্র্যাক করুন।</p><button class="btn p" data-v="pick">আমার যাত্রা শুরু করুন</button> <button class="btn s" data-v="all">সব এলাকা দেখুন</button></section>${stats()}<div class="cta"><h2>প্রথমে উপজেলা বেছে নিন</h2><p>৫টি উপজেলা থেকে যেগুলো ঘুরেছেন, বেছে নিন। তারপর আপনার মানচিত্র দেখুন।</p><button class="btn" data-v="pick">বাছাই করুন</button></div>`}
function pick(){const us=U.filter(u=>u.up===G[pu][0]);
return `<section class="hero"><h1>কোনগুলো ঘুরেছেন?</h1><p class="sub">উপজেলা বেছে ইউনিয়ন বা পৌরসভার নামে ট্যাপ করুন। আবার ট্যাপ করলে চিহ্ন মুছে যাবে।</p></section>
<div class="tabs" role="tablist">${G.map((g,i)=>`<button role="tab" data-u="${i}" aria-selected="${i===pu}">${g[0]} <small>${cu(g[0])}</small></button>`).join("")}</div>
<div class="chipsel">${us.map(u=>`<button class="ch ${cl(u.id)}" data-c="${u.id}" aria-pressed="${V(u.id)}">${V(u.id)?"✓":"○"} ${u.name}</button>`).join("")}</div>${stats()}<button class="btn p" data-v="map">চূড়ান্ত মানচিত্র দেখুন</button>`}
function mapView(){return `<section class="hero"><h1>আমার মানচিত্র</h1></section>${stats()}${map()}${panel()}<button class="btn s" data-v="pick" style="margin-top:14px">বাছাই বদলান</button> <button class="btn p" data-v="journey" style="margin-top:14px">শেয়ার কার্ড বানান</button>`}
function journey(){const g=v=>U.filter(u=>V(u.id)===v).map(u=>`<li>${u.name}</li>`).join("")||"<li>এখনো কিছু নেই</li>";
return `<section class="hero"><h1>আমার চাঁপাইনবাবগঞ্জ যাত্রা</h1></section>${stats()}<h2>শেয়ার কার্ড</h2>
<div class="tools"><input type="text" id="nm" value="${nm.replace(/"/g,"&quot;")}" placeholder="আপনার নাম" maxlength="30" aria-label="আপনার নাম" style="flex:1 1 200px;padding:12px 14px;border-radius:12px;border:1.5px solid var(--line);background:var(--card);min-height:46px"><label class="btn s">ছবি যোগ করুন<input type="file" id="ph" accept="image/*" hidden></label></div>
<canvas id="card" width="1080" height="1350" aria-label="শেয়ার কার্ডের প্রিভিউ"></canvas>
<div class="tools" style="margin-top:12px"><button class="btn p" data-dl="png">PNG ডাউনলোড</button><button class="btn s" data-dl="jpg">JPG ডাউনলোড</button></div>
<h2>ভ্রমণ করেছি</h2><ul class="list">${g(true)}</ul><h2>বাকি</h2><ul class="list">${g(false)}</ul>`}
function all(){const L=U.filter(u=>(flt==="ALL"||(flt==="V")===V(u.id))&&(!q.trim()||hit(u,q)));
const F=[["ALL","সব"],["V","ভ্রমণ করেছি"],["N","ভ্রমণ করিনি"]];
return `<section class="hero"><h1>সব এলাকা</h1></section><div class="tools"><input type="search" id="q" value="${q.replace(/"/g,"&quot;")}" placeholder="নাম লিখুন (বাংলা বা English)" aria-label="খুঁজুন"></div><div class="tools chips">${F.map(f=>`<button data-f="${f[0]}" aria-pressed="${flt===f[0]}">${f[1]}</button>`).join("")}</div><div class="grid">${L.map(card).join("")||"<p>কিছু পাওয়া যায়নি। অন্য বানানে লিখে দেখুন।</p>"}</div>`}
const PP=P.map(d=>new Path2D(d)),[,,VW,VH]=VB.split(" ").map(Number);
async function drawCard(){const c=$("#card");if(!c)return;const x=c.getContext("2d"),W=1080,H=1350,F='"Hind Siliguri",system-ui,sans-serif',v=cnt(),pc=v/T;
try{const smp="০১২৩৪৫৬৭৮৯%আমার চাঁপাইনবাবগঞ্জ0123ABab";await Promise.all([document.fonts.load('700 40px "Hind Siliguri"',smp),document.fonts.load('400 30px "Hind Siliguri"',smp)])}catch(e){}
x.fillStyle="#f7f3ea";x.fillRect(0,0,W,H);x.fillStyle="#e8a317";x.fillRect(0,0,W,14);
let tx=70;if(photo){const r=75,cx=70+r,cy=150;x.save();x.beginPath();x.arc(cx,cy,r,0,7);x.clip();const s=Math.max(2*r/photo.width,2*r/photo.height),w=photo.width*s,h=photo.height*s;x.drawImage(photo,cx-w/2,cy-h/2,w,h);x.restore();x.lineWidth=7;x.strokeStyle="#e8a317";x.beginPath();x.arc(cx,cy,r,0,7);x.stroke();tx=70+2*r+28}
x.textAlign="left";x.fillStyle="#5c6b61";x.font="400 28px "+F;x.fillText("আমার চাঁপাইনবাবগঞ্জ",tx,100);
const t=(nm.trim()||"আপনার নাম")+"-এর চাঁপাইনবাবগঞ্জ";let fs=58;x.fillStyle="#14532d";
do{x.font="700 "+fs+"px "+F;fs-=2}while(x.measureText(t).width>W-tx-60&&fs>26);x.fillText(t,tx,175);
x.textAlign="right";x.font="700 64px "+F;x.fillText(toBn(v)+"/"+toBn(T),W-60,105);x.textAlign="left";
const s=Math.min(960/VW,830/VH),ox=(W-VW*s)/2,oy=260;
PP.forEach((p,i)=>{x.save();x.translate(ox,oy);x.scale(s,s);x.fillStyle=V(U[i].id)?"#1f7a4d":"#dfe3d6";x.fill(p,"evenodd");x.lineWidth=2;x.strokeStyle="#f7f3ea";x.stroke(p);x.restore()});
x.fillStyle="#dfe3d6";x.fillRect(70,1130,940,24);x.fillStyle="#1f7a4d";x.fillRect(70,1130,940*pc,24);
x.fillStyle="#14532d";x.font="700 64px "+F;const pt=toBn((pc*100).toFixed(0))+"%";x.fillText(pt,70,1228);const pw=x.measureText(pt).width;x.fillStyle="#1d2a22";x.font="400 36px "+F;x.fillText("চাঁপাইনবাবগঞ্জ ঘোরা হয়েছে",70+pw+18,1228);
x.fillStyle="#5c6b61";x.font="400 26px "+F;x.fillText("৪৫ ইউনিয়ন ও ৪টি পৌরসভা",70,1305);x.globalAlpha=.5;x.font="400 20px "+F;x.textAlign="right";x.fillText("তৈরি: আরিফুজ্জামান তামিম",W-70,1305);x.globalAlpha=1;x.textAlign="left"}
async function dl(t){await drawCard();const b=await new Promise(r=>$("#card").toBlob(r,t==="jpg"?"image/jpeg":"image/png",.92));const fn="amar-chapainawabganj."+t;try{if(DL)await DL.save({filename:fn,data:b});else{const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=fn;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}}catch(e){}}
function render(){const y=scrollY;$("#app").innerHTML={home,pick,map:()=>mapView(),journey,all}[view]();
document.querySelectorAll("nav button").forEach(b=>b.setAttribute("aria-current",b.dataset.v===view));
const i=$("#q");if(i){i.oninput=e=>{q=e.target.value;const p=e.target.selectionStart;render();const n=$("#q");n.focus();n.setSelectionRange(p,p)}}
if($("#card"))drawCard();scrollTo(0,y)}
document.addEventListener("click",e=>{const t=e.target.closest("[data-v],[data-c],[data-u],[data-id],[data-s],[data-f],[data-map],[data-dl]");if(!t)return;const d=t.dataset;
if(d.v){view=d.v;scrollTo(0,0);render()}
else if(d.c){toggle(d.c,!V(d.c))}
else if(d.u){pu=+d.u;render()}
else if(d.id){sel=d.id;render();$("#panel")?.scrollIntoView({block:"nearest",behavior:"smooth"})}
else if(d.s){toggle(sel,d.s==="1")}
else if(d.f){flt=d.f;render()}
else if(d.map){sel=d.map;view="map";render()}
else if(d.dl){dl(d.dl)}});
document.addEventListener("input",e=>{if(e.target.id==="nm"){nm=e.target.value;save();drawCard()}});
document.addEventListener("change",e=>{const f=e.target.id==="ph"&&e.target.files[0];if(f){const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{photo=i;drawCard()};i.src=r.result};r.readAsDataURL(f)}});
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("path[data-id]")){e.preventDefault();e.target.dispatchEvent(new MouseEvent("click",{bubbles:true}))}});
render();
(async()=>{try{DL=window.claude?await window.claude.use("downloads"):null}catch(e){DL=null}dlReady=true;if(view==="journey")render()})();
