// Tabs and project-to-skill highlighting for jazminricks.com
(function () {
  var NAMES = {
    rd: 'Research Design', da: 'Data Analytics', pe: 'Program Evaluation', gd: 'Grant Development',
    gis: 'Spatial Analysis and GIS', pg: 'Participatory Governance', fac: 'Facilitation', ce: 'Stakeholder Engagement',
    surv: 'Survival analysis', ts: 'Longitudinal models', desc: 'Descriptive analysis', r: 'R',
    int: 'Stakeholder interviews', nv: 'NVivo coding', svy: 'Survey design', mcda: 'Multi criteria decision analysis',
    dash: 'ArcGIS dashboards', rub: 'Scoring rubrics and procurement', cur: 'Curriculum design'
  };
  // Which skills each project card highlights (edit freely)
  var PROJECTS = {
    p1: ['pg', 'gd', 'fac', 'ce', 'rub'],
    p2: ['gis', 'da', 'rd', 'dash', 'desc'],
    p3: ['gd', 'rd', 'gis', 'da', 'mcda', 'dash'],
    p4: ['rd', 'da', 'fac', 'ce', 'svy', 'mcda'],
    p5: ['rd', 'pg', 'ce', 'int', 'nv'],
    p6: ['pe', 'da', 'ce', 'svy', 'cur'],
    p7: ['rd', 'da', 'ce', 'svy', 'desc'],
    p8: ['gd', 'rd', 'pg', 'ce', 'int'],
    p9: ['fac', 'ce', 'cur'],
    p10: ['pe', 'rd', 'svy', 'da', 'ce']
  };
  var TABS = ['about', 'experience', 'portfolio', 'resources', 'recognition'];
  var tabs = document.querySelectorAll('.tab[data-tab]');
  var panels = document.querySelectorAll('.panel[data-panel]');
  var cards = document.querySelectorAll('.card[data-project]');
  var cardGrid = document.querySelector('.cards');
  var skills = document.querySelectorAll('[data-skill]');

  document.querySelectorAll('.skills-used').forEach(function (el) {
    el.querySelector('.skills-list').textContent = PROJECTS[el.dataset.used].map(function (k) { return NAMES[k]; }).join(', ');
  });

  function select(id) {
    if (id && currentSkill) { currentSkill = null; cards.forEach(function (c) { c.classList.remove('is-match'); }); if (cardGrid) cardGrid.classList.remove('has-match'); }
    var on = id ? PROJECTS[id] : null;
    skills.forEach(function (el) {
      var hit = !!on && on.indexOf(el.dataset.skill) >= 0;
      el.classList.toggle('is-lit', hit);
      el.classList.toggle('is-dim', !!on && !hit);
    });
    cards.forEach(function (c) {
      var a = c.dataset.project === id;
      c.classList.toggle('is-active', a);
      c.setAttribute('aria-pressed', a ? 'true' : 'false');
      c.querySelector('.skills-used').hidden = !a;
    });
    if (cardGrid) cardGrid.classList.toggle('has-active', !!id);
    current = id;
  }
  var current = null;
  var currentSkill = null;
  cards.forEach(function (c) {
    c.addEventListener('click', function () { select(current === c.dataset.project ? null : c.dataset.project); });
  });

  // Select a skill to see the projects that use it
  function pickSkill(key) {
    select(null);
    if (currentSkill === key) key = null;
    currentSkill = key;
    skills.forEach(function (el) {
      var hit = !!key && el.dataset.skill === key;
      el.classList.toggle('is-lit', hit);
      el.classList.toggle('is-dim', !!key && !hit);
      el.setAttribute('aria-pressed', hit ? 'true' : 'false');
    });
    cards.forEach(function (c) {
      var uses = !!key && PROJECTS[c.dataset.project].indexOf(key) >= 0;
      c.classList.toggle('is-match', uses);
    });
    if (cardGrid) cardGrid.classList.toggle('has-match', !!key);
  }
  document.querySelectorAll('[data-panel="portfolio"] [data-skill]').forEach(function (el) {
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-pressed', 'false');
    el.classList.add('is-pickable');
    el.addEventListener('click', function () { pickSkill(el.dataset.skill); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickSkill(el.dataset.skill); }
    });
  });

  function show(name, push) {
    if (TABS.indexOf(name) < 0) name = 'about';
    panels.forEach(function (p) { p.hidden = p.dataset.panel !== name; });
    tabs.forEach(function (t) { t.setAttribute('aria-selected', t.dataset.tab === name ? 'true' : 'false'); });
    currentSkill = 'x'; pickSkill('x');
    if (push) history.replaceState(null, '', '#' + name);
    window.scrollTo(0, 0);
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.dataset.tab, true); }); });
  document.querySelectorAll('[data-tab-link]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); show(a.dataset.tabLink, true); });
  });
  show((location.hash || '#about').slice(1), false);
})();
