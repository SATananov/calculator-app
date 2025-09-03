// Calculator without eval – standard two-operand logic with operator precedence on equals
const display = document.getElementById('display');
const historyEl = document.getElementById('history');
const keys = document.querySelector('.keys');

let current = '0';     // текущо въведено число (стринг)
let prev = null;       // предишен операнд (число)
let op = null;         // текуща операция: + − × ÷ %
let justEvaluated = false;

const fmt = n => {
  // форматиране без загуба на десетични, ограничаваме до 12 знака
  const s = Number(n).toString();
  const [int, dec] = s.split('.');
  const intFmt = Number(int).toLocaleString('bg-BG');
  return dec ? `${intFmt}.${dec.slice(0,10)}` : intFmt;
};

function updateScreen() {
  display.textContent = current;
  historyEl.textContent = prev !== null && op ? `${fmt(prev)} ${op}` : '';
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
    // ако сменяме оператора преди equals, изчисляваме междинно
    compute();
  } else {
    prev = Number(current);
  }
  op = nextOp;
  current = '0';
}

function percent(value) {
  // стандартно поведение: a % b = a * (b/100)
  if (prev !== null && op) return prev * (Number(value) / 100);
  // ако няма предишен – просто процент от 1
  return Number(value) / 100;
}

function compute() {
  const a = prev ?? 0;
  let b = Number(current);

  if (op === '%') b = percent(current); // процент спрямо prev

  let res = a;
  switch (op) {
    case '+': res = a + b; break;
    case '−': res = a - b; break;
    case '×': res = a * b; break;
    case '÷': res = b === 0 ? NaN : a / b; break;
    case '%': res = a + b; break; // превърнахме b в a*(b/100) и го прилагаме като a + b (често използвано)
  }

  prev = null;
  op = null;
  current = Number.isFinite(res) ? String(+res.toFixed(12)).replace(/\.?0+$/,'') : 'NaN';
  justEvaluated = true;
}

function clearAll() {
  current = '0'; prev = null; op = null; justEvaluated = false;
}

function delOne() {
  if (justEvaluated) { clearAll(); return; }
  if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) current = '0';
  else current = current.slice(0, -1);
}

keys.addEventListener('click', (e) => {
  const t = e.target;
  if (t.dataset.num) { inputDigit(t.dataset.num); updateScreen(); return; }
  if (t.dataset.dot !== undefined) { inputDot(); updateScreen(); return; }
  if (t.dataset.op) { setOp(t.dataset.op); updateScreen(); return; }
  if (t.dataset.action === 'eq') { if (op) compute(); updateScreen(); return; }
  if (t.dataset.action === 'clear') { clearAll(); updateScreen(); return; }
  if (t.dataset.action === 'del') { delOne(); updateScreen(); return; }
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
  updateScreen();
});

updateScreen();
