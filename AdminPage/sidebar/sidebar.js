function toggleGroup(id) {
  const el = document.getElementById(id);
  const chev = document.getElementById('chev-' + id);
  if (el) el.classList.toggle('open');
  if (chev) chev.classList.toggle('open');
}
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

document.addEventListener('click', (e) => {
  if (e.target.classList?.contains('modal-backdrop')) e.target.classList.remove('open');
});

function initSidebar() {
  const mount = document.getElementById('sidebar-mount');
  if (!mount) return;
  fetch('sidebar/sidebar.html')
    .then(res => { if (!res.ok) throw new Error('fail'); return res.text(); })
    .then(html => {
      mount.innerHTML = html;
      const current = window.location.pathname.split('/').pop() || 'dashboard.html';
      mount.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.file === current) {
          link.classList.add('active');
          const group = link.closest('.group-body');
          if (group) {
            group.classList.add('open');
            const chev = document.getElementById('chev-' + group.id);
            if (chev) chev.classList.add('open');
          }
        }
      });
    })
    .catch(() => {
      mount.innerHTML = `<div class="p-4 text-xs text-white/70 leading-relaxed">
        ⚠️ Sidebar could not load. Please run through a local server (Live Server).</div>`;
    });
}
document.addEventListener('DOMContentLoaded', initSidebar);