var PH="201550785667";
var ICONS={pill:'<rect x="10" y="26" width="44" height="18" rx="9" transform="rotate(-35 32 35)" fill="#1257b8"/><path d="M32 22l12 16" stroke="#fff" stroke-width="3"/>',
bottle:'<rect x="24" y="10" width="16" height="9" rx="2" fill="#c8962e"/><rect x="18" y="19" width="28" height="36" rx="7" fill="#1257b8"/><rect x="23" y="30" width="18" height="12" rx="2" fill="#fff"/>',
syrup:'<rect x="26" y="8" width="12" height="8" fill="#c8962e"/><path d="M22 16h20v8l4 6v22a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V30l4-6z" fill="#b3402f"/><rect x="22" y="34" width="20" height="12" rx="2" fill="#fff"/>',
tube:'<path d="M18 14h28l-4 38H22z" fill="#d9778f"/><rect x="24" y="6" width="16" height="9" rx="2" fill="#c8962e"/><rect x="25" y="26" width="14" height="10" rx="2" fill="#fff"/>',
jar:'<rect x="14" y="14" width="36" height="10" rx="3" fill="#c8962e"/><rect x="12" y="24" width="40" height="28" rx="8" fill="#d9778f"/><circle cx="32" cy="38" r="7" fill="#fff"/>',
drop:'<rect x="26" y="6" width="12" height="10" fill="#c8962e"/><path d="M32 16c10 14 14 20 14 28a14 14 0 0 1-28 0c0-8 4-14 14-28z" fill="#e0a64a"/><ellipse cx="27" cy="42" rx="3" ry="6" fill="#fff" opacity=".6"/>',
sun:'<circle cx="32" cy="32" r="12" fill="#e0a64a"/><g stroke="#e0a64a" stroke-width="4" stroke-linecap="round"><path d="M32 6v8M32 50v8M6 32h8M50 32h8M14 14l6 6M44 44l6 6M14 50l6-6M44 20l6-6"/></g>',
bp:'<rect x="10" y="18" width="44" height="30" rx="6" fill="#1257b8"/><rect x="16" y="24" width="20" height="12" rx="2" fill="#cfeee8"/><circle cx="44" cy="30" r="5" fill="#c8962e"/>'};
var P=window.PRODUCTS||[];
function fp(x){return Math.round(x.p*(100-(x.d||0))/100)}
var cart={},cat="all",$=function(i){return document.getElementById(i)};
function toast(t){var e=$("toast");e.textContent=t;e.style.display="block";setTimeout(function(){e.style.display="none"},2200)}
function render(){var s=$("q").value.trim(),h="";
P.forEach(function(x){if(cat!="all"&&x.c!=cat)return;if(s&&x.n.indexOf(s)<0&&x.k.indexOf(s)<0)return;
var a=x.q>0;h+='<article class="card"><div class="ico '+x.c+'">'+(x.d>0?'<b class="disc">خصم '+x.d+'%</b>':'')+'<svg width="84" height="84" viewBox="0 0 64 64" aria-hidden="true">'+ICONS[x.i]+'</svg></div><span class="cat">'+(x.c=="med"?"MEDICINE":"COSMETICS")+" · "+x.k+'</span><h3>'+x.n+'</h3><div class="row"><span class="price">'+fp(x)+' ج.م'+(x.d>0?' <s class="old">'+x.p+'</s>':'')+'</span><span class="badge '+(a?"in":"out")+'">'+(a?"متوفر":"غير متوفر")+'</span></div><span class="qty">'+(a?"الكمية المتاحة: "+x.q+(x.q<=5?" (كمية محدودة)":""):"سيتوفر قريباً — اسأل عن البديل")+'</span><button class="add" '+(a?"":"disabled")+' onclick="add('+x.id+')">'+(a?"أضف إلى السلة":"غير متاح")+'</button></article>'});
$("grid").innerHTML=h||'<p>لا توجد نتائج. جرّب كلمة أخرى أو اسأل الدكتور عن البديل.</p>'}
function find(id){return P.filter(function(x){return x.id==id})[0]}
function add(id){var x=find(id);if((cart[id]||0)>=x.q){toast("وصلت للحد الأقصى المتاح");return}cart[id]=(cart[id]||0)+1;upd();toast("تمت الإضافة إلى السلة")}
function chg(id,d){var x=find(id),n=(cart[id]||0)+d;if(n<=0)delete cart[id];else if(n<=x.q)cart[id]=n;upd()}
function upd(){var c=0,t=0,h="";for(var id in cart){var x=find(id);c+=cart[id];t+=cart[id]*fp(x);h+='<div class="li"><span>'+x.n+'</span><span><button onclick="chg('+id+',-1)" aria-label="إنقاص">−</button> '+cart[id]+' <button onclick="chg('+id+',1)" aria-label="زيادة">+</button></span></div>'}
$("cnt").textContent=c;$("tot").textContent=t+" ج.م";$("items").innerHTML=h||"<p>السلة فارغة.</p>"}
function wa(t){window.open("https://wa.me/"+PH+"?text="+encodeURIComponent(t),"_blank")}
$("tabs").onclick=function(e){var b=e.target.closest(".tab");if(!b)return;cat=b.dataset.c;[].forEach.call(this.children,function(x){x.setAttribute("aria-pressed",x==b)});render()};
$("q").oninput=render;
$("openCart").onclick=function(){$("drawer").classList.add("open")};
$("closeCart").onclick=function(){$("drawer").classList.remove("open")};
$("drawer").onclick=function(e){if(e.target==this)this.classList.remove("open")};
$("order").onclick=function(){if(!Object.keys(cart).length){toast("السلة فارغة");return}var t="طلب جديد من الموقع:\n",s=0;for(var id in cart){var x=find(id);t+="- "+x.n+" × "+cart[id]+"\n";s+=cart[id]*fp(x)}t+="الإجمالي: "+s+" ج.م\nالاسم: "+$("an").value+"\nالعنوان/الهاتف: "+$("ad").value;wa(t)};
$("csend").onclick=function(){if(!$("cn").value||!$("cm").value){toast("أكمل الاسم ووصف الحالة");return}wa("استشارة طبية\nالاسم: "+$("cn").value+"\nالعمر: "+$("ca").value+"\nالنوع: "+$("ct").value+"\nالحالة: "+$("cm").value)};
$("ssend").onclick=function(){if(!$("sm").value){toast("اكتب المشكلة أولاً");return}wa("دعم فني\nالاسم: "+$("sn").value+"\nالمشكلة: "+$("sm").value)};
/* reviews */
var R=[{n:"أحمد م.",s:5,t:"خدمة سريعة ومعاملة راقية، والدكتور بيشرح كل حاجة بصبر."},{n:"منى ع.",s:5,t:"لقيت كل منتجات العناية اللي بدور عليها وبأسعار ممتازة."},{n:"خالد ح.",s:4,t:"التوصيل سريع والأدوية أصلية."}],rate=0;
try{var sv=JSON.parse(localStorage.getItem("rv")||"null");if(sv)R=sv}catch(e){}
var sh="";for(var i=1;i<=5;i++)sh+='<button type="button" role="radio" aria-label="'+i+' نجوم" data-v="'+i+'">★</button>';$("stars").innerHTML=sh;
$("stars").onclick=function(e){var b=e.target.closest("button");if(!b)return;rate=+b.dataset.v;[].forEach.call(this.children,function(x){x.className=+x.dataset.v<=rate?"on":""})};
function rr(){var t=0,h="";R.forEach(function(r){t+=r.s;h+='<div class="rev"><b>'+esc(r.n)+'</b> <span class="gold">'+"★".repeat(r.s)+"</span><div>"+esc(r.t)+"</div></div>"});$("rlist").innerHTML=h;$("avg").textContent="متوسط التقييم "+(t/R.length).toFixed(1)+" من 5 · "+R.length+" تقييم"}
function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
$("rsend").onclick=function(){if(!rate||!$("rt").value.trim()){toast("اختر عدد النجوم واكتب رأيك");return}R.unshift({n:$("rn").value.trim()||"عميل",s:rate,t:$("rt").value.trim()});try{localStorage.setItem("rv",JSON.stringify(R))}catch(e){}$("rt").value="";rr();toast("شكراً لتقييمك")};
$("yr").textContent=new Date().getFullYear();
var TL=[["الأمراض المزمنة","med","المزمنة","bp"],["أدوية عامة","med","","pill"],["أجهزة طبية","med","أجهزة","bp"],["العناية الشخصية","cos","العناية","tube"],["أطفال ورضع","med","أطفال","syrup"],["مكملات غذائية","med","مكملات","bottle"]];
$("tiles").innerHTML=TL.map(function(t,i){return '<button class="tile" data-i="'+i+'"><svg width="56" height="56" viewBox="0 0 64 64" aria-hidden="true">'+ICONS[t[3]]+'</svg>'+t[0]+'</button>'}).join("");
function go(c,q){cat=c;$("q").value=q;[].forEach.call($("tabs").children,function(x){x.setAttribute("aria-pressed",x.dataset.c==c)});render();$("shop").scrollIntoView({behavior:"smooth"})}
$("tiles").onclick=function(e){var b=e.target.closest(".tile");if(!b)return;var t=TL[+b.dataset.i];go(t[1],t[2])};
$("sgo").onclick=function(){cat="all";[].forEach.call($("tabs").children,function(x){x.setAttribute("aria-pressed",x.dataset.c=="all")});render();$("shop").scrollIntoView({behavior:"smooth"})};
$("q").onkeydown=function(e){if(e.key=="Enter")$("sgo").onclick()};
render();upd();rr();
