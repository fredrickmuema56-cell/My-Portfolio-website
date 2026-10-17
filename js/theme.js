/* Light / dark mode switch. Adds an icon button to the site header.
   Dark mode shows a sun (click = go light); light mode shows a moon (click = go dark).
   Switching saves the choice and reloads the page, because the dark star field
   and the light 3D orb are started once per page load. */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  var isLight = document.documentElement.dataset.theme === 'light';
  var label = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'theme-toggle';
  btn.id = 'theme-toggle';
  btn.setAttribute('aria-label', label);
  btn.setAttribute('title', label);
  btn.innerHTML = isLight ? MOON : SUN;

  btn.addEventListener('click', function () {
    var next = isLight ? 'dark' : 'light';
    try { localStorage.setItem('site-theme', next); } catch (e) { /* not saved; page still switches for this load */ }
    location.reload();
  });

  header.insertBefore(btn, header.querySelector('.mobile-menu-toggle'));
})();
