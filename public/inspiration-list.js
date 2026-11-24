// External on purpose: the production CSP does not allow inline scripts.
(function () {
  var root = document.querySelector('[data-inspiration]');
  if (!root) return;

  var chips = Array.prototype.slice.call(root.querySelectorAll('[data-filter]'));
  var cards = Array.prototype.slice.call(root.querySelectorAll('[data-category]'));
  var status = root.querySelector('[data-status]');
  var empty = root.querySelector('[data-empty]');
  var board = root.querySelector('[data-board]');
  var labels = {
    all: 'All',
    active: 'Active',
    style: 'Style',
    travel: 'Travel & Grooming',
    home: 'Home',
  };
  var ticket = 0;

  function apply(filter) {
    var mine = ++ticket;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function commit() {
      if (mine !== ticket) return;
      var shown = 0;
      cards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.hidden = !match;
        if (match) shown += 1;
      });
      if (empty) empty.hidden = shown !== 0;
      if (status) {
        var noun = shown === 1 ? 'idea' : 'ideas';
        status.textContent =
          filter === 'all'
            ? 'All ' + shown + ' ' + noun
            : shown + ' ' + noun + ' in ' + (labels[filter] || filter);
      }
      if (board) board.classList.remove('is-dim');
    }

    if (reduce || !board) {
      commit();
      return;
    }

    board.classList.add('is-dim');
    window.setTimeout(commit, 140);
  }

  function select(chip, shouldFocus) {
    var filter = chip.getAttribute('data-filter');
    if (!filter) return;
    chips.forEach(function (candidate) {
      var on = candidate === chip;
      candidate.setAttribute('aria-checked', on ? 'true' : 'false');
      candidate.tabIndex = on ? 0 : -1;
    });
    if (shouldFocus) chip.focus();
    apply(filter);
  }

  chips.forEach(function (chip, index) {
    chip.addEventListener('click', function () {
      select(chip, false);
    });
    chip.addEventListener('keydown', function (event) {
      var key = event.key;
      if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].indexOf(key) === -1) return;
      event.preventDefault();
      var next = index;
      if (key === 'ArrowRight' || key === 'ArrowDown') next = (index + 1) % chips.length;
      else if (key === 'ArrowLeft' || key === 'ArrowUp') next = (index - 1 + chips.length) % chips.length;
      else if (key === 'Home') next = 0;
      else next = chips.length - 1;
      select(chips[next], true);
    });
  });
})();
