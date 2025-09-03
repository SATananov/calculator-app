// ====== СЪСТОЯНИЕ ======
const display = document.getElementById('display');
const historyEl = document.getElementById('history');
const keys = document.querySelector('.calc');
const logEl = document.getElementById('log');
const themeToggle = document.getElementById('themeToggle');

let current = '0';
let prev = null;
let op = null;
let justEvaluated = false;
const log = []; // история (низове), пазим до 10

// ====== ТЕМА ======
(function initTheme() {
  const saved = localStorage.getItem('tanashi_theme') || 'dark';
  if (saved === 'light') document.documentElement.classList.add('light');
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('tanashi_theme',
      document.documentElement.classList.contains('light') ? 'light' : 'dark');
  });
})();

// ====== ПОМОЩНИ ======
const fmt = n => {
  const num = Number(n);
  if (!Number.isFinite(num)) return 'NaN';
  // махаме излишни нули
  return String(+num.toFixed(12)).replace(/\.?0+$/,'').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

function updateScreen() {
  display.textContent = current;
  historyEl.textContent = prev !== null && op ? `${fmt(prev)} ${op}` : '';
}

function pushLog(entry) {
  log.unshift(entry);
  while (log.length > 10) log.pop();
  logEl.innerHTML = log.map(item => `<li>${item}</li>`).join('');
}

function inputDigit(d) {
  if (justEvaluated) { current = '0'; justEvaluated = false; }
  if (current === '0' && d !== '.') current = d;
  else current += d;
}

function inputDot() {
  if (justEvaluated) { current = '0'; justEvaluated = false; }
  if (!current.includes('.')) current += '.';
}

function setOp(nextOp) {
  if (op && prev !== null) {
    compute();
  } else {
    prev = Number(current);
    current = '0';
  }
  op = nextOp;
}

function percent(value) {
  if (prev !== null && op) return prev * (Number(value) / 100);
  return Number(value) / 100;
}

function compute() {
  const a = prev ?? 0;
  let b = Number(current);
  if (op === '%') b = percent(current);

  let res = a;
  switch (op) {
    case '+': res = a + b; break;
    case '−': res = a - b; break;
    case '×': res = a * b; break;
    case '÷': res = b === 0 ? NaN : a / b; break;
    case '%': res = a + b; break; // a + a*(b/100)
  }
  pushLog(`${fmt(a)} ${op} ${fmt(op === '%' ? (Number(current)) + '%' : b)} = ${fmt(res)}`);
  prev = null; op = null;
  current = Number.isFinite(res) ? String(+res.toFixed(12)).replace(/\.?0+$/,'') : 'NaN';
  justEvaluated = true;
}

function clearAll() {
  current = '0'; prev = null; op = null; justEvaluated = false; updateScreen();
}

function delOne() {
  if (justEvaluated) { clearAll(); return; }
  if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) current = '0';
  else current = current.slice(0, -1);
}

// ====== НАУЧНИ ФУНКЦИИ ======
function fn_sqrt() {
  const x = Number(current);
  const res = x < 0 ? NaN : Math.sqrt(x);
  pushLog(`√(${fmt(x)}) = ${fmt(res)}`);
  current = String(res); justEvaluated = true; updateScreen();
}
function fn_square() {
  const x = Number(current), res = x * x;
  pushLog(`${fmt(x)}² = ${fmt(res)}`);
  current = String(res); justEvaluated = true; updateScreen();
}
function fn_inv() {
  const x = Number(current), res = x === 0 ? NaN : 1 / x;
  pushLog(`1/(${fmt(x)}) = ${fmt(res)}`);
  current = String(res); justEvaluated = true; updateScreen();
}
function fn_neg() {
  if (current === '0') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  updateScreen();
}

// ====== СЪБИТИЯ (бутон/клавиатура) ======
keys.addEventListener('click', (e) => {
  const t = e.target;
  if (t.dataset.num) { inputDigit(t.dataset.num); updateScreen(); return; }
  if (t.dataset.dot !== undefined) { inputDot(); updateScreen(); return; }
  if (t.dataset.op) { setOp(t.dataset.op); updateScreen(); return; }
  if (t.dataset.action === 'eq') { if (op) compute(); updateScreen(); return; }
  if (t.dataset.action === 'clear') { clearAll(); return; }
  if (t.dataset.action === 'del') { delOne(); updateScreen(); return; }
  if (t.dataset.fn) {
    ({ sqrt: fn_sqrt, square: fn_square, inv: fn_inv, neg: fn_neg }[t.dataset.fn])?.();
    return;
  }
});

window.addEventListener('keydown', (e) => {
  const k = e.key;
  if (/\d/.test(k)) { inputDigit(k); }
  else if (k === '.' || k === ',') { inputDot(); }
  else if (k === '+') { setOp('+'); }
  else if (k === '-') { setOp('−'); }
  else if (k === '*') { setOp('×'); }
  else if (k === '/') { setOp('÷'); }
  else if (k === '%') { setOp('%'); }
  else if (k === 'Enter' || k === '=') { if (op) compute(); }
  else if (k === 'Backspace') { delOne(); }
  else if (k === 'Escape') { clearAll(); }
  else if (k.toLowerCase() === 'r') { fn_sqrt(); }
  else if (k.toLowerCase() === 'q') { fn_square(); }
  else if (k.toLowerCase() === 'i') { fn_inv(); }
  else if (k.toLowerCase() === 'p') { fn_neg(); }
  else if (k.toLowerCase() === 't') { themeToggle.click(); }
  updateScreen();
});

updateScreen();

