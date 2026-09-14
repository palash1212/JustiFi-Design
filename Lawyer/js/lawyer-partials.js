/* ============================================================
   JustiFi — Advocate Portal bootstrap
   Loads sidebar + header + footer, wires up interactions.
============================================================ */
(function () {
  // --- Dev-friendly auth check (redirect only if explicitly signed out) ---
  var loggedIn = localStorage.getItem('justifi_logged_in');
  var isDev = localStorage.getItem('justifi_dev_mode') === '1';

  // If neither flag is set, auto-enable dev mode so pages just work
  if (loggedIn === null && !isDev) {
    localStorage.setItem('justifi_logged_in', '1');
    loggedIn = '1';
  }

  if (loggedIn !== '1' && !isDev) {
    window.location.href = '../index.html';
    return;
  }

  var page = document.body.dataset.page || '';

  window.lawyerLogout = function () {
    localStorage.removeItem('justifi_logged_in');
    window.location.href = '../index.html';
  };

  // --- Partial loader ---
  function load(url, targetId, after) {
    var target = document.getElementById(targetId);
    if (!target) { if (after) after(); return; }
    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        if (after) after();
      })
      .catch(function (err) {
        console.error('Failed to load partial:', url, err);
        // Show a small inline fallback so it's visible something failed
        target.innerHTML = '<div style="padding:12px;font-size:12px;color:#b91c1c;background:#fee2e2;">Failed to load ' + url + ' — ' + err.message + '</div>';
      });
  }

  // --- Sidebar init ---
  function initSidebar() {
    document.querySelectorAll('.lawyer-sidebar .s-nav-item[data-page]').forEach(function (item) {
      item.classList.toggle('active', item.dataset.page === page);
    });

    var toggle = document.getElementById('mobileSidebarToggle');
    var sidebar = document.getElementById('lawyerSidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        sidebar.classList.toggle('open');
      });
      document.addEventListener('click', function (e) {
        if (sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !toggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      });
    }
  }

  // --- Header init ---
  function initHeader() {
    var h1 = document.getElementById('headerGreetTitle');
    var p  = document.getElementById('headerGreetSub');
    if (h1 && document.body.dataset.headerTitle) h1.textContent = document.body.dataset.headerTitle;
    if (p && document.body.dataset.headerSubtitle) p.textContent = document.body.dataset.headerSubtitle;

    var avatar = document.getElementById('headerAvatar');
    var dd     = document.getElementById('headerDropdown');
    if (avatar && dd) {
      avatar.addEventListener('click', function (e) {
        e.stopPropagation();
        dd.classList.toggle('show');
      });
      document.addEventListener('click', function () {
        dd.classList.remove('show');
      });
    }
  }

  // --- Footer init (fill year) ---
  function initFooter() {
    var y = document.getElementById('lfYear');
    if (y) y.textContent = new Date().getFullYear();
  }

  // --- Load partials ---
  load('partials/lawyer-sidebar.html', 'lawyerSidebarPlaceholder', initSidebar);
  load('partials/lawyer-header.html',  'lawyerHeaderPlaceholder',  initHeader);
  load('partials/lawyer-footer.html',  'lawyerFooterPlaceholder',  initFooter);
})();