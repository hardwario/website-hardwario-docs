---
title: Dashboard
---

# Dashboard

Available on both FIBER and FIBER Lite.

FIBER ships a landing page on port 80 with tiles linking to every service, live system
metrics, and an SSH quick-copy button, styled to the HARDWARIO brand (colors, typography, logo).
It is a self-contained static page with a small Python backend for live stats, with no external
framework or Docker container required for the page itself. The logo and font below are fetched
from `hardwario.com`/Google Fonts at page-load time for simplicity; self-hosting them is possible
but not required.

1. Create the dashboard directory:

   ```sh
   mkdir -p ~/fiber-dashboard
   ```

1. Write `index.html`: this is the dashboard's web page (layout, styling, and the little script
   that fills in your device's IP and refreshes the live stats). The block below is collapsed by
   default since it's long; click the bar to expand it, then copy the whole thing into the
   command:

   <details>
   <summary><b>Click to expand: full index.html code</b></summary>
   <p>

   ```sh
   cat << 'EOF' > ~/fiber-dashboard/index.html
   <!DOCTYPE html>
   <html lang="en">
   <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>FIBER</title>
   <style>
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

   :root {
     --blue-bright: #009cfa; --blue-dark: #016ad4; --navy: #06367a;
     --red: #e30427; --c-blue: #009cfa; --c-orange: #ff8d28; --c-cyan: #00c0e8; --c-green: #34c759;
     --bg: #ffffff; --surface: #ffffff; --surface-muted: #f3f4f6; --heading: #000000;
     --text: #252532; --text-mute: rgba(37,37,50,.7); --text-faint: rgba(37,37,50,.5);
     --border: #e6e6e6; --input-bg: #ffffff; --input-bd: #d1d5db;
     --primary: var(--blue-bright); --link: var(--blue-dark);
     --focus-ring: color-mix(in srgb, var(--blue-bright) 35%, transparent);
   }
   [data-theme="dark"] {
     --red: #f43f5e; --bg: #0f0f14; --surface: #1a1a22; --surface-muted: #131319;
     --heading: #ffffff; --text: #e7e7ee; --text-mute: rgba(231,231,238,.64);
     --text-faint: rgba(231,231,238,.45); --border: #2b2b36; --input-bg: #1a1a22; --input-bd: #34343f;
     --link: #4db5ff; --focus-ring: color-mix(in srgb, var(--blue-bright) 45%, transparent);
   }
   :root { --font-sans: "Inter", system-ui, sans-serif; --font-mono: ui-monospace, monospace;
     --radius: 8px; --radius-lg: 16px; --shadow-sm: 0 6px 18px rgba(16,16,30,.06); --ease: cubic-bezier(.2,.8,.2,1); }
   [data-theme="dark"] { --shadow-sm: 0 6px 18px rgba(0,0,0,.45); }
   *,*::before,*::after{box-sizing:border-box}*{margin:0}html,body{height:100%;max-width:100%;overflow-x:hidden}
   html{font-family:var(--font-sans);scroll-behavior:smooth}
   body{background:var(--bg);color:var(--text);font-size:16px;line-height:1.625;-webkit-font-smoothing:antialiased;transition:background-color .25s var(--ease),color .25s var(--ease)}
   img,svg{display:block;max-width:100%}input,button{font:inherit;color:inherit}button{background:none;border:0;cursor:pointer}
   a{color:var(--link);text-decoration:none}a:hover{color:var(--blue-dark)}
   h1,h2,h3,h4{font-weight:700;line-height:1.1;letter-spacing:-.02em;color:var(--heading)}
   :focus-visible{outline:2px solid var(--primary);outline-offset:2px}
   .hp-root{background:var(--bg);color:var(--text);overflow-x:hidden;min-height:100vh;display:flex;flex-direction:column}
   .hp-main{flex:1 0 auto;width:100%;margin:0 auto;padding:40px 48px 72px}
   .hp-ssh .hp-mono{word-break:break-all;overflow-wrap:anywhere}
   header.hp-head{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-bottom:40px}
   .hp-brand{display:flex;align-items:center;gap:16px}.hp-brand img{height:40px}
   .hp-title{font-size:22px;font-weight:700;letter-spacing:-.01em;color:var(--heading)}
   .hp-glabel{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-mute)}
   .hp-mono{font-family:var(--font-mono);font-variant-numeric:tabular-nums}
   .hp-head-right{display:flex;align-items:center;gap:14px}
   .hp-clock-block{text-align:right;line-height:1.25}.hp-clock{font-size:20px;font-weight:600;color:var(--heading)}
   .hp-date{font-size:12px;color:var(--text-mute)}
   .hp-theme-btn{width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center;border:1px solid var(--border);background:var(--surface-muted);border-radius:8px;color:var(--text);flex:0 0 auto}
   .hp-search-wrap{position:relative;margin-bottom:40px}
   .hp-search-icon{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--text-faint);display:flex}
   .hp-search{width:100%;height:48px;padding:0 16px 0 44px;background:var(--input-bg);border:1px solid var(--input-bd);border-radius:8px;color:var(--text);font-size:15px;outline:none}
   .hp-search:focus{border-color:var(--blue-bright);box-shadow:0 0 0 3px var(--focus-ring)}
   .hp-card{display:block;background:var(--surface);border:1px solid var(--border);border-radius:16px;box-shadow:var(--shadow-sm);transition:transform .2s var(--ease),border-color .15s,box-shadow .15s}
   .hp-svc:hover{transform:translateY(-3px);border-color:var(--red);box-shadow:0 10px 24px -12px rgba(0,0,0,.5)}
   .hp-svc:hover .hp-arrow{color:var(--blue-bright);transform:translate(2px,-2px)}
   .hp-arrow{color:var(--text-faint);transition:transform .2s var(--ease),color .15s;display:flex}
   .hp-svc.hp-hidden{display:none}
   @keyframes hp-pulse{0%{box-shadow:0 0 0 0 rgba(52,199,89,.5)}100%{box-shadow:0 0 0 9px rgba(52,199,89,0)}}
   .hp-dot{display:inline-block;width:8px;height:8px;border-radius:999px;background:var(--c-green);animation:hp-pulse 1.8s var(--ease) infinite}
   section.hp-sys{padding:24px 28px;margin-bottom:44px}
   .hp-sys-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}
   .hp-sys-title{display:flex;align-items:center;gap:10px}.hp-sys-title span.ic{color:var(--blue-bright);display:flex}
   .hp-sys-title span.label{font-size:15px;font-weight:600;color:var(--heading)}
   .hp-sys-up{display:flex;align-items:center;gap:8px}.hp-sys-up span.uptime{font-size:12px;color:var(--text-mute)}
   .hp-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
   .hp-stat-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}
   .hp-stat-row .val{font-size:14px;font-weight:600;color:var(--heading)}
   .hp-bar-track{height:6px;background:var(--surface-muted);border-radius:999px;overflow:hidden}
   .hp-bar-fill{height:100%;border-radius:999px;transition:width .5s var(--ease)}
   .hp-section{margin-bottom:44px}
   .hp-svcgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}
   .hp-svc-card{padding:20px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px}
   .hp-svc-name{display:flex;align-items:center;gap:10px;margin-bottom:4px}.hp-svc-name span.n{font-size:16px;font-weight:600;color:var(--heading)}
   .hp-svc-desc{font-size:13px;color:var(--text-mute)}.hp-svc-port{font-size:12px;color:var(--text-faint);margin-top:6px}
   .hp-access-card{padding:20px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
   .hp-access-left{display:flex;align-items:center;gap:14px;min-width:0}.hp-access-left .ic{color:var(--blue-bright);display:flex;flex:0 0 auto}
   .hp-access-name{font-size:16px;font-weight:600;color:var(--heading);margin-bottom:3px}.hp-access-cmd{font-size:13px;color:var(--text-mute)}
   .hp-copy-btn{height:36px;padding:0 16px;background:transparent;border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}
   .hp-dev-card{padding:14px 18px;display:inline-flex;align-items:center;gap:12px}
   .hp-dev-badge{width:32px;height:32px;border-radius:8px;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700}
   .hp-dev-name{font-size:15px;font-weight:600;color:var(--heading)}
   footer.hp-foot{flex-shrink:0;border-top:1px solid var(--border);padding:20px 48px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
   footer.hp-foot img{height:16px;opacity:.9}footer.hp-foot .tag{font-size:12px;color:var(--text-faint)}
   @media (max-width:720px){
     .hp-main{padding:24px 18px 48px}.hp-head{flex-direction:column;align-items:flex-start;gap:16px}
     .hp-head-right{width:100%;justify-content:space-between}.hp-metrics{grid-template-columns:repeat(2,1fr);gap:20px 24px}
     .hp-svcgrid{grid-template-columns:1fr}.hp-foot{padding:18px;flex-direction:column;align-items:flex-start;gap:10px}
     .hp-ssh{flex-direction:column;align-items:flex-start}.hp-clock{font-size:17px!important}
     .hp-ssh>div{min-width:0}.hp-ssh button{width:100%}
   }
   </style>
   </head>
   <body>
   <div class="hp-root">
     <div class="hp-main">
       <header class="hp-head">
         <div class="hp-brand">
           <img src="https://www.hardwario.com/hw-mark-pos.svg" alt="HARDWARIO">
           <div>
             <div class="hp-title">FIBER</div>
             <div class="hp-glabel" style="margin-top:3px;">LoRaWAN Gateway</div>
           </div>
         </div>
         <div class="hp-head-right">
           <div class="hp-clock-block hp-mono">
             <div class="hp-clock" id="clock">--:--:--</div>
             <div class="hp-date" id="today">-</div>
           </div>
           <button class="hp-theme-btn" id="themeToggle" title="Toggle theme">
             <svg id="iconMoon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
             <svg id="iconSun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
           </button>
         </div>
       </header>

       <div class="hp-search-wrap">
         <span class="hp-search-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg></span>
         <input class="hp-search" id="search" placeholder="Search services…">
       </div>

       <section class="hp-card hp-sys">
         <div class="hp-sys-head">
           <div class="hp-sys-title">
             <span class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"></path></svg></span>
             <span class="label">System</span>
           </div>
           <div class="hp-sys-up"><span class="hp-dot"></span><span class="uptime hp-mono" id="uptime">UP --</span></div>
         </div>
         <div class="hp-metrics">
           <div><div class="hp-stat-row"><span class="hp-glabel">CPU</span><span class="val hp-mono" id="cpuVal">--%</span></div><div class="hp-bar-track"><div class="hp-bar-fill" id="cpuBar" style="width:0%;background:var(--c-green);"></div></div></div>
           <div><div class="hp-stat-row"><span class="hp-glabel">MEM</span><span class="val hp-mono" id="memVal">--%</span></div><div class="hp-bar-track"><div class="hp-bar-fill" id="memBar" style="width:0%;background:var(--c-blue);"></div></div></div>
           <div><div class="hp-stat-row"><span class="hp-glabel">Disk /</span><span class="val hp-mono" id="diskVal">--%</span></div><div class="hp-bar-track"><div class="hp-bar-fill" id="diskBar" style="width:0%;background:var(--c-cyan);"></div></div></div>
           <div><div class="hp-stat-row"><span class="hp-glabel">Temp</span><span class="val hp-mono" id="tempVal">--°C</span></div><div class="hp-bar-track"><div class="hp-bar-fill" id="tempBar" style="width:0%;background:var(--c-orange);"></div></div></div>
         </div>
       </section>

       <section class="hp-section">
         <div class="hp-glabel" style="margin-bottom:16px;">LoRaWAN &amp; Data</div>
         <div class="hp-svcgrid" id="serviceGrid">
           <a class="hp-card hp-svc" data-search="chirpstack lorawan network server" href="http://TARGET_IP:8080" target="_blank" rel="noreferrer">
             <div class="hp-svc-card"><div><div class="hp-svc-name"><span class="hp-dot"></span><span class="n">ChirpStack</span></div><div class="hp-svc-desc">LoRaWAN Network Server</div><div class="hp-svc-port hp-mono">:8080</div></div><span class="hp-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span></div>
           </a>
           <a class="hp-card hp-svc" data-search="node-red data processing login required" href="http://TARGET_IP:1880" target="_blank" rel="noreferrer">
             <div class="hp-svc-card"><div><div class="hp-svc-name"><span class="hp-dot"></span><span class="n">Node-RED</span></div><div class="hp-svc-desc">Data processing (login required)</div><div class="hp-svc-port hp-mono">:1880</div></div><span class="hp-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span></div>
           </a>
           <a class="hp-card hp-svc" data-search="influxdb time-series database" href="http://TARGET_IP:8086" target="_blank" rel="noreferrer">
             <div class="hp-svc-card"><div><div class="hp-svc-name"><span class="hp-dot"></span><span class="n">InfluxDB</span></div><div class="hp-svc-desc">Time-series database</div><div class="hp-svc-port hp-mono">:8086</div></div><span class="hp-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span></div>
           </a>
           <a class="hp-card hp-svc" data-search="grafana visualization dashboards" href="http://TARGET_IP:3000" target="_blank" rel="noreferrer">
             <div class="hp-svc-card"><div><div class="hp-svc-name"><span class="hp-dot"></span><span class="n">Grafana</span></div><div class="hp-svc-desc">Visualization and dashboards</div><div class="hp-svc-port hp-mono">:3000</div></div><span class="hp-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span></div>
           </a>
         </div>
       </section>

       <section class="hp-section">
         <div class="hp-glabel" style="margin-bottom:16px;">Access</div>
         <div class="hp-card hp-ssh hp-access-card">
           <div class="hp-access-left">
             <span class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m4 17 6-6-6-6M12 19h8"></path></svg></span>
             <div><div class="hp-access-name">SSH</div><div class="hp-access-cmd hp-mono" id="sshCmd">ssh SSH_USER_PLACEHOLDER@TARGET_IP</div></div>
           </div>
           <button class="hp-copy-btn" id="copyBtn">COPY</button>
         </div>
       </section>

       <section class="hp-section" style="margin-bottom:48px;">
         <div class="hp-glabel" style="margin-bottom:16px;">Developer</div>
         <div style="display:flex;gap:12px;flex-wrap:wrap;">
           <a class="hp-card hp-dev-card" href="https://github.com/hardwario" target="_blank" rel="noreferrer">
             <span class="hp-dev-badge">HW</span><span class="hp-dev-name">GitHub</span>
             <span class="hp-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"></path></svg></span>
           </a>
         </div>
       </section>
     </div>

     <footer class="hp-foot">
       <img id="footerLogo" src="https://www.hardwario.com/logo-dark.svg" alt="HARDWARIO">
       <span class="tag">FIBER · Engineered in the heart of Europe</span>
     </footer>
   </div>

   <script>
   (function () {
     var THEME_KEY = 'fiber-theme';
     var sshTarget = 'SSH_USER_PLACEHOLDER@' + window.location.hostname;
     document.getElementById('sshCmd').textContent = 'ssh ' + sshTarget;
     document.querySelectorAll('a[href*="TARGET_IP"]').forEach(function (a) {
       a.href = a.href.replace('TARGET_IP', window.location.hostname);
     });

     function applyTheme(theme) {
       document.querySelector('.hp-root').setAttribute('data-theme', theme);
       document.getElementById('iconMoon').style.display = theme === 'dark' ? '' : 'none';
       document.getElementById('iconSun').style.display = theme === 'dark' ? 'none' : '';
       document.getElementById('footerLogo').src = theme === 'dark'
         ? 'https://www.hardwario.com/logo-dark.svg'
         : 'https://www.hardwario.com/logo.svg';
     }
     var savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
     applyTheme(savedTheme);
     document.getElementById('themeToggle').addEventListener('click', function () {
       var next = document.querySelector('.hp-root').getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
       localStorage.setItem(THEME_KEY, next);
       applyTheme(next);
     });

     function tick() {
       var d = new Date();
       document.getElementById('clock').textContent = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
       document.getElementById('today').textContent = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
     }
     tick();
     setInterval(tick, 1000);

     var copyBtn = document.getElementById('copyBtn');
     copyBtn.addEventListener('click', function () {
       navigator.clipboard.writeText(sshTarget && ('ssh ' + sshTarget)).catch(function () {});
       copyBtn.textContent = 'COPIED';
       setTimeout(function () { copyBtn.textContent = 'COPY'; }, 1600);
     });

     var searchInput = document.getElementById('search');
     searchInput.addEventListener('input', function () {
       var q = searchInput.value.trim().toLowerCase();
       document.querySelectorAll('#serviceGrid .hp-svc').forEach(function (card) {
         var hay = card.getAttribute('data-search') || '';
         card.classList.toggle('hp-hidden', q.length > 0 && hay.indexOf(q) === -1);
       });
     });

     function refreshStats() {
       fetch('/api/stats', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (s) {
         document.getElementById('cpuVal').textContent = s.cpu + '%';
         document.getElementById('cpuBar').style.width = s.cpu + '%';
         document.getElementById('memVal').textContent = s.mem + '%';
         document.getElementById('memBar').style.width = s.mem + '%';
         document.getElementById('diskVal').textContent = s.disk + '%';
         document.getElementById('diskBar').style.width = s.disk + '%';
         if (s.temp !== null) {
           document.getElementById('tempVal').textContent = s.temp + '°C';
           document.getElementById('tempBar').style.width = Math.min(s.temp, 100) + '%';
         }
         document.getElementById('uptime').textContent = 'UP ' + s.uptime;
       }).catch(function () {});
     }
     refreshStats();
     setInterval(refreshStats, 4000);
   })();
   </script>
   </body>
   </html>
   EOF
   ```

   </p>
   </details>

1. Fill in your actual SSH username: the page can't detect it from the browser, so bake it in
   now with the username you're currently logged in as:

   ```sh
   sed -i "s/SSH_USER_PLACEHOLDER/$USER/g" ~/fiber-dashboard/index.html
   ```

   :::tip

   The service tiles and SSH command use `window.location.hostname` to fill in the target IP
   automatically. Open the page from whatever address you actually browse to, and the links/SSH
   command adjust themselves. No need to hand-edit IP addresses into the file.

   :::

1. Write `serve.py`: this is the small program that actually runs the dashboard: a
   dependency-free Python web server that serves the `index.html` page above and exposes a
   `/api/stats` endpoint with live CPU/memory/disk usage and temperature. Same as above, click
   to expand the code, then copy the whole thing into the command:

   <details>
   <summary><b>Click to expand: full serve.py code</b></summary>
   <p>

   ```sh
   cat << 'EOF' > ~/fiber-dashboard/serve.py
   #!/usr/bin/env python3
   import http.server
   import json
   import os
   import time

   BASE_DIR = os.path.dirname(os.path.abspath(__file__))


   def get_cpu_percent(interval=0.3):
       def read():
           with open('/proc/stat') as f:
               line = f.readline()
           parts = [int(x) for x in line.split()[1:8]]
           idle = parts[3] + parts[4]
           total = sum(parts)
           return idle, total

       idle1, total1 = read()
       time.sleep(interval)
       idle2, total2 = read()
       idle_delta = idle2 - idle1
       total_delta = total2 - total1
       if total_delta <= 0:
           return 0.0
       return round((1 - idle_delta / total_delta) * 100, 1)


   def get_mem_percent():
       info = {}
       with open('/proc/meminfo') as f:
           for line in f:
               k, v = line.split(':', 1)
               info[k.strip()] = int(v.strip().split()[0])
       total = info['MemTotal']
       avail = info.get('MemAvailable', info.get('MemFree', 0))
       used = total - avail
       return round(used / total * 100, 1)


   def get_disk_percent(path='/'):
       st = os.statvfs(path)
       total = st.f_blocks * st.f_frsize
       free = st.f_bfree * st.f_frsize
       used = total - free
       return round(used / total * 100, 1)


   def get_temp_c():
       try:
           with open('/sys/class/thermal/thermal_zone0/temp') as f:
               return round(int(f.read().strip()) / 1000, 1)
       except OSError:
           return None


   def get_uptime_str():
       with open('/proc/uptime') as f:
           seconds = float(f.read().split()[0])
       days = int(seconds // 86400)
       hours = int((seconds % 86400) // 3600)
       return f"{days}d {hours:02d}h"


   class Handler(http.server.SimpleHTTPRequestHandler):
       def __init__(self, *args, **kwargs):
           super().__init__(*args, directory=BASE_DIR, **kwargs)

       def do_GET(self):
           if self.path == '/api/stats':
               data = {
                   "cpu": get_cpu_percent(),
                   "mem": get_mem_percent(),
                   "disk": get_disk_percent(),
                   "temp": get_temp_c(),
                   "uptime": get_uptime_str(),
               }
               body = json.dumps(data).encode()
               self.send_response(200)
               self.send_header('Content-Type', 'application/json')
               self.send_header('Content-Length', str(len(body)))
               self.send_header('Cache-Control', 'no-store')
               self.end_headers()
               self.wfile.write(body)
               return
           super().do_GET()

       def log_message(self, format, *args):
           pass


   if __name__ == '__main__':
       server = http.server.ThreadingHTTPServer(('0.0.0.0', 80), Handler)
       server.serve_forever()
   EOF
   ```

   </p>
   </details>

1. Run it as a systemd service (root is required to bind port 80 without `setcap`/`authbind`):

   ```sh
   cat << EOF | sudo tee /etc/systemd/system/fiber-dashboard.service > /dev/null
   [Unit]
   Description=FIBER Dashboard
   After=network.target

   [Service]
   Type=simple
   WorkingDirectory=$HOME/fiber-dashboard
   ExecStart=/usr/bin/python3 $HOME/fiber-dashboard/serve.py
   Restart=on-failure
   RestartSec=2

   [Install]
   WantedBy=multi-user.target
   EOF

   sudo systemctl daemon-reload
   sudo systemctl enable --now fiber-dashboard.service
   ```

1. Now, you can access the dashboard at this address: `http://[TARGET IP ADDRESS]/`

   The page includes a light/dark theme toggle (persisted per browser), a service search filter,
   and the same four service tiles plus SSH/GitHub links described above.
