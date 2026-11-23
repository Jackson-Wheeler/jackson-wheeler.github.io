/* Theme toggle and one-time scroll-in reveals. External file so production CSP stays strict. */
(function () {
  var root = document.documentElement;
  var key = 'inspiration-theme';
  var toggle = document.getElementById('theme-toggle');

  function themeNow() {
    var current = root.getAttribute('data-theme');
    if (current === 'light' || current === 'dark') return current;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem(key, theme);
      } catch (e) {}
    }
    var meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#000000' : '#f5f5f7');
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Use light appearance' : 'Use dark appearance',
      );
    }
  }

  applyTheme(themeNow(), false);

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(themeNow() === 'dark' ? 'light' : 'dark', true);
    });
  }

  var media = window.matchMedia('(prefers-color-scheme: dark)');
  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', function (event) {
      var stored = null;
      try {
        stored = localStorage.getItem(key);
      } catch (e) {}
      if (stored === 'light' || stored === 'dark') return;
      applyTheme(event.matches ? 'dark' : 'light', false);
    });
  }

  var nodes = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var view = window.innerHeight || document.documentElement.clientHeight || 800;

  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach(function (node) {
      node.classList.add('is-in');
    });
    return;
  }

  nodes.forEach(function (node) {
    var rect = node.getBoundingClientRect();
    if (rect.top < view * 0.94 && rect.bottom > 0) node.classList.add('is-in');
  });
  root.classList.add('js');

  var batch = 0;
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-in', 'd-' + (batch % 3));
        batch += 1;
        io.unobserve(el);
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
  );

  nodes.forEach(function (node) {
    if (!node.classList.contains('is-in')) io.observe(node);
  });
})();
