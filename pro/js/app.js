const $=(s,r=document)=>r.querySelector(s),LS='pcs.v1',uid=()=>Math.random().toString(36).slice(2,9);
const E=s=>String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const MN=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],fm=v=>{const m=/^(\d{4})-(\d{2})$/.exec(v||'');return m?MN[+m[2]-1]+' '+m[1]:v||''};
const FF={sans:"system-ui,'Segoe UI',Roboto,sans-serif",serif:"Georgia,'Times New Roman',serif",pal:"'Palatino Linotype',Palatino,serif",tre:"'Trebuchet MS',Verdana,sans-serif",mono:"ui-monospace,'Courier New',monospace"};
const EXP=[['role','Posisi'],['org','Perusahaan'],['loc','Lokasi'],['start','Mulai','month'],['end','Selesai','month'],['cur','Masih bekerja di sini','cb'],['desc','Deskripsi dan pencapaian (satu poin per baris, awali dengan -)','ta']],
EDU=[['role','Gelar / jurusan'],['org','Institusi'],['loc','IPK / nilai'],['start','Tahun masuk'],['end','Tahun lulus'],['desc','Keterangan tambahan','ta']],
GEN=[['role','Judul / nama'],['org','Penerbit / keterangan'],['end','Tahun / tanggal'],['desc','Deskripsi','ta']];
const SEC={exp:{t:'Pengalaman Kerja',k:'it',f:EXP},edu:{t:'Pendidikan',k:'it',f:EDU},skills:{t:'Keterampilan',k:'sk',f:[['role','Keterampilan'],['org','Kategori'],['lvl','Tingkat','lv']]},lang:{t:'Bahasa',k:'ln',f:[['role','Bahasa'],['org','Tingkat']]},cert:{t:'Sertifikasi',k:'it',f:GEN},proj:{t:'Proyek',k:'it',f:GEN},award:{t:'Penghargaan',k:'it',f:GEN},ach:{t:'Pencapaian',k:'it',f:GEN},vol:{t:'Pengalaman Sukarela',k:'it',f:GEN},pub:{t:'Publikasi',k:'it',f:GEN},int:{t:'Minat',k:'ln',f:[['role','Minat']]},ref:{t:'Referensi',k:'it',f:GEN},custom:{t:'Bagian Kustom',k:'it',f:GEN}};
const PF=[['name','Nama lengkap'],['title','Profesi / jabatan'],['email','Email','email'],['phone','Telepon','tel'],['addr','Alamat'],['city','Kota, negara'],['linkedin','LinkedIn'],['web','Portfolio / website'],['github','GitHub']];
const TP=[{n:'Modern Professional',ff:'sans',h:'box',lay:'one',hd:'l',c:'#172554',a:'#4F46E5'},{n:'Executive Premium',ff:'serif',h:'caps',lay:'one',hd:'c',c:'#1c1917',a:'#a16207'},{n:'Minimalist Clean',ff:'sans',h:'plain',lay:'one',hd:'l',c:'#0f172a',a:'#64748b'},{n:'Corporate Classic',ff:'serif',h:'line',lay:'one',hd:'l',c:'#1e3a8a',a:'#1e3a8a'},{n:'Creative Designer',ff:'tre',h:'bar',lay:'side',hd:'l',c:'#be185d',a:'#7c3aed'},{n:'Elegant Modern',ff:'pal',h:'caps',lay:'side',hd:'c',c:'#0f766e',a:'#b45309'},{n:'ATS Friendly',ff:'sans',h:'line',lay:'one',hd:'l',c:'#000000',a:'#374151',ph:0},{n:'Academic CV',ff:'serif',h:'plain',lay:'one',hd:'c',c:'#111827',a:'#374151',ph:0},{n:'Technology Specialist',ff:'mono',h:'box',lay:'side',hd:'band',c:'#0f172a',a:'#059669'},{n:'Fresh Graduate',ff:'tre',h:'box',lay:'one',hd:'band',c:'#4F46E5',a:'#0ea5e9'}];
const VERBS=['Memimpin','Mengelola','Merancang','Mengembangkan','Meningkatkan','Mengoptimalkan','Menyusun','Mengoordinasikan','Menerapkan','Melaksanakan','Memelihara','Memperbaiki','Menganalisis','Mengawasi','Melatih'];
const AUT=['Meningkatkan [metrik] sebesar [X]% dalam [N] bulan melalui [tindakan]','Mengelola [jumlah] [objek/tim/proyek] dengan hasil [capaian terukur]','Menghemat [biaya/waktu] sebesar [X] dengan menerapkan [solusi]'];
const SK={'Teknologi':['Microsoft Excel','HTML/CSS','JavaScript','SQL','Analisis Data'],'Administrasi':['Pengarsipan','Korespondensi Bisnis','Manajemen Jadwal','Pembukuan Dasar'],'Pemasaran':['Media Sosial','Copywriting','SEO','Layanan Pelanggan'],'Teknik dan Operasional':['Pemeliharaan Mesin','Keselamatan Kerja (K3)','Pembacaan Gambar Teknis','Troubleshooting'],'Soft skill':['Kerja Tim','Komunikasi','Disiplin','Pemecahan Masalah','Manajemen Waktu']};
let docs=[],cur=null,hist=[],hp=-1,tab='isi',z=1,tmr=0,lastRef=null;
try{docs=JSON.parse(localStorage.getItem(LS)||'[]')}catch(e){docs=[]}
const tplDef=(i,pg)=>{const t=TP[i];return{tpl:i,c:t.c,a:t.a,ff:t.ff,h:t.h,lay:t.lay,hd:t.hd,ph:t.ph??1,fs:13,mg:15,gap:12,lh:1.4,ps:90,pg:pg||'A4'}};
const mk=t=>({type:t,title:SEC[t].t,hide:0,items:[]}),newDoc=()=>({id:uid(),name:'CV Baru',upd:Date.now(),p:{},hs:0,d:tplDef(0),secs:['exp','edu','skills','lang','cert'].map(mk)});
function theme(t){const r=document.documentElement;t=t||(r.dataset.theme=='dark'?'light':'dark');r.dataset.theme=t;try{localStorage.setItem('pcs.t',t)}catch(e){}}
try{theme(localStorage.getItem('pcs.t')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'))}catch(e){}
function toast(m){const t=document.createElement('div');t.className='toast noprint';t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),2200)}
function modal(h){const m=document.createElement('div');m.className='mod noprint';m.innerHTML=`<div class=card role=dialog>${h}</div>`;m.onclick=e=>{if(e.target==m||e.target.dataset.a=='x')m.remove()};document.body.append(m);return m}
function confirmD(msg,fn){const m=modal(`<p>${msg}</p><div class=row><button class=btn data-a=x>Batal</button><button class="btn p" id=ok>Ya, lanjutkan</button></div>`);$('#ok',m).onclick=()=>{m.remove();fn()}}
const ss=t=>{const e=$('#ss');if(e)e.textContent=t};
function save(){if(cur)cur.upd=Date.now();try{localStorage.setItem(LS,JSON.stringify(docs));ss('Tersimpan '+new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}))}catch(e){toast('Gagal menyimpan: penyimpanan penuh')}}
function snap(){const j=JSON.stringify(cur);if(hist[hp]===j)return;hist=hist.slice(0,hp+1);hist.push(j);if(hist.length>60)hist.shift();hp=hist.length-1}
function flush(){if(tmr){clearTimeout(tmr);tmr=0;snap();save()}}
function changed(now){prev();ss('Menyimpan…');clearTimeout(tmr);const f=()=>{tmr=0;snap();save()};if(now)f();else tmr=setTimeout(f,600)}
function restore(){const o=JSON.parse(hist[hp]);Object.keys(cur).forEach(k=>delete cur[k]);Object.assign(cur,o);$('#nm').value=cur.name;pane();prev();save()}
/* ---------- Dashboard ---------- */
function dash(){cur=null;const f=d=>new Date(d).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});
$('#app').innerHTML=`<div class=wrap><div class=hero><h1>PRO CV STUDIO</h1><p>Build Your Future. Create Your Professional Identity.</p><div class=row><button class="btn p" data-a=new>+ Buat CV Sekarang</button><button class=btn data-a=imp>Import JSON</button><button class=btn data-a=theme>Mode gelap / terang</button></div></div>
<div class=grid><div class=card><b>${docs.length}</b><div class=mu>Dokumen CV</div></div><div class=card><b>10</b><div class=mu>Template profesional</div></div><div class=card><b>100% lokal</b><div class=mu>Data tidak dikirim ke server</div></div></div>
<h3>Dokumen Saya</h3>${docs.length?`<div class=grid>${docs.map(d=>`<div class=card><b>${E(d.name)}</b><div class=mu>${TP[d.d.tpl].n} · ${d.d.pg}</div><div class=mu>Diperbarui ${f(d.upd)}</div><div class=row style="margin-top:8px"><button class="btn s p" data-a=open data-id=${d.id}>Edit</button><button class="btn s" data-a=dup data-id=${d.id}>Duplikat</button><button class="btn s d" data-a=del data-id=${d.id}>Hapus</button></div></div>`).join('')}</div>`:'<div class=card>Belum ada CV. Klik Buat CV Sekarang untuk memulai.</div>'}
<h3>Template</h3><p>${TP.map(t=>t.n).join(' · ')}</p><h3>Cara Penggunaan</h3><div class=grid><div class=card><b>1. Isi data</b><div class=mu>Lengkapi formulir bagian demi bagian.</div></div><div class=card><b>2. Atur desain</b><div class=mu>Pilih template, warna, font, dan ukuran kertas.</div></div><div class=card><b>3. Unduh</b><div class=mu>Cetak atau simpan sebagai PDF, cadangkan lewat JSON.</div></div></div></div>`}
/* ---------- Editor ---------- */
function openD(){hist=[];hp=-1;tab='isi';editor();snap()}
function editor(){$('#app').innerHTML=`<div class=ed><div class="top noprint"><button class=btn data-a=back title="Kembali ke dashboard">←</button><input id=nm class=nm value="${E(cur.name)}" aria-label="Nama dokumen"><span id=ss class=mu></span><span class=sp></span><button class="btn s" data-a=undo title="Undo (Ctrl+Z)">↶</button><button class="btn s" data-a=redo title="Redo (Ctrl+Y)">↷</button><button class="btn s" data-a=theme title="Mode gelap / terang">◐</button><button class="btn s" data-a=save title="Simpan (Ctrl+S)">Simpan</button><button class="btn s" data-a=exp>JSON</button><button class="btn s" data-a=print title="Ctrl+P">Cetak</button><button class="btn s p" data-a=pdf>Unduh PDF</button></div>
<div class="mt noprint"><button class="btn" data-a=mt data-v=e>Editor</button><button class="btn" data-a=mt data-v=p>Pratinjau</button></div>
<div class=main data-m=e><div class="side noprint"><div class=tabs>${[['isi','Isi'],['des','Desain'],['cek','Periksa'],['bnt','Bantuan']].map(([k,l])=>`<button data-a=tab data-t=${k} class="${k==tab?'on':''}">${l}</button>`).join('')}</div><div id=pane></div></div>
<div class=pv id=pv><div class="zb noprint"><button class="btn s" data-a=zo>−</button><span id=zl class=mu></span><button class="btn s" data-a=zi>+</button><button class="btn s" data-a=full>Layar penuh</button></div><div class=pvs><div class=pvz id=pz></div></div></div></div></div>`;pane();prev();fit()}
function setTab(t){tab=t;document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==t));pane()}
function pane(){const e=$('#pane');if(e)e.innerHTML=tab=='isi'?isi():tab=='des'?des():tab=='cek'?chk():bnt()}
function fld([k,l,t],v,si,ii){const a=`data-si=${si} data-ii=${ii} data-f=${k}`;
if(t=='ta')return`<label>${l}<textarea ${a}>${E(v)}</textarea></label>`;if(t=='cb')return`<label class=cb><input type=checkbox ${a} ${v?'checked':''}> ${l}</label>`;
if(t=='lv')return`<label>${l}<select ${a}>${['Tanpa bar','1','2','3','4','5'].map((o,i)=>`<option value=${i} ${+v==i?'selected':''}>${o}</option>`).join('')}</select></label>`;
return`<label>${l}<input type=${t||'text'} ${a} value="${E(v)}"></label>`}
function secCard(s,si){return`<div class=card><div class=row><input data-si=${si} value="${E(s.title)}" aria-label="Judul bagian" style="flex:1;min-width:120px;font-weight:600"><button class="btn s" data-a=smv data-i=${si} data-v=-1 title="Naik">▲</button><button class="btn s" data-a=smv data-i=${si} data-v=1 title="Turun">▼</button><button class="btn s" data-a=shide data-i=${si}>${s.hide?'Tampilkan':'Sembunyikan'}</button><button class="btn s d" data-a=sdel data-i=${si} title="Hapus bagian">✕</button></div>
${s.items.map((it,ii)=>`<div class=ic>${SEC[s.type].f.map(f=>fld(f,it[f[0]],si,ii)).join('')}<div class=row style="margin-top:6px"><button class="btn s" data-a=imv data-i=${si} data-j=${ii} data-v=-1>▲</button><button class="btn s" data-a=imv data-i=${si} data-j=${ii} data-v=1>▼</button><button class="btn s d" data-a=idel data-i=${si} data-j=${ii}>Hapus item</button></div></div>`).join('')||'<p class=mu>Belum ada item.</p>'}<button class="btn s" data-a=iadd data-i=${si}>+ Tambah item</button></div>`}
function isi(){const p=cur.p;return`<div class=card><h3>Data Pribadi</h3>${p.photo?`<img class=th src="${p.photo}" alt=""> <button class="btn s d" data-a=phrm>Hapus foto</button>`:''}<label>Foto profil<input type=file id=phf accept="image/*"></label>${PF.map(([k,l,t])=>`<label>${l}<input type=${t||'text'} data-b=${k} value="${E(p[k])}"></label>`).join('')}</div>
<div class=card><h3>Ringkasan Profesional</h3><label class=cb><input type=checkbox data-a=hsum ${cur.hs?'':'checked'}> Tampilkan di CV</label><textarea data-b=summary rows=5>${E(p.summary)}</textarea></div>${cur.secs.map(secCard).join('')}
<div class="card row"><select id=as style="flex:1">${Object.entries(SEC).map(([k,s])=>`<option value=${k}>${s.t}</option>`).join('')}</select><button class="btn p" data-a=addsec>+ Bagian</button></div>`}
function des(){const d=cur.d,sel=(l,k,o)=>`<label>${l}<select data-d=${k}>${o.map(([v,t])=>`<option value="${v}" ${String(d[k])==v?'selected':''}>${t}</option>`).join('')}</select></label>`,rg=(l,k,a,b,s)=>`<label>${l}<input type=range data-d=${k} min=${a} max=${b} step=${s} value=${d[k]}></label>`;
return`<div class=card><h3>Template</h3><div class=tg>${TP.map((t,i)=>`<button class="btn ${d.tpl==i?'on':''}" data-a=tpl data-i=${i}>${i+1}. ${t.n}</button>`).join('')}</div></div><div class=card><h3>Kustomisasi</h3>
<label>Warna utama<input type=color data-d=c value="${d.c}"></label><label>Warna aksen<input type=color data-d=a value="${d.a}"></label>
${sel('Font','ff',[['sans','Sans-serif'],['serif','Serif'],['pal','Palatino'],['tre','Trebuchet'],['mono','Monospace']])}${rg('Ukuran font','fs',10,16,.5)}${rg('Margin halaman','mg',6,25,1)}${rg('Jarak antarbagian','gap',4,24,1)}${rg('Tinggi baris','lh',1.2,1.8,.05)}
${sel('Header','hd',[['l','Rata kiri'],['c','Tengah'],['band','Band berwarna']])}${sel('Gaya heading','h',[['line','Garis bawah'],['bar','Blok warna'],['caps','Kapital'],['box','Garis samping'],['plain','Polos']])}${sel('Layout kolom','lay',[['one','Satu kolom'],['side','Dua kolom (sidebar)']])}${sel('Ukuran halaman','pg',[['A4','A4'],['Letter','Letter']])}
<label class=cb><input type=checkbox data-d=ph ${d.ph?'checked':''}> Tampilkan foto</label>${rg('Ukuran foto','ps',60,140,5)}<button class=btn data-a=rd>Reset desain</button></div>`}
function check(c){const p=c.p,g=t=>c.secs.filter(s=>s.type==t).flatMap(s=>s.items),L=[],a=(ok,m,w)=>L.push({ok,m,w}),ex=g('exp'),ed=g('edu');
a(!!p.name,'Nama lengkap terisi',2);a(!!p.title,'Profesi / jabatan terisi',1);a(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email||''),'Email valid',2);a((p.phone||'').replace(/\D/g,'').length>=9,'Nomor telepon valid',1);
a((p.summary||'').length>=120,'Ringkasan profesional minimal 120 karakter',2);a(ex.length>0,'Memiliki pengalaman kerja',2);a(ex.every(x=>(x.desc||'').length>=30),'Setiap pengalaman kerja punya deskripsi',1);a(ex.some(x=>/\d/.test(x.desc||'')),'Ada pencapaian terukur (angka / persentase)',1);
a(ed.length>0,'Memiliki pendidikan',2);a(g('skills').length>=5,'Minimal 5 keterampilan',1);a([...ex,...ed].every(x=>!(x.start&&x.end&&!x.cur&&x.start>x.end)),'Tanggal mulai tidak melewati tanggal selesai',1);
a(c.secs.filter(s=>!s.hide&&s.items.length).every(s=>s.title==SEC[s.type].t),'Judul bagian memakai heading standar ATS',1);a(c.d.lay=='one','Layout satu kolom (paling aman untuk ATS)',1);a(!(p.photo&&c.d.ph),'Tanpa foto (disarankan untuk ATS)',1);return L}
function chk(){const L=check(cur),t=L.reduce((a,x)=>a+x.w,0),sc=Math.round(L.reduce((a,x)=>a+(x.ok?x.w:0),0)/t*100);return`<div class=card><b>Skor kualitas dan ATS: ${sc}/100</b><div class=meter><u style="width:${sc}%"></u></div></div><div class=card>${L.map(x=>`<div class="ck ${x.ok?'ok':'no'}">${x.ok?'✓':'!'} ${x.m}</div>`).join('')}</div>`}
function bnt(){return`<div class=card><h3>Generator Ringkasan</h3><p class=mu>Berbasis templat lokal, tanpa AI eksternal.</p><label>Lama pengalaman (tahun)<input id=g1 type=number min=0></label><label>Bidang keahlian<input id=g2></label><label>Kekuatan utama<input id=g3 placeholder="bekerja dalam tim, teliti, disiplin"></label><button class="btn p" data-a=gsum style="margin-top:8px">Buat ringkasan</button></div>
<div class=card><h3>Kata Kerja Aksi</h3><p class=mu>Klik untuk menambah ke kolom deskripsi yang terakhir Anda sunting.</p>${VERBS.map(w=>`<button class="btn s" data-a=ins data-t="- ${w} ">${w}</button>`).join(' ')}</div>
<div class=card><h3>Rumus Pencapaian</h3>${AUT.map(w=>`<button class="btn s block" data-a=ins data-t="- ${w}">${w}</button>`).join('')}</div>
<div class=card><h3>Saran Keterampilan</h3>${Object.entries(SK).map(([g,l])=>`<b>${g}</b><div>${l.map(w=>`<button class="btn s" data-a=addsk data-t="${w}">${w}</button>`).join(' ')}</div>`).join('')}</div>`}
/* ---------- Preview ---------- */
const desc=t=>!t?'':t.split('\n').filter(x=>x.trim()).map(l=>/^\s*[-•]/.test(l)?`<li>${E(l.replace(/^\s*[-•]\s*/,''))}</li>`:`<p>${E(l)}</p>`).join('').replace(/(<li>.*?<\/li>)+/g,m=>'<ul>'+m+'</ul>');
const ct=p=>[p.email,p.phone,[p.addr,p.city].filter(Boolean).join(', '),p.linkedin,p.web,p.github].filter(Boolean).map(x=>`<span>${E(x)}</span>`).join('');
function secHTML(s){const S=SEC[s.type];if(s.hide||!s.items.length)return'';let b='';
if(S.k=='sk'){const g={};s.items.filter(i=>i.role).forEach(i=>(g[i.org||'']=g[i.org||'']||[]).push(i));b=Object.entries(g).map(([k,v])=>`<div>${k?`<b>${E(k)}:</b> `:''}${v.map(i=>`<span class=ch>${E(i.role)}${+i.lvl?`<i class=bar><u style="width:${i.lvl*20}%"></u></i>`:''}</span>`).join('')}</div>`).join('')}
else if(S.k=='ln')b=s.items.filter(i=>i.role).map(i=>`<div><b>${E(i.role)}</b>${i.org?' · '+E(i.org):''}</div>`).join('');
else b=s.items.map(i=>{const dt=[fm(i.start),i.cur?'Sekarang':fm(i.end)].filter(Boolean).join(' – '),sub=[i.org,i.loc].filter(Boolean).map(E).join(' · ');return`<div class=it><div class=ih><b>${E(i.role)}</b><span class=dt>${dt}</span></div>${sub?`<div class=sub>${sub}</div>`:''}${desc(i.desc)}</div>`}).join('');
return`<section><h2 class=st>${E(s.title||S.t)}</h2>${b}</section>`}
function pageHTML(c){const{p,d}=c,side=d.lay=='side',nm=E(p.name)||'<span class=ph>Nama Lengkap</span>';
const head=`<header class="hd ${d.hd}">${p.photo&&d.ph?`<img class=pf src="${p.photo}" alt="">`:''}<div><h1>${nm}</h1><div class=jt>${E(p.title)}</div>${side?'':`<div class=ct>${ct(p)}</div>`}</div></header>`;
const sum=!c.hs&&p.summary?`<section><h2 class=st>Ringkasan Profesional</h2><p>${E(p.summary)}</p></section>`:'',main=sum+c.secs.filter(s=>!side||SEC[s.type].k=='it').map(secHTML).join('');
const empty=!p.name&&!sum&&!c.secs.some(s=>!s.hide&&s.items.length)?'<p class=hint>Isi formulir di sebelah kiri. Pratinjau diperbarui secara langsung.</p>':'';
const body=side?`<div class=bd><aside><section><h2 class=st>Kontak</h2><div class="ct v">${ct(p)}</div></section>${c.secs.filter(s=>SEC[s.type].k!='it').map(secHTML).join('')}</aside><main>${main}</main></div>`:`<main>${main}</main>`;
return`<div class="page h-${d.h}${d.pg=='A4'?'':' L'}" style="--c:${d.c};--a:${d.a};--fs:${d.fs};--mg:${d.mg};--gap:${d.gap};--lh:${d.lh};--ps:${d.ps};font-family:${FF[d.ff]}">${head}${body}${empty}</div>`}
function prev(){const e=$('#pz');if(!e)return;e.innerHTML=pageHTML(cur);$('#pst').textContent=`@page{size:${cur.d.pg=='A4'?'A4':'letter'};margin:${cur.d.mg}mm}`;if(tab=='cek')pane()}
function fit(){const s=$('.pvs');if(!s)return;z=Math.min(1,Math.max(.3,(s.clientWidth-24)/800));zm(0)}
function zm(dz){z=Math.min(2,Math.max(.3,+(z+dz).toFixed(2)));$('#pz').style.zoom=z;$('#zl').textContent=Math.round(z*100)+'%'}
/* ---------- Actions ---------- */
function A(a,el){const i=+el.dataset.i,j=+el.dataset.j,v=+el.dataset.v,mv=(arr,k,d)=>{const n=k+d;if(n<0||n>=arr.length)return false;[arr[k],arr[n]]=[arr[n],arr[k]];return true};
switch(a){
case'new':cur=newDoc();docs.unshift(cur);save();openD();break;
case'open':cur=docs.find(x=>x.id==el.dataset.id);openD();break;
case'dup':{const o=JSON.parse(JSON.stringify(docs.find(x=>x.id==el.dataset.id)));o.id=uid();o.name+=' (Salinan)';docs.unshift(o);save();dash();toast('CV diduplikasi');break}
case'del':confirmD('Hapus CV ini secara permanen?',()=>{docs=docs.filter(x=>x.id!=el.dataset.id);save();dash()});break;
case'back':flush();save();dash();break;
case'theme':theme();break;
case'undo':flush();if(hp>0){hp--;restore()}break;
case'redo':flush();if(hp<hist.length-1){hp++;restore()}break;
case'save':flush();save();toast('CV disimpan');break;
case'print':case'pdf':flush();if(a=='pdf')toast('Pilih "Simpan sebagai PDF" pada dialog cetak');try{window.print()}catch(e){toast('Cetak tidak tersedia di jendela ini')}break;
case'exp':{const m=modal(`<h3>Export JSON</h3><textarea id=jt readonly rows=10></textarea><div class=row style="margin-top:8px"><button class=btn data-a=x>Tutup</button><button class=btn id=cp>Salin</button><button class="btn p" id=dl>Unduh .json</button></div>`);const t=$('#jt',m);t.value=JSON.stringify(cur,null,1);
$('#cp',m).onclick=()=>{t.select();try{navigator.clipboard.writeText(t.value);toast('Disalin')}catch(e){document.execCommand('copy')}};
$('#dl',m).onclick=()=>{try{const x=document.createElement('a');x.href=URL.createObjectURL(new Blob([t.value],{type:'application/json'}));x.download=(cur.name||'cv')+'.json';x.click()}catch(e){toast('Unduhan tidak tersedia, gunakan Salin')}};break}
case'imp':{const m=modal(`<h3>Import JSON</h3><input type=file id=imf accept=".json,application/json"><label>Atau tempel JSON di sini</label><textarea id=imt rows=8></textarea><div class=row style="margin-top:8px"><button class=btn data-a=x>Batal</button><button class="btn p" id=go>Impor</button></div>`);
$('#imf',m).onchange=e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=()=>$('#imt',m).value=r.result;r.readAsText(f)}};
$('#go',m).onclick=()=>{try{const o=JSON.parse($('#imt',m).value);if(!o.p||!Array.isArray(o.secs)||!o.d)throw 0;o.id=uid();o.upd=Date.now();o.d=Object.assign(tplDef(+o.d.tpl||0),o.d);docs.unshift(o);cur=o;save();m.remove();openD();toast('CV diimpor')}catch(e){toast('File JSON tidak valid')}};break}
case'zi':zm(.1);break;case'zo':zm(-.1);break;case'full':$('#pv').classList.toggle('fs');break;
case'mt':$('.main').dataset.m=el.dataset.v;if(el.dataset.v=='p')fit();break;
case'tab':setTab(el.dataset.t);break;
case'addsec':cur.secs.push(mk($('#as').value));pane();changed(true);break;
case'smv':if(mv(cur.secs,i,v)){pane();changed(true)}break;
case'shide':cur.secs[i].hide=cur.secs[i].hide?0:1;pane();changed(true);break;
case'sdel':confirmD('Hapus bagian beserta isinya?',()=>{cur.secs.splice(i,1);pane();changed(true)});break;
case'iadd':cur.secs[i].items.push({});pane();changed(true);break;
case'imv':if(mv(cur.secs[i].items,j,v)){pane();changed(true)}break;
case'idel':cur.secs[i].items.splice(j,1);pane();changed(true);break;
case'hsum':cur.hs=el.checked?0:1;changed();break;
case'phrm':delete cur.p.photo;pane();changed(true);break;
case'tpl':cur.d=tplDef(i,cur.d.pg);pane();changed(true);break;
case'rd':cur.d=tplDef(cur.d.tpl,cur.d.pg);pane();changed(true);toast('Desain direset');break;
case'gsum':{const y=+$('#g1').value,f=$('#g2').value.trim(),s=$('#g3').value.trim();cur.p.summary=`${cur.p.title||'Profesional'}${y?` dengan pengalaman ${y} tahun`:''}${f?` di bidang ${f}`:''}.${s?` Terbiasa ${s}.`:''} Berkomitmen memberikan hasil kerja yang berkualitas, bertanggung jawab, dan terus mengembangkan kompetensi untuk berkontribusi pada tujuan organisasi.`;setTab('isi');changed(true);toast('Ringkasan dibuat, silakan sunting');break}
case'ins':{const s=lastRef&&cur.secs[lastRef.si],it=s&&s.items[lastRef.ii];if(!it){toast('Klik dulu kolom deskripsi pada tab Isi');break}it.desc=(it.desc?it.desc+'\n':'')+el.dataset.t;changed(true);toast('Ditambahkan ke deskripsi');break}
case'addsk':{let s=cur.secs.find(x=>x.type=='skills');if(!s){s=mk('skills');cur.secs.push(s)}if(!s.items.some(x=>x.role==el.dataset.t))s.items.push({role:el.dataset.t,org:'',lvl:0});changed(true);toast('Keterampilan ditambahkan');break}
}}
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(el)A(el.dataset.a,el)});
document.addEventListener('input',e=>{const t=e.target;if(!cur)return;const v=t.type=='checkbox'?(t.checked?1:0):t.value;
if(t.id=='nm')cur.name=v;else if(t.dataset.b!==undefined)cur.p[t.dataset.b]=v;
else if(t.dataset.si!==undefined){const s=cur.secs[t.dataset.si];if(t.dataset.ii===undefined)s.title=v;else s.items[t.dataset.ii][t.dataset.f]=v}
else if(t.dataset.d!==undefined)cur.d[t.dataset.d]=(t.type=='range')?+v:v;else return;changed()});
document.addEventListener('focusin',e=>{const t=e.target;if(t.dataset&&t.dataset.f=='desc')lastRef={si:+t.dataset.si,ii:+t.dataset.ii}});
document.addEventListener('change',e=>{const f=e.target;if(f.id!='phf'||!f.files[0])return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,400/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);cur.p.photo=c.toDataURL('image/jpeg',.85);pane();changed(true)};im.onerror=()=>toast('Gambar tidak valid');im.src=r.result};r.readAsDataURL(f.files[0])});
document.addEventListener('keydown',e=>{if(e.key=='Escape'&&$('#pv'))$('#pv').classList.remove('fs');if(!cur||!(e.ctrlKey||e.metaKey))return;const k=e.key.toLowerCase(),m={z:'undo',y:'redo',s:'save',p:'print'}[k];if(m&&!(k=='z'&&/INPUT|TEXTAREA/.test(e.target.tagName))){e.preventDefault();A(m,{dataset:{}})}});
addEventListener('resize',()=>{if(cur&&innerWidth<=820)fit()});
dash();
