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
        Note: this gate only protects the static demo pages. The MCP server source is public in the repo regardless.
      </div>
    </div>
  `);
  setupGate();
}

// Tiny syntax highlighter for the code blocks
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

window.injectGate = injectGate;
window.highlight = highlight;
