// JustiFi Admin — main.js (compact v3)

// ─────── SIDEBAR DATA ───────
// ─────── SIDEBAR DATA ───────
var MENU = [
  { t:'a', l:'Dashboard', f:'dashboard.html' },
  { t:'g', id:'g1', l:'Users / People', i:[
    { l:'Clients', f:'clients.html' },
    { l:'Lawyers', f:'lawyers.html', b:6 },
    { l:'Deed-Writers', f:'deed-writers.html' },
    { l:'Admin Users', f:'admin-users.html' }
  ]},
  { t:'g', id:'g2', l:'Operations', i:[
    { l:'Booking & Consultations', f:'bookings.html' },
    { l:'Affidavit Requests', f:'affidavit-requests.html', b:12 },
    { l:'Land & Property Requests', f:'land-property-requests.html', b:4 },
    { l:'Tax & Income Requests', f:'tax-income-requests.html' }
  ]},
  { t:'g', id:'g3', l:'Security & Compliance', i:[
    { l:'Security Center', f:'security-center.html' },
    { l:'Login & Active Sessions', f:'login-sessions.html' }
  ]},
  { t:'g', id:'g4', l:'Administration', i:[
    { l:'Role & Permissions', f:'roles-permissions.html' },
    { l:'Service Control Center', f:'service-control.html' },
    { l:'Transaction Monitoring', f:'transaction-monitoring.html', b:3 },
    { l:'User Privilege', f:'user-privilege.html' }
  ]},
  { t:'g', id:'g5', l:'Reports & Analytics', i:[
    { l:'Affidavit Services', f:'affidavit-services.html' },
    { l:'Land & Property Services', f:'land-property-services.html' },
    { l:'Tax & Income Services', f:'tax-income-services.html' },
    { l:'Executive Analytics', f:'executive-analytics.html' },
    { l:'Financial & Revenue Reports', f:'financial-reports.html' },
    { l:'Service & Throughput Reports', f:'throughput-reports.html' }
  ]}
];

// ─────── BUILD HTML ───────
function buildMenu() {
  var h = '<div class="h-16 flex items-center gap-2 px-6 border-b border-white/10 flex-shrink-0"><span class="font-bold text-base text-white">JustiFi <span class="text-gold">Admin</span></span></div><nav class="flex-1 px-3 py-4 overflow-y-auto text-[13.5px] space-y-1">';
  MENU.forEach(function(m) {
    if (m.t === 'a') {
      h += '<a href="' + m.f + '" data-file="' + m.f + '" class="nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium cursor-pointer"><span class="w-1.5 h-1.5 rounded-full bg-white/30 dot"></span>' + m.l + '</a>';
    } else {
      h += '<div><button onclick="toggleGroup(\'' + m.id + '\')" class="w-full flex items-center gap-2 px-3 py-2.5 text-[11px] font-bold text-white/40 tracking-wide uppercase hover:text-white/70"><svg id="chev-' + m.id + '" class="chev w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg>' + m.l + '</button><div id="' + m.id + '" class="group-body space-y-0.5 pl-2">';
      m.i.forEach(function(x) {
        var b = x.b ? '<span class="ml-auto bg-gold text-navy text-[10px] font-bold px-1.5 rounded-full">' + x.b + '</span>' : '';
        h += '<a href="' + x.f + '" data-file="' + x.f + '" class="nav-link flex items-center gap-3 px-3 py-2 rounded-lg"><span class="w-1.5 h-1.5 rounded-full bg-white/30 dot"></span>' + x.l + b + '</a>';
      });
      h += '</div></div>';
    }
  });
  h += '</nav>';
  return h;
}

// ─────── INIT SIDEBAR ───────
function initSidebar() {
  var el = document.getElementById('sidebar-mount');
  if (!el) return;
  el.innerHTML = buildMenu();
  var cur = window.location.pathname.split('/').pop() || 'dashboard.html';
  el.querySelectorAll('.nav-link').forEach(function(a) {
    if (a.dataset.file === cur) {
      a.classList.add('active');
      var g = a.closest('.group-body');
      if (g) {
        g.classList.add('open');
        var c = document.getElementById('chev-' + g.id);
        if (c) c.classList.add('open');
      }
    }
  });
}

// ─────── HELPERS ───────
function toggleGroup(id) {
  var e = document.getElementById(id), c = document.getElementById('chev-' + id);
  if (e) e.classList.toggle('open');
  if (c) c.classList.toggle('open');
}
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
document.addEventListener('click', function(e) {
  if (e.target.classList && e.target.classList.contains('modal-backdrop')) e.target.classList.remove('open');
});

function showToast(msg, type) {
  var c = document.getElementById('toast-c');
  if (!c) { c = document.createElement('div'); c.id = 'toast-c'; c.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;'; document.body.appendChild(c); }
  var colors = { success:'#059669', error:'#DC2626', warning:'#D97706', info:'#1A2B3C' };
  var t = document.createElement('div');
  t.style.cssText = 'background:' + (colors[type]||colors.info) + ';color:#fff;padding:12px 18px;border-radius:10px;font-size:13px;font-weight:500;box-shadow:0 10px 25px rgba(0,0,0,0.15);';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(function() { t.remove(); }, 3000);
}

function statusBadge(s) {
  var tones = {
    'Active':'green','Completed':'green','Confirmed':'green','Successful':'green',
    'Verified':'gold','Pending':'gold','In Progress':'gold','Under Review':'gold','Processing':'gold',
    'Failed':'red','Blocked':'red','Suspended':'red','Disputed':'red','Rejected':'red','Inactive':'slate'
  };
  var t = tones[s] || 'slate';
  var bg = { green:'#ECFDF5', red:'#FEF2F2', gold:'#FBF6ED', slate:'#F1F5F9' }[t];
  var txt = { green:'#047857', red:'#B91C1C', gold:'#C5A059', slate:'#64748B' }[t];
  var dot = { green:'#10B981', red:'#EF4444', gold:'#C5A059', slate:'#94A3B8' }[t];
  return '<span style="display:inline-flex;align-items:center;gap:6px;background:' + bg + ';color:' + txt + ';font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px;"><span style="width:6px;height:6px;border-radius:999px;background:' + dot + ';display:inline-block;"></span>' + s + '</span>';
}

function renderTable(tbodyId, rows, builder) {
  var tb = document.getElementById(tbodyId);
  if (!tb) return;
  tb.innerHTML = (!rows || !rows.length) ? '<tr><td colspan="10" style="text-align:center;padding:24px;color:#64748B;">No results</td></tr>' : rows.map(builder).join('');
}

function match(text, q) { return !q || text.toLowerCase().includes(q.toLowerCase()); }

function progressBar(p) {
  return '<div style="display:flex;align-items:center;gap:8px;"><div style="width:100px;height:6px;background:#F1F5F9;border-radius:4px;overflow:hidden;"><div style="width:' + p + '%;height:100%;background:#C5A059;border-radius:4px;"></div></div><span style="font-size:11px;color:#64748B;">' + p + '%</span></div>';
}

// ─────── AUTO RUN ───────
document.addEventListener('DOMContentLoaded', initSidebar);
console.log('main.js v3 loaded ✓');