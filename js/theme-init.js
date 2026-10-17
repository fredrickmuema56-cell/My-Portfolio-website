/* Theme bootstrap. Loaded synchronously in <head> so the first paint already
   uses the chosen theme. Default is DARK; the visitor's choice is remembered
   in this browser (localStorage key "site-theme"). */
(function () {
  var theme = 'dark';
  try {
    if (localStorage.getItem('site-theme') === 'light') theme = 'light';
  } catch (e) { /* storage blocked: fall back to the dark default */ }
  document.documentElement.dataset.theme = theme;
  var darkSheet = document.getElementById('dark-theme');
  if (darkSheet) darkSheet.disabled = theme === 'light';
})();
