---
slug: html-canvas
title: HTML Canvas
---
import Image from '@theme/IdealImage';

# Displaying Variables on HTML Canvas

This widget allows you to create custom visualizations using HTML, CSS, and JavaScript. It’s a flexible option for advanced users who want to design personalized dashboards or interactive data views.

---

## Step-by-Step Instructions

1. #### **Open Dashboards**  
   In the top navigation bar, click on `Data`, then select `Dashboards`. This will open the dashboard management area.

   ![Ubidots Data menu open in the top bar with the Dashboards option highlighted](images/ubidots-metric-0.png)

---

2. #### **Add a New Widget**  
   Click the `Add new Widget` button (marked with a + icon).

   ![Empty Ubidots dashboard with the dashed Add new Widget tile and + button](images/ubidots-metric-1.png)

---

3. #### **Choose a Widget Type**  
   From the list of available widgets, choose the `HTML Canvas`.

   ![Add new widget panel with HTML Canvas selected in the Advanced section](images/ubidots-html-0.png)

---

4. #### **Configure HTML Canvas Settings**  
In the **`SETTINGS`** tab, configure the available options.  
This is where you can enable or disable features such as:  

- **Preload dashboard data** (recommended: ON)  
- **Enable React.js** (optional, for dynamic rendering)  
- **Add third-party libraries** (for external JS/CSS resources)  

After configuration, click **`Edit code`** under **Code editor** and insert your HTML, CSS, and JavaScript.

![HTML Canvas SETTINGS tab with Code editor, 3rd party libraries, and Preload dashboard data enabled](images/ubidots-html-1.png)

---

5. #### **Add HTML Code to the Canvas**
In the **Code Editor**, insert your desired layout and logic.  

![Code Editor dialog with HTML, CSS, and JavaScript tabs and sample HTML markup](images/ubidots-html-2.png)

---

6. #### **Edit Canvas Appearance**  
Switch to the **`APPEARANCE`** tab to modify the visual style of your widget.  
You can set:  

- Widget **name**  
- Option to **hide the header**  
- Add a **custom style** (JSON format)

![Edit custom style dialog on the APPEARANCE tab with JSON style overrides](images/ubidots-html-4.png)

---

## Example of HTML Canvas (Floor Plan)

![Finished HTML Canvas widget showing a floor plan with BLE tag pins reporting temperature and humidity](images/ubidots-html-5.png)

---

#### **Configure the Floor Plan Widget**

Before using the HTML code, you must update several parameters inside the **`CONFIG`** section of the script.  
These define your Ubidots connection, the floor plan image, and the BLE tag positions.

---

| Parameter | Description | Required |
|------------|-------------|-----------|
| `CONFIG.ubidots.token` | Your Ubidots **API token** (found under *API Credentials* in Ubidots). | ✅ |
| `CONFIG.ubidots.deviceLabel` | The **device label** that contains your BLE sensor variables. | ✅ |
| `CONFIG.floorplanUrl` | Public URL to your **PNG/JPG floor plan image**. You can host it via [Postimages](https://postimages.org) or [Imgur](https://imgur.com). | ✅ |
| `CONFIG.pollingMs` | How often to refresh values from Ubidots, in **milliseconds**. Default: `15000` (15 seconds). | ⚙️ Optional |
| `CONFIG.tags` | Array containing all BLE sensors with their names, indexes, and positions. Each entry represents one sensor pin on the floor plan. | ✅ |
| `room` | Display name (e.g., `"Server Room"`). | ✅ |
| `idx` | BLE tag index *(0–N)* — values are read from: `ble_tags.<idx>.temperature.avg` and `ble_tags.<idx>.humidity.avg`. | ✅ |
| `x`, `y` | Position in **percentages (0–100)** relative to the image dimensions. | ✅ |
| `loc.anchor` | Locator arrow direction — `"down"` (below), `"top"` (above), or `"diag"` (diagonal). | ⚙️ Optional |
| `loc.dx`, `loc.dy` | Fine offset adjustment for the locator position in **pixels**. | ⚙️ Optional |
| `loc.angle` | Rotation of the locator in **degrees** (used with `"diag"`). | ⚙️ Optional |
| `loc.mirror` | Flip the locator **horizontally** (`true` / `false`). | ⚙️ Optional |

---

#### Example Code – HTML Floor Plan

<details>
<summary><b>Show HTML Floor Plan Code Example</b></summary>
<p>

```
<div id="floor-wrapper">
  <img id="floorplan" alt="Floor plan" />
  <div id="pins"></div>
</div>

<style>
  #floor-wrapper {
    position: relative;
    width: 100%;
    max-width: 1000px; /* You can change the max width of the canvas */
    margin: 0 auto;
  }
  /* The image scales responsively; coordinates are given in PERCENT (0–100) */
  #floorplan { width: 100%; display: block; }

  .pin-wrapper {
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .pin {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background: #e60000; /* You may change bubble color */
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    box-shadow: 0 2px 10px rgba(0,0,0,.25);
    pointer-events: none;
    position: relative;
  }
  .pin .room {
    font-size: 8px;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 2px;
    max-width: 56px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pin .t { font-size: 12px; font-weight: 700; line-height: 1.2; }
  .pin .h { font-size: 10px; font-weight: 500; line-height: 1.1; opacity: .95; }

  .locator {
    position: absolute;
    width: 20px;
    height: 30px;
    pointer-events: none;
  }

  @media (max-width: 520px) {
    .pin { width: 56px; height: 56px; }
    .pin .room { font-size: 7px; }
    .pin .t { font-size: 10px; }
    .pin .h { font-size: 9px; }
    .locator { width: 16px; height: 24px; }
  }
</style>

<script>
  /* ========= CONFIG (fill these) ========= */
  const CONFIG = {
    ubidots: {
      token:        "PASTE_UBIDOTS_TOKEN",  /* REQUIRED: your Ubidots API token */
      deviceLabel:  "PASTE_DEVICE_LABEL"    /* REQUIRED: your Ubidots device label */
    },

    floorplanUrl:   "PASTE_FLOORPLAN_IMAGE_URL", /* REQUIRED: public URL of your floor plan image (PNG/JPG) */

    pollingMs:      15000,                        /* OPTIONAL: refresh interval in ms */

    /* REQUIRED: Define your BLE tags (coordinates in PERCENT 0–100; data from ble_tags.<idx>.*.avg) */
    tags: [
      { room: "Tag-1", idx: 0, x: 50, y: 30,  loc: { anchor: "down", dx: 0, dy: -5 } },
      { room: "Tag-2", idx: 2, x: 12, y: 20,  loc: { anchor: "down", dx: 0, dy: -5 } },
      { room: "Tag-3", idx: 3, x: 90, y: 17,  loc: { anchor: "down", dx: 0, dy: -5 } },
      { room: "Tag-4", idx: 4, x: 80, y: 52,  loc: { anchor: "down", dx: 0, dy: -5 } }
    ]
  };
  /* ======== END CONFIG ======== */

  const floor = document.getElementById("floorplan");
  const pinsContainer = document.getElementById("pins");
  floor.src = CONFIG.floorplanUrl;

  function markerSVG(hex) {
    if (!hex) hex = "#e60000";
    return '' +
      '<svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path fill="' + hex + '" d="M12 2c-4.42 0-8 3.58-8 8 0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z"/>' +
        '<circle cx="12" cy="10" r="3" fill="#ffffff"/>' +
      '</svg>';
  }

  function apiUrl(variableLabel) {
    return 'https://industrial.api.ubidots.com/api/v1.6/devices/' +
      encodeURIComponent(CONFIG.ubidots.deviceLabel) + '/' +
      encodeURIComponent(variableLabel) + '/values?page_size=1';
  }

  async function getLastValue(varLabel) {
    const res = await fetch(apiUrl(varLabel), { headers: { "X-Auth-Token": CONFIG.ubidots.token } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const v = (data && data.results && data.results[0]) ? data.results[0] : null;
    return v ? v.value : null;
  }

  function placeLocator(el, loc) {
    const anchor = (loc && loc.anchor) ? loc.anchor : "down";
    const dx = Number(loc && (loc.dx != null) ? loc.dx : 0);
    const dy = Number(loc && (loc.dy != null) ? loc.dy : 0);
    const angle = Number(loc && (loc.angle != null) ? loc.angle : 0);
    const mirror = !!(loc && loc.mirror);

    el.style.left = ""; el.style.right = ""; el.style.top = ""; el.style.bottom = "";
    const sx = mirror ? -1 : 1;

    if (anchor === "down") {
      el.style.left = "50%";
      el.style.bottom = (-18 + dy) + "px";
      el.style.transform = "translateX(-50%) rotate(0deg) scaleX(" + sx + ")";
    } else if (anchor === "top") {
      el.style.left = "50%";
      el.style.top = (-18 + dy) + "px";
      el.style.transform = "translateX(-50%) rotate(180deg) scaleX(" + sx + ")";
    } else if (anchor === "diag") {
      el.style.right = (-10 + dx) + "px";
      el.style.bottom = (-10 + dy) + "px";
      el.style.transform = "rotate(" + angle + "deg) scaleX(" + sx + ")";
    }
  }

  function ensurePins() {
    pinsContainer.innerHTML = "";
    CONFIG.tags.forEach(function(tag, i) {
      const wrap = document.createElement("div");
      wrap.className = "pin-wrapper";
      wrap.id = "wrap-" + i;

      const pin = document.createElement("div");
      pin.className = "pin";
      pin.id = "pin-" + i;
      pin.innerHTML =
        '<span class="room">' + (tag.room || ('Tag ' + (i + 1))) + '</span>' +
        '<span class="t">--.-°C</span>' +
        '<span class="h">--%</span>';

      const loc = document.createElement("div");
      loc.className = "locator";
      loc.innerHTML = markerSVG();

      pin.appendChild(loc);
      wrap.appendChild(pin);
      pinsContainer.appendChild(wrap);

      placeLocator(loc, tag.loc || {});
    });
    positionPins();
  }

  function positionPins() {
    const rect = floor.getBoundingClientRect();
    CONFIG.tags.forEach(function(tag, i) {
      const wrap = document.getElementById("wrap-" + i);
      if (!wrap) return;

      /* PERCENT COORDINATES: x,y are 0–100 relative to the current rendered image size */
      const px = (tag.x / 100) * rect.width;
      const py = (tag.y / 100) * rect.height;

      wrap.style.left = px + "px";
      wrap.style.top  = py + "px";
    });
  }

  async function refreshData() {
    for (let i = 0; i < CONFIG.tags.length; i++) {
      const tag = CONFIG.tags[i];
      const base = "ble_tags." + tag.idx; /* Always reading BLE by index with .avg */
      const tLabel = base + ".temperature.avg";
      const hLabel = base + ".humidity.avg";

      try {
        const values = await Promise.all([
          getLastValue(tLabel),
          getLastValue(hLabel)
        ]);
        const t = values[0], h = values[1];
        const el = document.getElementById("pin-" + i);
        if (el) {
          el.querySelector(".t").textContent = (t == null ? "--.-°C" : (Number(t).toFixed(1) + "°C"));
          el.querySelector(".h").textContent = (h == null ? "--%"   : (Math.round(h) + "%"));
        }
      } catch (e) {
        console.warn("Fetch error (pin " + i + "):", e);
      }
    }
  }

  ensurePins();
  floor.addEventListener("load", positionPins);
  window.addEventListener("resize", positionPins);
  refreshData();
  setInterval(refreshData, CONFIG.pollingMs);
</script>
```

</p>
</details>




## Example of HTML Canvas (Data Table)

![HTML Canvas data table listing BLE tags with RSSI, voltage, temperature, and humidity columns](images/ubidots-html-6.png)

---

#### **Configure the Table Widget**

Before using the HTML code, you must update several parameters inside the **`CONFIG`** section of the script.  

---

| Parameter | Description | Required |
|---|---|---|
| `CONFIG.ubidots.token` | Your Ubidots **API token** (found under API Credentials). | ✅ |
| `CONFIG.ubidots.deviceLabel` | Device label in Ubidots that contains the BLE variables. | ✅ |
| `CONFIG.pollingMs` | Refresh interval in **milliseconds**. Default: `15000`. | ⚙️ Optional |
| `CONFIG.tags` | Array of rows to display in the table. Each row maps to `ble_tags.<idx>.*`. | ✅ |
| `name` | Display name of the tag (table’s first column). | ✅ |
| `idx` | BLE tag index *(0–N)* used to read: `rssi`, `voltage`, `temperature.avg`, `humidity.avg`. | ✅ |

---


#### Example Code – HTML Data Table

<details>
<summary><b>Show HTML Data Table Code Example</b></summary>
<p>

```
<!-- ======== HTML TABLE: BLE TAGS STATUS ======== -->
<table id="tags-table" cellspacing="0" cellpadding="8"
  style="width:100%; border-collapse: collapse; text-align:center; font-family: system-ui, sans-serif;">
  <thead>
    <tr style="background:#e60000; color:#fff;">
      <th style="border:1px solid #ddd;">🏷️ Tag</th>
      <th style="border:1px solid #ddd;">🛰️ RSSI<br><span style="font-weight:400;font-size:12px;">(dBm)</span></th>
      <th style="border:1px solid #ddd;">🔋 Voltage<br><span style="font-weight:400;font-size:12px;">(V)</span></th>
      <th style="border:1px solid #ddd;">🌡️ Temperature<br><span style="font-weight:400;font-size:12px;">(°C)</span></th>
      <th style="border:1px solid #ddd;">💧 Humidity<br><span style="font-weight:400;font-size:12px;">(%)</span></th>
    </tr>
  </thead>
  <tbody id="tbody"></tbody>
</table>

<script>
  /* ========= CONFIG (fill these) ========= */
  const CONFIG = {
    ubidots: {
      token:        "PASTE_UBIDOTS_TOKEN",   /* REQUIRED: your Ubidots API token */
      deviceLabel:  "PASTE_DEVICE_LABEL"     /* REQUIRED: your Ubidots device label */
    },
    pollingMs: 15000,                        /* OPTIONAL: refresh interval in ms */
    /* REQUIRED: Define your BLE tags (idx = ble_tags.<idx>.*) */
    tags: [
      { name: "Tag-1", idx: 0 },
      { name: "Tag-2", idx: 1 },
      { name: "Tag-3", idx: 2 },
      { name: "Tag-4", idx: 3 },
      { name: "Tag-5", idx: 4 }
    ]
  };
  /* ======== END CONFIG ======== */

  const tbodyEl = document.getElementById("tbody");

  function apiUrl(variableLabel) {
    return "https://industrial.api.ubidots.com/api/v1.6/devices/"
      + encodeURIComponent(CONFIG.ubidots.deviceLabel)
      + "/"
      + encodeURIComponent(variableLabel)
      + "/values?page_size=1";
  }

  async function getLastValue(varLabel) {
    try {
      const res = await fetch(apiUrl(varLabel), {
        headers: { "X-Auth-Token": CONFIG.ubidots.token }
      });
      if (!res.ok) return null;
      const data = await res.json();
      return (data && data.results && data.results[0])
        ? data.results[0].value
        : null;
    } catch {
      return null;
    }
  }

  function renderTableSkeleton() {
    tbodyEl.innerHTML = "";
    CONFIG.tags.forEach(t => {
      const tr = document.createElement("tr");
      tr.innerHTML =
        '<td style="border:1px solid #eee; text-align:left; padding-left:10px; font-weight:600;">'
        + t.name + "</td>"
        + '<td id="rssi-' + t.idx + '"    style="border:1px solid #eee;">--</td>'
        + '<td id="voltage-' + t.idx + '" style="border:1px solid #eee;">--</td>'
        + '<td id="temp-' + t.idx + '"    style="border:1px solid #eee;">--</td>'
        + '<td id="hum-' + t.idx + '"     style="border:1px solid #eee;">--</td>';
      tbodyEl.appendChild(tr);
    });
  }

  function formatVoltage(v) {
    if (v == null) return "--";
    const num = Number(v);
    if (num >= 1) return num.toFixed(2) + " V";
    return (num * 1000).toFixed(0) + " mV";
  }

  async function refreshOnce() {
    for (const t of CONFIG.tags) {
      // Variable labels:
      //   RSSI:        ble_tags.<idx>.rssi
      //   Voltage:     ble_tags.<idx>.voltage
      //   Temperature: ble_tags.<idx>.temperature.avg
      //   Humidity:    ble_tags.<idx>.humidity.avg
      const rssiLabel = "ble_tags." + t.idx + ".rssi";
      const voltLabel = "ble_tags." + t.idx + ".voltage";
      const tempLabel = "ble_tags." + t.idx + ".temperature.avg";
      const humLabel  = "ble_tags." + t.idx + ".humidity.avg";

      try {
        const [rssi, volt, temp, hum] = await Promise.all([
          getLastValue(rssiLabel),
          getLastValue(voltLabel),
          getLastValue(tempLabel),
          getLastValue(humLabel)
        ]);

        setText("rssi-" + t.idx,    rssi == null ? "--" : Math.round(rssi) + " dBm");
        setText("voltage-" + t.idx, volt == null ? "--" : formatVoltage(volt));
        setText("temp-" + t.idx,    temp == null ? "--" : Number(temp).toFixed(1) + " °C");
        setText("hum-" + t.idx,     hum  == null ? "--" : Math.round(hum) + " %");
      } catch (e) {
        console.warn("Tag " + t.idx + " error:", e);
      }
    }
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  renderTableSkeleton();
  refreshOnce();
  setInterval(refreshOnce, CONFIG.pollingMs);
</script>
```

</p>
</details>
