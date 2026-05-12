// ===== Password gate =====
const GATE_KEY = 'provenance-borb-gate';
const GATE_PASSWORD = 'BORB';

function checkGate() {
  if (sessionStorage.getItem(GATE_KEY) === 'ok') {
    const overlay = document.getElementById('gate-overlay');
    if (overlay) overlay.classList.add('hidden');
    return true;
  }
  return false;
}
function setupGate() {
  if (checkGate()) return;
  const form = document.getElementById('gate-form');
  const input = document.getElementById('gate-input');
  const error = document.getElementById('gate-error');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim().toUpperCase() === GATE_PASSWORD) {
      sessionStorage.setItem(GATE_KEY, 'ok');
      document.getElementById('gate-overlay').classList.add('hidden');
    } else {
      error.textContent = 'Nope.';
      input.value = '';
      input.focus();
    }
  });
  input.focus();
}
function injectGate() {
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="gate-overlay">
      <div class="brand">Provenance <span class="beta-pill proto-pill">PROTOTYPE</span></div>
      <div style="color: var(--muted); font-size: 14px;">Internal preview — enter the code</div>
      <form id="gate-form">
        <input id="gate-input" type="password" maxlength="8" autocomplete="off" placeholder="••••" />
        <button class="btn btn-primary" type="submit">Enter</button>
      </form>
      <div id="gate-error"></div>
      <div style="margin-top: 16px; font-size: 11px; color: var(--muted); max-width: 360px; text-align: center; line-height: 1.5;">
        Note: this gate only protects the static demo pages. The repo source is public.
      </div>
    </div>
  `);
  setupGate();
}

// ===== Hover provenance popover — THE demo moment =====
// Any element with data-prov="<key>" pulls its metadata from window.PROVENANCE.
// Mousemove keeps the popover near the cursor without clipping the viewport.
function setupProvenance() {
  if (!window.PROVENANCE) return;

  // Mount the popover container once.
  let pop = document.getElementById('prov-pop');
  if (!pop) {
    pop = document.createElement('div');
    pop.id = 'prov-pop';
    document.body.appendChild(pop);
  }

  const fmtTs = (iso) => {
    if (!iso) return '—';
    try {
      const d = new Date(iso);
      return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric',
                                          hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    } catch (e) { return iso; }
  };

  function render(key) {
    const data = window.PROVENANCE[key];
    if (!data) {
      pop.innerHTML = `<div class="pp-head"><span class="pp-pip"></span>provenance not found</div>
                       <div class="pp-row"><span class="pp-k">key</span><span class="pp-v"><code>${key}</code></span></div>`;
      return;
    }
    const overrideLine = data.override_history > 0
      ? `<div class="pp-row"><span class="pp-k">overrides</span><span class="pp-v">${data.override_history} on file</span></div>`
      : '';
    pop.innerHTML = `
      <div class="pp-head"><span class="pp-pip"></span>Optro Provenance v1</div>
      <div class="pp-value">${escapeHtml(data.value)}</div>
      <div class="pp-row"><span class="pp-k">Source</span><span class="pp-v">${escapeHtml(data.source)}</span></div>
      <div class="pp-row"><span class="pp-k">Captured</span><span class="pp-v">${fmtTs(data.captured_at)}</span></div>
      <div class="pp-row"><span class="pp-k">By</span><span class="pp-v">${escapeHtml(data.captured_by)}</span></div>
      <div class="pp-row"><span class="pp-k">History</span><span class="pp-v">${escapeHtml(data.last_modified)}</span></div>
      ${overrideLine}
      <div class="pp-foot"><span>chain verified</span><span class="pp-rec">${escapeHtml(data.record_id)}</span></div>
    `;
  }

  function position(ev) {
    const PAD = 12;
    const rect = pop.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    let x = ev.clientX + 16, y = ev.clientY + 18;
    if (x + rect.width + PAD > vw) x = ev.clientX - rect.width - 16;
    if (y + rect.height + PAD > vh) y = ev.clientY - rect.height - 16;
    if (x < PAD) x = PAD;
    if (y < PAD) y = PAD;
    pop.style.left = x + 'px';
    pop.style.top  = y + 'px';
  }

  let activeKey = null;
  document.addEventListener('mouseover', (ev) => {
    const el = ev.target && ev.target.closest && ev.target.closest('[data-prov]');
    if (!el) { pop.classList.remove('show'); activeKey = null; return; }
    const key = el.getAttribute('data-prov');
    if (key !== activeKey) { render(key); activeKey = key; }
    pop.classList.add('show');
    position(ev);
  });
  document.addEventListener('mousemove', (ev) => {
    if (!pop.classList.contains('show')) return;
    position(ev);
  });
  document.addEventListener('mouseout', (ev) => {
    const el = ev.target && ev.target.closest && ev.target.closest('[data-prov]');
    if (el) pop.classList.remove('show');
  });
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ===== Workpaper index filtering =====
function setupWpFilters() {
  const chips = document.querySelectorAll('.fl-chip[data-status]');
  const big4Chip = document.querySelector('.fl-chip[data-big4]');
  const search = document.querySelector('input.fl-search');
  const rows = Array.from(document.querySelectorAll('.wp-row'));
  const count = document.querySelector('.fl-count');
  let activeStatus = 'all';
  let big4Only = false;

  function refresh() {
    const q = (search && search.value || '').trim().toLowerCase();
    let visible = 0;
    rows.forEach(r => {
      const s = r.getAttribute('data-status');
      const b = r.getAttribute('data-big4') === '1';
      const id = (r.getAttribute('data-id') || '').toLowerCase();
      const name = (r.getAttribute('data-name') || '').toLowerCase();
      const matchStatus = activeStatus === 'all' || s === activeStatus;
      const matchBig4 = !big4Only || b;
      const matchQ = !q || id.includes(q) || name.includes(q);
      const ok = matchStatus && matchBig4 && matchQ;
      r.style.display = ok ? '' : 'none';
      if (ok) visible += 1;
    });
    if (count) count.textContent = `${visible} of ${rows.length}`;
  }

  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    activeStatus = c.getAttribute('data-status');
    refresh();
  }));
  if (big4Chip) big4Chip.addEventListener('click', () => {
    big4Only = !big4Only;
    big4Chip.classList.toggle('active', big4Only);
    refresh();
  });
  if (search) search.addEventListener('input', refresh);
  refresh();
}

// ===== Distribution bar chart (peer benchmark) =====
function renderPeerChart(containerId, metric) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const counts = metric.distribution_counts;
  const max = Math.max(...counts);
  // Helios falls in which bin?
  const heliosBin = pickHeliosBin(metric);
  const bars = counts.map((c, i) => {
    const h = Math.max(6, (c / max) * 100);
    const cls = i === heliosBin ? 'bar helios-band' : 'bar';
    return `<div class="${cls}" style="height: ${h}%;" title="${c} peers"></div>`;
  }).join('');
  const xs = metric.distribution_bin_labels.map(l => `<div>${escapeHtml(l)}</div>`).join('');
  // Helios marker — positioned over the relevant bar
  const pct = ((heliosBin + 0.5) / counts.length) * 100;
  el.innerHTML =
    `<div class="peer-chart" style="position:relative;">
       <div class="helios-marker" style="left: ${pct}%;">Helios ${metric.helios}</div>
       ${bars}
     </div>
     <div class="x-axis">${xs}</div>`;
}

function pickHeliosBin(metric) {
  // For numeric labels, find which bin contains the helios value.
  const labels = metric.distribution_bin_labels;
  const v = metric.helios;
  for (let i = 0; i < labels.length; i++) {
    const lab = labels[i].replace(/\s/g, '');
    if (lab.startsWith('≤')) { if (v <= parseFloat(lab.slice(1))) return i; }
    else if (lab.startsWith('<')) { if (v < parseFloat(lab.slice(1))) return i; }
    else if (lab.includes('-')) {
      const [a, b] = lab.split('-').map(parseFloat);
      if (v >= a && v <= b) return i;
    } else if (lab.endsWith('+')) {
      if (v >= parseFloat(lab.slice(0, -1))) return i;
    } else {
      // exact-match label like "1.0" "1.25" — pick nearest
      // skip — fall through
    }
  }
  // fallback — nearest bin midpoint
  let best = 0, bestDist = Infinity;
  labels.forEach((lab, i) => {
    const n = parseFloat(lab);
    if (!Number.isNaN(n)) {
      const d = Math.abs(n - v);
      if (d < bestDist) { best = i; bestDist = d; }
    }
  });
  return best;
}

// ===== Chain graph (SVG) =====
function renderChainSvg(containerId, chain) {
  const host = document.getElementById(containerId);
  if (!host) return;
  const W = 880, H = 600, CX = W / 2, CY = H / 2;
  const R_PROC = 160;     // procedures ring
  const R_ART  = 270;     // artifacts ring

  const procs = chain.nodes.filter(n => n.type === 'procedure');
  const arts  = chain.nodes.filter(n => n.type === 'artifact');
  const signs = chain.nodes.filter(n => n.type === 'signoff');

  // Compute positions for procedures (evenly spaced around the center).
  const procPos = {};
  procs.forEach((p, i) => {
    const ang = (i / procs.length) * Math.PI * 2 - Math.PI / 2;
    procPos[p.id] = { x: CX + Math.cos(ang) * R_PROC, y: CY + Math.sin(ang) * R_PROC, ang };
  });

  // Artifacts orbit their parent procedure (just outside the procedure ring).
  const artPos = {};
  // group artifacts by parent
  const byParent = {};
  arts.forEach(a => { (byParent[a.parent] = byParent[a.parent] || []).push(a); });
  Object.entries(byParent).forEach(([parentId, list]) => {
    const p = procPos[parentId];
    if (!p) return;
    list.forEach((a, i) => {
      // Spread sibling artifacts perpendicular to the radial line.
      const offset = (i - (list.length - 1) / 2) * 0.16; // radians
      const ang = p.ang + offset;
      artPos[a.id] = { x: CX + Math.cos(ang) * R_ART, y: CY + Math.sin(ang) * R_ART };
    });
  });

  const edges = [];
  procs.forEach(p => {
    const pp = procPos[p.id];
    edges.push(`<line class="edge" x1="${CX}" y1="${CY}" x2="${pp.x}" y2="${pp.y}" />`);
  });
  arts.forEach(a => {
    const pp = procPos[a.parent];
    const ap = artPos[a.id];
    if (!pp || !ap) return;
    edges.push(`<line class="edge" x1="${pp.x}" y1="${pp.y}" x2="${ap.x}" y2="${ap.y}" />`);
  });

  // Sign-off ribbon — render as labeled curved edges anchored to the center.
  const signEdges = signs.map((s, i) => {
    const ang = (i / signs.length) * (Math.PI * 0.7) + Math.PI * 0.65;
    const x2 = CX + Math.cos(ang) * 70;
    const y2 = CY + Math.sin(ang) * 70;
    return `<g>
      <line class="edge signoff" x1="${CX}" y1="${CY}" x2="${x2}" y2="${y2}" />
      <circle cx="${x2}" cy="${y2}" r="6" fill="#047857" />
    </g>`;
  }).join('');

  const procDots = procs.map(p => {
    const pp = procPos[p.id];
    return `<g>
      <circle class="node-procedure" cx="${pp.x}" cy="${pp.y}" r="22" data-prov="rc047.proc_${p.id.replace('proc_','')}" />
      <text class="lbl" x="${pp.x}" y="${pp.y + 4}" text-anchor="middle">${escapeHtml(p.id.replace('proc_', 'P'))}</text>
    </g>`;
  }).join('');

  const artDots = arts.map(a => {
    const ap = artPos[a.id];
    if (!ap) return '';
    return `<g>
      <circle class="node-artifact" cx="${ap.x}" cy="${ap.y}" r="14" data-prov="rc047.${a.id.replace(/b$/, '').replace(/_q1b$/, '_q1')}" />
      <text class="lbl-small" x="${ap.x}" y="${ap.y + 28}" text-anchor="middle">${escapeHtml(a.label)}</text>
    </g>`;
  }).join('');

  const ctr = `
    <g>
      <circle class="node-control" cx="${CX}" cy="${CY}" r="44" data-prov="rc047.defensibility" />
      <text class="lbl-ctr" x="${CX}" y="${CY + 5}" text-anchor="middle">${escapeHtml(chain.center.label)}</text>
    </g>
  `;

  host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
    ${edges.join('')}
    ${signEdges}
    ${procDots}
    ${artDots}
    ${ctr}
  </svg>`;
}

// ===== Tiny syntax highlighter (legacy, kept for option-2/3 if needed) =====
function highlight(str, lang) {
  if (lang === 'json') {
    return str
      .replace(/("[^"]*")\s*:/g, '<span class="n">$1</span>:')
      .replace(/:\s*("[^"]*")/g, ': <span class="s">$1</span>')
      .replace(/:\s*(-?\d+(?:\.\d+)?)/g, ': <span class="s">$1</span>')
      .replace(/(true|false|null)/g, '<span class="k">$1</span>');
  }
  if (lang === 'bash') {
    return str
      .replace(/^(\$ ?)/gm, '<span class="c">$1</span>')
      .replace(/(#.*)$/gm, '<span class="c">$1</span>');
  }
  return str;
}

// ===== Walkthrough cue card =====
function mountWalkCue(label, html) {
  const c = document.createElement('div');
  c.className = 'walk-cue';
  c.innerHTML = `<span class="cue-close" onclick="this.parentNode.remove()">×</span>
                 <div class="cue-label">${escapeHtml(label)}</div>
                 <div class="cue-text">${html}</div>`;
  document.body.appendChild(c);
}

window.injectGate = injectGate;
window.setupProvenance = setupProvenance;
window.setupWpFilters = setupWpFilters;
window.renderPeerChart = renderPeerChart;
window.renderChainSvg = renderChainSvg;
window.mountWalkCue = mountWalkCue;
window.highlight = highlight;
window.escapeHtml = escapeHtml;
