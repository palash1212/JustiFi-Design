/* ==========================================================
   js/partials.js — loads the shared navbar/footer/sidebar/
   bottom-nav fragments into every page and wires up the
   interactive bits (hamburger drawer, avatar dropdown,
   bottom-nav "more" popup, active-link highlighting).

   NOTE: because this uses fetch() to pull in the .html
   partials, the site must be served over http(s), e.g.:
     python -m http.server 8000
   Opening the files directly via file:// will block fetch().
========================================================== */
(function () {
  var page = document.body.dataset.page || '';
  var needsSidebar = document.body.dataset.requiresAuth === '1';

  function load(url, targetId, after) {
    var target = document.getElementById(targetId);
    if (!target) { if (after) after(); return; }
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        target.innerHTML = html;
        if (after) after();
      })
      .catch(function (err) {
        console.error('Failed to load partial:', url, err);
      });
  }

  function initNavbar() {
    // Highlight active top-level nav link
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.dataset.nav === page) a.classList.add('active');
    });

    // Hamburger drawer toggle
    var hamburger = document.getElementById('hamburgerBtn');
    var drawer = document.getElementById('mobileDrawer');
    var overlay = document.getElementById('drawerOverlay');
    if (hamburger && drawer && overlay) {
      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        drawer.classList.toggle('open');
        overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
      });
      overlay.addEventListener('click', function () {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
      });
    }

    // ---- Avatar dropdown: hover (desktop) + click (any) ----
    var avatarCircle = document.getElementById('navAvatar');
    var avatarDropdown = document.getElementById('avatarDropdown');
    if (avatarCircle && avatarDropdown) {
      // Click toggles the dropdown on any device
      avatarCircle.addEventListener('click', function (e) {
        e.stopPropagation();
        avatarDropdown.classList.toggle('show');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function (e) {
        if (!avatarCircle.contains(e.target)) {
          avatarDropdown.classList.remove('show');
        }
      });

      // Also support hover (desktop) via CSS (we keep the CSS hover rule)
      // But we also prevent hover from interfering with click toggling
      // The CSS will handle hover + .show class
    }

    applyAuthUI();
  }

  function initSidebar() {
    document.querySelectorAll('.sidebar .nav-item[data-page]').forEach(function (item) {
      item.classList.toggle('active', item.dataset.page === page);
    });
  }

  function initBottomNav() {
    document.querySelectorAll('.bottom-nav .b-item[data-page]').forEach(function (item) {
      item.classList.toggle('active', item.dataset.page === page);
    });
    var moreBtn = document.getElementById('moreBtn');
    var morePopup = document.getElementById('morePopup');
    if (moreBtn && morePopup) {
      window.toggleMorePopup = function () { morePopup.classList.toggle('open'); };
      document.addEventListener('click', function (e) {
        if (!moreBtn.contains(e.target) && !morePopup.contains(e.target)) {
          morePopup.classList.remove('open');
        }
      });
    }
    applyAuthUI();
  }

  window.toggleDrawerDropdown = function (btn) {
    btn.classList.toggle('open');
    btn.nextElementSibling.classList.toggle('open');
  };

  load('partials/navbar.html', 'navbarPlaceholder', initNavbar);
  load('partials/footer.html', 'footerPlaceholder');
  if (needsSidebar) {
    load('partials/sidebar.html', 'sidebarPlaceholder', initSidebar);
    load('partials/bottom-nav.html', 'bottomNavPlaceholder', initBottomNav);
  }
})();