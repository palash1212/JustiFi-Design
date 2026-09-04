/* ==========================================================
   js/auth.js — shared login/session state (persisted via
   localStorage so it carries across every page of the site).
   Also toggles all the "logged-in only" chrome: navbar avatar,
   sidebar/app-shell, bottom nav, mobile drawer account block.
========================================================== */
function isLoggedIn() {
  return localStorage.getItem('justifi_logged_in') === '1';
}

function login() {
  localStorage.setItem('justifi_logged_in', '1');
  window.location.href = 'dashboard.html';
}

function logout() {
  localStorage.removeItem('justifi_logged_in');
  window.location.href = 'index.html';
}

/* Applies the current login state to whatever chrome exists on
   the current page (called after partials are injected). */
function applyAuthUI() {
  var loggedIn = isLoggedIn();

  var appShell = document.getElementById('appShell');
  if (appShell) appShell.classList.toggle('logged-in', loggedIn);

  var navSignin = document.getElementById('navSignin');
  var navBell = document.getElementById('navBell');
  var navAvatar = document.getElementById('navAvatar');
  if (navSignin) navSignin.classList.toggle('hidden', loggedIn);
  if (navBell) navBell.classList.toggle('hidden', !loggedIn);
  if (navAvatar) navAvatar.classList.toggle('hidden', !loggedIn);

  var drawerSignin = document.getElementById('drawerSignin');
  var drawerLoggedin = document.getElementById('drawerLoggedin');
  if (drawerSignin) drawerSignin.classList.toggle('hidden', loggedIn);
  if (drawerLoggedin) drawerLoggedin.classList.toggle('hidden', !loggedIn);

  var bottomNav = document.getElementById('bottomNav');
  if (bottomNav) bottomNav.style.display = (loggedIn && window.innerWidth <= 768) ? 'flex' : 'none';

  // Pages meant only for logged-in users: bounce to homepage if not logged in.
  if (document.body.dataset.requiresAuth === '1' && !loggedIn) {
    window.location.href = 'index.html';
  }
}

window.addEventListener('resize', function () {
  var bottomNav = document.getElementById('bottomNav');
  if (bottomNav && isLoggedIn()) {
    bottomNav.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
  }
});
