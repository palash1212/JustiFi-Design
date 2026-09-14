/* ============================================================
   JustiFi Advocate Portal — Swipe Navigation
============================================================ */
(function () {
  var PAGES = [
    'lawyer-dashboard.html',
    'consultancy-requests.html',
    'consultancy-history.html'
  ];

  var current = PAGES.indexOf(window.location.pathname.split('/').pop());
  if (current === -1) return;

  var shell = document.querySelector('.lawyer-shell');
  if (!shell) return;

  var THRESHOLD = 80;
  var AXIS_LOCK = 12;
  var startX = 0, startY = 0;
  var tracking = false, lockedHoriz = false;

  function shouldIgnore(target) {
    if (!target || !target.closest) return false;
    if (target.closest('.lp-modal-overlay')) return true;
    if (target.closest('input, textarea, select')) return true;
    if (target.closest('.overflow-x-auto')) return true;
    if (target.closest('.slot-time-field')) return true;
    return false;
  }

  document.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    if (shouldIgnore(e.target)) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    tracking = true;
    lockedHoriz = false;
    shell.style.transition = 'none';
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    if (!tracking) return;
    var dx = e.touches[0].clientX - startX;
    var dy = e.touches[0].clientY - startY;

    if (!lockedHoriz) {
      if (Math.abs(dx) > AXIS_LOCK && Math.abs(dx) > Math.abs(dy)) {
        lockedHoriz = true;
      } else if (Math.abs(dy) > AXIS_LOCK) {
        tracking = false;
        return;
      }
    }

    if (lockedHoriz) {
      var resist = 1;
      if ((current === 0 && dx > 0) || (current === PAGES.length - 1 && dx < 0)) {
        resist = 0.35;
      }
      shell.style.transform = 'translateX(' + (dx * resist) + 'px)';
    }
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (!tracking) return;
    tracking = false;

    var endX = e.changedTouches[0] ? e.changedTouches[0].clientX : startX;
    var dx = endX - startX;
    shell.style.transition = 'transform 0.24s cubic-bezier(0.4, 0, 0.2, 1)';

    if (lockedHoriz) {
      if (dx < -THRESHOLD && current < PAGES.length - 1) {
        shell.style.transform = 'translateX(-35%)';
        setTimeout(function () { window.location.href = PAGES[current + 1]; }, 170);
      } else if (dx > THRESHOLD && current > 0) {
        shell.style.transform = 'translateX(35%)';
        setTimeout(function () { window.location.href = PAGES[current - 1]; }, 170);
      } else {
        shell.style.transform = '';
      }
    }
    lockedHoriz = false;
  }, { passive: true });
})();