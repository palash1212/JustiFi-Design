
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
    // inside initNavbar() after the existing code
var servicesDrop = document.querySelector('.services-drop');
if (servicesDrop) {
  var servicesLink = servicesDrop.querySelector('a');
  if (servicesLink) {
    servicesLink.addEventListener('click', function(e) {
      e.preventDefault();          // prevent hash navigation
      servicesDrop.classList.toggle('open');
    });
    // Close dropdown when clicking outside it
    document.addEventListener('click', function(e) {
      if (!servicesDrop.contains(e.target)) {
        servicesDrop.classList.remove('open');
      }
    });
  }
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
