(function () {
  function readList(params, key) {
    return new Set(params.getAll(key).filter(Boolean));
  }

  function dateMatches(date, from) {
    if (!from) return true;
    return date === from || date.indexOf(from + '-') === 0;
  }

  function selected(root) {
    var params = new URLSearchParams(location.search);
    var from = params.get('from') || '';
    if (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(from)) from = '';
    return {
      from: from,
      branch: readList(params, 'branch'),
      topic: readList(params, 'topic'),
    };
  }

  function writeUrl(state) {
    var params = new URLSearchParams();
    if (state.from) params.set('from', state.from);
    state.branch.forEach(function (value) { params.append('branch', value); });
    state.topic.forEach(function (value) { params.append('topic', value); });
    var query = params.toString();
    var next = location.pathname + (query ? '?' + query : '') + location.hash;
    if (next !== location.pathname + location.search + location.hash) {
      history.pushState(null, '', next);
    }
  }

  function syncSelects(root, from) {
    var year = root.querySelector('[data-part="year"]');
    var month = root.querySelector('[data-part="month"]');
    var day = root.querySelector('[data-part="day"]');
    var yearValue = from.slice(0, 4);
    var monthValue = from.length >= 7 ? from.slice(0, 7) : '';
    var dayValue = from.length === 10 ? from : '';
    if (year) year.value = yearValue;
    if (month) {
      Array.prototype.forEach.call(month.options, function (option) {
        if (!option.value) return;
        option.disabled = !!yearValue && option.getAttribute('data-year') !== yearValue;
      });
      month.value = monthValue;
    }
    if (day) {
      Array.prototype.forEach.call(day.options, function (option) {
        if (!option.value) return;
        option.disabled = !!monthValue && option.getAttribute('data-month') !== monthValue;
      });
      day.value = dayValue;
    }
  }

  function apply(root) {
    var state = selected(root);
    syncSelects(root, state.from);
    root.querySelectorAll('button[data-dim="branch"]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(state.branch.has(button.getAttribute('data-value'))));
    });
    root.querySelectorAll('button[data-dim="topic"]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(state.topic.has(button.getAttribute('data-value'))));
    });
    var topicLabel = root.querySelector('[data-topic-label]');
    if (topicLabel) {
      topicLabel.textContent = state.topic.size ? 'Topics · ' + state.topic.size : 'Topics';
    }
    var shown = 0;
    root.querySelectorAll('.action').forEach(function (item) {
      var topics = (item.getAttribute('data-topics') || '').split(' ').filter(Boolean);
      var branchOk = state.branch.size === 0 || state.branch.has(item.getAttribute('data-branch') || '');
      var topicOk = state.topic.size === 0 || topics.some(function (topic) { return state.topic.has(topic); });
      var visible = dateMatches(item.getAttribute('data-date') || '', state.from) && branchOk && topicOk;
      item.hidden = !visible;
      if (visible) shown += 1;
    });
    root.querySelectorAll('.day').forEach(function (day) {
      day.hidden = !day.querySelector('.action:not([hidden])');
    });
    root.querySelectorAll('.month').forEach(function (month) {
      var counts = { executive: 0, legislative: 0, judicial: 0 };
      month.querySelectorAll('.action:not([hidden])').forEach(function (item) {
        var branch = item.getAttribute('data-branch');
        if (counts[branch] !== undefined) counts[branch] += 1;
      });
      month.querySelectorAll('[data-total]').forEach(function (node) {
        var branch = node.getAttribute('data-total');
        var n = node.querySelector('[data-n]');
        if (n) n.textContent = String(counts[branch] || 0);
        node.hidden = !counts[branch];
      });
      month.hidden = !month.querySelector('.day:not([hidden])');
    });
    var count = root.querySelector('[data-count]');
    if (count) count.textContent = shown === 1 ? '1 action' : shown + ' actions';
    var empty = root.querySelector('[data-empty]');
    if (empty) empty.hidden = shown !== 0;
    var names = [];
    if (state.from) names.push(state.from);
    state.branch.forEach(function (value) { names.push(value); });
    state.topic.forEach(function (value) { names.push(value); });
    var emptyText = root.querySelector('[data-empty-text]');
    if (emptyText) {
      emptyText.textContent = names.length ? 'No actions match ' + names.join(', ') + '.' : 'No actions match.';
    }
  }

  function currentState(root) {
    return selected(root);
  }

  function setFrom(root, from) {
    var state = currentState(root);
    state.from = from;
    writeUrl(state);
    apply(root);
  }

  function toggle(root, dim, value) {
    var state = currentState(root);
    if (state[dim].has(value)) state[dim].delete(value);
    else state[dim].add(value);
    writeUrl(state);
    apply(root);
  }

  function revealHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'DETAILS') el.open = true;
    var scroll = function () {
      var top = el.getBoundingClientRect().top + window.scrollY - 104;
      window.scrollTo(0, Math.max(0, top));
    };
    scroll();
    requestAnimationFrame(scroll);
  }

  function bind(root) {
    root.addEventListener('change', function (event) {
      var part = event.target.getAttribute && event.target.getAttribute('data-part');
      if (!part) return;
      var value = event.target.value || '';
      var year = root.querySelector('[data-part="year"]').value || '';
      var month = root.querySelector('[data-part="month"]').value || '';
      if (part === 'year') setFrom(root, value);
      if (part === 'month') setFrom(root, value || year);
      if (part === 'day') setFrom(root, value || month || year);
    });
    root.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-dim]');
      if (button && root.contains(button)) {
        event.preventDefault();
        toggle(root, button.getAttribute('data-dim'), button.getAttribute('data-value') || '');
        return;
      }
      if (event.target.closest('[data-reset]')) {
        event.preventDefault();
        history.pushState(null, '', location.pathname + location.hash);
        apply(root);
      }
    });
    apply(root);
    revealHash();
  }

  document.querySelectorAll('[data-ledger]').forEach(bind);
  window.addEventListener('popstate', function () {
    document.querySelectorAll('[data-ledger]').forEach(apply);
    revealHash();
  });
  window.addEventListener('hashchange', revealHash);
})();
