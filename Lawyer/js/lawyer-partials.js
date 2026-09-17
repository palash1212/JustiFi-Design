/* ============================================================
   JustiFi Advocate Portal — Bootstrap
   Loads sidebar / header / footer partials into every advocate
   page, wires the mobile drawer, applies active-link highlighting,
   and gives instant visual feedback when a sidebar link is clicked.
============================================================ */
(function () {
  'use strict';

  /* ---------- Auth guard ---------- */
  var loggedIn = localStorage.getItem('justifi_logged_in');
  if (loggedIn === null) {
    localStorage.setItem('justifi_logged_in', '1');
    loggedIn = '1';
  }
  if (loggedIn !== '1') {
    window.location.href = '../index.html';
    return;
  }

  var page = document.body.dataset.page || '';

  window.lawyerLogout = function () {
    localStorage.removeItem('justifi_logged_in');
    window.location.href = '../index.html';
  };

  /* ============================================================
     FETCH LOADER
     ============================================================ */
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
        console.error('Failed to load:', url, err);
        target.innerHTML =
          '<div class="p-3 text-xs text-red-700 bg-red-100">Failed to load ' + url + '</div>';
      });
  }

  /* ============================================================
     SIDEBAR — ACTIVE LINK HIGHLIGHTING
     ============================================================ */
  function applyActiveLinks() {
    var sidebar = document.getElementById('lawyerSidebar');
    if (!sidebar) return;

    var links = sidebar.querySelectorAll('a.s-nav-item[data-page]');
    var matched = false;

    links.forEach(function (link) {
      var isActive = link.dataset.page === page;

      // Reset state (defensive: handles SPA-like partial reloads)
      link.classList.remove('active', 'click-feedback');
      link.removeAttribute('aria-current');

      if (isActive) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        matched = true;
      }
    });

    // Fallback: if no exact data-page match found, try matching
    // against the current filename (e.g. "service-settings.html").
    if (!matched) {
      var filename = (window.location.pathname.split('/').pop() || '').toLowerCase();
      if (filename) {
        links.forEach(function (link) {
          var href = (link.getAttribute('href') || '').toLowerCase();
          if (href === filename) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          }
        });
      }
    }
  }

  /* ============================================================
     SIDEBAR — MOBILE DRAWER OPEN/CLOSE
     ============================================================ */
  function openSidebar() {
    var sidebar  = document.getElementById('lawyerSidebar');
    var backdrop = document.getElementById('sidebarBackdrop');
    if (!sidebar) return;
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('translate-x-0');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    var sidebar  = document.getElementById('lawyerSidebar');
    var backdrop = document.getElementById('sidebarBackdrop');
    if (!sidebar) return;
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('translate-x-0');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Expose globally so inline onclick="closeLawyerSidebar()" works
  window.openLawyerSidebar  = openSidebar;
  window.closeLawyerSidebar = closeSidebar;

  /* ============================================================
     DOCUMENT-LEVEL DELEGATION
     (works no matter which partial finishes loading first —
     fixes the race condition that broke the mobile hamburger)
     ============================================================ */
  document.addEventListener('click', function (e) {

    /* ----- Hamburger toggle ----- */
    var toggle = e.target.closest('#mobileSidebarToggle');
    if (toggle) {
      e.stopPropagation();
      e.preventDefault();
      var sidebarEl = document.getElementById('lawyerSidebar');
      if (!sidebarEl) return;
      var isOpen = sidebarEl.classList.contains('translate-x-0');
      if (isOpen) closeSidebar();
      else openSidebar();
      return;
    }

    /* ----- Backdrop click closes drawer ----- */
    if (e.target && e.target.id === 'sidebarBackdrop') {
      closeSidebar();
      return;
    }

    /* ----- Click outside sidebar (mobile only) closes drawer ----- */
    var sidebar = document.getElementById('lawyerSidebar');
    if (sidebar && window.innerWidth <= 768) {
      var isOpen = sidebar.classList.contains('translate-x-0');
      if (isOpen && !sidebar.contains(e.target)) {
        closeSidebar();
      }
    }

    /* ----- Sidebar link click : instant highlight + navigate ----- */
    var sidebarLink = e.target.closest('#lawyerSidebar a.s-nav-item[data-page]');
    if (sidebarLink) {
      // Remove existing active/feedback from all items
      sidebar.querySelectorAll('a.s-nav-item').forEach(function (a) {
        a.classList.remove('active', 'click-feedback');
      });
      // Instant visual feedback until the new page loads
      sidebarLink.classList.add('click-feedback');
      // On mobile, close the drawer while the new page loads
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
      // Let the browser handle navigation — do NOT preventDefault.
      return;
    }

    /* ----- Header avatar dropdown ----- */
    var avatar = e.target.closest('#headerAvatar');
    var dd = document.getElementById('headerDropdown');
    if (avatar && dd) {
      e.stopPropagation();
      dd.classList.toggle('hidden');
      return;
    }
    if (dd && !e.target.closest('#headerDropdown')) {
      dd.classList.add('hidden');
    }
  });

  /* ---------- Escape closes drawer ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });

  /* ---------- Auto-close drawer on resize to desktop ---------- */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeSidebar();
  });

  /* ============================================================
     FOOTER YEAR
     ============================================================ */
  function initFooter() {
    var y = document.getElementById('lfYear');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ============================================================
     LOAD PARTIALS
     ============================================================ */
  load('partials/lawyer-sidebar.html', 'lawyerSidebarPlaceholder', function () {
    // Apply the golden highlight as soon as the sidebar is in the DOM
    applyActiveLinks();
    // Also re-run shortly after, in case any late-arriving scripts
    // (like swipe-nav) touch the sidebar classes.
    setTimeout(applyActiveLinks, 200);
  });

  load('partials/lawyer-header.html', 'lawyerHeaderPlaceholder');
  load('partials/lawyer-footer.html', 'lawyerFooterPlaceholder', initFooter);

  /* ----- Safety net: re-apply on DOM ready ----- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyActiveLinks);
  } else {
    applyActiveLinks();
  }
})();