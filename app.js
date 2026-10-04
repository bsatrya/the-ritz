
const $ = id => document.getElementById(id);
const todayISO = () => new Date().toISOString().slice(0,10);
const fmtDateID = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
};
let data = {}; // {date: { kav: {LG:[], LT1:[], LT2:[], RENCANA:[], noJob:false}}}

function load(){
  const raw = localStorage.getItem('ritz-data');
  if(raw) data = JSON.parse(raw);
  $('tanggal').value = todayISO();
  render();
}
function save(){ localStorage.setItem('ritz-data', JSON.stringify(data)); render(); }
function getDay(){ const d=$('tanggal').value||todayISO(); if(!data[d]) data[d]={}; return data[d]; }

$('kavling').addEventListener('change', e=>{
  $('customKav').classList.toggle('hidden', e.target.value!=='Custom');
});
$('btnTambah').onclick = ()=>{
  let kav = $('kavling').value;
  if(kav==='Custom') kav = $('customKav').value.trim()||'Custom';
  const lantai = $('lantai').value;
  const pek = $('pekerjaan').value.trim();
  if(!pek) return alert('Isi pekerjaan dulu');
  const day = getDay();
  if(!day[kav]) day[kav]={LG:[],LT1:[],LT2:[],RENCANA:[],noJob:false};
  day[kav].noJob=false;
  day[kav][lantai].push(pek);
  $('pekerjaan').value='';
  save();
};
$('btnNoJob').onclick = ()=>{
  let kav = $('kavling').value;
  if(kav==='Custom') kav = $('customKav').value.trim()||'Custom';
  const day=getDay();
  day[kav]={LG:[],LT1:[],LT2:[],RENCANA:[],noJob:true};
  save();
};
$('tanggal').addEventListener('change', render);
$('btnReset').onclick = ()=>{
  if(!confirm('Reset laporan hari ini?')) return;
  const d=$('tanggal').value; delete data[d]; save();
};

function buildText(){
  const proj = $('projectName').value||'THE RITZ Puncak Dieng';
  const iso = $('tanggal').value||todayISO();
  const day = data[iso]||{};
  const keys = Object.keys(day).sort();
  let out = `LAPORAN PROGRES LAPANGAN\n${proj.toUpperCase()}\n\n📅 Tanggal: ${fmtDateID(iso)}\n📍 Project: ${proj}\n`;
  if(keys.length===0) out+='\n(Belum ada data)';
  keys.forEach(kav=>{
    const v=day[kav];
    out+=`\n🏠 Area/Unit: ${kav}\n`;
    if(v.noJob){ out+='\nno job\n'; return; }
    out+='\n1. PEKERJAAN HARI INI\n';
    if(v.LG.length) out+=`- LG (${v.LG.join(', ')})\n`;
    if(v.LT1.length) out+=`- LT.1 (${v.LT1.join(', ')})\n`;
    if(v.LT2.length) out+=`- LT.2 (${v.LT2.join(', ')})\n`;
    if(v.RENCANA.length){ out+='\n2. RENCANA PEKERJAAN BESOK\n'; v.RENCANA.forEach(r=> out+=`- ${r}\n`); }
  });
  return out;
}

function render(){
  const iso=$('tanggal').value||todayISO();
  const day=data[iso]||{};
  const list=$('listLaporan');
  const keys=Object.keys(day).sort();
  if(keys.length===0){ list.innerHTML='<p class=text-slate-400>Belum ada laporan hari ini. Tambah di atas.</p>'; }
  else{
    list.innerHTML=keys.map(k=>{
      const v=day[k];
      if(v.noJob) return `<div class="border rounded-lg p-3 flex justify-between"><span>${k}</span><span class="text-xs bg-slate-100 px-2 py-1 rounded">no job</span></div>`;
      const all=[...v.LG.map(t=>`LG: ${t}`),...v.LT1.map(t=>`LT1: ${t}`),...v.LT2.map(t=>`LT2: ${t}`),...v.RENCANA.map(t=>`Rencana: ${t}`)].join('<br>');
      return `<div class="border rounded-lg p-3"><div class="font-semibold flex justify-between">${k} <button onclick="delKav('${k}')" class="text-xs text-red-400">hapus</button></div><div class="mt-1 text-slate-600">${all||'<span class=text-slate-400>kosong</span>'}</div></div>`;
    }).join('');
  }
  $('preview').textContent=buildText();
}
window.delKav=(k)=>{
  const iso=$('tanggal').value; if(data[iso]){ delete data[iso][k]; save(); }
};
$('btnCopy').onclick=()=>{ navigator.clipboard.writeText(buildText()).then(()=>alert('Tersalin!')); };
$('btnWAPagi').onclick=()=>{ const t=encodeURIComponent(buildText()); window.open(`https://wa.me/?text=${t}`,'_blank'); };
$('btnWASore').onclick=()=>{ const t=encodeURIComponent(buildText()); window.open(`https://wa.me/?text=${t}`,'_blank'); };

function addTemplate(txt){ const el=$('pekerjaan'); if(!el.value) el.value=txt; else el.value += ' + ' + txt; el.focus(); } window.addTemplate=addTemplate; load();
