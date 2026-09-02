---
title: Příklady
description: "Vypište všechna zařízení v prostoru a u každého vytiskněte nejnovější zprávu typu data."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Příklady {#examples}

## Poslední hodnoty ze všech zařízení {#latest-reading-from-every-device}

Vypište všechna zařízení v prostoru a u každého vytiskněte nejnovější zprávu typu `data`.

<Tabs>
<TabItem value="curl" label="cURL" default>

```bash
API_KEY="<api-key>"
SPACE="<space-id>"
BASE="https://api.hardwario.cloud/v2"

curl -s -H "X-API-KEY: $API_KEY" "$BASE/spaces/$SPACE/devices?limit=500" \
| jq -r '.[].id' \
| while read -r DEV; do
    echo "== $DEV =="
    curl -s -H "X-API-KEY: $API_KEY" \
      "$BASE/spaces/$SPACE/messages?device_id=$DEV&type[]=data&limit=1"
    echo
  done
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

API_KEY = '<api-key>'
SPACE = '<space-id>'
BASE = 'https://api.hardwario.cloud/v2'
H = {'X-API-KEY': API_KEY}

devices = requests.get(f'{BASE}/spaces/{SPACE}/devices?limit=500', headers=H).json()

for d in devices:
    msgs = requests.get(
        f'{BASE}/spaces/{SPACE}/messages',
        params={'device_id': d['id'], 'type[]': 'data', 'limit': 1},
        headers=H,
    ).json()
    latest = msgs[0]['body'] if msgs else 'no data'
    print(f"{d['name']}: {latest}")
```

</TabItem>
<TabItem value="node" label="Node.js">

```js
const API_KEY = '<api-key>';
const SPACE = '<space-id>';
const BASE = 'https://api.hardwario.cloud/v2';
const H = { 'X-API-KEY': API_KEY };

const devices = await (
  await fetch(`${BASE}/spaces/${SPACE}/devices?limit=500`, { headers: H })
).json();

for (const d of devices) {
  const msgs = await (
    await fetch(`${BASE}/spaces/${SPACE}/messages?device_id=${d.id}&type[]=data&limit=1`, { headers: H })
  ).json();
  console.log(`${d.name}: ${msgs[0]?.body ?? 'no data'}`);
}
```

</TabItem>
</Tabs>

## Kompletní referenční dokumentace {#full-reference}

[**Dokumentace Swagger**](https://api.hardwario.cloud/v2/documentation/) obsahuje
všechny endpointy (prostory, zařízení, zprávy, konektory, tagy, proměnné, firmware,
uživatele, klíče …) včetně schémat požadavků a odpovědí.
