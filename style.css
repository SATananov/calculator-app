* { box-sizing: border-box; }
:root {
  --bg: #0b1220; --panel:#121a2b; --muted:#2a3550;
  --txt:#e8eefc; --op:#1ea7fd; --eq:#20c997; --border:#1a2540;
}
:root.light {
  --bg:#f6f8ff; --panel:#ffffff; --muted:#e9eef7;
  --txt:#0f1830; --op:#bfe4ff; --eq:#c8f5e9; --border:#dbe4ff;
}
body {
  margin: 0; font-family: system-ui, Arial, sans-serif; color: var(--txt);
  background: radial-gradient(1200px 800px at 50% -10%, var(--bg), #070c16);
}
.wrap { max-width: 860px; margin: 28px auto; padding: 0 14px; display:grid; grid-template-columns: 1fr 260px; gap:16px; }
.topbar { grid-column: 1 / -1; display:flex; align-items:center; justify-content:space-between; }
h1 { margin: 0; font-size: 22px; opacity:.9; }
#themeToggle { border:none; background:var(--muted); color:var(--txt); padding:8px 10px; border-radius:10px; cursor:pointer; }

.calc { background: var(--panel); border:1px solid var(--border); border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,.25); }
.screen { padding:16px; border-bottom: 1px solid var(--border); min-height:96px; display:flex; flex-direction:column; justify-content:flex-end; }
.history { min-height:22px; opacity:.7; font-size:14px; text-align:right; word-break: break-all; }
.display { font-size:36px; font-weight:700; text-align:right; word-break: break-all; }

.keys { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; padding:12px; }
.keys-science { border-bottom:1px solid var(--border); }
button {
  border:none; padding:14px 10px; border-radius:12px; font-size:18px; color:var(--txt);
  background:#1a2743; cursor:pointer; transition: transform .06s ease, filter .2s;
}
:root.light button { background:#eef3ff; }
button:hover { filter:brightness(1.06); }
button:active { transform: translateY(1px); }
button.op { background: var(--op); color:#00121c; font-weight:700; }
:root.light button.op { color:#04263a; }
button.eq { background: var(--eq); color:#00140d; font-weight:800; }
button.muted { background: var(--muted); }
button.zero { grid-column: span 2; }

.historyPanel {
  background: var(--panel); border:1px solid var(--border); border-radius:16px; padding:12px;
  max-height: 460px; overflow:auto;
}
.historyPanel h3 { margin: 6px 0 8px; font-size: 16px; }
.historyPanel ol { margin:0; padding-left: 18px; }
.historyPanel li { margin: 4px 0; font-size: 14px; opacity:.9; }

.hint { grid-column: 1 / -1; text-align:center; opacity:.6; font-size:12px; margin-top:6px; }
@media (max-width: 760px) {
  .wrap { grid-template-columns: 1fr; }
}
