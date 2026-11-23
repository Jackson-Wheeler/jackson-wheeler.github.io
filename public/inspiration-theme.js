/* Apply the saved or system appearance before first paint. */
(function () {
  var theme = 'light';
  try {
    var stored = localStorage.getItem('inspiration-theme');
    if (stored === 'light' || stored === 'dark') theme = stored;
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', theme);
  var meta = document.getElementById('theme-color');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#000000' : '#f5f5f7');
})();
